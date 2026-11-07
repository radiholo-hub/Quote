"""部署檔案整理（tools/stage_site.sh）：GitHub Pages 與 Cloudflare Pages 共用。
內容要和原本部署流程直接複製的結果完全相同；只有在 Cloudflare 建置（CF_PAGES=1）時多一個 noindex 的 _headers。"""
import filecmp
import os
import shutil
import subprocess

import pytest

from conftest import ROOT

SCRIPT = ROOT.parent / 'tools' / 'stage_site.sh'
HEADERS = ('https://:project.pages.dev/*\n  X-Robots-Tag: noindex\n\n'
           'https://:version.:project.pages.dev/*\n  X-Robots-Tag: noindex\n')


@pytest.fixture
def repo(tmp_path):
    """一個縮小版的 repo：部署會用到的檔案，加上不該部署的檔案。"""
    r = tmp_path / 'repo'
    files = ['index.html', 'style.css', 'app.js', 'quotes.js', 'audio/001.mp3', 'audio/m/en/001.mp3',
             'gsat/index.html', 'gsat/app.js', 'gsat/data/mock.js', 'gsat/exam/exams.js', 'gsat/exam/answers.js', 'gsat/exam/nonmc.js',
             'gsat/exam/explain.js', 'gsat/exam/mixed.js', 'gsat/exam/vocab_index.js', 'gsat/audio/abc.mp3', 'gsat/exam/img/a.jpg', 'gsat/exam/img/ns/b.jpg', 'gsat/tests/test_x.py', 'score-rescue/index.html', 'score-rescue/privacy.html', 'score-rescue/audio/ab.mp3', 'score-rescue/.gitignore',
             'README.md', 'tools/make_audio.py', '.github/workflows/pages.yml', 'notes.md']
    for f in files:
        (r / f).parent.mkdir(parents=True, exist_ok=True)
        (r / f).write_text('x ' + f)
    (r / 'tools').mkdir(exist_ok=True)
    shutil.copy(SCRIPT, r / 'tools' / 'stage_site.sh')
    return r


def stage(repo, out, cf=False):
    env = {k: v for k, v in os.environ.items() if not k.startswith('CF_PAGES')}
    if cf:
        env['CF_PAGES'] = '1'
    return subprocess.run(['bash', 'tools/stage_site.sh', out], cwd=repo, env=env, capture_output=True, text=True)


def old_inline(repo, out):
    """原本 pages.yml 裡直接執行的整理步驟。"""
    subprocess.run('mkdir %s && cp index.html style.css app.js quotes.js %s/ && cp -r audio %s/audio && cp -r score-rescue %s/score-rescue'
                   % ((out,) * 4), cwd=repo, shell=True, check=True)


def same_tree(a, b, ignore=()):
    """兩個資料夾內容完全相同；ignore 是第一層要略過的名稱（學測英文 gsat/ 另有自己的測試）。"""
    c = filecmp.dircmp(a, b, ignore=list(ignore) + filecmp.DEFAULT_IGNORES)
    if c.left_only or c.right_only or c.diff_files or c.funny_files:
        return False
    return all(same_tree(os.path.join(a, d), os.path.join(b, d)) for d in c.common_dirs)


def test_same_files_as_previous_deploy_step(repo):
    old_inline(repo, 'old')
    p = stage(repo, '_site')
    assert p.returncode == 0, p.stdout + p.stderr
    assert same_tree(repo / 'old', repo / '_site', ignore=('gsat',))
    assert not (repo / '_site' / '_headers').exists()
    assert not (repo / '_site' / 'tools').exists() and not (repo / '_site' / 'README.md').exists()


def test_cloudflare_build_adds_noindex_for_both_pages_dev_urls(repo):
    old_inline(repo, 'old')
    p = stage(repo, '_site', cf=True)
    assert p.returncode == 0, p.stdout + p.stderr
    assert (repo / '_site' / '_headers').read_text() == HEADERS
    (repo / '_site' / '_headers').unlink()
    assert same_tree(repo / 'old', repo / '_site', ignore=('gsat',))


def files_under(d):
    return sorted(str(p.relative_to(d)) for p in d.rglob('*') if p.is_file())


def stage_gsat(repo, publish):
    env = {k: v for k, v in os.environ.items() if not k.startswith(('CF_PAGES', 'GSAT_'))}
    if publish:
        env['GSAT_PUBLISH_EXAMS'] = '1'
    p = subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=repo, env=env, capture_output=True, text=True)
    assert p.returncode == 0, p.stdout + p.stderr
    return repo / '_site' / 'gsat'


def test_gsat_default_does_not_publish_exam_content(repo):
    """歷屆試題的著作權授權未確認：預設部署只有空殼，不含試題、答案、圖片與詳解，也不含測試檔。"""
    g = stage_gsat(repo, publish=False)
    assert files_under(g) == ['app.js', 'audio/abc.mp3', 'data/mock.js', 'exam/answers.js', 'exam/exams.js', 'exam/explain.js', 'exam/mixed.js', 'exam/nonmc.js', 'exam/vocab_index.js', 'index.html']
    assert (g / 'exam' / 'exams.js').read_text() == 'window.EXAMS=[];\n'
    assert (g / 'exam' / 'answers.js').read_text() == 'window.ANSWERS={};\n'
    assert (g / 'exam' / 'nonmc.js').read_text() == 'window.NONMC={};\n'
    assert (g / 'exam' / 'explain.js').read_text() == 'window.EXPLAIN={};\n'
    assert (g / 'exam' / 'mixed.js').read_text() == 'window.MIXED={};\n'
    assert (g / 'exam' / 'vocab_index.js').read_text() == 'window.VOCAB_INDEX=null;\n'


def test_gsat_publishes_exam_content_only_when_explicitly_enabled(repo):
    g = stage_gsat(repo, publish=True)
    assert (g / 'exam' / 'exams.js').read_text() == 'x gsat/exam/exams.js'
    assert (g / 'exam' / 'img' / 'a.jpg').exists() and (g / 'exam' / 'img' / 'ns' / 'b.jpg').exists()
    assert not (g / 'tests').exists()        # 測試檔不論如何都不部署


def test_refuses_existing_output(repo):
    (repo / '_site').mkdir()
    p = stage(repo, '_site')
    assert p.returncode != 0
