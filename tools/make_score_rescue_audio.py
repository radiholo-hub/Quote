"""為 score-rescue/index.html 裡所有會被 🔊 朗讀的英文內容,用美式女聲 Aria 產生 mp3。
用法:  設定環境變數 AZURE_SPEECH_KEY 與 AZURE_SPEECH_REGION(官方 Azure AI Speech,收費產品請用這個)
       python3 tools/make_score_rescue_audio.py
       沒設定時會退回非官方的 edge-tts(僅限試用:pip install edge-tts)
       python3 tools/make_score_rescue_audio.py --list   (只列出數量,不產生)
檔名 = score-rescue/audio/<hash>.mp3,hash 由文字算出,要和 index.html 的 srHash() 完全一致。
已存在的檔案會略過;文字改了就會算出新的檔名,舊檔可自行刪除。"""
import asyncio, json, os, pathlib, re, sys, urllib.request
from xml.sax.saxutils import escape

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = ROOT / "score-rescue" / "index.html"
OUT = ROOT / "score-rescue" / "audio"
VOICE = "en-US-AriaNeural"
RATE = "-8%"

def sr_hash(text):
    """cyrb53,和 index.html 的 srHash() 相同(以 UTF-16 code unit 計算)。"""
    M = 0xFFFFFFFF
    mul = lambda a, b: (a * b) & M
    h1, h2 = 0xDEADBEEF, 0x41C6CE57
    b = text.encode("utf-16-le")
    for i in range(0, len(b), 2):
        ch = b[i] | (b[i + 1] << 8)
        h1 = mul(h1 ^ ch, 2654435761)
        h2 = mul(h2 ^ ch, 1597334677)
    h1 = mul(h1 ^ (h1 >> 16), 2246822507) ^ mul(h2 ^ (h2 >> 13), 3266489909)
    h2 = mul(h2 ^ (h2 >> 16), 2246822507) ^ mul(h1 ^ (h1 >> 13), 3266489909)
    return format(4294967296 * (h2 & 2097151) + (h1 & M), "x")

def tts_split(text):
    """和 index.html 的 ttsSplit() 相同:依句號分句,保護 a.m./Mr. 等縮寫。"""
    t = re.sub(r"\b([ap])\.m\.", lambda m: m.group(0).replace(".", "\u2024"), text, flags=re.I)
    t = re.sub(r"\b(Mr|Ms|Mrs|Dr|St)\.", lambda m: m.group(0).replace(".", "\u2024"), t)
    out = []
    for line in re.split(r"\n+", t):
        for x in re.sub(r"([.!?])\s+", "\\1\x01", line).split("\x01"):
            x = x.strip()
            if x:
                out.append(x.replace("\u2024", "."))
    return out

def load_consts(src):
    def arr(name):
        m = re.search(r"const %s=(\[.*?\]);\n" % name, src, re.S)
        return json.loads(m.group(1))
    return arr

def collect():
    src = HTML.read_text(encoding="utf-8")
    arr = load_consts(src)
    texts = set()
    # 單句填空(診斷、補強、解析、模擬試題 Part 5 的完整句子)
    for r in arr("RAW"):
        texts.add(r[1].replace("___", r[2][r[3]], 1))
        texts.update(o for o in r[2] if o.strip())  # 每個選項單獨的發音(🔊 在 A/B/C/D 旁)
    # 第 1 天的範例句
    texts.update(re.findall(r"\bex:'(.*?)',", src))
    for n in (1, 2, 3):
        # Part 6:全文朗讀,以及每個空格所在的那一句
        for psg in arr("EXAM%d_P6" % n):
            ans = {str(i + 1): b["o"][b["a"]] for i, b in enumerate(psg["blanks"])}
            texts.update(o for b in psg["blanks"] for o in b["o"] if o.strip())
            fill = lambda mk: re.sub(r"\{(\d)\}", lambda m: mk(m.group(1)), psg["text"])
            texts.add(fill(lambda d: ans[d]))
            for k in ans:
                marked = fill(lambda d: ("\u27E6%s\u27E7" % ans[d]) if d == k else ans[d])
                hit = next((x for x in tts_split(marked) if "\u27E6" in x), "")
                if hit:
                    texts.add(hit.replace("\u27E6", "").replace("\u27E7", ""))
        # Part 7:每篇文章,以及「題目 + Answer: 正解」
        for st in arr("EXAM%d_P7" % n):
            for p in st["passages"]:
                texts.add(p["body"])
            for q in st["questions"]:
                texts.add(q["q"] + " Answer: " + q["o"][q["a"]])
    return sorted(texts)

AZ_KEY = os.environ.get("AZURE_SPEECH_KEY", "")
AZ_REGION = os.environ.get("AZURE_SPEECH_REGION", "")

def azure_synth(text, path):
    ssml = ('<speak version="1.0" xml:lang="en-US"><voice name="%s"><prosody rate="%s">%s</prosody></voice></speak>'
            % (VOICE, RATE, escape(text)))
    req = urllib.request.Request(
        "https://%s.tts.speech.microsoft.com/cognitiveservices/v1" % AZ_REGION,
        data=ssml.encode("utf-8"),
        headers={"Ocp-Apim-Subscription-Key": AZ_KEY,
                 "Content-Type": "application/ssml+xml",
                 "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
                 "User-Agent": "score-rescue-audio"})
    with urllib.request.urlopen(req, timeout=60) as r:
        path.write_bytes(r.read())

async def synth(text, path):
    if AZ_KEY and AZ_REGION:
        for attempt in range(4):
            try:
                await asyncio.to_thread(azure_synth, text, path)
                return True
            except Exception as e:
                print(f"  重試 {attempt + 1}: {type(e).__name__} {e}")
                path.unlink(missing_ok=True)
                await asyncio.sleep(2 * (attempt + 1))
        return False
    import edge_tts
    for attempt in range(4):
        try:
            await edge_tts.Communicate(text, VOICE, rate=RATE if attempt < 3 else "+0%").save(str(path))
            return True
        except Exception as e:
            print(f"  重試 {attempt + 1}: {type(e).__name__}")
            path.unlink(missing_ok=True)
            await asyncio.sleep(2 * (attempt + 1))
    return False

async def main():
    texts = collect()
    if "--list" in sys.argv:
        print(len(texts), "段,共", sum(map(len, texts)), "字元")
        return
    OUT.mkdir(parents=True, exist_ok=True)
    failed = []
    for i, t in enumerate(texts):
        path = OUT / (sr_hash(t) + ".mp3")
        if not path.exists() and not await synth(t, path):
            failed.append(t[:40])
        if i % 20 == 0:
            print(f"{i + 1}/{len(texts)}")
    if failed:
        print("失敗(下次執行會再試):", *failed, sep="\n  ")
        raise SystemExit(1)
    print(f"完成,共 {len(texts)} 段 Aria 音檔(%s)" % ("Azure 官方" if AZ_KEY and AZ_REGION else "edge-tts 非官方"))

asyncio.run(main())
