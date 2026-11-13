"""模擬試題：第 1 回題目免費、詳解付費；第 2、3 回整份付費。

  python3 score-rescue/tools/split_exams.py

公開（score-rescue/index.html）
  - 第 1 回：題目、選項、正解、分類（算 Part 表現和弱點用）；5 題示範詳解（DEMO）完整保留
  - 第 2、3 回：清空（EXAM2_*／EXAM3_* 是空陣列；題庫 RAW 裡那 60 列換成佔位列，保留題號不變）
私有（score-rescue/private/exams.json → 上傳到 Supabase lessons 儲存桶）
  - 三回的完整內容：第 1 回的詳解、翻譯、依據；第 2、3 回的全部題目與詳解
付費帳號登入後由首頁下載並合併（mergePaidExams）。

第一次執行時從目前的完整首頁抽出內容，存成 private/exams.json；之後重跑會以 private/exams.json 為準。
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = ROOT / 'index.html'
PRIV = ROOT / 'private'
SRC = PRIV / 'exams.json'

# 5 題示範詳解：所有人都看得到（老師審過可再換）
DEMO = {
    'p5': ['Employees ___ in the wellness program will receive a discounted gym membership.',
           'To give staff extra time with their families, the store will close early ___ the holiday.'],
    'p6': [[2, 2]],              # [文章序號, 空格序號]（從 0 起算）：商務信函 your ___ → patience
    'p7': [[0, 0], [11, 1]],     # [題組序號, 題目序號]：單篇 email 主旨題、雙篇推論題
}
P5_PRIVATE = (4, 5, 7, 8, 9, 10, 11)   # RAW 欄位：c 線索、d 詳解、tr 中譯、y 為什麼、w 錯誤選項、n 提醒、k 關鍵字
MARK = 'const EXAM_PRIVATE_FILE='


def js_array(s, name):
    m = re.search(r'const %s=(\[.*?\]);\n' % name, s, re.S)
    if not m:
        sys.exit('找不到 const %s' % name)
    return json.loads(m.group(1)), m


def set_array(s, name, value):
    _, m = js_array(s, name)
    return s[:m.start()] + 'const %s=%s;\n' % (name, json.dumps(value, ensure_ascii=False, separators=(',', ':'))) + s[m.end():]


def extract(s):
    raw, _ = js_array(s, 'RAW')
    out = {'v': 1, 'rows': {}}
    for n in (1, 2, 3):
        texts, _ = js_array(s, 'EXAM%d_P5_TEXTS' % n)
        p6, _ = js_array(s, 'EXAM%d_P6' % n)
        p7, _ = js_array(s, 'EXAM%d_P7' % n)
        if not texts:
            sys.exit('第 %d 回已經是空的：請改用 private/exams.json' % n)
        out['exam%d' % n] = {'p5': texts, 'p6': p6, 'p7': p7}
        for t in texts:
            ids = [i for i, r in enumerate(raw) if r[1] == t]
            assert len(ids) == 1, t
            out['rows'][str(ids[0])] = raw[ids[0]]
    return out


def strip_p6(p6, keep):
    res = []
    for pi, p in enumerate(p6):
        demo_here = [bi for (dp, bi) in keep if dp == pi]
        q = {'title': p['title'], 'text': p['text'], 'blanks': []}
        if demo_here:
            q['translation'] = p.get('translation', '')
        for bi, b in enumerate(p['blanks']):
            nb = {'o': b['o'], 'a': b['a'], 'tag': b['tag']}
            if bi in demo_here:
                nb.update({'explain': b.get('explain', ''), 'tr': b.get('tr', ''), 'demo': True})
            q['blanks'].append(nb)
        res.append(q)
    return res


def strip_p7(p7, keep):
    res = []
    for si, st in enumerate(p7):
        demo_here = [qi for (ds, qi) in keep if ds == si]
        ns = {k: st[k] for k in st if k not in ('passages', 'questions')}
        ns['passages'] = [{k: p[k] for k in p if k != 'translation' or demo_here} for p in st['passages']]
        ns['questions'] = []
        for qi, q in enumerate(st['questions']):
            nq = {'q': q['q'], 'o': q['o'], 'a': q['a'], 'skill': q['skill']}
            if qi in demo_here:
                nq.update({k: q[k] for k in ('explain', 'ev', 'para') if k in q})
                nq['demo'] = True
            ns['questions'].append(nq)
        res.append(ns)
    return res


def main():
    s = PAGE.read_text(encoding='utf-8')
    if MARK in s:
        if not SRC.exists():
            sys.exit('首頁已拆分，但找不到 %s' % SRC)
        data = json.loads(SRC.read_text(encoding='utf-8'))
    else:
        data = extract(s)
        PRIV.mkdir(exist_ok=True)
        SRC.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

    # 題庫 RAW：第 1 回去掉詳解欄位（示範題保留）；第 2、3 回換成佔位列（題號不變，練習紀錄不受影響）
    raw, _ = js_array(s, 'RAW')
    e1 = set(data['exam1']['p5'])
    for sid, full in data['rows'].items():
        i = int(sid)
        if full[1] in e1:
            row = list(full)
            if full[1] not in DEMO['p5']:
                for k in P5_PRIVATE:
                    row[k] = None
            raw[i] = row
        else:
            raw[i] = [full[0], '\u0000exam-row-%d' % i, [], 0, None, None, full[6], None, None, None, None, None, full[12] if len(full) > 12 else 0]   # 保留分類、難度、保留題標記（練習紀錄與難度表要對得上）
    s = set_array(s, 'RAW', raw)
    for t in DEMO['p5']:
        assert t in e1, t

    e = data['exam1']
    s = set_array(s, 'EXAM1_P5_TEXTS', e['p5'])
    s = set_array(s, 'EXAM1_P6', strip_p6(e['p6'], DEMO['p6']))
    s = set_array(s, 'EXAM1_P7', strip_p7(e['p7'], DEMO['p7']))
    for n in (2, 3):
        for part in ('P5_TEXTS', 'P6', 'P7'):
            s = set_array(s, 'EXAM%d_%s' % (n, part), [])

    if MARK not in s:
        anchor = 'const EXAM_STEMS='
        assert s.count(anchor) == 1
        s = s.replace(anchor, MARK + "'exams.json';   // 模擬試題完整內容（私有，見 tools/split_exams.py）\n" + anchor, 1)
    PAGE.write_text(s, encoding='utf-8')

    # 公開頁不能留下付費內容
    pub = PAGE.read_text(encoding='utf-8')
    for n in (2, 3):
        for t in data['exam%d' % n]['p5'][:10]:
            assert t not in pub, t
        for p in data['exam%d' % n]['p7'][:3]:
            assert p['passages'][0]['body'][:80] not in pub
    for sid, full in data['rows'].items():
        if full[1] in e1 and full[1] not in DEMO['p5'] and full[5]:
            assert json.dumps(full[5], ensure_ascii=False)[1:-1] not in pub, full[1]
    print('首頁 %d bytes；private/exams.json %d bytes' % (len(pub.encode()), SRC.stat().st_size))


if __name__ == '__main__':
    main()
