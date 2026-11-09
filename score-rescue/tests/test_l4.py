"""詞性小課第 4 課（pos/l4.html）：答案與審閱稿 v2 一致、4 題確認題答錯都能跳回各自的示範再回到原題（CHK-02 → growing）。
第 4 課屬於完整方案，第 3 課完成畫面暫不接入口。"""
import pytest

from conftest import ROOT

L2 = ROOT / 'pos' / 'l2.html'
L3 = ROOT / 'pos' / 'l4.html'
L3_PAGE = ROOT / 'pos' / 'l3.html'
POS = ROOT / 'pos' / 'index.html'
STUB = ("window.__ins=[];window.supabase={createClient:function(){return {from:function(t){return {insert:function(row){"
        "window.__ins.push([t,row.name]);return Promise.resolve({error:null})}}}}}};")
JUMP = [('L4-CHK-01', 'L4-DEMO-01', '回看示範1（L4-DEMO-01）', '答案：(D) adjusted'),
        ('L4-CHK-02', 'L4-DEMO-02', '回看示範2（L4-DEMO-02）', '答案：(B) growing'),
        ('L4-CHK-03', 'L4-DEMO-03', '回看示範3（L4-DEMO-03）', '答案：(C) touring'),
        ('L4-CHK-04', 'L4-DEMO-04', '回看示範4（L4-DEMO-04）', '答案：(A) attached')]


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
    assert [x[1:] for x in d['demo']] == [['D', 'adjusted'], ['B', 'growing'], ['C', 'touring'], ['A', 'attached']]
    assert [x[0] for x in d['pr']] == ['L4-PR-%02d' % i for i in range(1, 11)]
    assert ''.join(x[1] for x in d['pr']) == 'ABCDABCDBA'
    assert [x[3] for x in d['pr']] == ['restored', 'designated', 'taking', 'featured', 'include', 'presented', 'existing', 'wishing', 'certified', 'sold']
    assert [x[2] for x in d['pr']].count('MAIN_V') == 1 and d['pr'][4][2] == 'MAIN_V'
    assert [x[2] for x in d['chk']] == ['enclosed', 'winning', 'spending', 'listed']
    assert [x[3] for x in d['chk']] == ['L4-DEMO-01', 'L4-DEMO-02', 'L4-DEMO-03', 'L4-DEMO-04']
    assert all(d['x']) and d['zh'] == []


def test_pr05_contrast_frames_is_sent(open_page):
    """PR-05 解析：對照句的主要動詞片語 is sent 有框起來。"""
    p = open_page()
    to_check_upto(p, 4)
    answer(p, 2)
    mv = p.query_selector_all('.fb .mv')
    assert [m.inner_text() for m in mv] == ['is sent', 'is sent']
    t = p.inner_text('.fb')
    assert 'The newsletter including news from all our branches is sent every Friday.' in t
    assert '這段是在修飾 newsletter，說明電子報包含哪些內容' in t


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


def test_l4_done_screen_and_no_entry_from_l3(open_page):
    p = open_page()
    assert p.query_selector('#l1video').get_attribute('src') == 'lesson4.mp4'
    assert '完整方案' in p.inner_text('#app')
    finish(p)
    t = p.inner_text('#app')
    assert '第 4 課完成！' in t and '這次答對 4／4 題' in t
    p.wait_for_timeout(300)
    assert p.evaluate('window.__ins') == [], '第 4 課目前不送事件'
    q = open_page(L3_PAGE)
    finish(q)
    assert 'l4.html' not in q.content(), '第 3 課完成畫面暫不接第 4 課'
