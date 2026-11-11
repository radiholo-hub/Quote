#!/usr/bin/env python3
"""產生「教師逐項審核介面」(單一 HTML 檔,手機/桌機皆可):每一題拆成很多「項目」,每個項目都可以獨立
  ‧ 標記 通過 / 需修改 / 待確認(預設待確認,AI 草稿不會被自動標成通過)
  ‧ 寫意見
  ‧ 直接改文字(輸入框一開始就是目前的內容,改過的會標示並在匯出時列出「原文／改後」)
  ‧ 有發音的項目(單字、搭配詞、例句、衍生字)可直接播放,並可標記「發音正常／有問題」
項目包含:題目與官方答案、中文翻譯、每一個解題步驟、四個選項各自的判斷、每個單字的詞性字義、詞形變化、每個搭配詞、每個例句、
每個衍生字、同義/反義/易混淆字、句型與文法、歷屆出題紀錄(每一筆)、每一題延伸練習,最後有「整題結論」。
選擇只暫存在這個瀏覽器(localStorage),按「匯出」得到純文字,貼回給開發者即可;這個工具不會改動任何資料檔。
審核表含大考中心試題,權利尚未確認,輸出位置必須在版本庫「以外」,否則拒絕寫入。
用法:python3 tools/gsat_review_sheet.py --out /某個版本庫以外的資料夾 [--q 115-1] [--year 115] [--no-audio]
      --q 只輸出單一題(檔名 review-<題號>.html);不加則輸出全部 explanation-review-sheet.html
      預設把用到的 mp3 內嵌(base64),單一檔案離線可播;--no-audio 則不內嵌。"""
