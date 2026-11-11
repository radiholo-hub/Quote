"""把課程腳本（例如 lesson1.json）做成「題目動畫＋AI 旁白」影片。每個 cue 有 view（畫面）與 say（旁白）。

用法：
  pip install edge-tts playwright && python -m playwright install chromium
  python3 tools/lesson_video/make_video.py tools/lesson_video/lesson1.json out/lesson1.mp4
  python3 tools/lesson_video/make_video.py lesson1.json out.mp4 --silent   # 不產生旁白，只依字數估長度（檢查畫面用）

旁白：中文用 zh-TW-HsiaoChenNeural，英文單字與句子改用 en-US-AriaNeural（和網站英文發音同一個聲音），
分段產生後接起來，讓英文唸得自然；每段裁掉頭尾靜音並統一響度。cue 可加 "hold"（秒）念完後多停留，
"pause"（秒）為思考倒數。畫面：scene.html 依 view 截圖，每個畫面顯示到它那段旁白結束。
"""
import asyncio, json, os, pathlib, shutil, subprocess, sys, tempfile, wave

HERE = pathlib.Path(__file__).resolve().parent
VOICE = {'zh': ('zh-TW-HsiaoChenNeural', '-4%'), 'en': ('en-US-AriaNeural', '-8%')}
GAP_PIECE = 0.18   # 同一句裡中英文片段之間（頭尾靜音已裁掉）
GAP_CUE = 0.45     # 換場景之前
W, H, FPS = 1920, 1080, 30


def _ffmpeg():
    """系統有 ffmpeg 就用；沒有就用 pip 套件 imageio-ffmpeg 附的執行檔（GitHub 執行環境不一定有 ffmpeg）。"""
    if shutil.which('ffmpeg'):
        return 'ffmpeg'
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


FFMPEG = os.environ.get('FFMPEG') or _ffmpeg()


def sh(*a):
    if a and a[0] == 'ffmpeg':
        a = (FFMPEG,) + a[1:]
    subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def dur(p):
    with wave.open(str(p)) as w:
        return w.getnframes() / w.getframerate()


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
            # 再把每段統一到同樣的響度，中文、英文兩個聲音聽起來一樣大聲
            trim = ('silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,'
                    'loudnorm=I=-18:TP=-2:LRA=11')
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
        g = tmp / ('c%02d_end.wav' % i); silence(g, GAP_CUE + cue.get('hold', 0)); parts.append(g)
        lst = tmp / ('c%02d.txt' % i)
        lst.write_text(''.join("file '%s'\n" % x.name for x in parts))
        out = tmp / ('cue%02d.wav' % i)
        sh('ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy', str(out))
        lens.append(dur(out))
    lst = tmp / 'all.txt'
    lst.write_text(''.join("file 'cue%02d.wav'\n" % i for i in range(len(cues))))
    sh('ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy', str(tmp / 'voice.wav'))
    return lens


def build_frames(data, cues, lens, tmp):  # noqa: C901
    """每個場景截一張圖；倒數場景每秒一張。回傳 [(圖檔, 秒數)]。"""
    from playwright.sync_api import sync_playwright
    shots = []
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        w, h = data.get('size', [W, H])                # 直式短片：json 設 "size": [1080, 1920]、"scene": "short.html"
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.goto((HERE / data.get('scene', 'scene.html')).as_uri())
        try:
            pg.wait_for_load_state('networkidle', timeout=15000)
        except Exception:
            pass
        pg.evaluate('document.fonts.ready')
        if data.get('brand'):
            pg.evaluate('b=>{BRAND=b}', data['brand'])   # 畫面右上角的課名（例如「詞性小課 第2課」）
        for i, (cue, L) in enumerate(zip(cues, lens)):
            if 'pause' in cue:
                n = int(cue['pause'])
                for k in range(n):
                    p = tmp / ('f%02d_%d.png' % (i, k))
                    pg.evaluate('([v,n])=>render(v,n)', [cue['view'], n - k]); pg.screenshot(path=str(p))
                    shots.append((p, 1.0 if k < n - 1 else L - (n - 1)))
            else:
                p = tmp / ('f%02d.png' % i)
                pg.evaluate('v=>render(v,0)', cue['view'])
                # "anim": true → 這一幕新出現的圈，用約 0.4 秒畫出來（前一幕已經有的圈不重畫）
                prev = [r['w'] for r in (cues[i - 1]['view'].get('ring') or [])] if i else []
                new = [r['w'] for r in (cue['view'].get('ring') or []) if r['w'] not in prev]
                if data.get('anim') and new and L > 0.8:
                    pg.evaluate('''ws=>{document.querySelectorAll('.ring').forEach(function(e){if(ws.indexOf(e.dataset.w)>=0){e.classList.add('new');
                      var l=e.nextElementSibling;if(l&&l.classList.contains('lab'))l.classList.add('new')}})}''', new)
                    steps = [0.12, 0.3, 0.5, 0.7, 0.88]
                    for k, rp in enumerate(steps):
                        q = tmp / ('f%02d_a%d.png' % (i, k))
                        pg.evaluate('p=>document.documentElement.style.setProperty("--rp",p)', rp); pg.screenshot(path=str(q))
                        shots.append((q, 0.08))
                    pg.evaluate('()=>document.documentElement.style.setProperty("--rp",1)')
                    pg.screenshot(path=str(p)); shots.append((p, L - 0.08 * len(steps)))
                else:
                    pg.screenshot(path=str(p))
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
            timeline.append({'scene': cue.get('id', ''), 'start': round(t0, 2), 'sec': round(L, 2)})
            t0 += L
        out.with_suffix('.timeline.json').write_text(json.dumps(timeline, ensure_ascii=False, indent=1), encoding='utf-8')
        print('完成：%s（%.1f 秒%s）' % (out, t0, '，無旁白' if silent else ''))


if __name__ == '__main__':
    main()
