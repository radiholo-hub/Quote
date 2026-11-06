// 各年度學測英文計分規則。依各年度試卷「占 N 分」「每題 N 分」逐項核對（106–115），不同制度不可混用。
// 106–110：只有單選題；選擇題 72 分 + 非選擇題 28 分。
// 111–115：選擇題 62 分（含篇章結構）+ 混合題 10 分（含一題多選題）+ 非選擇題 28 分。
window.SCORING = (function () {
  const OLD = {
    sections: { vocab: [15, 1], cloze: [15, 1], bank: [10, 1], reading: [16, 2] },   // [題數, 每題分數]
    mc: 72, mixed: 0, translation: 8, essay: 20, multiSelect: false,
  };
  const NEW = {
    sections: { vocab: [10, 1], cloze: [10, 1], bank: [10, 1], structure: [4, 2], reading: [12, 2] },
    mc: 62, mixed: 10, translation: 8, essay: 20, multiSelect: true,
  };
  const years = {};
  ['106', '107', '108', '109', '110'].forEach(y => (years[y] = OLD));
  ['111', '112', '113', '114', '115'].forEach(y => (years[y] = NEW));
  return {
    years,
    TIME_LIMIT_MIN: 100,   // 試卷封面：考試時間 100 分鐘（含非選擇題）
    TYPE_NAMES: { vocab: '詞彙', cloze: '綜合測驗', bank: '文意選填', structure: '篇章結構', reading: '閱讀測驗' },
    // 多選題（混合題第 49 題等）：選項獨立判定；答錯 k 個選項得 (n−2k)/n，低於 0 以 0 計；全未作答 0 分。
    MULTI_RULE: '各題之選項獨立判定，所有選項均答對者，得該題全部的分數；答錯 k 個選項者，得該題 (n−2k)/n 的分數；但得分低於零分或所有選項均未作答者，該題以零分計算。',
  };
})();
