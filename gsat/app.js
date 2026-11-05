(function(){
const G=window.GSAT,$=id=>document.getElementById(id);
const KEY='gsat-english-v1';
let store={wrong:{},done:0,right:0};
try{store=Object.assign(store,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}};

// 把各題型攤平成「單題」清單:id 固定,才能記錄錯題
function flat(){
  const L=[];
  G.vocab.forEach((x,i)=>L.push({id:'v'+i,type:'vocab',q:x.q,o:x.o,a:x.a,e:x.e}));
  G.cloze.forEach((p,pi)=>p.qs.forEach((x,i)=>L.push({id:'c'+pi+'_'+i,type:'cloze',group:'c'+pi,title:p.title,text:p.text,q:'空格 ('+(i+1)+')',o:x.o,a:x.a,e:x.e})));
  G.reading.forEach((p,pi)=>p.qs.forEach((x,i)=>L.push({id:'r'+pi+'_'+i,type:'reading',group:'r'+pi,title:p.title,text:p.text,q:x.q,o:x.o,a:x.a,e:x.e})));
  G.structure.forEach((p,pi)=>p.ans.forEach((a,i)=>L.push({id:'s'+pi+'_'+i,type:'structure',group:'s'+pi,title:p.title,text:p.text+'\n\n'+p.options.map((t,k)=>'('+'ABCD'[k]+') '+t).join('\n'),q:'空格 ('+(i+1)+') 應填入哪一句?',o:p.options.map((t,k)=>'('+'ABCD'[k]+') '+t),a:a,e:p.e[i]})));
  return L;
}
const ALL=flat(),byId=Object.fromEntries(ALL.map(x=>[x.id,x]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

let set=[],idx=0,right=0,mode=null,answered=false;
function show(id){['home','quiz','result'].forEach(s=>$(s).hidden=s!==id);window.scrollTo(0,0)}

function home(){
  const t=$('types');t.innerHTML='';
  Object.keys(G.types).forEach(k=>{
    const n=ALL.filter(x=>x.type===k).length,b=document.createElement('button');
    b.className='tile';b.innerHTML='<b>'+G.types[k].name+'</b><span>'+G.types[k].desc+'・'+n+' 題</span>';
    b.onclick=()=>start('type:'+k);t.appendChild(b);
  });
  const w=Object.keys(store.wrong).filter(i=>byId[i]).length;
  $('wrongN').textContent=w;$('wrongBtn').disabled=!w;
  $('stats').textContent=store.done?'累計作答 '+store.done+' 題,答對 '+store.right+' 題('+Math.round(store.right/store.done*100)+'%)':'';
  show('home');
}
function start(m){
  mode=m;
  if(m==='mixed')set=shuffle(ALL.filter(x=>!x.group)).slice(0,10);
  else if(m==='wrong')set=shuffle(Object.keys(store.wrong).map(i=>byId[i]).filter(Boolean));
  else{ // 單一題型:保留篇章順序,詞彙則隨機
    const k=m.slice(5),L=ALL.filter(x=>x.type===k);
    set=k==='vocab'?shuffle(L).slice(0,10):L;
  }
  idx=0;right=0;show('quiz');render();
}
function render(){
  const x=set[idx];answered=false;
  $('prog').textContent=(idx+1)+' / '+set.length;
  const p=$('passage');p.hidden=!x.text;if(x.text)p.textContent=x.title+'\n\n'+x.text;
  $('question').textContent=x.q;
  const o=$('opts');o.innerHTML='';
  x.o.forEach((t,i)=>{
    const b=document.createElement('button');b.className='opt';b.setAttribute('role','radio');
    b.textContent=x.type==='structure'?t:'('+'ABCD'[i]+') '+t;b.onclick=()=>pick(i);o.appendChild(b);
  });
  $('explain').hidden=true;$('next').hidden=true;
}
function pick(i){
  if(answered)return;answered=true;
  const x=set[idx],bs=[...$('opts').children];
  bs.forEach((b,k)=>{b.disabled=true;if(k===x.a)b.classList.add('ok')});
  store.done++;
  if(i===x.a){right++;store.right++;delete store.wrong[x.id]}
  else{bs[i].classList.add('bad');store.wrong[x.id]=1}
  save();
  const e=$('explain');e.hidden=false;e.textContent=(i===x.a?'✔ 答對了。':'✘ 正確答案是 '+'ABCD'[x.a]+'。')+x.e;
  $('next').hidden=false;$('next').textContent=idx+1<set.length?'下一題':'看成績';$('next').focus();
}
function finish(){
  const r=Math.round(right/set.length*100);
  $('score').textContent='答對 '+right+' / '+set.length+'('+r+'%)';
  $('msg').textContent=r>=80?'很棒!這個題型已經很穩。':r>=60?'還不錯,到錯題本複習答錯的題目吧。':'別氣餒,先看詳解再練一次。';
  show('result');
}
$('types').onclick=null;
$('mixed').onclick=()=>start('mixed');
$('wrongBtn').onclick=()=>start('wrong');
$('next').onclick=()=>{idx++;idx<set.length?render():finish()};
$('quit').onclick=home;$('home2').onclick=home;
$('again').onclick=()=>start(mode);
home();
})();
