"""畫面：難度標示、完成頁錯題（A–D、發音、查看解析）、閱讀朗讀、手機標題與首頁文案。"""
import pytest

RULE = '各類別會依目前難度的新題作答表現，分別調整難度。每 5 題一組，連續兩組各答對至少 4 題就升一級；一組只答對 0–1 題就降一級。重做舊題與低一級的補強題不計入。'
PACE = '一般練習日安排 5–20 題，Day 14、30 各有 30 題重測，可依自己的步調完成。'


def test_level_labels(app):
    app.setup(paid=True, days_done={1: True, 2: True})
    app.js("""()=>{const t=__t,S=t.S;const ids=(tag,lv)=>t.PBANK.filter(q=>q.tag===tag&&q.lv===lv).map(q=>q.id);
      const t0=S.planOrder[0],t1=S.planOrder[1];
      S.plog=[...ids(t0,2).slice(0,10).map(id=>[id,1,1,0]),...ids(t1,2).slice(0,5).map((id,k)=>[id,k<1?1:0,1,0])]}""")
    app.js("()=>{__t.show('plan');__t.renderPlan()}")
    assert '起始程度：中階' in app.page.locator('#planBody .lead').first.inner_text()
    assert app.text('.lv-now').endswith('目前練習難度：基礎')
    assert not app.js("document.querySelector('.lv-sec').open"), '預設收起'
    assert app.count('.lv-sec li') == 8 and app.js("document.querySelector('.lv-sec .fine').textContent") == RULE
    assert app.js("getComputedStyle(document.querySelector('.lv-chip.lv3')).color") == 'rgb(107, 63, 194)'
    app.js("__t.startPlanDay(3,true)")
    lv = app.js("__t.BANK[__t.getR().list[0].id].lv")
    assert app.text('#qLv') == '本題難度：' + ['', '基礎', '中階', '進階'][lv]
    app.js("()=>{const q=__t.PBANK.find(q=>q.lv===1);__t.runQuiz({list:[Object.assign(__t.prep(q),{sup:1})],mode:'day',title:'Day 4 · 測試',back:'plan',onDone:()=>{}})}")
    assert app.text('#qLv') == '本題難度：基礎・補強題'
    app.js("()=>__t.runQuiz({list:__t.drawDiag(2,new Set()),mode:'diag',title:'弱點診斷',back:'home',level:2,onDone:()=>{}})")
    assert app.page.locator('#qLv').is_hidden(), '診斷不顯示難度'


def test_completion_wrong_cards(app):
    app.setup(paid=True)
    r = app.js("""()=>{const t=__t;const q1=t.prep(t.BANK[408]),q2=t.readingItem(t.RBANK[0]),q3=t.readingItem(t.RBANK.findIndex(r=>r.passages.length>1)>=0?t.RBANK[t.RBANK.findIndex(r=>r.passages.length>1)]:t.RBANK[1]);
      const my=[(q1.a+1)%4,(q2.a+1)%4,(q3.a+1)%4];t.showScore({list:[q1,q2,q3],ans:my},'Day 1 完成');
      return {my1:q1.o[my[0]],ans1:q1.o[q1.a],ev2:q2.ev.length,ev3:q3.ev.length}}""")
    cards = app.page.locator('.sc-wrong>ul>li')
    assert cards.count() == 3
    first = cards.nth(0)
    assert first.locator('.sc-opt.ok').count() == 1 and first.locator('.sc-opt.bad').count() == 1
    assert '✓ 正確答案' in first.inner_text() and '✕ 你的選擇' in first.inner_text()
    assert first.locator('.sc-q [data-speak]').count() == 1 and first.locator('.sc-opt [data-speak]').count() == 4
    assert cards.nth(1).locator('.sc-q [data-speak]').count() == 0, '閱讀題題目不附發音'
    assert app.js("[...document.querySelectorAll('.sc-ex')].every(e=>!e.open)"), '查看解析預設收起'
    app.js("document.querySelectorAll('.sc-ex').forEach(e=>e.open=true)")
    c1 = app.js("""()=>{const e=document.querySelectorAll('.sc-ex')[0];return{h:[...e.querySelectorAll('.ac-sec h3')].map(x=>x.textContent),
      moreOpen:e.querySelector('details.ac-more').open,others:[...e.querySelectorAll('details.ac-more li b')].map(x=>x.textContent),speak:e.querySelectorAll('[data-speak]').length}}""")
    assert c1['h'][0].startswith('為什麼選') and '你錯在哪裡？' in c1['h'] and '下次怎麼判斷？' in c1['h']
    assert not c1['moreOpen'] and len(c1['others']) == 2
    assert not any(r['my1'] in x or r['ans1'] in x for x in c1['others'])
    assert c1['speak'] == 0
    c2 = app.js("""()=>{const e=document.querySelectorAll('.sc-ex')[1];return{ev:e.querySelectorAll('.ac-ev .ev-en').length,heads:e.querySelectorAll('.ac-ev .p-head').length,
      full:[...e.querySelectorAll('details.ac-more summary')].map(x=>x.textContent),marks:e.querySelectorAll('details.ac-more mark').length}}""")
    assert c2['ev'] == r['ev2'] and c2['heads'] == 0 and c2['full'] == ['看完整文章'] and c2['marks'] > 0
    heads = app.js("[...document.querySelectorAll('.sc-ex')[2].querySelectorAll('.ac-ev .p-head')].map(x=>x.textContent)")
    assert heads and all(h.startswith('第 ') and '篇・' in h for h in heads)
    assert not app.js("document.documentElement.scrollWidth>innerWidth+1")


