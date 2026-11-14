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
Q2 = '115-2'
Q3 = '115-3'
Q4 = '115-4'
Q5 = '115-5'
Q6 = '115-6'
Q7 = '115-7'
Q8 = '115-8'
Q9 = '115-9'
Q10 = '115-10'
Q9_FINGERPRINT = 'f741b1656158e9e65cc2f6824058c7bf8fc322ac43a9de8d1429c9bbdb66eec2'
Q8_FINGERPRINT = '567e4c36921f0bf40cf7332818f33586b3aaad43cee97495483144d2bda3b0c1'
Q7_FINGERPRINT = 'e4af48ac8034126154d6b94138cc792e1bd9b9ef80f348eaba7c2bf34b4e2130'
Q6_FINGERPRINT = 'adcdee883305ae16189dcee9a3bd0c074056f6c5d48f658057b8e4761aeff862'
Q5_FINGERPRINT = 'be1d03ebf058dcc158193eb8bd769d5cdd7ec3e0701501074241fd42d4d34df5'
Q4_FINGERPRINT = '59ab1647b21aca94977af93efeca35116757e0ec59810139322d40e0e53c0c4b'
Q3_FINGERPRINT = '09716c7b0e67bd2611c9d3e95fcec8dd0a601a0d481f5b0cb6ce9914e2fb0b6b'
Q2_FINGERPRINT = 'ba6225f2a09f770cbeaa81bb32c915ad0e57ef8c9143b7d3e1ae135f16c50fad'
Q1_FINGERPRINT = '9255de0891e06a3f85d06f15b46144850ad1ca4dbe2aaea9ee8f94643af9c3b5'


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


def test_all_ten_questions_are_signed_off(data, recs):
    assert set(recs) == {Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10}
    others = [i for i in data['items'] if i['key'] not in recs]
    assert others == [] and len(data['items']) == 10
    q1 = next(i for i in data['items'] if i['key'] == Q1)['e']
    assert (q1['status'], q1['reviewer'], q1['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-09') and recs[Q1]['reviewer'] == '教師（負責人）' and recs[Q1]['signedAt'] == '2026-11-09'


def test_a_question_marked_reviewed_without_a_signoff_is_caught(data, recs):
    d = copy.deepcopy(data)
    assert so.unsigned_reviewed(d, set(recs) - {Q10}) == ['115-10']                                 # 模擬:題目標成 reviewed 但沒有簽核紀錄
    assert so.unsigned_reviewed(d, set(recs)) == []


def test_the_48_item_ids_match_current_data_exactly_and_all_passed(data, recs):
    rows = so.rows_of(data, Q1)
    ids = [r for r, _ in rows]
    rec_ids = [x['id'] for x in recs[Q1]['items']]
    assert len(ids) == 48 and len(set(ids)) == 48 and sorted(rec_ids) == sorted(ids)
    assert all(x['result'] == 'passed' for x in recs[Q1]['items']) and len(recs[Q1]['items']) == 48
    assert '115-1:final' in ids and all(i.startswith(Q1 + ':') for i in ids)                  # 全部屬於第 1 題


def prod_prov(audio_dir, engine='azure-paid', usage='production', approved=True):
    """測試用:假設 audio_dir 裡每個 mp3 的來源紀錄都是指定的來源(只存在於記憶體)。"""
    return {'schema': 2, 'productionEngines': ['azure-paid'], 'files': {p.name: {'engine': engine, 'usage': usage, 'productionApproved': approved,
            'sha256': so.hashlib.sha256(p.read_bytes()).hexdigest()} for p in audio_dir.glob('*.mp3')}}


@pytest.fixture(scope='module')
def passed_rec(data, recs):
    """測試用的「假設已重新簽核」紀錄：以現行音檔合成（略過來源檢查）。只存在於記憶體，不寫檔、不代表任何人工簽核。"""
    return so.approve_audio(recs[Q1], data, Q1, '測試', '2099-01-01', official_only=False)


def test_q1_audio_signoff_is_invalidated_and_nothing_is_auto_approved(data, recs):
    """Q1：文字簽核 passed；正式試聽簽核 invalidated（保留歷史）、沒有任何通過的音檔。"""
    rec = recs[Q1]; a = rec['audio']; rows = so.rows_of(data, Q1)
    q1_files = {f for _, f in rows if f}
    assert rec['status'] == 'passed' and a['status'] == 'invalidated' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0
    assert len(rows) == 48 and sum(1 for _, f in rows if f) == 21 == a['buttonCount'] == len(a['buttons']) and len(q1_files) == 17
    assert {b['item']: b['file'] for b in a['buttons']} == {r: f for r, f in rows if f}
    prev = {x['file']: x['sha256'] for x in a['previousApproval']['approvedFiles']}
    assert set(prev) == q1_files and len(prev) == 17                                                  # 歷史：先前通過的是這 17 個檔名
    assert 'edge-tts' in a['reason'] and 'filesInRepository'.lower() not in a['reason'].lower() and 'Azure paid' in a['reason']


def test_matching_sha256_of_old_edge_tts_files_cannot_restore_a_production_signoff(data, recs):
    """公開樹裡的 edge-tts 檔案，雜湊可能剛好與舊簽核相同；就算把 status 改回 passed，也因來源不是 azure-paid 而不成立。"""
    forged = copy.deepcopy(recs[Q1]); a = forged['audio']
    a['status'] = 'passed'; a['approvedFiles'] = copy.deepcopy(a['previousApproval']['approvedFiles']); a['distinctFileCount'] = 17; a['notIncludedCount'] = 170
    audio = REPO / 'gsat' / 'audio'
    cur = {x['file']: so.hashlib.sha256((audio / x['file']).read_bytes()).hexdigest() for x in a['approvedFiles']}
    if all(cur[x['file']] == x['sha256'] for x in a['approvedFiles']):                                   # 公開樹:雜湊確實相同
        assert not [b for b in so.validate(forged, data) if '音檔內容已改變' in b]
    bad = so.validate(forged, data)
    assert any('不得包含非 production 來源' in b and 'edge-tts' in b for b in bad)


@pytest.mark.parametrize('engine,usage,approved', [('edge-tts', 'unofficial-not-deployable', False), ('azure-free-test', 'development-test-only', False),
                                                  ('azure-paid', 'development-test-only', False), ('azure-paid', 'production', False), ('azure-free-test', 'production', True)])
def test_passed_audio_signoff_requires_azure_paid_production_provenance(data, passed_rec, engine, usage, approved):
    audio = REPO / 'gsat' / 'audio'
    assert so.validate(passed_rec, data, prov_rec=prod_prov(audio)) == []                                 # 來源正確時成立（同樣的雜湊）
    bad = so.validate(passed_rec, data, prov_rec=prod_prov(audio, engine, usage, approved))
    assert any('不得包含非 production 來源' in b for b in bad), (engine, usage, approved)
    r = prod_prov(audio); r['files'].pop(passed_rec['audio']['approvedFiles'][0]['file'])                                         # 沒有來源紀錄
    assert any('無紀錄' in b for b in so.validate(passed_rec, data, prov_rec=r))


def test_no_audio_file_is_marked_as_passed_anywhere(data, recs):
    a = recs[Q1]['audio']
    assert a['totalAudioFiles'] == len(data['man']['items']) == 187 and a['notIncludedCount'] == 187
    assert all(r['audio']['approvedFiles'] == [] and r['audio']['status'] in ('invalidated', 'pending') for r in recs.values())      # Q1 作廢、Q2 尚未簽核；沒有任何通過的音檔
    assert (recs[Q1]['audio']['status'], recs[Q2]['audio']['status'], recs[Q3]['audio']['status'], recs[Q4]['audio']['status'], recs[Q5]['audio']['status'], recs[Q6]['audio']['status'], recs[Q7]['audio']['status'], recs[Q8]['audio']['status'], recs[Q9]['audio']['status'], recs[Q10]['audio']['status']) == ('invalidated', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending')
    assert not any(k in i for i in data['man']['items'] for k in ('status', 'reviewed', 'passed', 'approved'))    # 清單本身沒有任何「已通過」標記
    assert '不得視為已通過' in a['notIncluded']


def test_a_resigned_audio_record_would_cover_exactly_the_17_q1_files(data, passed_rec):
    a = passed_rec['audio']
    assert a['status'] == 'passed' and a['distinctFileCount'] == 17 and a['notIncludedCount'] == 170 and a['buttonCount'] == 21
    assert so.validate(passed_rec, data, prov_rec=prod_prov(REPO / 'gsat' / 'audio')) == []


DREAD_KEY = 'dread-v|115|115:vocab:1|6|answer|選項 (A)'
IMPACT_KEY = 'impact-n|115|115:vocab:1|7|distractor|選項 (B)'
Q9_KEYS = ['elbow-v|115|115:vocab:1|9|answer|選項 (C)', 'crash-v|115|115:vocab:1|9|distractor|選項 (A)', 'tumble-v|115|115:vocab:1|9|distractor|選項 (B)', 'struggle-v|115|115:vocab:1|9|distractor|選項 (D)']
Q10_KEYS = ['grave-adj|115|115:vocab:1|10|answer|選項 (D)', 'swift-adj|115|115:vocab:1|10|distractor|選項 (A)']
GRAVITY_PENDING_COUNT = 2
CRASH_PENDING = ['crash-v|114|114:cloze:16-20|16|distractor|選項 (A)']
STRUGGLE_PENDING = ['struggle-v|106|106:reading:45-48||passage|文章第 2 段', 'struggle-v|112|112:cloze:11-15||passage|文章第 3 段']
STRESS_PENDING = ['stress-v|110|110:bank:31-40||passage|文章第 1 段', 'stress-v|111|111:cloze:16-20||passage|文章第 2 段', 'stress-v|111|111:cloze:16-20||passage|文章第 3 段', 'stress-v|115|115:vocab:1|6|distractor|選項 (B)']
ESCAPE_PENDING = ['escape-v|106|106:reading:49-52|51|distractor|選項 (D)', 'escape-v|108|108:reading:53-56|54|distractor|選項 (D)', 'escape-v|114|114:vocab:1|7|stem|題幹',
                  'escape-v|115|115:reading:35-38||passage|文章第 4 段', 'escape-v|115|115:reading:39-42||passage|文章第 4 段', 'escape-v|115|115:vocab:1|6|distractor|選項 (D)']
IMPACT_PENDING = ['impact-n|107|107:reading:49-52||passage|文章第 3 段', 'impact-n|109|109:reading:41-44||passage|文章第 5 段', 'impact-n|109|109:reading:49-52||passage|文章第 2 段', 'impact-n|110|110:bank:31-40||passage|文章第 3 段',
                  'impact-n|110|110:cloze:26-30||passage|文章第 3 段', 'impact-n|111|111:reading:39-42||passage|文章第 2 段', 'impact-n|114|114:reading:39-42||passage|文章第 2 段', 'impact-n|114|114:reading:39-42||passage|文章第 3 段',
                  'impact-n|114|114:reading:43-46|43|distractor|選項 (B)']


def test_the_other_33_pending_vocabulary_records_are_unchanged_and_only_the_adjudicated_ones_left_pending(data):
    """全站待審核 41 → 33：只有教師裁定的 dread（Q6）、impact（Q7）、Q9 的 elbow／crash／tumble／struggle 四筆與 Q10 的 grave／swift 兩筆離開待審核；其餘未裁定紀錄逐筆都還在（含 gravity 2 筆）。已確認共 85 次。"""
    entries = data['index']['entries']
    pending = [r['k'] for e in entries.values() for r in e['review']]
    assert len(pending) == 33 and len(set(pending)) == 33 and DREAD_KEY not in pending and IMPACT_KEY not in pending and not set(Q9_KEYS) & set(pending) and not set(Q10_KEYS) & set(pending)
    assert sum(e['total'] for e in entries.values()) == 85
    assert entries['tight-adj']['review'] == [] and entries['tight-adj']['total'] == 2
    assert entries['amateur-adj']['review'] == [] and entries['amateur-adj']['total'] == 1 and entries['amateur-adj']['role']['answer'] == 1      # Q2:教師 2026-11-11 裁定 amateur 為 115 第 2 題正確答案
    d = entries['dread-v']                                                                                                                    # Q6:教師 2026-11-13 裁定 dread 為 115 第 6 題正確答案
    assert (d['total'], d['role'], d['review'], d.get('rejected', []), d['years'], d['first'], d['last']) == (1, {'answer': 1, 'distractor': 0, 'stem': 0, 'passage': 0}, [], [], ['115'], '115', '115')
    assert [(r['k'], r['role'], r['n'], r['loc'], r['exact'], r['reviewed']) for r in d['records']] == [(DREAD_KEY, 'answer', 6, '選項 (A)', True, '教師（負責人）')]
    i = entries['impact-n']                                                                                                                   # Q7:教師 2026-11-13 裁定 impact 為 115 第 7 題選項 B 的干擾選項（名詞）
    assert (i['total'], i['role'], i.get('rejected', []), i['years'], i['first'], i['last']) == (1, {'answer': 0, 'distractor': 1, 'stem': 0, 'passage': 0}, [], ['115'], '115', '115')
    assert [(r['k'], r['role'], r['n'], r['loc'], r['exact'], r['reviewed']) for r in i['records']] == [(IMPACT_KEY, 'distractor', 7, '選項 (B)', True, '教師（負責人）')]
    assert [r['k'] for r in i['review']] == IMPACT_PENDING                                                                                    # 其餘 9 筆仍待審核
    assert [r['k'] for r in entries['stress-v']['review']] == STRESS_PENDING and entries['stress-v']['total'] == 0 and entries['stress-v'].get('rejected', []) == []
    assert [r['k'] for r in entries['escape-v']['review']] == ESCAPE_PENDING and entries['escape-v']['total'] == 0 and entries['escape-v'].get('rejected', []) == []
    w = entries['wander-v']
    assert (w['total'], w['role'], w['review'], w.get('rejected', [])) == (4, {'answer': 0, 'distractor': 1, 'stem': 0, 'passage': 3}, [], [])
    assert (entries['passion-n']['total'], entries['passion-n']['role'], entries['passion-n']['review']) == (1, {'answer': 1, 'distractor': 0, 'stem': 0, 'passage': 0}, [])
    assert (entries['resource-n']['total'], entries['resource-n']['role'], entries['resource-n']['review']) == (9, {'answer': 2, 'distractor': 2, 'stem': 1, 'passage': 4}, [])
    assert (entries['emphasis-n']['total'], entries['emphasis-n']['role'], entries['emphasis-n']['review']) == (1, {'answer': 0, 'distractor': 1, 'stem': 0, 'passage': 0}, [])
    reviews = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.VOCAB_REVIEWS))", str(ROOT / 'exam' / 'vocab_reviews.js')], capture_output=True, text=True, check=True).stdout)
    assert len(reviews) == 12 and sorted(k.split('|')[0] for k in reviews) == ['amateur-adj', 'crash-v', 'dread-v', 'elbow-v', 'grave-adj', 'impact-n', 'struggle-v', 'swift-adj', 'tight-adj', 'tight-adj', 'tight-adj', 'tumble-v'] and not set(pending) & set(reviews)       # 其餘 33 筆沒有任何審核紀錄
    assert reviews[DREAD_KEY] == {'verdict': 'confirmed', 'by': '教師（負責人）', 'at': '2026-11-13'} and reviews[IMPACT_KEY] == {'verdict': 'confirmed', 'by': '教師（負責人）', 'at': '2026-11-13'}
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


