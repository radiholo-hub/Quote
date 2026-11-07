"""部署閘門（著作權）：預設部署的網站不得含歷屆試題、答案、圖片，頁面要降級成「導向官方連結 + 原創題」。"""
import os
import pathlib
import shutil
import subprocess

import pytest

from conftest import DEVICES, ROOT, needs_exam

REPO = ROOT.parent


def stage(tmp_path, publish):
    r = tmp_path / ('repo_pub' if publish else 'repo')
    shutil.copytree(ROOT, r / 'gsat', ignore=shutil.ignore_patterns('__pycache__', '.pytest_cache', 'tests'))
    (r / 'tools').mkdir()
    shutil.copy(REPO / 'tools' / 'stage_site.sh', r / 'tools')
    for f in ['index.html', 'style.css', 'app.js', 'quotes.js', 'audio/1.mp3', 'score-rescue/index.html']:
        (r / f).parent.mkdir(parents=True, exist_ok=True)
        (r / f).write_text('x')
    env = {k: v for k, v in os.environ.items() if not k.startswith(('CF_PAGES', 'GSAT_'))}
    if publish:
        env['GSAT_PUBLISH_EXAMS'] = '1'
    p = subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=r, env=env, capture_output=True, text=True)
    assert p.returncode == 0, p.stdout + p.stderr
    return r / '_site' / 'gsat'


@pytest.fixture
def public_site(tmp_path):
    return stage(tmp_path, publish=False)


def open_site(browser, site):
    ctx = browser.new_context(**DEVICES['phone'])
    page = ctx.new_page()
    page.errors, page.requests = [], []
    page.on('pageerror', lambda e: page.errors.append(str(e)))
    page.on('console', lambda m: page.errors.append(m.text) if m.type == 'error' else None)
    page.on('request', lambda r: page.requests.append(r.url))
    page.on('requestfailed', lambda r: page.errors.append('failed ' + r.url))
    page.goto((site / 'index.html').as_uri() + '#/')
    return ctx, page


def test_public_build_has_no_exam_files_at_all(public_site):
    exam_dir = sorted(p.name for p in (public_site / 'exam').rglob('*'))
    assert exam_dir == ['answers.js', 'exams.js', 'explain.js', 'mixed.js', 'nonmc.js']
    big = [p for p in public_site.rglob('*') if p.is_file() and p.suffix in ('.jpg', '.png', '.pdf')]
    assert big == []
    assert 'Hay-on-Wye' not in ''.join(p.read_text(encoding='utf8') for p in public_site.rglob('*.js'))   # 試題文字不在


def test_public_build_degrades_to_official_link_and_original_practice(browser, public_site):
    ctx, page = open_site(browser, public_site)
    assert page.evaluate('[EXAMS.length, Object.keys(ANSWERS).length, Object.keys(NONMC).length]') == [0, 0, 0]
    assert '授權確認後開放' in page.locator('a.entry').first.inner_text()
    page.locator('a.entry').first.click()
    page.wait_for_selector('h1:has-text("歷屆試題")')
    link = page.get_by_role('link', name='前往大考中心官網下載')
    assert link.get_attribute('href').startswith('https://www.ceec.edu.tw/')
    assert link.get_attribute('target') == '_blank' and 'noopener' in link.get_attribute('rel')
    assert page.get_by_role('link', name='模擬考').count() == 0
    # 原創題仍可練習
    page.goto((public_site / 'index.html').as_uri() + '#/practice')
    assert '題目來源' not in page.inner_text('#app')      # 沒有歷屆試題，就不顯示來源與年度範圍選項
    page.get_by_role('button', name='每題答完立刻看答案').click()                 # 學習模式
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    assert page.evaluate('__gsat.QB[__gsat.loadSession().ids[0]].src') == 'mock'
    assert page.locator('[data-source=original]').count() == 1 and page.locator('[data-source=exam]').count() == 0
    page.locator('.opt').first.click()
    assert page.locator('.explain').is_visible()
    # 非選擇題頁不放試題圖片
    page.goto((public_site / 'index.html').as_uri() + '#/ns/')
    assert '不隨網站公開' in page.inner_text('#app')
    assert [u for u in page.requests if u.lower().endswith(('.jpg', '.png', '.pdf'))] == []
    assert page.errors == []
    ctx.close()


@needs_exam
def test_explicit_publish_flag_includes_everything(browser, tmp_path):
    site = stage(tmp_path, publish=True)
    ctx, page = open_site(browser, site)
    assert page.evaluate('EXAMS.length') == 10
    assert page.evaluate("document.querySelector('a.entry').innerText").count('授權') == 0
    assert (site / 'exam' / 'img' / 'ns' / '111-q1.jpg').is_file() and not (site / 'tests').exists()
    assert page.errors == []
    ctx.close()


def test_public_build_still_offers_original_writing_practice(browser, public_site):
    ctx, page = open_site(browser, public_site)
    page.goto((public_site / 'index.html').as_uri() + '#/ns/orig/E1')
    page.get_by_label('你的作文').fill('My school library needs help.')
    assert '字數 5 / 至少 120' in page.inner_text('#app')
    page.goto((public_site / 'index.html').as_uri() + '#/ns/')
    assert '不隨網站公開' in page.inner_text('#app') and page.get_by_role('link', name='前往大考中心官網').count() == 1
    page.goto((public_site / 'index.html').as_uri() + '#/ns/111')
    assert '找不到這個年度' in page.inner_text('#app')              # 不會洩漏任何試題頁面
    assert [u for u in page.requests if u.lower().endswith(('.jpg', '.png', '.pdf'))] == []
    assert page.errors == []
    ctx.close()
