"""審核工具:教師審核表(三種審核狀態、預設待確認、不會把 AI 草稿標成通過)、詞性待確認審核表(附建議但不寫入審核結果)、音檔核對工具。"""
import json
import pathlib
import re
import shutil
import subprocess
import sys

import pytest

from conftest import ROOT, needs_exam

TOOLS = ROOT.parent / 'tools'
need_node = pytest.mark.skipif(shutil.which('node') is None, reason='需要 node')


def run(*args, ok=True):
    r = subprocess.run([sys.executable, *map(str, args)], capture_output=True, text=True)
    if ok: assert r.returncode == 0, r.stdout + r.stderr
    return r


@need_node
@needs_exam
def test_teacher_review_sheet_splits_every_part_into_separately_reviewable_items(tmp_path):
    run(TOOLS / 'gsat_review_sheet.py', '--out', tmp_path, '--q', '115-1')
    t = (tmp_path / 'review-115-1.html').read_text(encoding='utf8')
    ids = re.findall(r'data-id="([^"]+)"', t)
    assert len(ids) == len(set(ids)) >= 40
    for part in ('115-1:q', '115-1:zh', '115-1:key1', '115-1:key3', '115-1:optA', '115-1:optD', '115-1:w:tight-adj:def', '115-1:w:tight-adj:forms', '115-1:w:tight-adj:coll1',
                 '115-1:w:tight-adj:ex1', '115-1:w:tight-adj:fam:tightly-adv', '115-1:w:tight-adj:syn', '115-1:w:tight-adj:ant', '115-1:w:tight-adj:conf1', '115-1:pat1', '115-1:gram',
                 '115-1:rec:tight-adj:sum', '115-1:rec:tight-adj:待審核1', '115-1:ext:x115-1-a', '115-1:ext:x115-1-b', '115-1:final'):
        assert f'data-id="{part}"' in t, part
    assert 'The mayor has such a ______ schedule' in t and '行程安排非常緊湊' in t and '官方答案:(B)' in t
    n = len(ids)
    assert t.count('value="待確認" checked') == n and 'value="通過" checked' not in t and 'value="需修改" checked' not in t     # 全部預設待確認,不會自動通過
    assert t.count('<textarea') >= 30 and 'data-orig=' in t                                                                  # 可直接修改文字
    assert 'class="play"' in t and 'var DATA=' in t and t.count('value="待聽" checked') >= 15                                  # 內嵌發音、預設待聽
    assert 'AI 草稿' in t and '尚未經人工審核' in t.replace('草稿,尚未經人工審核', '尚未經人工審核')


@need_node
@needs_exam
def test_every_question_sheet_matches_official_answer_and_never_pre_approves(tmp_path):
    run(TOOLS / 'gsat_review_sheet.py', '--out', tmp_path, '--no-audio')
    t = (tmp_path / 'explanation-review-sheet.html').read_text(encoding='utf8')
    assert all(f'data-id="115-{k}:final"' in t for k in range(1, 11)) and 'value="通過" checked' not in t and '詳解答案與官方答案不一致' not in t
    assert 'var DATA=' not in t


@need_node
@needs_exam
def test_review_ui_marks_edits_persists_and_exports(make_page, tmp_path):
    run(TOOLS / 'gsat_review_sheet.py', '--out', tmp_path, '--q', '115-1', '--no-audio')
    pg = make_page('phone', url=(tmp_path / 'review-115-1.html').as_uri())
    row = pg.locator('.r[data-id="115-1:zh"]')
    row.locator('textarea').fill('改過的翻譯'); row.locator('input[value=需修改]').check(); row.locator('input.c').fill('請調整語氣')
    pg.locator('.r[data-id="115-1:key1"] input[value=通過]').check()
    assert 'edited' in row.get_attribute('class') and '通過 1・需修改 1' in pg.inner_text('#cnt')
    pg.click('#btn')
    out = pg.input_value('#exp')
    assert '[115-1:zh]' in out and '狀態:需修改' in out and '改後:改過的翻譯' in out and '原文:' in out and '[115-1:key1]' in out and '狀態:通過' in out and '[115-1:key2]' not in out
    pg.reload()                                                                                                           # 重新整理後仍在
    assert pg.locator('.r[data-id="115-1:zh"] textarea').input_value() == '改過的翻譯' and '通過 1・需修改 1' in pg.inner_text('#cnt')


@need_node
@needs_exam
def test_review_sheets_refuse_to_write_inside_the_repository():
    for tool in ('gsat_review_sheet.py', 'gsat_vocab_review_sheet.py'):
        r = run(TOOLS / tool, '--out', ROOT.parent / 'tmp-review', ok=False)
        assert r.returncode != 0 and '拒絕' in (r.stdout + r.stderr) and not (ROOT.parent / 'tmp-review').exists()


@need_node
@needs_exam
def test_pending_pos_sheet_keeps_every_original_record_unchosen_and_never_writes_verdicts(make_page, tmp_path):
    before = (ROOT / 'exam' / 'vocab_reviews.js').read_text(encoding='utf8')
    idx = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.VOCAB_INDEX))", str(ROOT / 'exam' / 'vocab_index.js')], capture_output=True, text=True, check=True).stdout)
    pending = sum(len(e['review']) for e in idx['entries'].values())
    sg = {r['k']: {'n': 0, 'actual': 'x', 'pos': 'x', 'alt': 'y', 'suggest': 'confirmed', 'why': '測試', 'conf': '高', 'page': 2, 'entry': eid} for eid, e in idx['entries'].items() for r in e['review']}
    f = tmp_path / 'sg.json'; f.write_text(json.dumps(sg, ensure_ascii=False), encoding='utf8')
    run(TOOLS / 'gsat_vocab_review_sheet.py', '--out', tmp_path, '--suggestions', f)
    t = (tmp_path / 'vocab-review-sheet.html').read_text(encoding='utf8')
    assert t.count('class="rec"') == pending and t.count('value="" checked') == pending                  # 每一筆都保留,而且全部預設「待確認」
    assert 'value="confirmed" checked' not in t and 'value="rejected" checked' not in t                  # AI 建議不會變成預設選項
    assert t.count('AI 參考意見(未採用') == pending and '第 2 頁' in t
    for g in ('連字號複合詞內的比對', '此字形也可能是別的詞性', '同詞性但字義可能不同'):                    # 複合詞、詞性不同、字義不同分開
        assert g in t
    assert t.index('impact-n') < t.index('crash-v')
    pg = make_page('desktop', url=(tmp_path / 'vocab-review-sheet.html').as_uri())
    pg.locator('#r1 input[value=confirmed]').check(); pg.fill('#by', '測試審核者'); pg.click('#btn')
    out = pg.input_value('#exp')
    assert '"verdict": "confirmed"' in out and '"by": "測試審核者"' in out and out.count('"verdict"') == 1
    assert (ROOT / 'exam' / 'vocab_reviews.js').read_text(encoding='utf8') == before                  # 工具不會改動審核資料檔


@pytest.mark.skipif(shutil.which('ffprobe') is None or shutil.which('ffmpeg') is None, reason='需要 ffprobe 與 ffmpeg')
def test_audio_verifier_passes_on_the_committed_audio():
    r = run(TOOLS / 'verify_gsat_audio.py')
    assert '實際 mp3 187 個' in r.stdout and '1.42' in r.stdout
