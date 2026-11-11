#!/usr/bin/env python3
"""學測英文語音的來源紀錄（docs/gsat/audio-provenance.json）與部署閘門。

來源分三類：
  production      azure-paid       付費層（S0）產生，才可隨正式網站部署（也是唯一可取得「試聽簽核」的來源）
  development-test azure-free-test  免費層（F0）產生：可在本機與開發環境試聽、做音質檢查，**不可正式部署**，也不得視為 production-approved
  unofficial      edge-tts         非官方，不可部署
沒有來源紀錄、或檔案內容雜湊和紀錄不符的，一律視為來源不明。除了 production 以外的檔案，部署時都會被移除（播放器改用裝置語音）。

用法：
  python3 tools/gsat_audio_provenance.py baseline-edge-tts   把「清單內、尚無來源紀錄」的現有檔登記為 edge-tts（非官方；CI 日誌證實當時 Azure 金鑰為空）
  python3 tools/gsat_audio_provenance.py check [--require-production]   核對清單與來源紀錄；加 --require-production 時，只要有一個不是 azure-paid 就失敗（正式發布前必跑）
  python3 tools/gsat_audio_provenance.py check-public   公開版防誤提交：repository 現行／追蹤中的檔案不得是 azure-free-test（簽核裡的 devTestChecks 歷史不算）
  python3 tools/gsat_audio_provenance.py prune <音檔資料夾>   部署用：移除非 production 的 mp3。環境變數 GSAT_ALLOW_NONPRODUCTION_AUDIO=1 可在「本機」預覽整個網站時略過；在 GitHub Actions／Cloudflare 建置環境中設定它會直接失敗
"""
import hashlib, json, os, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
PROV = ROOT / 'docs' / 'gsat' / 'audio-provenance.json'
PRODUCTION_ENGINES = ('azure-paid',)
DEV_TEST_ENGINES = ('azure-free-test',)
USAGE = {'azure-paid': 'production', 'azure-free-test': 'development-test-only', 'edge-tts': 'unofficial-not-deployable'}


def sha256(p):
    return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()


def load(path=PROV):
    path = pathlib.Path(path)
    if not path.exists():
        return {'schema': 2, 'productionEngines': list(PRODUCTION_ENGINES), 'files': {}}
    return json.loads(path.read_text(encoding='utf8'))


def save(rec, path=PROV):
    pathlib.Path(path).write_text(json.dumps(rec, ensure_ascii=False, indent=1, sort_keys=True) + '\n', encoding='utf8')


def manifest_files(root=ROOT):
    t = (root / 'gsat' / 'data' / 'audio_manifest.js').read_text(encoding='utf8')
    return [i['file'] for i in json.loads(t[t.index('window.AUDIO_MANIFEST = ') + 24:].rstrip().rstrip(';'))['items']]


def status_of(name, audio_dir, rec):
    """'production'｜'dev-test'（F0 開發測試）｜'unofficial'（edge-tts 等）｜'unknown'（沒有紀錄）｜'mismatch'（檔案內容和紀錄不符）｜'missing'。
    只看 engine 與雜湊；紀錄裡的 usage／productionApproved 欄位不能讓非付費檔變成 production。"""
    p = pathlib.Path(audio_dir) / name
    if not p.exists(): return 'missing'
    e = rec.get('files', {}).get(name)
    if not e: return 'unknown'
    if e.get('sha256') != sha256(p): return 'mismatch'
    if e.get('engine') in PRODUCTION_ENGINES and e.get('usage') == 'production' and e.get('productionApproved') is True: return 'production'
    if e.get('engine') in DEV_TEST_ENGINES: return 'dev-test'
    return 'unofficial'


def record(rec, name, audio_dir, engine, voice, rate, date, tier=None):
    rec.setdefault('files', {})[name] = {'engine': engine, 'tier': tier, 'usage': USAGE.get(engine, 'unofficial-not-deployable'),
        'productionApproved': engine in PRODUCTION_ENGINES, 'voice': voice, 'rate': rate, 'sha256': sha256(pathlib.Path(audio_dir) / name), 'recordedAt': date}


def prune(audio_dir, rec=None, allow_nonproduction=None):
    """刪除非 production 的 mp3；回傳 (保留數, 移除數)。覆蓋旗標只能在本機使用。"""
    rec = load() if rec is None else rec
    if allow_nonproduction is None: allow_nonproduction = os.environ.get('GSAT_ALLOW_NONPRODUCTION_AUDIO') == '1'
    if allow_nonproduction and (os.environ.get('GITHUB_ACTIONS') or os.environ.get('CF_PAGES') or os.environ.get('CI')):
        sys.exit('::error::GSAT_ALLOW_NONPRODUCTION_AUDIO 只能在本機預覽使用，不得用於 CI／正式建置')
    kept = removed = 0
    for p in sorted(pathlib.Path(audio_dir).glob('*.mp3')):
        if allow_nonproduction or status_of(p.name, audio_dir, rec) == 'production': kept += 1
        else: p.unlink(); removed += 1
    return kept, removed


