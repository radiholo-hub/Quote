"""模擬試題：第 1 回免費作答（預估分數、各 Part 表現、每題正解＋5 題示範詳解）；完整詳解與第 2、3 回付費。
完整內容在私有儲存桶 lessons/exams.json（見 tools/split_exams.py）。CI 沒有 private/，這裡用公開資料拼出假的 exams.json 測流程；
有 private/exams.json 時另外核對真資料可完整還原。"""
import json
import re

import pytest

from conftest import ROOT, PRIVATE

PAGE = (ROOT / 'index.html').read_text(encoding='utf-8')


def arr(name):
    return json.loads(re.search(r'const %s=(\[.*?\]);\n' % name, PAGE, re.S).group(1))


RAW = arr('RAW')
E1 = {'p5': arr('EXAM1_P5_TEXTS'), 'p6': arr('EXAM1_P6'), 'p7': arr('EXAM1_P7')}


def fake_exams():
    rows = {}
    for i, r in enumerate(RAW):
        if r[1] in E1['p5']:
            row = list(r)
            row[5] = row[5] or '完整詳解 %d' % i
            row[7] = row[7] or '中譯 %d' % i
            rows[str(i)] = row
    holders = [i for i, r in enumerate(RAW) if r[1].startswith('\u0000exam-row-')]
    stems = []
    for k, i in enumerate(holders):
        q = 'Fake paid item %d ___ here.' % k
        rows[str(i)] = ['pos', q, ['a', 'b', 'c', 'd'], 0, 'c', '詳解 %d' % k, 2, '中譯', 'y', {}, 'n', [], 0]
        stems.append(q)
    p6 = json.loads(json.dumps(E1['p6']))
    for p in p6:
        p.setdefault('translation', '整篇翻譯')
        for b in p['blanks']:
            b.setdefault('explain', 'P6 詳解')
            b.setdefault('tr', '句子翻譯')
    p7 = json.loads(json.dumps(E1['p7']))
    for st in p7:
        for p in st['passages']:
            p.setdefault('translation', '文章翻譯')
        for q in st['questions']:
            q.setdefault('explain', 'P7 詳解')
    other = lambda n: {'p5': stems[(n - 2) * 30:(n - 1) * 30], 'p6': p6, 'p7': p7}
    return {'v': 1, 'rows': rows, 'exam1': {'p5': E1['p5'], 'p6': p6, 'p7': p7}, 'exam2': other(2), 'exam3': other(3)}


def sbk(paid, files=None):
    return 'window.__SBK=%s;' % json.dumps({'paid': paid, 'files': {'exams.json': json.dumps(fake_exams() if files is None else files, ensure_ascii=False)}})


# ---------- 公開頁面的內容 ----------

def test_public_page_has_only_exam1_questions_and_five_demos():
    for n in (2, 3):
        assert arr('EXAM%d_P5_TEXTS' % n) == [] and arr('EXAM%d_P6' % n) == [] and arr('EXAM%d_P7' % n) == []
    holders = [r for r in RAW if r[1].startswith('\u0000exam-row-')]
    assert len(holders) == 60 and all(r[2] == [] and r[5] is None for r in holders)
    p5 = [r for r in RAW if r[1] in E1['p5']]
    assert len(p5) == 30 and all(len(r[2]) == 4 and r[3] in (0, 1, 2, 3) for r in p5), '題目、選項、正解都公開'
    p5_demo = [r for r in p5 if r[5]]
    assert len(p5_demo) == 2 and all(r[4] is None and r[7] is None for r in p5 if not r[5])
    p6_demo = [b for p in E1['p6'] for b in p['blanks'] if b.get('explain')]
    p7_demo = [q for st in E1['p7'] for q in st['questions'] if q.get('explain') or q.get('ev')]
    assert len(p6_demo) == 1 and len(p7_demo) == 2, '示範詳解共 5 題'
    assert sum(1 for p in E1['p6'] if p.get('translation')) == 1
    assert "const EXAM_PRIVATE_FILE='exams.json'" in PAGE


@pytest.mark.skipif(not (PRIVATE / 'exams.json').exists(), reason='需要 private/exams.json')
def test_private_file_restores_everything():
    d = json.loads((PRIVATE / 'exams.json').read_text(encoding='utf-8'))
    assert [len(d['exam%d' % n]['p5']) for n in (1, 2, 3)] == [30, 30, 30] and len(d['rows']) == 90
    for n in (2, 3):
        for t in d['exam%d' % n]['p5']:
            assert t not in PAGE
    assert all(r[5] for r in d['rows'].values()), '私有檔每題都有詳解'
    for k, r in d['rows'].items():
        assert RAW[int(k)][1] in (r[1], '\u0000exam-row-%s' % k), '題號對得上'


# ---------- 免費 ----------

def submit_exam1(app, right_first=60):
    app.js("()=>__t.examBegin(1)")
    app.js("n=>{const E=__t.getEX();E.ans=E.items.map((it,i)=>i<n?it.a:(it.a+1)%4)}", right_first)
    app.js("()=>__t.examSubmit()")


