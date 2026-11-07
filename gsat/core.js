// 學測英文練習：不碰 DOM 的純函式（計分、抽題、熟練度、進度存檔格式）。瀏覽器與測試共用。
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GSATCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const LET = 'ABCDEFGHIJ';

  // 官方多選題計分。selected / correct 是選項字母陣列，n 是選項總數，points 是該題滿分。
  function scoreMulti(selected, correct, n, points) {
    const sel = new Set(selected), cor = new Set(correct);
    if (!sel.size) return 0;
    let k = 0;
    for (let i = 0; i < n; i++) { const L = LET[i]; if (sel.has(L) !== cor.has(L)) k++; }
    const frac = (n - 2 * k) / n;
    return frac <= 0 ? 0 : +(points * frac).toFixed(4);
  }

  // 一份試卷的選擇題得分。questions: [{id,type,w}]，answers: {id: 選項索引}，key(q) → 正確索引。
  function scorePaper(questions, answers) {
    let got = 0, max = 0, right = 0, answered = 0;
    const by = {};
    for (const q of questions) {
      const b = (by[q.type] = by[q.type] || { got: 0, max: 0, right: 0, n: 0 });
      b.max += q.w; b.n++; max += q.w;
      const a = answers[q.id];
      if (a != null) answered++;
      if (a != null && a === q.a) { b.got += q.w; b.right++; got += q.w; right++; }
    }
    return { got, max, right, answered, total: questions.length, by };
  }

  // 依「題組」抽題：閱讀、綜合測驗、文意選填、篇章結構不拆開文章，一次抽整組，直到題數達標。
  function pickByGroups(pool, count, rng) {
    rng = rng || Math.random;
    const units = []; const seen = {};
    for (const q of pool) {
      if (q.group) { if (!seen[q.group]) { seen[q.group] = []; units.push(seen[q.group]); } seen[q.group].push(q); }
      else units.push([q]);
    }
    for (let i = units.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [units[i], units[j]] = [units[j], units[i]]; }
    const out = [];
    for (const u of units) { if (count && out.length >= count) break; out.push(...u); }
    return out;
  }

  // 熟練度：答錯進入錯題本；之後連續答對 2 次才算掌握（移出）。
  const MASTER_STREAK = 2;
  function recordAnswer(stats, id, good, now) {
    const s = stats[id] || (stats[id] = { a: 0, c: 0, s: 0, lw: 0 });
    s.a++; if (good) { s.c++; s.s++; } else { s.s = 0; s.lw = now; }
    return s;
  }
  const isPendingWrong = s => !!s && s.lw > 0 && s.s < MASTER_STREAK;
  const isMastered = s => !!s && s.lw > 0 && s.s >= MASTER_STREAK;

  // 倒數計時：用「剩餘毫秒」存檔，頁面關掉再回來不會憑空多出或少掉時間；暫停時不扣。
  function tick(session, now) {
    if (!session.limitMs || session.paused) { session.lastTick = now; return session.remainMs; }
    const dt = Math.max(0, now - (session.lastTick || now));
    session.remainMs = Math.max(0, session.remainMs - dt);
    session.lastTick = now;
    return session.remainMs;
  }

  // 正式模擬考的倒數以「截止時間」計算：不能暫停，離開頁面或重新整理時間照常流逝。
  const remainingFromDeadline = (deadline, now) => Math.max(0, deadline - now);

  // 全卷成績總覽：自動評分的、待自評的、已評分合計。尚未評分的項目不計為 0 分，也不放進「已評分滿分」。
  // cfg 是 SCORING.years[年度]；mc 是選擇題結果 {got,max} 或 null（還沒作答）；ns 是這一年的非選擇題存檔。
  function paperSummary(cfg, mc, ns) {
    ns = ns || {};
    const mixed = ns.mixed || {}, trans = ns.trans || {}, essay = ns.essay || {};
    const items = [{ id: 'mc', name: '選擇題', how: 'auto', max: cfg.mc, got: mc ? mc.got : null, pendingText: '尚未作答' }];
    if (cfg.multiSelect) {
      items.push({ id: 'multi', name: '混合題・多選題', how: 'auto', max: 4, got: mixed.done ? mixed.multiScore : null, pendingText: '尚未作答' });
      items.push({ id: 'fill', name: '混合題・填空與簡答', how: 'self', max: cfg.mixed - 4, got: mixed.other != null ? mixed.other : null, pendingText: '待自評' });
    }
    [0, 1].forEach(i => items.push({ id: 't' + i, name: '中譯英第 ' + (i + 1) + ' 題', how: 'self', max: cfg.translation / 2,
      got: trans['e' + i] != null ? Math.max(0, cfg.translation / 2 - 0.5 * trans['e' + i]) : null, pendingText: '待自評' }));
    items.push({ id: 'essay', name: '英文作文', how: 'self', max: cfg.essay, got: essay.self != null ? essay.self : null, pendingText: '待自評' });
    const done = items.filter(i => i.got != null), todo = items.filter(i => i.got == null);
    const sum = (a, f) => a.reduce((s, i) => s + f(i), 0);
    return { items, scoredGot: sum(done, i => i.got), scoredMax: sum(done, i => i.max), pendingMax: sum(todo, i => i.max),
      total: cfg.mc + cfg.mixed + cfg.translation + cfg.essay, complete: todo.length === 0 };
  }

  function fmtTime(ms) {
    const s = Math.ceil(ms / 1000), m = Math.floor(s / 60);
    return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  return { LET, scoreMulti, scorePaper, pickByGroups, recordAnswer, isPendingWrong, isMastered, MASTER_STREAK, tick, remainingFromDeadline, paperSummary, fmtTime };
});