import argparse, base64, html, json, math, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
JS = """
global.window={};
for (const f of ['data/vocab.js','data/ext_practice.js','data/audio_manifest.js','exam/exams.js','exam/answers.js','exam/explain.js','exam/vocab_index.js']) require(process.argv[1]+'/gsat/'+f);
const out=[];
for (const [k,e] of Object.entries(window.EXPLAIN)) {
  const [y,n]=k.split('-'); const ex=window.EXAMS.find(x=>x.year===y);
  for (const s of ex.sections) for (const g of s.groups) for (const q of g.questions) if (q.n==+n)
    out.push({key:k, year:y, n:+n, type:s.name, stem:q.stem, opts:q.opts, official:window.ANSWERS[y][q.n-1], e, ext:window.EXT_PRACTICE.filter(x=>x.forQuestion===k)});
}
console.log(JSON.stringify({items:out, vocab:window.VOCAB, index:window.VOCAB_INDEX, man:window.AUDIO_MANIFEST}));
"""
ROLE = {'answer': '正確答案', 'distractor': '干擾選項', 'stem': '題幹', 'passage': '文章用字'}
esc = html.escape
CSS = """
body{font:15px/1.65 -apple-system,"Noto Sans TC","PingFang TC",sans-serif;max-width:980px;margin:0 auto;padding:12px 14px 120px;color:#1c2330;background:#f6f7f9}
h1{font-size:1.3rem}h2{font-size:1.15rem;margin:28px 0 6px;padding-top:10px;border-top:3px solid #8a94a6}h3{font-size:1.02rem;margin:20px 0 6px;color:#1f3a6e}h4{margin:14px 0 4px;font-size:.98rem}
.note{color:#5d6778;font-size:.86rem}.warn{background:#fff4d6;border-left:4px solid #e0a800;padding:6px 12px;margin:8px 0}
.q{font-family:Georgia,serif;font-size:1.08em;margin:.3em 0}.opts{list-style:none;padding-left:0;font-family:Georgia,serif;margin:.2em 0}.opts li.ans{background:#e7f6ea}
.zhs{font:13px "Noto Sans TC",sans-serif;color:#555}
.r{background:#fff;border:1px solid #d3d9e3;border-radius:10px;padding:8px 10px;margin:8px 0;display:grid;gap:6px}
.r.edited{border-color:#c07a00;box-shadow:inset 3px 0 0 #c07a00}.r.s-通過{border-left:5px solid #12703a}.r.s-需修改{border-left:5px solid #b3261e}.r.s-待確認{border-left:5px solid #b8bfcc}
.lab{font-size:.8rem;color:#5d6778}.body{display:flex;gap:8px;align-items:flex-start}.body textarea,.body .ro{flex:1;min-width:0;box-sizing:border-box}
textarea{width:100%;font:inherit;border:1px solid #c5ccd8;border-radius:8px;padding:6px 8px;background:#fcfcfd;color:inherit;resize:vertical}
.ro{white-space:pre-wrap;overflow-wrap:anywhere;background:#f2f4f8;border-radius:8px;padding:6px 8px}
.ctl{display:flex;flex-wrap:wrap;gap:4px 14px;align-items:center;font-size:.88rem}.ctl label{display:inline-flex;gap:4px;align-items:center;min-height:30px}.ctl input.c{flex:1;min-width:140px;font:inherit;border:1px solid #c5ccd8;border-radius:6px;padding:3px 6px}
button{font:inherit;border:1px solid #b8bfcc;background:#fff;border-radius:8px;min-width:44px;min-height:40px;cursor:pointer}button.play{background:#1f5fbf;color:#fff;border-color:#1f5fbf;font-weight:700}button.on{background:#0c8f4a}
.rec td,.rec th{border:1px solid #c5ccd8;padding:3px 6px;font-size:.84rem}.rec{border-collapse:collapse;width:100%}.pend{background:#fff4d6}
#bar{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #b8bfcc;padding:8px 14px calc(8px + env(safe-area-inset-bottom,0px));display:flex;gap:8px;align-items:center;flex-wrap:wrap;z-index:5}
#bar span{flex:1;min-width:160px;font-size:.86rem}#exp{width:100%;height:160px;box-sizing:border-box}
.flag{background:#fff4d6;border-left:4px solid #e0a800;padding:4px 12px;margin:8px 0}.fin{background:#eef2f7;border-radius:10px;padding:8px 12px;margin-top:16px}
details>summary{cursor:pointer;font-weight:600;margin:6px 0}
"""
JSC = r"""
(function(){
var KEY='gsat-review2-'+location.pathname, S={}; try{S=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
var au=new Audio(),cur=null,urls={};
function src(f){if(typeof DATA==='undefined'||!DATA[f])return 'audio/'+f;if(urls[f])return urls[f];var b=atob(DATA[f]),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return urls[f]=URL.createObjectURL(new Blob([u],{type:'audio/mpeg'}));}
function mark(){document.querySelectorAll('button.play').forEach(function(b){var on=cur&&b.dataset.f===cur&&!au.paused;b.textContent=on?'■':'▶';b.classList.toggle('on',!!on)})}
au.onended=function(){cur=null;mark()};
document.addEventListener('click',function(e){var b=e.target.closest('button.play');if(!b)return;var f=b.dataset.f;
 if(cur===f&&!au.paused){au.pause();au.currentTime=0;cur=null;mark();return}
 au.pause();cur=f;au.src=src(f);au.currentTime=0;var p=au.play();if(p&&p.catch)p.catch(function(){cur=null;mark()});mark()});
function size(t){t.style.height='auto';t.style.height=Math.min(400,t.scrollHeight+4)+'px'}
function count(){var c={通過:0,需修改:0,待確認:0},ed=0;document.querySelectorAll('.r[data-id]').forEach(function(r){var s=(S[r.dataset.id]||{}).s||'待確認';c[s]++;if(r.classList.contains('edited'))ed++});
 document.getElementById('cnt').textContent='通過 '+c.通過+'・需修改 '+c.需修改+'・待確認 '+c.待確認+'・已改文字 '+ed}
document.querySelectorAll('.r[data-id]').forEach(function(r){var id=r.dataset.id,s=S[id]=S[id]||{};
 function paint(){r.className=r.className.replace(/ ?s-\S+/g,'')+' s-'+(s.s||'待確認')}
 var ta=r.querySelector('textarea');
 if(ta){if(s.t!=null)ta.value=s.t;size(ta);r.classList.toggle('edited',ta.value!==ta.dataset.orig);ta.addEventListener('input',function(){s.t=ta.value;r.classList.toggle('edited',ta.value!==ta.dataset.orig);size(ta);save();count()})}
 r.querySelectorAll('input[type=radio]').forEach(function(x){var k=x.dataset.k;if(s[k]?x.value===s[k]:x.defaultChecked)x.checked=true;x.addEventListener('change',function(){s[k]=x.value;paint();save();count()})});
 var c=r.querySelector('input.c');if(c){if(s.c)c.value=s.c;c.addEventListener('input',function(){s.c=c.value;save()})}
 paint()});
document.querySelectorAll('.fin input[data-meta]').forEach(function(i){var k='meta:'+i.dataset.meta;if(S[k])i.value=S[k];i.addEventListener('input',function(){S[k]=i.value;save()})});
count();
document.getElementById('btn').onclick=function(){var L=[],q={};
 document.querySelectorAll('.r[data-id]').forEach(function(r){var id=r.dataset.id,s=S[id]||{},ta=r.querySelector('textarea'),ed=ta&&ta.value!==ta.dataset.orig;
  if((s.s&&s.s!=='待確認')||s.c||ed||(s.a&&s.a!=='待聽')){
   var l='['+id+'] '+(r.querySelector('.lab').textContent)+'\n  狀態:'+(s.s||'待確認');if(s.a&&s.a!=='待聽')l+='　發音:'+s.a;if(s.c)l+='\n  意見:'+s.c;if(ed)l+='\n  原文:'+ta.dataset.orig.replace(/\n/g,' ⏎ ')+'\n  改後:'+ta.value.replace(/\n/g,' ⏎ ');L.push(l)}});
 var m=[];document.querySelectorAll('.fin input[data-meta]').forEach(function(i){if(i.value)m.push(i.dataset.meta+':'+i.value)});
 document.getElementById('exp').value='審核匯出('+document.getElementById('cnt').textContent+')'+(m.length?'\n'+m.join('　'):'')+'\n'+(L.join('\n')||'(尚未標記或修改任何項目)')};
document.getElementById('clr').onclick=function(){if(document.getElementById('clr').dataset.arm!=='1'){document.getElementById('clr').dataset.arm='1';document.getElementById('clr').textContent='再按一次確認清除';return}
 try{localStorage.removeItem(KEY)}catch(e){}location.reload()};
})();
"""


