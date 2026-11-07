#!/usr/bin/env python3
"""由題庫（gsat/exam/exams.js、answers.js）與單字資料庫（gsat/data/vocab.js）計算「歷屆出現索引」，輸出 gsat/exam/vocab_index.js。
所有次數都由程式逐字計算，不由 AI 推測年度、題號或次數。需要 node（讀取 JS 資料檔）。

統計規則（與 docs/gsat/VOCAB_INDEX_METHOD.md 相同）：
 1. 只比對「A 類」：詞條的 forms（原字與詞形變化）。字族衍生字（B）與語意相關字（C）各有自己的詞條與次數，不併入。
 2. 位置分四種：題幹、選項（正確答案／干擾選項）、閱讀文章或綜合測驗文章（passage）。
 3. 一篇文章即使供多道題目共用，也只算一次（以「題組」為單位）；同一個字在同一篇文章出現多次，分開報告「原文次數」與「涉及題組數」。
 4. 文意選填的字庫、篇章結構的選項句子是整個題組共用的，每個選項只算一次（對應它是哪一題的答案；沒用到的選項算干擾選項）。
 5. 詞形有詞性疑義（詞條的 amb）或位於連字號複合詞內（如 well-known）的比對，一律標為 review（待審核），不計入已確認次數。
 6. 角色（正確答案／干擾選項）只依官方答案判定；出現在文章裡的字不會被稱為「考過的答案」。"""
import argparse, json, pathlib, re, subprocess, sys
from collections import Counter, defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[1]
JS = """
global.window={};
for (const f of ['data/vocab.js','exam/exams.js','exam/answers.js','exam/vocab_reviews.js']) require(process.argv[1]+'/gsat/'+f);
console.log(JSON.stringify({vocab:window.VOCAB,exams:window.EXAMS,answers:window.ANSWERS,reviews:window.VOCAB_REVIEWS}));
"""
TOKEN = re.compile(r"[A-Za-z]+(?:['’][A-Za-z]+)*")
TYPE_NAME = {'vocab': '詞彙', 'cloze': '綜合測驗', 'bank': '文意選填', 'structure': '篇章結構', 'reading': '閱讀測驗'}


def load():
    out = subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def tokens(text):
    """回傳 [(小寫詞形, 原始詞形, 是否連字號複合詞內)]。【12】這類空格標記與數字不會被當成單字。"""
    res = []
    for m in TOKEN.finditer(text):
        s, e = m.span()
        compound = (s > 0 and text[s - 1] == '-' and s > 1 and text[s - 2].isalpha()) or (e < len(text) and text[e] == '-' and e + 1 < len(text) and text[e + 1].isalpha())
        res.append((m.group().replace('’', "'").lower(), m.group(), compound))
    return res


