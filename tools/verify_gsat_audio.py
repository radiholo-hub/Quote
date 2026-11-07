#!/usr/bin/env python3
"""核對 gsat/audio 與 gsat/data/audio_manifest.js:數量、檔名雜湊、孤兒檔、mp3 格式、時長、音量,以及慢速是否真的比正常速度慢。
只做機器可檢查的事;「聽起來是否自然、發音是否正確」必須由人聆聽,本工具不能代替。需要 ffprobe 與 ffmpeg。
用法:python3 tools/verify_gsat_audio.py [--json 輸出.json]   有任何問題時結束碼為 1。"""
import json, pathlib, re, subprocess, sys, collections

ROOT = pathlib.Path(__file__).resolve().parents[1]
AUDIO = ROOT / 'gsat' / 'audio'


def load_hash():
    src = (ROOT / 'tools' / 'make_score_rescue_audio.py').read_text(encoding='utf-8')
    g = {'__name__': 'x', '__file__': str(ROOT / 'tools' / 'make_score_rescue_audio.py')}
    exec(src[:src.index('async def main')], g)
    return g['sr_hash']


def probe(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,format_name:stream=codec_name,sample_rate,channels', '-of', 'json', str(path)], capture_output=True, text=True)
    j = json.loads(r.stdout or '{}')
    return float(j['format']['duration']), j['format']['format_name'], j['streams'][0]['codec_name'], int(j['streams'][0]['sample_rate']), j['streams'][0]['channels']


def volume(path):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(path), '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True)
    m, x = re.search(r'mean_volume: (-?[\d.]+) dB', r.stderr), re.search(r'max_volume: (-?[\d.]+) dB', r.stderr)
    return float(m.group(1)), float(x.group(1))


def main():
    t = (ROOT / 'gsat' / 'data' / 'audio_manifest.js').read_text(encoding='utf8')
    man = json.loads(t[t.index('window.AUDIO_MANIFEST = ') + 24:].rstrip().rstrip(';'))
    items = man['items']; h = load_hash(); bad = []; rows = []
    files = {p.name for p in AUDIO.glob('*.mp3')}
    expected = {i['file'] for i in items}
    for f in sorted(expected - files): bad.append(f'缺檔:{f}')
    for f in sorted(files - expected): bad.append(f'孤兒檔(清單裡沒有):{f}')
    if len(items) != len(expected): bad.append('清單內有重複的檔名')
    byhash = {}
    for it in items:
        key = ('slow\n' + it['text']) if it['rate'] == 'slow' else it['text']
        if h(key) + '.mp3' != it['file']: bad.append(f'檔名與文字雜湊不符:{it["file"]}')
        p = AUDIO / it['file']
        if not p.exists(): continue
        head = p.read_bytes()[:3]
        if not (head == b'ID3' or head[:2] in (b'\xff\xfb', b'\xff\xf3', b'\xff\xf2')): bad.append(f'不是 mp3 檔頭:{it["file"]}')
        dur, fmt, codec, sr, ch = probe(p); mean, mx = volume(p)
        cps = len(it['text']) / dur
        if codec != 'mp3' or ch != 1 and ch != 2: bad.append(f'編碼異常:{it["file"]} {codec} {ch}ch')
        if dur < 0.3: bad.append(f'時長太短:{it["file"]} {dur:.2f}s')
        if mean < -38: bad.append(f'音量過小(疑似靜音):{it["file"]} mean {mean} dB')
        if mx >= -0.05: bad.append(f'疑似爆音(削波):{it["file"]} max {mx} dB')
        rows.append({**{k: it[k] for k in ('hash', 'kind', 'rate', 'file', 'refs')}, 'chars': len(it['text']), 'dur': round(dur, 2), 'mean': mean, 'max': mx, 'cps': round(cps, 1), 'sr': sr, 'ch': ch, 'text': it['text'][:60]})
        byhash[(it['text'], it['rate'])] = dur
    # 每篇文章:慢速要比正常速度長,約 1.3–1.9 倍
    ratios = []
    for (text, rate), d in byhash.items():
        if rate == 'normal' and (text, 'slow') in byhash:
            r = byhash[(text, 'slow')] / d; ratios.append(r)
            if not 1.25 <= r <= 2.0: bad.append(f'慢速/正常時長比異常 {r:.2f}:{text[:40]}')
    kinds = collections.Counter((r['kind'], r['rate']) for r in rows)
    print(f'清單 {len(items)} 筆;gsat/audio 實際 mp3 {len(files)} 個;孤兒/缺檔以外的問題 {len([b for b in bad if not b.startswith(("缺檔", "孤兒"))])} 筆')
    for (k, rate), n in sorted(kinds.items()):
        ds = [r['dur'] for r in rows if r['kind'] == k and r['rate'] == rate]
        print(f'  {k:9s}{rate:7s}{n:4d} 個  時長 {min(ds):.1f}–{max(ds):.1f} 秒  合計 {sum(ds):.0f} 秒')
    if ratios: print(f'  慢速/正常時長比:{min(ratios):.2f}–{max(ratios):.2f}(共 {len(ratios)} 篇)')
    print(f'  總大小 {sum((AUDIO / f).stat().st_size for f in files) / 1e6:.2f} MB;總字元 {sum(len(i["text"]) for i in items)}')
    for b in bad: print('  問題:', b)
    if '--json' in sys.argv: pathlib.Path(sys.argv[sys.argv.index('--json') + 1]).write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding='utf8')
    sys.exit(1 if bad else 0)


main()
