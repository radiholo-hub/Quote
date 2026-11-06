"""使用者流程：模擬考計分、計時、自動存檔、分類練習、錯題補強、手機與電腦版面。"""
import json

import pytest

from conftest import DEVICES, URL, cur_q, hscroll_overflow, run_exam, wait_images

YEARS = [str(y) for y in range(106, 116)]
MC = {y: 72 if int(y) <= 110 else 62 for y in YEARS}
SSK = 'gsat-session-v2'


def stat(page, i=0):
    return page.locator('.stat b').nth(i).inner_text()


def pending_wrong(page):
    return page.evaluate('''()=>Object.keys(__gsat.DB().q).filter(id=>__gsat.QB[id]&&GSATCore.isPendingWrong(__gsat.DB().q[id])).length''')


def test_home_has_the_three_entrances(make_page):
    page = make_page()
    names = page.locator('a.entry b').all_inner_texts()
    assert names == ['歷屆試題', '分類練習', '錯題補強']
    assert page.errors == []


@pytest.mark.parametrize('y', YEARS)
def test_perfect_paper_gets_full_marks_for_that_years_rules(make_page, y):
    page = make_page()
    run_exam(page, y)
    assert stat(page) == f'{MC[y]} / {MC[y]}'
    assert page.evaluate(f"localStorage.getItem('{SSK}')") is None          # 交卷後作答進度清掉
    assert pending_wrong(page) == 0 and page.errors == []


def test_section_weights_are_per_year_not_mixed(make_page):
    page = make_page()
    run_exam(page, '111', correct=lambda q: q['type'] == 'reading')          # 111：閱讀 12 題 × 2 = 24
    assert stat(page) == '24 / 62'
    run_exam(page, '111', correct=lambda q: q['type'] == 'structure')        # 篇章結構 4 題 × 2 = 8
    assert stat(page) == '8 / 62'
    run_exam(page, '106', correct=lambda q: q['type'] == 'reading')          # 106：閱讀 16 題 × 2 = 32，滿分 72
    assert stat(page) == '32 / 72'
    run_exam(page, '106', correct=lambda q: q['type'] == 'vocab')            # 詞彙 15 題 × 1
    assert stat(page) == '15 / 72'


def test_blank_and_wrong_answers_go_to_the_wrong_queue(make_page):
    page = make_page()
    run_exam(page, '111', correct=lambda q: None)                            # 全部不作答直接交卷
    assert stat(page) == '0 / 62' and pending_wrong(page) == 46
    page.get_by_role('link', name='回首頁').click()
    assert '46 題待補強' in page.locator('a.entry').nth(2).inner_text()


def test_wrong_questions_are_reviewable_with_answer(make_page):
    page = make_page()
    run_exam(page, '112', correct=lambda q: q['n'] > 5)                      # 前 5 題故意答錯
    assert page.locator('.nav a.bad').count() == 5
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.opt.ok')
    assert page.locator('.opt.ok').count() == 1 and page.locator('.opt.bad').count() == 1
    assert '正確答案' in page.locator('.explain').inner_text()
    page.get_by_role('link', name='下一題').click()
    page.wait_for_function("document.querySelector('.topbar').innerText.includes('2 / 46')")


def test_answers_survive_reload_and_leaving(make_page):
    page = make_page()
    page.goto(URL + '#/exam/111')
    page.get_by_role('button', name='開始作答').click()
    for _ in range(3):
        page.locator('.opt').first.click()
        page.get_by_role('button', name='下一題').click()
    page.reload()
    page.wait_for_selector('.opt')
    assert '第 4 / 46 題' in page.inner_text('#app')
    assert '題號 3/46' in page.inner_text('.bar')
    page.get_by_role('button', name='上一題').click()
    assert page.locator('.opt.sel').count() == 1                             # 回到第 3 題，原本的選擇還在
    page.get_by_role('link', name='暫存並離開').click()
    page.wait_for_selector('a.btn:has-text("繼續作答")')
    page.get_by_role('link', name='繼續作答').click()
    page.wait_for_selector('.opt')
    assert '題號 3/46' in page.inner_text('.bar')


