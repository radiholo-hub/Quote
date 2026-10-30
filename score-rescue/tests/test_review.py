"""錯題回顧（Day 7）：有錯題直接開始；沒有錯題時先說明，改出最大弱項最多 8 題。免費版也能做 Day 7；不再有額外的錯題回顧體驗入口，舊紀錄保留。"""
NOTE = '目前沒有錯題，這次為你安排弱項練習。'


def test_no_separate_bonus_review_entry(app):
    # 免費體驗延長到 Day 7 後，Day 7 就是錯題回顧，路線上不再有額外的「錯題回顧體驗」入口
    app.setup(paid=False, wrongs=True, days_done={1: True, 2: True, 3: True})
    app.js("__t.go('plan')")
    assert app.count('[data-act=bonusReview]') == 0
    rows = app.js("()=>[...document.querySelectorAll('.road-sec > .road > li')].map(li=>li.textContent)")
    assert len(rows) == 7 and all('免費體驗' not in r for r in rows)


def test_old_bonus_review_record_is_kept(app):
    app.setup(paid=False, days_done={1: True, 2: True, 3: True})
    app.js("()=>{__t.S.bonusReview=true;__t.save()}")
    assert app.js("__t.backupBlob().bonusReview") is True
    app.page.reload(); app.page.wait_for_function('window.__t&&window.__t.S'); app.page.wait_for_timeout(300)
    assert app.js("__t.S.bonusReview") is True


def test_free_day7_review(app):
    app.setup(paid=False, wrongs=True, days_done={d: True for d in range(1, 7)})
    app.js("__t.startPlanDay(7)")
    assert app.quiz() is not None


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
