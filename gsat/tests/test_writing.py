"""非選擇題：中譯英、英文作文、多選題自動計分、自動儲存；公開版也能用原創寫作練習。"""
import pytest

from conftest import DEVICES, URL, hscroll_overflow, wait_images


def test_translation_text_and_error_count_are_saved(make_page):
    page = make_page()
    page.goto(URL + '#/ns/orig/T1')
    ta = page.get_by_label('第 1 題的英文翻譯')
    ta.fill('Reading is not just for exams but a lifelong habit.')
    page.get_by_label('第 1 題對照後發現的錯誤數').fill('3')
    assert '4 − 0.5 × 3 = 2.5 分' in page.inner_text('#app')
    page.wait_for_timeout(600)                                   # 自動儲存有 0.4 秒的延遲
    page.reload()
    assert page.get_by_label('第 1 題的英文翻譯').input_value() == 'Reading is not just for exams but a lifelong habit.'
    assert page.get_by_label('第 1 題對照後發現的錯誤數').input_value() == '3'
    page.get_by_label('第 1 題對照後發現的錯誤數').fill('12')
    assert '= 0 分' in page.inner_text('#app')                   # 扣到負數以 0 分計


def test_translation_reference_is_hidden_until_requested_and_labelled_as_one_possibility(make_page):
    page = make_page()
    page.goto(URL + '#/ns/orig/T3')
    assert 'getting better and better' not in page.inner_text('#app')
    page.get_by_role('button', name='看參考譯文與重點').click()
    t = page.inner_text('#app')
    assert 'getting better and better' in t and '不是唯一答案' in t


def test_essay_counts_words_and_paragraphs_and_autosaves(make_page):
    page = make_page()
    page.goto(URL + '#/ns/orig/E1')
    assert '字數 0 / 至少 120' in page.inner_text('#app')
    page.get_by_label('你的作文').fill('The library is old.\nIt needs new desks.')
    t = page.inner_text('#app')
    assert '字數 8 / 至少 120' in t and '段落 2 / 題目要求 2 段 ✔' in t
    page.get_by_label('你的作文').fill(' '.join(['word'] * 120))
    assert '字數 120 / 至少 120 ✔' in page.inner_text('#app')
    page.locator('input[type=checkbox]').first.check()
    page.get_by_label('作文自評分數').fill('14')
    page.wait_for_timeout(600)
    page.reload()
    assert page.get_by_label('你的作文').input_value() == ' '.join(['word'] * 120)
    assert page.locator('input[type=checkbox]').first.is_checked() and page.get_by_label('作文自評分數').input_value() == '14'


def test_ai_feedback_is_clearly_not_available_and_not_official(make_page):
    page = make_page()
    page.goto(URL + '#/ns/orig/E2')
    t = page.inner_text('#app')
    assert '尚未提供' in t and 'AI 建議分數' in t and '不代表大考中心官方評分' in t
    assert page.get_by_role('button', name='AI').count() == 0     # 沒有假的批改按鈕


# 多選題官方計分：111 CD(n=6)、112 DF(n=8)、113 CF(n=6)、114 CDGI(n=10)、115 ADE(n=6)，滿分 4 分
@pytest.mark.parametrize('year,picks,expect', [
    ('111', 'CD', '4'), ('111', 'C', '2.67'), ('111', 'CDE', '2.67'), ('111', 'AB', '0'), ('111', '', '0'),
    ('112', 'DF', '4'), ('112', 'DFG', '3'),                           # n=8，k=1 → 4×6/8
    ('113', 'CF', '4'), ('114', 'CDGI', '4'), ('114', 'CDG', '3.2'),   # n=10，k=1 → 4×8/10
    ('115', 'ADE', '4'), ('115', 'AD', '2.67'),
])
def test_multi_select_is_scored_by_the_official_formula(make_page, year, picks, expect):
    page = make_page()
    page.goto(URL + '#/ns/' + year)
    for L in picks:
        page.get_by_role('button', name='選項 ' + L, exact=True).click()
    page.get_by_role('button', name='對答案').click()
    t = page.inner_text('.explain')
    assert ('= ' + expect + ' 分') in t or (expect == '0' and ('0 分' in t))
    if picks == 'AB' and year == '111':
        assert '低於 0 以 0 分計' in t


def test_multi_select_selection_survives_reload(make_page):
    page = make_page()
    page.goto(URL + '#/ns/114')
    for L in 'CDG':
        page.get_by_role('button', name='選項 ' + L, exact=True).click()
    page.get_by_role('button', name='對答案').click()
    page.wait_for_timeout(600)
    page.reload()
    assert page.get_by_role('button', name='選項 C', exact=True).get_attribute('aria-pressed') == 'true'
    assert '3.2' in page.inner_text('.explain')


def test_official_year_pages_show_paper_and_scoring_guides_on_demand(make_page):
    page = make_page()
    page.goto(URL + '#/ns/112')
    assert page.locator('img.nsimg:visible').count() == 0                # 預設收合，不載入圖片
    page.get_by_role('button', name='看試卷頁面(題目)').click()
    page.get_by_role('button', name='看官方評分原則').click()
    assert page.locator('img.nsimg:visible').count() >= 4 and wait_images(page) == []


@pytest.mark.parametrize('device', list(DEVICES))
def test_writing_pages_fit_every_screen(make_page, device):
    page = make_page(device)
    for r in ['#/ns/', '#/ns/orig/T2', '#/ns/orig/E3', '#/ns/111', '#/ns/114', '#/ns/106']:
        page.goto(URL + r)
        page.reload()
        assert hscroll_overflow(page) <= 1, f'{device} {r}'
        for ta in page.locator('textarea').all():
            assert ta.bounding_box()['width'] <= DEVICES[device]['viewport']['width']
    assert page.errors == []
