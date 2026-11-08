// 單字出現紀錄的人工審核結果。鍵是待審核比對的編號(見 vocab_index.js 的 review[].k),值:
//   { verdict: 'confirmed'(詞性與字義正確,計入次數) | 'rejected'(不是這個詞條,排除), by: '審核者姓名', at: '日期', note: '備註' }
// 只有 by 有填寫的才會生效;AI 不會自行填寫。修改後執行 python3 tools/build_vocab_index.py 重新計算。
window.VOCAB_REVIEWS = {
  // 2026-11-08 教師(負責人)人工審核 tight 三筆。判斷依據的完整紀錄(原始出處、試卷頁碼、詞性、字義、理由)另存於審核依據紀錄 tight-records-review-basis.md。
  // 109 年第 13 題題幹(試卷第 1 頁):skin-tight 是連字號複合形容詞(緊身的),整體修飾 jeans;不計入獨立 tight-adj。
  "tight-adj|109|109:vocab:1|13|stem|題幹": {"verdict": "rejected", "by": "教師（負責人）", "at": "2026-11-08"},
  // 115 年閱讀第 39–42 題共用文章第三段(試卷第 7 頁):tight against 採形容詞受詞補語分析(have + 受詞 + 補語),字義「緊貼、緊靠」;文章用字 1 次(共用文章只算 1 個單位)。tight 另有副詞用法,此為人工裁定。
  "tight-adj|115|115:reading:39-42||passage|文章第 3 段": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-08"},
  // 115 年第 1 題(試卷第 1 頁;官方答案表第 1 題為 B):tight schedule,形容詞,字義「行程緊湊」;正確答案 1 次。
  "tight-adj|115|115:vocab:1|1|answer|選項 (B)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-08"}
};
