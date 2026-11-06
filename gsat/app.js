(function () {
'use strict';
const C = window.GSATCore, SC = window.SCORING, CFG = window.GSAT_CONFIG || {};
const MOCK = window.GSAT, EXAMS = window.EXAMS || [], AN = window.ANSWERS || {}, NS = window.NONMC || {};
let EXPL = window.EXPLAIN || {};
const LET = C.LET, TN = SC.TYPE_NAMES;
const $app = document.getElementById('app');

// ---------- 小工具 ----------
function h(tag, props) {
  const e = document.createElement(tag);
  for (const k in (props || {})) {
    const v = props[k];
    if (k === 'class') e.className = v;
    else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
    else if (v === true) e.setAttribute(k, '');
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  for (const c of Array.prototype.slice.call(arguments, 2).flat(9)) {
    if (c == null || c === false) continue;
    e.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return e;
}
const go = hash => { if (location.hash === hash) render(); else location.hash = hash; };

// ---------- 題庫（歷屆 + 原創）攤平成單題 ----------
const QB = {};
const yearInfo = {};   // 年度 → {ready, n, reason}
function buildBank() {
  // 原創模擬題
  MOCK.vocab.forEach((x, i) => add({ id: 'v' + i, src: 'mock', type: 'vocab', q: x.q, o: x.o, a: x.a, mockE: x.e, w: 1 }));
  MOCK.cloze.forEach((p, pi) => p.qs.forEach((x, i) => add({ id: 'c' + pi + '_' + i, src: 'mock', type: 'cloze', group: 'c' + pi, title: p.title, paras: p.text.split('\n\n'), q: '空格 (' + (i + 1) + ')', o: x.o, a: x.a, mockE: x.e, w: 1 })));
  MOCK.reading.forEach((p, pi) => p.qs.forEach((x, i) => add({ id: 'r' + pi + '_' + i, src: 'mock', type: 'reading', group: 'r' + pi, title: p.title, paras: p.text.split('\n\n'), q: x.q, o: x.o, a: x.a, mockE: x.e, w: 1 })));
  MOCK.structure.forEach((p, pi) => p.ans.forEach((a, i) => add({ id: 's' + pi + '_' + i, src: 'mock', type: 'structure', group: 's' + pi, title: p.title, paras: p.text.split('\n\n'), q: '空格 (' + (i + 1) + ') 應填入哪一句?', o: p.options, a: a, mockE: p.e[i], w: 1 })));
  // 歷屆試題：逐年檢查題數、答案與計分設定一致才開放（不同年度的制度不混用）
  for (const ex of EXAMS) {
    const cfg = SC.years[ex.year], key = AN[ex.year] || '';
    const want = cfg ? Object.values(cfg.sections).reduce((s, v) => s + v[0], 0) : 0;
    const qs = [];
    for (const s of ex.sections) for (const g of s.groups) for (const q of g.questions) qs.push([s, g, q]);
    let reason = '';
    if (!cfg) reason = '沒有這個年度的計分設定';
    else if (qs.length !== want) reason = '題數與計分設定不符';
    else if (key.length !== want) reason = '答案待補';
    else if (!/^[A-J]+$/.test(key)) reason = '答案格式錯誤';
    yearInfo[ex.year] = { ready: !reason, n: qs.length, reason, cfg };
    qs.forEach(([s, g, q]) => {
      const a = key[q.n - 1] ? LET.indexOf(key[q.n - 1]) : -1;
      const o = (s.type === 'bank' || s.type === 'structure') ? g.bank : q.opts;
      add({ id: 'e' + ex.year + '_' + q.n, src: 'exam', year: ex.year, n: q.n, type: s.type, group: g.passage ? 'e' + ex.year + '_' + s.type + '_' + g.questions[0].n : null,
        paras: g.passage, blank: g.passage && s.type !== 'reading' ? q.n : null,
        q: (s.type === 'cloze' || s.type === 'bank' || s.type === 'structure') ? '第 ' + q.n + ' 題空格' : q.stem,
        o: o, optImgs: q.optImgs, img: q.img, a: a, w: ((cfg && cfg.sections[s.type]) || [0, 1])[1], label: ex.year + ' 學測 第 ' + q.n + ' 題', ok: !reason && a >= 0 && a < o.length });
    });
  }
  // 詳解：答案必須和官方答案一致，不一致的整則捨棄（避免詳解和官方答案互相矛盾）
  const clean = {};
  for (const k in EXPL) {
    const q = QB['e' + k.replace('-', '_')];
    if (q && q.ok && LET[q.a] === EXPL[k].answer) clean[k] = EXPL[k];
    else console.error('詳解與官方答案不符或題目不存在，已略過：' + k);
  }
  EXPL = clean;
}
function add(q) { if (q.src === 'mock') q.ok = true; q.typeName = TN[q.type] || { vocab: '詞彙' }[q.type]; QB[q.id] = q; }
buildBank();
const readyYears = () => EXAMS.map(e => e.year).filter(y => yearInfo[y].ready);
const examsOn = () => EXAMS.length > 0;

// ---------- 存檔（localStorage；失敗時退回記憶體，頁面照常運作） ----------
const DBK = 'gsat-db-v2', SSK = 'gsat-session-v2', OLDK = 'gsat-english-v1';
let mem = {};
const ls = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] || null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { delete mem[k]; } },
};
function loadDB() {
  let d = null;
  try { d = JSON.parse(ls.get(DBK) || 'null'); } catch (e) {}
  if (!d) {
    d = { v: 2, q: {}, hist: [], prefs: { fs: 17 }, ns: {} };
    try { // 從舊版（v1）搬錯題
      const o = JSON.parse(ls.get(OLDK) || 'null');
      if (o && o.wrong) for (const id in o.wrong) d.q[id] = { a: 1, c: 0, s: 0, lw: Date.now() };
    } catch (e) {}
  }
  d.q = d.q || {}; d.hist = d.hist || []; d.prefs = d.prefs || { fs: 17 }; d.ns = d.ns || {};
  return d;
}
let DB = loadDB();
const saveDB = () => ls.set(DBK, JSON.stringify(DB));
const loadSession = () => { try { const s = JSON.parse(ls.get(SSK) || 'null'); return s && s.v === 2 && s.ids.every(i => QB[i]) ? s : null; } catch (e) { return null; } };
const saveSession = s => s ? ls.set(SSK, JSON.stringify(s)) : ls.del(SSK);
function applyPrefs() { document.documentElement.style.setProperty('--fs', (DB.prefs.fs || 17) + 'px'); }
applyPrefs();

// ---------- 作答畫面共用：文章 + 題目 + 選項 ----------
function passageNode(q) {
  if (!q.paras) return null;
  const box = h('div', { class: 'passage', role: 'region', 'aria-label': '文章', tabindex: '0' });
  if (q.title) box.append(h('div', { class: 'ttl' }, q.title));
  q.paras.forEach(t => {
    const p = h('p');
    t.split(/(【\d+】)/).forEach(part => {
      const m = part.match(/^【(\d+)】$/);
      if (m) p.append(h('span', { class: 'blank' + (+m[1] === q.blank ? ' cur' : ''), 'aria-label': '空格 ' + m[1] }, m[1]));
      else if (part) p.append(part);
    });
    box.append(p);
  });
  setTimeout(() => { const c = box.querySelector('.cur'); if (c) box.scrollTop = Math.max(0, c.offsetTop - box.offsetTop - 60); }, 0);
  return box;
}
function explainNode(q) {
  const k = q.year + '-' + q.n, e = q.src === 'exam' ? EXPL[k] : null;
  const box = h('div', { class: 'explain', role: 'note' });
  box.append(h('b', {}, '正確答案:(' + LET[q.a] + ')'));
  if (e) {
    box.append(h('span', { class: 'tag' + (e.status === 'reviewed' ? ' ok' : '') }, e.status === 'reviewed' ? '已審核' : '草稿・待人工審核'));
    if (e.key) box.append(h('h4', {}, '解題關鍵'), h('p', {}, e.key));
    if (e.why) box.append(h('h4', {}, '各選項分析'), h('ul', {}, Object.keys(e.why).map(L => h('li', {}, '(' + L + ') ' + e.why[L]))));
    if (e.words && e.words.length) box.append(h('h4', {}, '重要單字與片語'), h('ul', {}, e.words.map(w => h('li', {}, w))));
    if (e.grammar) box.append(h('h4', {}, '文法補充'), h('p', {}, e.grammar));
  } else if (q.mockE) box.append(h('p', {}, q.mockE));
  else box.append(h('p', { class: 'fine' }, '這題的原創詳解還在製作中,目前只提供官方答案。'));
  return box;
}
// state: {chosen, reveal, onPick, flagged}
function questionNode(q, st) {
  const wrap = h('div', { class: 'qwrap' + (q.paras ? ' two' : '') });
  const left = passageNode(q);
  if (left) wrap.append(left);
  const right = h('div');
  right.append(h('div', { class: 'fine' }, (q.label || '原創模擬題') + '・' + q.typeName));
  right.append(h('div', { class: 'qtext' }, q.q));
  if (q.img) right.append(h('img', { class: 'qimg', src: q.img, alt: '題目附圖', loading: 'lazy' }));
  const opts = h('div', { role: 'radiogroup', 'aria-label': '選項' });
  q.o.forEach((t, i) => {
    let cls = 'opt';
    if (st.reveal) { if (i === q.a) cls += ' ok'; else if (i === st.chosen) cls += ' bad'; }
    else if (i === st.chosen) cls += ' sel';
    const b = h('button', { class: cls, role: 'radio', 'aria-checked': i === st.chosen ? 'true' : 'false', disabled: !!st.reveal, onclick: () => st.onPick && st.onPick(i) },
      h('span', { class: 'k' }, '(' + LET[i] + ')'), h('span', {}, q.optImgs ? '' : t));
    if (q.optImgs) b.append(h('img', { src: q.optImgs[i], alt: '選項 ' + LET[i] + ' 圖片', loading: 'lazy' }));
    opts.append(b);
  });
  right.append(opts);
  if (st.reveal) right.append(explainNode(q));
  wrap.append(right);
  return wrap;
}

// 固定在畫面底部的操作列會遮住內容：依它的實際高度替頁面底部留白
function reserveBar() {
  const b = document.querySelector('.bar');
  $app.style.paddingBottom = b ? 'calc(' + (Math.ceil(b.getBoundingClientRect().height) + 20) + 'px)' : '';
}
// ---------- 路由 ----------
let cleanup = null, rendered = false;
function render() {
  if (cleanup) { cleanup(); cleanup = null; }
  const parts = (location.hash || '#/').slice(2).split('/');
  const wide = ['run', 'rev'].includes(parts[0]);
  $app.className = wide ? 'wide' : '';
  $app.style.paddingBottom = '';
  $app.innerHTML = '';
  const v = ({ '': viewHome, exam: viewExam, practice: viewPractice, review: viewReview, run: viewRun, result: viewResult, rev: viewRev, ns: viewNs })[parts[0]] || viewHome;
  const node = v(parts.slice(1));
  if (node) $app.append(node);
  reserveBar();
  window.scrollTo(0, 0);
  const t = $app.querySelector('h1,h2'); if (t) { t.setAttribute('tabindex', '-1'); if (rendered) t.focus({ preventScroll: true }); }
  rendered = true;
  document.title = (t ? t.textContent + '｜' : '') + 'Score Rescue｜學測英文';
}
window.addEventListener('hashchange', render);

const back = (href, text) => h('a', { class: 'link', href: href }, text || '← 返回');
const pendingWrong = () => Object.keys(DB.q).filter(id => QB[id] && QB[id].ok && C.isPendingWrong(DB.q[id]));

// ---------- 首頁 ----------
function viewHome() {
  const S = loadSession(), wrong = pendingWrong().length, ys = readyYears();
  const root = h('div');
  root.append(h('h1', { class: 'brand' }, CFG.brand), h('p', { class: 'sub' }, '台灣高中生的學測英文練習:模擬考、分類練習、錯題補強。'));
  if (S) root.append(h('div', { class: 'card cont mt' }, h('b', {}, '有一份作答還沒完成'),
    h('p', { class: 'fine' }, S.label + '・已答 ' + Object.keys(S.answers).length + ' / ' + S.ids.length + ' 題' + (S.limitMs ? '・剩餘 ' + C.fmtTime(S.remainMs) : '')),
    h('div', { class: 'row mt' }, h('a', { class: 'btn', href: '#/run' }, '繼續作答'),
      h('button', { class: 'btn line', onclick: () => { if (confirm('放棄這份作答?已作答的內容不會保留。')) { saveSession(null); render(); } } }, '放棄'))));
  const entry = (href, title, desc, badge) => h('a', { class: 'entry', href: href, style: 'text-decoration:none;color:inherit' }, h('b', {}, title), h('span', {}, desc), badge ? h('div', {}, h('span', { class: 'badge' }, badge)) : null);
  root.append(h('div', { class: 'grid3 mt' },
    entry('#/exam', '歷屆試題', examsOn() ? ys.length + ' 個學年度・完整模擬考、計時、交卷看成績' : '完整模擬考與計時', examsOn() ? '' : '授權確認後開放'),
    entry('#/practice', '分類練習', '依題型與題數自選,答完馬上看答案與詳解'),
    entry('#/review', '錯題補強', wrong ? wrong + ' 題待補強・連續答對 2 次才算掌握' : '答錯的題目會集中在這裡', '')));
  const done = Object.values(DB.q).reduce((s, v) => s + v.a, 0), right = Object.values(DB.q).reduce((s, v) => s + v.c, 0);
  if (done) root.append(h('div', { class: 'stat mt2' }, h('div', {}, h('b', {}, done), '累計作答題數'), h('div', {}, h('b', {}, Math.round(right / done * 100) + '%'), '累計正確率'), h('div', {}, h('b', {}, wrong), '待補強錯題')));
  root.append(h('div', { class: 'row mt2' }, h('a', { class: 'btn line sm', href: '#/ns/' }, '非選擇題與寫作'),
    h('span', { class: 'fine' }, '字級'), h('button', { class: 'chip', 'aria-label': '縮小字級', onclick: () => fs(-1) }, 'A−'), h('button', { class: 'chip', 'aria-label': '放大字級', onclick: () => fs(1) }, 'A+')));
  root.append(h('p', { class: 'fine mt2' }, '成績、錯題與作答進度只存在這台裝置的瀏覽器,清除瀏覽資料就會消失。'));
  return root;
}
function fs(d) { DB.prefs.fs = Math.max(15, Math.min(24, (DB.prefs.fs || 17) + d)); saveDB(); applyPrefs(); }

// ---------- 歷屆試題 ----------
function viewExam(p) {
  if (p[0]) return viewBrief(p[0]);
  const root = h('div', {}, back('#/'), h('h1', { class: 'brand' }, '歷屆試題'));
  if (!examsOn()) {
    root.append(h('div', { class: 'notice mt' }, '歷屆試題的著作權授權還在確認,目前不隨網站公開。你可以先到大考中心官網下載原卷自行練習,或使用「分類練習」的原創題。'),
      h('p', { class: 'mt' }, h('a', { class: 'btn', href: CFG.officialUrl, target: '_blank', rel: 'noopener noreferrer' }, '前往大考中心官網下載')));
    return root;
  }
  root.append(h('p', { class: 'sub' }, '選擇學年度,進行完整選擇題模擬考。106–110 與 111–115 的計分方式不同,系統會依年度自動套用。'));
  const list = h('div', { class: 'mt' });
  EXAMS.slice().reverse().forEach(ex => {
    const inf = yearInfo[ex.year], c = inf.cfg;
    const meta = c ? '選擇題 ' + inf.n + ' 題・' + c.mc + ' 分' + (c.mixed ? ' + 混合題 ' + c.mixed + ' 分' : '') + ' + 非選擇題 ' + (c.translation + c.essay) + ' 分' : '';
    list.append(h('div', { class: 'card mt' }, h('b', {}, ex.year + ' 學年度學測英文'), h('div', { class: 'fine' }, meta),
      h('div', { class: 'row mt' }, inf.ready ? h('a', { class: 'btn sm', href: '#/exam/' + ex.year }, '模擬考') : h('button', { class: 'btn sm', disabled: true }, inf.reason),
        h('a', { class: 'btn line sm', href: '#/ns/' + ex.year }, '非選擇題'))));
  });
  root.append(list);
  return root;
}
function viewBrief(y) {
  const inf = yearInfo[y];
  if (!inf || !inf.ready) return h('div', {}, back('#/exam'), h('p', { class: 'notice mt' }, '這個年度目前不能作答:' + (inf ? inf.reason : '找不到')));
  const c = inf.cfg, root = h('div', {}, back('#/exam'), h('h1', { class: 'brand' }, y + ' 學年度學測英文'));
  const rows = Object.keys(c.sections).map(t => h('tr', {}, h('td', {}, TN[t]), h('td', {}, c.sections[t][0] + ' 題'), h('td', {}, '每題 ' + c.sections[t][1] + ' 分'), h('td', {}, c.sections[t][0] * c.sections[t][1] + ' 分')));
  root.append(h('table', { class: 'mt' }, h('tr', {}, h('th', {}, '題型'), h('th', {}, '題數'), h('th', {}, '配分'), h('th', {}, '小計')), rows,
    h('tr', {}, h('th', {}, '選擇題合計'), h('th', {}), h('th', {}), h('th', {}, c.mc + ' 分'))));
  root.append(h('p', { class: 'fine mt' }, c.multiSelect ? '本年度另有混合題 ' + c.mixed + ' 分(含一題多選題)與非選擇題 ' + (c.translation + c.essay) + ' 分,不在這次的選擇題成績內。' : '本年度另有非選擇題 ' + (c.translation + c.essay) + ' 分(中譯英 ' + c.translation + '、作文 ' + c.essay + '),不在這次的選擇題成績內。'));
  let limit = 0; const chips = [];
  const setLimit = (m, b) => { limit = m; chips.forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); };
  const mk = (txt, m) => { const b = h('button', { class: 'chip', 'aria-pressed': m === 0 ? 'true' : 'false', onclick: () => setLimit(m, b) }, txt); chips.push(b); return b; };
  root.append(h('h2', { class: 'mt2' }, '計時'), h('div', { class: 'row mt' }, mk('不計時', 0), mk('60 分鐘', 60), mk(SC.TIME_LIMIT_MIN + ' 分鐘(官方全卷時間)', SC.TIME_LIMIT_MIN)),
    h('p', { class: 'fine mt' }, '官方考試時間 ' + SC.TIME_LIMIT_MIN + ' 分鐘含非選擇題。離開頁面或按「暫停」時計時會暫停;時間到會自動交卷。模擬考作答中不顯示對錯,交卷後才公布。'));
  const S = loadSession();
  root.append(h('div', { class: 'row mt2' }, h('button', { class: 'btn', onclick: () => {
    if (S && !confirm('已有一份作答還沒完成,開始新的會取代它。繼續嗎?')) return;
    startSession('exam', y + ' 學測模擬考', qsOfYear(y), { mode: 'exam', limitMs: limit * 60000, year: y }); } }, '開始作答')));
  return root;
}
const qsOfYear = y => Object.values(QB).filter(q => q.src === 'exam' && q.year === y).sort((a, b) => a.n - b.n);

