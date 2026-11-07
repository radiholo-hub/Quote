"""語音：音檔清單與雜湊、檔案真的存在且是有效 mp3、播放器行為（不重疊、再按停止、暫停／繼續／重播、慢速、正式考禁用、找不到檔案時的退路）。"""
import json
import re
import shutil
import subprocess

import pytest

from conftest import FAKE_SPEECH, ROOT, TRACK_AUDIO, URL, audio_states, needs_exam, route_stub_audio, start_exam

HASH = lambda t: t  # 佔位：雜湊一律由網頁上的 GSATAudio.srHash 計算（與 tools/make_score_rescue_audio.py 的 sr_hash 相同）


@pytest.fixture(scope='module')
def manifest(browser):
    page = browser.new_page()
    page.goto(URL)
    d = page.evaluate('''()=>({items:AUDIO_MANIFEST.items, vocab:VOCAB,
        ok:AUDIO_MANIFEST.items.every(i=>GSATAudio.srHash(i.rate==='slow'?'slow\\n'+i.text:i.text)===i.hash && i.file===i.hash+'.mp3')})''')
    page.close()
    return d


# ---------------------------------------------------------------- 清單與檔案
def test_manifest_hashes_match_the_score_rescue_hash_function(manifest):
    assert manifest['ok'] is True and len(manifest['items']) >= 180


def test_every_word_collocation_example_and_phrase_has_audio(manifest):
    have = {i['text'] for i in manifest['items'] if i['rate'] == 'normal'}
    need = set()
    for e in manifest['vocab']['entries'].values():
        need.add(e['hw']); need.update(c['t'] for c in e['coll']); need.update(x['en'] for x in e['ex'])
    need.update(p['t'] for p in manifest['vocab']['phrases'].values())
    assert need - have == set(), sorted(need - have)[:5]


def test_manifest_contains_only_original_content_never_exam_text(browser):
    """音檔清單只能有原創內容：單字庫（詞條、搭配詞、例句、片語）與原創模擬題的文章；不得出現歷屆試題的文章或題目。"""
    page = browser.new_page()
    page.goto(URL)
    refs = page.evaluate('[...new Set(AUDIO_MANIFEST.items.flatMap(i=>i.refs))]')
    entries = page.evaluate('Object.keys(VOCAB.entries)')
    phrases = page.evaluate('Object.keys(VOCAB.phrases).map(p=>"phrase:"+p)')
    page.close()
    allowed = set(entries) | set(phrases)
    for r in refs:
        assert r in allowed or re.fullmatch(r'mock:[rcs]\d+', r), f'清單裡有來源不明的內容:{r}'


def test_audio_files_exist_are_valid_mp3_and_none_is_orphaned(manifest):
    files = {i['file'] for i in manifest['items']}
    on_disk = {p.name for p in (ROOT / 'audio').glob('*.mp3')}
    assert files - on_disk == set(), f'缺音檔:{sorted(files - on_disk)[:3]}'
    assert on_disk - files == set(), f'清單以外的音檔:{sorted(on_disk - files)[:3]}'
    for f in files:
        b = (ROOT / 'audio' / f).read_bytes()
        assert len(b) > 1000 and (b[:3] == b'ID3' or (b[0] == 0xFF and b[1] & 0xE0 == 0xE0)), f'{f} 不是有效的 mp3'


@pytest.mark.skipif(shutil.which('ffprobe') is None, reason='沒有 ffprobe')
def test_audio_durations_are_plausible_for_the_text_length(manifest):
    bad = []
    for i in manifest['items']:
        d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(ROOT / 'audio' / i['file'])], capture_output=True, text=True).stdout.strip() or 0)
        words = len(re.findall(r'\w+', i['text']))
        per = d / max(words, 1)
        lo, hi = (0.25, 1.6) if i['rate'] == 'normal' else (0.45, 2.2)
        if d < 0.4 or (words >= 4 and not lo <= per <= hi):
            bad.append((i['file'], i['kind'], round(d, 2), words))
    assert bad == []


def test_slow_passages_are_longer_than_normal_ones(manifest):
    if shutil.which('ffprobe') is None:
        pytest.skip('沒有 ffprobe')
    dur = lambda it: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(ROOT / 'audio' / it['file'])], capture_output=True, text=True).stdout.strip())
    by = {}
    for i in manifest['items']:
        if i['kind'] == 'passage': by.setdefault(i['refs'][0], {})[i['rate']] = dur(i)
    assert by and all(v['slow'] > v['normal'] * 1.15 for v in by.values()), by


# ---------------------------------------------------------------- 播放器
def play_page(make_page, stub, **kw):
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH], **kw)
    route_stub_audio(page, stub)
    page.goto(URL + '#/word/tight-adj')
    page.wait_for_selector('[data-view=word]')
    return page


def hash_of(page, text, slow=False):
    return page.evaluate('([t,s])=>GSATAudio.srHash(s?"slow\\n"+t:t)', [text, slow])


