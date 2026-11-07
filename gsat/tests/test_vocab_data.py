"""單字資料庫：三類關係（A 詞形變化／B 同字族／C 語意相關）分開、詞條不互相矛盾、搭配詞與例句完整。不需要歷屆試題內容。"""
import pytest

from conftest import ROOT


@pytest.fixture(scope='module')
def vocab(browser):
    page = browser.new_page()
    page.goto((ROOT / 'index.html').as_uri())
    v = page.evaluate('VOCAB')
    page.close()
    return v


def test_every_entry_has_the_required_fields(vocab):
    for eid, e in vocab['entries'].items():
        assert eid == f'{e["hw"]}-{e["key"]}' and e['pos'] in ('n.', 'v.', 'adj.', 'adv.')
        assert e['zh'].strip() and e['forms'] and e['hw'] in e['forms'] and e['status'] in ('draft', 'reviewed')
        assert e['family'] in vocab['families'] and eid in vocab['families'][e['family']]['members']
        if e['full']:                                          # 重點詞條要有搭配詞、原創例句、語意相關與辨析
            assert len(e['coll']) >= 2 and e['ex'] and e['note'] is not None
            assert e['rel']['confusable'], f'{eid} 缺相似字辨析'


def test_a_forms_never_overlap_between_entries_unless_declared_ambiguous(vocab):
    """A 類：同一個詞形不能同時屬於兩個詞條（否則次數會重複計算）；有詞性疑義的詞形要在 amb 裡說明。"""
    owner = {}
    for eid, e in vocab['entries'].items():
        for f in e['forms']:
            assert f.lower() not in owner, f'詞形 {f} 同時屬於 {owner[f.lower()]} 與 {eid}'
            owner[f.lower()] = eid
        for f in e['amb']:
            assert f in e['forms'], f'{eid}：amb 的 {f} 不在詞形裡'
        if e['alsoPos']:
            assert e['amb'], f'{eid} 另有詞性 {e["alsoPos"]}，必須標出有疑義的詞形'


def test_b_family_members_are_separate_entries_with_their_own_forms(vocab):
    """B 類：字族成員各自是一個詞條，不把衍生字的詞形放進原字。"""
    for fid, f in vocab['families'].items():
        assert len(set(f['members'])) == len(f['members'])
        for m in f['members']:
            assert vocab['entries'][m]['family'] == fid
    comm = vocab['families']['communicate']['members']
    assert comm == ['communicate-v', 'communication-n', 'communicative-adj', 'communicator-n']
    forms = vocab['entries']['communicate-v']['forms']
    assert forms == ['communicate', 'communicates', 'communicated', 'communicating']          # A：只有動詞的詞形變化
    assert 'communication' not in forms and 'communicative' not in forms


def test_c_semantic_relations_are_not_family_members_and_not_counted_as_forms(vocab):
    """C 類：同義、反義、相似字辨析只放在 rel，不得是同字族成員，也不得出現在 A 類詞形裡。"""
    all_forms = {f.lower() for e in vocab['entries'].values() for f in e['forms']}
    for eid, e in vocab['entries'].items():
        fam_forms = {f.lower() for m in vocab['families'][e['family']]['members'] for f in vocab['entries'][m]['forms']}
        related = [x['w'] for x in e['rel']['syn'] + e['rel']['ant']]
        for w in related:
            assert w.lower() not in fam_forms, f'{eid}：語意相關字 {w} 其實是同字族／詞形'
            assert w.lower() not in e['forms']
    comm = vocab['entries']['communicate-v']['rel']
    assert [x['w'] for x in comm['syn']] == ['express', 'convey']                  # 使用者的示範：express / convey 是語意相關，不是字族
    assert [x['w'] for x in comm['confusable']] == ['interact']
    assert 'express' not in all_forms and 'convey' not in all_forms and 'interact' not in all_forms


def test_collocations_and_examples_actually_use_the_word(vocab):
    import re
    for eid, e in vocab['entries'].items():
        pat = re.compile(r"(?<![A-Za-z])(%s)(?![A-Za-z])" % '|'.join(map(re.escape, sorted(e['forms'], key=len, reverse=True))), re.I)
        for c in e['coll']:
            if e['full'] or e['key'] != 'adj' or True:
                assert pat.search(c['t'].replace('’', "'")) or e['hw'] in c['t'].lower(), f'{eid} 的搭配詞 {c["t"]} 沒有用到這個字'
        for x in e['ex']:
            assert pat.search(x['en']), f'{eid} 的例句沒有用到這個字:{x["en"]}'
            assert x['zh'].strip() and x['en'].strip().endswith(('.', '?', '!'))


def test_no_conflicting_definitions_each_headword_pos_is_defined_once(vocab):
    seen = {}
    for e in vocab['entries'].values():
        k = (e['hw'], e['key'])
        assert k not in seen, f'重複詞條 {k}'
        seen[k] = e['zh']


def test_phrases_have_text_and_chinese(vocab):
    for pid, p in vocab['phrases'].items():
        assert p['t'].strip() and p['zh'].strip(), pid
