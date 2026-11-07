// 單字出現紀錄的人工審核結果。鍵是待審核比對的編號(見 vocab_index.js 的 review[].k),值:
//   { verdict: 'confirmed'(詞性與字義正確,計入次數) | 'rejected'(不是這個詞條,排除), by: '審核者姓名', at: '日期', note: '備註' }
// 只有 by 有填寫的才會生效;AI 不會自行填寫。修改後執行 python3 tools/build_vocab_index.py 重新計算。
window.VOCAB_REVIEWS = {};