def test_changed_or_replaced_signed_audio_is_detected(data, passed_rec, tmp_path):
    """音檔內容改變：試聽簽核失效（要求作廢），但教學文字的簽核與內容指紋不受影響。"""
    audio = tmp_path / 'audio'; shutil.copytree(REPO / 'gsat' / 'audio', audio)
    assert so.validate(passed_rec, data, audio_dir=audio, prov_rec=prod_prov(audio)) == []
    f = passed_rec['audio']['approvedFiles'][0]['file']
    (audio / f).write_bytes((audio / f).read_bytes() + b'\x00')                                  # 模擬:音檔被重新合成/取代
    bad = so.validate(passed_rec, data, audio_dir=audio)
    assert any('音檔內容已改變' in b for b in bad) and not any('內容指紋不一致' in b for b in bad)
    assert so.audio_changed(passed_rec, audio) == [f]
    (audio / f).unlink()                                                                           # 模擬:音檔不見
    assert any('不存在' in b or '按鈕與音檔的對應已改變' in b for b in so.validate(passed_rec, data, audio_dir=audio))


def test_replacing_all_audio_invalidates_only_the_listening_signoff_never_approves_anything(data, passed_rec, tmp_path):
    """正式 TTS 重產 187 個 mp3 之後：文字簽核仍有效；17 個試聽簽核作廢；沒有任何新檔被標為通過。"""
    audio = tmp_path / 'audio'; audio.mkdir()
    for p in (REPO / 'gsat' / 'audio').glob('*.mp3'):
        (audio / p.name).write_bytes(p.read_bytes() + b'new-engine')                              # 全部換成不同內容
    old = passed_rec; changed = so.audio_changed(old, audio)
    assert len(changed) == 17
    new = so.invalidate_audio(old, '2026-12-01', '音檔重新產生')
    assert so.validate(new, data, audio_dir=audio) == []                                            # 文字簽核＋作廢後的音檔狀態整體有效
    assert so.fingerprint(data, Q1, audio) == old['contentFingerprint']['value']                      # 文字指紋沒變
    a = new['audio']
    assert a['status'] == 'invalidated' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['notIncludedCount'] == a['totalAudioFiles'] == 187
    assert a['previousApproval']['approvedFiles'] == old['audio']['approvedFiles'] and a['reason'] and a['invalidatedAt'] == '2026-12-01'
    assert new['status'] == 'passed' and new['items'] == old['items']                                 # 教學文字簽核維持
    assert all(x['result'] == 'passed' for x in a['previousApproval']['approvedFiles']) and not any(x.get('result') == 'passed' for x in a['approvedFiles'])
    assert so.audio_changed(new, audio) == []                                                         # 已作廢，不重複處理
    forged = copy.deepcopy(new); forged['audio']['approvedFiles'] = old['audio']['approvedFiles']
    assert any('不得仍列有' in b for b in so.validate(forged, data, audio_dir=audio))                  # 作廢後不能偷偷帶著「已通過」
    half = copy.deepcopy(new); half['audio']['reason'] = ''
    assert any('缺少原因' in b for b in so.validate(half, data, audio_dir=audio))
    # 若只改音檔卻沒有作廢，驗證會失敗（不能默默沿用舊的試聽簽核）
    assert any('音檔內容已改變' in b for b in so.validate(old, data, audio_dir=audio))


def test_audio_reapproval_requires_explicit_human_confirmation_and_official_source(data, passed_rec, tmp_path):
    audio = tmp_path / 'audio'; audio.mkdir()
    for p in (REPO / 'gsat' / 'audio').glob('*.mp3'):
        (audio / p.name).write_bytes(p.read_bytes() + b'new-engine')
    inv = so.invalidate_audio(passed_rec, '2026-12-01', 'x')
    with pytest.raises(SystemExit):                                                                    # 來源紀錄仍是 edge-tts／雜湊不符 → 不能簽
        so.approve_audio(inv, data, Q1, '教師（負責人）', '2026-12-02', audio_dir=audio)
    r = subprocess.run(['python3', str(REPO / 'tools' / 'gsat_signoff.py'), 'approve-audio', Q1, '--reviewer', 'x', '--date', '2026-12-02'], capture_output=True, text=True)
    assert r.returncode != 0 and '--confirm-listened' in r.stdout + r.stderr                           # 沒有人工確認旗標就拒絕
    ok = so.approve_audio(inv, data, Q1, '教師（負責人）', '2026-12-02', audio_dir=audio, official_only=False)     # 僅供測試：略過來源檢查
    assert ok['audio']['status'] == 'passed' and ok['audio']['distinctFileCount'] == 17 and ok['audio']['notIncludedCount'] == 170
    assert so.validate(ok, data, audio_dir=audio, prov_rec=prod_prov(audio)) == []


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


