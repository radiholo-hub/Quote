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

async def main():
    for out, v_zh, v_en in SETS:
        (out / "en").mkdir(parents=True, exist_ok=True)
        for i, (zh, en) in enumerate(rows):
            n = f"{i + 1:03d}.mp3"
            if not (out / n).exists():
                await edge_tts.Communicate(zh, v_zh, rate="-8%").save(str(out / n))
            if not (out / "en" / n).exists():
                await edge_tts.Communicate(en.replace('\\"', '"'), v_en, rate="-5%").save(str(out / "en" / n))
            print(out.name, n, zh[:20])

asyncio.run(main())
print(f"完成,共 {len(rows)} 句 × 男女聲")
