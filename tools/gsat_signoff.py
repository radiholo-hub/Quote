#!/usr/bin/env python3
"""教師簽核紀錄(docs/gsat/signoffs/<題號>.json)的產生與有效性檢查。不含任何考題文字。

「內容指紋」(contentFingerprint) 是對「簽核時教師實際審核的內容」算出的 SHA-256,
涵蓋:題目與選項與官方答案、詳解(中譯、解題步驟、選項解析、單字/片語/句型/文法)、詳解引用的單字詞條(詞形、搭配詞、例句、字族、同義/反義/易混淆)、
衍生字(畫面上列出的詞性與中文)、該題的延伸練習、tight 這類重點字的歷屆出題紀錄,以及每個發音按鈕對應的 mp3(檔名與檔案內容的 SHA-256)。
刻意「不」納入:status / reviewer / reviewedAt / reviewNotes(審核中繼資料)、aiFlags(AI 自我檢查提示)、各詞條與延伸題自己的 status、
其他題目與其他詞條——所以改審核狀態、改別題、改無關單字都不會讓簽核失效;改了被簽核的教學內容或音檔,指紋就會改變,檢查會失敗並提醒重新審核。
簽核當時的審核 HTML 的 SHA-256 只是證據(HTML 含審核狀態與版面,不能拿來判斷教學內容有沒有改變)。

用法:python3 tools/gsat_signoff.py check                       檢查 docs/gsat/signoffs/ 內所有簽核紀錄與現行資料是否一致(結束碼 0＝有效)
      python3 tools/gsat_signoff.py fingerprint 115-1           印出目前的內容指紋與審核項目數
      python3 tools/gsat_signoff.py draft 115-1 --reviewer 姓名 --date YYYY-MM-DD --html-sha 簽核當時HTML的SHA256 [--audio-scope 文字]
                                                                印出新簽核紀錄(JSON)到標準輸出,由人決定是否存檔"""
import argparse, copy, hashlib, importlib.util, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SIGNOFFS = ROOT / 'docs' / 'gsat' / 'signoffs'
AUDIO = ROOT / 'gsat' / 'audio'
META_KEYS = ('status', 'reviewer', 'reviewedAt', 'reviewNotes', 'aiFlags')
JS = """global.window={};
for (const f of ['data/vocab.js','data/ext_practice.js','data/audio_manifest.js','exam/exams.js','exam/answers.js','exam/explain.js','exam/vocab_index.js']) require(process.argv[1]+'/gsat/'+f);
const out=[];
for (const [k,e] of Object.entries(window.EXPLAIN)) {
  const [y,n]=k.split('-'); const ex=window.EXAMS.find(x=>x.year===y);
  for (const s of ex.sections) for (const g of s.groups) for (const q of g.questions) if (q.n==+n)
    out.push({key:k, year:y, n:+n, type:s.name, stem:q.stem, opts:q.opts, official:window.ANSWERS[y][q.n-1], e, ext:window.EXT_PRACTICE.filter(x=>x.forQuestion===k)});
}
console.log(JSON.stringify({items:out, vocab:window.VOCAB, index:window.VOCAB_INDEX, man:window.AUDIO_MANIFEST}));"""


def sheet_module():
    spec = importlib.util.spec_from_file_location('gsat_review_sheet', ROOT / 'tools' / 'gsat_review_sheet.py')
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m


def load_data():
    return json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)


def rows_of(data, key, audio_dir=AUDIO):
    """用審核表同一套程式產生該題的項目:回傳 [(項目 ID, 該列的發音檔或 None)]。"""
    sh = sheet_module()
    item = next(i for i in data['items'] if i['key'] == key)
    files = {(it['rate'], it['text'].strip()): it['file'] for it in data['man']['items'] if (audio_dir / it['file']).exists()}
    S = sh.Sheet(data, files, False)
    html = sh.build_question(S, item)
    rows = []
    for m in re.finditer(r'<div class="r" data-id="([^"]+)">(.*?)</div><div class="ctl">', html, re.S):
        f = re.search(r'data-f="([0-9a-f]+\.mp3)"', m.group(2))
        rows.append((sh.html.unescape(m.group(1)), f.group(1) if f else None))
    return rows


