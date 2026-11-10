"""正式 TTS（Azure）重產流程：用「假的 Azure 回應」在暫存副本上完整演練，不連網、不動真正的 repo。
驗證：沒有金鑰就停止且不產生任何檔案；有金鑰時 187 個全部重產並登記為正式來源；重試不改語速；
已簽核的 17 個音檔內容改變後，試聽簽核自動作廢，但文字簽核仍有效、沒有任何新檔被標為通過。"""
import json
import os
import shutil
import subprocess
import sys

import pytest

from conftest import ROOT, needs_exam

REPO = ROOT.parent
pytestmark = [needs_exam, pytest.mark.skipif(shutil.which('node') is None, reason='需要 node')]
FAKE = ("    import os as _o, urllib.error as _e\n"
        "    _c = _o.environ['RATE_LOG'] + '.n'\n"
        "    _n = int(open(_c).read()) if _o.path.exists(_c) else 0; open(_c, 'w').write(str(_n + 1))\n"
        "    if _n in (3, 4): raise _e.HTTPError('u', 429, 'Too Many Requests', {'Retry-After': '0'}, None)\n"          # 第 4、5 次請求模擬 F0 速率限制
        "    path.write_bytes(b'ID3' + (VOICE + RATE + text).encode() * 40)\n"
        "    open(_o.environ['RATE_LOG'], 'a').write(RATE + '\\n')\n")


@pytest.fixture(scope='module')
def sandbox(tmp_path_factory):
    r = tmp_path_factory.mktemp('regen')
    shutil.copytree(ROOT, r / 'gsat', ignore=shutil.ignore_patterns('__pycache__', '.pytest_cache', 'tests', 'img'))
    shutil.copytree(REPO / 'tools', r / 'tools', ignore=shutil.ignore_patterns('__pycache__'))
    shutil.copytree(REPO / 'docs', r / 'docs')
    t = (r / 'tools' / 'make_score_rescue_audio.py').read_text(encoding='utf8')
    old = '    with urllib.request.urlopen(req, timeout=60) as r:\n        path.write_bytes(r.read())\n'
    assert old in t
    (r / 'tools' / 'make_score_rescue_audio.py').write_text(t.replace(old, FAKE), encoding='utf8')
    return r


def run(r, *args, key=True):
    env = {k: v for k, v in os.environ.items() if not k.startswith(('AZURE', 'GSAT_'))}
    env['RATE_LOG'] = str(r / 'rates.log'); env['GSAT_TTS_NO_SLEEP'] = '1'
    if key:
        env.update(AZURE_SPEECH_KEY='fake', AZURE_SPEECH_REGION='fakeregion')
    return subprocess.run([sys.executable, 'tools/make_gsat_audio.py', *args], cwd=r, env=env, capture_output=True, text=True)