def test_timer_survives_reload_and_pauses(make_page):
    page = make_page()
    page.goto(URL + '#/exam/111')
    page.get_by_role('button', name='60 分鐘').click()
    page.get_by_role('button', name='開始作答').click()
    page.wait_for_selector('.timer')
    page.wait_for_timeout(2300)
    page.reload()
    page.wait_for_selector('.timer')
    remain = json.loads(page.evaluate(f"localStorage.getItem('{SSK}')"))['remainMs']
    assert 3590000 < remain <= 3598000                                       # 有扣到時間，但重新整理的空檔不算
    page.get_by_role('button', name='暫停').click()
    a = json.loads(page.evaluate(f"localStorage.getItem('{SSK}')"))['remainMs']
    page.wait_for_timeout(2100)
    b = json.loads(page.evaluate(f"localStorage.getItem('{SSK}')"))['remainMs']
    assert a == b                                                            # 暫停時不扣時間
    assert '⏸' in page.inner_text('.timer')
    assert page.locator('.opt').first.is_enabled()                           # 暫停時仍可看題，但按下去不會記錄
    page.locator('.opt').first.click()
    assert 'sel' not in (page.locator('.opt').first.get_attribute('class') or '')
    page.get_by_role('button', name='繼續').click()
    page.locator('.opt').first.click()
    assert 'sel' in page.locator('.opt').first.get_attribute('class')


def test_time_up_submits_automatically(make_page):
    page = make_page()
    page.goto(URL + '#/exam/112')
    page.get_by_role('button', name='60 分鐘').click()
    page.get_by_role('button', name='開始作答').click()
    page.locator('.opt').first.click()
    page.get_by_role('link', name='暫存並離開').click()                           # 先離開作答頁（計時器停止），才改存檔，避免被舊頁面的計時器覆蓋
    page.wait_for_selector('a.btn:has-text("繼續作答")')
    page.evaluate(f"()=>{{const S=JSON.parse(localStorage.getItem('{SSK}'));S.remainMs=1500;localStorage.setItem('{SSK}',JSON.stringify(S))}}")
    page.get_by_role('link', name='繼續作答').click()
    page.wait_for_selector('h1:has-text("成績")', timeout=9000)
    assert page.evaluate('__gsat.DB().hist.length') == 1
    assert page.evaluate(f"localStorage.getItem('{SSK}')") is None


def test_practice_gives_instant_feedback_and_collects_wrong_answers(make_page):
    page = make_page()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    q = cur_q(page)
    page.locator('.opt').nth((q['a'] + 1) % q['nopt']).click()
    assert page.locator('.opt.ok').count() == 1 and page.locator('.opt.bad').count() == 1
    assert '正確答案' in page.locator('.explain').inner_text()
    assert pending_wrong(page) == 1
    assert page.locator('.opt').first.is_disabled()                          # 答完不能改


def test_review_needs_two_correct_in_a_row_to_master(make_page):
    page = make_page()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    for _ in range(5):                                                       # 全部答錯
        q = cur_q(page)
        page.locator('.opt').nth((q['a'] + 1) % q['nopt']).click()
        page.get_by_role('button', name='下一題' if q['idx'] < q['total'] - 1 else '看成績').click()
    assert pending_wrong(page) == 5
    for round_ in (1, 2):
        page.goto(URL + '#/review')
        page.get_by_role('button', name='全部開始').click()
        for _ in range(5):
            q = cur_q(page)
            page.locator('.opt').nth(q['a']).click()
            page.get_by_role('button', name='下一題' if q['idx'] < q['total'] - 1 else '看成績').click()
        assert pending_wrong(page) == (5 if round_ == 1 else 0)              # 答對一次還在，連續兩次才移出
    page.goto(URL + '#/review')
    assert '5' in page.locator('.stat b').nth(1).inner_text()                # 已掌握 5 題


def test_passage_questions_are_drawn_as_whole_passages(make_page):
    page = make_page()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='綜合測驗').click()                       # 先加綜合測驗，再取消詞彙（至少要留一個題型）
    page.get_by_role('button', name='詞彙').click()
    assert page.get_by_role('button', name='詞彙').get_attribute('aria-pressed') == 'false'
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.passage')
    assert page.locator('.passage').is_visible() and page.locator('.blank.cur').count() == 1
    s = json.loads(page.evaluate(f"localStorage.getItem('{SSK}')"))
    assert len(s['ids']) % 5 == 0                                            # 每篇綜合測驗文章 5 題，不會拆開


def test_font_size_preference_is_saved(make_page):
    page = make_page()
    before = page.evaluate("parseFloat(getComputedStyle(document.body).fontSize)")
    page.get_by_role('button', name='放大字級').click()
    page.get_by_role('button', name='放大字級').click()
    page.reload()
    assert page.evaluate("parseFloat(getComputedStyle(document.body).fontSize)") == before + 2


# ---------- 版面：手機與電腦 ----------
ROUTES = ['#/', '#/exam', '#/exam/111', '#/practice', '#/review', '#/ns/', '#/ns/111']


