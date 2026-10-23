"""付費「再練 5 題」與錯題回顧：只在規則日／循環練習日提供；不推進學習天數或再診斷進度。"""


def test_extra_rounds_are_fresh_and_do_not_advance(app):
    app.setup(paid=True, days_done={1: True, 2: True})
    app.js("__t.startPlanDay(3,true)"); app.finish_direct()
    assert app.count('[data-act=moreTag]') == 1
    tag = app.js("document.querySelector('[data-act=moreTag]').dataset.tag")
    before = app.progress()
    rounds = 0
    while app.count('[data-act=moreTag]'):
        app.page.click('[data-act=moreTag]')
        q = app.quiz()
        assert q['n'] == 5 and not any(q['seen']) and set(q['tags']) == {tag}
        app.play(4 if rounds % 2 else 0)
        assert app.text('.done-card .lab') == 'Day 3 加練完成'
        rounds += 1
    assert rounds >= 1
    assert app.progress() == before


def test_insufficient_texts_when_no_challenge_available(app):
    app.setup(paid=True, days_done={1: True, 2: True})
    tag = app.js("__t.planRanked()[1].t")
    app.mark_seen(tag, 2, 3)
    app.js("t=>__t.chFreshList(t).forEach(q=>__t.S.seen[q.id]=1)", tag)
    app.score(tag, 3)
    assert app.box().startswith('這個類別在目前難度的新題不足 5 題，建議前往「錯題回顧」複習。')
    before = app.progress()
    app.page.click('[data-act=moreReview]')
    assert app.quiz()['title'] == '錯題回顧'
    app.finish_direct()
    assert app.text('.done-card .lab') == '錯題回顧完成'
    assert app.progress() == before


def test_no_extra_on_mixed_days(app):
    app.setup(paid=True, days_done={d: True for d in range(1, 7)})
    for d in (7, 8):
        app.js("d=>__t.startPlanDay(d,true)", d); app.finish_direct()
        assert app.count('.sc-more') == 0, 'Day %d' % d
