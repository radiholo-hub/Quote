// 原創詳解（自行撰寫，非第三方解析）。鍵為「年度-題號」。
// status：draft＝草稿，待英文老師審核；reviewed＝已審核（審核前不得標為 reviewed）。reviewer／reviewedAt／reviewNotes 由審核者填寫。
// 審核方式：python3 tools/gsat_review_sheet.py --out <版本庫以外的資料夾> 產生含題目與檢核欄位的審核表（內含試題，請勿公開）。
// 欄位：answer（須與官方答案一致，載入時與測試都會檢查）、key（解題關鍵）、why（每個選項為何對／錯）、words（重要單字片語）、grammar（文法補充，可省略）。
// 試做範圍：115 學年度詞彙題第 1–10 題。撰寫方式：先獨立判斷答案，再和大考中心公布答案核對，10 題皆一致。
window.EXPLAIN = {
  '115-1': {
    answer: 'B', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '句型 such a ___ schedule that…：行程要排到「幾週才約得到訪談」，表示行程非常滿，所以用 tight（緊湊的）。',
    why: { A: 'hasty 是「倉促的、草率的」，多形容決定或行動，不是行程排得滿。', B: 'tight schedule＝行程緊湊，符合「要等好幾週才排得到」。', C: 'diligent 是「勤勉的」，形容人，不能形容 schedule。', D: 'routine 是「例行的」，沒有「行程排不出空檔」的意思。' },
    words: ['tight schedule 行程緊湊', 'arrange an interview 安排訪談', 'mayor 市長'],
    grammar: 'such a + 形容詞 + 名詞 + that 子句：such a tight schedule that it takes weeks…（如此緊湊的行程，以致於…）。',
  },
  '115-2': {
    answer: 'C', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '轉折詞 but 前後要形成對比：現在擁有「專業」(professional) 工作室，之前就應該是「業餘」的 amateur。',
    why: { A: 'official 是「官方的、正式的」，和 professional 不構成對比。', B: 'instant 是「立即的、即溶的」，與職業身分無關。', C: 'amateur＝業餘的，與後面 professional 形成對比。', D: 'elementary 是「初級的、基本的」，用在程度或教育階段，不用來描述職業身分。' },
    words: ['amateur 業餘的／業餘者 ↔ professional 專業的', 'start as … 起初是…', 'of her own 她自己的'],
    grammar: 'a professional studio of her own：「a + 名詞 + of + 所有格 + own」＝她自己的專業工作室（等於 her own professional studio）。這個形式前面要用 a／an，不能寫成 a her own studio。',
  },
  '115-3': {
    answer: 'B', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '主詞 teaching ___ at the famous high school 能「吸引十幾位合格應徵者」，只有「教職缺額」說得通，所以用 vacancy（職缺）。',
    why: { A: 'career 是「職業生涯」，不是學校提供的一個「缺」。', B: 'teaching vacancy＝教職缺額，學校釋出缺額才會有人應徵。', C: 'expectation 是「期望」，不會吸引應徵者。', D: 'inspiration 是「靈感、啟發」，與應徵無關。' },
    words: ['vacancy 職缺、空缺', 'applicant 應徵者', 'well-qualified 資格優良的', 'a dozen 十二個（more than a dozen＝十幾個以上）'],
    grammar: 'more than a dozen applicants：dozen 前面有 a 或數字時不加 s（two dozen eggs）；沒有數字、表示「很多」時才用 dozens of。soon 是頻率／時間副詞，放在主詞與動詞之間（soon attracted）。',
  },
  '115-4': {
    answer: 'A', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '句意是「獲利遠超過『原先』的預期」。than 之後省略了主詞與 be 動詞，等於 than (it was) initially expected，用表示時間先後的 initially（起初）。',
    why: { A: 'initially＝起初、原先，than initially expected＝比起原先的預期。', B: 'genuinely 是「真誠地、確實地」，不表示時間先後。', C: 'alternatively 是「或者、另一個選擇是」，用於提出替代方案。', D: 'fundamentally 是「根本上」，不符合「預期」的語意。' },
    words: ['initially 起初', 'far more … than … 遠多於…', 'profit 利潤'],
    grammar: 'than 引導的比較子句常省略「主詞 + be」：…than (it was) initially expected。',
  },
  '115-5': {
    answer: 'D', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: 'a balanced ___ of fruit and vegetables 與健康有關的是人「實際吃進去」的量，所以用 consumption（攝取、消費）。',
    why: { A: 'dimension 是「層面、維度」，與「蔬果的量」無關。', B: 'integration 是「整合」，語意不通。', C: 'provision 是「供應、提供」，指給予的一方；影響健康的是吃下去的量，不是供應。', D: 'consumption＝攝取（量），a balanced consumption of fruit and vegetables＝均衡攝取蔬果。' },
    words: ['consumption 攝取量、消費', 'balanced diet 均衡飲食', 'key element 關鍵要素'],
    grammar: 'It has been confirmed that…：虛主詞 It + 現在完成式被動，真主詞是 that 子句（已被證實…）。',
  },
  '115-6': {
    answer: 'A', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '主詞是「害羞、怕公開露面」的男孩，空格要表達對「在大批觀眾前演講這個想法」感到畏懼。dread the thought of… 是常見搭配。',
    why: { A: 'dread＝害怕、畏懼，dread the thought of speaking…（一想到要演講就害怕）。', B: 'stress 當動詞是「強調」，stresses the thought 變成「強調這個想法」，與害怕不同。', C: 'wander 是不及物動詞「閒逛、漫遊」，後面不能直接接 the thought。', D: 'escape 是「逃脫」，escape the thought 不是慣用搭配，也不是題目要的「感到恐懼」。' },
    words: ['dread (v.) 害怕、畏懼', 'dread doing sth. / dread the thought of… 一想到…就害怕', 'make a public appearance 公開露面', 'audience 觀眾、聽眾'],
    grammar: 'the thought of + V-ing：介系詞 of 後面接動名詞，所以是 the thought of speaking，不能寫 the thought of to speak。句首 As a shy boy afraid of making public appearances 的 as 是「作為」，afraid of… 是放在 boy 後面的形容詞片語。',
  },
  '115-7': {
    answer: 'C', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '空格前面是 his life’s ___，後面 which 子句說他「全心全意投入」，表示這是他畢生熱愛的事物，所以用 passion。',
    why: { A: 'resource 是「資源」，不能說音樂是他一生的資源後又「全心投入」。', B: 'impact 是「影響」，語意不符。', C: 'passion＝熱情、熱愛的事物，life’s passion＝畢生的熱愛。', D: 'emphasis 是「重點、強調」，無法表達全心投入的對象。' },
    words: ['passion 熱情、熱愛的事物', 'devote oneself to… 全心投入…', 'whole-heartedly 全心全意地', 'newly-crowned 剛獲得冠軍的'],
    grammar: '非限定關係子句 which he has devoted himself to：先行詞是 his life’s passion，介系詞 to 留在子句最後。',
  },
  '115-8': {
    answer: 'B', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '酒駕者「對路人大吼」又「用玻璃瓶 ___ 他們」，並因此被警察逮捕，空格要是「攻擊」，用 assault sb. with sth.（用…攻擊某人）。',
    why: { A: 'shatter 是「打碎」，受詞是物品（如玻璃），不能 shatter 路人。', B: 'assault＝攻擊、襲擊，assaulted them with glass bottles＝用玻璃瓶攻擊他們。', C: 'overturn 是「翻轉、推翻」，受詞是物品或判決，不能接人。', D: 'condemn 是「譴責」，不是動手，也不搭配 with glass bottles。' },
    words: ['assault sb. with sth. 用…攻擊某人', 'passer-by 路人（複數 passers-by）', 'drunk driver 酒駕者', 'arrest 逮捕'],
    grammar: 'who shouted at passers-by and ___ them…：who 子句裡兩個過去式動詞用 and 並列，共用同一個主詞 who；主要子句 was quickly arrested 是被動語態。shout at sb. 是「對著某人大吼」（帶怒意），shout to sb. 才是「向某人喊話」。',
  },
  '115-9': {
    answer: 'C', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: '句型「動詞 + one’s way + 介系詞」表示「以某種方式前進」。人多擁擠時，最貼切的是 elbow one’s way through the crowd（用手肘擠開人群前進）。',
    why: { A: 'crash 是猛烈撞擊或撞毀，強調破壞力，不是「擠過人群」。', B: 'tumble 是「跌倒、翻滾」，不與 one’s way 組成這種句型。', C: 'elbow one’s way through the crowd 是描述穿過擁擠人群最慣用、動作最具體的說法。', D: 'struggle 後面雖也可接 one’s way，但語意是「費力地完成」，沒有指出「用身體擠過去」的動作，在這題不如 elbow 貼切；官方答案為 C。' },
    words: ['elbow (v.) 用手肘推擠', 'elbow one’s way through the crowd 擠過人群', 'board 登上（車、船、飛機）', 'in time 及時（on time 是準時）'],
    grammar: 'so many people at the bus station that…：so + 形容詞（many）+ 名詞 + that 子句，表示結果。',
  },
  '115-10': {
    answer: 'D', status: 'draft', reviewer: null, reviewedAt: null, reviewNotes: '',
    key: 'raise ___ concerns 的常見搭配是 grave concerns（嚴重的、深切的憂慮），前面的 deadly shootings、後面的 tragic incidents 也都是嚴肅沉重的語氣。',
    why: { A: 'swift 是「迅速的」，常見搭配是 swift response，不修飾 concerns。', B: 'brutal 是「殘暴的」，形容暴行本身，不用來形容「憂慮」。', C: 'harsh 是「嚴厲的、嚴酷的」，常搭配 criticism、weather，不搭配 concerns。', D: 'grave concerns＝嚴重的憂慮，是 concerns 最常見的形容詞之一。' },
    words: ['grave 嚴重的、嚴肅的', 'raise concerns about… 引發對…的憂慮', 'deadly 致命的', 'campus 校園', 'tragic 悲慘的'],
    grammar: 'prevent + 受詞 + from + V-ing：prevent such tragic incidents from happening again（防止這類悲劇再度發生）。',
  },
};
