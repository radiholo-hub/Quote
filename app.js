(function () {
  var Q = window.QUOTES, N = Q.length;
  var DAY = 86400000;
  var EPOCH = Date.UTC(2024, 0, 1); // 循環起點

  function dayNumber(d) { return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EPOCH) / DAY); }

  // 每一輪(N 天)用固定種子洗牌:每句話每輪恰好出現一次,輪與輪之間順序不同,永久循環。
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function order(cycle) {
    var a = []; for (var i = 0; i < N; i++) a.push(i);
    var r = mulberry32(cycle * 7919 + 13);
    for (var j = N - 1; j > 0; j--) { var k = Math.floor(r() * (j + 1)); var t = a[j]; a[j] = a[k]; a[k] = t; }
    return a;
  }
  function quoteFor(n) {
    var cycle = Math.floor(n / N), pos = ((n % N) + N) % N;
    return { q: Q[order(cycle)[pos]], cycle: cycle, pos: pos };
  }

  var todayN = dayNumber(new Date()), cur = todayN;
  var $ = function (id) { return document.getElementById(id); };
  var lang = "both";
  try { lang = localStorage.getItem("lang") || "both"; } catch (e) {}

  function fmtDate(n) {
    var d = new Date(EPOCH + n * DAY);
    return d.getUTCFullYear() + " 年 " + (d.getUTCMonth() + 1) + " 月 " + d.getUTCDate() + " 日 · " +
      d.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
  }

  function render() {
    var r = quoteFor(cur);
    $("date").textContent = fmtDate(cur) + (cur === todayN ? " · 今天 Today" : cur === todayN - 1 ? " · 昨天 Yesterday" : cur === todayN + 1 ? " · 明天 Tomorrow" : "");
    $("zh").textContent = r.q.zh; $("en").textContent = r.q.en; $("by").textContent = r.q.by;
    $("meta").textContent = "共 " + N + " 句 · 每 " + N + " 天循環一輪 · 目前第 " + (r.cycle + 1) + " 輪第 " + (r.pos + 1) + " 天";
    $("card").className = "card" + (lang === "zh" ? " only-zh" : lang === "en" ? " only-en" : "");
    document.querySelectorAll(".langs button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    $("next").disabled = false;
  }

  function text() { var q = quoteFor(cur).q; return "「" + q.zh + "」\n\"" + q.en + "\"\n— " + q.by; }

  // 朗讀:瀏覽器內建語音合成,中文用 zh-TW、英文用 en-US,依語言模式決定唸哪一種
  var synth = window.speechSynthesis, autoRead = false;
  try { autoRead = localStorage.getItem("auto") === "1"; } catch (e) {}
  $("auto").checked = autoRead;
  if (!synth) { $("speak").hidden = true; $("auto").parentNode.hidden = true; }

  function pickVoice(code) {
    var vs = synth.getVoices(), pre = code.slice(0, 2);
    return vs.filter(function (v) { return v.lang.replace("_", "-") === code; })[0] ||
           vs.filter(function (v) { return v.lang.slice(0, 2) === pre; })[0] || null;
  }
  function say(str, code) {
    var u = new SpeechSynthesisUtterance(str); u.lang = code; u.rate = 0.9;
    var v = pickVoice(code); if (v) u.voice = v;
    synth.speak(u);
  }
  function speak() {
    if (!synth) return;
    synth.cancel();
    var q = quoteFor(cur).q;
    if (lang !== "en") say(q.zh, "zh-TW");
    if (lang !== "zh") say(q.en, "en-US");
  }
  $("speak").onclick = function () { if (synth.speaking) synth.cancel(); else speak(); };
  $("auto").onchange = function () {
    autoRead = this.checked; try { localStorage.setItem("auto", autoRead ? "1" : "0"); } catch (e) {}
    if (autoRead) speak();
  };
  function go(n) { cur = n; render(); if (synth) { synth.cancel(); if (autoRead) speak(); } }

  $("prev").onclick = function () { go(cur - 1); };
  $("next").onclick = function () { go(cur + 1); };
  $("today").onclick = function () { go(todayN); };
  document.querySelectorAll(".langs button").forEach(function (b) {
    b.onclick = function () { lang = b.dataset.lang; try { localStorage.setItem("lang", lang); } catch (e) {} render(); };
  });
  $("copy").onclick = function () {
    var b = $("copy");
    (navigator.clipboard ? navigator.clipboard.writeText(text()) : Promise.reject()).then(function () {
      b.textContent = "已複製 ✓"; setTimeout(function () { b.textContent = "複製 Copy"; }, 1500);
    }, function () { window.prompt("複製 Copy:", text()); });
  };
  $("share").onclick = function () {
    if (navigator.share) navigator.share({ title: "每日佳句", text: text(), url: location.href }).catch(function () {});
    else $("copy").click();
  };
  if (synth) synth.getVoices();
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") $("prev").click(); else if (e.key === "ArrowRight") $("next").click();
  });
  render();
})();
