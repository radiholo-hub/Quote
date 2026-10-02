"""為 quotes.js 的每一句中文產生台灣國語音檔 audio/001.mp3 ...(使用 Microsoft Edge 的 zh-TW 語音)。
用法:  pip install edge-tts && python3 tools/make_audio.py
已存在的檔案會略過;句子文字改了就刪掉對應的 mp3 再執行。"""
import asyncio, pathlib, re
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
VOICE = "zh-TW-HsiaoChenNeural"  # 台灣女聲;男聲可改 zh-TW-YunJheNeural
zh = re.findall(r'^\s*\{ zh: "(.*?)", en:', (ROOT / "quotes.js").read_text(encoding="utf-8"), re.M)
out = ROOT / "audio"; out.mkdir(exist_ok=True)

async def main():
    for i, text in enumerate(zh):
        f = out / f"{i + 1:03d}.mp3"
        if f.exists(): continue
        await edge_tts.Communicate(text, VOICE, rate="-8%").save(str(f))
        print(f.name, text[:20])

asyncio.run(main())
print(f"完成,共 {len(zh)} 句")
