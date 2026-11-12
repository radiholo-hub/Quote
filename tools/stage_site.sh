#!/usr/bin/env bash
# 把要部署的網站檔案整理到 OUT（預設 _site）。GitHub Pages 與 Cloudflare Pages 共用，兩邊部署的內容相同。
# 在 Cloudflare Pages 建置時（Cloudflare 會設定 CF_PAGES=1）另產生 _headers：
# 測試網址 <專案>.pages.dev 與每次部署的 <部署編號>.<專案>.pages.dev 都回應 X-Robots-Tag: noindex，
# 避免被搜尋引擎收錄。GitHub Pages 不產生這個檔案。
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=${1:-_site}
case "${GSAT_PUBLISH_EXAMS:-}" in
  ''|0) ;;
  *) echo "::error::GSAT_PUBLISH_EXAMS 已停用：歷屆試題、評分文件與試題圖片的權利未確認，不得隨網站部署。請移除這個設定。"; exit 1;;
esac
[ ! -e "$OUT" ] || { echo "::error::$OUT 已存在"; exit 1; }
mkdir "$OUT"
cp index.html style.css app.js quotes.js "$OUT"/
cp -r audio "$OUT"/audio
cp -r score-rescue "$OUT"/score-rescue
# 完整方案教材（詞性小課第 4～7 課）只放在 Supabase 私有儲存桶。private/ 雖然不進 git，
# 但在有教材的工作目錄執行這支腳本時仍會被複製，所以這裡一律刪掉，最後再檢查一次。
rm -rf "$OUT"/score-rescue/private "$OUT"/score-rescue/tests
find "$OUT"/score-rescue \( -name 'lessons_upload*.zip' -o -name '*.full.html' -o -name 'lesson[4-7].mp4' -o -name 'audio-texts-paid.json' \) -delete
if grep -rlE 'L[4-7]-(DEMO|PR|CHK)-[0-9]' "$OUT"/score-rescue >/dev/null 2>&1 || find "$OUT"/score-rescue -name 'l[4-7].js' | grep -q .; then
  echo "::error::公開輸出含有完整方案教材（第 4～7 課）"; exit 1
fi
cp -r gsat "$OUT"/gsat
rm -rf "$OUT"/gsat/tests
# 權利不明素材不公開（保守發布方案）：
#  1. gsat/exam/（歷屆試題、答案、評分文件頁、試題圖片、非選擇題、衍生的詳解／出現索引／人工審核）一律不隨網站部署，只放空殼，
#     網站會降級成「導向大考中心官網 + 原創題」。這個閘門沒有開關：GSAT_PUBLISH_EXAMS 設成任何非空、非 0 的值都會讓整理直接失敗，
#     避免任何人在部署設定裡把權利不明的素材重新放進公開網站。
#  2. gsat/audio/ 只放「Azure AI Speech 付費層（azure-paid）產生、且檔案雜湊與 docs/gsat/audio-provenance.json 一致」的 mp3；
#     免費層 F0 測試音檔（azure-free-test）、非官方引擎（edge-tts）或來源不明的檔案會被移除，播放器自動改用裝置語音。
rm -rf "$OUT"/gsat/exam
mkdir "$OUT"/gsat/exam
echo 'window.EXAMS=[];' > "$OUT"/gsat/exam/exams.js
echo 'window.ANSWERS={};' > "$OUT"/gsat/exam/answers.js
echo 'window.NONMC={};' > "$OUT"/gsat/exam/nonmc.js
echo 'window.EXPLAIN={};' > "$OUT"/gsat/exam/explain.js
echo 'window.MIXED={};' > "$OUT"/gsat/exam/mixed.js
echo 'window.VOCAB_INDEX=null;' > "$OUT"/gsat/exam/vocab_index.js
python3 tools/gsat_audio_provenance.py prune "$OUT"/gsat/audio
# 最後一道保險：公開輸出裡不得有任何試題圖片或 PDF
if find "$OUT"/gsat -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.pdf' \) | grep -q .; then
  echo "::error::公開輸出的 gsat/ 含有圖片或 PDF"; exit 1
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
