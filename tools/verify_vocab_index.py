#!/usr/bin/env python3
"""獨立核對歷屆出現索引：不看題庫資料，直接用正規表示式數「原始試卷 PDF 轉出的文字」裡每個詞條詞形的出現次數，
對照 gsat/exam/vocab_index.js 的（已確認 + 待審核）次數，逐詞條、逐學年比對。
用法：python3 tools/verify_vocab_index.py --txt-dir <放 106.txt … 115.txt 的資料夾>
      文字檔用  pdftotext -layout 試卷.pdf 年度.txt  產生（只取選擇題部分：詞彙題開頭到「第貳部分」之前）。"""
import argparse, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
JS = """global.window={};for (const f of ['data/vocab.js','exam/vocab_index.js']) require(process.argv[1]+'/gsat/'+f);
console.log(JSON.stringify({vocab:window.VOCAB,index:window.VOCAB_INDEX}));"""


def mc_part(text):
    t = text.replace('’', "'")
    a = re.search(r'一\s*、\s*詞\s*彙', t)
    b = re.search(r'第\s*貳\s*部\s*分\s*[：、]', t[a.end():] if a else t)
    start = a.start() if a else 0
    return t[start: (a.end() + b.start()) if (a and b) else len(t)]


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--txt-dir', required=True); a = ap.parse_args()
    d = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    texts = {y: mc_part((pathlib.Path(a.txt_dir) / f'{y}.txt').read_text(encoding='utf8')) for y in d['index']['meta']['years']}
    bad, checked, grand = [], 0, 0
    for eid, e in d['vocab']['entries'].items():
        forms = sorted(e['forms'], key=len, reverse=True)
        pat = re.compile(r"(?<![A-Za-z'])(?:%s)(?![A-Za-z'])" % '|'.join(map(re.escape, forms)), re.I)
        ie = d['index']['entries'][eid]
        idx_year = {}
        for r in ie['records'] + ie['review'] + ie.get('rejected', []):
            idx_year[r['y']] = idx_year.get(r['y'], 0) + r['c']
        for y, t in texts.items():
            raw = len(pat.findall(t)); got = idx_year.get(y, 0); checked += 1; grand += raw
            if raw != got: bad.append((eid, y, raw, got))
    print(f"核對 {checked} 個「詞條 × 學年」;原始文字共 {grand} 次;不一致 {len(bad)} 筆")
    for b in bad: print('  不一致:', b)
    sys.exit(1 if bad else 0)


main()
