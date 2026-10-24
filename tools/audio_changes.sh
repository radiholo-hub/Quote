#!/usr/bin/env bash
# 在「Generate audio」的兩段工作之間搬運新音檔。
#   pack DIR   ：（產生音檔那一段）把新增或修改的 mp3 複製到 DIR，並輸出 changed=true/false。
#               有刪檔或 mp3 以外的變更就停止。
#   unpack DIR ：（開 PR 那一段）把 DIR 裡的檔案放回工作目錄。
#               DIR 裡只能有一般檔案，路徑必須是 audio/ 或 score-rescue/audio/ 底下的 mp3。
set -euo pipefail

# 用 ENVIRON 傳給 awk：-v 會把反斜線當跳脫字元，讓 \. 變成任意字元
export ALLOWED='^(audio(/[a-z]+)?(/[a-z]+)?|score-rescue/audio)/[A-Za-z0-9_-]+\.mp3$'

fail() { echo "::error::$*"; exit 1; }
out() { if [ -n "${GITHUB_OUTPUT:-}" ]; then echo "$1" >> "$GITHUB_OUTPUT"; fi; }

cmd=${1:-}; dir=${2:-}
[ -n "$dir" ] || fail "用法：audio_changes.sh pack|unpack DIR"

case "$cmd" in
  pack)
    git add -A audio score-rescue/audio
    if git diff --cached --quiet; then echo "沒有新的音檔"; out changed=false; exit 0; fi
    bad=$(git diff --cached --name-status | awk '!(($1=="A"||$1=="M") && $2 ~ ENVIRON["ALLOWED"])')
    [ -z "$bad" ] || fail "音檔變更包含不允許的項目（只允許新增或修改 mp3）：$bad"
    mkdir -p "$dir"
    git diff --cached --name-only | while IFS= read -r f; do
      mkdir -p "$dir/$(dirname "$f")"
      cp "$f" "$dir/$f"
    done
    echo "新音檔：$(git diff --cached --name-only | wc -l) 個"
    out changed=true
    ;;
  unpack)
    [ -d "$dir" ] || fail "找不到 $dir"
    others=$(cd "$dir" && find . -mindepth 1 ! -type f ! -type d -printf '%P\n')
    [ -z "$others" ] || fail "新音檔裡有一般檔案以外的項目：$others"
    files=$(cd "$dir" && find . -type f -printf '%P\n' | sort)
    [ -n "$files" ] || fail "$dir 裡沒有檔案"
    badf=$(echo "$files" | awk '!($0 ~ ENVIRON["ALLOWED"])')
    [ -z "$badf" ] || fail "新音檔路徑不允許：$badf"
    echo "$files" | while IFS= read -r f; do
      install -D -m 644 "$dir/$f" "$f"
    done
    echo "放入新音檔：$(echo "$files" | wc -l) 個"
    ;;
  *) fail "用法：audio_changes.sh pack|unpack DIR" ;;
esac