// ---------- 分類練習 ----------
function viewPractice() {
  const root = h('div', {}, back('#/'), h('h1', { class: 'brand' }, '分類練習'));
  const f = { types: new Set(['vocab']), count: 10, src: 'all', era: 'all' };
  const pool = () => Object.values(QB).filter(q => q.ok && f.types.has(q.type) && (f.src === 'all' || q.src === f.src) &&
    (f.era === 'all' || (q.src === 'exam' && (f.era === 'old' ? +q.year <= 110 : +q.year >= 111))));
  const info = h('p', { class: 'fine mt' }), go_ = h('button', { class: 'btn mt', onclick: () => {
    const qs = C.pickByGroups(pool(), f.count);
    if (!qs.length) return;
    if (loadSession() && !confirm('已有一份作答還沒完成,開始新的會取代它。繼續嗎?')) return;
    startSession('practice', '分類練習', qs, { mode: 'instant' }); } }, '開始練習');
  const refresh = () => { const n = pool().length; info.textContent = '符合條件 ' + n + ' 題。閱讀、綜合測驗等文章題以整篇為單位,實際題數可能略多於設定。'; go_.disabled = !n; };
  const group = (title, items, multi, key) => {
    const bs = [];
    const row = h('div', { class: 'row mt' });
    items.forEach(([val, txt]) => {
      const sel = () => multi ? f[key].has(val) : f[key] === val;
      const b = h('button', { class: 'chip', 'aria-pressed': String(sel()), onclick: () => {
        if (multi) { if (f[key].has(val)) { if (f[key].size > 1) f[key].delete(val); } else f[key].add(val); } else f[key] = val;
        bs.forEach(x => x.b.setAttribute('aria-pressed', String(x.sel()))); refresh(); } }, txt);
      bs.push({ b, sel }); row.append(b);
    });
    return h('div', { class: 'mt2' }, h('h2', {}, title), row);
  };
  const types = Object.keys(TN).filter(t => Object.values(QB).some(q => q.ok && q.type === t));
  root.append(group('題型(可複選)', types.map(t => [t, TN[t]]), true, 'types'), group('題數', [[5, '5'], [10, '10'], [20, '20'], [30, '30']], false, 'count'));
  if (examsOn()) root.append(group('題目來源', [['all', '全部'], ['exam', '歷屆試題'], ['mock', '原創模擬題']], false, 'src'), group('歷屆年度範圍', [['all', '全部'], ['old', '106–110(舊制)'], ['new', '111–115(新制)']], false, 'era'));
  root.append(info, go_);
  refresh();
  return root;
}

