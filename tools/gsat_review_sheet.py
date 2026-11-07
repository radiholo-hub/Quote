#!/usr/bin/env python3
"""產生「教師審核表」（HTML，手機/桌機/列印皆可）：每題一頁，列出題目、四個選項、官方答案、中文翻譯、解題關鍵、四個選項分析、
重要單字（搭配詞、原創例句）、衍生字與詞性、歷屆出題紀錄、延伸練習與答案，並提供「通過／需修改／待確認」三種審核狀態。
審核表含大考中心試題，權利尚未確認，所以輸出位置必須在版本庫「以外」，否則拒絕寫入。
AI 草稿不會被標成已通過：審核狀態一律從「待確認」開始，只有審核者自己選了「通過」才算數；
審核表只在瀏覽器裡暫存選擇（localStorage）並可匯出文字，不會改動 gsat/exam/explain.js。
用法：python3 tools/gsat_review_sheet.py --out /某個版本庫以外的資料夾 [--year 115] [--q 115-1]
      --q 只輸出單一題（檔名 review-<題號>.html）；不加 --q 則輸出全部 explanation-review-sheet.html"""
import argparse, html, json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
CHECKS = ['答案與大考中心公布答案一致', '中文翻譯正確自然', '解題關鍵說明了「怎麼判斷」,不是只寫「依上下文可知」', '四個選項都有分析,錯誤選項說明了為什麼不適合',
          '單字的詞性、中文、搭配詞、原創例句都正確自然', '文法補充與常考句型正確、不是湊數', '字族(詞形變化、衍生字)、同義/反義、相似字辨析正確,三類沒有混用',
          '歷屆出題紀錄的數字與角色(正確答案/干擾選項/題幹/文章)合理', '延伸練習每題只有一個正確答案,解析正確', '用語適合高中生,沒有誤導或過度簡化', '全部為原創寫法,沒有複製第三方解析']
JS = """
global.window={};
for (const f of ['data/vocab.js','data/ext_practice.js','exam/exams.js','exam/answers.js','exam/explain.js','exam/vocab_index.js']) require(process.argv[1]+'/gsat/'+f);
const out=[];
for (const [k,e] of Object.entries(window.EXPLAIN)) {
  const [y,n]=k.split('-'); const ex=window.EXAMS.find(x=>x.year===y);
  for (const s of ex.sections) for (const g of s.groups) for (const q of g.questions) if (q.n==+n)
    out.push({key:k, year:y, n:+n, type:s.name, stem:q.stem, opts:q.opts, official:window.ANSWERS[y][q.n-1], e, ext:window.EXT_PRACTICE.filter(x=>x.forQuestion===k)});
}
console.log(JSON.stringify({items:out, vocab:window.VOCAB, index:window.VOCAB_INDEX}));
"""
ROLE = {'answer': '正確答案', 'distractor': '干擾選項', 'stem': '題幹', 'passage': '文章用字'}
esc = html.escape


def lis(items): return ''.join(f'<li>{x}</li>' for x in items)


def vocab_block(d, eid, full=True):
    V = d['vocab']['entries']; v = V[eid]; F = d['vocab']['families']
    fam = [m for m in F[v['family']]['members'] if m != eid]
    fam_html = lis(f'<b>{esc(V[m]["hw"])}</b> {esc(V[m]["pos"])} {esc(V[m]["zh"])}' for m in fam) or '<li>(此字族只有這個詞條)</li>'
    amb = '；'.join(esc(x) for x in v['amb'].values()) or '—'
    rel = v['rel']
    r_html = (f'<li>同義:{esc("、".join(x["w"] + "(" + x["zh"] + ")" for x in rel["syn"])) or "—"}</li>'
              f'<li>反義:{esc("、".join(x["w"] + "(" + x["zh"] + ")" for x in rel["ant"])) or "—"}</li>'
              f'<li>易混淆字辨析:{esc("；".join(x["w"] + ":" + x["note"] for x in rel["confusable"])) or "—"}</li>')
    coll = lis(f'{esc(c["t"])}({esc(c["zh"])})' for c in v['coll']) or '<li>—</li>'
    ex = lis(f'{esc(x["en"])}<br><span class="zh">{esc(x["zh"])}</span>' for x in v['ex']) or '<li>—</li>'
    return (f'<div class="vw"><h4>{esc(v["hw"])}　<small>{esc(v["pos"])} {esc(v["zh"])}</small></h4>'
            f'<div class="g2"><div><b>詞形變化(A)</b>:{esc("、".join(v["forms"]))}<br><b>另有詞性/字義</b>:{esc(v["alsoPos"] or "—")}<br><b>詞性疑義說明</b>:{amb}'
            f'<br><b>字義補充</b>:{esc(v.get("note", "") or "—")}<h5>搭配詞</h5><ul>{coll}</ul><h5>原創延伸例句</h5><ul>{ex}</ul></div>'
            f'<div><h5>字族衍生字與詞性(B,各自獨立詞條,不併入次數)</h5><ul>{fam_html}</ul><h5>語意相關(C,三類分開)</h5><ul>{r_html}</ul></div></div></div>')


