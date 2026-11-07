"""使用者流程：模擬考（正式／自由）、計時、自動存檔、答案交卷前不顯示、空格點擊、回文章、分類練習、錯題補強、版面。"""
import json

import pytest

from conftest import (DEVICES, URL, cur_q, goto_question, hscroll_overflow, needs_exam, run_exam, start_exam,
                      wait_images)

YEARS = [str(y) for y in range(106, 116)]
MC = {y: 72 if int(y) <= 110 else 62 for y in YEARS}
SSK = 'gsat-session-v2'


def stat(page, i=0):
    return page.locator('.stat b').nth(i).inner_text()


def pending_wrong(page):
    return page.evaluate('''()=>Object.keys(__gsat.DB().q).filter(id=>__gsat.QB[id]&&GSATCore.isPendingWrong(__gsat.DB().q[id])).length''')


def session(page):
    return json.loads(page.evaluate(f"localStorage.getItem('{SSK}')"))


def no_answer_shown(page):
    return page.locator('.opt.ok, .opt.bad, .explain, .blank.ok, .blank.bad').count() == 0


# ---------------------------------------------------------------- 入口與計分
def test_home_has_the_three_entrances(make_page):
    page = make_page()
    assert page.locator('a.entry b').all_inner_texts() == ['歷屆試題', '分類練習', '錯題補強']
    assert page.errors == []


@needs_exam
@pytest.mark.parametrize('y', YEARS)
def test_perfect_paper_gets_full_marks_for_that_years_rules(make_page, y):
    page = make_page()
    run_exam(page, y)
    assert stat(page) == f'{MC[y]} / {MC[y]}'
    assert page.evaluate(f"localStorage.getItem('{SSK}')") is None
    assert pending_wrong(page) == 0 and page.errors == []


@needs_exam
def test_section_weights_are_per_year_not_mixed(make_page):
    page = make_page()
    run_exam(page, '111', correct=lambda q: q['type'] == 'reading')
    assert stat(page) == '24 / 62'
    run_exam(page, '111', correct=lambda q: q['type'] == 'structure')
    assert stat(page) == '8 / 62'
    run_exam(page, '106', correct=lambda q: q['type'] == 'reading')
    assert stat(page) == '32 / 72'
    run_exam(page, '106', correct=lambda q: q['type'] == 'vocab')
    assert stat(page) == '15 / 72'


@needs_exam
def test_blank_and_wrong_answers_go_to_the_wrong_queue(make_page):
    page = make_page()
    run_exam(page, '111', correct=lambda q: None)
    assert stat(page) == '0 / 62' and pending_wrong(page) == 46
    page.get_by_role('link', name='回首頁').click()
    assert '46 題待補強' in page.locator('a.entry').nth(2).inner_text()


# ---------------------------------------------------------------- 正式模擬考 vs 自由練習
@needs_exam
def test_brief_page_separates_formal_exam_from_free_practice(make_page):
    page = make_page()
    page.goto(URL + '#/exam/115')
    formal, free = page.locator('[data-mode=formal]'), page.locator('[data-mode=free]')
    t = formal.inner_text()
    assert '100 分鐘' in t and '不能暫停' in t and '交卷後才能看答案' in t
    assert formal.get_by_role('button', name='60 分鐘').count() == 0 and formal.get_by_role('button', name='不限時').count() == 0   # 正式模擬考沒有其他時間選項
    assert free.get_by_role('button', name='不限時').count() == 1 and free.get_by_role('button', name='60 分鐘').count() == 1
    assert free.get_by_role('button', name='100 分鐘').count() == 0


@needs_exam
def test_formal_exam_runs_100_minutes_and_cannot_be_paused(make_page):
    page = make_page()
    start_exam(page, '112', 'formal')
    s = session(page)
    assert s['formal'] is True and s['limitMs'] == 100 * 60000 and s['deadline'] - s['started'] == 100 * 60000
    assert page.get_by_role('button', name='暫停').count() == 0
    assert page.inner_text('.timer').startswith('⏱ 99:') or page.inner_text('.timer').startswith('⏱ 100:')
    page.wait_for_timeout(2200)
    page.reload()
    page.wait_for_selector('.timer')
    left = 100 * 60000 - 2200
    from_text = page.inner_text('.timer')
    assert from_text.startswith('⏱ 99:5')                              # 重新整理不會重設時間
    assert session(page)['deadline'] == s['deadline']
    assert left > 0


