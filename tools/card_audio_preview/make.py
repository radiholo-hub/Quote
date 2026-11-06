"""試聽用：把 texts.txt 每一行用 Aria（-8%，和 tools/make_score_rescue_audio.py 相同）產生 mp3，檔名＝sr_hash(文字)。
只用來產生預覽音檔，正式版由「Generate audio」用 Azure 產生。"""
import asyncio, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / "out"
VOICE, RATE = "en-US-AriaNeural", "-8%"

def sr_hash(text):
    M = 0xFFFFFFFF
    mul = lambda a, b: (a * b) & M
    h1, h2 = 0xDEADBEEF, 0x41C6CE57
    b = text.encode("utf-16-le")
    for i in range(0, len(b), 2):
        ch = b[i] | (b[i + 1] << 8)
        h1 = mul(h1 ^ ch, 2654435761); h2 = mul(h2 ^ ch, 1597334677)
    h1 = mul(h1 ^ (h1 >> 16), 2246822507) ^ mul(h2 ^ (h2 >> 13), 3266489909)
    h2 = mul(h2 ^ (h2 >> 16), 2246822507) ^ mul(h1 ^ (h1 >> 13), 3266489909)
    return format(4294967296 * (h2 & 2097151) + (h1 & M), "x")

async def main():
    import edge_tts
    OUT.mkdir(exist_ok=True)
    for t in [x for x in (HERE / "texts.txt").read_text(encoding="utf-8").splitlines() if x.strip()]:
        p = OUT / (sr_hash(t) + ".mp3")
        for attempt in range(4):
            try:
                await edge_tts.Communicate(t, VOICE, rate=RATE).save(str(p)); break
            except Exception as e:
                print("retry", attempt + 1, type(e).__name__); await asyncio.sleep(3)
        else:
            sys.exit("failed: " + t)
        print(p.name, t)

asyncio.run(main())
