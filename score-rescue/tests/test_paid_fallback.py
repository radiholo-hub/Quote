"""付費確認的備援：伺服器確認付費時記下帳號與時間；之後連不上伺服器，且這台裝置仍保存同一個登入帳號，
從最後一次伺服器確認起 7 天內沿用付費資格。重新整理、斷線、快取都不延長；明確未付費、登出、換帳號立即停用。
付費資格的提示（#payNote）和進度同步失敗的提示（toast）分開。"""
import json
import re

import pytest

from conftest import ROOT, App, SB_TOKEN_KEY, STUB, TEST_PAGE

BLANK = ROOT / 'privacy.html'      # 同一來源、沒有程式的頁面，用來讀寫 localStorage

DAY = 864e5
REC = 'sr_paid_ok'


def open_page(browser, sb=None, cdn=True, before=None, clock=False):
    """開一個新分頁。sb：假伺服器設定（存在 Python，每次載入登入程式時寫入頁面）；cdn=False 模擬登入程式載入失敗；
    before：載入網站前，先在同一來源的空白頁執行的 JS（例如寫入 localStorage）。"""
    ctx = browser.new_context(viewport={'width': 390, 'height': 900})
    page = ctx.new_page()
    if clock:
        page.clock.install()
    app = App(page)
    app.ctx, app.sb, app.cdn = ctx, dict(sb or {}), cdn
    ctx.route('**/supabase-js@2*', lambda r: r.abort() if not app.cdn else
              r.fulfill(status=200, content_type='application/javascript', body='window.__SBK=%s;' % json.dumps(app.sb) + STUB))
    if before:
        page.goto(BLANK.as_uri())
        page.evaluate(before)
        committed(app)
    page.goto(TEST_PAGE.as_uri())
    page.wait_for_function('window.__t&&window.__t.S')
    page.wait_for_timeout(300)
    return app


def set_cdn(app, ok):
    app.cdn = ok


def knobs(app, **kw):
    """改假伺服器設定：之後重新整理會用新設定，目前開著的頁面也立即生效。"""
    app.sb = kw
    app.js("k=>{window.__SBK=k}", kw)


def committed(app):
    """等 localStorage 的寫入確實交給瀏覽器（從另一個分頁讀得到）再繼續，避免緊接著重新整理時讀到舊資料。"""
    want = app.page.evaluate('JSON.stringify(Object.assign({},localStorage))')
    other = app.ctx.new_page()
    other.goto(BLANK.as_uri())
    other.wait_for_function('w=>JSON.stringify(Object.assign({},localStorage))===w', arg=want)
    other.close()


def reload(app):
    committed(app)
    app.page.reload()
    app.page.wait_for_function('window.__t&&window.__t.S')
    app.page.wait_for_timeout(300)


def state(app):
    return app.js("""()=>{const n=document.getElementById('payNote');
      return {paid:!!__t.S.paid,days:__t.coveredDays(),rec:JSON.parse(localStorage.getItem('%s')||'null'),
              note:n.hidden?'':n.textContent,now:Date.now()}}""" % REC)


def set_at(app, offset_ms):
    """把確認時間改成「現在 + offset」，模擬時間經過。"""
    app.js("o=>{const r=JSON.parse(localStorage.getItem('%s'));r.at=Date.now()+o;localStorage.setItem('%s',JSON.stringify(r))}" % (REC, REC), offset_ms)
    return state(app)['rec']['at']


@pytest.fixture
def pages():
    opened = []
    yield opened
    for app in opened:
        errs = list(app.errors)
        app.ctx.close()
        assert not errs, '頁面錯誤：%s' % errs


@pytest.fixture
def paid_app(browser, pages):
    """伺服器已確認付費的分頁。"""
    app = open_page(browser, sb={'paid': True})
    pages.append(app)
    st = state(app)
    assert st['paid'] and st['rec']['uid'] == '1' and abs(st['now'] - st['rec']['at']) < 60000 and st['note'] == ''
    return app


