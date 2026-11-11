#!/usr/bin/env python3
"""教師簽核紀錄(docs/gsat/signoffs/<題號>.json)的產生與有效性檢查。不含任何考題文字。

「內容指紋」(contentFingerprint) 是對「簽核時教師實際審核的內容」算出的 SHA-256,
涵蓋:題目與選項與官方答案、詳解(中譯、解題步驟、選項解析、單字/片語/句型/文法)、詳解引用的單字詞條(詞形、搭配詞、例句、字族、同義/反義/易混淆)、
衍生字(畫面上列出的詞性與中文)、該題的延伸練習、tight 這類重點字的歷屆出題紀錄,以及每個發音按鈕對應的 mp3「檔名」(檔名由文字雜湊決定)。
**mp3 的檔案內容不在文字指紋裡**:音檔來源可以更換(例如改用正式 TTS),更換後教學文字的簽核仍有效;
但「試聽通過」另外記在簽核紀錄的 audio 區塊(status／approvedFiles 與各檔 SHA-256),音檔內容一變,試聽簽核就必須標為 invalidated,重新聆聽後才能恢復。
刻意「不」納入:status / reviewer / reviewedAt / reviewNotes(審核中繼資料)、aiFlags(AI 自我檢查提示)、各詞條與延伸題自己的 status、
其他題目與其他詞條——所以改審核狀態、改別題、改無關單字都不會讓簽核失效;改了被簽核的教學內容或音檔,指紋就會改變,檢查會失敗並提醒重新審核。
簽核當時的審核 HTML 的 SHA-256 只是證據(HTML 含審核狀態與版面,不能拿來判斷教學內容有沒有改變)。

用法:python3 tools/gsat_signoff.py check                       檢查 docs/gsat/signoffs/ 內所有簽核紀錄與現行資料是否一致(結束碼 0＝有效)
      python3 tools/gsat_signoff.py fingerprint 115-1           印出目前的內容指紋與審核項目數
      python3 tools/gsat_signoff.py draft 115-1 --reviewer 姓名 --date YYYY-MM-DD --html-sha 簽核當時HTML的SHA256 [--audio-scope 文字] [--audio-status pending|passed] [--occurrence-note 文字]
                                                                印出新簽核紀錄(JSON)到標準輸出,由人決定是否存檔
      python3 tools/gsat_signoff.py sync-audio [--date YYYY-MM-DD] 音檔內容與試聽簽核不符時，把該簽核的音檔狀態改為 invalidated（只會作廢，絕不會自動標為通過）
      python3 tools/gsat_signoff.py record-dev-check 115-1 --reviewer 姓名 --date YYYY-MM-DD --confirm-listened
                                                                人聽完 Azure F0 開發測試音檔後，記錄「音質檢查通過」歷史(不是 production 簽核，不改 audio.status)
      python3 tools/gsat_signoff.py approve-audio 115-1 --reviewer 姓名 --date YYYY-MM-DD --confirm-listened
                                                                人重新聽完後才使用：把目前這一題對應的音檔（需為正式 TTS 來源）重新記為通過"""
import argparse, copy, hashlib, importlib.util, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SIGNOFFS = ROOT / 'docs' / 'gsat' / 'signoffs'
AUDIO = ROOT / 'gsat' / 'audio'
META_KEYS = ('status', 'reviewer', 'reviewedAt', 'reviewNotes', 'aiFlags')
JS = """global.window={};
for (const f of ['data/vocab.js','data/ext_practice.js','data/audio_manifest.js','exam/exams.js','exam/answers.js','exam/explain.js','exam/vocab_index.js']) require(process.argv[1]+'/gsat/'+f);
const out=[];
for (const [k,e] of Object.entries(window.EXPLAIN)) {
  const [y,n]=k.split('-'); const ex=window.EXAMS.find(x=>x.year===y);
  for (const s of ex.sections) for (const g of s.groups) for (const q of g.questions) if (q.n==+n)
    out.push({key:k, year:y, n:+n, type:s.name, stem:q.stem, opts:q.opts, official:window.ANSWERS[y][q.n-1], e, ext:window.EXT_PRACTICE.filter(x=>x.forQuestion===k)});
}
console.log(JSON.stringify({items:out, vocab:window.VOCAB, index:window.VOCAB_INDEX, man:window.AUDIO_MANIFEST}));"""


