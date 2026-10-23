"""保留題規則：保留題（rs）與模擬試題 Part 5 題目不進日常練習；重測時才優先使用保留題。"""


def test_daily_pool_excludes_reserved_and_exam(app):
    bad = app.js("()=>__t.PBANK.filter(q=>q.rs||__t.EXAM_STEMS.has(q.q)).length")
    assert bad == 0
    assert app.js("__t.TBANK.length") > 0 and app.js("__t.TBANK.every(q=>q.rs)")


def test_draws_never_use_reserved(app):
    app.setup(paid=True)
    tag = app.js("__t.planRanked()[0].t")
    # 把所有日常題與保留題都標為做過：抽題只能出舊題，但仍不得出現保留題
    app.js("()=>__t.BANK.forEach(q=>__t.S.seen[q.id]=1)")
    picks = app.js("t=>__t.pickFor(t,5).map(q=>q.id)", tag)
    review = app.js("t=>__t.seenReviewList(t,5).map(q=>q.id)", tag)
    wrong = app.js("()=>{__t.BANK.filter(q=>q.rs).slice(0,5).forEach(q=>__t.S.extra[q.id]=false);return __t.wrongReviewList(8).filter(q=>!q.passages).map(q=>q.id)}")
    rs = set(app.js("()=>__t.TBANK.map(q=>q.id)"))
    assert picks and not set(picks) & rs
    assert review and not set(review) & rs
    assert not set(wrong) & rs
    ch = app.js("t=>{const S=__t.S;Object.keys(S.seen).forEach(k=>delete S.seen[k]);return __t.chFreshList(t).map(q=>q.id)}", tag)
    assert ch and not set(ch) & rs


def test_retest_prefers_reserved_first_diag_does_not(app):
    app.setup(paid=True)
    first = app.js("()=>__t.drawDiag(2,new Set()).filter(q=>__t.BANK[q.id].rs).length")
    assert first == 0, '第一次診斷不用保留題'
    r = app.js("""()=>{const S=__t.S;S.seen={};S.first={mix:S.diag.qs.map(q=>[q.tag,q.lv])};
      const d=__t.drawDiag(2,new Set(),__t.retestMix(),true);
      const avail=S.first.mix.filter(([t,lv])=>__t.TBANK.some(q=>q.tag===t&&q.lv===lv)).length;
      return {rs:d.filter(q=>__t.BANK[q.id].rs).length,avail:avail}}""")
    assert r['rs'] > 0 and r['rs'] <= r['avail']


def _retest(app, day, n_right=None):
    """實際作答一次再診斷（Day 14／30），回傳本次出現的保留題，以及答對、答錯的保留題。"""
    app.js("d=>__t.startPlanDay(d,true)", day)
    q = app.quiz()
    rs = app.js("ids=>ids.filter(id=>__t.BANK[id].rs)", q['ids'])
    k = len(q['ids']) if n_right is None else n_right
    right = [i for i in q['ids'][:k] if i in rs]
    wrong = [i for i in q['ids'][k:] if i in rs]
    app.play(n_right)
    return rs, right, wrong


def test_day30_does_not_reuse_reserved_from_day14(app):
    app.setup(paid=True, days_done={d: True for d in range(1, 14)})
    app.js("()=>{const S=__t.S;S.first={mix:S.diag.qs.map(q=>[q.tag,q.lv])}}")
    d14, _, _ = _retest(app, 14)
    app.js("()=>{for(let d=14;d<30;d++)__t.S.daysDone[d]=true}")
    d30, _, _ = _retest(app, 30)
    assert d14 and d30
    assert not set(d14) & set(d30), 'Day 30 不重用 Day 14 已出現的保留題'


def test_reserved_enters_review_only_after_wrong(app):
    app.setup(paid=True, wrongs=False, days_done={d: True for d in range(1, 14)})
    app.js("()=>{const S=__t.S;S.first={mix:S.diag.qs.map(q=>[q.tag,q.lv])}}")
    rs_all = set(app.js("()=>__t.TBANK.map(q=>q.id)"))
    before = app.js("()=>__t.wrongReviewList(200).filter(q=>!q.passages).map(q=>q.id)")
    assert not set(before) & rs_all, '還沒作答過的保留題不會進錯題回顧'
    _, right, wrong = _retest(app, 14, n_right=15)
    assert right and wrong
    review = set(app.js("()=>__t.wrongReviewList(200).filter(q=>!q.passages).map(q=>q.id)"))
    assert set(wrong) <= review, '重測答錯的保留題會進錯題回顧'
    assert not set(right) & review, '重測答對的保留題不會進錯題回顧'
