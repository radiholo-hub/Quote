#!/usr/bin/env python3
"""產生「單字出現紀錄」待審核表（HTML）：列出每一筆詞性有疑義的比對與所在的題目上下文，讓審核者勾選「詞性與字義正確／不是這個詞條」。
含大考中心試題，權利尚未確認，輸出位置必須在版本庫以外。審核後把結果填進 gsat/exam/vocab_reviews.js（編號見表中），再重新執行 tools/build_vocab_index.py。
用法：python3 tools/gsat_vocab_review_sheet.py --out /某個版本庫以外的資料夾"""
import argparse, html, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
JS = """global.window={};for (const f of ['data/vocab.js','exam/exams.js','exam/answers.js','exam/vocab_index.js']) require(process.argv[1]+'/gsat/'+f);
console.log(JSON.stringify({vocab:window.VOCAB,exams:window.EXAMS,index:window.VOCAB_INDEX}));"""


def find(exams, r):
    ex = next(e for e in exams if e['year'] == r['y'])
    for sec in ex['sections']:
        for g in sec['groups']:
            nums = [q['n'] for q in g['questions']]
            if r['t'] == 'vocab':
                unit = f"{r['y']}:vocab:{nums[0]}"
            else:
                unit = f"{r['y']}:{sec['type']}:{nums[0]}-{nums[-1]}"
            if unit != r['u']: continue
            if r['role'] == 'passage':
                return g['passage'][int(re.search(r'\d+', r['loc']).group()) - 1]
            if sec['type'] in ('bank', 'structure'):
                return g['bank']['ABCDEFGHIJ'.index(r['loc'].split('(')[1][0])]
            q = next(q for q in g['questions'] if q['n'] == r['n'])
            if r['role'] == 'stem': return q['stem']
            return f"{q.get('stem', '')}\n" + '\n'.join(f"({'ABCD'[i]}) {o}" for i, o in enumerate(q['opts']))
    return ''


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); a = ap.parse_args()
    out = pathlib.Path(a.out).resolve()
    if out == ROOT or ROOT in out.parents:
        sys.exit('拒絕：待審核表含試題，輸出位置必須在版本庫（' + str(ROOT) + '）以外。')
    out.mkdir(parents=True, exist_ok=True)
    d = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    rows, n = [], 0
    for eid, e in d['index']['entries'].items():
        ent = d['vocab']['entries'][eid]
        for r in e['review']:
            n += 1
            ctx = html.escape(find(d['exams'], r))
            for f in r['f']: ctx = re.sub(r'(?i)\b(%s)\b' % re.escape(f), r'<mark>\1</mark>', ctx)
            why = {'pos': '詞性有疑義:' + ent['amb'].get(r['f'][0].lower(), ''), 'compound': '位於連字號複合詞內'}[r['r']]
            rows.append(f'<tr><td>{n}</td><td><b>{html.escape(eid)}</b><br>{html.escape(ent["pos"])} {html.escape(ent["zh"])}</td><td>{r["y"]} {html.escape(r["t"])}<br>{html.escape(r["loc"])}<br>角色:{html.escape(r["role"])}</td>'
                        f'<td>{html.escape(why)}</td><td class="c">{ctx}</td><td>☐ 計入(詞性與字義正確)<br>☐ 排除(不是這個詞條)</td><td><code>{html.escape(r["k"])}</code></td></tr>')
    doc = f'''<!doctype html><meta charset="utf-8"><title>單字出現紀錄待審核表</title>
<style>body{{font:14px/1.6 "Noto Sans TC",sans-serif;margin:16px}}table{{border-collapse:collapse;width:100%}}td,th{{border:1px solid #999;padding:6px;vertical-align:top}}.c{{font-family:Georgia,serif;white-space:pre-wrap;max-width:420px}}mark{{background:#ffe27a}}code{{font-size:11px;word-break:break-all}}</style>
<h1>單字出現紀錄待審核表({n} 筆)</h1><p><b>注意:</b>含大考中心試題,使用權利尚未確認,請勿公開轉貼。審核後,把編號與結果填進 <code>gsat/exam/vocab_reviews.js</code>:<code>"編號": {{"verdict": "confirmed 或 rejected", "by": "審核者", "at": "日期"}}</code>,再執行 <code>python3 tools/build_vocab_index.py</code>。</p>
<table><tr><th>#</th><th>詞條</th><th>位置</th><th>為什麼待審核</th><th>上下文(黃底是比對到的字)</th><th>審核</th><th>編號</th></tr>{''.join(rows)}</table>'''
    (out / 'vocab-review-sheet.html').write_text(doc, encoding='utf8')
    print(f'已輸出 {n} 筆待審核到 {out / "vocab-review-sheet.html"}')


main()