def test_free_user_can_take_exam1_and_sees_result_and_unlock(open_app):
    app = open_app(paid=False, init=sbk(False))
    app.js("()=>__t.show('home')")
    card = app.page.locator('#exam1Card')
    assert '免費' in card.inner_text() and '閱讀 100 題｜建議作答時間 75 分鐘' in card.inner_text()
    assert card.locator('[data-act="examStart"]').inner_text() == '免費做第 1 回閱讀模考'
    locked = app.page.locator('.exam-card.locked').all_inner_texts()
    assert len(locked) == 2 and all('需解鎖' in t for t in locked)
    msgs = []
    app.page.on('console', lambda m: msgs.append(m.text))
    submit_exam1(app, right_first=40)
    body = app.text('#examResultBody')
    assert '預估閱讀分數' in body and '僅供參考' in body
    parts = app.page.locator('#examParts tr').all_inner_texts()
    assert [p.split('\t')[0] for p in parts] == ['Part 5　單句填空', 'Part 6　短文填空', 'Part 7　閱讀理解']
    assert parts[0].endswith('30 / 30') and parts[1].endswith('10 / 16') and parts[2].endswith('0 / 54')
    assert app.count('#examUnlockBox') == 1 and app.count('#examPosTip') == 0, 'Part 5 全對不推詞性前測'
    app.page.click('#examUnlockBox [data-act="examUnlock"]')
    assert app.page.is_visible('#modal')
    assert not [m for m in msgs if m.startswith('__dl:')], '沒付費不下載私有內容'


def test_free_review_shows_answers_and_only_five_demos(open_app):
    app = open_app(paid=False, init=sbk(False))
    submit_exam1(app, right_first=0)
    assert app.count('#examPosTip') == 1, 'Part 5 偏低時推詞性前測'
    assert app.page.get_attribute('#examPosTip a', 'href') == './pos/'
    app.page.click('#examResultBody [data-act="examReview"]')
    rv = app.page.locator('#examReviewBody')
    assert rv.locator('h1').inner_text() == '每題正解'
    cards = rv.locator('.ans-fold')
    assert cards.count() == 100
    assert rv.locator('.ac-lock').count() == 95, '95 題只給正解'
    demos = [c for c in rv.locator('.ans-fold').all() if '示範詳解' in c.locator('.ac-chip').inner_text()]
    assert len(demos) == 5
    assert all(c.locator('.ac-lock').count() == 0 for c in demos)
    assert rv.locator('.ac-opts .right, .ac-opts [class*="right"]').count() >= 95


# ---------- 付費 ----------

def test_paid_loads_private_exams_and_hydrates_free_attempt(open_app):
    app = open_app(paid=False, init=sbk(False))
    submit_exam1(app, right_first=10)
    app.js("()=>{window.__SB_PAID=true;window.__SBK.paid=true}")
    app.js("()=>__t.fetchPaid()")
    app.page.wait_for_function("__t.paidExamsState()==='ok'")
    assert app.js("__t.examAllowed(2)") and app.js("__t.examAllowed(3)") and app.js("__t.EXAM2_P5_TEXTS.length") == 30
    assert app.js("__t.PBANK.every(q=>q.o.length&&!q.q.startsWith('Fake paid'))"), '付費題不混進日常練習'
    app.js("()=>__t.examRenderReview(1)")
    rv = app.page.locator('#examReviewBody')
    assert rv.locator('h1').inner_text() == '逐題解析'
    assert rv.locator('.ac-lock').count() == 0
    first = rv.locator('.ans-fold').first
    first.evaluate('d=>d.open=true')
    assert re.search(r'完整詳解 \d+|中譯 \d+', first.inner_text()), '免費時交卷的紀錄，付費後補回詳解'


def test_paid_but_download_fails_keeps_exam2_locked(open_app):
    app = open_app(paid=True, init='window.__SBK={"paid":true,"files":{}};')
    app.page.wait_for_function("__t.paidExamsState()==='fail'")
    assert not app.js("__t.examAllowed(2)") and app.js("__t.examAllowed(1)")
    app.js("()=>__t.show('home')")
    assert '載入失敗' in app.text('#examCards')


# ---------- #90 審查修正 ----------

def test_old_record_whitelist_has_no_question_text():
    ok = json.loads(re.search(r'const P7_OLD_OK=(\[.*?\]);', PAGE).group(1))
    assert ok and all(re.fullmatch(r'[0-9a-z]{8,16}', h) for x in ok for h in x['q']), '白名單只存雜湊'


@pytest.mark.skipif(not (PRIVATE / 'exams.json').exists(), reason='需要 private/exams.json')
def test_no_paid_part7_question_in_public_page():
    d = json.loads((PRIVATE / 'exams.json').read_text(encoding='utf-8'))
    for n in (2, 3):
        for st in d['exam%d' % n]['p7']:
            for q in st['questions']:
                assert q['q'] not in PAGE and json.dumps(q['q'], ensure_ascii=False)[1:-1] not in PAGE, q['q']


