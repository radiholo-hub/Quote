"""學測英文練習（gsat/）的瀏覽器測試共用設定。直接開 file:// 的靜態頁面，不需要伺服器。"""
import os
import pathlib

import pytest
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]        # gsat/
URL = (ROOT / 'index.html').as_uri()
DEVICES = {
    'phone': dict(viewport={'width': 375, 'height': 667}, is_mobile=True, has_touch=True),
    'small': dict(viewport={'width': 320, 'height': 568}, is_mobile=True, has_touch=True),     # 最小的手機寬度
    'android': dict(viewport={'width': 360, 'height': 740}, is_mobile=True, has_touch=True),
    'tablet': dict(viewport={'width': 768, 'height': 1024}),
    'desktop': dict(viewport={'width': 1280, 'height': 800}),
}


@pytest.fixture(scope='session')
def pw():
    with sync_playwright() as p:
        yield p


@pytest.fixture(scope='session')
def browser(pw):
    b = pw.chromium.launch()
    yield b
    b.close()


@pytest.fixture(scope='session')
def webkit(pw):
    """Safari 的引擎（WebKit）。本機裝不到時略過；在 CI（設定 GSAT_REQUIRE_WEBKIT=1）找不到就直接失敗，不能悄悄略過。"""
    try:
        b = pw.webkit.launch()
    except Exception as e:                                   # noqa: BLE001
        if os.environ.get('GSAT_REQUIRE_WEBKIT') == '1':
            raise
        pytest.skip('這台機器沒有 WebKit：' + str(e).split('\n')[0][:80])
    yield b
    b.close()


@pytest.fixture
def make_ios_page(pw, webkit):
    """用 WebKit 加上 iPhone 13 的裝置設定（視窗、觸控、Safari 使用者代理）開頁面。"""
    ctxs = []

    def make(url=URL + '#/'):
        ctx = webkit.new_context(**pw.devices['iPhone 13'])
        ctxs.append(ctx)
        page = ctx.new_page()
        page.errors = []
        page.on('pageerror', lambda e: page.errors.append(str(e)))
        page.on('console', lambda m: page.errors.append(m.text) if m.type == 'error' else None)
        page.on('dialog', lambda d: d.accept())
        page.goto(url)
        return page

    yield make
    for c in ctxs:
        c.close()


@pytest.fixture
def make_page(browser):
    """make_page(device='phone', url=URL) → page。每個測試用全新的 context（localStorage 是空的）。頁面錯誤會收集在 page.errors。"""
    ctxs = []

    def make(device='phone', url=URL + '#/', dialogs='accept'):
        ctx = browser.new_context(**DEVICES[device])
        ctxs.append(ctx)
        page = ctx.new_page()
        page.errors = []
        page.on('pageerror', lambda e: page.errors.append(str(e)))
        page.on('console', lambda m: page.errors.append(m.text) if m.type == 'error' else None)
        if dialogs == 'accept':
            page.on('dialog', lambda d: d.accept())
        page.goto(url)
        return page

    yield make
    for c in ctxs:
        c.close()


def hscroll_overflow(page):
    """頁面是否出現橫向捲動（手機版最常見的版面問題）。"""
    return page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')


def wait_images(page):
    page.wait_for_function('[...document.images].every(i=>i.complete)', timeout=10000)
    return page.evaluate('[...document.images].filter(i=>i.naturalWidth===0).map(i=>i.src)')


def cur_q(page):
    """目前作答畫面的題目（從存檔的作答進度讀）。"""
    return page.evaluate('''()=>{const S=__gsat.loadSession();const q=__gsat.QB[S.ids[S.idx]];return {id:q.id,a:q.a,n:q.n,type:q.type,nopt:q.o.length,idx:S.idx,total:S.ids.length}}''')


def start_exam(page, year, mode='free', limit='不限時'):
    """開始 year 年的作答。mode='formal'＝正式模擬考（100 分鐘、不可暫停）；'free'＝自由練習（limit：'不限時' 或 '60 分鐘'）。"""
    page.goto(URL + '#/exam/' + year)
    if mode == 'formal':
        page.get_by_role('button', name='開始正式模擬考').click()          # 會跳出確認視窗，make_page 預設接受
    else:
        page.locator('[data-mode=free]').get_by_role('button', name=limit).click()
        page.get_by_role('button', name='開始自由練習').click()
    page.wait_for_selector('.opt')


def run_exam(page, year, correct=lambda q: True, mode='free', limit='不限時', submit=True):
    """開始 year 年的作答並逐題作答。correct(q) 回傳 True 選正確答案、False 選一個錯的、None 跳過。"""
    start_exam(page, year, mode, limit)
    while True:
        q = cur_q(page)
        want = correct(q)
        if want is not None:
            i = q['a'] if want else (q['a'] + 1) % q['nopt']
            page.locator('.opt').nth(i).click()
        if q['idx'] == q['total'] - 1:
            break
        page.get_by_role('button', name='下一題').click()
    if submit:
        page.get_by_role('button', name='交卷').click()
        page.locator('.modal .btn').first.click()
        page.wait_for_selector('h1:has-text("成績")')


def goto_question(page, n):
    """把目前的作答畫面切到題號 n（直接改存檔後重新載入；只用在沒有計時器的作答）。"""
    page.evaluate("""(n)=>{const k='gsat-session-v2';const s=JSON.parse(localStorage.getItem(k));s.idx=s.ids.findIndex(i=>__gsat.QB[i].n==n);localStorage.setItem(k,JSON.stringify(s))}""", n)
    page.reload()
    page.wait_for_selector('.opt')


def exam_present():
    p = ROOT / 'exam' / 'exams.js'
    return p.exists() and 'window.EXAMS = [{' in p.read_text(encoding='utf8')[:400]


needs_exam = pytest.mark.skipif(not exam_present(), reason='沒有歷屆試題內容（公開版本庫的乾淨分支）')
