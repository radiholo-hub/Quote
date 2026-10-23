"""確認 Score Rescue 需要的音檔都在：網頁會念的每一段文字，score-rescue/audio/ 裡都要有對應的 mp3。
缺任何一段就以錯誤結束，讓「Generate audio」不進入開 PR 與自動合併。"""
import pathlib
import sys

TOOL = pathlib.Path(__file__).resolve().parent / 'make_score_rescue_audio.py'
src = TOOL.read_text(encoding='utf-8')
g = {'__name__': 'check_audio_complete', '__file__': str(TOOL)}
exec(src[:src.index('async def main')], g)          # 只載入收集與雜湊函式，不產生音檔

texts = g['collect']()
missing = [t for t in texts if not (g['OUT'] / (g['sr_hash'](t) + '.mp3')).exists()]
if missing:
    print('缺少 %d 段音檔：' % len(missing))
    for t in missing[:20]:
        print('  ', t[:60].replace('\n', ' '))
    sys.exit(1)
print('音檔齊全：%d 段' % len(texts))