def test_explain_review_notes_do_not_hardcode_audio_pass_counts(data):
    """reviewNotes 不記載音檔通過數量（音檔會更換來源）；音檔驗收狀態只以簽核紀錄的 audio 區塊為準。"""
    import re
    for i in data['items']:
        n = i['e'].get('reviewNotes') or ''
        assert not re.search(r'\d+\s*個\s*(不同\s*)?(mp3|音檔)', n) and '已人工試聽' not in n, i['key']
    assert '115-1.json' in next(i for i in data['items'] if i['key'] == Q1)['e']['reviewNotes']


def test_q1_f0_dev_quality_check_is_history_only_and_its_files_are_not_in_the_repository(data, recs):
    """教師已聽過 17 個 Azure F0 開發測試音檔（2026-11-10）：記為 devTestChecks 歷史；這批檔案未放入公開 repository，
    所以 SHA-256 與 repository 現有（edge-tts）檔案不同是正常的；音檔簽核仍是 invalidated，沒有 approvedFiles。"""
    rec = recs[Q1]; a = rec['audio']; q1_files = {f for _, f in so.rows_of(data, Q1) if f}
    assert len(a['devTestChecks']) == 1
    c = a['devTestChecks'][0]
    assert c['result'] == 'passed' and c['reviewer'] == '教師（負責人）' and c['checkedAt'] == '2026-11-10'
    assert c['engine'] == 'azure-free-test' and c['tier'] == 'F0' and c['usage'] == 'development-test-only' and c['productionApproved'] is False
    assert c['purpose'] == 'development-test audio quality check' and {x['file'] for x in c['files']} == q1_files and len(c['files']) == 17
    assert c['filesInRepository'] is False and '未放入公開 Git repository' in c['note'] and '不是 production 試聽簽核' in c['note']
    repo_hashes = {so.hashlib.sha256(p.read_bytes()).hexdigest() for p in (REPO / 'gsat' / 'audio').glob('*.mp3')}
    assert not ({x['sha256'] for x in c['files']} & repo_hashes)                                       # 那 17 個 F0 檔案不在 repository 的任何一個 mp3 裡
    assert rec['status'] == 'passed' and a['status'] == 'invalidated' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert len(prov) == 187 and all(e['engine'] == 'edge-tts' and e['productionApproved'] is False and e['usage'] == 'unofficial-not-deployable' for e in prov.values())


def test_a_dev_check_cannot_pose_as_production_signoff(data, recs):
    base = recs[Q1]
    for field, value in (('productionApproved', True), ('usage', 'production'), ('engine', 'azure-paid'), ('purpose', 'production signoff'), ('result', 'failed')):
        r = copy.deepcopy(base); r['audio']['devTestChecks'][0][field] = value
        assert any('devTestChecks' in b for b in so.validate(r, data)), field
    r = copy.deepcopy(base); r['audio']['approvedFiles'] = base['audio']['previousApproval']['approvedFiles']          # 不能靠開發檢查把 invalidated 偷改成有已通過的檔案
    assert any('不得仍列有' in b for b in so.validate(r, data))
    ap = subprocess.run(['python3', str(REPO / 'tools' / 'gsat_signoff.py'), 'approve-audio', Q1, '--reviewer', 'x', '--date', '2026-11-10', '--confirm-listened'], capture_output=True, text=True)
    assert ap.returncode != 0 and 'azure-paid' in ap.stdout + ap.stderr                                              # F0 檔案仍不能取得正式試聽簽核
    assert json.loads((REPO / 'docs' / 'gsat' / 'signoffs' / '115-1.json').read_text(encoding='utf8'))['audio']['status'] == 'invalidated'


def test_dev_check_survives_a_later_paid_regeneration_as_history_only(data, recs):
    inv = so.invalidate_audio(recs[Q1], '2027-01-01', 'x')
    assert inv['audio']['devTestChecks'] == recs[Q1]['audio']['devTestChecks'] and so.validate(inv, data) == []
    ok = so.approve_audio(inv, data, Q1, '教師（負責人）', '2027-01-02', official_only=False)      # 僅測試；真實流程只接受 azure-paid
    assert ok['audio']['status'] == 'passed' and ok['audio']['devTestChecks'] == recs[Q1]['audio']['devTestChecks']


def test_q2_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q2（115-2）文字簽核：41 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔。"""
    r = recs[Q2]; rows = so.rows_of(data, Q2); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q2, 'passed', '教師（負責人）', '2026-11-11')
    assert len(ids) == 41 and len(set(ids)) == 41 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert all(i.startswith(Q2 + ':') for i in ids) and '115-2:key3' in ids and '115-2:optD' in ids and '115-2:ext:x115-2-a' in ids and '115-2:ext:x115-2-b' in ids
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q2) and so.validate(r, data) == []
    assert r['scope'].startswith('115 學年度學測英文第 2 題:教學文字內容') and '不含發音' in r['scope'] and '原創延伸練習' in r['scope']
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 and 'devTestChecks' not in a
    assert {b['item']: b['file'] for b in a['buttons']} == {x: f for x, f in rows if f}
    e = next(i for i in data['items'] if i['key'] == Q2)['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-11') and '115-2.json' in e['reviewNotes'] and not e.get('aiFlags')
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert not any(e['productionApproved'] for e in prov.values())                                     # 沒有任何 production-approved 音檔


def test_q1_fingerprint_is_unchanged_by_q2_signoff(data, recs):
    assert so.fingerprint(data, Q1) == recs[Q1]['contentFingerprint']['value'] == Q1_FINGERPRINT
    assert recs[Q1]['audio']['status'] == 'invalidated' and recs[Q1]['audio']['devTestChecks'][0]['result'] == 'passed'


def test_q2_fingerprint_protects_the_signed_text(data, recs):
    """被簽核的 Q2 文字內容只要有任何改動，內容指紋就改變（signoff check 會失敗）。"""
    sig = recs[Q2]['contentFingerprint']['value']
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q2) != sig
    item = lambda d: next(i for i in d['items'] if i['key'] == Q2)
    assert changed(lambda d: item(d)['e']['key'].__setitem__(2, item(d)['e']['key'][2] + '。'))                      # 解題步驟 3
    assert changed(lambda d: item(d)['e']['options']['D'].__setitem__('why', 'x'))                                  # 選項 D
    assert changed(lambda d: item(d)['ext'][0].__setitem__('explain', 'x'))                                         # 延伸練習 a
    assert changed(lambda d: item(d)['ext'][1].__setitem__('explain', 'x'))                                         # 延伸練習 b
    assert changed(lambda d: d['vocab']['entries']['amateur-adj'].__setitem__('note', 'x'))                         # 單字詞條說明
    assert changed(lambda d: d['index']['entries']['amateur-adj']['role'].__setitem__('answer', 0))                 # 歷屆出題紀錄（confirmed 裁定）
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                   # 中文翻譯
    # 審核中繼資料、別題、無關單字不影響
    def meta(d):
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; d['vocab']['entries']['amateur-adj']['status'] = 'reviewed'
        next(i for i in d['items'] if i['key'] == '115-7')['e']['zh'] = '別題'; d['vocab']['entries']['tight-adj']['zh'] = '別字'
    assert not changed(meta)
    d = copy.deepcopy(data); item(d)['e']['key'][2] += '。'
    sigd = copy.deepcopy(recs[Q2])
    assert so.fingerprint(d, Q2) != sigd['contentFingerprint']['value']


def test_pending_audio_signoff_cannot_hide_approved_files(data, recs):
    r = copy.deepcopy(recs[Q2]); r['audio']['approvedFiles'] = [{'file': 'x.mp3', 'sha256': 'a' * 64, 'result': 'passed'}]
    assert any('不得列有' in b for b in so.validate(r, data))
    r = copy.deepcopy(recs[Q2]); r['audio']['notIncludedCount'] = 100
    assert any('pending' in b for b in so.validate(r, data))
    r = copy.deepcopy(recs[Q2]); r['audio']['status'] = 'passed'                                                    # 手改成 passed：沒有已簽核的音檔與來源，不成立
    assert so.validate(r, data) != []


def test_amateur_confirmed_review_is_kept_in_q2_signoff(data):
    e = data['index']['entries']['amateur-adj']
    assert (e['total'], e['role']['answer'], e['role']['distractor'], e['role']['stem'], e['role']['passage'], e['review']) == (1, 1, 0, 0, 0, [])


def test_q3_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q3（115-3）文字簽核：38 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔。"""
    r = recs[Q3]; rows = so.rows_of(data, Q3); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q3, 'passed', '教師（負責人）', '2026-11-12')
    assert r['evidence']['reviewHtmlSha256'] == 'f40e2d7ac0d2627e56042be0a61c5e1a16c812ff0f7e32fe8ff682792e7c54c1'
    assert len(ids) == 38 and len(set(ids)) == 38 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert all(i.startswith(Q3 + ':') for i in ids) and {'115-3:zh', '115-3:key1', '115-3:optC', '115-3:optD', '115-3:ph:a-dozen', '115-3:gram', '115-3:ext:x115-3-a', '115-3:ext:x115-3-b'} <= set(ids)
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q3) and so.validate(r, data) == []
    assert '重點字的歷屆出題紀錄' in r['scope'] and '原創延伸練習' in r['scope'] and '不含發音' in r['scope']
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 and 'devTestChecks' not in a
    e = next(i for i in data['items'] if i['key'] == Q3)['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-12') and '115-3.json' in e['reviewNotes']
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert not any(x['productionApproved'] for x in prov.values())


def test_q1_and_q2_fingerprints_are_unchanged_by_q3_signoff(data, recs):
    assert so.fingerprint(data, Q1) == recs[Q1]['contentFingerprint']['value'] == Q1_FINGERPRINT
    assert so.fingerprint(data, Q2) == recs[Q2]['contentFingerprint']['value'] == Q2_FINGERPRINT


