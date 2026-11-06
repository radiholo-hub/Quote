"""題庫與計分設定的一致性：題數、配分、答案、圖片檔、不同年度制度不可混用。"""
import pytest

from conftest import ROOT

YEARS = [str(y) for y in range(106, 116) if y != 105]
OLD = [str(y) for y in range(106, 111)]
NEW = [str(y) for y in range(111, 116)]


@pytest.fixture(scope='module')
def data(browser):
    page = browser.new_page()
    page.goto((ROOT / 'index.html').as_uri())
    d = page.evaluate('({exams:EXAMS, answers:ANSWERS, nonmc:NONMC, scoring:SCORING, mock:GSAT, expl:EXPLAIN})')
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
