"""把示範題的腳本（例如 demo4.json）做成「題目動畫＋AI 旁白」影片。

用法：
  pip install edge-tts playwright && python -m playwright install chromium
  python3 tools/lesson_video/make_video.py tools/lesson_video/demo4.json out/demo4.mp4
  python3 tools/lesson_video/make_video.py demo4.json out.mp4 --silent   # 不產生旁白，只依字數估長度（檢查畫面用）

旁白：中文用 zh-TW-HsiaoChenNeural，英文單字與句子改用 en-US-AriaNeural（和網站英文發音同一個聲音），
分段產生後接起來，讓英文唸得自然。畫面：scene.html 依場景截圖，每個場景顯示到它那段旁白結束。
"""
import asyncio, json, pathlib, subprocess, sys, tempfile

HERE = pathlib.Path(__file__).resolve().parent
VOICE = {'zh': ('zh-TW-HsiaoChenNeural', '-4%'), 'en': ('en-US-AriaNeural', '-8%')}
GAP_PIECE = 0.18   # 同一句裡中英文片段之間（頭尾靜音已裁掉）
GAP_CUE = 0.45     # 換場景之前
W, H, FPS = 1920, 1080, 30


def sh(*a):
    subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def dur(p):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())


def silence(p, sec):
    sh('ffmpeg', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', '%.3f' % sec, '-c:a', 'pcm_s16le', str(p))


async def tts(text, lang, p):
    import edge_tts
    voice, rate = VOICE[lang]
    for attempt in range(4):
        try:
            mp3 = p.with_suffix('.mp3')
            await edge_tts.Communicate(text, voice, rate=rate).save(str(mp3))
            # 裁掉每段語音頭尾自帶的靜音，中英文接起來才不會一頓一頓
            trim = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
            sh('ffmpeg', '-y', '-i', str(mp3), '-af', trim, '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', str(p))
            return
        except Exception as e:  # 網路偶爾中斷就重試
            print('  重試', attempt + 1, lang, type(e).__name__)
            await asyncio.sleep(2 + attempt * 3)
    raise SystemExit('旁白產生失敗：' + text)


def estimate(text, lang):
    return max(0.6, len(text) / (4.6 if lang == 'zh' else 13.0))


def build_audio(cues, tmp, silent):
    """每個場景一段音訊；回傳每段長度（秒）。"""
    lens = []
    for i, cue in enumerate(cues):
        parts = []
        if 'pause' in cue:
            p = tmp / ('c%02d_pause.wav' % i); silence(p, cue['pause']); parts.append(p)
        for j, (lang, text) in enumerate(cue.get('say', [])):
            p = tmp / ('c%02d_%02d.wav' % (i, j))
            if silent:
                silence(p, estimate(text, lang))
            else:
                asyncio.run(tts(text, lang, p))
            parts.append(p)
            g = tmp / ('c%02d_%02dg.wav' % (i, j)); silence(g, GAP_PIECE); parts.append(g)
        g = tmp / ('c%02d_end.wav' % i); silence(g, GAP_CUE); parts.append(g)
        lst = tmp / ('c%02d.txt' % i)
        lst.write_text(''.join("file '%s'\n" % x.name for x in parts))
        out = tmp / ('cue%02d.wav' % i)
        sh('ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy', str(out))
        lens.append(dur(out))
    lst = tmp / 'all.txt'
    lst.write_text(''.join("file 'cue%02d.wav'\n" % i for i in range(len(cues))))
    sh('ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy', str(tmp / 'voice.wav'))
    return lens


def build_frames(data, cues, lens, tmp):
    """每個場景截一張圖；倒數場景每秒一張。回傳 [(圖檔, 秒數)]。"""
    from playwright.sync_api import sync_playwright
    shots = []
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={'width': W, 'height': H})
        pg.goto((HERE / 'scene.html').as_uri())
        try:
            pg.wait_for_load_state('networkidle', timeout=15000)
        except Exception:
            pass
        pg.evaluate('document.fonts.ready')
        for i, (cue, L) in enumerate(zip(cues, lens)):
            if cue['scene'] == 'countdown':
                n = int(cue['pause'])
                for k in range(n):
                    p = tmp / ('f%02d_%d.png' % (i, k))
                    pg.evaluate('([d,s,n])=>render(d,s,n)', [data, 'countdown', n - k]); pg.screenshot(path=str(p))
                    shots.append((p, 1.0 if k < n - 1 else L - (n - 1)))
            else:
                p = tmp / ('f%02d.png' % i)
                pg.evaluate('([d,s])=>render(d,s,0)', [data, cue['scene']]); pg.screenshot(path=str(p))
                shots.append((p, L))
        b.close()
    return shots


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    silent = '--silent' in sys.argv
    src, out = pathlib.Path(args[0]), pathlib.Path(args[1])
    data = json.loads(src.read_text(encoding='utf-8'))
    cues = data['cues']
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as t:
        tmp = pathlib.Path(t)
        lens = build_audio(cues, tmp, silent)
        shots = build_frames(data, cues, lens, tmp)
        lst = tmp / 'frames.txt'
        body = ''.join("file '%s'\nduration %.3f\n" % (p.name, d) for p, d in shots)
        lst.write_text(body + "file '%s'\n" % shots[-1][0].name)
        sh('ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-i', str(tmp / 'voice.wav'),
           '-vf', 'fps=%d,format=yuv420p' % FPS, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
           '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', str(out))
        t0, timeline = 0.0, []
        for cue, L in zip(cues, lens):
            timeline.append({'scene': cue['scene'], 'start': round(t0, 2), 'sec': round(L, 2)})
            t0 += L
        out.with_suffix('.timeline.json').write_text(json.dumps(timeline, ensure_ascii=False, indent=1), encoding='utf-8')
        print('完成：%s（%.1f 秒%s）' % (out, t0, '，無旁白' if silent else ''))


if __name__ == '__main__':
    main()
