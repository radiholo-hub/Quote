"""追蹤：30 題診斷的漏斗、結果頁方案按鈕的曝光與點擊；本機與預覽站不寫入正式數據。"""
import json

from conftest import ROOT, STUB, TEST_PAGE


def boot(browser, ev_test=True, height=844):
    ctx = browser.new_context(viewport={'width': 390, 'height': height})
    if not ev_test:
        ctx.add_init_script('window.__EV_TEST=false;')
    ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=STUB))
    page = ctx.new_page()
    ins = []
    page.on('console', lambda m: m.text.startswith('__ins:') and ins.append(m.text[6:]))
    page.goto(TEST_PAGE.as_uri())
    page.wait_for_function('window.__t&&window.__t.S')
    page.wait_for_timeout(300)
    return ctx, page, ins


def answer(page, n):
    for i in range(n):
        page.locator('#qOpts .opt').nth(i % 4).click()
        page.click('#nextBtn')


def start_diag(page):
    page.locator('[data-start]:visible').first.click()


def test_diag_funnel_events(browser):
    ctx, page, ins = boot(browser)
    try:
        start_diag(page)
        page.wait_for_timeout(200)
        assert ins == ['diag_level_view'], '進到選分數頁，還沒開始答題'
        page.locator('#lvOpts .opt').first.click()
        page.wait_for_timeout(200)
        assert ins[-1] == 'diag_start'
        answer(page, 30)
        page.wait_for_timeout(300)
        assert [e for e in ins if e.startswith('diag_at')] == ['diag_at5', 'diag_at10', 'diag_at15', 'diag_at20', 'diag_at25']
        assert ins.count('diag_done') == 1
        assert ins.index('diag_level_view') < ins.index('diag_start') < ins.index('diag_at5') < ins.index('diag_done')
    finally:
        ctx.close()


def test_result_plan_seen_only_when_button_in_view(browser):
    ctx, page, ins = boot(browser)
    try:
        start_diag(page)
        page.locator('#lvOpts .opt').first.click()
        answer(page, 30)
        assert not page.evaluate("document.getElementById('view-result').hidden")
        page.evaluate('scrollTo(0,0)')
        page.wait_for_timeout(400)
        assert 'result_plan_seen' not in ins, '只進結果頁、按鈕還在下面，不算看到'
        page.locator('#resPlanBtn').scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        assert ins.count('result_plan_seen') == 1
        page.click('#resPlanBtn')
        page.wait_for_timeout(300)
        assert ins.index('result_plan_seen') < ins.index('result_plan_click') < ins.index('buy_modal_open')
    finally:
        ctx.close()


def test_buy_modal_from_pricing_is_not_result_click(browser):
    ctx, page, ins = boot(browser)
    try:
        page.locator('#pricing [data-modal]').first.click()
        page.wait_for_timeout(300)
        assert 'buy_modal_open' in ins and 'result_plan_click' not in ins
    finally:
        ctx.close()


def test_non_production_host_sends_nothing(browser):
    """本機 file://、127.0.0.1、githack、pages.dev 都不是正式站：事件不寫入。"""
    ctx, page, ins = boot(browser, ev_test=False)
    try:
        start_diag(page)
        page.locator('#lvOpts .opt').first.click()
        answer(page, 5)
        page.wait_for_timeout(300)
        assert ins == []
    finally:
        ctx.close()


def test_pos_non_production_host_sends_nothing(browser):
    from conftest import GATE_STUB
    ctx = browser.new_context(viewport={'width': 390, 'height': 844})
    ctx.add_init_script('window.__EV_TEST=false;')
    ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=GATE_STUB))
    p = ctx.new_page()
    try:
        p.goto((ROOT / 'pos' / 'index.html').as_uri())
        p.wait_for_function('window.__pos')
        p.click('#go')
        p.wait_for_timeout(300)
        assert [n for t, n in p.evaluate("window.__ins||[]") if t == 'events'] == []
    finally:
        ctx.close()


def test_production_host_check_in_every_page():
    for f in ['index.html', 'pos/index.html', 'pos/l2.html', 'pos/l3.html', 'pos/l4.html', 'pos/l7.html', 'pos/final.html']:
        s = (ROOT / f).read_text(encoding='utf-8')
        assert "location.hostname==='radiholo-hub.github.io'" in s, f
