#!/usr/bin/env python3
"""把大考中心學測英文試卷 PDF 轉出的文字（pdftotext -layout）解析成 gsat/exams.js 用的 JSON。
用法：parse_gsat.py 年度=文字檔 ... > exams.json     只解析選擇題；混合題與非選擇題不在這裡處理。"""
import json, re, sys

SECTION_TYPES = [('詞彙', 'vocab'), ('綜合測驗', 'cloze'), ('文意選填', 'bank'), ('篇章結構', 'structure'), ('閱讀測驗', 'reading')]
NAMES = {'vocab': '詞彙', 'cloze': '綜合測驗', 'bank': '文意選填', 'structure': '篇章結構', 'reading': '閱讀測驗'}


def is_noise(line):
    c = re.sub(r'\s+', '', line)
    return (not c) or re.fullmatch(r'-?\d+-?', c) or ('年學測' in c and re.search(r'頁|英文', c)) \
        or re.fullmatch(r'(英文考科)?共\d+頁(英文考科)?', c) or re.fullmatch(r'第\d+頁', c) or c in ('英文考科', '背面尚有試題')


def clean_lines(text):
    text = text.replace('\uf0e0', ' → ')
    out = []
    for l in text.split('\n'):
        if re.sub(r'\s+', '', l) and is_noise(l):
            continue
        out.append(l.rstrip())
    return out


def options_of(text, letters):
    """text 內 (A)(B)... 依序切開，回傳 (stem, [選項])"""
    pos = []
    start = 0
    for L in letters:
        m = re.compile(r'\(\s*%s\s*\)' % L).search(text, start)
        if not m:
            break
        pos.append((L, m.start(), m.end()))
        start = m.end()
    if len(pos) != len(letters):
        return text.strip(), []
    opts = []
    for i, (L, s, e) in enumerate(pos):
        end = pos[i + 1][1] if i + 1 < len(pos) else len(text)
        o = re.sub(r'\s{2,}', ' → ', text[e:end].strip()) if re.search(r'\S\s{2,}\S', text[e:end].strip()) else text[e:end].strip()
        opts.append(re.sub(r'\s+', ' ', o) if ' → ' not in o else o)
    return text[:pos[0][1]].strip(), opts


def join_lines(parts):
    """換行合併；行尾是連字號且下一行以小寫字母開頭（Hay-/on-Wye）就不補空格。"""
    out = ''
    for p in parts:
        p = p.strip()
        if out and re.search(r'[A-Za-z]-$', out) and re.match(r'[a-z]', p): out += p
        else: out += (' ' if out else '') + p
    return out


def paragraphs(lines):
    ls = [l for l in lines]
    ind = [len(l) - len(l.lstrip()) for l in ls if l.strip()]
    base = min(ind) if ind else 0
    paras, cur = [], []
    for l in ls:
        if not l.strip():
            if cur: paras.append(join_lines(cur)); cur = []
            continue
        if len(l) - len(l.lstrip()) - base >= 2 and cur:
            paras.append(join_lines(cur)); cur = []
        cur.append(l.strip())
    if cur: paras.append(join_lines(cur))
    return [re.sub(r'\s+', ' ', p) for p in paras]


def mark_blanks(paras, nums):
    text = '\n'.join(paras)
    miss = []
    for n in nums:
        pat = re.compile(r'(?<![\d.,$])\b%d\b(?![\d%%.,]?\d)' % n)
        text, k = pat.subn('【%d】' % n, text, count=1)
        if not k: miss.append(n)
    return re.sub(r'[ \t]+', ' ', text).replace(' \n', '\n').split('\n'), miss


