"""「Generate audio」兩段工作之間搬運新音檔的檢查（tools/audio_changes.sh）。
pack：只收新增或修改的一般 mp3 檔；unpack：只放入路徑符合規則的一般檔案。"""
import os
import subprocess

import pytest

from conftest import ROOT

SCRIPT = ROOT.parent / 'tools' / 'audio_changes.sh'


def sh(cwd, *args, env=None):
    return subprocess.run(['bash', str(SCRIPT), *args], cwd=cwd, capture_output=True, text=True, env=env)


@pytest.fixture
def repo(tmp_path):
    """一個已提交既有音檔的小 repo；回傳 (repo 路徑, 收新音檔的資料夾, GITHUB_OUTPUT 檔)。"""
    r = tmp_path / 'repo'
    for f, body in [('audio/001.mp3', 'a'), ('audio/m/en/001.mp3', 'b'), ('score-rescue/audio/aa.mp3', 'c'),
                    ('score-rescue/audio/keep.mp3', 'd'), ('secret.txt', 'secret'), ('index.html', 'x')]:
        (r / f).parent.mkdir(parents=True, exist_ok=True)
        (r / f).write_text(body)
    git = lambda *a: subprocess.run(['git', '-c', 'user.name=t', '-c', 'user.email=t@t', *a], cwd=r, check=True, capture_output=True)
    git('init', '-q')
    git('add', '-A')
    git('commit', '-qm', 'seed')
    out = tmp_path / 'out'
    out.write_text('')
    return r, tmp_path / 'new-audio', out


def pack(repo):
    r, d, out = repo
    return sh(r, 'pack', str(d), env={**os.environ, 'GITHUB_OUTPUT': str(out)}), out.read_text()


def test_pack_copies_new_and_modified_mp3(repo):
    r, d, _ = repo
    (r / 'score-rescue/audio/bb.mp3').write_text('new')
    (r / 'audio/m/en/001.mp3').write_text('changed')
    p, out = pack(repo)
    assert p.returncode == 0, p.stdout + p.stderr
    assert out == 'changed=true\n'
    got = sorted(str(f.relative_to(d)) for f in d.rglob('*') if not f.is_dir())
    assert got == ['audio/m/en/001.mp3', 'score-rescue/audio/bb.mp3']
    assert all(not f.is_symlink() for f in d.rglob('*'))
    assert (d / 'score-rescue/audio/bb.mp3').read_text() == 'new'


def test_pack_without_changes(repo):
    p, out = pack(repo)
    assert p.returncode == 0 and out == 'changed=false\n'


@pytest.mark.parametrize('target', ['../../secret.txt', '/etc/hostname'])
def test_pack_rejects_symlink_with_audio_name(repo, target):
    # 名稱符合音檔規則的符號連結：cp 會把它指向的內容複製成一般檔案，所以必須在 pack 就擋下
    r, d, _ = repo
    (r / 'score-rescue/audio/bb.mp3').write_text('new')
    os.symlink(target, r / 'score-rescue/audio/cc.mp3')
    p, out = pack(repo)
    assert p.returncode != 0
    assert '符號連結' in p.stdout and 'score-rescue/audio/cc.mp3' in p.stdout
    assert out == '' and not d.exists()


def test_pack_rejects_symlink_replacing_existing_mp3(repo):
    r, d, _ = repo
    (r / 'score-rescue/audio/keep.mp3').unlink()
    os.symlink('../../secret.txt', r / 'score-rescue/audio/keep.mp3')
    p, out = pack(repo)
    assert p.returncode != 0 and out == '' and not d.exists()


@pytest.mark.parametrize('change', ['delete', 'other_file', 'not_mp3'])
def test_pack_rejects_other_changes(repo, change):
    r, d, _ = repo
    if change == 'delete':
        (r / 'score-rescue/audio/aa.mp3').unlink()
    elif change == 'other_file':
        (r / 'score-rescue/audio/bb.mp3').write_text('new')
        (r / 'audio/x.txt').write_text('x')
    else:
        (r / 'score-rescue/audio/bb.wav').write_text('x')
    p, out = pack(repo)
    assert p.returncode != 0 and out == '' and not d.exists()


def test_unpack_places_only_allowed_regular_files(repo, tmp_path):
    r, d, _ = repo
    (d / 'score-rescue/audio').mkdir(parents=True)
    (d / 'score-rescue/audio/bb.mp3').write_text('new')
    p = sh(r, 'unpack', str(d))
    assert p.returncode == 0, p.stdout + p.stderr
    assert (r / 'score-rescue/audio/bb.mp3').read_text() == 'new'


@pytest.mark.parametrize('bad', ['symlink', 'tools/publish_audio_pr.sh', 'audio/a/b/c/d.mp3', 'score-rescue/audio/x.mp3.js'])
def test_unpack_rejects(repo, bad):
    r, d, _ = repo
    (d / 'score-rescue/audio').mkdir(parents=True)
    if bad == 'symlink':
        os.symlink('/etc/hostname', d / 'score-rescue/audio/cc.mp3')
    else:
        (d / bad).parent.mkdir(parents=True, exist_ok=True)
        (d / bad).write_text('x')
    p = sh(r, 'unpack', str(d))
    assert p.returncode != 0
    assert subprocess.run(['git', 'status', '--porcelain'], cwd=r, capture_output=True, text=True).stdout == ''