def test_offline_reload_keeps_access_until_7_days_and_never_extends(paid_app):
    app = paid_app
    at = set_at(app, -6 * DAY)
    knobs(app, fail=['paid_users'])
    for _ in range(2):          # 重新整理兩次：都沿用，確認時間不變
        reload(app)
        st = state(app)
        assert st['paid'] and st['days'] == 30
        assert st['rec']['at'] == at
        assert '暫時沿用' in st['note']
    # 到期時間顯示完整日期與時間，等於最後一次確認 + 7 天
    want = app.js("t=>{const d=new Date(t),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'/'+p(d.getMonth()+1)+'/'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())}", at + 7 * DAY)
    assert re.fullmatch(r'\d{4}/\d{2}/\d{2} \d{2}:\d{2}', want) and ('可使用至 ' + want + '。') in st['note']
    # 登入程式（CDN）也載入失敗：用這台裝置保存的同一個登入帳號，仍在期限內
    set_cdn(app, False)
    reload(app)
    st = state(app)
    assert st['paid'] and st['rec']['at'] == at
    # 超過 7 天：停用，顯示另一則提示
    set_at(app, -7 * DAY - 60000)
    reload(app)
    st = state(app)
    assert not st['paid'] and st['days'] == 7
    assert '已超過 7 天' in st['note'] and '暫時無法使用付費功能' in st['note']


def test_device_clock_set_back_does_not_extend(paid_app):
    app = paid_app
    set_at(app, 3600 * 1000)    # 確認時間在「現在」之後：裝置時間被調回
    knobs(app, fail=['paid_users'])
    reload(app)
    assert not state(app)['paid']


def test_expires_while_page_stays_open(browser, pages):
    # 期限只剩 90 秒時開著頁面；時間過 3 分鐘後自動停用
    app = open_page(browser, sb={'fail': ['paid_users']}, clock=True,
                    before="localStorage.setItem('%s',JSON.stringify({uid:'1',at:Date.now()-%d+90000}))" % (REC, 7 * DAY))
    pages.append(app)
    assert state(app)['paid']
    app.page.clock.fast_forward('03:00')
    app.page.wait_for_timeout(200)
    st = state(app)
    assert not st['paid'] and '已超過 7 天' in st['note'] and '暫時無法使用付費功能' in st['note']


def test_server_says_unpaid_stops_immediately(paid_app):
    app = paid_app
    knobs(app, paid=False)
    reload(app)
    st = state(app)
    assert not st['paid'] and st['rec'] is None
    knobs(app, fail=['paid_users'])
    reload(app)
    st = state(app)
    assert not st['paid'] and st['note'] == ''


def test_logout_stops_immediately(paid_app):
    app = paid_app
    app.page.on('dialog', lambda d: d.accept())
    app.page.click('#btnAccount')
    app.page.wait_for_timeout(300)
    st = state(app)
    assert not st['paid'] and st['rec'] is None
    assert app.js("localStorage.getItem('%s')" % SB_TOKEN_KEY) is None
    knobs(app, user=None, fail=['paid_users'])
    set_cdn(app, False)
    reload(app)
    st = state(app)
    assert not st['paid'] and st['note'] == ''


def test_switching_account_stops_immediately(paid_app):
    app = paid_app
    knobs(app, fail=['paid_users'])
    app.js("()=>window.__sbEmit('SIGNED_IN',{user:{id:'2',email:'x@y.z'}})")
    app.page.wait_for_timeout(300)
    st = state(app)
    assert not st['paid'] and st['rec'] is None and st['note'] == ''


@pytest.mark.parametrize('saved,ok', [(None, False), ('2', False), ('1', True)])
def test_library_load_failure_needs_same_saved_account(browser, pages, saved, ok):
    token = "localStorage.setItem('%s',JSON.stringify({user:{id:'%s'}}));" % (SB_TOKEN_KEY, saved) if saved else ''
    app = open_page(browser, cdn=False,
                    before=token + "localStorage.setItem('%s',JSON.stringify({uid:'1',at:Date.now()-%d}))" % (REC, DAY))
    pages.append(app)
    assert state(app)['paid'] is ok


