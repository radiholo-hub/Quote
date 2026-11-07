window.GSAT_CONFIG = {
  brand: 'Score Rescue｜學測英文',
  // 大考中心「學測試題與答案」下載頁（使用者提供，本環境無法連線驗證）。歷屆試題不隨網站公開時，改導向這裡。
  officialUrl: 'https://www.ceec.edu.tw/xmfile?xsmsid=0J052424829869345634',
};

// 免費／付費權限（目前模式尚未決定，所以預設全部開放；這裡只保留設定彈性，不含價格、訂閱或金流）。
//   mode: 'open'＝全部開放；'tiered'＝依 tiers 區分免費與完整方案內容。
//   tiers.byYear: { '112': 'premium' } 或 tiers.byQuestion: { 'e112_5': 'premium' }；沒列出的題目視為 free。
//   entitlements.premium: 目前使用者是否擁有完整方案內容（之後由登入／付款系統提供）。
window.GSAT_ACCESS = window.GSAT_ACCESS || { mode: 'open', tiers: { byYear: {}, byQuestion: {} }, entitlements: { premium: false } };