def test_q3_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q3]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q3)
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q3) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    assert changed(lambda d: item(d)['e']['key'].__setitem__(0, 'x'))                                             # 解題步驟 1
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    assert changed(lambda d: item(d)['e']['options']['C'].__setitem__('why', 'x'))                                # 選項 C
    assert changed(lambda d: item(d)['e']['options']['D'].__setitem__('why', 'x'))                                # 選項 D
    assert changed(lambda d: item(d)['ext'][0].__setitem__('explain', 'x'))                                       # 延伸練習 a
    assert changed(lambda d: item(d)['ext'][1].__setitem__('explain', 'x'))                                       # 延伸練習 b
    assert changed(lambda d: d['vocab']['phrases']['a-dozen'].__setitem__('zh', 'x'))                             # 片語 a-dozen
    assert changed(lambda d: d['vocab']['entries']['vacancy-n'].__setitem__('note', 'x'))                         # 單字詞條
    assert changed(lambda d: d['index']['entries']['vacancy-n']['role'].__setitem__('answer', 0))                 # 歷屆出題紀錄
    def meta(d):
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; d['vocab']['entries']['vacancy-n']['status'] = 'reviewed'
        next(i for i in d['items'] if i['key'] == '115-7')['e']['zh'] = '別題'; d['vocab']['entries']['amateur-adj']['zh'] = '別字'
    assert not changed(meta)


def test_vacancy_confirmed_record_is_kept(data):
    e = data['index']['entries']['vacancy-n']
    assert (e['total'], e['role']['answer'], e['role']['distractor'], e['role']['stem'], e['role']['passage'], e['review']) == (1, 1, 0, 0, 0, [])


def test_q4_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q4（115-4）文字簽核：40 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔。"""
    r = recs[Q4]; rows = so.rows_of(data, Q4); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q4, 'passed', '教師（負責人）', '2026-11-12')
    assert r['evidence']['reviewHtmlSha256'] == 'faef3183779563dea65e582ce7796f2a6f937ba5ef47585b70492849bc6ffa93'
    assert len(ids) == 40 and len(set(ids)) == 40 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert all(i.startswith(Q4 + ':') for i in ids) and {'115-4:zh', '115-4:key1', '115-4:key2', '115-4:key3', '115-4:optB', '115-4:optC', '115-4:optD', '115-4:pat2', '115-4:gram', '115-4:w:initially-adv:note', '115-4:w:initially-adv:conf1', '115-4:ext:x115-4-a', '115-4:ext:x115-4-b'} <= set(ids)
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q4) == '59ab1647b21aca94977af93efeca35116757e0ec59810139322d40e0e53c0c4b' and so.validate(r, data) == []
    assert '重點字的歷屆出題紀錄' in r['scope'] and '原創延伸練習' in r['scope'] and '不含發音' in r['scope']
    assert 'initial-adj' in r['vocabularyOccurrenceRecords']['note'] and 'pending' in r['vocabularyOccurrenceRecords']['note']
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 and 'devTestChecks' not in a
    e = next(i for i in data['items'] if i['key'] == Q4)['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-12') and '115-4.json' in e['reviewNotes'] and not e.get('aiFlags')
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert not any(x['productionApproved'] for x in prov.values())


def test_q1_q2_q3_fingerprints_are_unchanged_by_q4_signoff(data, recs):
    assert so.fingerprint(data, Q1) == recs[Q1]['contentFingerprint']['value'] == Q1_FINGERPRINT
    assert so.fingerprint(data, Q2) == recs[Q2]['contentFingerprint']['value'] == Q2_FINGERPRINT
    assert so.fingerprint(data, Q3) == recs[Q3]['contentFingerprint']['value'] == Q3_FINGERPRINT


def test_q4_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q4]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q4)
    ini = lambda d: d['vocab']['entries']['initially-adv']
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q4) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    for n in range(3):                                                                                            # 解題步驟 1～3
        assert changed(lambda d, n=n: item(d)['e']['key'].__setitem__(n, 'x')), n
    for o in 'ABCD':                                                                                              # 選項解析
        assert changed(lambda d, o=o: item(d)['e']['options'][o].__setitem__('why', 'x')), o
    assert changed(lambda d: ini(d).__setitem__('note', 'x'))                                                     # initially 字義補充
    assert changed(lambda d: ini(d)['rel']['confusable'][0].__setitem__('note', 'x'))                             # initially vs originally 辨析
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    assert changed(lambda d: item(d)['e']['patterns'].__setitem__(1, 'x'))                                        # pat2
    assert changed(lambda d: item(d)['ext'][0].__setitem__('explain', 'x'))                                       # x115-4-a
    assert changed(lambda d: item(d)['ext'][1].__setitem__('explain', 'x'))                                       # x115-4-b
    assert changed(lambda d: d['index']['entries']['initially-adv']['role'].__setitem__('answer', 0))             # initially 已確認歷屆紀錄
    assert changed(lambda d: d['index']['entries']['initially-adv'].__setitem__('total', 3))
    def meta(d):
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; ini(d)['status'] = 'reviewed'
        next(i for i in d['items'] if i['key'] == '115-7')['e']['zh'] = '別題'; d['vocab']['entries']['vacancy-n']['zh'] = '別字'
        d['index']['entries']['initial-adj']['review'] = []                                                       # initial-adj 的 108 學年度 pending 紀錄不屬於 Q4 簽核內容
    assert not changed(meta)


def test_initially_confirmed_and_initial_adj_pending_records_are_as_signed(data):
    e = data['index']['entries']['initially-adv']
    assert (e['total'], e['role']['answer'], e['role']['distractor'], e['role']['stem'], e['role']['passage'], e['review'], e.get('rejected', [])) == (4, 1, 1, 0, 2, [], [])
    p = data['index']['entries']['initial-adj']['review']
    assert [r['k'] for r in p] == ['initial-adj|108|108:vocab:1|10|distractor|選項 (A)']                              # 這一筆維持 pending，不納入 Q4 簽核


def test_q5_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q5（115-5）文字簽核：45 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔。"""
    r = recs[Q5]; rows = so.rows_of(data, Q5); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q5, 'passed', '教師（負責人）', '2026-11-12')
    assert r['evidence']['reviewHtmlSha256'] == 'fc92354508863798d3f86910d3b84aba62f4d0e12dca496ebae8166d25f22191'
    assert len(ids) == 45 and len(set(ids)) == 45 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert all(i.startswith(Q5 + ':') for i in ids) and {'115-5:zh', '115-5:key1', '115-5:key2', '115-5:key3', '115-5:optA', '115-5:optB', '115-5:optC', '115-5:optD', '115-5:pat1', '115-5:pat2', '115-5:pat3', '115-5:gram',
                                                       '115-5:w:consumption-n:note', '115-5:w:consumption-n:conf1', '115-5:w:provision-n:note', '115-5:ext:x115-5-a', '115-5:ext:x115-5-b'} <= set(ids)
    assert not any(i.endswith(':ant') for i in ids)                                                                   # production 反義字已移除
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q5) == 'be1d03ebf058dcc158193eb8bd769d5cdd7ec3e0701501074241fd42d4d34df5' and so.validate(r, data) == []
    assert '重點字的歷屆出題紀錄' in r['scope'] and '原創延伸練習' in r['scope'] and '不含發音' in r['scope']
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 and 'devTestChecks' not in a
    e = next(i for i in data['items'] if i['key'] == Q5)['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-12') and '115-5.json' in e['reviewNotes'] and not e.get('aiFlags')
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert not any(x['productionApproved'] for x in prov.values())


def test_q1_to_q4_fingerprints_are_unchanged_by_q5_signoff(data, recs):
    for q, fp in ((Q1, Q1_FINGERPRINT), (Q2, Q2_FINGERPRINT), (Q3, Q3_FINGERPRINT), (Q4, Q4_FINGERPRINT)):
        assert so.fingerprint(data, q) == recs[q]['contentFingerprint']['value'] == fp, q


def test_q5_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q5]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q5)
    con = lambda d: d['vocab']['entries']['consumption-n']
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q5) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    for n in range(3):                                                                                            # 解題步驟 1～3
        assert changed(lambda d, n=n: item(d)['e']['key'].__setitem__(n, 'x')), n
    for o in 'ABCD':                                                                                              # 選項解析
        assert changed(lambda d, o=o: item(d)['e']['options'][o].__setitem__('why', 'x')), o
    assert changed(lambda d: con(d).__setitem__('note', 'x'))                                                     # consumption 字義補充
    assert changed(lambda d: con(d).__setitem__('zh', 'x'))                                                       # consumption 字義
    assert changed(lambda d: con(d)['coll'][2].__setitem__('zh', 'x'))                                            # 搭配詞
    assert changed(lambda d: con(d)['ex'][0].__setitem__('zh', 'x'))                                              # 例句
    assert changed(lambda d: con(d)['rel']['syn'][0].__setitem__('zh', 'x'))                                      # 同義字
    assert changed(lambda d: con(d)['rel']['confusable'][0].__setitem__('note', 'x'))                             # intake 辨析
    assert changed(lambda d: con(d)['rel']['ant'].append({'w': 'production', 'zh': '生產'}))                       # 反義字被加回去
    assert changed(lambda d: d['vocab']['entries']['consume-v'].__setitem__('zh', 'x'))                           # consume 字族
    assert changed(lambda d: d['vocab']['entries']['provision-n'].__setitem__('note', 'x'))                       # provision 字義補充
    assert changed(lambda d: d['vocab']['entries']['dimension-n'].__setitem__('zh', 'x'))
    assert changed(lambda d: d['vocab']['entries']['integration-n'].__setitem__('zh', 'x'))
    for n in range(3):                                                                                            # pat1～pat3
        assert changed(lambda d, n=n: item(d)['e']['patterns'].__setitem__(n, 'x')), n
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    assert changed(lambda d: item(d)['ext'][0].__setitem__('explain', 'x'))                                       # x115-5-a
    assert changed(lambda d: item(d)['ext'][1].__setitem__('q', 'x'))                                             # x115-5-b 題目
    assert changed(lambda d: item(d)['ext'][1].__setitem__('explain', 'x'))                                       # x115-5-b 解析
    assert changed(lambda d: d['index']['entries']['consumption-n']['role'].__setitem__('answer', 0))            # consumption 已確認歷屆紀錄
    assert changed(lambda d: d['index']['entries']['consumption-n'].__setitem__('total', 7))
    def meta(d):
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; con(d)['status'] = 'reviewed'
        next(i for i in d['items'] if i['key'] == '115-7')['e']['zh'] = '別題'; d['vocab']['entries']['vacancy-n']['zh'] = '別字'
        d['index']['entries']['initial-adj']['review'] = []                                                       # 其他詞條的 pending 紀錄不屬於 Q5 簽核內容
    assert not changed(meta)


