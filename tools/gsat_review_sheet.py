#!/usr/bin/env python3
"""產生詳解人工審核表（HTML，可列印）：每題列出題目、選項、官方答案、詳解各欄位，以及審核檢核欄。
審核表含大考中心試題，權利尚未確認，所以輸出位置必須在版本庫「以外」，否則拒絕寫入。
用法：python3 tools/gsat_review_sheet.py --out /某個版本庫以外的資料夾 [--year 115]"""
import argparse, html, json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
CHECKS = ['答案與大考中心公布答案一致', '解題關鍵正確、讓學生看得懂判斷過程', '各選項分析正確（每個錯誤選項都說明了原因）', '重要單字、片語與搭配詞正確',
          '文法補充正確、不是湊數', '用語適合高中生，沒有誤導或過度簡化', '全部為原創寫法，沒有複製第三方解析']
JS = """
global.window={};
for (const f of ['exam/exams.js','exam/answers.js','exam/explain.js']) require(process.argv[1]+'/gsat/'+f);
const out=[];
for (const [k,e] of Object.entries(window.EXPLAIN)) {
  const [y,n]=k.split('-'); const ex=window.EXAMS.find(x=>x.year===y);
  for (const s of ex.sections) for (const g of s.groups) for (const q of g.questions) if (q.n==+n)
    out.push({key:k, type:s.name, stem:q.stem, opts:q.opts, official:window.ANSWERS[y][q.n-1], e});
}
console.log(JSON.stringify(out));
"""


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); ap.add_argument('--year')
    a = ap.parse_args()
    out = pathlib.Path(a.out).resolve()
    if out == ROOT or ROOT in out.parents:
        sys.exit('拒絕：審核表含試題，輸出位置必須在版本庫（' + str(ROOT) + '）以外。')
    out.mkdir(parents=True, exist_ok=True)
    items = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    items = [i for i in items if not a.year or i['key'].startswith(a.year + '-')]
    esc = html.escape
    rows = []
    for i in items:
        e = i['e']
        opts = ''.join(f'<li><b>({"ABCD"[k]})</b> {esc(o)}</li>' for k, o in enumerate(i['opts']))
        why = ''.join(f'<li><b>({L})</b> {esc(v)}</li>' for L, v in e['why'].items())
        words = ''.join(f'<li>{esc(w)}</li>' for w in e['words'])
        chk = ''.join(f'<li>☐ {esc(c)}</li>' for c in CHECKS)
        rows.append(f'''<section><h2>{esc(i["key"])}・{esc(i["type"])}　<small>官方答案:({i["official"]})　詳解答案:({esc(e["answer"])})　狀態:{esc(e["status"])}</small></h2>
<p class="q">{esc(i["stem"])}</p><ul class="opts">{opts}</ul>
<h3>解題關鍵</h3><p>{esc(e["key"])}</p><h3>各選項分析</h3><ul>{why}</ul><h3>重要單字與片語</h3><ul>{words}</ul><h3>文法補充</h3><p>{esc(e.get("grammar", "(缺)"))}</p>
<div class="review"><h3>審核</h3><ul class="chk">{chk}</ul><p>結論:☐ 通過（可改為 reviewed）　☐ 需修改</p><p>修改意見:<br><br><br></p><p>審核者:＿＿＿＿＿＿　日期:＿＿＿＿＿＿</p></div></section>''')
    doc = f'''<!doctype html><meta charset="utf-8"><title>詳解審核表</title>
<style>body{{font:15px/1.7 "Noto Sans TC",sans-serif;max-width:820px;margin:24px auto;padding:0 16px}}section{{page-break-after:always;border-bottom:2px solid #999;padding-bottom:16px}}
.q{{font-family:Georgia,serif;font-size:1.05em}}.opts{{list-style:none;padding-left:0;font-family:Georgia,serif}}.review{{background:#f3f3f3;padding:8px 14px;border-radius:8px}}.chk{{list-style:none;padding-left:0}}small{{font-weight:400;color:#555}}</style>
<h1>115 學年度學測英文詞彙題詳解審核表</h1><p><b>注意:</b>本文件含大學入學考試中心試題,使用權利尚未確認,請勿公開轉貼。詳解為原創草稿,未經審核前網站一律標示「草稿・待人工審核」。審核通過後,把 <code>gsat/exam/explain.js</code> 對應題目的 status 改為 reviewed 並填入 reviewer、reviewedAt。</p>{''.join(rows)}'''
    (out / 'explanation-review-sheet.html').write_text(doc, encoding='utf8')
    print(f'已輸出 {len(items)} 題到 {out / "explanation-review-sheet.html"}')


main()
