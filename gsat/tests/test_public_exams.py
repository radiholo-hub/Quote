"""歷屆試題公開版（allowlist）：負責人已回報授權，網站公開選擇題文字、答案、原創詳解與出現索引；
大考中心的圖片、PDF、評分原則頁面、人工審核原始資料本版不公開。需要附圖才能作答的題目只使用「原創替代圖」（圖片 allowlist）；
沒有替代圖的題目不允許上線（stage_site.sh 預設整理失敗）。"""
import importlib.util
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET

import pytest

from conftest import DEVICES, ROOT
from test_deploy import open_site, public_site, stage  # noqa: F401  (public_site 是 fixture)

REPO = ROOT.parent
spec = importlib.util.spec_from_file_location('gsat_public_exams', REPO / 'tools' / 'gsat_public_exams.py')
pub = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pub)
FIG = [('109', 41), ('110', 49), ('111', 35), ('112', 44), ('113', 35), ('114', 36), ('115', 38)]
REPLACED = list(FIG)
UNRESOLVED = []
ALLOW = ['109-41.svg', '110-49.svg', '111-35.svg', '112-44.svg', '113-35.svg', '114-36.svg', '115-38.svg']


def exams_of(site):
    s = (site / 'exam' / 'exams.js').read_text(encoding='utf8')
    return json.loads(s[s.index('window.EXAMS = ') + 15:].strip().rstrip(';'))


def questions(exams):
    return [(e['year'], q) for e in exams for s in e['sections'] for g in s['groups'] for q in g['questions']]


# ---------------------------------------------------------------- 公開檔案本身（不需要瀏覽器）
def test_public_exams_keep_every_question_and_only_allowlisted_replacement_images(public_site):
    src = pub.load_exams(ROOT / 'exam' / 'exams.js')
    out = exams_of(public_site)
    assert [e['year'] for e in out] == [e['year'] for e in src] == [str(y) for y in range(106, 116)]
    a, b = questions(src), questions(out)
    assert len(a) == len(b) == 510
    for (y, q0), (_, q1) in zip(a, b):
        keep = {k: v for k, v in q1.items() if k not in ('img', 'imgSource', 'figureWithheld')}
        assert {k: v for k, v in q0.items() if k not in ('img', 'optImgs')} == keep                    # 題幹、選項文字一字不動
    assert [(y, q['n']) for y, q in a if 'img' in q or 'optImgs' in q] == FIG                         # 原本需要附圖的就是這 7 題
    got = {(y, q['n']): q for y, q in b if 'img' in q}
    assert sorted(got) == REPLACED
    for k, q in got.items():
        assert q['img'] == pub.REPLACEMENTS[k] and q['imgSource'] == 'original replacement illustration' and 'optImgs' not in q
    assert [(y, q['n']) for y, q in b if q.get('figureWithheld')] == UNRESOLVED
    assert not re.search(r'\.(jpe?g|png|gif|webp|pdf)|exam/img', json.dumps(out), re.I)               # 沒有任何大考中心圖片或 PDF 的路徑


