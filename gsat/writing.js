// 非選擇題：題目頁與官方評分原則（寫作介面之後擴充）
window.GSATWriting = (function () {
  function view(p, env) {
    const { h, back, NS, EXAMS } = env, y = p[0];
    const root = h('div', {}, back('#/'), h('h1', { class: 'brand' }, '非選擇題'));
    if (!EXAMS.length) return root.appendChild(h('p', { class: 'notice mt' }, '歷屆非選擇題的著作權授權還在確認,目前不隨網站公開。')) && root;
    if (!y) { root.append(h('div', { class: 'row mt' }, EXAMS.slice().reverse().map(e => h('a', { class: 'btn line sm', href: '#/ns/' + e.year }, e.year + ' 學年度')))); return root; }
    const d = NS[y] || { q: [], ref: [] };
    root.append(h('h2', {}, y + ' 學年度'), h('div', { class: 'mt' }, d.q.map((s, i) => h('img', { class: 'nsimg', src: s, alt: y + ' 年非選擇題第 ' + (i + 1) + ' 頁', loading: 'lazy' }))));
    const ref = h('div', { hidden: true }, d.ref.map((s, i) => h('img', { class: 'nsimg', src: s, alt: '官方評分原則第 ' + (i + 1) + ' 頁', loading: 'lazy' })));
    root.append(d.ref.length ? h('button', { class: 'btn', onclick: () => { ref.hidden = !ref.hidden; } }, '看官方參考答案與評分原則') : h('p', { class: 'fine' }, '這一年的評分原則還沒有收錄。'), ref);
    return root;
  }
  return { view };
})();
