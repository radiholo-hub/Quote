"""全卷成績單：自動評分、待自評、總分；尚未評分的作文與翻譯不得被當成 0 分；各年度制度不混用。"""
import pytest

from conftest import URL, needs_exam, run_exam

pytestmark = needs_exam


def row(page, item):
    r = page.locator(f'[data-role=summary] tr[data-item={item}]')
    return r.get_attribute('data-state'), r.locator('td').nth(2).inner_text(), r.locator('td').nth(1).inner_text(), r.locator('td').nth(3).inner_text()


def box(page, role):
    return page.locator(f'[data-role=summary] [data-role={role}] b').inner_text()


def fill_all_115(page):
    page.goto(URL + '#/ns/115')
    for L in 'ADE':
        page.get_by_role('button', name='選項 ' + L, exact=True).click()
    page.get_by_role('button', name='對答案').click()                                  # 多選題 4 分
    page.get_by_label('填空與簡答自評').fill('5')
    page.get_by_label('第 1 題對照後發現的錯誤數').fill('3')                           # 4 − 1.5 = 2.5
    page.get_by_label('第 2 題對照後發現的錯誤數').fill('0')                           # 4
    page.get_by_label('作文自評分數').fill('14')
    page.wait_for_timeout(600)


def test_result_shows_auto_scored_and_pending_parts_without_zero_filling(make_page):
    page = make_page()
    run_exam(page, '115', mode='formal')
    assert page.locator('[data-role=summary]').count() == 1
    assert row(page, 'mc') == ('scored', '62', '自動評分', '62')
    for item, text in [('multi', '尚未作答'), ('fill', '待自評'), ('t0', '待自評'), ('t1', '待自評'), ('essay', '待自評')]:
        state, got, how, mx = row(page, item)
        assert state == 'pending' and got == text, item                              # 不是 0
    assert row(page, 'multi')[2] == '自動評分' and row(page, 'essay')[2] == '自評'
    assert box(page, 'scored') == '62 / 62' and box(page, 'pending') == '38'
    assert box(page, 'total') == '— / 100'                                           # 還沒評完：不顯示總分，也不是「62 / 100」
    assert '還有 38 分待評分' in page.inner_text('[data-role=summary]')


def test_summary_completes_after_self_scoring_and_matches_on_both_pages(make_page):
    page = make_page()
    run_exam(page, '115', mode='formal')
    hist_url = page.url
    fill_all_115(page)
    # 62 + 多選 4 + 填空簡答 5 + 翻譯 2.5 + 4 + 作文 14 = 91.5
    assert box(page, 'total') == '91.5 / 100' and box(page, 'pending') == '0' and box(page, 'scored') == '91.5 / 100'
    assert row(page, 't0')[1] == '2.5' and row(page, 'multi')[1] == '4'
    assert '自評分數僅供參考' in page.inner_text('[data-role=summary]')
    page.goto(hist_url)                                                                # 成績頁的成績單同步
    assert box(page, 'total') == '91.5 / 100'


def test_partial_self_scoring_only_counts_what_was_scored(make_page):
    page = make_page()
    run_exam(page, '115', mode='free')
    page.goto(URL + '#/ns/115')
    page.get_by_label('作文自評分數').fill('12')
    page.get_by_label('第 1 題對照後發現的錯誤數').fill('2')
    page.wait_for_timeout(500)
    assert box(page, 'scored') == '77 / 86' and box(page, 'pending') == '14'          # 62 + 作文 12 + 翻譯一題 3；滿分 62+20+4
    assert row(page, 't1')[0] == 'pending' and box(page, 'total') == '— / 100'


def test_without_any_multiple_choice_attempt_the_choice_part_is_pending_not_zero(make_page):
    page = make_page()
    page.goto(URL + '#/ns/114')
    assert row(page, 'mc') [0:2] == ('pending', '尚未作答') and box(page, 'scored') == '尚無'
    assert box(page, 'total') == '— / 100'


def test_old_system_year_has_no_mixed_items_and_totals_100(make_page):
    page = make_page()
    run_exam(page, '106', mode='formal')
    items = page.locator('[data-role=summary] tr[data-item]').evaluate_all('rs=>rs.map(r=>r.dataset.item)')
    assert items == ['mc', 't0', 't1', 'essay'] and row(page, 'mc')[1] == '72'
    assert box(page, 'pending') == '28'
    page.goto(URL + '#/ns/106')
    page.get_by_label('第 1 題對照後發現的錯誤數').fill('2')
    page.get_by_label('第 2 題對照後發現的錯誤數').fill('1')
    page.get_by_label('作文自評分數').fill('15')
    page.wait_for_timeout(500)
    assert box(page, 'total') == '93.5 / 100'                                          # 72 + 3 + 3.5 + 15
    assert page.get_by_role('button', name='對答案').count() == 0                      # 106 年沒有多選題


def test_partial_practice_has_no_paper_summary(make_page):
    page = make_page()
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='5', exact=True).click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    n = page.evaluate('__gsat.loadSession().ids.length')
    for i in range(n):
        page.locator('.opt').first.click()
        if i < n - 1:
            page.get_by_role('button', name='下一題').click()
    page.get_by_role('button', name='交卷').click()
    page.locator('.modal .btn').first.click()
    page.wait_for_selector('h1:has-text("成績")')
    assert page.locator('[data-role=summary]').count() == 0
