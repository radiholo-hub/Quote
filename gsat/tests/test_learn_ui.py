"""單字頁、歷屆出題紀錄、題目預覽與權限、延伸練習、返回詳解時保留閱讀位置、各螢幕版面。"""
import json

import pytest

from conftest import DEVICES, URL, hscroll_overflow, needs_exam, run_exam

TIERED = "window.GSAT_ACCESS={mode:'tiered',tiers:{byYear:{'114':'premium'},byQuestion:{}},entitlements:{premium:false}};"


def review_q1(page, open_all=False):
    run_exam(page, '115', correct=lambda q: q['n'] != 1)
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain.v2')
    if open_all:
        page.evaluate("document.querySelectorAll('details.lsec').forEach(d=>d.open=true)")


# ---------------------------------------------------------------- 單字頁與出現紀錄
@needs_exam
def test_word_page_shows_real_records_with_year_question_type_form_position_and_role(make_page):
    page = make_page('desktop')
    page.goto(URL + '#/word/communicate-v')
    box = page.locator('[data-role=records]')
    assert [box.locator(f'[data-k={k}] b').inner_text() for k in ('total', 'years', 'units')] == ['1', '1', '1']
    row = box.locator('[data-role=rec-table] tr[data-qid]')
    assert row.count() == 1 and row.get_attribute('data-qid') == 'e115_12'
    cells = row.locator('td').all_inner_texts()
    assert cells[:6] == ['115', '第 12 題', '綜合測驗', 'communicate', '選項 (C)', '正確答案']
    assert '題幹:0 次' in box.inner_text() and '選項・正確答案:1 次(其中整個選項就是這個字:1 次)' in box.inner_text()
    assert box.locator('[data-role=per-year] tr').count() == 2 and '首次出現:115' in box.inner_text() and '最近一次:115' in box.inner_text()
    assert '不代表未來的出題機率' in box.locator('[data-role=disclaimer]').inner_text()


@needs_exam
def test_family_members_are_listed_separately_with_their_own_records(make_page):
    page = make_page('desktop')
    page.goto(URL + '#/word/communicate-v')
    fam = page.locator('[data-role=family-counts] li')
    assert [f.get_attribute('data-entry') for f in fam.all()] == ['communication-n', 'communicative-adj', 'communicator-n']
    assert '已確認 1 次,出現於 114 學年度' in fam.nth(0).inner_text() and '沒有已確認' in fam.nth(1).inner_text()
    # 原字自己的次數不含衍生字（communicate 只有 115 年 1 次，communication 的 114 年不併入）
    assert page.locator('[data-k=total] b').inner_text() == '1' and page.locator('[data-role=per-year]').inner_text().count('114') == 0
    assert page.locator('[data-role=syn]').inner_text().startswith('同義字:express') and 'interact' not in page.locator('[data-role=syn]').inner_text()
    assert 'interact' in page.locator('[data-role=conf]').inner_text()


@needs_exam
def test_pending_review_matches_are_listed_but_not_counted(make_page):
    """待審核紀錄會列出但不計入次數。不寫死某個詞條:挑一個「已確認 0 次、仍有待審核紀錄」的詞條(人工審核完成的詞條會自然換掉)。"""
    page = make_page('desktop')
    page.goto(URL + '#/word/tight-adj')
    pick = page.evaluate("Object.entries(window.VOCAB_INDEX.entries).filter(([k, e]) => e.total === 0 && e.review.length > 0).map(([k, e]) => [k, e.review.length])[0]")
    assert pick, '索引裡必須至少有一個已確認 0 次、仍有待審核紀錄的詞條'
    eid, n = pick
    page.goto(URL + '#/word/' + eid)
    box = page.locator('[data-role=records]')
    assert box.locator('[data-k=total] b').inner_text() == '0'
    assert f'另有 {n} 筆待審核' in box.locator('[data-role=review] summary').inner_text()
    box.locator('[data-role=review] summary').click()
    assert '詞性有疑義' in box.locator('[data-role=review]').inner_text() or '複合詞' in box.locator('[data-role=review]').inner_text()


