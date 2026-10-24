"""付費確認的備援：伺服器確認付費時記下帳號與時間；之後連不上伺服器，且這台裝置仍保存同一個登入帳號，
從最後一次伺服器確認起 7 天內沿用付費資格。重新整理、斷線、快取都不延長；明確未付費、登出、換帳號立即停用。
付費資格的提示（#payNote）和進度同步失敗的提示（toast）分開。"""
import json

import pytest

from conftest import App, SB_TOKEN_KEY, STUB, TEST_PAGE

DAY = 864e5
REC = 'sr_paid_ok'


def open_page(browser, sb=None, cdn=True, before=None, clock=False):
    """開一個新分頁。sb：假伺服器設定（存在 sessionStorage，重新整理後仍保留）；cdn=False 模擬登入程式載入失敗；
    before：載入前在頁面執行的 JS（例如寫入 localStorage）。"""
    ctx = browser.new_context(viewport={'width': 390, 'height': 900})
    page = ctx.new_page()
    if clock:
        page.clock.install()
    init = "if(!sessionStorage.getItem('__sb'))sessionStorage.setItem('__sb',%s);" % json.dumps(json.dumps(sb or {}))
    if before:
        init += "if(!sessionStorage.getItem('__before')){sessionStorage.setItem('__before','1');%s}" % before
    ctx.add_init_script(init)
    set_cdn(ctx, cdn)
    app = App(page)
    app.ctx = ctx
    page.goto(TEST_PAGE.as_uri())
    page.wait_for_function('window.__t&&window.__t.S')
    page.wait_for_timeout(300)
    return app


def set_cdn(ctx, ok):
    ctx.unroute('**/supabase-js@2*')
    if ok:
        ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=STUB))
    else:
        ctx.route('**/supabase-js@2*', lambda r: r.abort())


def knobs(app, **kw):
    app.js("k=>sessionStorage.setItem('__sb',JSON.stringify(k))", kw)


def reload(app):
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
    # 登入程式（CDN）也載入失敗：用這台裝置保存的同一個登入帳號，仍在期限內
    set_cdn(app.ctx, False)
    reload(app)
    st = state(app)
    assert st['paid'] and st['rec']['at'] == at
    # 超過 7 天：停用，顯示另一則提示
    set_at(app, -7 * DAY - 60000)
    reload(app)
    st = state(app)
    assert not st['paid'] and st['days'] == 3
    assert '已超過 7 天' in st['note']


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
    assert not st['paid'] and '已超過 7 天' in st['note']


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
    set_cdn(app.ctx, False)
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