def test_reading_read_aloud_after_answer(app):
    app.setup(paid=True)
    multi = app.js("__t.RBANK.findIndex(r=>r.passages.length>1)")
    for idx in (0, multi):
        app.js("i=>__t.runQuiz({list:[__t.readingItem(__t.RBANK[i])],mode:'day',title:'Day 11 · 閱讀理解（上）',back:'plan',onDone:()=>{}})", idx)
        assert app.count('#qPassage [data-speak]') == 0 and app.count('#qText [data-speak]') == 0
        wrong = app.js("(__t.getR().list[0].a+1)%4")
        app.page.locator('#qOpts .opt').nth(wrong).click()
        spoken = app.js("[...document.querySelectorAll('#qPassage .p-speak [data-speak]')].map(b=>b.dataset.speak)")
        assert spoken == app.js("i=>__t.RBANK[i].passages.map(p=>p.body)", idx)
        r = app.js("i=>__t.RBANK[i]", idx)
        assert app.js("document.querySelector('#qText [data-speak]').dataset.speak") == r['q'] + ' Answer: ' + r['o'][r['a']]
        assert app.count('#qPassage mark') > 0


@pytest.mark.parametrize('width', [320, 360, 390])
def test_mobile_three_part_title(open_app, width):
    app = open_app(width=width)
    app.js("()=>__t.runQuiz({list:[__t.prep(__t.PBANK[0])],mode:'day',title:'Day 9 · 挑戰練習 · 主詞動詞一致',back:'plan',onDone:()=>{}})")
    assert app.js("[...document.querySelectorAll('#runTitle .rt-l')].map(e=>e.textContent)") == ['Day 9 · 挑戰練習', '主詞動詞一致']
    h = app.js("""()=>{const c=document.querySelector('#runCount'),lh=parseFloat(getComputedStyle(c).lineHeight)||20;
      return{count:c.getBoundingClientRect().height,lh:lh,lines:[...document.querySelectorAll('#runTitle .rt-l')].map(e=>e.getBoundingClientRect().height)}}""")
    assert h['count'] < h['lh'] * 1.6 and all(x < h['lh'] * 1.6 + 4 for x in h['lines'])
    app.js("()=>__t.runQuiz({list:[__t.prep(__t.PBANK[0])],mode:'day',title:'Day 3 · 單字辨析',back:'plan',onDone:()=>{}})")
    assert app.count('#runTitle .rt-l') == 0 and app.text('#runTitle') == 'Day 3 · 單字辨析'
    assert not app.js("document.documentElement.scrollWidth>innerWidth+1")


def test_homepage_copy(app):
    home = app.js("document.querySelector('#view-home').innerText")
    assert '15–20 分鐘' not in app.page.content() and '答錯副詞題' not in home
    assert '依診斷結果安排弱項練習，各類難度再依作答表現調整。' + PACE in home
    assert 'Day 1 可免費加練一次（需有足夠新題）' in home
    assert '新題足夠時可繼續同類加練；符合條件時，可挑戰高一級題目' in home
