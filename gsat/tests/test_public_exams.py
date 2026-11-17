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


def test_public_explanations_are_only_the_ten_teacher_signed_ones(public_site):
    s = (public_site / 'exam' / 'explain.js').read_text(encoding='utf8')
    ex = json.loads(subprocess.run(['node', '-e', "global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(window.EXPLAIN))", str(public_site / 'exam' / 'explain.js')], capture_output=True, text=True, check=True).stdout)
    assert sorted(ex) == sorted(f'115-{n}' for n in range(1, 11)) and {e['status'] for e in ex.values()} == {'reviewed'}      # 沒有任何草稿詳解冒充已審核
    assert all(e['reviewer'] == '教師（負責人）' and e['reviewedAt'] for e in ex.values())
    assert s.startswith('// 公開版資料') and '審核方式' not in s and 'gsat_review_sheet' not in s                  # 維護者的內部審核流程註解不外流


def test_public_copies_are_the_source_data_without_the_maintainer_comments(public_site):
    for f in ('answers.js', 'explain.js', 'vocab_index.js'):
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
    assert page.evaluate('[EXAMS.length, Object.keys(ANSWERS).length, Object.keys(EXPLAIN).length]') == [10, 10, 10]
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


def test_q1_to_q10_show_as_reviewed_and_other_questions_do_not_pretend(browser, public_site):
    ctx, page = open_site(browser, public_site)
    for n in range(1, 11):
        page.goto((public_site / 'index.html').as_uri() + f'#/q/e115_{n}')
        page.wait_for_selector('[data-view=q]')
        assert page.evaluate(f"__gsat.EXPL()['115-{n}'].status") == 'reviewed'
    page.goto((public_site / 'index.html').as_uri() + '#/q/e115_11')
    page.wait_for_selector('[data-view=q]')
    assert page.locator('.explain.v2').count() == 0 and page.evaluate("__gsat.EXPL()['115-11']") is None          # 沒有教師簽核的題目沒有詳解、更不會標已審核
    page.goto((public_site / 'index.html').as_uri() + '#/q/e114_1')
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
