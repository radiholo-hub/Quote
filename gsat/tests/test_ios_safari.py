"""iPhone Safari（WebKit 引擎 + iPhone 13 裝置設定）：核心流程、版面、手機專屬功能、瀏覽器存不了資料時仍能使用。
本機沒有 WebKit 時略過；CI 設定 GSAT_REQUIRE_WEBKIT=1，找不到 WebKit 會失敗。"""
import pytest

from conftest import URL, cur_q, goto_question, hscroll_overflow, needs_exam, start_exam, wait_images


def test_safari_engine_and_iphone_profile_are_really_in_use(make_ios_page):
    page = make_ios_page()
    ua = page.evaluate('navigator.userAgent')
    assert 'iPhone' in ua and 'Safari' in ua and 'Chrome' not in ua
    assert page.evaluate('[innerWidth, "ontouchstart" in window, CSS.supports("color", "color-mix(in srgb, red 50%, blue)")]') == [390, True, True]
    assert [a.inner_text() for a in page.locator('a.entry b').all()] == ['歷屆試題', '分類練習', '錯題補強'] and page.errors == []


def test_safari_original_practice_hides_answers_until_submit(make_ios_page):
    page = make_ios_page()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    n = cur_q(page)['total']
    for i in range(n):
        page.locator('.opt').first.tap()
        assert page.locator('.opt.ok, .opt.bad, .explain').count() == 0
        if i < n - 1:
            page.get_by_role('button', name='下一題').tap()
    page.get_by_role('button', name='交卷').tap()
    page.locator('.modal .btn').first.tap()
    page.wait_for_selector('h1:has-text("成績")')
    assert page.errors == []


def test_safari_app_survives_storage_that_throws(make_ios_page):
    """iOS 無痕模式等情況下 localStorage 會丟例外：網站要能照常作答，不當機。"""
    page = make_ios_page(url='about:blank')
    page.add_init_script("Storage.prototype.setItem = function(){ throw new Error('QuotaExceededError') }; Storage.prototype.getItem = function(){ throw new Error('SecurityError') };")
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    page.locator('.opt').first.tap()
    page.get_by_role('button', name='下一題').tap()
    assert '第 2 /' in page.inner_text('#app') and not [e for e in page.errors if 'Quota' not in e and 'Security' not in e]


@needs_exam
def test_safari_formal_exam_reading_reader_and_cloze_blanks(make_ios_page):
    page = make_ios_page()
    start_exam(page, '115', 'formal')
    assert page.get_by_role('button', name='暫停').count() == 0 and page.locator('.timer').inner_text().startswith('⏱ ')
    page.evaluate("localStorage.removeItem('gsat-session-v2')")          # 正式模擬考換成自由練習，方便直接跳題
    start_exam(page, '115', 'free')
    goto_question(page, 36)
    assert wait_images(page) == [] and hscroll_overflow(page) <= 1
    page.evaluate("document.querySelector('.passage').scrollTop = 220")
    page.get_by_role('button', name='回文章').tap()
    assert page.locator('.reader').is_visible()
    page.evaluate("document.querySelector('.reader .passage').scrollTop = 400")
    page.get_by_role('button', name='回題目').tap()
    assert page.locator('.reader').count() == 0
    assert abs(page.evaluate("document.querySelector('.passage').scrollTop") - 220) <= 3
    goto_question(page, 11)                                               # 綜合測驗：點空格、選答案、下一空格
    page.locator('.passage button.blank', has_text='13').first.tap()
    assert '第 13 題空格' in page.inner_text('.qtext')
    page.locator('.opt').nth(1).tap()
    assert page.locator('.passage button.blank', has_text='13').first.inner_text() == '13 B'
    page.get_by_role('button', name='下一空格 →').tap()
    assert '第 14 題空格' in page.inner_text('.qtext') and page.errors == []


@needs_exam
@pytest.mark.parametrize('y,n', [('111', 35), ('112', 44), ('113', 35), ('115', 31), ('115', 38)])
def test_safari_picture_and_wordbank_questions_fit_the_screen(make_ios_page, y, n):
    page = make_ios_page()
    start_exam(page, y, 'free')
    goto_question(page, n)
    assert wait_images(page) == [] and hscroll_overflow(page) <= 1
    page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    bar_top = page.locator('.bar').bounding_box()['y']
    last = page.locator('.opt').last.bounding_box()
    assert last['y'] + last['height'] <= bar_top + 1


@needs_exam
def test_safari_full_paper_flow_scores_and_shows_summary(make_ios_page):
    page = make_ios_page()
    start_exam(page, '114', 'free')
    while True:
        q = cur_q(page)
        page.locator('.opt').nth(q['a']).tap()
        if q['idx'] == q['total'] - 1:
            break
        page.get_by_role('button', name='下一題').tap()
    page.get_by_role('button', name='交卷').tap()
    page.locator('.modal .btn').first.tap()
    page.wait_for_selector('h1:has-text("成績")')
    assert page.locator('.stat b').first.inner_text() == '62 / 62'
    assert page.locator('[data-role=summary] [data-role=total] b').inner_text() == '— / 100'
    assert page.errors == []