@needs_exam
def test_formal_exam_time_keeps_running_while_away_and_auto_submits(make_page):
    page = make_page()
    start_exam(page, '112', 'formal')
    page.locator('.opt').first.click()
    page.get_by_role('link', name='暫存並離開').click()                    # 離開前會確認（預設接受）
    page.wait_for_selector('a.btn:has-text("繼續作答")')
    assert '不能暫停' in page.inner_text('.cont')
    page.evaluate(f"()=>{{const S=JSON.parse(localStorage.getItem('{SSK}'));S.deadline=Date.now()-1000;localStorage.setItem('{SSK}',JSON.stringify(S))}}")   # 離開期間時間用完
    page.reload()
    assert '時間已到' in page.inner_text('.cont')
    page.get_by_role('link', name='交卷看成績').click()
    page.wait_for_selector('h1:has-text("成績")', timeout=5000)
    assert page.evaluate('__gsat.DB().hist[0].formal') is True and page.evaluate('__gsat.DB().hist[0].right') <= 1
    assert page.evaluate(f"localStorage.getItem('{SSK}')") is None


@needs_exam
def test_formal_exam_auto_submits_when_the_clock_runs_out_on_screen(make_page):
    page = make_page()
    start_exam(page, '112', 'formal')
    page.locator('.opt').first.click()
    page.evaluate(f"()=>{{const S=JSON.parse(localStorage.getItem('{SSK}'));S.deadline=Date.now()+1500;localStorage.setItem('{SSK}',JSON.stringify(S))}}")
    page.reload()                                                       # 正式模擬考不會把舊頁面的記憶體寫回存檔，所以可以直接改
    page.wait_for_selector('h1:has-text("成績")', timeout=9000)
    assert page.evaluate('__gsat.DB().hist.length') == 1


@needs_exam
def test_free_practice_can_pause_and_has_no_time_limit_option(make_page):
    page = make_page()
    start_exam(page, '111', 'free', '不限時')
    assert page.locator('.timer').is_hidden() and page.get_by_role('button', name='暫停').count() == 0
    page.goto(URL + '#/')
    page.get_by_role('button', name='放棄').click()
    start_exam(page, '111', 'free', '60 分鐘')
    page.wait_for_selector('.timer')
    page.wait_for_timeout(1300)
    page.get_by_role('button', name='暫停').click()
    a = session(page)['remainMs']
    page.wait_for_timeout(2100)
    assert session(page)['remainMs'] == a and '⏸' in page.inner_text('.timer')
    page.locator('.opt').first.click()
    assert 'sel' not in (page.locator('.opt').first.get_attribute('class') or '')      # 暫停時不能作答
    page.get_by_role('button', name='繼續').click()
    page.locator('.opt').first.click()
    assert 'sel' in page.locator('.opt').first.get_attribute('class')


@needs_exam
def test_free_practice_time_up_submits_automatically(make_page):
    page = make_page()
    start_exam(page, '112', 'free', '60 分鐘')
    page.locator('.opt').first.click()
    page.get_by_role('link', name='暫存並離開').click()
    page.wait_for_selector('a.btn:has-text("繼續作答")')
    page.evaluate(f"()=>{{const S=JSON.parse(localStorage.getItem('{SSK}'));S.remainMs=1500;localStorage.setItem('{SSK}',JSON.stringify(S))}}")
    page.get_by_role('link', name='繼續作答').click()
    page.wait_for_selector('h1:has-text("成績")', timeout=9000)
    assert page.evaluate(f"localStorage.getItem('{SSK}')") is None


# ---------------------------------------------------------------- 交卷前不顯示答案
@needs_exam
@pytest.mark.parametrize('mode,limit', [('formal', None), ('free', '不限時')])
def test_answers_are_never_shown_before_submitting_a_paper(make_page, mode, limit):
    page = make_page()
    start_exam(page, '113', mode, limit or '不限時')
    for _ in range(3):
        q = cur_q(page)
        page.locator('.opt').nth((q['a'] + 1) % q['nopt']).click()       # 故意答錯
        assert no_answer_shown(page)
        page.get_by_role('button', name='下一題').click()
    assert no_answer_shown(page)
    assert page.evaluate("'#/rev/anything/0'.length") and True
    page.goto(URL + '#/rev/h123/0')                                      # 沒有交卷就沒有檢討頁
    assert '找不到這一題' in page.inner_text('#app') and page.locator('.explain').count() == 0
    page.goto(URL + '#/run')
    assert no_answer_shown(page)


