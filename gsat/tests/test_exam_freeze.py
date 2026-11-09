"""凍結規則:公開版本庫不得再新增或改動權利尚未確認的考題素材(見 tools/gsat_exam_freeze.py)。乾淨分支(沒有 gsat/exam)時這個檢查沒有對象。"""
import subprocess
import sys

from conftest import ROOT

TOOL = ROOT.parent / 'tools' / 'gsat_exam_freeze.py'


def test_exam_material_matches_the_freeze_list():
    r = subprocess.run([sys.executable, '-I', str(TOOL)], capture_output=True, text=True)
    assert r.returncode == 0, r.stdout + r.stderr


def test_freeze_check_catches_a_new_or_changed_exam_file(tmp_path):
    """在複製的版本庫裡新增一個檔案、改動一個原始考題檔,檢查都要失敗。"""
    import shutil
    repo = tmp_path / 'r'
    (repo / 'tools').mkdir(parents=True); (repo / 'docs' / 'gsat').mkdir(parents=True)
    shutil.copy(TOOL, repo / 'tools' / 'gsat_exam_freeze.py'); shutil.copy(ROOT.parent / 'docs' / 'gsat' / 'exam-freeze.json', repo / 'docs' / 'gsat' / 'exam-freeze.json')
    if not (ROOT / 'exam').exists():
        return
    shutil.copytree(ROOT / 'exam', repo / 'gsat' / 'exam')
    run = lambda: subprocess.run([sys.executable, '-I', str(repo / 'tools' / 'gsat_exam_freeze.py')], capture_output=True, text=True)
    assert run().returncode == 0
    (repo / 'gsat' / 'exam' / 'new_exam.js').write_text('x')
    assert run().returncode == 1 and '新增了考題素材:gsat/exam/new_exam.js' in run().stdout
    (repo / 'gsat' / 'exam' / 'new_exam.js').unlink()
    with open(repo / 'gsat' / 'exam' / 'answers.js', 'a') as f: f.write('//x')
    assert run().returncode == 1 and '原始考題檔內容被改動:gsat/exam/answers.js' in run().stdout
