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
var setup={year:"all",type:"all",mode:"practice"};

/* 錯題本: {id:{streak:n}} streak>=2 視為已掌握 */
function wrongBook(){return load("wrong",{})}
function record(id,ok){var w=wrongBook();
  if(ok){if(w[id]){w[id].streak++;}}
  else w[id]={streak:0};
  save("wrong",w)}

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
  var w=wrongBook(),nw=Object.keys(w).filter(function(k){return w[k].streak<2}).length;
  var h=load("history",[]);
  var yrs=DATA.map(function(e){return e.year});
  app.innerHTML='<h1>學測英文考古題</h1><p class="mute">'+yrs[0]+'–'+yrs[yrs.length-1]+' 學年度選擇題,題目為英文。選年度、題型與作答方式後開始。</p>'+
  '<div class="card"><label class="lbl">學年度</label><div class="row" id="yr"></div>'+
  '<label class="lbl">題型</label><div class="row" id="ty"></div>'+
  '<label class="lbl">作答方式</label><div class="row" id="md"></div>'+
  '<p class="mute" id="hint"></p><p><button class="btn primary" id="go">開始練習</button></p></div>'+
  '<div class="card"><b>錯題本</b> <span class="mute">連續答對 2 次才算掌握</span><p>待加強:'+nw+' 題</p><button class="btn" id="wb"'+(nw?'':' disabled')+'>練習錯題</button></div>'+
  (S&&!S.done?'<div class="card"><b>未完成的作答</b><p class="mute">'+esc(S.title)+',已答 '+Object.keys(S.ans).length+' / '+S.n+' 題</p><button class="btn" id="resume">繼續作答</button></div>':'')+
  (h.length?'<h2>最近成績</h2>'+h.slice(0,5).map(function(r){return '<div class="mute">'+esc(r.title)+':'+r.score+' / '+r.n+'('+r.date+')</div>'}).join(''):'');
  function chips(id,items,key){
    var el=document.getElementById(id);
    el.innerHTML=items.map(function(it){return '<button class="chip" aria-pressed="'+(setup[key]===it[0])+'" data-v="'+it[0]+'">'+it[1]+'</button>'}).join('');
    el.onclick=function(ev){var b=ev.target.closest("button");if(!b)return;setup[key]=b.dataset.v;chips(id,items,key);hint()};
  }
  chips("yr",[["all","全部年度"]].concat(yrs.map(function(y){return[y,y]})),"year");
  chips("ty",[["all","全部題型"]].concat(TYPES),"type");
  chips("md",[["practice","練習(答完即看對錯)"],["exam","考試(交卷後看答案)"]],"mode");
  function hint(){var n=build(setup).reduce(function(a,g){return a+g.qs.length},0);
    document.getElementById("hint").textContent=n+" 題"+(setup.mode==="exam"&&setup.year!=="all"&&setup.type==="all"?",100 分鐘倒數計時":"");}
  hint();
  document.getElementById("go").onclick=function(){start({year:setup.year,type:setup.type,mode:setup.mode})};
  document.getElementById("wb").onclick=function(){
    var only={};Object.keys(w).forEach(function(k){if(w[k].streak<2)only[k]=1});
    start({year:"all",type:"all",mode:"practice",only:only,title:"錯題本"})};
  var r=document.getElementById("resume");if(r)r.onclick=function(){location.hash="#/quiz"};
}

