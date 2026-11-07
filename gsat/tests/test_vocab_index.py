"""歷屆出現索引：統計規則（用人工合成的小題庫逐條驗證）、以獨立方法重算真實索引、每筆紀錄可追溯到來源題目。"""
import importlib.util

import pytest

from conftest import ROOT, needs_exam

REPO = ROOT.parent
spec = importlib.util.spec_from_file_location('build_vocab_index', REPO / 'tools' / 'build_vocab_index.py')
bvi = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bvi)


def entry(eid, forms, amb=None):
    hw, key = eid.rsplit('-', 1)
    return {'id': eid, 'hw': hw, 'key': key, 'pos': key + '.', 'zh': 'x', 'forms': forms, 'amb': amb or {}, 'alsoPos': '', 'family': hw, 'coll': [], 'ex': [], 'rel': {'syn': [], 'ant': [], 'confusable': []}, 'full': False, 'status': 'draft'}


VOCAB = {'entries': {e['id']: e for e in [
    entry('communicate-v', ['communicate', 'communicates', 'communicated', 'communicating']),
    entry('communication-n', ['communication']),
    entry('express-v', ['express', 'expressed']),
    entry('tight-adj', ['tight'], {'tight': '也可作副詞'}),
    entry('known-adj', ['known']),
    entry('little-adj', ['little']),
]}}


def corpus():
    """年度 901：閱讀題組（共用文章，2 題）、詞彙題（1 題）、文意選填（2 空，字庫 2 個）；年度 902：詞彙題一題。"""
    return {'vocab': VOCAB, 'reviews': {}, 'exams': [
        {'year': '901', 'sections': [
            {'type': 'reading', 'groups': [{'passage': ['We communicate here. They communicate and communicated twice.', 'Communication is tight but well-known.'],
                                            'questions': [{'n': 1, 'stem': 'Why do they communicate?', 'opts': ['communication', 'to communicate', 'express', 'none']},
                                                          {'n': 2, 'stem': 'What is said?', 'opts': ['a', 'b', 'c', 'd']}]}]},
            {'type': 'vocab', 'groups': [{'questions': [{'n': 3, 'stem': 'We ___ often.', 'opts': ['communicate', 'express', 'tight', 'known']}]}]},
            {'type': 'bank', 'groups': [{'passage': ['A ___ man and a ___ boy.'], 'bank': ['little', 'communicated'], 'questions': [{'n': 4}, {'n': 5}]}]},
        ]},
        {'year': '902', 'sections': [{'type': 'vocab', 'groups': [{'questions': [{'n': 1, 'stem': 'He ___ well.', 'opts': ['communicates', 'x', 'y', 'z']}]}]}]},
    ], 'answers': {'901': 'ABAAB'[:0] + 'AA' + 'A' + 'BA', '902': 'A'}}


@pytest.fixture(scope='module')
def idx():
    return bvi.build(corpus())['entries']


def test_passage_shared_by_several_questions_is_counted_once(idx):
    e = idx['communicate-v']
    passage = [r for r in e['records'] if r['role'] == 'passage']
    assert [(r['loc'], r['c']) for r in passage] == [('文章第 1 段', 3)]            # 三個詞形出現 3 次，只算一次文章
    assert e['role']['passage'] == 3 and e['passageUnits'] == 1                    # 原文次數 3；涉及 1 篇文章（供 2 題共用）
    assert passage[0]['qs'] == [1, 2] and passage[0]['u'] == '901:reading:1-2'


def test_roles_are_taken_from_the_official_answer_not_from_where_the_word_appears(idx):
    e = idx['communicate-v']
    assert e['role']['stem'] == 1                                                  # Q1 題幹 "Why do they communicate?"
    assert e['role']['answer'] == 3 and e['answerExact'] == 3                      # 901 第 3 題選 A、902 第 1 題選 A、901 文意選填字庫 communicated（第 4 空的答案）;都是整個選項就是這個字
    assert e['role']['distractor'] == 1                                             # Q1 選項 B "to communicate"
    by_role = {(r['y'], r.get('n'), r['role'], r['loc']) for r in e['records'] if r['role'] != 'passage'}
    assert ('901', 3, 'answer', '選項 (A)') in by_role and ('901', 1, 'distractor', '選項 (B)') in by_role
    assert all(r['role'] != 'answer' for r in e['records'] if r['role'] == 'passage')   # 文章裡的字不稱為「考過的答案」


