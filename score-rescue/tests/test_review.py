"""錯題回顧：有錯題直接開始；沒有錯題時先說明，改出最大弱項最多 8 題。"""
NOTE = '目前沒有錯題，這次為你安排弱項練習。'


def test_bonus_review_with_wrongs_starts_directly(app):
    app.setup(paid=False, wrongs=True, days_done={1: True, 2: True, 3: True})
    app.js("__t.startBonusReview()")
    assert app.quiz() is not None
    app.finish_direct()
    assert app.text('.done-card .lab') == '錯題回顧體驗完成' and app.js("__t.S.bonusReview")


def test_bonus_review_without_wrongs_explains_first(app):
    app.setup(paid=False, wrongs=False, days_done={1: True, 2: True, 3: True})
    app.js("__t.startBonusReview()")
    assert app.quiz() is None and app.text('.redo-note') == NOTE
    assert app.text('.done-card [data-act=bonusReview]') == '開始 8 題練習'
    app.page.click('.done-card [data-act=bonusReview]')
    q = app.quiz()
    assert q['n'] == 8 and set(q['tags']) == {app.js("__t.planRanked()[0].t")}


def test_day7_review(app):
    app.setup(paid=True, wrongs=False, days_done={d: True for d in range(1, 7)})
    app.js("__t.startPlanDay(7)")
    assert app.text('.redo-note') == NOTE and app.text('.done-card .lab') == 'Day 7 · 錯題回顧'
    app.page.click('.done-card [data-act=beginDay]')
    app.finish_direct()
    assert app.js("!!__t.S.daysDone[7]")
    app.setup(paid=True, wrongs=True, days_done={d: True for d in range(1, 7)})
    app.js("__t.startPlanDay(7)")
    assert app.quiz() is not None
