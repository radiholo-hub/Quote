"""詞性小課結業測驗（完整方案）。

  python3 score-rescue/tools/build_final.py <結業測驗_v1.1.md>

1. 題庫：從教師定稿（Markdown）讀 14 題 → score-rescue/private/final.js（私有，上傳到 Supabase lessons 儲存桶）
2. 頁面：score-rescue/pos/final.html（公開外殼：登入、確認付費、確認 7 課都完成，再載入題庫）
3. 完成紀錄：第 1～7 課提交 4 題確認題、進入完成畫面時，在這個瀏覽器記下「第 N 課已完成」
   （pos/index.html、l2、l3 直接修改；第 4～7 課改 private/lN.full.html，之後要再跑 split_paid.py）
   第 7 課完成畫面：7 課都完成才顯示「7 課全部完成」和「開始結業測驗」。
可重複執行。
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
POS = ROOT / 'pos'
PRIV = ROOT / 'private'
LET = 'ABCD'

# ---------- 1. 題庫 ----------

def parse(md):
    items = []
    for m in re.finditer(r'^\*\*(\d\d)\.\*\* (.+?)\n\n\(A\) (.+?)　\(B\) (.+?)　\(C\) (.+?)　\(D\) (.+?)$', md, re.M):
        items.append({'n': int(m.group(1)), 's': m.group(2).strip(), 'o': [m.group(i).strip() for i in range(3, 7)]})
    table = {int(m.group(1)): (m.group(2), int(m.group(3)), m.group(4).strip())
             for m in re.finditer(r'^\| (\d\d) \| ([A-D])\. [^|]+\| 第 (\d) 課 \| ([^|]+)\|', md, re.M)}
    for it in items:
        L, lesson, point = table[it['n']]
        it['a'] = LET.index(L)
        it['lesson'] = lesson
        it['point'] = point.split('·')[-1].strip()
        sec = re.search(r'^### %02d｜.+?\n(.*?)(?=^### |\Z)' % it['n'], md, re.M | re.S).group(1)
        it['why'] = re.search(r'\*\*一句判斷依據\*\*　(.+)', sec).group(1).strip().replace('`', '')
        it['zh'] = re.search(r'\*\*中譯\*\*　(.+)', sec).group(1).strip()
        x = [None] * 4
        for k, t in re.findall(r'^- \(([A-D])\) (.+)$', sec, re.M):
            x[LET.index(k)] = '(%s) %s' % (k, t.replace('`', ''))
        it['x'] = x
        it['id'] = 'FINAL-%02d' % it['n']
        assert it['s'].count('______') == 1 and x[it['a']] is None and all(x[k] for k in range(4) if k != it['a']), it['id']
    assert len(items) == 14, len(items)
    from collections import Counter
    assert all(v == 2 for v in Counter(i['lesson'] for i in items).values()) and len(set(i['lesson'] for i in items)) == 7
    return items


# ---------- 2. 頁面 ----------

PAGE_JS = r'''
var SB_URL='https://uzesrnvtbplloqqgmhcl.supabase.co';
var SB_KEY='sb_publishable_jrTIfxDHkliZJ8ySXIZyYg_jjKuA5I5';
var DEBUG=/[?&]debug=1\b/.test(location.search);
var LET=['A','B','C','D'],STORE='lessons',FINAL=[],authSb=null,gated=false;
var LESSON_NAME={1:'形容詞還是副詞',2:'空格需要名詞嗎',3:'空格需要動詞嗎',4:'V-ing 還是 p.p.',5:'to V 還是 V-ing',6:'意思相近，怎麼選',7:'關係代名詞'};
var app=document.getElementById('app');
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function stem(s){return esc(s).replace('______','<span class="blank" aria-label="空格"></span>')}
function h(id){return document.getElementById(id)}
function prog(p){var b=h('prog');if(p==null){b.hidden=true;return}b.hidden=false;b.firstChild.style.width=Math.round(p*100)+'%'}
function render(html){app.innerHTML=html;window.scrollTo(0,0)}
function lessonHref(n){return n===1?'index.html#l1':'l'+n+'.html'}

/* ---------- 事件：每次作答各記一次 pos_final_start／pos_final_done（重新整理、回看結果不重送） ---------- */
function dbg(name,state){
  if(!DEBUG)return;
  var d=h('dbg');
  if(!d){d=document.createElement('div');d.id='dbg';d.innerHTML='<b>事件紀錄（debug，不送出）</b>';document.body.appendChild(d)}
  var r=document.createElement('div');r.textContent=name+' · '+state;r.setAttribute('data-ev',name);d.appendChild(r);
}
function logOnce(name,attempt){
  var k='ev_'+name+'_'+attempt;
  try{if(sessionStorage.getItem(k)){dbg(name,'本次作答已記錄');return}sessionStorage.setItem(k,'1')}catch(e){}
  if(DEBUG){dbg(name,'記錄');return}
  try{if(authSb)authSb.from('events').insert({name:name}).then(function(){},function(){})}catch(e){}
}
function logEvent(name){   // 登入頁等一般事件：同一分頁只記一次
  var k='ev_'+name;
  try{if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,'1')}catch(e){}
  if(DEBUG){dbg(name,'記錄');return}
  try{if(authSb)authSb.from('events').insert({name:name}).then(function(){},function(){})}catch(e){}
}

/* ---------- 7 課完成紀錄（存在這個瀏覽器；各課提交 4 題確認題、進入完成畫面時記下） ---------- */
function doneLessons(){var o=[];for(var n=1;n<=7;n++){try{if(localStorage.getItem('sr_pos_done_'+n))o.push(n)}catch(e){}}return o}

/* ---------- 作答狀態：存在這個分頁（重新整理會接著做同一次作答） ---------- */
var ST=null;
function load(){try{ST=JSON.parse(sessionStorage.getItem('sr_final')||'null')}catch(e){ST=null}}
function save(){try{sessionStorage.setItem('sr_final',JSON.stringify(ST))}catch(e){}}
function newAttempt(){ST={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),i:0,ans:{},done:false};save()}

/* ---------- 登入與付費（沿用主站 Email 登入與 paid_users；題庫放在不公開的 lessons 儲存桶） ---------- */
var libReady=null;
function loadLib(){
  if(!libReady)libReady=new Promise(function(ok){
    if(window.supabase)return ok();
    var t=document.createElement('script');
    t.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    t.onload=function(){ok()};t.onerror=function(){ok()};
    document.head.appendChild(t);
  });
  return libReady;
}
function head(){return '<div class="qid">詞性小課（完整方案）</div><h1>結業測驗：14 題，每課 2 題</h1>'}
function msg(t){prog(null);render('<div class="stack">'+head()+'<div class="sheet"><p>'+t+'</p></div></div>')}
function fail(){msg('結業測驗暫時載入失敗。請重新整理再試一次；如果一直出現，請加<a class="link" href="https://line.me/R/ti/p/@419zbhxy" target="_blank" rel="noopener">官方 LINE</a> 告訴我們。')}
function planHTML(){
  return '<div class="sheet stack"><h3>還沒購買完整方案？</h3>'+
    '<p>結業測驗屬於完整方案，和詞性小課第 4～7 課一起提供。第 1～3 課可以免費試學。</p>'+
    '<a class="btn line" id="toPlan" href="../#pricing">看完整方案</a></div>';
}
function viewLogin(){
  prog(null);logEvent('pos_paywall_view');
  render('<div class="stack">'+head()+
    '<div class="sheet stack"><h3>已經購買？登入就能開始</h3>'+
      '<p>請輸入購買時登記的 Email，我們會寄一封登入連結給你。點開連結就會回到這一頁。</p>'+
      '<form id="lf" class="stack" novalidate><input class="inp" type="email" id="le" autocomplete="email" inputmode="email" placeholder="you@example.com" aria-label="Email">'+
      '<button class="btn pri" id="ls" type="submit">寄登入連結</button></form><p class="fine" id="lm" aria-live="polite"></p></div>'+
    planHTML()+'</div>');
  h('lf').addEventListener('submit',function(e){
    e.preventDefault();
    var email=h('le').value.trim(),m=h('lm'),b=h('ls');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){m.textContent='請輸入正確的 Email。';return}
    if(!confirm('登入連結會寄到：\n'+email+'\n\n拼對了嗎？拼錯的話，連結會寄給別人。')){m.textContent='請修改 Email 後再送出。';h('le').focus();return}
    b.disabled=true;m.textContent='寄送中…';
    authSb.auth.signInWithOtp({email:email,options:{emailRedirectTo:location.origin+location.pathname}}).then(function(r){
      b.disabled=false;
      if(r&&r.error){m.textContent='寄送失敗：'+(r.error.message||'請稍後再試');return}
      logEvent('pos_paywall_login_sent');m.textContent='已寄出！請到信箱點開登入連結（沒收到請看垃圾郵件）。';
    },function(){b.disabled=false;m.textContent='寄送失敗，請稍後再試。'});
  });
}
function viewNotPaid(email){
  prog(null);logEvent('pos_paywall_notpaid');
  render('<div class="stack">'+head()+
    '<div class="sheet stack"><h3>這個帳號還沒開通完整方案</h3>'+
      '<p>你目前登入的是 <b id="who">'+esc(email||'')+'</b>。</p>'+
      '<p class="fine">已經轉帳了嗎？開通通常在數小時內完成。如果用的是另一個 Email，請換帳號登入。</p>'+
      '<button class="btn line" id="swap" type="button">換一個 Email 登入</button></div>'+
    planHTML()+'</div>');
  h('swap').addEventListener('click',function(){authSb.auth.signOut().then(viewLogin,viewLogin)});
}
function viewLocked(done){
  prog(null);
  var left=[1,2,3,4,5,6,7].filter(function(n){return done.indexOf(n)<0});
  render('<div class="stack">'+head()+
    '<div class="sheet stack" id="locked"><h3>先完成第 1～7 課</h3>'+
      '<p>每一課做完 4 題確認題、看到完成畫面，就算完成。這個瀏覽器已完成 '+done.length+'／7 課。</p>'+
      '<ul class="left">'+left.map(function(n){return '<li><a class="link" href="'+lessonHref(n)+'">第 '+n+' 課：'+LESSON_NAME[n]+'</a></li>'}).join('')+'</ul>'+
      '<p class="fine">完成紀錄存在這個瀏覽器裡。換了手機或電腦，要在那台裝置上把各課的確認題再做一次。</p></div></div>');
}
function loadFinal(){
  msg('載入結業測驗中…');
  return authSb.storage.from(STORE).download('final.js').then(function(r){
    if(r.error||!r.data)throw r.error||new Error('no content');
    return r.data.text();
  }).then(function(code){
    eval(code);   // 只會設定 FINAL（見 tools/build_final.py）
    if(FINAL.length!==14)throw new Error('bad content');
    expose();
    var done=doneLessons();
    if(done.length<7)return viewLocked(done);
    load();
    if(ST&&ST.done)return viewResult();
    if(ST&&ST.id)return viewQ();
    viewIntro();
  });
}
function checkPaid(user){
  msg('確認購買資格中…');
  return authSb.from('paid_users').select('email').then(function(r){
    if(r.error)throw r.error;
    if(!(r.data||[]).length)return viewNotPaid(user&&user.email);
    return loadFinal();
  });
}
function gate(){
  msg('載入中…');
  loadLib().then(function(){
    if(!window.supabase)throw new Error('no lib');
    authSb=window.supabase.createClient(SB_URL,SB_KEY);
    authSb.auth.onAuthStateChange(function(ev,s){if(ev==='SIGNED_IN'&&!gated&&s){gated=true;checkPaid(s.user).catch(fail)}});
    return authSb.auth.getSession().then(function(r){
      var s=r&&r.data&&r.data.session;
      if(gated)return;
      if(!s)return viewLogin();
      gated=true;return checkPaid(s.user);
    });
  }).catch(fail);
}

/* ---------- 測驗 ---------- */
function viewIntro(){
  prog(null);
  render('<div class="stack">'+head()+
    '<div class="sheet stack"><h3>7 課全部完成</h3>'+
      '<ul><li>14 題，每課 2 題，混合排列，不標示考點。</li><li>一題一頁，作答時不顯示對錯，14 題做完再看結果。</li><li>約 10 分鐘。結果不換算多益分數。</li></ul></div>'+
    '<div class="actions"><button class="btn pri" id="start">開始結業測驗</button></div></div>');
  h('start').addEventListener('click',function(){newAttempt();logOnce('pos_final_start',ST.id);viewQ()});
}
function viewQ(){
  var i=ST.i,q=FINAL[i],k=ST.ans[q.id];
  prog(i/FINAL.length);
  render('<div class="sheet"><div class="qid">結業測驗 第 '+(i+1)+' / '+FINAL.length+' 題</div><p class="q">'+stem(q.s)+'</p>'+
    '<div class="opts" role="group" aria-label="選項">'+q.o.map(function(t,j){
      return '<button type="button" class="opt" data-k="'+j+'" aria-pressed="'+(k===j)+'"><span class="bub">'+LET[j]+'</span><span class="t">'+esc(t)+'</span></button>'}).join('')+'</div></div>'+
    '<div class="actions"><button class="btn pri" id="next"'+(k==null?' disabled':'')+'>'+(i===FINAL.length-1?'看結果':'下一題')+'</button>'+
    (i>0?'<p style="text-align:center"><button class="link" id="prev">上一題</button></p>':'')+'</div>');
  app.querySelectorAll('.opt').forEach(function(b){b.addEventListener('click',function(){ST.ans[q.id]=+b.dataset.k;save();viewQ()})});
  h('next').addEventListener('click',function(){
    if(i<FINAL.length-1){ST.i++;save();viewQ()}
    else{ST.done=true;save();logOnce('pos_final_done',ST.id);viewResult()}
  });
  if(h('prev'))h('prev').addEventListener('click',function(){ST.i--;save();viewQ()});
}
function viewResult(){
  prog(1);
  var right=0,by={};
  FINAL.forEach(function(q){var ok=ST.ans[q.id]===q.a;if(ok)right++;by[q.lesson]=by[q.lesson]||{c:0,n:0};by[q.lesson].n++;if(ok)by[q.lesson].c++});
  var wrong=FINAL.filter(function(q){return ST.ans[q.id]!==q.a});
  render('<div class="stack">'+
    '<div class="qid">詞性小課 結業測驗</div><h1>答對 '+right+'／'+FINAL.length+' 題</h1>'+
    '<div class="sheet"><table class="tbl" id="byLesson"><thead><tr><th>課程</th><th>答對</th></tr></thead><tbody>'+
      [1,2,3,4,5,6,7].map(function(n){var b=by[n];return '<tr'+(b.c<b.n?' class="miss"':'')+'><td>第 '+n+' 課　'+LESSON_NAME[n]+'</td><td>'+b.c+'／'+b.n+'</td></tr>'}).join('')+
    '</tbody></table><p class="fine" style="margin-top:8px">每課只有 2 題，只能當作複習方向，不換算多益分數。</p></div>'+
    (wrong.length?'<h2>錯題</h2>'+wrong.map(function(q){
      var k=ST.ans[q.id];
      return '<div class="sheet stack wrongq" data-id="'+q.id+'"><div class="qid">第 '+q.n+' 題 · 第 '+q.lesson+' 課</div><p class="q">'+stem(q.s)+'</p>'+
        '<p>你選 ('+LET[k]+') '+esc(q.o[k])+'，正解是 <b>('+LET[q.a]+') '+esc(q.o[q.a])+'</b></p>'+
        '<p>'+esc(q.why)+'</p>'+
        '<details class="more"><summary>看完整解析</summary><div class="fbmore"><div>'+esc(q.x[k])+'</div><p class="zh">'+esc(q.zh)+'</p></div></details>'+
        '<a class="btn line" href="'+lessonHref(q.lesson)+'">回第 '+q.lesson+' 課複習</a></div>'}).join('')
     :'<div class="sheet"><p>14 題全對！七課的判斷方法都用上了。</p></div>')+
    '<a class="btn line" href="../">回到 Score Rescue</a>'+
    '<p style="text-align:center"><button class="link" id="redo">重新作答</button></p></div>');
  h('redo').addEventListener('click',function(){newAttempt();logOnce('pos_final_start',ST.id);viewQ()});
}
function expose(){window.__final={FINAL:FINAL,st:function(){return ST}}}

gate();
'''

PAGE_CSS_EXTRA = '''.inp{width:100%;min-height:48px;padding:10px 14px;border:1.5px solid #DDD8C8;border-radius:10px;font:inherit;background:#fff}
#byLesson tr.miss td{color:var(--bad)}
.wrongq .q{margin:0}
ul.left{margin:4px 0 0 1.2em}
'''


def build_page():
    shell = (POS / 'l4.html').read_text(encoding='utf-8')
    head = shell[:shell.index('</style>')]
    head = re.sub(r'<title>.*?</title>', '<title>詞性小課 結業測驗｜Score Rescue</title>', head)
    body = ('</style>\n</head>\n<body>\n<div class="topbar">\n  <div class="wrap bar">\n    <a class="link" href="../">← Score Rescue</a>\n'
            '    <span><b class="brand">詞性小課 結業測驗</b></span>\n  </div>\n  <div class="progress" id="prog" hidden><i></i></div>\n</div>\n'
            '<main class="wrap" id="app" aria-live="polite"></main>\n\n<script>\n(function(){\n\'use strict\';\n'
            + PAGE_JS.strip('\n') + '\n})();\n</script>\n</body>\n</html>\n')
    (POS / 'final.html').write_text(head + PAGE_CSS_EXTRA + body, encoding='utf-8')


# ---------- 3. 完成紀錄 ----------

MARK_FN = ("/* 完成紀錄：提交 4 題確認題、進入完成畫面就記為完成（存在這個瀏覽器；結業測驗用來判斷 7 課是否都完成） */\n"
           "function lessonNo(){var m=location.pathname.match(/\\/l([2-7])\\.html$/);return m?+m[1]:1}\n"
           "function markDone(){try{localStorage.setItem('sr_pos_done_'+lessonNo(),String(Date.now()))}catch(e){}}\n")

L7_FINAL = ("    '<div class=\"sheet stack\" id=\"finalBox\">'+(function(){\n"
            "      var left=[1,2,3,4,5,6,7].filter(function(n){try{return !localStorage.getItem('sr_pos_done_'+n)}catch(e){return true}});\n"
            "      if(!left.length)return '<h3>7 課全部完成</h3><p>用 14 題結業測驗確認自己會不會判斷，每課各 2 題。</p><a class=\"btn pri\" id=\"toFinal\" href=\"final.html\">開始結業測驗</a>';\n"
            "      return '<h3>第 7 課已完成</h3><p class=\"fine\">完成第 1～7 課後，就能開始 14 題結業測驗。還沒完成：'+left.map(function(n){return '<a class=\"link\" href=\"'+(n===1?'index.html#l1':'l'+n+'.html')+'\">第 '+n+' 課</a>'}).join('、')+'</p>';\n"
            "    })()+'</div>'+\n")


def patch_done(path, n):
    s = path.read_text(encoding='utf-8')
    if 'function markDone' not in s:
        if s.count('function viewItem(') != 1:
            sys.exit('%s: viewItem' % path)
        s = s.replace('function viewItem(', MARK_FN + 'function viewItem(', 1)
    if 'else{markDone();viewDone()}' not in s:
        if s.count('      else viewDone();') != 1:
            sys.exit('%s: else viewDone' % path)
        s = s.replace('      else viewDone();', '      else{markDone();viewDone()}', 1)
    if n == 1 and "location.hash==='#l1'" not in s:
        old = "else viewIntro();"
        if s.count(old) != 1:
            sys.exit('index: viewIntro')
        s = s.replace(old, "else if(location.hash==='#l1')viewLesson();   // 結業測驗錯題「回第 1 課複習」\nelse viewIntro();", 1)
    if n == 7 and 'id="finalBox"' not in s:
        old = "    '<div class=\"sheet stack\"><h3>想接著練其他閱讀題型？</h3>'+\n      '<a class=\"btn pri\" id=\"d17\""
        if s.count(old) != 1:
            sys.exit('l7: done anchor')
        s = s.replace(old, L7_FINAL + old.replace('btn pri', 'btn line'), 1)
    path.write_text(s, encoding='utf-8')


if __name__ == '__main__':
    md = pathlib.Path(sys.argv[1]).read_text(encoding='utf-8')
    items = parse(md)
    PRIV.mkdir(exist_ok=True)
    keep = ['id', 'n', 'lesson', 'point', 's', 'o', 'a', 'why', 'x', 'zh']
    (PRIV / 'final.js').write_text('/* 詞性小課結業測驗：完整方案內容（私有，請勿放進公開儲存庫） */\nFINAL=' +
                                   json.dumps([{k: i[k] for k in keep} for i in items], ensure_ascii=False) + ';\n', encoding='utf-8')
    build_page()
    patch_done(POS / 'index.html', 1)
    for n in (2, 3):
        patch_done(POS / ('l%d.html' % n), n)
    for n in (4, 5, 6, 7):
        patch_done(PRIV / ('l%d.full.html' % n), n)
    print('final.js：%d 題；final.html；完成紀錄已加到第 1～7 課（第 4～7 課請再執行 split_paid.py）' % len(items))
