#!/usr/bin/env bash
# 把要部署的網站檔案整理到 OUT（預設 _site）。GitHub Pages 與 Cloudflare Pages 共用，兩邊部署的內容相同。
# 在 Cloudflare Pages 建置時（Cloudflare 會設定 CF_PAGES=1）另產生 _headers：
# 測試網址 <專案>.pages.dev 與每次部署的 <部署編號>.<專案>.pages.dev 都回應 X-Robots-Tag: noindex，
# 避免被搜尋引擎收錄。GitHub Pages 不產生這個檔案。
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=${1:-_site}
[ ! -e "$OUT" ] || { echo "::error::$OUT 已存在"; exit 1; }
mkdir "$OUT"
cp index.html style.css app.js quotes.js "$OUT"/
cp -r audio "$OUT"/audio
cp -r score-rescue "$OUT"/score-rescue
if [ "${CF_PAGES:-}" = 1 ]; then
  cat > "$OUT/_headers" <<'HEADERS'
https://:project.pages.dev/*
  X-Robots-Tag: noindex

https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex
HEADERS
fi
echo "已整理 $(find "$OUT" -type f | wc -l) 個檔案到 $OUT"
