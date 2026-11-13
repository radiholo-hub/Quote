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
