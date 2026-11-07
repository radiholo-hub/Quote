// 英文語音播放器：沿用 Score Rescue 的做法——優先播放預先產生的美式女聲 Aria mp3（audio/<雜湊>.mp3，檔名規則與 tools/make_score_rescue_audio.py 的 sr_hash 相同），
// 找不到檔案才退回裝置內建語音（並在畫面上說明）。同一時間只會有一段聲音；再按同一個按鈕就停止；正式模擬考進行中不提供朗讀。
window.GSATAudio = (function () {
  const MAN = (window.AUDIO_MANIFEST && window.AUDIO_MANIFEST.items) || [];
  const hooks = { blocked: () => false };
  let cur = null;                       // {key, a, text, file, via:'file'|'device', paused, slow, item}
  let last = null;                      // 最近一次播放（重播用）
  const subs = new Set();

  function srHash(str) {                // 和 tools/make_score_rescue_audio.py 的 sr_hash() 完全一致（cyrb53）
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) { const ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }
  const fileOf = (text, slow) => 'audio/' + srHash(slow ? 'slow\n' + text : text) + '.mp3';
  const state = () => cur ? { key: cur.key, playing: !cur.paused, via: cur.via, slow: cur.slow } : { key: null, playing: false };
  const emit = () => subs.forEach(f => { try { f(state()); } catch (e) {} });
  function subscribe(f) { subs.add(f); return () => subs.delete(f); }

  function toast(msg) {
    let t = document.getElementById('audio-toast');
    if (!t) { t = document.createElement('div'); t.id = 'audio-toast'; t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.append(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 3500);
  }
  function stop() {
    if (!cur) return;
    const c = cur; cur = null;
    try { if (c.a) { c.a.pause(); } } catch (e) {}
    try { speechSynthesis.cancel(); } catch (e) {}
    emit();
  }
  function fallback(me) {
    if (cur !== me || me.via === 'device') return;            // error 事件與 play() 失敗可能同時觸發，只能退回一次，否則會念兩遍
    try { if (me.a) me.a.pause(); } catch (e) {}              // 載入失敗的音訊元件先停掉，再改用裝置語音
    me.via = 'device'; me.a = null;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(me.text); u.lang = 'en-US'; u.rate = me.slow ? 0.55 : 0.85;
      u.onend = u.onerror = () => { if (cur === me) { cur = null; emit(); } };
      speechSynthesis.speak(u);
    } catch (e) { cur = null; toast('這個瀏覽器無法播放發音'); }
    emit();
  }
  // opts: {slow, file, key, restart}
  function play(text, opts) {
    opts = opts || {};
    if (hooks.blocked()) { stop(); toast('正式模擬考作答期間不提供朗讀,交卷後才能使用。'); return false; }
    const key = opts.key || ((opts.slow ? 'slow:' : '') + text);
    if (cur && cur.key === key && !opts.restart) { stop(); return true; }       // 再按一次＝停止（和 Score Rescue 相同）
    stop();
    last = { text, opts };
    const file = opts.file || fileOf(text, opts.slow);
    const me = { key, text, file, via: 'file', paused: false, slow: !!opts.slow, a: null };
    let a;
    try { a = new Audio(file); } catch (e) { cur = me; fallback(me); return true; }
    me.a = a; cur = me;
    a.addEventListener('error', () => fallback(me));
    a.addEventListener('ended', () => { if (cur === me) { cur = null; emit(); } });
    const pr = a.play();
    if (pr && pr.catch) pr.catch(() => fallback(me));
    emit();
    return true;
  }
  function pause() { if (!cur || cur.paused) return; try { cur.via === 'file' ? cur.a.pause() : speechSynthesis.pause(); } catch (e) {} cur.paused = true; emit(); }
  function resume() {
    if (!cur || !cur.paused) return;
    if (hooks.blocked()) { stop(); return; }
    try { if (cur.via === 'file') { const me = cur, p = cur.a.play(); if (p && p.catch) p.catch(() => fallback(me)); } else speechSynthesis.resume(); } catch (e) {}
    cur.paused = false; emit();
  }
  function replay() { if (last) play(last.text, Object.assign({}, last.opts, { restart: true })); }
  const itemFor = (ref, slow) => MAN.find(i => i.kind === 'passage' && i.refs.includes(ref) && (i.rate === 'slow') === !!slow) || null;

  // 喇叭按鈕：點一下播放、再點停止；播放中外觀改變。h 是 DOM 建立函式。
  function button(h, text, label, opts) {
    const b = h('button', { class: 'spk', type: 'button', 'aria-label': '播放發音:' + label, 'aria-pressed': 'false', 'data-audio': text, onclick: ev => { ev.preventDefault(); play(text, opts); } }, '🔊');
    const key = (opts && opts.key) || ((opts && opts.slow ? 'slow:' : '') + text);
    const un = subscribe(s => {
      if (!b.isConnected) { un(); return; }
      const on = s.key === key && s.playing; b.setAttribute('aria-pressed', String(on)); b.classList.toggle('on', on);
    });
    return b;
  }
  return { srHash, fileOf, play, stop, pause, resume, replay, button, subscribe, state, itemFor, toast, init: o => Object.assign(hooks, o), manifest: MAN };
})();
