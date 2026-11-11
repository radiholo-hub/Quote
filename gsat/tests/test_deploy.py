"""部署閘門（著作權）：預設部署的網站不得含歷屆試題、答案、圖片，頁面要降級成「導向官方連結 + 原創題」。"""
import json
import os
import pathlib
import shutil
import subprocess

import pytest

from conftest import DEVICES, ROOT

REPO = ROOT.parent


def stage(tmp_path, official_audio=False, extra_env=None, name='repo'):
    """在縮小版 repo 裡執行真正的 tools/stage_site.sh。official_audio=True 時，把現有 mp3 在「暫存副本」的來源紀錄中標成正式 TTS，
    用來驗證「只有正式來源的音檔才會部署」；真正的 docs/gsat/audio-provenance.json 不會被改動。"""
    r = tmp_path / name
    shutil.copytree(ROOT, r / 'gsat', ignore=shutil.ignore_patterns('__pycache__', '.pytest_cache', 'tests'))
    (r / 'tools').mkdir()
    (r / 'docs' / 'gsat').mkdir(parents=True)
    for t in ('stage_site.sh', 'gsat_audio_provenance.py'):
        shutil.copy(REPO / 'tools' / t, r / 'tools')
    shutil.copy(REPO / 'docs' / 'gsat' / 'audio-provenance.json', r / 'docs' / 'gsat')
    if official_audio:
        prov = json.loads((r / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))
        for f, e in prov['files'].items():
            e.update(engine='azure-paid', tier='S0', usage='production', productionApproved=True)
        (r / 'docs' / 'gsat' / 'audio-provenance.json').write_text(json.dumps(prov), encoding='utf8')
    for f in ['index.html', 'style.css', 'app.js', 'quotes.js', 'audio/1.mp3', 'score-rescue/index.html']:
        (r / f).parent.mkdir(parents=True, exist_ok=True)
        (r / f).write_text('x')
    env = {k: v for k, v in os.environ.items() if not k.startswith(('CF_PAGES', 'GSAT_'))}
    env.update(extra_env or {})
    p = subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=r, env=env, capture_output=True, text=True)
    if extra_env is not None:
        return p
    assert p.returncode == 0, p.stdout + p.stderr
    return r / '_site' / 'gsat'


@pytest.fixture
def public_site(tmp_path):
    return stage(tmp_path)


@pytest.fixture
def public_site_official_audio(tmp_path):
    return stage(tmp_path, official_audio=True)


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
    assert exam_dir == ['answers.js', 'exams.js', 'explain.js', 'mixed.js', 'nonmc.js', 'vocab_index.js']        # 只有空殼；出現索引也不外流
    assert (public_site / 'exam' / 'vocab_index.js').read_text() == 'window.VOCAB_INDEX=null;\n'
    assert (public_site / 'exam' / 'explain.js').read_text() == 'window.EXPLAIN={};\n'
    big = [p for p in public_site.rglob('*') if p.is_file() and p.suffix in ('.jpg', '.png', '.pdf')]
    assert big == []
    # 原創內容（單字庫、延伸練習、語音）照常部署
    assert (public_site / 'data' / 'vocab.js').is_file() and (public_site / 'data' / 'audio_manifest.js').is_file() and (public_site / 'learn.js').is_file()
    assert list((public_site / 'audio').glob('*.mp3')) == []      # 目前 187 個 mp3 都是 edge-tts（非官方）產生的，來源不明的音檔不隨網站部署
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


@pytest.mark.parametrize('value', ['1', 'true', 'yes', '2'])
def test_publish_exams_flag_is_refused_not_honoured(tmp_path, value):
    """權利不明素材不公開：GSAT_PUBLISH_EXAMS 設成任何非空、非 0 的值，整理都直接失敗，不產生任何輸出。"""
    p = stage(tmp_path, extra_env={'GSAT_PUBLISH_EXAMS': value})
    assert p.returncode != 0 and 'GSAT_PUBLISH_EXAMS' in p.stdout + p.stderr
    assert not (tmp_path / 'repo' / '_site').exists()


def test_publish_exams_flag_zero_or_empty_is_harmless(tmp_path):
    for i, v in enumerate(['', '0']):
        p = stage(tmp_path, extra_env={'GSAT_PUBLISH_EXAMS': v}, name=f'r{i}')
        assert p.returncode == 0, p.stdout + p.stderr
        assert not (tmp_path / f'r{i}' / '_site' / 'gsat' / 'exam' / 'img').exists()


@pytest.mark.skipif(not (ROOT / 'exam' / 'img' / 'ns').is_dir(), reason='沒有 gsat/exam/img/ns')
def test_no_scoring_guide_pages_or_exam_figures_in_public_output(tmp_path):
    """24 頁評分文件（img/ns/）與 10 張試題圖片（img/）、所有 jpg/png/pdf 都不在公開輸出裡，且輸出任何位置都找不到這些檔名。"""
    site = stage(tmp_path)
    names = {p.name for p in (ROOT / 'exam' / 'img').rglob('*') if p.is_file()}
    assert len(names) >= 30
    out = {p.name for p in site.rglob('*') if p.is_file()}
    assert not (names & out)
    assert not [p for p in site.rglob('*') if p.suffix.lower() in ('.jpg', '.jpeg', '.png', '.pdf')]


