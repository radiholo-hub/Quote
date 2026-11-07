"""逐題詳解（schema 2）：交卷後才可進入、五段式內容、分層收合、詳解與官方答案不符就不顯示、人工審核表。"""
import shutil
import subprocess
import sys

import pytest

from conftest import ROOT, URL, needs_exam, run_exam

REPO = ROOT.parent
SECTIONS = ['① 正確答案', '② 解題關鍵', '③ 選項解析', '④ 單字與發音', '⑤ 衍生字與延伸', '⑥ 歷屆出題紀錄', '⑦ 延伸練習']


def open_review(page, wrong_n, picks=None, device_open_all=True):
    run_exam(page, '115', correct=lambda q: q['n'] != wrong_n)
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain.v2')
    if device_open_all:
        page.evaluate("document.querySelectorAll('details.lsec').forEach(d=>d.open=true)")


@needs_exam
def test_explanation_shows_all_five_parts_in_the_required_order(make_page):
    page = make_page('desktop')
    open_review(page, 1)
    box = page.locator('.explain.v2')
    assert box.get_attribute('data-explain') == 'draft'
    assert box.locator('summary .ttl').all_inner_texts() == SECTIONS                       # 順序：答案 → 解題關鍵 → 選項 → 單字 → 衍生字 → 出題紀錄 → 延伸練習
    # 1 正確答案：答案、中文意思、學生選擇、對錯原因
    ans = box.locator('[data-role=answer]').inner_text()
    assert '正確答案:(B) tight' in ans and '緊湊的' in ans and 'adj.' in ans
    assert box.locator('[data-role=verdict]').inner_text().startswith('✘ 你選了 (C) diligent')
    assert 'diligent 是「勤勉的」' in box.locator('[data-role=why-wrong]').inner_text() and 'tight schedule' in box.locator('[data-role=why-right]').inner_text()
    # 2 解題關鍵：有判斷步驟，不是只寫「依上下文可知」
    steps = box.locator('[data-role=key] li').all_inner_texts()
    assert len(steps) == 3 and 'such a' in steps[0] and 'that' in steps[0] and all(len(t) > 20 for t in steps)
    # 3 選項解析：四個選項逐一說明，附詞性與中文、發音
    cards = box.locator('.optcard')
    assert cards.count() == 4 and [c.get_attribute('data-opt') for c in cards.all()] == list('ABCD')
    assert box.locator('.optcard.ok').get_attribute('data-opt') == 'B' and box.locator('.optcard.bad').get_attribute('data-opt') == 'C'
    assert all(c.locator('.spk').count() == 1 and 'adj.' in c.inner_text() for c in cards.all())
    # 4 單字與發音：詞性、中文、發音、搭配詞、原創例句、文法補充
    w = box.locator('.wcard[data-entry=tight-adj]')
    assert w.locator('.whead .spk').count() == 1 and w.locator('.colls .spk').count() == 3 and w.locator('.exs .spk').count() == 2
    assert 'tight schedule' in w.inner_text() and 'such a' in box.locator('[data-role=grammar]').inner_text()
    # 5 衍生字與延伸：字族(B)、語意相關(C)分開，常考句型
    assert box.locator('[data-role=family] li').count() == 3 and box.locator('[data-role=syn]').count() == 1 and box.locator('[data-role=conf]').count() == 1
    assert box.locator('[data-role=patterns] li').count() == 2


@needs_exam
def test_correct_answers_get_a_different_verdict_and_unanswered_is_explained(make_page):
    page = make_page('desktop')
    run_exam(page, '115', correct=lambda q: True if q['n'] != 2 else None)               # 第 2 題不作答，其餘全對
    page.goto(page.url.split('#')[0] + '#/result/' + page.evaluate('__gsat.DB().hist[0].id'))
    page.locator('.nav a', has_text='1').first.click()
    page.wait_for_selector('.explain.v2')
    assert page.locator('[data-role=verdict]').inner_text().startswith('✔ 你選的 (B) 是正確答案') and page.locator('[data-role=why-wrong]').count() == 0
    page.get_by_role('link', name='下一題').click()
    page.wait_for_function("document.querySelector('[data-role=verdict]').innerText.includes('沒有作答')")


