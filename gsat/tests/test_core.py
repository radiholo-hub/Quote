"""核心純函式：多選題官方計分、整份試卷計分、抽題、熟練度、計時。"""
import pytest

from conftest import URL


@pytest.fixture
def core(make_page):
    page = make_page()
    return lambda js, *a: page.evaluate('(args)=>{const C=GSATCore;' + js + '}', list(a))


# 官方規則（111–115 試卷封面）：選項獨立判定，答錯 k 個選項得 (n−2k)/n，低於 0 或全未作答為 0。n=6、滿分 4 分。
@pytest.mark.parametrize('sel,cor,expect', [
    ('ADE', 'ADE', 4),                       # 全對
    ('AD', 'ADE', 4 * 4 / 6),                # 漏選 1 個：k=1
    ('ADEF', 'ADE', 4 * 4 / 6),              # 多選 1 個：k=1
    ('ADB', 'ADE', 4 * 2 / 6),               # 一個選錯又漏一個：k=2
    ('BCF', 'ADE', 0),                       # k=6：負分以 0 計
    ('', 'ADE', 0),                          # 全未作答
    ('ABCDEF', 'ADE', 0),                    # k=3，(6−6)/6=0
])
def test_multi_select_official_rule(core, sel, cor, expect):
    got = core('return C.scoreMulti(args[0].split(""), args[1].split(""), 6, 4)', sel, cor)
    assert got == pytest.approx(expect, abs=1e-3)


def test_multi_select_other_option_counts(core):
    # n=10（114 年第 49 題的答案是 CDGI，選項到 J）：漏 1 個 → 4*(10-2)/10
    assert core('return C.scoreMulti(["C","D","G"],["C","D","G","I"],10,4)') == pytest.approx(3.2, abs=1e-3)


def test_score_paper_uses_per_question_weights(core):
    r = core('''const qs=[{id:"a",type:"vocab",w:1,a:0},{id:"b",type:"reading",w:2,a:1},{id:"c",type:"reading",w:2,a:2}];
      return C.scorePaper(qs,{a:0,b:1,c:0})''')
    assert (r['got'], r['max'], r['right'], r['answered']) == (3, 5, 2, 3)
    assert r['by']['reading'] == {'got': 2, 'max': 4, 'right': 1, 'n': 2}


def test_pick_by_groups_never_splits_a_passage(core):
    out = core('''const pool=[];for(let g=0;g<6;g++)for(let i=0;i<4;i++)pool.push({id:g+"_"+i,group:"g"+g});
      for(let i=0;i<5;i++)pool.push({id:"v"+i});
      let ok=true;
      for(let t=0;t<200;t++){const r=C.pickByGroups(pool,5);const gs={};r.forEach(q=>{if(q.group)gs[q.group]=(gs[q.group]||0)+1});
        for(const g in gs)if(gs[g]!==4)ok=false;if(r.length<5)ok=false}
      return ok''')
    assert out is True


def test_mastery_needs_two_correct_in_a_row(core):
    r = core('''const st={};const now=1;
      C.recordAnswer(st,"q",false,now);const a=C.isPendingWrong(st.q);
      C.recordAnswer(st,"q",true,now);const b=C.isPendingWrong(st.q);
      C.recordAnswer(st,"q",false,now);C.recordAnswer(st,"q",true,now);const c=C.isPendingWrong(st.q);
      C.recordAnswer(st,"q",true,now);return [a,b,c,C.isPendingWrong(st.q),C.isMastered(st.q)]''')
    assert r == [True, True, True, False, True]
    assert core('const st={};C.recordAnswer(st,"x",true,1);return [C.isPendingWrong(st.x),C.isMastered(st.x)]') == [False, False]   # 一直答對的題目不進錯題本


def test_timer_counts_down_and_pauses(core):
    r = core('''const s={limitMs:60000,remainMs:60000,lastTick:1000,paused:false};
      C.tick(s,6000);const a=s.remainMs;s.paused=true;C.tick(s,26000);const b=s.remainMs;
      s.paused=false;C.tick(s,31000);const c=s.remainMs;C.tick(s,999999);return [a,b,c,s.remainMs]''')
    assert r == [55000, 55000, 50000, 0]
    assert core('return [C.fmtTime(3600000),C.fmtTime(61000),C.fmtTime(0),C.fmtTime(59001)]') == ['60:00', '01:01', '00:00', '01:00']


def test_formal_exam_timer_cannot_be_paused_by_leaving(core):
    # 正式模擬考用「截止時間」：不管離開多久，剩餘時間都是截止時間 − 現在
    r = core('return [C.remainingFromDeadline(100000,40000),C.remainingFromDeadline(100000,100000),C.remainingFromDeadline(100000,999999)]')
    assert r == [60000, 0, 0]


NEW_CFG = "{mc:62,mixed:10,translation:8,essay:20,multiSelect:true}"
OLD_CFG = "{mc:72,mixed:0,translation:8,essay:20,multiSelect:false}"


def test_summary_does_not_count_unscored_parts_as_zero(core):
    r = core(f'return C.paperSummary({NEW_CFG},{{got:50,max:62}},{{}})')
    assert (r['scoredGot'], r['scoredMax'], r['pendingMax'], r['total'], r['complete']) == (50, 62, 38, 100, False)
    pend = [i['id'] for i in r['items'] if i['got'] is None]
    assert pend == ['multi', 'fill', 't0', 't1', 'essay']             # 全部「待」，沒有被填成 0


def test_summary_old_system_has_no_mixed_part(core):
    r = core(f'return C.paperSummary({OLD_CFG},{{got:60,max:72}},{{}})')
    assert [i['id'] for i in r['items']] == ['mc', 't0', 't1', 'essay'] and r['total'] == 100 and r['pendingMax'] == 28


def test_summary_counts_only_what_has_been_scored(core):
    ns = "{mixed:{done:true,multiScore:2.67,other:5},trans:{e0:3,e1:0},essay:{self:14}}"
    r = core(f'return C.paperSummary({NEW_CFG},{{got:50,max:62}},{ns})')
    assert r['complete'] is True and r['pendingMax'] == 0
    assert r['scoredGot'] == pytest.approx(50 + 2.67 + 5 + 2.5 + 4 + 14) and r['scoredMax'] == 100
    # 只自評了一題翻譯：另一題仍是待自評
    r = core(f'return C.paperSummary({NEW_CFG},{{got:50,max:62}},{{trans:{{e0:1}}}})')
    assert [i['got'] for i in r['items'] if i['id'] in ('t0', 't1')] == [3.5, None]
    assert r['scoredMax'] == 66                                         # 62 + 第 1 題 4 分


def test_summary_translation_score_never_goes_negative(core):
    r = core(f'return C.paperSummary({NEW_CFG},null,{{trans:{{e0:99}}}})')
    assert next(i for i in r['items'] if i['id'] == 't0')['got'] == 0
    assert next(i for i in r['items'] if i['id'] == 'mc')['got'] is None   # 選擇題沒作答 → 待作答，不是 0