class Sheet:
    def __init__(self, data, files, embed):
        self.d, self.files, self.embed, self.audio_used = data, files, embed, set()
        self.names = set(files.values())
        self.V = data['vocab']['entries']

    def row(self, rid, label, text, editable=True, audio=None, radios=True):
        a = ''
        if audio and audio in self.names:
            self.audio_used.add(audio)
            a = (f'<button class="play" data-f="{audio}" aria-label="播放">▶</button>')
        if editable:
            rows = max(2, min(8, math.ceil(len(text) / 34) + text.count('\n')))
            body = f'<textarea rows="{rows}" data-orig="{esc(text, quote=True)}">{esc(text)}</textarea>'
        else:
            body = f'<div class="ro">{esc(text)}</div>'
        ctl = ''
        if radios:
            ctl = ''.join(f'<label><input type="radio" name="{esc(rid)}-s" data-k="s" value="{v}"{" checked" if v == "待確認" else ""}> {v}</label>' for v in ('通過', '需修改', '待確認'))
        if audio and audio in self.names:
            ctl += '<span class="note">發音:</span>' + ''.join(f'<label><input type="radio" name="{esc(rid)}-a" data-k="a" value="{v}"{" checked" if v == "待聽" else ""}> {v}</label>' for v in ('待聽', '正常', '有問題'))
        ctl += '<input class="c" placeholder="意見(選填)" aria-label="意見">'
        return f'<div class="r" data-id="{esc(rid)}"><div class="lab">{esc(label)}</div><div class="body">{a}{body}</div><div class="ctl">{ctl}</div></div>'

    def audio_of(self, text):
        return self.files.get(('normal', text.strip()))

    def entry_rows(self, k, eid, full=True):
        v = self.V[eid]; F = self.d['vocab']['families']; V = self.V
        P = f'{k}:w:{eid}'
        out = [f'<h4>{esc(v["hw"])} <span class="zhs">{esc(v["pos"])} {esc(v["zh"])}</span></h4>']
        out.append(self.row(P + ':def', f'{v["hw"]}・詞性與中文字義', f'{v["hw"]}  {v["pos"]}  {v["zh"]}', audio=self.audio_of(v['hw'])))
        out.append(self.row(P + ':forms', f'{v["hw"]}・詞形變化(A,同一詞條)', '、'.join(v['forms'])))
        if v['alsoPos']: out.append(self.row(P + ':also', f'{v["hw"]}・另有詞性/字義', v['alsoPos']))
        if v.get('note'): out.append(self.row(P + ':note', f'{v["hw"]}・字義補充', v['note']))
        for i, c in enumerate(v['coll']): out.append(self.row(f'{P}:coll{i + 1}', f'{v["hw"]}・搭配詞 {i + 1}', f'{c["t"]}({c["zh"]})', audio=self.audio_of(c['t'])))
        for i, x in enumerate(v['ex']): out.append(self.row(f'{P}:ex{i + 1}', f'{v["hw"]}・原創例句 {i + 1}', f'{x["en"]}\n{x["zh"]}', audio=self.audio_of(x['en'])))
        for m in F[v['family']]['members']:
            if m == eid: continue
            mv = V[m]; out.append(self.row(f'{P}:fam:{m}', f'{v["hw"]}・字族衍生字(B,獨立詞條)', f'{mv["hw"]}  {mv["pos"]}  {mv["zh"]}', audio=self.audio_of(mv['hw'])))
        rel = v['rel']
        for kind, name in (('syn', '同義字'), ('ant', '反義字')):
            if rel[kind]: out.append(self.row(f'{P}:{kind}', f'{v["hw"]}・{name}(C)', '、'.join(f'{x["w"]}({x["zh"]})' for x in rel[kind])))
        for i, x in enumerate(rel['confusable']): out.append(self.row(f'{P}:conf{i + 1}', f'{v["hw"]}・易混淆字辨析(C) {i + 1}', f'{x["w"]}:{x["note"]}'))
        return ''.join(out)

    def records(self, k, eid):
        I = self.d['index']['entries'][eid]; v = self.V[eid]; per = '、'.join(f'{y} 年 {c} 次' for y, c in I['perYear'].items()) or '無已確認紀錄'
        r = I['role']
        out = [f'<h4>{esc(v["hw"])} <span class="zhs">{esc(v["pos"])}</span></h4>']
        out.append(self.row(f'{k}:rec:{eid}:sum', f'{v["hw"]}・出題紀錄統計', f'已確認 {I["total"]} 次:正確答案 {r["answer"]}、干擾選項 {r["distractor"]}、題幹 {r["stem"]}、文章用字 {r["passage"]}(文章用字涉及 {I["passageUnits"]} 個題組單位;共用文章只算一次;文章用字不是「考過的答案」)。首次 {I["first"] or "—"}、最近 {I["last"] or "—"};逐年:{per}。待審核 {len(I["review"])} 筆(不計入)。', editable=False))
        for kind, lst in (('確認', I['records']), ('待審核', I['review'])):
            for j, rec in enumerate(lst):
                where = f'第 {rec["n"]} 題' if rec.get('n') else f'題組 {rec["qs"][0]}–{rec["qs"][-1]}(共用文章)'
                extra = ('詞性或字義有疑義,尚未計入' if rec['r'] == 'pos' else '位於連字號複合詞內,尚未計入') if kind == '待審核' else ('整個選項就是這個字' if rec.get('exact') else '')
                out.append(self.row(f'{k}:rec:{eid}:{kind}{j + 1}', f'{v["hw"]}・{kind}紀錄 {j + 1}', f'{rec["y"]} 學年度 {rec["t"]} {where} {rec["loc"]}|{ROLE[rec["role"]]}|{rec["c"]} 次{("|" + extra) if extra else ""}', editable=False))
        return ''.join(out)


