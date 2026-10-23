"""挑戰練習（只限付費）：目前難度新題不足 5 題，且高一級新題夠完成剩餘升級要求時才提供；
挑戰題單獨分組，連續兩組各 4/5 升級，未達標不降級；難度改變時清空累計、保留紀錄。"""
TAG = 'agree'
INTRO = '這組是高一級的挑戰題。每組 5 題，連續兩組各答對至少 4 題，這個類別就會升一級；沒達標也不會降級。'


def _setup(app, level=2, cur=3, nxt=10, paid=True, wrongs=True):
    app.setup(level=level, paid=paid, wrongs=wrongs, days_done={1: True}, diag_skip_tag=TAG)
    app.mark_seen(TAG, level, cur)
    if level < 3:
        app.mark_seen(TAG, level + 1, nxt)
    app.score(TAG, 9, 'Day 9 完成')


def _round(app, right):
    app.page.click('[data-act=chTag]')
    app.page.click('.done-card [data-act=chTag]')
    app.play(right)


def st(app):
    return app.js("t=>__t.tagState(t)", TAG)


def test_enough_current_fresh_offers_extra_not_challenge(app):
    _setup(app, cur=8)
    assert app.count('[data-act=moreTag]') == 1 and app.count('[data-act=chTag]') == 0


def test_next_level_9_not_offered_10_offered(app):
    _setup(app, nxt=9)
    assert app.count('[data-act=chTag]') == 0 and '建議前往「錯題回顧」' in app.box()
    _setup(app, nxt=10)
    assert app.text('[data-act=chTag]') == '挑戰練習：進階 5 題'
    assert app.count('[data-act=moreReview]') == 1 and '你可以複習錯題，或挑戰高一級的題目。' in app.box()


def test_texts_without_wrongs(app):
    _setup(app, nxt=10, wrongs=False)
    assert app.count('[data-act=moreReview]') == 0 and '你可以挑戰高一級的題目，也可以先練習其他類別。' in app.box()
    _setup(app, nxt=9, wrongs=False)
    assert app.box().strip() == '這個類別在目前難度的新題不足 5 題，可以先練習其他類別。'


def test_intro_and_question_label(app):
    _setup(app)
    app.page.click('[data-act=chTag]')
    assert INTRO in app.text('.done-card') and '開始 5 題挑戰' in app.text('.done-card')
    app.page.click('.done-card [data-act=chTag]')
    q = app.quiz()
    assert q['n'] == 5 and q['lv'] == [3] * 5 and not any(q['seen']) and set(q['tags']) == {TAG}
    assert app.text('#qLv') == '本題難度：進階・挑戰題'


def test_progress_then_promotion(app):
    _setup(app)
    _round(app, 4)
    assert app.text('.ch-res') == '挑戰進度：已連續 1 組達標，再 1 組達標即升級。'
    assert st(app)['lv'] == 2 and st(app)['cs'] == 1
    assert app.text('[data-act=chTag]') == '繼續挑戰：進階 5 題', '已達標一組、剩 5 題可繼續'
    _round(app, 5)
    assert app.text('.ch-res') == '挑戰成功！「主詞動詞一致」升到進階，下一次練習會使用進階題目。'
    assert st(app)['lv'] == 3
    assert app.count('[data-act=chTag]') == 0, '已在進階不提供挑戰'
    assert app.js("__t.S.plog.filter(e=>e[4]).length") == 10, '作答紀錄保留'


def test_one_achieved_but_only_4_left(app):
    _setup(app)
    _round(app, 4)
    app.js("t=>{const f=__t.chFreshList(t);__t.S.seen[f[0].id]=1}", TAG)
    app.score(TAG, 9)
    assert app.count('[data-act=chTag]') == 0


def test_fail_resets_streak_and_never_demotes(app):
    _setup(app)
    _round(app, 3)
    assert app.text('.ch-res') == '本組未達標，目前難度維持中階。'
    assert st(app)['lv'] == 2 and st(app)['cs'] == 0
    assert app.count('[data-act=chTag]') == 0, '連續中斷後需要 10 題，只剩 5 題不提供'
    _setup(app)
    _round(app, 0)
    assert st(app)['lv'] == 2, '挑戰 0/5 不降級'


def test_no_double_counting_after_promotion(app):
    _setup(app, level=1, nxt=15)
    _round(app, 4); _round(app, 4)
    assert st(app)['lv'] == 2
    app.js("t=>{const S=__t.S;__t.PBANK.filter(q=>q.tag===t&&q.lv===2&&!S.seen[q.id]).slice(0,5).forEach((q,k)=>{S.plog.push([q.id,k<4?1:0,1,0,0]);S.seen[q.id]=1})}", TAG)
    assert st(app)['lv'] == 2, '挑戰題不會再算進新難度的一般紀錄'


def test_normal_level_change_clears_challenge(app):
    _setup(app, cur=10, nxt=15)
    app.js("t=>{const S=__t.S;__t.chFreshList(t).slice(0,5).forEach(q=>{S.plog.push([q.id,1,1,0,1]);S.seen[q.id]=1})}", TAG)
    assert st(app)['cs'] == 1
    app.js("t=>{const S=__t.S;__t.PBANK.filter(q=>q.tag===t&&q.lv===2&&!S.seen[q.id]).slice(0,5).forEach(q=>{S.plog.push([q.id,0,1,0,0]);S.seen[q.id]=1})}", TAG)
    s = st(app)
    assert s['lv'] == 1 and s['cs'] == 0


def test_partial_block_resumes_remaining(app):
    _setup(app)
    app.js("t=>{const S=__t.S;__t.chFreshList(t).slice(0,2).forEach(q=>{S.plog.push([q.id,1,1,0,1]);S.seen[q.id]=1})}", TAG)
    app.score(TAG, 9)
    assert app.text('[data-act=chTag]') == '挑戰練習：進階 3 題'
    app.page.click('[data-act=chTag]')
    assert '開始 3 題挑戰' in app.text('.done-card')
    app.page.click('.done-card [data-act=chTag]')
    assert app.text('#runCount') == '第 1 / 3 題'


def test_free_never_gets_challenge(app):
    _setup(app, paid=False)
    assert app.count('[data-act=chTag]') == 0
    app.js("t=>__t.startChallenge(t,9,true)", TAG)
    assert app.quiz() is None
