#!/usr/bin/env python3
"""產生「公開網站用」的 gsat/exam/ 內容（allowlist，不是整個資料夾直接複製）。

背景：負責人已回報大考中心歷屆試題的網站公開使用授權，所以選擇題的文字、官方答案、原創詳解與出現索引可以隨網站發布。
這一版仍採保守 allowlist：大考中心的試題圖片、非選擇題的試卷與評分原則頁面圖片、PDF、人工審核原始資料都不公開；
需要附圖的題目只使用自行繪製的原創替代圖（見 REPLACEMENTS，圖片 allowlist）。

公開輸出（<out>/）只會有這六個檔，檔名與 gsat/index.html 載入的一致：
  exams.js        選擇題文字。需要附圖才能作答的題目：有 REPLACEMENTS 登記的，換成 gsat/data/figures/ 的原創替代圖（標 imgSource）；沒有登記的
                  移除圖片路徑並標 figureWithheld: true，而且預設會讓整理失敗（不允許上線一個看不到附圖卻照常計分的題目）
  answers.js      官方選擇題答案（資料逐字複製，只拿掉開頭的維護者註解）
  explain.js      原創詳解（只輸出 status=reviewed 的題目；AI 草稿一律不公開，見 reviewed_only）
  vocab_index.js  單字出現索引（同上；只有年度、題號、位置，不含試題文字）
  nonmc.js        空殼：非選擇題頁面只有圖片，圖片不公開，所以不放路徑
  mixed.js        空殼：混合題的多選題答案只在非選擇題頁面使用，該頁面需要試卷圖片
沒有列在這裡的檔案（img/、vocab_reviews.js、任何 pdf／jpg／png／html／zip／txt、簽核與審核工具）一律不複製。

用法：python3 tools/gsat_public_exams.py <來源 gsat/exam 資料夾> <輸出資料夾>（輸出資料夾必須不存在）
      python3 tools/gsat_public_exams.py --safe-shell <輸出資料夾>   只輸出六個空殼（緊急關閉開關：GSAT_PUBLISH_EXAMS=0 時使用）
      python3 tools/gsat_public_exams.py --check-site <公開輸出的 gsat/>   檢查整個公開輸出：只有 allowlist 的替代圖、圖片檔存在、沒有 PDF／審核檔"""
import json
import pathlib
import re
import shutil
import sys

COPIED = ('answers.js', 'explain.js', 'vocab_index.js')
# 圖片 allowlist：需要附圖才能作答的題目，改用「原創替代圖」（自行重新繪製的向量圖，放在 gsat/data/figures/，不是大考中心原圖）。
# 只有這裡列出的圖才會進公開輸出；沒有列在這裡、又需要附圖的題目會標 figureWithheld（stage_site.sh 預設遇到就整理失敗）。
# 每一張替代圖都保留該題作答需要的資訊，不改變官方答案（答案仍來自 answers.js 的官方答案，選項代號 A–D 不變）。
REPLACEMENTS = {
    ('109', 41): 'data/figures/109-41.svg',   # 涼鞋的趾間帶子位置（第二與第三趾之間）
    ('110', 49): 'data/figures/110-49.svg',   # 四種樂器：玻璃杯排列、編鐘、紡織機、玻璃半球疊合在橫桿上並連接輪子與踏板
    ('111', 35): 'data/figures/111-35.svg',   # 四個站立人物：服飾（包裹式 shúkà）、長矛、盾牌、串珠；只有 B 同時具備文章列出的 warrior 特徵
    ('112', 44): 'data/figures/112-44.svg',   # 非洲、歐亞與印度洋的簡化地圖，四個標記 A–D 的相對位置
    ('113', 35): 'data/figures/113-35.svg',   # 四種扣合用品：按扣、鉤毛黏扣帶、彈簧繩與掛勾、鉤扣布帶
    ('114', 36): 'data/figures/114-36.svg',   # 四種交通號誌：人像燈座、兩根橫桿、燈籠加兩根下斜活動臂、STOP/GO 箱
    ('115', 38): 'data/figures/115-38.svg',   # 威德爾海四條航行路線（含方向）與 South Georgia、Elephant Island 位置
}
FIGURE_SOURCE = 'original replacement illustration'
FIGURE_FILES = sorted(pathlib.Path(v).name for v in REPLACEMENTS.values())
SHELLS = {'nonmc.js': 'window.NONMC={};\n', 'mixed.js': 'window.MIXED={};\n'}
SAFE_SHELL = {'exams.js': 'window.EXAMS=[];\n', 'answers.js': 'window.ANSWERS={};\n', 'nonmc.js': 'window.NONMC={};\n',
              'explain.js': 'window.EXPLAIN={};\n', 'mixed.js': 'window.MIXED={};\n', 'vocab_index.js': 'window.VOCAB_INDEX=null;\n'}