@needs_exam
@pytest.mark.parametrize('n', range(1, 11))
def test_each_of_the_ten_explanations_renders_every_section(make_page, n):
    page = make_page('desktop')
    open_review(page, n)
    box = page.locator('.explain.v2')
    assert box.locator('summary .ttl').all_inner_texts() == SECTIONS
    assert box.locator('.optcard').count() == 4 and box.locator('[data-role=key] li').count() >= 3
    assert box.locator('.wcard').count() >= 1 and box.locator('[data-role=grammar]').count() == 1
    assert box.locator('.tag').first.inner_text() == '草稿・待人工審核'


@needs_exam
def test_phone_layers_the_explanation_and_collapses_the_long_parts(make_page):
    page = make_page('phone')
    open_review(page, 1, device_open_all=False)
    states = page.locator('details.lsec').evaluate_all('ds=>ds.map(d=>d.open)')
    assert states == [True, True, True, False, False, False, False]                          # 前三段展開，單字、衍生字、出題紀錄、延伸練習收合
    page.locator('details.lsec[data-sec="4"] summary').click()
    assert page.locator('details.lsec[data-sec="4"]').evaluate('d=>d.open') is True
    desk = make_page('desktop')
    open_review(desk, 1, device_open_all=False)
    assert desk.locator('details.lsec').evaluate_all('ds=>ds.map(d=>d.open)') == [True] * 7   # 電腦版全部展開


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
def test_explanation_is_unreachable_before_submitting(make_page):
    page = make_page()
    page.goto(URL + '#/exam/115')
    page.get_by_role('button', name='開始自由練習').click()
    page.wait_for_selector('.opt')
    page.locator('.opt').first.click()
    assert page.locator('.explain').count() == 0
    page.goto(URL + '#/rev/nope/0')
    assert '找不到這一題' in page.inner_text('#app') and page.locator('.explain').count() == 0


@needs_exam
def test_explanation_contradicting_the_official_key_is_dropped(make_page):
    page = make_page(url='about:blank')
    page.route('**/exam/explain.js', lambda r: r.fulfill(content_type='text/javascript',
              body="window.EXPLAIN={'115-1':{schema:2,answer:'C',status:'draft',key:['x'],options:{},words:[],phrases:[],patterns:[],focus:'tight-adj'},'115-2':{schema:2,answer:'C',status:'draft',key:['y'],options:{},words:[],phrases:[],patterns:[],focus:'amateur-adj'}};"))
    page.goto(URL + '#/')
    assert page.evaluate('Object.keys(__gsat.EXPL())') == ['115-2']                          # 115-1 的官方答案是 B，詳解寫 C → 整則捨棄
    assert any('115-1' in e for e in page.errors)


@needs_exam
@pytest.mark.skipif(shutil.which('node') is None, reason='審核表工具需要 node')
def test_review_sheet_contains_everything_a_reviewer_needs_and_refuses_to_write_inside_the_repo(tmp_path):
    tool = REPO / 'tools' / 'gsat_review_sheet.py'
    ok = subprocess.run([sys.executable, '-I', str(tool), '--out', str(tmp_path / 'sheet')], capture_output=True, text=True)
    assert ok.returncode == 0, ok.stderr
    doc = (tmp_path / 'sheet' / 'explanation-review-sheet.html').read_text(encoding='utf8')
    assert doc.count('<section>') == 10
    for k in range(1, 11):
        assert f'115-{k}・' in doc
    for part in ('官方答案', '解題關鍵', '選項解析', '重要單字與片語', '常考句型', '文法補充', '延伸練習(待審核草稿)', '引用到的單字詞條', '字族(B)', '全部為原創寫法', '請勿公開轉貼'):
        assert part in doc, part
    bad = subprocess.run([sys.executable, '-I', str(tool), '--out', str(REPO / 'docs' / 'oops')], capture_output=True, text=True)
    assert bad.returncode != 0 and '版本庫' in (bad.stderr + bad.stdout) and not (REPO / 'docs' / 'oops').exists()
