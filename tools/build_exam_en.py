#!/usr/bin/env python3
"""由 gsat/exam 的選擇題資料產生 exam-en/data.js(獨立網站用),並複製用到的圖片。
用法: python3 tools/build_exam_en.py
"""
import json, re, shutil, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
src = root / "gsat" / "exam"
out = root / "exam-en"

def load(name, var):
    t = (src / name).read_text(encoding="utf-8")
    t = re.sub(r"^\s*//.*$", "", t, flags=re.M)
    m = re.search(var + r"\s*=\s*", t)
    body = t[m.end():].strip().rstrip(";")
    return body

exams = json.loads(load("exams.js", r"window\.EXAMS"))
# answers.js 是 JS 物件字面量(單引號鍵),轉成 JSON 再讀
ans_raw = load("answers.js", r"window\.ANSWERS")
answers = dict(re.findall(r"'(\d+)':\s*\"([A-Z]+)\"", ans_raw))

NAMES = {"vocab": "詞彙", "cloze": "綜合測驗", "bank": "文意選填",
         "structure": "篇章結構", "reading": "閱讀測驗"}

# ---- 題庫修正(來源為 gsat/exam/exams.js 的解析結果;此處在產生 exam-en/data.js 時套用,每項必須恰好命中一次) ----
B = "______"
STEM_FIXES = [  # (年, 題號, 原文, 改為)
    ("111", 4,  "due to its fatal side effects", f"due to its {B} fatal side effects"),
    ("112", 1,  "because it is and very hard", f"because it is {B} and very hard"),
    ("112", 2,  "adopt an elegant for a camera", f"adopt an elegant {B} for a camera"),
    ("112", 3,  "trace her back to", f"trace her {B} back to"),
    ("112", 5,  "any in his apology", f"any {B} in his apology"),
    ("112", 6,  "powers of . He", f"powers of {B}. He"),
    ("112", 7,  "evidence to the drug company", f"evidence to {B} the drug company"),
    ("112", 8,  "have the country\u2019s economy", f"have {B} the country\u2019s economy"),
    ("112", 9,  "were with traffic", f"were {B} with traffic"),
    ("112", 10, "the unbiased media", f"the {B} unbiased media"),
]
OPT_FIXES = [  # (年, 題號, 選項索引, 原文, 改為)
    ("110", 47, 1, "During World War I. th", "During World War I."),
    ("110", 47, 2, "In the 16 century.", "In the 16th century."),
]
# 圖片來源覆蓋:gsat/exam/img 的 110-fig.jpg 被裁掉 C 的下框架與 D 的底座、支腳。
# 完整版取自大考中心 110 學年度學測英文原卷印刷頁碼第 6 頁(第 49 題四張選項圖,含 (A)–(D) 標示),放在 exam-en/src-img/。
IMG_OVERRIDES = {("110", 49): "110-49.png"}
PASSAGE_FIXES = [  # (年, 原文, 改為)  需恰好一處
    ("112", "th 18 century", "18th century"),
    # 110-25:解析時把日期 "25 June 1977" 誤當成空格,真正的空格在 "the first bolt ___ enough"(答案 D would have been)
    ("110", "Finally, on 【25】 June 1977", "Finally, on 25 June 1977"),
    ("110", "the first bolt 25 enough", "the first bolt 【25】 enough"),
]
import re as _re
def _arrows(t): return _re.sub(r"\s*(?:\u2192\s*)+", " \u2192 ", t).strip()

def apply_fixes(data):
    def qs(y):
        for d in data:
            if d["year"] == y:
                for sec in d["sections"]:
                    for g in sec["groups"]:
                        yield sec, g
    def one(y, n):
        r = [q for sec, g in qs(y) for q in g["questions"] if q["n"] == n]
        assert len(r) == 1, (y, n); return r[0]
    for y, n, old, new in STEM_FIXES:
        q = one(y, n); assert q["stem"].count(old) == 1, ("stem", y, n); q["stem"] = q["stem"].replace(old, new)
    for y, n, i, old, new in OPT_FIXES:
        q = one(y, n); assert q["opts"][i] == old, ("opt", y, n); q["opts"][i] = new
    for (y, n), fname in IMG_OVERRIDES.items():
        q = one(y, n); assert q.get("img"), ("img", y, n); assert (out / "src-img" / fname).exists(), fname
        q["img"] = "exam/img/" + fname
    for y, old, new in PASSAGE_FIXES:
        hit = 0
        for sec, g in qs(y):
            for k, para in enumerate(g.get("passage", [])):
                if old in para: g["passage"][k] = para.replace(old, new); hit += 1
        assert hit == 1, ("passage", y, old, hit)
    for d in data:       # 重複箭頭:每兩項之間只留一個 →
        for sec in d["sections"]:
            for g in sec["groups"]:
                for q in g["questions"]:
                    if "\u2192" in "".join(q.get("opts", [])) + q.get("stem", ""):
                        q["opts"] = [_arrows(o) for o in q["opts"]]
    # 資料檢查:每道詞彙題恰有一個作答空格;選項不得留有「th/st」殘字
    for d in data:
        for sec in d["sections"]:
            if sec["type"] == "vocab":
                for g in sec["groups"]:
                    for q in g["questions"]:
                        assert len(_re.findall(r"_{2,}", q["stem"])) == 1, ("vocab blank", d["year"], q["n"])
            for g in sec["groups"]:
                for q in g["questions"]:
                    for o in q.get("opts", []):
                        assert not _re.search(r"\.\s+(th|st|nd|rd)\s*$", o), ("stray", d["year"], q["n"], o)
                        assert "\u2192 \u2192" not in o, ("arrow", d["year"], q["n"])
    return data

