#!/usr/bin/env python3
"""產生「單字出現紀錄」待審核表（HTML）：列出每一筆詞性有疑義的比對與所在的題目上下文，讓審核者勾選「詞性與字義正確／不是這個詞條」。
含大考中心試題，權利尚未確認，輸出位置必須在版本庫以外。審核後把結果填進 gsat/exam/vocab_reviews.js（編號見表中），再重新執行 tools/build_vocab_index.py。
用法：python3 tools/gsat_vocab_review_sheet.py --out /某個版本庫以外的資料夾 [--suggestions 建議.json]
原始紀錄一律保留、不由 AI 決定：每筆預設「待確認」，依客觀旗標分組（連字號複合詞／此字形也可能是別的詞性／同詞性但字義可能不同），
每筆由審核者選「計入／排除／待確認」；只有審核者（by 不可空白）填入 vocab_reviews.js 的結果才會改變統計。
--suggestions（選用）：附上原 PDF 頁碼（定位用），並把 AI 的參考意見收在「AI 參考(未採用)」摺疊區，不影響預設選項與分組。"""
import argparse, html, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
ROLE = {'answer': '正確答案', 'distractor': '干擾選項', 'stem': '題幹', 'passage': '文章用字'}
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


def group_of(r, ent):
    """只用客觀旗標分組(不是 AI 的判斷):複合詞／此字形也可能是別的詞性／同詞性但字義可能不同。"""
    if r['r'] == 'compound': return (0, '連字號複合詞內的比對', '字位於連字號複合詞裡(例:time-consuming),不一定是這個詞條的獨立使用。請決定複合詞是否算這個詞條的出現。')
    amb = ent['amb'].get(r['f'][0].lower(), '')
    if '字義' in amb: return (2, '同詞性但字義可能不同', '詞性相同,但這個字形有不同字義;請決定此處字義是否屬於詞條。')
    return (1, '此字形也可能是別的詞性(詞性不同)', '詞條與這個字形的另一種詞性不同(每筆標題旁有「也可能是…」);請依原句判斷此處實際是哪一種。')


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--out', required=True); ap.add_argument('--suggestions'); a = ap.parse_args()
    sg = json.loads(pathlib.Path(a.suggestions).read_text(encoding='utf8')) if a.suggestions else {}
    out = pathlib.Path(a.out).resolve()
    if out == ROOT or ROOT in out.parents:
        sys.exit('拒絕：待審核表含試題，輸出位置必須在版本庫（' + str(ROOT) + '）以外。')
    out.mkdir(parents=True, exist_ok=True)
    d = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    PRIORITY = ['impact-n', 'escape-v', 'official-adj', 'stress-v', 'tight-adj']
    order = PRIORITY + [e for e in d['index']['entries'] if e not in PRIORITY]
    items = []
    for eid in order:
        ent = d['vocab']['entries'][eid]
        for r in d['index']['entries'][eid]['review']:
            items.append((group_of(r, ent), PRIORITY.index(eid) if eid in PRIORITY else 99, eid, ent, r))
    items.sort(key=lambda x: (x[0][0], x[1]))
    secs, n, cur = [], 0, None
    for (gi, gname, gdesc), _, eid, ent, r in items:
        if cur != gname:
            if cur is not None: secs.append('</div>')
            secs.append(f'<div class="grp"><h2>{html.escape(gname)}</h2><p class="note">{html.escape(gdesc)}</p>'); cur = gname
        n += 1
        ctx = html.escape(find(d['exams'], r))
        for f in r['f']: ctx = re.sub(r'(?i)\b(%s)\b' % re.escape(f), r'<mark>\1</mark>', ctx)
        s_ = sg.get(r['k'], {})
        where = (f'第 {r["n"]} 題 {html.escape(r["loc"])}' if r.get('n') else f'題組 {r["qs"][0]}–{r["qs"][-1]} 題(共用文章){html.escape(r["loc"])}')
        src = f'大考中心 {r["y"]} 學年度學科能力測驗英文考科試卷' + (f',第 {s_["page"]} 頁' if s_.get('page') else '')
        ai = ''
        if s_:
            ai = (f'<details class="ai"><summary>AI 參考意見(未採用,僅供對照)</summary>AI 傾向:{"計入" if s_["suggest"] == "confirmed" else "排除"}(信心:{html.escape(s_["conf"])})<br>此處詞性/字義:{html.escape(s_["pos"])}'
                  f'<br>另一種可能:{html.escape(s_["alt"])}<br>理由:{html.escape(s_["why"])}</details>')
        k = html.escape(r['k'], quote=True)
        secs.append(f'<div class="rec" data-k="{k}" id="r{n}"><div class="hd"><b>#{n}　{html.escape(eid)}</b> <span class="note">詞條:{html.escape(ent["pos"])} {html.escape(ent["zh"])}{("　|　此字形也可能是:" + html.escape(ent["alsoPos"])) if ent["alsoPos"] and r["r"] != "compound" else ""}</span></div>'
                    f'<div class="meta">{r["y"]} 學年度・{html.escape(r["t"])}・{where}・角色:{html.escape(ROLE[r["role"]])}・來源:{html.escape(src)}</div>'
                    f'<div class="ctx">{ctx}</div>{ai}'
                    f'<div class="ctl"><label><input type="radio" name="s{n}" value="confirmed"> 計入(此處就是這個詞條)</label><label><input type="radio" name="s{n}" value="rejected"> 排除(不是這個詞條)</label><label><input type="radio" name="s{n}" value="" checked> 待確認</label>'
                    f'<input class="act" placeholder="此處實際詞性/字義(選填)" aria-label="實際詞性"><input class="c" placeholder="意見(選填)" aria-label="意見"></div></div>')
    secs.append('</div>')
    css = ('body{font:15px/1.65 -apple-system,"Noto Sans TC",sans-serif;max-width:980px;margin:0 auto;padding:12px 14px 130px;background:#f6f7f9;color:#1c2330}h2{font-size:1.1rem;margin:26px 0 4px;border-top:3px solid #8a94a6;padding-top:8px}'
           '.note{color:#5d6778;font-size:.86rem}.warn{background:#fff4d6;border-left:4px solid #e0a800;padding:6px 12px}.rec{background:#fff;border:1px solid #d3d9e3;border-left:5px solid #b8bfcc;border-radius:10px;padding:8px 10px;margin:8px 0}.rec.done{border-left-color:#12703a}.rec.rej{border-left-color:#b3261e}'
           '.meta{font-size:.84rem;color:#5d6778}.ctx{font-family:Georgia,serif;white-space:pre-wrap;margin:6px 0;background:#f2f4f8;border-radius:8px;padding:6px 8px}mark{background:#ffe27a}.ctl{display:flex;flex-wrap:wrap;gap:4px 14px;align-items:center}.ctl label{min-height:30px;display:inline-flex;gap:4px;align-items:center}'
           '.ctl input.act,.ctl input.c{flex:1;min-width:150px;font:inherit;border:1px solid #c5ccd8;border-radius:6px;padding:3px 6px}.ai{margin:4px 0;font-size:.85rem;color:#5d6778}'
           '#bar{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #b8bfcc;padding:8px 14px calc(8px + env(safe-area-inset-bottom,0px));display:flex;gap:8px;align-items:center;flex-wrap:wrap}#bar span{flex:1;min-width:160px;font-size:.86rem}button{font:inherit;border:1px solid #b8bfcc;background:#fff;border-radius:8px;min-height:40px}#exp{width:100%;height:170px;box-sizing:border-box}')
    js = r"""(function(){var KEY='gsat-vocabreview-'+location.pathname,S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function cnt(){var c=0,j=0,w=0;document.querySelectorAll('.rec').forEach(function(r){var v=(S[r.dataset.k]||{}).v||'';if(v==='confirmed')c++;else if(v==='rejected')j++;else w++});document.getElementById('cnt').textContent='計入 '+c+'・排除 '+j+'・待確認 '+w}
document.querySelectorAll('.rec').forEach(function(r){var k=r.dataset.k,s=S[k]=S[k]||{};
 function paint(){r.classList.toggle('done',s.v==='confirmed');r.classList.toggle('rej',s.v==='rejected')}
 r.querySelectorAll('input[type=radio]').forEach(function(x){if(s.v!=null&&x.value===s.v)x.checked=true;x.addEventListener('change',function(){s.v=x.value;paint();save();cnt()})});
 var a=r.querySelector('.act'),c=r.querySelector('.c');if(s.a)a.value=s.a;if(s.c)c.value=s.c;a.oninput=function(){s.a=a.value;save()};c.oninput=function(){s.c=c.value;save()};paint()});
var by=document.getElementById('by');if(S.__by)by.value=S.__by;by.oninput=function(){S.__by=by.value;save()};cnt();
document.getElementById('btn').onclick=function(){var by=document.getElementById('by').value.trim(),at=new Date().toISOString().slice(0,10),L=[],J=[];
 document.querySelectorAll('.rec').forEach(function(r){var s=S[r.dataset.k]||{};if(s.v||s.c||s.a){L.push('['+r.querySelector('.hd b').textContent.trim()+'] '+(s.v==='confirmed'?'計入':s.v==='rejected'?'排除':'待確認')+(s.a?'　實際:'+s.a:'')+(s.c?'　意見:'+s.c:''))}
  if(s.v)J.push('  '+JSON.stringify(r.dataset.k)+': {"verdict": "'+s.v+'", "by": '+JSON.stringify(by)+', "at": "'+at+'"}')});
 document.getElementById('exp').value=document.getElementById('cnt').textContent+'\n'+(L.join('\n')||'(尚未標記)')+'\n\n'+(by?'── 可貼進 gsat/exam/vocab_reviews.js 的內容(只含你選了計入/排除的紀錄)──\n{\n'+J.join(',\n')+'\n}':'(要產生 vocab_reviews.js 內容,請先在下方填審核者姓名)')};
document.getElementById('clr').onclick=function(){var b=document.getElementById('clr');if(b.dataset.arm!=='1'){b.dataset.arm='1';b.textContent='再按一次確認清除';return}try{localStorage.removeItem(KEY)}catch(e){}location.reload()};})();"""
    doc = f'''<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>單字出現紀錄・詞性待確認</title><style>{css}</style>
<h1>單字出現紀錄・詞性待確認({n} 筆)</h1>
<p class="warn"><b>注意:</b>含大考中心試題,使用權利尚未確認,請勿公開轉貼。這 {n} 筆是系統無法自動確定詞性、詞義或屬於複合詞的原始紀錄,<b>全部保留、預設「待確認」、不計入任何統計</b>。分組只依客觀旗標(複合詞／詞性可能不同／字義可能不同),不是 AI 的判斷。</p>
<p>每筆請看原句(黃底是比對到的字),選「計入／排除／待確認」,並可填「此處實際詞性/字義」與意見。選擇自動存在這個瀏覽器;最下面按「匯出」,會得到可貼進 <code>gsat/exam/vocab_reviews.js</code> 的內容(需要填審核者姓名),再執行 <code>python3 tools/build_vocab_index.py</code> 才會改變統計。優先處理:impact、escape、official、stress、tight(已排在各組最前面)。</p>
{''.join(secs)}
<h3>匯出</h3><textarea id="exp" readonly placeholder="按「匯出」後顯示"></textarea>
<div id="bar"><span id="cnt"></span>審核者:<input id="by" size="8"><button id="btn">匯出</button><button id="clr">清除全部選擇</button></div><script>{js}</script></html>'''
    (out / 'vocab-review-sheet.html').write_text(doc, encoding='utf8')
    print(f'已輸出 {n} 筆待審核到 {out / "vocab-review-sheet.html"}')


main()
