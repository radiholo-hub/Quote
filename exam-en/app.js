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
  var h=load("history",[]),best={},last=lastRec();
  h.forEach(function(r){if(r.year&&r.raw!=null&&(!best[r.year]||r.raw>best[r.year]))best[r.year]=r.raw});
  app.innerHTML='<h1>學測英文考古題</h1><p class="mute">每學年一份試卷:第壹部分單選題,以及中譯英、英文作文題目(111 學年度起的第貳部分混合題未收錄)。計時 100 分鐘,時間到會鎖住作答、只能交卷;交卷後才顯示單選題答案與詳解。<br>中譯英與作文只提供原題,紙筆作答,網站不提供答案、詳解、範文或評分。<br><b>111、115 學年度另有「完整原卷」</b>:含第貳部分混合題(可複選的第 49 題、填充與簡答)與中譯英、作文原題,全卷共用 100 分鐘。</p>'+writingPracticeCard()+
  (S?'<div class="card"><b>未完成:'+S.year+' 學年度'+(isFull(S)?'(完整原卷)':'')+'</b><p class="mute">已答 '+Object.keys(S.ans).length+' 題'+(S.locked||expired()?'(時間已到,請交卷)':'')+'</p><button class="btn primary" id="resume">繼續作答</button></div>':'')+
  (last?'<div class="card"><b>最近一次交卷:'+last.year+' 學年度</b><p class="mute">'+esc(last.date||"")+'</p><a class="btn" href="#result">回成績與檢討</a></div>':'')+
  '<div class="grid papers">'+DATA.map(function(e){var n=allQs(groupsOf(e.year)).length;
    return '<div class="pcard"><button class="paper" data-y="'+e.year+'"><b>'+e.year+'</b><span>學年度</span><small>'+n+' 題單選 + 中譯英、作文'+(best[e.year]!=null?' · 最高 '+best[e.year]+' 分':'')+'</small></button>'+
      (FP[e.year]?'<button class="fullbtn" data-full="'+e.year+'">完整原卷<br><small>含混合題、作答欄</small></button>':'')+'</div>'}).join('')+'</div>'+
  (h.length?'<h2>最近成績</h2>'+h.slice(0,8).map(function(r){return '<div class="mute">'+esc(r.year||"")+' 學年度:答對 '+r.score+' / '+r.n+' 題'+(r.mode==="full"?'(完整原卷)':'')+(r.raw!=null?',單選原始分數 '+r.raw+' / '+r.max:'')+(r.mixed!=null?',混合題已計分 '+r.mixed:'')+'('+esc(r.date)+')</div>'}).join(''):'');
  app.onclick=function(ev){var f=ev.target.closest(".fullbtn"),b=f||ev.target.closest(".paper");if(!b)return;
    var y=f?f.dataset.full:b.dataset.y;
    var go=function(){S={year:y,mode:f?"full":"mc",ans:{},fill:{},multi:{},t0:Date.now(),limit:LIMIT,locked:false};persist();location.hash="#quiz"};
    if(S)ask("目前有未完成的作答,開始新考卷會捨棄它。確定要開始新考卷嗎?","捨棄並開始",go);else go()};
  var r=document.getElementById("resume");if(r)r.onclick=function(ev){ev.stopPropagation();location.hash="#quiz"};
}

/* ---------- 語音(只在交卷後):使用裝置內建的英文語音 ---------- */
var TTS="speechSynthesis" in window,spk={};
function clean(t){return String(t).replace(/\s*→\s*/g,", then ").replace(/【\d+】/g," blank ").replace(/_{2,}/g," blank ").replace(/\s+/g," ").trim()}
function stopSpeak(){if(TTS)speechSynthesis.cancel();[].forEach.call(document.querySelectorAll(".sp.on"),function(b){b.classList.remove("on")})}
/* 挑選聲音:優先自然/神經網路/高品質聲音,避開 Apple 的趣味聲音與 Eloquence 合成聲 */
var BAD_VOICE=/eloquence|fred|albert|bad news|bahh|bells|boing|bubbles|cellos|zarvox|whisper|trinoids|organ|jester|junior|ralph|kathy|superstar|wobble|grandma|grandpa|rocko|shelley|sandy|flo\b|reed|eddy|good news|hysterical|pipe/i;
function voiceScore(v){var n=v.name||"",s=0;
  if(/^en[-_]US/i.test(v.lang))s+=30;else if(/^en[-_](GB|AU|CA|IE|NZ)/i.test(v.lang))s+=20;else if(/^en/i.test(v.lang))s+=10;else return -1;
  if(/natural|neural/i.test(n))s+=12;if(/online/i.test(n))s+=4;if(/premium|enhanced|高品質|增強/i.test(n))s+=10;if(/google/i.test(n))s+=8;
  if(/samantha|ava|allison|susan|zoe|evan|nathan|aria|jenny|guy|libby|sonia|serena|daniel|karen|moira|tessa/i.test(n))s+=4;
  if(BAD_VOICE.test(n))s-=60;return s}
