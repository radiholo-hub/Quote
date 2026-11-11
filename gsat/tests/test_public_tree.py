"""公開版防誤提交：Git 追蹤中的檔案（repository 現行來源）不得是 Azure F0 開發測試音檔（azure-free-test）。
簽核 audio.devTestChecks 裡記錄 azure-free-test 是「審核歷史」，不算違規。這項檢查只存在於公開版流程；
完整的 F0 本機驗證快照（local/gsat-f0-dev-audio-snapshot）是另一條不推送的分支，不受影響。"""
import importlib.util
import json
import subprocess
import sys

from conftest import ROOT

REPO = ROOT.parent
spec = importlib.util.spec_from_file_location('gsat_audio_provenance', REPO / 'tools' / 'gsat_audio_provenance.py')
prov = importlib.util.module_from_spec(spec)
spec.loader.exec_module(prov)
H = 'a' * 64


def test_real_repository_tracks_no_f0_development_test_audio():
    p = subprocess.run([sys.executable, str(REPO / 'tools' / 'gsat_audio_provenance.py'), 'check-public'], cwd=REPO, capture_output=True, text=True)
    assert p.returncode == 0, p.stdout + p.stderr
    rec = prov.load(REPO / 'docs' / 'gsat' / 'audio-provenance.json')
    assert not [f for f, e in rec['files'].items() if e['engine'] == 'azure-free-test']
    tracked = prov.tracked_audio(REPO)
    assert len(tracked) == 187 and all(rec['files'][f]['sha256'] == h for f, h in tracked.items())      # 追蹤中的 187 個 = 來源紀錄裡的 baseline edge-tts


def test_legitimate_dev_check_history_is_not_a_violation():
    signoff = {'audio': {'devTestChecks': [{'engine': 'azure-free-test', 'files': [{'file': 'x.mp3', 'sha256': H}]}]}}
    rec = {'files': {'y.mp3': {'engine': 'edge-tts', 'sha256': 'b' * 64}}}
    assert prov.public_tree_problems({'y.mp3': 'b' * 64}, rec, [signoff]) == []


def test_tracked_f0_files_or_f0_provenance_are_rejected():
    signoff = {'audio': {'devTestChecks': [{'engine': 'azure-free-test', 'files': [{'file': 'x.mp3', 'sha256': H}]}]}}
    good = {'files': {'x.mp3': {'engine': 'edge-tts', 'sha256': H}}}
    assert any('F0 開發測試音檔' in b for b in prov.public_tree_problems({'x.mp3': H}, good, [signoff]))             # 追蹤了 F0 binary（雜湊與審核歷史相符）
    f0 = {'files': {'x.mp3': {'engine': 'azure-free-test', 'sha256': 'c' * 64}}}
    assert any('azure-free-test' in b for b in prov.public_tree_problems({'x.mp3': 'c' * 64}, f0, []))               # 來源紀錄把現行檔案登記為 F0
    assert any('沒有來源紀錄' in b for b in prov.public_tree_problems({'z.mp3': 'd' * 64}, {'files': {}}, []))
    assert any('雜湊不符' in b for b in prov.public_tree_problems({'x.mp3': 'e' * 64}, good, []))


def test_audio_workflow_never_commits_free_tier_audio():
    """free-test 只上傳 artifact；commit／push 只可能發生在 paid 的提交工作，且該工作會拒絕非 azure-paid 的來源紀錄。"""
    t = (REPO / '.github' / 'workflows' / 'gsat-audio-preview.yml').read_text(encoding='utf8')
    gen, com = t.split('\n  commit:\n')
    assert "inputs.tier == 'paid'" in com.split('steps:')[0]                       # 提交工作只在 paid 執行
    assert 'git push' not in gen and 'git commit' not in gen and 'contents: write' not in gen
    assert 'contents: read' in gen and 'upload-artifact' in gen
    assert "!= 'azure-paid'" in com and 'azure-free-test' not in com.replace('F0／edge-tts', '')        # 提交前再檢查來源紀錄
    assert 'options: [free-test, paid]' in t and 'default: free-test' in t
    assert '--tier "$TIER"' in gen and 'edge_tts' not in t and 'pip install edge-tts' not in t
