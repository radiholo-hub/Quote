#!/usr/bin/env python3
"""私有備份工具(非破壞性):建立並驗證「原始題庫私有保存」所需的備份,以及示範還原。
本工具不含任何試題內容;產生的備份含試題與衍生內容,必須存放在版本庫以外的私有位置。
  create  --out 資料夾   建立 (1) all.bundle(PR 分支相對於上線分支的全部提交;上線分支本身仍在 GitHub,還原時先 clone 它) (2) exam-private.tar.gz(gsat/exam/ 與處理試題的工具)
                         (3) MANIFEST.json(每個檔案的 sha256、大小、分類) (4) SHA256SUMS
  verify  --dir 資料夾   驗證:雜湊、bundle 完整、從 bundle 全新 clone 後的 gsat/exam/ 與 tar 內的逐檔相同、與目前工作目錄相同、檔案數與 MANIFEST 相符
  restore --dir 資料夾 --to 新資料夾   示範還原:全新 clone + 還原 gsat/exam/ ;驗證還原後與 MANIFEST 一致
退出碼 0＝全部通過。任何一項不符都會列出並以 1 結束。刪除分支、改寫歷史、關閉 PR 之前,必須先 verify 通過。"""
import argparse, hashlib, json, os, pathlib, shutil, subprocess, sys, tarfile, tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
BRANCH = 'claude/stoic-wright-fpdcyc'
BASE = 'claude/daily-quotes-website-lbh2wi'
REMOTE = 'https://github.com/radiholo-hub/Quote.git'
PRIVATE_TOOLS = ['tools/parse_gsat.py', 'tools/build_nonmc.py']       # 內含處理/改寫試題文字的工具,屬於私有組
sha = lambda b: hashlib.sha256(b).hexdigest()


def run(*a, cwd=None):
    r = subprocess.run(a, cwd=cwd, capture_output=True, text=True)
    if r.returncode: raise SystemExit(f'指令失敗:{" ".join(a)}\n{r.stderr}')
    return r.stdout.strip()


def private_files(root):
    out = [p for p in sorted((root / 'gsat' / 'exam').rglob('*')) if p.is_file()]
    out += [root / t for t in PRIVATE_TOOLS if (root / t).exists()]
    return out


def manifest(root):
    return {str(p.relative_to(root)): {'sha256': sha(p.read_bytes()), 'size': p.stat().st_size} for p in private_files(root)}


def create(out):
    out = pathlib.Path(out).resolve()
    if out == ROOT or ROOT in out.parents: sys.exit('拒絕:備份含試題,必須放在版本庫以外。')
    out.mkdir(parents=True, exist_ok=True)
    head = run('git', 'rev-parse', 'HEAD', cwd=ROOT)
    base = run('git', 'rev-parse', f'origin/{BASE}', cwd=ROOT)
    run('git', 'bundle', 'create', str(out / 'all.bundle'), f'origin/{BASE}..HEAD', cwd=ROOT)
    man = manifest(ROOT)
    with tarfile.open(out / 'exam-private.tar.gz', 'w:gz') as t:
        for rel in man: t.add(ROOT / rel, arcname=rel)
    (out / 'MANIFEST.json').write_text(json.dumps({'head': head, 'base': base, 'branch': BRANCH, 'files': man}, ensure_ascii=False, indent=1), encoding='utf8')
    sums = [f'{sha((out / n).read_bytes())}  {n}' for n in ('all.bundle', 'exam-private.tar.gz', 'MANIFEST.json')]
    (out / 'SHA256SUMS').write_text('\n'.join(sums) + '\n')
    print(f'已建立備份:{out}\n  head {head}\n  私有組 {len(man)} 個檔案;' + '; '.join(f'{n} {(out / n).stat().st_size / 1e6:.1f} MB' for n in ('all.bundle', 'exam-private.tar.gz')))


