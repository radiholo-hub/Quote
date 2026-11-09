"""教師簽核紀錄(docs/gsat/signoffs/):只有具備完整有效簽核的題目才能是 reviewed;簽核與現行資料(項目 ID、音檔、內容指紋)必須一致;
簽核後教學內容或音檔被改動會被偵測;改審核中繼資料、改別題、改無關單字不會讓簽核失效。"""
import copy
import importlib.util
import json
import shutil
import subprocess

import pytest

from conftest import ROOT, needs_exam

REPO = ROOT.parent
spec = importlib.util.spec_from_file_location('gsat_signoff', REPO / 'tools' / 'gsat_signoff.py')
so = importlib.util.module_from_spec(spec)
spec.loader.exec_module(so)
need_node = pytest.mark.skipif(shutil.which('node') is None, reason='需要 node')
pytestmark = [needs_exam, need_node]
Q1 = '115-1'


@pytest.fixture(scope='module')
def data():
    return so.load_data()


@pytest.fixture(scope='module')
def recs():
    return {json.loads(p.read_text(encoding='utf8'))['question']: json.loads(p.read_text(encoding='utf8')) for p in sorted((REPO / 'docs' / 'gsat' / 'signoffs').glob('*.json'))}


def test_every_reviewed_question_has_a_complete_valid_signoff(data, recs):
    reviewed = {i['key'] for i in data['items'] if i['e']['status'] == 'reviewed'}
    assert reviewed == set(recs)                                                          # reviewed 與簽核紀錄一一對應
    assert so.unsigned_reviewed(data, set(recs)) == []
    for k, r in recs.items():
        assert so.validate(r, data) == [], k


def test_only_q1_is_signed_off_and_the_other_nine_stay_draft(data, recs):
    assert set(recs) == {Q1}
    others = [i for i in data['items'] if i['key'] != Q1]
    assert len(others) == 9
    for i in others:
        e = i['e']
        assert e['status'] == 'draft' and e['reviewer'] is None and e['reviewedAt'] is None and not e['reviewNotes'], i['key']
    q1 = next(i for i in data['items'] if i['key'] == Q1)['e']
    assert (q1['status'], q1['reviewer'], q1['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-09') and recs[Q1]['reviewer'] == '教師（負責人）' and recs[Q1]['signedAt'] == '2026-11-09'


def test_a_question_marked_reviewed_without_a_signoff_is_caught(data, recs):
    d = copy.deepcopy(data)
    next(i for i in d['items'] if i['key'] == '115-2')['e']['status'] = 'reviewed'                 # 模擬:AI 產生的內容自己標成 reviewed
    assert so.unsigned_reviewed(d, set(recs)) == ['115-2']


def test_the_48_item_ids_match_current_data_exactly_and_all_passed(data, recs):
    rows = so.rows_of(data, Q1)
    ids = [r for r, _ in rows]
    rec_ids = [x['id'] for x in recs[Q1]['items']]
    assert len(ids) == 48 and len(set(ids)) == 48 and sorted(rec_ids) == sorted(ids)
    assert all(x['result'] == 'passed' for x in recs[Q1]['items']) and len(recs[Q1]['items']) == 48
    assert '115-1:final' in ids and all(i.startswith(Q1 + ':') for i in ids)                  # 全部屬於第 1 題


def test_the_17_signed_audio_files_exist_belong_to_q1_and_match_their_hashes(data, recs):
    a = recs[Q1]['audio']; rows = so.rows_of(data, Q1)
    q1_files = {f for _, f in rows if f}
    approved = {x['file']: x for x in a['approvedFiles']}
    assert len(rows) == 48 and sum(1 for _, f in rows if f) == 21 == a['buttonCount'] == len(a['buttons']) and len(q1_files) == 17 == a['distinctFileCount'] == len(approved)
    assert set(approved) == q1_files and {b['item']: b['file'] for b in a['buttons']} == {r: f for r, f in rows if f}
    manifest = {i['file']: i for i in data['man']['items']}
    for f, x in approved.items():
        assert (REPO / 'gsat' / 'audio' / f).exists() and f in manifest, f                      # 存在且屬於音檔清單
        assert so.hashlib.sha256((REPO / 'gsat' / 'audio' / f).read_bytes()).hexdigest() == x['sha256'] and x['result'] == 'passed'


def test_the_other_170_audio_files_are_not_marked_as_passed(data, recs):
    a = recs[Q1]['audio']
    assert a['totalAudioFiles'] == len(data['man']['items']) == 187 and a['notIncludedCount'] == 170
    approved = {x['file'] for r in recs.values() for x in r['audio']['approvedFiles']}
    assert len(approved) == 17 and len({i['file'] for i in data['man']['items']} - approved) == 170
    assert not any(k in i for i in data['man']['items'] for k in ('status', 'reviewed', 'passed', 'approved'))    # 清單本身沒有任何「已通過」標記
    assert '不在本次簽核範圍' in a['notIncluded']


def test_the_other_42_pending_vocabulary_records_are_unchanged(data):
    entries = data['index']['entries']
    pending = [r['k'] for e in entries.values() for r in e['review']]
    assert len(pending) == 42 and entries['tight-adj']['review'] == [] and entries['tight-adj']['total'] == 2
    reviews = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.VOCAB_REVIEWS))", str(ROOT / 'exam' / 'vocab_reviews.js')], capture_output=True, text=True, check=True).stdout)
    assert len(reviews) == 3 and all(k.startswith('tight-adj|') for k in reviews) and not set(pending) & set(reviews)       # 其餘 42 筆沒有任何審核紀錄
    assert {v['by'] for v in reviews.values()} == {'教師（負責人）'}