def test_speaker_plays_the_matching_file_and_a_second_click_stops_it(make_page, stub_mp3):
    page = play_page(make_page, stub_mp3)
    btn = page.locator('.whead .spk')
    btn.click()
    page.wait_for_function('window.__audios.length===1 && !window.__audios[0].paused')
    st = audio_states(page)
    assert st[0]['f'] == hash_of(page, 'tight') + '.mp3' and btn.get_attribute('aria-pressed') == 'true'
    btn.click()                                                                      # 再按一次停止（和 Score Rescue 相同）
    assert audio_states(page)[0]['paused'] is True and btn.get_attribute('aria-pressed') == 'false'
    assert page.errors == []


def test_two_sounds_never_overlap(make_page, stub_mp3):
    page = play_page(make_page, stub_mp3)
    page.locator('.whead .spk').click()
    page.wait_for_function('window.__audios.length===1')
    page.locator('.colls .spk').first.click()                                        # 播搭配詞：前一段必須停止
    page.locator('.exs .spk').first.click()
    page.wait_for_function('window.__audios.length===3')
    playing = [a for a in audio_states(page) if not a['paused']]
    assert len(playing) == 1 and playing[0]['f'] == audio_states(page)[-1]['f']


def test_family_word_and_example_have_working_speakers(make_page, stub_mp3):
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH])
    route_stub_audio(page, stub_mp3)
    page.goto(URL + '#/word/communicate-v')
    page.wait_for_selector('[data-role=family]')
    fam = page.locator('[data-role=family] li[data-entry=communication-n] .spk')
    fam.click()
    page.wait_for_function('window.__audios.length===1')
    assert audio_states(page)[0]['f'] == hash_of(page, 'communication') + '.mp3'
    page.locator('.exs .spk').first.click()
    page.wait_for_function('window.__audios.length===2')
    assert audio_states(page)[1]['f'] == hash_of(page, 'Good friends communicate honestly with each other.') + '.mp3'


def test_missing_file_falls_back_to_device_voice_instead_of_silence(make_page):
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH])
    page.route('**/audio/*.mp3', lambda r: r.fulfill(status=404))
    page.goto(URL + '#/word/tight-adj')
    page.locator('.whead .spk').click()
    page.wait_for_function('window.__spoken.length===1')
    assert page.evaluate('window.__spoken') == ['tight']


def test_clicking_a_speaker_does_not_move_the_page(make_page, stub_mp3):
    page = play_page(make_page, stub_mp3)
    page.evaluate('window.scrollTo(0, 400)')
    page.wait_for_timeout(100)
    y = page.evaluate('window.scrollY')
    page.locator('.exs .spk').first.click()
    page.wait_for_timeout(300)
    assert abs(page.evaluate('window.scrollY') - y) <= 1


@pytest.mark.parametrize('device', ['phone', 'android'])
def test_speaker_buttons_are_big_enough_for_touch(make_page, stub_mp3, device):
    page = make_page(device, url='about:blank')
    page.goto(URL + '#/word/communicate-v')
    small = [(b.get_attribute('aria-label'), b.bounding_box()) for b in page.locator('.spk').all() if b.is_visible() and (b.bounding_box()['height'] < 43.5 or b.bounding_box()['width'] < 43.5)]
    assert small == [] and page.locator('.spk').count() >= 8


# ---------------------------------------------------------------- 原創文章朗讀（暫停／繼續／重播／慢速）
def mock_reading_explanation(page):
    page.goto(URL + '#/practice')
    page.get_by_role('button', name='閱讀測驗').click()
    if page.get_by_role('button', name='原創練習題').count():
        page.get_by_role('button', name='原創練習題').click()
    page.get_by_role('button', name='詞彙', exact=True).click()
    page.get_by_role('button', name='每題答完立刻看答案').click()
    page.get_by_role('button', name='開始練習').click()
    page.wait_for_selector('.opt')
    page.locator('.opt').first.click()
    page.wait_for_selector('[data-role=passage-player]')


def test_original_passage_read_aloud_pause_resume_replay_and_speed(make_page, stub_mp3):
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH])
    route_stub_audio(page, stub_mp3)
    page.goto(URL)
    mock_reading_explanation(page)
    p = page.locator('[data-role=passage-player]')
    main = p.locator('[data-act=main]')
    assert main.inner_text() == '▶ 播放全文'
    main.click()
    page.wait_for_function('window.__audios.length===1 && !window.__audios[0].paused')
    normal = audio_states(page)[0]['f']
    assert main.inner_text() == '⏸ 暫停' and p.inner_text().count('播放中') == 1
    main.click()                                                                    # 暫停
    assert audio_states(page)[0]['paused'] is True and main.inner_text() == '▶ 繼續'
    main.click()                                                                    # 繼續（同一段，不重頭開始）
    try:
        page.wait_for_function('!window.__audios[0].paused', timeout=10000)
    except Exception as e:                                                          # 失敗時把音訊元素的實際狀態印出來,方便在 CI 上判斷原因
        info = page.evaluate("window.__audios.map(a=>({paused:a.paused,ended:a.ended,err:a.error&&a.error.code,ready:a.readyState,net:a.networkState,t:a.currentTime,dur:a.duration,src:a.src.slice(-20)}))")
        raise AssertionError(f'resume failed: {info} errors={page.errors} toast={page.locator("#audio-toast").all_inner_texts()}') from e
    assert len(audio_states(page)) == 1
    page.wait_for_timeout(1200)
    p.locator('[data-act=replay]').click()                                          # 重新播放：從頭開始
    page.wait_for_function('window.__audios.length===2')
    assert audio_states(page)[1]['t'] < 1.0 and audio_states(page)[0]['paused']
    p.get_by_role('button', name='慢速').click()                                    # 切慢速：換成慢速音檔重新播放
    page.wait_for_function('window.__audios.length===3')
    slow = audio_states(page)[2]['f']
    assert slow != normal and not audio_states(page)[2]['paused']
    assert p.get_by_role('button', name='慢速').get_attribute('aria-pressed') == 'true' and page.evaluate('__gsat.DB().prefs.audioSlow') is True
    assert len([a for a in audio_states(page) if not a['paused']]) == 1
    assert slow.replace('.mp3', '') in page.evaluate('AUDIO_MANIFEST.items.filter(i=>i.rate==="slow").map(i=>i.hash)')


