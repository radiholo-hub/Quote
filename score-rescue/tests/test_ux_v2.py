"""作答畫面 v2：固定底部按鈕、一句解析、原地展開示範、影片下方直接開始、前測點把握度直接下一題。"""
import pathlib
import pytest

from conftest import GATE_STUB, gate_init, PRIVATE

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ['index.html', 'l2.html', 'l3.html'] + (['l%d.html' % n for n in range(4, 8)] if (PRIVATE / 'l7.js').exists() else [])   # 第 4～7 課內容在 private/


@pytest.fixture
def page_of(browser):
    ctxs = []

    def _open(name):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=GATE_STUB))
        ctx.add_init_script(gate_init())
        ctx.route('**/*.mp3', lambda r: r.fulfill(status=200, content_type='audio/mpeg', body=b''))
        p = ctx.new_page()
        p.goto((ROOT / 'pos' / name).as_uri() + '?debug=1')
        p.wait_for_function('window.__pos')
        ctxs.append(ctx)
        return p
    yield _open
    for c in ctxs:
        c.close()


def to_lesson(p, name):
    if name == 'index.html':
        p.click('#go')
        for i, a in enumerate(p.evaluate('__pos.PRE.map(q=>q.a)')):
            p.click('.opt[data-k="%d"]' % a)
            p.click('[data-conf="sure"]')
            p.wait_for_selector('#trial' if i == 14 else '.qid:has-text("第 %d / 15 題")' % (i + 2))
        p.click('#trial')


@pytest.mark.parametrize('name', PAGES)
def test_no_preview_badge_and_video_starts_practice(page_of, name):
    p = page_of(name)
    assert '預覽版' not in p.content() and '預覽' not in p.title()
    to_lesson(p, name)
    assert p.inner_text('#toPr') == '開始練習（10 題）'
    assert '看完了？' not in p.inner_text('#app')
    p.click('#toText')
    assert p.evaluate("document.getElementById('textVersion').open")


@pytest.mark.parametrize('name', PAGES)
def test_button_stays_at_bottom_and_short_feedback(page_of, name):
    p = page_of(name)
    to_lesson(p, name)
    p.click('#toPr')

    def bottom_button_top():
        bar = p.locator('.actions')
        assert bar.evaluate('bar => getComputedStyle(bar).position') == 'fixed'
        assert bar.evaluate('bar => Math.abs(bar.getBoundingClientRect().bottom - innerHeight)') < 2
        return bar.get_by_role('button').bounding_box()['y']

    before = bottom_button_top()
    q = p.evaluate('__pos.PR[0]')
    p.click('.opt[data-k="%d"]' % ((q['a'] + 1) % 4))
    p.click('#submit')
    assert abs(bottom_button_top() - before) < 2, '確認答案與下一題在同一個位置'
    assert p.inner_text('.actions') == '下一題'
    assert not p.evaluate("document.getElementById('fullFb').open"), '完整解析預設收起'
    assert p.is_hidden('.fb .sent') and p.is_hidden('.fb .work')
    p.click('#fullFb summary')
    assert p.is_visible('.fb .sent') and '空格的工作' in p.inner_text('#fb')
    p.evaluate('scrollTo(0,document.body.scrollHeight)')
    assert abs(bottom_button_top() - before) < 2, '捲動解析時按鈕仍固定'
    gap = p.evaluate("document.querySelector('.actions').getBoundingClientRect().top-document.getElementById('fb').getBoundingClientRect().bottom")
    assert gap > 0, '捲到底時，解析最後一行不會被底部按鈕蓋住'


def test_pretest_conf_tap_goes_next(page_of):
    p = page_of('index.html')
    p.click('#go')
    a = p.evaluate('__pos.PRE.map(q=>q.a)')
    p.click('[data-conf="sure"]')          # 還沒選答案：不跳
    p.wait_for_timeout(400)
    assert p.evaluate('__pos.st.pre.i') == 0
    p.click('.opt[data-k="%d"]' % a[0])
    p.click('[data-conf="sure"]')
    p.wait_for_function('__pos.st.pre.i===1')
    p.wait_for_timeout(400)
    assert p.evaluate('__pos.st.pre.i') == 1, '只前進一題'
    p.click('#prev')
    assert p.evaluate('__pos.st.pre.i') == 0 and p.get_attribute('.opt[data-k="%d"]' % a[0], 'aria-pressed') == 'true', '上一題保留答案'


def test_pretest_change_answer_resets_confidence(page_of):
    p = page_of('index.html')
    p.click('#go')
    a = p.evaluate('__pos.PRE.map(q=>q.a)')
    p.click('.opt[data-k="%d"]' % a[0])
    p.click('[data-conf="unsure"]')
    p.wait_for_function('__pos.st.pre.i===1')
    p.click('#prev')
    other = (a[0] + 1) % 4
    p.click('.opt[data-k="%d"]' % other)
    assert p.get_attribute('[data-conf="unsure"]', 'aria-pressed') == 'false', '改選答案後把握度清空'
    assert p.is_disabled('#next'), '要重新選把握度才能下一題'
    p.wait_for_timeout(400)
    assert p.evaluate('__pos.st.pre.i') == 0, '改選答案不會自動跳題'
    p.click('[data-conf="sure"]')
    p.wait_for_function('__pos.st.pre.i===1')
    assert p.evaluate("__pos.st.pre.ans[__pos.PRE[0].id]") == {'k': other, 'conf': 'sure'}