def record_block(d, eid):
    I = d['index']; e = I['entries'][eid]; v = d['vocab']['entries'][eid]
    role = e['role']
    per = '、'.join(f'{y} 學年度 {c} 次' for y, c in e['perYear'].items()) or '無已確認紀錄'
    head = (f'<p><b>{esc(v["hw"])}</b>({esc(v["pos"])}):已確認出現 <b>{e["total"]}</b> 次;正確答案 {role["answer"]}、干擾選項 {role["distractor"]}、題幹 {role["stem"]}、文章用字 {role["passage"]}'
            f'(文章用字涉及 {e["passageUnits"]} 個題組單位,共用文章只算一個單位;文章用字<b>不是</b>「考過的答案」)。<br>'
            f'首次 {esc(e["first"] or "—")}、最近 {esc(e["last"] or "—")};逐年:{esc(per)}。<br>'
            f'<b>待審核 {len(e["review"])} 筆</b>(詞性或複合詞疑義,不計入上面的數字;另有 {len(e.get("rejected", []))} 筆人工排除)。</p>')
    rows = ''.join(f'<tr><td>{r["y"]}</td><td>{esc(r["t"])}</td><td>{esc(str(r.get("n") or ("題組 " + str(r["qs"][0]) + "–" + str(r["qs"][-1]))))}</td><td>{esc(r["loc"])}</td><td>{ROLE[r["role"]]}</td><td>{r["c"]}</td><td>{"整個選項就是這個字" if r.get("exact") else ""}</td></tr>' for r in e['records'])
    pend = ''.join(f'<tr class="pend"><td>{r["y"]}</td><td>{esc(r["t"])}</td><td>{esc(str(r.get("n") or ("題組 " + str(r["qs"][0]) + "–" + str(r["qs"][-1]))))}</td><td>{esc(r["loc"])}</td><td>{ROLE[r["role"]]}</td><td>{r["c"]}</td><td>待審核:{"詞性/字義疑義" if r["r"] == "pos" else "連字號複合詞"}(見詞性審核表)</td></tr>' for r in e['review'])
    tbl = ('<table class="rec"><tr><th>學年度</th><th>題型</th><th>題號</th><th>位置</th><th>角色</th><th>次數</th><th>備註</th></tr>' + rows + pend + '</table>') if (rows or pend) else '<p>(沒有任何紀錄)</p>'
    return head + tbl


