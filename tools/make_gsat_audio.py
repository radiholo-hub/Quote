#!/usr/bin/env python3
"""為 gsat/data/audio_manifest.js 裡的每一段原創內容產生 mp3（美式女聲 Aria），放到 gsat/audio/<hash>.mp3。

只使用官方 Azure AI Speech：必須設定 AZURE_SPEECH_KEY 與 AZURE_SPEECH_REGION，並用 --tier 明確說明這把金鑰是哪一層：
  --tier free-test   免費層 F0：只供開發與音質試聽。來源登記為 azure-free-test（development-test-only），**不可正式部署**，不是 production-approved。
                     F0 有速率限制：預設每次請求間隔 3.5 秒，遇到 429／503 會依 Retry-After 等待後以「相同設定」重試。
  --tier paid        付費層 S0：登記為 azure-paid（production）。正式商業網站發布前用它重產。
沒有金鑰就直接停止，**不會**退回非官方的 edge-tts，也不會在重試時改語速。每個產生的檔案都登記到 docs/gsat/audio-provenance.json。

用法：
  python3 tools/make_gsat_audio.py --list
  python3 tools/make_gsat_audio.py --tier free-test --force     全部重新產生並覆蓋（例如把 edge-tts 的 187 個換成 Azure F0 測試版）
  python3 tools/make_gsat_audio.py --tier paid --force          正式版（免費層檔案不算 production，付費重產時一律覆蓋）
  選項：--limit N 最多處理 N 段；--min-interval 秒 請求間隔（free-test 預設 3.5，paid 預設 0）
不加 --force 時，只補「目前不是這個 tier 來源」的檔案。
重產後自動執行簽核同步：內容改變的已簽核音檔會讓「試聽簽核」標為 invalidated（絕不會自動標為通過）。"""
import asyncio, datetime, json, os, pathlib, shutil, subprocess, sys, tempfile, time, urllib.error

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
import gsat_audio_provenance as prov

OUT = ROOT / 'gsat' / 'audio'
SLOW_RATE = '-35%'
TIERS = {'free-test': 'azure-free-test', 'paid': 'azure-paid'}
DEFAULT_INTERVAL = {'free-test': 3.5, 'paid': 0.0}


def load_tool():
    src = (ROOT / 'tools' / 'make_score_rescue_audio.py').read_text(encoding='utf-8')
    g = {'__name__': 'gsat_audio', '__file__': str(ROOT / 'tools' / 'make_score_rescue_audio.py'), 'asyncio': asyncio}
    exec(src[:src.index('async def main')], g)
    return g


async def azure_only(g, text, path, retries=4, rate_limit_retries=12):
    """與 Score Rescue 同一支 azure_synth，但重試時語速不變；失敗回傳 False。
    429／503（免費層速率限制）依 Retry-After 或遞增等待後重試，且不佔用一般錯誤的重試次數；絕不改用其他服務。"""
    attempt = limited = 0
    while attempt < retries:
        try:
            await asyncio.to_thread(g['azure_synth'], text, path)
            return True
        except urllib.error.HTTPError as e:
            path.unlink(missing_ok=True)
            if e.code in (429, 503) and limited < rate_limit_retries:
                limited += 1
                try: wait = float(e.headers.get('Retry-After') or 0)
                except (TypeError, ValueError): wait = 0.0
                wait = max(wait, min(10 * limited, 60))
                print(f'  速率限制 HTTP {e.code}：等待 {wait:.0f} 秒後以相同設定重試（第 {limited} 次）', flush=True)
                await asyncio.sleep(0 if os.environ.get('GSAT_TTS_NO_SLEEP') else wait)
                continue
            attempt += 1; print(f'  重試 {attempt}: HTTP {e.code}', flush=True)
            await asyncio.sleep(2 * attempt)
        except Exception as e:
            attempt += 1; print(f'  重試 {attempt}: {type(e).__name__} {e}', flush=True); path.unlink(missing_ok=True)
            await asyncio.sleep(2 * attempt)
    return False


