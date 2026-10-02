"""為 quotes.js 的每一句產生音檔:中文 audio/001.mp3(台灣國語)、英文 audio/en/001.mp3(美式英語)。
用法:  pip install edge-tts && python3 tools/make_audio.py
已存在的檔案會略過;句子文字改了就刪掉對應的 mp3 再執行。"""
import asyncio, pathlib, re
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
VOICE = "zh-TW-HsiaoChenNeural"  # 台灣女聲;男聲可改 zh-TW-YunJheNeural
VOICE_EN = "en-US-AriaNeural"    # 美式女聲;男聲可改 en-US-GuyNeural
rows = re.findall(r'^\s*\{ zh: "(.*?)", en: "(.*?)", by:', (ROOT / "quotes.js").read_text(encoding="utf-8"), re.M)
out = ROOT / "audio"; out_en = out / "en"; out_en.mkdir(parents=True, exist_ok=True)

async def main():
    for i, (zh, en) in enumerate(rows):
        n = f"{i + 1:03d}.mp3"
        if not (out / n).exists():
            await edge_tts.Communicate(zh, VOICE, rate="-8%").save(str(out / n))
        if not (out_en / n).exists():
            await edge_tts.Communicate(en.replace('\\"', '"'), VOICE_EN, rate="-5%").save(str(out_en / n))
        print(n, zh[:20])

asyncio.run(main())
print(f"完成,共 {len(rows)} 句")
