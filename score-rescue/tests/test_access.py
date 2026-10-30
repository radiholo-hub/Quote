"""付費權限：付費狀態來自伺服器的付費名單；免費版只開放 Day 1–7，加練、挑戰與模擬試題只限付費。"""


def test_paid_status_comes_from_server(open_app):
    paid = open_app(paid=True)
    assert paid.js("__t.S.paid") is True
    assert paid.js("__t.coveredDays()") == 30 and paid.js("__t.examAllowed()") is True
    free = open_app(paid=False)
    assert free.js("__t.S.paid") is False
    assert free.js("__t.coveredDays()") == 7 and free.js("__t.examAllowed()") is False


def test_free_can_start_day7_but_not_day8(app):
    app.setup(paid=False, days_done={d: True for d in range(1, 7)})
    app.js("__t.startPlanDay(7,true)")
    assert app.quiz() is not None
    app.js("__t.setR(null)")
    app.setup(paid=False, days_done={d: True for d in range(1, 8)})
    app.js("__t.startPlanDay(8,true)")
    assert app.quiz() is None


def test_paid_can_start_day8(app):
    app.setup(paid=True, days_done={d: True for d in range(1, 8)})
    app.js("__t.startPlanDay(8,true)")
    assert app.quiz()['title'].startswith('Day 8')


def test_free_has_no_paid_extras(app):
    app.setup(paid=False)
    tag = app.js("__t.planRanked()[0].t")
    app.js("__t.startPlanDay(1,true)"); app.play()
    app.js("__t.startPlanDay(2,true)"); app.play()
    assert app.count('[data-act=moreTag]') == 0 and app.count('[data-act=chTag]') == 0
    assert app.count('[data-act=seePlans]') == 1
    for call in ("t=>__t.startMore(t,1)", "t=>__t.startChallenge(t,1,true)"):
        app.js(call, tag)
        assert app.quiz() is None
    app.js("__t.startMoreReview()")
    assert app.quiz() is None


def test_paid_day1_offers_extra(app):
    app.setup(paid=True)
    app.js("__t.startPlanDay(1,true)"); app.play()
    assert app.count('[data-act=moreTag]') == 1
    assert app.count('[data-act=freeMore]') == 0 and app.count('[data-act=seePlans]') == 0