@needs_exam
def test_human_reviewed_records_are_counted_and_no_longer_pending(make_page):
    """tight-adj 的三筆待審核已由教師(負責人)審核:計入 2 次(正確答案 1、文章用字 1)、待審核 0 筆;skin-tight 不計入獨立 tight-adj。"""
    page = make_page('desktop')
    page.goto(URL + '#/word/tight-adj')
    box = page.locator('[data-role=records]')
    assert box.locator('[data-k=total] b').inner_text() == '2' and box.locator('[data-k=years] b').inner_text() == '1'
    brk = box.locator('[data-role=breakdown]').inner_text()
    assert '題幹:0 次' in brk and '選項・正確答案:1 次' in brk and '選項・干擾選項:0 次' in brk and '文章原文:1 次' in brk
    assert box.locator('[data-role=review]').count() == 0                                    # 沒有待審核提示
    roles = box.locator('[data-role=rec-table] tr[data-role-type]').evaluate_all('rs => rs.map(r => r.dataset.roleType)')
    assert sorted(roles) == ['answer', 'passage']
    assert page.evaluate("window.VOCAB_INDEX.entries['tight-adj'].rejected.map(r => r.y + ':' + r.n)") == ['109:13']      # skin-tight:人工排除,不計入


@needs_exam
def test_passage_words_are_reported_as_source_text_not_as_tested_answers(make_page):
    page = make_page('desktop')
    page.goto(URL + '#/word/consumption-n')
    t = page.locator('[data-role=breakdown]').inner_text()
    assert '文章原文:5 次' in t and '分布在 2 篇文章/題組' in t and '選項・正確答案:1 次' in t and '選項・干擾選項:2 次' in t
    rows = page.locator('[data-role=rec-table] tr[data-role-type=passage]')
    assert rows.count() >= 2 and all('文章' in r.inner_text() for r in rows.all())


@needs_exam
def test_words_page_lists_entries_with_counts_and_search_works(make_page):
    page = make_page('desktop')
    page.goto(URL + '#/words')
    assert page.locator('[data-entry]').count() >= 59
    page.get_by_label('搜尋單字或中文').fill('溝通')
    names = [n.strip() for n in page.locator('[data-entry] b').all_inner_texts()]
    assert names == ['communicate', 'communication', 'communicative', 'communicator'] and page.locator('[data-family=communicate]').count() == 1
    page.get_by_label('搜尋單字或中文').fill('zzzz')
    assert '沒有符合的單字' in page.inner_text('#app')
    page.goto(URL + '#/word/nope-v')
    assert '找不到這個單字' in page.inner_text('#app')


# ---------------------------------------------------------------- 權限：點出現紀錄查看題目
@needs_exam
def test_open_policy_lets_every_record_be_viewed(make_page):
    page = make_page('desktop')
    page.goto(URL + '#/word/communication-n')
    assert page.get_by_role('link', name='查看題目').count() == 1 and page.locator('.lock').count() == 0


@needs_exam
def test_premium_question_records_are_listed_but_locked_and_the_question_is_not_shown(make_page):
    page = make_page('desktop', url='about:blank', init=[TIERED])
    page.goto(URL + '#/word/communication-n')                                        # 114 年（設為完整方案內容）
    row = page.locator('tr[data-qid]')
    assert row.count() == 1 and '114' in row.inner_text() and '干擾選項' in row.inner_text()   # 年度、題號、角色仍然列出（紀錄本身）
    assert row.locator('.lock').count() == 1 and page.get_by_role('link', name='查看題目').count() == 0
    page.goto(URL + '#/q/' + row.get_attribute('data-qid'))                          # 直接輸入網址也不能看
    assert page.locator('[data-role=locked]').count() == 1 and page.locator('.opt').count() == 0 and page.locator('.qtext').count() == 0
    page.goto(URL + '#/word/communicate-v')                                           # 115 年是免費的
    assert page.get_by_role('link', name='查看題目').count() == 1


@needs_exam
def test_entitled_user_can_view_premium_questions(make_page):
    page = make_page('desktop', url='about:blank', init=[TIERED.replace('premium:false', 'premium:true')])
    page.goto(URL + '#/word/communication-n')
    assert page.get_by_role('link', name='查看題目').count() == 1
    page.get_by_role('link', name='查看題目').click()
    page.wait_for_selector('.qtext')
    assert page.locator('.opt').count() == 4