def prov_of(r):
    return json.loads((r / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8'))['files']


def pcheck(r, *a):
    return subprocess.run([sys.executable, 'tools/gsat_audio_provenance.py', 'check', *a], cwd=r, capture_output=True, text=True)


def stage_count(r):
    for f in ['index.html', 'style.css', 'app.js', 'quotes.js', 'audio/1.mp3', 'score-rescue/index.html']:
        (r / f).parent.mkdir(parents=True, exist_ok=True); (r / f).write_text('x')
    shutil.rmtree(r / '_site', ignore_errors=True)
    out = subprocess.run(['bash', 'tools/stage_site.sh', '_site'], cwd=r, capture_output=True, text=True)
    assert out.returncode == 0, out.stdout + out.stderr
    return len(list((r / '_site' / 'gsat' / 'audio').glob('*.mp3')))


def test_regeneration_flow_free_tier_then_paid(sandbox):
    r = sandbox
    sign = r / 'docs' / 'gsat' / 'signoffs' / '115-1.json'
    audio_before = {p.name: p.read_bytes() for p in (r / 'gsat' / 'audio').glob('*.mp3')}
    prov0 = (r / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8')
    # 1) 沒有金鑰：停止、不退回 edge-tts、不動任何檔案
    p = run(r, '--tier', 'free-test', '--force', key=False)
    assert p.returncode != 0 and 'AZURE_SPEECH_KEY' in p.stdout + p.stderr and 'edge' in (p.stdout + p.stderr)
    assert {q.name: q.read_bytes() for q in (r / 'gsat' / 'audio').glob('*.mp3')} == audio_before
    assert (r / 'docs' / 'gsat' / 'audio-provenance.json').read_text(encoding='utf8') == prov0
    # 2) 有金鑰但沒說是哪一層：拒絕（不預設，避免測試音檔被誤標）
    p = run(r, '--force')
    assert p.returncode != 0 and '--tier' in p.stdout + p.stderr and {q.name: q.read_bytes() for q in (r / 'gsat' / 'audio').glob('*.mp3')} == audio_before
    # 3) 免費層 F0：全部重產（含模擬 429 速率限制後以相同設定重試），登記為開發測試音檔
    p = run(r, '--tier', 'free-test', '--min-interval', '0', '--force')
    assert p.returncode == 0, p.stdout + p.stderr
    assert '速率限制 HTTP 429' in p.stdout and '註' not in p.stderr
    after = {q.name: q.read_bytes() for q in (r / 'gsat' / 'audio').glob('*.mp3')}
    assert set(after) == set(audio_before) and all(after[k] != audio_before[k] for k in after) and len(after) == 187
    rates = (r / 'rates.log').read_text().split()
    assert len(rates) == 187 and set(rates) == {'-8%', '-35%'} and rates.count('-35%') == 5          # 429 後仍是原語速；沒有 +0% 退回
    prov = prov_of(r)
    assert len(prov) == 187 and all(e['engine'] == 'azure-free-test' and e['tier'] == 'F0' and e['usage'] == 'development-test-only'
                                    and e['productionApproved'] is False and e['voice'] == 'en-US-AriaNeural' for e in prov.values())
    assert 'dev-test 187' in pcheck(r).stdout and pcheck(r).returncode == 0                          # 開發用：來源紀錄完整
    assert pcheck(r, '--require-production').returncode == 1                                          # 但不是 production
    assert stage_count(r) == 0                                                                        # 正式部署整理不含任何 F0 測試音檔
    q = subprocess.run([sys.executable, 'tools/gsat_audio_test_page.py', '--out', str(r / 'q1.html'), '--embed', '--q', '115-1'], cwd=r, capture_output=True, text=True)
    assert q.returncode == 0, q.stdout + q.stderr                                                     # F0 檔案在本機可產生 Q1 試聽頁（公開樹的 edge-tts 檔不行）
    t = (r / 'q1.html').read_text(encoding='utf8')
    assert t.count('class="row"') == 17 and 'Azure Speech F0 · development-test audio' in t
    # 4) 簽核：Q1 試聽簽核作廢；文字簽核與指紋不變；沒有任何通過的音檔；F0 檔案不能被簽成 production
    rec = json.loads(sign.read_text(encoding='utf8')); a = rec['audio']
    assert a['status'] == 'invalidated' and a['approvedFiles'] == [] and len(a['previousApproval']['approvedFiles']) == 17
    assert rec['status'] == 'passed' and rec['contentFingerprint']['value'] == json.loads((REPO / 'docs' / 'gsat' / 'signoffs' / '115-1.json').read_text(encoding='utf8'))['contentFingerprint']['value']
    assert subprocess.run([sys.executable, 'tools/gsat_signoff.py', 'check'], cwd=r, capture_output=True, text=True).returncode == 0
    ap = subprocess.run([sys.executable, 'tools/gsat_signoff.py', 'approve-audio', '115-1', '--reviewer', 'x', '--date', '2026-12-01', '--confirm-listened'], cwd=r, capture_output=True, text=True)
    assert ap.returncode != 0 and 'azure-paid' in ap.stdout + ap.stderr and json.loads(sign.read_text(encoding='utf8'))['audio']['status'] == 'invalidated'
    # 5) 再跑一次 free-test：已是此來源 → 不重做、簽核不變
    sign_text = sign.read_text(encoding='utf8')
    p = run(r, '--tier', 'free-test', '--min-interval', '0')
    assert p.returncode == 0 and '產生 0 段' in p.stdout and sign.read_text(encoding='utf8') == sign_text
    # 6) 未來正式版：付費層重產 → 全部換成 azure-paid／production，可部署；文字簽核仍有效
    p = run(r, '--tier', 'paid')
    assert p.returncode == 0, p.stdout + p.stderr
    prov = prov_of(r)
    assert all(e['engine'] == 'azure-paid' and e['tier'] == 'S0' and e['usage'] == 'production' and e['productionApproved'] is True for e in prov.values()) and len(prov) == 187
    assert pcheck(r, '--require-production').returncode == 0 and 'production 187' in pcheck(r).stdout
    assert stage_count(r) == 187
    assert subprocess.run([sys.executable, 'tools/gsat_signoff.py', 'check'], cwd=r, capture_output=True, text=True).returncode == 0
    assert json.loads(sign.read_text(encoding='utf8'))['audio']['status'] == 'invalidated'            # 音檔仍需教師重新聆聽，文字簽核不用重做
