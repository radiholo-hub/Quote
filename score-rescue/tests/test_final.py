"""詞性小課結業測驗（pos/final.html，完整方案）。
- 登入與付費：沿用第 4～7 課的外殼做法；題庫在私有儲存桶（lessons/final.js）
- 7 課都完成（同一個瀏覽器）才可作答；各課提交 4 題確認題、進入完成畫面就記為完成
- 一題一頁、做完 14 題才看結果；結果頁列各課 2 題對錯、錯題附正解＋判斷依據＋回該課複習
- 事件：每次作答各記一次 pos_final_start／pos_final_done，重新整理或回看結果不重送
CI 沒有 private/，這裡用假題庫測流程；有 private/final.js 時另外核對真題庫。"""
import json

import pytest

from conftest import ROOT, GATE_STUB, PRIVATE

LESSONS = [3, 6, 1, 7, 5, 2, 4, 1, 5, 3, 7, 4, 6, 2]
FAKE = [{'id': 'FINAL-%02d' % (i + 1), 'n': i + 1, 'lesson': L, 'point': 'p', 's': 'Item %d ______ here.' % (i + 1),
         'o': ['a%d' % i, 'b%d' % i, 'c%d' % i, 'd%d' % i], 'a': i % 4, 'why': '判斷依據 %d' % (i + 1),
         'x': [None if k == i % 4 else '(%s) 錯 %d' % ('ABCD'[k], i + 1) for k in range(4)], 'zh': '中譯 %d' % (i + 1)}
        for i, L in enumerate(LESSONS)]
FAKE_JS = 'FINAL=%s;' % json.dumps(FAKE, ensure_ascii=False)
USER = {'email': 'student@example.com', 'id': 'u9'}
ALL_DONE = "for(var n=1;n<=7;n++)localStorage.setItem('sr_pos_done_'+n,'1');"


@pytest.fixture(scope='module')
def http_root():
    """用本機 http 伺服器開頁面：file:// 頁面重新整理時，Chromium 偶爾會清掉分頁暫存（sessionStorage），測不準「重新整理接著做」。"""
    import functools, http.server, threading
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
    h.log_message = lambda *a: None
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    yield 'http://127.0.0.1:%d' % srv.server_address[1]
    srv.shutdown()


@pytest.fixture
def open_final(browser, http_root):
    ctxs = []

    def _open(user=USER, paid=True, done=ALL_DONE, files=None, ctx=None):
        if ctx is None:
            ctx = browser.new_context(viewport={'width': 390, 'height': 844})
            ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=GATE_STUB))
            g = {'user': user, 'paid': paid, 'files': {'final.js': FAKE_JS} if files is None else files}
            ctx.add_init_script('window.__GATE=%s;if(!sessionStorage.getItem("__seeded")){sessionStorage.setItem("__seeded","1");localStorage.clear();%s}' % (json.dumps(g), done))
            ctx.add_init_script("window.__ins=JSON.parse(sessionStorage.getItem('__ins')||'[]');"   # 跨重新整理保留送出的事件
                                "window.__ins.push=function(){var r=Array.prototype.push.apply(this,arguments);sessionStorage.setItem('__ins',JSON.stringify(this));return r}")
            ctxs.append(ctx)
        p = ctx.new_page()
        errs = []
        p.on('pageerror', lambda e: errs.append(str(e)))
        p.goto(http_root + '/pos/final.html')
        p.errs = errs
        return p

    yield _open
    for c in ctxs:
        c.close()


def events(p):
    p.wait_for_timeout(120)
    return [n for t, n in p.evaluate('window.__ins') if t == 'events' and n.startswith('pos_final')]


def answer_all(p, wrong=(1, 4)):
    """作答 14 題；wrong 是要答錯的題號（1 起算）。"""
    for i, q in enumerate(FAKE):
        k = (q['a'] + 1) % 4 if (i + 1) in wrong else q['a']
        p.click('.opt[data-k="%d"]' % k)
        p.click('#next')


