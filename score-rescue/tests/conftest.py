"""Score Rescue 瀏覽器測試的共用設定。

做法：把 index.html 複製成 .test-index.html，並在主程式最後掛上 window.__t，
讓測試能直接讀寫內部狀態（S、題庫、抽題與計分函式）。Supabase 由假伺服器代替，
查詢方式和真實 Supabase 相同（select().eq().maybeSingle()），付費與否由測試指定。
"""
import os
import pathlib

import pytest
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]          # score-rescue/
SRC = ROOT / 'index.html'
TEST_PAGE = ROOT / '.test-index.html'                      # 放在同一層，音檔等相對路徑才找得到
AUDIO_TOOL = ROOT.parent / 'tools' / 'make_score_rescue_audio.py'

EXPOSE = [
    'S', 'BANK', 'PBANK', 'TBANK', 'RBANK', 'TAGS', 'LET', 'EXAM_STEMS',
    'readingItem', 'srHash', 'analyze', 'prep', 'pickFor', 'seenReviewList', 'wrongReviewList',
    'drawDiag', 'retestMix', 'finishDiag', 'tagState', 'tagLevel', 'freshLeft', 'chFreshList',
    'canChallenge', 'startPlanDay', 'startMore', 'startMoreReview',
    'startChallenge', 'startFreeMore', 'showScore', 'renderPlan', 'planRanked', 'doneCount',
    'runQuiz', 'applyBlob', 'backupBlob', 'fetchPaid', 'save', 'show', 'go', 'examAllowed', 'coveredDays', 'LV_V0',
]

# 假 Supabase：登入中的使用者 a@b.c；window.__SB_PAID 決定付費名單裡有沒有他。
# 另可在 STUB 前面加上 window.__SBK={...} 指定（test_paid_fallback.py 每次載入時由 Python 寫入）：
#   paid（覆蓋 __SB_PAID）、paidUsers（付費帳號 id 清單，依查詢送出當下的登入帳號判斷）、
#   delays（付費查詢依序延遲的毫秒數，用完為止）、fail（查詢失敗的資料表，例如 ["paid_users"]）、user（null 表示沒有登入；或 {id,email}）。
#   回應內容在查詢送出當下決定，延遲只影響抵達時間。
# 和真實的登入程式一樣，登入資料存在 localStorage 的 sb-…-auth-token；登出時刪除並通知 SIGNED_OUT。
SB_TOKEN_KEY = 'sb-uzesrnvtbplloqqgmhcl-auth-token'
STUB = """window.supabase={createClient:()=>{
  const K=()=>window.__SBK||{};
  const fail=t=>(K().fail||[]).indexOf(t)>=0;
  const user=()=>{const k=K();return 'user' in k?k.user:{email:'a@b.c',id:'1'}};
  let cur=null;
  const paid=()=>{const k=K();return 'paidUsers' in k?k.paidUsers.indexOf(cur&&cur.id)>=0:'paid' in k?k.paid:!!window.__SB_PAID};
  const q=t=>{const v=fail(t)?{data:null,error:{message:'fail'}}:({data:t==='paid_users'?(paid()?[{email:'a@b.c'}]:[]):[],error:null});
    const d=t==='paid_users'?((K().delays||[]).shift()||0):0;
    const p=d?new Promise(ok=>setTimeout(()=>ok(v),d)):Promise.resolve(v);p.eq=function(){return this};
    p.maybeSingle=async()=>fail(t)?{data:null,error:{message:'fail'}}:{data:null,error:null};return p};
  let cb=null;
  return{auth:{getSession:async()=>{const u=user();cur=u;if(u)localStorage.setItem('%s',JSON.stringify({user:u}));return {data:{session:u?{user:u}:null}}},
    onAuthStateChange:f=>{cb=f;window.__sbEmit=(ev,s)=>{cur=(s&&s.user)||null;cb&&cb(ev,s)};return {data:{subscription:{unsubscribe(){}}}}},
    signInWithOtp:async()=>({}),signOut:async()=>{localStorage.removeItem('%s');cur=null;cb&&cb('SIGNED_OUT',null);return {}}},
    from:t=>({select:()=>q(t),insert:async()=>({error:null}),upsert:async()=>fail(t)?{error:{message:'fail'}}:{error:null}})}}};""" % (SB_TOKEN_KEY, SB_TOKEN_KEY)



def _build_test_page():
    s = SRC.read_text(encoding='utf-8')
    i = s.rindex('})();\n</script>')
    hook = 'window.__t={' + ','.join(EXPOSE) + ',getR:()=>R,setR:v=>{R=v}};\n'
    TEST_PAGE.write_text(s[:i] + hook + s[i:], encoding='utf-8')


