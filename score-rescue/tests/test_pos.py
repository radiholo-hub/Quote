"""詞性前測＋免費第 1 課（pos/）：題目答案、完整流程、事件紀錄、debug 模式，以及回到主站 Day 1–7 的跳轉。"""
import re

import pytest

from conftest import ROOT, TEST_PAGE

POS = ROOT / 'pos' / 'index.html'
EVENTS = ['pos_pretest_start', 'pos_pretest_done', 'pos_trial_click', 'pos_l1_done', 'pos_day17_click']

# 假 Supabase：記下每一筆 insert（資料表與事件名稱），不連到真的資料庫
POS_STUB = ("window.__ins=[];window.supabase={createClient:function(){return {from:function(t){return {insert:function(row){"
            "window.__ins.push([t,row.name]);return Promise.resolve({error:null})}}}}}};")


@pytest.fixture
def open_pos(browser):
    ctxs = []

    def _open(query=''):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        loads = []

        def stub(route):
            loads.append(route.request.url)
            route.fulfill(status=200, content_type='application/javascript', body=POS_STUB)
        ctx.route('**/supabase-js@2*', stub)
        page = ctx.new_page()
        errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.goto(POS.as_uri() + query)
        page.wait_for_function('window.__pos')
        ctxs.append((ctx, errs))
        page.loads = loads
        return page

    yield _open
    for ctx, errs in ctxs:
        ctx.close()
        assert not errs, '頁面錯誤：%s' % errs


def test_answer_keys_match_answer_card(open_pos):
    """與《老師用答案卡》一致：題目 ID、正解、診斷代碼、確認題回跳的示範。"""
    p = open_pos()
    d = p.evaluate("()=>({pre:__pos.PRE.map(q=>[q.id,'ABCD'[q.a],q.c]),pr:__pos.PR.map(q=>[q.id,'ABCD'[q.a],q.c]),"
                   "chk:__pos.CHK.map(q=>[q.id,'ABCD'[q.a],q.c,__pos.DEMOS[q.demo].id]),"
                   "x:__pos.PR.concat(__pos.CHK).map(q=>q.x.map((t,k)=>k===q.a?t===null:!!t).every(Boolean))})")
    assert [x[1] for x in d['pre']] == list('BDCADBACABDCBAC')
    assert [x[0] for x in d['pre']] == ['P5-PRE-%03d' % i for i in range(1, 16)]
    assert [x[2] for x in d['pre']] == ['ADJ_N', 'NOUN', 'ADV_V', 'LINK_ADJ', 'ADV_MOD', 'MAIN_V', 'NOUN', 'ADV_V',
                                        'ADJ_N', 'ADV_MOD', 'NOUN', 'LINK_ADJ', 'ADJ_N', 'ADV_V', 'MAIN_V']
    assert [x[1] for x in d['pr']] == list('ABDCCCABDA')
    assert [x[2] for x in d['pr']] == ['ADJ_N', 'ADV_V', 'ADV_MOD', 'ADJ_N', 'ADV_V', 'ADV_V', 'LINK_ADJ', 'ADJ_N', 'ADV_MOD', 'LINK_ADJ']
    assert d['chk'] == [['L1-CHK-01', 'B', 'ADV_V', 'L1-DEMO-02'], ['L1-CHK-02', 'A', 'ADJ_N', 'L1-DEMO-01'],
                        ['L1-CHK-03', 'C', 'ADV_MOD', 'L1-DEMO-03'], ['L1-CHK-04', 'A', 'LINK_ADJ', 'L1-DEMO-04']]
    assert all(d['x']), '每題三個錯誤選項都有解析，正解位置留空'


def answer(p, k, conf='sure', btn='#next'):
    p.click('.opt[data-k="%d"]' % k)
    if btn == '#next':   # 只有前測問「有把握／不確定」
        p.click('[data-conf="%s"]' % conf)
    p.click(btn)


def walk(p, chk_wrong=(3,)):
    """走完前測 → 結果 → 第 1 課 → 10 題練習 → 4 題確認 → 完成畫面。"""
    p.click('#go')
    for a in p.evaluate('__pos.PRE.map(q=>q.a)'):
        answer(p, a)
    p.click('#trial')
    p.click('#toPr')
    for a in p.evaluate('__pos.PR.map(q=>q.a)'):
        answer(p, a, btn='#submit')
        p.click('#next')
    for i, a in enumerate(p.evaluate('__pos.CHK.map(q=>q.a)')):
        answer(p, (a + 1) % 4 if i in chk_wrong else a, btn='#submit')
        if i in chk_wrong:
            p.click('#toDemo')
            p.click('#back')
        p.click('#next')


def test_full_flow_records_five_events(open_pos):
    p = open_pos()
    walk(p)
    assert '這次答對 3／4 題' in p.inner_text('#app')
    assert p.get_attribute('#d17', 'href') == '../#day1-7'
    p.evaluate("()=>{document.getElementById('d17').setAttribute('href','#stay')}")   # 測試裡不真的離開頁面
    p.click('#d17')
    p.wait_for_function('window.__ins.length===5')
    ins = p.evaluate('window.__ins')
    assert ins == [['events', n] for n in EVENTS]
    assert all(re.fullmatch(r'[a-z0-9_]{1,40}', n) for n in EVENTS), '符合 events 表的名稱限制'