// ---------- 錯題補強 ----------
function viewReview() {
  const root = h('div', {}, back('#/'), h('h1', { class: 'brand' }, '錯題補強'));
  const wrong = pendingWrong(), mastered = Object.keys(DB.q).filter(id => QB[id] && C.isMastered(DB.q[id])).length;
  root.append(h('p', { class: 'sub' }, '答錯的題目會進到這裡;之後連續答對 ' + C.MASTER_STREAK + ' 次才算掌握。'),
    h('div', { class: 'stat mt' }, h('div', {}, h('b', {}, wrong.length), '待補強'), h('div', {}, h('b', {}, mastered), '已掌握')));
  const byType = {};
  wrong.forEach(id => { const t = QB[id].type; (byType[t] = byType[t] || []).push(id); });
  if (!wrong.length) root.append(h('div', { class: 'notice info mt' }, '目前沒有待補強的錯題。去做「分類練習」或「歷屆試題」,答錯的題目會自動收進來。'));
  else {
    const start = ids => { if (loadSession() && !confirm('已有一份作答還沒完成,開始新的會取代它。繼續嗎?')) return; startSession('review', '錯題補強', C.pickByGroups(ids.map(i => QB[i]), 0), { mode: 'instant' }); };
    root.append(h('div', { class: 'row mt' }, h('button', { class: 'btn', onclick: () => start(wrong) }, '全部開始(' + wrong.length + ' 題)')));
    root.append(h('h2', { class: 'mt2' }, '依題型'), h('div', { class: 'mt' }, Object.keys(byType).map(t => h('div', { class: 'card mt' }, h('div', { class: 'row', style: 'justify-content:space-between' }, h('b', {}, TN[t] || '詞彙'), h('span', {}, byType[t].length + ' 題')),
      h('div', { class: 'row mt' }, h('button', { class: 'btn line sm', onclick: () => start(byType[t]) }, '只練這個題型'))))));
  }
  // 改善追蹤：近 14 天每天的作答數與正確率
  const days = {};
  DB.hist.forEach(x => { const d = new Date(x.ts).toLocaleDateString('zh-TW'); const o = days[d] = days[d] || { r: 0, t: 0 }; o.r += x.right; o.t += x.total; });
  const ds = Object.keys(days).slice(-14);
  if (ds.length) root.append(h('h2', { class: 'mt2' }, '最近的練習'), h('div', { class: 'mt' }, ds.map(d => h('div', { class: 'mt' }, h('div', { class: 'row', style: 'justify-content:space-between' }, h('span', {}, d), h('span', { class: 'fine' }, days[d].r + ' / ' + days[d].t + ' 題')),
    h('div', { class: 'meter' }, h('i', { style: 'width:' + Math.round(days[d].r / days[d].t * 100) + '%' }))))));
  root.append(h('div', { class: 'mt2' }, h('button', { class: 'link', onclick: () => { if (confirm('清除所有成績與錯題紀錄?此動作無法復原。')) { DB.q = {}; DB.hist = []; saveDB(); render(); } } }, '清除所有學習紀錄')));
  return root;
}

