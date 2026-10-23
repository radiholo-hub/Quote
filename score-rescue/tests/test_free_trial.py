"""免費 Day 1 加練一次（試行）：額度、續做、保留題目、雲端合併與方案介紹。"""
OFFER = '還想多練？免費體驗一次：再做 5 題「{}」的新題，作答結果也會計入難度調整。'
UPSELL = '想繼續針對弱點練習？解鎖完整方案後，可繼續同類加練；符合條件時，還能挑戰高一級題目。'


def _start_free(app):
    app.setup(paid=False)
    tag = app.js("__t.planRanked()[0].t")
    app.js("__t.startPlanDay(1,true)"); app.play()
    return tag


def test_offer_after_day1(app):
    tag = _start_free(app)
    assert app.text('[data-act=freeMore]') == '免費再練 5 題'
    assert OFFER.format(app.js("t=>__t.TAGS[t].name", tag)) in app.box()


def test_trial_questions_and_scoring(app):
    tag = _start_free(app)
    before = app.progress()
    app.page.click('[data-act=freeMore]')
    q = app.quiz()
    assert q['n'] == 5 and not any(q['seen']) and set(q['tags']) == {tag}
    assert q['title'].startswith('Day 1 · 免費加練 · ')
    ids = q['ids']
    app.play()
    assert app.text('.done-card .lab') == 'Day 1 加練完成'
    assert UPSELL in app.box()
    assert app.progress() == before, '加練不推進學習天數'
    fresh = app.js("ids=>__t.S.plog.filter(e=>ids.includes(e[0])).map(e=>e[2])", ids)
    assert fresh == [1] * 5, '5 題都記為新題，計入升降級'


def test_resume_same_set_and_reserved(app):
    _start_free(app)
    app.page.click('[data-act=freeMore]')
    ids = app.js("__t.S.freeMore.ids")
    app.play(count=2)                      # 做 2 題後離開
    app.js("__t.go('plan')")
    app.js("__t.startPlanDay(2,true)")
    assert not set(app.quiz()['ids']) & set(ids), 'Day 2 不會抽到保留中的題'
    app.play()
    app.js("__t.startPlanDay(1,true)"); app.play()   # 重做 Day 1（複習）
    assert app.text('[data-act=freeMore]') == '繼續免費加練（剩 3 題）'
    app.page.click('[data-act=freeMore]')
    rest = app.quiz()['ids']
    assert len(rest) == 3 and set(rest) <= set(ids)


def test_quota_survives_reload_redo_and_rediagnosis(app):
    _start_free(app)
    app.page.click('[data-act=freeMore]'); app.play()
    app.page.reload(); app.page.wait_for_function('window.__t&&window.__t.S'); app.page.wait_for_timeout(300)
    assert app.js("!!(__t.S.freeMore&&__t.S.freeMore.done)")
    app.js("__t.S.paid=false"); app.js("__t.startPlanDay(1,true)"); app.play()
    assert app.count('[data-act=freeMore]') == 0 and UPSELL in app.box()
    app.js("()=>{const qs=__t.drawDiag(2,new Set());__t.finishDiag({list:qs,ans:qs.map(q=>q.a),times:qs.map(()=>20),unsure:[],level:2})}")
    assert app.js("!!(__t.S.freeMore&&__t.S.freeMore.done)")


def test_cloud_merge_keeps_used(app):
    app.setup(paid=False)
    r = app.js("""()=>{const t=__t,S=t.S,base={diag:S.diag,res:S.res};
      S.freeMore={tag:'x',ids:[],done:true};t.applyBlob(Object.assign({},base,{freeMore:null}));const a=!!(S.freeMore&&S.freeMore.done);
      S.freeMore=null;t.applyBlob(Object.assign({},base,{freeMore:{tag:'x',ids:[],done:true}}));const b=!!(S.freeMore&&S.freeMore.done);
      S.freeMore={tag:'x',ids:[1],done:false};t.applyBlob(Object.assign({},base,{freeMore:null}));const c=!!(S.freeMore&&!S.freeMore.done);
      return [a,b,c]}""")
    assert r == [True, True, True]


def test_not_offered_when_fresh_insufficient(app):
    app.setup(paid=False, days_done={1: True})
    tag = app.js("__t.planRanked()[0].t")
    app.mark_seen(tag, 2, 3)
    app.score(tag, 1)
    assert app.count('[data-act=freeMore]') == 0 and UPSELL in app.box()
    app.js("t=>__t.startFreeMore(t)", tag)
    assert app.js("__t.S.freeMore") is None


def test_upsell_goes_to_pricing(app):
    app.setup(paid=False, days_done={1: True})
    tag = app.js("__t.planRanked()[0].t")
    app.mark_seen(tag, 2, 3)
    app.score(tag, 1)
    app.page.click('[data-act=seePlans]')
    app.page.wait_for_timeout(1500)
    assert app.js("!document.querySelector('#view-home').hidden")
    assert abs(app.js("document.querySelector('#pricing').getBoundingClientRect().top")) < 200
