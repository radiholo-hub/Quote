#!/usr/bin/env python3
"""盤點 gsat/ 內容的來源與權利狀態，輸出 docs/gsat/content-manifest.json 與 CONTENT_INVENTORY.md。
只列檔名、分類、大小與 SHA-256，不含任何試題文字，可安全放在公開版本庫。
用法：python3 tools/gsat_inventory.py            （重新產生）
      python3 tools/gsat_inventory.py --check    （與現有清單比對，有檔案新增、消失或內容改變就回傳非 0）"""
import hashlib, json, pathlib, re, sys
from collections import Counter, defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[1]
G = ROOT / 'gsat'
OUT = ROOT / 'docs' / 'gsat'

# 分類 → (說明, 狀態)。licensed＝來自大學入學考試中心，依負責人回報的網站公開授權，隨網站公開（allowlist，見 tools/gsat_public_exams.py）；
# withheld＝來自大學入學考試中心的圖片，本版仍不公開（保守 allowlist）；unconfirmed＝沒有登記分類的檔案，視為未確認。
CATEGORIES = {
    'exam-text': ('大考中心歷屆試題文字（選擇題的題幹、選項、文章）', 'licensed'),
    'exam-answers': ('大考中心公布的選擇題答案', 'licensed'),
    'exam-index': ('非選擇題頁面的檔名索引與混合題多選題答案（只在非選擇題頁面使用，該頁面需要試卷圖片，本版不公開）', 'index'),
    'exam-figure': ('試題附圖（選項圖、地圖、照片；可能另含第三方圖片權利）', 'withheld'),
    'exam-paper-page': ('試卷非選擇題頁面圖片（混合題、中譯英、作文題目）', 'withheld'),
    'official-scoring-guide': ('大考中心非選擇題評分原則頁面圖片', 'withheld'),
    'derived-original': ('自行撰寫、針對真題的詳解（衍生內容，審核前一律標為草稿）', 'derived'),
    'exam-derived-index': ('由歷屆試題逐字計算出的單字出現索引（含年度、題號、位置，不含試題文字）', 'licensed'),
    'review-data': ('單字出現紀錄的人工審核結果（只有紀錄編號與判定，不含試題文字）', 'index'),
    'original-audio': ('原創內容（單字、搭配詞、原創例句、原創文章）的語音 mp3', 'original'),
    'original': ('原創內容（原創題、原創寫作練習、程式與設定）', 'original'),
}


def classify(rel):
    n = rel.as_posix()
    if n == 'exam/exams.js': return 'exam-text'
    if n == 'exam/answers.js': return 'exam-answers'
    if n in ('exam/nonmc.js', 'exam/mixed.js'): return 'exam-index'
    if n == 'exam/explain.js': return 'derived-original'
    if n == 'exam/vocab_index.js': return 'exam-derived-index'
    if n == 'exam/vocab_reviews.js': return 'review-data'
    if re.fullmatch(r'audio/[0-9a-f]+\.mp3', n): return 'original-audio'
    if re.fullmatch(r'exam/img/ns/\d+-q\d+\.jpg', n): return 'exam-paper-page'
    if re.fullmatch(r'exam/img/ns/\d+-ref\d+\.jpg', n): return 'official-scoring-guide'
    if n.startswith('exam/img/'): return 'exam-figure'
    if n.startswith('exam/'): return 'exam-unclassified'          # 新增在 exam/ 底下卻沒登記分類的檔案：視為未確認，並讓 --check 失敗
    return 'original'


def scan():
    files = []
    for p in sorted(G.rglob('*')):
        if not p.is_file() or '__pycache__' in p.parts or '.pytest_cache' in p.parts or p.name == '.gitignore' or 'tests' in p.relative_to(G).parts[:1]:
            continue
        rel = p.relative_to(G)
        cat = classify(rel)
        year = (re.match(r'(?:exam/img/(?:ns/)?)(\d{3})', rel.as_posix()) or [None, None])[1]
        files.append({'path': 'gsat/' + rel.as_posix(), 'category': cat, 'year': year, 'bytes': p.stat().st_size,
                      'sha256': hashlib.sha256(p.read_bytes()).hexdigest()})
    return files