def parse(year, text):
    lines = clean_lines(text)
    # 選擇題到「第貳部分」之前
    end = len(lines)
    for i, l in enumerate(lines):
        if re.match(r'^第貳部分[：、]', re.sub(r'\s', '', l)):
            end = i; break
    lines = lines[:end]
    sections, sec, grp = [], None, None
    for l in lines:
        c = re.sub(r'\s', '', l)
        m = re.match(r'^[一二三四五六]、(\S+?)（', c)
        if m:
            t = next((v for k, v in SECTION_TYPES if k in m.group(1)), None)
            if t:
                sec = {'type': t, 'name': NAMES[t], 'groups': []}
                sections.append(sec); grp = None
                if t in ('vocab',):
                    grp = {'nums': [], 'raw': []}; sec['groups'].append(grp)
                continue
        if sec is None: continue
        m = re.match(r'^第(\d+)至(\d+)題為題組', c)
        if m:
            grp = {'nums': list(range(int(m.group(1)), int(m.group(2)) + 1)), 'raw': []}
            sec['groups'].append(grp); continue
        if grp is not None: grp['raw'].append(l)
    exam = {'year': year, 'sections': []}
    nxt_vocab = 1
    for sec in sections:
        out = {'type': sec['type'], 'name': sec['name'], 'groups': []}
        for g in sec['groups']:
            raw = g['raw']
            if sec['type'] == 'vocab':
                qs = split_questions(raw, 1, None)
                out['groups'].append({'questions': qs}); continue
            nums = g['nums']
            if sec['type'] in ('cloze', 'reading'):
                fi = next(i for i, l in enumerate(raw) if re.match(r'^\s*%d\.\s' % nums[0], l))
                passage, qraw = raw[:fi], raw[fi:]
                qs = split_questions(qraw, nums[0], nums[-1])
                grp = {'passage': paragraphs(passage), 'questions': qs}
                if sec['type'] == 'cloze':
                    grp['passage'], miss = mark_blanks(grp['passage'], nums)
                    if miss: grp['missing_blanks'] = miss
            else:  # bank / structure：文章後面接選項
                fi = next(i for i, l in enumerate(raw) if re.match(r'^\s*\(\s*A\s*\)', l))
                passage, oraw = raw[:fi], raw[fi:]
                joined = ' '.join(x.strip() for x in oraw if x.strip())
                # 文意選填 10 個選項；篇章結構 4 個，115 年起多一個干擾選項共 5 個
                for letters in (['ABCDEFGHIJ'] if sec['type'] == 'bank' else ['ABCDE', 'ABCD']):
                    _, opts = options_of(joined, letters)
                    if opts: break
                p, miss = mark_blanks(paragraphs(passage), nums)
                grp = {'passage': p, 'bank': opts, 'questions': [{'n': n} for n in nums]}
                if miss: grp['missing_blanks'] = miss
            out['groups'].append(grp)
        exam['sections'].append(out)
    return exam


def split_questions(raw, first, last):
    idx, n = [], first
    for i, l in enumerate(raw):
        if re.match(r'^\s*%d\.\s' % n, l) and (last is None or n <= last):
            idx.append((n, i)); n += 1
    qs = []
    for k, (n, i) in enumerate(idx):
        j = idx[k + 1][1] if k + 1 < len(idx) else len(raw)
        block = [re.sub(r'^\s*%d\.\s+' % n, '', raw[i])] + raw[i + 1:j]
        block = [b for b in block if b.strip()]
        # 保留 a. b. c. 清單的換行
        buf = []
        for b in block:
            if re.match(r'^\s*[a-f]\.\s', b) and buf: buf.append('\n' + b.strip())
            else: buf.append(' ' + b.strip())
        stem, opts = options_of(''.join(buf).strip(), 'ABCD')
        qs.append({'n': n, 'stem': re.sub(r'[ \t]+', ' ', stem), 'opts': opts})
    return qs


# 題目要用到圖片的選擇題（圖片用 pdfimages 從試卷 PDF 抽出，放在 gsat/img/）
IMAGES = {('109', 41): {'img': 'img/109-41.png'},
          ('111', 35): {'optImgs': ['img/111-35-%s.jpg' % L for L in 'ABCD']},
          # 2×2 的圖片格選項：整格裁成一張圖，選項只標 A 到 D
          ('110', 49): {'img': 'img/110-fig.jpg', 'opts': ['圖 A', '圖 B', '圖 C', '圖 D']},
          ('113', 35): {'img': 'img/113-fig.jpg', 'opts': ['圖 A', '圖 B', '圖 C', '圖 D']},
          ('114', 36): {'img': 'img/114-fig.jpg', 'opts': ['圖 A', '圖 B', '圖 C', '圖 D']},
          ('115', 38): {'img': 'img/115-fig.jpg', 'opts': ['圖 A', '圖 B', '圖 C', '圖 D']}}


def add_images(exams):
    for e in exams:
        for s in e['sections']:
            for g in s['groups']:
                for q in g['questions']:
                    q.update(IMAGES.get((e['year'], q['n']), {}))
                    if 'optImgs' in q:
                        q['opts'] = ['(圖)'] * 4


if __name__ == '__main__':
    res = []
    for a in sys.argv[1:]:
        y, f = a.split('=', 1)
        res.append(parse(y, open(f, encoding='utf8').read()))
    add_images(res)
    json.dump(res, sys.stdout, ensure_ascii=False, separators=(',', ':'))
