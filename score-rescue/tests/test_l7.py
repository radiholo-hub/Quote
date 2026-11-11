"""詞性小課第 7 課（pos/l7.html）：答案與 v1.2 定稿一致、4 題確認題答錯都能跳回各自的示範再回到原題。
第 7 課屬於完整方案，第 6 課完成畫面暫不接入口；完成畫面先寫「第 7 課已完成」。"""
import pytest

from conftest import ROOT

L2 = ROOT / 'pos' / 'l2.html'
L3 = ROOT / 'pos' / 'l7.html'
L3_PAGE = ROOT / 'pos' / 'l6.html'
POS = ROOT / 'pos' / 'index.html'
STUB = ("window.__ins=[];window.supabase={createClient:function(){return {from:function(t){return {insert:function(row){"
        "window.__ins.push([t,row.name]);return Promise.resolve({error:null})}}}}}};")
JUMP = [('L7-CHK-01', 'L7-DEMO-01', '回看示範1（L7-DEMO-01）', '答案：(A) who'),
        ('L7-CHK-02', 'L7-DEMO-02', '回看示範2（L7-DEMO-02）', '答案：(C) which'),
        ('L7-CHK-03', 'L7-DEMO-03', '回看示範3（L7-DEMO-03）', '答案：(C) whose'),
        ('L7-CHK-04', 'L7-DEMO-04', '回看示範4（L7-DEMO-04）', '答案：(C) which')]


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
    assert [x[1:] for x in d['demo']] == [['A', 'who'], ['C', 'which'], ['C', 'whose'], ['C', 'which']]
    assert [x[0] for x in d['pr']] == ['L7-PR-%02d' % i for i in range(1, 11)]
    assert ''.join(x[1] for x in d['pr']) == 'CABDABACBD'
    assert [x[3] for x in d['pr']] == ['who', 'which', 'whose', 'which', 'sent', 'who', 'whose', 'which', 'whom', 'which']
    assert [x[2] for x in d['pr']].count('MAIN_V') == 1 and d['pr'][4][2] == 'MAIN_V'
    assert [x[2] for x in d['chk']] == ['who', 'which', 'whose', 'which']
    assert ''.join(x[1] for x in d['chk']) == 'ABCD'
    assert [x[3] for x in d['chk']] == ['L7-DEMO-01', 'L7-DEMO-02', 'L7-DEMO-03', 'L7-DEMO-04']
    assert all(d['x']) and d['zh'] == []


def test_no_that_in_options(open_page):
    """選項不放 that；whose 題的 who／whom 排除理由統一。"""
    p = open_page()
    qs = p.evaluate('__pos.PR.concat(__pos.CHK,__pos.DEMOS)')
    for q in qs:
        assert 'that' not in [x.lower() for x in q['o']], q['id']
    for q in p.evaluate('__pos.PR.concat(__pos.CHK)'):
        if q['o'][q['a']] == 'whose':
            for k, t in enumerate(q['o']):
                if t in ('who', 'whom'):
                    assert '本題需要表示所屬的 whose＋名詞' in q['x'][k], q['id']


def test_pr05_main_verb_contrast(open_page):
    """PR-05 對照題：括起關係子句，主句的 sent 框起來。"""
    p = open_page()
    to_check_upto(p, 4)
    answer(p, 2)
    assert [m.inner_text() for m in p.query_selector_all('.fb .mv')] == ['sent']
    assert '括起 who repaired the copier' in p.inner_text('.fb')


def test_pr06_mask_commas(open_page):
    """PR-06：先遮住兩個逗號之間，主句 Mr. Patel will retire；不能用 that。"""
    p = open_page()
    to_check_upto(p, 5)
    answer(p, 0)
    t = p.inner_text('.fb')
    assert '主句是 Mr. Patel will retire in May.' in t and '不能用 that' in t


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


def test_l7_done_screen_and_no_entry_from_l6(open_page):
    p = open_page()
    assert p.query_selector('#l1video').get_attribute('src') == 'lesson7.mp4'
    assert '完整方案' in p.inner_text('#app')
    finish(p)
    t = p.inner_text('#app')
    assert '第 7 課已完成！' in t and '這次答對 4／4 題' in t
    p.wait_for_timeout(300)
    assert p.evaluate('window.__ins') == [], '第 7 課目前不送事件'
    q = open_page(L3_PAGE)
    finish(q)
    assert 'l7.html' not in q.content(), '第 6 課完成畫面暫不接第 7 課'
