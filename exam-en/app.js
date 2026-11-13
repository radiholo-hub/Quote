(function(){
"use strict";
var DATA=window.DATA||[],app=document.getElementById("app");
var TYPES=[["vocab","詞彙"],["cloze","綜合測驗"],["bank","文意選填"],["structure","篇章結構"],["reading","閱讀測驗"]];
var LS="gsatEn.";
function load(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function img(p){return "img/"+p.split("/").pop()}
var L="ABCDEFGHIJ";
var S=null; // 目前的作答


/* 錯題本: {id:{streak:n}} streak>=2 視為已掌握 */
function wrongBook(){return load("wrong",{})}
function record(){}

function build(opts){
  var groups=[];
  DATA.forEach(function(e){
    if(opts.year!=="all"&&e.year!==opts.year)return;
    e.sections.forEach(function(s){
      if(opts.type!=="all"&&s.type!==opts.type)return;
      s.groups.forEach(function(g){
        var qs=g.questions.filter(function(q){return !opts.only||opts.only[e.year+"-"+q.n]});
        if(!qs.length)return;
        groups.push({year:e.year,type:s.type,name:s.name,passage:g.passage,bank:g.bank,qs:qs});
      });
    });
  });
  return groups;
}
function start(opts){
  var groups=build(opts);
  if(!groups.length){alert("沒有符合的題目");return}
  var n=groups.reduce(function(a,g){return a+g.qs.length},0);
  var full=opts.year!=="all"&&opts.type==="all"&&!opts.only;
  S={opts:opts,groups:groups,n:n,ans:{},done:false,t0:Date.now(),limit:(opts.mode==="exam"&&full)?100*60:0,title:opts.title||(opts.year==="all"?"歷屆":opts.year+" 學年度")+(opts.type!=="all"?" · "+TYPES.filter(function(t){return t[0]===opts.type})[0][1]:"")};
  persist();location.hash="#/quiz";
}
function persist(){save("session",S)}

function home(){
  var h=load("history",[]),best={};
  h.forEach(function(r){if(r.year&&(!best[r.year]||r.score>best[r.year].score))best[r.year]=r});
  var cur=S&&!S.done?S:null;
  app.innerHTML='<h1>學測英文考古題</h1><p class="mute">每學年一份整卷(選擇題),計時 100 分鐘,時間到會鎖住作答、只能交卷。交卷後才顯示答案與詳解。<br>填空簡答、中譯英與作文不在本站計分,由老師人工批改。</p>'+
  (cur?'<div class="card"><b>未完成:'+esc(cur.title)+'</b><p class="mute">已答 '+Object.keys(cur.ans).length+' / '+cur.n+' 題</p><button class="btn primary" id="resume">繼續作答</button></div>':'')+
  '<div class="grid papers">'+DATA.map(function(e){var n=e.sections.reduce(function(a,s){return a+s.groups.reduce(function(b,g){return b+g.questions.length},0)},0),bs=best[e.year];
    return '<button class="paper" data-y="'+e.year+'"><b>'+e.year+'</b><span>學年度</span><small>'+n+' 題'+(bs?' · 最高 '+bs.score:'')+'</small></button>'}).join('')+'</div>'+
  (h.length?'<h2>最近成績</h2>'+h.slice(0,8).map(function(r){return '<div class="mute">'+esc(r.title)+':'+r.score+' / '+r.n+'('+r.date+')</div>'}).join(''):'');
  app.onclick=function(ev){var b=ev.target.closest(".paper");if(!b)return;
    if(cur&&!confirm("目前有未完成的作答,開始新考卷會捨棄它。確定嗎?"))return;
    start({year:b.dataset.y,type:"all",mode:"exam"})};
  var r=document.getElementById("resume");if(r)r.onclick=function(ev){ev.stopPropagation();location.hash="#/quiz"};
}

function fmt(s){s=Math.max(0,s);return Math.floor(s/60)+":"+("0"+Math.floor(s%60)).slice(-2)}
var timer=null;
function quiz(){
  if(!S){location.hash="#/";return}
  var practice=S.opts.mode==="practice";
  var h='<div class="bar"><span id="prog"></span><span id="clock" class="mute"></span><button class="btn primary" id="submit">'+'交卷'+'</button></div><h1>'+esc(S.title)+'</h1>';
  var lastKey="";
  S.groups.forEach(function(g,gi){
    var key=g.year+g.type;
    if(key!==lastKey){h+='<div class="sec">'+g.year+' · '+g.name+'</div>';lastKey=key}
    if(g.passage)h+='<div class="passage">'+g.passage.map(function(p){return '<p>'+esc(p).replace(/【(\d+)】/g,function(_,n){return '<span class="blank" data-b="'+g.year+'-'+n+'">'+n+'</span>'})+'</p>'}).join('')+'</div>';
    if(g.bank){var sent=g.type==="structure";
      h+='<div class="bank'+(sent?' sent':'')+'">'+g.bank.map(function(w,i){return '<div><b>('+L[i]+')</b> '+esc(w)+'</div>'}).join('')+'</div>'}
    g.qs.forEach(function(q){h+=qHtml(g,q)});
  });
  app.innerHTML=h;
  app.onclick=function(ev){var b=ev.target.closest(".opt");if(!b||b.disabled)return;pick(b.dataset.id,b.dataset.l)};
  document.getElementById("submit").onclick=function(){
    var un=S.n-Object.keys(S.ans).length;
    if(un&&!S.locked&&!confirm("還有 "+un+" 題沒作答,確定要結束嗎?"))return;finish()};
  refreshAll();tick();if(S.limit&&!S.done&&(Date.now()-S.t0)/1000>=S.limit)lock();clearInterval(timer);timer=setInterval(tick,1000);
}
function qHtml(g,q){
  var id=g.year+"-"+q.n,h='<div class="q" id="q'+id+'"><p class="stem"><span class="no">'+q.n+'</span>'+(q.stem?esc(q.stem):'')+'</p>';
  if(q.img)h+='<img src="'+img(q.img)+'" alt="">';
  if(g.bank){h+='<div class="letters">'+g.bank.map(function(_,i){return '<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>'+L[i]+'</b></button>'}).join('')+'</div>'}
  else{h+='<div class="opts">'+q.opts.map(function(o,i){
    return '<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>('+L[i]+')</b><span>'+(q.optImgs?'<img src="'+img(q.optImgs[i])+'" alt="">':esc(o))+'</span></button>'}).join('')+'</div>'}
  return h+'<div class="fb" id="fb'+id+'"></div><div id="ex'+id+'"></div></div>';
}
function find(id){for(var i=0;i<S.groups.length;i++){var g=S.groups[i];for(var j=0;j<g.qs.length;j++)if(g.year+"-"+g.qs[j].n===id)return g.qs[j]}}
function pick(id,l){
  if(S.done||S.locked)return;
  var practice=S.opts.mode==="practice";
  if(practice&&S.ans[id])return;
  S.ans[id]=l;
  if(practice){var q=find(id);record(id,l===q.ans)}
  persist();refresh(id);prog();
}
function refresh(id){
  var q=find(id),a=S.ans[id],reveal=S.done||(S.opts.mode==="practice"&&a),box=document.getElementById("q"+id);
  if(!box)return;
  [].forEach.call(box.querySelectorAll(".opt"),function(b){
    var l=b.dataset.l;b.className="opt"+(!reveal&&a===l?" sel":"")+(reveal&&l===q.ans?" ok":"")+(reveal&&a===l&&l!==q.ans?" bad":"");
    b.disabled=!!reveal||!!S.locked;});
  var ex=document.getElementById("ex"+id);
  if(ex&&S.done&&!ex.innerHTML)ex.innerHTML=exHtml(id);
  var fb=document.getElementById("fb"+id);
  fb.className="fb"+(reveal?(a===q.ans?" ok":" bad"):"");
  fb.textContent=reveal?(a===q.ans?"✔ 答對了":"✘ "+(a?"你選 "+a+",":"未作答,")+"正確答案 "+q.ans):"";
  var bl=document.querySelector('.blank[data-b="'+id+'"]');
  if(bl){bl.textContent=a||q.n;bl.className="blank"+(a?" set":"")}
}
function exHtml(id){
  var p=id.split("-"),e=(window.EXPLAIN||{})[p[0]],x=e&&e[p[1]];
  if(!x)return '<div class="mute">此題詳解尚未提供</div>';
  var q=find(id),h='<details class="ex"><summary>詳解 <span class="draft">草稿・待老師審核</span></summary><p>'+esc(x.key)+'</p>';
  if(x.opts)h+='<ul>'+Object.keys(x.opts).map(function(k){return '<li><b>'+k+(k===q.ans?' ✔':'')+'</b> '+esc(x.opts[k])+'</li>'}).join('')+'</ul>';
  if(x.vocab&&x.vocab.length)h+='<p class="mute">'+x.vocab.map(function(v){return '<b>'+esc(v[0])+'</b> '+esc(v[1])}).join(' ・ ')+'</p>';
  return h+'</details>';
}
function refreshAll(){S.groups.forEach(function(g){g.qs.forEach(function(q){refresh(g.year+"-"+q.n)})});prog()}
function prog(){var e=document.getElementById("prog");if(e)e.textContent="已答 "+Object.keys(S.ans).length+" / "+S.n}
function tick(){
  var c=document.getElementById("clock");if(!c||!S||S.done)return;
  var el=(Date.now()-S.t0)/1000;
  if(S.limit){var left=S.limit-el;c.textContent="剩 "+fmt(left);if(left<=0)lock()}
  else c.textContent="用時 "+fmt(el);
}
function lock(){
  if(S.locked)return;S.locked=true;persist();
  var c=document.getElementById("clock");if(c)c.textContent="時間到";
  document.getElementById("submit").textContent="交卷";
  [].forEach.call(document.querySelectorAll(".opt"),function(b){b.disabled=true});
  alert("時間到!作答已鎖定,請按「交卷」。");
}
function finish(){
  clearInterval(timer);S.done=true;
  var ok=0,by={};
  S.groups.forEach(function(g){g.qs.forEach(function(q){
    var id=g.year+"-"+q.n,a=S.ans[id],r=a===q.ans;if(r)ok++;
    if(S.opts.mode==="exam")record(id,r);
    var t=by[g.name]||(by[g.name]=[0,0]);t[1]++;if(r)t[0]++;})});
  S.score=ok;
  var hist=load("history",[]);hist.unshift({year:S.opts.year,title:S.title,score:ok,n:S.n,date:new Date().toISOString().slice(0,10)});save("history",hist.slice(0,30));
  save("session",null);
  var wrong=[];S.groups.forEach(function(g){g.qs.forEach(function(q){var id=g.year+"-"+q.n;if(S.ans[id]!==q.ans)wrong.push(id)})});
  var h='<h1>成績</h1><div class="card"><div class="score">'+ok+' / '+S.n+'</div><div class="mute">答對率 '+Math.round(ok/S.n*100)+'% · 用時 '+fmt((Date.now()-S.t0)/1000)+'</div><div style="margin-top:10px">'+
    Object.keys(by).map(function(k){return '<div>'+k+':'+by[k][0]+' / '+by[k][1]+'</div>'}).join('')+'</div></div>'+
    '<p class="mute">本站只計選擇題;填空簡答、中譯英、作文由老師人工批改。</p><p class="row"><button class="btn" id="rev">檢討全部題目</button>'+(wrong.length?'<button class="btn primary" id="rw">只看錯題('+wrong.length+')</button>':'')+'<a class="btn" href="#/" id="back">回首頁</a></p>';
  app.innerHTML=h;
  document.getElementById("rev").onclick=function(){review(null)};
  var rw=document.getElementById("rw");if(rw)rw.onclick=function(){review(wrong)};
  window.scrollTo(0,0);
}
function review(only){
  S.opts=Object.assign({},S.opts);
  var saved=S;
  var keep=only?{}:null;if(only)only.forEach(function(i){keep[i]=1});
  var groups=S.groups.map(function(g){return Object.assign({},g,{qs:g.qs.filter(function(q){return !keep||keep[g.year+"-"+q.n]})})}).filter(function(g){return g.qs.length});
  var tmp=Object.assign({},S,{groups:groups,n:groups.reduce(function(a,g){return a+g.qs.length},0)});
  S=tmp;
  var barless=true;quiz();
  var b=document.getElementById("submit");b.textContent="回首頁";b.onclick=function(){location.hash="#/"};
  document.getElementById("clock").textContent="檢討";
  S.done=true;refreshAll();
}
function route(){
  clearInterval(timer);app.onclick=null;
  if(location.hash==="#/quiz"){
    if(!S)S=load("session",null);
    quiz();
  }else{if(!S||S.done)S=load("session",null);home()}
}
window.addEventListener("hashchange",route);
S=load("session",null);route();
})();