def fingerprint(data, key, audio_dir=AUDIO):
    item = next(i for i in data['items'] if i['key'] == key)
    e = item['e']; V = data['vocab']['entries']; F = data['vocab']['families']
    strip = lambda d: {k: v for k, v in d.items() if k not in META_KEYS}
    main = list(dict.fromkeys(e['words'] + [e['focus']] + [o['entry'] for o in e['options'].values()]))
    fam = {}
    for eid in main:
        for m in F[V[eid]['family']]['members']:
            if m not in main: fam[m] = {k: V[m][k] for k in ('id', 'hw', 'pos', 'zh')}
    rows = rows_of(data, key, audio_dir)
    audio = {rid: {'file': f, 'sha256': hashlib.sha256((audio_dir / f).read_bytes()).hexdigest()} for rid, f in rows if f}
    occ = {w: data['index']['entries'][w] for w in dict.fromkeys(e['words'] + [e['focus']])}
    body = {
        'question': {'key': key, 'stem': item['stem'], 'opts': item['opts'], 'official': item['official']},
        'explanation': strip(e),
        'entries': {eid: strip(V[eid]) for eid in main},
        'derivedWords': fam,
        'families': {V[eid]['family']: F[V[eid]['family']]['members'] for eid in main},
        'phrases': {p: data['vocab']['phrases'][p] for p in e['phrases']},
        'extension': [strip(x) for x in item['ext']],
        'occurrence': occ,
        'items': [rid for rid, _ in rows],
        'audio': audio,
    }
    return hashlib.sha256(json.dumps(body, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf8')).hexdigest()


def draft(data, key, reviewer, date, html_sha, audio_scope):
    rows = rows_of(data, key)
    buttons = [{'item': rid, 'file': f} for rid, f in rows if f]
    files = sorted({b['file'] for b in buttons})
    fp = fingerprint(data, key)
    return {
        'question': key,
        'status': 'passed',
        'reviewer': reviewer,
        'signedAt': date,
        'scope': f'{key[:3]} 學年度學測英文第 {key.split("-")[1]} 題:教學內容(中文翻譯、解題步驟、選項解析、單字與片語、文法補充、延伸練習)與對應發音。只限這一題;不含其他題目,也不含其餘音檔與其餘歷屆詞彙待審核紀錄。',
        'evidence': {'reviewHtmlSha256': html_sha, 'note': '簽核當時教師逐項審核的 HTML 的雜湊,僅為證據。HTML 含審核狀態與版面,內容是否改變以 contentFingerprint 判定。'},
        'contentFingerprint': {
            'algorithm': 'sha256(canonical JSON);計算方式見 tools/gsat_signoff.py 的 fingerprint()',
            'value': fp,
            'covers': '題目與選項與官方答案、詳解內容、引用的單字詞條、畫面列出的衍生字、片語、延伸練習、重點字的歷屆出題紀錄、每個發音按鈕對應的 mp3(檔名與檔案內容雜湊)、審核項目 ID 清單',
            'excludes': 'status / reviewer / reviewedAt / reviewNotes / aiFlags、各詞條與延伸題自己的 status、其他題目與其他詞條',
        },
        'items': [{'id': rid, 'result': 'passed'} for rid, _ in rows],
        'audio': {
            'scope': audio_scope,
            'approvedFiles': [{'file': f, 'sha256': hashlib.sha256((AUDIO / f).read_bytes()).hexdigest(), 'result': 'passed'} for f in files],
            'buttons': buttons,
            'buttonCount': len(buttons),
            'distinctFileCount': len(files),
            'totalAudioFiles': len(data['man']['items']),
            'notIncludedCount': len(data['man']['items']) - len(files),
            'notIncluded': '清單中其餘音檔不在本次簽核範圍,不得視為已通過。',
        },
        'vocabularyOccurrenceRecords': {
            'entry': data['items'][[i['key'] for i in data['items']].index(key)]['e']['focus'],
            'note': '三筆歷屆出題紀錄的人工裁定(skin-tight 排除、tight against 計入文章用字、tight schedule 計入正確答案)維持不變,正式裁定資料在 gsat/exam/vocab_reviews.js;本簽核不涉及其他詞條與其他待審核紀錄。',
        },
    }


def validate(rec, data, explain_entry=None, audio_dir=AUDIO):
    """回傳問題清單;空清單＝簽核紀錄與現行資料一致。"""
    bad = []; key = rec.get('question')
    for f in ('question', 'status', 'reviewer', 'signedAt', 'scope', 'evidence', 'contentFingerprint', 'items', 'audio'):
        if not rec.get(f): bad.append(f'簽核紀錄缺欄位:{f}')
    if bad: return bad
    if rec['status'] != 'passed' or not rec['reviewer'] or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', rec['signedAt']): bad.append('簽核紀錄的狀態、審核者或日期不完整')
    if not re.fullmatch(r'[0-9a-f]{64}', rec['evidence'].get('reviewHtmlSha256', '')): bad.append('缺少審核 HTML 的 SHA-256 證據')
    item = next((i for i in data['items'] if i['key'] == key), None)
    if item is None: return bad + [f'找不到題目 {key} 的詳解資料']
    e = item['e']
    if e['status'] != 'reviewed' or e.get('reviewer') != rec['reviewer'] or e.get('reviewedAt') != rec['signedAt'] or not (e.get('reviewNotes') or '').strip():
        bad.append(f'explain.js 的 {key} 審核欄位(status/reviewer/reviewedAt/reviewNotes)與簽核紀錄不一致或不完整')
    rows = rows_of(data, key, audio_dir)
    ids = [r for r, _ in rows]
    if sorted(x['id'] for x in rec['items']) != sorted(ids): bad.append('審核項目 ID 與現行資料產生的項目不一致(內容結構已改變,需重新審核)')
    if any(x['result'] != 'passed' for x in rec['items']): bad.append('有審核項目不是 passed')
    btn = {b['item']: b['file'] for b in rec['audio']['buttons']}
    if btn != {r: f for r, f in rows if f}: bad.append('發音按鈕與音檔的對應已改變(需重新審核)')
    approved = {a['file']: a['sha256'] for a in rec['audio']['approvedFiles']}
    if set(approved) != set(btn.values()) or rec['audio']['distinctFileCount'] != len(approved) or rec['audio']['buttonCount'] != len(btn): bad.append('簽核的音檔清單與按鈕對應不一致')
    for f, h in approved.items():
        p = audio_dir / f
        if not p.exists(): bad.append(f'簽核的音檔不存在:{f}')
        elif hashlib.sha256(p.read_bytes()).hexdigest() != h: bad.append(f'簽核的音檔內容已改變:{f}(需重新試聽)')
    if rec['audio']['totalAudioFiles'] != len(data['man']['items']) or rec['audio']['notIncludedCount'] != len(data['man']['items']) - len(approved):
        bad.append('音檔總數或「不在範圍」的數量與現行音檔清單不一致')
    if fingerprint(data, key, audio_dir) != rec['contentFingerprint']['value']:
        bad.append('內容指紋不一致:已簽核的教學內容、單字、延伸練習、歷屆紀錄或音檔在簽核後被修改,需重新審核')
    return bad


def unsigned_reviewed(data, signed_keys):
    """標為 reviewed 卻沒有簽核紀錄的題目(AI 產生的內容不能自己變成已審核)。"""
    return [i['key'] for i in data['items'] if i['e']['status'] == 'reviewed' and i['key'] not in signed_keys]


def main():
    ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest='cmd', required=True)
    sp.add_parser('check')
    f = sp.add_parser('fingerprint'); f.add_argument('key')
    d = sp.add_parser('draft'); d.add_argument('key'); d.add_argument('--reviewer', required=True); d.add_argument('--date', required=True); d.add_argument('--html-sha', required=True)
    d.add_argument('--audio-scope', default='只限本題教學內容對應的發音;清單中其餘音檔不在本次簽核範圍')
    a = ap.parse_args()
    data = load_data()
    if a.cmd == 'fingerprint':
        print(fingerprint(data, a.key), len(rows_of(data, a.key)), '個審核項目'); return
    if a.cmd == 'draft':
        print(json.dumps(draft(data, a.key, a.reviewer, a.date, a.html_sha, a.audio_scope), ensure_ascii=False, indent=1)); return
    bad = []
    files = sorted(SIGNOFFS.glob('*.json')) if SIGNOFFS.exists() else []
    signed = set()
    for p in files:
        rec = json.loads(p.read_text(encoding='utf8')); signed.add(rec.get('question'))
        b = validate(rec, data)
        bad += [f'{p.name}: {x}' for x in b]
    bad += [f'{k} 標為 reviewed,但沒有簽核紀錄' for k in unsigned_reviewed(data, signed)]
    print(f'檢查 {len(files)} 份簽核紀錄:' + ('全部有效' if not bad else f'{len(bad)} 個問題'))
    for b in bad: print('  ✗', b)
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
