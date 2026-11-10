#!/usr/bin/env python3
"""產生「學測語音試聽頁」(單一 HTML 檔,可直接用 iPhone Safari 開啟):單字、衍生字(字族)、片語/搭配詞、完整例句、文章正常速度、文章慢速。
每段音檔可獨立播放/停止/重播,同一時間只會播放一段;每段可標記「待審核/聽起來正常/有問題」並匯出文字,讓人工聆聽結果可以回報。
只含原創內容(單字、搭配詞、例句、原創模擬考文章);不含任何大考中心試題,所以輸出位置不受「版本庫以外」限制。
用法:python3 tools/gsat_audio_test_page.py --out 檔案.html [--embed]
      python3 tools/gsat_audio_test_page.py --out q1.html --embed --q 115-1   只列某一題教學內容用到的不同 mp3（需要本機有 gsat/exam/；輸出不含試題文字）
  --embed  把 mp3 內嵌成 base64(單一檔案,約 8 MB,離線也能播,適合傳給手機或發布成 Artifact)
  預設     以相對路徑引用 gsat/audio/*.mp3(放在 gsat/ 底下與網站一起用)"""
import argparse, base64, html, json, pathlib, subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
JS = """global.window={};for (const f of ['data/vocab.js','data/audio_manifest.js','data/mock.js']) require(process.argv[1]+'/gsat/'+f);
console.log(JSON.stringify({vocab:window.VOCAB,man:window.AUDIO_MANIFEST}));"""
esc = html.escape

CSS = """
/* 版面:單欄清單,一列一段音檔;配色偏中性藍灰,狀態用綠/橘/紅(語意色)區分 */
:root{--bg:#f6f7f9;--fg:#1c2330;--mute:#5d6778;--card:#ffffff;--line:#d9dee7;--accent:#1f5fbf;--accent-fg:#ffffff;--ok:#12703a;--warn:#9a5b00;--bad:#b3261e;--play:#e8f0fc}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#10141b;--fg:#e6eaf2;--mute:#9aa4b6;--card:#171d27;--line:#2b3442;--accent:#6aa3ff;--accent-fg:#0b1220;--ok:#5ad08a;--warn:#f0b255;--bad:#ff8a80;--play:#1d2a40;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#10141b;--fg:#e6eaf2;--mute:#9aa4b6;--card:#171d27;--line:#2b3442;--accent:#6aa3ff;--accent-fg:#0b1220;--ok:#5ad08a;--warn:#f0b255;--bad:#ff8a80;--play:#1d2a40;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font:15px/1.6 -apple-system,BlinkMacSystemFont,"Noto Sans TC","PingFang TC",sans-serif;padding-block:16px 96px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));max-width:760px;margin:0 auto}
h1{font-size:1.35rem;margin:.2em 0;text-wrap:balance}h2{font-size:1.05rem;margin:1.6em 0 .4em;text-wrap:balance}.note{color:var(--mute);font-size:.86rem}
.banner{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--warn);border-radius:8px;padding:8px 12px;margin:10px 0}
.row{display:grid;grid-template-columns:auto auto 1fr;gap:8px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:6px 0}
.row.on{background:var(--play);border-color:var(--accent)}.row .t{min-width:0;overflow-wrap:anywhere}.row .t small{display:block;color:var(--mute)}
.row .v{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:4px 12px;font-size:.82rem;color:var(--mute)}.row .v label{display:inline-flex;gap:4px;align-items:center;min-height:28px}
button{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:8px;min-width:44px;min-height:44px;cursor:pointer}
button.play{background:var(--accent);color:var(--accent-fg);border-color:var(--accent);font-weight:700}button:focus-visible,input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.dur{font-variant-numeric:tabular-nums}.fam{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:6px 0}.fam .m{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.fam .m button{min-width:0;padding:4px 12px}.fam .m button.on{background:var(--accent);color:var(--accent-fg)}
#bar{position:fixed;left:0;right:0;bottom:0;background:var(--card);border-top:1px solid var(--line);padding:8px max(16px,env(safe-area-inset-right,0px)) calc(8px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));display:flex;gap:8px;align-items:center}
#bar span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#exp{width:100%;min-height:120px;box-sizing:border-box;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:8px}
nav a{margin-right:12px;color:var(--accent)}
"""