def test_consumption_confirmed_records_and_other_option_records_are_as_signed(data):
    E = data['index']['entries']
    c = E['consumption-n']
    assert (c['total'], c['role']['answer'], c['role']['distractor'], c['role']['stem'], c['role']['passage'], c['review'], c.get('rejected', [])) == (8, 1, 2, 0, 5, [], [])
    assert [(E[k]['total'], E[k]['review'], E[k].get('rejected', [])) for k in ('dimension-n', 'integration-n')] == [(1, [], []), (1, [], [])]
    assert (E['provision-n']['total'], E['provision-n']['review'], E['provision-n'].get('rejected', [])) == (2, [], [])
    assert data['vocab']['entries']['consumption-n']['rel']['ant'] == []                                              # production 不再是 consumption 的反義字


def test_q6_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q6（115-6）文字簽核：40 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔。"""
    r = recs[Q6]; rows = so.rows_of(data, Q6); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q6, 'passed', '教師（負責人）', '2026-11-13')
    assert r['evidence']['reviewHtmlSha256'] == '10ceed55b262faf95b1debb57ac6464faaa4b0b2bdca51ab7c1227bed227bfd7'
    assert len(ids) == 40 and len(set(ids)) == 40 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert {'115-6:zh', '115-6:key1', '115-6:key2', '115-6:key3', '115-6:optA', '115-6:optB', '115-6:optC', '115-6:optD', '115-6:pat1', '115-6:pat2', '115-6:gram', '115-6:w:dread-v:note', '115-6:w:dread-v:conf1', '115-6:w:wander-v:note',
            '115-6:w:dread-v:fam:dreadful-adj', '115-6:ph:public-appearance', '115-6:rec:dread-v:確認1', '115-6:ext:x115-6-a', '115-6:ext:x115-6-b'} <= set(ids)
    assert not any('待審核' in i for i in ids)
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q6) == 'adcdee883305ae16189dcee9a3bd0c074056f6c5d48f658057b8e4761aeff862' and so.validate(r, data) == []
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['buttonCount'] == 16 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 and 'devTestChecks' not in a
    e = next(i for i in data['items'] if i['key'] == Q6)['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-13') and '115-6.json' in e['reviewNotes'] and not e.get('aiFlags')
    ext = next(i for i in data['items'] if i['key'] == Q6)['ext']
    assert ext[1]['options'] == ['dreads', 'stresses', 'wanders', 'welcomes'] and ext[1]['answer'] == 0 and ext[0]['options'] == ['giving', 'gives', 'gave', 'given'] and ext[0]['answer'] == 0
    assert 'escapes' not in ext[1]['options'] and 'to speak' not in ext[0]['options']                                                         # 已消除第二答案疑慮
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert not any(x['productionApproved'] for x in prov.values())
    assert {f'115-{n}' for n in range(1, 7)} <= {i['key'] for i in data['items'] if i['e']['status'] == 'reviewed'}


def test_q1_to_q5_fingerprints_are_unchanged_by_q6_signoff(data, recs):
    for q, fp in ((Q1, Q1_FINGERPRINT), (Q2, Q2_FINGERPRINT), (Q3, Q3_FINGERPRINT), (Q4, Q4_FINGERPRINT), (Q5, Q5_FINGERPRINT)):
        assert so.fingerprint(data, q) == recs[q]['contentFingerprint']['value'] == fp, q


def test_q6_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q6]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q6)
    V = lambda d, k: d['vocab']['entries'][k]
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q6) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    for n in range(3):                                                                                            # 解題步驟 1～3
        assert changed(lambda d, n=n: item(d)['e']['key'].__setitem__(n, 'x')), n
    for o in 'ABCD':                                                                                              # 選項解析
        assert changed(lambda d, o=o: item(d)['e']['options'][o].__setitem__('why', 'x')), o
    assert changed(lambda d: V(d, 'dread-v').__setitem__('zh', 'x'))                                              # dread 字義
    assert changed(lambda d: V(d, 'dread-v')['forms'].append('x'))                                                # dread 詞形
    assert changed(lambda d: V(d, 'dread-v').__setitem__('note', 'x'))                                            # dread note
    assert changed(lambda d: V(d, 'dread-v')['coll'][0].__setitem__('zh', 'x'))                                   # dread the thought of
    assert changed(lambda d: V(d, 'dread-v')['coll'][1].__setitem__('t', 'x'))                                    # dread + V-ing
    assert changed(lambda d: V(d, 'dread-v')['ex'][0].__setitem__('zh', 'x'))                                     # 原創例句
    assert changed(lambda d: V(d, 'dread-v')['rel']['syn'][0].__setitem__('zh', 'x'))                             # fear 同義字
    assert changed(lambda d: V(d, 'dread-v')['rel']['confusable'][0].__setitem__('note', 'x'))                    # fear / dread 辨析
    assert changed(lambda d: V(d, 'dreadful-adj').__setitem__('zh', 'x'))                                         # dreadful（字族衍生字只列詞形、詞性、字義;note 欄位不在審核表與簽核範圍內）
    assert changed(lambda d: V(d, 'stress-v').__setitem__('zh', 'x'))                                             # 本題引用的其他選項字
    assert changed(lambda d: V(d, 'wander-v').__setitem__('note', 'x'))                                           # wander note
    assert changed(lambda d: V(d, 'escape-v').__setitem__('zh', 'x'))
    assert changed(lambda d: d['vocab']['phrases']['public-appearance'].__setitem__('zh', 'x'))                   # make a public appearance 說明
    for n in range(2):                                                                                            # pat1～pat2
        assert changed(lambda d, n=n: item(d)['e']['patterns'].__setitem__(n, 'x')), n
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    for f in ('q', 'explain'):
        assert changed(lambda d, f=f: item(d)['ext'][0].__setitem__(f, 'x')), f                                   # x115-6-a
        assert changed(lambda d, f=f: item(d)['ext'][1].__setitem__(f, 'x')), f                                   # x115-6-b
    assert changed(lambda d: item(d)['ext'][1]['options'].__setitem__(3, 'escapes'))                              # x115-6-b 選項 D
    assert changed(lambda d: item(d)['ext'][0].__setitem__('answer', 1))
    assert changed(lambda d: d['index']['entries']['dread-v']['role'].__setitem__('answer', 0))                   # dread 已確認歷屆紀錄
    assert changed(lambda d: d['index']['entries']['dread-v'].__setitem__('total', 0))
    def meta(d):                                                                                                  # 審核中繼資料、別題、尚未裁定的 pending、無關單字都不影響
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; V(d, 'dread-v')['status'] = 'reviewed'
        for k in ('115-7', '115-8', '115-9', '115-10'):
            next(i for i in d['items'] if i['key'] == k)['e']['zh'] = '別題'
        V(d, 'vacancy-n')['zh'] = '別字'
        d['index']['entries']['stress-v']['review'] = []                                                          # stress 尚未裁定的 4 筆不屬於 Q6 簽核內容
        d['index']['entries']['escape-v']['review'] = []                                                          # escape 尚未裁定的 6 筆不屬於 Q6 簽核內容
        d['index']['entries']['initial-adj']['review'] = []
    assert not changed(meta)


def test_q7_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q7（115-7）文字簽核：39 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔。"""
    r = recs[Q7]; rows = so.rows_of(data, Q7); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q7, 'passed', '教師（負責人）', '2026-11-14')
    assert r['evidence']['reviewHtmlSha256'] == '15066060af5fd1dab7f3e5d6a34dab75bab957c2fe25ab1224575dc1eaa844b7'
    assert len(ids) == 39 and len(set(ids)) == 39 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert {'115-7:zh', '115-7:key1', '115-7:key2', '115-7:key3', '115-7:optA', '115-7:optB', '115-7:optC', '115-7:optD', '115-7:pat1', '115-7:gram', '115-7:w:passion-n:note', '115-7:w:passion-n:syn', '115-7:w:passion-n:ant',
            '115-7:w:passion-n:conf1', '115-7:w:passion-n:conf2', '115-7:w:passion-n:fam:passionate-adj', '115-7:w:passion-n:fam:passionately-adv', '115-7:w:emphasis-n:forms', '115-7:ph:devote-oneself',
            '115-7:rec:passion-n:確認1', '115-7:ext:x115-7-a', '115-7:ext:x115-7-b'} <= set(ids)
    assert not any('待審核' in i for i in ids)
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q7) == 'e4af48ac8034126154d6b94138cc792e1bd9b9ef80f348eaba7c2bf34b4e2130' and so.validate(r, data) == []
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['buttonCount'] == 17 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 and 'devTestChecks' not in a
    it = next(i for i in data['items'] if i['key'] == Q7); e = it['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-14') and '115-7.json' in e['reviewNotes'] and not e.get('aiFlags')
    assert it['ext'][0]['options'] == ['passion', 'access', 'effect', 'dependence'] and it['ext'][0]['answer'] == 0
    assert it['ext'][1]['options'] == ['passion', 'passionate', 'passionately', 'passions'] and it['ext'][1]['answer'] == 2
    assert it['ext'][1]['explain'].endswith('passions 是名詞複數,都不符合這個位置與句意。') and '動詞形式' not in it['ext'][1]['explain']
    assert data['vocab']['entries']['emphasis-n']['forms'] == ['emphasis', 'emphases']
    assert data['vocab']['entries']['passionate-adj']['zh'].startswith('熱情的;熱衷的')
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert not any(x['productionApproved'] for x in prov.values())
    assert {f'115-{n}' for n in range(1, 8)} <= {i['key'] for i in data['items'] if i['e']['status'] == 'reviewed'}