def test_practice_hides_answers_by_default_and_shows_them_after_submitting(make_page):
    page = make_page()
    page.goto(URL + '#/practice')
    assert page.get_by_role('button', name='交卷後才顯示答案').get_attribute('aria-pressed') == 'true'
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    n = cur_q(page)['total']
    for _ in range(n):
        q = cur_q(page)
        page.locator('.opt').nth((q['a'] + 1) % q['nopt']).click()
        assert no_answer_shown(page)
        if q['idx'] < n - 1:
            page.get_by_role('button', name='下一題').click()
    page.get_by_role('button', name='交卷').click()
    page.locator('.modal .btn').first.click()
    page.wait_for_selector('h1:has-text("成績")')
    assert pending_wrong(page) == n
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain')                                   # 交卷後才進得去詳解
    assert '正確答案' in page.inner_text('.explain')


def test_learning_mode_shows_feedback_after_each_answer(make_page):
    page = make_page()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='每題答完立刻看答案').click()
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    q = cur_q(page)
    page.locator('.opt').nth((q['a'] + 1) % q['nopt']).click()
    assert page.locator('.opt.ok').count() == 1 and page.locator('.opt.bad').count() == 1
    assert '正確答案' in page.locator('.explain').inner_text()
    assert page.locator('.opt').first.is_disabled() and pending_wrong(page) == 1


def test_review_needs_two_correct_in_a_row_to_master(make_page):
    page = make_page()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='每題答完立刻看答案').click()
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    for _ in range(5):
        q = cur_q(page)
        page.locator('.opt').nth((q['a'] + 1) % q['nopt']).click()
        page.get_by_role('button', name='下一題' if q['idx'] < q['total'] - 1 else '看成績').click()
    assert pending_wrong(page) == 5
    for round_ in (1, 2):
        page.goto(URL + '#/review')
        page.get_by_role('button', name='每題答完立刻看答案').click()
        page.get_by_role('button', name='全部開始').click()
        for _ in range(5):
            q = cur_q(page)
            page.locator('.opt').nth(q['a']).click()
            page.get_by_role('button', name='下一題' if q['idx'] < q['total'] - 1 else '看成績').click()
        assert pending_wrong(page) == (5 if round_ == 1 else 0)
    page.goto(URL + '#/review')
    assert '5' in page.locator('.stat b').nth(1).inner_text()


@needs_exam
def test_wrong_questions_are_reviewable_with_answer_after_submitting(make_page):
    page = make_page()
    run_exam(page, '112', correct=lambda q: q['n'] > 5)
    assert page.locator('.nav a.bad').count() == 5
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.opt.ok')
    assert page.locator('.opt.ok').count() == 1 and page.locator('.opt.bad').count() == 1
    assert '正確答案' in page.locator('.explain').inner_text()
    page.get_by_role('link', name='下一題').click()
    page.wait_for_function("document.querySelector('.topbar').innerText.includes('2 / 46')")


# ---------------------------------------------------------------- 自動存檔
@needs_exam
def test_answers_survive_reload_and_leaving(make_page):
    page = make_page()
    start_exam(page, '111')
    for _ in range(3):
        page.locator('.opt').first.click()
        page.get_by_role('button', name='下一題').click()
    page.reload()
    page.wait_for_selector('.opt')
    assert '第 4 / 46 題' in page.inner_text('#app') and '已答 3/46' in page.inner_text('.bar')
    page.get_by_role('button', name='上一題').click()
    assert page.locator('.opt.sel').count() == 1
    page.get_by_role('link', name='暫存並離開').click()
    page.wait_for_selector('a.btn:has-text("繼續作答")')
    page.get_by_role('link', name='繼續作答').click()
    page.wait_for_selector('.opt')
    assert '已答 3/46' in page.inner_text('.bar')


# ---------------------------------------------------------------- 介面細節
@needs_exam
def test_bottom_counter_says_answered_count_not_a_question_number(make_page):
    """第 36 題時底部不能顯示像是題號的「1/46」：改為「已答 1/46」，題號只在上方「第 36 / 46 題」。"""
    page = make_page()
    start_exam(page, '115')
    page.locator('.opt').first.click()
    goto_question(page, 36)
    assert '第 36 / 46 題' in page.locator('[data-role=position]').inner_text()
    chip = page.locator('[data-role=overview]')
    assert chip.inner_text() == '已答 1/46' and '題號' not in page.inner_text('.bar')
    assert '已作答 1 題' in chip.get_attribute('aria-label')
    chip.click()
    assert '目前在第 36 題' in page.inner_text('.modal')