@needs_exam
def test_viewing_a_question_from_a_record_never_reveals_the_answer_before_submitting(make_page):
    page = make_page('phone')
    page.goto(URL + '#/word/communicate-v')
    page.get_by_role('link', name='查看題目').click()
    page.wait_for_selector('[data-role=no-reveal]')
    assert '作答並交卷後才能看答案與詳解' in page.inner_text('#app')
    assert page.locator('.opt.ok, .opt.bad, .explain').count() == 0
    assert all(o.is_disabled() for o in page.locator('.opt').all())                   # 預覽時選項不能作答
    page.locator('.opt').first.click(force=True)
    assert page.locator('.opt.sel').count() == 0
    page.locator('[data-act=practice]').click()                                       # 練習這一題 → 作答 → 交卷後才看詳解
    page.wait_for_selector('.opt')
    n = page.evaluate('__gsat.loadSession().ids.length')
    assert n == 5 and page.evaluate('__gsat.loadSession().kind') == 'practice'         # 綜合測驗整組 5 題一起練習
    for i in range(n):
        page.locator('.opt').first.click()
        assert page.locator('.explain').count() == 0
        if i < n - 1: page.get_by_role('button', name='下一題').click()
    page.get_by_role('button', name='交卷').click()
    page.locator('.modal .btn').first.click()
    page.wait_for_selector('h1:has-text("成績")')
    page.goto(URL + '#/q/e115_12')
    page.wait_for_selector('.opt.ok')                                                  # 交卷後同一題才顯示答案
    assert '你 ' in page.inner_text('#app') and page.locator('.opt.ok').count() == 1


# ---------------------------------------------------------------- 返回詳解時保留閱讀位置
@needs_exam
@pytest.mark.parametrize('device', ['phone', 'desktop'])
def test_returning_to_the_explanation_restores_scroll_position_and_open_sections(make_page, device):
    page = make_page(device)
    review_q1(page)
    if device == 'phone':
        page.locator('details.lsec[data-sec="4"] summary').click()                    # 手機：先展開「單字與發音」
    page.evaluate('window.scrollTo(0, document.body.scrollHeight * 0.45)')
    page.wait_for_timeout(150)
    y = page.evaluate('window.scrollY')
    assert y > 200
    link = page.locator('.optcard[data-opt=B] a.wlink')
    link.scroll_into_view_if_needed()
    y = page.evaluate('window.scrollY')
    link.click()
    page.wait_for_selector('[data-view=word]')
    assert page.evaluate('window.scrollY') == 0                                         # 單字頁從頂端開始
    page.get_by_role('link', name='← 返回').click()
    page.wait_for_selector('.explain.v2')
    page.wait_for_timeout(250)
    assert abs(page.evaluate('window.scrollY') - y) <= 3                                # 回到原本的閱讀位置
    if device == 'phone':
        assert page.locator('details.lsec[data-sec="4"]').evaluate('d=>d.open') is True # 展開的區塊也保留


@needs_exam
def test_browser_back_button_also_restores_the_position(make_page):
    page = make_page('phone')
    review_q1(page, open_all=True)
    page.evaluate('window.scrollTo(0, 900)')
    page.wait_for_timeout(150)
    y = page.evaluate('window.scrollY')
    page.locator('.optcard[data-opt=A] a.wlink').evaluate('a=>a.click()')
    page.wait_for_selector('[data-view=word]')
    page.go_back()
    page.wait_for_selector('.explain.v2')
    page.wait_for_timeout(250)
    assert abs(page.evaluate('window.scrollY') - y) <= 3


# ---------------------------------------------------------------- 延伸練習
@needs_exam
def test_extension_practice_has_instant_feedback_and_saved_stats(make_page):
    """第 1 題已由教師簽核:延伸練習標示「本題教師已確認」,不再標「待審核草稿」(未簽核題目的草稿標示見 test_unsigned_questions_keep_the_draft_presentation)。"""
    page = make_page('phone')
    review_q1(page)
    page.locator('details.lsec[data-sec="7"] summary').click()
    assert '本題教師已確認' in page.locator('details.lsec[data-sec="7"]').inner_text() and '待審核草稿' not in page.locator('details.lsec[data-sec="7"]').inner_text()
    page.locator('[data-role=ext-start]').click()
    page.wait_for_selector('[data-role=ext-q]')
    assert '本題教師已確認' in page.inner_text('#app') and '待審核草稿' not in page.inner_text('#app') and '尚未經老師審核' not in page.inner_text('#app')
    q = page.locator('[data-role=ext-q]').inner_text()
    assert 'deadline' in q
    page.locator('.opt', has_text='tight').first.click()                               # (A) tight：答對
    assert page.locator('[data-role=ext-explain]').inner_text().startswith('✔ 答對了') and 'tight deadline' in page.locator('[data-role=ext-explain]').inner_text()
    page.get_by_role('button', name='下一題').click()
    page.locator('.opt').nth(0).click()                                                # (A) tight：Please … the lid → 答錯（應為 tighten）
    t = page.locator('[data-role=ext-explain]').inner_text()
    assert t.startswith('✘ 答錯了') and '(C)' in t and 'tighten' in t
    page.get_by_role('button', name='看結果').click()
    assert page.locator('[data-role=ext-result] b').inner_text() == '1 / 2'
    stats = page.evaluate('__gsat.DB().ext')
    assert stats['x115-1-a'] == {'a': 1, 'c': 1} and stats['x115-1-b'] == {'a': 1, 'c': 0}
    page.get_by_role('link', name='回到詳解').click()
    page.wait_for_selector('.explain.v2')


