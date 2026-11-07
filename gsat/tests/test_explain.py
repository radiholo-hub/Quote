"""詳解：每題必備欄位、交卷後才可看、草稿標示、與官方答案不符就不顯示、人工審核表。"""
import shutil
import subprocess
import sys

import pytest

from conftest import ROOT, URL, needs_exam, run_exam

REPO = ROOT.parent


@needs_exam
def test_explanation_shows_every_required_part_after_submitting(make_page):
    page = make_page()
    run_exam(page, '115', correct=lambda q: q['n'] > 3)                      # 前 3 題（有詳解）答錯
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain')
    box = page.locator('.explain')
    assert box.get_attribute('data-explain') == 'draft'
    t = box.inner_text()
    for part in ('正確答案:(B)', '草稿・待人工審核', '解題關鍵', '各選項分析', '重要單字與片語', '文法補充', '(A) hasty', '(B) tight', '(C) diligent', '(D) routine'):
        assert part in t, part
    assert box.locator('h4').all_inner_texts() == ['解題關鍵', '各選項分析', '重要單字與片語', '文法補充']
    assert box.locator('ul').first.locator('li').count() == 4                # 四個選項都有分析
    page.get_by_role('link', name='下一題').click()
    page.wait_for_function("document.querySelector('.explain').innerText.includes('amateur')")


@needs_exam
@pytest.mark.parametrize('n', range(1, 11))
def test_each_of_the_ten_explanations_renders_all_sections(make_page, n):
    page = make_page()
    run_exam(page, '115', correct=lambda q: q['n'] != n)
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain')
    assert page.locator('.explain h4').all_inner_texts() == ['解題關鍵', '各選項分析', '重要單字與片語', '文法補充']
    assert page.locator('.explain .tag').inner_text() == '草稿・待人工審核'


@needs_exam
def test_question_without_explanation_says_so_instead_of_inventing_one(make_page):
    page = make_page()
    run_exam(page, '111', correct=lambda q: q['n'] > 3)
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain')
    t = page.inner_text('.explain')
    assert '正確答案' in t and '詳解還在製作中' in t and '解題關鍵' not in t
    assert page.locator('.explain').get_attribute('data-explain') == 'none'


@needs_exam
def test_explanation_contradicting_the_official_key_is_dropped(make_page):
    page = make_page(url='about:blank')
    page.route('**/exam/explain.js', lambda r: r.fulfill(content_type='text/javascript',
              body="window.EXPLAIN={'115-1':{answer:'C',status:'draft',key:'錯的詳解',why:{},words:[]},'115-2':{answer:'C',status:'draft',key:'對的詳解',why:{},words:[]}};"))
    page.goto(URL + '#/')
    assert page.evaluate('Object.keys(__gsat.EXPL())') == ['115-2']
    assert any('115-1' in e for e in page.errors)


@needs_exam
@pytest.mark.skipif(shutil.which('node') is None, reason='審核表工具需要 node')
def test_review_sheet_contains_every_explanation_and_refuses_to_write_inside_the_repo(tmp_path):
    tool = REPO / 'tools' / 'gsat_review_sheet.py'
    ok = subprocess.run([sys.executable, '-I', str(tool), '--out', str(tmp_path / 'sheet')], capture_output=True, text=True)
    assert ok.returncode == 0, ok.stderr
    doc = (tmp_path / 'sheet' / 'explanation-review-sheet.html').read_text(encoding='utf8')
    assert doc.count('<section>') == 10
    for k in range(1, 11):
        assert f'115-{k}・' in doc
    for part in ('官方答案', '解題關鍵', '各選項分析', '重要單字與片語', '文法補充', '全部為原創寫法', '請勿公開轉貼'):
        assert part in doc
    bad = subprocess.run([sys.executable, '-I', str(tool), '--out', str(REPO / 'docs' / 'oops')], capture_output=True, text=True)
    assert bad.returncode != 0 and '版本庫' in (bad.stderr + bad.stdout)
    assert not (REPO / 'docs' / 'oops').exists()
