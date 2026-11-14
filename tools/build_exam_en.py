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
PASSAGE_FIXES = [  # (年, 原文, 改為)  需恰好一處
    ("112", "th 18 century", "18th century"),
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
(out / "data.js").write_text(
    "// 由 tools/build_exam_en.py 產生,勿手改。\nwindow.DATA = " +
    json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
(out / "img").mkdir(exist_ok=True)
for p in sorted(imgs):
    f = src / "img" / pathlib.Path(p).name
    if f.exists(): shutil.copy(f, out / "img" / f.name)
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
