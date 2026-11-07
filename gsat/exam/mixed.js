// 111–115 學年度「混合題」中可由官方答案自動計分的多選題（各年第 49 題，4 分）。
// key 取自大考中心公布的選擇題答案表（第 49 題）；n 是該題的選項總數（題目文字中的 (A) 到 (X)；115 年是六間商店 A–F）。
// 計分公式見 data/scoring.js 的 MULTI_RULE。填空與簡答題需人工批改，不在這裡。
window.MIXED = {
  '111': { q: 49, n: 6, key: 'CD', points: 4 },
  '112': { q: 49, n: 8, key: 'DF', points: 4 },
  '113': { q: 49, n: 6, key: 'CF', points: 4 },
  '114': { q: 49, n: 10, key: 'CDGI', points: 4 },
  '115': { q: 49, n: 6, key: 'ADE', points: 4 },
};
