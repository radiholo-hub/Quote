"""詞性小課第 5 課（pos/l5.html）：答案與 v1.3 定稿一致、4 題確認題答錯都能跳回各自的示範再回到原題。
第 5 課屬於完整方案，第 4 課完成畫面暫不接入口。"""
import pytest

from conftest import ROOT

L2 = ROOT / 'pos' / 'l2.html'
L3 = ROOT / 'pos' / 'l5.html'
L3_PAGE = ROOT / 'pos' / 'l4.html'
POS = ROOT / 'pos' / 'index.html'
STUB = ("window.__ins=[];window.supabase={createClient:function(){return {from:function(t){return {insert:function(row){"
        "window.__ins.push([t,row.name]);return Promise.resolve({error:null})}}}}}};")
JUMP = [('L5-CHK-01', 'L5-DEMO-01', '回看示範1（L5-DEMO-01）', '答案：(B) to open'),
        ('L5-CHK-02', 'L5-DEMO-02', '回看示範2（L5-DEMO-02）', '答案：(C) moving'),
        ('L5-CHK-03', 'L5-DEMO-03', '回看示範3（L5-DEMO-03）', '答案：(C) providing'),
        ('L5-CHK-04', 'L5-DEMO-04', '回看示範4（L5-DEMO-04）', '答案：(C) operating')]


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
    assert [x[1:] for x in d['demo']] == [['B', 'to open'], ['C', 'moving'], ['C', 'providing'], ['C', 'operating']]
    assert [x[0] for x in d['pr']] == ['L5-PR-%02d' % i for i in range(1, 11)]
    assert ''.join(x[1] for x in d['pr']) == 'ADBBACDACB'
    assert [x[3] for x in d['pr']] == ['to welcome', 'editing', 'working', 'to lower', 'shorten', 'making', 'booking', 'preserving', 'to repair', 'to cover']
    assert set(x[2] for x in d['pr']) == {'VFORM'}
    assert [x[2] for x in d['chk']] == ['to release', 'teaching', 'reducing', 'showing']
    assert ''.join(x[1] for x in d['chk']) == 'ABCD'
    assert [x[3] for x in d['chk']] == ['L5-DEMO-01', 'L5-DEMO-02', 'L5-DEMO-03', 'L5-DEMO-04']
    assert all(d['x']) and d['zh'] == []


def test_pr09_refuse_explanation(open_page):
    """PR-09（v1.3）：refused to repair，解析用老師版本。"""
    p = open_page()
    to_check_upto(p, 8)
    answer(p, 0)
    t = p.inner_text('.fb')
    assert '先看 refused。refuse 後接 to＋原形動詞，所以選 to repair' in t
    assert '沒有書面協議就拒絕維修' in t


def test_pr05_contrast_frames_shortening(open_page):
    """PR-05 對照題：in order to 的 to 是不定詞；對照句 committed to shortening 有框起來。"""
    p = open_page()
    to_check_upto(p, 4)
    answer(p, 1)
    mv = p.query_selector_all('.fb .mv')
    assert [m.inner_text() for m in mv] == ['shortening']
    t = p.inner_text('.fb')
    assert 'The bank is committed to shortening waiting times.' in t
    assert '這個 to 是不定詞 → 原形' in t


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


def test_l5_done_screen_and_entry_from_l4(open_page):
    p = open_page()
    assert p.query_selector('#l1video').get_attribute('src') == 'lesson5.mp4'
    assert '完整方案' in p.inner_text('#app')
    finish(p)
    t = p.inner_text('#app')
    assert '第 5 課完成！' in t and '這次答對 4／4 題' in t
    p.wait_for_timeout(300)
    assert p.evaluate('window.__ins') == [], '第 5 課目前不送事件'
    q = open_page(L3_PAGE)
    finish(q)
    assert q.get_attribute('#nextl', 'href') == 'l5.html', '第 4 課完成畫面接第 5 課'
    assert 'pri' in q.get_attribute('#nextl', 'class') and 'line' in q.get_attribute('#d17', 'class')