function enVoices(){if(!TTS)return [];return speechSynthesis.getVoices().filter(function(v){return voiceScore(v)>=0}).sort(function(a,b){return voiceScore(b)-voiceScore(a)})}
function pickVoice(){var vs=enVoices(),want=load("voice","");return vs.filter(function(v){return v.voiceURI===want})[0]||vs[0]||null}
function rateFactor(){var r=+load("rate",1);return r>=0.6&&r<=1.4?r:1}
function chunks(t){   // 依句子切段再合併到約 180 字,太碎會斷斷續續、太長部分瀏覽器會中途停掉
  var parts=t.match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g)||[t],out=[],cur="";
  parts.forEach(function(p){if((cur+p).length>180&&cur){out.push(cur.trim());cur=p}else cur+=p});
  if(cur.trim())out.push(cur.trim());return out;
}
function speak(text,rate,btn){
  if(!TTS){notify("這個瀏覽器不支援語音朗讀");return}
  var was=btn&&btn.classList.contains("on");stopSpeak();if(was)return;
  var v=pickVoice(),parts=chunks(clean(text)),r=Math.min(1.5,(rate||0.95)*rateFactor());
  if(btn)btn.classList.add("on");
  parts.forEach(function(p,i){var u=new SpeechSynthesisUtterance(p);u.lang=v?v.lang:"en-US";u.rate=r;u.pitch=1;if(v)u.voice=v;
    if(i===parts.length-1)u.onend=u.onerror=function(){if(btn)btn.classList.remove("on")};speechSynthesis.speak(u)});
}
/* 朗讀設定(檢討頁、單字表):選聲音、語速、試聽;設定存在這台裝置 */
function voiceBarHtml(){
  if(!TTS)return '<p class="mute">這個瀏覽器不支援語音朗讀。</p>';
  return '<div class="voicebar"><span class="vg vg-voice"><label for="vsel">朗讀聲音</label><select id="vsel"></select></span>'+
    '<span class="vg"><label for="vrate">語速</label><select id="vrate"><option value="0.8">慢</option><option value="1">標準</option><option value="1.15">快</option></select>'+
    '<button type="button" class="sp" id="vtry">🔊 試聽</button></span></div>';
}
function initVoiceBar(){
  var sel=document.getElementById("vsel"),rs=document.getElementById("vrate");if(!sel)return;
  function fill(){var vs=enVoices(),cur=pickVoice();
    sel.innerHTML=vs.length?vs.map(function(v){return '<option value="'+esc(v.voiceURI)+'"'+(cur&&v.voiceURI===cur.voiceURI?' selected':'')+'>'+esc(v.name)+' ('+esc(v.lang)+')</option>'}).join(''):'<option value="">(裝置沒有英文聲音)</option>'}
  fill();if(TTS&&!enVoices().length){try{if(speechSynthesis.addEventListener)speechSynthesis.addEventListener("voiceschanged",fill,{once:true});else speechSynthesis.onvoiceschanged=fill}catch(e){}}   // 舊版瀏覽器沒有 addEventListener 時改用 onvoiceschanged
  rs.value=String(rateFactor()===1?1:rateFactor());if(!rs.value)rs.value="1";
  sel.onchange=function(){save("voice",sel.value);stopSpeak()};
  rs.onchange=function(){save("rate",+rs.value);stopSpeak()};
  document.getElementById("vtry").onclick=function(ev){ev.stopPropagation();speak("Hello. This is how the English questions will sound. Please listen carefully.",0.95,this)};
}
function spBtn(key,text,label,rate){spk[key]=[text,rate||0.95];return '<button class="sp" data-sp="'+key+'" aria-label="朗讀">🔊'+(label?' '+label:'')+'</button>'}
function speechClick(ev){
  var sp=ev.target.closest("[data-sp]");if(sp){var t=spk[sp.dataset.sp];if(t)speak(t[0],t[1],sp);return true}
  var w=ev.target.closest("[data-w]");if(w){speak(w.dataset.w,0.85,w);return true}
  return false;
}


function optText(g,q,i){return g.bank?g.bank[i]:(q.opts&&!q.optImgs?q.opts[i]:"")}
function isPlaceholder(q){return !!q.optImgs||(q.opts||[]).some(function(o){return /[\u4e00-\u9fff]/.test(o)})}   // 選項是圖或「圖 A」之類占位字
function filledPassage(g){
  var orig=groupsOf(g.year).filter(function(x){return x.passage===g.passage})[0]||g,m={};
  orig.qs.forEach(function(q){m[q.n]=optText(orig,q,L.indexOf(q.ans))});
  return g.passage.join(" ").replace(/【(\d+)】/g,function(_,n){return m[n]||" blank "});
}