@pytest.fixture(scope='session')
def browser():
    _build_test_page()
    exe = os.environ.get('CHROMIUM_PATH') or ('/opt/pw-browsers/chromium' if os.path.exists('/opt/pw-browsers/chromium') else None)
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
        yield b
        b.close()
    TEST_PAGE.unlink(missing_ok=True)


class App:
    """一個已載入網站的分頁，附常用操作。"""

    def __init__(self, page):
        self.page = page
        self.errors = []
        page.on('pageerror', lambda e: self.errors.append(str(e)))

    def js(self, expr, arg=None):
        return self.page.evaluate(expr, arg) if arg is not None else self.page.evaluate(expr)

    def setup(self, level=2, paid=False, wrongs=True, days_done=None, diag_skip_tag=None):
        """建立一份診斷結果與乾淨的學習紀錄。wrongs=True 時診斷題全錯（會有錯題可回顧）。"""
        self.js("""([level,paid,wrongs,dd,skip])=>{const t=__t,S=t.S;
          S.level=level;S.seen={};S.plog=[];S.extra={};S.readSeen={};S.freeMore=null;S.retests={};S.bonusReview=false;
          const qs=t.PBANK.filter((q,i)=>i%15===0&&q.tag!==skip).slice(0,30);
          S.diag={qs:qs,ans:qs.map(q=>wrongs?(q.a+1)%4:q.a),times:qs.map(()=>20),unsure:[],level:level};
          S.res=t.analyze(S.diag);S.res.at=1;S.planOrder=S.res.ranked.map(x=>x.t);S.first={x:1};
          S.daysDone=dd||{};S.paid=paid}""", [level, paid, wrongs, {str(k): v for k, v in (days_done or {}).items()}, diag_skip_tag])

    def mark_seen(self, tag, lv, keep):
        """把某類某難度的日常題，除了前 keep 題以外都標為做過。"""
        self.js("([t,lv,k])=>__t.PBANK.filter(q=>q.tag===t&&q.lv===lv).slice(k).forEach(q=>__t.S.seen[q.id]=1)", [tag, lv, keep])

    def quiz(self):
        return self.js("()=>{const R=__t.getR();return R?{title:R.title,ids:R.list.map(q=>q.id),lv:R.list.map(q=>__t.BANK[q.id]?__t.BANK[q.id].lv:0),"
                       "tags:R.list.map(q=>q.tag),seen:R.list.map(q=>!!__t.S.seen[q.id]),n:R.list.length}:null}")

    def play(self, n_right=None, count=None):
        """實際點選作答：前 n_right 題答對、其餘答錯；count 指定只做幾題（模擬中途離開）。"""
        total = self.js("__t.getR().list.length")
        for i in range(total if count is None else count):
            a = self.js("()=>{const R=__t.getR();return R.list[R.i].a}")
            right = n_right is None or i < n_right
            self.page.locator('#qOpts .opt').nth(a if right else (a + 1) % 4).click()
            self.page.click('#nextBtn')

    def finish_direct(self, correct=True):
        """不經畫面，直接以全對（或全錯）結束目前的練習。"""
        self.js("c=>{const r=__t.getR();r.list.forEach(q=>__t.S.seen[q.id]=Date.now());r.ans=r.list.map(q=>c?q.a:(q.a+1)%4);__t.setR(null);r.onDone(r)}", correct)

    def score(self, tag, day, label='完成'):
        self.js("([t,d,l])=>__t.showScore({list:[],ans:[]},l,{tag:t,day:d})", [tag, day, label])

    def box(self):
        loc = self.page.locator('.sc-more')
        return loc.inner_text() if loc.count() else ''

    def count(self, sel):
        return self.page.locator(sel).count()

    def text(self, sel):
        return self.page.locator(sel).inner_text()

    def progress(self):
        return self.js("()=>JSON.stringify({dd:__t.S.daysDone,dayDone:__t.S.dayDone,done:__t.doneCount(),ret:__t.S.retests,first:__t.S.first,resAt:__t.S.res.at})")


@pytest.fixture
def open_app(browser):
    """open_app(paid=False, width=390)：開一個新分頁並載入網站。paid 決定假伺服器回覆的付費狀態。"""
    pages = []

    def _open(paid=False, width=390, height=900):
        ctx = browser.new_context(viewport={'width': width, 'height': height})
        ctx.add_init_script('window.__SB_PAID=%s;' % ('true' if paid else 'false'))
        ctx.route('**/supabase-js@2*', lambda r: r.fulfill(status=200, content_type='application/javascript', body=STUB))
        page = ctx.new_page()
        app = App(page)
        page.goto(TEST_PAGE.as_uri())
        page.wait_for_function('window.__t&&window.__t.S')
        page.wait_for_timeout(300)
        pages.append((ctx, app))
        return app

    yield _open
    for ctx, app in pages:
        errs = list(app.errors)
        ctx.close()
        assert not errs, '頁面錯誤：%s' % errs


@pytest.fixture
def app(open_app):
    return open_app()
