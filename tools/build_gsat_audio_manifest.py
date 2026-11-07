#!/usr/bin/env python3
"""由單字資料庫（gsat/data/vocab.js）與原創模擬題（gsat/data/mock.js）列出所有要朗讀的內容，輸出 gsat/data/audio_manifest.js。
只收原創內容：單字、搭配詞、原創例句、原創文章。大考中心的試題與文章不在內（權利尚未確認）。
檔名沿用 Score Rescue 的規則：<sr_hash(文字)>.mp3；慢速版的雜湊文字是 "slow\\n" + 文字。需要 node。"""
import json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
JS = """global.window={};for (const f of ['data/vocab.js','data/mock.js']) require(process.argv[1]+'/gsat/'+f);
console.log(JSON.stringify({vocab:window.VOCAB,mock:window.GSAT}));"""


def sr_hash_fn():
    """直接載入 make_score_rescue_audio.py 的 sr_hash，確保和既有音檔雜湊完全相同。"""
    src = (ROOT / 'tools' / 'make_score_rescue_audio.py').read_text(encoding='utf-8')
    g = {'__name__': 'x', '__file__': str(ROOT / 'tools' / 'make_score_rescue_audio.py')}
    exec(src[:src.index('async def main')], g)
    return g['sr_hash']


def spoken(text):
    """朗讀用的文字:縮寫要照字唸。sb. → somebody、sth. → something。畫面上仍顯示原本的 sb./sth.,檔名雜湊也用畫面文字,
    所以前端不需要改;只有合成語音時使用這個文字。"""
    t = re.sub(r'\bsb\.?(?=\W|$)', 'somebody', text, flags=re.I)
    return re.sub(r'\bsth\.?(?=\W|$)', 'something', t, flags=re.I)


def fill_blanks(text, answers):
    """原創綜合測驗／篇章結構文章裡的 (n) ______ 填入正確答案，讓朗讀是完整的文章。"""
    def rep(m):
        return answers[int(m.group(1)) - 1]
    out = re.sub(r'\((\d+)\) ______', rep, text)
    return re.sub(r'\ba\(n\) (\w)', lambda m: ('an ' if m.group(1).lower() in 'aeiou' else 'a ') + m.group(1), out)


def build():
    d = json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)
    h = sr_hash_fn()
    items, seen = [], {}

    def add(kind, text, ref, slow=False):
        text = text.strip()
        key = ('slow\n' + text) if slow else text
        fid = h(key)
        if fid in seen:
            seen[fid]['refs'].append(ref); return
        it = {'hash': fid, 'kind': kind, 'text': text, 'rate': 'slow' if slow else 'normal', 'file': fid + '.mp3', 'refs': [ref]}
        if spoken(text) != text: it['speak'] = spoken(text)
        seen[fid] = it; items.append(it)

    V = d['vocab']
    for eid, e in V['entries'].items():
        add('word', e['hw'], eid)
        for c in e['coll']: add('phrase', c['t'], eid)
        for x in e['ex']: add('sentence', x['en'], eid)
    for pid, p in V['phrases'].items(): add('phrase', p['t'], 'phrase:' + pid)
    m = d['mock']
    for i, p in enumerate(m['reading']): add('passage', p['text'].replace('\n\n', '\n'), f'mock:r{i}'); add('passage', p['text'].replace('\n\n', '\n'), f'mock:r{i}', slow=True)
    for i, p in enumerate(m['cloze']):
        t = fill_blanks(p['text'], [q['o'][q['a']] for q in p['qs']]); add('passage', t, f'mock:c{i}'); add('passage', t, f'mock:c{i}', slow=True)
    for i, p in enumerate(m['structure']):
        t = fill_blanks(p['text'], [p['options'][a] for a in p['ans']]); add('passage', t, f'mock:s{i}'); add('passage', t, f'mock:s{i}', slow=True)
    return items


def main():
    items = build()
    kinds = {}
    for it in items: kinds[it['kind']] = kinds.get(it['kind'], 0) + 1
    out = ROOT / 'gsat' / 'data' / 'audio_manifest.js'
    out.write_text('// 要朗讀的原創內容清單,由 tools/build_gsat_audio_manifest.py 產生,勿手改。音檔由 tools/make_gsat_audio.py 產生到 gsat/audio/<hash>.mp3。\n'
                   'window.AUDIO_MANIFEST = ' + json.dumps({'voice': 'en-US-AriaNeural', 'items': items}, ensure_ascii=False, indent=0) + ';\n', encoding='utf8')
    print(f'{len(items)} 段:', kinds, '→', out)


if __name__ == '__main__':
    main()
