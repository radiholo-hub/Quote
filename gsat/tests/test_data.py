"""題庫與計分設定的一致性：題數、配分、答案、圖片檔、不同年度制度不可混用。"""
import re
import pytest

from conftest import ROOT, needs_exam

pytestmark = needs_exam

YEARS = [str(y) for y in range(106, 116) if y != 105]
OLD = [str(y) for y in range(106, 111)]
NEW = [str(y) for y in range(111, 116)]


@pytest.fixture(scope='module')
def data(browser):
    page = browser.new_page()
    page.goto((ROOT / 'index.html').as_uri())
    d = page.evaluate('({exams:EXAMS, answers:ANSWERS, nonmc:NONMC, scoring:SCORING, mock:GSAT, expl:EXPLAIN, vocab:VOCAB, ext:EXT_PRACTICE})')
    page.close()
    return d


def ex(data, y):
    return next(e for e in data['exams'] if e['year'] == y)


def questions(data, y):
    for s in ex(data, y)['sections']:
        for g in s['groups']:
            for q in g['questions']:
                yield s, g, q


def test_all_years_present(data):
    assert [e['year'] for e in data['exams']] == YEARS == sorted(data['answers']) == sorted(data['scoring']['years'])


def test_scoring_config_totals_to_100(data):
    for y, c in data['scoring']['years'].items():
        assert sum(n * w for n, w in c['sections'].values()) == c['mc'], y
        assert c['mc'] + c['mixed'] + c['translation'] + c['essay'] == 100, y
    assert {data['scoring']['years'][y]['mc'] for y in OLD} == {72}
    assert {data['scoring']['years'][y]['mc'] for y in NEW} == {62}


@pytest.mark.parametrize('y', YEARS)
def test_counts_and_weights_match_the_papers_scoring(data, y):
    c = data['scoring']['years'][y]
    by = {}
    for s, g, q in questions(data, y):
        by[s['type']] = by.get(s['type'], 0) + 1
    assert by == {t: n for t, (n, w) in c['sections'].items()}, f'{y} 各題型題數與計分設定不符'
    assert len(data['answers'][y]) == sum(by.values())
    numbers = [q['n'] for s, g, q in questions(data, y)]
    assert numbers == list(range(1, len(numbers) + 1)), f'{y} 題號不連續'


def test_old_and_new_systems_are_not_mixed(data):
    for y in OLD:   # 106–110：沒有篇章結構、沒有多選／混合題
        assert 'structure' not in data['scoring']['years'][y]['sections']
        assert not data['scoring']['years'][y]['multiSelect'] and data['scoring']['years'][y]['mixed'] == 0
        assert sum(1 for _ in questions(data, y)) == 56
    for y in NEW:   # 111–115：選擇題 46 題，篇章結構 4 題且每題 2 分
        assert data['scoring']['years'][y]['sections']['structure'] == [4, 2]
        assert data['scoring']['years'][y]['multiSelect'] and data['scoring']['years'][y]['mixed'] == 10
        assert sum(1 for _ in questions(data, y)) == 46


@pytest.mark.parametrize('y', YEARS)
def test_answers_are_valid_for_each_question(data, y):
    key = data['answers'][y]
    assert set(key) <= set('ABCDEFGHIJ')
    for s, g, q in questions(data, y):
        letter = key[q['n'] - 1]
        n_opts = len(g['bank']) if s['type'] in ('bank', 'structure') else len(q['opts'])
        assert 'ABCDEFGHIJ'.index(letter) < n_opts, f'{y} 第 {q["n"]} 題答案 {letter} 超出 {n_opts} 個選項'
        if s['type'] not in ('bank', 'structure'):
            assert n_opts == 4 and all(o.strip() for o in q['opts']), f'{y} 第 {q["n"]} 題選項不完整'


@pytest.mark.parametrize('y', YEARS)
def test_word_bank_and_structure_answers_use_each_option_once(data, y):
    key = data['answers'][y]
    for sec in ex(data, y)['sections']:
        if sec['type'] not in ('bank', 'structure'):
            continue
        letters = [key[q['n'] - 1] for g in sec['groups'] for q in g['questions']]
        assert len(set(letters)) == len(letters), f'{y} {sec["name"]} 答案有重複'
        if sec['type'] == 'bank':
            assert sorted(letters) == list('ABCDEFGHIJ')


@pytest.mark.parametrize('y', YEARS)
def test_cloze_passages_have_every_blank(data, y):
    for s, g, q in questions(data, y):
        if s['type'] in ('cloze', 'bank', 'structure'):
            assert any('【%d】' % q['n'] in p for p in g['passage']), f'{y} 第 {q["n"]} 題找不到空格'


def test_referenced_image_files_exist(data):
    paths = []
    for y in YEARS:
        for s, g, q in questions(data, y):
            paths += ([q['img']] if q.get('img') else []) + q.get('optImgs', [])
        paths += data['nonmc'][y]['q'] + data['nonmc'][y]['ref']
    assert paths and all((ROOT / p).is_file() for p in paths), [p for p in paths if not (ROOT / p).is_file()]


def test_known_figure_questions_are_images_not_garbled_text(data):
    q = {(y, q['n']): q for y in YEARS for s, g, q in questions(data, y)}
    for k in [('109', 41), ('110', 49), ('111', 35), ('112', 44), ('113', 35), ('114', 36), ('115', 38)]:
        assert q[k].get('img') or q[k].get('optImgs'), k
    assert len(q[('112', 44)]['stem']) < 120          # 地圖標籤不得混進題幹


def test_nonmc_documents_for_every_year(data):
    for y in YEARS:
        assert len(data['nonmc'][y]['q']) >= 1
        assert len(data['nonmc'][y]['ref']) >= 1, f'{y} 缺評分原則'


