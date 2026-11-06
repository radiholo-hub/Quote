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

  function fmtTime(ms) {
    const s = Math.ceil(ms / 1000), m = Math.floor(s / 60);
    return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  return { LET, scoreMulti, scorePaper, pickByGroups, recordAnswer, isPendingWrong, isMastered, MASTER_STREAK, tick, fmtTime };
});