def test_events_once_per_tab(open_pos):
    p = open_pos()
    p.click('#go')
    p.evaluate("()=>{location.reload()}")
    p.wait_for_function('window.__pos')
    p.click('#go')
    p.wait_for_timeout(300)
    assert p.evaluate('window.__ins') == [], '同一分頁同一種事件只記一次（重新整理後不再送）'


def test_check_wrong_jumps_to_demo_and_back(open_pos):
    p2 = open_pos()
    p2.click('#go')
    for a in p2.evaluate('__pos.PRE.map(q=>q.a)'):
        answer(p2, a)
    p2.click('#trial'); p2.click('#toPr')
    for a in p2.evaluate('__pos.PR.map(q=>q.a)'):
        answer(p2, a, btn='#submit'); p2.click('#next')
    a = p2.evaluate('__pos.CHK[0].a')
    answer(p2, (a + 1) % 4, btn='#submit')
    assert p2.inner_text('#toDemo') == '回看示範2（L1-DEMO-02）'
    p2.click('#toDemo')
    t = p2.inner_text('#app')
    assert 'L1-DEMO-02' in t and '答案：(B) confidently' in t
    p2.click('#back')
    t = p2.inner_text('#app')
    assert 'L1-CHK-01' in t and '空格的工作：說明 responded 的方式' in t


def test_debug_shows_events_without_sending(open_pos):
    p = open_pos('?debug=1')
    walk(p)
    p.click('#d17')
    t = p.inner_text('#dbg')
    for n in EVENTS:
        assert n in t
    assert p.evaluate('window.__ins===undefined'), 'debug 模式不載入 Supabase、不送出事件'
    assert p.loads == []
    assert p.url.endswith('?debug=1'), 'debug 模式點 Day 1–7 不跳轉'


def test_day17_with_diag_opens_plan(open_app):
    app = open_app()
    app.setup()
    app.js('__t.save()')
    app.page.goto('about:blank')
    app.page.goto(TEST_PAGE.as_uri() + '#day1-7')
    app.page.wait_for_function('window.__t&&window.__t.S')
    app.page.wait_for_timeout(300)
    assert app.js("!document.getElementById('view-plan').hidden")
    assert app.count('#d17Notice') == 0
    assert not app.page.url.endswith('#day1-7'), '網址的 #day1-7 會被清掉'


def test_day17_without_diag_shows_notice(open_app):
    app = open_app()
    app.page.goto('about:blank')
    app.page.goto(TEST_PAGE.as_uri() + '#day1-7')
    app.page.wait_for_function('window.__t&&window.__t.S')
    app.page.wait_for_timeout(300)
    assert app.js("!document.getElementById('view-home').hidden")
    t = app.text('#d17Notice')
    assert '先完成 30 題診斷，就能開始 Day 1–7 免費體驗' in t
    app.page.click('#d17Notice [data-start]')
    assert app.js("!document.getElementById('view-level').hidden"), '按鈕直接開始診斷（選程度）'


def test_home_without_hash_has_no_notice(app):
    assert app.count('#d17Notice') == 0


def test_done_offers_lesson2_first_then_day17(open_pos):
    """完成畫面：主要按鈕是「繼續第 2 課」，Day 1–7 是次要；點第 2 課記 pos_l2_click 後前往 l2.html。"""
    p = open_pos()
    walk(p)
    l2, d17 = p.query_selector('#toL2'), p.query_selector('#d17')
    assert l2.inner_text() == '繼續第 2 課｜先找中心名詞' and l2.get_attribute('href') == 'l2.html'
    assert 'pri' in l2.get_attribute('class') and 'line' in d17.get_attribute('class')
    assert l2.bounding_box()['y'] < d17.bounding_box()['y'], '第 2 課在 Day 1–7 上方'
    p.click('#toL2')
    p.wait_for_url('**/pos/l2.html')
    p.wait_for_function('!!(window.__pos && window.__pos.view)')
    assert '空格需要名詞嗎' in p.inner_text('#app')


def test_confidence_only_in_pretest(open_pos):
    """前測要選把握度才能下一題；練習與確認題沒有把握度，選了答案就能送出。"""
    p = open_pos()
    p.click('#go')
    assert p.query_selector('.conf')
    p.click('.opt[data-k="0"]')
    assert p.is_disabled('#next'), '前測沒選把握度不能下一題'
    for a in p.evaluate('__pos.PRE.map(q=>q.a)'):
        answer(p, a)
    p.click('#trial')
    p.click('#toPr')
    assert not p.query_selector('.conf'), '練習題不問把握度'
    assert p.is_disabled('#submit')
    p.click('.opt[data-k="0"]')
    assert not p.is_disabled('#submit')
