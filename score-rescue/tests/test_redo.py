"""重做已完成的天數：免費版只複習做過的同類題；付費版優先出新題。"""
NOTE = '本次會複習你已做過的同類題目。解鎖完整方案後，可繼續練習同類新題。'


def _free_after_day2(app):
    app.setup(paid=False)
    tag = app.js("__t.planRanked()[0].t")
    app.js("__t.startPlanDay(1)")
    assert app.count('.redo-note') == 0 and '開始 5 題練習' in app.text('.done-card')
    app.page.click('[data-act=beginDay]'); app.play(0)
    app.js("__t.startPlanDay(2)"); app.play()
    return tag


def test_free_redo_reviews_seen_only(app):
    tag = _free_after_day2(app)
    before = app.progress()
    app.js("__t.startPlanDay(1)")
    assert app.text('.done-card .lab') == 'Day 1 · 複習'
    assert app.text('.redo-note') == NOTE and '開始 5 題複習' in app.text('.done-card')
    app.page.click('[data-act=beginDay]')
    q = app.quiz()
    assert q['n'] == 5 and all(q['seen']) and set(q['tags']) == {tag}
    app.play()
    assert app.text('.done-card .lab') == 'Day 1 複習完成'
    assert app.count('[data-act=moreTag],[data-act=chTag]') == 0
    app.js("__t.startPlanDay(2)")               # 循環練習日：先出複習開始頁
    assert app.count('.redo-note') == 1
    app.page.click('[data-act=beginDay]')
    assert all(app.quiz()['seen'])
    app.play()
    assert app.progress() == before


def test_free_redo_with_fewer_than_5_seen(app):
    tag = _free_after_day2(app)
    app.js("t=>{const S=__t.S;Object.keys(S.seen).map(Number).filter(id=>__t.BANK[id].tag===t&&!__t.BANK[id].rs).slice(3).forEach(id=>delete S.seen[id])}", tag)
    app.js("__t.startPlanDay(1)")
    assert '開始 3 題複習' in app.text('.done-card')
    app.page.click('[data-act=beginDay]')
    q = app.quiz()
    assert q['n'] == 3 and all(q['seen'])


def test_free_redo_with_nothing_to_review(app):
    tag = _free_after_day2(app)
    app.js("t=>{const S=__t.S;Object.keys(S.seen).map(Number).filter(id=>__t.BANK[id].tag===t).forEach(id=>delete S.seen[id])}", tag)
    app.js("__t.startPlanDay(2)")
    assert '目前還沒有可複習的同類題目' in app.text('.done-card')
    assert app.count('[data-act=beginDay]') == 0
    app.js("__t.startPlanDay(2,true)")
    assert app.quiz() is None


def test_paid_redo_prefers_new(app):
    app.setup(paid=True)
    app.js("__t.startPlanDay(1,true)"); app.play()
    app.js("__t.startPlanDay(1)")
    assert app.count('.redo-note') == 0
    app.page.click('[data-act=beginDay]')
    q = app.quiz()
    assert q['n'] == 5 and not any(q['seen'])
