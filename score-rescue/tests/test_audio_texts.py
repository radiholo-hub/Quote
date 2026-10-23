"""音檔清單與網頁發音一致：網頁會念的文字，都要在產生音檔的程式的收集清單裡（雜湊演算法也一致）。
不檢查 mp3 是否已存在：新題目的音檔是合併後才由 Generate audio 產生。"""
import json

from conftest import AUDIO_TOOL


def _collect():
    src = AUDIO_TOOL.read_text(encoding='utf-8')
    g = {'__name__': 'audio_tool_for_tests', '__file__': str(AUDIO_TOOL)}
    exec(src[:src.index('async def main')], g)          # 只載入函式，不執行產生音檔
    return g['collect'](), g['sr_hash']


def test_page_texts_are_collected(app):
    texts, sr_hash = _collect()
    hashes = set(sr_hash(t) for t in texts)
    page_texts = app.js("""()=>{const t=__t,out=[];
      t.BANK.forEach(q=>{out.push(q.q.replace('___',q.o[q.a]));q.o.forEach(o=>o.trim()&&out.push(o))});
      t.RBANK.forEach(r=>{r.passages.forEach(p=>out.push(p.body));out.push(r.q+' Answer: '+r.o[r.a]);r.o.forEach(o=>o.trim()&&out.push(o))});
      return out.map(x=>[x,t.srHash(x)])}""")
    js_vs_py = [x for x, h in page_texts if sr_hash(x) != h]
    assert not js_vs_py, '前端與 Python 的雜湊不一致：%s' % js_vs_py[:3]
    missing = [x for x, h in page_texts if h not in hashes]
    assert not missing, '這些文字不在音檔收集清單：%s' % json.dumps(missing[:5], ensure_ascii=False)
