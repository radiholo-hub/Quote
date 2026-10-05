// Score Rescue 解鎖碼驗證服務(Cloudflare Worker)。
// 解鎖碼放在 Worker 的加密變數 UNLOCK_CODES(逗號分隔),不會出現在網頁原始碼裡。
// POST /verify  body: {"code":"ABC123"}  ->  {"valid":true|false}

function cors(env, req) {
  const origin = req.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
  const ok = allowed.length === 0 || allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? (origin || "*") : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

// 固定時間比對,避免被計時攻擊逐字猜出解鎖碼
function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a), y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}

export default {
  async fetch(req, env) {
    const headers = { ...cors(env, req), "Content-Type": "application/json" };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
    const url = new URL(req.url);
    if (req.method !== "POST" || url.pathname !== "/verify")
      return new Response(JSON.stringify({ error: "not found" }), { status: 404, headers });
    let code = "";
    try { code = String((await req.json()).code || "").trim().toUpperCase(); } catch (e) {}
    if (!code || code.length > 64)
      return new Response(JSON.stringify({ valid: false }), { status: 200, headers });
    const codes = (env.UNLOCK_CODES || "").split(",").map(s => s.trim().toUpperCase()).filter(Boolean);
    let valid = false;
    for (const c of codes) if (safeEqual(code, c)) valid = true;
    return new Response(JSON.stringify({ valid }), { status: 200, headers });
  },
};