@needs_exam
def test_formal_exam_blocks_all_read_aloud_until_it_ends(make_page, stub_mp3):
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH])
    route_stub_audio(page, stub_mp3)
    page.goto(URL)
    start_exam(page, '115', 'formal')
    assert page.locator('.spk').count() == 0 and page.locator('[data-role=passage-player]').count() == 0          # 作答畫面沒有任何朗讀
    page.goto(URL + '#/word/tight-adj')                                                                         # 作答期間跑去看單字頁
    page.locator('.whead .spk').click()
    assert page.evaluate('window.__audios.length') == 0 and page.evaluate('window.__spoken.length') == 0
    assert '正式模擬考作答期間不提供朗讀' in page.inner_text('#audio-toast')
    page.evaluate("()=>{const k='gsat-session-v2';const S=JSON.parse(localStorage.getItem(k));S.deadline=Date.now()-1000;localStorage.setItem(k,JSON.stringify(S))}")
    page.reload()                                                                                               # 時間到之後恢復
    page.locator('.whead .spk').click()
    page.wait_for_function('window.__audios.length===1')


@needs_exam
def test_free_practice_does_not_block_audio(make_page, stub_mp3):
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH])
    route_stub_audio(page, stub_mp3)
    page.goto(URL)
    start_exam(page, '115', 'free')
    page.goto(URL + '#/word/tight-adj')
    page.locator('.whead .spk').click()
    page.wait_for_function('window.__audios.length===1')


@needs_exam
def test_exam_passages_get_no_read_aloud_until_rights_are_confirmed(make_page):
    from conftest import run_exam
    page = make_page()
    run_exam(page, '115', correct=lambda q: q['n'] != 36)
    page.locator('.nav a.bad').first.click()
    page.wait_for_selector('.explain')
    assert page.locator('[data-role=passage-player]').count() == 0


def test_pause_before_loading_finishes_does_not_switch_to_device_voice(make_page, stub_mp3):
    """在音檔載入完成前就按暫停,瀏覽器會讓 play() 以 AbortError 失敗;這不是播放失敗,不能改用裝置語音
    (CI 上曾因此讓「暫停後繼續」偶發失敗,實際使用者快速點擊也會遇到)。"""
    abort = "(()=>{const o=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){o.call(this).catch(()=>{});return Promise.reject(new DOMException('interrupted','AbortError'))}})()"
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH, abort])
    route_stub_audio(page, stub_mp3)
    page.goto(URL + '#/word/tight-adj')
    page.locator('.whead .spk').click()
    page.wait_for_function('window.__audios.length===1')
    page.wait_for_timeout(500)
    assert page.evaluate('window.__spoken') == []


def test_abbreviations_sb_and_sth_are_spoken_as_words():
    """sb. 要唸 somebody、sth. 要唸 something:畫面文字不變,合成語音與裝置語音用的文字會展開。"""
    t = (ROOT / 'data' / 'audio_manifest.js').read_text(encoding='utf8')
    items = json.loads(t[t.index('window.AUDIO_MANIFEST = ') + 24:].rstrip().rstrip(';'))['items']
    abbr = [i for i in items if re.search(r'\b(sb|sth)\b', i['text'], re.I)]
    assert len(abbr) >= 4
    for i in abbr:
        assert re.search(r'\b(sb|sth)\b', i['speak'], re.I) is None, i
    assert {i['text']: i['speak'] for i in abbr}['assault sb. with sth.'] == 'assault somebody with something'
    assert all('speak' not in i for i in items if i not in abbr)


def test_device_voice_also_expands_abbreviations(make_page):
    page = make_page(url='about:blank', init=[TRACK_AUDIO, FAKE_SPEECH])
    page.route('**/audio/*.mp3', lambda r: r.fulfill(status=404))
    page.goto(URL + '#/word/dread-v')
    page.locator('.coll .spk, [data-audio="dread doing sth."]').first.click()
    page.wait_for_function('window.__spoken.length===1')
    assert page.evaluate('window.__spoken') == ['dread doing something']