@needs_exam
@pytest.mark.parametrize('device', ['phone', 'android'])
def test_reader_returns_to_the_same_place_on_phones(make_page, device):
    page = make_page(device)
    start_exam(page, '115')
    goto_question(page, 36)
    fab = page.get_by_role('button', name='回文章')
    assert fab.is_visible()
    page.evaluate("document.querySelector('.passage').scrollTop = 260")               # 先把頁內文章捲到中間
    page.evaluate('window.scrollTo(0, 120)')
    y_before = page.evaluate('window.scrollY')
    fab.click()
    reader = page.locator('.reader')
    assert reader.is_visible() and '正在作答' not in reader.inner_text() and page.evaluate("document.body.style.overflow") == 'hidden'
    page.evaluate("document.querySelector('.reader .passage').scrollTop = 500")
    page.get_by_role('button', name='回題目').click()
    assert page.locator('.reader').count() == 0 and page.evaluate("document.body.style.overflow") == ''
    assert abs(page.evaluate('window.scrollY') - y_before) <= 2                       # 回到原本的捲動位置
    assert abs(page.evaluate("document.querySelector('.passage').scrollTop") - 260) <= 2
    fab.click()                                                                       # 再開：全螢幕文章停在上次看到的地方
    page.wait_for_timeout(100)
    assert abs(page.evaluate("document.querySelector('.reader .passage').scrollTop") - 500) <= 2
    page.keyboard.press('Escape')
    assert page.locator('.reader').count() == 0


@needs_exam
def test_reader_button_is_hidden_on_desktop_where_passage_sits_beside_the_question(make_page):
    page = make_page('desktop')
    start_exam(page, '115')
    goto_question(page, 36)
    assert page.get_by_role('button', name='回文章').is_hidden()
    box_p, box_o = page.locator('.passage').bounding_box(), page.locator('.opt').first.bounding_box()
    assert box_p['x'] + box_p['width'] <= box_o['x'] + 1                              # 文章在左、題目在右


@needs_exam
def test_passage_scroll_position_is_kept_when_moving_between_questions_of_one_passage(make_page):
    page = make_page('phone')
    start_exam(page, '115')
    goto_question(page, 36)
    page.evaluate("document.querySelector('.passage').scrollTop = 300")
    page.wait_for_timeout(100)
    page.get_by_role('button', name='下一題').click()
    page.wait_for_timeout(150)
    assert abs(page.evaluate("document.querySelector('.passage').scrollTop") - 300) <= 2


@needs_exam
@pytest.mark.parametrize('first,count', [(11, 5), (21, 10)])           # 綜合測驗第 11–15 題、文意選填第 21–30 題
def test_blanks_are_clickable_show_the_chosen_letter_and_jump_to_the_next(make_page, first, count):
    page = make_page('phone')
    start_exam(page, '115')
    goto_question(page, first)
    blank = lambda n: page.locator('.passage button.blank', has_text=str(n)).first
    assert blank(first + 2).is_visible()
    blank(first + 2).click()                                           # 直接點文章裡的空格
    assert f'第 {first + 2} 題空格' in page.inner_text('.qtext') and 'cur' in blank(first + 2).get_attribute('class')
    page.locator('.opt').nth(1).click()
    assert blank(first + 2).inner_text() == f'{first + 2} B' and 'filled' in blank(first + 2).get_attribute('class')   # 空格裡顯示選了 B
    assert no_answer_shown(page)                                       # 作答中不顯示對錯
    page.get_by_role('button', name='下一空格 →').click()
    assert f'第 {first + 3} 題空格' in page.inner_text('.qtext')
    blank(first).click()                                               # 可以往回切換
    assert f'第 {first} 題空格' in page.inner_text('.qtext')
    page.locator('.opt').nth(2).click()
    assert blank(first).inner_text() == f'{first} C'
    page.locator('.opt').nth(2).click()                                # 再點一次同一個選項＝取消
    assert blank(first).inner_text() == str(first)


@needs_exam
def test_blank_click_inside_fullscreen_reader_jumps_and_closes_it(make_page):
    page = make_page('phone')
    start_exam(page, '115')
    goto_question(page, 11)
    page.get_by_role('button', name='回文章').click()
    page.locator('.reader button.blank', has_text='14').first.scroll_into_view_if_needed()
    page.locator('.reader button.blank', has_text='14').first.click()
    assert page.locator('.reader').count() == 0 and '第 14 題空格' in page.inner_text('.qtext')