// ---------- 作答 ----------
function startSession(kind, label, qs, o) {
  const S = { v: 2, id: 's' + Date.now(), kind, label, ids: qs.map(q => q.id), idx: 0, answers: {}, flags: {}, mode: o.mode, year: o.year || null,
    limitMs: o.limitMs || 0, remainMs: o.limitMs || 0, lastTick: Date.now(), paused: false, started: Date.now() };
  saveSession(S); go('#/run');
}
function viewRun() {
  const S = loadSession();
  if (!S) return h('div', {}, h('p', { class: 'notice' }, '沒有進行中的作答。'), h('p', { class: 'mt' }, h('a', { class: 'btn', href: '#/' }, '回首頁')));
  const exam = S.mode === 'exam', qs = S.ids.map(i => QB[i]);
  const root = h('div'), body = h('div'), barHost = h('div');
  const timer = h('span', { class: 'timer', 'aria-live': 'off' });
  const pause = h('button', { class: 'chip', onclick: () => { S.paused = !S.paused; S.lastTick = Date.now(); saveSession(S); paint(); } });
  function paintTimer() {
    if (!S.limitMs) { timer.hidden = true; return; }
    timer.textContent = (S.paused ? '⏸ ' : '⏱ ') + C.fmtTime(S.remainMs); timer.className = 'timer' + (S.remainMs < 5 * 60000 ? ' low' : '');
    pause.textContent = S.paused ? '繼續' : '暫停'; pause.hidden = false;
  }
  root.append(h('div', { class: 'topbar' }, h('a', { class: 'link', href: '#/', 'aria-label': '暫存並離開', onclick: () => { C.tick(S, Date.now()); saveSession(S); } }, '← 離開'),
    h('span', { class: 'row', style: 'flex-wrap:nowrap;gap:6px' }, timer, S.limitMs ? pause : null, h('button', { class: 'chip fsbtn', 'aria-label': '縮小字級', onclick: () => fs(-1) }, 'A−'), h('button', { class: 'chip fsbtn', 'aria-label': '放大字級', onclick: () => fs(1) }, 'A+'))), body, barHost);
  const q = () => qs[S.idx];
  function pick(i) {
    const cur = q();
    if (exam) { if (S.answers[cur.id] === i) delete S.answers[cur.id]; else S.answers[cur.id] = i; }
    else { if (S.answers[cur.id] != null) return; S.answers[cur.id] = i; C.recordAnswer(DB.q, cur.id, i === cur.a, Date.now()); saveDB(); }
    saveSession(S); paint();
  }
  function paint() {
    const cur = q(), chosen = S.answers[cur.id], reveal = !exam && chosen != null;
    body.innerHTML = '';
    body.append(h('div', { class: 'fine' }, '第 ' + (S.idx + 1) + ' / ' + qs.length + ' 題' + (S.flags[cur.id] ? '・🚩 已標記' : '')),
      questionNode(cur, { chosen, reveal, onPick: S.paused ? null : pick }));
    if (S.paused) body.prepend(h('div', { class: 'notice mt' }, '已暫停,計時停止。按「繼續」才能作答。'));
    paintTimer();
    barHost.innerHTML = '';
    const last = S.idx === qs.length - 1;
    barHost.append(h('div', { class: 'bar' + ' wide' }, h('div', { class: 'in' },
      h('button', { class: 'btn line sm', disabled: S.idx === 0, onclick: () => { S.idx--; saveSession(S); paint(); window.scrollTo(0, 0); } }, '上一題'),
      exam ? h('span', { class: 'row', style: 'flex-wrap:nowrap;gap:6px' }, h('button', { class: 'chip', 'aria-pressed': S.flags[cur.id] ? 'true' : 'false', 'aria-label': S.flags[cur.id] ? '取消標記這題' : '標記這題待檢查', onclick: () => { S.flags[cur.id] = !S.flags[cur.id]; if (!S.flags[cur.id]) delete S.flags[cur.id]; saveSession(S); paint(); } }, '🚩'),
        h('button', { class: 'chip', 'aria-label': '題號總覽', onclick: sheet }, '題號 ' + Object.keys(S.answers).length + '/' + qs.length)) : null,
      last ? h('button', { class: 'btn sm', disabled: !exam && chosen == null, onclick: () => exam ? sheet(true) : finish() }, exam ? '交卷' : '看成績')
           : h('button', { class: 'btn sm', onclick: () => { S.idx++; saveSession(S); paint(); window.scrollTo(0, 0); } }, '下一題'))));
    reserveBar();
  }
  function sheet(submitFocus) {
    const un = qs.filter(x => S.answers[x.id] == null).length;
    const m = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': '題號總覽', onclick: e => { if (e.target === m) m.remove(); } });
    const nav = h('div', { class: 'nav' }, qs.map((x, i) => h('button', { class: (S.answers[x.id] != null ? 'done ' : '') + (S.flags[x.id] ? 'flag ' : '') + (i === S.idx ? 'cur' : ''), 'aria-label': '第 ' + (i + 1) + ' 題' + (S.answers[x.id] != null ? '已作答' : '未作答') + (S.flags[x.id] ? '已標記' : ''),
      onclick: () => { S.idx = i; saveSession(S); m.remove(); paint(); window.scrollTo(0, 0); } }, x.n || i + 1)));
    m.append(h('div', { class: 'sheet' }, h('h2', {}, '題號總覽'), h('p', { class: 'fine' }, '藍色=已作答,黃框=已標記。尚有 ' + un + ' 題未作答。'), h('div', { class: 'mt' }, nav),
      h('div', { class: 'row mt2' }, h('button', { class: 'btn', onclick: () => { m.remove(); finish(); } }, un ? '仍要交卷(' + un + ' 題空白)' : '交卷'), h('button', { class: 'btn line', onclick: () => m.remove() }, '繼續作答'))));
    document.body.append(m);
  }
  let finished = false;
  function finish() {
    if (finished) return; finished = true;
    C.tick(S, Date.now());
    const sc = C.scorePaper(qs, S.answers);
    if (exam) qs.forEach(x => { if (S.answers[x.id] != null) C.recordAnswer(DB.q, x.id, S.answers[x.id] === x.a, Date.now()); else C.recordAnswer(DB.q, x.id, false, Date.now()); });
    const right = qs.filter(x => S.answers[x.id] === x.a).length;
    const entry = { id: 'h' + Date.now(), ts: Date.now(), kind: S.kind, mode: S.mode, label: S.label, year: S.year, ids: S.ids, answers: S.answers, flags: S.flags,
      right, total: qs.length, got: sc.got, max: sc.max, by: sc.by, usedMs: S.limitMs ? S.limitMs - S.remainMs : Date.now() - S.started, limitMs: S.limitMs };
    DB.hist.push(entry); if (DB.hist.length > 200) DB.hist.shift(); saveDB(); saveSession(null);
    go('#/result/' + entry.id);
  }
  // 計時
  if (S.limitMs) {
    S.lastTick = Date.now();
    const iv = setInterval(() => {
      if (finished) return;
      const before = S.remainMs; C.tick(S, Date.now()); paintTimer();
      if (before > 0 && S.remainMs <= 0) { clearInterval(iv); alert('時間到,系統會自動交卷。'); finish(); return; }
      saveSession(S);
    }, 1000);
    const vis = () => { if (finished) return; C.tick(S, Date.now()); S.lastTick = Date.now(); saveSession(S); };
    document.addEventListener('visibilitychange', vis);
    cleanup = () => { clearInterval(iv); document.removeEventListener('visibilitychange', vis); if (!finished) { C.tick(S, Date.now()); saveSession(S); } };
  }
  paint();
  return root;
}

