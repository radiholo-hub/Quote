"""詞性小課第 3 課（pos/l3.html）：答案與審閱稿 v2 一致、4 題確認題答錯都能跳回各自的示範再回到原題，
第 2 課完成畫面能接到第 3 課，前測 MAIN_V 結果推薦第 3 課。"""
import pytest

from conftest import ROOT

L2 = ROOT / 'pos' / 'l2.html'
L3 = ROOT / 'pos' / 'l3.html'
POS = ROOT / 'pos' / 'index.html'
STUB = ("window.__ins=[];window.supabase={createClient:function(){return {from:function(t){return {insert:function(row){"
        "window.__ins.push([t,row.name]);return Promise.resolve({error:null})}}}}}};")
JUMP = [('L3-CHK-01', 'L3-DEMO-01', '看同類示範（示範1）', '答案：(B) guides'),
        ('L3-CHK-02', 'L3-DEMO-02', '看同類示範（示範2）', '答案：(A) show'),
        ('L3-CHK-03', 'L3-DEMO-03', '看同類示範（示範3）', '答案：(C) notify'),
        ('L3-CHK-04', 'L3-DEMO-04', '看同類示範（示範4）', '答案：(D) review')]


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
    d = p.evaluate("()=>({demo:__pos.DEMOS.map(d=>[d.id,'ABCD'[d.a]]),pr:__pos.PR.map(q=>[q.id,'ABCD'[q.a],q.c,q.o[q.a]]),"
                   "chk:__pos.CHK.map(q=>[q.id,'ABCD'[q.a],__pos.DEMOS[q.demo].id]),"
                   "x:__pos.PR.concat(__pos.CHK).map(q=>q.x.map((t,k)=>k===q.a?t===null:!!t).every(Boolean)),"
                   "zh:__pos.DEMOS.concat(__pos.PR,__pos.CHK).filter(q=>!q.zh).map(q=>q.id)})")
    assert d['demo'] == [['L3-DEMO-0%d' % i, a] for i, a in zip(range(1, 5), 'BACD')]
    assert [x[0] for x in d['pr']] == ['L3-PR-%02d' % i for i in range(1, 11)]
    assert ''.join(x[1] for x in d['pr']) == 'CABDCDABDA'
    assert [x[2] for x in d['pr']].count('ADV_V') == 1 and d['pr'][4][2] == 'ADV_V'
    assert d['pr'][9][3] == 'directs', 'v2：PR-10 改為缺主要動詞題'
    assert d['chk'] == [[c, a, demo] for (c, demo, _, _), a in zip(JUMP, 'ABCD')]
    assert all(d['x']), '每題三個錯誤選項都有解析，正解位置留空'
    assert d['zh'] == [], '每題都有中文翻譯'


def test_no_tense_items(open_page):
    """v2：時態題留到後續課程，選項不出現過去式。"""
    p = open_page()
    opts = p.evaluate('__pos.DEMOS.concat(__pos.PR,__pos.CHK).flatMap(q=>q.o)')
    assert 'opened' not in opts and not [o for o in opts if o.endswith('ed') and o not in ('notified', 'need', 'to need')]


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
        assert p.is_hidden('#demoBox')
        p.click('#toDemo')
        t = p.inner_text('#demoBox')
        assert did in t and ans in t, '示範直接在原題下方展開'
        assert p.inner_text('#toDemo') == '收起示範'
        p.click('#toDemo')
        assert p.is_hidden('#demoBox') and cid in p.inner_text('#app'), '收起後仍在原題'


def test_l3_done_screen(open_page):
    p = open_page()
    assert p.query_selector('#l1video').get_attribute('src') == 'lesson3.mp4'
    assert '第 1～3 課免費試學' in p.inner_text('#app')
    finish(p)
    t = p.inner_text('#app')
    assert '第 3 課完成！' in t and '這次答對 4／4 題' in t
    assert p.get_attribute('#d17', 'href') == '../#day1-7'
    p.wait_for_timeout(300)
    assert p.evaluate('window.__ins') == [], '第 3 課目前不送事件'


def test_l2_done_links_to_l3(open_page):
    p = open_page(L2)
    finish(p)
    btn = p.query_selector('#toL3')
    assert btn.inner_text() == '繼續第 3 課｜先看主要動詞' and btn.get_attribute('href') == 'l3.html'
    assert 'pri' in btn.get_attribute('class')
    assert '下一課（第 1～3 課免費試學）' in p.inner_text('#app')
    p.click('#toL3')
    p.wait_for_url('**/pos/l3.html')
    p.wait_for_function('!!(window.__pos && window.__pos.view)')
    assert '空格需要動詞嗎' in p.inner_text('#app')


def _pretest(p, wrong_codes):
    """前測：wrong_codes 裡的類別全部答錯（有把握），其他答對。"""
    p.click('#go')
    for q in p.evaluate('__pos.PRE.map(q=>[q.a,q.c])'):
        a, c = q
        p.click('.opt[data-k="%d"]' % (((a + 1) % 4) if c in wrong_codes else a))
        p.evaluate('window.__pi=__pos.st.pre.i')
        p.click('[data-conf="sure"]')   # 點把握度就自動下一題
        p.wait_for_function('__pos.st.pre.i!==window.__pi||!!document.getElementById("trial")')


@pytest.mark.parametrize('codes,href,btn', [
    (['MAIN_V'], 'l3.html', '免費試學第 3 課：先看句子缺不缺主要動詞'),
    (['NOUN'], 'l2.html', '免費試學第 2 課：先找中心名詞'),
])
def test_pretest_recommends_lesson(open_page, codes, href, btn):
    p = open_page(POS, '?debug=1')
    _pretest(p, codes)
    rec = p.query_selector('#recLesson')
    assert rec.inner_text() == btn and rec.get_attribute('href') == href
    assert p.inner_text('#trial') == '或從第 1 課開始', '仍可從第 1 課開始'
    assert '第 1～3 課免費試學' in p.inner_text('#app')


def test_pretest_adj_adv_still_recommends_lesson1(open_page):
    p = open_page(POS, '?debug=1')
    _pretest(p, ['ADV_V'])
    assert not p.query_selector('#recLesson')
    assert p.inner_text('#trial') == '免費試學第 1 課：形容詞與副詞怎麼選'