def build_question(S, i):
    d, e, k, V = S.d, i['e'], i['key'], S.V
    h = [f'<h2 id="q{k}">{i["year"]} 學年度學科能力測驗　第 {i["n"]} 題・{esc(i["type"])}　<small class="note">詳解狀態:{esc(e["status"])}{("(教師已簽核:" + esc(str(e.get("reviewer"))) + "," + esc(str(e.get("reviewedAt"))) + ")") if e["status"] == "reviewed" else "(AI 草稿,未經人工審核)"}</small></h2>']
    if e['answer'] != i['official']: h.append('<p class="warn">⚠ 詳解答案與官方答案不一致!</p>')
    if e.get('aiFlags'): h.append('<div class="flag"><b>⚠ AI 自我檢查:較需要老師確認的地方</b><ul>' + ''.join(f'<li>{esc(x)}</li>' for x in e['aiFlags']) + '</ul></div>')
    opts = '\n'.join(f'({"ABCD"[j]}) {o}' + ('  ← 官方答案' if "ABCD"[j] == i['official'] else '') for j, o in enumerate(i['opts']))
    h.append('<h3>① 題目與官方答案</h3>' + S.row(f'{k}:q', '題目、選項與官方答案(請對照大考中心原卷)', f'{i["stem"]}\n{opts}\n官方答案:({i["official"]})', editable=False))
    h.append('<h3>② 中文翻譯(代入正確答案;AI 草稿)</h3>' + S.row(f'{k}:zh', '中文翻譯', e.get('zh', '(缺)')))
    h.append('<h3>③ 解題關鍵與判斷步驟(每一步分開審核)</h3>' + ''.join(S.row(f'{k}:key{n + 1}', f'解題步驟 {n + 1}', t) for n, t in enumerate(e['key'])))
    h.append('<h3>④ 四個選項的判斷(每個選項分開審核)</h3>' + ''.join(
        S.row(f'{k}:opt{L}', f'選項 ({L}) {V[o["entry"]]["hw"]}({V[o["entry"]]["pos"]} {V[o["entry"]]["zh"]}){" ✔官方答案" if L == i["official"] else ""}', o['why'], audio=S.audio_of(V[o['entry']]['hw'])) for L, o in e['options'].items()))
    ents = list(dict.fromkeys(e['words'] + [e['focus']] + [o['entry'] for o in e['options'].values()]))
    h.append('<h3>⑤ 單字、搭配詞、衍生字、例句(每一項分開審核,可聽發音)</h3><p class="note">先是本題的重點字,後面是其他選項的單字(它們目前多半沒有完整例句)。</p>' + ''.join(S.entry_rows(k, x) for x in ents))
    ph = ''.join(S.row(f'{k}:ph:{p}', '片語', f'{d["vocab"]["phrases"][p]["t"]}({d["vocab"]["phrases"][p]["zh"]})', audio=S.audio_of(d['vocab']['phrases'][p]['t'])) for p in e['phrases'])
    h.append('<h3>⑥ 片語、常考句型與文法補充</h3>' + ph + ''.join(S.row(f'{k}:pat{n + 1}', f'常考句型 {n + 1}', t) for n, t in enumerate(e['patterns'])) + S.row(f'{k}:gram', '文法補充', e.get('grammar', '(缺)')))
    meta = d['index']['meta']
    h.append(f'<h3>⑦ 歷屆出題紀錄(每一筆分開審核)</h3><p class="note">範圍:{esc(meta["scope"])}{esc(meta["notice"])}</p>' + ''.join(S.records(k, x) for x in dict.fromkeys(e['words'] + [e['focus']])))
    ex = []
    for x in i['ext']:
        txt = f'{x["q"]}\n' + '\n'.join(f'({"ABCD"[j]}) {t}' for j, t in enumerate(x['options'])) + f'\n答案:({"ABCD"[x["answer"]]})\n解析:{x["explain"]}'
        ex.append(S.row(f'{k}:ext:{x["id"]}', f'延伸練習 {x["id"]}({x["type"]};待審核草稿)', txt))
    h.append('<h3>⑧ 原創延伸練習與答案(每一題分開審核)</h3>' + ''.join(ex))
    h.append(f'<div class="fin"><b>整題結論</b>' + S.row(f'{k}:final', f'{k} 整題結論(建議所有項目都通過後才選「通過」)', '', editable=False) + '</div>')
    return ''.join(h)


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); ap.add_argument('--year'); ap.add_argument('--q'); ap.add_argument('--no-audio', action='store_true')
    a = ap.parse_args()
    out = pathlib.Path(a.out).resolve()
    if out == ROOT or ROOT in out.parents:
        sys.exit('拒絕：審核表含試題，輸出位置必須在版本庫（' + str(ROOT) + '）以外。')
    out.mkdir(parents=True, exist_ok=True)
    data = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    items = sorted([i for i in data['items'] if (not a.year or i['key'].startswith(a.year + '-')) and (not a.q or i['key'] == a.q)], key=lambda i: (i['year'], i['n']))
    if not items: sys.exit('沒有符合的題目')
    files = {(it['rate'], it['text'].strip()): it['file'] for it in data['man']['items']}
    files = {k: v for k, v in files.items() if (ROOT / 'gsat' / 'audio' / v).exists()}
    allf = {v for v in files.values()}
    S = Sheet(data, files, not a.no_audio)
    body = ''.join(build_question(S, i) for i in items)
    toc = ''.join(f'<li><a href="#q{i["key"]}">{i["key"]}</a>　{esc(i["stem"][:44])}…　<b>官方({i["official"]})</b></li>' for i in items)
    DRAFT_NOTE = ('詳解、中文翻譯、單字詞條、原創例句與延伸練習都是 AI 撰寫的<b>草稿,尚未經人工審核</b>。' if all(i['e']['status'] != 'reviewed' for i in items)
                  else '詳解、中文翻譯、單字詞條、原創例句與延伸練習原為 AI 撰寫的草稿;<b>標示「教師已簽核」的題目以簽核紀錄(docs/gsat/signoffs/)為準,其餘仍是草稿、尚未經人工審核</b>。')
    emb = ''
    if not a.no_audio:
        emb = 'var DATA=' + json.dumps({f: base64.b64encode((ROOT / 'gsat' / 'audio' / f).read_bytes()).decode() for f in sorted(S.audio_used)}) + ';'
    doc = f'''<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>教師逐項審核介面</title><style>{CSS}</style>
<h1>學測英文詳解・教師逐項審核介面({len(items)} 題)</h1>
<p class="warn"><b>注意:</b>本文件含大學入學考試中心試題,使用權利尚未確認,請勿公開轉貼。{DRAFT_NOTE}</p>
<p>每個灰色/白色方塊是一個<b>獨立的審核項目</b>:選「通過／需修改／待確認」(預設待確認)、寫意見、或直接把輸入框裡的文字改成你要的版本(改過的方塊左邊會出現橘色線)。有 ▶ 的項目可以聽發音,並標記「正常／有問題」(音檔只有部分被人工試聽過、尚未全面驗收,所以逐項預設「待聽」,以你的標記為準)。
左邊顏色:綠＝通過、紅＝需修改、灰＝待確認。選擇會自動存在這個瀏覽器;畫面最下面按「匯出」得到文字,貼回給開發者即可,不會自動改動任何資料。</p>
<details><summary>題目清單</summary><ol>{toc}</ol></details>
{body}
<div class="fin"><b>審核者資料</b>　姓名:<input data-meta="審核者" size="10">　日期:<input data-meta="日期" size="10"></div>
<h3>匯出</h3><textarea id="exp" readonly placeholder="按下方「匯出」後,標記過或改過的項目會列在這裡"></textarea>
<div id="bar"><span id="cnt"></span><button id="btn">匯出</button><button id="clr">清除全部選擇</button></div>
<script>{emb}{JSC}</script></html>'''
    name = f'review-{a.q}.html' if a.q else 'explanation-review-sheet.html'
    (out / name).write_text(doc, encoding='utf8')
    print(f'已輸出 {len(items)} 題到 {out / name}({(out / name).stat().st_size / 1e6:.1f} MB,內嵌 {len(S.audio_used) if not a.no_audio else 0} 個音檔)')


if __name__ == '__main__':
    main()
