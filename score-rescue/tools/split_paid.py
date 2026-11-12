"""把完整方案的詞性小課（第 4～7 課）拆成「公開外殼」和「私有課程內容」。

  python3 score-rescue/tools/split_paid.py            # 拆第 4～7 課
  python3 score-rescue/tools/split_paid.py 5 6        # 只拆指定的課

輸入：score-rescue/pos/lN.html（課程頁產生器輸出的完整頁面，或 private/lN.full.html）
輸出：
  - score-rescue/pos/lN.html      公開外殼：不含題目、解析和影片，只負責登入、確認付費、從私有儲存空間載入內容
  - score-rescue/private/lN.js    私有課程內容（上傳到 Supabase Storage 的 lessons 儲存桶）
  - score-rescue/private/lN.full.html  完整頁面備份，之後重拆或修改用
private/ 不進 git（.gitignore），儲存庫是公開的。
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
POS = ROOT / 'pos'
PRIV = ROOT / 'private'

GATE_JS = r'''
/* ---------- 完整方案：登入＋確認付費後，才從私有儲存空間載入課程內容 ----------
   沿用主站的 Email 登入（同一個網域，登入狀態共用）與 paid_users 付費名單。
   題目、解析和影片放在 Supabase Storage 的 lessons 儲存桶（不公開）；儲存桶規則只讓付費名單裡的帳號讀取，
   所以就算直接打開這個網址或看原始碼，沒有付費也拿不到內容。 */
var LESSON_NO=__N__,STORE='lessons',VIDEO='',authSb=null,gated=false;
var DEMOS=[],PR=[],CHK=[],viewLesson,viewDone;
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
function lessonTitle(){return document.title.split('｜')[0]}
function gateHead(){return '<div class="qid">詞性小課 第 '+LESSON_NO+' 課（完整方案）</div><h1>'+esc(lessonTitle().replace(/^詞性小課 第\d課：/,''))+'</h1>'}
function planHTML(){
  return '<div class="sheet stack"><h3>還沒購買完整方案？</h3>'+
    '<p>完整方案包含詞性小課第 4～7 課、30 天個人化路線和 3 份模擬試題。第 1～3 課可以免費試學。</p>'+
    '<a class="btn line" id="toPlan" href="../#pricing">看完整方案</a>'+
    '<p style="text-align:center"><a class="link" href="l3.html">回到免費的第 3 課</a></p></div>';
}
function gateMsg(t){prog(null);render('<div class="stack">'+gateHead()+'<div class="sheet"><p>'+t+'</p></div></div>')}
function gateError(){
  gateMsg('課程暫時載入失敗。請重新整理再試一次；如果一直出現，請加<a class="link" href="https://line.me/R/ti/p/@419zbhxy" target="_blank" rel="noopener">官方 LINE</a> 告訴我們。');
}
function viewLogin(){
  prog(null);logEvent('pos_paywall_view');
  render('<div class="stack">'+gateHead()+
    '<div class="sheet stack"><h3>已經購買？登入就能上課</h3>'+
      '<p>請輸入購買時登記的 Email，我們會寄一封登入連結給你。點開連結就會回到這一課。</p>'+
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
  render('<div class="stack">'+gateHead()+
    '<div class="sheet stack"><h3>這個帳號還沒開通完整方案</h3>'+
      '<p>你目前登入的是 <b id="who">'+esc(email||'')+'</b>。</p>'+
      '<p class="fine">已經轉帳了嗎？開通通常在數小時內完成。如果用的是另一個 Email，請換帳號登入。</p>'+
      '<button class="btn line" id="swap" type="button">換一個 Email 登入</button></div>'+
    planHTML()+'</div>');
  h('swap').addEventListener('click',function(){authSb.auth.signOut().then(viewLogin,viewLogin)});
}
function loadContent(){
  gateMsg('載入課程中…');
  var b=authSb.storage.from(STORE);
  return Promise.all([b.download('l'+LESSON_NO+'.js'),b.createSignedUrl('lesson'+LESSON_NO+'.mp4',6*3600)]).then(function(r){
    if(r[0].error||!r[0].data)throw r[0].error||new Error('no content');
    VIDEO=(r[1]&&r[1].data&&r[1].data.signedUrl)||'';
    return r[0].data.text();
  }).then(function(code){
    eval(code);   // 只會設定 DEMOS、PR、CHK、viewLesson、viewDone（見 tools/split_paid.py）
    if(!PR.length||typeof viewLesson!=='function')throw new Error('bad content');
    expose();viewLesson();
  });
}
function checkPaid(user){
  gateMsg('確認購買資格中…');
  return authSb.from('paid_users').select('email').then(function(r){
    if(r.error)throw r.error;
    if(!(r.data||[]).length)return viewNotPaid(user&&user.email);
    return loadContent();
  });
}
function gate(){
  gateMsg('載入中…');
  loadLib().then(function(){
    if(!window.supabase)throw new Error('no lib');
    authSb=window.supabase.createClient(SB_URL,SB_KEY);   // 和主站相同設定：登入狀態存在這個網域的 localStorage
    authSb.auth.onAuthStateChange(function(ev,s){if(ev==='SIGNED_IN'&&!gated&&s){gated=true;checkPaid(s.user).catch(gateError)}});
    return authSb.auth.getSession().then(function(r){
      var s=r&&r.data&&r.data.session;
      if(gated)return;
      if(!s)return viewLogin();
      gated=true;return checkPaid(s.user);
    });
  }).catch(gateError);
}
function expose(){window.__pos={st:st,PR:PR,CHK:CHK,DEMOS:DEMOS,view:viewItem,sayTexts:function(){var o=[];[].concat(DEMOS,PR,CHK).forEach(function(q){o.push.apply(o,q.o);o.push(fullSent(q))});return o}}}
'''


def cut_function(s, name):
    """從 s 切出 `function name(){ ... }`（到下一個行首的 `}`），回傳 (函式原文, 剩下的 s)。"""
    m = re.search(r'^function %s\(\)\{\n.*?^\}\n' % name, s, re.S | re.M)
    if not m:
        sys.exit('找不到 function %s' % name)
    return m.group(0), s[:m.start()] + s[m.end():]


def split(n):
    page = POS / ('l%d.html' % n)
    full_path = PRIV / ('l%d.full.html' % n)
    s = page.read_text(encoding='utf-8')
    if 'var LESSON_NO=' in s:          # 已經是外殼：改用備份的完整頁面
        if not full_path.exists():
            sys.exit('%s 已是外殼，且找不到 %s' % (page.name, full_path))
        s = full_path.read_text(encoding='utf-8')
    PRIV.mkdir(exist_ok=True)
    full_path.write_text(s, encoding='utf-8')

    content = []
    for var in ('DEMOS', 'PR', 'CHK'):
        m = re.search(r'^var %s=(\[.*?\]);\n' % var, s, re.M)
        if not m:
            sys.exit('l%d: 找不到 var %s' % (n, var))
        content.append('%s=%s;' % (var, m.group(1)))
        s = s[:m.start()] + s[m.end():]
    for fn in ('viewLesson', 'viewDone'):
        body, s = cut_function(s, fn)
        body = body.replace('function %s(){' % fn, '%s=function(){' % fn, 1).rstrip('\n') + ';'
        content.append(body)
    code = '\n'.join(content) + '\n'
    vid = 'src="lesson%d.mp4"' % n
    if code.count(vid) != 1:
        sys.exit('l%d: 影片網址 %s 找到 %d 處' % (n, vid, code.count(vid)))
    code = code.replace(vid, 'src="\'+esc(VIDEO)+\'"')
    (PRIV / ('l%d.js' % n)).write_text('/* 詞性小課第 %d 課：完整方案內容（私有，請勿放進公開儲存庫） */\n' % n + code, encoding='utf-8')

    tail = re.search(r"\ninitSb\(\);\nviewLesson\(\);\nwindow\.__pos=\{.*?\};\n", s)
    if not tail:
        sys.exit('l%d: 找不到啟動程式' % n)
    s = s[:tail.start()] + '\n' + GATE_JS.replace('__N__', str(n)).strip('\n') + '\n\ninitSb();\ngate();\n' + s[tail.end():]
    # 事件紀錄和登入共用同一份 supabase-js（只載入一次）
    init_old = re.search(r"^function initSb\(\)\{\n.*?^\}\n", s, re.S | re.M)
    if not init_old:
        sys.exit('l%d: 找不到 initSb' % n)
    s = s[:init_old.start()] + ("function initSb(){\n  if(DEBUG)return Promise.resolve();\n"
        "  sbReady=loadLib().then(function(){try{sb=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false}})}catch(e){}});\n"
        "  return sbReady;\n}\n") + s[init_old.end():]
    s = s.replace('</style>', '.inp{width:100%;min-height:48px;padding:10px 14px;border:1.5px solid #DDD8C8;border-radius:10px;font:inherit;background:#fff}\n</style>', 1)
    # 外殼裡不能留下任何題目或解析
    for q in re.findall(r'"id": "(L%d-[A-Z]+-\d+)"' % n, code):
        if q in s:
            sys.exit('l%d: 外殼仍含 %s' % (n, q))
    page.write_text(s, encoding='utf-8')
    print('l%d: 外殼 %d bytes，私有內容 %d bytes' % (n, len(s.encode()), len(code.encode())))


if __name__ == '__main__':
    for n in [int(a) for a in sys.argv[1:]] or [4, 5, 6, 7]:
        split(n)
