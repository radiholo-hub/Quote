"""購買視窗：有綠界收款連結（PAY_INFO.payUrl）時以線上付款為主，轉帳收進「改用銀行轉帳」；沒有連結時維持原本的轉帳流程。"""


def test_transfer_only_when_no_pay_url(app):
    app.js("()=>__t.openModal('30')")
    assert app.page.is_hidden('#payOnline')
    assert app.text('#mTitle') == '轉帳訂購'
    assert app.page.is_visible('#payAcct') and app.page.is_visible('#lineBtn'), '沒有線上付款時，轉帳資訊直接顯示'


def test_online_payment_first_when_pay_url_set(app):
    app.js("()=>{__t.PAY_INFO.payUrl='https://p.ecpay.com.tw/TEST123'}")
    app.js("()=>__t.openModal('30')")
    assert app.text('#mTitle') == '購買完整方案'
    btn = app.page.locator('#payLinkBtn')
    assert btn.is_visible() and btn.get_attribute('href') == 'https://p.ecpay.com.tw/TEST123'
    assert btn.get_attribute('target') == '_blank' and 'fire' in btn.get_attribute('class')
    steps = app.text('#payOnline .pay-steps')
    assert '要用來登入的 Email' in steps and '信用卡' in steps
    assert app.page.is_hidden('#payAcct'), '轉帳收起來'
    app.page.click('#payAlt > summary')
    assert app.page.is_visible('#payAcct')
    with app.page.expect_popup() as pop:
        btn.click()
    pop.value.close()
