// 非選擇題：混合題（多選題自動計分）、中譯英、英文作文。
// 輸入內容會自動儲存在這台裝置；分數都是「自評」，不是大考中心官方評分。AI 批改尚未提供，只預留位置並標示清楚。
window.GSATWriting = (function () {
  const C = window.GSATCore, SC = window.SCORING, W = window.WRITING;
  let env, h;

  // ---------- 儲存 ----------
  const get = k => env.DB.ns[k] || (env.DB.ns[k] = {});
  let saveTimer = null;
  function save() { clearTimeout(saveTimer); saveTimer = setTimeout(flush, 400); window.dispatchEvent(new Event('gsat-ns-change')); }
  function flush() { clearTimeout(saveTimer); env.saveDB(); }
  window.addEventListener('visibilitychange', flush);
  window.addEventListener('pagehide', flush);

  const wordCount = t => (t.trim().match(/\S+/g) || []).length;
  const paraCount = t => t.split(/\n+/).filter(s => s.trim()).length;
  const stamp = () => '已自動儲存 ' + new Date().toLocaleTimeString('zh-TW', { hour12: false });

  // 可自動儲存的文字框；回傳 {node, area}。onChange(text) 在每次輸入時呼叫。
  function editor(key, field, label, rows, onChange) {
    const st = get(key), id = 'ta-' + key.replace(/\W/g, '') + field;
    const status = h('span', { class: 'fine', 'aria-live': 'polite' }, st[field] ? '已載入先前的內容' : '');
    const area = h('textarea', { id, rows: rows || 6, 'aria-label': label, spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off' });
    area.value = st[field] || '';
    area.addEventListener('input', () => { get(key)[field] = area.value; get(key).ts = Date.now(); status.textContent = stamp(); save(); onChange && onChange(area.value); });
    return { area, status, node: h('div', { class: 'mt' }, h('label', { for: id }, label), area, status) };
  }

  // ---------- 中譯英 ----------
  function translationCard(key, zhNodes, refNode, refPrompt) {
    const card = h('div', { class: 'card mt2' }, h('h2', {}, '中譯英(8 分)'), h('p', { class: 'fine' }, '把中文句子譯成正確、通順、達意的英文,每題 4 分。'));
    const scoreOut = [];
    [0, 1].forEach(i => {
      const fid = 'e' + i, st = get(key);
      card.append(h('div', { class: 'mt' }, zhNodes[i]));
      const ed = editor(key, 't' + i, '第 ' + (i + 1) + ' 題的英文翻譯', 3);
      card.append(ed.node);
      const out = h('p', { class: 'fine', 'aria-live': 'polite' });
      const inp = h('input', { type: 'number', min: '0', max: '8', step: '1', inputmode: 'numeric', 'aria-label': '第 ' + (i + 1) + ' 題對照後發現的錯誤數', style: 'width:5em;min-height:44px;font:inherit;padding:4px 8px' });
      if (st[fid] != null) inp.value = st[fid];
      const calc = fromUser => { const e = inp.value === '' ? null : Math.max(0, +inp.value); if (fromUser) { get(key)[fid] = e; save(); } out.textContent = e == null ? '' : '自評:4 − 0.5 × ' + e + ' = ' + Math.max(0, 4 - 0.5 * e) + ' 分(估算,細則依各年度評分原則)'; };
      inp.addEventListener('input', () => calc(true));
      card.append(h('div', { class: 'row mt' }, h('span', {}, '對照參考答案後,這題的錯誤數:'), inp), out);
      calc(false); scoreOut.push(out);
    });
    if (refNode) card.append(refNode);
    return card;
  }

  // ---------- 英文作文 ----------
  function essayCard(key, opts) {
    const card = h('div', { class: 'card mt2' }, h('h2', {}, '英文作文(20 分)'));
    if (opts.promptNode) card.append(opts.promptNode);
    const min = opts.min || 120;
    const meter = h('p', { class: 'fine', 'aria-live': 'polite' });
    const upd = t => { const w = wordCount(t), p = paraCount(t); meter.textContent = '字數 ' + w + ' / 至少 ' + min + (w >= min ? ' ✔' : '') + '・段落 ' + p + (opts.paras ? ' / 題目要求 ' + opts.paras + ' 段' + (p === opts.paras ? ' ✔' : '') : ''); };
    const ed = editor(key, 'essay', '你的作文', 12, upd);
    card.append(ed.node, meter); upd(ed.area.value);
    // 對照學習指引
    const st = get(key); st.chk = st.chk || {};
    card.append(h('h3', { class: 'mt2' }, '寫完後逐項檢查'), h('ul', { class: 'mt' }, W.checklist.map(([k, v], i) => {
      const cb = h('input', { type: 'checkbox', id: key.replace(/\W/g, '') + 'c' + i, style: 'width:22px;height:22px;margin-right:8px' });
      cb.checked = !!st.chk[i]; cb.addEventListener('change', () => { get(key).chk[i] = cb.checked; save(); });
      return h('li', { style: 'min-height:44px;display:flex;align-items:flex-start;padding:6px 0' }, cb, h('label', { for: cb.id }, h('b', {}, k + ':'), v));
    })));
    // 自評與 AI 預留位置
    const self = h('input', { type: 'number', min: '0', max: '20', step: '1', inputmode: 'numeric', 'aria-label': '作文自評分數', style: 'width:5em;min-height:44px;font:inherit;padding:4px 8px' });
    if (st.self != null) self.value = st.self;
    self.addEventListener('input', () => { get(key).self = self.value === '' ? null : Math.min(20, Math.max(0, +self.value)); save(); });
    card.append(h('div', { class: 'row mt' }, h('span', {}, '自評分數(0–20,自己對照評分原則打的,不是官方評分):'), self));
    card.append(h('div', { class: 'notice info mt', role: 'note' }, h('b', {}, 'AI 作文批改:尚未提供。'), '如果之後加入,結果會標示為「AI 建議分數」,只是練習參考,不代表大考中心官方評分,也不能取代老師批改。'));
    if (opts.extra) card.append(opts.extra);
    return card;
  }

  // ---------- 混合題（111–115）：多選題依官方答案與公式自動計分 ----------
  function mixedCard(y) {
    const m = (window.MIXED || {})[y], key = y + ':mixed', st = get(key);
    const card = h('div', { class: 'card mt2' }, h('h2', {}, '混合題(10 分)'),
      h('p', { class: 'fine' }, '多選題 4 分可以在這裡自動計分;填空與簡答需要自己對照官方參考答案。'));
    if (!m) { card.append(h('p', { class: 'notice' }, '這一年的多選題答案資料尚未收錄。')); return card; }
    const letters = 'ABCDEFGHIJ'.slice(0, m.n).split('');
    st.sel = st.sel || [];
    const out = h('div', { 'aria-live': 'polite', class: 'mt' });
    const chips = letters.map(L => { const b = h('button', { class: 'chip', 'aria-pressed': String(st.sel.includes(L)), 'aria-label': '選項 ' + L, onclick: () => {
      const s = get(key); s.sel = s.sel.includes(L) ? s.sel.filter(x => x !== L) : s.sel.concat(L).sort(); b.setAttribute('aria-pressed', String(s.sel.includes(L))); s.done = false; out.innerHTML = ''; save(); } }, L); return b; });
    card.append(h('h3', { class: 'mt' }, '第 ' + m.q + ' 題(多選題,' + m.points + ' 分)'), h('p', { class: 'fine' }, '依試卷題目勾選所有符合的選項(共 ' + m.n + ' 個選項,A–' + letters[letters.length - 1] + ')。'),
      h('div', { class: 'row mt' }, chips));
    const show = () => {
      const sel = get(key).sel, cor = m.key.split(''), s = C.scoreMulti(sel, cor, m.n, m.points);
      const k = letters.filter(L => sel.includes(L) !== cor.includes(L)).length;
      out.innerHTML = '';
      out.append(h('div', { class: 'explain' }, h('b', {}, '正確答案:' + cor.join('、')), h('p', {}, '你選:' + (sel.length ? sel.join('、') : '(未作答)') + '。'),
        h('p', {}, sel.length ? '答錯 ' + k + ' 個選項(選了不該選的或漏選都算):得分 = ' + m.points + ' × (' + m.n + ' − 2×' + k + ') / ' + m.n + ' = ' + (+s.toFixed(2)) + ' 分' + (m.n - 2 * k <= 0 ? '(低於 0 以 0 分計)' : '') : '全未作答:0 分。'),
        h('p', { class: 'fine' }, '官方規則:' + SC.MULTI_RULE)));
      get(key).multiScore = +s.toFixed(2); get(key).done = true; save();
    };
    card.append(h('div', { class: 'row mt' }, h('button', { class: 'btn sm', onclick: show }, '對答案')), out);
    if (st.done) show();
    const other = h('input', { type: 'number', min: '0', max: '6', step: '1', inputmode: 'numeric', 'aria-label': '填空與簡答自評分數', style: 'width:5em;min-height:44px;font:inherit;padding:4px 8px' });
    if (st.other != null) other.value = st.other;
    other.addEventListener('input', () => { get(key).other = other.value === '' ? null : Math.min(6, Math.max(0, +other.value)); save(); });
    card.append(h('div', { class: 'row mt2' }, h('span', {}, '填空與簡答自評(滿分 6 分;完全正確 2 分、字形或拼字錯誤 1 分、答錯或空白 0 分):'), other));
    return card;
  }

  // ---------- 頁面 ----------
  function imgs(list, alt) { return h('div', {}, list.map((s, i) => h('img', { class: 'nsimg', src: s, alt: alt + ' 第 ' + (i + 1) + ' 頁', loading: 'lazy' }))); }
  function toggle(label, node) {
    node.hidden = true;
    const b = h('button', { class: 'btn line sm', 'aria-expanded': 'false', onclick: () => { node.hidden = !node.hidden; b.setAttribute('aria-expanded', String(!node.hidden)); b.textContent = (node.hidden ? '看' : '收起') + label; } }, '看' + label);
    return h('div', { class: 'mt' }, b, h('div', { class: 'mt' }, node));
  }

  function yearPage(y) {
    const cfg = SC.years[y], d = (env.NS || {})[y];
    if (!cfg || !d) return h('div', {}, env.back('#/ns/'), h('p', { class: 'notice mt' }, '找不到這個年度的非選擇題。'));
    const root = h('div', { 'data-source': 'exam' }, env.back('#/ns/'), h('h1', { class: 'brand' }, y + ' 學年度非選擇題'),
      h('p', {}, h('span', { class: 'src exam' }, '歷屆正式試題'), ' 大學入學考試中心 ' + y + ' 學年度學測英文'));
    root.append(h('p', { class: 'sub' }, '先自己作答,再對照官方評分原則。自評分數不是大考中心官方評分。'),
      toggle('試卷頁面(題目)', imgs(d.q, y + ' 年試卷')), env.summaryNode(y));
    if (cfg.multiSelect) root.append(mixedCard(y));
    root.append(translationCard(y + ':trans', [h('b', {}, '第 1 題(中文句子見上方「試卷頁面」)'), h('b', {}, '第 2 題')], null),
      essayCard(y + ':essay', { min: 120 }));
    root.append(h('div', { class: 'card mt2' }, h('h2', {}, '官方參考答案與評分原則'), d.ref.length ? toggle('官方評分原則', imgs(d.ref, y + ' 年評分原則')) : h('p', { class: 'fine' }, '這一年的評分原則還沒有收錄。')));
    return root;
  }

  function origPage(id) {
    const t = W.trans.find(x => x.id === id), e = W.essay.find(x => x.id === id);
    if (t) {
      const ref = toggle('參考譯文與重點', h('div', { class: 'explain' }, h('p', { class: 'fine' }, '這只是一種可能的寫法,不是唯一答案。'),
        t.ref.map((r, i) => h('p', {}, (i + 1) + '. ' + r)), h('h4', {}, '這題的重點'), h('ul', {}, t.focus.map(f => h('li', {}, f)))));
      return h('div', { 'data-source': 'original' }, env.back('#/ns/'), h('h1', { class: 'brand' }, '中譯英:' + t.title), h('p', {}, h('span', { class: 'src orig' }, '原創練習題'), ' 自行撰寫,不是大考試題'), translationCard('orig:' + id, t.zh.map((z, i) => h('p', {}, h('b', {}, (i + 1) + '. '), z)), ref));
    }
    if (e) {
      const prompt = h('div', {}, h('p', {}, e.prompt));
      const plan = toggle('寫作提示', h('div', { class: 'explain' }, h('ul', {}, e.plan.map(p => h('li', {}, p)))));
      return h('div', { 'data-source': 'original' }, env.back('#/ns/'), h('h1', { class: 'brand' }, '英文作文:' + e.title), h('p', {}, h('span', { class: 'src orig' }, '原創練習題'), ' 自行撰寫,不是大考試題'), essayCard('orig:' + id, { promptNode: prompt, min: e.min, paras: e.paras, extra: plan }));
    }
    return h('p', { class: 'notice' }, '找不到這個練習。');
  }

  function landing() {
    const root = h('div', {}, env.back('#/'), h('h1', { class: 'brand' }, '非選擇題與寫作'),
      h('p', { class: 'sub' }, '中譯英與英文作文需要自己動手寫。寫的內容會自動儲存在這台裝置。'));
    root.append(h('h2', { class: 'mt2' }, '原創寫作練習(自行撰寫,不是大考試題)'), h('h3', { class: 'mt' }, '中譯英'),
      h('div', { class: 'row mt' }, W.trans.map(t => h('a', { class: 'btn line sm', href: '#/ns/orig/' + t.id }, t.title))),
      h('h3', { class: 'mt2' }, '英文作文'), h('div', { class: 'row mt' }, W.essay.map(e => h('a', { class: 'btn line sm', href: '#/ns/orig/' + e.id }, e.title))));
    root.append(h('h2', { class: 'mt2' }, '歷屆正式試題(大考中心)'));
    if (!env.EXAMS.length) root.append(h('p', { class: 'notice mt' }, '歷屆非選擇題的著作權授權還在確認,目前不隨網站公開。可到大考中心官網下載原卷自行練習。'), h('p', { class: 'mt' }, h('a', { class: 'btn line sm', href: env.CFG.officialUrl, target: '_blank', rel: 'noopener noreferrer' }, '前往大考中心官網')));
    else root.append(h('div', { class: 'row mt' }, env.EXAMS.slice().reverse().map(x => h('a', { class: 'btn line sm', href: '#/ns/' + x.year }, x.year + ' 學年度'))));
    return root;
  }

  function view(p, e) {
    env = e; h = e.h;
    if (!p[0]) return landing();
    if (p[0] === 'orig') return p[1] ? origPage(p[1]) : landing();
    return yearPage(p[0]);
  }
  return { view, flush };
})();
