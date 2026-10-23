"""升降級（暫行規則）：同類、目前難度、第一次作答的新題，每 5 題一組；
連續兩組各答對至少 4 題升一級，一組 0–1 題降一級；舊題、低一級補強題不計入。"""

RULES = """(cases)=>{const t=__t,S=t.S;
  const ids=lv=>t.PBANK.filter(q=>q.tag==='tense'&&q.lv===lv).map(q=>q.id);
  const L={1:ids(1),2:ids(2),3:ids(3)};
  const blk=(lv,start,okN,fresh=1,sup=0,ch=0)=>L[lv].slice(start,start+5).map((id,k)=>[id,k<okN?1:0,fresh,sup,ch]);
  return cases.map(([level,blocks])=>{S.level=level;S.plog=[].concat(...blocks.map(b=>blk(...b)));return t.tagState('tense').lv})}"""

CASES = [
    ('兩組達標升級', 2, [(2, 0, 4), (2, 5, 5)], 3),
    ('只有一組達標不升級', 2, [(2, 0, 5)], 2),
    ('中間一組未達標，連續中斷', 2, [(2, 0, 4), (2, 5, 3), (2, 10, 4)], 2),
    ('一組 1/5 降級', 2, [(2, 0, 1)], 1),
    ('舊題不計入', 2, [(2, 0, 5, 0), (2, 5, 5, 0)], 2),
    ('補強題不計入', 2, [(2, 0, 5, 1, 1), (2, 5, 5, 1, 1)], 2),
    ('升級後在新難度再升', 1, [(1, 0, 4), (1, 5, 4), (2, 0, 4), (2, 5, 4)], 3),
    ('升級後一組 0/5 降回', 2, [(2, 0, 4), (2, 5, 4), (3, 0, 0)], 2),
    ('升級後再答原難度不影響', 2, [(2, 0, 4), (2, 5, 4), (2, 10, 0)], 3),
    ('從基礎起步升中階', 1, [(1, 0, 4), (1, 5, 4)], 2),
]


def test_level_rules(app):
    got = app.js(RULES, [[c[1], [list(b) for b in c[2]]] for c in CASES])
    for (name, *_ , want), lv in zip(CASES, got):
        assert lv == want, name


def test_two_good_days_raise_level(app):
    app.setup(paid=True)
    tag = app.js("__t.planRanked()[0].t")
    for d in (1, 2):
        app.js("d=>__t.startPlanDay(d,true)", d)
        assert app.quiz()['lv'] == [2] * 5
        app.play()
    assert app.js("t=>__t.tagState(t).lv", tag) == 3
    assert app.js("t=>__t.pickFor(t,5).map(q=>__t.BANK[q.id].lv)", tag) == [3] * 5


def test_retest_keeps_first_mix(app):
    app.setup(paid=True)
    same = app.js("""()=>{const S=__t.S;S.first={mix:S.diag.qs.map(q=>[q.tag,q.lv])};
      const d=__t.drawDiag(2,new Set(),__t.retestMix(),true);const f=x=>x.map(q=>q.tag+q.lv).sort().join();return f(d)===f(S.diag.qs)}""")
    assert same
