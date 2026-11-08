"""詞性小課第 2 課（pos/l2.html）：答案與審閱稿 v3.1 一致、4 題確認題答錯都能跳回各自的示範再回到原題。"""
import pytest

from conftest import ROOT

L2 = ROOT / 'pos' / 'l2.html'
STUB = ("window.__ins=[];window.supabase={createClient:function(){return {from:function(t){return {insert:function(row){"
        "window.__ins.push([t,row.name]);return Promise.resolve({error:null})}}}}}};")
JUMP = [('L2-CHK-01', 'L2-DEMO-01', '回看示範1（L2-DEMO-01）', '答案：(B) proposal'),
        ('L2-CHK-02', 'L2-DEMO-02', '回看示範2（L2-DEMO-02）', '答案：(C) installation'),
        ('L2-CHK-03', 'L2-DEMO-03', '回看示範3（L2-DEMO-03）', '答案：(C) patience'),
        ('L2-CHK-04', 'L2-DEMO-04', '回看示範4（L2-DEMO-04）', '答案：(B) registration')]


@pytest.fixture
def open_l2(browser):
    ctxs = []

    def _open(query=''):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=STUB))
        page = ctx.new_page()
        errs = []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.goto(L2.as_uri() + query)
        page.wait_for_function('window.__pos')
        ctxs.append((ctx, errs))
        return page

    yield _open
    for ctx, errs in ctxs:
        ctx.close()
        assert not errs, '頁面錯誤：%s' % errs


def answer(p, k, conf='sure'):
    p.click('.opt[data-k="%d"]' % k)
    p.click('[data-conf="%s"]' % conf)
    p.click('#submit')


def to_check(p):
    p.click('#toPr')
    for a in p.evaluate('__pos.PR.map(q=>q.a)'):
        answer(p, a)
        p.click('#next')


def test_answer_keys_match_review_doc(open_l2):
    p = open_l2()
    d = p.evaluate("()=>({demo:__pos.DEMOS.map(d=>[d.id,'ABCD'[d.a]]),pr:__pos.PR.map(q=>[q.id,'ABCD'[q.a],q.c]),"
                   "chk:__pos.CHK.map(q=>[q.id,'ABCD'[q.a],__pos.DEMOS[q.demo].id]),"
                   "x:__pos.PR.concat(__pos.CHK).map(q=>q.x.map((t,k)=>k===q.a?t===null:!!t).every(Boolean))})")
    assert d['demo'] == [['L2-DEMO-0%d' % i, a] for i, a in zip(range(1, 5), 'BCCB')]
    assert [x[0] for x in d['pr']] == ['L2-PR-%02d' % i for i in range(1, 11)]
    assert ''.join(x[1] for x in d['pr']) == 'DCBADCABCA'
    assert [x[2] for x in d['pr']].count('ADJ_N') == 1 and d['pr'][4][2] == 'ADJ_N'
    assert d['chk'] == [[c, a, demo] for (c, demo, _, _), a in zip(JUMP, 'DABC')]
    assert all(d['x']), '每題三個錯誤選項都有解析，正解位置留空'


def test_revised_explanations(open_l2):
    """v3.1 兩句微調。"""
    p = open_l2()
    x = p.evaluate("()=>[__pos.PR[9].x[3],__pos.CHK[1].x[2]]")
    assert x[0] == '(D) purchases：purchases 可以是複數名詞，也可以是動詞。這裡指的是購買憑證，常用搭配是 purchase receipt。'
    assert x[1] == '(C) merged：merged 是過去式或過去分詞。這句的空格要當主詞片語的中心名詞，表示「合併這件事」，所以用 merger。'


@pytest.mark.parametrize('i', range(4))
def test_each_check_wrong_jumps_to_its_demo(open_l2, i):
    """每題確認題的每一個錯誤選項，都會跳回該題對應的示範，再回到原題。"""
    p = open_l2()
    to_check(p)
    for _ in range(i):
        answer(p, p.evaluate('__pos.CHK[__pos.st.chk.i].a'))
        p.click('#next')
    cid, did, label, ans = JUMP[i]
    a = p.evaluate('__pos.CHK[%d].a' % i)
    for wrong in [k for k in range(4) if k != a]:
        p.evaluate("()=>{delete __pos.st.chk.ans['%s'];__pos.view('chk')}" % cid)   # 同一題重新作答，換下一個錯誤選項
        answer(p, wrong)
        assert p.inner_text('#toDemo') == label
        p.click('#toDemo')
        t = p.inner_text('#app')
        assert did in t and ans in t and ('你在 %s 答錯了' % cid) in t
        p.click('#back')
        t = p.inner_text('#app')
        assert cid in t and '空格的工作' in t and p.query_selector('#toDemo')


def test_first_attempt_score_and_no_events(open_l2):
    p = open_l2()
    to_check(p)
    for i, a in enumerate(p.evaluate('__pos.CHK.map(q=>q.a)')):
        answer(p, (a + 1) % 4 if i == 0 else a)
        p.click('#next')
    t = p.inner_text('#app')
    assert '第 2 課完成！' in t and '這次答對 3／4 題' in t
    p.wait_for_timeout(200)
    assert not p.evaluate('(window.__ins||[]).length'), '第 2 課不送第 1 課的事件'