def test_family_members_and_synonyms_are_never_merged_into_the_headword(idx):
    assert idx['communication-n']['total'] == 2 and idx['communication-n']['role']['answer'] == 1     # 選項 A（Q1）+ 文章開頭的 Communication
    assert idx['communicate-v']['total'] == 8 and set(idx['communicate-v']['perYear']) == {'901', '902'}
    assert idx['express-v']['total'] == 2                                           # express 只算自己的次數
    # 動詞詞條的所有紀錄裡都沒有 communication / express 的形式
    forms = {f.lower() for r in idx['communicate-v']['records'] for f in r['f']}
    assert forms <= {'communicate', 'communicates', 'communicated', 'communicating'}


def test_ambiguous_pos_and_hyphen_compounds_are_pending_not_counted(idx):
    t = idx['tight-adj']
    assert t['total'] == 0 and len(t['review']) == 2 and {r['r'] for r in t['review']} == {'pos'}   # 文章與選項各一筆，都詞性有疑義
    k = idx['known-adj']
    assert k['role']['passage'] == 0 and any(r['r'] == 'compound' for r in k['review'])            # well-known 內的 known
    assert k['role']['distractor'] == 1                                                              # Q3 選項 known 是單獨的字，正常計入


def test_word_bank_options_are_counted_once_per_group_with_the_blank_they_answer(idx):
    little = idx['little-adj']
    recs = [r for r in little['records'] if r['t'] == 'bank']
    answers = [r for r in recs if r['role'] == 'answer']
    assert len(answers) == 1 and answers[0]['loc'] == '字庫 (A)' and answers[0]['exact'] is True and answers[0]['n'] == 5     # 官方答案 Q5 選 A，所以字庫 (A) 是第 5 空的答案
    assert little['total'] == 1 and len(recs) == 1                                   # 字庫只算一次，不因為有兩個空格而重複


def test_per_year_first_last_and_totals_are_consistent(idx):
    for eid, e in idx.items():
        assert sum(e['perYear'].values()) == e['total'] == sum(e['role'].values()), eid
        assert e['years'] == sorted(e['perYear']) and e['first'] == (e['years'][0] if e['years'] else None) and e['last'] == (e['years'][-1] if e['years'] else None)
    assert idx['communicate-v']['first'] == '901' and idx['communicate-v']['last'] == '902'


def test_human_review_decides_pending_matches_and_ai_cannot(idx):
    c = corpus()
    keys = [r['k'] for r in idx['tight-adj']['review']]
    c['reviews'] = {keys[0]: {'verdict': 'confirmed', 'by': '林老師', 'at': '2026-01-01'}, keys[1]: {'verdict': 'rejected', 'by': '林老師'}}
    out = bvi.build(c)['entries']['tight-adj']
    assert out['total'] == 1 and len(out['review']) == 0 and len(out['rejected']) == 1
    assert out['records'][0]['reviewed'] == '林老師'
    c['reviews'] = {keys[0]: {'verdict': 'confirmed'}, keys[1]: {'verdict': 'confirmed', 'by': ''}}   # 沒有審核者姓名＝無效
    out = bvi.build(c)['entries']['tight-adj']
    assert out['total'] == 0 and len(out['review']) == 2


def test_index_meta_states_scope_rules_and_no_probability_claim():
    meta = bvi.build(corpus())['meta']
    assert '不代表未來的出題機率' in meta['notice'] and '不是全部單字' in meta['scope'] and len(meta['rules']) >= 4


# ---------------------------------------------------------------- 真實題庫
@pytest.fixture(scope='module')
def real(browser):
    page = browser.new_page()
    page.goto((ROOT / 'index.html').as_uri())
    d = page.evaluate('({exams:EXAMS, answers:ANSWERS, vocab:VOCAB, index:VOCAB_INDEX})')
    page.close()
    return d


@needs_exam
def test_real_index_matches_an_independent_recount_per_entry_and_year(browser):
    """用另一套方法（瀏覽器內的正規表示式，直接數題庫所有文字）逐詞條逐學年重算，必須和索引（已確認 + 待審核 + 已排除）完全相同。"""
    page = browser.new_page()
    page.goto((ROOT / 'index.html').as_uri())
    diff = page.evaluate('''()=>{
      const text={};
      for(const ex of EXAMS){const a=[];for(const s of ex.sections)for(const g of s.groups){a.push(...(g.passage||[]),...(g.bank||[]));for(const q of g.questions)a.push(q.stem||'',...(q.opts||[]))}
        text[ex.year]=a.join('\\n').replace(/’/g,"'")}
      const bad=[];let cells=0,raw=0;
      for(const [id,e] of Object.entries(VOCAB.entries)){
        const re=new RegExp("(?<![A-Za-z'])(?:"+[...e.forms].sort((a,b)=>b.length-a.length).map(f=>f.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&')).join('|')+")(?![A-Za-z'])",'gi');
        const x=VOCAB_INDEX.entries[id];const py={};
        for(const r of [...x.records,...x.review,...(x.rejected||[])])py[r.y]=(py[r.y]||0)+r.c;
        for(const y of Object.keys(text)){const n=(text[y].match(re)||[]).length;cells++;raw+=n;if(n!==(py[y]||0))bad.push([id,y,n,py[y]||0])}}
      return {bad,cells,raw}}''')
    page.close()
    assert diff['bad'] == [] and diff['cells'] == 59 * 10 and diff['raw'] > 100


