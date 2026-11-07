#!/usr/bin/env python3
"""產生詳解人工審核表（HTML，可列印）：每題列出題目、選項、官方答案、詳解各欄位，以及審核檢核欄。
審核表含大考中心試題，權利尚未確認，所以輸出位置必須在版本庫「以外」，否則拒絕寫入。
用法：python3 tools/gsat_review_sheet.py --out /某個版本庫以外的資料夾 [--year 115]"""
import argparse, html, json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
CHECKS = ['答案與大考中心公布答案一致', '解題關鍵說明了「怎麼判斷」,不是只寫「依上下文可知」', '四個選項都有分析,錯誤選項說明了為什麼不適合',
          '單字的詞性、中文、搭配詞、例句都正確自然', '文法補充與常考句型正確、不是湊數', '同字族、同義/反義、相似字辨析正確,三類沒有混用',
          '延伸練習每題只有一個正確答案,解析正確', '用語適合高中生,沒有誤導或過度簡化', '全部為原創寫法,沒有複製第三方解析']
JS = """
global.window={};
for (const f of ['data/vocab.js','data/ext_practice.js','exam/exams.js','exam/answers.js','exam/explain.js']) require(process.argv[1]+'/gsat/'+f);
const out=[];
for (const [k,e] of Object.entries(window.EXPLAIN)) {
  const [y,n]=k.split('-'); const ex=window.EXAMS.find(x=>x.year===y);
  for (const s of ex.sections) for (const g of s.groups) for (const q of g.questions) if (q.n==+n)
    out.push({key:k, type:s.name, stem:q.stem, opts:q.opts, official:window.ANSWERS[y][q.n-1], e, ext:window.EXT_PRACTICE.filter(x=>x.forQuestion===k)});
}
console.log(JSON.stringify({items:out, vocab:window.VOCAB}));
"""


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); ap.add_argument('--year')
    a = ap.parse_args()
    out = pathlib.Path(a.out).resolve()
    if out == ROOT or ROOT in out.parents:
        sys.exit('拒絕：審核表含試題，輸出位置必須在版本庫（' + str(ROOT) + '）以外。')
    out.mkdir(parents=True, exist_ok=True)
    data = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    items = [i for i in data['items'] if not a.year or i['key'].startswith(a.year + '-')]
    V = data['vocab']['entries']
    esc = html.escape
    rows, used = [], []
    for i in items:
        e = i['e']
        opts = ''.join(f'<li><b>({"ABCD"[k]})</b> {esc(o)}</li>' for k, o in enumerate(i['opts']))
        key = ''.join(f'<li>{esc(t)}</li>' for t in e['key'])
        why = ''.join(f'<li><b>({L}) {esc(V[o["entry"]]["hw"])}</b>({esc(V[o["entry"]]["pos"])} {esc(V[o["entry"]]["zh"])}):{esc(o["why"])}</li>' for L, o in e['options'].items())
        words = ''.join(f'<li>{esc(w)}</li>' for w in e['words']) + ''.join(f'<li>片語:{esc(data["vocab"]["phrases"][p]["t"])}({esc(data["vocab"]["phrases"][p]["zh"])})</li>' for p in e['phrases'])
        used += e['words'] + [o['entry'] for o in e['options'].values()] + [e['focus']]
        ext = ''.join(f'<li><b>{esc(x["id"])}({esc(x["type"])})</b> {esc(x["q"])}<br>選項:' + ' / '.join(f'({"ABCD"[k]}) {esc(t)}' for k, t in enumerate(x['options'])) + f'<br>答案:({"ABCD"[x["answer"]]})　解析:{esc(x["explain"])}</li>' for x in i['ext'])
        chk = ''.join(f'<li>☐ {esc(c)}</li>' for c in CHECKS)
        rows.append(f'''<section><h2>{esc(i["key"])}・{esc(i["type"])}　<small>官方答案:({i["official"]})　詳解答案:({esc(e["answer"])})　狀態:{esc(e["status"])}</small></h2>
<p class="q">{esc(i["stem"])}</p><ul class="opts">{opts}</ul>
<h3>解題關鍵</h3><ol>{key}</ol><h3>選項解析</h3><ul>{why}</ul><h3>重要單字與片語</h3><ul>{words}</ul><h3>常考句型</h3><ul>{''.join(f'<li>{esc(t)}</li>' for t in e['patterns'])}</ul><h3>文法補充</h3><p>{esc(e.get("grammar", "(缺)"))}</p>
<h3>延伸練習(待審核草稿)</h3><ol>{ext}</ol>
<div class="review"><h3>審核</h3><ul class="chk">{chk}</ul><p>結論:☐ 通過（可改為 reviewed）　☐ 需修改</p><p>修改意見:<br><br><br></p><p>審核者:＿＿＿＿＿＿　日期:＿＿＿＿＿＿</p></div></section>''')
    vrows = []
    for eid in dict.fromkeys(used):
        v = V[eid]
        vrows.append(f'<tr><td><b>{esc(v["hw"])}</b> {esc(v["pos"])}<br>{esc(v["zh"])}</td><td>詞形(A):{esc("、".join(v["forms"]))}<br>另有詞性:{esc(v["alsoPos"] or "—")}</td>'
                     f'<td>{"<br>".join(esc(c["t"]) + "(" + esc(c["zh"]) + ")" for c in v["coll"])}</td><td>{"<br>".join(esc(x["en"]) + "<br>" + esc(x["zh"]) for x in v["ex"])}</td>'
                     f'<td>字族(B):{esc("、".join(m for m in data["vocab"]["families"][v["family"]]["members"] if m != eid)) or "—"}<br>同義:{esc("、".join(x["w"] for x in v["rel"]["syn"])) or "—"}<br>反義:{esc("、".join(x["w"] for x in v["rel"]["ant"])) or "—"}<br>辨析:{esc("；".join(x["w"] + ":" + x["note"] for x in v["rel"]["confusable"])) or "—"}</td><td>☐ 正確　☐ 需修改</td></tr>')
    vocab_tbl = '<h2>附:引用到的單字詞條(請一併審核)</h2><table><tr><th>詞條</th><th>詞形/詞性</th><th>搭配詞</th><th>原創例句</th><th>字族、同反義、辨析(三類分開)</th><th>審核</th></tr>' + ''.join(vrows) + '</table>'
    doc = f'''<!doctype html><meta charset="utf-8"><title>詳解審核表</title>
<style>body{{font:15px/1.7 "Noto Sans TC",sans-serif;max-width:980px;margin:24px auto;padding:0 16px}}section{{page-break-after:always;border-bottom:2px solid #999;padding-bottom:16px}}
.q{{font-family:Georgia,serif;font-size:1.05em}}.opts{{list-style:none;padding-left:0;font-family:Georgia,serif}}.review{{background:#f3f3f3;padding:8px 14px;border-radius:8px}}.chk{{list-style:none;padding-left:0}}small{{font-weight:400;color:#555}}
table{{border-collapse:collapse;width:100%;font-size:13px}}td,th{{border:1px solid #999;padding:6px;vertical-align:top}}</style>
<h1>學測英文詳解審核表(schema 2)</h1><p><b>注意:</b>本文件含大學入學考試中心試題,使用權利尚未確認,請勿公開轉貼。詳解、單字詞條與延伸練習都是 AI 撰寫的原創草稿,未經審核前網站一律標示「草稿・待人工審核」。審核通過後,把 <code>gsat/exam/explain.js</code> 對應題目的 status 改為 reviewed 並填入 reviewer、reviewedAt。</p>{''.join(rows)}{vocab_tbl}'''
    (out / 'explanation-review-sheet.html').write_text(doc, encoding='utf8')
    print(f'已輸出 {len(items)} 題到 {out / "explanation-review-sheet.html"}')


main()