def tracked_audio(root=ROOT):
    """Git 追蹤中的 gsat/audio/*.mp3（沒有 git 時改看資料夾）；回傳 {檔名: sha256}。"""
    try:
        r = subprocess.run(['git', 'ls-files', '-z', 'gsat/audio'], cwd=root, capture_output=True, text=True, check=True)
        names = [n for n in r.stdout.split('\0') if n.endswith('.mp3')]
    except Exception:
        names = [f'gsat/audio/{p.name}' for p in (root / 'gsat' / 'audio').glob('*.mp3')]
    return {pathlib.Path(n).name: sha256(root / n) for n in names if (root / n).exists()}


def public_tree_problems(tracked, rec, signoffs):
    """公開版防誤提交：
    1. 來源紀錄（repository 現行檔案的來源）不得出現 azure-free-test；
    2. 追蹤中的 mp3 不得是 F0 開發測試音檔（來源紀錄或簽核的 devTestChecks 雜湊都不得相符）；
    3. 追蹤中的 mp3 必須有來源紀錄且雜湊一致。
    簽核 audio.devTestChecks 裡記錄 azure-free-test 是「審核歷史」，不是 repository 現行來源，不算違規。"""
    bad = []
    for f, e in rec.get('files', {}).items():
        if e.get('engine') in DEV_TEST_ENGINES: bad.append(f'來源紀錄把 repository 現行檔案登記為 {e["engine"]}:{f}')
    f0 = {x['sha256'] for s in signoffs for c in s.get('audio', {}).get('devTestChecks', []) for x in c.get('files', [])}
    for f, h in tracked.items():
        e = rec.get('files', {}).get(f)
        if h in f0: bad.append(f'追蹤中的 mp3 是 F0 開發測試音檔(雜湊與 devTestChecks 相符):{f}')
        if not e: bad.append(f'追蹤中的 mp3 沒有來源紀錄:{f}')
        elif e.get('sha256') != h: bad.append(f'追蹤中的 mp3 與來源紀錄雜湊不符:{f}')
    return bad


def main(argv):
    cmd = argv[1] if len(argv) > 1 else ''
    if cmd == 'baseline-edge-tts':
        rec = load(); audio = ROOT / 'gsat' / 'audio'; n = 0
        for f in manifest_files():
            if f in rec['files'] or not (audio / f).exists(): continue
            record(rec, f, audio, 'edge-tts', 'en-US-AriaNeural', 'manifest', '2026-11-09', tier='unofficial'); n += 1
        save(rec); print(f'登記 {n} 個為 edge-tts（非官方）'); return 0
    if cmd == 'check':
        rec = load(); audio = ROOT / 'gsat' / 'audio'; names = manifest_files()
        counts = {}
        for f in names: counts[status_of(f, audio, rec)] = counts.get(status_of(f, audio, rec), 0) + 1
        orphan = sorted(set(rec['files']) - set(names))
        print('來源狀態：' + '、'.join(f'{k} {v}' for k, v in sorted(counts.items())) + (f'；紀錄中多餘 {len(orphan)}' if orphan else ''))
        bad = counts.get('unknown', 0) + counts.get('mismatch', 0) + counts.get('missing', 0) + len(orphan)
        if '--require-production' in argv: bad += counts.get('unofficial', 0) + counts.get('dev-test', 0)
        return 1 if bad else 0
    if cmd == 'check-public':
        sig = [json.loads(q.read_text(encoding='utf8')) for q in sorted((ROOT / 'docs' / 'gsat' / 'signoffs').glob('*.json'))]
        bad = public_tree_problems(tracked_audio(), load(), sig)
        print('公開版檢查：' + ('沒有 F0 開發測試音檔被追蹤' if not bad else f'{len(bad)} 個問題'))
        for b in bad[:10]: print('  ✗', b)
        return 1 if bad else 0
    if cmd == 'prune' and len(argv) > 2:
        kept, removed = prune(argv[2])
        print(f'gsat 音檔：保留 {kept}，移除來源不明 {removed}'); return 0
    print(__doc__); return 2


if __name__ == '__main__':
    sys.exit(main(sys.argv))
