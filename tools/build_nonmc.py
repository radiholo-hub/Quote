#!/usr/bin/env python3
"""把學測英文試卷的「非選擇題」頁面（混合題、中譯英、作文）與大考中心的評分原則 PDF 轉成圖片，輸出 gsat/img/ns/ 與 gsat/nonmc.js。
用法：build_nonmc.py 輸出資料夾 年度=試卷.pdf[,評分原則.pdf] ...      需要 poppler（pdftotext、pdftoppm）。"""
import json, os, re, subprocess, sys

K = 100 / 72  # 100 dpi


def words(pdf, page):
    x = subprocess.run(['pdftotext', '-f', str(page), '-l', str(page), '-bbox', pdf, '-'], capture_output=True, text=True).stdout
    return [(m.group(5), float(m.group(2)), float(m.group(4))) for m in
            re.finditer(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>', x)]


def pages(pdf):
    return int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout).group(1))


def render(pdf, page, out, y0=None, y1=None):
    cmd = ['pdftoppm', '-r', '100', '-jpeg', '-jpegopt', 'quality=80', '-singlefile', '-f', str(page), '-l', str(page)]
    if y0 is not None:
        cmd += ['-x', '0', '-y', str(int(y0 * K)), '-W', '2000', '-H', str(int((y1 - y0) * K))]
    subprocess.run(cmd + [pdf, out], check=True)


def start_of_nonmc(pdf):
    """找「第貳部分、非選擇題」（舊制）或「第貳部分、混合題」（111 起）標題所在的頁與 y 座標。"""
    for p in range(1, pages(pdf) + 1):
        ws = words(pdf, p)
        txt = [w[0] for w in ws]
        for i in range(len(txt) - 3):
            if txt[i] == '第' and txt[i + 1] in ('貳',) and txt[i + 2] == '部' and txt[i + 3] == '分' and \
               any(t in ''.join(txt[i + 4:i + 9]) for t in ('非選擇題', '混合題', '：', '、')):
                # 排除封面「作答注意事項」：標題後面緊接「、」或「：」
                nxt = ''.join(txt[i + 4:i + 6])
                if nxt[:1] in ('：', '、', ':'):
                    return p, ws[i][1]
    raise SystemExit('找不到非選擇題標題：' + pdf)


def main():
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    data = {}
    for arg in sys.argv[2:]:
        y, files = arg.split('=', 1)
        exam, _, ref = files.partition(',')
        sp, sy = start_of_nonmc(exam)
        d = {'q': [], 'ref': []}
        n = pages(exam)
        for p in range(sp, n + 1):
            name = '%s-q%d' % (y, p - sp + 1)
            render(exam, p, os.path.join(out, name), (sy - 6) if p == sp else None, 842 if p == sp else None)
            d['q'].append('img/ns/%s.jpg' % name)
        if ref:
            for p in range(1, pages(ref) + 1):
                name = '%s-ref%d' % (y, p)
                render(ref, p, os.path.join(out, name))
                d['ref'].append('img/ns/%s.jpg' % name)
        data[y] = d
    with open(os.path.join(os.path.dirname(out.rstrip('/')), '..', 'nonmc.js'), 'w', encoding='utf8') as f:
        f.write('// 非選擇題（混合題、中譯英、作文）頁面圖片與官方評分原則，由 tools/build_nonmc.py 產生。\nwindow.NONMC = ' + json.dumps(data, ensure_ascii=False) + ';\n')


main()
