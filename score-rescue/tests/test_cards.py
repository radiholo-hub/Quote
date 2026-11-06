"""互動搭配詞卡（cards/）：卡片 ID、喇叭只播放不翻面、換卡停止、同時只有一段聲音、音檔名稱與主站一致。"""
import json
import re

import pytest

from conftest import ROOT

CARDS = ROOT / 'cards' / 'index.html'
REPO = ROOT.parent

# 假的 Audio：記錄播放與暫停，不真的發出聲音
FAKE_AUDIO = """
window.__audio=[];
window.Audio=function(src){var a=document.createElement('span');a.src=src;a.paused=true;
  a.play=function(){a.paused=false;window.__audio.push({src:src,act:'play'});return Promise.resolve()};
  a.pause=function(){if(!a.paused)window.__audio.push({src:src,act:'pause'});a.paused=true};
  a.load=function(){};a.removeAttribute=function(){};return a};
"""


def data():
    m = re.search(r'<script type="application/json" id="cards-data">(.*?)</script>', CARDS.read_text(encoding='utf-8'), re.S)
    return json.loads(m.group(1))


@pytest.fixture
def cards(browser):
    ctx = browser.new_context(viewport={'width': 390, 'height': 844})
    ctx.add_init_script(FAKE_AUDIO)
    page = ctx.new_page()
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.goto(CARDS.as_uri())
    page.wait_for_function('window.__cards')
    yield page
    ctx.close()
    assert not errs, errs


def test_card_ids_unique_and_complete():
    ids = [d['id'] for c in data() for d in c['cards']]
    assert len(ids) == 48 and len(set(ids)) == 48
    for c in data():
        for d in c['cards']:
            assert d['say'] and d['ex'] and all(len(e) == 2 for e in d['ex'])


def test_audio_files_exist_for_cards_with_audio():
    """標了 audio 的卡片，搭配詞與每句例句都要有 ../audio/<srHash>.mp3（和主站同一套檔名）。"""
    tool = REPO / 'tools' / 'make_score_rescue_audio.py'
    if not tool.exists() or not (ROOT / 'audio').is_dir():
        pytest.skip('CI 的測試只取網頁，不含音檔；音檔是否齊全由 Generate audio 的 check_audio_complete 檢查')
    src = tool.read_text(encoding='utf-8')
    g = {'__name__': 'x', '__file__': str(tool)}
    exec(src[:src.index('async def main')], g)
    texts = set(g['collect']())
    for c in data():
        for d in c['cards']:
            if d.get('audio'):
                for t in [d['say']] + [e[0].replace('**', '') for e in d['ex']]:
                    assert t in texts, '音檔清單沒有收進：' + t
                    assert (ROOT / 'audio' / (g['sr_hash'](t) + '.mp3')).exists(), '缺音檔：' + t


def test_speaker_plays_without_flipping(cards):
    cards.click('#tab0')                                  # pp-01 highly recommended（有音檔）
    assert cards.get_attribute('#card', 'data-id') == 'pp-01'
    cards.click('#front .say')
    assert not cards.evaluate("document.getElementById('card').classList.contains('flip')"), '按喇叭不翻面'
    last = cards.evaluate('window.__lastSpoken')
    assert last['text'] == 'highly recommended'
    assert last['src'].endswith('/audio/' + cards.evaluate("__cards.srHash('highly recommended')") + '.mp3')
    cards.click('#card .hint')                            # 點卡片其他地方才翻面
    assert cards.evaluate("document.getElementById('card').classList.contains('flip')")
    cards.click('#back .say')
    assert cards.evaluate("document.getElementById('card').classList.contains('flip')"), '背面按喇叭仍停在背面'
    assert cards.evaluate('window.__lastSpoken.text') == 'The restaurant is highly recommended by local guides.'


def test_only_one_sound_and_stop_on_next(cards):
    cards.click('#tab4')                                  # look-01 hard / hardly：兩句例句
    cards.click('#card .hint')
    btns = cards.locator('#back .say')
    assert btns.count() == 2
    btns.nth(0).click()
    btns.nth(1).click()
    acts = cards.evaluate('window.__audio')
    assert [a['act'] for a in acts] == ['play', 'pause', 'play'], '播第二句前先停第一句'
    assert cards.get_attribute('#back .say >> nth=1', 'aria-pressed') == 'true'
    cards.click('#next')
    assert cards.evaluate('window.__audio')[-1]['act'] == 'pause', '切到下一張時停止播放'


def test_same_button_again_stops(cards):
    cards.click('#tab2')                                  # vafter-01 respond promptly
    cards.click('#front .say')
    cards.click('#front .say')
    assert [a['act'] for a in cards.evaluate('window.__audio')] == ['play', 'pause']
    assert cards.get_attribute('#front .say', 'aria-pressed') == 'false'


def test_every_card_has_speakers(cards):
    """48 張卡都有正面 1 顆、背面每句例句 1 顆喇叭；look-01（hard / hardly）背面兩句各自一段音檔。"""
    for c in data():
        assert all(d.get('audio') for d in c['cards'])
    n = cards.evaluate("""()=>{let out=[];__cards.CATS.forEach((c,k)=>{document.getElementById('tab'+k).click();
      c.cards.forEach(()=>{out.push([document.getElementById('card').dataset.id,document.querySelectorAll('#front .say').length,document.querySelectorAll('#back .say').length]);document.getElementById('next').click()})});return out}""")
    want = {d['id']: len(d['ex']) for c in data() for d in c['cards']}
    assert len(n) == 48
    for cid, f, b in n:
        assert f == 1 and b == want[cid], cid
    cards.click('#tab4')
    keys = cards.evaluate("[...document.querySelectorAll('#back .say')].map(b=>[b.dataset.key,b.dataset.say])")
    assert keys == [['look-01:ex1', 'She works hard every day.'], ['look-01:ex2', 'He hardly had time to eat lunch.']]
    srcs = cards.evaluate("[...document.querySelectorAll('#back .say')].map(b=>__cards.srHash(b.dataset.say))")
    assert len(set(srcs)) == 2, '兩句例句各有自己的音檔'