@needs_exam
def test_every_record_traces_back_to_its_source_question(real):
    """每筆紀錄都能在題庫中找到：年度、題號（或題組）、位置，而且那個位置的文字真的含有紀錄的詞形，角色與官方答案一致。"""
    import re
    ex = {e['year']: e for e in real['exams']}
    fails, n = [], 0
    for eid, x in real['index']['entries'].items():
        forms = real['vocab']['entries'][eid]['forms']
        for r in x['records'] + x['review'] + x.get('rejected', []):
            n += 1
            e = ex[r['y']]; key = real['answers'][r['y']]
            grp = None
            for s in e['sections']:
                for g in s['groups']:
                    nums = [q['n'] for q in g['questions']]
                    unit = f"{r['y']}:{s['type']}:{nums[0]}" + ('' if s['type'] == 'vocab' else f"-{nums[-1]}")
                    if unit == r['u']:
                        grp = (s, g, nums)
            if not grp:
                fails.append((eid, r['k'], '找不到來源題組')); continue
            s, g, nums = grp
            if r['role'] == 'passage':
                para = int(re.search(r'\d+', r['loc']).group()) - 1
                text = g['passage'][para]
                if r['qs'] != nums: fails.append((eid, r['k'], '題組題號不符'))
            elif s['type'] in ('bank', 'structure'):
                L = r['loc'].split('(')[1][0]; text = g['bank']['ABCDEFGHIJ'.index(L)]
                blank = next((q for q in nums if key[q - 1] == L), None)
                if (blank is not None) != (r['role'] == 'answer') or (blank and r['n'] != blank): fails.append((eid, r['k'], '角色與答案不符'))
            else:
                q = next((q for q in g['questions'] if q['n'] == r['n']), None)
                if not q: fails.append((eid, r['k'], '找不到題號')); continue
                if r['role'] == 'stem': text = q['stem']
                else:
                    L = r['loc'].split('(')[1][0]; text = q['opts']['ABCD'.index(L)]
                    if (key[q['n'] - 1] == L) != (r['role'] == 'answer'): fails.append((eid, r['k'], '角色與答案不符'))
            for f in r['f']:
                if not re.search(r"(?<![A-Za-z])%s(?![A-Za-z])" % re.escape(f), text.replace('’', "'")): fails.append((eid, r['k'], f'位置的文字沒有 {f}'))
    assert n > 100 and fails == [], fails[:5]


@needs_exam
def test_real_index_covers_all_questions_and_has_no_family_merging(real):
    m = real['index']['meta']
    assert m['questions'] == 510 and m['years'] == [str(y) for y in range(106, 116) if y != 105]
    I = real['index']['entries']
    # 字族成員各自有自己的次數，原字的詞形裡沒有衍生字
    for fid, f in real['vocab']['families'].items():
        for mid in f['members']:
            for r in I[mid]['records'] + I[mid]['review']:
                assert {x.lower() for x in r['f']} <= {x.lower() for x in real['vocab']['entries'][mid]['forms']}, (mid, r['f'])


@needs_exam
def test_the_demonstration_family_communicate_has_real_traceable_data(real):
    """示範字族 communicate：以下數字由題庫逐字計算，並已用原始試卷文字獨立核對（見 docs/gsat/VOCAB_INDEX_METHOD.md）。"""
    I = real['index']['entries']
    c = I['communicate-v']
    assert (c['total'], c['years'], c['role']['answer'], c['role']['distractor']) == (1, ['115'], 1, 0)
    r = c['records'][0]
    assert (r['y'], r['n'], r['t'], r['loc'], r['role'], r['f']) == ('115', 12, 'cloze', '選項 (C)', 'answer', ['communicate'])
    assert I['communication-n']['years'] == ['114'] and I['communication-n']['role']['distractor'] == 1
    assert I['communicative-adj']['total'] == 0 and I['communicator-n']['total'] == 0
