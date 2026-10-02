"""為 quotes.js 的每一句產生音檔:中文(台灣國語)與英文(美式英語),男聲、女聲各一組。
用法:  pip install edge-tts && python3 tools/make_audio.py
已存在的檔案會略過;句子文字改了就刪掉對應的 mp3 再執行。"""
import asyncio, pathlib, re
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
# 女聲放 audio/ 與 audio/en/;男聲放 audio/m/ 與 audio/m/en/
SETS = [
    (ROOT / "audio",       "zh-TW-HsiaoChenNeural", "en-US-AriaNeural"),  # 女聲
    (ROOT / "audio" / "m", "zh-TW-YunJheNeural",    "en-US-GuyNeural"),   # 男聲
]
rows = re.findall(r'^\s*\{ zh: "(.*?)", en: "(.*?)", by:', (ROOT / "quotes.js").read_text(encoding="utf-8"), re.M)

async def synth(text, voice, rate, path):
    """失敗時重試;仍失敗就換成不調速率再試一次。成功回傳 True。"""
    for attempt, r in enumerate([rate, rate, rate, "+0%"]):
        try:
            await edge_tts.Communicate(text, voice, rate=r).save(str(path))
            return True
        except Exception as e:  # NoAudioReceived 等暫時性錯誤
            print(f"  重試 {attempt + 1}: {voice} {type(e).__name__}")
            path.unlink(missing_ok=True)
            await asyncio.sleep(2 * (attempt + 1))
    return False

async def main():
    failed = []
    for out, v_zh, v_en in SETS:
        (out / "en").mkdir(parents=True, exist_ok=True)
        for i, (zh, en) in enumerate(rows):
            n = f"{i + 1:03d}.mp3"
            jobs = [(out / n, zh, v_zh, "-8%"), (out / "en" / n, en.replace('\\"', '"'), v_en, "-5%")]
            for path, text, voice, rate in jobs:
                if not path.exists() and not await synth(text, voice, rate, path):
                    failed.append(str(path.relative_to(ROOT)))
            print(out.name, n, zh[:20])
    if failed:
        print("失敗(下次執行會再試):", *failed, sep="\n  ")
        raise SystemExit(1)

asyncio.run(main())
print(f"完成,共 {len(rows)} 句 × 男女聲")
