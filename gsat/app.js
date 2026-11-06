(function(){
const G=window.GSAT,E=window.EXAMS||[],AN=window.ANSWERS||{},$=id=>document.getElementById(id);
const KEY='gsat-english-v1';
let store={wrong:{},done:0,right:0};
try{store=Object.assign(store,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}};
const LET='ABCDEFGHIJ';
const WEIGHT={reading:2,structure:2}; // 其他題型每題 1 分

// ---- 把兩種題庫都攤平成「單題」清單 ----
function flat(){
  const L=[];
  G.vocab.forEach((x,i)=>L.push({id:'v'+i,src:'mock',type:'vocab',q:x.q,o:x.o,a:x.a,e:x.e,w:1}));
  G.cloze.forEach((p,pi)=>p.qs.forEach((x,i)=>L.push({id:'c'+pi+'_'+i,src:'mock',type:'cloze',group:'c'+pi,title:p.title,paras:p.text.split('\n\n'),q:'空格 ('+(i+1)+')',o:x.o,a:x.a,e:x.e,w:1})));
  G.reading.forEach((p,pi)=>p.qs.forEach((x,i)=>L.push({id:'r'+pi+'_'+i,src:'mock',type:'reading',group:'r'+pi,title:p.title,paras:p.text.split('\n\n'),q:x.q,o:x.o,a:x.a,e:x.e,w:1})));
  G.structure.forEach((p,pi)=>p.ans.forEach((a,i)=>L.push({id:'s'+pi+'_'+i,src:'mock',type:'structure',group:'s'+pi,title:p.title,paras:p.text.split('\n\n'),q:'空格 ('+(i+1)+') 應填入哪一句?',o:p.options,a:a,e:p.e[i],w:1})));
  E.forEach(ex=>{
    const key=AN[ex.year]||'';
    ex.sections.forEach((s,si)=>s.groups.forEach((g,gi)=>g.questions.forEach(q=>{
      const letter=key[q.n-1],a=letter?LET.indexOf(letter):null;
      const o=s.type==='bank'||s.type==='structure'?g.bank:q.opts;
      L.push({id:'e'+ex.year+'_'+q.n,src:'exam',year:ex.year,n:q.n,type:s.type,sec:s.name,
        group:g.passage?'e'+ex.year+'_'+si+'_'+gi:null,paras:g.passage,
        q:s.type==='bank'||s.type==='structure'||s.type==='cloze'?'第 '+q.n+' 題空格':q.stem,
        blank:g.passage&&s.type!=='reading'?q.n:null,o:o,optImgs:q.optImgs,img:q.img,a:a,w:WEIGHT[s.type]||1,
        label:ex.year+' 學測 第 '+q.n+' 題'});
    })));
  });
  return L;
}
const ALL=flat(),byId=Object.fromEntries(ALL.map(x=>[x.id,x]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const examQs=(y,t)=>ALL.filter(x=>x.src==='exam'&&x.year===y&&(!t||x.type===t));
const hasAns=y=>examQs(y).every(x=>x.a!=null&&x.a>=0);

let set=[],idx=0,right=0,mode=null,answered=false,log=[];
function show(id){['home','quiz','result'].forEach(s=>$(s).hidden=s!==id);window.scrollTo(0,0)}
function el(t,c,txt){const e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e}

function home(){
  const ex=$('exams');ex.innerHTML='';
  E.forEach(e=>{
    const ok=hasAns(e.year),box=el('div','exam'),n=examQs(e.year).length;
    box.appendChild(el('b','',e.year+' 學年度學測英文'));
    box.appendChild(el('span','fine','　選擇題 '+n+' 題'+(ok?'':'・答案待補')));
    const ch=el('div','chips'),all=el('button','chip solid','整份作答');
    all.disabled=!ok;all.onclick=()=>start('exam:'+e.year);ch.appendChild(all);
    const seen=[];
    e.sections.forEach(s=>{if(seen.includes(s.type))return;seen.push(s.type);
      const b=el('button','chip',s.name+' '+examQs(e.year,s.type).length);b.disabled=!ok;b.onclick=()=>start('exam:'+e.year+':'+s.type);ch.appendChild(b)});
    box.appendChild(ch);ex.appendChild(box);
  });
  const t=$('types');t.innerHTML='';
  Object.keys(G.types).forEach(k=>{
    const n=ALL.filter(x=>x.src==='mock'&&x.type===k).length,b=el('button','tile');
    b.innerHTML='<b>'+G.types[k].name+'</b><span>'+G.types[k].desc+'・'+n+' 題</span>';
    b.onclick=()=>start('type:'+k);t.appendChild(b);
  });
  const w=Object.keys(store.wrong).filter(i=>byId[i]&&byId[i].a!=null).length;
  $('wrongN').textContent=w;$('wrongBtn').disabled=!w;
  $('stats').textContent=store.done?'累計作答 '+store.done+' 題,答對 '+store.right+' 題('+Math.round(store.right/store.done*100)+'%)':'';
  show('home');
}
function start(m){
  mode=m;
  const ok=x=>x.a!=null&&x.a>=0;
  if(m==='mixed')set=shuffle(ALL.filter(x=>x.type==='vocab'&&ok(x))).slice(0,10);
  else if(m==='wrong')set=shuffle(Object.keys(store.wrong).map(i=>byId[i]).filter(x=>x&&ok(x)));
  else if(m.startsWith('exam:')){const p=m.split(':');set=examQs(p[1],p[2]);}
  else{const k=m.slice(5),L=ALL.filter(x=>x.src==='mock'&&x.type===k);set=k==='vocab'?shuffle(L).slice(0,10):L;}
  idx=0;right=0;log=[];show('quiz');render();
}
function renderPassage(x){
  const p=$('passage');p.innerHTML='';p.hidden=!x.paras;if(!x.paras)return;
  if(x.title)p.appendChild(el('div','ttl',x.title));
  x.paras.forEach(t=>{
    const para=el('p');
    t.split(/(【\d+】)/).forEach(part=>{
      const m=part.match(/^【(\d+)】$/);
      if(m){const b=el('span','blank'+(+m[1]===x.blank?' cur':''),m[1]);para.appendChild(b)}
      else if(part)para.appendChild(document.createTextNode(part));
    });
    p.appendChild(para);
  });
  const cur=p.querySelector('.cur');if(cur)p.scrollTop=Math.max(0,cur.offsetTop-p.offsetTop-60);else p.scrollTop=0;
}
function render(){
  const x=set[idx];answered=false;
  $('prog').textContent=(idx+1)+' / '+set.length;
  $('source').textContent=(x.label||'原創模擬題')+(x.sec?'・'+x.sec:'');
  renderPassage(x);
  const q=$('question');q.innerHTML='';q.appendChild(document.createTextNode(x.q));
  if(x.img){const im=el('img','qimg');im.src=x.img;im.alt='題目附圖';q.appendChild(im)}
  const o=$('opts');o.innerHTML='';
  x.o.forEach((t,i)=>{
    const b=el('button','opt');b.setAttribute('role','radio');
    b.appendChild(document.createTextNode('('+LET[i]+') '+(x.optImgs?'':t)));
    if(x.optImgs){const im=el('img');im.src=x.optImgs[i];im.alt='選項 '+LET[i]+' 圖片';b.appendChild(im)}
    b.onclick=()=>pick(i);o.appendChild(b);
  });
  $('explain').hidden=true;$('next').hidden=true;
}
function pick(i){
  if(answered)return;answered=true;
  const x=set[idx],bs=[...$('opts').children];
  bs.forEach((b,k)=>{b.disabled=true;if(k===x.a)b.classList.add('ok')});
  store.done++;
  const good=i===x.a;
  if(good){right++;store.right++;delete store.wrong[x.id]}else{bs[i].classList.add('bad');store.wrong[x.id]=1}
  log.push({x,good});save();
  const e=$('explain');e.hidden=false;e.textContent=(good?'✔ 答對了。':'✘ 正確答案是 '+LET[x.a]+'。')+(x.e?x.e:'');
  $('next').hidden=false;$('next').textContent=idx+1<set.length?'下一題':'看成績';$('next').focus();
}
function finish(){
  const tot=set.reduce((s,x)=>s+x.w,0),got=log.reduce((s,l)=>s+(l.good?l.x.w:0),0);
  const r=Math.round(right/set.length*100);
  $('score').textContent='答對 '+right+' / '+set.length+' 題('+r+'%)'+(mode.startsWith('exam:')?'・得分 '+got+' / '+tot:'');
  $('msg').textContent=r>=80?'很棒!這個範圍已經很穩。':r>=60?'還不錯,到錯題本複習答錯的題目吧。':'別氣餒,先看錯題再練一次。';
  const rv=$('review');rv.innerHTML='';
  log.filter(l=>!l.good).forEach(l=>rv.appendChild(el('div','badq',(l.x.label||l.x.q)+'・正確答案 '+LET[l.x.a])));
  show('result');
}
$('mixed').onclick=()=>start('mixed');
$('wrongBtn').onclick=()=>start('wrong');
$('next').onclick=()=>{idx++;idx<set.length?render():finish()};
$('quit').onclick=home;$('home2').onclick=home;
$('again').onclick=()=>start(mode);
home();
})();
