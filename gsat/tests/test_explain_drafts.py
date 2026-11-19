"""115 年 Q11–Q46 詳解（2026-11-18 教師文字簽核）的結構與一致性檢查：資料結構、官方答案一致、審核欄位與簽核紀錄一致、audio 一律 pending。
內容對錯由教師審核，這裡不判斷。"""
import json
import re
import subprocess

import pytest

from conftest import ROOT

LET = 'ABCDEFGHIJ'
Y115 = [f'115-{n}' for n in range(11, 47)]            # 115 年 Q11–Q46：2026-11-18 教師文字簽核
SIGNED = [f'115-{n}' for n in range(1, 11)]
Y114 = [f'114-{n}' for n in range(1, 47)]             # 114 年 Q1–Q46：2026-11-19 教師文字簽核
DRAFT_KEYS = Y115 + Y114


def load():
    js = """global.window={};for (const f of ['data/vocab.js','exam/exams.js','exam/answers.js','exam/explain.js']) require(process.argv[1]+'/gsat/'+f);
const qs={};
for (const e of window.EXAMS) if (['114','115'].includes(e.year)) for (const s of e.sections) for (const g of s.groups) for (const q of g.questions) qs[e.year+'-'+q.n]={type:s.type,n:q.n,nopts:(s.type==='bank'||s.type==='structure')?g.bank.length:q.opts.length,bank:g.bank||null};
console.log(JSON.stringify({explain:window.EXPLAIN,ans:{114:window.ANSWERS['114'],115:window.ANSWERS['115']},qs,vocab:Object.keys(window.VOCAB.entries),phrases:Object.keys(window.VOCAB.phrases)}));"""
    return json.loads(subprocess.run(['node', '-e', js, str(ROOT.parent)], capture_output=True, text=True, check=True).stdout)


@pytest.fixture(scope='module')
def D():
    return load()


def test_all_36_signed_115_explanations_exist_and_q1_to_q10_are_still_reviewed(D):
    ex = D['explain']
    assert [k for k in Y115 + SIGNED if k not in ex] == []
    for k in SIGNED:
        assert ex[k]['status'] == 'reviewed'
    for k in Y115:
        e = ex[k]
        assert e['status'] == 'reviewed' and e['reviewer'] == '教師（負責人）' and e['reviewedAt'] == '2026-11-18', k
        assert '教學文字內容已完成教師審核' in e['reviewNotes'] and '音檔狀態以 signoff 的 audio 區塊為準' in e['reviewNotes'], k       # 只簽文字，不暗示音檔通過
        assert 'production 發音尚未進行人工試聽簽核' in e['reviewNotes'] and 'productionApproved' not in e['reviewNotes'], k


def test_114_has_46_signed_explanations_with_text_only_review_notes(D):
    ex = D['explain']
    assert [k for k in Y114 if k not in ex] == []
    for k in Y114:
        e = ex[k]
        assert e['status'] == 'reviewed' and e['reviewer'] == '教師（負責人）' and e['reviewedAt'] == '2026-11-19', k
        assert '教學文字內容已完成教師審核' in e['reviewNotes'] and '音檔狀態以 signoff 的 audio 區塊為準' in e['reviewNotes'], k
        assert 'production 發音尚未進行人工試聽簽核' in e['reviewNotes'] and 'productionApproved' not in e['reviewNotes'], k
    assert sorted(k for k in ex if k.startswith('114-')) == sorted(Y114)                    # 114 年只有這 46 題


@pytest.mark.parametrize('k', DRAFT_KEYS)
def test_explanation_matches_the_official_answer_and_has_the_required_fields(D, k):
    year, nn = k.split('-'); e, n = D['explain'][k], int(nn)
    q = D['qs'][k]
    assert e['schema'] == 2 and e['answer'] == D['ans'][year][n - 1], k                    # 答案與官方答案完全一致
    for f in ('key', 'options', 'words', 'phrases', 'patterns', 'zh', 'aiFlags'):
        assert f in e, (k, f)
    assert isinstance(e['grammar'], str) and e['zh'].strip(), k
    assert 3 <= len(e['key']) <= 4 and all(isinstance(t, str) and len(t) > 20 for t in e['key']), k
    if q['type'] == 'structure':                                                           # 篇章結構：Before／Candidate／After／Link 四步
        assert [re.split('[：:]', t)[0] for t in e['key']] == ['Before', 'Candidate', 'After', 'Link'], k       # 冒號全形或半形都可以
    letters = sorted(e['options'])
    assert e['answer'] in letters and all(L in LET[:q['nopts']] for L in letters), k
    if q['type'] in ('cloze', 'reading', 'vocab'):
        assert letters == list('ABCD'), k                                                  # 四個選項都要有說明
    else:
        assert len(letters) >= 3, k                                                        # 字庫題：正確答案＋至少 2 個易誤選的選項
    for L, o in e['options'].items():
        assert len(o['why']) >= 30, (k, L)
        if 'entry' in o:
            assert o['entry'] in D['vocab'], (k, L)
    assert e['words'] == [] and e['phrases'] == [], k                                      # 不新增詞條，也不引用片語詞條
    assert 'focus' not in e or e['focus'] in D['vocab'], k
    for note in e.get('notes', []):
        assert note['type'] in ('word', 'phrase') and note['t'] and note['zh'] and note['note'], (k, note)
    assert len(e.get('notes', [])) <= (8 if q['type'] == 'vocab' else 6), k
    assert isinstance(e['aiFlags'], list) and all(isinstance(x, str) and x.strip() for x in e['aiFlags']), k


def test_public_output_has_exactly_the_92_signed_explanations(D):
    import importlib.util
    spec = importlib.util.spec_from_file_location('gsat_public_exams', ROOT.parent / 'tools' / 'gsat_public_exams.py')
    pub = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(pub)
    txt = pub.public_copy(ROOT / 'exam' / 'explain.js')
    pubd = json.loads(txt[txt.index('window.EXPLAIN = ') + 17:].strip().rstrip(';'))
    assert sorted(pubd) == sorted(Y114 + SIGNED + Y115) and {v['status'] for v in pubd.values()} == {'reviewed'}       # 只有已簽核的 114、115 年詳解