def test_public_page_has_no_items():
    s = (ROOT / 'pos' / 'final.html').read_text(encoding='utf-8')
    assert 'FINAL-0' not in s and 'download(\'final.js\')' in s
    if (PRIVATE / 'final.js').exists():
        code = (PRIVATE / 'final.js').read_text(encoding='utf-8')
        items = json.loads(code[code.index('FINAL=') + 6:code.rindex(';')])
        assert len(items) == 14 and [q['lesson'] for q in items] == LESSONS
        assert ''.join('ABCD'[q['a']] for q in items) == 'BDCABDADCBACBA'
        for q in items:
            assert q['s'] not in s


def test_anonymous_and_unpaid(open_final):
    p = open_final(user=None)
    p.wait_for_selector('#lf')
    assert p.get_attribute('#toPlan', 'href') == '../#pricing'
    assert not [x for x in p.evaluate('window.__gateLog') if x.startswith('download')]
    p2 = open_final(paid=False)
    p2.wait_for_selector('#swap')
    assert p2.inner_text('#who') == 'student@example.com'
    assert not [x for x in p2.evaluate('window.__gateLog') if x.startswith('download')]


def test_locked_until_all_seven_lessons_done(open_final):
    p = open_final(done="localStorage.setItem('sr_pos_done_1','1');localStorage.setItem('sr_pos_done_4','1');")
    p.wait_for_selector('#locked')
    t = p.inner_text('#locked')
    assert '已完成 2／7 課' in t
    hrefs = p.eval_on_selector_all('#locked ul a', 'as=>as.map(a=>a.getAttribute("href"))')
    assert hrefs == ['l2.html', 'l3.html', 'l5.html', 'l6.html', 'l7.html']
    assert not p.query_selector('#start')


def test_full_attempt_results_and_events(open_final):
    p = open_final()
    p.wait_for_selector('#start')
    assert '7 課全部完成' in p.inner_text('#app')
    p.click('#start')
    assert p.inner_text('.qid') == '結業測驗 第 1 / 14 題'
    assert not p.query_selector('.fb') and p.is_disabled('#next')
    p.click('.opt[data-k="0"]')
    assert not p.query_selector('.opt.right'), '作答時不顯示對錯'
    p.click('.opt[data-k="%d"]' % FAKE[0]['a'])
    p.click('#next')
    p.click('#prev')
    assert p.get_attribute('.opt[data-k="%d"]' % FAKE[0]['a'], 'aria-pressed') == 'true'
    p.click('#next')
    for i, q in enumerate(FAKE[1:], start=2):
        p.click('.opt[data-k="%d"]' % ((q['a'] + 1) % 4 if i in (4, 9) else q['a']))
        p.click('#next')
    assert p.inner_text('h1') == '答對 12／14 題'
    rows = p.eval_on_selector_all('#byLesson tbody tr', 'rs=>rs.map(r=>r.innerText.split("\\t").pop())')
    assert rows == ['2／2', '2／2', '2／2', '2／2', '1／2', '2／2', '1／2']   # 第 4 題第 7 課、第 9 題第 5 課
    wrong = p.query_selector_all('.wrongq')
    assert [w.get_attribute('data-id') for w in wrong] == ['FINAL-04', 'FINAL-09']
    t = wrong[0].inner_text()
    assert '正解是 (%s) %s' % ('ABCD'[FAKE[3]['a']], FAKE[3]['o'][FAKE[3]['a']]) in t and '判斷依據 4' in t
    assert wrong[0].query_selector('a.btn').get_attribute('href') == 'l7.html' and '回第 7 課複習' in t
    assert wrong[1].query_selector('a.btn').get_attribute('href') == 'l5.html'
    assert '多益分數' in p.inner_text('#app') and '分' not in p.inner_text('h1').replace('答對', '')
    assert events(p) == ['pos_final_start', 'pos_final_done']
    assert not p.errs


