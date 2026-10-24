"""作答紀錄的難度：新紀錄記下作答當時的難度（第 6 欄），舊紀錄（5 欄）一律用固定的 LV_V0。
調整題目難度後，既有紀錄的升降級結果不變；調整後的新作答才用新難度計算。"""

# 2026-10-24 之後調整過難度的題目：題號 → (LV_V0 裡的舊難度, 目前難度)。之後再調整題目難度時加在這裡。
RELABELED = {143: (2, 1)}

# 「代名詞」類：除 #143 以外的中階（或基礎）日常題，取 9 題，再把 #143 插在第 3 題
PLOG = """([lv,fmt143,ch,level])=>{const t=__t,S=t.S;
  const ids=t.PBANK.filter(q=>q.tag==='pron'&&q.lv===lv&&q.id!==143).slice(0,9).map(q=>q.id);
  ids.splice(2,0,143);
  S.level=level;
  S.plog=ids.map(id=>{const e=[id,1,1,0,ch];if(id!==143)e.push(t.BANK[id].lv);else if(fmt143)e.push(fmt143);return e});
  const st=t.tagState('pron');return [st.lv,st.cs]}"""


def test_frozen_table_matches_bank_except_relabeled(app):
    v0, lvs = app.js("()=>[__t.LV_V0,__t.BANK.map(q=>q.lv)]")
    assert len(v0) == 678
    for i, c in enumerate(v0):
        if i in RELABELED:
            assert (int(c), lvs[i]) == RELABELED[i], i
        else:
            assert int(c) == lvs[i], '第 %d 題的難度和 LV_V0 不同：調整難度要加進 RELABELED' % i


def test_old_record_of_143_still_counts_as_intermediate(app):
    # 中階 10 題全對：舊紀錄的 #143 照調整前算中階，兩組達標升進階
    assert app.js(PLOG, [2, 0, 0, 2])[0] == 3
    # 同一份紀錄，#143 記為基礎（調整後的新作答）：中階只剩 9 題，只有一組，不升級
    assert app.js(PLOG, [2, 1, 0, 2])[0] == 2


def test_new_record_of_143_counts_as_basic(app):
    # 基礎 9 題 + 新作答的 #143（記為基礎），全對：兩組達標升中階
    assert app.js(PLOG, [1, 1, 0, 1])[0] == 2
    # 舊紀錄的 #143 是中階，不算進基礎的分組
    assert app.js(PLOG, [1, 0, 0, 1])[0] == 1


def test_old_format_record_beyond_frozen_table_is_ignored(app):
    # 題號超出 LV_V0 的舊格式紀錄（目前的版本不會產生）：不計入；有第 6 欄就照記錄的難度
    got = app.js("""()=>{const t=__t,S=t.S,n=t.LV_V0.length;
      const q=t.PBANK.filter(q=>q.tag==='pron'&&q.lv===2).slice(0,10).map(q=>q.id);
      t.BANK[n]=Object.assign({},t.BANK[q[0]],{id:n});S.level=2;
      const run=fmt=>{S.plog=q.map(id=>[id,1,1,0,0,2]);S.plog[2]=fmt?[n,1,1,0,0,2]:[n,1,1,0,0];return t.tagState('pron').lv};
      const r=[run(0),run(1)];delete t.BANK[n];return r}""")
    assert got == [2, 3]


def test_challenge_uses_recorded_level(app):
    # 基礎學員的挑戰題（中階）：舊紀錄的 #143 算中階挑戰題，兩組達標升級
    assert app.js(PLOG, [2, 0, 1, 1]) == [2, 0]
    # #143 記為基礎時不算挑戰題：只完成一組，挑戰進度 1
    assert app.js(PLOG, [2, 1, 1, 1]) == [1, 1]


def test_answer_records_current_level(app):
    app.setup(level=1)
    other = app.js("__t.PBANK.find(q=>q.tag==='pron'&&q.lv===2&&q.id!==143).id")
    app.js("""o=>{const t=__t;t.S.plog=[];
      t.runQuiz({list:[t.prep(t.BANK[143]),t.prep(t.BANK[o])],mode:'drill',title:'t',onDone:()=>{}})}""", other)
    app.play()
    assert app.js("__t.S.plog") == [[143, 1, 1, 0, 0, 1], [other, 1, 1, 0, 0, 2]]


def test_mixed_records_survive_cloud_and_reload(app):
    app.setup()
    mixed = [[143, 1, 1, 0, 0], [143, 0, 0, 0, 0, 1], [5, 1, 1, 0, 1, 2]]
    # 雲端：上傳的內容與下載套用後都保留第 6 欄
    blob = app.js("p=>{__t.S.plog=p;return __t.backupBlob()}", mixed)
    assert blob['plog'] == mixed
    app.js("b=>{__t.S.plog=[];__t.applyBlob(b);__t.save()}", blob)
    assert app.js("__t.S.plog") == mixed
    # 重新整理（本機儲存）後仍相同
    app.page.reload(); app.page.wait_for_function('window.__t&&window.__t.S'); app.page.wait_for_timeout(300)
    assert app.js("__t.S.plog") == mixed