# ---------------- 內容版本保護:簽核後改了被簽核的內容要偵測得到;只改審核中繼資料或無關內容不算 ----------------
def test_fingerprint_matches_the_signed_value_and_is_stable(data, recs):
    fp = so.fingerprint(data, Q1)
    assert fp == recs[Q1]['contentFingerprint']['value'] and so.fingerprint(data, Q1) == fp


@pytest.mark.parametrize('name,mutate', [
    ('中文翻譯', lambda d: d['expl'].__setitem__('zh', d['expl']['zh'] + '。')),
    ('解題步驟', lambda d: d['expl']['key'].__setitem__(0, d['expl']['key'][0] + ' ')),
    ('選項解析', lambda d: d['expl']['options']['C'].__setitem__('why', d['expl']['options']['C']['why'] + ' ')),
    ('文法補充', lambda d: d['expl'].__setitem__('grammar', d['expl']['grammar'] + ' ')),
    ('常考句型', lambda d: d['expl']['patterns'].__setitem__(0, d['expl']['patterns'][0] + ' ')),
    ('單字中文', lambda d: d['vocab']['entries']['tight-adj'].__setitem__('zh', d['vocab']['entries']['tight-adj']['zh'] + ' ')),
    ('搭配詞', lambda d: d['vocab']['entries']['tight-adj']['coll'][0].__setitem__('zh', '改')),
    ('原創例句', lambda d: d['vocab']['entries']['tight-adj']['ex'][0].__setitem__('en', d['vocab']['entries']['tight-adj']['ex'][0]['en'] + ' ')),
    ('反義字', lambda d: d['vocab']['entries']['tight-adj']['rel']['ant'][0].__setitem__('zh', '改')),
    ('其他選項的單字', lambda d: d['vocab']['entries']['hasty-adj'].__setitem__('zh', d['vocab']['entries']['hasty-adj']['zh'] + ' ')),
    ('衍生字', lambda d: d['vocab']['entries']['tightness-n'].__setitem__('zh', d['vocab']['entries']['tightness-n']['zh'] + ' ')),
    ('片語', lambda d: d['vocab']['phrases']['arrange-an-interview'].__setitem__('zh', '改')),
    ('延伸練習', lambda d: d['ext'][0].__setitem__('explain', d['ext'][0]['explain'] + ' ')),
    ('歷屆出題紀錄', lambda d: d['index']['entries']['tight-adj'].__setitem__('total', 3)),
    ('題幹', lambda d: d['item'].__setitem__('stem', d['item']['stem'] + ' ')),
    ('官方答案', lambda d: d['item'].__setitem__('official', 'C')),
])
def test_changing_signed_teaching_content_changes_the_fingerprint(data, recs, name, mutate):
    d = copy.deepcopy(data)
    item = next(i for i in d['items'] if i['key'] == Q1)
    ctx = {'expl': item['e'], 'vocab': d['vocab'], 'ext': [x for x in item['ext']], 'index': d['index'], 'item': item}
    mutate(ctx)
    assert so.fingerprint(d, Q1) != recs[Q1]['contentFingerprint']['value'], f'{name}被修改後指紋沒有改變'