JSCODE = """
(function(){
var au=new Audio();au.preload='none';var cur=null,urls={};
var bar=document.getElementById('now'),stopAll=document.getElementById('stopall');
function srcFor(f){if(typeof DATA==='undefined')return 'audio/'+f;if(urls[f])return urls[f];
 var b=atob(DATA[f]),n=b.length,u=new Uint8Array(n);for(var i=0;i<n;i++)u[i]=b.charCodeAt(i);return urls[f]=URL.createObjectURL(new Blob([u],{type:'audio/mpeg'}));}
function mark(){document.querySelectorAll('.on').forEach(function(e){e.classList.remove('on')});
 if(cur){document.querySelectorAll('[data-f="'+cur+'"]').forEach(function(e){(e.closest('.row')||e).classList.add('on');if(e.classList.contains('play'))e.classList.add('on')});}
 bar.textContent=cur?'播放中:'+(label[cur]||cur):'沒有在播放';document.querySelectorAll('button.play').forEach(function(b){b.textContent=(cur&&b.dataset.f===cur&&!au.paused)?'■':'▶'});}
function play(f,restart){
 if(cur===f&&!au.paused&&!restart){au.pause();au.currentTime=0;cur=null;mark();return;}
 au.pause();cur=f;au.src=srcFor(f);au.currentTime=0;var p=au.play();if(p&&p.catch)p.catch(function(){cur=null;mark();bar.textContent='無法播放(請再點一次)'});mark();}
au.addEventListener('ended',function(){cur=null;mark()});au.addEventListener('error',function(){bar.textContent='音檔載入失敗';cur=null;mark()});
document.addEventListener('click',function(e){var b=e.target.closest('button[data-f]');if(!b)return;play(b.dataset.f,b.dataset.act==='replay')});
stopAll.onclick=function(){au.pause();au.currentTime=0;cur=null;mark()};
var KEY='gsat-audio-review-v1',S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
document.querySelectorAll('input[type=radio][data-f]').forEach(function(r){if(S[r.dataset.f]&&S[r.dataset.f]===r.value)r.checked=true;r.addEventListener('change',function(){S[r.dataset.f]=r.value;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}})});
document.getElementById('exportbtn').onclick=function(){var o=[];Object.keys(label).forEach(function(f){var v=S[f]||'待審核';if(v!=='待審核')o.push(v+'|'+f+'|'+label[f])});
 var tot=Object.keys(label).length;document.getElementById('exp').value='已標記 '+o.length+' / '+tot+' 段(其餘仍是「待審核」)\\n'+o.join('\\n')};
mark();
})();
"""