def build(data):
    vocab, exams, answers = data['vocab'], data['exams'], data['answers']
    form_map = defaultdict(list)
    for eid, e in vocab['entries'].items():
        for f in e['forms']:
            form_map[f.lower()].append(eid)
    recs = defaultdict(list)           # entry id → records

    def hit(text, base):
        """比對一段文字，回傳 {(entry, 小寫詞形): [原始詞形, ...]}，以及各比對是否需要待審核"""
        found = []
        for low, raw, comp in tokens(text):
            for eid in form_map.get(low, []):
                amb = low in vocab['entries'][eid]['amb']
                reason = 'pos' if amb else ('compound' if comp else None)
                found.append((eid, low, raw, reason))
        return found

    n_questions = 0
    units = set()
    for ex in exams:
        y, key = ex['year'], answers[ex['year']]
        for sec in ex['sections']:
            t = sec['type']
            for g in sec['groups']:
                nums = [q['n'] for q in g['questions']]
                unit = f"{y}:{t}:{nums[0]}-{nums[-1]}" if t != 'vocab' else f"{y}:{t}:{nums[0]}"
                units.add(unit)
                n_questions += len(nums)
                correct = {q['n']: key[q['n'] - 1] for q in g['questions']}
                # 1) 文章（每個題組只算一次，逐段記錄）
                for pi, para in enumerate(g.get('passage') or []):
                    per = defaultdict(list)
                    for eid, low, raw, reason in hit(para, None):
                        per[(eid, reason)].append(raw)
                    for (eid, reason), raws in per.items():
                        recs[eid].append({'y': y, 'u': unit, 't': t, 'role': 'passage', 'qs': nums, 'loc': f'文章第 {pi + 1} 段', 'c': len(raws), 'f': sorted(set(raws)), 'r': reason})
                # 2) 文意選填字庫／篇章結構選項句子（整個題組共用，每個選項只算一次）
                if t in ('bank', 'structure'):
                    letter_to_blank = {L: n for n, L in correct.items()}
                    for i, item in enumerate(g['bank']):
                        L = 'ABCDEFGHIJ'[i]
                        blank = letter_to_blank.get(L)
                        per = defaultdict(list)
                        for eid, low, raw, reason in hit(item, None):
                            per[(eid, reason)].append(raw)
                        for (eid, reason), raws in per.items():
                            recs[eid].append({'y': y, 'u': unit, 't': t, 'n': blank, 'qs': nums, 'role': 'answer' if blank else 'distractor', 'loc': f'{"字庫" if t == "bank" else "選項句子"} ({L})',
                                              'exact': t == 'bank' and len(tokens(item)) == 1, 'c': len(raws), 'f': sorted(set(raws)), 'r': reason})
                    continue
                # 3) 一般題：題幹與每個選項
                for q in g['questions']:
                    stem = q.get('stem') or ''
                    per = defaultdict(list)
                    for eid, low, raw, reason in hit(stem, None):
                        per[(eid, reason)].append(raw)
                    for (eid, reason), raws in per.items():
                        recs[eid].append({'y': y, 'u': unit, 't': t, 'n': q['n'], 'role': 'stem', 'loc': '題幹', 'c': len(raws), 'f': sorted(set(raws)), 'r': reason})
                    for i, opt in enumerate(q.get('opts') or []):
                        L = 'ABCD'[i]
                        toks = tokens(opt)
                        per = defaultdict(list)
                        for eid, low, raw, reason in hit(opt, None):
                            per[(eid, reason)].append(raw)
                        for (eid, reason), raws in per.items():
                            recs[eid].append({'y': y, 'u': unit, 't': t, 'n': q['n'], 'role': 'answer' if correct[q['n']] == L else 'distractor', 'loc': f'選項 ({L})',
                                              'exact': len(toks) == 1, 'c': len(raws), 'f': sorted(set(raws)), 'r': reason})

    # 人工審核結果（exam/vocab_reviews.js）：只有審核者（by 不可空白）確認或排除的比對才會改變統計；AI 不會自行決定
    reviews = data.get('reviews') or {}
    entries = {}
    for eid in vocab['entries']:
        rs = recs.get(eid, [])
        for r in rs:
            r['k'] = '|'.join([eid, r['y'], r['u'], str(r.get('n') or ''), r['role'], r['loc']])
            v = reviews.get(r['k']) if r['r'] else None
            if v and v.get('by') and v.get('verdict') == 'confirmed':
                r['r'] = None; r['reviewed'] = v['by']
            elif v and v.get('by') and v.get('verdict') == 'rejected':
                r['r'] = 'rejected'
        ok = [r for r in rs if not r['r']]
        rev = [r for r in rs if r['r'] and r['r'] != 'rejected']
        rej = [r for r in rs if r['r'] == 'rejected']
        role = Counter()
        for r in ok: role[r['role']] += r['c']
        per_year = Counter()
        for r in ok: per_year[r['y']] += r['c']
        passage_units = {r['u'] for r in ok if r['role'] == 'passage'}
        qset = {(r['y'], r['n']) for r in ok if r.get('n') is not None}
        entries[eid] = {
            'total': sum(r['c'] for r in ok),
            'role': {k: role.get(k, 0) for k in ('answer', 'distractor', 'stem', 'passage')},
            'answerExact': sum(1 for r in ok if r['role'] == 'answer' and r.get('exact')),
            'answerRecords': sum(1 for r in ok if r['role'] == 'answer'),
            'passageUnits': len(passage_units),
            'units': len({r['u'] for r in ok}), 'questions': len(qset),
            'years': sorted(per_year), 'perYear': dict(sorted(per_year.items())),
            'first': min(per_year) if per_year else None, 'last': max(per_year) if per_year else None,
            'records': sorted(ok, key=lambda r: (r['y'], r['u'], r.get('n') or 0, r['role'])),
            'review': sorted(rev, key=lambda r: (r['y'], r['u'], r.get('n') or 0, r['role'])),
            'rejected': sorted(rej, key=lambda r: (r['y'], r['u'], r.get('n') or 0, r['role'])),
        }
    meta = {'schema': 1, 'questions': n_questions, 'units': len(units), 'years': [e['year'] for e in exams], 'entriesIndexed': len(entries),
            'scope': f'只統計單字資料庫已建檔的 {len(entries)} 個詞條,不是全部單字;範圍為 106–115 學年度的選擇題(混合題與非選擇題不在內)。',
            'notice': '歷屆出現次數只說明過去題庫的紀錄,不代表未來的出題機率。',
            'rules': ['只比對詞條的詞形(原字與詞形變化);字族衍生字與語意相關字各有自己的次數,不併入', '一篇文章供多題共用時只算一次,並分開報告「原文次數」與「涉及題組數」',
                      '文章裡的字不稱為「考過的答案」;角色只依官方答案判定正確答案或干擾選項', '詞性或字義有疑義、或在連字號複合詞內的比對,標為待審核,不計入已確認次數']}
    return {'meta': meta, 'entries': entries}


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', default=str(ROOT / 'gsat' / 'exam' / 'vocab_index.js')); a = ap.parse_args()
    idx = build(load())
    pathlib.Path(a.out).write_text('// 歷屆出現索引:由 tools/build_vocab_index.py 逐字計算,勿手改。統計規則見 docs/gsat/VOCAB_INDEX_METHOD.md。\nwindow.VOCAB_INDEX = ' + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf8')
    tot = sum(e['total'] for e in idx['entries'].values()); rev = sum(len(e['review']) for e in idx['entries'].values())
    print(f"{idx['meta']['entriesIndexed']} 個詞條;題庫 {idx['meta']['questions']} 題、{idx['meta']['units']} 個題目單位;已確認 {tot} 次;待審核 {rev} 筆 → {a.out}")


if __name__ == '__main__':
    main()