def clone_base(dest, d, man):
    """還原的真實路徑:從 GitHub 取得上線分支(只要頂端一個提交),再把備份 bundle 裡的 PR 提交接上去。"""
    run('git', 'clone', '-q', '--depth', '1', '--no-checkout', '-b', BASE, REMOTE, str(dest))
    if run('git', 'rev-parse', 'HEAD', cwd=dest) != man['base']: raise SystemExit('GitHub 上的上線分支已與備份時不同,請改用備份當時的 base 提交')
    run('git', 'fetch', '-q', str(d / 'all.bundle'), f'{man["head"]}:refs/heads/restored', cwd=dest)
    run('git', 'checkout', '-q', 'restored', cwd=dest)


def verify(d, against_worktree=True):
    d = pathlib.Path(d).resolve(); bad = []
    for line in (d / 'SHA256SUMS').read_text().splitlines():
        h, n = line.split('  ', 1)
        if sha((d / n).read_bytes()) != h: bad.append(f'雜湊不符:{n}')
    man = json.loads((d / 'MANIFEST.json').read_text(encoding='utf8'))
    try: run('git', 'bundle', 'verify', str(d / 'all.bundle'))
    except SystemExit as e: bad.append(f'bundle 不完整:{e}')
    with tempfile.TemporaryDirectory() as td:
        td = pathlib.Path(td)
        clone_base(td / 'c', d, man)
        cloned = manifest(td / 'c')
        with tarfile.open(d / 'exam-private.tar.gz') as t:
            t.extractall(td / 'x', filter='data')
        tarred = manifest(td / 'x')
    if set(cloned) != set(man['files']): bad.append(f'bundle 還原的私有組檔案清單與 MANIFEST 不同:差 {sorted(set(cloned) ^ set(man["files"]))[:5]}')
    for rel, m in man['files'].items():
        if cloned.get(rel, {}).get('sha256') != m['sha256']: bad.append(f'bundle 內容與 MANIFEST 不同:{rel}')
        if tarred.get(rel, {}).get('sha256') != m['sha256']: bad.append(f'tar 內容與 MANIFEST 不同:{rel}')
    if against_worktree:
        head = run('git', 'rev-parse', 'HEAD', cwd=ROOT)
        cur = manifest(ROOT)
        stale = [r for r in cur if cur[r]['sha256'] != man['files'].get(r, {}).get('sha256')] + [r for r in man['files'] if r not in cur]
        if stale: bad.append(f'備份已過期(與目前工作目錄不同,請重新 create):{stale[:5]}')
        if head != man['head']: bad.append(f'備份的 head {man["head"][:8]} 與目前 HEAD {head[:8]} 不同')
    print(f'檢查 {len(man["files"])} 個私有檔案、bundle(head {man["head"][:8]})')
    for b in bad: print('  ✗', b)
    print('備份完整,可還原' if not bad else '備份有問題,不得進行任何刪除或改寫歷史的操作')
    return not bad


def restore(d, to):
    d = pathlib.Path(d).resolve(); to = pathlib.Path(to).resolve()
    if to.exists() and any(to.iterdir()): sys.exit('還原目的地必須是空的或不存在的資料夾')
    man = json.loads((d / 'MANIFEST.json').read_text(encoding='utf8'))
    clone_base(to, d, man)
    shutil.rmtree(to / 'gsat' / 'exam', ignore_errors=True)
    with tarfile.open(d / 'exam-private.tar.gz') as t: t.extractall(to, filter='data')
    cur = manifest(to)
    bad = [r for r, m in man['files'].items() if cur.get(r, {}).get('sha256') != m['sha256']]
    print(f'已還原到 {to}:{len(cur)} 個私有檔案;不符 {len(bad)} 個' + ('' if not bad else ' ' + str(bad[:5])))
    return not bad


def main():
    ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest='cmd', required=True)
    c = sp.add_parser('create'); c.add_argument('--out', required=True)
    v = sp.add_parser('verify'); v.add_argument('--dir', required=True); v.add_argument('--no-worktree', action='store_true')
    r = sp.add_parser('restore'); r.add_argument('--dir', required=True); r.add_argument('--to', required=True)
    a = ap.parse_args()
    if a.cmd == 'create': create(a.out)
    elif a.cmd == 'verify': sys.exit(0 if verify(a.dir, not a.no_worktree) else 1)
    else: sys.exit(0 if restore(a.dir, a.to) else 1)


main()