def status_box(key, n_checks):
    name = 'st-' + key
    return (f'<div class="review" data-key="{key}"><h3>審核</h3><ul class="chk">' + ''.join(f'<li><label><input type="checkbox" data-chk> {esc(c)}</label></li>' for c in CHECKS) + '</ul>'
            f'<p class="stbar"><b>審核狀態:</b><label><input type="radio" name="{name}" value="通過"> 通過</label><label><input type="radio" name="{name}" value="需修改"> 需修改</label>'
            f'<label><input type="radio" name="{name}" value="待確認" checked> 待確認</label>(預設「待確認」;AI 草稿不會自動變成「通過」)</p>'
            f'<p>修改意見:<br><textarea rows="3" data-note placeholder="需修改或待確認的地方請寫在這裡"></textarea></p><p>審核者:<input data-by size="10">　日期:<input data-at size="10"></p></div>')


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); ap.add_argument('--year'); ap.add_argument('--q')
    a = ap.parse_args()
    out = pathlib.Path(a.out).resolve()
    if out == ROOT or ROOT in out.parents:
        sys.exit('拒絕：審核表含試題，輸出位置必須在版本庫（' + str(ROOT) + '）以外。')
    out.mkdir(parents=True, exist_ok=True)
    data = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    items = [i for i in data['items'] if (not a.year or i['key'].startswith(a.year + '-')) and (not a.q or i['key'] == a.q)]
    items.sort(key=lambda i: (i['year'], i['n']))
    if not items: sys.exit('沒有符合的題目')
    V = data['vocab']['entries']
    rows, toc = [], []
    for i in items:
        e = i['e']; k = i['key']
        zh_opts = lambda L, o: V[o['entry']]
        opts = ''.join(f'<li class="{"ans" if "ABCD"[j] == i["official"] else ""}"><b>({"ABCD"[j]})</b> {esc(o)}　<span class="zh">{esc(V[e["options"]["ABCD"[j]]["entry"]]["pos"])} {esc(V[e["options"]["ABCD"[j]]["entry"]]["zh"])}</span>{" ✔ 官方答案" if "ABCD"[j] == i["official"] else ""}</li>' for j, o in enumerate(i['opts']))
        key = ''.join(f'<li>{esc(t)}</li>' for t in e['key'])
        why = ''.join(f'<li><b>({L}) {esc(V[o["entry"]]["hw"])}</b>({esc(V[o["entry"]]["pos"])} {esc(V[o["entry"]]["zh"])}){" ✔" if L == i["official"] else ""}:{esc(o["why"])}</li>' for L, o in e['options'].items())
        phr = ''.join(f'<li>片語:{esc(data["vocab"]["phrases"][p]["t"])}({esc(data["vocab"]["phrases"][p]["zh"])})</li>' for p in e['phrases'])
        words = ''.join(vocab_block(data, w) for w in e['words'])
        others = [o['entry'] for L, o in e['options'].items() if o['entry'] not in e['words']]
        others_html = '<h4>其他三個選項的單字(供一併檢查)</h4>' + ''.join(vocab_block(data, w) for w in others) if others else ''
        recs = ''.join(f'<h4>{esc(V[w]["hw"])}</h4>' + record_block(data, w) for w in dict.fromkeys(e['words'] + [e['focus']]))
        meta = data['index']['meta']
        ext = ''.join(f'<li><b>{esc(x["id"])}({esc(x["type"])})</b> {esc(x["q"])}<br>選項:' + ' / '.join(f'({"ABCD"[j]}) {esc(t)}' for j, t in enumerate(x['options'])) + f'<br><b>答案:({"ABCD"[x["answer"]]})</b>　解析:{esc(x["explain"])}</li>' for x in i['ext'])
        flags = ('<div class="flag"><b>⚠ AI 自我檢查:較需要教師確認的地方</b><ul>' + ''.join(f'<li>{esc(x)}</li>' for x in e['aiFlags']) + '</ul></div>') if e.get('aiFlags') else ''
        mism = '' if e['answer'] == i['official'] else '<p class="bad">⚠ 詳解答案與官方答案不一致!</p>'
        toc.append(f'<li><a href="#q{k}">{esc(k)}</a>　{esc(i["stem"][:46])}…　<b>官方({i["official"]})</b></li>')
        rows.append(f'''<section id="q{k}"><h2>{i["year"]} 學年度學科能力測驗　第 {i["n"]} 題・{esc(i["type"])}　<small>詳解狀態:{esc(e["status"])}(AI 草稿)</small></h2>{mism}
<h3>① 題目與選項</h3><p class="q">{esc(i["stem"])}</p><ul class="opts">{opts}</ul>
<p><b>官方正確答案:({i["official"]})</b>　詳解答案:({esc(e["answer"])})　<span class="src">來源:大考中心 {i["year"]} 學年度學科能力測驗英文考科試卷與公布答案。</span></p>
<h3>② 中文翻譯(代入正確答案;AI 草稿)</h3><p class="zhbox">{esc(e.get("zh", "(缺)"))}</p>
{flags}<h3>③ 解題關鍵與判斷步驟</h3><ol>{key}</ol>
<h3>④ 四個選項分析</h3><ul>{why}</ul>
<h3>⑤ 重要單字、搭配詞、衍生字與原創例句</h3>{words}{others_html}<ul>{phr}</ul>
<h3>⑥ 常考句型與文法補充</h3><ul>{''.join(f'<li>{esc(t)}</li>' for t in e['patterns'])}</ul><p>{esc(e.get("grammar", "(缺)"))}</p>
<h3>⑦ 歷屆出題紀錄(106–115 學年度選擇題)</h3><p class="fine">範圍:{esc(meta["scope"])}{esc(meta["notice"])}</p>{recs}
<h3>⑧ 原創延伸練習與答案(待審核草稿)</h3><ol>{ext}</ol>
{status_box(k, len(CHECKS))}</section>''')
    doc = f'''<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>教師審核表</title>
<style>body{{font:15px/1.7 "Noto Sans TC",sans-serif;max-width:1000px;margin:16px auto;padding:0 14px}}section{{page-break-after:always;border-bottom:3px solid #999;padding-bottom:18px;margin-bottom:24px}}
.q{{font-family:Georgia,serif;font-size:1.1em}}.opts{{list-style:none;padding-left:0;font-family:Georgia,serif}}.opts li.ans{{background:#e7f6ea}}.zh{{font:13px "Noto Sans TC",sans-serif;color:#555}}.zhbox{{background:#f6f3e9;padding:8px 12px;border-radius:6px}}
.review{{background:#eef2f7;padding:8px 14px;border-radius:8px}}.chk{{list-style:none;padding-left:0}}.stbar label{{margin-right:14px}}small{{font-weight:400;color:#555}}.fine{{color:#666;font-size:13px}}.src{{color:#666;font-size:13px}}.bad{{color:#b00020;font-weight:700}}.flag{{background:#fff4d6;border-left:4px solid #e0a800;padding:4px 12px;margin:8px 0}}
table{{border-collapse:collapse;width:100%;font-size:13px}}td,th{{border:1px solid #999;padding:4px 6px;vertical-align:top}}tr.pend{{background:#fff4d6}}.vw{{border:1px solid #bbb;border-radius:8px;padding:6px 12px;margin:8px 0}}.g2{{display:grid;grid-template-columns:1fr 1fr;gap:14px}}
h4{{margin:10px 0 4px}}h5{{margin:8px 0 2px}}textarea{{width:100%;box-sizing:border-box}}#exp{{width:100%;height:120px}}
@media(max-width:700px){{.g2{{grid-template-columns:1fr}}body{{font-size:14px}}}}@media print{{.noprint{{display:none}}}}</style>
<h1>學測英文詳解・教師審核表({len(items)} 題)</h1>
<p><b>注意:</b>本文件含大學入學考試中心試題,使用權利尚未確認,請勿公開轉貼。詳解、中文翻譯、單字詞條、原創例句與延伸練習都是 AI 撰寫的草稿,<b>尚未經任何人工審核</b>;網站一律標示「草稿・待人工審核」。
審核狀態有「通過／需修改／待確認」三種,預設全是「待確認」。審核通過後,才由審核者把 <code>gsat/exam/explain.js</code> 對應題目的 status 改為 reviewed 並填入 reviewer、reviewedAt、reviewNotes。</p>
<div class="noprint"><ol>{''.join(toc)}</ol>
<p><button id="btn">匯出目前的審核選擇</button>(選擇只暫存在這個瀏覽器;匯出後請把文字貼回給開發者)</p><textarea id="exp" readonly></textarea></div>
{''.join(rows)}
<script>
(function(){{var KEY='gsat-review-'+location.pathname;var S={{}};try{{S=JSON.parse(localStorage.getItem(KEY)||'{{}}')}}catch(e){{}}
function save(){{try{{localStorage.setItem(KEY,JSON.stringify(S))}}catch(e){{}}}}
document.querySelectorAll('.review').forEach(function(box){{var k=box.dataset.key,s=S[k]=S[k]||{{}};
 box.querySelectorAll('input[type=radio]').forEach(function(r){{if(s.status)r.checked=(r.value===s.status);r.addEventListener('change',function(){{s.status=r.value;save()}})}});
 box.querySelectorAll('[data-chk]').forEach(function(c,i){{c.checked=!!(s.chk&&s.chk[i]);c.addEventListener('change',function(){{s.chk=s.chk||[];s.chk[i]=c.checked;save()}})}});
 [['data-note','note'],['data-by','by'],['data-at','at']].forEach(function(p){{var el=box.querySelector('['+p[0]+']');if(s[p[1]])el.value=s[p[1]];el.addEventListener('input',function(){{s[p[1]]=el.value;save()}})}})}});
document.getElementById('btn').onclick=function(){{var o=[];document.querySelectorAll('.review').forEach(function(box){{var k=box.dataset.key,s=S[k]||{{}};
 o.push(k+'|狀態:'+(s.status||'待確認')+'|已勾檢核:'+((s.chk||[]).filter(Boolean).length)+'/{len(CHECKS)}|審核者:'+(s.by||'')+'|日期:'+(s.at||'')+'|意見:'+(s.note||'').replace(/\\n/g,' '))}});document.getElementById('exp').value=o.join('\\n')}};}})();
</script></html>'''
    name = f'review-{a.q}.html' if a.q else 'explanation-review-sheet.html'
    (out / name).write_text(doc, encoding='utf8')
    print(f'已輸出 {len(items)} 題到 {out / name}')


main()
