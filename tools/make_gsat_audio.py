#!/usr/bin/env python3
"""為 gsat/data/audio_manifest.js 裡的每一段原創內容產生 mp3（美式女聲 Aria），放到 gsat/audio/<hash>.mp3。
沿用 Score Rescue 的做法與聲音設定：直接載入 tools/make_score_rescue_audio.py 的 sr_hash／synth，
有 AZURE_SPEECH_KEY 與 AZURE_SPEECH_REGION 時用官方 Azure AI Speech；沒有時退回非官方的 edge-tts（僅限試用）。
用法：python3 tools/make_gsat_audio.py [--list]      已存在的檔案會略過。慢速版用較慢的語速（RATE -35%）。"""
import asyncio, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'gsat' / 'audio'
SLOW_RATE = '-35%'


def load_tool():
    src = (ROOT / 'tools' / 'make_score_rescue_audio.py').read_text(encoding='utf-8')
    g = {'__name__': 'gsat_audio', '__file__': str(ROOT / 'tools' / 'make_score_rescue_audio.py'), 'asyncio': asyncio}
    exec(src[:src.index('async def main')], g)
    return g


async def main():
    t = (ROOT / 'gsat' / 'data' / 'audio_manifest.js').read_text(encoding='utf8')
    items = json.loads(t[t.index('window.AUDIO_MANIFEST = ') + 24:].rstrip().rstrip(';'))['items']
    if '--list' in sys.argv:
        print(len(items), '段,共', sum(len(i['text']) for i in items), '字元'); return
    g = load_tool(); normal = g['RATE']
    OUT.mkdir(parents=True, exist_ok=True)
    failed = []
    for i, it in enumerate(items):
        path = OUT / it['file']
        if path.exists(): continue
        g['RATE'] = SLOW_RATE if it['rate'] == 'slow' else normal
        if not await g['synth'](it.get('speak', it['text']), path):
            failed.append(it['text'][:40])
        if i % 20 == 0: print(f'{i + 1}/{len(items)}', flush=True)
    if failed:
        print('失敗(下次執行會再試):', *failed, sep='\n  '); raise SystemExit(1)
    print(f'完成,共 {len(items)} 段(%s)' % ('Azure 官方' if g['AZ_KEY'] and g['AZ_REGION'] else 'edge-tts 非官方'))


asyncio.run(main())