def test_q1_to_q6_fingerprints_are_unchanged_by_q7_signoff(data, recs):
    for q, fp in ((Q1, Q1_FINGERPRINT), (Q2, Q2_FINGERPRINT), (Q3, Q3_FINGERPRINT), (Q4, Q4_FINGERPRINT), (Q5, Q5_FINGERPRINT), (Q6, Q6_FINGERPRINT)):
        assert so.fingerprint(data, q) == recs[q]['contentFingerprint']['value'] == fp, q


def test_q7_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q7]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q7)
    V = lambda d, k: d['vocab']['entries'][k]
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q7) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    for n in range(3):                                                                                            # 解題步驟 1～3
        assert changed(lambda d, n=n: item(d)['e']['key'].__setitem__(n, 'x')), n
    for o in 'ABCD':                                                                                              # 選項解析
        assert changed(lambda d, o=o: item(d)['e']['options'][o].__setitem__('why', 'x')), o
    assert changed(lambda d: V(d, 'passion-n').__setitem__('zh', 'x'))                                            # passion 字義
    assert changed(lambda d: V(d, 'passion-n')['forms'].append('x'))                                              # 詞形
    assert changed(lambda d: V(d, 'passion-n').__setitem__('note', 'x'))                                          # 字義補充
    assert changed(lambda d: V(d, 'passion-n')['coll'][0].__setitem__('zh', 'x'))                                 # 搭配詞
    assert changed(lambda d: V(d, 'passion-n')['ex'][0].__setitem__('zh', 'x'))                                   # 例句
    assert changed(lambda d: V(d, 'passion-n')['rel']['syn'][0].__setitem__('zh', 'x'))                           # enthusiasm 同義字
    assert changed(lambda d: V(d, 'passion-n')['rel']['ant'][0].__setitem__('zh', 'x'))                           # indifference 反義字
    assert changed(lambda d: V(d, 'passion-n')['rel']['confusable'][0].__setitem__('note', 'x'))                  # hobby 辨析
    assert changed(lambda d: V(d, 'passion-n')['rel']['confusable'][1].__setitem__('note', 'x'))                  # enthusiasm 辨析
    assert changed(lambda d: V(d, 'passionate-adj').__setitem__('zh', 'x'))                                       # passionate
    assert changed(lambda d: V(d, 'passionately-adv').__setitem__('zh', 'x'))                                     # passionately
    assert changed(lambda d: V(d, 'emphasis-n')['forms'].pop())                                                   # emphasis / emphases
    assert changed(lambda d: V(d, 'impact-n').__setitem__('zh', 'x'))                                             # 本題引用的其他選項字
    assert changed(lambda d: d['vocab']['phrases']['devote-oneself'].__setitem__('zh', 'x'))                      # devote oneself to
    assert changed(lambda d: item(d)['e']['patterns'].__setitem__(0, 'x'))                                        # 句型
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    for n in range(2):
        for f in ('q', 'explain'):
            assert changed(lambda d, n=n, f=f: item(d)['ext'][n].__setitem__(f, 'x')), (n, f)                     # x115-7-a / x115-7-b
    assert changed(lambda d: item(d)['ext'][1]['options'].__setitem__(2, 'x')) and changed(lambda d: item(d)['ext'][1].__setitem__('answer', 0))
    assert changed(lambda d: d['index']['entries']['passion-n']['role'].__setitem__('answer', 0))                 # passion 已確認歷屆紀錄
    def meta(d):                                                                                                  # 審核中繼資料、別題、尚未裁定的 pending、無關單字都不影響
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; V(d, 'passion-n')['status'] = 'reviewed'
        for k in ('115-9', '115-10'):
            next(i for i in d['items'] if i['key'] == k)['e']['zh'] = '別題'
        V(d, 'vacancy-n')['zh'] = '別字'
        d['index']['entries']['impact-n']['review'] = []                                                          # impact 其餘 9 筆待審核不屬於 Q7 簽核內容
        d['index']['entries']['stress-v']['review'] = []; d['index']['entries']['escape-v']['review'] = []
    assert not changed(meta)


def test_impact_115_7_option_b_record_is_pinned_even_though_fingerprint_covers_only_the_focus_word_records(data, recs):
    """教師 2026-11-13 裁定 impact（115 第 7 題選項 B）為已確認的干擾選項。簽核的 fingerprint 只涵蓋重點字（passion）的歷屆紀錄，
    選項字 impact 的這一筆由本測試固定：紀錄本身、審核紀錄、以及它是唯一離開待審核的 impact 紀錄。"""
    i = data['index']['entries']['impact-n']
    assert [r['k'] for r in i['records']] == [IMPACT_KEY] and i['total'] == 1 and i['role']['distractor'] == 1 and len(i['review']) == 9 and IMPACT_KEY not in [r['k'] for r in i['review']]
    assert 'impact 現為已確認 1、待審核 9' in recs[Q7]['vocabularyOccurrenceRecords']['note']


def test_q8_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q8（115-8）文字簽核：37 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔；音檔基準仍是 187 筆。"""
    r = recs[Q8]; rows = so.rows_of(data, Q8); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q8, 'passed', '教師（負責人）', '2026-11-14')
    assert r['evidence']['reviewHtmlSha256'] == 'c9144d0e08e78e6743e30338cbbbf4cccd2eabe9020c8f554e5b9e5fd1916484'
    assert len(ids) == 37 and len(set(ids)) == 37 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert {'115-8:zh', '115-8:key1', '115-8:key2', '115-8:key3', '115-8:optA', '115-8:optB', '115-8:optC', '115-8:optD', '115-8:pat1', '115-8:pat2', '115-8:gram', '115-8:w:assault-v:note', '115-8:w:assault-v:coll2',
            '115-8:w:assault-v:conf1', '115-8:w:shatter-v:note', '115-8:w:condemn-v:def', '115-8:ph:drunk-driver', '115-8:rec:assault-v:確認1', '115-8:ext:x115-8-a', '115-8:ext:x115-8-b'} <= set(ids)
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q8) == '567e4c36921f0bf40cf7332818f33586b3aaad43cee97495483144d2bda3b0c1' and so.validate(r, data) == []
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['buttonCount'] == 15 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 == len(data['man']['items']) and 'devTestChecks' not in a
    it = next(i for i in data['items'] if i['key'] == Q8); e = it['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-14') and '115-8.json' in e['reviewNotes'] and not e.get('aiFlags')
    assert [c['t'] for c in data['vocab']['entries']['assault-v']['coll']] == ['assault sb. with sth.', 'be assaulted']                            # 教師決定保留 be assaulted（不動音檔）
    assert it['ext'][0]['options'] == ['assaulting', 'praising', 'assisting', 'greeting'] and it['ext'][0]['answer'] == 0
    assert it['ext'][1]['options'] == ['assaulted', 'praised', 'greeted', 'thanked'] and it['ext'][1]['answer'] == 0 and 'picked up a chair' in it['ext'][1]['q'] and 'assisted' not in it['ext'][1]['options']
    assert data['vocab']['entries']['condemn-v']['zh'] == '譴責;判刑'
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert len(prov) == 187 and not any(x['productionApproved'] for x in prov.values())
    assert {f'115-{n}' for n in range(1, 9)} <= {i['key'] for i in data['items'] if i['e']['status'] == 'reviewed'}


def test_q1_to_q7_fingerprints_are_unchanged_by_q8_signoff(data, recs):
    for q, fp in ((Q1, Q1_FINGERPRINT), (Q2, Q2_FINGERPRINT), (Q3, Q3_FINGERPRINT), (Q4, Q4_FINGERPRINT), (Q5, Q5_FINGERPRINT), (Q6, Q6_FINGERPRINT), (Q7, Q7_FINGERPRINT)):
        assert so.fingerprint(data, q) == recs[q]['contentFingerprint']['value'] == fp, q


def test_q8_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q8]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q8)
    V = lambda d, k: d['vocab']['entries'][k]
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q8) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    for n in range(3):                                                                                            # 解題步驟 1～3
        assert changed(lambda d, n=n: item(d)['e']['key'].__setitem__(n, 'x')), n
    for o in 'ABCD':                                                                                              # 選項解析
        assert changed(lambda d, o=o: item(d)['e']['options'][o].__setitem__('why', 'x')), o
    assert changed(lambda d: V(d, 'assault-v').__setitem__('zh', 'x'))                                            # assault 字義
    assert changed(lambda d: V(d, 'assault-v').__setitem__('alsoPos', 'x'))                                       # 另有詞性
    assert changed(lambda d: V(d, 'assault-v').__setitem__('note', 'x'))                                          # 備註
    assert changed(lambda d: V(d, 'assault-v')['coll'][1].__setitem__('zh', 'x'))                                 # be assaulted（保留）
    assert changed(lambda d: V(d, 'assault-v')['ex'][0].__setitem__('zh', 'x'))                                   # 例句
    assert changed(lambda d: V(d, 'assault-v')['rel']['syn'][0].__setitem__('zh', 'x'))                           # attack 同義字
    assert changed(lambda d: V(d, 'assault-v')['rel']['confusable'][0].__setitem__('note', 'x'))                  # attack vs assault
    assert changed(lambda d: V(d, 'shatter-v').__setitem__('note', 'x'))                                          # shatter 備註
    assert changed(lambda d: V(d, 'overturn-v').__setitem__('zh', 'x'))                                           # overturn
    assert changed(lambda d: V(d, 'condemn-v').__setitem__('zh', 'x'))                                            # condemn 字義
    assert changed(lambda d: d['vocab']['phrases']['drunk-driver'].__setitem__('zh', 'x'))                        # a drunk driver
    for n in range(2):                                                                                            # 句型
        assert changed(lambda d, n=n: item(d)['e']['patterns'].__setitem__(n, 'x')), n
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    for n in range(2):
        for f in ('q', 'explain'):
            assert changed(lambda d, n=n, f=f: item(d)['ext'][n].__setitem__(f, 'x')), (n, f)                     # x115-8-a / x115-8-b
    assert changed(lambda d: item(d)['ext'][0]['options'].__setitem__(1, 'x')) and changed(lambda d: item(d)['ext'][1]['options'].__setitem__(3, 'assisted'))
    assert changed(lambda d: d['index']['entries']['assault-v']['role'].__setitem__('answer', 0))                 # assault 已確認歷屆紀錄
    def meta(d):                                                                                                  # 審核中繼資料、別題、無關單字都不影響
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; V(d, 'assault-v')['status'] = 'reviewed'
        for k in ('115-9', '115-10'):
            next(i for i in d['items'] if i['key'] == k)['e']['zh'] = '別題'
        V(d, 'vacancy-n')['zh'] = '別字'
        d['index']['entries']['impact-n']['review'] = []; d['index']['entries']['stress-v']['review'] = []; d['index']['entries']['escape-v']['review'] = []
    assert not changed(meta)


def test_q8_option_word_historical_records_are_pinned(data):
    """選項字（shatter、overturn、condemn）的歷屆紀錄不在 fingerprint（只含重點字 assault），由本測試固定：各 1 筆已確認的 115 第 8 題干擾選項，沒有待審核。"""
    E = data['index']['entries']
    for w, (role, loc) in {'assault-v': ('answer', '選項 (B)'), 'shatter-v': ('distractor', '選項 (A)'), 'overturn-v': ('distractor', '選項 (C)'), 'condemn-v': ('distractor', '選項 (D)')}.items():
        e = E[w]
        assert (e['total'], e['years'], e['first'], e['last'], e['review'], e.get('rejected', [])) == (1, ['115'], '115', '115', [], []), w
        assert [(r['role'], r['n'], r['loc'], r['exact']) for r in e['records']] == [(role, 8, loc, True)], w


def test_q9_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q9（115-9）文字簽核：40 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔；音檔基準仍是 187 筆。"""
    r = recs[Q9]; rows = so.rows_of(data, Q9); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q9, 'passed', '教師（負責人）', '2026-11-14')
    assert r['evidence']['reviewHtmlSha256'] == 'e3fe947005ef63882ceb261babb3e0b7a5320c7779a656a2528d7ffd22395532'
    assert len(ids) == 40 and len(set(ids)) == 40 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert {'115-9:zh', '115-9:key1', '115-9:key2', '115-9:key3', '115-9:key4', '115-9:optA', '115-9:optB', '115-9:optC', '115-9:optD', '115-9:pat1', '115-9:pat2', '115-9:gram', '115-9:w:elbow-v:note', '115-9:w:elbow-v:conf1',
            '115-9:w:elbow-v:syn', '115-9:ph:board-the-bus', '115-9:rec:elbow-v:確認1', '115-9:ext:x115-9-a', '115-9:ext:x115-9-b'} <= set(ids)
    assert not any('待審核' in i for i in ids)
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q9) == 'f741b1656158e9e65cc2f6824058c7bf8fc322ac43a9de8d1429c9bbdb66eec2' and so.validate(r, data) == []
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['buttonCount'] == 15 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 == len(data['man']['items']) and 'devTestChecks' not in a
    it = next(i for i in data['items'] if i['key'] == Q9); e = it['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-14') and '115-9.json' in e['reviewNotes'] and not e.get('aiFlags')
    assert len(e['key']) == 4 and e['key'][3].startswith('注意:官方答案為 (C) elbow,但 struggle one’s way through the crowd 在自然英文中也可以成立') and '「干擾選項」只表示它在該官方試題中的角色,不代表這個英文用法本身錯誤' in e['key'][3]
    assert 'struggle 不與 one’s way 搭配' not in json.dumps(e, ensure_ascii=False) and '只有 elbow' not in json.dumps(e, ensure_ascii=False)
    assert data['vocab']['phrases']['board-the-bus']['t'] == 'board the bus' and 'board 是及物動詞' in data['vocab']['phrases']['board-the-bus']['zh']          # 片語 t 不動（音檔對應）
    assert it['ext'][0]['options'] == ['elbowed', 'struggled', 'boarded', 'tumbled'] and it['ext'][0]['answer'] == 0
    assert it['ext'][1]['options'] == ['struggled', 'elbowed', 'boarded', 'condemned'] and it['ext'][1]['answer'] == 0
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert len(prov) == 187 and not any(x['productionApproved'] for x in prov.values())
    assert {f'115-{n}' for n in range(1, 10)} <= {i['key'] for i in data['items'] if i['e']['status'] == 'reviewed'}