def review_q(page, n):
    run_exam(page, '115', correct=lambda q: q['n'] != n)
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain.v2')
    page.evaluate("document.querySelectorAll('details.lsec').forEach(d=>d.open=true)")


@needs_exam
def test_signed_off_question_does_not_show_contradicting_draft_labels(make_page):
    """第 1 題有有效教師簽核:頂端「已審核」,同一題內被簽核涵蓋的單字卡與延伸練習不再標「待審核草稿」;詞條與延伸題自己的 status 不變(不是全域改成 reviewed)。"""
    page = make_page('desktop')
    review_q(page, 1)
    box = page.locator('.explain.v2')
    assert box.get_attribute('data-explain') == 'reviewed' and box.locator('.tag').first.inner_text() == '已審核'
    txt = box.inner_text()
    assert '待審核草稿' not in txt and '草稿・待人工審核' not in txt
    assert box.locator('.wcard[data-entry=tight-adj] [data-role=signed]').inner_text() == '本題教師已確認'
    assert box.locator('details.lsec[data-sec="7"] [data-role=signed]').count() == 1
    st = page.evaluate("[window.VOCAB.entries['tight-adj'].status, window.EXT_PRACTICE.filter(x => x.forQuestion === '115-1').map(x => x.status)]")
    assert st == ['draft', ['draft', 'draft']]                                                       # 全域狀態沒有被改成 reviewed
    page.goto(URL + '#/word/tight-adj')                                                              # 單字頁不屬於任何簽核題的上下文:仍照詞條自己的 status 顯示
    w = page.locator('.wcard[data-entry=tight-adj]').inner_text()
    assert '待審核草稿' in w and '本題教師已確認' not in w
    page.goto(URL + '#/ext/115-1')                                                                   # 延伸練習頁:第 1 題簽核範圍
    t = page.locator('[data-view=ext]').inner_text()
    assert '本題教師已確認' in t and '尚未經老師審核' not in t and '待審核草稿' not in t and '115-1' in page.locator('[data-role=ext-signed]').inner_text()
    page.goto(URL + '#/ext/word:tight-adj')                                                          # 這個字的練習全部屬於第 1 題 → 同樣不再標草稿
    assert page.locator('[data-role=ext-signed]').count() == 1


@needs_exam
def test_q2_signed_text_is_shown_as_reviewed_without_touching_global_entry_status(make_page):
    """第 2 題已有教師文字簽核:詳解顯示已審核、amateur 單字卡與延伸練習標示「本題教師已確認」;全域詞條狀態不變。"""
    page = make_page('desktop')
    review_q(page, 2)
    box = page.locator('.explain.v2')
    assert box.get_attribute('data-explain') == 'reviewed' and box.locator('.tag').first.inner_text() == '已審核'
    txt = box.inner_text()
    assert '待審核草稿' not in txt and '草稿・待人工審核' not in txt and '四個選項都以母音音素開頭' in txt
    assert box.locator('.wcard[data-entry=amateur-adj] [data-role=signed]').inner_text() == '本題教師已確認'
    assert page.evaluate("window.VOCAB.entries['amateur-adj'].status") == 'draft'


@needs_exam
def test_q3_signed_text_is_shown_as_reviewed_without_touching_global_entry_status(make_page):
    """第 3 題已有教師文字簽核:詳解顯示已審核、vacancy 單字卡標示「本題教師已確認」;全域詞條狀態不變。"""
    page = make_page('desktop')
    review_q(page, 3)
    box = page.locator('.explain.v2')
    assert box.get_attribute('data-explain') == 'reviewed' and box.locator('.tag').first.inner_text() == '已審核'
    txt = box.inner_text()
    assert '待審核草稿' not in txt and '草稿・待人工審核' not in txt and '超過十二位' in txt
    assert box.locator('.wcard[data-entry=vacancy-n] [data-role=signed]').inner_text() == '本題教師已確認'
    assert page.evaluate("window.VOCAB.entries['vacancy-n'].status") == 'draft'


