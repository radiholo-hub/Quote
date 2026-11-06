"""學測英文練習（gsat/）的瀏覽器測試共用設定。直接開 file:// 的靜態頁面，不需要伺服器。"""
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
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch()
        yield b
        b.close()


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


def run_exam(page, year, correct=lambda q: True, limit='不計時', submit=True):
    """開始 year 年的模擬考，逐題作答。correct(q) 回傳 True 選正確答案、False 選一個錯的、None 跳過。"""
    page.goto(URL + '#/exam/' + year)
    page.get_by_role('button', name=limit, exact=False).first.click()
    page.get_by_role('button', name='開始作答').click()
    page.wait_for_selector('.opt')
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
