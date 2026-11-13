"""詞性小課：作答／揭曉後的「聽單字」「聽整句」。
- pos/audio-texts.json 要和兩課頁面實際會念的文字一致（Generate audio 依這份清單產生音檔）。
- 按鈕播放的檔名要和 tools/make_score_rescue_audio.py 的 sr_hash 相同。"""
import json
import pathlib

import pytest

from conftest import ROOT

REPO = ROOT.parent
TOOL = REPO / 'tools' / 'make_score_rescue_audio.py'
src = TOOL.read_text(encoding='utf-8')
G = {'__name__': 'pos_audio_test', '__file__': str(TOOL)}
exec(src[:src.index('async def main')], G)
from conftest import GATE_STUB, gate_init, PRIVATE
PUBLIC = ['index.html', 'l2.html', 'l3.html']
PAID = ['l4.html', 'l5.html', 'l6.html', 'l7.html']              # 完整方案：內容在 private/，有才測
HAVE_PRIVATE = (PRIVATE / 'l7.js').exists()
PAGES = PUBLIC + (PAID if HAVE_PRIVATE else [])


@pytest.fixture
def page_of(browser):
    ctxs = []

    def _open(name):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=GATE_STUB))
        ctx.add_init_script(gate_init())
        ctx.route('**/*.mp3', lambda r: r.fulfill(status=200, content_type='audio/mpeg', body=b''))
        p = ctx.new_page()
        p.goto((ROOT / 'pos' / name).as_uri())
        p.wait_for_function('window.__pos')
        ctxs.append(ctx)
        return p

    yield _open
    for c in ctxs:
        c.close()


def test_manifest_matches_pages(page_of):
    """公開清單 pos/audio-texts.json 只含免費頁面的文字；第 4～7 課的文字在 private/audio-texts-paid.json（不公開）。"""
    def texts_of(names):
        out = set()
        for name in names:
            t = page_of(name).evaluate('__pos.sayTexts()')
            assert all('______' not in x for x in t), '整句要把空格換成正解'
            out.update(t)
        return out
    pub = texts_of(PUBLIC)
    manifest = json.loads((ROOT / 'pos' / 'audio-texts.json').read_text(encoding='utf-8'))
    assert sorted(pub) == manifest, '題目改了就要重新產生 pos/audio-texts.json'
    assert set(manifest) <= set(G['collect']()), 'Generate audio 會產生這些音檔'
    if HAVE_PRIVATE:
        paid = json.loads((PRIVATE / 'audio-texts-paid.json').read_text(encoding='utf-8'))
        assert sorted(texts_of(PAID) - pub) == paid, '第 4～7 課改了題目，要重新產生 private/audio-texts-paid.json'
        assert not set(paid) & set(manifest), '公開清單不能含完整方案的題目文字'


def test_practice_feedback_has_word_and_sentence(page_of):
    """作答後：每個選項的單字旁有 🔊；解析裡有完整句子（正解加粗）＋中文翻譯＋聽整句。"""
    p = page_of('l2.html')
    p.click('#toPr')
    assert not p.query_selector('.say'), '作答前不顯示發音'
    q = p.evaluate('__pos.PR[0]')
    p.click('.opt[data-k="0"]')
    p.click('#submit')
    icons = p.query_selector_all('.opt .say.ico')
    assert len(icons) == 4, '四個選項的單字旁都有發音'
    for k, b in enumerate(icons):
        b.click()
        assert p.evaluate('window.__lastSpoken.text') == q['o'][k]
    full = q['s'].replace('______', q['o'][q['a']])
    p.click('#fullFb summary')   # 完整句、翻譯、聽整句收在「看完整解析」
    sent = p.query_selector('.fb .sent')
    assert sent.query_selector('.en').inner_text() == full and sent.query_selector('.en b').inner_text() == 'choice'
    assert sent.query_selector('.zh').inner_text() == '請在本週結束前告訴我們你的選擇。'
    sent.query_selector('.say').click()
    last = p.evaluate('window.__lastSpoken')
    assert last['text'] == full
    assert last['src'].endswith('/score-rescue/audio/%s.mp3' % G['sr_hash'](full))


def test_every_item_has_translation(page_of):
    for name in PAGES:
        miss = page_of(name).evaluate("()=>[].concat(__pos.PRE||[],__pos.DEMOS,__pos.PR,__pos.CHK).filter(q=>!q.zh).map(q=>q.id)")
        assert miss == [], (name, miss)


def test_demo_reveal_and_pretest_review_have_audio(page_of):
    p = page_of('l2.html')
    p.click('#textVersion summary')
    p.click('[data-reveal="L2-DEMO-01"]')
    assert len(p.query_selector_all('#L2-DEMO-01 .say')) == 2, '答案單字旁 🔊＋聽整句'
    assert p.inner_text('#L2-DEMO-01 .sent .zh') == '我們今天早上收到廠商的提案。'
    p = page_of('index.html')
    p.click('#go')
    for a in p.evaluate('__pos.PRE.map(q=>q.a)'):
        p.click('.opt[data-k="%d"]' % a)
        p.evaluate('window.__pi=__pos.st.pre.i')
        p.click('[data-conf="sure"]')   # 點把握度就自動下一題
        p.wait_for_function('__pos.st.pre.i!==window.__pi||!!document.getElementById("trial")')
    assert len(p.query_selector_all('.review-item .say')) == 30, '前測 15 題：正解單字＋整句'
    assert len(p.query_selector_all('.review-item .sent .zh')) == 15
