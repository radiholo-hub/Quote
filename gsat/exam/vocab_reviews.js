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
  "tight-adj|115|115:vocab:1|1|answer|選項 (B)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-08"},
  // 2026-11-11 教師(負責人)人工審核 amateur 一筆。115 年第 2 題(試卷第 1 頁;官方答案表第 2 題為 C):選項 (C) amateur,在 an amateur art designer 中作形容詞,修飾 art designer,字義「業餘的」;正確答案 1 次。
  "amateur-adj|115|115:vocab:1|2|answer|選項 (C)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-11"},
  // 2026-11-13 教師(負責人)人工審核 dread 一筆。115 年第 6 題(官方答案表第 6 題為 A):選項 (A) dreads,在 Timmy dreads the thought of speaking… 中作動詞(原形 dread),字義「害怕、畏懼」;正確答案 1 次。
  "dread-v|115|115:vocab:1|6|answer|選項 (A)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-13"},
  // 2026-11-13 教師(負責人)人工審核 impact 一筆。115 年第 7 題(官方答案表第 7 題為 C):選項 (B) impact,在 music is his life’s impact 中作名詞(空格位於所有格 his life’s 之後),字義「影響、衝擊」;干擾選項 1 次。impact 其餘 9 筆待審核紀錄不在本次裁定範圍。
  "impact-n|115|115:vocab:1|7|distractor|選項 (B)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-13"},
  // 2026-11-14 教師(負責人)人工審核 115 年第 9 題(官方答案表第 9 題為 C)四個選項。四個選項在 had to ______ my way through the crowd 中都明確是動詞原形,詞性為動詞:
  // (C) elbow(正確答案)、(A) crash(干擾選項)、(B) tumble(干擾選項)、(D) struggle(干擾選項)。「干擾選項」只是它們在官方試題中的角色,不代表教師判定 struggle 是錯誤英文。各詞條其他年度的待審核紀錄不在本次裁定範圍。
  "elbow-v|115|115:vocab:1|9|answer|選項 (C)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-14"},
  "crash-v|115|115:vocab:1|9|distractor|選項 (A)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-14"},
  "tumble-v|115|115:vocab:1|9|distractor|選項 (B)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-14"},
  "struggle-v|115|115:vocab:1|9|distractor|選項 (D)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-14"},
  // 2026-11-14 教師(負責人)人工審核 115 年第 10 題(官方答案表第 10 題為 D)兩筆。(D) grave 與 (A) swift 在 raised ______ concerns 中都明確是形容詞,詞性無歧義:grave(正確答案)、swift(干擾選項)。gravity 的待審核紀錄不在本次裁定範圍。
  "grave-adj|115|115:vocab:1|10|answer|選項 (D)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-14"},
  "swift-adj|115|115:vocab:1|10|distractor|選項 (A)": {"verdict": "confirmed", "by": "教師（負責人）", "at": "2026-11-14"}
};
