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
             'score-rescue/index.html', 'score-rescue/privacy.html', 'score-rescue/audio/ab.mp3', 'score-rescue/.gitignore',
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


def same_tree(a, b):
    c = filecmp.dircmp(a, b)
    if c.left_only or c.right_only or c.diff_files or c.funny_files:
        return False
    return all(same_tree(os.path.join(a, d), os.path.join(b, d)) for d in c.common_dirs)


def test_same_files_as_previous_deploy_step(repo):
    old_inline(repo, 'old')
    p = stage(repo, '_site')
    assert p.returncode == 0, p.stdout + p.stderr
    assert same_tree(repo / 'old', repo / '_site')
    assert not (repo / '_site' / '_headers').exists()
    assert not (repo / '_site' / 'tools').exists() and not (repo / '_site' / 'README.md').exists()


def test_cloudflare_build_adds_noindex_for_both_pages_dev_urls(repo):
    old_inline(repo, 'old')
    p = stage(repo, '_site', cf=True)
    assert p.returncode == 0, p.stdout + p.stderr
    assert (repo / '_site' / '_headers').read_text() == HEADERS
    (repo / '_site' / '_headers').unlink()
    assert same_tree(repo / 'old', repo / '_site')


def test_refuses_existing_output(repo):
    (repo / '_site').mkdir()
    p = stage(repo, '_site')
    assert p.returncode != 0