def test_payment_and_sync_notices_are_separate(browser, pages):
    def toast(app):
        return app.js("()=>{const t=document.getElementById('toast');return t&&!t.hidden?t.textContent:''}")
    # 只有進度同步失敗：顯示同步失敗，沒有付費提示
    a = open_page(browser, sb={'paid': True, 'fail': ['progress']})
    pages.append(a)
    assert '同步失敗' in toast(a) and state(a)['note'] == '' and state(a)['paid']
    # 只有付費確認失敗：顯示付費提示，不顯示同步失敗
    knobs(a, fail=['paid_users'])
    reload(a)
    assert '暫時沿用' in state(a)['note'] and '同步失敗' not in toast(a)
    # 兩者都失敗：兩則提示各自顯示
    knobs(a, fail=['paid_users', 'progress'])
    reload(a)
    note, t = state(a)['note'], toast(a)
    assert '暫時沿用' in note and '同步失敗' in t and '同步' not in note


def test_record_is_not_part_of_progress_or_backup(paid_app):
    app = paid_app
    blob = app.js('__t.backupBlob()')
    assert 'paid' not in json.dumps(blob)
    rec = state(app)['rec']
    app.js("b=>{__t.applyBlob(b);__t.save()}", dict(blob, savedAt=blob['savedAt'] + 1))
    assert state(app)['rec'] == rec


def test_reconfirms_when_back_online(paid_app):
    app = paid_app
    set_at(app, -5 * DAY)
    knobs(app, fail=['paid_users'])
    reload(app)
    assert '暫時沿用' in state(app)['note']
    knobs(app, paid=True)       # 伺服器恢復
    app.js("()=>window.dispatchEvent(new Event('online'))")
    app.page.wait_for_timeout(300)
    st = state(app)
    assert st['paid'] and st['note'] == '' and abs(st['now'] - st['rec']['at']) < 60000


# 查詢與帳號的對應：較舊、或屬於前一個帳號的回應，晚到也不能恢復資格或寫入備援紀錄
def test_logout_while_query_pending(paid_app):
    app = paid_app
    knobs(app, paid=True, delays=[1500])
    app.js("()=>{__t.fetchPaid()}")            # 這個查詢會回覆「已付費」，但 1.5 秒後才到
    app.page.on('dialog', lambda d: d.accept())
    app.page.click('#btnAccount')               # 查詢還沒回來就登出
    app.page.wait_for_timeout(100)
    assert not state(app)['paid']
    app.page.wait_for_timeout(2000)             # 舊回應抵達
    st = state(app)
    assert not st['paid'] and st['rec'] is None and st['days'] == 7


def test_switch_account_while_query_pending(paid_app):
    app = paid_app
    # 帳號 1 已付費、帳號 2 未付費；帳號 1 的查詢 2 秒後才到，帳號 2 的查詢 0.3 秒後到
    knobs(app, paidUsers=['1'], delays=[2000, 300])
    app.js("()=>{__t.fetchPaid()}")
    app.js("()=>window.__sbEmit('SIGNED_IN',{user:{id:'2',email:'x@y.z'}})")
    app.page.wait_for_timeout(100)
    assert not state(app)['paid']               # 換帳號當下立即停用，不等新帳號的查詢
    app.page.wait_for_timeout(2500)             # 新帳號回覆未付費，之後帳號 1 的舊回應才到
    st = state(app)
    assert not st['paid'] and st['rec'] is None and st['days'] == 7


def test_older_success_after_newer_unpaid(paid_app):
    app = paid_app
    knobs(app, paid=True, delays=[2000, 0])
    app.js("()=>{__t.fetchPaid()}")            # 較舊的查詢：已付費，2 秒後才到
    app.js("()=>{window.__SBK.paid=false}")     # 之後伺服器改為未付費
    app.js("__t.fetchPaid()")                   # 較新的查詢：立即回覆未付費
    st = state(app)
    assert not st['paid'] and st['rec'] is None
    app.page.wait_for_timeout(2500)             # 較舊的成功回應才抵達
    st = state(app)
    assert not st['paid'] and st['rec'] is None and st['note'] == ''
