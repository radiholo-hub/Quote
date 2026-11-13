"""完整方案課程（第 4～7 課）的登入與付費檢查：匿名訪客、未購帳號、已購帳號三種情境。
課程內容不在公開頁面裡：外殼只負責登入、確認 paid_users，再從私有儲存空間（Supabase Storage 的 lessons 儲存桶）載入。
這裡用假的課程內容測流程，CI 不需要 private/。"""
import json
import re

import pytest

from conftest import ROOT, GATE_STUB, PRIVATE

PAID = [4, 5, 6, 7]
FAKE = ("DEMOS=[{id:'FAKE-DEMO',t:'t',s:'A ______ b.',o:['w','x','y','z'],a:0,how:[],ex:'',zh:''}];"
        "PR=[{id:'FAKE-PR',s:'A ______ b.',o:['w','x','y','z'],a:0,c:'X',work:'w',why:'y',x:[null,'x','y','z'],zh:''}];"
        "CHK=[];"
        "viewLesson=function(){render('<div id=\"fakeLesson\"><video id=\"l1video\" src=\"'+esc(VIDEO)+'\"></video></div>')};"
        "viewDone=function(){};")
USER = {'email': 'student@example.com', 'id': 'u9'}


@pytest.fixture
def open_lesson(browser):
    ctxs = []

    def _open(n, user=USER, paid=False, files=None):
        ctx = browser.new_context(viewport={'width': 390, 'height': 844})
        ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=GATE_STUB))
        g = {'user': user, 'paid': paid, 'files': {'l%d.js' % n: FAKE} if files is None else files}
        ctx.add_init_script('window.__GATE=%s;' % json.dumps(g))
        p = ctx.new_page()
        errs = []
        p.on('pageerror', lambda e: errs.append(str(e)))
        p.goto((ROOT / 'pos' / ('l%d.html' % n)).as_uri())
        ctxs.append((ctx, errs))
        return p

    yield _open
    for ctx, errs in ctxs:
        ctx.close()
        assert not errs, errs


def log(p):
    return p.evaluate('window.__gateLog')


@pytest.mark.parametrize('n', PAID)
def test_public_shell_has_no_lesson_content(n):
    shell = (ROOT / 'pos' / ('l%d.html' % n)).read_text(encoding='utf-8')
    assert 'var LESSON_NO=%d' % n in shell
    assert not re.search(r'L%d-(DEMO|PR|CHK)-\d' % n, shell), '外殼不能含題目'
    assert 'lesson%d.mp4' % n not in shell.replace("'lesson'+LESSON_NO+'.mp4'", '')
    assert not (ROOT / 'pos' / ('lesson%d.mp4' % n)).exists(), '影片不放在公開資料夾'
    manifest = (ROOT / 'pos' / 'audio-texts.json').read_text(encoding='utf-8')
    if (PRIVATE / ('l%d.js' % n)).exists():
        code = (PRIVATE / ('l%d.js' % n)).read_text(encoding='utf-8')
        for s in re.findall(r'"s": "([^"]+)"', code)[:6]:
            assert s not in shell, '外殼不能含題幹'
            assert s.replace('______', '') not in manifest


@pytest.mark.parametrize('n', PAID)
def test_anonymous_sees_login_and_plan_only(open_lesson, n):
    p = open_lesson(n, user=None)
    p.wait_for_selector('#lf')
    t = p.inner_text('#app')
    assert '詞性小課 第 %d 課（完整方案）' % n in t and '已經購買？登入就能上課' in t
    assert p.get_attribute('#toPlan', 'href') == '../#pricing'
    assert not any(x.startswith(('download', 'sign', 'select')) for x in log(p)), '沒登入不查付費、不下載內容'
    assert p.evaluate('typeof window.__pos') == 'undefined'
    p.on('dialog', lambda d: d.accept())
    p.fill('#le', 'student@example.com')
    p.click('#ls')
    p.wait_for_function("document.getElementById('lm').textContent.indexOf('已寄出')===0")
    otp = [x for x in log(p) if x.startswith('otp:')]
    assert otp and otp[0].startswith('otp:student@example.com>') and otp[0].endswith('/pos/l%d.html' % n), '登入連結回到這一課'


def test_login_link_then_paid_loads_lesson(open_lesson):
    p = open_lesson(4, user=None, paid=True)
    p.wait_for_selector('#lf')
    p.evaluate("window.__gateEmit('SIGNED_IN',{user:%s})" % json.dumps(USER))   # 點開信裡的登入連結
    p.wait_for_selector('#fakeLesson')


def test_bad_email_not_sent(open_lesson):
    p = open_lesson(5, user=None)
    p.wait_for_selector('#lf')
    p.fill('#le', 'not-an-email')
    p.click('#ls')
    assert p.inner_text('#lm') == '請輸入正確的 Email。'
    assert not [x for x in log(p) if x.startswith('otp:')]


@pytest.mark.parametrize('n', PAID)
def test_unpaid_account_sees_plan_not_content(open_lesson, n):
    p = open_lesson(n, paid=False)
    p.wait_for_selector('#swap')
    assert '這個帳號還沒開通完整方案' in p.inner_text('#app')
    assert p.inner_text('#who') == 'student@example.com'
    assert p.get_attribute('#toPlan', 'href') == '../#pricing'
    assert 'select:paid_users' in log(p) and not [x for x in log(p) if x.startswith('download')]
    assert p.evaluate('typeof window.__pos') == 'undefined'
    p.click('#swap')
    p.wait_for_selector('#lf')
    assert 'signout' in log(p)


def test_unpaid_cannot_download_even_if_forced(open_lesson):
    """繞過畫面直接呼叫下載：儲存桶規則拒絕（假伺服器照規則回錯誤）。"""
    p = open_lesson(6, paid=False)
    p.wait_for_selector('#swap')
    r = p.evaluate("window.supabase.createClient().storage.from('lessons').download('l6.js').then(r=>r.error&&r.error.message)")
    assert r == 'not allowed'


@pytest.mark.parametrize('n', PAID)
def test_paid_account_loads_private_content_and_signed_video(open_lesson, n):
    p = open_lesson(n, paid=True)
    p.wait_for_selector('#fakeLesson')
    assert p.get_attribute('#l1video', 'src') == 'https://signed.test/lessons/lesson%d.mp4?token=t' % n
    assert 'download:lessons/l%d.js' % n in log(p) and 'sign:lessons/lesson%d.mp4' % n in log(p)
    assert p.evaluate('__pos.PR[0].id') == 'FAKE-PR'


def test_paid_but_content_missing_shows_error(open_lesson):
    p = open_lesson(7, paid=True, files={})
    p.wait_for_function("document.getElementById('app').innerText.indexOf('課程暫時載入失敗')>=0")
