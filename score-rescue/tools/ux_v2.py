"""詞性小課作答畫面 v2（2026-11-12）。對 pos/index.html、l2～l7.html 套用同一組修改，可重複執行。

- 拿掉頁首「預覽版」標籤
- 作答按鈕固定在手機底部：送出前「確認答案」，送出後同一位置變「下一題」
- 答完只顯示正解＋一句判斷依據；空格的工作、選項解析、翻譯與發音收進「看完整解析」
- 確認題答錯：「看同類示範」直接在原題下方展開，不再跳頁
- 影片下方直接放「開始練習（10 題）」主按鈕＋「看文字版」次要入口，拿掉「看完了？」卡片
- 前測：選好答案後點「有把握／不確定」直接跳下一題
"""
import pathlib, re, sys

POS = pathlib.Path(__file__).resolve().parent.parent / 'pos'
FILES = ['index.html'] + ['l%d.html' % n for n in range(2, 8)]

FB_NEW = r'''function feedbackHTML(q,k,kind){
  var ok=k===q.a;
  var others=q.x.map(function(t,j){return (t&&j!==k)?'<li>'+esc(t)+'</li>':''}).join('');
  return '<div class="fb '+(ok?'ok':'bad')+'" id="fb">'+
    '<div><b>'+(ok?'答對了！':'正解是 ('+LET[q.a]+') '+esc(q.o[q.a]))+'</b>'+(q.whyHtml||esc(q.why))+'</div>'+
    (kind==='chk'&&!ok?'<button class="btn line" id="toDemo">看同類示範（示範'+(q.demo+1)+'）</button>'+
      '<div id="demoBox" hidden>'+demoHTML(DEMOS[q.demo],true)+'</div>':'')+
    '<details class="more" id="fullFb"><summary>看完整解析</summary><div class="fbmore">'+
      '<div class="work">空格的工作：'+esc(q.work)+'</div>'+
      (ok?'':'<div>你選的 '+esc(q.x[k])+'</div>')+sentHTML(q)+
      (others?'<div><div class="work">其他選項</div><ul>'+others+'</ul></div>':'')+
    '</div></details>'+
  '</div>';
}'''

AFTER_VIDEO_OLD = ("    '<div class=\"sheet\" id=\"afterVideo\"><h3>看完了？</h3><p style=\"margin-top:4px\">往下做 10 題練習，再用 4 題確認你會不會判斷。</p>'+\n"
                   "      '<div style=\"margin-top:14px\"><button class=\"btn pri\" id=\"toPr\">開始 10 題練習</button></div></div>'+\n")
AFTER_VIDEO_NEW = ("    '<div id=\"afterVideo\"><button class=\"btn pri\" id=\"toPr\">開始練習（10 題）</button>'+\n"
                   "      '<p style=\"text-align:center\"><button class=\"link\" id=\"toText\">看文字版</button></p></div>'+\n")

CSS_OLD = '#afterVideo{border-left:4px solid var(--wine)}'
CSS_NEW = ('#afterVideo{display:grid;gap:4px}\n'
           '#app{padding-bottom:calc(130px + env(safe-area-inset-bottom))}\n'
           '.actions{position:fixed;left:0;right:0;bottom:0;z-index:20;margin:0;padding:14px max(18px,calc((100vw - 684px)/2)) calc(14px + env(safe-area-inset-bottom))}\n'
           '.fb #toDemo{margin-top:4px}\n'
           '.fb .demo{margin-top:4px}\n'
           '.fbmore{display:grid;gap:8px;margin-top:8px}\n'
           '.fbmore ul{margin:4px 0 0 1.2em}')


def sub1(s, old, new, name, f):
    if new in s:
        return s
    if s.count(old) != 1:
        sys.exit('%s: %s 找到 %d 處' % (f, name, s.count(old)))
    return s.replace(old, new)


def patch(f):
    p = POS / f
    s = p.read_text()
    s = s.replace(' <span class="tag-preview">預覽版</span>', '')
    # 答題回饋
    if 'function feedbackHTML(q,k,kind)' not in s:
        s, n = re.subn(r'function feedbackHTML\(q,k\)\{.*?\n\}', lambda m: FB_NEW, s, count=1, flags=re.S)
        if n != 1:
            sys.exit(f + ': feedbackHTML')
    s = sub1(s, "(done?feedbackHTML(q,a.k):'')", "(done?feedbackHTML(q,a.k,kind):'')", 'feedback call', f)
    s = sub1(s, "var actions='<div class=\"actions'+(done?' static':'')+'\">';", "var actions='<div class=\"actions\">';", 'actions sticky', f)
    OLD_DEMO = "    if(kind==='chk'&&a.k!==q.a)actions+='<button class=\"btn line\" id=\"toDemo\" style=\"margin-bottom:10px\">回看示範'+(q.demo+1)+'（'+DEMOS[q.demo].id+'）</button>';\n"
    if OLD_DEMO in s:
        s = s.replace(OLD_DEMO, '')
    elif "回看示範'+(q.demo+1)" in s:
        sys.exit(f + ': old toDemo')
    s = sub1(s, "    if(h('toDemo'))h('toDemo').addEventListener('click',function(){viewDemoJump(q)});",
             "    if(h('toDemo'))h('toDemo').addEventListener('click',function(){var b=h('demoBox');b.hidden=!b.hidden;this.textContent=b.hidden?'看同類示範（示範'+(q.demo+1)+'）':'收起示範';if(!b.hidden)b.scrollIntoView({block:'start'})});\n"
             "    if(fresh)h('fb').scrollIntoView({block:'nearest'});", 'toDemo bind', f)
    s = sub1(s, "答錯時可以回看對應的示範，再回到原題。", "答錯時可以直接在題目下方看同類示範。", 'chk hint', f)
    # 送出後捲到回饋（只在剛送出時）
    s = sub1(s, "function viewItem(kind){", "function viewItem(kind,fresh){", 'viewItem sig', f)
    s = sub1(s, "      if(kind==='chk'&&!(q.id in s.first))s.first[q.id]=a.k===q.a;\n      viewItem(kind);",
             "      if(kind==='chk'&&!(q.id in s.first))s.first[q.id]=a.k===q.a;\n      viewItem(kind,true);", 'submit fresh', f)
    # 影片下方
    s = sub1(s, AFTER_VIDEO_OLD, AFTER_VIDEO_NEW, 'afterVideo', f)
    s = sub1(s, "  h('toPr2').addEventListener('click',start);",
             "  h('toPr2').addEventListener('click',start);\n"
             "  h('toText').addEventListener('click',function(){var t=h('textVersion');t.open=true;t.scrollIntoView({block:'start'})});", 'toText', f)
    s = sub1(s, CSS_OLD, CSS_NEW, 'css', f)
    # 前測：選好答案後點把握度直接下一題
    if f == 'index.html':
        s = sub1(s, "  bindPick(function(f,v){var r=st.pre.ans[q.id]=st.pre.ans[q.id]||{};r[f]=v;viewPre()});\n  h('next')",
                 "  bindPick(function(f,v){var r=st.pre.ans[q.id]=st.pre.ans[q.id]||{};r[f]=v;\n"
                 "    if(f==='conf'&&r.k!=null){viewPre();setTimeout(function(){var n=h('next');if(n&&st.pre.i===i)n.click()},220);return}\n"
                 "    viewPre()});\n  h('next')", 'pretest auto', f)
    p.write_text(s)
    print('ok', f)


for f in FILES:
    patch(f)