@needs_exam
def test_unsigned_questions_keep_the_draft_presentation(make_page):
    """第 4 題沒有教師簽核:詳解、單字卡、延伸練習、延伸練習頁都維持原本的草稿呈現。"""
    page = make_page('desktop')
    review_q(page, 4)
    box = page.locator('.explain.v2')
    assert box.get_attribute('data-explain') == 'draft' and box.locator('.tag').first.inner_text() == '草稿・待人工審核'
    assert '待審核草稿' in box.locator('.wcard').first.inner_text() and '待審核草稿' in box.locator('details.lsec[data-sec="7"]').inner_text()
    assert '本題教師已確認' not in box.inner_text()
    page.locator('[data-role=ext-start]').click()
    page.wait_for_selector('[data-role=ext-q]')
    assert '待審核草稿' in page.inner_text('#app') and '尚未經老師審核' in page.inner_text('#app') and page.locator('[data-role=signed]').count() == 0


@needs_exam
def test_other_questions_and_shared_entries_global_status_are_not_changed_by_the_signoff(make_page):
    page = make_page('desktop')
    page.goto(URL + '#/')
    d = page.evaluate("({q: Object.entries(window.EXPLAIN).map(([k, e]) => [k, e.status]), v: [...new Set(Object.values(window.VOCAB.entries).map(e => e.status))], x: [...new Set(window.EXT_PRACTICE.map(e => e.status))]})")
    assert dict(d['q']) == {**{f'115-{n}': 'draft' for n in range(4, 11)}, '115-1': 'reviewed', '115-2': 'reviewed', '115-3': 'reviewed'} and d['v'] == ['draft'] and d['x'] == ['draft']


# ---------------------------------------------------------------- 版面
@needs_exam
@pytest.mark.parametrize('device', list(DEVICES))
def test_learning_pages_fit_every_screen(make_page, device):
    page = make_page(device)
    review_q1(page, open_all=True)
    assert hscroll_overflow(page) <= 1, f'{device} 詳解頁橫向溢出'
    for r in ['#/words', '#/word/communicate-v', '#/word/tight-adj', '#/word/consumption-n', '#/ext/115-1']:
        page.goto(URL + r)
        page.reload()
        assert hscroll_overflow(page) <= 1, f'{device} {r} 橫向溢出'
    assert page.errors == []


@needs_exam
def test_learning_controls_are_big_enough_for_touch(make_page):
    page = make_page('phone')
    review_q1(page, open_all=True)
    small = []
    for loc in ('.explain.v2 summary', '.explain.v2 a.wlink', '.explain.v2 .spk', '.explain.v2 a.btn', '.explain.v2 button'):
        for el in page.locator(loc).all():
            if el.is_visible():
                b = el.bounding_box()
                if b['height'] < 43.5 or (loc == '.explain.v2 .spk' and b['width'] < 43.5):
                    small.append((loc, el.inner_text()[:10], round(b['height'])))
    page.goto(URL + '#/word/tight-adj')
    for loc in ('[data-view=word] summary', '[data-view=word] a.wlink', '[data-view=word] .spk', '[data-view=word] a.btn', '[data-view=word] a.link'):
        for el in page.locator(loc).all():
            if el.is_visible():
                b = el.bounding_box()
                if b['height'] < 43.5: small.append((loc, el.inner_text()[:10], round(b['height'])))
    assert small == [], small


def test_every_word_page_renders_without_errors_and_with_audio_buttons(make_page):
    """每個詞條（包含沒有同義字、沒有搭配詞的）的單字頁都要能顯示，不能因為某個欄位是空的就當掉。"""
    page = make_page('desktop')
    ids = page.evaluate('Object.keys(VOCAB.entries)')
    assert len(ids) >= 59
    for eid in ids:
        page.goto(URL + '#/word/' + eid)
        page.wait_for_selector('[data-view=word]', timeout=3000)
        assert page.locator('.wcard .hw').first.inner_text() == page.evaluate(f"VOCAB.entries['{eid}'].hw") and page.locator('.whead .spk').count() == 1, eid
    assert page.errors == []