// ---------- 成績與檢討 ----------
function viewResult(p) {
  const x = DB.hist.find(e => e.id === p[0]);
  if (!x) return h('div', {}, h('p', { class: 'notice' }, '找不到這份成績。'), h('a', { class: 'btn mt', href: '#/' }, '回首頁'));
  const root = h('div', {}, h('h1', { class: 'brand' }, x.label + ' 成績'));
  const inf = x.year ? yearInfo[x.year] : null;
  if (x.mode === 'exam') {
    root.append(h('div', { class: 'stat mt' }, h('div', {}, h('b', {}, x.got + ' / ' + x.max), '選擇題得分'), h('div', {}, h('b', {}, x.right + ' / ' + x.total), '答對題數'), h('div', {}, h('b', {}, C.fmtTime(x.usedMs)), '用時')));
    root.append(h('table', { class: 'mt2' }, h('tr', {}, h('th', {}, '題型'), h('th', {}, '答對'), h('th', {}, '得分')), Object.keys(x.by).map(t => h('tr', {}, h('td', {}, TN[t] || t), h('td', {}, x.by[t].right + ' / ' + x.by[t].n), h('td', {}, x.by[t].got + ' / ' + x.by[t].max)))));
    if (inf && inf.cfg) root.append(h('p', { class: 'fine mt' }, '這是選擇題部分(滿分 ' + inf.cfg.mc + ' 分)。' + (inf.cfg.mixed ? '混合題 ' + inf.cfg.mixed + ' 分與' : '') + '非選擇題 ' + (inf.cfg.translation + inf.cfg.essay) + ' 分未計入,也不換算級分。'));
  } else root.append(h('div', { class: 'stat mt' }, h('div', {}, h('b', {}, x.right + ' / ' + x.total), '答對題數'), h('div', {}, h('b', {}, Math.round(x.right / x.total * 100) + '%'), '正確率')));
  const nav = h('div', { class: 'nav mt' }, x.ids.map((id, i) => { const q = QB[id], a = x.answers[id]; return h('a', { class: a == null ? '' : a === q.a ? 'ok' : 'bad', href: '#/rev/' + x.id + '/' + i, role: 'button', style: 'display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:10px;border:1.5px solid var(--line);text-decoration:none;color:inherit;font-weight:700', 'aria-label': '第 ' + (q.n || i + 1) + ' 題' + (a == null ? '未作答' : a === q.a ? '答對' : '答錯') }, q.n || i + 1); }));
  root.append(h('h2', { class: 'mt2' }, '逐題檢討'), h('p', { class: 'fine' }, '綠=答對,紅=答錯,無色=未作答。點題號看答案與詳解。答錯與未作答的題目已自動加入錯題本。'), nav);
  const firstWrong = x.ids.findIndex(id => x.answers[id] !== QB[id].a);
  root.append(h('div', { class: 'row mt2' }, firstWrong >= 0 ? h('a', { class: 'btn', href: '#/rev/' + x.id + '/' + firstWrong }, '從第一個錯題開始看') : null,
    h('a', { class: 'btn line', href: '#/review' }, '錯題補強'), h('a', { class: 'btn line', href: '#/' }, '回首頁')));
  return root;
}
function viewRev(p) {
  const x = DB.hist.find(e => e.id === p[0]), i = +p[1];
  if (!x || !x.ids[i]) return h('p', { class: 'notice' }, '找不到這一題。');
  const q = QB[x.ids[i]], a = x.answers[q.id];
  const root = h('div', {}, h('div', { class: 'topbar' }, back('#/result/' + x.id, '← 成績'), h('span', { class: 'fine' }, (i + 1) + ' / ' + x.ids.length + (a == null ? '・未作答' : a === q.a ? '・答對' : '・答錯'))), questionNode(q, { chosen: a, reveal: true }));
  root.append(h('div', { class: 'bar wide' }, h('div', { class: 'in' }, i > 0 ? h('a', { class: 'btn line sm', href: '#/rev/' + x.id + '/' + (i - 1) }, '上一題') : h('span'),
    i < x.ids.length - 1 ? h('a', { class: 'btn sm', href: '#/rev/' + x.id + '/' + (i + 1) }, '下一題') : h('a', { class: 'btn sm', href: '#/result/' + x.id }, '回成績'))));
  return root;
}

// ---------- 非選擇題（先放題目頁與官方評分原則;寫作介面見 writing.js） ----------
function viewNs(p) {
  if (window.GSATWriting) return window.GSATWriting.view(p, { h, back, DB, saveDB, NS, examsOn, EXAMS, CFG });
  return h('div', {}, back('#/'), h('p', { class: 'notice mt' }, '寫作介面載入失敗。'));
}

render();
window.__gsat = { QB, yearInfo, DB: () => DB, loadSession, EXPL: () => EXPL };
})();