def render_md(files):
    by = defaultdict(list)
    for f in files: by[f['category']].append(f)
    L = ['# 學測英文練習：內容來源與權利盤點', '',
         '> 由 `tools/gsat_inventory.py` 自動產生，請勿手改。只列檔名、分類、大小與雜湊，不含任何試題文字。', '',
         '## 摘要', '', '| 分類 | 說明 | 權利狀態 | 檔案數 | 大小 |', '|---|---|---|---:|---:|']
    for c, (desc, status) in CATEGORIES.items():
        fs = by.get(c, [])
        L.append(f'| `{c}` | {desc} | {({"unconfirmed": "**未確認**", "licensed": "已獲授權（網站公開）", "withheld": "本版不公開", "original": "原創", "derived": "衍生（原創撰寫）", "index": "索引"})[status]} | {len(fs)} | {sum(f["bytes"] for f in fs) / 1024:.0f} KB |')
    bad = by.get('exam-unclassified', [])
    if bad: L += ['', f'⚠️ 有 {len(bad)} 個檔案放在 `gsat/exam/` 卻沒有登記分類：' + ', '.join(f"`{f['path']}`" for f in bad)]
    st = lambda f: CATEGORIES.get(f['category'], ('', 'unconfirmed'))[1]
    lic, wh, unc = [f for f in files if st(f) == 'licensed'], [f for f in files if st(f) == 'withheld'], [f for f in files if st(f) == 'unconfirmed']
    L += ['', f'**隨網站公開的歷屆試題素材 {len(lic)} 個（選擇題文字、官方答案、出現索引）**，依負責人 2026-11-15 回報的「歷屆學測英文試題網站公開使用授權」；授權文件本身尚未存入本 repository。'
          f'**本版不公開的來自大考中心的圖片 {len(wh)} 個、{sum(f["bytes"] for f in wh) / 1024 / 1024:.1f} MB**（試題附圖、非選擇題試卷與評分原則頁面）。'
          + (f'另有 {len(unc)} 個檔案未分類，視為未確認。' if unc else ''),
          '', '公開輸出不是整個複製 `gsat/exam/`：`tools/stage_site.sh` 呼叫 `tools/gsat_public_exams.py`，只輸出六個檔（選擇題文字——需要附圖的題目移除圖片路徑並標記、官方答案、原創詳解、出現索引，以及非選擇題與混合題兩個空殼）；'
          '`img/`、`vocab_reviews.js` 與任何 pdf／jpg／png 都不進公開輸出。`GSAT_PUBLISH_EXAMS=0` 可緊急關閉，退回只放空殼。', '',
          '## 依學年度（來自大考中心的圖片檔）', '', '| 學年度 | 試題附圖 | 試卷非選擇題頁面 | 評分原則頁面 |', '|---|---:|---:|---:|']
    cnt = defaultdict(Counter)
    for f in files:
        if f['year']: cnt[f['year']][f['category']] += 1
    for y in sorted(cnt):
        c = cnt[y]; L.append(f'| {y} | {c["exam-figure"]} | {c["exam-paper-page"]} | {c["official-scoring-guide"]} |')
    L += ['', '## 來源', '',
          '- 試題：大學入學考試中心「學科能力測驗」英文考科試卷，106–115 學年度',
          '- 答案：同單位公布的「英文考科選擇題答案」（106–115）',
          '- 評分原則：同單位公布的「非選擇題評分原則（閱卷評分原則說明）」（106–115）',
          '- 以上檔案由使用者提供；網站公開授權依負責人 2026-11-15 的回報，本專案尚未查證大考中心的書面授權條款（開發環境無法連到 ceec.edu.tw）。', '',
          '## 逐檔清單', '', '完整清單見 `content-manifest.json`（來自大考中心的檔案含 SHA-256，原創檔案只記檔名）。']
    return '\n'.join(L) + '\n'


def main():
    files = scan()
    # 原創檔案只記檔名與分類（程式碼常常修改，不必每次重新產生）；來自大考中心的內容才記大小與 SHA-256，用來確認清理是否完整
    trimmed = [f if f['category'] not in ('original', 'original-audio') else {'path': f['path'], 'category': f['category']} for f in files]
    manifest = {'note': '只含檔名與雜湊，不含試題內容；原創檔案只記檔名', 'files': trimmed}
    OUT.mkdir(parents=True, exist_ok=True)
    mj, md = OUT / 'content-manifest.json', OUT / 'CONTENT_INVENTORY.md'
    if '--check' in sys.argv:
        old = json.loads(mj.read_text(encoding='utf8')) if mj.exists() else {}
        if old != manifest or any(f['category'] == 'exam-unclassified' for f in files):
            print('清單與實際檔案不符或有未分類檔案，請重新執行 tools/gsat_inventory.py 並檢查', file=sys.stderr); sys.exit(1)
        print('清單與實際檔案一致'); return
    mj.write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
    md.write_text(render_md(files), encoding='utf8')
    print(f'{len(files)} 個檔案；未確認 {sum(1 for f in files if CATEGORIES.get(f["category"], ("", "unconfirmed"))[1] == "unconfirmed")} 個，本版不公開 {sum(1 for f in files if CATEGORIES.get(f["category"], ("", ""))[1] == "withheld")} 個')


main()