def test_only_audio_with_official_provenance_is_deployed(tmp_path):
    """付費層（azure-paid）且雜湊與紀錄一致的 mp3 才部署；改過內容、沒有紀錄、非官方引擎的一律不部署。"""
    r = tmp_path / 'repo'
    site = stage(tmp_path, official_audio=True)
    total = len(list((ROOT / 'audio').glob('*.mp3')))
    assert len(list((site / 'audio').glob('*.mp3'))) == total >= 180
    # 抽換一個檔案內容 → 與紀錄的雜湊不符 → 那一個不部署
    (r / '_site').rename(tmp_path / 'old_site')
    victim = next((r / 'gsat' / 'audio').glob('*.mp3'))
    victim.write_bytes(victim.read_bytes() + b'\0')
    subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=r, check=True, capture_output=True)
    got = {p.name for p in (r / '_site' / 'gsat' / 'audio').glob('*.mp3')}
    assert victim.name not in got and len(got) == total - 1


def test_free_tier_test_audio_is_never_deployed(tmp_path):
    """Azure 免費層 F0 的測試音檔（azure-free-test）可在本機試聽，但不是 production：正式部署整理時一律移除。"""
    r = tmp_path / 'repo'
    site = stage(tmp_path, official_audio=True)
    pf = r / 'docs' / 'gsat' / 'audio-provenance.json'
    prov = json.loads(pf.read_text(encoding='utf8'))
    for e in prov['files'].values():
        e.update(engine='azure-free-test', tier='F0', usage='development-test-only', productionApproved=False)
    pf.write_text(json.dumps(prov), encoding='utf8')
    shutil.rmtree(r / '_site')
    subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=r, check=True, capture_output=True)
    assert list((r / '_site' / 'gsat' / 'audio').glob('*.mp3')) == []
    for e in prov['files'].values():                                       # 就算有人把紀錄手改成 production 欄位，引擎不是 azure-paid 仍不部署
        e.update(usage='production', productionApproved=True)
    pf.write_text(json.dumps(prov), encoding='utf8')
    shutil.rmtree(r / '_site')
    subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=r, check=True, capture_output=True)
    assert list((r / '_site' / 'gsat' / 'audio').glob('*.mp3')) == []


@pytest.mark.parametrize('ci', [{'GITHUB_ACTIONS': 'true'}, {'CF_PAGES': '1'}, {'CI': 'true'}])
def test_nonproduction_audio_override_is_refused_in_ci_and_cloudflare(tmp_path, ci):
    p = stage(tmp_path, extra_env={'GSAT_ALLOW_NONPRODUCTION_AUDIO': '1', **ci})
    assert p.returncode != 0 and 'GSAT_ALLOW_NONPRODUCTION_AUDIO' in p.stdout + p.stderr


def test_nonproduction_audio_can_only_be_previewed_locally_with_an_explicit_override(tmp_path):
    p = stage(tmp_path, extra_env={'GSAT_ALLOW_NONPRODUCTION_AUDIO': '1', 'GITHUB_ACTIONS': '', 'CI': ''})
    assert p.returncode == 0, p.stdout + p.stderr
    assert len(list((tmp_path / 'repo' / '_site' / 'gsat' / 'audio').glob('*.mp3'))) >= 180


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


def test_public_build_word_pages_and_audio_work_without_any_exam_data(browser, public_site_official_audio, stub_mp3):
    public_site = public_site_official_audio
    ctx, page = open_site(browser, public_site)
    page.add_init_script("window.__au=[];(()=>{const A=window.Audio;window.Audio=function(s){const a=new A(s);window.__au.push(a.src.split('/').pop());return a};window.Audio.prototype=A.prototype})()")
    page.reload()                                                                                                 # 初始化腳本要在載入前注入，所以重新載入一次
    page.goto((public_site / 'index.html').as_uri() + '#/word/communicate-v')
    page.wait_for_selector('[data-view=word]')
    assert page.locator('.wcard .hw').inner_text() == 'communicate' and page.locator('[data-role=family] li').count() == 3
    assert page.locator('[data-role=no-index]').count() >= 1 and '授權確認後才會開放' in page.inner_text('#app')          # 沒有歷屆出現紀錄，也不洩漏任何次數或題號
    assert page.locator('[data-role=rec-table]').count() == 0 and '115' not in page.locator('[data-role=no-index]').first.inner_text()
    page.locator('.whead .spk').click()                                                                          # 真的音檔隨網站部署，可以載入
    page.wait_for_function('window.__au.length===1')
    name = page.evaluate('window.__au[0]')
    assert (public_site / 'audio' / name).is_file()
    page.goto((public_site / 'index.html').as_uri() + '#/words')
    assert page.locator('[data-entry]').count() >= 59 and page.locator('.cnt').count() == 0                      # 沒有任何歷屆次數
    page.goto((public_site / 'index.html').as_uri() + '#/q/e115_12')
    assert '找不到這一題' in page.inner_text('#app')
    assert page.errors == []
    ctx.close()


def test_default_public_build_without_mp3_falls_back_to_device_voice(browser, public_site):
    """來源不明的 mp3 被移除後，單字頁的發音按鈕仍可用（改用裝置語音），頁面沒有錯誤。"""
    ctx, page = open_site(browser, public_site)
    page.add_init_script("window.__spoken=[];window.speechSynthesis&&(speechSynthesis.speak=u=>{window.__spoken.push(u.text)});")
    page.goto((public_site / 'index.html').as_uri() + '#/word/communicate-v')
    page.wait_for_selector('[data-view=word]')
    page.reload()
    page.wait_for_selector('[data-view=word]')
    page.locator('.whead .spk').click()
    page.wait_for_function('window.__spoken.length>=1', timeout=8000)
    assert page.evaluate('window.__spoken[0]') == 'communicate'
    ctx.close()