def test_replacement_images_exist_are_valid_svg_and_are_exactly_the_allowlist(public_site):
    assert pub.FIGURE_FILES == ALLOW
    assert sorted(p.name for p in (public_site / 'data' / 'figures').iterdir()) == ALLOW               # 公開輸出裡只有這七張
    assert sorted(p.name for p in (ROOT / 'data' / 'figures').iterdir()) == ALLOW
    for q in [q for _, q in questions(exams_of(public_site)) if 'img' in q]:
        f = public_site / q['img']
        assert f.is_file() and f.stat().st_size > 500                                                  # 圖片路徑實際存在
        text = f.read_text(encoding='utf8')
        root = ET.parse(f).getroot()                                                                   # 是合法的 SVG
        assert root.tag.endswith('svg') and root.get('viewBox')
        assert 'xlink:href' not in text and '<image' not in text and 'data:image' not in text         # 沒有內嵌點陣圖（不可能夾帶原圖）
        assert '原創替代圖' in text                                                                     # 每張圖自己標示來源
    pics = [p for p in public_site.rglob('*') if p.is_file() and p.suffix.lower() in ('.svg', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf')]
    assert sorted(p.name for p in pics) == ALLOW and not [p for p in pics if p.suffix.lower() != '.svg']
    assert pub.check_site(public_site) == []


def test_official_answers_are_unchanged_by_the_figure_replacement(public_site):
    src = (ROOT / 'exam' / 'answers.js').read_text(encoding='utf8').splitlines(keepends=True)
    i = next(n for n, ln in enumerate(src) if ln.startswith('window.'))
    assert (public_site / 'exam' / 'answers.js').read_text(encoding='utf8').splitlines(keepends=True)[1:] == src[i:]        # 官方答案逐字相同
    ans = json.loads(subprocess.run(['node', '-e', "global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(window.ANSWERS))", str(public_site / 'exam' / 'answers.js')], capture_output=True, text=True, check=True).stdout)
    want = {('109', 41): 'D', ('110', 49): 'D', ('112', 44): 'B', ('113', 35): 'B', ('114', 36): 'C', ('115', 38): 'C', ('111', 35): 'B'}      # 官方答案表
    for (y, n), letter in want.items():
        assert ans[y][n - 1] == letter, (y, n)
    for (y, q) in questions(exams_of(public_site)):
        if (y, q['n']) in want:
            assert len(q['opts']) == 4                                                                 # 選項仍是四個，代號 A–D 不變


def test_public_explanations_are_only_the_138_teacher_signed_ones(public_site):
    s = (public_site / 'exam' / 'explain.js').read_text(encoding='utf8')
    ex = json.loads(subprocess.run(['node', '-e', "global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(window.EXPLAIN))", str(public_site / 'exam' / 'explain.js')], capture_output=True, text=True, check=True).stdout)
    assert sorted(ex) == sorted(f'{y}-{n}' for y in (113, 114, 115) for n in range(1, 47)) and {e['status'] for e in ex.values()} == {'reviewed'}      # 114、115 年 Q1–Q46 全部教師簽核；沒有任何草稿詳解冒充已審核
    assert not any(f in e for e in ex.values() for f in pub.INTERNAL_EXPLAIN_FIELDS)                  # 教師內部欄位（審核者、日期、備註、AI 提示）只存在於來源，不公開；簽核狀態以 docs/gsat/signoffs/ 為準
    assert s.startswith('// 公開版資料') and '審核方式' not in s and 'gsat_review_sheet' not in s                  # 維護者的內部審核流程註解不外流


def test_public_copies_are_the_source_data_without_the_maintainer_comments(public_site):
    for f in ('answers.js', 'vocab_index.js'):
        src = (ROOT / 'exam' / f).read_text(encoding='utf8').splitlines(keepends=True)
        i = next(n for n, ln in enumerate(src) if ln.startswith('window.'))
        assert (public_site / 'exam' / f).read_text(encoding='utf8').splitlines(keepends=True)[1:] == src[i:], f


def test_builder_refuses_unexpected_output_or_existing_directory(tmp_path):
    (tmp_path / 'o').mkdir()
    with pytest.raises(SystemExit):
        pub.build(ROOT / 'exam', tmp_path / 'o', allow_withheld=True)                  # 輸出資料夾已存在
    (tmp_path / 'x').mkdir()
    (tmp_path / 'x' / 'a.jpg').write_text('x')
    assert pub.check(tmp_path / 'x')                                                   # 多出來的檔案會被檢查擋下
    (tmp_path / 'y').mkdir()
    for f in ('exams.js', 'answers.js', 'explain.js', 'vocab_index.js', 'nonmc.js', 'mixed.js'):
        (tmp_path / 'y' / f).write_text('window.A="exam/img/x.jpg";')
    assert any('圖片' in b for b in pub.check(tmp_path / 'y'))
    (tmp_path / 'z').mkdir()
    for f in ('answers.js', 'explain.js', 'vocab_index.js', 'nonmc.js', 'mixed.js'):
        (tmp_path / 'z' / f).write_text('window.A=1;')
    (tmp_path / 'z' / 'exams.js').write_text('window.EXAMS = [{"img":"data/figures/999-1.svg"}];')
    assert any('不在 allowlist' in b for b in pub.check(tmp_path / 'z'))               # 引用了沒有登記的圖片


def test_builder_never_writes_into_the_source_exam_directory(tmp_path):
    before = {p.name: p.read_bytes() for p in ROOT.joinpath('exam').iterdir() if p.is_file()}
    with pytest.raises(SystemExit):
        pub.build(ROOT / 'exam', ROOT / 'exam' / 'public_out', allow_withheld=True)
    with pytest.raises(SystemExit):
        pub.build(ROOT / 'exam', ROOT / 'exam', allow_withheld=True)
    assert not (ROOT / 'exam' / 'public_out').exists()
    assert before == {p.name: p.read_bytes() for p in ROOT.joinpath('exam').iterdir() if p.is_file()}        # 簽核過的 explain.js 與試題資料原封不動


def _mini_source(tmp_path, img='exam/img/zzz.jpg'):
    src = tmp_path / 'exam'
    src.mkdir()
    (src / 'exams.js').write_text('window.EXAMS = [{"year":"1","sections":[{"type":"reading","name":"x","groups":[{"questions":[{"n":1,"stem":"s","opts":["a","b"],"img":"%s"}]}]}]}];' % img)
    for f, v in (('answers.js', 'window.ANSWERS={};'), ('explain.js', 'window.EXPLAIN={};'), ('vocab_index.js', 'window.VOCAB_INDEX=null;')):
        (src / f).write_text('// c\n' + v)
    return src


def test_a_question_that_needs_a_figure_without_a_replacement_stops_the_build(tmp_path):
    """不允許上線「正常計分但看不到附圖」的題目：沒有登記替代圖、又需要附圖，整理預設直接失敗。"""
    src = _mini_source(tmp_path)
    with pytest.raises(SystemExit) as e:
        pub.build(src, tmp_path / 'out')
    assert '1-1' in str(e.value) and not (tmp_path / 'out').exists()
    hit, replaced = pub.build(src, tmp_path / 'out2', allow_withheld=True)                  # 只有明確要求（測試用途）才會標記後繼續
    assert hit == [('1', 1, 'img')] and replaced == []


def test_real_source_builds_with_every_figure_question_replaced():
    """真實資料：七題附圖題都有登記的替代圖，所以不需要任何例外就能整理（不再有 xfail／阻擋）。"""
    import tempfile
    with tempfile.TemporaryDirectory() as d:
        hit, replaced = pub.build(ROOT / 'exam', pathlib.Path(d) / 'out')
    assert hit == [] and sorted(tuple(r[:2]) for r in replaced) == sorted(FIG)


def test_final_public_build_has_no_withheld_figure(public_site):
    assert [(y, q['n']) for y, q in questions(exams_of(public_site)) if q.get('figureWithheld')] == []


def test_site_check_rejects_any_stray_image_pdf_or_review_artifact(public_site, tmp_path):
    site = tmp_path / 'site'
    shutil.copytree(public_site, site)
    assert pub.check_site(site) == []
    for name, expect in (('data/figures/extra.svg', 'allowlist'), ('data/figures/109-41.png', 'allowlist'), ('exam/img/a.jpg', 'allowlist'), ('notes/scan.pdf', 'allowlist'),
                         ('exam/review-115-5.html', '審核'), ('exam/vocab_reviews.js', '審核'), ('exam/Q5-round2.zip', '審核'), ('data/x.zip', '審核')):
        f = site / name
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text('x')
        assert any(expect in b for b in pub.check_site(site)), name                                    # 多出任何一個都必須被擋下
        f.unlink()
    (site / 'data' / 'figures' / '112-44.svg').unlink()
    assert any('不存在' in b for b in pub.check_site(site))                                            # exams.js 引用的圖片檔必須實際存在
    p = subprocess.run([sys.executable, str(REPO / 'tools' / 'gsat_public_exams.py'), '--check-site', str(site)], capture_output=True, text=True)
    assert p.returncode == 1


def test_stage_script_fails_when_an_extra_image_is_in_the_source_tree(tmp_path):
    """整個 stage_site.sh：gsat/data/figures 多放一張沒登記的圖，整理必須失敗。"""
    r = tmp_path / 'repo'
    shutil.copytree(ROOT, r / 'gsat', ignore=shutil.ignore_patterns('__pycache__', '.pytest_cache', 'tests'))
    (r / 'tools').mkdir()
    (r / 'docs' / 'gsat').mkdir(parents=True)
    for t in ('stage_site.sh', 'gsat_audio_provenance.py', 'gsat_public_exams.py'):
        shutil.copy(REPO / 'tools' / t, r / 'tools')
    shutil.copy(REPO / 'docs' / 'gsat' / 'audio-provenance.json', r / 'docs' / 'gsat')
    for f in ['index.html', 'style.css', 'app.js', 'quotes.js', 'audio/1.mp3', 'score-rescue/index.html']:
        (r / f).parent.mkdir(parents=True, exist_ok=True)
        (r / f).write_text('x')
    (r / 'gsat' / 'data' / 'figures' / 'surprise.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg"/>')
    env = {k: v for k, v in os.environ.items() if not k.startswith(('CF_PAGES', 'GSAT_'))}
    p = subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=r, env=env, capture_output=True, text=True)
    assert p.returncode != 0 and 'surprise.svg' in p.stdout + p.stderr


def test_command_line_prints_replaced_questions(tmp_path):
    p = subprocess.run([sys.executable, str(REPO / 'tools' / 'gsat_public_exams.py'), str(ROOT / 'exam'), str(tmp_path / 'o')], capture_output=True, text=True)
    assert p.returncode == 0 and '7 題換成原創替代圖' in p.stdout


# ---------------------------------------------------------------- 公開網站的行為
@pytest.mark.parametrize('device', ['phone', 'desktop'])
def test_every_replaced_figure_question_shows_its_image_on_the_site(browser, public_site, device):
    ctx = browser.new_context(**DEVICES[device])
    page = ctx.new_page()
    page.errors, page.bad = [], []
    page.on('pageerror', lambda e: page.errors.append(str(e)))
    page.on('console', lambda m: page.errors.append(m.text) if m.type == 'error' else None)
    page.on('requestfailed', lambda r: page.bad.append(r.url))
    page.on('response', lambda r: page.bad.append(r.url) if r.status >= 400 else None)
    page.on('dialog', lambda d: d.accept())
    page.goto((public_site / 'index.html').as_uri() + '#/')
    page.wait_for_selector('.entry')
    for y, n in REPLACED:
        page.goto((public_site / 'index.html').as_uri() + f'#/exam/{y}')
        page.locator('[data-mode=free]').get_by_role('button', name='不限時').click()
        page.get_by_role('button', name='開始自由練習').click()
        page.wait_for_selector('.opt')
        page.evaluate("""(n)=>{const S=__gsat.loadSession();S.idx=S.ids.findIndex(i=>__gsat.QB[i].n==n);localStorage.setItem('gsat-session-v2',JSON.stringify(S))}""", n)
        page.reload()
        page.wait_for_selector('img.qimg')
        page.wait_for_function('[...document.images].every(i=>i.complete)')
        info = page.evaluate("""()=>{const i=document.querySelector('img.qimg');return {w:i.naturalWidth,h:i.naturalHeight,src:i.getAttribute('src'),vis:i.getBoundingClientRect().width}}""")
        assert info['w'] > 300 and info['h'] > 200 and info['vis'] > 150 and info['src'] == pub.REPLACEMENTS[(y, n)], (y, n, info)       # 圖片真的載入、看得到
        assert page.locator('[data-role=fig-replacement]').count() == 1 and '原創替代圖' in page.locator('[data-role=fig-replacement]').inner_text()
        assert page.locator('[data-role=fig-withheld]').count() == 0 and page.locator('.opt').count() == 4
        assert page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth") <= 1          # 沒有橫向捲動
    assert page.bad == [] and page.errors == []                                                                        # 沒有 404
    ctx.close()


def test_exam_list_and_free_practice_work_without_any_withheld_figure_notice(browser, public_site):
    ctx, page = open_site(browser, public_site)
    assert page.evaluate('[EXAMS.length, Object.keys(ANSWERS).length, Object.keys(EXPLAIN).length]') == [10, 10, 138]
    assert '10 個學年度' in page.locator('a.entry').first.inner_text()
    page.goto((public_site / 'index.html').as_uri() + '#/exam')
    page.wait_for_selector('h1:has-text("歷屆試題")')
    assert page.get_by_role('link', name='開始作答').count() == 10 and page.get_by_role('link', name='非選擇題', exact=True).count() == 0     # 非選擇題頁面需要圖片，本版不提供入口
    page.goto((public_site / 'index.html').as_uri() + '#/exam/111')
    assert page.locator('[data-role=fig-withheld-list]').count() == 0 and page.locator('[data-role=ns-unavailable]').count() == 1           # 111 的附圖題也已有替代圖
    page.goto((public_site / 'index.html').as_uri() + '#/exam/115')
    assert page.locator('[data-role=fig-withheld-list]').count() == 0 and page.locator('[data-role=ns-unavailable]').count() == 1           # 115 的附圖題已有替代圖
    assert page.locator('[data-mode=formal]').count() == 1 and page.locator('[data-mode=free]').count() == 1                          # 正式模擬考與自由練習都保留
    assert '100 分鐘' in page.locator('[data-mode=formal]').inner_text()
    assert [u for u in page.requests if u.lower().endswith(('.jpg', '.png', '.pdf')) or 'exam/img' in u] == []
    assert page.errors == []
    ctx.close()


def test_replaced_questions_join_practice_and_review(browser, public_site):
    ctx, page = open_site(browser, public_site)
    d = page.evaluate("""()=>{const q=Object.values(__gsat.QB).filter(q=>q.src==='exam');return {n:q.length,withheld:q.filter(x=>x.figureWithheld).map(x=>x.year+'-'+x.n),
      okImg:q.filter(x=>x.img&&x.ok).map(x=>x.year+'-'+x.n),notOkImg:q.filter(x=>(x.img||x.figureWithheld)&&!x.ok).map(x=>x.year+'-'+x.n),
      per:Object.fromEntries(Object.entries(__gsat.yearInfo).map(([y,i])=>[y,[i.ready,i.n]]))}}""")
    assert d['n'] == 510 and d['withheld'] == []
    assert d['okImg'] == [f'{y}-{n}' for y, n in REPLACED] and d['notOkImg'] == []          # 7 題都可進分類練習與錯題補強
    assert all(v[0] for v in d['per'].values()) and [v[1] for v in d['per'].values()] == [56] * 5 + [46] * 5
    ctx.close()


def test_wrong_answer_on_a_replaced_figure_question_enters_review(browser, public_site):
    ctx, page = open_site(browser, public_site)
    page.goto((public_site / 'index.html').as_uri() + '#/exam/114')
    page.locator('[data-mode=free]').get_by_role('button', name='不限時').click()
    page.get_by_role('button', name='開始自由練習').click()
    page.wait_for_selector('.opt')
    page.evaluate("""()=>{const S=__gsat.loadSession();for(const i of S.ids){const q=__gsat.QB[i];S.answers[i]=(q.n===36)?(q.a+1)%q.o.length:q.a}S.idx=S.ids.length-1;localStorage.setItem('gsat-session-v2',JSON.stringify(S))}""")
    page.reload()
    page.wait_for_selector('.opt')
    page.get_by_role('button', name='交卷').click()
    page.locator('.modal .btn').first.click()
    page.wait_for_selector('h1:has-text("成績")')
    page.goto((public_site / 'index.html').as_uri() + '#/review')
    page.wait_for_selector('h1:has-text("錯題補強")')
    assert page.evaluate("Object.keys(__gsat.DB().q).filter(id=>__gsat.QB[id].ok&&__gsat.DB().q[id].a>0&&__gsat.DB().q[id].c<__gsat.DB().q[id].a)") == ['e114_36']
    assert '1' in page.locator('.stat b').first.inner_text()                                           # 待補強 1 題
    ctx.close()


def test_practice_source_filter_has_all_exam_and_original(browser, public_site):
    ctx, page = open_site(browser, public_site)
    page.goto((public_site / 'index.html').as_uri() + '#/practice')
    page.wait_for_selector('h1:has-text("分類練習")')
    assert '題目來源' in page.inner_text('#app') and '歷屆年度範圍' in page.inner_text('#app')
    for name in ('全部', '歷屆真題', '原創練習題'):
        assert page.get_by_role('button', name=name, exact=True).count() >= 1
    def start(src):
        page.goto((public_site / 'index.html').as_uri() + '#/practice')
        page.locator('.row').filter(has=page.get_by_role('button', name='歷屆真題', exact=True)).get_by_role('button', name=src, exact=True).click()
        page.get_by_role('button', name='開始練習').click()
        page.wait_for_selector('.opt')
        return page.evaluate("""()=>{const S=__gsat.loadSession();return [...new Set(S.ids.map(i=>__gsat.QB[i].src))]}""")
    assert start('歷屆真題') == ['exam']
    page.evaluate("localStorage.removeItem('gsat-session-v2')")
    assert start('原創練習題') == ['mock']
    page.evaluate("localStorage.removeItem('gsat-session-v2')")
    got = start('全部')
    assert set(got) <= {'exam', 'mock'}
    ctx.close()


def test_q1_to_q46_show_as_reviewed_and_other_years_do_not_pretend(browser, public_site):
    ctx, page = open_site(browser, public_site)
    for y in (113, 114, 115):
        for n in range(1, 47):
            page.goto((public_site / 'index.html').as_uri() + f'#/q/e{y}_{n}')
            page.wait_for_selector('[data-view=q]')
            assert page.evaluate(f"__gsat.EXPL()['{y}-{n}'].status") == 'reviewed'
    assert page.evaluate("Object.keys(__gsat.EXPL()).length") == 138                                              # 其他年度沒有詳解、也不會被標已審核
    page.goto((public_site / 'index.html').as_uri() + '#/q/e112_1')
    page.wait_for_selector('[data-view=q]')
    assert page.locator('.explain.v2').count() == 0
    # 真的作答：答錯第 5 題，交卷後在詳解看到「已審核」
    page.goto((public_site / 'index.html').as_uri() + '#/exam/115')
    page.locator('[data-mode=free]').get_by_role('button', name='不限時').click()
    page.get_by_role('button', name='開始自由練習').click()
    page.wait_for_selector('.opt')
    page.evaluate("""()=>{const S=__gsat.loadSession();for(const i of S.ids){const q=__gsat.QB[i];S.answers[i]=(q.n===5)?(q.a+1)%q.o.length:q.a}S.idx=S.ids.length-1;localStorage.setItem('gsat-session-v2',JSON.stringify(S))}""")
    page.reload()
    page.wait_for_selector('.opt')
    page.get_by_role('button', name='交卷').click()
    page.locator('.modal .btn').first.click()
    page.wait_for_selector('h1:has-text("成績")')
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain.v2')
    box = page.locator('.explain.v2')
    assert box.get_attribute('data-explain') == 'reviewed' and box.locator('.tag').first.inner_text() == '已審核' and 'consumption' in box.inner_text()
    assert '草稿' not in box.locator('.tag').first.inner_text() and page.locator('[data-role=signed]').count() >= 1
    ctx.close()


def test_scoring_and_timer_logic_still_work_on_the_public_build(browser, public_site):
    ctx, page = open_site(browser, public_site)
    page.goto((public_site / 'index.html').as_uri() + '#/exam/111')
    page.get_by_role('button', name='開始正式模擬考').click()
    page.wait_for_selector('.opt')
    s = page.evaluate("__gsat.loadSession()")
    assert s['formal'] is True and s['limitMs'] == 100 * 60000 and len(s['ids']) == 46
    page.evaluate("""()=>{const S=__gsat.loadSession();for(const i of S.ids){const q=__gsat.QB[i];S.answers[i]=q.a}S.idx=S.ids.length-1;localStorage.setItem('gsat-session-v2',JSON.stringify(S))}""")
    page.reload()
    page.get_by_role('button', name='交卷').click()
    page.locator('.modal .btn').first.click()
    page.wait_for_selector('h1:has-text("成績")')
    assert page.locator('[data-role=summary]').count() >= 1
    assert '尚無' not in page.locator('[data-role=scored]').inner_text() and '— / 100' in page.locator('[data-role=total]').inner_text()          # 選擇題照官方配分計分；沒做的非選擇題不當成 0 分
    ctx.close()


def test_explain_drafts_in_the_source_never_reach_the_public_output():
    """explain.js 允許放 AI 草稿（status: draft），但公開輸出只能有 reviewed：草稿、沒有 status、狀態寫錯的都被擋下；已審核題目逐字不動。"""
    body = ('window.EXPLAIN = ' + json.dumps({
        '115-1': {'schema': 2, 'answer': 'B', 'status': 'reviewed', 'reviewer': 'x', 'key': ['k']},
        '115-11': {'schema': 2, 'answer': 'B', 'status': 'draft', 'key': ['k']},
        '115-12': {'schema': 2, 'answer': 'C', 'key': ['k']},
        '115-13': {'schema': 2, 'answer': 'D', 'status': 'Reviewed', 'key': ['k']},
    }, ensure_ascii=False, indent=1) + ';\n')
    out = pub.reviewed_only(body)
    keep = json.loads(out[out.index('=') + 1:].strip().rstrip(';'))
    assert list(keep) == ['115-1'] and keep['115-1']['status'] == 'reviewed'
    assert 'reviewer' not in keep['115-1'] and keep['115-1']['key'] == ['k']                            # 審核者欄位不公開，公開欄位逐字保留
    assert pub.reviewed_only(out) == out                                                                 # 再跑一次結果不變
    real = (ROOT / 'exam' / 'explain.js').read_text(encoding='utf8')
    drafts = [k for k, v in json.loads(real[real.index('window.EXPLAIN = ') + 17:].strip().rstrip(';')).items() if v.get('status') != 'reviewed']
    pubtxt = pub.public_copy(ROOT / 'exam' / 'explain.js')
    assert all('"' + k + '"' not in pubtxt for k in drafts)                                              # 真實來源裡的草稿一題都沒有進公開輸出


@pytest.mark.parametrize('status', ['approved', 'REVIEWED', ' reviewed', 'reviewed ', 'review', '', None, True, 1, ['reviewed'], {'status': 'reviewed'}])
def test_unknown_or_malformed_status_is_never_published(status):
    """status 不是剛好等於字串 reviewed（大小寫、空白、型別、缺漏、亂寫）一律不公開，不會默默當成 reviewed。"""
    body = 'window.EXPLAIN = ' + json.dumps({'115-1': {'status': 'reviewed', 'key': ['k']}, '115-11': {'status': status, 'key': ['k']}, '115-12': 'reviewed', '115-13': None, '115-14': ['reviewed']}, ensure_ascii=False, indent=1) + ';\n'
    out = pub.reviewed_only(body)
    assert list(json.loads(out[out.index('=') + 1:].strip().rstrip(';'))) == ['115-1']


def test_public_output_keeps_the_signed_entries_exactly_and_nothing_else(public_site):
    """公開的 explain.js = 來源裡所有 reviewed 題目逐字相同（Q1–Q10）；Q11–Q46 目前全是草稿，一題都不在公開輸出。"""
    def load(path):
        t = pathlib.Path(path).read_text(encoding='utf8')
        return json.loads(t[t.index('window.EXPLAIN = ') + 17:].strip().rstrip(';'))
    src, out = load(ROOT / 'exam' / 'explain.js'), load(public_site / 'exam' / 'explain.js')
    assert sorted(out) == sorted(f'{y}-{n}' for y in (113, 114, 115) for n in range(1, 47))
    assert out == {k: {f: x for f, x in v.items() if f in pub.PUBLIC_EXPLAIN_FIELDS} for k, v in src.items() if v.get('status') == 'reviewed'}      # 公開欄位的內容逐字不動，只少了內部欄位
    assert all(src[f'{y}-{n}']['status'] == 'reviewed' for y in (113, 114, 115) for n in range(1, 47))


# ---------------------------------------------------------------- 公開詳解的欄位安全（教師內部欄位不得公開）
INTERNAL = ('aiFlags', 'reviewer', 'reviewedAt', 'reviewNotes')
GOOD = {'schema': 2, 'answer': 'B', 'status': 'reviewed', 'key': ['k1', 'k2'], 'options': {'A': {'why': 'w'}, 'B': {'why': 'w', 'entry': 'tight-adj'}},
        'notes': [{'type': 'word', 't': 'x', 'pos': 'n.', 'zh': '字', 'note': 'n', 'coll': ['c']}], 'words': [], 'phrases': [], 'patterns': ['p'], 'grammar': 'g', 'zh': '中譯', 'focus': 'tight-adj'}
INTERNAL_VALUES = {'aiFlags': ['需老師注意'], 'reviewer': '教師（負責人）', 'reviewedAt': '2026-01-01', 'reviewNotes': '內部備註'}


def explain_body(entries):
    return 'window.EXPLAIN = ' + json.dumps(entries, ensure_ascii=False, indent=1) + ';\n'


def explain_of(text):
    return json.loads(text[text.index('window.EXPLAIN = ') + 17:].strip().rstrip(';'))


def keys_at_any_depth(x):
    """資料結構中任何層級出現過的所有物件欄位名（結構化檢查，不看字串內容，所以教學文字提到這些字不會誤判）。"""
    if isinstance(x, dict):
        for k, v in x.items():
            yield k
            yield from keys_at_any_depth(v)
    elif isinstance(x, list):
        for v in x:
            yield from keys_at_any_depth(v)


def unknown_fields_of_reviewed(src):
    """只檢查會公開的題目（status 剛好是 reviewed）；草稿不公開，也不受欄位白名單約束（與 reviewed_only() 一致）。"""
    return sorted({f for v in src.values() if isinstance(v, dict) and v.get('status') == 'reviewed' for f in v} - set(pub.PUBLIC_EXPLAIN_FIELDS) - set(INTERNAL))


def test_projection_removes_the_four_internal_fields_and_keeps_the_public_ones_verbatim():
    entry = dict(GOOD, **INTERNAL_VALUES)
    out = explain_of(pub.reviewed_only(explain_body({'900-1': entry})))['900-1']
    assert not any(f in out for f in INTERNAL) and out == GOOD
    assert list(out) == [f for f in GOOD]                                                              # 欄位順序也與來源相同
    assert list(INTERNAL) == list(pub.INTERNAL_EXPLAIN_FIELDS) and set(GOOD) == set(pub.PUBLIC_EXPLAIN_FIELDS)    # 白名單與規格一致（沒有多、沒有少）
    once = pub.reviewed_only(explain_body({'900-1': entry}))
    assert pub.reviewed_only(once) == once                                                             # 再跑一次結果不變


@pytest.mark.parametrize('field', ['internalNote', 'reviewComment', 'ai_flags', 'Reviewer', 'draftOf', 'extra'])
def test_unknown_top_level_field_fails_closed_with_the_question_and_field_name(field):
    with pytest.raises(SystemExit) as e:
        pub.reviewed_only(explain_body({'900-7': dict(GOOD, **{field: 'x'})}))
    assert '900-7' in str(e.value) and field in str(e.value)                                           # 訊息指出題號與欄位名稱，不會靜默忽略


def test_unknown_field_in_a_draft_does_not_block_and_is_never_published():
    out = explain_of(pub.reviewed_only(explain_body({'900-1': GOOD, '900-2': dict(GOOD, status='draft', brandNewField=1)})))
    assert list(out) == ['900-1']                                                                       # 草稿本來就不公開，也不會因它的新欄位讓整理失敗


def test_draft_with_unknown_fields_neither_fails_the_source_check_nor_reaches_the_public_output():
    src = {'900-1': dict(GOOD, **INTERNAL_VALUES), '900-2': dict(GOOD, status='draft', brandNewField=1, aiFlags=['x']), '900-3': dict(GOOD, status='REVIEWED', other=2), '900-4': {'schema': 2, 'zzz': 1}}
    assert unknown_fields_of_reviewed(src) == []                                                        # 來源檢查只看 reviewed：草稿、狀態寫錯、沒有 status 的都不算
    out = explain_of(pub.reviewed_only(explain_body(src)))
    assert list(out) == ['900-1'] and 'brandNewField' not in explain_body(out)                          # 草稿絕對不進公開輸出（含它們的未知欄位）
    assert unknown_fields_of_reviewed({'900-1': dict(GOOD, brandNewField=1)}) == ['brandNewField']      # reviewed 題目有未知欄位仍然會被抓到


@pytest.mark.parametrize('where, entry_patch', [
    ('options.B.aiFlags', lambda e: e['options']['B'].update(aiFlags=['x'])),
    ('options.A.reviewer', lambda e: e['options']['A'].update(reviewer='x')),
    ('notes[0].reviewNotes', lambda e: e['notes'][0].update(reviewNotes='x')),
    ('key[1].reviewedAt', lambda e: e['key'].__setitem__(1, {'reviewedAt': 'x'})),
    ('patterns[0].aiFlags', lambda e: e['patterns'].__setitem__(0, {'aiFlags': []})),
    ('options.A.deep.aiFlags', lambda e: e['options']['A'].update(deep={'x': [{'aiFlags': ['y']}]})),
])
def test_internal_fields_hidden_in_nested_objects_or_arrays_fail_closed(where, entry_patch):
    import copy
    entry = copy.deepcopy(GOOD); entry_patch(entry)
    with pytest.raises(SystemExit) as e:
        pub.reviewed_only(explain_body({'900-3': entry}))
    assert '900-3' in str(e.value) and where.split('.')[-1] in str(e.value)


def test_teaching_text_that_merely_mentions_an_internal_field_name_is_not_rejected():
    entry = dict(GOOD, grammar='例如 reviewer 和 aiFlags 這兩個字只是教學文字', zh='reviewNotes')
    out = explain_of(pub.reviewed_only(explain_body({'900-1': entry})))['900-1']
    assert out['grammar'] == entry['grammar'] and out['zh'] == 'reviewNotes'                         # 只檢查欄位名稱（結構），不檢查字串內容


def test_real_source_public_copy_has_only_reviewed_entries_whitelisted_fields_and_matches_the_source():
    """不寫死年度：來源裡所有 reviewed 題目都要公開、公開欄位與來源完全相同；未來新增年度自動涵蓋。"""
    src = explain_of((ROOT / 'exam' / 'explain.js').read_text(encoding='utf8'))
    out = explain_of(pub.public_copy(ROOT / 'exam' / 'explain.js'))
    reviewed = {k for k, v in src.items() if v.get('status') == 'reviewed'}
    assert reviewed and set(out) == reviewed and all(v['status'] == 'reviewed' for v in out.values())
    for k, v in out.items():
        assert set(v) <= set(pub.PUBLIC_EXPLAIN_FIELDS), k
        assert not any(f in set(keys_at_any_depth(v)) for f in INTERNAL), k                          # 任何層級都沒有內部欄位
        assert v == {f: src[k][f] for f in src[k] if f in pub.PUBLIC_EXPLAIN_FIELDS}, k             # 公開欄位與來源逐字一致
    assert unknown_fields_of_reviewed(src) == []                                                      # reviewed 題目目前沒有任何白名單之外的欄位（草稿不在檢查範圍，與 reviewed_only 的設計一致）


_JS_TOKEN = re.compile(r"(?P<c>//[^\n]*|/\*.*?\*/)|(?P<s>\"(?:\\.|[^\"\\\n])*\"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(?P<i>[A-Za-z_$][\w$]*)", re.S)


def js_internal_hits(src):
    """不執行任何程式：把 JS／資料檔切成「註解、字串、識別字」，只在程式結構裡找內部欄位——
    識別字（物件鍵、.欄位、變數）或「後面接冒號／包在中括號裡的字串鍵」。字串內容本身（教學文字）與註解不算，所以不會誤判。"""
    hits = []
    for m in _JS_TOKEN.finditer(src):
        if m.group('i') in INTERNAL:
            hits.append(m.group('i'))
        elif m.group('s') and m.group('s')[1:-1] in INTERNAL:
            before, after = src[:m.start()].rstrip()[-1:], src[m.end():].lstrip()[:1]
            if after == ':' or (before == '[' and after == ']'):
                hits.append(m.group('s')[1:-1])
    return hits


def strict_json_assignments(src):
    """若整個檔案只是「window.NAME = <JSON>;」（開頭的 // 註解可有），回傳解析後的資料串列；否則回傳 None。純資料解析，不執行。"""
    body = re.sub(r'\A(?:\s*//[^\n]*\n)+', '', src)
    pos, out, dec = 0, [], json.JSONDecoder()
    while body[pos:].strip():
        m = re.compile(r'\s*window\.[A-Za-z_]+\s*=\s*').match(body, pos)
        if not m:
            return None
        try:
            val, pos = dec.raw_decode(body, m.end())
        except ValueError:
            return None
        pos = re.compile(r'\s*;?').match(body, pos).end()
        out.append(val)
    return out


KNOWN_NON_STRUCTURED = {'.css', '.svg', '.mp3', '.gitignore'}      # 沒有 JSON／鍵值結構（樣式、向量圖、音檔、git 設定），不做欄位檢查；svg 另有圖片 allowlist 測試把關


def scan_public_tree(root):
    """掃描公開 gsat/ 的整棵樹（含任意層子資料夾），回傳 [(相對路徑, 內部欄位位置)]，以及沒有分類的檔案。
    .json：解析後逐層檢查欄位名稱；.js：整個檔案用 js_internal_hits（不執行），純 JSON 資料檔另外解析後逐層檢查欄位名稱；
    .html：內嵌 <script> 以同樣方式檢查（application/json 先解析），不看標籤文字與屬性（內容由程式產生）；其餘副檔名需列在 KNOWN_NON_STRUCTURED，否則視為「沒有分類」讓測試失敗，逼人決定。"""
    root, hits, unclassified = pathlib.Path(root), [], []
    for p in sorted(x for x in root.rglob('*') if x.is_file()):
        rel, ext = str(p.relative_to(root)), p.suffix.lower() or p.name
        src = p.read_text(encoding='utf8') if ext in ('.js', '.json', '.html') else ''
        if ext == '.json':
            hits += [(rel, f) for f in INTERNAL if f in set(keys_at_any_depth(json.loads(src)))]
        elif ext == '.js':
            hits += [(rel, f) for f in js_internal_hits(src)]
            data = strict_json_assignments(src)
            hits += [(rel, f) for f in INTERNAL if data and f in set(keys_at_any_depth(data))]
        elif ext == '.html':
            for attrs, body in re.findall(r'<script([^>]*)>(.*?)</script>', src, re.S | re.I):
                if 'json' in attrs.lower() and body.strip():
                    hits += [(rel, f) for f in INTERNAL if f in set(keys_at_any_depth(json.loads(body)))]
                else:
                    hits += [(rel, f) for f in js_internal_hits(body)]
        elif ext not in KNOWN_NON_STRUCTURED:
            unclassified.append(rel)
    return hits, unclassified


def test_whole_public_gsat_tree_has_no_internal_fields_in_any_structured_data(public_site):
    """真實 staging 的整棵 gsat/ 樹（遞迴）：所有 js／json／html 都做結構化檢查，沒有執行任何學生端程式。
    排除與理由：css／svg／mp3／.gitignore 沒有鍵值結構；教學文字與註解不看（只看欄位名稱的位置）。"""
    hits, unclassified = scan_public_tree(public_site)
    assert unclassified == [] and hits == []
    files = {str(p.relative_to(public_site)) for p in public_site.rglob('*') if p.is_file()}
    assert {'exam/explain.js', 'exam/vocab_index.js', 'data/vocab.js', 'data/ext_practice.js', 'app.js', 'learn.js', 'index.html'} <= files     # 掃描範圍確實涵蓋根目錄的應用程式檔與各子目錄的資料檔


def test_tree_scan_detects_internal_fields_in_subdirectories_and_ignores_teaching_text(tmp_path):
    root = tmp_path / 'gsat'
    (root / 'data' / 'sub').mkdir(parents=True); (root / 'lib' / 'deep' / 'er').mkdir(parents=True); (root / 'pages').mkdir()
    (root / 'data' / 'sub' / 'extra.json').write_text(json.dumps({'x': [{'ok': 1, 'aiFlags': []}]}), encoding='utf8')            # 巢狀資料夾裡的 JSON
    (root / 'lib' / 'deep' / 'er' / 'strict.js').write_text('// c\nwindow.A = {"k": [{"reviewer": "x"}]};\n', encoding='utf8')         # 嚴格 JSON 資料檔
    (root / 'lib' / 'deep' / 'loose.js').write_text("window.B = {list: [{reviewNotes: 'x'}]};\n", encoding='utf8')                  # 非嚴格 JSON（無引號鍵）
    (root / 'lib' / 'code.js').write_text("(function(){ const e = EXPL()[k]; return e.reviewedAt || e['aiFlags']; })();\n", encoding='utf8')   # 程式碼讀取內部欄位
    (root / 'pages' / 'p.html').write_text('<html><script>var q = {aiFlags: 1};</script><script type="application/json">{"a": {"reviewer": 1}}</script></html>', encoding='utf8')
    (root / 'odd.txt').write_text('x', encoding='utf8')                                                                                 # 沒有分類的副檔名
    hits, unclassified = scan_public_tree(root)
    assert sorted({h[0] for h in hits}) == ['data/sub/extra.json', 'lib/code.js', 'lib/deep/er/strict.js', 'lib/deep/loose.js', 'pages/p.html']
    assert {f for h in hits if h[0] == 'lib/code.js' for f in [h[1]]} == {'reviewedAt', 'aiFlags'} and sorted(h[1] for h in hits if h[0] == 'pages/p.html') == ['aiFlags', 'reviewer']
    assert unclassified == ['odd.txt']
    clean = tmp_path / 'clean'; (clean / 'data' / 'sub').mkdir(parents=True)
    (clean / 'data' / 'sub' / 'text.json').write_text(json.dumps({'grammar': 'reviewer: aiFlags: reviewNotes 這些字只是教學文字', 'zh': 'reviewedAt'}), encoding='utf8')
    (clean / 'data' / 'sub' / 'text.js').write_text("// reviewer aiFlags 註解\nwindow.C = {grammar: 'reviewer: x', zh: \"aiFlags\", n: `reviewNotes`};\n", encoding='utf8')
    (clean / 'status.js').write_text('window.D = {"status": "draft", "reviewed": "教師（負責人）"};\n', encoding='utf8')             # 合法的 draft 狀態與 vocab_index 的 reviewed 欄位不是內部欄位
    assert scan_public_tree(clean) == ([], [])


def test_legit_vocab_and_extension_status_and_vocab_index_records_are_untouched(public_site):
    """原有合法的單字／延伸練習狀態不被誤刪：vocab.js、ext_practice.js 逐字複製；vocab_index.js 只少開頭的維護者註解。"""
    for f in ('vocab.js', 'ext_practice.js'):
        assert (public_site / 'data' / f).read_bytes() == (ROOT / 'data' / f).read_bytes(), f
    assert (public_site / 'exam' / 'vocab_index.js').read_text(encoding='utf8') == pub.public_copy(ROOT / 'exam' / 'vocab_index.js')
    src_vi = (ROOT / 'exam' / 'vocab_index.js').read_text(encoding='utf8')
    out_vi = (public_site / 'exam' / 'vocab_index.js').read_text(encoding='utf8')
    assert out_vi.count('"reviewed":') == src_vi.count('"reviewed":') and out_vi.count('"reviewed":') > 0       # 單字出現紀錄的 reviewed 欄位保留（不在本次範圍）
    vocab = strict_json_assignments((public_site / 'data' / 'vocab.js').read_text(encoding='utf8'))[0]
    ext = strict_json_assignments((public_site / 'data' / 'ext_practice.js').read_text(encoding='utf8'))[0]
    assert {e['status'] for e in vocab['entries'].values()} == {'draft'} and {e['status'] for e in ext} == {'draft'}      # 單字詞條與延伸練習的 draft 狀態仍在（畫面「待審核草稿」標籤依它）；純資料解析，不執行任何程式