def sheet_module():
    spec = importlib.util.spec_from_file_location('gsat_review_sheet', ROOT / 'tools' / 'gsat_review_sheet.py')
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m


def load_data():
    return json.loads(subprocess.run(['node', '-e', JS, str(ROOT)], capture_output=True, text=True, check=True).stdout)


def rows_of(data, key, audio_dir=AUDIO):
    """用審核表同一套程式產生該題的項目:回傳 [(項目 ID, 該列的發音檔或 None)]。"""
    sh = sheet_module()
    item = next(i for i in data['items'] if i['key'] == key)
    files = {(it['rate'], it['text'].strip()): it['file'] for it in data['man']['items'] if (audio_dir / it['file']).exists()}
    S = sh.Sheet(data, files, False)
    html = sh.build_question(S, item)
    rows = []
    for m in re.finditer(r'<div class="r" data-id="([^"]+)">(.*?)</div><div class="ctl">', html, re.S):
        f = re.search(r'data-f="([0-9a-f]+\.mp3)"', m.group(2))
        rows.append((sh.html.unescape(m.group(1)), f.group(1) if f else None))
    return rows


def fingerprint(data, key, audio_dir=AUDIO):
    item = next(i for i in data['items'] if i['key'] == key)
    e = item['e']; V = data['vocab']['entries']; F = data['vocab']['families']
    strip = lambda d: {k: v for k, v in d.items() if k not in META_KEYS}
    main = list(dict.fromkeys(e['words'] + [e['focus']] + [o['entry'] for o in e['options'].values()]))
    fam = {}
    for eid in main:
        for m in F[V[eid]['family']]['members']:
            if m not in main: fam[m] = {k: V[m][k] for k in ('id', 'hw', 'pos', 'zh')}
    rows = rows_of(data, key, audio_dir)
    audio = {rid: f for rid, f in rows if f}                          # 只含檔名；檔案內容的雜湊屬於試聽簽核（audio 區塊）
    occ = {w: data['index']['entries'][w] for w in dict.fromkeys(e['words'] + [e['focus']])}
    body = {
        'question': {'key': key, 'stem': item['stem'], 'opts': item['opts'], 'official': item['official']},
        'explanation': strip(e),
        'entries': {eid: strip(V[eid]) for eid in main},
        'derivedWords': fam,
        'families': {V[eid]['family']: F[V[eid]['family']]['members'] for eid in main},
        'phrases': {p: data['vocab']['phrases'][p] for p in e['phrases']},
        'extension': [strip(x) for x in item['ext']],
        'occurrence': occ,
        'items': [rid for rid, _ in rows],
        'audio': audio,
    }
    return hashlib.sha256(json.dumps(body, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf8')).hexdigest()


def audio_block(data, buttons, files, audio_scope, audio_status):
    """audio 區塊。pending＝這一題從未取得 production 試聽簽核（沒有任何通過的音檔，也沒有先前簽核的歷史）；passed＝人工聽完並簽核。"""
    total = len(data['man']['items'])
    if audio_status == 'pending':
        return {'status': 'pending',
                'scope': '正式（production）試聽簽核尚未進行:沒有任何音檔視為已通過。目前 repository 內的音檔是舊 edge-tts 檔(非官方來源,不部署);正式音檔需以 Azure 付費層(azure-paid)產生,並由教師聆聽後以 approve-audio 正式簽核。教學文字的簽核不受影響。',
                'approvedFiles': [], 'buttons': buttons, 'buttonCount': len(buttons), 'distinctFileCount': 0,
                'totalAudioFiles': total, 'notIncludedCount': total,
                'notIncluded': '所有音檔都不得視為已通過正式簽核。'}
    return {'status': 'passed', 'scope': audio_scope,
            'approvedFiles': [{'file': f, 'sha256': hashlib.sha256((AUDIO / f).read_bytes()).hexdigest(), 'result': 'passed'} for f in files],
            'buttons': buttons, 'buttonCount': len(buttons), 'distinctFileCount': len(files), 'totalAudioFiles': total,
            'notIncludedCount': total - len(files), 'notIncluded': '清單中其餘音檔不在本次簽核範圍,不得視為已通過。'}


def draft(data, key, reviewer, date, html_sha, audio_scope, audio_status='pending', occurrence_note=None):
    rows = rows_of(data, key)
    buttons = [{'item': rid, 'file': f} for rid, f in rows if f]
    files = sorted({b['file'] for b in buttons})
    fp = fingerprint(data, key)
    return {
        'question': key,
        'status': 'passed',
        'reviewer': reviewer,
        'signedAt': date,
        'scope': (f'{key[:3]} 學年度學測英文第 {key.split("-")[1]} 題:教學文字內容(中文翻譯、解題步驟、選項解析、單字與片語、文法補充)與原創延伸練習。只限這一題的文字教學內容;不含發音(音檔尚未進行正式試聽簽核,見 audio 區塊),不含其他題目,也不含其餘歷屆詞彙待審核紀錄。' if audio_status == 'pending' else f'{key[:3]} 學年度學測英文第 {key.split("-")[1]} 題:教學內容(中文翻譯、解題步驟、選項解析、單字與片語、文法補充、延伸練習)與對應發音。只限這一題;不含其他題目,也不含其餘音檔與其餘歷屆詞彙待審核紀錄。'),
        'evidence': {'reviewHtmlSha256': html_sha, 'note': '簽核當時教師逐項審核的 HTML 的雜湊,僅為證據。HTML 含審核狀態與版面,內容是否改變以 contentFingerprint 判定。'},
        'contentFingerprint': {
            'algorithm': 'sha256(canonical JSON);計算方式見 tools/gsat_signoff.py 的 fingerprint()',
            'value': fp,
            'covers': '題目與選項與官方答案、詳解內容、引用的單字詞條、畫面列出的衍生字、片語、延伸練習、重點字的歷屆出題紀錄、每個發音按鈕對應的 mp3 檔名、審核項目 ID 清單(mp3 檔案內容不在其中,見 audio 區塊)',
            'excludes': 'status / reviewer / reviewedAt / reviewNotes / aiFlags、各詞條與延伸題自己的 status、其他題目與其他詞條',
        },
        'items': [{'id': rid, 'result': 'passed'} for rid, _ in rows],
        'audio': audio_block(data, buttons, files, audio_scope, audio_status),
        'vocabularyOccurrenceRecords': {
            'entry': data['items'][[i['key'] for i in data['items']].index(key)]['e']['focus'],
            'note': occurrence_note or '三筆歷屆出題紀錄的人工裁定(skin-tight 排除、tight against 計入文章用字、tight schedule 計入正確答案)維持不變,正式裁定資料在 gsat/exam/vocab_reviews.js;本簽核不涉及其他詞條與其他待審核紀錄。',
        },
    }


def validate(rec, data, explain_entry=None, audio_dir=AUDIO, prov_rec=None):
    """回傳問題清單;空清單＝簽核紀錄與現行資料一致。"""
    bad = []; key = rec.get('question')
    for f in ('question', 'status', 'reviewer', 'signedAt', 'scope', 'evidence', 'contentFingerprint', 'items', 'audio'):
        if not rec.get(f): bad.append(f'簽核紀錄缺欄位:{f}')
    if bad: return bad
    if rec['status'] != 'passed' or not rec['reviewer'] or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', rec['signedAt']): bad.append('簽核紀錄的狀態、審核者或日期不完整')
    if not re.fullmatch(r'[0-9a-f]{64}', rec['evidence'].get('reviewHtmlSha256', '')): bad.append('缺少審核 HTML 的 SHA-256 證據')
    item = next((i for i in data['items'] if i['key'] == key), None)
    if item is None: return bad + [f'找不到題目 {key} 的詳解資料']
    e = item['e']
    if e['status'] != 'reviewed' or e.get('reviewer') != rec['reviewer'] or e.get('reviewedAt') != rec['signedAt'] or not (e.get('reviewNotes') or '').strip():
        bad.append(f'explain.js 的 {key} 審核欄位(status/reviewer/reviewedAt/reviewNotes)與簽核紀錄不一致或不完整')
    rows = rows_of(data, key, audio_dir)
    ids = [r for r, _ in rows]
    if sorted(x['id'] for x in rec['items']) != sorted(ids): bad.append('審核項目 ID 與現行資料產生的項目不一致(內容結構已改變,需重新審核)')
    if any(x['result'] != 'passed' for x in rec['items']): bad.append('有審核項目不是 passed')
    btn = {b['item']: b['file'] for b in rec['audio']['buttons']}
    if btn != {r: f for r, f in rows if f}: bad.append('發音按鈕與音檔的對應已改變(需重新審核)')
    bad += audio_problems(rec, data, rows, audio_dir, prov_rec)
    bad += dev_check_problems(rec)
    if fingerprint(data, key, audio_dir) != rec['contentFingerprint']['value']:
        bad.append('內容指紋不一致:已簽核的教學內容、單字、延伸練習或歷屆紀錄在簽核後被修改,需重新審核')
    return bad


def audio_problems(rec, data, rows, audio_dir=AUDIO, prov_rec=None):
    """試聽簽核（audio 區塊）與現行音檔是否一致。
    passed：每個已簽核的 mp3 都必須存在且 SHA-256 與簽核時相同；否則是錯誤（要先執行 sync-audio 作廢，或把檔案還原）。
    invalidated：不得再有任何「已通過」的檔案（approvedFiles 必須為空），並保留作廢原因與先前簽核的歷史。"""
    bad = []; a = rec['audio']; st = a.get('status')
    btn = {b['item']: b['file'] for b in a['buttons']}
    if st not in ('passed', 'invalidated', 'pending'): return ['audio.status 必須是 passed、invalidated 或 pending']
    total = len(data['man']['items'])
    if st == 'pending':
        if a['approvedFiles']: bad.append('尚未進行試聽簽核(pending)的紀錄不得列有「已通過」的音檔')
        if a['totalAudioFiles'] != total or a['notIncludedCount'] != total or a['distinctFileCount'] != 0: bad.append('pending 時，所有音檔都應是「不在簽核範圍」')
        return bad
    if st == 'invalidated':
        if a['approvedFiles']: bad.append('試聽簽核已作廢，不得仍列有「已通過」的音檔')
        if not (a.get('reason') and a.get('invalidatedAt') and a.get('previousApproval', {}).get('approvedFiles')): bad.append('作廢的試聽簽核缺少原因、日期或先前簽核的歷史')
        if a['totalAudioFiles'] != total or a['notIncludedCount'] != total: bad.append('作廢後，所有音檔都應是「不在簽核範圍」')
        return bad
    approved = {x['file']: x['sha256'] for x in a['approvedFiles']}
    if set(approved) != set(btn.values()) or a['distinctFileCount'] != len(approved) or a['buttonCount'] != len(btn): bad.append('簽核的音檔清單與按鈕對應不一致')
    sys.path.insert(0, str(ROOT / 'tools')); import gsat_audio_provenance as prov
    pr = prov.load() if prov_rec is None else prov_rec
    for f, h in approved.items():
        p = audio_dir / f
        # 正式簽核的來源防護:即使 SHA-256 碰巧與簽核紀錄相同，只有來源紀錄為 azure-paid、productionApproved 為 true 的檔案才能是 passed
        if p.exists() and prov.status_of(f, audio_dir, pr) != 'production':
            e = pr.get('files', {}).get(f) or {}
            bad.append(f'正式試聽簽核不得包含非 production 來源的音檔:{f}(來源 {e.get("engine", "無紀錄")}／{e.get("usage", "-")})')
        if not p.exists(): bad.append(f'簽核的音檔不存在:{f}(需重新試聽；可用 sync-audio 作廢)')
        elif hashlib.sha256(p.read_bytes()).hexdigest() != h: bad.append(f'簽核的音檔內容已改變:{f}(試聽簽核失效，請執行 sync-audio 作廢並重新聆聽)')
    if a['totalAudioFiles'] != total or a['notIncludedCount'] != total - len(approved):
        bad.append('音檔總數或「不在範圍」的數量與現行音檔清單不一致')
    return bad


def dev_check_problems(rec):
    """audio.devTestChecks：開發測試音檔（Azure F0）的人工音質檢查歷史。它不是試聽簽核：不影響 audio.status、不會讓任何檔案「已通過」，
    也不得標成 production。這裡只檢查欄位與「不可冒充正式簽核」。"""
    bad = []
    for n, c in enumerate(rec['audio'].get('devTestChecks', []), 1):
        w = f'devTestChecks[{n}]'
        if c.get('purpose') != 'development-test audio quality check' or c.get('usage') != 'development-test-only' or c.get('productionApproved') is not False:
            bad.append(f'{w}:必須是 development-test 音質檢查，且 productionApproved 必須為 false')
        if c.get('engine') != 'azure-free-test' or c.get('result') != 'passed' or not c.get('reviewer') or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', c.get('checkedAt', '')):
            bad.append(f'{w}:來源、結果、審核者或日期不完整')
        if not isinstance(c.get('filesInRepository'), bool): bad.append(f'{w}:必須標明 filesInRepository(true／false)')
        btn = {b['file'] for b in rec['audio']['buttons']}
        fs = c.get('files') or []
        if not fs or not {x.get('file') for x in fs} <= btn or any(not re.fullmatch(r'[0-9a-f]{64}', x.get('sha256', '')) for x in fs): bad.append(f'{w}:檔案清單不完整或不屬於本題')
    return bad


def record_dev_check(rec, data, key, reviewer, date, audio_dir=AUDIO, files_in_repo=True):
    """記錄一次 F0 開發測試音檔的人工音質檢查（歷史）。只接受來源紀錄為 azure-free-test 且雜湊相符的檔案；不改 audio.status、approvedFiles，也不寫 production。"""
    sys.path.insert(0, str(ROOT / 'tools')); import gsat_audio_provenance as prov
    rows = rows_of(data, key, audio_dir); files = sorted({f for _, f in rows if f}); pr = prov.load()
    notok = [f for f in files if prov.status_of(f, audio_dir, pr) != 'dev-test']
    if notok: raise SystemExit(f'不是 azure-free-test 開發測試來源（或雜湊與來源紀錄不符）:{notok[:3]}…共 {len(notok)} 個')
    r = copy.deepcopy(rec)
    r['audio'].setdefault('devTestChecks', []).append({
        'purpose': 'development-test audio quality check', 'scope': f'{key} 的 {len(files)} 個不同 mp3(開發測試版,Azure Speech F0)', 'engine': 'azure-free-test', 'tier': 'F0',
        'usage': 'development-test-only', 'productionApproved': False, 'filesInRepository': files_in_repo, 'result': 'passed', 'reviewer': reviewer, 'checkedAt': date,
        'checked': '發音、語速、停頓與音質',
        'files': [{'file': f, 'sha256': hashlib.sha256((audio_dir / f).read_bytes()).hexdigest()} for f in files],
        'note': '這不是 production 試聽簽核:不使 audio.status 變為 passed、不使任何檔案成為 approvedFiles。正式發布前須改用付費層(azure-paid)重產,並重新聆聽、以 approve-audio 正式簽核。'})
    return r


def audio_changed(rec, audio_dir=AUDIO):
    """已簽核的 mp3 中，內容已改變或消失的檔名。"""
    a = rec['audio']
    if a.get('status') != 'passed': return []
    out = []
    for x in a['approvedFiles']:
        p = audio_dir / x['file']
        if not p.exists() or hashlib.sha256(p.read_bytes()).hexdigest() != x['sha256']: out.append(x['file'])
    return out


def invalidate_audio(rec, date, reason):
    """把試聽簽核標為 invalidated：先前的簽核資料收進 previousApproval 當歷史，approvedFiles 清空。教學文字簽核與內容指紋完全不動。"""
    r = copy.deepcopy(rec); a = r['audio']
    if a.get('status') != 'passed': return r                          # 已作廢的不再處理，避免覆蓋掉先前簽核的歷史
    a['previousApproval'] = {'reviewer': r['reviewer'], 'signedAt': r['signedAt'], 'approvedFiles': a['approvedFiles'], 'scope': a['scope']}
    a['status'] = 'invalidated'; a['invalidatedAt'] = date; a['reason'] = reason
    a['approvedFiles'] = []; a['distinctFileCount'] = 0; a['notIncludedCount'] = a['totalAudioFiles']
    a['scope'] = '試聽簽核已作廢:先前通過的音檔已被取代，在教師重新聆聽並明確簽核之前，沒有任何音檔視為已通過。教學文字的簽核不受影響。'
    a['notIncluded'] = '所有音檔（含更換前曾通過的 Q1 對應檔）都不得視為已通過。'
    return r


def approve_audio(rec, data, key, reviewer, date, audio_dir=AUDIO, official_only=True):
    """人工重新聆聽後的重新簽核：只簽這一題按鈕對應的檔案；預設要求每個檔都是正式 TTS 來源。"""
    sys.path.insert(0, str(ROOT / 'tools'))
    import gsat_audio_provenance as prov
    rows = rows_of(data, key, audio_dir)
    buttons = [{'item': rid, 'file': f} for rid, f in rows if f]; files = sorted({b['file'] for b in buttons})
    if official_only:
        pr = prov.load(); notok = [f for f in files if prov.status_of(f, audio_dir, pr) != 'production']
        if notok: raise SystemExit(f'不是 azure-paid（正式付費層）來源的音檔不能簽核（免費層 F0 測試音檔不得取得 production 試聽簽核）:{notok[:3]}…共 {len(notok)} 個')
    r = copy.deepcopy(rec); a = r['audio']
    a.update({'status': 'passed', 'buttons': buttons, 'buttonCount': len(buttons), 'distinctFileCount': len(files),
              'approvedFiles': [{'file': f, 'sha256': hashlib.sha256((audio_dir / f).read_bytes()).hexdigest(), 'result': 'passed'} for f in files],
              'totalAudioFiles': len(data['man']['items']), 'notIncludedCount': len(data['man']['items']) - len(files),
              'scope': f'{key} 對應的 {len(files)} 個不同 mp3({len(buttons)} 個播放按鈕)已由{reviewer}於 {date} 重新人工試聽通過;清單中其餘音檔不在本次簽核範圍,不得視為已通過',
              'notIncluded': '清單中其餘音檔不在本次簽核範圍,不得視為已通過。', 'reapprovedBy': reviewer, 'reapprovedAt': date})
    for k in ('reason', 'invalidatedAt'): a.pop(k, None)
    return r


def unsigned_reviewed(data, signed_keys):
    """標為 reviewed 卻沒有簽核紀錄的題目(AI 產生的內容不能自己變成已審核)。"""
    return [i['key'] for i in data['items'] if i['e']['status'] == 'reviewed' and i['key'] not in signed_keys]


def main():
    ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest='cmd', required=True)
    sp.add_parser('check')
    f = sp.add_parser('fingerprint'); f.add_argument('key')
    d = sp.add_parser('draft'); d.add_argument('key'); d.add_argument('--reviewer', required=True); d.add_argument('--date', required=True); d.add_argument('--html-sha', required=True)
    d.add_argument('--audio-scope', default='只限本題教學內容對應的發音;清單中其餘音檔不在本次簽核範圍'); d.add_argument('--audio-status', default='pending', choices=['pending', 'passed']); d.add_argument('--occurrence-note', default=None)
    sa = sp.add_parser('sync-audio'); sa.add_argument('--date', default=None)
    dc = sp.add_parser('record-dev-check'); dc.add_argument('key'); dc.add_argument('--reviewer', required=True); dc.add_argument('--date', required=True); dc.add_argument('--confirm-listened', action='store_true')
    ap2 = sp.add_parser('approve-audio'); ap2.add_argument('key'); ap2.add_argument('--reviewer', required=True); ap2.add_argument('--date', required=True); ap2.add_argument('--confirm-listened', action='store_true')
    a = ap.parse_args()
    data = load_data()
    if a.cmd == 'fingerprint':
        print(fingerprint(data, a.key), len(rows_of(data, a.key)), '個審核項目'); return
    if a.cmd == 'draft':
        print(json.dumps(draft(data, a.key, a.reviewer, a.date, a.html_sha, a.audio_scope, a.audio_status, a.occurrence_note), ensure_ascii=False, indent=1)); return
    if a.cmd == 'sync-audio':
        import datetime
        date = a.date or datetime.date.today().isoformat(); n = 0
        for p in sorted(SIGNOFFS.glob('*.json')):
            rec = json.loads(p.read_text(encoding='utf8')); ch = audio_changed(rec)
            if ch:
                new = invalidate_audio(rec, date, f'{len(ch)} 個已簽核的音檔內容已改變或消失(音檔重新產生/更換來源),需教師重新聆聽')
                p.write_text(json.dumps(new, ensure_ascii=False, indent=1) + '\n', encoding='utf8'); n += 1
                print(f'{p.name}: 試聽簽核已作廢（{len(ch)} 個檔改變）。注意:explain.js 的 reviewNotes 不得寫死音檔通過數量，音檔狀態以簽核紀錄為準。')
        print(f'作廢 {n} 份試聽簽核'); return
    if a.cmd == 'record-dev-check':
        if not a.confirm_listened: raise SystemExit('必須由人聽完後加上 --confirm-listened；本工具不會自動記錄')
        p = SIGNOFFS / f'{a.key}.json'; rec = json.loads(p.read_text(encoding='utf8'))
        p.write_text(json.dumps(record_dev_check(rec, data, a.key, a.reviewer, a.date), ensure_ascii=False, indent=1) + '\n', encoding='utf8'); print('已記錄開發測試音質檢查(不是 production 簽核)'); return
    if a.cmd == 'approve-audio':
        if not a.confirm_listened: raise SystemExit('必須由人聽完後加上 --confirm-listened；本工具不會自動簽核')
        p = SIGNOFFS / f'{a.key}.json'; rec = json.loads(p.read_text(encoding='utf8'))
        p.write_text(json.dumps(approve_audio(rec, data, a.key, a.reviewer, a.date), ensure_ascii=False, indent=1) + '\n', encoding='utf8'); print('已重新記錄試聽簽核'); return
    bad = []
    files = sorted(SIGNOFFS.glob('*.json')) if SIGNOFFS.exists() else []
    signed = set()
    for p in files:
        rec = json.loads(p.read_text(encoding='utf8')); signed.add(rec.get('question'))
        b = validate(rec, data)
        bad += [f'{p.name}: {x}' for x in b]
    bad += [f'{k} 標為 reviewed,但沒有簽核紀錄' for k in unsigned_reviewed(data, signed)]
    print(f'檢查 {len(files)} 份簽核紀錄:' + ('全部有效' if not bad else f'{len(bad)} 個問題'))
    for b in bad: print('  ✗', b)
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
