#!/usr/bin/env bash
# 把要部署的網站檔案整理到 OUT（預設 _site）。GitHub Pages 與 Cloudflare Pages 共用，兩邊部署的內容相同。
# 在 Cloudflare Pages 建置時（Cloudflare 會設定 CF_PAGES=1）另產生 _headers：
# 測試網址 <專案>.pages.dev 與每次部署的 <部署編號>.<專案>.pages.dev 都回應 X-Robots-Tag: noindex，
# 避免被搜尋引擎收錄。GitHub Pages 不產生這個檔案。
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=${1:-_site}
# 歷屆試題的公開開關：預設發布 allowlist 內的文字資料（見 tools/gsat_public_exams.py）；GSAT_PUBLISH_EXAMS=0 是緊急關閉，
# 改回只放空殼的降級版（導向大考中心官網 + 原創題）。其他任何值（例如 1、true）都視為設定錯誤，整理直接失敗。
case "${GSAT_PUBLISH_EXAMS:-}" in
  ''|0|1) ;;
  *) echo "::error::GSAT_PUBLISH_EXAMS 只接受 0（緊急關閉，只放空殼）或不設定；收到不認得的值。"; exit 1;;
esac
[ ! -e "$OUT" ] || { echo "::error::$OUT 已存在"; exit 1; }
mkdir "$OUT"
cp index.html style.css app.js quotes.js "$OUT"/
cp -r audio "$OUT"/audio
cp -r score-rescue "$OUT"/score-rescue
# 完整方案教材（詞性小課第 4～7 課）只放在 Supabase 私有儲存桶。private/ 雖然不進 git，
# 但在有教材的工作目錄執行這支腳本時仍會被複製，所以這裡一律刪掉，最後再檢查一次。
rm -rf "$OUT"/score-rescue/private "$OUT"/score-rescue/tests
find "$OUT"/score-rescue \( -name 'lessons_upload*.zip' -o -name '*.full.html' -o -name 'lesson[4-7].mp4' -o -name 'audio-texts-paid.json' -o -name 'final.js' -o -name 'exams.json' \) -delete
if grep -rlE 'L[4-7]-(DEMO|PR|CHK)-[0-9]|FINAL-[0-9][0-9]' "$OUT"/score-rescue >/dev/null 2>&1 || find "$OUT"/score-rescue -name 'l[4-7].js' | grep -q .; then
  echo "::error::公開輸出含有完整方案教材（第 4～7 課或結業測驗）"; exit 1
fi
cp -r gsat "$OUT"/gsat
rm -rf "$OUT"/gsat/tests
# 公開內容的保守 allowlist（試題文字已獲負責人回報授權；試題圖片、評分原則頁面、PDF 本版仍不公開）：
#  1. gsat/exam/ 不是整個複製，而是由 tools/gsat_public_exams.py 只輸出六個檔：選擇題文字（需要附圖的題目移除圖片路徑並標記）、
#     官方答案、原創詳解、出現索引，以及非選擇題與混合題兩個空殼。img/、vocab_reviews.js 與任何 pdf／jpg／png 都不會進公開輸出。
#     GSAT_PUBLISH_EXAMS=0 時改輸出六個空殼（緊急關閉）。
#  2. gsat/audio/ 只放「Azure AI Speech 付費層（azure-paid）產生、且檔案雜湊與 docs/gsat/audio-provenance.json 一致」的 mp3；
#     免費層 F0 測試音檔（azure-free-test）、非官方引擎（edge-tts）或來源不明的檔案會被移除，播放器自動改用裝置語音。
SRC_EXAM=gsat/exam
rm -rf "$OUT"/gsat/exam
if [ "${GSAT_PUBLISH_EXAMS:-}" = 0 ]; then
  python3 tools/gsat_public_exams.py --safe-shell "$OUT"/gsat/exam
else
  python3 tools/gsat_public_exams.py "$SRC_EXAM" "$OUT"/gsat/exam
fi
python3 tools/gsat_audio_provenance.py prune "$OUT"/gsat/audio
# 最後一道保險：公開輸出裡不得有任何點陣圖（jpg／png）或 PDF；唯一允許的圖片是 allowlist 的原創替代圖（gsat/data/figures/*.svg）
if find "$OUT"/gsat -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.gif' -o -iname '*.webp' -o -iname '*.pdf' \) | grep -q .; then
  echo "::error::公開輸出的 gsat/ 含有點陣圖或 PDF"; exit 1
fi
python3 tools/gsat_public_exams.py --check-site "$OUT"/gsat
if grep -rlE 'exam/img|figureWithheld.*\.(jpe?g|png)' "$OUT"/gsat/exam >/dev/null 2>&1; then
  echo "::error::公開輸出的 gsat/exam 仍含有試題圖片路徑"; exit 1
fi
if [ "${CF_PAGES:-}" = 1 ]; then
  cat > "$OUT/_headers" <<'HEADERS'
https://:project.pages.dev/*
  X-Robots-Tag: noindex

https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex
HEADERS
fi
echo "已整理 $(find "$OUT" -type f | wc -l) 個檔案到 $OUT"