IMG_RE = re.compile(r'\.(jpe?g|png|gif|webp|pdf)\b|exam/img|\.svg\b', re.I)
REPL_RE = re.compile(r'"img":"(data/figures/[0-9-]+\.svg)"')
HEADER = ('// 公開版歷屆學測英文選擇題（由 tools/gsat_public_exams.py 自 gsat/exam/exams.js 產生，勿手改）。\n'
          '// 需要附圖才能作答的題目已移除圖片路徑並標上 figureWithheld:true（圖片本版不公開）。\n')


def load_exams(path):
    s = pathlib.Path(path).read_text(encoding='utf8')
    m = re.search(r'window\.EXAMS\s*=\s*', s)
    if not m:
        raise SystemExit('exams.js 格式不符：找不到 window.EXAMS =')
    return json.loads(s[m.end():].strip().rstrip(';'))


def withhold_figures(exams):
    """有原創替代圖的題目：換成替代圖並標示來源；其餘需要附圖的題目移除圖片欄位並標 figureWithheld。
    回傳 (被標記為不公開的 [(年度, 題號, 欄位)], 換成替代圖的 [(年度, 題號)])。"""
    hit, replaced = [], []
    for ex in exams:
        for sec in ex['sections']:
            for g in sec['groups']:
                for key in ('img', 'imgs', 'optImgs'):
                    if key in g:
                        raise SystemExit(f'{ex["year"]} 學年度有文章層級的圖片欄位 {key}，請先決定怎麼處理再發布')
                for q in g['questions']:
                    kinds = [k for k in ('img', 'optImgs') if k in q]
                    for k in kinds:
                        del q[k]
                    if not kinds:
                        continue
                    rp = REPLACEMENTS.get((ex['year'], q['n']))
                    if rp:
                        q['img'] = rp
                        q['imgSource'] = FIGURE_SOURCE
                        replaced.append((ex['year'], q['n']))
                    else:
                        q['figureWithheld'] = True
                        hit.append((ex['year'], q['n'], '+'.join(kinds)))
    return hit, replaced


def public_copy(path):
    """逐字複製資料本體；只拿掉檔案開頭那段給維護者看的 // 註解（含內部審核流程的說明），資料行完全不動。"""
    lines = pathlib.Path(path).read_text(encoding='utf8').splitlines(keepends=True)
    i = 0
    while i < len(lines) and (lines[i].startswith('//') or not lines[i].strip()):
        i += 1
    if i >= len(lines) or not lines[i].startswith('window.'):
        raise SystemExit(f'{pathlib.Path(path).name} 開頭格式不符：註解之後應該直接是 window.…')
    body = ''.join(lines[i:])
    if pathlib.Path(path).name == 'explain.js':
        body = reviewed_only(body)
    return '// 公開版資料（由 tools/gsat_public_exams.py 自 gsat/exam 複製，勿手改）。\n' + body


# 公開詳解的欄位白名單（學生端 gsat/learn.js、app.js 實際用到的欄位）。教師審核流程的欄位只存在於來源，不進公開輸出：
# aiFlags 是 AI 作者留給教師的「需確認」提示，reviewer／reviewedAt／reviewNotes 是審核紀錄（簽核狀態以 docs/gsat/signoffs/ 為準）。
# 兩份清單以外的欄位一律讓整理失敗（fail-closed）：新增欄位時必須明確決定它屬於公開還是內部。
PUBLIC_EXPLAIN_FIELDS = ('schema', 'answer', 'status', 'key', 'options', 'notes', 'words', 'phrases', 'patterns', 'grammar', 'zh', 'focus')
INTERNAL_EXPLAIN_FIELDS = ('aiFlags', 'reviewer', 'reviewedAt', 'reviewNotes')


