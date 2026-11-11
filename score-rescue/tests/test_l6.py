"""詞性小課第 6 課（pos/l6.html）：答案與 v1.1 定稿一致、4 題確認題答錯都能跳回各自的示範再回到原題。
第 6 課屬於完整方案，第 5 課完成畫面暫不接入口。"""
import pytest

from conftest import ROOT

L2 = ROOT / 'pos' / 'l2.html'
L3 = ROOT / 'pos' / 'l6.html'
L3_PAGE = ROOT / 'pos' / 'l5.html'
POS = ROOT / 'pos' / 'index.html'
STUB = ("window.__ins=[];window.supabase={createClient:function(){return {from:function(t){return {insert:function(row){"
        "window.__ins.push([t,row.name]);return Promise.resolve({error:null})}}}}}};")
JUMP = [('L6-CHK-01', 'L6-DEMO-01', '回看示範1（L6-DEMO-01）', '答案：(B) Although'),
        ('L6-CHK-02', 'L6-DEMO-02', '回看示範2（L6-DEMO-02）', '答案：(C) Despite'),
        ('L6-CHK-03', 'L6-DEMO-03', '回看示範3（L6-DEMO-03）', '答案：(C) Nevertheless'),
        ('L6-CHK-04', 'L6-DEMO-04', '回看示範4（L6-DEMO-04）', '答案：(B) because of')]


@pytest.fixture
def open_page(browser):
    ctxs = []

    def _open(path=L3, query=''):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=STUB))
        page = ctx.new_page()
        errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.goto(path.as_uri() + query)
        page.wait_for_function('window.__pos')
        ctxs.append((ctx, errs))
        return page

    yield _open
    for ctx, errs in ctxs:
        ctx.close()
        assert not errs, '頁面錯誤：%s' % errs


def answer(p, k):
    p.click('.opt[data-k="%d"]' % k)
    p.click('#submit')


def to_check(p):
    p.click('#toPr')
    for a in p.evaluate('__pos.PR.map(q=>q.a)'):
        answer(p, a)
        p.click('#next')


def finish(p):
    to_check(p)
    for a in p.evaluate('__pos.CHK.map(q=>q.a)'):
        answer(p, a)
        p.click('#next')


def test_answer_keys_match_review_doc(open_page):
    p = open_page()
    d = p.evaluate("()=>({demo:__pos.DEMOS.map(d=>[d.id,'ABCD'[d.a],d.o[d.a]]),pr:__pos.PR.map(q=>[q.id,'ABCD'[q.a],q.c,q.o[q.a]]),"
                   "chk:__pos.CHK.map(q=>[q.id,'ABCD'[q.a],q.o[q.a],__pos.DEMOS[q.demo].id]),"
                   "x:__pos.PR.concat(__pos.CHK).map(q=>q.x.map((t,k)=>k===q.a?t===null:!!t).every(Boolean)),"
                   "zh:__pos.DEMOS.concat(__pos.PR,__pos.CHK).filter(q=>!q.zh).map(q=>q.id)})")
    assert [x[1:] for x in d['demo']] == [['B', 'Although'], ['C', 'Despite'], ['C', 'Nevertheless'], ['B', 'because of']]
    assert [x[0] for x in d['pr']] == ['L6-PR-%02d' % i for i in range(1, 11)]
    assert ''.join(x[1] for x in d['pr']) == 'DACBCBADBA'
    assert [x[3] for x in d['pr']] == ['Although', 'In spite of', 'However', 'because of', 'because', 'during', 'While', 'Therefore', 'but', 'due to']
    assert set(x[2] for x in d['pr']) == {'LINK'}
    assert [x[2] for x in d['chk']] == ['Even though', 'Despite', 'Nevertheless', 'because of']
    assert ''.join(x[1] for x in d['chk']) == 'ABCD'
    assert [x[3] for x in d['chk']] == ['L6-DEMO-01', 'L6-DEMO-02', 'L6-DEMO-03', 'L6-DEMO-04']
    assert all(d['x']) and d['zh'] == []


def test_no_two_valid_options(open_page):
    """同一題不同時放 despite／in spite of、nevertheless／nonetheless。"""
    p = open_page()
    for q in p.evaluate('__pos.PR.concat(__pos.CHK,__pos.DEMOS)'):
        o = [x.lower() for x in q['o']]
        assert not ({'despite', 'in spite of'} <= set(o)), q['id']
        assert not ({'nevertheless', 'nonetheless'} <= set(o)), q['id']


def test_pr08_therefore_wording(open_page):
    """PR-08：連接副詞、表結果；註明本題示範句號後的用法。"""
    p = open_page()
    to_check_upto(p, 7)
    answer(p, 3)
    t = p.inner_text('.fb')
    assert '連接副詞' in t and '表結果的 therefore' in t
    assert '本題示範 therefore 放在句號或分號後的用法' in t
    assert '轉折副詞' not in p.content()


def test_pr09_but_contrast(open_page):
    """PR-09 對照題：逗號＋but；改寫句把 ; however, 框起來。"""
    p = open_page()
    to_check_upto(p, 8)
    answer(p, 0)
    mv = p.query_selector_all('.fb .mv')
    assert [m.inner_text() for m in mv] == ['; however,']
    t = p.inner_text('.fb')
    assert '用逗號連兩個子句，中間要放連接詞 → but' in t


def to_check_upto(p, n):
    p.click('#toPr')
    for a in p.evaluate('__pos.PR.map(q=>q.a)')[:n]:
        answer(p, a)
        p.click('#next')


@pytest.mark.parametrize('i', range(4))
def test_each_check_wrong_jumps_to_its_demo(open_page, i):
    p = open_page()
    to_check(p)
    for _ in range(i):
        answer(p, p.evaluate('__pos.CHK[__pos.st.chk.i].a'))
        p.click('#next')
    cid, did, label, ans = JUMP[i]
    a = p.evaluate('__pos.CHK[%d].a' % i)
    for wrong in [k for k in range(4) if k != a]:
        p.evaluate("()=>{delete __pos.st.chk.ans['%s'];__pos.view('chk')}" % cid)
        answer(p, wrong)
        assert p.inner_text('#toDemo') == label
        p.click('#toDemo')
        t = p.inner_text('#app')
        assert did in t and ans in t and ('你在 %s 答錯了' % cid) in t
        p.click('#back')
        t = p.inner_text('#app')
        assert cid in t and '空格的工作' in t and p.query_selector('#toDemo')


def test_l6_done_screen_and_entry_from_l5(open_page):
    p = open_page()
    assert p.query_selector('#l1video').get_attribute('src') == 'lesson6.mp4'
    assert '完整方案' in p.inner_text('#app')
    finish(p)
    t = p.inner_text('#app')
    assert '第 6 課完成！' in t and '這次答對 4／4 題' in t
    p.wait_for_timeout(300)
    assert p.evaluate('window.__ins') == [], '第 6 課目前不送事件'
    q = open_page(L3_PAGE)
    finish(q)
    assert q.get_attribute('#nextl', 'href') == 'l6.html', '第 5 課完成畫面接第 6 課'
    assert 'pri' in q.get_attribute('#nextl', 'class') and 'line' in q.get_attribute('#d17', 'class')