function fmt(s){s=Math.max(0,s);return Math.floor(s/60)+":"+("0"+Math.floor(s%60)).slice(-2)}
var timer=null;
function quiz(){
  if(!S){location.hash="#/";return}
  var practice=S.opts.mode==="practice";
  var h='<div class="bar"><span id="prog"></span><span id="clock" class="mute"></span><button class="btn primary" id="submit">'+(practice?'結束':'交卷')+'</button></div><h1>'+esc(S.title)+'</h1>';
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
    if(un&&!confirm("還有 "+un+" 題沒作答,確定要結束嗎?"))return;finish()};
  refreshAll();tick();clearInterval(timer);timer=setInterval(tick,1000);
}
function qHtml(g,q){
  var id=g.year+"-"+q.n,h='<div class="q" id="q'+id+'"><p class="stem"><span class="no">'+q.n+'</span>'+(q.stem?esc(q.stem):'')+'</p>';
  if(q.img)h+='<img src="'+img(q.img)+'" alt="">';
  if(g.bank){h+='<div class="letters">'+g.bank.map(function(_,i){return '<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>'+L[i]+'</b></button>'}).join('')+'</div>'}
  else{h+='<div class="opts">'+q.opts.map(function(o,i){
    return '<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>('+L[i]+')</b><span>'+(q.optImgs?'<img src="'+img(q.optImgs[i])+'" alt="">':esc(o))+'</span></button>'}).join('')+'</div>'}
  return h+'<div class="fb" id="fb'+id+'"></div></div>';
}
function find(id){for(var i=0;i<S.groups.length;i++){var g=S.groups[i];for(var j=0;j<g.qs.length;j++)if(g.year+"-"+g.qs[j].n===id)return g.qs[j]}}
function pick(id,l){
  if(S.done)return;
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
    b.disabled=!!reveal;});
  var fb=document.getElementById("fb"+id);
  fb.className="fb"+(reveal?(a===q.ans?" ok":" bad"):"");
  fb.textContent=reveal?(a===q.ans?"✔ 答對了":"✘ "+(a?"你選 "+a+",":"未作答,")+"正確答案 "+q.ans):"";
  var bl=document.querySelector('.blank[data-b="'+id+'"]');
  if(bl){bl.textContent=a||q.n;bl.className="blank"+(a?" set":"")}
}
function refreshAll(){S.groups.forEach(function(g){g.qs.forEach(function(q){refresh(g.year+"-"+q.n)})});prog()}
function prog(){var e=document.getElementById("prog");if(e)e.textContent="已答 "+Object.keys(S.ans).length+" / "+S.n}
function tick(){
  var c=document.getElementById("clock");if(!c||!S||S.done)return;
  var el=(Date.now()-S.t0)/1000;
  if(S.limit){var left=S.limit-el;c.textContent="剩 "+fmt(left);if(left<=0){alert("時間到,自動交卷");finish()}}
  else c.textContent="用時 "+fmt(el);
}
function finish(){
  clearInterval(timer);S.done=true;
  var ok=0,by={};
  S.groups.forEach(function(g){g.qs.forEach(function(q){
    var id=g.year+"-"+q.n,a=S.ans[id],r=a===q.ans;if(r)ok++;
    if(S.opts.mode==="exam")record(id,r);
    var t=by[g.name]||(by[g.name]=[0,0]);t[1]++;if(r)t[0]++;})});
  S.score=ok;
  var hist=load("history",[]);hist.unshift({title:S.title,score:ok,n:S.n,date:new Date().toISOString().slice(0,10)});save("history",hist.slice(0,30));
  save("session",null);
  var wrong=[];S.groups.forEach(function(g){g.qs.forEach(function(q){var id=g.year+"-"+q.n;if(S.ans[id]!==q.ans)wrong.push(id)})});
  var h='<h1>成績</h1><div class="card"><div class="score">'+ok+' / '+S.n+'</div><div class="mute">答對率 '+Math.round(ok/S.n*100)+'% · 用時 '+fmt((Date.now()-S.t0)/1000)+'</div><div style="margin-top:10px">'+
    Object.keys(by).map(function(k){return '<div>'+k+':'+by[k][0]+' / '+by[k][1]+'</div>'}).join('')+'</div></div>'+
    '<p class="row"><button class="btn" id="rev">檢討全部題目</button>'+(wrong.length?'<button class="btn primary" id="rw">只看錯題('+wrong.length+')</button>':'')+'<a class="btn" href="#/" id="back">回首頁</a></p>';
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