def _reject_nested_internal(qid, value, path):
    """內部欄位不得藏在公開欄位的巢狀物件或陣列裡（任何層級）。"""
    if isinstance(value, dict):
        for k, v in value.items():
            if k in INTERNAL_EXPLAIN_FIELDS:
                raise SystemExit(f'explain.js 題號 {qid} 的 {path}.{k} 是教師內部欄位，不能出現在公開欄位的巢狀內容裡')
            _reject_nested_internal(qid, v, f'{path}.{k}')
    elif isinstance(value, list):
        for i, v in enumerate(value):
            _reject_nested_internal(qid, v, f'{path}[{i}]')


def public_explain_entry(qid, entry):
    """已審核詳解的公開版本：只保留白名單欄位（內容與順序逐字照來源），移除教師內部欄位；遇到未知欄位或巢狀內部欄位就整理失敗。"""
    unknown = [f for f in entry if f not in PUBLIC_EXPLAIN_FIELDS and f not in INTERNAL_EXPLAIN_FIELDS]
    if unknown:
        raise SystemExit(f'explain.js 題號 {qid} 有未知欄位：{"、".join(unknown)}。請先決定它是公開欄位還是教師內部欄位，'
                         f'再更新 tools/gsat_public_exams.py 的 PUBLIC_EXPLAIN_FIELDS／INTERNAL_EXPLAIN_FIELDS')
    out = {f: v for f, v in entry.items() if f in PUBLIC_EXPLAIN_FIELDS}
    for f, v in out.items():
        _reject_nested_internal(qid, v, f)
    return out


def reviewed_only(body):
    """explain.js 裡的 AI 草稿（status 不是 reviewed）不公開：預設拒絕，只有教師已簽核（reviewed）的題目才進公開輸出。
    已簽核題目只輸出白名單欄位（教師內部欄位移除，其餘內容逐字不動；json 重新輸出，縮排格式與來源相同）。"""
    m = re.match(r'window\.EXPLAIN\s*=\s*', body)
    if not m:
        raise SystemExit('explain.js 格式不符：找不到 window.EXPLAIN =')
    data = json.loads(body[m.end():].strip().rstrip(';'))
    keep = {k: public_explain_entry(k, v) for k, v in data.items() if isinstance(v, dict) and v.get('status') == 'reviewed'}
    return 'window.EXPLAIN = ' + json.dumps(keep, ensure_ascii=False, indent=1) + ';\n'


def build(src, out, allow_withheld=False):
    src, out = pathlib.Path(src), pathlib.Path(out)
    if out.exists():
        raise SystemExit(f'{out} 已存在')
    if src.resolve() == out.resolve() or src.resolve() in out.resolve().parents:
        raise SystemExit('輸出資料夾不可以放在來源 gsat/exam 裡面（這個工具只能寫到別處，絕不改動來源的簽核與試題資料）')
    exams = load_exams(src / 'exams.js')
    hit, replaced = withhold_figures(exams)
    if hit and not allow_withheld:
        raise SystemExit('以下題目需要附圖才能作答，卻沒有原創替代圖或已確認可公開的圖片：' + '、'.join(f'{y}-{n}' for y, n, _ in hit)
                         + '。正式發布不可以有「正常計分但看不到附圖」的題目；請補上替代圖，或先停止並回報老師（測試用途可設 GSAT_ALLOW_WITHHELD_FIGURES=1）')
    out.mkdir(parents=True)
    body = json.dumps(exams, ensure_ascii=False, separators=(',', ':'))
    (out / 'exams.js').write_text(HEADER + 'window.EXAMS = ' + body + ';\n', encoding='utf8')
    for f in COPIED:
        (out / f).write_text(public_copy(src / f), encoding='utf8')
    for f, text in SHELLS.items():
        (out / f).write_text(text, encoding='utf8')
    problems = check(out)
    if problems:
        shutil.rmtree(out)
        raise SystemExit('公開輸出檢查失敗：\n  ' + '\n  '.join(problems))
    return hit, replaced


