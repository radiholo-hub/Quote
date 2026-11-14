(function(){
"use strict";
var DATA=window.DATA||[],app=document.getElementById("app");
var LS="gsatEn.",L="ABCDEFGHIJ",LIMIT=100*60;
function load(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function img(p){return "img/"+p.split("/").pop()}
function fmt(s){s=Math.max(0,s);return Math.floor(s/60)+":"+("0"+Math.floor(s%60)).slice(-2)}

/* ---------- 題庫 ---------- */
function paper(year){return DATA.filter(function(e){return e.year===year})[0]}
function groupsOf(year){
  var out=[],e=paper(year);if(!e)return out;
  e.sections.forEach(function(s){s.groups.forEach(function(g){out.push({year:year,type:s.type,name:s.name,passage:g.passage,bank:g.bank,qs:g.questions})})});
  return out;
}
function allQs(groups){var a=[];groups.forEach(function(g){g.qs.forEach(function(q){a.push({g:g,q:q,id:g.year+"-"+q.n})})});return a}
/* 官方配分:106–110 第 1–40 題各 1 分、第 41–56 題各 2 分(72 分);111–115 第 1–30 題各 1 分、第 31–46 題各 2 分(62 分) */
function weight(year,n){return +year<=110?(n<=40?1:2):(n<=30?1:2)}
function scoreInfo(year){return +year<=110?{max:72,txt:"第 1–40 題各 1 分、第 41–56 題各 2 分"}:{max:62,txt:"第 1–30 題各 1 分、第 31–46 題各 2 分"}}

/* ---------- 狀態 ---------- */
var S=null;      // 作答中 {year,ans,t0,limit,locked}
var V=null;      // 目前畫面 {groups,review,qs}
var timer=null,modalEl=null;
function loadSession(){var s=load("session",null);if(!s)return null;
  if(s.opts&&!s.year)s={year:s.opts.year,ans:s.ans||{},t0:s.t0,limit:LIMIT,locked:!!s.locked};
  return paper(s.year)?s:null}
function persist(){save("session",S)}
function expired(){return !!(S&&S.limit&&Date.now()>=S.t0+S.limit*1000)}

/* ---------- 對話框與提示(Artifact 內不能用 confirm/alert) ---------- */
function closeModal(){if(modalEl){modalEl.remove();modalEl=null;document.removeEventListener("keydown",onKey)}}
function onKey(e){if(e.key==="Escape")closeModal()}
function ask(msg,okText,onOk){
  closeModal();
  modalEl=document.createElement("div");modalEl.className="modal";modalEl.setAttribute("role","dialog");modalEl.setAttribute("aria-modal","true");
  modalEl.innerHTML='<div class="box"><p>'+esc(msg)+'</p><div class="row"><button class="btn" data-m="no">取消</button><button class="btn primary" data-m="ok">'+esc(okText||"確認")+'</button></div></div>';
  modalEl.onclick=function(ev){var b=ev.target.closest("[data-m]");if(b){var ok=b.dataset.m==="ok";closeModal();if(ok)onOk()}else if(ev.target===modalEl)closeModal()};
  document.body.appendChild(modalEl);document.addEventListener("keydown",onKey);
  modalEl.querySelector('[data-m="no"]').focus();
}
function notify(msg){
  var b=document.getElementById("toast");if(!b){b=document.createElement("div");b.id="toast";b.setAttribute("role","status");document.body.appendChild(b)}
  b.textContent=msg;clearTimeout(b.t);b.t=setTimeout(function(){b.remove()},6000);
}

/* ---------- 首頁 ---------- */
function home(){
  var h=load("history",[]),best={},last=load("last",null);
  h.forEach(function(r){if(r.year&&r.raw!=null&&(!best[r.year]||r.raw>best[r.year]))best[r.year]=r.raw});
  app.innerHTML='<h1>學測英文考古題</h1><p class="mute">每學年一份「第壹部分單選題」整卷,不含混合題(111 學年度起)、中譯英與作文。計時 100 分鐘,時間到會鎖住作答、只能交卷;交卷後才顯示答案與詳解。<br>填空簡答、中譯英與作文不在本站計分,由老師人工批改。</p>'+
  (S?'<div class="card"><b>未完成:'+S.year+' 學年度</b><p class="mute">已答 '+Object.keys(S.ans).length+' 題'+(S.locked||expired()?'(時間已到,請交卷)':'')+'</p><button class="btn primary" id="resume">繼續作答</button></div>':'')+
  (last?'<div class="card"><b>最近一次交卷:'+last.year+' 學年度</b><p class="mute">'+esc(last.date||"")+'</p><a class="btn" href="#result">回成績與檢討</a></div>':'')+
  '<div class="grid papers">'+DATA.map(function(e){var n=allQs(groupsOf(e.year)).length;
    return '<button class="paper" data-y="'+e.year+'"><b>'+e.year+'</b><span>學年度</span><small>'+n+' 題單選'+(best[e.year]!=null?' · 最高 '+best[e.year]+' 分':'')+'</small></button>'}).join('')+'</div>'+
  (h.length?'<h2>最近成績</h2>'+h.slice(0,8).map(function(r){return '<div class="mute">'+esc(r.year||"")+' 學年度:答對 '+r.score+' / '+r.n+' 題'+(r.raw!=null?',原始分數 '+r.raw+' / '+r.max:'')+'('+esc(r.date)+')</div>'}).join(''):'');
  app.onclick=function(ev){var b=ev.target.closest(".paper");if(!b)return;
    var go=function(){S={year:b.dataset.y,ans:{},t0:Date.now(),limit:LIMIT,locked:false};persist();location.hash="#quiz"};
    if(S)ask("目前有未完成的作答,開始新考卷會捨棄它。確定要開始新考卷嗎?","捨棄並開始",go);else go()};
  var r=document.getElementById("resume");if(r)r.onclick=function(ev){ev.stopPropagation();location.hash="#quiz"};
}

/* ---------- 語音(只在交卷後):使用裝置內建的英文語音 ---------- */
var TTS="speechSynthesis" in window,spk={};
function clean(t){return String(t).replace(/\s*→\s*/g,", then ").replace(/【\d+】/g," blank ").replace(/_{2,}/g," blank ").replace(/\s+/g," ").trim()}
function stopSpeak(){if(TTS)speechSynthesis.cancel();[].forEach.call(document.querySelectorAll(".sp.on"),function(b){b.classList.remove("on")})}
function speak(text,rate,btn){
  if(!TTS){notify("這個瀏覽器不支援語音朗讀");return}
  var was=btn&&btn.classList.contains("on");stopSpeak();if(was)return;
  var vs=speechSynthesis.getVoices(),v=vs.filter(function(x){return /^en[-_]US/i.test(x.lang)})[0]||vs.filter(function(x){return /^en/i.test(x.lang)})[0];
  var parts=clean(text).match(/[^.!?;]+[.!?;]*/g)||[clean(text)];
  if(btn)btn.classList.add("on");
  parts.forEach(function(p,i){var u=new SpeechSynthesisUtterance(p.trim());u.lang="en-US";u.rate=rate||0.95;if(v)u.voice=v;
    if(i===parts.length-1)u.onend=u.onerror=function(){if(btn)btn.classList.remove("on")};speechSynthesis.speak(u)});
}
function spBtn(key,text,label,rate){spk[key]=[text,rate||0.95];return '<button class="sp" data-sp="'+key+'" aria-label="朗讀">🔊'+(label?' '+label:'')+'</button>'}
function speechClick(ev){
  var sp=ev.target.closest("[data-sp]");if(sp){var t=spk[sp.dataset.sp];if(t)speak(t[0],t[1],sp);return true}
  var w=ev.target.closest("[data-w]");if(w){speak(w.dataset.w,0.85,w);return true}
  return false;
}


function optText(g,q,i){return g.bank?g.bank[i]:(q.opts&&!q.optImgs?q.opts[i]:"")}
function fullText(g,q){   // 不唸題號、不唸選項字母:題幹 → 答案單字 → 填好答案的完整句
  var at=optText(g,q,L.indexOf(q.ans)).replace(/[.\s]+$/,""),p=[];
  if(q.stem)p.push(q.stem);
  if(at){p.push(at+".");if(q.stem&&/_{2,}/.test(q.stem)&&!g.bank)p.push(q.stem.replace(/_{2,}/,at))}
  return p.join(" ");
}
function filledPassage(g){
  var orig=groupsOf(g.year).filter(function(x){return x.passage===g.passage})[0]||g,m={};
  orig.qs.forEach(function(q){m[q.n]=optText(orig,q,L.indexOf(q.ans))});
  return g.passage.join(" ").replace(/【(\d+)】/g,function(_,n){return m[n]||" blank "});
}
/* ---------- 題目畫面(作答與檢討共用) ---------- */
function paperHtml(groups,review){
  var h="",lastKey="";
  groups.forEach(function(g,gi){
    var key=g.year+g.type;
    if(key!==lastKey){h+='<div class="sec">'+g.year+' · '+g.name+'</div>';lastKey=key}
    if(g.passage&&review)h+='<div class="spbar">'+spBtn('p'+gi,g.passage.join(' '),'朗讀文章')+spBtn('ps'+gi,g.passage.join(' '),'慢速',0.7)+(g.bank||g.type==="cloze"?spBtn('pf'+gi,filledPassage(g),'填入答案朗讀'):'')+'</div>';
    if(g.passage)h+='<div class="passage">'+g.passage.map(function(p){return '<p>'+esc(p).replace(/【(\d+)】/g,function(_,n){return '<span class="blank" data-b="'+g.year+'-'+n+'">'+n+'</span>'})+'</p>'}).join('')+'</div>';
    if(g.bank){var sent=g.type==="structure";
      h+='<div class="bank'+(sent?' sent':'')+'">'+g.bank.map(function(w,i){return '<div><b>('+L[i]+')</b> '+esc(w)+(review?' '+spBtn('b'+gi+L[i],w,'',0.9).replace('class="sp"','class="sp w"'):'')+'</div>'}).join('')+'</div>'}
    g.qs.forEach(function(q){h+=qHtml(g,q,review)});
  });
  return h;
}
function qHtml(g,q,review){
  var id=g.year+"-"+q.n,h='<div class="q" id="q'+id+'"><p class="stem"><span class="no">'+q.n+'</span>'+(q.stem?esc(q.stem):'')+'</p>';
  if(review){
    h+='<div class="spbar">'+spBtn('q'+id,fullText(g,q),'朗讀題目與答案');
    h+='</div>';
  }
  if(q.img)h+='<img src="'+img(q.img)+'" alt="題目附圖">';
  if(g.bank){h+='<div class="letters">'+g.bank.map(function(_,i){return '<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>'+L[i]+'</b></button>'}).join('')+'</div>'}
  else{h+='<div class="opts">'+q.opts.map(function(o,i){
    var btn='<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>('+L[i]+')</b><span>'+(q.optImgs?'<img src="'+img(q.optImgs[i])+'" alt="選項 '+L[i]+' 的圖">':esc(o))+'</span></button>';
    return review&&!q.optImgs?'<div class="optrow">'+btn+spBtn('o'+id+L[i],o,'',0.9).replace('class="sp"','class="sp side"').replace('aria-label="朗讀"','aria-label="朗讀選項 '+L[i]+'"')+'</div>':btn}).join('')+'</div>'}
  return h+'<div class="fb" id="fb'+id+'"></div><div id="ex'+id+'"></div></div>';
}
function findQ(id){for(var i=0;i<V.qs.length;i++)if(V.qs[i].id===id)return V.qs[i].q}

/* ---------- 作答 ---------- */
function quiz(){
  if(!S){location.hash="#home";return}
  var groups=groupsOf(S.year);V={groups:groups,review:false,qs:allQs(groups)};
  app.innerHTML='<div class="bar"><span id="prog"></span><span id="clock" class="mute"></span><button class="btn primary" id="submit">交卷</button></div><h1>'+S.year+' 學年度 第壹部分單選題</h1>'+paperHtml(groups,false);
  app.onclick=function(ev){var b=ev.target.closest(".opt");if(!b||b.disabled)return;pick(b.dataset.id,b.dataset.l)};
  document.getElementById("submit").onclick=submit;
  V.qs.forEach(function(x){refresh(x.id)});prog();tick();
  clearInterval(timer);timer=setInterval(tick,1000);
}
function pick(id,l){
  if(!S||V.review)return;
  if(expired()||S.locked){lock();return}   // 選答案前重新判斷是否到期
  S.ans[id]=l;persist();refresh(id);prog();
}
function submit(){
  if(expired())lock();
  var un=V.qs.length-Object.keys(S.ans).length;
  if(un>0&&!S.locked)ask("還有 "+un+" 題沒作答,確定要交卷嗎?交卷後不能再修改答案。","確認交卷",finish);
  else if(S.locked)finish();
  else ask("確定要交卷嗎?交卷後不能再修改答案。","確認交卷",finish);
}
function tick(){
  if(!S||!V||V.review)return;
  var c=document.getElementById("clock");if(!c)return;
  if(expired()){lock();return}
  var left=S.t0+S.limit*1000-Date.now();c.textContent="剩 "+fmt(left/1000);
}
function lock(){
  var first=!S.locked;S.locked=true;persist();
  var c=document.getElementById("clock");if(c)c.textContent="時間到";
  [].forEach.call(document.querySelectorAll(".opt"),function(b){b.disabled=true});
  if(first)notify("時間到!作答已鎖定,請按「交卷」。");
}
function finish(){
  if(!S)return;
  clearInterval(timer);
  var tEnd=Math.min(Date.now(),S.t0+S.limit*1000);   // 用時不超過 100 分鐘
  var rec={year:S.year,ans:S.ans,t0:S.t0,tEnd:tEnd,locked:!!(S.locked||expired()),date:new Date().toISOString().slice(0,16).replace("T"," ")};
  var g=grade(rec);
  var hist=load("history",[]);hist.unshift({year:rec.year,score:g.right,n:g.n,raw:g.raw,max:g.max,date:rec.date.slice(0,10)});save("history",hist.slice(0,30));
  save("last",rec);save("session",null);S=null;
  location.hash="#result";if(location.hash==="#result")route();
}

/* ---------- 計分 ---------- */
function grade(rec){
  var groups=groupsOf(rec.year),r={right:0,wrong:0,blank:0,raw:0,n:0,max:scoreInfo(rec.year).max,by:{},wrongIds:[],blankIds:[]};
  groups.forEach(function(g){var t=r.by[g.name]||(r.by[g.name]={right:0,n:0});
    g.qs.forEach(function(q){var id=g.year+"-"+q.n,a=rec.ans[id];r.n++;t.n++;
      if(!a){r.blank++;r.blankIds.push(id)}
      else if(a===q.ans){r.right++;t.right++;r.raw+=weight(g.year,q.n)}
      else{r.wrong++;r.wrongIds.push(id)}})});
  return r;
}
function result(){
  var rec=load("last",null);if(!rec||!paper(rec.year)){location.hash="#home";return}
  var g=grade(rec),si=scoreInfo(rec.year),used=(rec.tEnd-rec.t0)/1000;
  var h='<h1>'+rec.year+' 學年度 成績</h1><div class="card"><div class="score">答對 '+g.right+' / '+g.n+' 題</div>'+
    '<div class="tally"><span class="ok">答對 '+g.right+'</span><span class="bad">答錯 '+g.wrong+'</span><span>未作答 '+g.blank+'</span></div>'+
    '<div style="margin-top:10px"><b>原始分數 '+g.raw+' / '+g.max+'</b><div class="mute">依官方配分的單選題原始分數('+si.txt+')。不含混合題、中譯英與作文,不是整份學測的分數或級分。</div></div>'+
    '<div class="mute" style="margin-top:8px">用時 '+fmt(used)+(rec.locked?'(時間到,作答已鎖定)':'')+'</div>'+
    '<div style="margin-top:10px">'+Object.keys(g.by).map(function(k){return '<div>'+k+':'+g.by[k].right+' / '+g.by[k].n+'</div>'}).join('')+'</div></div>'+
    '<p class="mute">填空簡答、中譯英、作文由老師人工批改,不在本站計分。</p><div class="row">'+
    '<a class="btn primary" href="#review-all">檢討全部題目</a>'+
    (g.wrong?'<a class="btn" href="#review-wrong">只看答錯('+g.wrong+')</a>':'')+
    (g.blank?'<a class="btn" href="#review-blank">只看未作答('+g.blank+')</a>':'')+
    (g.wrong&&g.blank?'<a class="btn" href="#review-miss">答錯與未作答('+(g.wrong+g.blank)+')</a>':'')+
    '<a class="btn" href="#vocab">本卷單字表</a><a class="btn" href="#home">回首頁</a></div>';
  app.innerHTML=h;window.scrollTo(0,0);
}

/* ---------- 檢討 ---------- */
var FILTERS={"review-all":"全部題目","review-wrong":"答錯","review-blank":"未作答","review-miss":"答錯與未作答"};
function review(name){
  var rec=load("last",null);if(!rec||!paper(rec.year)){location.hash="#home";return}
  var g=grade(rec),keep=null;
  if(name==="review-wrong")keep=g.wrongIds;else if(name==="review-blank")keep=g.blankIds;else if(name==="review-miss")keep=g.wrongIds.concat(g.blankIds);
  var set={};if(keep)keep.forEach(function(i){set[i]=1});
  var groups=groupsOf(rec.year).map(function(x){return Object.assign({},x,{qs:x.qs.filter(function(q){return !keep||set[x.year+"-"+q.n]})})}).filter(function(x){return x.qs.length});
  S=null;V={groups:groups,review:true,qs:allQs(groups),ans:rec.ans};
  app.innerHTML='<div class="bar"><a class="btn" href="#result">回成績</a><span class="mute">檢討:'+FILTERS[name]+' '+V.qs.length+' 題</span><a class="btn" href="#home">首頁</a></div><h1>'+rec.year+' 學年度 檢討</h1>'+
    (V.qs.length?paperHtml(groups,true):'<p class="mute">沒有符合的題目。</p>');
  app.onclick=function(ev){speechClick(ev)};
  V.qs.forEach(function(x){refresh(x.id)});
}
function refresh(id){
  var q=findQ(id),a=(V.review?V.ans:S.ans)[id],box=document.getElementById("q"+id);
  if(!box)return;
  [].forEach.call(box.querySelectorAll(".opt"),function(b){
    var l=b.dataset.l;b.className="opt"+(!V.review&&a===l?" sel":"")+(V.review&&l===q.ans?" ok":"")+(V.review&&a===l&&l!==q.ans?" bad":"");
    b.disabled=V.review||!!(S&&S.locked);});
  if(V.review){
    var ex=document.getElementById("ex"+id);if(ex&&!ex.innerHTML)ex.innerHTML=exHtml(id,q);
    var fb=document.getElementById("fb"+id);
    fb.className="fb "+(a===q.ans?"ok":"bad");
    fb.textContent=a===q.ans?"✔ 答對了":"✘ "+(a?"你選 "+a+",":"未作答,")+"正確答案 "+q.ans;
  }
  var bl=document.querySelector('.blank[data-b="'+id+'"]');
  if(bl){bl.textContent=a||q.n;bl.className="blank"+(a?" set":"")}
}
function prog(){var e=document.getElementById("prog");if(e)e.textContent="已答 "+Object.keys(S.ans).length+" / "+V.qs.length}
function exHtml(id,q){
  var p=id.split("-"),e=(window.EXPLAIN||{})[p[0]],x=e&&e[p[1]];
  if(!x)return '<div class="mute">此題詳解尚未提供</div>';
  var h='<details class="ex"><summary>詳解 <span class="draft">草稿・待老師審核</span></summary><p>'+esc(x.key)+'</p>';
  if(x.opts)h+='<ul>'+Object.keys(x.opts).map(function(k){return '<li><b>'+k+(k===q.ans?' ✔':'')+'</b> '+esc(x.opts[k])+'</li>'}).join('')+'</ul>';
  if(x.vocab&&x.vocab.length)h+='<p class="mute">'+x.vocab.map(function(v){return '<button class="sp w" data-w="'+esc(v[0])+'">🔊 <b>'+esc(v[0])+'</b></button> '+esc(v[1])}).join(' ・ ')+'</p>';
  return h+'</details>';
}

/* ---------- 單字表 ---------- */
function vocabPage(){
  var rec=load("last",null);if(!rec||!paper(rec.year)){location.hash="#home";return}
  var ex=(window.EXPLAIN||{})[rec.year]||{},seen={},rows=[];
  Object.keys(ex).sort(function(a,b){return a-b}).forEach(function(n){(ex[n].vocab||[]).forEach(function(v){var k=v[0].toLowerCase()+"|"+v[1];if(!seen[k]){seen[k]=1;rows.push([v[0],v[1],n])}})});
  app.innerHTML='<h1>'+rec.year+' 學年度 單字表</h1><p class="mute">共 '+rows.length+' 個(草稿・待老師審核),點 🔊 聽發音。</p><p><a class="btn" href="#result">返回成績</a></p><div class="card vocab">'+
    rows.map(function(r){return '<div class="vrow"><button class="sp w" data-w="'+esc(r[0])+'">🔊</button><b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span><small class="mute">第 '+r[2]+' 題</small></div>'}).join('')+'</div>';
  app.onclick=function(ev){speechClick(ev)};
}

/* ---------- 路由 ---------- */
function route(){
  stopSpeak();closeModal();clearInterval(timer);app.onclick=null;V=null;
  var hs=location.hash.replace(/^#\/?/,"");
  if(hs==="quiz"){S=S||loadSession();quiz()}
  else if(hs==="result")result();
  else if(FILTERS[hs])review(hs);
  else if(hs==="vocab")vocabPage();
  else{S=loadSession();home()}
}
["visibilitychange","focus","pageshow"].forEach(function(ev){(ev==="visibilitychange"?document:window).addEventListener(ev,function(){if(V&&!V.review)tick()})});
window.addEventListener("hashchange",route);
S=loadSession();route();
})();
