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