def q_page(a):
    """單一題目的試聽頁：只列該題審核項目對應的不同 mp3，並依來源紀錄標示音檔來源。這只是音質檢查頁，不寫入任何簽核。"""
    import importlib.util, sys
    sys.path.insert(0, str(ROOT / 'tools')); import gsat_audio_provenance as prov
    spec = importlib.util.spec_from_file_location('gsat_signoff', ROOT / 'tools' / 'gsat_signoff.py'); so = importlib.util.module_from_spec(spec); spec.loader.exec_module(so)
    data = so.load_data(); rows = so.rows_of(data, a.q)
    use = {}
    for rid, f in rows:
        if f: use.setdefault(f, []).append(rid.split(':', 1)[1])
    man = {i['file']: i for i in data['man']['items']}
    pr = prov.load(); audio = ROOT / 'gsat' / 'audio'
    st = {f: prov.status_of(f, audio, pr) for f in use}
    if set(st.values()) != {'dev-test'}:
        sys.exit(f'這個頁面只用於 Azure F0 測試音檔的音質驗收；目前來源狀態是 {dict((k, list(st.values()).count(k)) for k in set(st.values()))}，不產生頁面。')
    dur = {}
    for f in use:
        r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(audio / f)], capture_output=True, text=True)
        try: dur[f] = float(r.stdout.strip())
        except ValueError: pass
    order = {'word': 0, 'phrase': 1, 'sentence': 2, 'passage': 3}; kn = {'word': '單字', 'phrase': '片語／搭配詞', 'sentence': '例句', 'passage': '文章'}
    files = sorted(use, key=lambda f: (order[man[f]['kind']], man[f]['text'].lower()))
    label = {}; rowsh = ''
    for n, f in enumerate(files, 1):
        it = man[f]; title = it['text'] if len(it['text']) <= 90 else it['text'][:90] + '…'; label[f] = f'{title}({it["kind"]}/{it["rate"]})'
        refs = '、'.join(sorted(set(use[f]))[:6]) + (' …' if len(set(use[f])) > 6 else '')
        dd = f'<span class="dur">{dur[f]:.1f} 秒</span>' if f in dur else ''
        radios = ''.join(f'<label><input type="radio" name="v-{f}" data-f="{f}" value="{v}"{" checked" if v == "待審核" else ""}> {v}</label>' for v in ('待審核', '聽起來正常', '有問題'))
        rowsh += (f'<div class="row"><button class="play" data-f="{f}" aria-label="播放 {esc(title)}">▶</button><button data-f="{f}" data-act="replay" aria-label="重播">↻</button>'
                  f'<div class="t">{n}. {esc(title)}<small>{kn[it["kind"]]}・{"慢速" if it["rate"] == "slow" else "正常速度"}・按鈕:{esc(refs)}・{f}</small></div><div class="v">{dd}<span>Azure Speech F0 · development-test audio</span>{radios}</div></div>')
    data_js = ''
    if a.embed: data_js = 'var DATA=' + json.dumps({f: base64.b64encode((audio / f).read_bytes()).decode() for f in files}) + ';'
    js = JSCODE.replace('gsat-audio-review-v1', f'gsat-audio-review-{a.q}-f0-v1')
    body = f'''<title>Q{a.q} 音檔試聽（Azure F0）</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>{CSS}</style>
<h1>第 {esc(a.q)} 題 音檔試聽</h1>
<div class="banner"><b>Azure Speech F0 · development-test audio</b><br>這 {len(files)} 個不同的 mp3 是本題教學內容會播放的音檔(共 {sum(len(v) for v in use.values())} 個播放按鈕),來源是 Azure AI Speech 免費層 F0,聲音 en-US-AriaNeural,正常 −8%、慢速 −35%。
<b>只供音質驗收:不是 production-approved、不可正式部署,本頁的標記也不會寫入教師簽核紀錄</b>(簽核需另外用付費層音檔重新聆聽)。標記只存在你這個瀏覽器,可用最下方「匯出標記」複製結果。</div>
<p class="note">單字 {sum(man[f]["kind"] == "word" for f in files)}、片語 {sum(man[f]["kind"] == "phrase" for f in files)}、例句 {sum(man[f]["kind"] == "sentence" for f in files)}、文章 {sum(man[f]["kind"] == "passage" for f in files)}。一次只會播放一段;再點同一段會停止,↻ 從頭重播。</p>
{rowsh}
<h2 id="x">匯出試聽標記</h2><button id="exportbtn" class="play" style="padding:0 16px">匯出標記</button><p><textarea id="exp" readonly placeholder="按「匯出標記」後,這裡會列出你標記為「聽起來正常」或「有問題」的項目"></textarea></p>
<div id="bar"><span id="now">沒有在播放</span><button id="stopall">■ 停止</button></div>
<script>{data_js}var label={json.dumps(label, ensure_ascii=False)};{js}</script>'''
    out = pathlib.Path(a.out)
    out.write_text('<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + body + '</html>', encoding='utf8')
    print(f'已輸出 {out}({out.stat().st_size / 1e6:.1f} MB),{len(files)} 個不同 mp3、{sum(len(v) for v in use.values())} 個播放按鈕')


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); ap.add_argument('--embed', action='store_true'); ap.add_argument('--q', default=None); a = ap.parse_args()
    if a.q: return q_page(a)
    d = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    V = d['vocab']; items = d['man']['items']
    byfile = {i['file']: i for i in items}
    dur = {}
    try:
        for i in items:
            r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(ROOT / 'gsat' / 'audio' / i['file'])], capture_output=True, text=True)
            dur[i['file']] = float(r.stdout.strip())
    except Exception:
        pass
    wordfile = {}
    for i in items:
        if i['kind'] == 'word': wordfile[i['text']] = i['file']
    label = {}

    def row(it, title, sub=''):
        f = it['file']; label[f] = f'{title}({it["kind"]}/{it["rate"]})'
        dd = f'<span class="dur">{dur[f]:.1f} 秒</span>' if f in dur else ''
        radios = ''.join(f'<label><input type="radio" name="v-{f}" data-f="{f}" value="{v}"{" checked" if v == "待審核" else ""}> {v}</label>' for v in ('待審核', '聽起來正常', '有問題'))
        return (f'<div class="row"><button class="play" data-f="{f}" aria-label="播放 {esc(title)}">▶</button><button data-f="{f}" data-act="replay" aria-label="重播">↻</button>'
                f'<div class="t">{esc(title)}{("<small>" + esc(sub) + "</small>") if sub else ""}</div><div class="v">{dd}{radios}</div></div>')

    words = [i for i in items if i['kind'] == 'word']
    ent_by_hw = {e['hw']: e for e in V['entries'].values()}
    sec_words = ''.join(row(i, i['text'], f'{ent_by_hw[i["text"]]["pos"]} {ent_by_hw[i["text"]]["zh"]}') for i in words)
    fam = ''
    for root, f in V['families'].items():
        mem = [m for m in f['members'] if V['entries'][m]['hw'] in wordfile]
        if len(mem) < 2: continue
        btns = ''
        for m in mem:
            e = V['entries'][m]; fi = wordfile[e['hw']]
            label.setdefault(fi, f'{e["hw"]}(word/normal)')
            btns += f'<button class="play" data-f="{fi}" aria-label="播放 {esc(e["hw"])}">▶</button>'.replace('>▶<', f'>▶ {esc(e["hw"])} <small>{esc(e["pos"])}</small><')
        fam += f'<div class="fam"><b>字族 {esc(root)}</b><div class="note">' + '、'.join(f'{esc(V["entries"][m]["hw"])} {esc(V["entries"][m]["pos"])} {esc(V["entries"][m]["zh"])}' for m in mem) + f'</div><div class="m">{btns}</div></div>'
    sec_phr = ''.join(row(i, i['text']) for i in items if i['kind'] == 'phrase')
    sec_sen = ''.join(row(i, i['text']) for i in items if i['kind'] == 'sentence')
    pas = [i for i in items if i['kind'] == 'passage']
    sec_pn = ''.join(row(i, '原創文章 ' + i['refs'][0].replace('mock:', ''), i['text'][:70] + '…') for i in pas if i['rate'] == 'normal')
    sec_ps = ''.join(row(i, '原創文章 ' + i['refs'][0].replace('mock:', ''), i['text'][:70] + '…') for i in pas if i['rate'] == 'slow')
    n = {k: sum(1 for i in items if i['kind'] == k) for k in ('word', 'phrase', 'sentence', 'passage')}
    data_js = ''
    if a.embed:
        data = {f: base64.b64encode((ROOT / 'gsat' / 'audio' / f).read_bytes()).decode() for f in label}
        data_js = 'var DATA=' + json.dumps(data) + ';'
    import collections, sys
    sys.path.insert(0, str(ROOT / 'tools')); import gsat_audio_provenance as prov
    pr = prov.load(); cnt = collections.Counter(prov.status_of(i['file'], ROOT / 'gsat' / 'audio', pr) for i in items)
    names = {'production': 'Azure 付費層（可正式部署）', 'dev-test': 'Azure 免費層 F0 測試音檔（僅供開發與音質檢查，不可正式部署，未取得 production 簽核）', 'unofficial': 'edge-tts 非官方試用版（不可部署）', 'unknown': '來源不明', 'mismatch': '與來源紀錄不符', 'missing': '缺檔'}
    SRC_NOTE = '音檔來源:' + '、'.join(f'{names[k]} {v} 段' for k, v in sorted(cnt.items()))
    body = f'''<title>學測語音試聽</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>{CSS}</style>
<h1>學測英文語音試聽</h1>
<div class="banner"><b>狀態:尚未全面驗收;本頁供音質檢查,不代表正式簽核。</b>187 段不會因此自動算「已通過」;逐段以你在下方的標記為準(預設「待審核」)。請逐段聽,標記「聽起來正常」或「有問題」(發音錯誤、斷句怪、音量或雜音),最後按「匯出標記」把結果貼回給開發者。
聲音:en-US-AriaNeural(美式女聲;{SRC_NOTE})。正常速度語速 −8%,慢速 −35%。一次只會播放一段;再點同一段會停止,↻ 從頭重播。</div>
<p class="note">共 {len(items)} 段:單字 {n['word']}、片語/搭配詞 {n['phrase']}、例句 {n['sentence']}、文章 {n['passage']}(5 篇原創模擬考文章 × 正常/慢速)。內容全是原創,不含大考中心試題。</p>
<nav><a href="#w">單字</a><a href="#f">衍生字</a><a href="#p">片語</a><a href="#s">例句</a><a href="#pn">文章・正常</a><a href="#ps">文章・慢速</a><a href="#x">匯出</a></nav>
<h2 id="w">① 單字發音({n['word']})</h2>{sec_words}
<h2 id="f">② 衍生字發音(字族成員,點按鈕播放)</h2><p class="note">同一字族的詞形各自是獨立詞條,分別有自己的音檔。</p>{fam}
<h2 id="p">③ 片語與搭配詞發音({n['phrase']})</h2>{sec_phr}
<h2 id="s">④ 完整例句({n['sentence']})</h2>{sec_sen}
<h2 id="pn">⑤ 文章・正常速度({n['passage'] // 2})</h2>{sec_pn}
<h2 id="ps">⑥ 文章・慢速({n['passage'] // 2})</h2><p class="note">慢速版的時間約為正常速度的 1.42 倍。</p>{sec_ps}
<h2 id="x">⑦ 匯出試聽標記</h2><button id="exportbtn" class="play" style="padding:0 16px">匯出標記</button><p><textarea id="exp" readonly placeholder="按「匯出標記」後,這裡會列出你標記為「聽起來正常」或「有問題」的音檔"></textarea></p>
<div id="bar"><span id="now">沒有在播放</span><button id="stopall">■ 停止</button></div>
<script>{data_js}var label={json.dumps(label, ensure_ascii=False)};{JSCODE}</script>'''
    out = pathlib.Path(a.out)
    out.write_text(body if a.embed else '<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + body + '</html>', encoding='utf8')
    print(f'已輸出 {out}({out.stat().st_size / 1e6:.1f} MB),{len(label)} 段可試聽')


main()
