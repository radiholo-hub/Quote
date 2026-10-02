(function(){
  var KEY='exam-state-v1';
  var st={};
  try{st=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
  st.a=st.a||{};   // id -> chosen option index
  st.s=st.s||{};   // id -> starred
  function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
  var $=function(id){return document.getElementById(id)};
  var Q=window.QUESTIONS||[];
  var list=[],idx=0;

  function fill(sel,items,all){
    sel.innerHTML='';
    [['all',all]].concat(items.map(function(x){return[x,x]})).forEach(function(p){
      var o=document.createElement('option');o.value=p[0];o.textContent=p[1];sel.appendChild(o);
    });
  }
  function uniq(k){return Q.map(function(q){return String(q[k])}).filter(function(v,i,a){return a.indexOf(v)===i})}
  fill($('f-subject'),uniq('type'),'全部題型');
  fill($('f-year'),uniq('year').sort().reverse(),'全部年度');

  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}

  function build(){
    var s=$('f-subject').value,y=$('f-year').value,m=$('f-mode').value;
    list=Q.filter(function(q){
      if(s!=='all'&&q.type!==s)return false;
      if(y!=='all'&&String(q.year)!==y)return false;
      var a=st.a[q.id];
      if(m==='todo')return a===undefined;
      if(m==='wrong')return a!==undefined&&a!==q.answer;
      if(m==='star')return !!st.s[q.id];
      return true;
    });
    if($('f-shuffle').checked)shuffle(list);
    idx=0;render();
  }

  function render(){
    var card=$('card'),q=list[idx];
    $('stats').textContent=statText();
    if(!q){
      $('qmeta').textContent='';$('passage').hidden=true;$('stem').innerHTML='<div class="empty">這個範圍沒有題目。</div>';
      $('options').innerHTML='';$('result').hidden=true;$('progress').textContent='';
      $('star').textContent='☆ 標記';$('star').classList.remove('on');return;
    }
    $('progress').textContent='第 '+(idx+1)+' / '+list.length+' 題';
    $('qmeta').textContent=q.year+' 年　'+q.type+(q.sample?'　（範例題）':'');
    var p=$('passage');p.hidden=!q.passage;p.textContent=q.passage||'';
    $('stem').innerHTML=q.html?q.question:esc(q.question);
    var ol=$('options');ol.innerHTML='';
    q.options.forEach(function(t,i){
      var li=document.createElement('li'),b=document.createElement('button');
      b.innerHTML='<span class="k">'+'ABCD'[i]+'</span><span>'+(q.html?t:esc(t))+'</span>';
      b.onclick=function(){st.a[q.id]=i;save();render()};
      li.appendChild(b);ol.appendChild(li);
    });
    var a=st.a[q.id],r=$('result');
    if(a!==undefined){
      [].forEach.call(ol.querySelectorAll('button'),function(b,i){
        b.disabled=true;
        if(i===q.answer)b.classList.add('correct');
        else if(i===a)b.classList.add('wrong');
      });
      r.hidden=false;
      r.innerHTML=(a===q.answer?'<b class="ok">答對了！</b>':'<b class="bad">答錯了，正確答案：'+'ABCD'[q.answer]+'</b>')+
        (q.explain?'\n'+(q.html?q.explain:esc(q.explain)):'');
    }else r.hidden=true;
    var on=!!st.s[q.id];$('star').textContent=(on?'★':'☆')+' 標記';$('star').classList.toggle('on',on);
  }
  function statText(){
    var done=0,ok=0;
    Q.forEach(function(q){var a=st.a[q.id];if(a!==undefined){done++;if(a===q.answer)ok++}});
    return done?('已作答 '+done+' 題，答對 '+ok+' 題（'+Math.round(ok/done*100)+'%）'):'尚未作答';
  }
  function esc(s){return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}

  $('prev').onclick=function(){if(list.length){idx=(idx-1+list.length)%list.length;render()}};
  $('next').onclick=function(){if(list.length){idx=(idx+1)%list.length;render()}};
  $('star').onclick=function(){var q=list[idx];if(!q)return;if(st.s[q.id])delete st.s[q.id];else st.s[q.id]=1;save();render()};
  $('reset').onclick=function(){if(confirm('確定清除所有作答與標記紀錄？')){st={a:{},s:{}};save();build()}};
  ['f-subject','f-year','f-mode','f-shuffle'].forEach(function(id){$(id).onchange=build});
  document.addEventListener('keydown',function(e){
    if(/SELECT|INPUT/.test(e.target.tagName))return;
    if(e.key==='ArrowLeft')$('prev').click();
    else if(e.key==='ArrowRight')$('next').click();
    else if('1234'.indexOf(e.key)>=0&&e.key){var b=$('options').querySelectorAll('button')[+e.key-1];if(b&&!b.disabled)b.click()}
  });
  build();
})();