@pytest.mark.parametrize('device', list(DEVICES))
def test_no_horizontal_overflow_on_any_screen(make_page, device):
    page = make_page(device)
    for r in ROUTES:
        page.goto(URL + r)
        page.reload()
        wait_images(page)
        assert hscroll_overflow(page) <= 1, f'{device} {r} 橫向溢出'
    assert page.errors == []


@pytest.mark.parametrize('device', list(DEVICES))
def test_question_layouts_fit_every_question_type(make_page, device):
    """各種題型（含圖片題、地圖題、文意選填 10 個選項、篇章結構 5 個選項）在各螢幕寬度都不能溢出、圖片都要載入。"""
    page = make_page(device)
    targets = [('111', 1), ('111', 11), ('111', 21), ('111', 31), ('111', 35), ('112', 44), ('113', 35), ('114', 36), ('115', 31), ('115', 38), ('106', 41), ('110', 49), ('109', 41)]
    for y, n in targets:
        page.goto(URL + '#/exam/' + y)
        page.get_by_role('button', name='開始作答').click()
        page.wait_for_selector('.opt')
        idx = page.evaluate(f'(()=>{{const S=__gsat.loadSession();return S.ids.findIndex(i=>__gsat.QB[i].n=={n})}})()')
        page.evaluate(f"(()=>{{const S=JSON.parse(localStorage.getItem('{SSK}'));S.idx={idx};localStorage.setItem('{SSK}',JSON.stringify(S))}})()")
        page.reload()
        page.wait_for_selector('.opt')
        assert wait_images(page) == [], f'{y} 第 {n} 題圖片載入失敗'
        assert hscroll_overflow(page) <= 1, f'{device} {y} 第 {n} 題橫向溢出'
        page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        bar_top = page.locator('.bar').bounding_box()['y']
        last = page.locator('.opt').last.bounding_box()
        assert last['y'] + last['height'] <= bar_top + 1, f'{device} {y} 第 {n} 題：底部操作列遮住最後一個選項'
        page.evaluate(f"localStorage.removeItem('{SSK}')")


def test_touch_targets_are_at_least_44px_on_phone(make_page):
    page = make_page('phone')
    small = []

    def check(where):
        for loc in ('#app a.btn', '#app a.entry', '#app button', '#app a.link', '.bar button', '.bar a'):
            for el in page.locator(loc).all():
                if el.is_visible():
                    box = el.bounding_box()
                    if box and box['height'] < 43.5:
                        small.append((where, loc, el.inner_text()[:12], round(box['height'])))

    for r in ['#/', '#/exam', '#/exam/111', '#/practice', '#/review']:
        page.goto(URL + r); page.reload(); check(r)
    page.goto(URL + '#/exam/111'); page.get_by_role('button', name='開始作答').click(); page.wait_for_selector('.opt'); check('run')
    assert small == [], small


def test_exam_mode_hides_answers_until_submitted(make_page):
    page = make_page()
    page.goto(URL + '#/exam/113')
    page.get_by_role('button', name='開始作答').click()
    page.locator('.opt').first.click()
    assert page.locator('.opt.ok, .opt.bad').count() == 0 and page.locator('.explain').count() == 0


def test_explanation_is_shown_in_review_with_draft_label(make_page):
    page = make_page()
    run_exam(page, '115', correct=lambda q: q['n'] > 3)                      # 前 3 題（有詳解）答錯
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain')
    t = page.inner_text('.explain')
    for part in ('正確答案:(B)', '草稿・待人工審核', '解題關鍵', '各選項分析', '重要單字與片語', '文法補充', '(A) hasty', '(D) routine'):
        assert part in t, part
    page.get_by_role('link', name='下一題').click()
    page.wait_for_function("document.querySelector('.explain').innerText.includes('amateur')")


def test_question_without_explanation_says_so_instead_of_inventing_one(make_page):
    page = make_page()
    run_exam(page, '111', correct=lambda q: q['n'] > 3)
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain')
    t = page.inner_text('.explain')
    assert '正確答案' in t and '詳解還在製作中' in t and '解題關鍵' not in t


def test_explanation_contradicting_the_official_key_is_dropped(make_page):
    """詳解的答案若和官方答案不同，整則不顯示（避免詳解與官方答案互相矛盾）。"""
    page = make_page(url='about:blank')
    page.route('**/exam/explain.js', lambda r: r.fulfill(content_type='text/javascript',
              body="window.EXPLAIN={'115-1':{answer:'C',status:'draft',key:'錯的詳解',why:{},words:[]},'115-2':{answer:'C',status:'draft',key:'對的詳解',why:{},words:[]}};"))
    page.goto(URL + '#/')
    assert page.evaluate('Object.keys(__gsat.EXPL())') == ['115-2']
    assert any('115-1' in e for e in page.errors)
