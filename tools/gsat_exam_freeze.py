#!/usr/bin/env python3
"""凍結「權利尚未確認的考題素材」:公開版本庫不得再新增或改動這些檔案。
  --check   (預設) 比對 docs/gsat/exam-freeze.json:gsat/exam/ 下多了任何檔案、少了檔案、或原始考題檔(exams/answers/nonmc/mixed/img)內容改變,就以 1 結束並說明。
  --write   重新寫入凍結清單。這等於「核准新增/更動考題素材」,只能在負責人明確同意後執行。
衍生內容(explain.js、vocab_index.js、vocab_reviews.js)只凍結檔名,不比內容:它們是詳解審核流程會持續更新的草稿,
但仍然屬於未確認權利的一組,清理方案會和真題一起移到私有保存。
清單只有檔名與 sha256,不含任何試題文字。"""
import hashlib, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
FREEZE = ROOT / 'docs' / 'gsat' / 'exam-freeze.json'
DERIVED = {'gsat/exam/explain.js', 'gsat/exam/vocab_index.js', 'gsat/exam/vocab_reviews.js'}


def current():
    files = {p.relative_to(ROOT).as_posix(): p for p in sorted((ROOT / 'gsat' / 'exam').rglob('*')) if p.is_file()} if (ROOT / 'gsat' / 'exam').exists() else {}
    return {rel: (None if rel in DERIVED else hashlib.sha256(p.read_bytes()).hexdigest()) for rel, p in files.items()}


def problems():
    if not (ROOT / 'gsat' / 'exam').exists() or not any((ROOT / 'gsat' / 'exam').iterdir()): return []      # 乾淨分支:沒有考題素材,沒有東西要凍結
    frozen = json.loads(FREEZE.read_text(encoding='utf8'))['files']
    cur = current(); bad = []
    for rel in sorted(set(cur) - set(frozen)): bad.append(f'新增了考題素材:{rel}')
    for rel in sorted(set(frozen) - set(cur)): bad.append(f'考題素材被移除或改名:{rel}')
    for rel in sorted(set(cur) & set(frozen)):
        if frozen[rel] is not None and cur[rel] != frozen[rel]: bad.append(f'原始考題檔內容被改動:{rel}')
    return bad


def main():
    if '--write' in sys.argv:
        FREEZE.write_text(json.dumps({'note': '權利尚未確認的考題素材凍結清單;只有檔名與 sha256。新增或更動必須先取得負責人明確同意,再用 tools/gsat_exam_freeze.py --write 更新。', 'files': current()}, indent=1, sort_keys=True) + '\n', encoding='utf8')
        print(f'已寫入 {FREEZE.relative_to(ROOT)}:{len(current())} 個檔案'); return
    bad = problems()
    for b in bad: print('✗', b)
    print('考題素材與凍結清單一致' if not bad else '違反凍結規則:不得向公開版本庫新增或改動考題素材(需負責人明確同意後以 --write 更新)')
    sys.exit(1 if bad else 0)


main()