def test_refresh_keeps_attempt_and_does_not_resend(open_final):
    p = open_final()
    p.wait_for_selector('#start')
    p.click('#start')
    for q in FAKE[:5]:
        p.click('.opt[data-k="%d"]' % q['a'])
        p.click('#next')
    ctx = p.context
    p.reload()
    p.wait_for_function("(document.querySelector('.qid')||{}).textContent&&document.querySelector('.qid').textContent.indexOf('結業測驗 第')===0")
    assert p.inner_text('.qid') == '結業測驗 第 6 / 14 題', '重新整理接著做同一次作答'
    for q in FAKE[5:]:
        p.click('.opt[data-k="%d"]' % q['a'])
        p.click('#next')
    assert p.inner_text('h1') == '答對 14／14 題'
    p.reload()
    p.wait_for_selector('#byLesson')
    assert events(p) == ['pos_final_start', 'pos_final_done'], '回看結果不重送'
    p.click('#redo')
    p.wait_for_function("(document.querySelector('.qid')||{}).textContent&&document.querySelector('.qid').textContent.indexOf('結業測驗 第')===0")
    assert p.inner_text('.qid') == '結業測驗 第 1 / 14 題'
    answer_all(p)
    assert events(p) == ['pos_final_start', 'pos_final_done'] * 2, '新的一次作答各記一次'


def test_missing_content_shows_error(open_final):
    p = open_final(files={})
    p.wait_for_function("document.getElementById('app').innerText.indexOf('結業測驗暫時載入失敗')>=0")


# ---------- 各課完成紀錄 ----------

def _lesson(browser, name, gate_files):
    from conftest import gate_init
    ctx = browser.new_context(viewport={'width': 390, 'height': 844})
    ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=GATE_STUB))
    ctx.add_init_script(gate_init(files=gate_files))
    p = ctx.new_page()
    p.goto((ROOT / 'pos' / name).as_uri() + '?debug=1')
    p.wait_for_function('window.__pos')
    return ctx, p


def finish_checks(p):
    p.click('#toPr')
    for q in p.evaluate('__pos.PR'):
        p.click('.opt[data-k="%d"]' % q['a']); p.click('#submit'); p.click('#next')
    for q in p.evaluate('__pos.CHK'):
        p.click('.opt[data-k="%d"]' % q['a']); p.click('#submit'); p.click('#next')


def test_finishing_lesson_records_done(browser):
    ctx, p = _lesson(browser, 'l2.html', {})
    try:
        assert p.evaluate("localStorage.getItem('sr_pos_done_2')") is None
        finish_checks(p)
        assert p.evaluate("!!localStorage.getItem('sr_pos_done_2')"), '進入完成畫面就記為完成'
    finally:
        ctx.close()


@pytest.mark.skipif(not (PRIVATE / 'l7.js').exists(), reason='需要 private/ 第 7 課內容')
def test_l7_done_screen_offers_final_only_when_all_done(browser):
    from conftest import private_files
    ctx, p = _lesson(browser, 'l7.html', private_files())
    try:
        p.evaluate("for(var n=1;n<=6;n++)localStorage.setItem('sr_pos_done_'+n,'1')")
        finish_checks(p)
        assert '7 課全部完成' in p.inner_text('#finalBox')
        assert p.get_attribute('#toFinal', 'href') == 'final.html'
        assert 'line' in p.get_attribute('#d17', 'class')
        p.evaluate("localStorage.removeItem('sr_pos_done_3')")
        p.click('#again')
        p.evaluate("__pos.view('chk')")
        p.evaluate("()=>{__pos.st.chk.i=3}")
        p.evaluate("__pos.view('chk')")
        p.click('#next')
        t = p.inner_text('#finalBox')
        assert '第 7 課已完成' in t and '還沒完成：第 3 課' in t and not p.query_selector('#toFinal')
    finally:
        ctx.close()


def test_lesson1_review_link_opens_lesson(browser):
    ctx, p = _lesson(browser, 'index.html', {})
    try:
        p2 = ctx.new_page()   # 從結業測驗點連結：全新載入（同一頁只改 # 不會重新載入）
        p2.goto((ROOT / 'pos' / 'index.html').as_uri() + '?debug=1#l1')
        p2.wait_for_selector('#toPr')
        p = p2
        assert '第 1 課' in p.inner_text('#app') or p.query_selector('#l1video')
    finally:
        ctx.close()