def test_changing_review_metadata_or_unrelated_content_does_not_invalidate_the_signoff(data, recs):
    sig = recs[Q1]['contentFingerprint']['value']
    d = copy.deepcopy(data)
    e = next(i for i in d['items'] if i['key'] == Q1)['e']
    e['status'] = 'draft'; e['reviewer'] = None; e['reviewedAt'] = None; e['reviewNotes'] = '改過的備註'; e['aiFlags'] = ['新的提示']      # 審核中繼資料
    d['vocab']['entries']['tight-adj']['status'] = 'reviewed'                                                                          # 詞條自己的狀態
    next(i for i in d['items'] if i['key'] == Q1)['ext'][0]['status'] = 'reviewed'
    assert so.fingerprint(d, Q1) == sig
    d2 = copy.deepcopy(data)
    next(i for i in d2['items'] if i['key'] == '115-2')['e']['zh'] = '別題被修改'                                                        # 其他題目
    d2['vocab']['entries']['amateur-adj']['zh'] = '別的單字被修改'                                                                       # 無關單字
    d2['index']['entries']['impact-n']['review'] = []                                                                                  # 其他詞條的歷屆紀錄
    assert so.fingerprint(d2, Q1) == sig


def test_changed_or_replaced_signed_audio_is_detected(data, recs, tmp_path):
    audio = tmp_path / 'audio'; shutil.copytree(REPO / 'gsat' / 'audio', audio)
    assert so.validate(recs[Q1], data, audio_dir=audio) == []
    f = recs[Q1]['audio']['approvedFiles'][0]['file']
    (audio / f).write_bytes((audio / f).read_bytes() + b'\x00')                                  # 模擬:音檔被重新合成/取代
    bad = so.validate(recs[Q1], data, audio_dir=audio)
    assert any('音檔內容已改變' in b for b in bad) and any('內容指紋不一致' in b for b in bad)
    (audio / f).unlink()                                                                           # 模擬:音檔不見
    assert any('不存在' in b or '按鈕與音檔的對應已改變' in b for b in so.validate(recs[Q1], data, audio_dir=audio))


def test_a_tampered_or_incomplete_signoff_record_is_rejected(data, recs):
    base = recs[Q1]
    r = copy.deepcopy(base); r['reviewer'] = '別人'
    assert any('審核欄位' in b for b in so.validate(r, data))
    r = copy.deepcopy(base); r['items'][5]['result'] = 'needs-revision'
    assert any('不是 passed' in b for b in so.validate(r, data))
    r = copy.deepcopy(base); r['items'].pop()
    assert any('審核項目 ID' in b for b in so.validate(r, data))
    r = copy.deepcopy(base); r['contentFingerprint']['value'] = '0' * 64
    assert any('內容指紋不一致' in b for b in so.validate(r, data))
    r = copy.deepcopy(base); r['evidence']['reviewHtmlSha256'] = 'x'
    assert any('SHA-256' in b for b in so.validate(r, data))
    r = copy.deepcopy(base); del r['audio']
    assert any('缺欄位' in b for b in so.validate(r, data))


