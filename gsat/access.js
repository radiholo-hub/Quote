// 題目的免費／付費權限掛鉤。只判斷「能不能看這一題的內容」，不處理價格、訂閱或金流。
window.GSATAccess = (function () {
  const cfg = () => window.GSAT_ACCESS || { mode: 'open' };
  function tierOf(q) {
    const t = cfg().tiers || {};
    return (t.byQuestion && t.byQuestion[q.id]) || (q.year && t.byYear && t.byYear[q.year]) || 'free';
  }
  const hasPremium = () => cfg().mode !== 'tiered' || !!(cfg().entitlements && cfg().entitlements.premium);
  // 回傳 {ok, tier, reason}
  function canView(q) {
    const tier = tierOf(q);
    if (tier === 'free' || hasPremium()) return { ok: true, tier };
    return { ok: false, tier, reason: '這一題屬於完整方案的內容' };
  }
  return { canView, tierOf, hasPremium };
})();