data, imgs = [], set()
for e in exams:
    key = answers.get(e["year"], "")
    qs = [q for s in e["sections"] for g in s["groups"] for q in g["questions"]]
    if len(key) != len(qs):
        print(f"skip {e['year']}: 答案 {len(key)} 碼 ≠ 題數 {len(qs)}")
        continue
    i = 0
    secs = []
    for s in e["sections"]:
        groups = []
        for g in s["groups"]:
            ng = {k: g[k] for k in ("passage", "bank") if k in g}
            ng["questions"] = []
            for q in g["questions"]:
                nq = dict(q); nq["ans"] = key[i]; i += 1
                for k in ("img",):
                    if k in nq: imgs.add(nq[k])
                for p in nq.get("optImgs", []): imgs.add(p)
                ng["questions"].append(nq)
            groups.append(ng)
        secs.append({"type": s["type"], "name": NAMES.get(s["type"], s["name"]), "groups": groups})
    data.append({"year": e["year"], "sections": secs})

apply_fixes(data)
imgs = {x for d in data for sec in d["sections"] for g in sec["groups"] for q in g["questions"] for x in ([q["img"]] if q.get("img") else []) + q.get("optImgs", [])}
(out / "data.js").write_text(
    "// 由 tools/build_exam_en.py 產生,勿手改。\nwindow.DATA = " +
    json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
(out / "img").mkdir(exist_ok=True)
# 重新產生時清掉不再使用的舊圖(例如被裁切的 110-fig.jpg)
for old in (out / "img").glob("*"):
    if old.name not in {pathlib.Path(p).name for p in imgs}: old.unlink()
for p in sorted(imgs):
    name = pathlib.Path(p).name
    f = (out / "src-img" / name) if (out / "src-img" / name).exists() else src / "img" / name
    if f.exists(): shutil.copy(f, out / "img" / name)
    else: print("missing image", p)
print(f"{len(data)} 份試卷, {sum(len(g['questions']) for d in data for s in d['sections'] for g in s['groups'])} 題, {len(imgs)} 張圖")

# 詳解:合併 exam-en/explain/<年>.json → exam-en/explain.js
ex = {}
for f in sorted((out / "explain").glob("*.json")):
    ex[f.stem] = json.loads(f.read_text(encoding="utf-8"))
(out / "explain.js").write_text(
    "// 由 tools/build_exam_en.py 合併 exam-en/explain/*.json 產生。詳解為草稿,待老師審核。\nwindow.EXPLAIN = " +
    json.dumps(ex, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
missing = [f"{d['year']}-{q['n']}" for d in data for s in d['sections'] for g in s['groups'] for q in g['questions']
           if str(q['n']) not in ex.get(d['year'], {})]
print(f"詳解 {sum(len(v) for v in ex.values())} 題,缺 {len(missing)} 題", missing[:10])

# 非選擇題(中譯英、英文作文)題目:exam-en/src-data/writing.json → exam-en/writing.js;作文附圖從原卷頁裁切
from PIL import Image, ImageChops
wsrc = json.loads((out / "src-data" / "writing.json").read_text(encoding="utf-8"))
writing = {}
for y, w in wsrc.items():
    if y.startswith("_"): continue
    assert len(w["trans"]) == 2 and w["essay"], y
    item = {"trans": w["trans"], "essay": w["essay"]}
    if "img" in w:
        fname, l, t, r, b = w["img"]
        im = Image.open(src / "img" / "ns" / fname).convert("L").crop((l, t, r, b))
        box = ImageChops.invert(im).point(lambda v: 255 if v > 25 else 0).getbbox()   # 去白邊
        im = im.crop((max(box[0]-4, 0), max(box[1]-4, 0), min(box[2]+4, im.width), min(box[3]+4, im.height)))
        name = f"{y}-essay.png"; im.save(out / "img" / name, optimize=True); item["img"] = "img/" + name
    writing[y] = item
assert sorted(writing) == sorted(d["year"] for d in data), "每一年都要有非選擇題"
(out / "writing.js").write_text(
    "// 由 tools/build_exam_en.py 依 exam-en/src-data/writing.json 產生。只有題目,不含參考答案;由老師人工批改。\nwindow.WRITING = " +
    json.dumps(writing, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
print(f"非選擇題 {len(writing)} 年,作文附圖 {sum('img' in v for v in writing.values())} 張")

# 中文翻譯:合併 exam-en/translate/<年>.json → exam-en/translate.js,並逐項檢查對齊
trans, problems = {}, []
for f in sorted((out / "translate").glob("*.json")):
    y = f.stem; t = json.loads(f.read_text(encoding="utf-8")); trans[y] = t
    # 頁面會自己加 (A)(B)…,去掉譯文開頭重複的字母標示,例如 "(A) 送達"、"A. 送達"
    _strip = lambda x: _re.sub(r"^\s*[(（]?[A-J][)）.]\s*", "", x)
    for e in t.get("q", {}).values(): e["opts"] = [_strip(x) for x in e.get("opts", [])]
    for k, v in t.get("bank", {}).items(): t["bank"][k] = [_strip(x) for x in v]
    d = next((d for d in data if d["year"] == y), None)
    if not d: problems.append(f"{y}: 沒有這份試卷"); continue
    for sec in d["sections"]:
        for g in sec["groups"]:
            first = str(g["questions"][0]["n"])
            if "passage" in g:
                p = t.get("passage", {}).get(first)
                if not p or len(p) != len(g["passage"]): problems.append(f"{y}-{first} 文章段落數不符")
                elif "bank" in g or sec["type"] == "cloze":
                    joined = "".join(p)
                    for q in g["questions"]:
                        if f"【{q['n']}】" not in joined: problems.append(f"{y}-{q['n']} 譯文缺【{q['n']}】")
            if "bank" in g:
                bk = t.get("bank", {}).get(first)
                if not bk or len(bk) != len(g["bank"]): problems.append(f"{y}-{first} 選項庫翻譯數不符")
            for q in g["questions"]:
                e = t.get("q", {}).get(str(q["n"]))
                if e is None: problems.append(f"{y}-{q['n']} 缺題目翻譯"); continue
                if q.get("stem") and not e.get("stem"): problems.append(f"{y}-{q['n']} 缺題幹翻譯")
                placeholder = "optImgs" in q or any(_re.search(r"[一-鿿]", o) for o in q.get("opts", []))
                want = 0 if ("bank" in g or placeholder) else len(q.get("opts", []))
                if len(e.get("opts", [])) != want: problems.append(f"{y}-{q['n']} 選項翻譯數 {len(e.get('opts', []))}≠{want}")
(out / "translate.js").write_text(
    "// 由 tools/build_exam_en.py 合併 exam-en/translate/*.json 產生。中文翻譯為草稿,待老師審核;只在交卷後的檢討頁顯示。\nwindow.TRANS = " +
    json.dumps(trans, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
print(f"翻譯 {len(trans)} 年,問題 {len(problems)} 項", problems[:15])

# 完整原卷模式(目前 111、115):exam-en/src-data/fullpaper.json → exam-en/fullpaper.js
fsrc = json.loads((out / "src-data" / "fullpaper.json").read_text(encoding="utf-8"))
mixed_raw = (src / "mixed.js").read_text(encoding="utf-8")
mixed = {y: {"q": int(q), "n": int(n), "key": k, "points": int(p)} for y, q, n, k, p in
         re.findall(r"'(\d+)':\s*\{\s*q:\s*(\d+),\s*n:\s*(\d+),\s*key:\s*'([A-Z]+)',\s*points:\s*(\d+)", mixed_raw)}
rule = re.search(r"MULTI_RULE:\s*'([^']+)'", (root / "gsat" / "data" / "scoring.js").read_text(encoding="utf-8")).group(1)
def crop(spec, name):
    fname, l, t, r, b = spec
    im = Image.open(src / "img" / "ns" / fname).convert("L").crop((l, t, r, b))
    box = ImageChops.invert(im).point(lambda v: 255 if v > 25 else 0).getbbox()
    im = im.crop((max(box[0]-4, 0), max(box[1]-4, 0), min(box[2]+4, im.width), min(box[3]+4, im.height)))
    im.save(out / "img" / name, optimize=True); return "img/" + name
full = {}
for y, p in fsrc.items():
    if y.startswith("_"): continue
    p2 = p["part2"]
    if "introImg" in p2: p2["introImg"] = crop(p2["introImg"], f"{y}-mixed-logo.png")
    if "img" in p2: p2["img"] = crop(p2["img"], f"{y}-mixed-fig.png")
    m = mixed[y]
    for it in p2["items"]:
        if it["type"] == "multi":
            assert it["n"] == str(m["q"]) and len(it["options"]) == m["n"] and it["points"] == m["points"], (y, "第 49 題與官方答案資料不符")
            it["key"] = m["key"]; it["rule"] = rule
    pts = sum(it["points"] for it in p2["items"])
    assert pts == 10, (y, "混合題配分應為 10 分", pts)
    full[y] = p
(out / "fullpaper.js").write_text(
    "// 由 tools/build_exam_en.py 依 exam-en/src-data/fullpaper.json 產生(完整原卷模式)。\nwindow.FULLPAPER = " +
    json.dumps(full, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
print(f"完整原卷 {sorted(full)},第 49 題答案 " + ", ".join(f"{y}:{mixed[y]['key']}/{mixed[y]['n']}選項" for y in full))