def test_signoff_json_contains_no_exam_text(recs):
    raw = (REPO / 'docs' / 'gsat' / 'signoffs' / '115-1.json').read_text(encoding='utf8')
    for frag in ('The mayor', 'such a', 'takes weeks', 'schedule that', 'interview with her'):
        assert frag not in raw, frag
    assert set(recs[Q1]) >= {'question', 'status', 'reviewer', 'signedAt', 'scope', 'evidence', 'contentFingerprint', 'items', 'audio', 'vocabularyOccurrenceRecords'}


# ---------------- explain.js 的唯一來源與「整檔重新產生不能無聲覆蓋簽核」 ----------------
def test_no_tool_in_the_repo_generates_explain_js_or_the_other_signed_data_files():
    """explain.js 是版本控制下的唯一來源:repo 內沒有任何工具會產生它(只有 stage_site.sh 在輸出資料夾放公開版空殼)。"""
    import re
    writers = []
    for p in sorted((REPO / 'tools').iterdir()):
        if p.is_file() and p.suffix in ('.py', '.sh', '.js'):
            t = p.read_text(encoding='utf8', errors='ignore')
            if re.search(r'window\.EXPLAIN\s*=', t) and p.name != 'stage_site.sh':
                writers.append(p.name)
    assert writers == [], f'不應有工具產生 explain.js:{writers}'


def test_data_file_headers_declare_the_version_controlled_source_of_truth():
    head = (ROOT / 'exam' / 'explain.js').read_text(encoding='utf8').split('window.EXPLAIN')[0]
    assert '唯一來源' in head and '直接編輯' in head and '不得再用腳本整檔重新產生' in head and 'signoffs' in head
    assert '唯一來源' in (ROOT / 'data' / 'ext_practice.js').read_text(encoding='utf8').split('window.EXT_PRACTICE')[0]
    assert '直接編輯' in (ROOT / 'data' / 'vocab.js').read_text(encoding='utf8').split('window.VOCAB')[0]


def test_regenerating_explanations_with_draft_metadata_is_detected_not_silent(data, recs):
    """模擬舊產生流程重新產出 explain.js:第 1 題的審核欄位被覆蓋回 draft/null。簽核檢查必須明確失敗。"""
    d = copy.deepcopy(data)
    e = next(i for i in d['items'] if i['key'] == Q1)['e']
    e['status'] = 'draft'; e['reviewer'] = None; e['reviewedAt'] = None; e['reviewNotes'] = ''
    bad = so.validate(recs[Q1], d)
    assert any('explain.js' in b and '審核欄位' in b for b in bad)
    reviewed = {i['key'] for i in d['items'] if i['e']['status'] == 'reviewed'}
    assert reviewed != set(recs)                                  # test_every_reviewed_question_has_a_complete_valid_signoff 的「reviewed 與簽核紀錄一一對應」會因此失敗


def test_regular_generation_tools_do_not_touch_signed_data(tmp_path):
    """一般的產生流程(重建索引、產生審核表)只輸出到指定位置,不會改動 explain.js、簽核紀錄與審核資料;簽核檢查在流程之後仍然有效。"""
    watched = [ROOT / 'exam' / 'explain.js', REPO / 'docs' / 'gsat' / 'signoffs' / '115-1.json', ROOT / 'exam' / 'vocab_reviews.js', ROOT / 'exam' / 'vocab_index.js']
    before = {p: so.hashlib.sha256(p.read_bytes()).hexdigest() for p in watched}
    py = shutil.which('python3') or 'python3'
    for cmd in (['tools/build_vocab_index.py', '--out', str(tmp_path / 'idx.js')], ['tools/gsat_review_sheet.py', '--out', str(tmp_path / 's'), '--q', '115-1', '--no-audio'],
                ['tools/gsat_vocab_review_sheet.py', '--out', str(tmp_path / 'v')]):
        subprocess.run([py, str(REPO / cmd[0]), *cmd[1:]], check=True, capture_output=True)
    assert {p: so.hashlib.sha256(p.read_bytes()).hexdigest() for p in watched} == before
    assert subprocess.run([py, str(REPO / 'tools' / 'gsat_signoff.py'), 'check'], capture_output=True).returncode == 0