async def main():
    t = (ROOT / 'gsat' / 'data' / 'audio_manifest.js').read_text(encoding='utf8')
    items = json.loads(t[t.index('window.AUDIO_MANIFEST = ') + 24:].rstrip().rstrip(';'))['items']
    if '--list' in sys.argv:
        print(len(items), '段,共', sum(len(i.get('speak', i['text'])) for i in items), '字元'); return
    g = load_tool()
    if not (g['AZ_KEY'] and g['AZ_REGION']):
        sys.exit('需要官方 Azure AI Speech：請設定環境變數 AZURE_SPEECH_KEY 與 AZURE_SPEECH_REGION。\n'
                 '本工具不會退回非官方的 edge-tts，所以沒有產生任何檔案。')
    if '--tier' not in sys.argv or sys.argv[sys.argv.index('--tier') + 1:][:1] not in (['free-test'], ['paid']):
        sys.exit('必須用 --tier free-test（免費層 F0，開發試聽，不可正式部署）或 --tier paid（付費層 S0，正式版）說明這把金鑰是哪一層；不預設，避免測試音檔被誤標成正式版。')
    tier = sys.argv[sys.argv.index('--tier') + 1]; engine = TIERS[tier]
    interval = float(sys.argv[sys.argv.index('--min-interval') + 1]) if '--min-interval' in sys.argv else DEFAULT_INTERVAL[tier]
    force = '--force' in sys.argv
    limit = int(sys.argv[sys.argv.index('--limit') + 1]) if '--limit' in sys.argv else None
    normal = g['RATE']; rec = prov.load(); date = datetime.date.today().isoformat()
    OUT.mkdir(parents=True, exist_ok=True)
    mine = lambda f: rec['files'].get(f, {}).get('engine') == engine and prov.status_of(f, OUT, rec) in ('production', 'dev-test')
    todo = [it for it in items if force or not mine(it['file'])]
    if limit is not None: todo = todo[:limit]
    chars = sum(len(i.get('speak', i['text'])) for i in todo)
    print(f'本次 {len(todo)} 段、約 {chars} 字元' + (f'（免費層 F0 每月額度 50 萬字元，本次約佔 {chars / 5000:.1f}%）' if tier == 'free-test' else ''), flush=True)
    failed = []; done = 0
    with tempfile.TemporaryDirectory() as tmp:
        for i, it in enumerate(todo):
            if interval and i: await asyncio.sleep(interval)
            rate = SLOW_RATE if it['rate'] == 'slow' else normal
            g['RATE'] = rate
            tmpf = pathlib.Path(tmp) / it['file']
            if not await azure_only(g, it.get('speak', it['text']), tmpf):
                failed.append(it['text'][:40]); continue
            shutil.move(str(tmpf), OUT / it['file'])              # 成功才覆蓋，失敗時舊檔原封不動
            prov.record(rec, it['file'], OUT, engine, g['VOICE'], rate, date, tier=('F0' if tier == 'free-test' else 'S0')); done += 1
            if i % 20 == 0: print(f'{i + 1}/{len(todo)}', flush=True)
            prov.save(rec)                                          # 每段都存，中途中斷也不會有「有檔無紀錄」的狀態
    if done:
        r = subprocess.run([sys.executable, str(ROOT / 'tools' / 'gsat_signoff.py'), 'sync-audio', '--date', date]); print('簽核同步結束碼', r.returncode)
    if failed:
        print('失敗(下次執行會再試):', *failed, sep='\n  '); raise SystemExit(1)
    print(f'完成：產生 {done} 段（{engine}，{g["VOICE"]}），本次未處理 {len(items) - len(todo) - len(failed)} 段（已是此來源，或被 --limit 略過）' + ('。注意：免費層 F0 測試音檔，不可正式部署。' if tier == 'free-test' else ''))


asyncio.run(main())
