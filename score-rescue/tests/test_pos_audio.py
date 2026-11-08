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
PAGES = ['index.html', 'l2.html']


@pytest.fixture
def page_of(browser):
    ctxs = []

    def _open(name):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        ctx.route('**/supabase-js@2*', lambda r: r.abort())
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
    texts = set()
    for name in PAGES:
        t = page_of(name).evaluate('__pos.sayTexts()')
        assert all('______' not in x for x in t), '整句要把空格換成正解'
        texts.update(t)
    manifest = json.loads((ROOT / 'pos' / 'audio-texts.json').read_text(encoding='utf-8'))
    assert sorted(texts) == manifest, '題目改了就要重新產生 pos/audio-texts.json'
    assert set(manifest) <= set(G['collect']()), 'Generate audio 會產生這些音檔'


def test_practice_feedback_has_word_and_sentence(page_of):
    p = page_of('l2.html')
    p.click('#toPr')
    assert not p.query_selector('.say'), '作答前不顯示發音'
    q = p.evaluate('__pos.PR[0]')
    p.click('.opt[data-k="0"]')
    p.click('#submit')
    btns = p.query_selector_all('.fb .say')
    assert [b.inner_text() for b in btns] == ['🔊 聽單字 choice', '🔊 聽整句']
    full = q['s'].replace('______', q['o'][q['a']])
    btns[1].click()
    last = p.evaluate('window.__lastSpoken')
    assert last['text'] == full == 'Please send us your choice by the end of the week.'
    assert last['src'].endswith('/score-rescue/audio/%s.mp3' % G['sr_hash'](full))
    btns[0].click()
    assert p.evaluate('window.__lastSpoken.text') == 'choice'


def test_demo_reveal_and_pretest_review_have_audio(page_of):
    p = page_of('l2.html')
    p.click('#textVersion summary')
    p.click('[data-reveal="L2-DEMO-01"]')
    assert len(p.query_selector_all('#L2-DEMO-01 .say')) == 2
    p = page_of('index.html')
    p.click('#go')
    for a in p.evaluate('__pos.PRE.map(q=>q.a)'):
        p.click('.opt[data-k="%d"]' % a)
        p.click('[data-conf="sure"]')
        p.click('#next')
    assert len(p.query_selector_all('.review-item .say')) == 30, '前測 15 題的解答各有單字與整句'
