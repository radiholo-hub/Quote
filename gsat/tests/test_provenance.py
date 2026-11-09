"""來源分類：原創題與歷屆真題分開、盤點清單與實際檔案一致、官方作文與原創作文不混用。"""
import re
import subprocess
import sys

import pytest

from conftest import ROOT, URL, needs_exam, run_exam

REPO = ROOT.parent


def test_inventory_matches_the_files_on_disk():
    """新增、刪除或改動 gsat/ 底下的檔案卻沒更新盤點清單，或在 exam/ 放了沒分類的檔案，這個測試就會失敗。"""
    r = subprocess.run([sys.executable, '-I', str(REPO / 'tools' / 'gsat_inventory.py'), '--check'], capture_output=True, text=True)
    assert r.returncode == 0, r.stderr + r.stdout


def test_original_code_and_data_never_reference_exam_content():
    for p in list((ROOT / 'data').glob('*.js')) + [ROOT / 'core.js']:
        assert 'exam/' not in p.read_text(encoding='utf8'), f'{p.name} 不可引用 exam/ 的內容'


def words(text):
    return re.findall(r"[a-z0-9']+", text.lower().replace('’', "'"))


def shingles(text, n=8):
    w = words(text)
    return {' '.join(w[i:i + n]) for i in range(len(w) - n + 1)}


@needs_exam
def test_original_content_shares_no_long_word_run_with_exam_text(make_page):
    """原創題與原創寫作練習不得含有和歷屆試題相同的連續 8 個單詞（避免不小心抄到真題）。"""
    page = make_page()
    d = page.evaluate('''()=>{
      const exam=[];for(const e of EXAMS)for(const s of e.sections)for(const g of s.groups){exam.push(...(g.passage||[]),...(g.bank||[]));for(const q of g.questions)exam.push(q.stem||'',...(q.opts||[]))}
      const orig=[];for(const p of GSAT.vocab)orig.push(p.q,...p.o);
      for(const p of GSAT.cloze)orig.push(p.text,...p.qs.flatMap(x=>x.o));for(const p of GSAT.reading)orig.push(p.text,...p.qs.flatMap(x=>[x.q,...x.o]));
      for(const p of GSAT.structure)orig.push(p.text,...p.options);
      for(const t of WRITING.trans)orig.push(...t.ref);for(const e of WRITING.essay)orig.push(e.prompt);
      return {exam:exam.join(' \\n '),orig:orig.join(' \\n ')}}''')
    shared = shingles(d['exam']) & shingles(d['orig'])
    assert not shared, f'原創內容與真題有相同的連續 8 個單詞：{sorted(shared)[:3]}'


# ---------------------------------------------------------------- 官方作文 vs 原創作文
@needs_exam
def test_official_and_original_essays_are_kept_apart(make_page):
    page = make_page()
    page.goto(URL + '#/ns/orig/E1')
    assert page.locator('[data-source=original]').count() == 1 and page.locator('[data-source=exam]').count() == 0
    assert '原創練習題' in page.inner_text('.src') and page.locator('img.nsimg').count() == 0
    page.get_by_label('你的作文').fill('ORIGINALTEXT my school library')
    page.wait_for_timeout(600)
    page.goto(URL + '#/ns/115')
    assert page.locator('[data-source=exam]').count() == 1 and '歷屆正式試題' in page.inner_text('.src')
    assert page.get_by_label('你的作文').input_value() == ''                      # 原創作文的內容不會跑進 115 年
    assert '校園空間' not in page.inner_text('#app')                              # 原創題目不會出現在官方頁
    page.get_by_label('你的作文').fill('OFFICIAL115TEXT my essay')
    page.get_by_label('作文自評分數').fill('13')
    page.wait_for_timeout(600)
    ns = page.evaluate('__gsat.DB().ns')
    assert ns['orig:E1']['essay'] == 'ORIGINALTEXT my school library' and ns['115:essay']['essay'] == 'OFFICIAL115TEXT my essay'
    assert 'self' not in ns['orig:E1'] or ns['orig:E1']['self'] != 13              # 自評分數也沒有混用
    assert set(ns) == {'orig:E1', '115:essay', '115:mixed', '115:trans'} | (set(ns) & {'115:trans'})
    page.goto(URL + '#/ns/orig/E1')
    assert page.get_by_label('你的作文').input_value() == 'ORIGINALTEXT my school library'
    assert page.locator('[data-role=summary]').count() == 0                        # 原創練習不產生歷屆全卷成績單


@needs_exam
def test_original_practice_never_feeds_a_paper_summary(make_page):
    page = make_page()
    run_exam(page, '115', mode='formal')
    page.goto(URL + '#/ns/orig/E2')
    page.get_by_label('作文自評分數').fill('20')
    page.wait_for_timeout(500)
    page.goto(page.url.split('#')[0] + '#/ns/115')
    assert page.locator('[data-role=summary] tr[data-item=essay]').get_attribute('data-state') == 'pending'


@needs_exam
def test_landing_page_separates_the_two_sources(make_page):
    page = make_page()
    page.goto(URL + '#/ns/')
    t = page.inner_text('#app')
    assert '原創寫作練習(自行撰寫,不是大考試題)' in t and '歷屆正式試題(大考中心)' in t
    assert t.index('原創寫作練習') < t.index('歷屆正式試題')