def test_q1_to_q8_fingerprints_are_unchanged_by_q9_signoff(data, recs):
    for q, fp in ((Q1, Q1_FINGERPRINT), (Q2, Q2_FINGERPRINT), (Q3, Q3_FINGERPRINT), (Q4, Q4_FINGERPRINT), (Q5, Q5_FINGERPRINT), (Q6, Q6_FINGERPRINT), (Q7, Q7_FINGERPRINT), (Q8, Q8_FINGERPRINT)):
        assert so.fingerprint(data, q) == recs[q]['contentFingerprint']['value'] == fp, q


def test_q9_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q9]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q9)
    V = lambda d, k: d['vocab']['entries'][k]
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q9) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    for n in range(4):                                                                                            # 解題步驟 1～4（含學生可見的辨析提示）
        assert changed(lambda d, n=n: item(d)['e']['key'].__setitem__(n, 'x')), n
    for o in 'ABCD':                                                                                              # 選項解析
        assert changed(lambda d, o=o: item(d)['e']['options'][o].__setitem__('why', 'x')), o
    assert changed(lambda d: V(d, 'elbow-v').__setitem__('zh', 'x'))                                              # elbow 字義
    assert changed(lambda d: V(d, 'elbow-v')['forms'].append('x'))                                                # 詞形
    assert changed(lambda d: V(d, 'elbow-v').__setitem__('alsoPos', 'x'))                                         # 另有詞性
    assert changed(lambda d: V(d, 'elbow-v').__setitem__('note', 'x'))                                            # note
    for n in range(2):                                                                                            # 搭配詞
        assert changed(lambda d, n=n: V(d, 'elbow-v')['coll'][n].__setitem__('zh', 'x')), n
    assert changed(lambda d: V(d, 'elbow-v')['ex'][0].__setitem__('zh', 'x'))                                     # 例句
    assert changed(lambda d: V(d, 'elbow-v')['rel']['syn'][1].__setitem__('zh', 'x'))                             # shove
    assert changed(lambda d: V(d, 'elbow-v')['rel']['confusable'][0].__setitem__('note', 'x'))                    # push / shove 辨析
    for w in ('crash-v', 'tumble-v', 'struggle-v'):                                                               # 本題引用的其他選項字
        assert changed(lambda d, w=w: V(d, w).__setitem__('zh', 'x')), w
    assert changed(lambda d: d['vocab']['phrases']['board-the-bus'].__setitem__('zh', 'x'))                       # board the bus
    for n in range(2):                                                                                            # 句型
        assert changed(lambda d, n=n: item(d)['e']['patterns'].__setitem__(n, 'x')), n
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    for n in range(2):
        for f in ('q', 'explain'):
            assert changed(lambda d, n=n, f=f: item(d)['ext'][n].__setitem__(f, 'x')), (n, f)                     # x115-9-a / x115-9-b
    assert changed(lambda d: item(d)['ext'][0]['options'].__setitem__(1, 'x')) and changed(lambda d: item(d)['ext'][1].__setitem__('answer', 1))
    assert changed(lambda d: d['index']['entries']['elbow-v']['role'].__setitem__('answer', 0))                   # elbow 已確認歷屆紀錄
    def meta(d):                                                                                                  # 審核中繼資料、別題、尚未裁定的 pending、無關單字都不影響
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; V(d, 'elbow-v')['status'] = 'reviewed'
        next(i for i in d['items'] if i['key'] == '115-10')['e']['zh'] = '別題'
        V(d, 'vacancy-n')['zh'] = '別字'
        for w in ('crash-v', 'struggle-v', 'impact-n', 'stress-v', 'escape-v'):
            d['index']['entries'][w]['review'] = []                                                               # 其他尚未裁定的 pending 不屬於 Q9 簽核內容
    assert not changed(meta)


def test_q9_four_historical_adjudications_are_pinned(data):
    """教師 2026-11-14 裁定 115 第 9 題四個選項的詞性（動詞）：elbow（正確答案）、crash／tumble／struggle（干擾選項）由待審核變成已確認。
    選項字的歷屆紀錄不在 fingerprint（只含重點字 elbow），由本測試固定；『干擾選項』只是官方試題中的角色，資料層名稱維持 distractor。"""
    E = data['index']['entries']
    e = E['elbow-v']
    assert (e['total'], e['role'], e['review'], e.get('rejected', []), e['years'], e['first'], e['last']) == (1, {'answer': 1, 'distractor': 0, 'stem': 0, 'passage': 0}, [], [], ['115'], '115', '115')
    assert [(r['k'], r['role'], r['n'], r['loc'], r['exact'], r['reviewed']) for r in e['records']] == [(Q9_KEYS[0], 'answer', 9, '選項 (C)', True, '教師（負責人）')]
    c = E['crash-v']
    assert (c['total'], c['role'], c['years'], c.get('rejected', [])) == (2, {'answer': 0, 'distractor': 1, 'stem': 0, 'passage': 1}, ['111', '115'], [])
    assert [r['k'] for r in c['review']] == CRASH_PENDING and Q9_KEYS[1] in [r['k'] for r in c['records']]
    t = E['tumble-v']
    assert (t['total'], t['role'], t['years'], t['review'], t.get('rejected', [])) == (2, {'answer': 1, 'distractor': 1, 'stem': 0, 'passage': 0}, ['110', '115'], [], [])
    assert Q9_KEYS[2] in [r['k'] for r in t['records']]
    s_ = E['struggle-v']
    assert (s_['total'], s_['role'], s_['years'], s_.get('rejected', [])) == (1, {'answer': 0, 'distractor': 1, 'stem': 0, 'passage': 0}, ['115'], [])
    assert [r['k'] for r in s_['review']] == STRUGGLE_PENDING and [r['k'] for r in s_['records']] == [Q9_KEYS[3]]
    assert sum(e_['total'] for e_ in E.values()) == 85 and sum(len(e_['review']) for e_ in E.values()) == 33


