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
  var lang = "zh";
  try { lang = localStorage.getItem("lang") || "zh"; } catch (e) {}

  function fmtDate(n) {
    var d = new Date(EPOCH + n * DAY);
    return d.getUTCFullYear() + " 年 " + (d.getUTCMonth() + 1) + " 月 " + d.getUTCDate() + " 日 · " +
      "星期" + "日一二三四五六".charAt(d.getUTCDay());
  }

  // 人像:執行時向維基百科查詢該人物的公開頭像,查不到(或被封鎖)就顯示姓名縮寫。
  var TITLES = { "Paul Graham": "Paul_Graham_(programmer)", "Franklin D. Roosevelt": "Franklin_D._Roosevelt", "Martin Luther King Jr.": "Martin_Luther_King_Jr." };
  var photoCache = {};
  function enName(by) { return by.replace(/^.*?[\u4e00-\u9fff》）]\s+/, ""); }
  function initials(n) { return n.split(/\s+/).filter(function (w) { return /^[A-Za-z]/.test(w) && !/^(Jr\.?|D\.?)$/.test(w); }).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase(); }
  function showAvatar(by) {
    var n = enName(by), box = $("avatar"), cr = $("credit");
    box.textContent = initials(n); cr.textContent = "";
    var want = n;
    function apply(info) {
      if (!info || enName(quoteFor(cur).q.by) !== want) return;
      var img = new Image(); img.alt = n; img.referrerPolicy = "no-referrer";
      img.onload = function () {
        if (enName(quoteFor(cur).q.by) !== want) return;
        box.textContent = ""; box.appendChild(img);
        cr.innerHTML = '照片:<a target="_blank" rel="noopener" href="' + info.page + '">維基百科</a>';
      };
      img.src = info.thumb;
    }
    if (n in photoCache) return apply(photoCache[n]);
    fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(TITLES[n] || n.replace(/ /g, "_")))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        // 避免誤配同名頁面:要有縮圖,且為人物頁(非消歧義)
        var ok = j && j.type === "standard" && j.thumbnail;
        photoCache[n] = ok ? { thumb: j.thumbnail.source, page: j.content_urls.desktop.page } : null;
        apply(photoCache[n]);
      }, function () { photoCache[n] = null; });
  }

  function render() {
    var r = quoteFor(cur);
    $("date").textContent = fmtDate(cur) + (cur === todayN ? " · 今天" : cur === todayN - 1 ? " · 昨天" : cur === todayN + 1 ? " · 明天" : "");
    showAvatar(r.q.by);
    $("zh").textContent = r.q.zh; $("en").textContent = r.q.en; $("by").textContent = lang === "zh" ? r.q.by.replace(/^(.*?[\u4e00-\u9fff》）])\s+[A-Za-z].*$/, "$1") : r.q.by;
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
  

  // 優先選台灣華語語音(zh-TW / cmn-TW / Mei-Jia 等),避免誤選粵語(zh-HK)或大陸口音(zh-CN)
  function pickVoice(code) {
    var vs = synth.getVoices();
    if (code !== "zh-TW") {
      return vs.filter(function (v) { return v.lang.replace("_", "-") === code; })[0] ||
             vs.filter(function (v) { return v.lang.slice(0, 2) === code.slice(0, 2); })[0] || null;
    }
    function score(v) {
      var l = v.lang.replace("_", "-").toLowerCase(), n = v.name;
      if (/(zh|cmn)(-hant)?-tw$/.test(l) || /Mei-?Jia|台灣|臺灣|Taiwan/i.test(n)) return 3;
      if (/yue|zh-hk/.test(l) || /香港|粵|Cantonese|Sin-?ji|Sinji/i.test(n)) return 0;
      return l.slice(0, 2) === "zh" || l.slice(0, 3) === "cmn" ? 1 : 0;
    }
    var best = null, top = 0;
    vs.forEach(function (v) { var s = score(v); if (s > top) { top = s; best = v; } });
    return best;
  }
  function say(str, code) {
    var u = new SpeechSynthesisUtterance(str); u.lang = code; u.rate = 0.9;
    var v = pickVoice(code); if (v) u.voice = v;
    if (code === "zh-TW") {
      if (!v) { alert("這個裝置找不到國語語音,為避免唸成粵語,已停止朗讀。請在裝置設定安裝繁體中文(台灣)語音。"); return; }
      u.lang = v.lang;
    }
    synth.speak(u);
    return u;
  }
  // 優先播放預先錄好的音檔:中文 audio/NNN.mp3(台灣國語)、英文 audio/en/NNN.mp3;
  // 依語言模式播放中文、英文或先中後英;沒有音檔才改用瀏覽器語音。
  var player = null;
  function stopAll() { if (player) { player.pause(); player = null; } if (synth) synth.cancel(); }
  function playClip(src, fallbackText, code, done) {
    var a = new Audio(src); player = a;
    a.onended = function () { if (player === a) { player = null; done(); } };
    a.onerror = function () {
      if (player !== a) return; player = null;
      if (synth) { var u = say(fallbackText, code); if (u) u.onend = done; } else done();
    };
    var p = a.play(); if (p && p.catch) p.catch(function () {});
  }
  function speak() {
    stopAll();
    var q = quoteFor(cur).q, id = ("00" + (Q.indexOf(q) + 1)).slice(-3) + ".mp3";
    var en = function () { if (lang !== "zh") playClip("audio/en/" + id, q.en, "en-US", function () {}); };
    if (lang === "en") en(); else playClip("audio/" + id, q.zh, "zh-TW", en);
  }
  $("speak").onclick = function () { if (player || (synth && synth.speaking)) stopAll(); else speak(); };
  $("auto").onchange = function () {
    autoRead = this.checked; try { localStorage.setItem("auto", autoRead ? "1" : "0"); } catch (e) {}
    if (autoRead) speak();
  };
  function go(n) { cur = n; render(); stopAll(); if (autoRead) speak(); }

  $("prev").onclick = function () { go(cur - 1); };
  $("next").onclick = function () { go(cur + 1); };
  $("today").onclick = function () { go(todayN); };
  document.querySelectorAll(".langs button").forEach(function (b) {
    b.onclick = function () { lang = b.dataset.lang; try { localStorage.setItem("lang", lang); } catch (e) {} render(); };
  });
  $("copy").onclick = function () {
    var b = $("copy");
    (navigator.clipboard ? navigator.clipboard.writeText(text()) : Promise.reject()).then(function () {
      b.textContent = "已複製 ✓"; setTimeout(function () { b.textContent = "複製"; }, 1500);
    }, function () { window.prompt("複製:", text()); });
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