def test_mock_questions_are_well_formed(data):
    m = data['mock']
    for p in m['vocab']:
        assert 0 <= p['a'] < len(p['o']) and p['e']
    for sec in ('cloze', 'reading'):
        for p in m[sec]:
            for x in p['qs'] if sec == 'cloze' else p['qs']:
                assert 0 <= x['a'] < len(x['o'])
    for p in m['structure']:
        assert len(p['ans']) == len(p['e']) and all(0 <= a < len(p['options']) for a in p['ans'])


def test_explanations_agree_with_the_official_key(data):
    for k, e in data['expl'].items():
        y, n = k.split('-')
        assert e['answer'] == data['answers'][y][int(n) - 1], f'{k} 詳解答案與官方答案不同'
        assert e['status'] in ('draft', 'reviewed')


def test_explanations_are_complete_and_never_claim_to_be_reviewed(data):
    assert len(data['expl']) >= 10
    V = data['vocab']['entries']
    for k, e in data['expl'].items():
        assert e['schema'] == 2 and e['status'] == 'draft', f'{k}：未經人工審核不得標為 reviewed'
        assert isinstance(e['key'], list) and len(e['key']) >= 3 and all(len(t) >= 15 for t in e['key']), f'{k}：解題關鍵要有判斷的步驟'
        assert not any(t.strip() in ('依照上下文可知', '依上下文可知') for t in e['key']), k
        assert sorted(e['options']) == list('ABCD') and all(o['why'].strip() and o['entry'] in V for o in e['options'].values()), f'{k}：四個選項都要有分析並引用詞條'
        assert e['words'] and e['grammar'].strip() and e['patterns'], f'{k}：詳解必須包含重要單字、文法補充與常考句型'
        assert all(w in V for w in e['words']) and e['focus'] in V and all(p in data['vocab']['phrases'] for p in e['phrases']), k
        assert re.search(r'[\u4e00-\u9fff]', e.get('zh', '')) and len(e['zh']) >= 15, f'{k}：缺題目中譯'
        assert 'reviewer' in e and e['reviewer'] is None and e['reviewedAt'] is None, f'{k}：缺審核欄位或未經審核卻填了審核者'


def test_explanation_options_match_the_real_option_text(data):
    """詳解引用的詞條，詞形必須等於題庫裡該選項的實際文字（避免詳解與題目對不上、同一個字出現矛盾解釋）。"""
    V = data['vocab']['entries']
    for k, e in data['expl'].items():
        y, n = k.split('-')
        q = next(q for s, g, q in questions(data, y) if q['n'] == int(n))
        for i, L in enumerate('ABCD'):
            assert q['opts'][i].lower() in V[e['options'][L]['entry']]['forms'], f'{k} 選項 {L} {q["opts"][i]} 與詞條 {e["options"][L]["entry"]} 不符'
        assert e['options'][e['answer']]['entry'] == e['focus'] or e['focus'] in e['words']


def test_extension_practice_items_are_original_drafts_with_one_correct_answer(data):
    ext = data['ext']
    assert len(ext) >= 20 and len({x['id'] for x in ext}) == len(ext)
    V = data['vocab']['entries']
    for x in ext:
        assert x['status'] == 'draft', f'{x["id"]}：AI 生成內容必須先是待審核草稿'
        assert len(x['options']) == 4 and len(set(x['options'])) == 4 and 0 <= x['answer'] < 4 and x['explain'].strip(), x['id']
        assert all(t in V for t in x['targets']) and x['forQuestion'] in data['expl'], x['id']
        assert x['type'] in ('pos', 'synonym', 'collocation', 'pattern', 'context')


@needs_exam
def test_q1_tight_teacher_revisions_are_in_place_and_still_draft(data):
    """第 1 題 tight 的教師修訂(逐項確認過):保留 such…that 提示、三個步驟、選項 A/C 改寫、三類相關字重新分類、延伸題中譯放最前面;全部仍是草稿。"""
    e = data['expl']['115-1']; V = data['vocab']['entries']; x = {i['id']: i for i in data['ext'] if i['forQuestion'] == '115-1'}
    assert e['status'] == 'draft' and e['reviewer'] is None and e['reviewedAt'] is None
    assert len(e['key']) == 3 and 'such a + 形容詞 + 單數可數名詞 + that + 子句' in e['key'][0] and '因此選 (B)' in e['key'][2]
    assert 'a hasty decision' in e['options']['A']['why'] and 'a diligent student' in e['options']['C']['why'] and '不能形容' not in e['options']['C']['why']
    assert 'so tight a schedule that' in e['grammar'] and 'She has such a busy schedule' in e['patterns'][0] and 'It takes me two hours' in e['patterns'][1]
    t = V['tight-adj']
    assert t['zh'] == '緊的;(行程)緊湊的;(時間、預算)吃緊的' and 'tight deadline' in t['note'] and 'tight budget' in t['note']
    assert [a['w'] for a in t['rel']['ant']] == ['loose', 'a light schedule'] and [c['w'] for c in t['rel']['confusable']] == ['busy', 'flexible']   # flexible 不再是反義字
    assert t['rel']['syn'][0]['w'] == 'packed' and 'a packed schedule' in t['rel']['syn'][0]['zh']
    assert V['tightness-n']['zh'] == '緊度;緊繃感;緊密程度'
    a, b = x['x115-1-a'], x['x115-1-b']
    assert a['q'].startswith('The team had to work overtime') and a['answer'] == 0 and a['explain'].index('中文翻譯') < a['explain'].index('正確答案') < a['explain'].index('解題原因') < a['explain'].index('其他選項')
    assert b['answer'] == 2 and b['options'][2] == 'tighten' and '祈使句' in b['explain'] and a['status'] == b['status'] == 'draft'
