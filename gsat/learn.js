// 逐題詳解（schema 2）、單字與字族頁、歷屆出現紀錄、題目預覽、延伸練習、原創文章朗讀器。
// 詳解只在「交卷之後」的檢討頁出現（app.js 的 #/rev）；單字頁與出現紀錄的資料來自結構化資料檔，不寫死在 HTML。
window.GSATLearn = (function () {
  let env = null;
  const V = window.VOCAB || { entries: {}, families: {}, phrases: {} };
  const EXT = window.EXT_PRACTICE || [];
  const ROLE = { answer: '正確答案', distractor: '干擾選項', stem: '題幹', passage: '文章' };
  const TYPE = { vocab: '詞彙', cloze: '綜合測驗', bank: '文意選填', structure: '篇章結構', reading: '閱讀測驗' };
  const openMem = {};                      // 收合區塊的展開狀態（離開再回來要保留）
  const h = (...a) => env.h(...a);
  const ent = id => V.entries[id];
  const IDX = () => window.VOCAB_INDEX;
  const wide = () => window.matchMedia && window.matchMedia('(min-width: 700px)').matches;
  const spk = (text, label, o) => window.GSATAudio.button(h, text, label || text, o);
  const draftTag = h => h('span', { class: 'tag' }, '待審核草稿');
  // 教師已簽核的題目(explain.js 的 status 為 reviewed;有效簽核由 docs/gsat/signoffs/ 與測試保證):該題詳解頁面呈現的單字與延伸練習屬於簽核範圍,
  // 在該題內顯示「本題教師已確認」而不是「待審核草稿」;詞條與延伸題自己的 status 不變,其他題目、單字頁仍照各自的 status 顯示。
  const signedTag = h => h('span', { class: 'tag ok', 'data-role': 'signed' }, '本題教師已確認');
  const signedQ = k => { const x = (env && env.EXPL ? env.EXPL() : window.EXPLAIN || {})[k]; return !!(x && x.status === 'reviewed'); };

  function init(e) { env = e; env.DB.ext = env.DB.ext || {}; }

  // ---------- 共用元件 ----------
  function sec(key, title, body, defOpen, meta) {
    const d = h('details', { class: 'lsec', 'data-sec': key.split(':').pop() });
    const open = openMem[key] != null ? openMem[key] : defOpen;
    if (open) d.setAttribute('open', '');
    d.addEventListener('toggle', () => { openMem[key] = d.open; });
    d.append(h('summary', {}, h('span', { class: 'ttl' }, title), meta ? h('span', { class: 'meta' }, meta) : null), h('div', { class: 'lbody' }, body));
    return d;
  }
  const wlink = (id, txt) => h('a', { class: 'wlink', href: '#/word/' + id }, txt || ent(id).hw);
  const posZh = e => e.pos + ' ' + e.zh;
  function counts(id) {                      // 歷屆已確認出現次數（沒有索引資料時回傳 null）
    const x = IDX() && IDX().entries[id];
    return x ? x : null;
  }

  // ---------- 單字卡（詳解與單字頁共用）：詞性、中文、發音、詞形變化、搭配詞、例句 ----------
  function wordCard(id, o) {
    o = o || {};
    const e = ent(id); if (!e) return h('p', { class: 'notice' }, '找不到詞條 ' + id);
    const c = h('div', { class: 'wcard', 'data-entry': id });
    c.append(h('div', { class: 'whead' }, h('b', { class: 'hw' }, e.hw), h('span', { class: 'fine' }, ' ' + e.pos + ' '), spk(e.hw, e.hw), h('span', { class: 'wzh' }, e.zh), e.status === 'draft' ? (o.signedScope ? signedTag(h) : draftTag(h)) : null));
    if (e.alsoPos) c.append(h('p', { class: 'fine' }, '另有詞性:' + e.alsoPos));
    c.append(h('p', { class: 'fine', 'data-role': 'forms' }, '詞形變化(原字):' + e.forms.join('、')));
    if (e.note) c.append(h('p', { class: 'note' }, e.note));
    if (e.coll.length) c.append(h('div', { class: 'sub' }, '常見搭配詞'), h('ul', { class: 'colls' }, e.coll.map(x => h('li', {}, spk(x.t, x.t), h('b', {}, ' ' + x.t), h('span', { class: 'fine' }, '　' + x.zh)))));
    if (e.ex.length) c.append(h('div', { class: 'sub' }, '原創例句'), h('ul', { class: 'exs' }, e.ex.map(x => h('li', {}, spk(x.en, x.en.slice(0, 30)), h('span', { class: 'en' }, ' ' + x.en), h('div', { class: 'fine zh' }, x.zh)))));
    if (!o.noLink) c.append(h('p', { class: 'fine' }, wlink(id, '看完整單字頁(字族、歷屆出現紀錄)→')));
    return c;
  }

  // ---------- 字族(B)與語意相關(C)：兩類分開呈現，不混在一起 ----------
  function relationBlock(id) {
    const e = ent(id), fam = (V.families[e.family] || { members: [] }).members.filter(m => m !== id);
    const box = h('div');
    box.append(h('div', { class: 'sub' }, '詞形變化(A):同一個字的不同形式'), h('p', {}, e.forms.join('、')));
    box.append(h('div', { class: 'sub' }, '同字族衍生字(B):字根相同、詞性或詞形不同'));
    if (fam.length) box.append(h('ul', { class: 'fam', 'data-role': 'family' }, fam.map(m => { const f = ent(m), x = counts(m);
      return h('li', { 'data-entry': m }, spk(f.hw, f.hw), h('b', {}, ' ' + f.hw), h('span', { class: 'fine' }, ' ' + posZh(f)),
        x ? h('span', { class: 'cnt' }, x.total ? '　歷屆已確認出現 ' + x.total + ' 次' : '　歷屆沒有已確認的出現紀錄') : null, '　', wlink(m, '單字頁')); })));
    else box.append(h('p', { class: 'fine' }, '這個字目前沒有收錄同字族的衍生字。'));
    const r = e.rel, any = r.syn.length || r.ant.length || r.confusable.length;
    box.append(h('div', { class: 'sub' }, '語意相關字(C):意思相近、相反或容易混淆,但不是同字族'));
    if (r.syn.length) box.append(h('p', { 'data-role': 'syn' }, h('b', {}, '同義字:'), r.syn.map(x => x.w + '(' + x.zh + ')').join('、')));
    if (r.ant.length) box.append(h('p', { 'data-role': 'ant' }, h('b', {}, '反義字:'), r.ant.map(x => x.w + '(' + x.zh + ')').join('、')));
    r.confusable.forEach(x => box.append(h('p', { class: 'conf', 'data-role': 'conf' }, h('b', {}, '相似字辨析 ' + e.hw + ' vs. ' + x.w + ':'), x.note)));
    if (!any) box.append(h('p', { class: 'fine' }, '這個字還沒有建立語意相關字。'));
    box.append(h('p', { class: 'fine' }, '提醒:三類關係各自計算,同字族與同義字的出現次數不會併入原字。'));
    return box;
  }

  // ---------- 歷屆出現紀錄 ----------
  const qidOf = r => 'e' + r.y + '_' + (r.n != null ? r.n : r.qs[0]);
  function recordsBlock(id, o) {
    o = o || {};
    const e = ent(id), I = IDX();
    if (!I) return h('div', { class: 'notice info', 'data-role': 'no-index' }, '歷屆出現紀錄來自歷屆試題,試題的使用授權確認後才會開放。');
    const x = I.entries[id]; if (!x) return h('p', { class: 'notice' }, '這個詞條還沒有建立出現紀錄。');
    const box = h('div', { 'data-role': 'records' });
    box.append(h('div', { class: 'stat' },
      h('div', { 'data-k': 'total' }, h('b', {}, x.total), '已確認出現次數'),
      h('div', { 'data-k': 'years' }, h('b', {}, x.years.length), '出現於幾個學年度'),
      h('div', { 'data-k': 'units' }, h('b', {}, x.units), '涉及題目/題組')));
    box.append(h('ul', { class: 'brk', 'data-role': 'breakdown' },
      h('li', {}, '題幹:' + x.role.stem + ' 次'),
      h('li', {}, '選項・正確答案:' + x.role.answer + ' 次' + (x.answerRecords ? '(其中整個選項就是這個字:' + x.answerExact + ' 次)' : '')),
      h('li', {}, '選項・干擾選項:' + x.role.distractor + ' 次'),
      h('li', {}, '文章原文:' + x.role.passage + ' 次(分布在 ' + x.passageUnits + ' 篇文章/題組;一篇文章供多題共用只算一篇)')));
    box.append(h('p', { class: 'fine' }, '首次出現:' + (x.first || '—') + ' 學年度;最近一次:' + (x.last || '—') + ' 學年度。'));
    if (x.years.length) box.append(h('table', { class: 'peryear', 'data-role': 'per-year' }, h('tr', {}, h('th', {}, '學年度'), h('th', {}, '次數')), x.years.map(y => h('tr', {}, h('td', {}, y), h('td', {}, x.perYear[y])))));
    // 出現紀錄明細
    const rows = (o.limit ? x.records.slice(-o.limit) : x.records).slice().reverse();
    if (rows.length) {
      const tb = h('table', { class: 'rec', 'data-role': 'rec-table' }, h('tr', {}, ['學年度', '題號', '題型', '實際形式', '位置', '角色', ''].map(t => h('th', {}, t))));
      rows.forEach(r => {
        const q = env.QB[qidOf(r)], acc = q ? window.GSATAccess.canView(q) : { ok: false };
        const qn = r.n != null ? '第 ' + r.n + ' 題' : '題組 ' + r.qs[0] + '–' + r.qs[r.qs.length - 1];
        tb.append(h('tr', { 'data-qid': qidOf(r), 'data-role-type': r.role }, h('td', {}, r.y), h('td', {}, qn), h('td', {}, TYPE[r.t] || r.t), h('td', {}, r.f.join(' / ')),
          h('td', {}, r.loc + (r.c > 1 ? '(出現 ' + r.c + ' 次)' : '')), h('td', {}, ROLE[r.role]),
          h('td', {}, q ? (acc.ok ? h('a', { class: 'btn line sm', href: '#/q/' + qidOf(r) }, '查看題目') : h('span', { class: 'lock', title: acc.reason }, '🔒 完整方案')) : '')));
      });
      box.append(h('div', { class: 'tscroll' }, tb));
      if (o.limit && x.records.length > o.limit) box.append(h('p', { class: 'fine' }, '只列出最近 ' + o.limit + ' 筆;完整紀錄請看單字頁。'));
    } else box.append(h('p', { class: 'notice info' }, '歷屆題庫中沒有已確認的出現紀錄。'));
    if (x.review.length) box.append(h('details', { class: 'pend', 'data-role': 'review' }, h('summary', {}, '另有 ' + x.review.length + ' 筆待審核(詞性或字義無法由程式判斷,尚未計入上面的次數)'),
      h('ul', {}, x.review.map(r => h('li', {}, r.y + ' ' + (TYPE[r.t] || r.t) + ' ' + (r.n != null ? '第 ' + r.n + ' 題' : '題組') + ' ' + r.loc + ':' + r.f.join(' / ') + (r.r === 'pos' ? '(詞性有疑義:' + (e.amb[r.f[0].toLowerCase()] || '') + ')' : '(位於連字號複合詞內)'))))));
    if (!o.limit) {
      const fam = (V.families[e.family] || { members: [] }).members.filter(m => m !== id);
      if (fam.length) box.append(h('div', { class: 'sub' }, '同字族其他單字的出現紀錄(各自計算,不併入上面的次數)'), h('ul', { class: 'fam', 'data-role': 'family-counts' }, fam.map(m => { const c = counts(m);
        return h('li', { 'data-entry': m }, h('b', {}, ent(m).hw), h('span', { class: 'fine' }, ' ' + ent(m).pos), '　', c && c.total ? '已確認 ' + c.total + ' 次,出現於 ' + c.years.join('、') + ' 學年度' : '歷屆沒有已確認的出現紀錄', c && c.review.length ? '(另有 ' + c.review.length + ' 筆待審核)' : ''); })));
      box.append(h('details', { class: 'method' }, h('summary', {}, '統計方法與限制'), h('ul', {}, I.meta.rules.map(t => h('li', {}, t)).concat([h('li', {}, I.meta.scope)])), h('p', { class: 'fine' }, I.meta.notice)));
    }
    box.append(h('p', { class: 'fine', 'data-role': 'disclaimer' }, '歷屆出現次數只說明過去題庫的紀錄,不代表未來的出題機率。'));
    return box;
  }

  // ---------- 逐題詳解 schema 2（交卷後的檢討頁） ----------
  function explainNode(q, e, st) {
    const LET = env.LET, chosen = st.chosen, A = e.answer, ai = LET.indexOf(A), entA = ent(e.options[A].entry), key = 'x:' + q.id;
    const box = h('div', { class: 'explain v2', role: 'note', 'data-explain': e.status, 'data-qid': q.id });
    box.append(h('div', { class: 'row', style: 'justify-content:space-between' }, h('b', {}, '詳解'), h('span', { class: 'tag' }, e.status === 'reviewed' ? '已審核' : '草稿・待人工審核')));
    // 1 正確答案
    const verdict = chosen == null ? '你沒有作答這一題。' : chosen === q.a ? '✔ 你選的 (' + LET[chosen] + ') 是正確答案。' : '✘ 你選了 (' + LET[chosen] + ') ' + q.o[chosen] + ',答錯了。';
    const s1 = h('div', {},
      h('p', { class: 'ans', 'data-role': 'answer' }, '正確答案:(' + A + ') ', h('b', {}, q.o[ai]), ' ', spk(entA.hw, entA.hw), h('span', { class: 'fine' }, ' ' + posZh(entA))),
      e.zh ? h('p', { class: 'fine', 'data-role': 'zh' }, h('b', {}, '題目中譯(代入正確答案):'), e.zh) : null,
      h('p', { class: 'verdict ' + (chosen === q.a ? 'ok' : chosen == null ? '' : 'bad'), 'data-role': 'verdict' }, verdict),
      chosen != null && chosen !== q.a ? h('p', { 'data-role': 'why-wrong' }, h('b', {}, '為什麼不選 (' + LET[chosen] + '):'), e.options[LET[chosen]].why) : null,
      h('p', { 'data-role': 'why-right' }, h('b', {}, '為什麼選 (' + A + '):'), e.options[A].why));
    // 2 解題關鍵
    const s2 = h('ol', { class: 'steps', 'data-role': 'key' }, e.key.map(t => h('li', {}, t)));
    // 3 選項解析
    const s3 = h('div', {}, ['A', 'B', 'C', 'D'].map((L, i) => { const o = e.options[L], en = ent(o.entry);
      return h('div', { class: 'optcard' + (L === A ? ' ok' : '') + (chosen === i && L !== A ? ' bad' : ''), 'data-opt': L },
        h('div', { class: 'row' }, h('b', {}, '(' + L + ') ' + q.o[i]), spk(en.hw, en.hw), L === A ? h('span', { class: 'tag ok' }, '正確答案') : null, chosen === i ? h('span', { class: 'tag' }, '你選的') : null),
        h('div', { class: 'fine' }, posZh(en) + (en.alsoPos ? '(另有詞性:' + en.alsoPos + ')' : '')), h('p', {}, o.why),
        h('div', { class: 'fine' }, wlink(o.entry, '單字頁→'))); }));
    // 4 單字與發音
    const signed = e.status === 'reviewed';
    const s4 = h('div', {}, e.words.map(w => wordCard(w, { noLink: false, signedScope: signed })));
    if (e.phrases.length) s4.append(h('div', { class: 'sub' }, '這題用到的片語'), h('ul', { class: 'colls' }, e.phrases.map(p => { const x = V.phrases[p]; return h('li', {}, spk(x.t, x.t), h('b', {}, ' ' + x.t), h('span', { class: 'fine' }, '　' + x.zh)); })));
    if (e.grammar) s4.append(h('div', { class: 'sub' }, '文法補充'), h('p', { 'data-role': 'grammar' }, e.grammar));
    // 5 衍生字與延伸
    const s5 = h('div', {}, relationBlock(e.focus));
    if (e.patterns.length) s5.append(h('div', { class: 'sub' }, '常考句型'), h('ul', { 'data-role': 'patterns' }, e.patterns.map(t => h('li', {}, t))));
    // 6 歷屆出題紀錄
    const s6 = recordsBlock(e.focus, { limit: 5 }); s6.prepend(h('p', { class: 'fine' }, '「' + ent(e.focus).hw + '」在歷屆題庫的出現紀錄:'));
    s6.append(h('p', {}, wlink(e.focus, '看完整歷屆出現紀錄與統計方法→')));
    // 7 延伸練習
    const items = EXT.filter(x => x.forQuestion === (q.year + '-' + q.n));
    const s7 = items.length ? h('div', {}, h('p', {}, '針對這一題的常見錯誤設計的原創練習,共 ' + items.length + ' 題。', signed ? signedTag(h) : draftTag(h)),
      h('a', { class: 'btn', href: '#/ext/' + q.year + '-' + q.n, 'data-role': 'ext-start' }, '開始延伸練習')) : h('p', { class: 'fine' }, '這一題還沒有延伸練習。');
    const W = wide();
    box.append(sec(key + ':1', '① 正確答案', s1, true), sec(key + ':2', '② 解題關鍵', s2, true), sec(key + ':3', '③ 選項解析', s3, true),
      sec(key + ':4', '④ 單字與發音', s4, W), sec(key + ':5', '⑤ 衍生字與延伸', s5, W), sec(key + ':6', '⑥ 歷屆出題紀錄', s6, W), sec(key + ':7', '⑦ 延伸練習', s7, W, items.length ? items.length + ' 題' : ''));
    return box;
  }

  // ---------- 原創文章朗讀器：正常/慢速、暫停、繼續、重新播放（只提供有使用權利的原創文章） ----------
  function passagePlayer(q) {
    const ref = 'mock:' + q.group, A = window.GSATAudio;
    if (!q.group || !A.itemFor(ref, false)) return null;
    let slow = !!env.DB.prefs.audioSlow;
    const wrap = h('div', { class: 'ppl', 'data-role': 'passage-player' });
    const status = h('span', { class: 'fine', 'aria-live': 'polite' });
    const item = () => A.itemFor(ref, slow);
    const mainBtn = h('button', { class: 'btn sm', type: 'button', 'data-act': 'main' });
    const replayBtn = h('button', { class: 'btn line sm', type: 'button', 'data-act': 'replay', onclick: () => { const it = item(); A.play(it.text, { slow, file: 'audio/' + it.file, key: it.hash, restart: true }); } }, '↻ 重新播放');
    const chips = [['normal', '正常速度'], ['slow', '慢速']].map(([k, t]) => h('button', { class: 'chip', type: 'button', 'data-speed': k, 'aria-pressed': String((k === 'slow') === slow), onclick: () => {
      const was = A.state(); slow = k === 'slow'; env.DB.prefs.audioSlow = slow; env.saveDB();
      chips.forEach(c => c.setAttribute('aria-pressed', String((c.dataset.speed === 'slow') === slow)));
      if (was.key && (was.key === item().hash || was.key === (A.itemFor(ref, !slow) || {}).hash)) { const it = item(); A.play(it.text, { slow, file: 'audio/' + it.file, key: it.hash, restart: true }); } } }, t));
    function paint(s) {
      const mine = s.key && (s.key === (A.itemFor(ref, false) || {}).hash || s.key === (A.itemFor(ref, true) || {}).hash);
      mainBtn.textContent = !mine ? '▶ 播放全文' : s.playing ? '⏸ 暫停' : '▶ 繼續';
      mainBtn.setAttribute('aria-pressed', String(!!mine && s.playing));
      status.textContent = mine ? (s.via === 'device' ? '找不到音檔,改用裝置內建語音' : (s.playing ? '播放中' : '已暫停')) : '';
    }
    mainBtn.addEventListener('click', () => {
      const s = A.state(), it = item();
      const mine = s.key === it.hash;
      if (mine && s.playing) A.pause(); else if (mine) A.resume(); else A.play(it.text, { slow, file: 'audio/' + it.file, key: it.hash });
    });
    const un = A.subscribe(s => { if (!wrap.isConnected) { un(); return; } paint(s); });
    paint(A.state());
    wrap.append(h('div', { class: 'sub' }, '朗讀全文(原創文章)'), h('div', { class: 'row' }, mainBtn, replayBtn), h('div', { class: 'row mt' }, chips, status));
    return wrap;
  }

  // ---------- #/word/<id>：單字頁 ----------
  function viewWord(p) {
    const id = p[0], e = ent(id);
    const prev = env.prevHash();
    const root = h('div', { 'data-view': 'word' }, h('a', { class: 'link', href: prev && /^#\/(rev|q|ext)\//.test(prev) ? prev : '#/words', 'data-restore': '1' }, prev && /^#\/(rev|q|ext)\//.test(prev) ? '← 返回' : '← 單字與字族'));
    if (!e) return root.appendChild(h('p', { class: 'notice mt' }, '找不到這個單字。')) && root;
    root.append(h('h1', { class: 'brand' }, e.hw), wordCard(id, { noLink: true }));
    const key = 'w:' + id, W = wide();
    root.append(sec(key + ':rel', '字族與語意相關字', relationBlock(id), true), sec(key + ':rec', '歷屆出題紀錄', recordsBlock(id), true));
    const items = EXT.filter(x => x.targets.includes(id));
    root.append(sec(key + ':ext', '延伸練習', items.length ? h('div', {}, h('p', {}, '與這個字有關的原創練習,共 ' + items.length + ' 題。', draftTag(h)), h('a', { class: 'btn', href: '#/ext/word:' + id }, '開始延伸練習')) : h('p', { class: 'fine' }, '這個字還沒有延伸練習。'), W));
    return root;
  }

  // ---------- #/words：單字與字族一覽 ----------
  function viewWords() {
    const root = h('div', { 'data-view': 'words' }, env.back('#/'), h('h1', { class: 'brand' }, '單字與字族'),
      h('p', { class: 'sub' }, '單字資料庫的詞條(原創內容)。點進去看詞形、字族、搭配詞、發音與歷屆出現紀錄。'));
    const q = h('input', { type: 'text', 'aria-label': '搜尋單字或中文', placeholder: '搜尋單字或中文', style: 'margin-top:8px' });
    const list = h('div', { class: 'mt' });
    const all = Object.values(V.entries);
    function draw() {
      const t = q.value.trim().toLowerCase(); list.innerHTML = '';
      const hit = all.filter(e => !t || e.hw.includes(t) || e.zh.includes(t));
      const fams = {}; hit.forEach(e => { (fams[e.family] = fams[e.family] || []).push(e); });
      Object.values(fams).sort((a, b) => (b[0].full ? 1 : 0) - (a[0].full ? 1 : 0)).forEach(g => {
        list.append(h('div', { class: 'card mt', 'data-family': g[0].family }, g.map(e => { const c = counts(e.id);
          return h('div', { class: 'row', style: 'justify-content:space-between;padding:4px 0', 'data-entry': e.id }, h('span', {}, spk(e.hw, e.hw), h('b', {}, ' ' + e.hw), h('span', { class: 'fine' }, ' ' + posZh(e))),
            h('span', {}, c ? h('span', { class: 'cnt' }, c.total ? c.total + ' 次' : '—') : null, ' ', wlink(e.id, '詳細'))); })));
      });
      if (!hit.length) list.append(h('p', { class: 'notice info' }, '沒有符合的單字。'));
    }
    q.addEventListener('input', draw); draw();
    root.append(q, list, h('p', { class: 'fine mt' }, IDX() ? '右側數字是歷屆「已確認」出現次數(詞性有疑義的比對尚未計入)。' : '歷屆出現次數需歷屆試題授權確認後才會顯示。'));
    return root;
  }

  // ---------- #/q/<題目編號>：從出現紀錄查看題目（遵守免費／付費權限；交卷前不顯示答案） ----------
  function viewQ(p) {
    const q = env.QB[p[0]], prev = env.prevHash();
    const root = h('div', { 'data-view': 'q' }, h('a', { class: 'link', href: prev && prev.startsWith('#/word/') ? prev : '#/words', 'data-restore': '1' }, '← 返回'));
    if (!q || q.src !== 'exam') return root.appendChild(h('p', { class: 'notice mt' }, '找不到這一題。')) && root;
    const acc = window.GSATAccess.canView(q);
    if (!acc.ok) return root.appendChild(h('div', { class: 'notice mt', 'data-role': 'locked' }, '🔒 ' + acc.reason + '。')) && root;
    // 交卷過才算「作答過」：整份／分類作答（mode=exam）交卷後的每一題，或學習模式下實際答過的題目
    const att = env.DB.hist.slice().reverse().find(x => x.ids.includes(q.id) && (x.mode === 'exam' || (x.answers && x.answers[q.id] != null)));
    root.append(h('h1', { class: 'brand' }, q.label));
    if (att) {
      root.append(h('p', { class: 'fine' }, '這是你 ' + new Date(att.ts).toLocaleDateString('zh-TW') + ' 交卷的作答。'),
        env.questionNode(q, { chosen: att.answers[q.id], reveal: true }));
    } else {
      root.append(h('div', { class: 'notice info', 'data-role': 'no-reveal' }, '你還沒有作答過這一題。作答並交卷後才能看答案與詳解。'),
        env.questionNode(q, { chosen: null, reveal: false, readonly: true }),
        h('div', { class: 'row mt' }, h('button', { class: 'btn', 'data-act': 'practice', onclick: () => {
          if (env.loadSession() && !confirm('已有一份作答還沒完成,開始新的會取代它。繼續嗎?')) return;
          const qs = q.group ? Object.values(env.QB).filter(x => x.group === q.group).sort((a, b) => a.n - b.n) : [q];
          env.startSession('practice', '歷屆題目練習', qs, { mode: 'exam' }); } }, '練習這一題(交卷後看詳解)')));
    }
    return root;
  }

  // ---------- #/ext/<題號|word:詞條>：原創延伸練習（待審核草稿） ----------
  const extRun = { key: null, i: 0, picked: {}, };
  function viewExt(p) {
    const key = decodeURIComponent(p.join('/')), prev = env.prevHash();
    const items = key.startsWith('word:') ? EXT.filter(x => x.targets.includes(key.slice(5))) : EXT.filter(x => x.forQuestion === key);
    const root = h('div', { 'data-view': 'ext' }, h('a', { class: 'link', href: prev && /^#\/(rev|word)\//.test(prev) ? prev : '#/words', 'data-restore': '1' }, '← 返回'));
    if (!items.length) return root.appendChild(h('p', { class: 'notice mt' }, '沒有這組延伸練習。')) && root;
    if (extRun.key !== key) { extRun.key = key; extRun.i = 0; extRun.picked = {}; }
    const covered = items.every(x => signedQ(x.forQuestion));             // 這組練習全部屬於已簽核的題目 → 不再標「待審核草稿」;只要有一題未簽核就照舊
    root.append(h('h1', { class: 'brand' }, '延伸練習'), covered
      ? h('p', { class: 'fine', 'data-role': 'ext-signed' }, '原創練習題,針對這一題的常見錯誤設計。', signedTag(h), ' 內容已由教師確認(簽核範圍:' + [...new Set(items.map(x => x.forQuestion))].join('、') + ')。')
      : h('p', { class: 'fine' }, '原創練習題,針對這一題的常見錯誤設計。', draftTag(h), ' 內容尚未經老師審核。'));
    const body = h('div'); root.append(body);
    function paint() {
      body.innerHTML = '';
      if (extRun.i >= items.length) {
        const ok = items.filter(x => extRun.picked[x.id] === x.answer).length;
        body.append(h('div', { class: 'stat mt', 'data-role': 'ext-result' }, h('div', {}, h('b', {}, ok + ' / ' + items.length), '答對題數')),
          h('div', { class: 'row mt' }, h('button', { class: 'btn line', onclick: () => { extRun.i = 0; extRun.picked = {}; paint(); } }, '再練一次'), h('a', { class: 'btn', href: prev && /^#\/(rev|word)\//.test(prev) ? prev : '#/words', 'data-restore': '1' }, '回到詳解')));
        return;
      }
      const x = items[extRun.i], picked = extRun.picked[x.id];
      body.append(h('div', { class: 'fine mt' }, '第 ' + (extRun.i + 1) + ' / ' + items.length + ' 題・' + ({ pos: '詞性判斷', synonym: '近義字比較', collocation: '搭配詞', pattern: '句型運用', context: '上下文語意' }[x.type] || x.type), ' ', signedQ(x.forQuestion) ? signedTag(h) : draftTag(h)),
        h('div', { class: 'qtext', 'data-role': 'ext-q' }, x.q),
        h('div', { role: 'radiogroup' }, x.options.map((t, i) => h('button', { class: 'opt' + (picked != null ? (i === x.answer ? ' ok' : i === picked ? ' bad' : '') : ''), role: 'radio', disabled: picked != null, 'data-i': i,
          onclick: () => { extRun.picked[x.id] = i; const s = env.DB.ext[x.id] = env.DB.ext[x.id] || { a: 0, c: 0 }; s.a++; if (i === x.answer) s.c++; env.saveDB(); paint(); } }, h('span', { class: 'k' }, '(' + 'ABCD'[i] + ')'), h('span', {}, t)))));
      if (picked != null) body.append(h('div', { class: 'explain', 'data-role': 'ext-explain' }, h('b', {}, picked === x.answer ? '✔ 答對了。' : '✘ 答錯了。正確答案是 (' + 'ABCD'[x.answer] + ')。'), h('p', {}, x.explain)),
        h('div', { class: 'row mt' }, h('button', { class: 'btn', onclick: () => { extRun.i++; paint(); } }, extRun.i + 1 < items.length ? '下一題' : '看結果')));
    }
    paint();
    return root;
  }

  function route(parts) {
    const v = parts[0], rest = parts.slice(1);
    return ({ word: viewWord, words: viewWords, q: viewQ, ext: viewExt })[v]?.(rest);
  }
  return { init, explainNode, passagePlayer, wordCard, relationBlock, recordsBlock, route, qidOf };
})();