def test_q10_text_signoff_is_complete_and_audio_is_not_approved(data, recs):
    """Q10（115-10）文字簽核：43 個審核項目完整、passed；正式試聽簽核尚未進行（pending），沒有任何通過的音檔；音檔基準仍是 187 筆。"""
    r = recs[Q10]; rows = so.rows_of(data, Q10); ids = [x for x, _ in rows]
    assert (r['question'], r['status'], r['reviewer'], r['signedAt']) == (Q10, 'passed', '教師（負責人）', '2026-11-14')
    assert r['evidence']['reviewHtmlSha256'] == '995674ac74caedf07676155c0552302ee248e6519a7ae6b5a6c71725605cc60c'
    assert len(ids) == 43 and len(set(ids)) == 43 and sorted(x['id'] for x in r['items']) == sorted(ids) and all(x['result'] == 'passed' for x in r['items'])
    assert {'115-10:zh', '115-10:key1', '115-10:key2', '115-10:key3', '115-10:optA', '115-10:optB', '115-10:optC', '115-10:optD', '115-10:pat1', '115-10:pat2', '115-10:gram', '115-10:w:grave-adj:note', '115-10:w:grave-adj:ant',
            '115-10:w:grave-adj:conf1', '115-10:w:grave-adj:fam:gravity-n', '115-10:w:brutal-adj:note', '115-10:ph:raise-concerns', '115-10:rec:grave-adj:確認1', '115-10:ext:x115-10-a', '115-10:ext:x115-10-b'} <= set(ids)
    assert not any('待審核' in i for i in ids)
    assert r['contentFingerprint']['value'] == so.fingerprint(data, Q10) == 'e08695cb3d44bdf811a77acb079e45cf6b7c49dd9a6d764950f796c6fba6ae2d' and so.validate(r, data) == []
    a = r['audio']
    assert a['status'] == 'pending' and a['approvedFiles'] == [] and a['distinctFileCount'] == 0 and a['buttonCount'] == 19 and a['notIncludedCount'] == a['totalAudioFiles'] == 187 == len(data['man']['items']) and 'devTestChecks' not in a
    it = next(i for i in data['items'] if i['key'] == Q10); e = it['e']
    assert (e['status'], e['reviewer'], e['reviewedAt']) == ('reviewed', '教師（負責人）', '2026-11-14') and '115-10.json' in e['reviewNotes'] and not e.get('aiFlags')
    blob = json.dumps(e, ensure_ascii=False)
    assert '找最常修飾' not in blob and '是固定搭配' not in blob and '不修飾 concerns' not in blob and '不搭配 concerns' not in blob and '最常見的形容詞搭配' not in blob
    assert [c['t'] for c in data['vocab']['entries']['grave-adj']['coll']] == ['grave concern', 'grave danger', 'a grave mistake']                         # 三個搭配詞與音檔對應不動
    assert data['vocab']['phrases']['raise-concerns']['t'] == 'raise concerns about' and data['vocab']['entries']['brutal-adj']['forms'] == ['brutal']
    assert it['ext'][0]['options'] == ['grave', 'rapid', 'violent', 'rough'] and it['ext'][0]['answer'] == 0
    assert it['ext'][1]['options'] == ['grave', 'cheerful', 'playful', 'casual'] and it['ext'][1]['answer'] == 0 and it['ext'][1]['targets'] == ['grave-adj']
    prov = json.loads((REPO / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']
    assert len(prov) == 187 and not any(x['productionApproved'] for x in prov.values())
    assert {f'115-{n}' for n in range(1, 11)} == {i['key'] for i in data['items'] if i['e']['status'] == 'reviewed'}


def test_q1_to_q9_fingerprints_are_unchanged_by_q10_signoff(data, recs):
    for q, fp in ((Q1, Q1_FINGERPRINT), (Q2, Q2_FINGERPRINT), (Q3, Q3_FINGERPRINT), (Q4, Q4_FINGERPRINT), (Q5, Q5_FINGERPRINT), (Q6, Q6_FINGERPRINT), (Q7, Q7_FINGERPRINT), (Q8, Q8_FINGERPRINT), (Q9, Q9_FINGERPRINT)):
        assert so.fingerprint(data, q) == recs[q]['contentFingerprint']['value'] == fp, q


def test_q10_fingerprint_protects_the_signed_text(data, recs):
    sig = recs[Q10]['contentFingerprint']['value']
    item = lambda d: next(i for i in d['items'] if i['key'] == Q10)
    V = lambda d, k: d['vocab']['entries'][k]
    def changed(edit):
        d = copy.deepcopy(data); edit(d)
        return so.fingerprint(d, Q10) != sig
    assert changed(lambda d: item(d)['e'].__setitem__('zh', 'x'))                                                 # 中文翻譯
    for n in range(3):                                                                                            # 解題步驟 1～3
        assert changed(lambda d, n=n: item(d)['e']['key'].__setitem__(n, 'x')), n
    for o in 'ABCD':                                                                                              # 選項解析
        assert changed(lambda d, o=o: item(d)['e']['options'][o].__setitem__('why', 'x')), o
    assert changed(lambda d: V(d, 'grave-adj').__setitem__('zh', 'x'))                                            # grave 字義
    assert changed(lambda d: V(d, 'grave-adj')['forms'].append('x'))                                              # 詞形
    assert changed(lambda d: V(d, 'grave-adj').__setitem__('note', 'x'))                                          # note
    assert changed(lambda d: V(d, 'grave-adj')['ex'][0].__setitem__('zh', 'x'))                                   # 例句
    assert changed(lambda d: V(d, 'grave-adj')['rel']['syn'][0].__setitem__('zh', 'x'))                           # serious
    assert changed(lambda d: V(d, 'grave-adj')['rel']['ant'][0].__setitem__('zh', 'x'))                           # minor / trivial 說明
    assert changed(lambda d: V(d, 'grave-adj')['rel']['confusable'][0].__setitem__('note', 'x'))                  # serious / severe 辨析
    assert changed(lambda d: V(d, 'gravity-n').__setitem__('zh', 'x'))                                            # gravity 辨析（在字義欄）
    assert changed(lambda d: V(d, 'gravely-adv').__setitem__('zh', 'x'))
    assert changed(lambda d: V(d, 'brutal-adj').__setitem__('note', 'x'))                                         # brutal note
    for w in ('swift-adj', 'harsh-adj'):                                                                          # 本題引用的其他選項字
        assert changed(lambda d, w=w: V(d, w).__setitem__('zh', 'x')), w
    assert changed(lambda d: d['vocab']['phrases']['raise-concerns'].__setitem__('zh', 'x'))                      # raise concerns about
    for n in range(2):                                                                                            # 句型
        assert changed(lambda d, n=n: item(d)['e']['patterns'].__setitem__(n, 'x')), n
    assert changed(lambda d: item(d)['e'].__setitem__('grammar', 'x'))                                            # 文法補充
    for n in range(2):
        for f in ('q', 'explain'):
            assert changed(lambda d, n=n, f=f: item(d)['ext'][n].__setitem__(f, 'x')), (n, f)                     # x115-10-a / x115-10-b
    assert changed(lambda d: item(d)['ext'][0]['options'].__setitem__(1, 'x')) and changed(lambda d: item(d)['ext'][1].__setitem__('answer', 1))
    assert changed(lambda d: d['index']['entries']['grave-adj']['role'].__setitem__('answer', 0))                 # grave 已確認歷屆紀錄
    def meta(d):                                                                                                  # 審核中繼資料、別題、尚未裁定的 pending、無關單字都不影響
        e = item(d)['e']; e['status'] = 'draft'; e['reviewNotes'] = '改'; e['aiFlags'] = ['x']; V(d, 'grave-adj')['status'] = 'reviewed'
        next(i for i in d['items'] if i['key'] == '115-9')['e']['zh'] = '別題'
        V(d, 'vacancy-n')['zh'] = '別字'
        for w in ('gravity-n', 'crash-v', 'struggle-v', 'impact-n', 'stress-v', 'escape-v'):
            d['index']['entries'][w]['review'] = []                                                               # 其他尚未裁定的 pending（含 gravity）不屬於 Q10 簽核內容
    assert not changed(meta)


def test_q10_grave_and_swift_adjudications_are_pinned_and_gravity_stays_pending(data):
    """教師 2026-11-14 裁定 115 第 10 題 (D) grave（正確答案）與 (A) swift（干擾選項）的詞性為形容詞：由待審核變成已確認。
    選項字 swift 的歷屆紀錄不在 fingerprint，由本測試固定；gravity 的 2 筆待審核全部維持。"""
    E = data['index']['entries']
    g = E['grave-adj']
    assert (g['total'], g['role'], g['review'], g.get('rejected', []), g['years'], g['first'], g['last']) == (1, {'answer': 1, 'distractor': 0, 'stem': 0, 'passage': 0}, [], [], ['115'], '115', '115')
    assert [(r['k'], r['role'], r['n'], r['loc'], r['exact'], r['reviewed']) for r in g['records']] == [(Q10_KEYS[0], 'answer', 10, '選項 (D)', True, '教師（負責人）')]
    s_ = E['swift-adj']
    assert (s_['total'], s_['role'], s_['review'], s_.get('rejected', []), s_['years']) == (1, {'answer': 0, 'distractor': 1, 'stem': 0, 'passage': 0}, [], [], ['115'])
    assert [(r['k'], r['role'], r['n'], r['loc'], r['exact'], r['reviewed']) for r in s_['records']] == [(Q10_KEYS[1], 'distractor', 10, '選項 (A)', True, '教師（負責人）')]
    assert (E['brutal-adj']['total'], E['brutal-adj']['review']) == (1, []) and (E['harsh-adj']['total'], E['harsh-adj']['review'], E['harsh-adj']['years']) == (3, [], ['106', '113', '115'])
    gv = E['gravity-n']
    assert (gv['total'], len(gv['review']), gv.get('rejected', [])) == (0, GRAVITY_PENDING_COUNT, [])
