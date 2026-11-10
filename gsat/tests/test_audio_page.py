"""語音試聽頁(tools/gsat_audio_test_page.py):六個區塊都在、一次只播一段、可停止與重播、不載入任何外部資源、WebKit(iPhone)也能操作。"""
import json
import pathlib
import shutil
import subprocess
import sys

import pytest

from conftest import ROOT

TOOL = ROOT.parent / 'tools' / 'gsat_audio_test_page.py'
PATCH = """() => { window.__log = []; window.__playing = new Set(); window.__max = 0;
  HTMLMediaElement.prototype.play = function () { window.__playing.add(this); window.__max = Math.max(window.__max, window.__playing.size); window.__log.push('play:' + this.src.slice(0, 5)); return Promise.resolve(); };
  Object.defineProperty(HTMLMediaElement.prototype, 'paused', { get() { return !window.__playing.has(this); }, configurable: true });
  HTMLMediaElement.prototype.pause = function () { window.__playing.delete(this); window.__log.push('pause'); }; }"""
pytestmark = pytest.mark.skipif(shutil.which('node') is None, reason='需要 node 產生頁面')


@pytest.fixture(scope='module')
def page_file(tmp_path_factory):
    p = tmp_path_factory.mktemp('ap') / 'audio-test.html'
    subprocess.run([sys.executable, str(TOOL), '--out', str(p), '--embed'], check=True, capture_output=True)
    return p


def test_page_has_all_sections_and_marks_everything_unreviewed(make_page, page_file):
    pg = make_page('phone', url=page_file.as_uri())
    assert not pg.errors
    heads = pg.locator('h2').all_inner_texts()
    for k in ('單字發音', '衍生字發音', '片語與搭配詞', '完整例句', '文章・正常速度', '文章・慢速'):
        assert any(k in h for h in heads), k
    assert pg.locator('.row').count() == 187 and pg.locator('.fam').count() >= 9
    assert '尚未全面驗收' in pg.locator('.banner').inner_text()
    assert pg.locator('input[type=radio][value=待審核]:checked').count() == 187     # 預設全是待審核
    assert not pg.evaluate('document.documentElement.scrollWidth > innerWidth')


def test_only_one_clip_plays_at_a_time_and_replay_and_stop_work(make_page, page_file):
    pg = make_page('phone', url=page_file.as_uri()); pg.evaluate(PATCH)
    plays = pg.locator('#w ~ .row button.play')
    plays.nth(0).click(); plays.nth(1).click()
    assert pg.evaluate('window.__playing.size') == 1 and pg.evaluate('window.__max') == 1
    assert pg.locator('.row.on').count() == 1 and '播放中' in pg.locator('#now').inner_text()
    pg.locator('#w ~ .row button[data-act=replay]').nth(1).click()
    assert pg.evaluate('window.__playing.size') == 1                                  # 重播不會疊音
    plays.nth(1).click()                                                              # 同一段再點一次 → 停止
    assert pg.evaluate('window.__playing.size') == 0 and pg.locator('.row.on').count() == 0
    plays.nth(2).click(); pg.click('#stopall')
    assert pg.evaluate('window.__playing.size') == 0 and pg.locator('#now').inner_text() == '沒有在播放'


def test_family_buttons_share_the_single_player_and_verdicts_export(make_page, page_file):
    pg = make_page('phone', url=page_file.as_uri()); pg.evaluate(PATCH)
    fam = pg.locator('.fam').first
    assert 'tight' in fam.inner_text()
    fam.locator('button.play').nth(0).click(); fam.locator('button.play').nth(1).click()
    assert pg.evaluate('window.__max') == 1
    pg.locator('input[type=radio][value=有問題]').first.check()
    pg.click('#exportbtn')
    out = pg.input_value('#exp')
    assert '已標記 1 / ' in out and out.splitlines()[1].startswith('有問題|')


def test_page_is_self_contained(make_page, page_file):
    reqs = []
    pg = make_page('phone', url='about:blank'); pg.on('request', lambda r: reqs.append(r.url)); pg.goto(page_file.as_uri())
    assert [u for u in reqs if not u.startswith(('file:', 'data:', 'blob:'))] == []


def test_ios_safari_engine_plays_blob_audio_one_at_a_time(make_ios_page, page_file):
    """WebKit(Safari 引擎)+ iPhone 13 裝置:解碼內嵌的 base64、以 blob 網址播放、一次只播一段。
    這個頁面很長,Playwright 在 WebKit 的 tap 會因頁面捲動而點到別列,所以用 element.click() 觸發(邏輯與桌面相同);觸控版面另由截圖檢查。"""
    pg = make_ios_page(page_file.as_uri()); pg.evaluate(PATCH)
    pg.evaluate("""() => { const b = document.querySelectorAll('#w ~ .row button.play'); b[0].click(); b[1].click(); }""")
    assert pg.evaluate('window.__max') == 1 and pg.evaluate('window.__playing.size') == 1
    assert pg.evaluate("window.__log.some(x => x.startsWith('play:blob'))")
    pg.evaluate("() => document.querySelector('#stopall').click()")
    assert pg.evaluate('window.__playing.size') == 0 and not pg.errors


def test_q1_page_lists_only_the_17_distinct_f0_files_and_never_writes_a_signoff(tmp_path):
    """Q1 試聽頁：只有該題的 17 個不同 mp3、標示 Azure F0 development-test；只在來源全為 dev-test 時才產生；不改任何簽核或來源紀錄。"""
    from conftest import exam_present
    if not exam_present():
        pytest.skip('沒有歷屆試題內容（公開版本庫的乾淨分支）')
    signoff = ROOT.parent / 'docs' / 'gsat' / 'signoffs' / '115-1.json'
    prov = ROOT.parent / 'docs' / 'gsat' / 'audio-provenance.json'
    before = (signoff.read_bytes(), prov.read_bytes())
    out = tmp_path / 'q1.html'
    r = subprocess.run([sys.executable, str(TOOL), '--out', str(out), '--embed', '--q', '115-1'], capture_output=True, text=True)
    if r.returncode != 0:                                              # 來源不是全為 F0 測試音檔時，工具必須拒絕產生
        assert 'F0' in r.stdout + r.stderr and not out.exists()
        return
    t = out.read_text(encoding='utf8')
    assert t.count('class="row"') == 17 and 'Azure Speech F0 · development-test audio' in t
    assert 'production-approved' in t and '不會寫入教師簽核紀錄' in t
    assert 'http://' not in t.replace('http://www.w3.org', '') and 'https://' not in t
    assert (signoff.read_bytes(), prov.read_bytes()) == before        # 產生頁面不會改動簽核或來源紀錄