@needs_exam
def test_blanks_in_review_show_right_and_wrong_after_submitting(make_page):
    page = make_page('phone')
    run_exam(page, '115', correct=lambda q: not (11 <= q['n'] <= 12))        # 11、12 題故意答錯
    page.goto(page.url.split('#')[0] + '#/result/' + page.evaluate('__gsat.DB().hist[0].id'))
    page.locator('.nav a', has_text='11').first.click()
    page.wait_for_selector('.passage')
    assert 'bad' in page.locator('.passage .blank', has_text='11').first.get_attribute('class')
    assert 'ok' in page.locator('.passage .blank', has_text='13').first.get_attribute('class')
    page.locator('.passage button.blank', has_text='13').first.click()
    page.wait_for_function("document.querySelector('.qtext').innerText.includes('13')")


@needs_exam
def test_every_question_is_labelled_exam_or_original(make_page):
    page = make_page()
    start_exam(page, '112')
    assert page.locator('[data-source=exam]').count() == 1 and '歷屆真題' in page.locator('.src').inner_text()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='原創練習題').click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    assert page.locator('[data-source=original]').count() == 1 and page.locator('[data-source=exam]').count() == 0


def test_font_size_preference_is_saved(make_page):
    page = make_page()
    before = page.evaluate("parseFloat(getComputedStyle(document.body).fontSize)")
    page.get_by_role('button', name='放大字級').click()
    page.get_by_role('button', name='放大字級').click()
    page.reload()
    assert page.evaluate("parseFloat(getComputedStyle(document.body).fontSize)") == before + 2


# ---------------------------------------------------------------- 版面：手機與電腦
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


@needs_exam
@pytest.mark.parametrize('device', list(DEVICES))
def test_question_layouts_fit_every_question_type(make_page, device):
    """各種題型（含圖片題、地圖題、文意選填 10 個選項、篇章結構 5 個選項、可點空格）在各螢幕寬度都不能溢出、圖片都要載入。"""
    page = make_page(device)
    targets = [('111', 1), ('111', 11), ('111', 21), ('111', 31), ('111', 35), ('112', 44), ('113', 35), ('114', 36), ('115', 31), ('115', 38), ('106', 41), ('110', 49), ('109', 41)]
    for y, n in targets:
        start_exam(page, y)
        goto_question(page, n)
        assert wait_images(page) == [], f'{y} 第 {n} 題圖片載入失敗'
        assert hscroll_overflow(page) <= 1, f'{device} {y} 第 {n} 題橫向溢出'
        page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        bar_top = page.locator('.bar').bounding_box()['y']
        last = page.locator('.opt').last.bounding_box()
        assert last['y'] + last['height'] <= bar_top + 1, f'{device} {y} 第 {n} 題：底部操作列遮住最後一個選項'
        fab = page.locator('.fab')
        if fab.count() and fab.is_visible():                                  # 手機：浮動的「回文章」按鈕也不能蓋住選項
            assert last['y'] + last['height'] <= fab.bounding_box()['y'] + 1, f'{device} {y} 第 {n} 題：「回文章」按鈕蓋住最後一個選項'
        page.evaluate(f"localStorage.removeItem('{SSK}')")


@needs_exam
def test_touch_targets_are_at_least_44px_on_phone(make_page):
    page = make_page('phone')
    small = []

    def check(where):
        for loc in ('#app a.btn', '#app a.entry', '#app button', '#app a.link', '.bar button', '.bar a', '.fab', '.reader button'):
            for el in page.locator(loc).all():
                if el.is_visible():
                    box = el.bounding_box()
                    if box and box['height'] < 43.5 and 'blank' not in (el.get_attribute('class') or ''):
                        small.append((where, loc, el.inner_text()[:12], round(box['height'])))

    for r in ['#/', '#/exam', '#/exam/111', '#/practice', '#/review']:
        page.goto(URL + r); page.reload(); check(r)
    start_exam(page, '115'); goto_question(page, 36); check('run')
    page.get_by_role('button', name='回文章').click(); check('reader')
    assert small == [], small


# ---------------------------------------------------------------- 瀏覽器存不了資料（例如 iOS 無痕模式）
def test_app_keeps_working_when_browser_storage_throws(make_page):
    page = make_page(url='about:blank')
    page.add_init_script("Storage.prototype.setItem = function(){ throw new Error('QuotaExceededError') }; Storage.prototype.getItem = function(){ throw new Error('SecurityError') };")
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    n = cur_q(page)['total']
    for i in range(n):
        page.locator('.opt').first.click()
        if i < n - 1:
            page.get_by_role('button', name='下一題').click()
    page.get_by_role('button', name='交卷').click()
    page.locator('.modal .btn').first.click()
    page.wait_for_selector('h1:has-text("成績")')                         # 存不了也能作答到交卷、看成績
    assert page.evaluate('__gsat.DB().hist.length') == 1
    assert not [e for e in page.errors if 'Quota' not in e and 'Security' not in e]
