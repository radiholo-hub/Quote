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
def test_teacher_review_sheet_has_all_required_parts_and_three_states(tmp_path):
    run(TOOLS / 'gsat_review_sheet.py', '--out', tmp_path, '--q', '115-1')
    t = (tmp_path / 'review-115-1.html').read_text(encoding='utf8')
    for part in ('題目與選項', '官方正確答案:(B)', '中文翻譯', '解題關鍵與判斷步驟', '四個選項分析', '重要單字、搭配詞、衍生字與原創例句', '歷屆出題紀錄', '原創延伸練習與答案'):
        assert part in t, part
    assert 'The mayor has such a ______ schedule' in t and '行程排得非常緊湊' in t and 'tightness' in t and 'tight schedule' in t
    assert all(f'value="{v}"' in t for v in ('通過', '需修改', '待確認'))
    assert len(re.findall(r'value="待確認" checked', t)) == 1 and 'value="通過" checked' not in t     # 預設待確認,不會自動通過
    assert 'AI 草稿' in t and '尚未經任何人工審核' in t


@need_node
@needs_exam
def test_every_question_sheet_matches_official_answer_and_never_pre_approves(tmp_path):
    run(TOOLS / 'gsat_review_sheet.py', '--out', tmp_path)
    t = (tmp_path / 'explanation-review-sheet.html').read_text(encoding='utf8')
    assert t.count('<section') == 10 and 'value="通過" checked' not in t and '詳解答案與官方答案不一致' not in t
    assert t.count('value="待確認" checked') == 10


@need_node
@needs_exam
def test_review_sheets_refuse_to_write_inside_the_repository():
    for tool in ('gsat_review_sheet.py', 'gsat_vocab_review_sheet.py'):
        r = run(TOOLS / tool, '--out', ROOT.parent / 'tmp-review', ok=False)
        assert r.returncode != 0 and '拒絕' in (r.stdout + r.stderr) and not (ROOT.parent / 'tmp-review').exists()


@need_node
@needs_exam
def test_pending_pos_sheet_lists_every_pending_record_with_source_and_never_writes_verdicts(tmp_path):
    before = (ROOT / 'exam' / 'vocab_reviews.js').read_text(encoding='utf8')
    idx = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.VOCAB_INDEX))", str(ROOT / 'exam' / 'vocab_index.js')], capture_output=True, text=True, check=True).stdout)
    pending = sum(len(e['review']) for e in idx['entries'].values())
    sg = {}
    for eid, e in idx['entries'].items():
        for r in e['review']:
            sg[r['k']] = {'n': 0, 'actual': r['f'][0], 'pos': 'x', 'alt': 'y', 'suggest': 'confirmed', 'why': '測試', 'conf': '高', 'page': 2, 'entry': eid}
    f = tmp_path / 'sg.json'; f.write_text(json.dumps(sg, ensure_ascii=False), encoding='utf8')
    run(TOOLS / 'gsat_vocab_review_sheet.py', '--out', tmp_path, '--suggestions', f)
    t = (tmp_path / 'vocab-review-sheet.html').read_text(encoding='utf8')
    assert t.count('<tr id="r') == pending and t.count('建議:計入') == pending and '第 2 頁' in t
    assert t.index('impact-n') < t.index('crash-v') and '計入' in t and '排除' in t and '待確認' in t     # 優先詞條排在前面
    assert (ROOT / 'exam' / 'vocab_reviews.js').read_text(encoding='utf8') == before                  # 建議不會變成審核結果


@pytest.mark.skipif(shutil.which('ffprobe') is None or shutil.which('ffmpeg') is None, reason='需要 ffprobe 與 ffmpeg')
def test_audio_verifier_passes_on_the_committed_audio():
    r = run(TOOLS / 'verify_gsat_audio.py')
    assert '實際 mp3 187 個' in r.stdout and '1.42' in r.stdout