/* ---------- 中文翻譯(只在檢討頁,點開才顯示) ---------- */
function trOf(year){return (window.TRANS||{})[year]||null}
function origGroup(g){return groupsOf(g.year).filter(function(x){return x.passage?x.passage===g.passage:x.qs[0]===g.qs[0]})[0]||g}
function trSummary(t){return '<summary>'+t+' <span class="draft">草稿・待老師審核</span></summary>'}
function passageTrHtml(g){
  var t=trOf(g.year);if(!t||!g.passage)return "";
  var key=String(origGroup(g).qs[0].n),p=(t.passage||{})[key],bk=(t.bank||{})[key];if(!p&&!bk)return "";
  return '<details class="tr">'+trSummary('全文中文翻譯')+
    (p?p.map(function(x){return '<p>'+esc(x).replace(/【(\d+)】/g,'<span class="blank set">$1</span>')+'</p>'}).join(''):'')+
    (bk?'<p class="mute">選項中譯:</p><ul class="trbank">'+bk.map(function(x,i){return '<li><b>('+L[i]+')</b> '+esc(x)+'</li>'}).join('')+'</ul>':'')+'</details>';
}
function qTrHtml(g,q){
  var t=trOf(g.year),e=t&&(t.q||{})[q.n];if(!e||(!e.stem&&!(e.opts||[]).length))return "";
  return '<details class="tr">'+trSummary('中文翻譯')+(e.stem?'<p>'+esc(e.stem)+'</p>':'')+
    ((e.opts||[]).length?'<ul class="tropts">'+e.opts.map(function(x,i){return '<li><b>('+L[i]+')</b> '+esc(x)+'</li>'}).join('')+'</ul>':'')+'</details>';
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
    if(review&&g.passage)h+=passageTrHtml(g);
    g.qs.forEach(function(q){h+=qHtml(g,q,review)});
  });
  return h;
}
function qHtml(g,q,review){
  var id=g.year+"-"+q.n,h='<div class="q" id="q'+id+'"><p class="stem"><span class="no">'+q.n+'</span>'+(q.stem?esc(q.stem):'')+'</p>';
  if(review&&q.stem)h+='<div class="spbar">'+spBtn('q'+id,q.stem,'朗讀題目')+'</div>';   // 只唸題目,不唸答案;沒有題幹的題型(綜合測驗、文意選填、篇章結構)不顯示
  if(q.img)h+='<img src="'+img(q.img)+'" alt="題目附圖">';
  if(g.bank){h+='<div class="letters">'+g.bank.map(function(_,i){return '<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>'+L[i]+'</b></button>'}).join('')+'</div>'}
  else{h+='<div class="opts">'+q.opts.map(function(o,i){
    var btn='<button class="opt" data-id="'+id+'" data-l="'+L[i]+'"><b>('+L[i]+')</b><span>'+(q.optImgs?'<img src="'+img(q.optImgs[i])+'" alt="選項 '+L[i]+' 的圖">':esc(o))+'</span></button>';
    return review&&!isPlaceholder(q)?'<div class="optrow">'+btn+spBtn('o'+id+L[i],o,'',0.9).replace('class="sp"','class="sp side"').replace('aria-label="朗讀"','aria-label="朗讀選項 '+L[i]+'"')+'</div>':btn}).join('')+'</div>'}
  if(review)h+=qTrHtml(g,q);
  return h+'<div class="fb" id="fb'+id+'"></div><div id="ex'+id+'"></div></div>';
}
/* ---------- 非選擇題(中譯英、英文作文):只有題目,不提供答案,由老師批改 ---------- */
var PAPER_NOTE='紙筆作答,網站未評分:請寫在紙上。本站不提供答案、詳解、範文或評分。';
function noteHtml(t){return esc(t).replace(/\n/g,'<br>')}
function transBlock(w){return '<div class="card wcard"><h3>'+esc(w.transTitle)+'</h3><p class="mute">'+noteHtml(w.transNote)+'</p><ol>'+w.trans.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ol></div>'}
function essayBlock(w,year){return '<div class="card wcard"><h3>'+esc(w.essayTitle)+'</h3><p class="mute">'+noteHtml(w.essayNote)+'</p><p><b>提示:</b>'+esc(w.essay)+'</p>'+(w.img?'<img src="'+w.img+'" alt="'+year+' 學年度英文作文附圖">':'')+'</div>'}
/* 非選擇題(中譯英、英文作文):只有原題,紙筆作答,網站不提供答案與評分 */
function writingHtml(year,full){
  var w=(window.WRITING||{})[year];if(!w)return "";
  return '<section class="writing" id="writing"><div class="sec">'+year+' · '+esc(w.partTitle)+'</div><p class="mute">'+esc(w.partNote)+'</p>'+
    '<p class="papernote">'+PAPER_NOTE+(+year>=111&&!full?'(此模式未收錄第貳部分混合題。)':'')+'</p>'+transBlock(w)+essayBlock(w,year)+'</section>';
}
function findQ(id){for(var i=0;i<V.qs.length;i++)if(V.qs[i].id===id)return V.qs[i].q}


/* ---------- 完整原卷模式(111、115):混合題、中譯英、作文都可作答 ---------- */
var FP=window.FULLPAPER||{};
function isFull(r){return !!(r&&r.mode==="full"&&FP[r.year])}
function md(t){return esc(t).replace(/\*\*(.+?)\*\*/g,'<b><u>$1</u></b>').replace(/\n/g,'<br>')}
function normAns(t){return String(t||"").toLowerCase().replace(/[‘’]/g,"'").replace(/\s+/g," ").replace(/^[\s.,!?;:"'“”]+|[\s.,!?;:"'“”]+$/g,"").trim()}
function itemAnchors(it){return it.n.split("-")}
/* 計分:填充/簡答「與評分原則滿分答案完全相同」才給分;空白依評分原則 0 分;其他(可能 1 分或 0 分)列待評。多選依封面規則。 */
function gradeFull(rec){
  var p=FP[rec.year].part2,res=[],scored=0,scoredMax=0,pend=[];
  p.items.forEach(function(it){
    if(it.type==="multi"){
      var sel=((rec.multi||{})[it.n]||[]).slice().sort(),n=it.options.length,k=0,detail=[];
      for(var i=0;i<n;i++){var l=L[i],a=sel.indexOf(l)>=0,b=it.key.indexOf(l)>=0;if(a!==b)k++;detail.push({l:l,sel:a,key:b})}
      var sc=sel.length?Math.max(0,it.points*(n-2*k)/n):0;sc=Math.round(sc*100)/100;
      res.push({it:it,id:it.n,label:"第 "+it.n+" 題(多選)",points:it.points,score:sc,status:sel.length?"multi":"blank",sel:sel,k:k,detail:detail});
      scored+=sc;scoredMax+=it.points;
    }else it.blanks.forEach(function(b){
      var a=(rec.fill||{})[b.id]||"",n=normAns(a),st,sc=null;
      if(!n){st="blank";sc=0}else if(b.answers.map(normAns).indexOf(n)>=0){st="ok";sc=b.points}else st="pending";
      var r={it:it,b:b,id:b.id,label:"第 "+(it.blanks.length>1&&it.n.indexOf("-")<0?it.n+" 題"+b.label:b.id+" 題")+(it.type==="short"?"(簡答)":"(填充)"),points:b.points,score:sc,status:st,ans:a};
      res.push(r);if(sc!==null){scored+=sc;scoredMax+=b.points}else pend.push(r);
    });
  });
  return {items:res,scored:Math.round(scored*100)/100,scoredMax:scoredMax,pending:pend,pendingPts:pend.reduce(function(a,x){return a+x.points},0)};
}
function blankHtml(year,b,rv){
  if(!rv){var cur=(S&&S.fill&&S.fill[b.id])||"";
    return '<span class="blk"><span class="bl">'+esc(b.label)+'</span><input class="fin" data-f="'+b.id+'" value="'+esc(cur)+'" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="第 '+esc(b.id)+' 格作答"></span>'}
  var a=(rv.fill||{})[b.id]||"";return '<span class="blk rv"><span class="bl">'+esc(b.label)+'</span><span class="fans">'+(a?esc(a):'(空白)')+'</span></span>';
}
function resultLine(r){
  if(r.status==="ok")return '<div class="fb ok">'+esc(r.label)+':✔ 與滿分參考答案相符,'+r.points+' 分</div>';
  if(r.status==="blank")return '<div class="fb bad">'+esc(r.label)+':空白,0 分(評分原則:空白得 0 分)</div>';
  return '<div class="fb pend">'+esc(r.label)+':待人工評閱(滿分 '+r.points+' 分;字形或拼字錯誤可得 1 分,需老師判定)</div>';
}
function itemHtml(year,it,rv,g){
  var ids=itemAnchors(it),h='<div class="q mq" id="q'+year+'-'+ids[0]+'">'+(ids[1]?'<span id="q'+year+'-'+ids[1]+'"></span>':'')+'<p class="stem"><span class="no">'+esc(it.n)+'</span>'+md(it.instr)+'</p>';
  var mine=g?g.items.filter(function(r){return r.it===it}):[];
  if(it.type==="fill"){
    h+=it.lines.map(function(line){return '<p class="fline">'+esc(line).replace(/\{(\w+)\}/g,function(_,id){var b=it.blanks.filter(function(x){return x.id===id})[0];return blankHtml(year,b,rv)})+'</p>'}).join('');
  }else if(it.type==="short"){
    var b=it.blanks[0];
    h+=rv?'<p class="fline">你的答案:<span class="fans">'+(((rv.fill||{})[b.id])?esc(rv.fill[b.id]):'(空白)')+'</span></p>'
         :'<input class="fin wide" data-f="'+b.id+'" value="'+esc((S&&S.fill&&S.fill[b.id])||"")+'" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="第 '+esc(it.n)+' 題作答">';
  }else{
    var sel=rv?(((rv.multi||{})[it.n])||[]):((S&&S.multi&&S.multi[it.n])||[]);
    h+='<div class="opts">'+it.options.map(function(o,i){var l=L[i],on=sel.indexOf(l)>=0,cls="opt mopt";
      if(rv){var k=it.key.indexOf(l)>=0;cls+=on&&k?" ok":on&&!k?" bad":!on&&k?" miss":""}else if(on)cls+=" sel";
      return '<button class="'+cls+'" data-m="'+it.n+'" data-l="'+l+'" aria-pressed="'+on+'"'+(rv?' disabled':'')+'><b>('+l+')</b><span>'+esc(o)+'</span>'+(rv?'<em class="mtag">'+(on&&k?'✔ 選對':on&&!k?'✘ 多選':!on&&k?'✘ 漏選':'')+'</em>':'')+'</button>'}).join('')+'</div>'+
      (rv?'':'<p class="ophint">可複選,點一下勾選,再點一下取消。</p>');
  }
  if(rv&&g){
    mine.forEach(function(r){
      if(r.it.type==="multi"){h+='<div class="fb '+(r.score===r.points?'ok':'bad')+'">'+(r.status==="blank"?'全未作答,0 分。':'你的選擇:'+(r.sel.join("、")||"無")+';正確答案:'+it.key.split("").join("、")+';答錯 '+r.k+' 個選項,得 '+r.points+'×('+it.options.length+'−2×'+r.k+')/'+it.options.length+' = '+r.score+' 分。')+'</div><p class="mute">計分規則(試卷封面):'+esc(it.rule)+'</p>'}
      else{h+=resultLine(r);h+='<p class="mute">評分原則滿分參考答案('+esc(r.b.label)+'):'+r.b.answers.map(esc).join(" / ")+'</p>'}
    });
  }
  return h+'</div>';
}
function part2Html(year,rv,g){
  var p=FP[year].part2,h='<section class="fullp" id="part2"><div class="sec">'+year+' · '+esc(p.title)+'</div><p class="mute">'+esc(p.note)+'</p><p class="glabel"><u>'+esc(p.group)+'</u></p>';
  h+='<div class="passage">'+(p.introImg?'<img class="logo" src="'+p.introImg+'" alt="Refugee Olympic Team 標誌">':'')+p.intro.map(function(x){return '<p>'+esc(x)+'</p>'}).join('')+'</div>';
  if(p.columns)h+='<div class="cols">'+p.columns.map(function(c){return '<div class="passage">'+c.map(function(x){return '<p>'+esc(x)+'</p>'}).join('')+'</div>'}).join('')+'</div>';
  if(p.img)h+='<img class="fig" src="'+p.img+'" alt="'+year+' 學年度混合題附圖(商店位置圖)">';
  if(p.boxes)h+='<div class="boxes">'+p.boxes.map(function(b){return '<div class="passage box"><b>'+esc(b[0])+'</b><p>'+esc(b[1])+'</p></div>'}).join('')+'</div>';
  p.items.forEach(function(it){h+=itemHtml(year,it,rv,g)});
  return h+'</section>';
}
/* ---------- 作答 ---------- */
function quiz(){
  if(!S){location.hash="#home";return}
  var groups=groupsOf(S.year);V={groups:groups,review:false,qs:allQs(groups)};
  var full=isFull(S);
  app.innerHTML='<div class="bar"><span id="prog"></span><span id="clock" class="mute"></span><button class="btn primary" id="submit">交卷</button></div><h1>'+S.year+' 學年度 英文考科'+(full?'(完整原卷)':'')+'</h1>'+
    (full?'<div class="sec">'+S.year+' · 第壹部分、選擇題(占 62 分)</div>':'')+paperHtml(groups,false)+(full?part2Html(S.year,null)+writingHtml(S.year,true):writingHtml(S.year));
  app.onclick=function(ev){var m=ev.target.closest(".mopt");if(m){if(!m.disabled)toggleMulti(m.dataset.m,m.dataset.l);return}
    var b=ev.target.closest(".opt");if(!b||b.disabled)return;pick(b.dataset.id,b.dataset.l)};
  app.oninput=function(ev){var el=ev.target;if(!el.matches||!el.matches(".fin"))return;
    if(expired()||S.locked){lock();el.value=(S.fill||{})[el.dataset.f]||"";return}   // 到期後不能再改
    if(el.matches(".fin")){S.fill=S.fill||{};S.fill[el.dataset.f]=el.value}
    clearTimeout(quiz.t);quiz.t=setTimeout(persist,300)};
  document.getElementById("submit").onclick=submit;
  V.qs.forEach(function(x){refresh(x.id)});prog();tick();
  clearInterval(timer);timer=setInterval(tick,1000);
}
function toggleMulti(n,l){
  if(!S||V.review)return;
  if(expired()||S.locked){lock();return}
  S.multi=S.multi||{};var a=S.multi[n]||[],i=a.indexOf(l);if(i>=0)a.splice(i,1);else a.push(l);a.sort();S.multi[n]=a;persist();
  [].forEach.call(document.querySelectorAll('.mopt[data-m="'+n+'"]'),function(b){var on=a.indexOf(b.dataset.l)>=0;b.classList.toggle("sel",on);b.setAttribute("aria-pressed",on)});
}
function pick(id,l){
  if(!S||V.review)return;
  if(expired()||S.locked){lock();return}   // 選答案前重新判斷是否到期
  S.ans[id]=l;persist();refresh(id);prog();
}
function submit(){
  if(expired())lock();
  var un=V.qs.length-Object.keys(S.ans).length,msg=un>0?"還有 "+un+" 題單選沒作答":"";
  if(isFull(S)){var e=0;FP[S.year].part2.items.forEach(function(it){if(it.type==="multi"){if(!((S.multi||{})[it.n]||[]).length)e++}else it.blanks.forEach(function(b){if(!normAns((S.fill||{})[b.id]))e++})});
    if(e){msg+=(msg?",":"還有 ")+e+" 處混合題或非選擇題空白";un+=e}}
  if(un>0&&!S.locked)ask(msg+",確定要交卷嗎?交卷後不能再修改答案。","確認交卷",finish);
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
  [].forEach.call(document.querySelectorAll(".fin"),function(b){b.readOnly=true});
  if(first)notify("時間到!作答已鎖定,請按「交卷」。");
}
function finish(){
  if(!S)return;
  clearInterval(timer);
  var tEnd=Math.min(Date.now(),S.t0+S.limit*1000);   // 用時不超過 100 分鐘
  var rec={year:S.year,mode:S.mode||"mc",fill:S.fill||{},multi:S.multi||{},ans:S.ans,t0:S.t0,tEnd:tEnd,locked:!!(S.locked||expired()),date:new Date().toISOString().slice(0,16).replace("T"," ")};
  var g=grade(rec);
  var hist=load("history",[]);var gf=isFull(rec)?gradeFull(rec):null;hist.unshift({year:rec.year,mode:rec.mode,score:g.right,n:g.n,raw:g.raw,max:g.max,mixed:gf?gf.scored:null,date:rec.date.slice(0,10)});save("history",hist.slice(0,30));
  save("last",rec);save("session",null);S=null;
  location.hash="#result";   // 由 hashchange 觸發 route(),只畫一次
}

/* ---------- 沒有可檢討的紀錄 ---------- */
function lastRec(){var r=load("last",null);return r&&r.ans&&typeof r.ans==="object"&&paper(r.year)?r:null}
function noRecord(){
  var old=load("history",[]).length>0;
  app.innerHTML='<h1>沒有可檢討的作答紀錄</h1><div class="card"><p>'+(old
    ?'這台裝置只有舊版留下的分數,沒有逐題作答,所以不能檢討、朗讀答案或看單字表。請重新作答一份試卷,交卷後就能檢討。'
    :'這個瀏覽器還沒有交卷紀錄。作答並交卷一份試卷後,才能看成績、檢討與單字表。')+
    '</p><p class="mute">成績與作答只存在這個瀏覽器,換裝置或清除網站資料後不會保留。</p><a class="btn primary" href="#home">選擇試卷</a></div>';
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
function paperCard(){return '<div class="card"><b>中譯英、英文作文</b><div class="mrow"><span>中譯英(8 分)</span><span class="pend">紙筆作答,網站未評分</span></div><div class="mrow"><span>英文作文(20 分)</span><span class="pend">紙筆作答,網站未評分</span></div><p class="mute">不列入網站分數,也不算 0 分。</p></div>'}
function fullResultHtml(rec,g){
  var f=gradeFull(rec),h='<div class="card"><b>第貳部分 混合題(10 分)</b>';
  f.items.forEach(function(r){h+='<div class="mrow"><span>'+esc(r.label)+'</span><span>'+(r.score===null?'<span class="pend">已作答,待評('+r.points+' 分,不列入分母)</span>':r.score+' / '+r.points+(r.status==="blank"?'(空白)':''))+'</span></div>'});
  h+='</div><div class="card"><b>已計分</b><div class="mrow"><span>第壹部分 單選</span><span>'+g.raw+' / '+g.max+'</span></div>'+
    '<div class="mrow"><span>第貳部分 已判定的部分</span><span>'+f.scored+' / '+f.scoredMax+'</span></div>'+
    '<div class="mrow total"><span>已計分部分合計</span><span>'+(Math.round((g.raw+f.scored)*100)/100)+' / '+(g.max+f.scoredMax)+'</span></div>'+
    '<p class="mute">填充、簡答只有與評分原則「滿分參考答案」完全相同才自動給分;空白依評分原則 0 分;其他答案可能得 1 分(字形或拼字錯誤),需老師判定,列為待評。</p></div>'+
    (f.pending.length?'<div class="card"><b>混合題待人工評閱(共 '+f.pendingPts+' 分)</b>'+f.pending.map(function(p){return '<div class="mrow"><span>'+esc(p.label)+'(你的答案:'+esc(p.ans)+')</span><span class="pend">'+p.points+' 分</span></div>'}).join('')+'</div>':'')+
    paperCard()+'<p><b>網站只顯示已計分部分的得分與滿分,不是整卷總分。</b></p>';
  return h;
}
function result(){
  var rec=lastRec();if(!rec){noRecord();return}
  var g=grade(rec),si=scoreInfo(rec.year),used=(rec.tEnd-rec.t0)/1000;
  var h='<h1>'+rec.year+' 學年度 成績'+(isFull(rec)?'(完整原卷)':'')+'</h1><div class="card"><div class="score">答對 '+g.right+' / '+g.n+' 題</div>'+
    '<div class="tally"><span class="ok">答對 '+g.right+'</span><span class="bad">答錯 '+g.wrong+'</span><span>未作答 '+g.blank+'</span></div>'+
    '<div style="margin-top:10px"><b>原始分數 '+g.raw+' / '+g.max+'</b><div class="mute">依官方配分的單選題原始分數('+si.txt+')。'+(isFull(rec)?'':'不含混合題、中譯英與作文,')+'不是整份學測的分數或級分。</div></div>'+
    '<div class="mute" style="margin-top:8px">用時 '+fmt(used)+(rec.locked?'(時間到,作答已鎖定)':'')+'</div>'+
    '<div style="margin-top:10px">'+Object.keys(g.by).map(function(k){return '<div>'+k+':'+g.by[k].right+' / '+g.by[k].n+'</div>'}).join('')+'</div></div>'+
    (isFull(rec)?fullResultHtml(rec,g):paperCard()+(+rec.year>=111?'<p class="mute">此模式未收錄第貳部分混合題。</p>':'')+'<p><b>網站只顯示已計分部分(單選題)的得分與滿分,不是整卷總分。</b></p>')+'<div class="row">'+
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
  var rec=lastRec();if(!rec){noRecord();return}
  var g=grade(rec),keep=null;
  if(name==="review-wrong")keep=g.wrongIds;else if(name==="review-blank")keep=g.blankIds;else if(name==="review-miss")keep=g.wrongIds.concat(g.blankIds);
  var set={};if(keep)keep.forEach(function(i){set[i]=1});
  var groups=groupsOf(rec.year).map(function(x){return Object.assign({},x,{qs:x.qs.filter(function(q){return !keep||set[x.year+"-"+q.n]})})}).filter(function(x){return x.qs.length});
  S=null;V={groups:groups,review:true,qs:allQs(groups),ans:rec.ans};
  var total=g.n,mx=0;groupsOf(rec.year).forEach(function(x){x.qs.forEach(function(q){if(q.n>mx)mx=q.n})});
  if(isFull(rec))FP[rec.year].part2.items.forEach(function(it){itemAnchors(it).forEach(function(n){if(+n>mx)mx=+n})});
  var seg=[["review-all","全部",total],["review-wrong","答錯",g.wrong],["review-blank","未作答",g.blank]].map(function(t){
    var on=(t[0]===name)||(name==="review-miss"&&false);
    return '<a class="chip'+(on?' on':'')+'" href="#'+t[0]+'" aria-pressed="'+on+'">'+t[1]+' '+t[2]+'</a>'}).join('');
  app.innerHTML='<div class="bar"><a class="btn" href="#result">回成績</a><span class="mute">檢討:'+FILTERS[name]+' '+V.qs.length+' 題</span><a class="btn" href="#home">首頁</a></div><h1>'+rec.year+' 學年度 檢討</h1>'+
    '<div class="rtools"><div class="row" role="group" aria-label="篩選">'+seg+'</div>'+voiceBarHtml()+
    '<form id="jump" class="jump" novalidate><label for="jumpn">跳到題號</label><input id="jumpn" type="text" inputmode="numeric" autocomplete="off" maxlength="4" placeholder="1–'+mx+'"><button class="btn" type="submit">前往</button></form></div>'+
    (V.qs.length?paperHtml(groups,true):'<p class="mute">這個篩選沒有題目('+FILTERS[name]+' 0 題)。</p>')+(name==="review-all"?(isFull(rec)?part2Html(rec.year,rec,gradeFull(rec))+writingHtml(rec.year,true):writingHtml(rec.year)):'');
  app.onclick=function(ev){speechClick(ev)};
  document.getElementById("jump").onsubmit=function(ev){
    ev.preventDefault();var raw=document.getElementById("jumpn").value.trim().replace(/[０-９]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-65248)}),n=/^\d+$/.test(raw)?Number(raw):NaN;   // 只接受純數字,小數、科學記號、正負號、空白都擋下
    if(!(n>=1&&n<=mx)){notify("請輸入 1 到 "+mx+" 的整數題號");return}
    var id=rec.year+"-"+n;
    if(document.getElementById("q"+id))goQ(id);
    else{pendingJump=id;notify("第 "+n+" 題不在目前的篩選中,已切換到全部");location.hash="#review-all"}
  };
  try{initVoiceBar()}catch(e){}
  V.qs.forEach(function(x){refresh(x.id)});
  if(pendingJump){var pj=pendingJump;pendingJump=null;goQ(pj)}
}
var pendingJump=null;
function goQ(id){var el=document.getElementById("q"+id);if(!el)return;el.scrollIntoView({block:"start",behavior:"auto"});el.classList.add("flash");setTimeout(function(){el.classList.remove("flash")},1800)}
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
function prog(){var e=document.getElementById("prog");if(e)e.textContent=(isFull(S)?"單選已答 ":"已答 ")+Object.keys(S.ans).length+" / "+V.qs.length}
function exHtml(id,q){
  var p=id.split("-"),e=(window.EXPLAIN||{})[p[0]],x=e&&e[p[1]];
  if(!x)return '<div class="mute">此題詳解尚未提供</div>';
  var h='<details class="ex"><summary>詳解 <span class="draft">草稿・待老師審核</span></summary><p>'+esc(x.key)+'</p>';
  if(x.opts)h+='<ul>'+Object.keys(x.opts).map(function(k){return '<li><b>'+k+(k===q.ans?' ✔':'')+'</b> '+esc(x.opts[k])+'</li>'}).join('')+'</ul>';
  if(x.vocab&&x.vocab.length)h+='<p class="mute">'+x.vocab.map(function(v){return '<button class="sp w" data-w="'+esc(v[0])+'">🔊 <b>'+esc(v[0])+'</b></button> '+esc(v[1])}).join(' ・ ')+'</p>';
  return h+'</details>';
}

/* ---------- 中譯英/作文 單項練習:獨立倒數,紙筆作答 ---------- */
var WT=null;   // 計時器
function writingPracticeCard(){
  var ys=Object.keys(window.WRITING||{}).sort();
  return '<div class="card"><b>中譯英、英文作文 單項練習</b><p class="mute">只有原題與倒數計時,紙筆作答。中譯英預設 10 分鐘,作文預設 30 分鐘,開始前可調整。</p><div class="wplist">'+
    ys.map(function(y){return '<div class="wprow"><span>'+y+'</span><a class="btn" href="#wt-'+y+'">中譯英</a><a class="btn" href="#we-'+y+'">作文</a></div>'}).join('')+'</div></div>';
}
function wtKey(y,k){return y+"-"+k}
function wtState(key,def){var all=load("wtimer",{});return all[key]||{min:def,start:null,done:null}}
function wtSave(key,st){var all=load("wtimer",{});all[key]=st;save("wtimer",all)}
function practicePage(kind,year){
  var w=(window.WRITING||{})[year];if(!w){location.hash="#home";return}
  var def=kind==="t"?10:30,key=wtKey(year,kind),name=kind==="t"?"中譯英":"英文作文";
  app.innerHTML='<p><a class="btn" href="#home">回首頁</a></p><h1>'+year+' 學年度 '+name+' 單項練習</h1>'+
    '<div class="card timerbox"><div class="wtclock" id="wtclock" aria-live="polite"></div>'+
    '<div class="row wtctl"><label for="wmin">練習時間</label><input id="wmin" type="number" inputmode="numeric" min="1" max="180" step="1"> 分鐘'+
    '<button class="btn primary" id="wstart">開始計時</button><button class="btn" id="wdone">完成練習</button><button class="btn" id="wreset">重新計時</button></div></div>'+
    '<p class="papernote">'+PAPER_NOTE+'</p><div class="sec">'+year+' · '+esc(w.partTitle)+'</div>'+(kind==="t"?transBlock(w):essayBlock(w,year));
  var minEl=document.getElementById("wmin"),warned=false;
  function draw(){
    var st=wtState(key,def),c=document.getElementById("wtclock");if(!c)return;
    minEl.value=st.min;minEl.disabled=!!st.start;
    document.getElementById("wstart").disabled=!!st.start;document.getElementById("wdone").disabled=!st.start||!!st.done;document.getElementById("wreset").disabled=!st.start;
    if(!st.start){c.textContent="尚未開始 · "+st.min+" 分鐘";c.className="wtclock"}
    else if(st.done){c.textContent="已完成 · 用時 "+fmt(Math.min(st.done-st.start,st.min*60000)/1000);c.className="wtclock done"}
    else{var left=st.start+st.min*60000-Date.now();
      if(left>0){c.textContent="剩 "+fmt(left/1000);c.className="wtclock run"}
      else{c.textContent="時間到";c.className="wtclock up";if(!warned){warned=true;notify("時間到!")}}}
  }
  minEl.onchange=function(){var st=wtState(key,def);if(st.start)return;var v=parseInt(minEl.value,10);if(!(v>=1&&v<=180)){notify("請輸入 1 到 180 分鐘");minEl.value=st.min;return}st.min=v;wtSave(key,st);draw()};
  document.getElementById("wstart").onclick=function(){var st=wtState(key,def);if(st.start)return;minEl.onchange();st=wtState(key,def);st.start=Date.now();st.done=null;wtSave(key,st);warned=false;draw()};
  document.getElementById("wdone").onclick=function(){var st=wtState(key,def);if(!st.start||st.done)return;st.done=Date.now();wtSave(key,st);draw()};
  document.getElementById("wreset").onclick=function(){ask("重新計時會清除這次的倒數,確定嗎?","重新計時",function(){var st=wtState(key,def);st.start=null;st.done=null;wtSave(key,st);warned=false;draw()})};
  draw();clearInterval(WT);WT=setInterval(draw,1000);practicePage.draw=draw;
}

/* ---------- 單字表 ---------- */
function vocabPage(){
  var rec=lastRec();if(!rec){noRecord();return}
  var ex=(window.EXPLAIN||{})[rec.year]||{},seen={},rows=[];
  Object.keys(ex).sort(function(a,b){return a-b}).forEach(function(n){(ex[n].vocab||[]).forEach(function(v){var k=v[0].toLowerCase()+"|"+v[1];if(!seen[k]){seen[k]=1;rows.push([v[0],v[1],n])}})});
  app.innerHTML='<h1>'+rec.year+' 學年度 單字表</h1><p class="mute">共 '+rows.length+' 個(草稿・待老師審核),點 🔊 聽發音。</p><p><a class="btn" href="#result">返回成績</a></p>'+voiceBarHtml()+'<div class="card vocab">'+
    rows.map(function(r){return '<div class="vrow"><button class="sp w" data-w="'+esc(r[0])+'">🔊</button><b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span><small class="mute">第 '+r[2]+' 題</small></div>'}).join('')+'</div>';
  try{initVoiceBar()}catch(e){}
  app.onclick=function(ev){speechClick(ev)};
}

/* ---------- 路由 ---------- */
function route(){
  var tt=document.getElementById("toast");if(tt)tt.remove();   // 上一頁的提示不帶到下一頁
  stopSpeak();closeModal();clearInterval(timer);clearInterval(WT);practicePage.draw=null;app.onclick=null;app.oninput=null;V=null;
  var hs=location.hash.replace(/^#\/?/,"");
  if(hs==="quiz"){S=S||loadSession();quiz()}
  else if(hs==="result")result();
  else if(FILTERS[hs])review(hs);
  else if(hs==="vocab")vocabPage();
  else if(/^w[te]-\d{3}$/.test(hs))practicePage(hs[1],hs.slice(3));
  else{S=loadSession();home()}
}
["visibilitychange","focus","pageshow"].forEach(function(ev){(ev==="visibilitychange"?document:window).addEventListener(ev,function(){if(V&&!V.review)tick();if(practicePage.draw)practicePage.draw()})});
window.addEventListener("hashchange",route);
S=loadSession();route();
})();