def check(out):
    """輸出只能有 allowlist 的六個檔，內容不得含圖片或 PDF 路徑。"""
    out = pathlib.Path(out)
    names = sorted(p.name for p in out.rglob('*'))
    bad = []
    if names != sorted(set(COPIED) | set(SHELLS) | {'exams.js'}):
        bad.append('檔案清單不符 allowlist：' + ', '.join(names))
    for p in out.rglob('*'):
        if not p.is_file():
            continue
        text = p.read_text(encoding='utf8')
        if p.name == 'exams.js':
            text = REPL_RE.sub('"img":"<allowlisted>"', text)           # 只有 allowlist 的替代圖路徑可以出現
            used = sorted(pathlib.Path(m).name for m in REPL_RE.findall(p.read_text(encoding='utf8')))
            if not set(used) <= set(FIGURE_FILES):
                bad.append('exams.js 引用了不在 allowlist 的圖片：' + ', '.join(sorted(set(used) - set(FIGURE_FILES))))
        if IMG_RE.search(text):
            bad.append(f'{p.name} 含有圖片或 PDF 路徑')
    return bad


def check_site(gsat_out):
    """檢查整個公開輸出的 gsat/：圖片只能是 allowlist 的替代圖、而且 exams.js 引用的圖片檔真的存在；PDF、點陣圖、審核檔一律不可以出現。"""
    g = pathlib.Path(gsat_out)
    bad = []
    imgs = sorted(p for p in g.rglob('*') if p.is_file() and p.suffix.lower() in ('.svg', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'))
    for p in imgs:
        rel = p.relative_to(g).as_posix()
        if not (rel.startswith('data/figures/') and p.suffix.lower() == '.svg' and p.name in FIGURE_FILES):
            bad.append('不在 allowlist 的圖片或 PDF：' + rel)
    for p in g.rglob('*'):
        if p.is_file() and (p.suffix.lower() in ('.zip', '.pdf') or re.match(r'review-\d+', p.name, re.I) or p.name == 'vocab_reviews.js' or p.name.startswith('Q') and p.suffix.lower() in ('.html', '.txt', '.zip')):
            bad.append('不可公開的審核或壓縮檔：' + p.relative_to(g).as_posix())
    ex = g / 'exam' / 'exams.js'
    if ex.is_file():
        for m in REPL_RE.findall(ex.read_text(encoding='utf8')):
            if not (g / m).is_file():
                bad.append('exams.js 引用的圖片不存在：' + m)
    return bad


def safe_shell(out):
    out = pathlib.Path(out)
    if out.exists():
        raise SystemExit(f'{out} 已存在')
    out.mkdir(parents=True)
    for f, text in SAFE_SHELL.items():
        (out / f).write_text(text, encoding='utf8')


def main(argv):
    if len(argv) == 3 and argv[1] == '--safe-shell':
        safe_shell(argv[2]); print('已輸出空殼'); return 0
    if len(argv) == 3 and argv[1] == '--check-site':
        bad = check_site(argv[2])
        if bad:
            print('公開輸出的圖片檢查失敗：\n  ' + '\n  '.join(bad), file=sys.stderr); return 1
        print('公開輸出的圖片檢查通過'); return 0
    if len(argv) != 3:
        print(__doc__); return 2
    import os
    hit, replaced = build(argv[1], argv[2], allow_withheld=os.environ.get('GSAT_ALLOW_WITHHELD_FIGURES') == '1')
    print(f'已輸出公開版歷屆試題；{len(replaced)} 題換成原創替代圖（' + '、'.join(f'{y}-{n}' for y, n in replaced) + f'）；{len(hit)} 題因附圖未公開而標記 figureWithheld：' + '、'.join(f'{y}-{n}' for y, n, _ in hit))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