def test_logout_after_paid_shows_only_five_demos(open_app):
    app = open_app(paid=True, init=sbk(True))
    app.page.wait_for_function("__t.paidExamsState()==='ok'")
    submit_exam1(app, right_first=0)
    app.js("()=>{window.__SBK.paid=false;window.__SB_PAID=false;__t.S.paid=false}")   # 登出／付費資格失效，同一分頁
    app.js("()=>__t.examRenderReview(1)")
    rv = app.page.locator('#examReviewBody')
    assert rv.locator('h1').inner_text() == '每題正解'
    assert rv.locator('.ac-lock').count() == 95 and rv.locator('[data-demo]').count() == 5
    assert '完整詳解 ' not in rv.inner_text(), '記憶體裡的付費詳解不外露'


def test_bad_private_file_marks_failed(open_app):
    app = open_app(paid=True, init='window.__SBK={"paid":true,"files":{"exams.json":"{not json"}};')
    app.page.wait_for_function("__t.paidExamsState()==='fail'")
    app.js("()=>__t.show('home')")
    assert '載入失敗' in app.text('#examCards') and app.js("__t.examAllowed(1)")


def test_demo_button_and_wrong_demos_open(open_app):
    app = open_app(paid=False, init=sbk(False))
    submit_exam1(app, right_first=100)             # 全對也找得到示範
    app.page.click('#examResultBody [data-act="examDemos"]')
    rv = app.page.locator('#examReviewBody')
    vis = [c for c in rv.locator('.ans-fold').all() if c.is_visible()]
    assert len(vis) == 5 and all(c.get_attribute('data-demo') == '1' for c in vis)
    assert all(c.evaluate('d=>d.open') for c in vis)
    app.page.click('#showAllQ')
    assert sum(1 for c in rv.locator('.ans-fold').all() if c.is_visible()) > 5
    submit_exam1(app, right_first=0)
    app.page.click('#examResultBody [data-act="examReview"]')
    demos = rv.locator('[data-demo]')
    assert demos.count() == 5 and all(d.evaluate('d=>d.open') for d in demos.all()), '答錯的示範題直接展開'


def test_whitelist_hashes_match_frontend_signature(app):
    """白名單的雜湊要和前端 srHash(題目＋排序後選項＋正解) 算法一致（用第 1 回的公開題目核對）。"""
    n = app.js("""()=>{const ok=JSON.parse(JSON.stringify(%s)),S='\\u0001',sig=x=>x.q+S+x.o.slice().sort().join(S)+S+x.o[x.a];
      let hit=0;ok.filter(w=>w.x===1).forEach(w=>{const st=__t.EXAM1_P7[w.s];st.questions.forEach(q=>{if(w.q.indexOf(__t.srHash(sig(q)))>=0)hit++})});return hit}""" % re.search(r'const P7_OLD_OK=(\[.*?\]);', PAGE).group(1))
    assert n >= 3


def test_result_puts_review_right_below_parts_and_colors(open_app):
    app = open_app(paid=False, init=sbk(False))
    submit_exam1(app, right_first=50)
    order = app.js("()=>['#examParts','#examReviewRow','#examUnlockBox'].map(q=>document.querySelector(q).getBoundingClientRect().top)")
    assert order == sorted(order), '分數 → 各 Part → 看錯題與正解 → 解鎖'
    btn = app.page.locator('#examReviewRow [data-act="examReview"]')
    assert btn.inner_text() == '看錯題與正解' and 'pri' in btn.get_attribute('class')
    assert 'fire' in app.page.get_attribute('#examUnlockBox [data-act="examUnlock"]', 'class'), '購買與解鎖用深橘'
    assert app.js("getComputedStyle(document.querySelector('#examReviewRow .btn.pri')).backgroundColor") == 'rgb(107, 45, 60)'
    btn.click()
    assert not app.js("document.getElementById('qJump').open"), '題號索引預設收起'
    first = app.page.locator('#examReviewBody .ans-fold:not([hidden])').first
    assert first.get_attribute('data-st') == 'wrong' and first.evaluate('d=>d.open'), '一進來就是第一道錯題'
    app.page.click('#qJump summary')
    app.page.locator('#qJump .qchip').nth(3).click()
    assert not app.js("document.getElementById('qJump').open")
    assert app.count('#examReviewBody .unlock-box [data-act="examUnlock"]') == 2


def test_action_buttons_are_wine_and_buy_buttons_orange():
    acts = re.findall(r'class="btn (fire|pri)[^"]*"[^>]*>([^<]{1,20})<', PAGE)
    fire = {t for c, t in acts if c == 'fire'}
    assert fire <= {'轉帳購買完整方案', '轉帳後加官方 LINE 回報', '解鎖完整方案', '解鎖本回完整詳解'}, fire
    pri = {t for c, t in acts if c == 'pri'}
    assert {'開始免費詞性前測', '免費前測', '下一題'} <= pri
