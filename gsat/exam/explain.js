// 原創詳解(自行撰寫,非第三方解析)。鍵為「年度-題號」。schema 2:引用單字詞條(gsat/data/vocab.js),字義與詞性只在詞條裡定義一次。
// status:draft＝AI 草稿,待英文老師審核;reviewed＝已審核(審核前不得標為 reviewed)。reviewer／reviewedAt／reviewNotes 由審核者填寫。
// 【資料來源】本檔是版本控制下的唯一來源,直接編輯;沒有任何 repo 外的產生流程,也不得再用腳本整檔重新產生(會把教師簽核欄位覆蓋回 draft;gsat/tests/test_signoff.py 會擋)。
// 已簽核的題目(目前有 114-1 ～ 114-46 與 115-1 ～ 115-46)必須有 docs/gsat/signoffs/<題號>.json,且內容指紋一致(python3 tools/gsat_signoff.py check);已簽核的內容被改動後檢查會失敗,需重新審核。
// 審核方式:python3 tools/gsat_review_sheet.py --out <版本庫以外的資料夾> 產生含題目與檢核欄位的審核表(內含試題,請勿公開)。
window.EXPLAIN = {
 "114-1": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "空格前有冠詞 a、後面接介系詞 under,所以空格要填單數可數名詞,當 put 的受詞。四個選項都是名詞,詞性無法區分,要靠語意與搭配。",
   "put ___ under a leaking faucet 的目的是「接水」,而且後面說 the amount of water collected in 24 hours(24 小時內被收集的水量),所以空格必須是能盛裝液體的東西。container(容器)符合,它來自動詞 contain(容納)。",
   "比較選項:border 是邊界或邊框、timer 是計時器、marker 是標記用的筆或記號,三者都不能盛水,放在水龍頭下無法「收集」水,所以選 (C)。"
  ],
  "options": {
   "A": {
    "why": "border 是名詞,指國界、邊界或圖案的邊框(如 cross the border)。這個字本身用法正確,但邊界或邊框無法盛水,不符合本題語境。"
   },
   "B": {
    "why": "timer 是名詞,指計時器(如 set a timer)。這個字本身用法正確,放一個計時器在水龍頭下也許能量「時間」,但句中說的是「收集到的水量」,需要能盛水的東西,不符合本題語境。"
   },
   "C": {
    "why": "container 是可數名詞,指容器(盒、罐、桶、瓶等能裝東西的東西)。放在漏水的水龍頭下,才能把水收集起來,24 小時後看到的水量才有意義,故選 (C)。"
   },
   "D": {
    "why": "marker 是名詞,指標記物或麥克筆、記號筆(如 a red marker)。這個字本身用法正確,但標記物不能盛水,不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "container",
    "pos": "n.",
    "zh": "容器",
    "note": "由動詞 contain(包含、容納)加上名詞字尾 -er 而來;同義字:vessel(較正式)。本題指能盛水的容器。注意 container 可指各種大小的容器,小到盒罐,大到貨櫃。",
    "coll": [
     "a plastic container",
     "a food container",
     "a shipping container",
     "a container ship"
    ]
   },
   {
    "type": "word",
    "t": "contain",
    "pos": "v.",
    "zh": "包含、容納",
    "note": "container 的字根動詞。contain 也可表示「控制、抑制」(contain one’s anger)。衍生字:contents(內容物)。"
   },
   {
    "type": "word",
    "t": "faucet",
    "pos": "n.",
    "zh": "水龍頭",
    "note": "美式英語常用 faucet,英式英語常用 tap。leaking faucet(漏水的水龍頭)中的 leaking 是現在分詞當形容詞;leak 作動詞也可指「漏出」,作名詞指「漏洞、漏出」。",
    "coll": [
     "turn on/off the faucet",
     "a dripping faucet"
    ]
   },
   {
    "type": "word",
    "t": "amount",
    "pos": "n.",
    "zh": "數量、總額",
    "note": "amount 後接 of + 不可數名詞(the amount of water、a large amount of money);可數複數名詞則用 a number of。本題 the amount of water 的 water 不可數。",
    "coll": [
     "a large amount of",
     "the amount of time"
    ]
   },
   {
    "type": "word",
    "t": "border",
    "pos": "n.",
    "zh": "邊界、邊框",
    "note": "本題干擾字。比較:border 是兩地之間的界線;boundary 為較抽象的界線、範圍;frame 是畫框或框架。"
   },
   {
    "type": "word",
    "t": "marker",
    "pos": "n.",
    "zh": "標記物、麥克筆",
    "note": "本題干擾字。marker 由動詞 mark(做記號)加 -er 而來,指做記號的人或物;mark 也構成 landmark、bookmark 等複合字。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "如果你在漏水的水龍頭下放一個容器,你會對 24 小時內收集到的水量感到驚訝。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-2": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "空格前有形容詞 fresh seasonal,後面有 to people in the community,而 offers a variety of 後面接名詞,所以空格要填名詞。四個選項都是名詞,要靠語意與搭配判斷。",
   "主詞是 farmers’ market(農夫市集),賣的東西重點在 fresh(新鮮的)與 seasonal(當季的),這兩個修飾語最能搭配的是農產品;produce 作不可數名詞,指(尤指蔬果的)農產品。",
   "offers a variety of ... 後面接複數名詞或不可數名詞都可以,produce 為不可數,所以直接用 a variety of fresh seasonal produce,不需要加 s。",
   "其他選項:fashion、brand、trend 本身都是好用的名詞,但「新鮮的」多半形容食物,農夫市集又不是賣時尚、品牌或潮流的地方,語境不符,所以選 (A)。"
  ],
  "options": {
   "A": {
    "why": "produce (名詞,KK 音標 /ˈprɑdjus/,重音在第一音節),是不可數名詞,指農產品,尤指蔬菜水果。fresh seasonal produce 就是「新鮮的當季蔬果」,與農夫市集完全吻合,故選 (A)。"
   },
   "B": {
    "why": "fashion 是名詞,指時尚、流行款式(如 seasonal fashion 指當季流行服飾)。這個字本身用法正確;但農夫市集賣的是食物,fresh seasonal 搭配的是可食用的農產品,不是時尚,不符合本題語境。"
   },
   "C": {
    "why": "brand 是名詞,指品牌(如 a famous brand)。這個字本身用法正確;但本句 fresh seasonal 暗示的是可食用的農作物,農夫市集提供的重點是新鮮當季的食物產品,brand 不符合這個語境。"
   },
   "D": {
    "why": "trend 是名詞,指趨勢、潮流(如 a growing trend)。這個字本身用法正確;但市集「提供」給居民的是具體可購買的東西,而且 fresh seasonal 暗示食物,trend 不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "produce",
    "pos": "n.",
    "zh": "農產品(尤指蔬果)",
    "note": "名詞(不可數)KK 音標 /ˈprɑdjus/,重音在第一音節;動詞讀作 /prəˈdjus/,意為「生產、製造、產生」,重音在第二音節。名詞 produce 常見於超市的 produce section(蔬果區)。",
    "coll": [
     "fresh produce",
     "local produce",
     "organic produce"
    ]
   },
   {
    "type": "word",
    "t": "produce",
    "pos": "v.",
    "zh": "生產、製造、產生",
    "note": "與名詞 produce 拼法相同、重音不同。衍生字:product(產品)、production(生產)、producer(生產者)、productive(多產的、有生產力的)。"
   },
   {
    "type": "word",
    "t": "seasonal",
    "pos": "adj.",
    "zh": "季節性的、當季的",
    "note": "來自 season(季節)加 -al。seasonal fruit 是當季水果;seasonal changes 是季節變化。"
   },
   {
    "type": "word",
    "t": "a variety of",
    "pos": "phr.",
    "zh": "各式各樣的",
    "note": "a variety of 後面接複數名詞或不可數名詞;類似說法有 a range of、a wide selection of。注意 a variety of 當主詞的一部分時,動詞通常依後面的名詞決定單複數。",
    "coll": [
     "a variety of products",
     "a wide variety of"
    ]
   },
   {
    "type": "word",
    "t": "community",
    "pos": "n.",
    "zh": "社區、社群",
    "note": "本題 the community 指當地社區居民。常見搭配:community center(社區活動中心)、local community。"
   },
   {
    "type": "word",
    "t": "trend",
    "pos": "n.",
    "zh": "趨勢、潮流",
    "note": "本題干擾字。常見搭配:follow a trend、a growing trend;形容詞 trendy 指「時髦的」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "a variety of + 複數名詞／不可數名詞\n意思:各式各樣的……\n例如:The store sells a variety of fresh fruit.(這家店賣各式各樣的新鮮水果。)\n注意:variety 前常加 wide 加強語氣(a wide variety of);a variety of 之後若是可數名詞要用複數。"
  ],
  "grammar": "",
  "zh": "當地的農夫市集很受歡迎,因為它為社區居民提供各式各樣新鮮的當季農產品。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-3": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "空格在 are already 之後、分號之前,而 are 之後可以接現在分詞(構成現在進行式)或形容詞,四個選項都是 -ing 形式,所以要判斷哪一個動詞的意思適合「回憶」當主詞。",
   "分號後半句給出線索:I can no longer recall clearly what happened back then(我再也無法清楚回想當時發生的事),表示記憶變得不清楚。blur 作動詞表示「變模糊」,因此 memories are blurring 指記憶逐漸模糊。",
   "blur 在此作不及物動詞(記憶自己變模糊),are already blurring 是現在進行式,表示「已經在逐漸模糊」;若是被動語態應為 are blurred。前半句 As the years have passed by 說明歲月流逝,與這種漸進的變化相合。",
   "其他選項:trim 是修剪、drain 是排乾或耗盡、glare 是怒視或刺眼,動詞本身都用法正確,但都無法描述「記憶變得不清楚」,所以選 (A)。"
  ],
  "options": {
   "A": {
    "why": "blur 作動詞,表示「變模糊、使模糊不清」。memories are blurring 指記憶漸漸變得不清晰,正好對應後面的 can no longer recall clearly,故選 (A)。"
   },
   "B": {
    "why": "trim 是動詞,指修剪、削減(如 trim the hedge、trim costs)。這個字本身用法正確,但記憶不是被「修剪」,不符合本題語境。"
   },
   "C": {
    "why": "drain 是動詞,指排出(液體)、耗盡(精力或資源),如 drain the water、drained of energy。這個字本身用法正確,但本句重點是記憶「變不清楚」,而不是被排乾或耗盡,不符合本題語境。"
   },
   "D": {
    "why": "glare 是動詞,指怒視(glare at sb)或(光)刺眼地照耀;形容詞 glaring 還可指「顯眼的、明顯得刺眼的」,如 a glaring mistake。這個字本身用法正確,但與記憶變模糊的語意相反或無關,不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "blur",
    "pos": "v.",
    "zh": "(使)變模糊",
    "note": "作不及物動詞指「變模糊」,作及物動詞指「使模糊」。名詞 blur 指模糊不清的東西;形容詞 blurry、blurred 表示「模糊的」。同義字:fade(逐漸淡去)是表達記憶變淡的常見字,但 fade 偏重「逐漸消退」;反義字:sharpen(使清晰)。",
    "coll": [
     "blur the line between A and B",
     "a blurred photo",
     "blurry memories"
    ]
   },
   {
    "type": "word",
    "t": "recall",
    "pos": "v.",
    "zh": "回想起、記起",
    "note": "為及物動詞,後面直接接名詞或 wh- 子句,如 recall what happened。recall 比 remember 正式,常用於「回想起某事」。同義字:remember。recall 作名詞時可指召回(有瑕疵的產品)。",
    "coll": [
     "can’t recall the name",
     "recall doing sth"
    ]
   },
   {
    "type": "word",
    "t": "no longer",
    "pos": "phr.",
    "zh": "不再",
    "note": "no longer 放在助動詞之後、一般動詞之前,如 can no longer recall。同義說法:not ... any longer。"
   },
   {
    "type": "word",
    "t": "trim",
    "pos": "v.",
    "zh": "修剪、削減",
    "note": "本題干擾字。如 trim the hair、trim the budget。注意與 blur 不同:trim 是人刻意去除多餘部分。"
   },
   {
    "type": "word",
    "t": "glaring",
    "pos": "adj.",
    "zh": "刺眼的、明顯的",
    "note": "本題干擾字。glare 的 -ing 形式,glaring 常用於 a glaring error/mistake,指明顯到刺眼的錯誤,與「模糊」意義相反。"
   },
   {
    "type": "word",
    "t": "drain",
    "pos": "v.",
    "zh": "排出、耗盡",
    "note": "本題干擾字。drain 作動詞指排出(液體)、耗盡(精力、資源);作名詞指排水管,brain drain 指人才外流。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "空格前的 are already 加上現在分詞構成現在進行式(are blurring),表示記憶正在逐漸變模糊的過程;already 位於 be 動詞之後、分詞之前。",
  "zh": "隨著歲月流逝,我童年的許多記憶已經逐漸模糊了;我再也無法清楚回想當時發生的事。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-4": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "空格前有 by nature(本質上),後面有 and hurtful;空格與 hurtful 以 and 連接,兩者都要能描述 Racist remarks,所以空格要填形容詞。四個選項都是形容詞,要靠語意判斷。",
   "by nature 要描述 racist remarks「本質上」的性質。種族歧視言論本質上就是會冒犯他人的話,所以用 offensive(冒犯人的、令人反感的)最精準。",
   "比較 excessive:它表示「超過合理範圍的、過度的」。excessive and hurtful remarks 在文法與語意上可以成立;但本句有 by nature,要描述 racist remarks 本質上的性質。「過度」是程度描述,而 offensive 才直接指出種族歧視言論本質上會冒犯他人的特性,因此 (C) 最精確。",
   "其餘選項:furious 是狂怒的、stubborn 是頑固的,形容詞本身用法正確,但都不是在描述言論本質上會冒犯他人的性質,所以選 (C)。"
  ],
  "options": {
   "A": {
    "why": "excessive 是形容詞,表示「過度的、超過合理範圍的」。excessive remarks、excessive and hurtful remarks 都可以是自然英文;但本句以 by nature 描述 racist remarks 本質上的性質,excessive 只是程度描述,offensive 才直接表示「冒犯人的」,所以 (A) 不如 (C) 精確。"
   },
   "B": {
    "why": "furious 是形容詞,指狂怒的、暴怒的,通常形容人或情緒、反應(如 a furious reaction)。這個字本身用法正確,但本句在描述言論本身的性質,不是在說言論者很生氣,不符合本題語境。"
   },
   "C": {
    "why": "offensive 是形容詞,指冒犯的、無禮的、令人反感的。by nature 描述 racist remarks 本質上的性質,種族歧視言論本質上就會冒犯他人,與後面的 hurtful 和 should be avoided 的語氣一致,所以選 (C)。"
   },
   "D": {
    "why": "stubborn 是形容詞,指頑固的、固執的(通常形容人或態度,如 a stubborn child、a stubborn stain)。這個字本身用法正確,但言論「固執」與「傷人」不是同一個層面,不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "offensive",
    "pos": "adj.",
    "zh": "冒犯的、無禮的;攻擊的",
    "note": "動詞 offend(冒犯、得罪),名詞 offense/offence(冒犯;罪行)。offensive 也可作名詞,指進攻、攻勢;作形容詞時也可指進攻性的(對比 defensive 防守的)。同義字:insulting、rude;反義字:inoffensive(不會冒犯人的)、polite。",
    "coll": [
     "offensive language",
     "an offensive remark",
     "feel offended"
    ]
   },
   {
    "type": "word",
    "t": "hurtful",
    "pos": "adj.",
    "zh": "傷人的",
    "note": "hurt(傷害)加 -ful。hurtful remarks 指傷人的話;同義字:harmful 偏向造成實際損害,hurtful 偏向傷害感情。"
   },
   {
    "type": "word",
    "t": "remark",
    "pos": "n.",
    "zh": "言論、評論",
    "note": "指簡短的評論或話,為可數名詞,單複數皆常見(make a remark);racist remarks 在此用複數泛指此類言論。動詞 remark 指評論、說。",
    "coll": [
     "make a remark",
     "a rude remark",
     "racist remarks"
    ]
   },
   {
    "type": "word",
    "t": "by nature",
    "pos": "phr.",
    "zh": "生性、本質上",
    "note": "by nature 表示「天生地」或「本質上」,如 She is shy by nature.(她生性害羞。)",
    "coll": [
     "be kind by nature"
    ]
   },
   {
    "type": "word",
    "t": "excessive",
    "pos": "adj.",
    "zh": "過度的",
    "note": "本題干擾字。指超過合理限度的、過量的。名詞 excess(過量),副詞 excessively;反義字:moderate(適度的)。"
   },
   {
    "type": "word",
    "t": "avoid",
    "pos": "v.",
    "zh": "避免",
    "note": "avoid 後面接名詞或動名詞(V-ing),不可直接接 to V,例如 avoid making noise。本題用被動語態 should be avoided。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "種族歧視的言論本質上就具有冒犯性且傷人,在任何場合都應該避免。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-5": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "空格前有 the first,後面接 of her essay,所以空格要填單數可數名詞,指「第一次的某個版本」。四個選項都是名詞,需靠語意判斷。",
   "句意是 Mary 對 essay 的第一個____不滿意,所以她修改了好幾次才交給老師。revised it several times(修改好幾次)說明她對初次寫出的版本不滿意,draft(草稿、初稿)正是用來修改的第一個版本。",
   "本題 first draft 是固定搭配,意為「初稿」;有 first draft 就有 second draft、final draft(定稿),整個故事線很連貫。",
   "其他選項:text(文本)、brush(刷子)、plot(情節)是自然的名詞,但 the first text of her essay 並沒有「初稿」的意思,brush 與 plot 也和修改文章的情境無關,所以選 (C)。"
  ],
  "options": {
   "A": {
    "why": "text 是名詞,指文字、文本、課文,也指簡訊(text message)。這個字本身用法正確,但本題要表達「文章的初稿」,用 text 只是指文字內容,沒有「還未定稿、可再修改的版本」的概念,不符合本題語境。"
   },
   "B": {
    "why": "brush 是名詞,指刷子、畫筆(如 a paintbrush),也作動詞「刷」。這個字本身用法正確,雖然 brush 也可指畫家的筆觸,但文章不是畫作,不符合本題語境。"
   },
   "C": {
    "why": "draft 作名詞指草稿、草案、初稿,也可作動詞「起草」。first draft 即最初寫出來的版本,Mary 不滿意所以修改了好幾次,語意連貫,故選 (C)。"
   },
   "D": {
    "why": "plot 是名詞,指(小說、戲劇的)情節,或陰謀、小塊土地,也可作動詞「策劃」。這個字本身用法正確,但 the first plot of her essay 並不是指「第一版」,不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "draft",
    "pos": "n.",
    "zh": "草稿、初稿、草案",
    "note": "作名詞指文件、文章的草稿;作動詞指起草(draft a letter)。另有「徵兵」(the draft)與「通風、穿堂風」(a draft/draught)的意思,語境不同。常見搭配:first draft、final draft、rough draft。",
    "coll": [
     "the first draft",
     "a rough draft",
     "a final draft"
    ]
   },
   {
    "type": "word",
    "t": "revise",
    "pos": "v.",
    "zh": "修改、修訂",
    "note": "revise 常指修改文章、計畫或意見,也可指「複習」(英式英語)。名詞 revision。同義字:edit、rewrite;本題 revised it several times 指修改了好幾次。",
    "coll": [
     "revise an essay",
     "revise a plan"
    ]
   },
   {
    "type": "word",
    "t": "essay",
    "pos": "n.",
    "zh": "(短篇)文章、作文",
    "note": "指學校作文、論說文,write an essay 是常見搭配。"
   },
   {
    "type": "word",
    "t": "turn in",
    "pos": "phr. v.",
    "zh": "繳交",
    "note": "turn in 指把作業、報告交給老師或主管,也可指就寢(口語)。同義說法:hand in、submit;本題 turning it in 的 it 指 essay,代名詞放在 turn 與 in 之間。",
    "coll": [
     "turn in homework",
     "turn in a report"
    ]
   },
   {
    "type": "word",
    "t": "be satisfied with",
    "pos": "phr.",
    "zh": "對……感到滿意",
    "note": "be satisfied with + 名詞/動名詞;not satisfied with 表示不滿意。形容詞 satisfied,動詞 satisfy,名詞 satisfaction。"
   },
   {
    "type": "word",
    "t": "plot",
    "pos": "n.",
    "zh": "情節;陰謀",
    "note": "本題干擾字。如 the plot of the movie(電影的情節)。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "Not satisfied with the first draft of her essay 是 (Not being) satisfied 省略 being 的分詞構句,表原因,邏輯主詞與主句主詞 Mary 相同,意為「因為對……不滿意」。",
  "zh": "瑪麗對她文章的初稿不滿意,因此修改了好幾次,才把它交給老師。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-6": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "Left ____ for years 是過去分詞構句,邏輯主詞就是主句的 the deserted house,原意 the house was left ____(房子被留在某種狀態);leave + 受詞 + 形容詞表示「使處於某狀態」,所以空格要填形容詞。",
   "主句描述 the deserted house(廢棄的房子)filled with dust and a smell of old damp wood,表示房子多年無人居住。vacant 指「空著的、沒人居住的」,leave a house vacant 就是讓房子空著。",
   "left vacant 表示「讓房屋空著、無人使用」;for years 說明這種狀態持續多年,與 deserted 呼應,也解釋了灰塵與潮濕木頭的氣味。其他選項 casual、fragile 無法描述房屋被放著不用的狀態。",
   "remote 描述的是位置偏遠,而 left ... for years 要的是「被空置」的狀態,這是語意上的差異,不是文法問題;所以選 (D)。"
  ],
  "options": {
   "A": {
    "why": "casual 是形容詞,指隨意的、休閒的、非正式的(如 casual clothes)。這個字本身用法正確,但 left casual 不能表示房子的狀態,也和房子積灰塵的描述無關,不符合本題語境。"
   },
   "B": {
    "why": "fragile 是形容詞,指易碎的、脆弱的(如 a fragile vase)。這個字本身用法正確,但本題說的是房子多年無人居住,而不是房子容易損壞,不符合本題語境。"
   },
   "C": {
    "why": "remote 是形容詞,指偏遠的、遙遠的(a remote village),也可指遙控的(remote control)。這個字本身用法正確,文法上也能接在 left 後;但 remote 描述位置偏遠,而本句要說的是房子「被空置」多年,語意上不如 vacant,不符合本題語境。"
   },
   "D": {
    "entry": "vacant-adj",
    "why": "vacant 是形容詞,指(房屋、座位、職位)空著的、沒人用的。leave sth vacant 表示讓它空著,與 deserted 的概念一致,也說明房子為什麼積灰塵,故選 (D)。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "vacant",
    "pos": "adj.",
    "zh": "空著的、未被占用的",
    "note": "形容房屋、座位、停車位、職位等沒有人使用或居住。名詞 vacancy 指空缺、空房間;同義字:empty(最泛指)、unoccupied;反義字:occupied(被占用的)。vacant 也可形容表情空洞。",
    "coll": [
     "a vacant seat",
     "a vacant room",
     "a vacant position"
    ]
   },
   {
    "type": "word",
    "t": "deserted",
    "pos": "adj.",
    "zh": "被遺棄的、荒涼無人的",
    "note": "由動詞 desert(拋棄)的過去分詞轉成形容詞,指被人離開、無人居住或無人的地方,如 a deserted street。注意 desert 作名詞 /ˈdɛzɚt/ 指沙漠,作動詞 /dɪˈzɝt/ 指拋棄。"
   },
   {
    "type": "word",
    "t": "be filled with",
    "pos": "phr.",
    "zh": "充滿",
    "note": "filled with a thick coating of dust 表示布滿一層厚厚的灰塵。與 be full of 同義。"
   },
   {
    "type": "word",
    "t": "coating",
    "pos": "n.",
    "zh": "一層(覆蓋物)",
    "note": "coat 作動詞指塗上、覆蓋,coating 指覆蓋在表面的一層東西,如 a coating of dust/paint。"
   },
   {
    "type": "word",
    "t": "damp",
    "pos": "adj.",
    "zh": "潮濕的、有濕氣的",
    "note": "damp 指有點濕、不乾,常帶有不舒服的意味,如 damp wood、a damp towel。同義字:moist(較中性或正面,如 moist cake)、humid(空氣潮濕)。"
   },
   {
    "type": "word",
    "t": "remote",
    "pos": "adj.",
    "zh": "偏遠的、遙遠的",
    "note": "本題干擾字。常見搭配:a remote area、a remote control。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "Left vacant for years 是過去分詞構句,表被動,邏輯主詞是主句的 the deserted house;leave + 受詞 + 形容詞表示「使某物處於某種狀態」。",
  "zh": "那間廢棄的房子空置多年,屋內布滿一層厚厚的灰塵,並瀰漫著舊濕木頭的氣味。",
  "aiFlags": [
   "(C) remote 並非不能接在 left 後(也可指人跡罕至),本題排除 remote 是依語意:空置多年(vacant)對偏遠(remote),並非文法問題。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-7": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "空格前有 showed,後面有 courage,所以空格要填形容詞,修飾不可數名詞 courage(勇氣)。",
   "句子說女學生協助老人逃出火場,這需要很大的勇氣,因此空格要表示勇氣的「程度很大」,enormous(極大的)符合。",
   "選項中 gigantic 與 enormous 都有「巨大」的意思。判斷依據:gigantic 來自 giant(巨人),重點是像巨人般的龐大體積,常修飾具體事物(a gigantic wave);修飾勇氣、壓力這類抽象名詞時,慣用的程度字是 enormous、great、tremendous 等。gigantic courage 比喻上並非不可能,但不是慣用的搭配。",
   "exclusive(專屬的)與 multiple(多重的)都和「程度大」無關,所以選 (D)。"
  ],
  "options": {
   "A": {
    "why": "gigantic 是形容詞,指像巨人般巨大的,重點在龐大的體積,常修飾具體事物(a gigantic wave、a gigantic building),修飾抽象名詞時也偶見比喻用法(a gigantic task)。這個字本身用法正確,gigantic courage 比喻上也說得通;但談勇氣、壓力等程度時,英語慣用的強調字是 enormous、great、tremendous,因此本題不選 gigantic。"
   },
   "B": {
    "why": "exclusive 是形容詞,指專屬的、獨家的、高級的(如 an exclusive interview、an exclusive club)。這個字本身用法正確,但 exclusive courage 無法表達「很大的勇氣」,不符合本題語境。"
   },
   "C": {
    "why": "multiple 是形容詞,指多個的、多重的,多修飾可數的複數事物(multiple injuries、multiple-choice)。這個字本身用法正確;但本句談的是勇氣的程度大小,而不是「幾個」,語意不符合本題語境。"
   },
   "D": {
    "why": "enormous 是形容詞,指極大的、巨大的,可形容具體事物,也可形容抽象事物(enormous pressure、enormous courage)。女學生協助老人逃出火場,所展現的勇氣之大,用 enormous 最自然,故選 (D)。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "enormous",
    "pos": "adj.",
    "zh": "極大的、巨大的",
    "note": "可修飾具體與抽象名詞,語氣比 big 更強。同義字:huge、tremendous、immense;反義字:tiny。副詞 enormously。注意名詞 enormity 的意思與 enormous 不完全相同,不要直接當成「巨大」的名詞。",
    "coll": [
     "enormous courage",
     "enormous pressure",
     "an enormous amount of"
    ]
   },
   {
    "type": "word",
    "t": "courage",
    "pos": "n.",
    "zh": "勇氣",
    "note": "不可數名詞。形容詞 courageous(勇敢的);動詞 encourage(鼓勵,字面「給予勇氣」);反義字:cowardice(膽小)。",
    "coll": [
     "show courage",
     "have the courage to V",
     "take courage"
    ]
   },
   {
    "type": "word",
    "t": "escape",
    "pos": "v.",
    "zh": "逃脫",
    "note": "help sb escape from sth 指幫助某人逃離某處或某事。後面介系詞 from 或直接接名詞(escape the fire)。名詞 escape 指逃脫;a narrow escape 是千鈞一髮的逃脫。",
    "coll": [
     "escape from a fire",
     "help sb escape"
    ]
   },
   {
    "type": "word",
    "t": "gigantic",
    "pos": "adj.",
    "zh": "巨大的",
    "note": "本題干擾字。來自名詞 giant(巨人),多形容具體事物的巨大。"
   },
   {
    "type": "word",
    "t": "exclusive",
    "pos": "adj.",
    "zh": "專屬的、獨家的",
    "note": "本題干擾字。動詞 exclude(排除);反義字:inclusive(包含的)。"
   },
   {
    "type": "word",
    "t": "multiple",
    "pos": "adj.",
    "zh": "多重的、多個的",
    "note": "本題干擾字。如 multiple-choice question(選擇題)。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "那位高中女學生在協助老先生逃出火場時,展現了極大的勇氣。",
  "aiFlags": [
   "gigantic 修飾抽象名詞亦可見(如 a gigantic task),gigantic courage 比喻上也成立;本題是依 enormous courage 為慣用搭配的程度差異決定,學生可能質疑。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-8": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "空格在 are often ____ or delayed 中,與 delayed 以 or 並列,因此要填過去分詞;句子是被動語態(Projects are halted/delayed),主詞 Publicly financed projects 是被動作的對象。",
   "句尾 due to a lack of resources(因資源不足)與 during tough economic times(經濟困難時期)說明原因:公共經費計畫會因缺錢而被中止或延後。halt 作動詞是「使停止」,halted 與 delayed 同為負面進度的描述。",
   "or 連接兩個意義相近的動作:halted or delayed(中止或延遲),都是計畫進度受影響,語意連貫。",
   "其他選項:hatch(孵化、策劃)、possess(擁有)、reinforce(強化)都是自然動詞,但 hatched a project、reinforced a project 等語意與「缺資源而受阻」相反或無關,所以選 (A)。"
  ],
  "options": {
   "A": {
    "why": "halt 作及物動詞,表示使停止、中止(halt production)。projects are halted 指計畫被迫停下來,與 delayed 並列,又呼應 lack of resources,故選 (A)。"
   },
   "B": {
    "why": "hatch 作動詞,指孵化(蛋、幼鳥),也可指策劃(hatch a plan)。這個字本身用法正確,但本句是說計畫因缺資源受阻,不是被「策劃」或孵出來,與 or delayed 的語意也不協調,不符合本題語境。"
   },
   "C": {
    "why": "possess 是動詞,指擁有(possess a skill)。這個字本身用法正確;但本句談的是 projects 因 a lack of resources 而受阻,possess 與這個因果無關,也無法與 delayed 並列表示進度受阻,不符合本題語境。"
   },
   "D": {
    "why": "reinforce 是動詞,指加強、增強(reinforce a wall、reinforce an idea)。這個字本身用法正確,但缺乏資源時的結果應是計畫被中止或延後,而不是被強化,語意相反,不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "halt",
    "pos": "v.",
    "zh": "(使)停止、中止",
    "note": "作及物動詞表示使停止(halt production),作不及物動詞較書面,如 Traffic halted.。名詞 halt 指停止,如 come to a halt、bring sth to a halt。同義字:stop、suspend;反義字:continue。",
    "coll": [
     "halt production",
     "come to a halt",
     "bring sth to a halt"
    ]
   },
   {
    "type": "word",
    "t": "delay",
    "pos": "v.",
    "zh": "延遲、耽擱",
    "note": "本題 delayed 與 halted 並列。delay 較泛,可指被耽擱的延誤,也可指刻意拖延(delay the decision);作名詞指延誤。同義字 postpone 指把活動或事情改到較晚的時間。",
    "coll": [
     "delay a flight",
     "without delay"
    ]
   },
   {
    "type": "word",
    "t": "publicly financed",
    "pos": "adj.",
    "zh": "公共出資的",
    "note": "由 finance(提供資金)的過去分詞加 publicly(公開地、由公家)構成;finance 也作名詞指財政,financial 是形容詞。"
   },
   {
    "type": "word",
    "t": "lack",
    "pos": "n.",
    "zh": "缺乏",
    "note": "a lack of + 名詞,指缺少某物;作動詞時 lack sth 表示缺乏。形容詞 lacking。同義字:shortage。",
    "coll": [
     "a lack of resources",
     "for lack of"
    ]
   },
   {
    "type": "word",
    "t": "due to",
    "pos": "phr.",
    "zh": "因為、由於",
    "note": "due to 後接名詞或名詞片語表示原因,語氣正式;類似說法:because of、owing to。"
   },
   {
    "type": "word",
    "t": "reinforce",
    "pos": "v.",
    "zh": "加強、強化",
    "note": "本題干擾字。由 re-(再)與 force(力量)的概念構成,字面是「再加強力量」,可記為加強、增強;名詞 reinforcement 指加強,複數常指增援部隊。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "Publicly financed projects 的 financed 是過去分詞當形容詞,修飾 projects,表示「被公家出資的」;are often halted or delayed 為被動語態,halted 與 delayed 以 or 並列。",
  "zh": "公共出資的計畫在經濟困難時期,常因資源不足而中止或延後。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-9": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "空格前有主詞 the President,後面有受詞 the school’s graduation ceremony 與 with his presence,因此空格要填及物動詞(過去式),與 with 片語構成「以……來……」的結構。",
   "本句的重點是總統雖然行程忙碌,仍以出席(presence)與暖心演說讓典禮增光。grace 作動詞表示「使增光、為……增添光彩」,常用 grace sth with one’s presence,即「蒞臨」。",
   "Despite his busy schedule 提供轉折線索:儘管很忙,他仍出席,所以語氣是「賞光、增光」。with his presence and a heartwarming speech 是 graced 的方式補充。",
   "其他選項:praise(稱讚)、address(對……演講)、credit(把功勞歸於)都是自然的及物動詞,但 praised the ceremony with his presence 等搭配語意不合,所以選 (B)。"
  ],
  "options": {
   "A": {
    "why": "praise 是動詞,指稱讚、讚揚(praise sb for sth)。這個字本身用法正確,但「用他的出席稱讚典禮」說不通,出席是在給典禮增光,不是稱讚,不符合本題語境。"
   },
   "B": {
    "why": "grace 作動詞,表示使增光、為……增添光彩,常見 grace sth with one’s presence(蒞臨使……增光)。與 with his presence and a heartwarming speech 完全吻合,故選 (B)。"
   },
   "C": {
    "why": "address 作動詞,指對……演說,如 address the audience、address a ceremony。這個字本身用法正確,也可與 speech 的意思相關,但 address the ceremony with his presence 語意不通順:出席不是「演說的方式」,不符合本題語境。"
   },
   "D": {
    "why": "credit 作動詞,指把功勞歸給(credit sb with sth / credit sth to sb)。這個字本身用法正確,但「用出席把功勞歸給典禮」說不通,不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "grace",
    "pos": "v.",
    "zh": "為……增光、使生色",
    "note": "作動詞較正式,常用 grace sth with one’s presence(蒞臨以增添光彩)。作名詞 grace 指優雅、恩典、寬限。形容詞 graceful(優雅的)、gracious(親切有禮的)。",
    "coll": [
     "grace the occasion",
     "grace sth with one’s presence"
    ]
   },
   {
    "type": "word",
    "t": "presence",
    "pos": "n.",
    "zh": "出席、在場",
    "note": "來自 present(在場的)。反義字:absence(缺席)。presence 也可指氣勢、存在感(a strong presence)。",
    "coll": [
     "in the presence of sb",
     "make one’s presence felt"
    ]
   },
   {
    "type": "word",
    "t": "heartwarming",
    "pos": "adj.",
    "zh": "暖心的、令人感動的",
    "note": "由 heart + warm + -ing 組成。同義字:touching。"
   },
   {
    "type": "word",
    "t": "despite",
    "pos": "prep.",
    "zh": "儘管",
    "note": "despite + 名詞/動名詞,不可直接接子句;同義字:in spite of。despite his busy schedule 等於 although he was busy。"
   },
   {
    "type": "word",
    "t": "address",
    "pos": "v.",
    "zh": "對……演說;處理",
    "note": "address 也可指稱呼或處理(address a problem)。名詞 address 指地址或演說。本題干擾字。"
   },
   {
    "type": "word",
    "t": "credit",
    "pos": "v.",
    "zh": "把功勞歸於",
    "note": "本題干擾字。credit sb with sth 或 credit sth to sb;名詞 credit 指信用、學分、功勞(give credit to)。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "grace + 場合 + with one’s presence\n意思:蒞臨某場合而使其增光\n例如:The mayor graced the party with his presence.(市長蒞臨派對,使其增光。)\n注意:語氣正式或帶客套,常用於邀請函或致謝詞。"
  ],
  "grammar": "",
  "zh": "儘管行程繁忙,總統仍出席該校的畢業典禮,他的蒞臨與一場暖心的演說為典禮增添了光彩。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-10": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "空格在 for 與 abusing 之間。abusing 是動名詞(for 後面接 V-ing),要修飾動詞性質的詞語要用副詞,所以空格要填副詞。四個選項都是副詞,要靠語意判斷。",
   "句子說經理辱罵同事,而且是 calling them “hopeless losers”(罵他們是無可救藥的失敗者),也就是用話語傷人。verbally 指「口頭上、言語上」,verbally abusing 就是言語辱罵。",
   "線索是 calling them “hopeless losers”:這說明辱罵是靠言詞進行的,與 verbally 吻合(旁證);verbal abuse(言語辱罵)也是常見搭配。",
   "其他選項:dominantly(占主導地位地)、legitimately(合法地)、relevantly(相關地)都是副詞,本身用法正確,但都不能表達「用言語」的方式,所以選 (A)。"
  ],
  "options": {
   "A": {
    "why": "verbally 是副詞,指口頭上、用言語地。verbally abusing his colleagues 就是用言語辱罵同事,與後面的 calling them “hopeless losers” 一致,故選 (A)。"
   },
   "B": {
    "why": "dominantly 是副詞,指占主導地位地、支配性地(dominant 的副詞)。這個字本身用法正確,但本題要說明的是辱罵的「方式是言語」,不是占主導,不符合本題語境。"
   },
   "C": {
    "why": "legitimately 是副詞,指合法地、正當地(legitimate 的副詞)。這個字本身用法正確,但句子說他因辱罵而被告,legitimately abusing 語意矛盾,不符合本題語境。"
   },
   "D": {
    "why": "relevantly 是副詞,指相關地、切題地(relevant 的副詞)。這個字本身用法正確,但與辱罵同事的方式無關,不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "verbally",
    "pos": "adv.",
    "zh": "口頭上、言語上",
    "note": "形容詞 verbal(以言詞表達的,可指口說或書面文字,視語境而定);反義字:nonverbal(非言語的,如肢體、表情)。oral 專指口說(相對於書面)。",
    "coll": [
     "verbally abuse sb",
     "verbal abuse",
     "a verbal agreement"
    ]
   },
   {
    "type": "word",
    "t": "abuse",
    "pos": "v.",
    "zh": "虐待、濫用、辱罵",
    "note": "動詞讀作 /əˈbjuz/,名詞讀作 /əˈbjus/。abuse 可指虐待(child abuse)、濫用(drug abuse)或辱罵。形容詞 abusive(辱罵的、虐待的)。",
    "coll": [
     "verbal abuse",
     "abuse power",
     "drug abuse"
    ]
   },
   {
    "type": "word",
    "t": "sue",
    "pos": "v.",
    "zh": "控告、提起訴訟",
    "note": "sue sb for sth 指因某事控告某人,如 be sued for abusing his colleagues。名詞 lawsuit(訴訟)。"
   },
   {
    "type": "word",
    "t": "colleague",
    "pos": "n.",
    "zh": "同事",
    "note": "指在同一個機構工作的人,較正式;同義字:co-worker。拼法易錯:col-league(不是 collegue)。"
   },
   {
    "type": "word",
    "t": "hopeless",
    "pos": "adj.",
    "zh": "無可救藥的;無望的",
    "note": "hope 加 -less(沒有)。本題 hopeless losers 指無可救藥的失敗者,語氣為辱罵。hopeless 也可指絕望的、毫無希望的。"
   },
   {
    "type": "word",
    "t": "legitimately",
    "pos": "adv.",
    "zh": "合法地、正當地",
    "note": "本題干擾字。形容詞 legitimate(正當的、合理的、合法的);同義字:justifiably、rightfully;與 legally(依法地)不完全相同。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "was sued for verbally abusing ... 中 sue sb for + V-ing 表示因某事控告某人;for 是介系詞,後面接動名詞,而 verbally 是修飾動名詞 abusing 的副詞。",
  "zh": "那家公司的經理因言語辱罵同事而被控告,他罵他們是「無可救藥的失敗者」。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-11": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "先找參照時間點：第 1 句以 In 1995 開頭，None of them had any idea they were about to create… 的視角是 1995 年聚會當時，「創造」這件事在當時是「即將」(were about to) 發生。",
   "關係子句 that ___ rapidly around the world 裡的 spread，是在「創造出這項創新」之後才發生的事，也就是從 1995 年看出去的「未來」，但整個敘事都在過去，所以用「過去未來」的 would + 原形動詞。",
   "對照第 3 段末句 has been applied … around the world，可推知它後來確實廣為流傳（這是推論，文章並未直接寫 spread），因此 would spread 描述的是「之後實際發生」的事。本句沒有 if 條件句，也沒有 by the time… 之類更後面的參照時點，所以不需要 would have spread。",
   "排除過去完成類：had spread／had been spreading 表示「在 1995 年那個時間點之前」就已經散播，與「即將創造」互相矛盾。"
  ],
  "options": {
   "A": {
    "why": "had spread 是過去完成式，表示在參照點（1995 年聚會當時）之前就已完成散播。但這項創新當時尚未創造出來，時間順序顛倒，所以不合。這個時態本身用法正確，只是不符本題的時間軸。"
   },
   "B": {
    "why": "would spread 是「過去未來」：站在 1995 年往後看，「在創造之後」會發生的事，與 were about to create 的視角一致，且與後文 has been applied 所述的實際結果相符。"
   },
   "C": {
    "why": "had been spreading 是過去完成進行式，表示在參照點之前就一直在擴散，同樣與「即將創造」矛盾；且進行式強調持續過程，與「當時還沒誕生」不合。文法成立，但時間軸不符。"
   },
   "D": {
    "why": "would have spread 多用於 (1) 與過去事實相反的假設，或 (2) 站在過去、說到更後面某個時點「已經完成」的事（過去未來完成）。本句沒有 if 條件，也沒有 by the time… 之類的後續時間點，只是說「之後會迅速傳開」，所以用單純的 would spread 即可。這個選項文法上成立，只是不符本句語境。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "be about to + V",
    "zh": "即將做某事",
    "note": "表示「正要、即將」，文中 were about to create 指在 1995 年當時尚未發生、但即將發生的事。",
    "coll": [
     "be about to leave"
    ]
   },
   {
    "type": "word",
    "t": "spread",
    "pos": "v.",
    "zh": "散播；蔓延",
    "note": "不規則動詞，三態同形 spread-spread-spread。可作及物或不及物；本題為不及物，主詞是 innovation。常見搭配：spread rapidly/quickly, spread around the world。"
   },
   {
    "type": "word",
    "t": "innovation",
    "pos": "n.",
    "zh": "創新；革新",
    "note": "衍生字：innovate (v.)、innovative (adj.，第 2 段出現)、innovator (n.)。"
   },
   {
    "type": "word",
    "t": "rapidly",
    "pos": "adv.",
    "zh": "迅速地",
    "note": "同義字：quickly, swiftly；形容詞為 rapid。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "would + 原形動詞（過去未來）\n意思：站在過去某個時間點，描述在那之後會發生的事。\n例如：He did not know that the little shop would become famous. 他不知道這間小店後來會變得有名。\n注意：would have + p.p. 則用於過去的假設，或說到更後面某時點「已完成」的事（過去未來完成）；本句沒有條件句或後續參照時點，所以用 would spread。"
  ],
  "grammar": "本題關鍵是時間軸：參照點是 1995 年的聚會，spread 發生在參照點之後（過去未來，would spread），而不是之前（過去完成）。",
  "zh": "他們當中沒有人料到，自己即將創造出一項日後會迅速傳遍全世界的社會創新。",
  "aiFlags": [
   "(D) would have spread 並非文法錯誤（可作過去未來完成），僅因本句沒有 by the time 之類的後續參照時點或條件句而不選；講解時勿說成錯誤。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-12": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "看句型：With their plan ___ by the rain 是「with + 受詞 + 過去分詞」的附帶狀況結構，plan 與動詞是被動關係，所以空格要填過去分詞，後面 by the rain 表示動作者。四個選項都是過去分詞，要靠語意判斷。",
   "看上下文：前一句 The group was supposed to have a large-circle discussion in their garden（原本打算）與 Unfortunately, it started pouring（卻下起大雨），後面他們擠進客廳改成小桌談話，可見原定計畫被雨「打亂、中斷」。",
   "選 disrupted：disrupt 是「使中斷、擾亂」，plan disrupted by the rain 正好表達原計畫被雨破壞。",
   "其他三字語意都與「雨造成不便」脫節：facilitate 是「促進、使便利」，disclose 是「揭露」，fulfill 是「實現、達成」，都不能描述雨對計畫的影響。"
  ],
  "options": {
   "A": {
    "why": "facilitated 是 facilitate（促進、使更容易）的過去分詞，單字本身用法正確（如 facilitate communication）。但大雨讓計畫更容易進行與上下文轉折 Unfortunately 相反。"
   },
   "B": {
    "why": "disrupted 意為被擾亂、被打斷，與 Unfortunately, it started pouring 呼應，也解釋了為何眾人臨時改到客廳。"
   },
   "C": {
    "why": "disclosed 是 disclose（揭露、公開）的過去分詞，用於祕密、資訊等（如 disclose information），文法上可以接 by，但「計畫被雨揭露」在語意上說不通。"
   },
   "D": {
    "why": "fulfilled 是 fulfill（實現、履行）的過去分詞，如 fulfill a dream/promise。「計畫被雨實現」與情節相反：計畫是被打亂了。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "disrupt",
    "pos": "v.",
    "zh": "擾亂；使中斷",
    "note": "衍生字：disruption (n.)、disruptive (adj.)。常見搭配：disrupt traffic/a meeting/the schedule。同義字：interrupt（強調暫停），disturb（打擾）。",
    "coll": [
     "disrupt classes",
     "be disrupted by the storm"
    ]
   },
   {
    "type": "word",
    "t": "facilitate",
    "pos": "v.",
    "zh": "促進；使便利",
    "note": "字根 facil-（容易），與 facility（設施）、facilitator（引導者）同源。常見搭配：facilitate learning/communication。"
   },
   {
    "type": "word",
    "t": "disclose",
    "pos": "v.",
    "zh": "揭露；公開",
    "note": "反義字：conceal, hide。常見搭配：disclose personal information。"
   },
   {
    "type": "word",
    "t": "fulfill",
    "pos": "v.",
    "zh": "實現；履行；滿足",
    "note": "常見搭配：fulfill a dream/a promise/a requirement。英式拼法為 fulfil。"
   },
   {
    "type": "word",
    "t": "pour",
    "pos": "v.",
    "zh": "傾盆而下；倒",
    "note": "文中 it started pouring 指雨下得很大。常見用法：It's pouring.、pour water into a glass。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "with + 受詞 + 過去分詞\n意思：表示附帶的狀況或原因，受詞與動詞為被動關係。\n例如：With the road blocked by snow, we had to turn back. 由於道路被雪封住，我們只好折返。\n注意：受詞與動作為主動關係時用現在分詞，如 With the sun shining, …。"
  ],
  "grammar": "",
  "zh": "由於他們的計畫被雨打亂，這二十四位與會者便擠進客廳。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-13": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "看句法：so the insights and ideas might ___ and deepen 中，might 後接原形動詞，且 insights and ideas 是主詞，空格後沒有受詞，所以要填不及物動詞，並與 deepen 並列。",
   "看上下文：參與者定時換桌（switch tables），目的是讓見解與想法在各桌之間傳開；後文 As they moved from one table to another, they noticed new ideas emerging 也在講想法因移動而流通。",
   "選 circulate：不及物時表示「流通、循環、傳播」，ideas circulate and deepen 可描述想法在桌與桌之間流動並逐漸深化。",
   "排除其他選項：emphasize 與 preserve 是及物動詞，這裡沒有受詞，且主詞 ideas 並不是去「強調／保存」什麼；recover 雖可不及物，意思是「恢復」，但想法並沒有先受損，與「換桌」無關。"
  ],
  "options": {
   "A": {
    "why": "circulate 可作不及物動詞，意為（想法、空氣、血液等）流通、傳播。ideas circulate 與換桌動作相呼應，與 deepen 並列合理。"
   },
   "B": {
    "why": "emphasize 是及物動詞（強調），需要受詞；此處主詞 ideas 自己不會 emphasize，空格後也沒有受詞。這個字本身用法正確，但句法與語意都不符。"
   },
   "C": {
    "why": "recover 是「恢復、康復」，可作不及物（recover from an illness）或及物（recover the data）。指從損傷或失去的狀態恢復，主詞通常是病人、經濟、資料等；前文沒有想法受損或遺失，且 recover 與 deepen 並列也沒有「換桌」帶來的因果。"
   },
   "D": {
    "why": "preserve 是及物動詞（保存、保護），如 preserve the environment。此處沒有受詞，語意上「保存想法」也與「讓想法擴散、加深」不同。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "circulate",
    "pos": "v.",
    "zh": "流通；傳播；循環",
    "note": "名詞 circulation（流通；發行量；血液循環）。及物與不及物皆可：Blood circulates in the body.；circulate a petition（傳閱請願書）。",
    "coll": [
     "circulate widely",
     "circulating air"
    ]
   },
   {
    "type": "word",
    "t": "deepen",
    "pos": "v.",
    "zh": "加深；變深",
    "note": "由 deep + -en 構成，與 strengthen, widen 類似。及物與不及物皆可：The mystery deepened.",
    "coll": [
     "deepen one's understanding"
    ]
   },
   {
    "type": "word",
    "t": "insight",
    "pos": "n.",
    "zh": "洞見；深入的見解",
    "note": "可數或不可數，常見搭配：gain/provide insight(s) into sth。"
   },
   {
    "type": "word",
    "t": "periodically",
    "pos": "adv.",
    "zh": "定期地；週期性地",
    "note": "形容詞為 periodic；與 regularly 類似，但強調「間隔一段時間就發生」。"
   },
   {
    "type": "word",
    "t": "emphasize",
    "pos": "v.",
    "zh": "強調",
    "note": "名詞 emphasis。同義字：stress, highlight。常見搭配：emphasize the importance of sth。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "他們定時中斷談話並換桌，好讓各種見解與想法能夠流通並加深。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-14": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看句型：the innovative discussion process ___ a new form of collective effort，空格需要填「及物動詞片語」，後面接受詞 a new form of collective effort，時態與上下文一致用過去式（敘述 1995 那個上午）。",
   "看語意：前面說他們換桌、發現新想法冒出來、也讓後續幾輪談話更豐富，這一連串過程「產生了」一種新的集體合作形式，後面 that transformed… 再說明它帶來的影響。",
   "選 gave rise to：give rise to 意為「引起、導致、產生」，常以過程或原因為主詞，結果為受詞，與本句因果關係一致。",
   "排除其他選項：made up for 是「彌補」，kept track of 是「持續掌握」，looked out for 是「留意、照顧」，放進句中都不能表示「討論過程產生了新形式」。"
  ],
  "options": {
   "A": {
    "why": "made up for 意為彌補、補償（make up for lost time），文中並沒有任何要彌補的缺失。片語本身用法正確，但不符語境。"
   },
   "B": {
    "why": "kept track of 意為記錄、持續掌握狀況（keep track of expenses）。此句在說討論過程「產生」新形式，並非「追蹤」它。片語正確，但語意不合。"
   },
   "C": {
    "why": "gave rise to 表示導致、產生；過程作主詞，新的集體合作形式作結果，後面 transformed the depth… 再補充其影響，邏輯連貫。"
   },
   "D": {
    "why": "looked out for 意為留意、提防或照顧（look out for pickpockets / look out for one's friends）。討論過程不會「留意」一種新形式，語意不符。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "give rise to",
    "zh": "引起；導致；產生",
    "note": "主詞為原因或過程，受詞為結果，語氣正式，常與 lead to, result in, bring about 近義；三態 give-gave-given；rise 為名詞，後接 to，再接結果。",
    "coll": [
     "give rise to misunderstandings"
    ]
   },
   {
    "type": "phrase",
    "t": "make up for",
    "zh": "彌補；補償",
    "note": "如 make up for lost time；與 make up（組成；化妝；編造）不同。"
   },
   {
    "type": "phrase",
    "t": "keep track of",
    "zh": "記錄；持續掌握",
    "note": "反義是 lose track of（失去對…的掌握）。"
   },
   {
    "type": "phrase",
    "t": "look out for",
    "zh": "留意；提防；照顧",
    "note": "如 look out for pickpockets；與 look out（小心）、look out of the window（往窗外看）不同。"
   },
   {
    "type": "word",
    "t": "collective",
    "pos": "adj.",
    "zh": "集體的；共同的",
    "note": "如 collective effort/wisdom/memory；名詞 collection 是「收藏」，不同義。"
   },
   {
    "type": "word",
    "t": "transform",
    "pos": "v.",
    "zh": "使徹底轉變",
    "note": "名詞 transformation；常見搭配：transform A into B。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "整個上午下來，這種創新的討論方式催生了一種新的集體合作形式，大幅改變了他們討論的深度、廣度與品質。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-15": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "看位置與詞類：空格在 was 與過去分詞 created 之間，是副詞的位置；四個選項都能放在這裡，要靠前後文的邏輯關係判斷。",
   "看上下文：第 2 段整段描述了一連串過程（換桌、新想法冒出、形成新的集體合作形式）；第 3 段第一句歸結為 The World Café was ___ created，是由前述過程得出的結果。",
   "選 thus：thus 表示「因此、就這樣」，在這裡接前面的過程，指出 World Café 就是以這種方式誕生，帶有結果、歸結的語氣。",
   "其他副詞:still、also、further 文法上都能放在 was 與 created 之間,要靠篇章關係判斷。still 表示「仍然、儘管如此還是」,可修飾一次性的被動事件(例如 Despite the objections, the bridge was still built.),但前文並不是在建立「雖有阻礙、最後仍被創造」的讓步對比,而是在說明 World Café 如何經由這一連串討論方式形成,所以 thus 更符合篇章關係;also 前文沒有另一項被創造的事物可形成「也」;further 偏向「進一步地」,與本句歸結形成結果的功能不如 thus。"
  ],
  "options": {
   "A": {
    "why": "still 表示「仍然、儘管如此還是」,文法上可以出現在 was still created,也可修飾一次性的被動事件,例如 Despite the objections, the bridge was still built。但本文前面並不是在建立「雖然有阻礙,最後仍被創造」的讓步對比,而是在說明 World Café 如何由這一連串討論方式形成,因此 thus 更符合篇章關係。"
   },
   "B": {
    "why": "also 表示「也」，前文沒有另一個已經被創造出來的東西可以對照，所以不自然。also 放在 was 與過去分詞之間文法上合格，只是語意不如 thus。"
   },
   "C": {
    "why": "further 表示「進一步地」，用於承接已完成的步驟再繼續往前推（further developed）。這裡是總結因果，而非再推進下一步。"
   },
   "D": {
    "why": "thus 表示以前述方式、因此，與第 2 段的過程形成「經過這些步驟，World Café 就這樣誕生」的因果總結，同時讓第 3 段後半的 Since that rainy morning 順利延伸。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "thus",
    "pos": "adv.",
    "zh": "因此；就這樣",
    "note": "為正式用語，用來連接結果或結論，位置可在句首、助動詞後、動詞前後；同義字：therefore, hence, consequently。",
    "coll": [
     "and thus"
    ]
   },
   {
    "type": "word",
    "t": "further",
    "pos": "adv.",
    "zh": "進一步地",
    "note": "常見搭配：further develop/discuss/explain；形容詞作「進一步的」。"
   },
   {
    "type": "word",
    "t": "subsequent",
    "pos": "adj.",
    "zh": "隨後的；接下來的",
    "note": "第 2 段出現 subsequent rounds of conversation；副詞為 subsequently。"
   },
   {
    "type": "word",
    "t": "approach",
    "pos": "n.",
    "zh": "方法；途徑",
    "note": "常見搭配：an approach to sth；文中 the World Café approach 指一種談話方式。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "World Café 就這樣誕生了。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-16": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "看句型：It can ___ suddenly 的空格要填不及物動詞，主詞 It 指前面所說的 motion sickness（暈動症）這種不適；suddenly 說明它的出現方式。",
   "看語意：後面 progressing from a feeling of uneasiness to a cold sweat 描述症狀如何加劇。這裡要的是「疾病、不適、災禍等突然發作、突然襲來」的動詞。",
   "選 strike：strike 作不及物動詞時，不及物時可指疾病、災害等突然發生（Disaster struck. / Illness can strike without warning.）；及物用法如 An earthquake struck the city.，所以 It can strike suddenly 就是「突然發作」。",
   "其他動詞各有慣用的主詞：crash 多用於車輛、電腦、飛機、浪潮等；flush 多指臉紅或沖水；burst 多指氣球、水管等爆開，或 burst into tears 之類。放進本句都不能自然地表達「症狀突然發作」。"
  ],
  "options": {
   "A": {
    "why": "crash 作不及物動詞，多指車輛、飛機、電腦系統等撞毀或當機，或股市暴跌，也可指聲響劇烈。主詞若是一種身體不適，並不會用 crash 來描述發作，語意不合。"
   },
   "B": {
    "why": "flush 作不及物動詞，常指臉因害羞或發燒而發紅（Her face flushed.），也可指馬桶沖水。motion sickness 不是臉紅，也不是沖水，且後面描述的是症狀加劇，並不是變紅。"
   },
   "C": {
    "why": "burst 作不及物動詞表示爆裂、突然進入某種狀態（burst into tears / burst out laughing）。但 It can burst suddenly 會被理解成這個東西像氣球一樣爆開，與症狀逐步惡化的描述不符。"
   },
   "D": {
    "why": "strike 可指疾病等突然襲來；而 It can strike suddenly 後接 progressing from…，正好描述症狀發作後由不適逐步惡化。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "strike",
    "pos": "v.",
    "zh": "襲擊；（疾病、災難）突然發生；打擊；罷工",
    "note": "三態 strike-struck-struck。本題用法：疾病、地震、颱風等突然襲來，如 Disaster struck.（不及物）、An earthquake struck the city.（及物）。其他常見義：strike a match（劃火柴）、It strikes me that…（我突然想到…）。",
    "coll": [
     "strike without warning",
     "be struck by an illness"
    ]
   },
   {
    "type": "phrase",
    "t": "motion sickness",
    "zh": "暈動症（暈車、暈船等）",
    "note": "名詞片語；motion 為「移動」，暈車、暈船等都屬於 motion sickness。"
   },
   {
    "type": "word",
    "t": "progress",
    "pos": "v.",
    "zh": "進展；逐漸發展",
    "note": "動詞重音在第二音節 pro-GRESS；名詞則重音在第一音節。文中 progressing from A to B 指症狀由 A 演變為 B。"
   },
   {
    "type": "word",
    "t": "nausea",
    "pos": "n.",
    "zh": "噁心；想吐",
    "note": "形容詞為 nauseous 或 nauseating（令人作嘔的）；vomit 為「嘔吐」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "它可能突然發作，從略感不適逐漸發展成冷汗直流。",
  "aiFlags": [
   "(A) crash、(B) flush、(C) burst 是依搭配與語意排除，並非文法錯誤；strike 指疾病突然襲來屬搭配語感。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-17": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看句型：Motion sickness occurs when the signals … ___ 中，主詞是複數的 the signals（your brain receives 是修飾 signals 的關係子句），空格需要複數主詞搭配的動詞片語。",
   "看下一句線索：Your brain doesn’t know whether you are stationary or moving when these parts send conflicting information，後面還說一部分偵測到身體在動，另一部分卻沒有偵測到，可見眼、耳、身體傳來的訊號互相矛盾、對不起來。",
   "選 do not match：signals do not match 表示各路訊號彼此不一致，正好概括下文 conflicting information 的內容；do 與複數主詞 signals 一致。",
   "排除其他選項：are not regular（不規律）、can hardly move（幾乎不能動）、are rarely cued（很少被提示）都沒有「彼此不一致」的意思，也無法對應 conflicting。"
  ],
  "options": {
   "A": {
    "why": "are not regular 意為不規律、不規則；文章談的是訊號彼此矛盾，而不是節奏規不規律。片語本身通順，但與上下文不合。"
   },
   "B": {
    "why": "can hardly move 表示幾乎動不了，說訊號「幾乎無法移動、傳遞」，但文章談的是眼、耳、身體的訊號彼此不一致（conflicting information），並非訊號傳不出去，與下一句不合。"
   },
   "C": {
    "why": "do not match 表示眼、耳、身體的訊號對不上，直接對應下一句的 conflicting information 與 One part … but the other parts …。"
   },
   "D": {
    "why": "are rarely cued 意為很少被提示，cue 當動詞是「給暗示或提示」，用於訊號本身不自然；文章重點是訊號彼此矛盾，不是提示頻率。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "match",
    "pos": "v.",
    "zh": "相配；一致；使相符",
    "note": "不及物：The colors don't match.；及物：match A with B。名詞亦作「比賽；相配的人事物」。",
    "coll": [
     "match up"
    ]
   },
   {
    "type": "word",
    "t": "conflicting",
    "pos": "adj.",
    "zh": "互相矛盾的；衝突的",
    "note": "由動詞 conflict 而來，名詞 conflict 是「衝突」；常見搭配：conflicting information/reports/opinions。"
   },
   {
    "type": "word",
    "t": "stationary",
    "pos": "adj.",
    "zh": "靜止的；不動的",
    "note": "易與 stationery（文具）混淆：兩字發音相同，拼字不同。"
   },
   {
    "type": "word",
    "t": "detect",
    "pos": "v.",
    "zh": "偵測；察覺",
    "note": "名詞 detection，detector 是「偵測器」；文中 detects that your body is moving。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "句中 the signals your brain receives from … 是省略關係代名詞 that 的關係子句，修飾 signals；真正的主詞是複數 signals，所以空格的動詞要用複數形式（do not match）。",
  "zh": "當大腦從眼睛、耳朵與身體接收到的訊號互相對不起來時，就會發生暈動症。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-18": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看句型：but the other parts ___ 後面沒有其他內容，表示省略，要用助動詞代替前面的動詞片語；助動詞必須與前面完整的片語在時態、語態上對應。",
   "找對應片語：前一半是 One part … detects that your body is moving，動詞是現在簡單式的 detects；but 轉折，說其他部分並沒有偵測到身體在動，其省略的內容是 detect that your body is moving。",
   "選 don’t：現在簡單式一般動詞的代替要用 do/does；主詞 the other parts 為複數，且前後轉為否定，所以用 don’t（= don’t detect that your body is moving）。",
   "排除其他選項：aren’t 需要前面有 be 動詞或進行式；won’t 需要前面有 will；haven’t 需要前面有現在完成式，都與 detects 不對應。"
  ],
  "options": {
   "A": {
    "why": "aren’t 的替代對象是 be 動詞或進行式（如 are moving）；前一半的動詞是 detects，並不是 are。aren’t 對應 be 動詞或進行式，但前一半是一般動詞 detects，省略時須用 do/does。"
   },
   "B": {
    "why": "won’t 是 will not，替代前面的 will + 動詞，前面並沒有 will，也沒有談到未來。"
   },
   "C": {
    "why": "don’t 代替 don’t detect that your body is moving，是現在簡單式的否定，與前一半 detects 一致，說明其他部分沒有感測到動作。"
   },
   "D": {
    "why": "haven’t 是 have not，替代現在完成式（have + p.p.）；前一半是現在簡單式，不是完成式，時態不對應。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "detect",
    "pos": "v.",
    "zh": "偵測；察覺",
    "note": "detect + that 子句或名詞；detect a change/movement。感官系統偵測到刺激時常用。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "助動詞省略要與前面完整動詞片語在時態與助動詞種類上對應：detects（現在簡單式）→ do/does（否定為 don’t/doesn’t），is moving → isn’t，will go → won’t，has gone → hasn’t。本題 the other parts 是複數，故為 don’t。",
  "zh": "你的平衡感應系統有一部分偵測到身體正在移動，但其他部分卻沒有。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-19": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "看句型：take some ___ 中，空格要填名詞，後面 to help avoid the discomfort 說明目的（為了幫助避免不適），所以要填「採取以避免問題」的行動。",
   "看下文線索：後面舉出 reserve seats where motion is felt the least、looking out into the distance、take medicine before your ride，這些都是事先採取的預防做法。",
   "選 preventive measures：take measures 是固定搭配，表示採取措施；preventive 表示預防性的，與 help avoid the discomfort 完全呼應。",
   "排除其他選項：special opportunities、potential risks、significant advantages 都不是為了避免不適而「採取」的行動，不符合後面的具體建議。"
  ],
  "options": {
   "A": {
    "why": "special opportunities 是特別的機會。take opportunities 雖然是通順的搭配，但意思是把握機會，與「為了避免不適而採取的行動」不同。"
   },
   "B": {
    "why": "preventive measures 意為預防措施；take measures 是常見搭配，之後所列的選位置、看遠方、先服藥皆為預防做法。"
   },
   "C": {
    "why": "potential risks 是潛在風險。take risks 是冒險，語意與避免不適相反；況且後文列舉的是對策，不是風險。"
   },
   "D": {
    "why": "significant advantages 是重大優點；take advantage of 是慣用語，但這裡是 take some ___ to help avoid…，內容也不是在講優點，而是具體做法。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "take measures",
    "zh": "採取措施",
    "note": "常見搭配：take measures to V / against sth；近義：take steps, take precautions。",
    "coll": [
     "take preventive measures",
     "take measures against pollution"
    ]
   },
   {
    "type": "word",
    "t": "preventive",
    "pos": "adj.",
    "zh": "預防性的",
    "note": "也可拼作 preventative；動詞 prevent，名詞 prevention；常見搭配：preventive care/medicine。"
   },
   {
    "type": "word",
    "t": "reserve",
    "pos": "v.",
    "zh": "預訂；保留",
    "note": "reserve a seat/table；名詞 reservation。與 preserve（保存）易混淆。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "你可以採取一些預防措施，幫助避免這種不適。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-20": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "看句型：Looking out into the distance from the vehicle can help ___ 中，can help 已經是完整的述語，空格要填副詞片語，補充這句話的作用。",
   "看上下文：前一句講到採取預防措施，如 reserve seats where motion is felt the least；本句再說向遠處看也有幫助；後一句 You can also take medicine… 又再加一項。這是在「並列多種預防方法」的語意下，補充另一種也有效的方法。",
   "選 as well：as well 表示「也」，放在句尾，意指「（除了選位置之外）看向遠方也有幫助」。",
   "排除其他選項：by far（遠遠地；用於修飾比較級或最高級）、at least（至少）、after all（畢竟，帶有補充理由或反駁的語氣）都不能表示「同樣也有幫助」。"
  ],
  "options": {
   "A": {
    "why": "as well 表示「也」，放在句末，指向遠處看除了前面的做法外同樣有幫助，與下一句 also 的語氣連貫。"
   },
   "B": {
    "why": "by far 用來強調比較級或最高級（by far the best），不能單獨放在 help 後面。"
   },
   "C": {
    "why": "at least 表示至少、最起碼，意思會變成「看向遠方至少還有幫助」，含有退而求其次的語氣；文章並沒有比較效果大小，只是在並列預防方法，所以不如 as well 貼切。這個片語本身自然，只是語氣與並列關係不符。"
   },
   "D": {
    "why": "after all 是「畢竟」，用來補充理由或表示出人意料的事實（After all, he is only a child.）。本句只是在列舉另一種預防方式，沒有轉折或反駁的語氣。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "as well",
    "zh": "也；還有",
    "note": "副詞片語，通常置於句尾，語氣比 too 稍正式；as well as 才是連接詞「以及」。",
    "coll": [
     "and … as well"
    ]
   },
   {
    "type": "phrase",
    "t": "after all",
    "zh": "畢竟；終究",
    "note": "用於補充理由，或表示結果與預期相反：We went after all.（我們終究還是去了）。"
   },
   {
    "type": "phrase",
    "t": "at least",
    "zh": "至少；起碼",
    "note": "如 at least ten people；也可表示「退而求其次」。"
   },
   {
    "type": "phrase",
    "t": "by far",
    "zh": "遠遠地；到目前為止",
    "note": "修飾比較級或最高級：by far the largest。"
   },
   {
    "type": "word",
    "t": "distance",
    "pos": "n.",
    "zh": "遠處；距離",
    "note": "in the distance 指在遠處；look into the distance 為望向遠方。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "從交通工具上向遠方眺望也有幫助。",
  "aiFlags": [
   "(C) at least 為自然片語，僅因語氣（退而求其次）與上下文的並列關係不符；不是錯誤英文。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-21": {
  "schema": 2,
  "answer": "I",
  "status": "reviewed",
  "key": [
   "詞性:空格在 is ___ for its intricate architecture... 中,位於 be 動詞之後、for 之前,需要形容詞(或過去分詞形容詞),描述主詞 this medieval cathedral。",
   "上下文線索:第 1 句稱 Notre-Dame 是 one of the most famous cathedrals,本句列出建築、彩繪玻璃窗與鐘聲三項特色,表示「因這些特色而聞名」。",
   "選定 (I) noted:be noted for 表示「以…而著名」,後接 for 引出著名的原因,與空格後的 for 直接搭配。",
   "排除:(C) familiar 是形容詞,但常見搭配是 familiar to / familiar with,「熟悉」也不是「因某特色而聞名」;(E) faithful 是「忠誠的」,放在 is ___ for 語意不合;(J) silent 是「安靜的」,與建築、鐘聲的稱讚無關。"
  ],
  "options": {
   "I": {
    "why": "noted 是過去分詞轉成的形容詞,意思是「著名的、知名的」。be noted for 表示因某特點而出名,與 famous for 相近,語意和 for 的搭配都吻合。"
   },
   "C": {
    "why": "familiar 是形容詞,本身用法正確,但它的搭配是 be familiar to sb(被某人熟悉)或 be familiar with sth(熟悉某事物),沒有 be familiar for + 特點 的用法,意思是「熟悉」,不是「因…而聞名」,所以放進 is ___ for 不合語境。"
   },
   "E": {
    "why": "faithful 是形容詞「忠實的」,文法上能放在 be 動詞之後,但 faithful for its architecture 語意不通;「忠實」是形容人或事物的忠誠,不是出名的原因。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "noted",
    "pos": "adj.",
    "zh": "著名的",
    "note": "be noted for 表示「以…聞名」;也可作過去分詞,note 為動詞「注意到;特別提到」。近義字:famous、well-known、renowned。",
    "coll": [
     "be noted for",
     "a noted writer"
    ]
   },
   {
    "type": "word",
    "t": "intricate",
    "pos": "adj.",
    "zh": "複雜精細的",
    "note": "形容結構、圖案等繁複精巧,如 intricate design。",
    "coll": [
     "intricate architecture",
     "an intricate pattern"
    ]
   },
   {
    "type": "word",
    "t": "medieval",
    "pos": "adj.",
    "zh": "中世紀的",
    "note": "指中世紀(約五至十五世紀)的,如 medieval castle。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "位於巴黎中心的這座中世紀大教堂,以其精細繁複的建築、令人讚嘆的彩繪玻璃窗,以及最重要的鐘聲而聞名。",
  "aiFlags": [
   "(C) familiar 與 (I) noted 都是形容詞,在第 21、26 題可能互相干擾:第 21 題的依據是 for 的搭配(be noted for),第 26 題的依據是 a ___ part of life 要的是「日常熟悉」而非「因特點出名」;兩題已用對稱的說法排除對方。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-22": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "詞性:there is documented ___ to the ringing of bells 是 there be 存在句,is 後面接意義上的主詞(名詞),documented 是修飾它的過去分詞形容詞,所以空格要填名詞,而且後面接 to。",
   "上下文線索:In fact 後說「早在大教堂完工之前,就已有關於鐘聲的記載,可追溯到 12 世紀」,表示有文獻提到鐘聲。",
   "選定 (A) reference:reference to sth 是「對…的提及;有關…的記載」,there is documented reference to the ringing of bells 即「有文獻記載提到鐘聲」。",
   "排除:celebration、restoration 多接 of(the celebration of / the restoration of),不接 to;且「慶祝」「修復」都不是「被文獻記載、被提及」的內容,與 documented 不合。其餘字庫字多為形容詞或動詞,不能當名詞。"
  ],
  "options": {
   "A": {
    "why": "reference 是名詞,reference to 表示「提及、參考」。documented reference to... 即留有文字紀錄提到鐘聲,與 dating as far back as the 12th century 的時間線索相合。"
   },
   "G": {
    "why": "celebration 是名詞,文法上可放在 documented 之後,但它的常見搭配是 celebration of(對…的慶祝),不接 to;語意變成「慶祝」,與「文獻記載鐘聲」無關。"
   },
   "H": {
    "why": "restoration 是名詞,文法上可成立,但常見搭配是 restoration of,不接 to;意思是「修復」,而此處說的是大教堂完工前就有鐘聲的記載,語意不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "reference",
    "pos": "n.",
    "zh": "提及;參考",
    "note": "reference to sth 表示對…的提及;也可指參考資料、參考文獻。動詞 refer to 為其相關用法。",
    "coll": [
     "make reference to",
     "a reference to"
    ]
   },
   {
    "type": "word",
    "t": "document",
    "pos": "v.",
    "zh": "記載;以文件記錄",
    "note": "本題 documented 作形容詞,意為「有文獻記載的」。名詞為「文件」。"
   },
   {
    "type": "phrase",
    "t": "date back to",
    "zh": "追溯到",
    "note": "dating as far back as the 12th century 為分詞構句,表示「可追溯到 12 世紀」。",
    "coll": [
     "date back to the 12th century"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "事實上,早在大教堂尚未完工之前,就已有文獻提到鐘聲,時間最早可追溯到 12 世紀。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-23": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "詞性:前句 The 10 bells vary in size 已是完整子句;each ___ a name 後面有受詞 a name,而且沒有連接詞,所以空格應是現在分詞,構成分詞構句或補充說明。",
   "上下文線索:The largest one, named “Emmanuel” 說明每口鐘都有名字,所以空格是「帶有、擁有」名字。",
   "選定 (B) bearing:bear a name 表示「(物)具有名字」,each bearing a name 即「每口鐘都有一個名字」。",
   "排除:(D) retained 與 (F) survived 都是過去式或過去分詞,放在 each ___ a name 會成為沒有連接詞的第二個動詞,結構不合;語意上「保留名字」或「倖存下來名字」也與前後文不符。(A) reference 為名詞,後面接 a name 也不成句。"
  ],
  "options": {
   "B": {
    "why": "bearing 是 bear 的現在分詞,bear a name 為「具有名字」。each bearing a name 為分詞構句,說明這 10 口鐘各有名字,與下一句 named Emmanuel 的例子相接。"
   },
   "D": {
    "why": "retained 是 retain 的過去式,動詞本身用法正確(retain 可以接受詞),但在 each ___ a name 中前面沒有連接詞,又會變成與 vary 並列的第二個動詞,句子結構不成立;語意「保留名字」也不符。"
   },
   "F": {
    "why": "survived 本身是自然的動詞,但放進此空格會形成沒有連接詞的第二個動詞,結構不通;survived a name 也沒有意義。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "bear",
    "pos": "v.",
    "zh": "具有;承受;生(子)",
    "note": "bear a name / a resemblance 表示「具有名字/相似」,bore、borne 為變化形。現在分詞 bearing 還可作名詞,指「關係」(have a bearing on)。",
    "coll": [
     "bear a name",
     "bear in mind"
    ]
   },
   {
    "type": "word",
    "t": "vary",
    "pos": "v.",
    "zh": "不同;變化",
    "note": "vary in size 指大小不一。名詞 variety、形容詞 various。",
    "coll": [
     "vary in size",
     "vary from A to B"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "each bearing a name 是分詞構句(附帶說明),each 作為前面 the 10 bells 的分述,主動意義用現在分詞。",
  "zh": "這 10 口鐘大小不一,每口鐘都有一個名字。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-24": {
  "schema": 2,
  "answer": "F",
  "status": "reviewed",
  "key": [
   "詞性:It is the only one of the whole group that ___ the French Revolution:that 引導關係子句修飾 the only one,空格為動詞,後接 the French Revolution 當受詞;同一句後半 while the rest were melted down 為對比,動詞用過去式。",
   "上下文線索:the rest were melted down for weapons 說明其他鐘都被熔掉,與之對比的 Emmanuel 即「撐過了」法國大革命。",
   "選定 (F) survived:survive 可作及物或不及物動詞;本題 survived the French Revolution 中直接接受詞 the French Revolution,因此此處採及物用法,表示「經歷法國大革命後仍保存下來／倖存」,時態用過去式合理。",
   "排除:(D) retained 是動詞過去式,文法上可成立,但 retained the French Revolution 表示「保留法國大革命」,語意不通;(B) bearing 為分詞,不能單獨當關係子句的動詞。"
  ],
  "options": {
   "F": {
    "why": "survive 可作及物或不及物動詞;本題 survived the French Revolution 直接接受詞 the French Revolution,所以是及物用法,表示經歷某事件後仍存在。與 while the rest were melted down 形成「唯獨它倖存、其餘被熔毀」的對比。"
   },
   "D": {
    "why": "retained 在文法上可作過去式動詞,後面也能接受詞,但「保留法國大革命」邏輯不通,不符合本句要說明的「唯一倖免者」。"
   },
   "B": {
    "why": "bearing 是現在分詞,放在 that 之後不能構成完整動詞;且空格需要的是過去式動詞,才能與 were melted down 的過去時間一致。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "survive",
    "pos": "v.",
    "zh": "倖存;經歷…仍活著",
    "note": "可及物也可不及物;survive sth 指熬過某事件,survive on 指靠…維生。名詞 survival,survivor 為「倖存者」。",
    "coll": [
     "survive the war",
     "survive on"
    ]
   },
   {
    "type": "phrase",
    "t": "melt down",
    "pos": "v. phr.",
    "zh": "熔化(再利用)",
    "note": "melt sth down:受詞可放在中間或後面(melt the bells down / melt down the bells);文中 were melted down for weapons 指鐘被熔掉鑄成武器。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "在整組鐘中,只有它熬過了法國大革命,其餘的鐘都被熔掉去製造武器。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-25": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "詞性:Emmanuel, which ___ its renowned, excellent sound:which 引導非限定關係子句,空格為動詞,後接 its renowned, excellent sound 當受詞。",
   "上下文線索:前半說所有鐘因音質不佳於 2013 年被更換,except for Emmanuel 表示唯獨它不換;其聲音被稱為 renowned、excellent,因此是「保留了原有聲音」。",
   "選定 (D) retained:retain 是及物動詞,意思是「保有、保留」,retained its renowned, excellent sound 即「保有它著名而優美的音色」。",
   "排除:(F) survived 也是及物動詞過去式,但 survived its sound 會變成「撐過自己的聲音」,語意不通;(J) silent 是形容詞,不能當動詞放在 which 之後。"
  ],
  "options": {
   "D": {
    "why": "retain 是「保持、保有」,受詞常是性質、地位、能力等抽象事物。which retained its renowned, excellent sound 說明 Emmanuel 沒有被換,仍留有好的聲音。"
   },
   "F": {
    "why": "survived 本身是自然的及物動詞,但 survive its renowned sound 語意為「撐過它自己的聲音」,不通;survive 的受詞通常是災難、事件,不是聲音。"
   },
   "J": {
    "why": "silent 是形容詞,which 之後需要動詞,因此詞性不符;即使 silent 作為形容詞也與 renowned sound 的語意相反。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "retain",
    "pos": "v.",
    "zh": "保有;保留",
    "note": "受詞常為性質、記憶、權利等。名詞 retention。近義字:keep、preserve。",
    "coll": [
     "retain one's value",
     "retain a memory"
    ]
   },
   {
    "type": "word",
    "t": "renowned",
    "pos": "adj.",
    "zh": "著名的",
    "note": "be renowned for 與 be noted for 相近,字面「有名聲的」,名詞 renown。",
    "coll": [
     "be renowned for"
    ]
   },
   {
    "type": "word",
    "t": "acoustic",
    "pos": "adj.",
    "zh": "聲學的;音響的",
    "note": "acoustic quality 指音質。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "但由於音質不佳,所有的鐘在 2013 年都被更換,只有 Emmanuel 例外,它保留了著名而優美的音色。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-26": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "詞性:a ___ part of life 中,空格位於冠詞 a 與名詞 part 之間,需要形容詞。",
   "上下文線索:Over centuries(長久以來)+ have become a ___ part of life in Paris,表示鐘聲長期融入居民生活;(推論)因此是「熟悉的」存在。後面 known as “the cathedral’s voice” 也呼應鐘聲與城市密不可分。",
   "選定 (C) familiar:a familiar part of life 即「生活中熟悉的一部分」,表示鐘聲長久陪伴市民,成為熟悉的存在。",
   "排除:(I) noted 是「因某特點而著名」,多修飾人、地點或作品(a noted scholar、be noted for…),不用來形容日常、普遍的事物,而 part of life 要的是「熟悉、習慣」,所以不選;(E) faithful 是「忠實的」,a faithful part of life 無法說明鐘聲融入生活;(J) silent 與「鐘聲融入日常」語意相反。"
  ],
  "options": {
   "C": {
    "why": "familiar 是形容詞,a familiar part of life 即「熟悉的日常一部分」,和 Over centuries 的長期時間、「大教堂的聲音」呼應。"
   },
   "I": {
    "why": "noted 是形容詞,文法上能放在 a ___ part,但意思是「因某特點而著名的」,多修飾人、地點或作品(a noted scholar),不用來形容日常普遍的事物;與第 21 題 be noted for 的用法一致。part of life 要的是「熟悉、習以為常」,所以不如 familiar。"
   },
   "E": {
    "why": "faithful 是形容詞,文法上可放在 part 之前,但意思是「忠實的」,a faithful part of life 不能說明鐘聲長期陪伴生活,語意不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "familiar",
    "pos": "adj.",
    "zh": "熟悉的",
    "note": "be familiar with sth(某人熟悉某事)/ be familiar to sb(某事為某人所熟悉)。名詞 familiarity,反義字 unfamiliar。",
    "coll": [
     "be familiar with",
     "a familiar face"
    ]
   },
   {
    "type": "phrase",
    "t": "part of life",
    "zh": "生活的一部分",
    "note": "a part of life 常指日常中習以為常的事物,例如 become a part of life。",
    "coll": [
     "become part of life"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "幾個世紀以來,這些鐘已成為巴黎生活中熟悉的一部分,在巴黎被稱為「大教堂的聲音」。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-27": {
  "schema": 2,
  "answer": "E",
  "status": "reviewed",
  "key": [
   "詞性:to call the ___ to prayer 中,空格在定冠詞 the 之後、動詞 call 的受詞位置。call 後面需要被召喚的人,所以要用「the + 形容詞」表示一群人,即 the faithful(信徒)。",
   "上下文線索:call ___ to prayer 是「召喚…去禱告」,受詞必須是會禱告的「人」;the + 形容詞可表一群人,語意為「虔誠的信徒」的是 faithful。",
   "選定 (E) faithful:the faithful 指「信徒們」,為「the + 形容詞」表一群人,call the faithful to prayer 即「召喚信徒前來禱告」。",
   "排除:(C) familiar 雖是形容詞,the familiar 可指「熟悉的事物」,但 call the familiar to prayer 語意不通,禱告的是人;(J) silent 若用 the silent 指「沉默的人」,也與禱告情境無關;名詞字庫字(如 reference、celebration)不是指人。"
  ],
  "options": {
   "E": {
    "why": "faithful 作形容詞是「忠實的」,the faithful 為 the + adj. 表示一群人,指虔誠的信徒。鐘聲召喚 the faithful to prayer 符合教堂的情境。"
   },
   "C": {
    "why": "familiar 是形容詞,the familiar 可指「熟悉的事物」,文法上可以構成名詞片語;但 call the familiar to prayer 語意不通。"
   },
   "J": {
    "why": "silent 是形容詞,the silent 可指「沉默的人」,文法上可能構成名詞片語,但與「召喚去禱告」的情境無關,語意不合。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "the + 形容詞",
    "zh": "表示一群人",
    "note": "the faithful(信徒)、the rich(富人)、the elderly(老年人)等為複數集合,動詞用複數。",
    "coll": [
     "the rich",
     "the poor",
     "the faithful"
    ]
   },
   {
    "type": "word",
    "t": "faithful",
    "pos": "adj.",
    "zh": "忠實的;虔誠的",
    "note": "be faithful to sb/sth;名詞 faith(信仰;信心),副詞 faithfully。",
    "coll": [
     "be faithful to",
     "a faithful friend"
    ]
   },
   {
    "type": "phrase",
    "t": "call sb to prayer",
    "zh": "召喚某人前去禱告",
    "note": "鐘聲或宣禮聲召集信徒去祈禱。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "它們用來報時、召喚信徒前來禱告,並且在火災、入侵等緊急情況時發出警示。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-28": {
  "schema": 2,
  "answer": "G",
  "status": "reviewed",
  "key": [
   "詞性:in times of ___ and of mourning,of 後接名詞,and 連接兩個並列名詞,所以空格與 mourning(名詞)詞性相同,且語意為對比。",
   "上下文線索:後面列出 royal weddings and coronations of kings(喜慶)與 funerals of heads of state(喪禮),對應 celebration 與 mourning。",
   "選定 (G) celebration:times of celebration and of mourning 即「歡慶與哀悼的時刻」,兩者對比。",
   "排除:(H) restoration 是名詞,文法上能放在 times of 之後,但「修復的時刻」與 royal weddings、coronations 不相關,也與 mourning 沒有對比;(A) reference 為名詞,times of reference 語意不通。"
  ],
  "options": {
   "G": {
    "why": "celebration 是名詞「慶祝」,與 mourning 構成對比,並總括 royal weddings 與 coronations 等喜事,和 funerals 呼應。"
   },
   "H": {
    "why": "restoration 是名詞,times of restoration 文法上自然,但指「修復的時期」,與皇室婚禮、加冕等例子無關,也和 mourning 不成對比。"
   },
   "A": {
    "why": "reference 是名詞,文法上可放在 of 之後,但 times of reference 不能表示婚禮或加冕等喜慶,語意不通。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "celebration",
    "pos": "n.",
    "zh": "慶祝;慶典",
    "note": "動詞 celebrate,in celebration of 表示「為慶祝…」。",
    "coll": [
     "in celebration of",
     "a celebration of"
    ]
   },
   {
    "type": "word",
    "t": "mourning",
    "pos": "n.",
    "zh": "哀悼",
    "note": "動詞 mourn,in mourning 指處於服喪中。",
    "coll": [
     "be in mourning",
     "a period of mourning"
    ]
   },
   {
    "type": "word",
    "t": "coronation",
    "pos": "n.",
    "zh": "加冕典禮",
    "note": "動詞 crown,名詞 crown 為「王冠」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "它們也曾在歡慶與哀悼的時刻響起,宣告皇室婚禮、國王加冕,以及國家元首的葬禮等大事。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-29": {
  "schema": 2,
  "answer": "J",
  "status": "reviewed",
  "key": [
   "詞性:the bells fell ___:fall 在此是連綴動詞(fall silent、fall asleep),後接形容詞表示變成某種狀態。",
   "上下文線索:However 表轉折,前面說鐘聲是巴黎生活的一部分,轉折後說 2019 年大火毀損了 the cathedral(文中未明說鐘本身受損);文末 The sounds of Notre-Dame bells once again filled the air 的 once again 暗示鐘聲曾經中斷,這是推論,所以空格應是「變得無聲」的 silent。",
   "選定 (J) silent:fall silent 表示「變得安靜、沉默」,說明大火後鐘聲停了。",
   "排除:(C) familiar 是形容詞,但 fall familiar 不是常見的連綴搭配,也無法與 once again filled the air 呼應;(E) faithful 為形容詞,fall faithful 語意不通;(I) noted 是形容詞,fall noted 沒有意義。"
  ],
  "options": {
   "J": {
    "why": "silent 是形容詞,fall silent 是固定表達「變得無聲」。與 However 轉折,以及後面 once again filled the air(再度響起)形成「靜默後重新響起」的對比。"
   },
   "C": {
    "why": "familiar 是形容詞,詞性上可接在連綴動詞後,但 fall familiar 不是常見搭配,也無法說明大火之後的狀況。"
   },
   "E": {
    "why": "faithful 是形容詞,詞性上可放在 fell 之後,但 fell faithful 語意不通,與鐘聲受大火影響的情境無關。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "fall silent",
    "zh": "變得安靜;陷入沉默",
    "note": "fall 作連綴動詞,後接形容詞表示轉變為某種狀態,如 fall asleep、fall ill、fall silent。",
    "coll": [
     "fall asleep",
     "fall ill"
    ]
   },
   {
    "type": "word",
    "t": "devastating",
    "pos": "adj.",
    "zh": "毀滅性的",
    "note": "指造成嚴重破壞的,動詞 devastate。",
    "coll": [
     "a devastating fire",
     "devastating effects"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "fall + 形容詞:fall 作連綴動詞表示「變成…狀態」,如 fall silent、fall asleep、fall ill。",
  "zh": "然而,2019 年那場嚴重損毀大教堂的大火之後,這些鐘沉寂了。",
  "aiFlags": [
   "文章未明說鐘為何沉寂(只說大火毀損 the cathedral),fall silent 是依 once again filled the air 的暗示與 fall + 形容詞的固定表達所作的語意推論;官方答案 silent 在此仍是最合理的選項。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-30": {
  "schema": 2,
  "answer": "H",
  "status": "reviewed",
  "key": [
   "詞性:空格在 a complex and time-consuming process of ___ 中,of 之後需要名詞或動名詞。",
   "上下文線索:前句說大火毀損大教堂;本句說經過複雜、耗時的過程後,monument 於 2024 年 12 月 8 日 finally reopened,所以過程是把受損建築修復。",
   "選定 (H) restoration:process of restoration 即「修復的過程」,名詞 restoration 為動詞 restore 的名詞。",
   "排除:(G) celebration 是名詞,文法上可接 process of,但「慶祝的過程」與 reopen 前需要花長時間處理毀損不符;(A) reference 為名詞,process of reference 語意不通。"
  ],
  "options": {
   "H": {
    "why": "restoration 是名詞「修復、恢復」,動詞 restore。經過複雜耗時的修復過程後才重新開放,與前面 fire damaged 的因果相承。"
   },
   "G": {
    "why": "celebration 是名詞,process of celebration 文法上可成立,但前句談的是大火造成的損毀,「慶祝」無法承接這個因果,也不會是讓建築重新開放前所需的過程。"
   },
   "A": {
    "why": "reference 是名詞,文法上能放在 of 之後,但 process of reference 無法說明大教堂在大火後的處理,語意不通。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "restoration",
    "pos": "n.",
    "zh": "修復;恢復",
    "note": "動詞 restore,常見 restore sth to its original state。可指文物、建築的修復或秩序的恢復。",
    "coll": [
     "restoration work",
     "the restoration of a building"
    ]
   },
   {
    "type": "word",
    "t": "time-consuming",
    "pos": "adj.",
    "zh": "耗時的",
    "note": "由 time + consuming(耗費…的)構成的複合形容詞,指「花很多時間的」;近義字 lengthy。",
    "coll": [
     "a time-consuming process"
    ]
   },
   {
    "type": "word",
    "t": "reopen",
    "pos": "v.",
    "zh": "重新開放",
    "note": "re- 表「再次」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "這座建築歷經一段複雜而耗時的修復過程,這座著名的古蹟終於在 2024 年 12 月 8 日重新開放。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-31": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "Before:第 1 段前兩句說 capsule hotel 是簡易又便宜的住宿,源於日本,最初是為了讓商務人士用少少的錢住在靠近商業區的地方。",
   "Candidate:(D) Today, they provide low-budget, overnight lodging in commerce centers in large cities worldwide. 的功能是對照 initially,說明現在的情形,並把範圍從日本擴大到全世界大城市。",
   "After:第 2 段開頭 A typical room of a capsule hotel... 轉入客房的細節,前面需要先把 capsule hotel 的背景和現況收尾。",
   "Link:initially meant for business professionals 與 Today 形成時間對照;they 指前面的 these hotels;commerce centers 呼應前面 business districts;worldwide 為第 3 段擴展到其他城市與國家預作鋪陳。"
  ],
  "options": {
   "D": {
    "why": "Today 與前句 initially 形成時間對比,they 回指 capsule hotels,lodging 與 low-budget 呼應 without spending a lot,commerce centers 呼應 business districts,作為第 1 段的收束。"
   },
   "A": {
    "why": "A 文法上成立、英文自然,但它在談「因應需求增加而創新」,第 1 段還沒有談到需求或舊式風格,所以放在這裡缺少前提;它的內容要放在第 3 段已經提到旅館擴展到各地之後(見第 33 題)。"
   },
   "B": {
    "why": "B 文法上成立,但它描述房間的噪音缺點,第 1 段在介紹背景,尚未談到客房細節,與第 2 段「A typical room」也不連貫,應放在缺點段落(第 34 題)。 另外 B 以 The room’s 開頭,但第 1 段尚未出現 room,要到第 2 段 A typical room 才首次介紹,定冠詞沒有先行詞。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "accommodation",
    "pos": "n.",
    "zh": "住宿",
    "note": "在此為不可數名詞,指住宿設施。近義字:lodging。",
    "coll": [
     "budget accommodation"
    ]
   },
   {
    "type": "word",
    "t": "originate",
    "pos": "v.",
    "zh": "起源",
    "note": "originate in/from;文中 Originated in Japan 為過去分詞構句。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "原句(插入句):今日,它們在全球各大城市的商業中心提供價格低廉的過夜住宿。／前句:這類旅館最初是為了讓商務人士在不花很多錢的情況下,住在靠近人口密集商業區的地方。／後句:典型的膠囊旅館房間大約是一張單人床的長與寬……",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-32": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "Before:第 2 段先說房間大小約一張單人床,足夠人爬進去坐起,又說牆壁可能由木材、金屬或任何硬質材料製成,常是玻璃纖維或塑膠。",
   "Candidate:(C) The chambers are stacked side-by-side, two units high, with the upper rooms reached by a ladder. 的功能是繼續描述 capsule 的外形配置:並排、兩層高、上層靠梯子進入。",
   "After:下一句 Each capsule is equipped with a comfortable mattress... 開始說明單一膠囊內部的設備,承接 C 對各個 capsule 排列方式的描述,由整體排列轉入單一 capsule 的內部。",
   "Link:chambers 是 capsules(rooms)的替代說法,承接 walls of each capsule;從單個房間的尺寸、牆壁到整體堆疊方式,再到 Each capsule 的內部設備,由外而內描述,下一句的 Each 與 C 的 chambers 一對多對應。"
  ],
  "options": {
   "C": {
    "why": "chambers 是前文 capsule 的換說法,補上堆疊與上下進出方式,再接 Each capsule 說明內部設備,描述順序自然。"
   },
   "B": {
    "why": "B 文法上成立,而且 thin plastic walls 接在 often fiberglass or plastic 之後局部銜接自然,是本題最容易誤選的選項。但 (1) 第 2 段整體在描述 capsule 的大小、材質、排列與內部設備,結尾又以 such minimalist design makes these hotels both inexpensive and efficient 作正面總結,B 談的是隔音差、噪音,屬於住宿缺點,與段落功能不合;(2) 這類缺點在第 4 段才與 poor air flow、共用設施、claustrophobic 一起列出(正是第 34 題的答案位置)。所以 C 比 B 更合適。"
   },
   "D": {
    "why": "D 文法上成立,但它談的是旅館整體在世界各地的現況,與第 2 段描述客房結構的主題不符,並且 they 在此沒有適合的先行詞(前面是 walls 或 capsule)。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "stack",
    "zh": "堆疊",
    "note": "文中 are stacked side-by-side, two units high 為被動語態。",
    "coll": [
     "be stacked up"
    ]
   },
   {
    "type": "word",
    "t": "equip",
    "pos": "v.",
    "zh": "配備",
    "note": "be equipped with 表示「配備有」。",
    "coll": [
     "be equipped with"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "前句:每個膠囊的牆壁可能由木材、金屬或任何硬質材料製成,但常見的是玻璃纖維或塑膠。／插入句:這些艙室並排堆疊,共兩層高,上層房間要靠梯子進入。／後句:每個膠囊都配有舒適的床墊、一盞小燈,有時還有電視或其他娛樂設備。",
  "aiFlags": [
   "B 句(薄塑膠牆傳來鼾聲)接在 often fiberglass or plastic 之後局部銜接自然,是主要干擾。排除 B 的依據是段落功能與資訊組織:第 2 段整體描述 capsule 的大小、材質、排列與設備,C 屬客房結構／排列資訊,B 屬隔音差的缺點,與第 4 段的缺點清單(poor air flow、共用設施、claustrophobic)一致,也是第 34 題的答案。官方答案 C 較佳,但 B 並非完全放不進去。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-33": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "Before:第 3 段說第一家膠囊旅館 1979 年在大阪開幕,此後迅速擴展到其他城市與國家,甚至歐洲、北美的大城市也有。",
   "Candidate:(A) In response to rising demands, these hotels are embracing a wave of innovation. 的功能是由「擴散」轉入「改變」,說明需求增加,旅館開始創新。",
   "After:下一句 Instead of the traditional bare pod-sized style, new chains now feature interior design... 具體說明創新的內容:取代傳統簡陋的艙式風格,改採新設計與設施。",
   "Link:innovation 概括後面的 interior design 與 free Wi-Fi、mobile charging 等例子,屬「概括→例證」;Instead of the traditional 呼應創新的「新舊對比」;these hotels 回指前面各地的 pod hotels。"
  ],
  "options": {
   "A": {
    "why": "A 的 wave of innovation 為總述,後面 new chains now feature... 與 Guests may enjoy... 為例證,Instead of 的新舊對比也需要一句先說明正在改變。"
   },
   "D": {
    "why": "D 文法上成立,但它講旅館現今遍布世界大城市,與前面已說的擴展到各國城市重複,也無法銜接 Instead of the traditional bare pod-sized style 所需要的「改變」。"
   },
   "C": {
    "why": "C 文法上成立,但它在描述房間結構,應屬第 2 段;放在第 3 段,與 Instead of the traditional... 的設計創新或旅館擴展皆無關。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "in response to",
    "zh": "回應;因應",
    "note": "in response to rising demands 表示因為需求上升而採取行動。",
    "coll": [
     "in response to the request"
    ]
   },
   {
    "type": "word",
    "t": "innovation",
    "pos": "n.",
    "zh": "創新",
    "note": "動詞 innovate,形容詞 innovative。",
    "coll": [
     "technological innovation"
    ]
   },
   {
    "type": "word",
    "t": "embrace",
    "pos": "v.",
    "zh": "欣然接受;採納",
    "note": "embrace a wave of innovation 此為引申義,表示積極採納創新。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "前句:膠囊旅館也出現在歐洲與北美,尤其是紐約、倫敦、巴黎等大城市。／插入句:為因應日益增加的需求,這些旅館正擁抱一波創新。／後句:新的連鎖旅館現在不再採用傳統簡陋、僅有膠囊艙大小的風格,而是以室內設計來吸引世界各地、隨時連網的旅客。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-34": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "Before:第 4 段先說膠囊旅館不一定適合每個人,第一個缺點是有些旅館的膠囊內沒有空調,通風不良。",
   "Candidate:(B) The room’s thin plastic walls easily transmit the sound of snoring made by neighboring guests. 的功能是再列出一個缺點:薄牆擋不住鄰房鼾聲(噪音)。",
   "After:第 4 段首句 may not be suitable for everyone 起,整段逐項列出缺點(通風不良 → 插入句 → Also 共用設施 → And 幽閉恐懼)。插入句必須與前後同為缺點、承接 may not be suitable 的主題;A(創新)、C(堆疊排列)、D(現況)都不是缺點,所以不能放。B 的 thin plastic walls ... snoring 是缺點,下一句 Also 再接另一個缺點。",
   "Link:缺點羅列:通風不良 → 噪音 → Also 共用設施 → And 幽閉恐懼;thin plastic walls 回應第 2 段中提到牆壁常是玻璃纖維或塑膠;The room 回指 capsule。"
  ],
  "options": {
   "B": {
    "why": "B 是缺點(隔音差),與前句通風不良、後句共用設施、最後的幽閉恐懼同屬缺點清單;The room 回指 capsule,thin plastic walls 呼應第 2 段牆壁常是玻璃纖維或塑膠。B 也曾是第 32 題的干擾,該題排除它的依據是它預設已有並排配置且語氣與段落不合。"
   },
   "A": {
    "why": "A 文法上成立,但它談的是旅館進步與創新,語氣為正面,偏離本段列缺點(may not be suitable for everyone)的主題,應放在第 33 題的位置。"
   },
   "C": {
    "why": "C 文法上成立,但它客觀描述艙室如何堆疊與上下層進入,並不是缺點,與本段主題不合,應屬第 2 段的客房描述(見第 32 題)。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "transmit",
    "pos": "v.",
    "zh": "傳送;傳導",
    "note": "transmit sound 指傳導聲音;名詞 transmission。",
    "coll": [
     "transmit a signal",
     "transmit sound"
    ]
   },
   {
    "type": "word",
    "t": "claustrophobic",
    "pos": "adj.",
    "zh": "幽閉恐懼的",
    "note": "名詞 claustrophobia。",
    "coll": [
     "feel claustrophobic"
    ]
   },
   {
    "type": "word",
    "t": "budget-conscious",
    "pos": "adj.",
    "zh": "注重預算的",
    "note": "文中 budget-conscious travelers 指在意花費的旅客。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "前句:有些旅館的膠囊內可能不提供空調,導致空氣流通不佳。／插入句:房間薄薄的塑膠牆壁很容易傳來鄰房旅客的鼾聲。／後句:此外,你可能得與其他旅客共用公共設施(例如浴室)。",
  "aiFlags": [
   "B 與第 32 題的 B 互為干擾:第 34 題排除 A、C、D 的依據是「本段逐項列缺點」的主題,而不是 Also 本身(空調缺點已在前句,Also 並不要求中間再插一句)。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-35": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "主旨題要看全文每一段在做什麼：第 1 段介紹 Knight 提出以鐵路活動臂號誌為基礎的交通號誌；第 2 段說明該系統因瓦斯外洩爆炸而被棄用、號誌被禁；第 3 段談美國各城市的改良與 Potts 的黃燈（三色號誌）；第 4 段說自駕車出現後，號誌可能不再需要。",
   "把各段串起來，主線是「交通管制方式如何一步步改變」：手臂號誌→紅綠燈→三色燈→也許連號誌都不需要（第 4 段）。全文依時間先後，從 1860 年代一直談到未來。",
   "再比較四個選項的涵蓋範圍：(A) 剛好涵蓋從過去到未來的整條發展線；(B) 只涵蓋人物，(C) 只涵蓋功能，(D) 範圍太廣。",
   "文章明說的是各階段的設計與事件；「演進」是把這些階段整合後的概括，屬於歸納，不是文中某一句話。"
  ],
  "options": {
   "A": {
    "why": "正確。「evolution of traffic control systems」涵蓋四段：Knight 的活動臂加燈（第 1 段）、被禁後 1929 年才恢復（第 2 段）、美國的改良與黃燈（第 3 段）、自駕車可能取代號誌（第 4 段）。「traffic control systems」也比 traffic lights 更廣，連第 4 段「沒有號誌的路口」都包含在內。"
   },
   "B": {
    "why": "這個選項只抓到第 1、3 段的人物：Knight 與 Potts（以及第 3 段泛稱的專利申請者）。但文章的重點是這些人提出的「系統如何改變」，第 2 段的爆炸與禁令、第 4 段的自駕車都與發明者無關，所以範圍過窄，只涵蓋部分內容。"
   },
   "C": {
    "why": "文章確實提到某些號誌的功能，例如手臂水平＝停、降到 45 度＝前進（第 1 段），黃燈表示 proceed with caution（第 3 段）。但這些是用來說明各階段設計的細節，不是全文主題；第 2 段（事故與禁令）、第 4 段（自駕車）都不是在比較不同號誌的功能。"
   },
   "D": {
    "why": "「modern transportation」泛指各種交通運輸（車輛、鐵路、航空等）的發展；文章只談路口的號誌與管制，第 1 段的鐵路號誌與第 4 段的自駕車也只是服務於號誌這個主題，範圍過廣。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "evolution",
    "pos": "n.",
    "zh": "演進、發展",
    "note": "指逐步、漸進的變化。本題 (A) 的關鍵字；相關：evolve (v.)。",
    "coll": [
     "the evolution of sth",
     "evolve into"
    ]
   },
   {
    "type": "word",
    "t": "credit",
    "pos": "v.",
    "zh": "把……歸功於",
    "note": "第 1 段 credit the first traffic light to Knight：把第一個紅綠燈的功勞歸給 Knight。",
    "coll": [
     "credit A to B",
     "credit B with A"
    ]
   },
   {
    "type": "word",
    "t": "emergence",
    "pos": "n.",
    "zh": "出現、興起",
    "note": "第 4 段 with the emergence of self-driving cars；動詞為 emerge。",
    "coll": [
     "the emergence of sth"
    ]
   },
   {
    "type": "phrase",
    "t": "be short-lived",
    "zh": "短命的、短暫的",
    "note": "第 2 段形容 Knight 的系統只維持一個月左右就停用。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段：多數人認為第一個交通號誌出自諾丁漢工程師 John Peake Knight。他提出以鐵路活動臂號誌為基礎的系統，並加上紅綠瓦斯燈供夜間使用。\n第 2 段：Knight 的號誌在 1868 年 12 月裝設，但瓦斯外洩造成爆炸，專案被棄置，交通號誌直到 1929 年才在英國街頭回歸。\n第 3 段：二十世紀初美國大城市出現英國號誌的各種版本，Potts 的三色系統加入了「小心前進」的訊號。\n第 4 段：隨著自駕車出現，研究人員開始認為交通號誌或許不再必要。\n題目與正確選項：本文主要在談什麼？(A) 交通管制系統的演進。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-36": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "先回第 1 段找 Knight 的設計：他提出的是以「鐵路活動臂號誌」(railway movable-arm signal) 為基礎的系統；手臂水平伸出表示停，降到 45 度表示前進；夜間另外加上紅、綠瓦斯燈；旁邊還有警察操作。這幾項都是文章明說的。",
   "把文章資訊整理成圖像的檢查清單：(1) 有可活動的手臂；(2) 有燈（紅綠燈供夜間使用，是「加」在手臂號誌上的）。警察是旁邊的人員，不是號誌本身的外觀，不必在圖中尋找。",
   "逐一對照四張圖的可見特徵：(A) 只有兩個圓形燈，沒有手臂；(B) 有伸出的桿子，但沒有燈；(C) 柱頂有燈籠，兩側各有一根向下斜的活動臂，同時有手臂與燈；(D) 是標有 STOP、GO 字樣的箱形號誌，沒有手臂也沒有燈。",
   "所以只有 (C) 同時具備「活動臂」與「燈」。區分四張圖只需用這兩項文章資訊（有無活動臂、有無燈）；文章沒有交代號誌的其他細部外觀，不要用文章以外的知識去判斷。"
  ],
  "options": {
   "A": {
    "why": "(A) 的主體是兩個圓形燈的燈箱，看不出可活動的臂（頂端的小飾物不是手臂），缺少 Knight 設計的核心「活動臂」。第 1 段說紅綠燈是「加」在活動臂號誌上、供夜間使用，只有燈而沒有活動臂，不是他提出的整套號誌。"
   },
   "B": {
    "why": "(B) 有從柱子伸出的桿子，外觀可視為手臂，但畫面上沒有燈。第 1 段說 Knight 的系統是在活動臂號誌上「加」紅綠瓦斯燈供夜間使用，題目問的是他提出的整套號誌，所以只有手臂而沒有燈的 (B) 不完整。"
   },
   "C": {
    "why": "正確。(C) 柱頂有燈籠，兩側各有一根向下斜的活動臂，對應第 1 段「活動臂（手臂降低表示前進）＋夜間用的紅綠燈」兩項特徵。"
   },
   "D": {
    "why": "(D) 是標有 STOP、GO 文字的箱形號誌，既無活動臂也無燈，與第 1 段描述的「活動臂」與「紅綠燈」兩項特徵都不符。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "movable",
    "pos": "adj.",
    "zh": "可移動的、可活動的",
    "note": "movable-arm signal 指手臂可以升起或放下的號誌。構詞：move + -able。"
   },
   {
    "type": "word",
    "t": "command",
    "pos": "v.",
    "zh": "命令、指示",
    "note": "第 1 段 arms … commanded drivers to stop：手臂的位置對駕駛下達「停」的指令。",
    "coll": [
     "command sb to V"
    ]
   },
   {
    "type": "phrase",
    "t": "move on",
    "zh": "繼續前進",
    "note": "第 1 段 told drivers to move on，指手臂降下時駕駛可以前進。"
   },
   {
    "type": "word",
    "t": "resemble",
    "pos": "v.",
    "zh": "像、類似",
    "note": "第 1 段 resembling a traffic director's gestures：像交通指揮者的手勢（現在分詞，說明手臂訊號的特色）。",
    "coll": [
     "resemble sb/sth"
    ]
   },
   {
    "type": "word",
    "t": "station",
    "pos": "v.",
    "zh": "派駐、安置",
    "note": "第 1 段 A police officer was stationed by the side：被派駐在號誌旁。名詞 station 為「站、所」。",
    "coll": [
     "be stationed at/by"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段：他提出一套以鐵路活動臂號誌為基礎的號誌系統：水平伸出的手臂命令駕駛停車，降到 45 度的手臂則告訴駕駛可以前進，類似交通指揮者的手勢。夜間則在號誌上加裝紅色與綠色的瓦斯燈。一名警察被派駐在旁邊操作這套系統。\n題目與正確選項：下列哪一張圖顯示 Knight 提出的交通號誌？(C) 圖 C。",
  "aiFlags": [
   "本題使用的是已核准的原創替代圖（非官方原圖），答案維持官方答案 (C)。圖中的細節（柱頂燈籠、頂端小飾物、(B) 的斜桿等）是繪圖者的設定，不是文章資訊；選項說明只用「有無活動臂」「有無燈」兩項文章資訊區分四張圖。(B) 的桿子外觀像伸出的手臂，學生容易只看到手臂而忽略沒有燈；另外文章說手臂水平表示停、降下表示前進，單張靜態圖只能畫出一種手臂位置。請老師確認 (A)(B) 與 (C) 的差異是否足以讓學生只靠「活動臂＋燈」判斷。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-37": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "true/false 題要逐項回文章查證，並注意四個選項各出自哪一段：(A) 第 2 段、(B) 第 3 段、(C) 第 1 段、(D) 第 4 段。",
   "(A) 第 2 段說爆炸「injuring the policeman operating it」，受傷的是操作的警察，不是 Knight，所以錯。(B) 第 3 段說美國大城市已有芝加哥的活動臂、舊金山的紅綠燈等版本，Potts 的貢獻是黃燈這項 major breakthrough，所以不是美國第一個。",
   "(C) 第 1 段說 Knight 的號誌是以鐵路的 movable-arm signal 為基礎，手臂的動作只是「resembling a traffic director's gestures」，指外觀像指揮者的手勢，並非說這個號誌源自指揮者的想法，所以不是「originated from the idea of a traffic director」。",
   "(D) 第 4 段明說研究人員開始認為自駕車出現後號誌不再必要，車輛會自動調整速度通過路口。文章用 may / begun to suggest 的語氣，所以選項的 may not need 與原文一致。"
  ],
  "options": {
   "A": {
    "why": "第 2 段說瓦斯外洩造成燈具爆炸，受傷的是「the policeman operating it」，也就是在旁邊操作的警察。第 1 段 Knight 是設計者，文章沒有說他在現場或受傷。"
   },
   "B": {
    "why": "第 3 段說美國大城市早已出現英國號誌的各種版本（芝加哥用活動臂、舊金山用紅綠燈），Potts 的貢獻是加入黃燈的 major breakthrough（1920 年裝於底特律），並非美國第一個交通號誌。"
   },
   "C": {
    "why": "第 1 段說 Knight 把鐵路的號誌系統調整用在倫敦路口，手臂動作「resembling a traffic director's gestures」。意思是動作看起來像交通指揮者的手勢，來源是鐵路活動臂號誌，不是指揮者的點子。這是把「像」誤讀成「源自」的陷阱。"
   },
   "D": {
    "why": "正確。第 4 段：自駕車的出現使研究人員開始提出「號誌不再必要」，車輛會自動調整速度並與其他車保持安全距離通過路口，所以未來車輛可能不需要紅綠燈。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "deem",
    "pos": "v.",
    "zh": "認為、視為",
    "note": "第 2 段 Deemed a public hazard：被視為公共危險。常用被動、分詞結構，後接名詞或形容詞。",
    "coll": [
     "be deemed (to be) + n./adj."
    ]
   },
   {
    "type": "word",
    "t": "hazard",
    "pos": "n.",
    "zh": "危險物、危害",
    "note": "第 2 段 a public hazard；同義：danger、risk。",
    "coll": [
     "a health hazard",
     "a fire hazard"
    ]
   },
   {
    "type": "word",
    "t": "ban",
    "pos": "v.",
    "zh": "禁止",
    "note": "第 2 段 traffic lights were banned；名詞也是 ban。",
    "coll": [
     "ban sb from V-ing",
     "a ban on sth"
    ]
   },
   {
    "type": "word",
    "t": "breakthrough",
    "pos": "n.",
    "zh": "突破、重大進展",
    "note": "第 3 段 A major breakthrough：Potts 的黃燈是重大進展。",
    "coll": [
     "a major breakthrough in sth"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段：Knight 的號誌以鐵路活動臂號誌為基礎，手臂的動作類似交通指揮者的手勢。\n第 2 段：瓦斯外洩一個月後造成燈具爆炸，傷到操作號誌的警察。\n第 3 段：二十世紀初英國號誌的版本出現在美國大城市；Potts 的三色系統 1920 年裝設於底特律。\n第 4 段：隨著自駕車出現，研究人員開始認為交通號誌或許不再必要，車輛會自動調整速度通過路口。\n題目與正確選項：根據本文，下列哪項敘述正確？(D) 未來的車輛通過路口時可能不需要交通號誌。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-38": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "句子是 “This design was adopted in later traffic light designs across the world.”,開頭的 This design 要回指緊鄰前面剛介紹的某個設計,而且這句談「後來的號誌設計」,適合放在某段末尾作結。先找各段末句:哪一段結尾正好介紹了一套「設計」。",
   "第 3 段末句:Installed in Detroit in 1920, Potts’ three-color system allowed for the added signal “proceed with caution” to be displayed.,主詞正是 Potts’ three-color system(一套號誌設計)。接著放 This design was adopted in later traffic light designs across the world,This design 自然回指這套三色系統,說明它後來被各地的設計採用,是最直接的前後銜接。",
   "比較其他段末:第 1 段末句是 A police officer was stationed by the side to operate the system,緊鄰的是警察的人員安排,雖然該段介紹 Knight 的設計,但最近一句不是一套設計,This design 的直接回指較弱;第 2 段末句說專案被棄置、號誌被禁到 1929 年,緊鄰的是結果與禁令,沒有一套可被「採用」的設計可讓 This design 銜接。",
   "第 4 段末句談自駕車與未來的交通管理方式,方向是未來、不再需要號誌,與「後來的號誌設計被世界各地採用」的歷史發展不合。所以選 (C) 第 3 段。"
  ],
  "options": {
   "A": {
    "why": "第 1 段確實介紹了 Knight 的設計,所以把 This design 理解成 Knight 的設計並非不可能;但該段最後一句已轉成 A police officer was stationed by the side to operate the system(人員安排),把插入句放在段末,This design 與最近一句的連結不如第 3 段末緊接 Potts’ three-color system 那麼直接,所以不如 (C)。"
   },
   "B": {
    "why": "第 2 段結尾說專案被棄置、號誌被禁到 1929 年,重點是結果與禁令,緊鄰的句子沒有一套可讓 This design 自然回指的設計或系統,接在這裡缺少清楚的指涉對象,所以不如 (C)。"
   },
   "C": {
    "why": "正確。第 3 段末句的主詞是 Potts’ three-color system,緊接著 This design was adopted in later traffic light designs across the world 時,This design 自然回指這套三色系統,說明它後來被世界各地的號誌設計採用,作為段落的收尾,指涉與語意都最直接。"
   },
   "D": {
    "why": "第 4 段談自駕車出現、號誌可能不再必要,是談未來的交通管理方式;而 This design was adopted in later traffic light designs 說的是過去號誌設計的後續影響,方向與本段不合,所以不選。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "adopt",
    "pos": "v.",
    "zh": "採用、採納",
    "note": "adopt a design/method/policy；第 3 段另有 were adopted in San Francisco。不要和 adapt（調整、改編）混淆。",
    "coll": [
     "adopt a method",
     "be adopted by sb"
    ]
   },
   {
    "type": "word",
    "t": "adapt",
    "pos": "v.",
    "zh": "使適應、改編",
    "note": "第 1 段 this could not be adapted for use on London intersections：把鐵路號誌改用於路口。與 adopt 只差一個字母。",
    "coll": [
     "adapt A for B",
     "adapt to sth"
    ]
   },
   {
    "type": "word",
    "t": "file",
    "pos": "v.",
    "zh": "提出（申請）",
    "note": "第 3 段 Patents … were filed：專利被提出申請。",
    "coll": [
     "file a patent",
     "file a lawsuit"
    ]
   },
   {
    "type": "word",
    "t": "innovation",
    "pos": "n.",
    "zh": "創新、新發明",
    "note": "第 3 段 innovations on Knight's ideas：在 Knight 構想上的創新。動詞為 innovate。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段：二十世紀初的美國，不同城市採用不同的號誌；一項重大突破是 Detroit 警察 William Potts 發明的黃燈。1920 年在底特律裝設的 Potts 三色系統，可以顯示增加的「小心前進」訊號。\n插入句：這個設計後來被世界各地的交通號誌設計所採用。\n第 4 段：隨著自駕車出現，研究人員開始認為交通號誌或許不再必要。\n題目與正確選項：這個句子最適合放在哪一段末作為最後一句？(C) 第 3 段。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-39": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "題目問的是研究屬於哪個學術領域，要先看文章研究的「對象」與「內容」：第 1 段 new studies untangle the benefits and risks of horror movies；第 2 段研究者討論 safe fear、take the perspective of the characters、learning vicariously、therapeutic、release bottled-up emotions；第 3 段談 anxiety、trauma、sleep、irritability。",
   "這些全是在研究「人看恐怖片之後的心理與情緒反應」：恐懼、焦慮、創傷、情緒釋放、睡眠和易怒、兒童日後的焦慮。這些屬於研究心理與行為的 Psychology。這題是推論題：文章沒有直接寫出學科名稱，所以要從研究內容歸類。",
   "文章集中談的是 fear、anxiety、trauma、情緒釋放(emotional relief)、易怒、睡眠受擾,以及兒童對暴力的敏感度,這些主要是個人的心理、情緒與行為反應,所以 Psychology 是四個選項中最直接、最符合的領域。Education 與 Philosophy 和文章內容的關聯較弱。Communication 並非毫無關聯,因為恐怖片是媒體,media effects 也可能屬傳播研究;但本文沒有把焦點放在訊息傳播、媒介渠道、傳播模式或 audience communication behavior,而是聚焦於觀影者本身的心理反應,所以 A 比 D 更合適。"
  ],
  "options": {
   "A": {
    "why": "正確。文章研究的是觀眾看恐怖片的情緒與心理影響：safe fear、rehearse the plot、release bottled-up emotions、anxiety、trauma、irritability，這些都是心理學研究的核心課題。"
   },
   "B": {
    "why": "文章第 3 段提到兒童受影響，但那只是一類觀眾；研究的主題不是教學、課程或學習成效，所以最可能屬於的領域不是教育。這個領域本身與學習有關，但不符合全文的研究內容。第 2 段的 learning vicariously 談的是觀影時的心理歷程，不是教學設計或學習成效，仍屬心理學問題。"
   },
   "C": {
    "why": "文章沒有討論人生、倫理或抽象概念的論證，研究的是看電影的反應與影響，所以不是哲學。"
   },
   "D": {
    "why": "恐怖片是影視媒體，因此 Communication 並非毫無關聯；但文中研究關注的是觀眾個人的恐懼、焦慮、睡眠等心理狀態，而不是訊息如何傳遞、媒體傳播效果或閱聽習慣，所以 Psychology 比 Communication 更貼切。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "vicariously",
    "pos": "adv.",
    "zh": "間接地（藉由他人經驗）",
    "note": "在本題指從他人（角色）的經驗中學習或感受，不是親身經歷。形容詞 vicarious。",
    "coll": [
     "learn vicariously",
     "live vicariously through sb"
    ]
   },
   {
    "type": "word",
    "t": "therapeutic",
    "pos": "adj.",
    "zh": "有治療效果的、有療效的",
    "note": "第 2 段 can be therapeutic：對情緒有舒緩作用。名詞 therapy、therapist。"
   },
   {
    "type": "word",
    "t": "trauma",
    "pos": "n.",
    "zh": "心理創傷",
    "note": "第 3 段 trauma may be triggered：創傷反應可能被觸發。形容詞 traumatic。",
    "coll": [
     "suffer trauma"
    ]
   },
   {
    "type": "word",
    "t": "irritability",
    "pos": "n.",
    "zh": "易怒、煩躁",
    "note": "第 3 段 fatigue and irritability；形容詞 irritable，動詞 irritate。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段：新的研究已開始釐清恐怖片的好處與風險。\n第 2 段：研究者認為觀眾透過這種方式間接學習；刺激與興奮可以有療癒效果，讓觀眾釋放壓抑的情緒，並在電影結束後感到放鬆。\n第 3 段：研究也發現恐怖片對某些人有負面影響，如焦慮、創傷被觸發、睡眠受擾與疲倦易怒。\n題目與正確選項：文中提到的研究最可能屬於哪個領域？(A) 心理學。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-40": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "先回第 2 段找 learning vicariously 的上下文：as people are drawn into the story, they tend to take the perspective of the characters and rehearse the plot unconsciously. Researchers believe that viewers are learning vicariously this way, picking up tips on how to handle threats in the real world.",
   "this way 指前一句的做法：觀眾代入角色的視角、在腦中預演劇情。picking up tips 說明學到的是「面對危險的方法」，而且觀眾自己並沒有真的遇到危險（第 2 段前面說他們身在家中或影院座位上）。所以 vicariously 的意思是透過看他人（角色）的經歷而學習，也就是 observation。",
   "比較選項：(B) 觀察而獲得知識，符合；(D) 說從親身經驗取得資訊，恰好相反，因為觀眾並未親自遇到威脅；(C) 面對面互動，文中沒有與人互動；(A) 無保留地提問，與電影觀賞無關。"
  ],
  "options": {
   "A": {
    "why": "「Making inquiries without reservation」是毫不保留地提問、詢問。文章中觀眾只是看電影，沒有向誰提問；picking up tips 也不是靠發問取得。與上下文無關。"
   },
   "B": {
    "why": "正確。「Gaining knowledge through observation」對應第 2 段：觀眾代入角色、預演劇情，從角色面對威脅的過程中學到應對方式；觀眾本身不在危險中，是透過看別人的處境學習。"
   },
   "C": {
    "why": "「face-to-face interaction」要有人與人當面互動；文中觀眾是看電影，與角色並沒有互動。"
   },
   "D": {
    "why": "「personal experience」指親身經驗，但第 2 段前面強調觀眾是 in the comfort of their own home or theater seats rather than under the threat of any real danger，並沒有親自經歷危險，所以與 vicariously 的意思相反。這是最容易誤選的選項。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "vicariously",
    "pos": "adv.",
    "zh": "間接地、替代性地",
    "note": "從別人的經驗中得到感受或學習。vicarious experience＝透過他人得到的間接經驗。常見搭配 live vicariously through sb。",
    "coll": [
     "learn vicariously",
     "experience sth vicariously"
    ]
   },
   {
    "type": "phrase",
    "t": "take the perspective of sb",
    "zh": "從某人的角度看事情",
    "note": "第 2 段 take the perspective of the characters：代入角色的視角。也可說 from sb's perspective。"
   },
   {
    "type": "phrase",
    "t": "pick up",
    "zh": "學到、無意間習得",
    "note": "第 2 段 picking up tips：不經刻意學習就學到。pick up a language / an idea 也是此意。",
    "coll": [
     "pick up a skill"
    ]
   },
   {
    "type": "word",
    "t": "rehearse",
    "pos": "v.",
    "zh": "預演、排練",
    "note": "第 2 段 rehearse the plot unconsciously：在腦中預演劇情。名詞 rehearsal。",
    "coll": [
     "rehearse a speech"
    ]
   },
   {
    "type": "word",
    "t": "unconsciously",
    "pos": "adv.",
    "zh": "無意識地",
    "note": "第 2 段形容觀眾不自覺地預演；反義 consciously。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段：當人們被故事吸引，往往會站在角色的角度，並在不知不覺中預演劇情。研究者認為觀眾以這種方式間接學習，學到在真實世界中處理威脅的訣竅。\n題目與正確選項：作者在第 2 段說的「learning vicariously」是什麼意思？(B) 透過觀察而獲得知識。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-41": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "推論題的做法：把每個選項拿回文章核對，區分「文章明說」與「可以合理推論」。要選的是文章有證據支持的推論，而不是文章沒說的推測。",
   "(D) 的依據在第 3 段最後：兒童（14 歲以下）看恐怖片，日後成年較可能發展出焦慮，並且對真實暴力較不敏感、更能接受攻擊行為，這是文章明說的長期影響。但有兩個跳躍：(1) 證據僅限兒童；(2) 「焦慮與對暴力的態度」不等於 personality。選項用 may 與 personality 做概括，是最接近的推論。",
   "(A) 文章只說兒童暴露在血腥暴力下會更接受攻擊，沒說多數恐怖片愛好者有攻擊行為；(B) 第 2、3 段分別列出好處與壞處，沒有比較多寡；(C) 疫情期間是觀看量高，不是說疫情啟發創作。A、B、C 都有明確不符之處，所以 D 是最佳選項（偏向刪去法）。"
  ],
  "options": {
   "A": {
    "why": "第 3 段只說 Children under 14 這類族群，接觸 graphic violence 後 more accepting of aggression（較能接受攻擊行為）。這是對兒童的影響，而不是說多數恐怖片愛好者容易有攻擊行為；也沒說 aggressive behavior 本身。以偏概全。"
   },
   "B": {
    "why": "文章先列三項好處（第 2 段），再列幾項風險（第 3 段），沒有比較誰多誰少，更沒有說好處「far more」。這是文章沒有的資訊。"
   },
   "C": {
    "why": "第 2 段末說 during the COVID-19 pandemic，恐怖片與疫情驚悚片是 digital movie apps 上觀看次數最多的電影；這是疫情期間觀眾的選擇，並非說疫情啟發了恐怖片創作。文章沒有談電影的創作靈感，把「被觀看」改成「被啟發」。"
   },
   "D": {
    "why": "正確。第 3 段：兒童看恐怖片，日後成年較可能出現焦慮，也可能對真實暴力較不敏感、更能接受攻擊。這是長期影響；說可能影響性格是由這些說法所做的推論，選項用 may，語氣與文章的證據程度相當。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "exposure",
    "pos": "n.",
    "zh": "接觸、暴露",
    "note": "第 3 段 exposure to graphic violence：長期接觸血腥暴力內容。動詞 expose。",
    "coll": [
     "exposure to sth"
    ]
   },
   {
    "type": "word",
    "t": "aggression",
    "pos": "n.",
    "zh": "攻擊（行為）、侵略",
    "note": "第 3 段 more accepting of aggression；形容詞 aggressive（好攻擊的，文章選項 (A) 用到）。"
   },
   {
    "type": "word",
    "t": "sensitive",
    "pos": "adj.",
    "zh": "敏感的",
    "note": "第 3 段 more sensitive to anxiety / less sensitive to real-life violence：對某事物較敏感／較不敏感。名詞 sensitivity。",
    "coll": [
     "be sensitive to sth"
    ]
   },
   {
    "type": "word",
    "t": "graphic",
    "pos": "adj.",
    "zh": "（描寫）生動露骨的",
    "note": "graphic violence：血腥、毫不修飾的暴力畫面，與「圖形」的意思不同。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段（依據句）：14 歲以下的兒童看恐怖片，日後成年發展出焦慮的機率較高。更糟的是，接觸血腥的暴力與流血畫面，可能讓他們對現實中的暴力較不敏感，並更能接受攻擊行為。\n第 2 段末：疫情期間，恐怖片與疫情驚悚片是數位電影應用程式上觀看次數最多的電影。\n題目與正確選項：從本文可以推論出下列哪項關於恐怖片的敘述？(D) 觀看恐怖片可能對人格有長期影響。",
  "aiFlags": [
   "(D) 的證據僅限 14 歲以下兒童，且 personality 一詞在文中未出現，是出題者對「焦慮傾向與對暴力的態度」的概括；答案維持官方答案 (D)，屬最接近的推論。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-42": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "這是寫作手法／組織題，要看各段的功能而不是內容細節：第 1 段先說恐怖片有人怕、有人愛，並指出新研究釐清「benefits and risks」。",
   "第 2 段列出好處（One benefit … Secondly … In addition），第 3 段 However 轉折，列出負面影響（negative effects … Furthermore … Finally）。全文就是同一議題「看恐怖片」的正反兩面。",
   "比較其他選項：(A) 全文雖然用「safe fear」，但只是第 2 段的一個用語，不是全文用定義與例子在說明一個概念；(C) 第 3 段雖有因果（看片→失眠），但全文不是在講一個問題的成因與結果；(D) 文章沒有提供解決爭議的步驟。"
  ],
  "options": {
   "A": {
    "why": "第 2 段確實提到「so-called safe fear」並解釋，但它只是三個好處中的第一個，且之後的段落轉向壞處。全文不是圍繞單一概念下定義再舉例，所以只涵蓋一小部分。"
   },
   "B": {
    "why": "正確。第 1 段預告「benefits and risks」；第 2 段談好處（safe fear、vicarious learning、therapeutic）；第 3 段以 However 轉折談壞處（焦慮、創傷、睡眠、兒童）。這是呈現同一議題的對立面向。"
   },
   "C": {
    "why": "第 3 段有「恐懼殘留→睡不著→疲倦易怒」這類因果，但這是壞處中的一項。全文也同時談好處，不是把某個問題當中心去談原因與結果，所以不是整體的組織方式。"
   },
   "D": {
    "why": "文章沒有談到雙方爭論或如何調解，也沒有步驟式的說明；只是呈現研究發現的好處與風險。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "revolve around",
    "zh": "以……為中心、圍繞",
    "note": "第 2 段 One benefit … revolves around the concept of 'safe fear'：其中一個好處與「安全的恐懼」這個概念有關。",
    "coll": [
     "revolve around sb/sth"
    ]
   },
   {
    "type": "word",
    "t": "untangle",
    "pos": "v.",
    "zh": "釐清、解開（纏結的事物）",
    "note": "第 1 段 untangle the benefits and risks：把好處與風險理清。原意是解開纏結。"
   },
   {
    "type": "word",
    "t": "however",
    "pos": "adv.",
    "zh": "然而",
    "note": "第 3 段 However 標示從好處轉到壞處，是判斷「正反兩面」的關鍵。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段：新的研究開始釐清恐怖片的好處與風險。\n第 2 段：恐怖片的好處包括「安全的恐懼」、間接學習與情緒釋放。\n第 3 段：然而，研究者也發現恐怖片對某些人有負面影響，如焦慮、創傷、睡眠受擾，以及對兒童的影響。\n題目與正確選項：作者如何發展本文的想法？(B) 呈現一個議題的對立觀點。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-43": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "先看第 1 段怎麼鋪陳：Russia is widely portrayed as the most alcohol-dependent country … Critics say drinking is almost an inherent trait of the Russian people. However, there is more to the story. 「However」後預告接下來要提出不同的說法，也就是對「喝酒是俄羅斯人與生俱來的特質」的質疑。",
   "再看第 2 段內容：古代俄羅斯很少喝酒類飲料（unusual）；基督教傳入前沒有葡萄園，所以沒有葡萄酒；人們只喝低酒精飲料；伏特加不是俄羅斯人發明的，源自 14 世紀末從法國傳入的葡萄酒精，15 世紀才有俄羅斯自製的伏特加，直到 18 世紀中葉酒精含量都還相對低。這些全是在反駁「俄羅斯人天生愛喝酒」。這是對第 1 段與第 2 段的連結：文章明說第 2 段的事實，「為了反駁」是依 However 與內容做的推論。",
   "比較選項：(A) 談古代歐洲酒類內容，範圍錯誤（談的是俄羅斯）；(B) 法國的影響只是其中一個事實；(D) 基督教只是用來標示時間點，並未說伏特加消費與基督教有關。"
  ],
  "options": {
   "A": {
    "why": "第 2 段談的是古代「俄羅斯」的酒類，不是歐洲整體；第 3 段才提到中世紀歐洲（德國人）。而且段落重點不是「酒的內容成分」，而是說明飲酒並不是俄羅斯人與生俱有的習慣。"
   },
   "B": {
    "why": "第 2 段確實提到 vodka 原本是從法國傳入的葡萄酒精，但這只是證明「伏特加不是俄羅斯的發明」的一個細節；整段還包括沒有葡萄園、只喝低酒精飲料、酒精含量長期偏低，不是只在強調法國的影響。"
   },
   "C": {
    "why": "正確。第 1 段批評者說飲酒近乎俄羅斯人的天性，並以 However 預告還有另一面；第 2 段用古代俄羅斯很少飲酒、沒有葡萄酒、伏特加是外來的且酒精度低等事實，質疑這個想法，所以目的是反駁「俄羅斯人天生愛喝酒」。"
   },
   "D": {
    "why": "文章只用 Before the adoption of Christianity 作為時間點（那時還沒有葡萄園、沒有葡萄酒）。並沒有說基督教使俄羅斯人喝更多伏特加，所以不存在「將伏特加消費與基督教連結」。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "inherent",
    "pos": "adj.",
    "zh": "與生俱來的、固有的",
    "note": "第 1 段 an inherent trait：天生的特質；與 born drinkers 的意思相呼應。",
    "coll": [
     "inherent in sth",
     "an inherent part of"
    ]
   },
   {
    "type": "word",
    "t": "portray",
    "pos": "v.",
    "zh": "描繪、刻畫",
    "note": "第 1 段 widely portrayed as：普遍被描繪成。",
    "coll": [
     "portray A as B"
    ]
   },
   {
    "type": "word",
    "t": "vineyard",
    "pos": "n.",
    "zh": "葡萄園",
    "note": "第 2 段 there were no vineyards and therefore no wine：沒有葡萄園，因此沒有葡萄酒。"
   },
   {
    "type": "word",
    "t": "content",
    "pos": "n.",
    "zh": "含量、內容",
    "note": "第 2 段 low alcohol content：酒精含量低。注意這裡重音在第一音節，與形容詞 content（滿足的）不同。",
    "coll": [
     "alcohol content",
     "the content of sth"
    ]
   },
   {
    "type": "word",
    "t": "assumption",
    "pos": "n.",
    "zh": "假定、假設",
    "note": "選項 (C) 中的 the assumption that…：認為……的想法，常是被質疑的。動詞 assume。",
    "coll": [
     "the assumption that…"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段：俄羅斯被普遍描繪成世界上最依賴酒精的國家。批評者說喝酒幾乎是俄羅斯人與生俱來的特質。然而，事情並不止於此。\n第 2 段：古代俄羅斯很少喝含酒精的飲料。在俄羅斯接受基督教（10 世紀）之前，沒有葡萄園，因此沒有葡萄酒，人們只喝酒精含量低的飲料。伏特加不是俄羅斯人發明的，原本是 14 世紀末從法國傳入的葡萄酒精。俄羅斯自製的伏特加在 15 世紀出現，一直到 18 世紀中葉，酒精含量都相對較低。\n題目與正確選項：本文第 2 段的主要目的是什麼？(C) 反駁俄羅斯人天生愛喝酒的假設。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-44": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "true/false 題，逐項回文章查證。與伏特加生產有關的資訊主要在第 2 段（起源與傳入）、第 3 段（德國人）與第 4 段（19 世紀國家壟斷）。",
   "(A) 第 2 段：The first Russian-made vodka appeared in the 15th century，所以俄羅斯的伏特加生產始於 15 世紀，符合。",
   "(B) 第 2 段說伏特加原本是從法國傳入的 grape alcohol（葡萄酒精），沒有提到小麥，所以「用小麥做的第一款伏特加」是文章沒有的資訊。(C) 第 3 段說中世紀歐洲最會喝酒的是德國人，是喝的量，不是產量。(D) 第 4 段說 19 世紀國家壟斷，只有政府可以生產，並非鼓勵人民自己做。"
  ],
  "options": {
   "A": {
    "why": "正確。第 2 段明說 The first Russian-made vodka appeared in the 15th century，即俄羅斯的伏特加生產始於 15 世紀。"
   },
   "B": {
    "why": "第 2 段說伏特加最初是 a grape alcohol introduced from France，是用葡萄做的酒精，文章完全沒有提到小麥；也沒說「第一個」是用什麼原料。選項改了原料，是文章中沒有的資訊。"
   },
   "C": {
    "why": "第 3 段只說 The heaviest drinkers in medieval Europe were actually Germans，指的是喝最多，而不是生產最多；文中也沒有說德國生產伏特加。"
   },
   "D": {
    "why": "第 4 段說 19 世紀皇帝建立國家壟斷，because of illegal production of low-quality vodka，只有政府被允許生產。這與「鼓勵民眾自己製作」相反。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "monopoly",
    "pos": "n.",
    "zh": "壟斷、專賣",
    "note": "第 4 段 a state monopoly：由國家獨占生產與販賣；常見 have a monopoly on sth。",
    "coll": [
     "a monopoly on/of sth",
     "state monopoly"
    ]
   },
   {
    "type": "word",
    "t": "medieval",
    "pos": "adj.",
    "zh": "中世紀的",
    "note": "第 3 段 medieval Europe；名詞 the Middle Ages 指同一時期。"
   },
   {
    "type": "word",
    "t": "indulge",
    "pos": "v.",
    "zh": "沉溺、放縱",
    "note": "第 3 段引文 indulge in excessive drinking：沉溺於過度飲酒。常用 indulge in sth。",
    "coll": [
     "indulge in sth"
    ]
   },
   {
    "type": "word",
    "t": "contradictory",
    "pos": "adj.",
    "zh": "互相矛盾的",
    "note": "第 3 段 contradictory information：互相衝突的資訊；動詞 contradict，名詞 contradiction。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段：伏特加是俄羅斯的國民飲料，但不是俄羅斯人發明的。這種液體原本是 14 世紀末從法國傳入的葡萄酒精。第一款俄羅斯製的伏特加出現在 15 世紀，直到 18 世紀中葉，這種飲料的酒精含量都還相對較低。\n第 3 段：中世紀歐洲喝得最多的人其實是德國人。\n第 4 段：19 世紀皇帝開始建立國家壟斷，只有政府被允許生產這種酒。\n題目與正確選項：關於伏特加生產，下列何者正確？(A) 俄羅斯的伏特加生產始於 15 世紀。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-45": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "指涉題先找 This 所在的句子與前一句：「Thus, only the government was permitted to produce the alcohol. This soon filled the state treasury with huge revenues, but it also encouraged vodka consumption.」",
   "Thus 句是第 1 句 state monopoly 的結果說明：只有政府可以生產。This 指整個這項安排，也就是 state monopoly（國家壟斷）；它帶來國庫的龐大收入，也助長伏特加的消費。",
   "逐項檢查：This 單獨使用時通常指前面敘述的情況或做法，而不是某個人或機構，所以先排除 the government；酒（alcohol）本身不會「填滿國庫」；illegal production 是建立壟斷的原因，不是帶來國庫收入的東西。這題是語意回指，不是找唯一的字面名詞。"
  ],
  "options": {
   "A": {
    "why": "alcohol 在前一句 produce the alcohol 中出現，但是動作的受詞。「酒」本身不會 filled the treasury with revenues，也不會 encouraged vodka consumption。"
   },
   "B": {
    "why": "the government 是上一句的主詞，也能讓人聯想到國庫，所以是干擾選項。但 This 這個指示代名詞通常指前面所說的情況、做法，而非人或機構；語意上是「只有政府可以生產」這個安排使國庫增加收入並鼓勵飲酒。"
   },
   "C": {
    "why": "illegal production 在第 4 段第 1 句出現（largely due to the rise of illegal production），是建立壟斷的原因（因為非法生產興起），不是使國庫充滿收入、鼓勵飲酒的東西。"
   },
   "D": {
    "why": "正確。This 回指前面所說的 state monopoly（國家壟斷：只有政府能生產）。文章說這項做法很快使國庫收入豐厚，但也鼓勵了伏特加的消費。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "monopoly",
    "pos": "n.",
    "zh": "壟斷、專賣",
    "note": "第 4 段 a state monopoly；establish a state monopoly 指建立國家壟斷。",
    "coll": [
     "establish a monopoly",
     "have a monopoly on sth"
    ]
   },
   {
    "type": "word",
    "t": "treasury",
    "pos": "n.",
    "zh": "國庫",
    "note": "the state treasury：國家的財庫。注意不要和 treasure（寶藏）混淆。"
   },
   {
    "type": "word",
    "t": "revenue",
    "pos": "n.",
    "zh": "收入、歲入",
    "note": "多指政府或企業的收入；government revenue 為政府歲入。",
    "coll": [
     "tax revenue",
     "revenue from sth"
    ]
   },
   {
    "type": "phrase",
    "t": "fill A with B",
    "zh": "用 B 填滿 A",
    "note": "第 4 段 filled the state treasury with huge revenues。",
    "coll": [
     "fill A with B",
     "be filled with B"
    ]
   },
   {
    "type": "word",
    "t": "permit",
    "pos": "v.",
    "zh": "允許",
    "note": "第 4 段 only the government was permitted to produce：被動語態，只有政府被允許生產。",
    "coll": [
     "be permitted to V"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 4 段：19 世紀，皇帝開始建立國家壟斷，主要是因為劣質伏特加的非法生產增加。因此，只有政府被允許生產這種酒。這很快使國庫充滿龐大的收入，但也助長了伏特加的消費。\n題目與正確選項：第 4 段中的「This」指的是什麼？(D) 國家壟斷。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "114-46": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "先看最後一段（第 5 段）每句在做什麼：Meanwhile, a powerful anti-alcohol movement started in the 19th century（新增事實）；政策與公眾團體被建立（事實）；運動持續多年，但問題仍在；俄羅斯在人均飲酒量並非第一，但仍接近頂端（事實）。",
   "整段是在補充新的資訊：反酒精運動與目前的排名；沒有回頭總結前四段（沒有 In summary 之類的整合），也沒有提出新的預測。這是文章明說的內容，結論方式屬於功能判斷。",
   "比較選項：(B) 要重述前面主要想法，但這段是新資料；(C) 「the problem remains」是承接前面提過的酒精問題，不是新問題；(D) 全段只談過去與現況，沒有預測未來。因此 (A) 最適當。"
  ],
  "options": {
   "A": {
    "why": "正確。第 5 段以 Meanwhile 帶出 19 世紀的反酒精運動、政策與公眾組織，再說問題仍在，並指出俄羅斯的人均飲酒量並非第一但仍接近頂端；全是新增的事實與資料，用來收尾。"
   },
   "B": {
    "why": "總結主要想法需要重述前文（例如酒精並非俄羅斯人天性、國家壟斷助長消費）。第 5 段是另外補充反酒精運動與現況排名，沒有重述前面內容，所以不是總結。"
   },
   "C": {
    "why": "第 5 段說 the problem remains，這個「問題」指前面已談過的酒精（過度飲酒）問題，不是新提出的問題；段落是補充運動與現況，並沒有開啟新的討論。"
   },
   "D": {
    "why": "第 5 段用過去式與現在式談 19 世紀以來的運動與現狀，沒有 will、may 之類預測未來的語句，所以不是預測。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "movement",
    "pos": "n.",
    "zh": "（社會）運動",
    "note": "第 5 段 an anti-alcohol movement；a social movement、a political movement。",
    "coll": [
     "launch a movement",
     "a movement against sth"
    ]
   },
   {
    "type": "phrase",
    "t": "per capita",
    "zh": "每人平均",
    "note": "第 5 段 alcohol consumption per capita：人均酒精消費量。",
    "coll": [
     "GDP per capita"
    ]
   },
   {
    "type": "word",
    "t": "alcoholism",
    "pos": "n.",
    "zh": "酗酒、酒精成癮",
    "note": "第 5 段 the spread of alcoholism；由 alcohol + -ism 構成，指成癮狀態。"
   },
   {
    "type": "phrase",
    "t": "occupy first place",
    "zh": "位居第一",
    "note": "第 5 段 does not occupy first place：並未位居第一。occupy 在此指佔據某名次。",
    "coll": [
     "take/occupy first place"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 5 段：同時，19 世紀開始出現強大的反酒精運動，政府制定政策、成立公眾組織以防止酗酒在國內蔓延。這個運動持續多年，然而問題仍在。雖然俄羅斯在人均酒精消費量上並非第一，但仍接近榜首。\n題目與正確選項：作者在最後一段如何結束本文？(A) 提供進一步的事實。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-19",
  "reviewNotes": "2026-11-19 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-1": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-09",
  "reviewNotes": "2026-11-09 教師（負責人）確認:Q1 教學文字與 48 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-1.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "先觀察句型：such a + 形容詞 + 單數可數名詞 + that + 子句，表示「如此……以致於……」。空格需要一個形容詞修飾 schedule，而 that 後面的子句提供判斷答案的重要線索。",
   "後半句指出，安排市長的採訪需要花費數週時間，表示她的行程非常忙碌，可供安排訪談的時間有限。",
   "tight schedule 是常見搭配，表示「行程緊湊、時間安排缺乏餘裕」，符合前後句的因果關係，因此選 (B)。其餘選項無法合理解釋為何安排訪談需要數週。"
  ],
  "options": {
   "A": {
    "entry": "hasty-adj",
    "why": "hasty 表示「倉促的、草率的」，強調做事過於匆忙，可能缺乏充分考慮，例如 a hasty decision。它不表示行程安排很滿或缺乏空檔，因此無法合理解釋為何市長的採訪需要數週才能安排。"
   },
   "B": {
    "entry": "tight-adj",
    "why": "tight schedule＝行程緊湊,正好對應「要等好幾週才排得到訪談」。"
   },
   "C": {
    "entry": "diligent-adj",
    "why": "diligent 表示「勤勉的、用功的」，通常形容人或其工作、學習態度，例如 a diligent student。此處需要描述市長的行程是否緊湊，因此 diligent 不符合語意。"
   },
   "D": {
    "entry": "routine-adj",
    "why": "routine 表示「例行的、日常的」，強調行程屬於常態安排，並不表示時間已排滿。因此，無法解釋為何安排市長的採訪需要數週。"
   }
  },
  "words": [
   "tight-adj"
  ],
  "phrases": [
   "arrange-an-interview",
   "such-a-that"
  ],
  "patterns": [
   "such + a/an + 形容詞 + 單數可數名詞 + that + 子句\n意思：如此……以致於……\n例如：She has such a busy schedule that she rarely has time to relax.\n她的行程如此忙碌，以致於很少有時間放鬆。\n注意：名詞為複數或不可數時，句型結構需要相應調整。",
   "It takes + (人) + 時間 + to + 原形動詞\n意思：某人花費多少時間做某事。\n例如：It takes me two hours to finish my homework.\n我需要花兩個小時完成作業。\n注意：人稱受詞可以省略。"
  ],
  "grammar": "1. It takes weeks to arrange an interview with her.\n此句中的 it 是虛主詞，後面的 to arrange an interview with her 為真正的主詞，表示「安排與她的訪談需要花費好幾週」。\n2. such…that 表示「如此……以致於……」。\n本題使用 such a tight schedule that…，因為 tight 修飾單數可數名詞 schedule。\n3. 比較：\n・such a tight schedule that…（正確，常見）\n・so tight a schedule that…（文法上正確，但較正式、不常見）\n・so a tight schedule that…（錯誤）",
  "focus": "tight-adj",
  "zh": "這位市長的行程安排非常緊湊，以致於要花好幾個星期才能安排一次對她的採訪。",
  "aiFlags": [
   "hasty、diligent、routine 的詞條目前沒有原創例句(只有 tight 是完整詞條)。"
  ]
 },
 "115-2": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-11",
  "reviewNotes": "2026-11-11 教師（負責人）確認:Q2 教學文字與 41 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-2.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "but 表示轉折:現在擁有「專業」(professional)的工作室,代表先前的身分與「專業」相反。",
   "started as… 說明剛起步時的身分;從業餘到專業,是常見的成長過程。",
   "所以應選 amateur『業餘的』，與後面的 professional 形成最直接的語意對比。注意：四個選項都以母音音素開頭，因此前面的 an 不能作為判斷答案的依據。"
  ],
  "options": {
   "A": {
    "entry": "official-adj",
    "why": "official 是「官方的、正式的」,和 professional 不構成「業餘 vs. 專業」的對比。"
   },
   "B": {
    "entry": "instant-adj",
    "why": "instant 是「立即的、即溶的」,與職業身分無關。"
   },
   "C": {
    "entry": "amateur-adj",
    "why": "amateur 是「業餘的」,與後面的 professional 形成對比。"
   },
   "D": {
    "entry": "elementary-adj",
    "why": "elementary 可表示『初級的、基本的』，通常修飾程度、知識或教育階段，如 elementary level、elementary school；但 an elementary art designer 並不是自然的搭配，也不能表達『業餘設計師』的意思。"
   }
  },
  "words": [
   "amateur-adj"
  ],
  "phrases": [
   "of-her-own"
  ],
  "patterns": [
   "start as + 身分(起初是…)",
   "but 前後對比:professional ↔ amateur"
  ],
  "grammar": "a studio of her own:「a + 名詞 + of + 所有格 + own」＝她自己的工作室(等於 her own studio)。這個形式前面要用 a / an,不能寫成 a her own studio。",
  "focus": "amateur-adj",
  "zh": "珍一開始是個業餘的藝術設計師,但現在她擁有自己的專業工作室。"
 },
 "115-3": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-12",
  "reviewNotes": "2026-11-12 教師（負責人）確認:Q3 教學文字與 38 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-3.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "看後半句:這件事「吸引了超過十二位資格優良的 applicants(應徵者)」。",
   "學校釋出「教職缺額」才會有人來應徵,所以主詞要是「職缺」:teaching vacancy。",
   "其他三個名詞無法跟「吸引應徵者」形成因果,可以用這個因果關係檢查答案。"
  ],
  "options": {
   "A": {
    "entry": "career-n",
    "why": "career 是「職業生涯」,teaching career 是個人的教學生涯,不是「學校提供的缺額」,也不會吸引應徵者。"
   },
   "B": {
    "entry": "vacancy-n",
    "why": "teaching vacancy＝教職缺額,學校有缺額才會吸引應徵者。"
   },
   "C": {
    "entry": "expectation-n",
    "why": "expectation 是『期待、預期』；teaching expectation 在本句不能表示學校釋出的職缺，因此無法與 applicants 的應徵語境銜接。"
   },
   "D": {
    "entry": "inspiration-n",
    "why": "inspiration 是『靈感、啟發』；teaching inspiration 不能表示學校的職缺，因此不符合後面吸引 applicants 的語境。"
   }
  },
  "words": [
   "vacancy-n"
  ],
  "phrases": [
   "a-dozen",
   "well-qualified"
  ],
  "patterns": [
   "more than a dozen + 複數名詞（超過十二個……）"
  ],
  "grammar": "a dozen + 複數名詞＝十二個……；數字 + dozen + 複數名詞時，dozen 不加 -s，如 two dozen eggs。dozens of + 複數名詞則表示『數十個／好幾十個……』。本句 soon 是副詞，置於主要動詞 attracted 前：soon attracted。",
  "focus": "vacancy-n",
  "zh": "這所知名高中的教職缺額很快就吸引了超過十二位資格優良的應徵者。"
 },
 "115-4": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-12",
  "reviewNotes": "2026-11-12 教師（負責人）確認:Q4 教學文字與 40 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-4.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "先看 than ___ expected。四個選項都是副詞，因此不能只靠詞性排除，必須根據語意判斷。",
   "實際創造的利潤比『最初預期』的還高；空格修飾 expected，要表達『最初／起初預期』，因此需要 initially。",
   "initially 是『起初、最初』，initially expected＝『最初預期』，最符合本句；其他三個副詞的語意都不符合這個上下文。"
  ],
  "options": {
   "A": {
    "entry": "initially-adv",
    "why": "initially 是『起初、最初』；initially expected 表示『最初預期』，正好符合實際利潤與原先預期相比的語意。"
   },
   "B": {
    "entry": "genuinely-adv",
    "why": "genuinely 是『真誠地、確實地』。genuinely expected 在其他語境中可以表示『確實預期』，但本句要比較實際利潤與『最初的預期』，因此語意不符。"
   },
   "C": {
    "entry": "alternatively-adv",
    "why": "alternatively 是『或者、作為另一個選擇』，通常用來提出另一種方案或可能性；本句沒有『另一種預期』的語境，因此不符合。"
   },
   "D": {
    "entry": "fundamentally-adv",
    "why": "fundamentally 是『根本上、基本上』，不能表達『最初預期』的時間概念，因此不符合本句語意。"
   }
  },
  "words": [
   "initially-adv"
  ],
  "phrases": [],
  "patterns": [
   "far + 比較級 + than(遠比…)",
   "than (initially) expected＝比（最初）預期的……；這是比較結構中的常見省略形式"
  ],
  "grammar": "far 可加強比較級 more：far more profit＝多得多的利潤。than initially expected 是比較結構中的省略形式，表示『比最初預期的……』，可理解為 than was initially expected；initially 修飾 expected。Designed by a young engineer 是過去分詞片語，補充說明 the new product 是由一位年輕工程師設計的。profit 在本句作不可數名詞使用，因此用 more profit。",
  "focus": "initially-adv",
  "zh": "這項由一位年輕工程師設計的新產品，所創造的利潤遠高於最初的預期。"
 },
 "115-5": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-12",
  "reviewNotes": "2026-11-12 教師（負責人）確認:Q5 教學文字與 45 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-5.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "先看 a balanced ___ of fruit and vegetables。四個選項都是名詞，因此要根據名詞的意思以及和 fruit and vegetables 的搭配來判斷。",
   "句子談的是水果和蔬菜與健康的關係；consumption 可表示『食用、攝取』或『攝取量』，consumption of fruit and vegetables 符合這個語境。",
   "dimension 是『層面、尺寸』，integration 是『整合、融合』，provision 是『提供、供給』；三者雖都是名詞，但在本句『攝取蔬果有益健康』的語意下，都不如 consumption 合適。"
  ],
  "options": {
   "A": {
    "entry": "dimension-n",
    "why": "dimension 可表示『層面、面向、尺寸』。a dimension of something 在其他語境可以成立，但 balanced dimension of fruit and vegetables 無法表達『攝取蔬果』的意思，因此不符合本句健康語境。"
   },
   "B": {
    "entry": "integration-n",
    "why": "integration 是『整合、融合』，通常指把不同部分結合在一起。integration of fruit and vegetables 在適當上下文中並非文法錯誤，但本句重點是實際食用蔬果與健康的關係，因此 consumption 最合適。"
   },
   "C": {
    "entry": "provision-n",
    "why": "provision 是『提供、供給』，指提供某物的行為或安排。balanced provision of fruit and vegetables 在某些供應或政策語境中可以成立，但本句談的是食用蔬果與健康的關係，因此不選 provision。"
   },
   "D": {
    "entry": "consumption-n",
    "why": "consumption 可表示『食用、攝取』或『攝取量』；consumption of fruit and vegetables 表示食用／攝取水果與蔬菜，最符合本句語意。"
   }
  },
  "words": [
   "consumption-n"
  ],
  "phrases": [],
  "patterns": [
   "It has been confirmed that…(已證實…)",
   "a balanced diet＝均衡飲食",
   "consumption of + 名詞＝……的食用／消耗(例:consumption of fruit and vegetables、energy consumption)"
  ],
  "grammar": "It has been confirmed that… 中，It 是形式主詞，that 子句承載主要內容；has been confirmed 是現在完成式被動。a balanced consumption of fruit and vegetables 是名詞片語，中心名詞是 consumption，of fruit and vegetables 補充說明攝取的對象。a key element to good health 中的 to 是介系詞。",
  "focus": "consumption-n",
  "zh": "已經證實,均衡攝取水果與蔬菜是維持健康的關鍵要素。"
 },
 "115-6": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-13",
  "reviewNotes": "2026-11-13 教師（負責人）確認:Q6 教學文字與 40 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-6.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "句首先說 Timmy 生性害羞,又害怕公開露面,因此空格應表達他對『在眾多聽眾面前演講』感到害怕或畏懼。",
   "the thought of speaking before large audiences 是空格後面的受詞內容,意思是『在眾多聽眾面前演講這件事／這個念頭』。四個選項中,dread 能表達對這件未來可能發生的事感到強烈害怕,因此語意最符合。",
   "主詞 Timmy 是第三人稱單數,而且句子描述一般狀態,使用現在式,因此 dread 要變成 dreads。"
  ],
  "options": {
   "A": {
    "entry": "dread-v",
    "why": "dread 表示對可能發生、令人不安或不愉快的事情感到強烈害怕或憂慮。dreads the thought of speaking 在本句表示『一想到要演講就感到畏懼』,最符合前文 shy、afraid 的語境。"
   },
   "B": {
    "entry": "stress-v",
    "why": "stress 作動詞可表示『強調』,也有『使承受壓力』等用法;但 stresses the thought 在本句無法表達 Timmy『害怕演講』的心理,因此語意不合。"
   },
   "C": {
    "entry": "wander-v",
    "why": "wander 可表示『漫步、閒逛』,也可表示思緒飄移;某些用法中也能直接接受詞,例如 wander the streets。因此本題不選 wander 的理由不是文法限制,而是 wander the thought 無法表達『對這個念頭感到害怕』的意思。"
   },
   "D": {
    "entry": "escape-v",
    "why": "escape 可表示『逃離、逃脫、躲過』,而且可作及物動詞,例如 escape danger、escape notice。在本句若使用 escapes,無法表達 Timmy『對演講感到畏懼』的心理,因此語意不合。"
   }
  },
  "words": [
   "dread-v"
  ],
  "phrases": [
   "public-appearance"
  ],
  "patterns": [
   "dread the thought of + N / V-ing(一想到…就害怕)",
   "dread + N / dread + V-ing(害怕／很不想面對某事,例:dread the exam、dread speaking in public)"
  ],
  "grammar": "the thought of + V-ing 中,of 是介系詞,因此後面可接動名詞,例如 the thought of speaking。句首 As a shy boy afraid of making public appearances 中,as + 名詞片語可理解為『身為……』;在本句語境中也提供後面行為的原因背景,但不要簡化成所有 as + 名詞都等於 because。afraid of making public appearances 是形容詞片語,用來補充描述 boy;其中 of 是介系詞,後接 making。",
  "focus": "dread-v",
  "zh": "提米生性害羞,也害怕公開露面,因此一想到要在眾多聽眾面前演講就感到畏懼。"
 },
 "115-7": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-14",
  "reviewNotes": "2026-11-14 教師（負責人）確認:Q7 教學文字與 39 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-7.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "先看空格位置:his life’s ______ 中,life’s 是所有格,後面需要名詞;四個選項也都是名詞,因此本題主要要靠語意判斷。",
   "主句說 music is his life’s ______,後面的 which he has devoted himself to whole-heartedly 又補充說明,他一直全心全意投入這件事。整句描述的是音樂是他深深熱愛並長期投入的事物。",
   "passion 除了表示「熱情」,也可以表示一個人非常熱愛的事物。his life’s passion 在本句就是「他畢生熱愛的事物」,最符合上下文。"
  ],
  "options": {
   "A": {
    "entry": "resource-n",
    "why": "resource 是「資源」,指可供利用、提供幫助的事物。music is his life’s resource 在文法形式上未必無法成立,但在本句「全心投入、畢生熱愛」的語境中,resource 無法表達他對音樂的強烈熱愛,因此不選。"
   },
   "B": {
    "entry": "impact-n",
    "why": "impact 作名詞表示「影響、衝擊」。本題空格位於所有格 his life’s 之後,因此這裡若選 impact,會是名詞用法;但 music is his life’s impact 無法表達「音樂是他畢生熱愛並投入的事物」,語意不合。impact 在其他句子中也可以作動詞。"
   },
   "C": {
    "entry": "passion-n",
    "why": "passion 可表示強烈的熱情,也可以表示一個人非常熱愛的活動、事物或領域。本句的 his life’s passion 指「他畢生熱愛的事物」,配合後面的 devoted himself to whole-heartedly,最符合句意。"
   },
   "D": {
    "entry": "emphasis-n",
    "why": "emphasis 是「強調、著重、重點」,常見搭配如 put/place emphasis on something。雖然中文的「人生重點」乍看之下似乎能理解,但 music is his life’s emphasis 並不是本句要表達的自然意思,而且 devote himself to an emphasis 也不能表達「熱愛音樂並全心投入」的意思,因此 passion 最合適。"
   }
  },
  "words": [
   "passion-n"
  ],
  "phrases": [
   "devote-oneself"
  ],
  "patterns": [
   "devote oneself to + 名詞/V-ing(全心投入…)"
  ],
  "grammar": "which he has devoted himself to whole-heartedly 是非限定關係子句,which 指前面的 his life’s passion,也就是 music。devote oneself to + N/V-ing＝全心投入……;其中 to 是介系詞,因此後面可以接名詞或 V-ing。在 which he has devoted himself to 中,which 是介系詞 to 的受詞,而 to 留在關係子句末尾;較正式也可以寫成 to which he has devoted himself。whole-heartedly 是副詞,修飾 devoted himself,表示「全心全意地」。另外,be devoted to + N/V-ing＝致力於……;全心投入……。",
  "focus": "passion-n",
  "zh": "對這位新科鋼琴比賽冠軍而言,音樂是他畢生的熱愛,他一直全心全意投入其中。"
 },
 "115-8": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-14",
  "reviewNotes": "2026-11-14 教師（負責人）確認:Q8 教學文字與 37 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-8.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "先看句型:who shouted at passers-by and ______ them with glass bottles 中,shouted 和空格由 and 並列,共用主詞 who;四個選項也都是過去式,因此單靠文法無法選出答案。",
   "them 指前面的 passers-by,而 with glass bottles 表示使用的工具。整個語境需要一個表示「用玻璃瓶攻擊路人」的動詞。",
   "assault 表示攻擊、襲擊,assaulted them with glass bottles 正好符合「用玻璃瓶攻擊他們」的意思,因此選 (B)。後面的 was quickly arrested 可支持這是暴力事件的語境,但不能單靠「被逮捕」反推出答案。"
  ],
  "options": {
   "A": {
    "entry": "shatter-v",
    "why": "shatter 常表示「打碎、使碎裂」,也可以比喻使希望、信心等受到嚴重打擊。它並非絕對不能和人相關,但 shatter them with glass bottles 在本句無法自然表達「用玻璃瓶攻擊路人」,因此語意不合。"
   },
   "B": {
    "entry": "assault-v",
    "why": "assault 作動詞表示「攻擊、襲擊」,常指對人的暴力攻擊。本句 assaulted them with glass bottles 表示「用玻璃瓶攻擊他們」,最符合上下文。"
   },
   "C": {
    "entry": "overturn-v",
    "why": "overturn 可表示「翻倒、使翻覆」,也可表示「推翻、撤銷」決定或判決。它在某些語境可以涉及人或車輛,但 overturned them with glass bottles 無法自然表達本句「用玻璃瓶攻擊路人」的意思,因此不選。"
   },
   "D": {
    "entry": "condemn-v",
    "why": "condemn 常表示「強烈譴責」,也可表示「判處某人某種刑罰」。它本身可以接人,例如 condemn someone,但 condemned them with glass bottles 無法表達使用玻璃瓶進行身體攻擊,因此語意不合。"
   }
  },
  "words": [
   "assault-v"
  ],
  "phrases": [
   "drunk-driver"
  ],
  "patterns": [
   "assault + 人(+ with + 工具)(攻擊某人;用…攻擊某人)",
   "shout at sb.(對某人大喊／吼叫)"
  ],
  "grammar": "who shouted at passers-by and assaulted them with glass bottles 是修飾 the drunk driver 的關係子句。關係代名詞 who 在子句中作主詞。shouted 和 assaulted 都是過去式,由 and 並列,共用主詞 who。them 指前面的 passers-by。with glass bottles 中的 with 表示使用的工具,可理解為「用玻璃瓶」。主句是 The drunk driver was quickly arrested by the police,其中 was arrested 是被動語態。shout at sb. 常表示「對某人大喊／吼叫」,在生氣或責罵的語境很常見;shout to sb. 通常著重「大聲喊給某人聽」,例如距離較遠時。實際意思仍要看上下文。passer-by 的複數是 passers-by。",
  "focus": "assault-v",
  "zh": "那名對路人大吼、並用玻璃瓶攻擊他們的酒醉駕駛,很快就被警方逮捕了。"
 },
 "115-9": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-14",
  "reviewNotes": "2026-11-14 教師（負責人）確認:Q9 教學文字與 40 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-9.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "先看空格位置:had to 後面需要原形動詞,而四個選項都是原形動詞,因此不能只靠詞性判斷。",
   "句子描述公車站人很多,說話者必須穿過人群才能及時上車。elbow 作動詞可表示「用手肘推擠」,elbow one’s way through the crowd 就是「用手肘擠過人群」,非常符合這個具體情境。",
   "依官方答案應選 (C) elbow。不過 struggle one’s way through the crowd 在自然英文中也可以表示「費力地穿過人群」,因此不能把 (D) 說成文法錯誤或完全不能成立;本題的差別在於 elbow 更具體描寫用手肘推擠前進的方式。",
   "注意:官方答案為 (C) elbow,但 struggle one’s way through the crowd 在自然英文中也可以成立,表示「費力地穿過人群」。本題宜理解為官方答案偏向較具體的「用手肘擠過人群」,而不是把 struggle 視為錯誤用法。歷屆紀錄中的「干擾選項」只表示它在該官方試題中的角色,不代表這個英文用法本身錯誤。"
  ],
  "options": {
   "A": {
    "entry": "crash-v",
    "why": "crash 常表示猛烈撞擊、撞毀,也可以出現在 crash one’s way through 這類較強烈的表達中。因此不應說 crash 不能和 one’s way 搭配。不過在本題一般公車站人群的情境中,crash 帶有較猛烈、橫衝直撞的意味,不如 elbow 自然、具體。"
   },
   "B": {
    "entry": "tumble-v",
    "why": "tumble 常表示「跌倒、翻滾、滾落」。雖然英文的 one’s way 結構可以搭配許多動詞,但 tumble my way through the crowd 在本題要表達「主動在人群中擠出一條路」時並不自然,因此不選。"
   },
   "C": {
    "entry": "elbow-v",
    "why": "elbow 作動詞表示「用手肘推、擠」。elbow one’s way through the crowd 是很自然的說法,表示用手肘推擠著穿過人群;依官方答案,本題選 (C)。"
   },
   "D": {
    "entry": "struggle-v",
    "why": "struggle 作動詞可表示「掙扎、奮力」。struggle one’s way through the crowd 是成立的英文,可以表示「費力地穿過人群」。因此 (D) 並非文法錯誤,也不是毫無語意;只是它強調「前進很吃力」,沒有像 elbow 一樣具體指出「用手肘推擠」的動作。依官方答案,本題採 (C) elbow。"
   }
  },
  "words": [
   "elbow-v"
  ],
  "phrases": [
   "board-the-bus"
  ],
  "patterns": [
   "V + one’s way + 路徑(如 elbow / push / force / struggle one’s way through…:設法擠過、闖過、費力穿過…)",
   "so many + 複數可數名詞 + that 子句(如此多……以致於……)"
  ],
  "grammar": "There were so many people ... that ... 使用 so many + 複數可數名詞 + that 子句,表示「如此多……以致於……」。had to 後面接原形動詞,因此 had to elbow。my way through the crowd 中,through 表示穿過人群。in time to board the bus 表示「及時上車／在太晚之前趕上」;on time 則通常表示在預定或約定的時間點準時。",
  "focus": "elbow-v",
  "zh": "公車站的人太多了,我只好用手肘擠過人群,才能及時上車。"
 },
 "115-10": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-14",
  "reviewNotes": "2026-11-14 教師（負責人）確認:Q10 教學文字與 43 個教師審核項目已正式簽核通過。音檔的人工驗收狀態與適用的音檔版本,以 docs/gsat/signoffs/115-10.json 的 audio 區塊為準(本欄位不記載音檔通過數量)。",
  "key": [
   "先看空格位置:raised ______ concerns 中,空格修飾名詞 concerns;四個選項都是形容詞,因此不能只靠詞性判斷。",
   "前文是 deadly shootings,後文又說 tragic incidents,整句談的是致命槍擊事件所引發的重大憂慮,因此空格需要能表達「嚴重、重大」的形容詞。",
   "grave 作形容詞可表示「嚴重的、重大的」,grave concerns 是自然且較正式的說法,表示「深切／嚴重的憂慮」,最符合本句語意,因此選 (D)。"
  ],
  "options": {
   "A": {
    "entry": "swift-adj",
    "why": "swift 表示「迅速的、快速的」,例如 a swift response。本句 concerns 要表達的是對致命槍擊事件的「嚴重程度」,而不是憂慮發生得很快,因此 swift 不符合本句語意。"
   },
   "B": {
    "entry": "brutal-adj",
    "why": "brutal 可表示「殘暴的」,也可延伸表示「嚴酷的、不留情的」,例如 a brutal attack、brutal honesty。它描述的是殘酷、嚴酷的性質,而本句需要表達 concerns 的嚴重程度,因此 brutal 不合語意。"
   },
   "C": {
    "entry": "harsh-adj",
    "why": "harsh 可表示「嚴厲的、嚴酷的」,常用於 criticism、weather、conditions、treatment 等。本句需要表達的是「憂慮非常重大」,harsh 的語意重點並不符合,因此不選。"
   },
   "D": {
    "entry": "grave-adj",
    "why": "grave 作形容詞可表示「嚴重的、重大的」,語氣較正式。grave concerns 表示「深切／嚴重的憂慮」,與 deadly shootings、tragic incidents 的重大情境吻合,因此最適合。"
   }
  },
  "words": [
   "grave-adj"
  ],
  "phrases": [
   "raise-concerns"
  ],
  "patterns": [
   "raise concerns about…(引發對…的憂慮)",
   "prevent + 受詞 + from + V-ing(防止…發生)"
  ],
  "grammar": "Deadly shootings on US campuses have raised ... 中,have raised 是現在完成式;本句著重這些事件至今所造成的影響。how to prevent ... 是「疑問詞 how + to V」結構,表示「如何防止……」,整個片語作介系詞 about 的受詞。prevent such tragic incidents from happening again 使用 prevent + 受詞 + from + V-ing,表示「防止……發生」。such tragic incidents 中,such + 形容詞 + 複數名詞,表示「這類悲劇事件」。英式英文有時也可見 prevent + O + V-ing,但本課以 prevent + O + from + V-ing 為主要句型。",
  "focus": "grave-adj",
  "zh": "美國校園發生的致命槍擊事件,已引發對於如何防止這類悲劇再次發生的深切憂慮。"
 },
 "115-11": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "先看空格位置：前後各有逗號，句型是 “White rhinoceroses, ____, do the same thing”。拿掉空格後句子仍完整，表示空格是插入語。注意：四個選項（what is more / it turns out / in other words / all in all）在結構上都可以當插入語放在這裡，所以結構只能確認「這是個語篇標記」，無法排除任何選項，必須靠下一步的上下文功能判斷。",
   "看上下文：第 1 句說人類自古聚在一起分享最新消息，第 2 句才指出白犀牛也做同樣的事，這是一個新揭曉的事實。it turns out（結果發現／原來）的功能正是引出「事實揭曉」的內容。",
   "比較其他語篇標記：(A) what is more 是「再者」，用來在已說的論點上追加更強的論點，但前一句只是人類的習慣，犀牛的行為並非該論點的加碼。(C) in other words 用來重述前一句，但後句講的是犀牛，不是換句話說。(D) all in all 是「總而言之」，用來下結論，而這是第 1 段才剛開始。",
   "因此選 (B) it turns out，表示「（出乎意料地）原來白犀牛也這麼做」。"
  ],
  "options": {
   "A": {
    "why": "what is more＝而且、更重要的是，用來在已有論點之後追加一個更強的論點，英文中是自然的片語。但本句不是在補充前一句的論點，而是引出「白犀牛也這樣」的新發現，所以附加功能不合。"
   },
   "B": {
    "why": "it turns out＝結果發現、原來。常作插入語，用來引出事實揭曉的內容；放在 White rhinoceroses 之後，引出「原來白犀牛也這麼做」，與前句人類聚集分享消息形成呼應，語篇功能最合適。"
   },
   "C": {
    "why": "in other words＝換句話說，用來把前面說過的話換個方式再說一次。前一句講人類在營火、咖啡館聚會，本句講的是白犀牛，內容並非重述，所以功能不合。這是自然的片語，只是語篇功能不符。"
   },
   "D": {
    "why": "all in all＝總而言之，用於整理、歸納前文之後下結論。此處是文章第 1 段剛開始，還沒有可歸納的內容，因此不合。這個片語本身是自然的英文。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "it turns out",
    "zh": "結果發現；原來",
    "note": "可作插入語（White rhinoceroses, it turns out, ...），也可接 that 子句（It turns out that ...）。帶有「與預期不同」或「事實揭曉」的語氣。",
    "coll": [
     "It turns out that ...",
     "as it turns out"
    ]
   },
   {
    "type": "phrase",
    "t": "what is more",
    "zh": "而且；更重要的是",
    "note": "附加論點的連接語，語氣比 and 強，也可寫成 what's more。"
   },
   {
    "type": "phrase",
    "t": "all in all",
    "zh": "總而言之",
    "note": "用於總結全文或前面說的內容。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "White rhinoceroses, it turns out, do the same thing 中，it turns out 為插入語，前後用逗號隔開，拿掉後句子仍完整。do the same thing 的 the same thing 指前一句「聚在一起分享最新消息」這件事。",
  "zh": "原來白犀牛也做同樣的事，只是牠們選擇的聚會地點是一大堆糞便。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-12": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看空格位置：a smelly way to ____。to 後面需要原形動詞；由於空格後沒有直接受詞（直接接句點），優先檢查能在此語境中單獨使用、且語意合理的動詞。最後仍要靠上下文判斷，不能只靠有沒有受詞。",
   "看上下文：後句說科學家發現犀牛把訊息留在糞便裡，讓群體其他成員來聞，「就像人類在社群媒體留言」。可見糞便是犀牛傳遞訊息的方式。",
   "(C) communicate 可作及物或不及物動詞；本題 a way to communicate 中沒有直接受詞，因此此處採不及物用法（常見用法：communicate with sb、communicate sth to sb）。它與 leave messages、social media 的上下文呼應，所以選 (C)。",
   "排除：immigrate 雖是不及物動詞，結構上可接在 to 後面，但語意（移居）與留訊息無關；demonstrate、manipulate 通常要有受詞（demonstrate 少數情況可不及物，指示威，但與本文無關），且語意不合。"
  ],
  "options": {
   "A": {
    "why": "demonstrate＝展示、證明，是及物動詞，通常要有受詞（demonstrate sth），例如 a way to demonstrate their strength。此處空格後沒有受詞，且上下文談的是傳遞訊息，不是展示什麼，所以不合。"
   },
   "B": {
    "why": "immigrate＝（從外國）移入、移居，是不及物動詞，文法上可接在 to 後面，但語意與犀牛用糞便留言完全無關，所以不合。"
   },
   "C": {
    "entry": "communicate-v",
    "why": "communicate＝溝通、傳達資訊。communicate 可作不及物動詞（communicate with sb），也可作及物動詞（communicate information / communicate sth to sb）；本題 a way to communicate 中沒有直接受詞，因此此處採不及物用法。後文 leave messages in their poop、leave their poop in the same place for ... to smell 都在說傳遞訊息，語意最合。"
   },
   "D": {
    "why": "manipulate＝操縱、操控，是及物動詞，後面要接受詞，如 manipulate public opinion。文章並未說犀牛操控什麼，所以不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "communicate",
    "pos": "v.",
    "zh": "溝通；傳達",
    "note": "可作不及物（communicate with sb）或及物（communicate sth to sb）。名詞為 communication。",
    "coll": [
     "communicate with sb",
     "communicate sth to sb"
    ]
   },
   {
    "type": "word",
    "t": "manipulate",
    "pos": "v.",
    "zh": "操縱；操弄",
    "note": "及物動詞，常含貶義，如操縱輿論、操縱他人。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "a smelly way to communicate 中，to communicate 是不定詞，修飾名詞 way，表示「……的方式」。communicate 可作及物或不及物動詞；此處後面沒有直接受詞，所以是不及物用法。",
  "focus": "communicate-v",
  "zh": "一項新研究指出，犀牛有一種氣味強烈的溝通方式。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-13": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "看空格位置：provide important ____ about the age, sex, general health... 空格是 provide 的受詞，要選複數名詞，且後面接 about，表示「關於……的資訊」。",
   "看上下文：不同犀牛在糞便中留下不同化學物質，讓其他犀牛得知年齡、性別、健康與生殖狀況。也就是化學物質「提供資訊／線索」。",
   "clue 作「線索、提示」，provide clues about sth 是自然的搭配，表示藉此推知某事，因此選 (D)。",
   "排除：doubts 是疑慮，icons 是圖示／偶像，matches 是火柴／比賽／配對，都不能表示「透過化學物質獲得關於對方的資訊」。"
  ],
  "options": {
   "A": {
    "why": "doubts＝疑慮、懷疑。doubts about sth 本身是自然搭配（如 raise doubts about），但化學物質「提供疑慮」不合邏輯，文章說的是讓犀牛得知對方的狀況。"
   },
   "B": {
    "why": "icons＝圖示、偶像。糞便中的化學物質不是圖示，也無法用 icons about age 表達「關於年齡的資訊」，搭配與語意皆不合。"
   },
   "C": {
    "why": "matches＝比賽、配對、火柴。provide matches about age 語意與搭配皆不合，matches 與「關於年齡、性別的資訊」無關。"
   },
   "D": {
    "why": "clues＝線索、提示。provide clues about... 表示「提供關於……的線索」，正好說明犀牛可從化學物質推知對方的年齡、性別、健康與生殖狀況，語意與搭配都最合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "clue",
    "pos": "n.",
    "zh": "線索；提示",
    "note": "可數名詞，常用 a clue to / about sth。與 evidence（證據）相比，clue 較偏向「可用來推知答案的提示」，並不一定足以證明。",
    "coll": [
     "provide clues about sth",
     "a clue to the mystery",
     "have no clue"
    ]
   },
   {
    "type": "word",
    "t": "reproductive",
    "pos": "adj.",
    "zh": "生殖的",
    "note": "reproduce（v.）→ reproductive（adj.）→ reproduction（n.）。"
   },
   {
    "type": "word",
    "t": "specific",
    "pos": "adj.",
    "zh": "特定的；明確的",
    "note": "each specific rhino 指「每一隻特定的犀牛」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "which provide important clues about ... 是非限定關係子句，which 的先行詞是前面的 chemicals（複數），所以動詞用 provide，不是 provides。",
  "zh": "此外，不同的犀牛會在糞便中留下不同的化學物質，這些物質提供了關於每隻犀牛的年齡、性別、整體健康與生殖狀況的重要線索。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-14": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "看空格結構：it is ____ that they will fight。這是虛主詞 it 的句型，that 子句 they will fight 才是真正的主詞，空格需要形容詞（片語）來評論「他們會打架」這件事。",
   "看前一句：When all members in a group know what’s going on with each other，也就是全體成員都清楚彼此的狀況，而上一句還說這對群體的和平與和諧很重要。",
   "因此推論：彼此資訊透明時，會打架的可能性降低，用 less likely 最合，表示「不太可能打架」，也呼應 peace and harmony，選 (D)。",
   "其他選項：hardly surprising 是「一點也不令人驚訝」，放入後變成「牠們打架也不意外」，與上文的和平相反。more acceptable 與 truly important 的語意與「是否會發生」無關。"
  ],
  "options": {
   "A": {
    "why": "hardly surprising＝幾乎不令人驚訝。it is hardly surprising that they will fight＝牠們會打架並不令人意外，語意正好與上句「對和平與和諧很重要、大家知道彼此狀況」相反。這個片語本身是自然的英文，但放在本題語境不合。"
   },
   "B": {
    "why": "more acceptable＝更可被接受。it is more acceptable that they will fight 的意思是「牠們打架比較可以被接受」，文章並沒有討論打架是否可接受，與上下文無關。"
   },
   "C": {
    "why": "truly important＝真的很重要。it is truly important that they will fight 表示「牠們會打架這件事很重要」，與上文強調和平和諧相反，也不合邏輯。"
   },
   "D": {
    "why": "less likely＝比較不可能。it is less likely that they will fight 表示「牠們比較不可能打架」，與前文「彼此了解狀況→和平和諧」因果相承，最合。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "it is less likely that ...",
    "zh": "……的可能性比較低",
    "note": "虛主詞 it 句型，that 子句為真正主詞。同類結構：it is likely / unlikely / possible that ...。",
    "coll": [
     "be less likely to V",
     "be more likely to V"
    ]
   },
   {
    "type": "phrase",
    "t": "what’s going on",
    "zh": "發生什麼事",
    "note": "what is going on with sb 可表示某人的近況或發生了什麼事。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "it is + 形容詞 + that 子句（虛主詞）\n意思：……是（很可能／不可能／令人驚訝…）的\n例如：It is unlikely that it will rain tomorrow.（明天不太可能下雨。）\n注意：that 子句才是真正的主詞，it 只是形式上的主詞；likely 另可用 be likely to V，但 it is likely that ... 也是常見用法。"
  ],
  "grammar": "When all members in a group know ..., it is less likely that they will fight 中，When 子句為副詞子句，表時間（帶有條件意味），主句用 it 作虛主詞，that they will fight 才是真正的主詞。what’s going on with each other 為名詞子句，作 know 的受詞。",
  "zh": "當群體中所有成員都知道彼此的狀況時，牠們打架的可能性就比較低。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-15": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "看空格位置：dominant males are particularly ____ the “fake poop” that carries chemicals from females ready to mate。空格是形容詞＋介系詞的組合，要看搭配。",
   "看上下文：後一句說公犀牛聞得更久、更常回到同一個地方，是在蒐集交配機會的資訊。研究人員（The researchers，第 2 句 They 所指）觀察到公犀牛對帶有母犀牛化學物質的假糞便「特別有反應、特別感興趣」。",
   "be responsive to＝對……有反應，與 react 的語意相呼應，且搭配正確，選 (A)。",
   "排除：annoyed at 是被惹惱，與「聞得更久、常回來」相反；considerate of 是體貼（人），對象應是人；tolerant with 的標準搭配是 tolerant of / toward，且語意是「容忍」，也不合。"
  ],
  "options": {
   "A": {
    "why": "responsive to＝對……有反應、反應靈敏。be responsive to sth 是標準搭配，與前面 how different rhinos would react 及後句「聞得更久、更常回來」完全呼應。"
   },
   "B": {
    "why": "annoyed at＝對……感到惱怒。annoyed at sth 的搭配本身自然，但後句說公犀牛聞更久、更常回到同一地點，表現的是感興趣而非惱怒，語意不合。"
   },
   "C": {
    "why": "considerate of＝體貼、顧慮。be considerate of 後接人或其感受、需要（considerate of others’ feelings）；用來描述對（假）糞便的反應，語意與搭配都不合。"
   },
   "D": {
    "why": "tolerant with＝搭配不自然；標準搭配是 tolerant of / toward（容忍）。即使改成 tolerant of，「容忍」假糞便也與牠們積極聞的行為不合，所以不選。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "be responsive to",
    "zh": "對……有反應",
    "note": "responsive 為形容詞，後接 to。可指對刺激、要求、需求有反應。名詞為 response，動詞為 respond（to）。",
    "coll": [
     "be responsive to the needs of sb",
     "responsive to treatment"
    ]
   },
   {
    "type": "word",
    "t": "dominant",
    "pos": "adj.",
    "zh": "佔優勢的；支配的",
    "note": "dominant males 指群體中地位較高的公犀牛。動詞為 dominate。"
   },
   {
    "type": "phrase",
    "t": "ready to mate",
    "zh": "準備好交配",
    "note": "形容詞＋to V；mate 在此是動詞，指動物交配。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "the “fake poop” that carries chemicals from females ready to mate 中，that 引導關係子句修飾 fake poop；ready to mate 修飾 females，表示「已準備好交配的雌性」。",
  "zh": "研究人員發現，居優勢地位的公犀牛對「假糞便」特別有反應，這種假糞便帶有來自已準備好交配的母犀牛的化學物質。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-16": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "看空格結構：Teahouses thus sprang up to ____ the weary travelers。to 後接原形動詞，且後面有受詞 the weary travelers，所以需要及物動詞。",
   "看上下文：前句說走在絲路上的人需要休息的地方，所以茶館如雨後春筍出現，並提供一杯茶讓他們恢復精力。因此茶館的目的是為疲憊旅人提供歇腳的空間、滿足他們的需要。",
   "accommodate＝容納、提供（住宿或歇腳）空間，滿足……的需要；主語是茶館，受詞是旅人，語意最合，選 (A)。",
   "排除：compensate sb for sth 雖然也可接受詞，但茶館並不是在補償旅人什麼損失，語意不合；anticipate 是預期、reinforce 是加強，皆不能表示為旅人提供歇腳處。"
  ],
  "options": {
   "A": {
    "why": "accommodate＝容納、提供（住宿或歇腳）空間，滿足需要。茶館為疲憊的旅人提供休息的地方，與前句 needed places to rest 對應，語意最合。"
   },
   "B": {
    "why": "compensate＝補償、彌補，常用 compensate sb for sth 或 compensate for sth。茶館並不是補償旅人什麼，也沒有說旅人受到損失，所以不合。"
   },
   "C": {
    "why": "anticipate＝預料、預期。anticipate the weary travelers 的語意是預期旅人會來，文法上成立；但茶館是「出現來接待」旅人（後面接 offering them a cup of tea 提供實際服務），不是預先料到旅人，所以不如 accommodate 合適。"
   },
   "D": {
    "why": "reinforce＝加強、增強，如 reinforce a wall、reinforce a message。茶館不是增強旅人，語意不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "accommodate",
    "pos": "v.",
    "zh": "容納；供……住宿；迎合",
    "note": "及物動詞，名詞為 accommodation。常見搭配 accommodate sb（容納某人）、accommodate sb’s needs（滿足某人的需求）。",
    "coll": [
     "accommodate guests",
     "accommodate sb’s needs"
    ]
   },
   {
    "type": "word",
    "t": "weary",
    "pos": "adj.",
    "zh": "疲倦的",
    "note": "weary travelers 指疲憊的旅人，較 tired 正式。"
   },
   {
    "type": "phrase",
    "t": "spring up",
    "zh": "（如雨後春筍般）出現",
    "note": "spring–sprang–sprung；指事物突然、迅速地出現。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "Teahouses thus sprang up to accommodate ... 中，to accommodate 是表示目的的不定詞。offering them a cup of tea to help them regain energy 是分詞構句，補充說明茶館做的事。",
  "zh": "茶館因此如雨後春筍般出現，以容納疲憊的旅人（滿足他們歇腳的需要），並提供他們一杯茶，幫助他們恢復精力。",
  "aiFlags": [
   "accommodate 有多個義項（容納、提供住宿、滿足需要），本句應解為「為旅人提供歇腳處、滿足其需要」，不是 receive 式的「接待」；詳解已避免用「接待」。另 (C) anticipate 文法也成立，只是語意不如 (A)，請老師確認說明是否足夠。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-17": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "看空格位置：But the culinary art of dim sum ____, for it was considered inappropriate to pair tea with food. 空格是主詞 the culinary art of dim sum 的動詞，且 for 後面說明原因：當時認為茶配食物不恰當。",
   "看時間線：前文講茶館出現的時期，後文 Centuries later 說幾百年後人們才知道茶能助消化，因此在此之前，點心的烹飪藝術「尚未發展」。",
   "had yet to develop 是 have yet to V 的過去式，表示「到（敘述的）那個過去時點為止還沒發展」；後面 for it was considered inappropriate... 正好說明還沒發展的原因，也與 Centuries later 的時序一致，選 (B)。",
   "排除：was fast developing 與 for 說明的原因矛盾；had almost developed 說快發展出來，與 Centuries later 才改觀不合；would hardly develop 文法可成立，但語氣是以過去為基準的預測（幾乎不會發展），不如 had yet to 貼切地描述「當時尚未發展」的事實。"
  ],
  "options": {
   "A": {
    "why": "would hardly develop＝幾乎不會發展。would 在此帶有「過去角度的推測」意味，英文中可成立，但它是從過去角度推測「不太可能發展」，而本句要說明的是歷史事實：當時點心藝術還沒出現，且 for 之後交代原因。had yet to develop 直接說「到那時尚未發展」，更貼合。"
   },
   "B": {
    "why": "had yet to develop＝尚未發展。have yet to V 表示到現在還沒做；過去式 had yet to V 把參照時間放在過去，表示到那個過去時點為止尚未。後面 for it was considered inappropriate... 說明原因，與 Centuries later 時序一致。"
   },
   "C": {
    "why": "was fast developing＝正快速發展中。與 for 後面說明「當時被認為不恰當」互相矛盾，也與 Centuries later 才改觀的時序不合。"
   },
   "D": {
    "why": "had almost developed＝幾乎已經發展出來。almost 暗示快成形，但後文只說因為不恰當而沒有，並未提到「接近成形」，且與 Centuries later 才變化的敘述不合。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "have yet to V",
    "zh": "尚未……",
    "note": "相當於 have not V-pp yet，但語氣較正式。過去式為 had yet to V。例：The project has yet to be completed.",
    "coll": [
     "have yet to decide",
     "have yet to see"
    ]
   },
   {
    "type": "phrase",
    "t": "pair A with B",
    "zh": "把 A 與 B 搭配",
    "note": "pair tea with food 指把茶與食物搭配在一起。"
   },
   {
    "type": "word",
    "t": "culinary",
    "pos": "adj.",
    "zh": "烹飪的",
    "note": "culinary art＝烹飪藝術。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "have yet to + 原形動詞\n意思：尚未……（到現在／到某個時間點為止還沒發生）\n例如：The company has yet to respond.（公司還沒有回應。）\n注意：過去的參照時間點用 had yet to（have yet to V 的過去式，不是過去完成式 had + p.p.）；have yet to 本身已含否定意味，不需要再加 not。"
  ],
  "grammar": "for it was considered inappropriate to pair tea with food 中，it 為虛主詞，to pair tea with food 為真正的主詞，be considered inappropriate＝被認為不恰當。for 在此是連接詞，表示補充說明原因。",
  "zh": "但是點心的烹飪藝術尚未發展，因為當時認為將茶與食物搭配是不恰當的。",
  "aiFlags": [
   "(A) would hardly develop 文法成立，與官方答案 (B) 的差別在語氣與時間參照（以過去為基準的預測 vs. 描述「當時尚未」的事實），請老師確認干擾項說明是否足夠。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-18": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "看空格位置：It is ____ an enjoyable dining experience that can span hours. 空格後是名詞片語，所以空格內要能形成「It is ___ be + 名詞」或「It is + 分詞片語 + 名詞」的結構，需逐項代入，並判斷哪個語意能說明 dim sum 與用餐體驗的關係。",
   "看上下文：前句說 Dim sum is more than just an example of Chinese cuisine，後句要說它還是一種怎樣的東西：本意是要成為一段愉快、可持續數小時的用餐體驗。",
   "meant to be＝本意是、被設計成，It is meant to be an enjoyable dining experience 表示它的原意或用意，語意最合，選 (D)。",
   "排除：passed on to 後要接人或對象；brought up as 用於人的成長；thought to have 之後會接「擁有」的受詞，變成「點心被認為擁有一段用餐體驗」，主詞是食物，語意不合。"
  ],
  "options": {
   "A": {
    "why": "passed on to＝傳給。It is passed on to an enjoyable dining experience 語意不通，後面需要接人或對象，而不是 experience。"
   },
   "B": {
    "why": "brought up as＝被養育成、被當作……長大，通常用於人，如 He was brought up as a Catholic。用在點心不自然，也和 enjoyable dining experience 搭不上。"
   },
   "C": {
    "why": "thought to have＝被認為有／擁有。be thought to have an enjoyable dining experience 在文法上成立，但意思變成「點心被認為擁有一段愉快的用餐經驗」。have an experience 描述的是人的經歷，不是食物的性質，本句要表達的是點心的設計用意，所以語意不合。"
   },
   "D": {
    "why": "meant to be＝本意是、被設計成。It is meant to be an enjoyable dining experience 表示點心本來就是要成為一段愉快的用餐體驗，與下一句 The small portions were designed to... 的設計意圖相呼應。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "be meant to V",
    "zh": "本意是……；應該……",
    "note": "表示設計意圖或預期用途，meant 是 mean 的過去分詞。例：This room is meant to be a library.",
    "coll": [
     "be meant for sb/sth",
     "be meant to be"
    ]
   },
   {
    "type": "word",
    "t": "span",
    "pos": "v.",
    "zh": "持續（一段時間）；橫跨",
    "note": "span hours＝持續好幾個小時；也可指橫跨某範圍。"
   },
   {
    "type": "word",
    "t": "cuisine",
    "pos": "n.",
    "zh": "菜餚；烹飪風格",
    "note": "Chinese cuisine＝中國料理。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "an enjoyable dining experience that can span hours 中，that 引導關係子句修飾 experience；dining 為動名詞作形容詞用，修飾 experience。",
  "zh": "它原本就是要成為一段可以持續數小時的愉快用餐體驗。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-19": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "看空格結構：The small portions were designed to merely “touch the heart,” ... and ____ were first enjoyed as snacks. 空格在 and 之後、were 之前，and 前後共用主詞 The small portions，所以空格是插入語式的片語，不會是帶新主詞的子句。",
   "as such 在本句可理解為「基於前述性質／以這樣的形式或定位」，概括前面對小份量、原本只是要 “touch the heart” 的描述，不必硬指定 such 一定回指哪一個名詞。句意：這些小份量的點心原本只是要「點到心坎」，也因此最初是作為小點心來享用的。",
   "因此 (B) as such 放在 and 與 were 之間，作插入語承接前述性質，語意與結構都通順，選 (B)。",
   "排除：if so 需要前面有疑問或條件；by then 需要前文有明確的時間點，此處沒有；in that 之後要有自己的主詞＋動詞，and in that were first... 缺主詞，結構不成立。"
  ],
  "options": {
   "A": {
    "why": "if so＝如果是這樣。通常用在前面提到問題或情況之後，如 Are you ready? If so, let’s go. 此處前面並沒有條件或疑問，所以不合。"
   },
   "B": {
    "why": "as such＝基於前述性質／以這樣的形式或定位。放在 and 與 were 之間作插入語，承接前面小份量、原本只是要「點到心坎」的描述，說明它們也因此最初是作為小點心享用，結構與語意都通順。such 概括前述性質，不需要硬指定單一先行詞。"
   },
   "C": {
    "why": "by then＝到那時候。by then 需要前文有明確的時間點，但前文只提到食物的份量與命名，並沒有時間點，所以不合。"
   },
   "D": {
    "why": "in that＝因為（引導子句）。in that 之後要有自己的主詞＋動詞，and in that were first enjoyed 缺少主詞，結構不成立。這個片語本身是自然的英文。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "as such",
    "zh": "以這樣的性質／定位；也因此",
    "note": "such 概括前面描述的性質、身分或定位。例：He is a teacher and, as such, he is respected.（他是老師，也因此受人尊敬。）as such 另有「嚴格說來、就其本身」的用法，常見於否定句（There is no rule as such.），與本句不同。",
    "coll": [
     "as such"
    ]
   },
   {
    "type": "word",
    "t": "portion",
    "pos": "n.",
    "zh": "份量；一份",
    "note": "small portions＝小份量；a portion of sth 指某物的一部分。"
   },
   {
    "type": "word",
    "t": "merely",
    "pos": "adv.",
    "zh": "僅僅；只是",
    "note": "與 only、just 近義，語氣較正式。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "A, and as such, B\n意思：A，而（基於 A 的性質或身分）B\n例如：She is a doctor and, as such, she is trusted by her patients.（她是醫生，也因此受病患信任。）\n注意：as such 的 such 概括前面所描述的性質、身分或定位，不一定是單一名詞。"
  ],
  "grammar": "and as such were first enjoyed as snacks 中，and 連接兩個動詞片語 were designed to... 與 were first enjoyed...，共用主詞 The small portions，as such 為插入語。as snacks 的 as 表示「作為」。",
  "zh": "點心的份量小，原意只是要「點到心坎」（這正是名稱的字面意思），也因此最初是作為小點心來享用的。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-20": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看空格位置：enjoy simple dishes together as ____。enjoy sth as ...＝把……當作……來享受，as 後接名詞片語，空格要能說明「一起吃」這件事是什麼性質的活動。",
   "看上下文：前文說點心是一段可持續數小時的愉快用餐體驗，小份量讓人點很多種，形成各種口味的盛宴；最後一句 Ultimately, dim sum—the food—is only a small part of the dim sum experience，表示重點不只是食物。",
   "big groups ... enjoy ... together 強調多人共享，且重點在經驗而非食物，因此 a joyful social activity（歡樂的社交活動）最合，選 (C)。",
   "排除：a widely known delicacy 與 an amazing local cuisine 只談食物本身；an intimate romantic dinner 與 big groups（大團體）矛盾。"
  ],
  "options": {
   "A": {
    "why": "a widely known delicacy＝廣為人知的美食。它只描述食物的知名度，與「大團體一起享用」的方式或性質無關，且與 Ultimately 一句「食物只是一小部分」的方向相反，所以不選。"
   },
   "B": {
    "why": "an intimate romantic dinner＝親密浪漫的晚餐。intimate romantic 指兩人世界，與 big groups（大團體）矛盾，所以不合。"
   },
   "C": {
    "why": "a joyful social activity＝歡樂的社交活動。big groups 一起享用簡單菜色，加上 Ultimately 一句說食物只是體驗的一小部分，表示重點在聚在一起共享的歡樂氣氛，因此最合。"
   },
   "D": {
    "why": "an amazing local cuisine＝令人驚豔的在地料理。這同樣只在強調食物本身，與下一句 the food is only a small part 相反，因此不合。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "it is customary for sb to V",
    "zh": "……習慣上會……",
    "note": "customary 為形容詞，it 為虛主詞，for sb 為不定詞的意義上主詞。",
    "coll": [
     "it is customary to V"
    ]
   },
   {
    "type": "word",
    "t": "ultimately",
    "pos": "adv.",
    "zh": "最終；說到底",
    "note": "常用於總結全文或強調最根本的一點。"
   },
   {
    "type": "word",
    "t": "banquet",
    "pos": "n.",
    "zh": "盛宴；宴會",
    "note": "a banquet of different tastes and flavors 是比喻，表示菜色豐富如盛宴。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "It is customary for big groups to enjoy simple dishes together as ... 中，it 為虛主詞，for big groups 是不定詞 to enjoy 的意義上主詞，to enjoy ... 才是真正的主詞。",
  "zh": "大團體習慣一起享用簡單的菜色，把它當作一種歡樂的社交活動。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-21": {
  "schema": 2,
  "answer": "E",
  "status": "reviewed",
  "key": [
   "空格前是 is by no means,by no means(絕不)後面可接形容詞(或名詞)當補語;本題空格前是 is,補語位置要填形容詞性成分。字庫形容詞有 (E) unproductive、(H) minimal、(I) dramatic。",
   "上下文線索:第 1 句問「對白天午睡感到有點罪惡感嗎?」,下一句 In fact 轉折說午睡是讓大腦和身體「recharge」。可見前一句要否定的是「午睡是浪費時間、沒有成效」,所以填 (E) unproductive,by no means unproductive 就是「絕不是沒有成效的」。",
   "排除:(H) minimal 意為「極少的」,by no means minimal 是「絕不是極少的」,無法回應「對午睡感到罪惡」這個問題;(I) dramatic 意為「戲劇性的、驚人的」,by no means dramatic 與「午睡是不是浪費時間」無關。只有表示「沒有成效、浪費時間」的 unproductive,經 by no means 否定後,才能接上 In fact 的「充電」說明。",
   "搭配:un- 表否定,by no means unproductive 為雙重否定,語氣肯定:午睡其實是有成效的。"
  ],
  "options": {
   "E": {
    "why": "形容詞,productive(有成效的)加否定字首 un-,表「沒有成效的、徒勞的」。與前文「罪惡感」呼應,by no means 否定它後,整句變成「午睡不是浪費時間」,並由 In fact 的充電說明補強。這是本題最合理的答案。"
   },
   "H": {
    "why": "minimal 是形容詞,詞性上可放在 is by no means 之後,文法成立。但意思是「最小的、極少的」,說午睡「絕不是極少的」無法回應前文的罪惡感,也和 In fact 之後談的充電無關,故不選。(minimal 另可見於第 29 題的搭配,僅為補充。)"
   },
   "I": {
    "why": "dramatic 是形容詞,詞性可行。但 by no means dramatic(絕不是戲劇性的)與「午睡是否浪費時間」無關,無法銜接 In fact 的充電說明;dramatic 與 benefits 搭配才自然。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "by no means",
    "zh": "絕不、一點也不",
    "note": "副詞片語,置於 be 動詞後修飾形容詞或名詞補語,語氣強烈否定;置句首時主詞與動詞要倒裝。",
    "coll": [
     "is by no means easy",
     "by no means a simple task"
    ]
   },
   {
    "type": "word",
    "t": "unproductive",
    "pos": "adj.",
    "zh": "沒有成效的、徒勞的",
    "note": "productive 的反義字;可指人、時間、會議等沒有產出。",
    "coll": [
     "an unproductive meeting",
     "unproductive time"
    ]
   },
   {
    "type": "word",
    "t": "recharge",
    "pos": "v.",
    "zh": "充電、恢復精力",
    "note": "可指電池充電,也可指人休息後恢復精神。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "在白天小睡片刻絕不是沒有成效的。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-22": {
  "schema": 2,
  "answer": "G",
  "status": "reviewed",
  "key": [
   "空格在 brain size and ___ 中,and 連接兩個對等成分,前面 brain size 是名詞,所以空格也要是名詞。分號後說明 it can boost our cognition and memory,所以要找與腦部運作能力有關的名詞。",
   "字庫名詞有 (C) atmosphere、(F) risk、(G) function;選 (G) function,brain function 指腦部功能,與後面的 cognition(認知)、memory(記憶)正好對應。",
   "排除:(F) risk 是「發生壞事的機率」,與 brain size 無法對等並列,也與後面 boost cognition and memory(能力提升)的正面語意不合;(C) atmosphere(氣氛)與腦部無關。其餘字庫字為動詞或片語動詞,不能放在 and 後與名詞並列。",
   "搭配:brain size and brain function 並列為研究午睡的兩個指標:大小(結構)與功能(運作)。"
  ],
  "options": {
   "G": {
    "why": "function 在此是名詞「功能、機能」,brain function 即腦部功能。後文 boost our cognition and memory 正是在說功能增強,語意一致。function 也可作動詞(運作),但本空格需要名詞。"
   },
   "F": {
    "why": "risk 是名詞,詞性可行,但 brain size and brain risk 不成對等並列:size 是腦的客觀屬性,risk 是「發生壞事的機率」,而且分號後 boost cognition and memory 說的是能力增強,與風險無關,故不選。(risk 另有更合適的位置,僅為補充。)"
   },
   "C": {
    "why": "atmosphere 是名詞(氣氛、大氣),但與腦部沒有語意關係,放在 brain size and atmosphere 不成並列,也無法對應 cognition 與 memory。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "function",
    "pos": "n.",
    "zh": "功能、機能",
    "note": "名詞指事物的作用或身體器官的運作;也可作動詞表示「運作」。",
    "coll": [
     "brain function",
     "kidney function"
    ]
   },
   {
    "type": "word",
    "t": "boost",
    "pos": "v.",
    "zh": "提升、促進",
    "note": "及物動詞,常接 confidence、sales、immune system 等。",
    "coll": [
     "boost memory",
     "boost one’s confidence"
    ]
   },
   {
    "type": "word",
    "t": "cognition",
    "pos": "n.",
    "zh": "認知(能力)",
    "note": "指思考、理解、記憶等心智歷程;形容詞為 cognitive。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "研究顯示,午睡與腦容量及腦功能有關;具體而言,它能增進我們的認知與記憶。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-23": {
  "schema": 2,
  "answer": "F",
  "status": "reviewed",
  "key": [
   "空格在 increases dementia ___ in later life 中,increases 是動詞,後面 dementia ___ 組成名詞片語當受詞,因此空格是名詞,與 dementia 形成複合名詞。",
   "上下文線索:前面說大腦從 20 歲出頭開始萎縮、認知變慢,後面說午睡能 lower the possibility of developing dementia(降低罹患失智症的可能性),顯示萎縮「增加」的是罹患失智症的「風險」。",
   "選定 (F) risk:dementia risk 就是失智風險,而且與後面 the possibility of developing dementia 相呼應。",
   "排除:(G) function 雖是名詞,但 dementia function 不是合理的複合名詞,也無法表達「增加罹患失智症的可能」,與後文 lower the possibility of developing dementia 無法呼應;(C) atmosphere 與疾病無關。"
  ],
  "options": {
   "F": {
    "why": "risk 在此是名詞「風險」,與 dementia 組成複合名詞 dementia risk(失智症風險)。後文 the possibility of developing dementia 是同一概念的改寫,可印證。"
   },
   "G": {
    "why": "function 雖是名詞,但 increases dementia function(增加失智症的功能)不是合理的複合名詞,也無法與後文 lower the possibility of developing dementia 呼應;這裡需要表示「增加罹患失智症的可能」。"
   },
   "C": {
    "why": "atmosphere 是名詞,但「失智症的氣氛」毫無意義,與上下文的健康議題無關。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "risk",
    "pos": "n.",
    "zh": "風險",
    "note": "可數或不可數;常用 the risk of + V-ing,或 risk 作複合名詞前半,如 cancer risk、heart disease risk。也可作動詞「冒險」。",
    "coll": [
     "increase the risk of",
     "lower one’s risk of"
    ]
   },
   {
    "type": "word",
    "t": "dementia",
    "pos": "n.",
    "zh": "失智症",
    "note": "指記憶與思考能力逐漸退化的疾病,不可數名詞。"
   },
   {
    "type": "word",
    "t": "shrink",
    "pos": "v.",
    "zh": "萎縮、縮小",
    "note": "文中 starts shrinking 為 start + 動名詞(亦可接 to shrink);shrinkage 為名詞「萎縮」,如 age-related brain shrinkage。三態 shrink - shrank - shrunk。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "大約在 20 歲出頭,我們的大腦開始萎縮,逐漸拖慢認知能力,並增加晚年罹患失智症的風險。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-24": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "空格前有 may significantly(副詞),空格後有 age-related brain shrinkage(名詞片語),所以空格是及物動詞的原形,當 may 之後的動詞。",
   "上下文線索:前一句說習慣午睡者的腦容量「better preserved」(保存較佳),且後面 thus lower the possibility of developing dementia。這表示午睡的作用是讓與年齡相關的腦萎縮「延後」,而不是加速。",
   "選定 (D) delay:delay shrinkage 即延緩萎縮;delay 是及物動詞,可直接接名詞。",
   "排除:(A) retain shrinkage 是「保留萎縮」,與 better preserved、lower dementia 方向相反;(B) depend on shrinkage 只能表示「取決於萎縮」,不是午睡對萎縮的作用;(J) point to shrinkage 只能表示「指出萎縮」,且 point to 多以研究、跡象、證據為主詞,napping may significantly point to... 搭配不自然,也不符前句「保存較佳」的因果鏈。"
  ],
  "options": {
   "D": {
    "why": "delay 是及物動詞「延遲、延緩」,delay shrinkage 表示讓腦萎縮較晚或較慢發生,符合 better preserved 與 lower the possibility of dementia 的因果鏈。"
   },
   "A": {
    "why": "retain 是及物動詞「保留、記住」,文法上可接名詞。但「午睡可能大幅保留腦萎縮」在邏輯上與 better preserved、lower the possibility of dementia 相反;retain 的語意適合「保留知識與技能」。"
   },
   "J": {
    "why": "point to 是片語動詞,可接名詞,文法上 may point to shrinkage 可成立(指出)。但 point to 多以研究、跡象、證據為主詞,napping may significantly point to... 搭配不自然;語意上本句要說午睡對萎縮的「作用」,不是「顯示萎縮」,故不選。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "delay",
    "pos": "v.",
    "zh": "延遲、延緩",
    "note": "及物動詞,後接名詞或動名詞(delay doing sth),不接不定詞。也可作名詞「延誤」。",
    "coll": [
     "delay a decision",
     "delay doing sth"
    ]
   },
   {
    "type": "word",
    "t": "age-related",
    "pos": "adj.",
    "zh": "與年齡有關的",
    "note": "過去分詞 related 組成的複合形容詞,如 age-related problems。"
   },
   {
    "type": "word",
    "t": "preserve",
    "pos": "v.",
    "zh": "保存、維持",
    "note": "文中 better preserved 為被動語態,表示腦容量保存得較好。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "這表示午睡可能大幅延緩與年齡相關的腦萎縮,因而降低罹患失智症的可能性。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-25": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "空格在 will help ___ acquired knowledge 之中,help 後面可接原形動詞(省略 to),所以空格是原形動詞,而 acquired knowledge and learned skills 是受詞。",
   "上下文線索:上一句說 naps can enhance memory and learning,本句以準備考試的學生為例,午睡對 acquired knowledge(已學得的知識)的作用應是「記住、保住」,與 memory 的主題連貫。",
   "選定 (A) retain:retain knowledge and skills 即保留、記住所學的知識與技能。",
   "排除:(D) delay acquired knowledge(延遲已學的知識)不通;(B) help depend on acquired knowledge 是「幫助依靠已學知識」,不是午睡的作用;(J) help point to knowledge 是「指向知識」,與承接 enhance memory and learning 的結果無關。只有 retain(保留、記住)與 memory 主題連貫。"
  ],
  "options": {
   "A": {
    "why": "retain 是及物動詞「保留、保持、記住」,常接 information、knowledge、memory。help retain acquired knowledge 即幫助保留已學的知識,正是承接 enhance memory and learning 的結果。"
   },
   "D": {
    "why": "delay 雖可作原形動詞,但 delay acquired knowledge(延遲已獲得的知識)語意不通,與「午睡增進記憶與學習」的上下文不合。"
   },
   "B": {
    "why": "depend on 是片語動詞,文法上雖可接在 help 後,但「幫助(學生)依靠已學知識」與午睡的功用無關,上下文要的是「記住、保留」,故不選。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "retain",
    "pos": "v.",
    "zh": "保留、記住",
    "note": "及物動詞,表示留住某物或把資訊保持在記憶中。名詞為 retention。",
    "coll": [
     "retain information",
     "retain water"
    ]
   },
   {
    "type": "word",
    "t": "cram",
    "pos": "v.",
    "zh": "填鴨式猛讀、臨時抱佛腳",
    "note": "cram for an exam 為考前抱佛腳;文中 cramming 為現在分詞,修飾 students。",
    "coll": [
     "cram for an exam"
    ]
   },
   {
    "type": "phrase",
    "t": "help (to) do sth",
    "zh": "幫助做某事",
    "note": "help 後的不定詞 to 可省略,help 後接原形動詞。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "help + (to) + 原形動詞\n意思:幫助…\n例如:Napping helps (to) retain knowledge. 午睡有助於記住知識。\n注意:to 可省略;help 也可接受詞再接原形動詞,如 help students (to) retain knowledge。"
  ],
  "grammar": "",
  "zh": "對於正在為大學考試猛 K 書的學生來說,午睡有助於保留已學得的知識與技能。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-26": {
  "schema": 2,
  "answer": "J",
  "status": "reviewed",
  "key": [
   "空格前是 while others,others 是複數主詞(指 other studies),需要複數現在式動詞,後面接名詞片語 shorter naps,所以空格是及物動詞或片語動詞原形。",
   "上下文線索:前半 Some studies recommend napping for 20 to 40 minutes,while 引出對比,others = other studies(另一些研究),後面接 shorter naps, such as 15 to 20 minutes。這裡需要複數現在式的動詞片語。",
   "選定 (J) point to:studies 作主詞時常搭配 point to(指向、顯示),others point to shorter naps 即另一些研究指向較短的午睡,補完 such as 15 to 20 minutes 的內容,與前半的 20 到 40 分鐘形成對比。",
   "排除:(B) depend on shorter naps 是「依賴較短午睡」,不是研究的內容;(D) delay shorter naps(延遲較短午睡)與研究提出的時間長度無關;(A) retain 是「保留」,同樣無法表示研究所指出的時間長度。"
  ],
  "options": {
   "J": {
    "why": "point to 為片語動詞,意思可為「指向;顯示、指出」。others point to shorter naps 即另一些研究指出較短的午睡(才是理想),與前面 recommend 並列、形成對比。"
   },
   "B": {
    "why": "depend on 的語意是「取決於、依賴」。others depend on shorter naps 變成「另一些研究依賴較短的午睡」,與前半「研究建議的時間長度」並列不成對比;depend on 最適合另一空格(第 27 題)的句意,僅為補充。"
   },
   "D": {
    "why": "delay 文法上可接 shorter naps(延遲較短的午睡),但語意是「拖延」,無法說明研究所指出的時間長度,與前半 recommend 的內容不能對比。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "point to",
    "zh": "指出;顯示;表明",
    "note": "後接名詞;可指手指向某物,也可指證據、研究「顯示」某事。主詞可為事物,如 Studies point to a link between A and B。",
    "coll": [
     "point to the evidence",
     "point to a problem"
    ]
   },
   {
    "type": "word",
    "t": "recommend",
    "pos": "v.",
    "zh": "建議、推薦",
    "note": "後接動名詞或 that 子句(that 子句動詞用原形或 should + 原形);recommend sb to do sth 偶見,但不可說 recommend to do sth;文中 recommend napping 即動名詞。",
    "coll": [
     "recommend doing sth",
     "recommend that sb (should) do sth"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "有些研究建議睡 20 到 40 分鐘,另一些研究則指向較短的午睡,例如 15 到 20 分鐘。",
  "aiFlags": [
   "while others ___ shorter naps 中,others 是省略名詞的代名詞(= other studies),point to 的主詞是研究而非人;point to 在此是「(證據)指向、顯示」,與用手指的用法不同,老師可補充 research、evidence、studies 常作其主詞。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-27": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "空格前有助動詞 may,所以空格是原形動詞(片語),後面接 a person’s physical condition and fatigue level 當受詞。",
   "上下文線索:however 插在主詞後表示轉折:前面各研究給出固定的分鐘數,這句改說最佳長度與個人條件有關;下一句 For some people, even a five-minute nap... 再舉例說明因人而異。因此空格要填「取決於」類的片語。",
   "選定 (B) depend on:The best nap length may depend on a person’s physical condition... 即最佳午睡長度可能取決於個人身體狀況與疲勞程度。",
   "排除:(J) point to 會變成「最佳午睡長度顯示個人狀況」,因果顛倒;(A) retain a person’s physical condition(保留身體狀況)與(D) delay a person’s physical condition(延遲身體狀況)都與「長度由什麼決定」無關。"
  ],
  "options": {
   "B": {
    "why": "depend on 表示「取決於、視…而定」。主詞 the best nap length(最佳午睡長度)是結果,後面的 physical condition and fatigue level 是決定因素,語意最貼切,也呼應 however 對前面各種建議的修正。"
   },
   "J": {
    "why": "point to 可接名詞,且 may point to 在文法上成立。但「最佳午睡長度顯示個人的身體狀況」因果顛倒,不符原意,也不能引出下一句「因人而異」的例子。"
   },
   "A": {
    "why": "retain 是及物動詞,文法上 may retain a person’s physical condition 可成立,但「保留身體狀況」與午睡長度的主題無關,語意不通。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "depend on",
    "zh": "取決於;依賴",
    "note": "後接名詞或 wh- 子句,也可寫成 depend on whether...;depend 為不及物動詞,不可直接接受詞。可用 rely on 表示「依賴」,但「取決於」常用 depend on。",
    "coll": [
     "It depends on...",
     "depend on sb for sth"
    ]
   },
   {
    "type": "word",
    "t": "fatigue",
    "pos": "n.",
    "zh": "疲勞",
    "note": "不可數名詞,fatigue level 即疲勞程度。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "然而,最佳的午睡時間可能取決於一個人的身體狀況與疲勞程度。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-28": {
  "schema": 2,
  "answer": "I",
  "status": "reviewed",
  "key": [
   "空格在形容詞位置:surprisingly ___ benefits 中,surprisingly 是副詞,benefits 是名詞,所以空格要填形容詞修飾 benefits。",
   "上下文線索:even a five-minute nap(連五分鐘的短睡)與 surprisingly(出乎意料地)構成「時間很短、效果卻很大」的反差,因此空格需填表示「效果大」的形容詞。",
   "選定 (I) dramatic:dramatic benefits 即顯著的好處,surprisingly dramatic 強調效果出乎意料地大。",
   "排除:(H) minimal(極小的)會取消這個反差,surprisingly minimal 變成「出乎意料地少」,與 even... can bring about 要強調的「短睡仍有效」相反;(E) unproductive benefits(沒有成效的益處)自相矛盾。"
  ],
  "options": {
   "I": {
    "why": "dramatic 是形容詞「戲劇性的、顯著的、驚人的」,dramatic benefits 指明顯又驚人的好處,與 even a five-minute nap 的強調語氣一致。"
   },
   "H": {
    "why": "minimal 是形容詞,文法上可修飾 benefits。但 surprisingly minimal benefits 是「出乎意料地少」,會取消「短睡、效果卻大」的反差,與 even... can bring about 的語氣相反。"
   },
   "E": {
    "why": "unproductive 是形容詞,詞性可行,但 unproductive benefits(沒有成效的益處)自相矛盾,不能說明短睡的效果。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "dramatic",
    "pos": "adj.",
    "zh": "戲劇性的;顯著的、驚人的",
    "note": "可指變化、效果、增加等「明顯而驚人」,副詞為 dramatically。",
    "coll": [
     "a dramatic change",
     "a dramatic increase"
    ]
   },
   {
    "type": "phrase",
    "t": "bring about",
    "zh": "帶來、引起",
    "note": "片語動詞,可接名詞作受詞,表示導致某種結果或變化。",
    "coll": [
     "bring about changes",
     "bring about a result"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "對某些人來說,即使只睡五分鐘,也能帶來出乎意料的顯著益處。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-29": {
  "schema": 2,
  "answer": "H",
  "status": "reviewed",
  "key": [
   "空格在 with ___ light 中,light 是名詞,前面空格要填形容詞修飾 light。後面 or with blackout curtains 表示「有…或有遮光窗簾」,兩者並列,都是製造黑暗的方式。",
   "上下文線索:with ___ light or with blackout curtains 兩者並列,都是製造黑暗的手段;遮光窗簾擋光,所以前面也應是光線極少。再對照前句 A dark space with little distraction is ideal,故選 minimal。",
   "選定 (H) minimal:minimal light 即極少的光線,與 dark space 一致。",
   "排除:(I) dramatic light 是「戲劇性的光線」,與「黑暗、少干擾」的環境描述不合;(E) unproductive light 不成搭配。"
  ],
  "options": {
   "H": {
    "why": "minimal 是形容詞「最小限度的、極少的」,minimal light 指幾乎沒有光線,正好呼應 dark space 與 blackout curtains,表示光線要降到最低。"
   },
   "I": {
    "why": "dramatic 是形容詞,詞性可行,dramatic light 在攝影或舞台領域也是自然用語(戲劇性光線)。但本句要找適合午睡的昏暗環境,與 dark space、blackout curtains 的語意相反,故不選。"
   },
   "E": {
    "why": "unproductive 是形容詞,但「沒有成效的光線」不成搭配,也無法與 blackout curtains 並列。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "minimal",
    "pos": "adj.",
    "zh": "最小的、極少的",
    "note": "指數量或程度降到最低,minimum 為名詞或形容詞(最低限度);minimal damage = 極輕微的損害。",
    "coll": [
     "minimal effort",
     "minimal risk"
    ]
   },
   {
    "type": "word",
    "t": "blackout curtains",
    "zh": "遮光窗簾",
    "note": "完全擋住光線的厚窗簾,blackout 為名詞作修飾語。"
   },
   {
    "type": "phrase",
    "t": "a ... with ...",
    "zh": "有…的…",
    "note": "with 引導伴隨特徵,find a quiet place with minimal light 即找一個光線極少的安靜地方。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "所以,幫自己找一個光線極少或裝有遮光窗簾的安靜地方。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-30": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "空格在 create a relaxing ___, which... 中:a 是冠詞、relaxing 是形容詞,空格是被 relaxing 修飾的單數可數名詞;逗號後的 which 子句修飾整件事。字庫名詞為 (C) atmosphere、(F) risk、(G) function。",
   "上下文線索:前一句 add some soothing nature sounds(加入舒緩的自然聲音),目的是 create a relaxing ___,which can make your naps more effective。聲音與環境共同營造的是「整體氛圍」。",
   "選定 (C) atmosphere:create a relaxing atmosphere 是固定搭配,表示營造放鬆的氣氛。",
   "排除:create a relaxing function / risk 皆不通。create 的對象應是可被聲音與環境營造出來的整體感受;risk 帶負面意義,與 relaxing、soothing 矛盾;function 是事物的作用,不是聲音營造出的東西。atmosphere 才與 sounds 共同營造的整體感受相符。"
  ],
  "options": {
   "C": {
    "why": "atmosphere 是名詞「氣氛、氛圍」,create a relaxing atmosphere 是常見搭配,與 soothing nature sounds 一致。"
   },
   "G": {
    "why": "function 是名詞,但 create a relaxing function 語意怪異:聲音與環境能營造的是「氛圍」,不是「功能」。"
   },
   "F": {
    "why": "risk 是名詞,詞性可行,但帶負面意義,create a relaxing risk 與 relaxing、soothing 的語氣矛盾。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "atmosphere",
    "pos": "n.",
    "zh": "氣氛、氛圍;大氣",
    "note": "可指環境營造出的整體感受,也指大氣層。",
    "coll": [
     "create an atmosphere",
     "a friendly atmosphere"
    ]
   },
   {
    "type": "word",
    "t": "soothing",
    "pos": "adj.",
    "zh": "舒緩的、撫慰的",
    "note": "由動詞 soothe(安撫)加 -ing 而來,常修飾 music、voice、sound。",
    "coll": [
     "soothing music"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "你也可以加入一些舒緩的大自然聲音來營造放鬆的氛圍,讓你的午睡更有效果。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-31": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "Before：第 1 段最後一句問 “But does this hold true across time and cultures?”（微笑代表快樂友善，這在不同時代與文化中都成立嗎？），提出「時間」與「文化」兩個面向的疑問，第 1 段到此為止，留下待回答的問題。",
   "Candidate：(C) “For most of recorded human history, the open smile has been deeply unfashionable.” 在這裡的功能是「先給出總括的答案」：以「有紀錄的大部分歷史」直接回應 across time，並否定第 1 段的常識（微笑＝好感），作為第 2 段的主題句。",
   "After：後一句 “In the West, for example, portraits … before the 1700s typically depicted them with a serious, unsmiling expression.” 以西方 1700 年代以前的肖像畫為「例證」，說明不微笑的情形；後文還解釋原因（蛀牙、被視為缺乏自制），都是在支持「微笑曾經不受歡迎」這個論點。",
   "Link：for example 必須有一個「被舉例的概括性主張」在前面，(C) 正好提供；時間線索也呼應：C 的 “recorded human history” → 後句的 “before the 1700s” → 再後句的 “emerged after the 1700s”。另外第 3 段開頭的 “Recent studies also show…” 的 also，表示前面已談過「時代」面向，現在才補上「文化」面向，也證明第 2 段的主軸是時間演變。"
  ],
  "options": {
   "C": {
    "why": "官方答案。它是總括句（大部分歷史中，張口笑都不受歡迎），回答第 1 段 across time 的疑問，又替後句 In the West, for example 提供被舉例的主張，因此放在【31】最自然。"
   },
   "D": {
    "why": "“A genuine smile indicates contentment, while a forced smile suggests underlying distress.” 本身是通順的英文句子，內容談的是「真笑與假笑」的差別，屬於個人情緒的真誠度。但全文主題是微笑的意義如何隨時代與文化而異，沒有任何地方再談真假笑；放在【31】會讓 In the West, for example 失去可舉例的主張，所以不如 (C)。它是這一題組中沒有對應空格的干擾句。"
   },
   "E": {
    "why": "“In fact, there is a well-known Russian proverb…” 英文本身自然，但 In fact 要接在已有論點之後作補充或強調，而【31】前面只有一個問句，沒有可以補強的主張。此外諺語是某一文化對微笑的看法，與第 2 段「西方 1700 年代以前」的時間脈絡不合；它放在【32】才與前句 “in certain cultures … judged as less intelligent” 呼應。"
   },
   "B": {
    "why": "“Various factors have thus contributed to the phenomenon of smiling.” 的 thus 表示「因此（總結前面所述）」，但【31】之前還沒談到任何影響微笑的因素，無從總結；它是全文結論，屬於【34】。"
   },
   "A": {
    "why": "“Another crucial factor is a society’s immigration diversity.” 的 Another 需要前面已列出一個「因素」，但【31】前面只有第 1 段的問句，找不到任何已列出的因素，且移民多元與「時代變化」無關；它要等第 4 段已談個人主義之後（【33】）才接得上。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "unfashionable",
    "pos": "adj.",
    "zh": "不流行的、不合時宜的",
    "note": "fashionable（流行的）加上否定字首 un-。deeply 在這裡是程度副詞，表示「非常、徹底」。"
   },
   {
    "type": "phrase",
    "t": "hold true",
    "zh": "成立、適用",
    "note": "表示某個說法、規則在某種情況下依然正確；常見 hold true for/across…。第 1 段末句的 does this hold true across time and cultures? 即在問「這個說法在不同時代與文化都適用嗎」。",
    "coll": [
     "hold true for…",
     "The same holds true for…"
    ]
   },
   {
    "type": "word",
    "t": "depict",
    "pos": "v.",
    "zh": "描繪、描寫",
    "note": "常用 depict A as B 或 depict A + 狀態；第 2 段 portraits … depicted them with a serious expression 為「畫中呈現他們嚴肅的表情」。",
    "coll": [
     "depict sb as…"
    ]
   },
   {
    "type": "word",
    "t": "perceive",
    "pos": "v.",
    "zh": "認為、察覺",
    "note": "常用 perceive A as B（把 A 視為 B）；文中為被動 had long been perceived … as manifestations of…（長久以來被視為…的表現）。名詞為 perception。",
    "coll": [
     "be perceived as…"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "（前一句，第 1 段末）但這種說法在不同時代與文化中都成立嗎？／【插入句】在有紀錄的人類歷史中，大部分時候，露齒（張口）的微笑都被認為非常不合時宜。（open smile 指露齒的微笑，與 laughter「大笑」不同）／（後一句）以西方為例，1700 年代以前的男女肖像畫通常描繪出嚴肅、不帶笑容的表情。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-32": {
  "schema": 2,
  "answer": "E",
  "status": "reviewed",
  "key": [
   "Before：第 3 段前一句說 “in certain cultures the same person can be judged as less intelligent when smiling.”（在某些文化中，同一個人微笑時反而被判斷為較不聰明），這是本段的重點，也是很反直覺的主張，需要具體的證據或實例。",
   "Candidate：(E) “In fact, there is a well-known Russian proverb that goes, ‘Smiling with no reason is a sign of stupidity.’” 的功能是「用一句著名諺語佐證」前一句：某些文化確實把亂笑和愚蠢連在一起。",
   "After：後一句 “The amount people smile is culturally influenced as well.” 開啟新話題（微笑的多寡），並以 as well 說明「除了微笑的『意義』受文化影響，微笑的『多寡』也是」；它與【32】句談的是兩個不同面向，所以【32】必須把「意義的文化差異」這個話題收完。",
   "Link：(E) 的 sign of stupidity 對應前句的 less intelligent；In fact 表示「事實上、更確切地說」，把前一句的主張加以證實。諺語是文化現象，也呼應本段 cultures 的主軸。"
  ],
  "options": {
   "E": {
    "why": "官方答案。以俄羅斯諺語為實例，說明某些文化中微笑被與愚蠢聯想；sign of stupidity 回扣 less intelligent，In fact 作為補充證據的連接語，放在本段末、新話題開始之前最順。"
   },
   "A": {
    "why": "“Another crucial factor is a society’s immigration diversity.” 英文通順，但 Another factor 需要前面先列出一個「因素」，而【32】之前談的是「微笑的詮釋因文化而異」，並未提及任何因素；且移民多元與「微笑會被評為較不聰明」毫無關係。這句要等第 4 段已談了個人主義這個因素之後（【33】）才有 Another 可接。"
   },
   "C": {
    "why": "“For most of recorded human history, the open smile has been deeply unfashionable.” 談的是歷史時間的變化，這個論點已在第 2 段（【31】）完成。第 3 段開頭的 Recent studies also show… 已轉向文化面向，【32】再回到歷史會打斷段落主軸，也無法佐證 less intelligent。"
   },
   "B": {
    "why": "“Various factors have thus contributed to the phenomenon of smiling.” 是總結句，thus 需要已經列舉出多個因素；到【32】為止只談了時代與文化的詮釋差異，後面還有第 4 段的新因素，此時下結論過早，而且會讓第 4 段的 as well 失去銜接。這句屬於【34】。"
   },
   "D": {
    "why": "“A genuine smile indicates contentment, while a forced smile suggests underlying distress.” 英文通順，但談的是真笑與假笑，和本段「不同文化如何詮釋同一個微笑」的主軸無關，也無法承接 judged as less intelligent。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "be associated with",
    "zh": "與…有關聯、被聯想到",
    "note": "第 3 段 smiling is associated with positive emotions 為「微笑與正面情緒相連結」；後面接名詞或動名詞，介系詞用 with。",
    "coll": [
     "associate A with B"
    ]
   },
   {
    "type": "word",
    "t": "proverb",
    "pos": "n.",
    "zh": "諺語、格言",
    "note": "a proverb that goes “…” 為引述諺語的常見說法，go 在此表示「（內容）是…」。"
   },
   {
    "type": "word",
    "t": "interpretation",
    "pos": "n.",
    "zh": "詮釋、解讀",
    "note": "動詞 interpret（詮釋、解讀）的名詞。文中 interpretations of smiling may vary from culture to culture 即「對微笑的解讀因文化而異」。",
    "coll": [
     "vary from culture to culture"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "（前一句）在某些文化中，同一個人微笑時反而可能被評為比較不聰明。／【插入句】事實上，俄羅斯有一句著名的諺語說：「無緣無故地笑是愚蠢的徵兆。」／（後一句）人們微笑的多寡也受到文化的影響。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-33": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "Before：前面兩句說，個人主義高、人口少的國家，人們比較常微笑；這類地方通常把個人的需求與權利置於群體之前（these are often places where…）。這是第一個影響「微笑多寡」的社會因素。",
   "Candidate：(A) “Another crucial factor is a society’s immigration diversity.” 的功能是「提出第二個因素」，並且點出新主題 immigration diversity（移民多元程度），作為後文新移民的例子的主題句。",
   "After：後一句 “Newcomers from different parts of the world are found to smile more.” 說明新移民（來自各地）笑得更多，接著解釋原因（沒有共通語言，只好以微笑與人相處）。這些都是在為「移民多元」這個因素舉證。",
   "Link：Another 與前面的第一個因素（個人主義／人口）對應，形成「因素一、因素二」的並列；immigration 與 Newcomers 屬於同一概念（移民＝新來的人）；後句缺少主題句就會突兀地冒出 Newcomers，所以 (A) 是前後的橋樑。"
  ],
  "options": {
   "A": {
    "why": "官方答案。Another 承接上一句的因素，immigration diversity 又預告後句的 Newcomers，前後兩端都接得上。"
   },
   "B": {
    "why": "“Various factors have thus contributed to the phenomenon of smiling.” 是總結，英文自然。但此處段落還在舉例（後面還有以 Newcomers 說明的例子），放在這裡會在說完一個因素後就提前下結論，並切斷 Newcomers 與其主題的聯繫；總結句較適合在最後一段（【34】）。"
   },
   "E": {
    "why": "“In fact, there is a well-known Russian proverb…” 談的是某些文化對微笑的詮釋（微笑的意義），與本段談的「微笑多寡」無關，也無法替後句 Newcomers 鋪陳主題，所以不合。"
   },
   "D": {
    "why": "“A genuine smile indicates contentment, while a forced smile suggests underlying distress.” 談真笑與假笑，與前面「哪些社會的人笑得多」的因素說明、後面「新移民笑得更多」都不相關，無法連接前後文。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "take precedence over",
    "zh": "優先於、比…更重要",
    "note": "第 4 段 the needs and rights of the individual take precedence over those of the group：those 代替前面的 the needs and rights（避免重複），意思是個人的需求與權利優先於群體的。",
    "coll": [
     "take precedence over sth"
    ]
   },
   {
    "type": "phrase",
    "t": "resort to",
    "zh": "訴諸、求助於（通常是不得已）",
    "note": "to 是介系詞，後接名詞或動名詞。文中 they often resort to smiling to get along with others：沒有共通語言時，只好以微笑與人相處。",
    "coll": [
     "resort to violence",
     "as a last resort"
    ]
   },
   {
    "type": "phrase",
    "t": "get along with",
    "zh": "與…相處",
    "note": "get along with sb 表示和某人相處融洽；與 get along well with 意思相近。"
   },
   {
    "type": "word",
    "t": "straightforward",
    "pos": "adj.",
    "zh": "直接的、簡單明瞭的",
    "note": "文中 a straightforward way to indicate that… 為「一個直接表明…的方式」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "（前一句）在這些地方，通常是個人的需求與權利優先於群體的需求與權利。／【插入句】另一個關鍵因素是社會的移民多元程度。／（後一句）研究發現，來自世界各地的新移民笑得更多。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-34": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "Before：第 4 段最後兩句說，新移民沒有共同語言，只好靠微笑與人相處，對他們來說微笑是表明自己可靠、值得信賴的直接方式。這是全文列舉的最後一個例子，之後換行進入最後一段。",
   "Candidate：(B) “Various factors have thus contributed to the phenomenon of smiling.” 的功能是「總結全文」：把前面談到的各種因素（時代、文化詮釋、個人主義與人口、移民多元）統整為一句。",
   "After：後一句 “As many psychologists now point out, this simple gesture is in fact far more complicated than it may appear.” 引用心理學家的看法作最後結論：微笑其實比看起來複雜。(B) 說有「各種因素」，後句再補上「所以並不簡單」，順理成章。",
   "Link：thus（因此）是結論標記，呼應前文逐一列出的因素；(B) 的 the phenomenon of smiling 與後句的 this simple gesture 前後呼應；且第 1 段提到 a simple way to show happiness，與 simple gesture … far more complicated 首尾呼應。"
  ],
  "options": {
   "B": {
    "why": "官方答案。thus 總結前面所有因素，且為最後一段的主題句，緊接著心理學家的結論 far more complicated，形成「因素眾多→所以複雜」的因果推進。"
   },
   "D": {
    "why": "“A genuine smile indicates contentment, while a forced smile suggests underlying distress.” 英文自然，若孤立看似可放在最後一段。但全文從未談到真笑與假笑，放在這裡是突然冒出的新主題；後句的 this simple gesture 雖可指微笑，但 D 沒有「因素／因此」的總結功能，無法承接前面的列舉，也讓後句 far more complicated 缺少理由。"
   },
   "A": {
    "why": "“Another crucial factor is a society’s immigration diversity.” 這是第 4 段用來介紹新移民的句子（【33】）；放在最後一段，等於在結論中再增加新因素，且 Another 需要前一句已列出因素，此處前面是新移民的例子，不合邏輯。"
   },
   "C": {
    "why": "“For most of recorded human history, the open smile has been deeply unfashionable.” 是歷史面向的主題句，應放在第 2 段開頭（【31】）；放在末段會回頭談已處理完的時間議題，無法作為結論。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "contribute to",
    "zh": "促成、導致；對…有貢獻",
    "note": "to 是介系詞，後接名詞或動名詞；可用於「造成某結果」（Various factors have contributed to…）或「貢獻於」。",
    "coll": [
     "contribute to the success of…"
    ]
   },
   {
    "type": "word",
    "t": "phenomenon",
    "pos": "n.",
    "zh": "現象",
    "note": "複數是 phenomena（不是 phenomenons）。"
   },
   {
    "type": "phrase",
    "t": "point out",
    "zh": "指出",
    "note": "As many psychologists now point out, … 的 as 引導插入的子句，意思是「如許多心理學家現在所指出的」。",
    "coll": [
     "point out that…"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "（前一句）對他們而言，微笑是表明自己可靠、值得信賴的直接方式。／【插入句】因此，各種因素共同造就了微笑這個現象。／（後一句）正如許多心理學家現在所指出的，這個簡單的動作其實遠比看起來複雜。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-35": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "先看題型:What is this passage mainly about? 問的是全文主旨,答案必須同時涵蓋各段內容,不能只選某一段或某個細節。",
   "逐段整理:第 1 段點出 Endurance 在 2022 年被尋獲,並稱這是「一段傳奇故事的最後篇章」;第 2 段 1914 年出發、被困在浮冰中;第 3 段船被冰壓壞、沉沒;第 4 段船員在冰上漂流、搭救生艇到 Elephant Island,Shackleton 再冒險求援;第 5 段獲救、全員生還,船仍沉在海底直到 2022 年。全文主線是「這趟航行如何從出發、受困、求生到獲救」。",
   "比較涵蓋範圍:(A) 只涵蓋人物,範圍過窄且偏向「人」而非「事件」;(B) 天氣只是困境的背景細節;(D) 只對應第 1 段與第 5 段末句,屬以偏概全。(C) 的 voyage 能涵蓋出發、受困、沉船、求生與獲救,challenging 概括受困、沉船、浮冰求生與冒險求援等一連串艱難;第 1 段的 courage and perseverance 正是面對這些困難所需的特質。"
  ],
  "options": {
   "A": {
    "why": "Shackleton 確實是文章的核心人物,而且第 1 段稱他為 famed polar explorer,因此這個選項並非完全無關。但選項說的是「一位知名探險家」(人物介紹),文章卻是在敘述一趟旅程的經過:出發、受困、沉船、求生、獲救。文章沒有介紹他的生平或其他探險,所以這個選項範圍過窄,偏離敘事主線。"
   },
   "B": {
    "why": "文章提到 floating ice、pack ice、freezing water、stormy seas、bad weather,但這些都只是造成困境的背景細節,沒有任何一段以「南極天氣」為討論對象。把細節當主旨,屬以偏概全。"
   },
   "C": {
    "why": "正確。這個選項用 voyage 涵蓋整段航行,用 challenging 概括受困、沉船、浮冰求生、冒險求援與延誤返航,與第 2 至 5 段的敘事主線一致,第 1 段的 courage and perseverance 也是同一主題。"
   },
   "D": {
    "why": "第 1 段與第 5 段末句提到 2022 年尋獲沉船,但這只是故事的開頭與收尾。第 2 至 4 段(佔全文大部分篇幅)講的是從 1914 年出發、受困、沉船到求生與求援的過程,不是尋獲沉船。第 1 段本身也說這次發現是 the final chapter(最後一章),可見重點是整個故事,尋獲只是結尾。選它範圍過窄。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "perseverance",
    "pos": "n.",
    "zh": "毅力、堅持不懈",
    "note": "名詞,動詞為 persevere(in / with sth)。第 1 段 courage and perseverance 概括了全文的求生精神。",
    "coll": [
     "show perseverance",
     "persevere in the face of difficulty"
    ]
   },
   {
    "type": "word",
    "t": "voyage",
    "pos": "n.",
    "zh": "(長途)航行、旅程",
    "note": "多指海上或太空的長途旅行;和 trip(一般旅行)、journey(泛指旅程)相比,較強調航行。",
    "coll": [
     "a long voyage",
     "embark on a voyage"
    ]
   },
   {
    "type": "phrase",
    "t": "the final chapter",
    "zh": "最後篇章",
    "note": "chapter 在此為比喻,指故事的一個階段。第 1 段說尋獲沉船是傳奇故事的最後一章,表示故事主體在更早之前。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段:2022 年 3 月,探險家 Ernest Shackleton 失蹤的船 Endurance 號在沉沒 107 年後於南極被尋獲。這則新聞登上全球頭條,不只因為搜尋團隊的非凡成就,更因為這項發現為一段充滿非凡勇氣與毅力的傳奇故事畫下了最後一章。\n第 2 至 4 段:概述 1914 年出發、船被浮冰困住、沉沒、船員漂流求生、Shackleton 冒險求援。\n第 5 段末句:所有探險隊員都存活下來,但 Endurance 號仍沉在海底,直到 2022 年才被發現。\n題目與正確選項:本文主要在談什麼?(C) 一趟充滿挑戰的南極航行。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-36": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "先鎖定語境:第 3 段先說 pressure from the ice buckled the planks(冰的壓力使船板彎曲變形),船已經出問題;接著 Freezing water rushed in and exacerbated the situation(冰冷的水湧入,又使情況更糟)。",
   "exacerbate 是動詞,意思是「使(已經不好的情況)更惡化、加劇」,重點是「本來就壞,又變得更壞」,不是單純「造成」或「開始」。因此要找的慣用語必須表示「讓已經糟的事更糟」。",
   "add fuel to the fire(火上加油)字面是對火再加燃料,比喻使原本就糟的情況或衝突更嚴重,和 exacerbate the situation 語意最接近,所以選 (D)。",
   "排除其他慣用語:break the ice 是打破僵局;cost an arm and a leg 是非常昂貴;miss the boat 是錯失良機。三者都沒有「使情況更糟」的意思。檢驗法:把四個慣用語代回 Freezing water rushed in and ___ the situation,只有「使已糟的情況更糟」能與前文船板被壓壞形成遞進。"
  ],
  "options": {
   "A": {
    "why": "break the ice 指在初次見面或氣氛僵硬時,用話題或活動「打破僵局、讓氣氛緩和」,語意是「改善」而非「惡化」。本句是冰冷的水湧入船艙使危機更嚴重,方向剛好相反;另外 ice 在此只是字面巧合,慣用語的意思和南極的冰無關。"
   },
   "B": {
    "why": "cost an arm and a leg 指東西「貴得離譜」,主詞通常是物品或服務(例如 The repair cost an arm and a leg.)。本句談的是危機惡化,與價格無關,語意不合。"
   },
   "C": {
    "why": "miss the boat 指「錯過機會、沒趕上時機」,例如沒有及時行動而錯失良機。本句沒有「錯失機會」的意思,而是情況本身變差,因此不合。"
   },
   "D": {
    "why": "正確。add fuel to the fire 比喻使本來就糟的情況更糟(多用於衝突、爭吵、危機)。船板已被冰壓壞,冰冷海水湧入使危機更嚴重,正是「火上加油」。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "exacerbate",
    "pos": "v.",
    "zh": "使惡化、使加劇",
    "note": "詞義本身就含「使已經不好的情況更糟」,受詞多為負面事物,如 situation、problem、pain、tension,不用於好的事。",
    "coll": [
     "exacerbate the problem",
     "exacerbate tensions"
    ]
   },
   {
    "type": "phrase",
    "t": "add fuel to the fire",
    "zh": "火上加油、使情況更糟",
    "note": "也可說 add fuel to the flames。常用於衝突、批評或危機,表示使本來就嚴重的事更嚴重。"
   },
   {
    "type": "phrase",
    "t": "break the ice",
    "zh": "打破僵局、打開話匣子",
    "note": "用於初次見面或氣氛尷尬時,使大家放鬆、開始交談。"
   },
   {
    "type": "phrase",
    "t": "cost an arm and a leg",
    "zh": "價格極為昂貴",
    "note": "主詞是物品或服務;cost 的過去式仍為 cost。"
   },
   {
    "type": "phrase",
    "t": "miss the boat",
    "zh": "錯失良機",
    "note": "指沒有及時把握機會;注意不是真的錯過一艘船。"
   },
   {
    "type": "word",
    "t": "buckle",
    "pos": "v.",
    "zh": "(因受壓)彎曲、變形",
    "note": "第 3 段 the pressure from the ice buckled the planks,指船板被擠壓到彎曲。也可作「扣上(帶扣)」解,例如 buckle up。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段:這艘可靠的船撐了九個月,先緩慢地往南漂,後來被浮冰推向北方。冰的壓力使船板逐漸彎曲變形,冰冷的海水湧入,使情況更加惡化(exacerbated the situation)。\n題目與正確選項:下列哪個慣用語與第 3 段的 exacerbated the situation 意思最接近?(D) 火上加油。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-37": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "本題是細節題,要逐項回文章查證,不能憑印象。先找時間點:第 2 段 On August 4, 1914 … set sail;第 5 段 On August 30, 1916, Shackleton finally got back to Elephant Island。",
   "(A):從 1914 年 8 月 4 日出發到 1916 年 8 月 30 日返回救人,已超過兩年(兩年又 26 天),所以 His journey lasted more than two years 為真。",
   "(B):第 2 段說 hoping to make the first land crossing,hoping 只是出發時的「希望」。接著船被困在浮冰、沉沒,文章沒有說他完成橫越南極,所以不能說他是第一個橫越的人。",
   "(C)、(D) 是把文章細節改寫:五個月是在 pack ice(浮冰)上露營的時間,不是在 Elephant Island(第 4 段第 1 句);Shackleton 是「帶著」五名船員去求援(With five crew members),並非「派」他們去,而且最後是步行 36 小時抵達 whaling station。"
  ],
  "options": {
   "A": {
    "why": "正確。第 2 段是 1914 年 8 月 4 日出發,第 5 段是 1916 年 8 月 30 日回到 Elephant Island,期間超過兩年。要注意文章沒有直接寫 two years,需要用兩個日期自己計算。"
   },
   "B": {
    "why": "第 2 段只說他 hoping to make the first land crossing,表示目標是成為第一個陸路橫越南極的人,文章沒有任何一處說他完成橫越;從船被困、沉沒、船員被救,可推知探險未達成原目標(這是推論,不是原文明說)。第 5 段只說全員生還。這是把「希望」當成「完成」的陷阱。"
   },
   "C": {
    "why": "第 4 段第 1 句說 the crew camped out on the pack ice for the next five months,是在浮冰上而不是 Elephant Island;之後才乘救生艇七天到達 Elephant Island,且文章寫的是 But the crew couldn’t survive long there(在那裡無法長期生存)。文章沒有給出他們在 Elephant Island 停留的月數,所以「五個月」是被張冠李戴。"
   },
   "D": {
    "why": "第 4 段說 With five crew members, he sailed 800 miles over 16 days … to South Georgia Island,Shackleton 本人也同行(共六人),並非他派五人去。此外文章寫的是 he sailed … to South Georgia Island,再 hiked for 36 hours 才到 whaling station;文章沒有說 800 英里是否搭救生艇。選項 sent … on a lifeboat to get help from a whaling station 與文章不符:他自己同行,最後一段路是步行。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "set sail",
    "zh": "啟航、出海",
    "note": "set sail (for + 目的地)。第 2 段 set sail on the Endurance toward the South Pole。",
    "coll": [
     "set sail for …"
    ]
   },
   {
    "type": "phrase",
    "t": "land crossing",
    "zh": "陸路橫越",
    "note": "第 2 段 the first land crossing over Antarctica,是出發時的目標(hoping to),不是已完成的成就,對應 (B) 的陷阱。"
   },
   {
    "type": "phrase",
    "t": "camp out",
    "zh": "露營、野外過夜",
    "note": "第 4 段 the crew camped out on the pack ice,地點是浮冰上,對應 (C) 的陷阱。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "hope to + V\n意思:希望(做)……\n例如:He set sail hoping to make the first land crossing over Antarctica.(他啟航時希望完成首次陸路橫越南極。)\n注意:hope 只表示願望,不代表已經達成,這也是 (B) 的陷阱。"
  ],
  "grammar": "",
  "zh": "第 2 段:1914 年 8 月 4 日,Ernest Shackleton 爵士帶著 27 名技術純熟的船員搭乘 Endurance 號啟航前往南極,希望完成首次陸路橫越南極。\n第 4 段:接下來的五個月,船員在隨浮冰北漂的冰上露營……Shackleton 帶著五名船員航行 800 英里、歷時 16 天,橫越冰冷的暴風海面抵達 South Georgia 島,再步行 36 小時抵達捕鯨站。\n第 5 段:1916 年 8 月 30 日,Shackleton 終於帶著一艘夠大的船回到 Elephant Island 救出其餘的人。\n題目與正確選項:根據本文,關於 Shackleton 與他的南極探險,下列何者正確?(A) 他的旅程持續了兩年多。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-38": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "先把文章中 Endurance 的行動依序整理:第 2 段離開 South Georgia 兩天後遇到 floating ice,不久被 pack ice 完全困住;第 3 段 drifting down south slowly and then pushed northward by the ice,最後船在冰的壓力下沉沒(sink beneath the Weddell Sea)。",
   "題目問的是 Endurance 這艘船的路線。第 3 段船先沉沒;第 4 段說船員是棄船、冰裂開後才搭救生艇到 Elephant Island,所以任何把 Elephant Island 畫進 Endurance 自己航線的圖都不符。",
   "對照路線圖:(A)、(B) 都是繞威德爾海一整圈,途中經過 Elephant Island;(D) 的路線終點就是 Elephant Island,再往南一小段。這三張都把 Elephant Island 畫進船的路線,與第 3、4 段「船先沉沒、人後乘救生艇抵達」衝突。繞圈只是輔助觀察,文章主要依據是 Elephant Island。",
   "(C) 從 South Georgia 往南、最後一小段轉向北,沒有經過 Elephant Island,與「先往南漂、後被推向北」吻合,所以選 (C)。注意:圖上的「往西」只是畫法,文章只有「先往南、後被推向北」兩個方向詞;解題只需抓這兩個方向詞與是否抵達 Elephant Island。"
  ],
  "options": {
   "A": {
    "why": "圖 (A) 的路線從 South Georgia 繞威德爾海一整圈(順時針),途中經過 Elephant Island,再回到 South Georgia 一帶。主要問題是它把 Elephant Island 畫進船的航線,但文章說船員是棄船、冰裂開後才乘救生艇到 Elephant Island(第 4 段),Endurance 自己沒到過那裡。另外文章只說船先往南漂、後被推向北,沒有說它繞了一圈(輔助理由)。注意 (A) 的方向看似也是先南後北,所以不能只靠方向詞排除。"
   },
   "B": {
    "why": "圖 (B) 同樣繞一整圈,方向是逆時針,途中也經過 Elephant Island。排除理由與 (A) 相同:Endurance 沉沒後,船員才乘救生艇抵達 Elephant Island,所以船的航線不能經過那裡。繞圈與方向只是輔助觀察。"
   },
   "C": {
    "why": "正確。圖 (C) 從 South Georgia 出發,沿威德爾海往南,最後一小段轉向北,而且沒有抵達 Elephant Island。這對應第 3 段的 drifting down south slowly and then pushed northward;船在冰壓下沉沒(第 3 段),船員是之後才乘救生艇到 Elephant Island(第 4 段),所以船的路線不會到 Elephant Island。"
   },
   "D": {
    "why": "圖 (D) 的路線從 South Georgia 到 Elephant Island,再往南走一小段。終點 Elephant Island 是船員棄船後才到的地方(第 4 段);Endurance 最後在 Weddell Sea 沉沒,並沒有抵達 Elephant Island。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "pack ice",
    "pos": "n.",
    "zh": "(海上的)大片浮冰、流冰群",
    "note": "由海面凍結的冰塊擠壓聚集而成,可阻擋船隻前進。第 2 段 trapped in pack ice;第 4 段船員在 the pack ice 上露營。"
   },
   {
    "type": "word",
    "t": "drift",
    "pos": "v.",
    "zh": "漂流、漂移",
    "note": "指被水流、風或冰推著移動,不是自己主動航行。第 3 段 drifting down south slowly 與第 4 段 as it drifted north 都是這個意思。",
    "coll": [
     "drift off course",
     "drift apart"
    ]
   },
   {
    "type": "phrase",
    "t": "down south / northward",
    "zh": "往南/往北",
    "note": "圖像題要抓方向詞:第 3 段先 down south,再 pushed northward,順序不能顛倒。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:離開 South Georgia 兩天後,Endurance 號遇到浮冰,不久就被 pack ice 完全困住。\n第 3 段:這艘可靠的船撐了九個月,先緩慢地往南漂,然後被冰推向北方……船員眼看 Endurance 沉入 Weddell Sea。\n第 4 段:冰裂開後,船員搭救生艇逃離,到達無人居住的 Elephant Island。\n題目與正確選項:下列哪一張圖顯示 Endurance 離開 South Georgia 後的正確路線?(C) 圖 C。",
  "aiFlags": [
   "本題的圖為已核准的原創替代圖,非官方原圖。排除 A、B、D 的關鍵是它們都把 Elephant Island 畫進船的路線,與第 3、4 段衝突;但 Elephant Island 在圖上的位置是圖的設定,文章本身沒有給出地理位置。(A) 的方向也是先南後北,單看方向詞無法與 (C) 區分。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-39": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "本題不是問文章寫了什麼,而是問「哪個問題能在文章中找到答案」。做法是把四個問句各自拿去文章裡找依據,找不到就排除。",
   "(A) 問第一座螺旋樓梯建在哪:文章只說聖經中提到所羅門聖殿有螺旋樓梯,推測 around 1,000 BC 已在使用;又說 the oldest spiral staircase still standing 是羅馬的 Trajan’s Column。這是「現存最古老」,不是「第一座」,也沒說建在何處是最早。(B)、(C) 文章沒提設計者、也沒有「最著名」的比較。",
   "答案在第 4 段末句:The timeless appeal of their classical design makes spiral staircases a much-desired feature … nowadays,說明古典設計歷久不衰的魅力使它如今仍是豪宅、辦公室、公共建築備受渴望的特色。同段前面的城堡與國王聯想、新材料、鋼架降低成本,是「逐漸受歡迎」的歷史原因,屬補充;第 2、3 段談起源與防禦,和「現代為何受歡迎」無關。"
  ],
  "options": {
   "A": {
    "why": "文章只說(1)舊約提到所羅門聖殿有螺旋樓梯,推測約公元前 1,000 年已在使用;(2)現存最古老的是 Trajan’s Column 的樓梯,建於公元 113 年。文章沒有說哪一座是「第一座」,更沒有說第一座建在哪裡。把「現存最古老」當成「最早建造」是陷阱。"
   },
   "B": {
    "why": "文章只在第 3 段提到城堡主人 strategically designed 不平整的階梯,但那是針對防禦設計,並非「螺旋樓梯的第一位設計者」。全文沒有任何設計者的名字或「第一位」的說法,所以文章無法回答。"
   },
   "C": {
    "why": "文章只提到現存最古老的是 Trajan’s Column,沒有評價哪一座最有名。最古老和最有名是兩件事,文章沒有任何關於 most famous 的資訊。"
   },
   "D": {
    "why": "正確。最直接的依據是第 4 段末句 The timeless appeal of their classical design makes spiral staircases a much-desired feature … nowadays:說明現代仍受歡迎的原因是古典設計的不朽魅力。該段前面提到與中世紀城堡及國王的聯想(Being associated with medieval castles and kings)、新材料、鋼架變得 cost-effective 而更多人買得起,則是逐漸受歡迎的歷史背景,可作補充。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "win popularity",
    "zh": "贏得歡迎",
    "note": "第 4 段 gradually won popularity in European architecture。也可說 gain popularity;win 在這裡是「贏得」。"
   },
   {
    "type": "word",
    "t": "timeless",
    "pos": "adj.",
    "zh": "歷久不衰的、不受時間影響的",
    "note": "time + -less;the timeless appeal of …= 不會過時的吸引力。末段用它說明現代仍受歡迎的原因。",
    "coll": [
     "a timeless classic"
    ]
   },
   {
    "type": "word",
    "t": "much-desired",
    "pos": "adj.",
    "zh": "備受渴望的、很搶手的",
    "note": "末句 a much-desired feature,說明現代仍有人想要;此句是回答「現代為何受歡迎」的直接依據。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:舊約提到所羅門聖殿有螺旋樓梯,暗示至遲在約公元前 1,000 年就已有使用。現今仍存的最古老螺旋樓梯在羅馬的 Trajan’s Column,建於公元 113 年,共 185 級,以石頭與大理石雕成。\n第 4 段:由於與中世紀城堡及國王相關聯,螺旋樓梯逐漸在歐洲建築中受到歡迎……(末句)其古典設計歷久不衰的魅力,使螺旋樓梯成為當今豪宅、辦公室與公共建築中備受渴望的特色。\n題目與正確選項:本文能回答哪個問題?(D) 為什麼螺旋樓梯在現代很受歡迎?",
  "aiFlags": [
   "第 4 段末句才直接回答「現代」受歡迎的原因,前面的城堡聯想與鋼架成本屬逐漸受歡迎的歷史原因,講解時宜區分。(A) 學生可能聯想到第 2 段的 Temple of Solomon,但文章只說 suggesting … already in use by around 1,000 BC,並未說那是第一座。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-40": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "先找出 them 所在的句子：The defenders … were familiar with the stair pattern and could retreat up them very swiftly。them 是介系詞 up 的受詞：retreat up them＝沿著它們往上撤退。",
   "up them 表示沿著它們往上走，所以 them 必須是複數、而且是供人往上走的東西；defenders 是撤退的主詞，不會是自己的路徑。",
   "往前看這一段在談什麼：前文反覆出現 these staircases、the stairs、the uneven steps of the staircase。the stair pattern 本身是單數，所以不是 them 的直接形式先行詞；但整段談論的對象一直是樓梯／階梯，them 在語意上自然回指它們。這是文章脈絡中的指涉，不需要去找字面完全相同的單一名詞。",
   "排除：attackers 是與守軍對立的另一方人群；confines 出現在 them 之後（the dimly lit confines of the staircase）；defenders 是這個句子的主詞。只有 (A) Stairs 符合「可供人往上走的複數事物」，選 (A)。"
  ],
  "options": {
   "A": {
    "why": "正確。retreat up them＝沿著它們往上撤退，them 必須指可供人往上走的複數事物。前文反覆談到 staircases、stairs、steps，所以 them 在語意上回指樓梯／階梯。the stair pattern 本身是單數，不是 them 的直接形式先行詞，但整段的討論對象一直是樓梯。"
   },
   "B": {
    "why": "confines(狹窄的範圍、內部)出現在分號後的 the dimly lit confines of the staircase,位置在 them 之後。代名詞的先行詞通常出現在前面,所以它不可能是先行詞;而且 retreat up the confines 也不通。"
   },
   "C": {
    "why": "attackers 是名詞複數,但 retreat up attackers 變成「沿著攻擊者往上撤退」,不合理。attackers 是與守軍對立的另一方,不是供人往上走的路徑。"
   },
   "D": {
    "why": "defenders 是本句的主詞,是撤退的人。若 them = defenders,就變成「守軍沿著守軍往上撤退」。retreat up 需要可攀爬的路徑,人不能當路徑,所以語意不通。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "retreat",
    "pos": "v.",
    "zh": "撤退、後退",
    "note": "可作不及物動詞,常接 from、to、up、into 等介系詞。第 3 段 retreat up them = 沿著階梯往上撤退。",
    "coll": [
     "retreat from …",
     "retreat to …"
    ]
   },
   {
    "type": "word",
    "t": "swiftly",
    "pos": "adv.",
    "zh": "迅速地",
    "note": "swift 的副詞,與 quickly 同義但較正式。"
   },
   {
    "type": "word",
    "t": "confine",
    "pos": "n.",
    "zh": "(通常用複數)範圍、界限、狹小空間",
    "note": "the confines of …= …的範圍或狹小的內部。第 3 段 the dimly lit confines of the staircase 指光線昏暗的狹窄樓梯間。"
   },
   {
    "type": "word",
    "t": "stumble",
    "pos": "v.",
    "zh": "絆倒、踉蹌",
    "note": "stumble over / on sth。文章說攻擊者在光線昏暗的樓梯間更可能 stumble and fall。",
    "coll": [
     "stumble and fall"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "retreat up them 中，up 是介系詞，後面的受詞 them 必須是可以被「往上走」的路徑，所以要回頭找複數的樓梯類名詞。判斷代名詞的步驟：一，看 them 在句中的位置（介系詞 up 的受詞）；二，看前文反覆談論的是什麼（staircases / stairs / steps）；三，代回原句檢查語意（沿著樓梯往上撤退）。",
  "zh": "第 3 段:守軍住在城堡裡,熟悉階梯的排列,可以非常迅速地沿著這些階梯往上撤退(retreat up them);相反地,攻擊者則更可能在光線昏暗的狹窄樓梯間裡絆倒跌落。\n題目與正確選項:第 3 段的 them 指什麼?(A) 階梯。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-41": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "本題問「材料的時間順序」,要從文章中找出每種材料出現的時間點,再與選項順序對照,不可憑建築史常識判斷。",
   "第 2 段:公元 113 年的 Trajan’s Column,樓梯以 stone and marble 雕成,所以石頭/大理石最早。第 4 段:Victorian times 流行 cast iron;the latter half of the 20th century,steel frames 成本效益提高;Today 有 steel, wood, concrete, 以及 recently even glass。",
   "整理成順序:stone/marble(113 AD)→ cast iron(Victorian times)→ steel(latter half of the 20th century)→ glass(recently)。(A) 完全符合。文章給的是 steel frames 變得 cost-effective 的時間(latter half of the 20th century),我們只用文章給的時間點排序,不用外部建築史知識。",
   "排除:(B) 把 wood 放在石頭之後、鐵之前,文章沒有給 wood 的早期時間,只說 today 有 wood;(C) 把 iron 放在 marble 之前,與文章相反;(D) 把 wood 放在 stone 之前,且 marble 與 stone 同屬 113 年的樓梯材料,不能被 wood 隔開。"
  ],
  "options": {
   "A": {
    "why": "正確。stone(與 marble)是 113 AD 的材料,接著是 Victorian times 的 cast iron,然後是 20 世紀後半的 steel,最後才是 today 的 glass(recently)。四者都有時間依據,順序一致。"
   },
   "B": {
    "why": "stone → wood → iron → steel 的 wood 無法對應文章的時間線。文章只在最後一句 Today … steel, wood, concrete, and recently even glass 才提到 wood,沒有說它出現在 iron 之前。這是把「今天有的材料」誤當成「古早就有」。"
   },
   "C": {
    "why": "iron → marble → wood → glass 把 iron 放在 marble 之前,與文章相反:marble 屬於公元 113 年的 Trajan’s Column,cast iron 是 Victorian times,晚得多。"
   },
   "D": {
    "why": "marble → wood → stone → concrete 有兩個問題:第一,stone 與 marble 在文中是並列的同一代材料(stone and marble),不能被 wood 隔開;第二,wood 與 concrete 在文章中只出現在 Today 這一句,文章沒有說它們的先後。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "in the latter half of the 20th century",
    "zh": "在 20 世紀後半",
    "note": "the latter half = 後半(前半是 the first half)。時間題要把 century 與 half 對準,才能排出先後。"
   },
   {
    "type": "word",
    "t": "cost-effective",
    "pos": "adj.",
    "zh": "符合成本效益的、划算的",
    "note": "指成本相對效益划算,不等於便宜。第 4 段說鋼架變得 cost-effective,因此更多人負擔得起(affordable)。",
    "coll": [
     "a cost-effective solution"
    ]
   },
   {
    "type": "word",
    "t": "cast iron",
    "pos": "n.",
    "zh": "鑄鐵",
    "note": "鐵水澆鑄成型的鐵;維多利亞時期常見於公共建築與富人住宅。"
   },
   {
    "type": "word",
    "t": "emerge",
    "pos": "v.",
    "zh": "出現、浮現",
    "note": "第 4 段 new materials emerging to cope with customers’ needs。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:現存最古老的螺旋樓梯在羅馬的 Trajan’s Column,建於公元 113 年,共 185 級,以石頭與大理石雕成。\n第 4 段:在維多利亞時代,鑄鐵螺旋樓梯流行於公共建築與富人的住宅。20 世紀後半,鋼架變得符合成本效益,因此對更廣大的樓梯市場而言都買得起……如今螺旋樓梯有多種材質:鋼、木、混凝土,最近甚至還有玻璃。\n題目與正確選項:根據本文,下列何者是製作螺旋樓梯材料的正確時間順序?(A) 石頭 → 鐵 → 鋼 → 玻璃。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-42": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "先分清楚題型:inferred 是「由文章資訊推論得出」,不是文章直接寫出的句子。先列出文章明說的事實,再看選項是否合理。",
   "文章明說(第 3 段):(1) 樓梯狹窄,攻擊者一次只能上一個人;(2) 樓梯設計成向上時順時針轉,往上爬的人 would have their right hand tight against the narrowest part, close to the central pole,as a result were unable to use their sword effectively;(3) 不平整的階梯往往是城堡主人刻意設計的;(4) 守軍熟悉階梯,可以很快往上撤退;攻擊者更可能絆倒。",
   "文章沒有直接寫「right-handed defenders 比較有利」，而是要由攻守方向推論。攻擊者由下往上時，右手靠近中央柱的狹窄處，因此持劍空間受限；守軍從較高處面向攻擊者，方向相反，右手位於較寬的外側，較能使用武器。因此順時針樓梯的設計對右手持劍的守軍較有利，故選 (B)。",
   "排除:(A) 與文章相反,守軍可 retreat up them very swiftly;(C) 文章沒有比較上下樓,且文章說攻擊者往上爬時更可能絆倒;(D) 文章說樓梯 dimly lit,但是讓攻擊者更容易絆倒,沒有說守軍可以躲藏。"
  ],
  "options": {
   "A": {
    "why": "文章第 3 段以 To begin with(首先)指出樓梯很窄(quite narrow),使攻擊者一次只能上一個人,無法大規模進攻。同一段又說守軍 could retreat up them very swiftly,表示窄不會妨礙守軍快速撤退,所以 (A) 與文章相反。"
   },
   "B": {
    "why": "正確。文章明說樓梯順時針向上，使往上攻的人右手貼近中柱最窄處、無法有效使用劍，而且這套設計是為了防禦城堡（第 3 段）。文章沒有直接寫「右手持劍的守軍比較有利」，所以這是推論：攻擊者由下往上、守軍從較高處面向攻擊者，方向相反，守軍的右手位於較寬的外側，較有揮劍空間。因此順時針設計對慣用右手的守軍有利。"
   },
   "C": {
    "why": "文章沒有比較上樓與下樓。而且文章指出不平整的階梯讓往上攻的攻擊者更容易絆倒(尤其在光線昏暗的樓梯間),與「上樓更容易」的說法方向相反;守軍因為熟悉,可以快速往上撤退。所以 (C) 無法由文章推出。"
   },
   "D": {
    "why": "文章提到 dimly lit confines,但它的作用是讓攻擊者更容易絆倒。文章並沒有說守軍利用昏暗躲避攻擊者,「躲藏」完全是選項自己加上的資訊。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "ascend",
    "pos": "v.",
    "zh": "攀登、上升",
    "note": "第 3 段 attackers would have to ascend one at a time;相反詞為 descend。名詞 ascender 在文中指「往上爬的人」。"
   },
   {
    "type": "word",
    "t": "clockwise",
    "pos": "adj./adv.",
    "zh": "順時針的/地",
    "note": "相反詞為 counterclockwise(英式 anticlockwise)。turn clockwise upwards = 向上時順時針旋轉。"
   },
   {
    "type": "phrase",
    "t": "tight against",
    "zh": "緊貼著",
    "note": "緊貼著。第 3 段 have their right hand tight against the narrowest part,表示右手貼近中柱最窄處,揮劍空間受限。"
   },
   {
    "type": "word",
    "t": "strategically",
    "pos": "adv.",
    "zh": "策略性地、有計畫地",
    "note": "形容詞為 strategic。第 3 段說階梯是 strategically designed by the castle owners,表示是刻意設計出來的。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段:這表示往上走的人右手會緊貼著樓梯最窄的部分,也就是靠近中央柱子之處,因此無法有效地使用劍。攻擊者的挑戰又因為階梯不平整而更加複雜,這些階梯往往是城堡主人刻意設計的。\n另(第 3 段):守軍熟悉階梯的排列,可以非常迅速地往上撤退。\n題目與正確選項:關於中世紀的螺旋樓梯,下列哪項陳述可以被推論出來?(B) 順時針的設計對慣用右手的城堡守軍有利。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-43": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "先看首尾：第 1 段提出問題「為什麼地圖上方是北？」並說 that wasn’t always the case（以前並不總是如此）；最後一段結論說北在上方「less a rule and more a blip」，並說經過幾世紀又回到起點。首尾都在談「方向如何改變」，所以主題是 orientation 的演變。",
   "沿著各段整理文章明示的做法：第 2 段 ancient India 與《舊約》相關證據：east 在上；第 3 段最古老現存地圖（埃及、阿拉伯）：south 在上；第 4 段 16 世紀歐洲探險時代（以及其後的帝國擴張）：north 在上並成為標準；第 5 段 GPS：版面隨行進路線而變。文章只依段落介紹各時期／各地的做法，並未給出東、南之間的年代先後，整理時只依文章敘述，不自行補年代。",
   "再比較範圍：第 2–5 段依序介紹不同時期／地區的方向做法，第 1、6 段首尾呼應「並非一直如此」，所以主軸是「方向的演變」。(A) 只是第 2 段末句的一個細節；(B) 只在第 5 段稍微提到 GPS；(D) 只是第 4 段的背景（航海者靠北極星）。",
   "因此能涵蓋全文的只有 (C) How map orientation evolved over time（地圖方向如何隨時間演變）。"
  ],
  "options": {
   "A": {
    "why": "Why east is referred to as the “Orient.” 只對應第 2 段末句的一個附帶說明（東方至今仍被稱為 Orient），範圍太窄，無法涵蓋南、北與 GPS 的部分。"
   },
   "B": {
    "why": "How maps differ from GPS in function. 文章對 GPS 只在第 5 段討論地圖版面會隨行進路線而變，沒有比較地圖與 GPS 的功能差異；範圍窄，且概念本身也不是文章比較的重點。"
   },
   "C": {
    "why": "官方答案。第 1 段（north 並非一直在上）；第 2–4 段分別談 ancient India／《舊約》（east）、最古老現存地圖（south）、歐洲探險時代（north）；第 5 段 GPS 隨行進路線而變；第 6 段總結。各段說明不同時期／群體的上方方向，因此是方向的演變，涵蓋全文。"
   },
   "D": {
    "why": "Why maps were important during the age of exploration. 只與第 4 段部分內容有關，而且文章說的不是地圖的重要性，而是北方因航海者依賴北極星、歐洲勢力擴張而成為上方；範圍過窄且主旨偏離。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "orient",
    "pos": "v.",
    "zh": "使朝向、定位",
    "note": "常用被動 be oriented to/toward…（朝向…）。文中 maps were oriented to the east 即「地圖以東為上」。名詞 orientation（方位、朝向）。",
    "coll": [
     "be oriented toward…"
    ]
   },
   {
    "type": "word",
    "t": "evolve",
    "pos": "v.",
    "zh": "演變、逐漸發展",
    "note": "名詞 evolution；evolve over time 表示隨時間逐漸演變。"
   },
   {
    "type": "word",
    "t": "Eurocentric",
    "pos": "adj.",
    "zh": "以歐洲為中心的",
    "note": "第 4 段 maps became Eurocentric, with north on top：with north on top 為附帶說明，「並以北為上」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段：你是否曾經好奇，為什麼地圖上方是北？今天北方看起來似乎是上方的自然選擇，但過去並非總是如此。／第 6 段：所以，把北放在上方，與其說是規則，不如說是一時的偏離。經過幾世紀的科技進步，我們似乎回到了古代的起點：以自己為中心，目的地在上方。／題目與正確選項：這篇文章主要在談什麼？(C) 地圖方向如何隨時間演變。",
  "aiFlags": [
   "文章未提供東與南方向的年代先後（east 為 early ages、south 為 oldest surviving maps），只明示 16 世紀歐洲探險時期 north 興起；整理年表時勿自行補年代。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-44": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "先找出 this 所在的完整句子：“Though there is no physical evidence to support this, the word dakshina …”。support 是及物動詞，support this 的受詞是「被證據支持的東西」，通常是一個主張、說法或假設，而不是單一名詞。",
   "再看前一句：“In ancient India, for example, maps were most likely oriented to the east.”（古印度的地圖很可能以東為上）。這是整個句子表達的一個推測性的主張，也是 Though 子句要說「沒有實物證據支持」的內容；this 指前一句整個主張，也就是「古印度地圖以東為上」，概括起來是 (D) East-orientation of maps。",
   "後文確認：dakshina 的語言證據正是在補上「沒有實物證據」的缺口，與前句「古印度地圖朝東」的主張在語意上銜接，驗證上述判斷。",
   "逐一排除：(A) dakshina 是下一句才出現的語言證據，並非被支持的對象；(B) physical evidence 在 this 同一句中是被否定的「證據」，不能被「證據」支持；(C) Ancient India 是地點，不是可以被證據「支持」的主張。"
  ],
  "options": {
   "A": {
    "why": "The word dakshina. 它出現在 this 之後，是文章接著提出的語言證據（dakshina 既指 south 也指 right），是用來支持主張的證據，不是被支持的主張；此處 this 與前一句銜接，是回指前句的內容。"
   },
   "B": {
    "why": "Physical evidence. to support this 是修飾 physical evidence 的不定詞，證據是「去支持」的一方，this 是被支持的對象，不可能又指證據本身；句意會變成「沒有實物證據去支持實物證據」。"
   },
   "C": {
    "why": "Ancient India. 古印度是地點與文化，能被「描寫」或「討論」，但不是需要證據支持的內容；單指一個地名也不符合 support this 的語意（支持一個說法／假設）。"
   },
   "D": {
    "why": "官方答案。this 回指前一句整個主張：古印度的地圖很可能以東為上（maps … oriented to the east），Though 子句的意思是「雖然沒有實物證據支持這個說法」。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "most likely",
    "zh": "很可能",
    "note": "most likely 表示可能性大；文中 were most likely oriented to the east 屬於推測語氣，因此後面才說 no physical evidence 支持，語意相符。"
   },
   {
    "type": "word",
    "t": "physical evidence",
    "pos": "n.",
    "zh": "實物證據",
    "note": "evidence 為不可數名詞，不加 s（文中第 2 段另一句寫成 evidences，屬非標準用法，作答時不需受影響）。"
   },
   {
    "type": "word",
    "t": "support",
    "pos": "v.",
    "zh": "支持、證實",
    "note": "support a claim / theory / idea 表示以證據支持某個說法；因此本題 support this 的 this 應是一個主張，而非單一名詞。",
    "coll": [
     "support a theory",
     "evidence to support a claim"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "Though there is no physical evidence to support this, … 是讓步副詞子句（雖然…），to support this 是不定詞片語，修飾 evidence（用來支持這個主張的證據）。this 為指示代名詞，回指前一句的整個主張，而不是句中的單一名詞。",
  "zh": "第 2 段：古代文獻顯示，早期許多地圖是朝向太陽升起的東方。例如在古印度，地圖很可能以東為上。雖然沒有實物證據支持這種說法，但印度諸語言中的 dakshina（「南方」）也指「右邊」，顯示古印度人是面向東方，因此南方在他們的右手邊。／題目與正確選項：第 2 段中的 “this” 指什麼？(D) 地圖以東為上。",
  "aiFlags": [
   "第 2 段 “Ample evidences” 為原文用法瑕疵（evidence 為不可數名詞），不影響本題。",
   "this 可指「古印度地圖朝東」或更廣的「早期地圖朝東」（前句另有 many maps in early ages），兩者皆對應 (D)，不影響答案。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-45": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "先看原句：“So, perhaps the north-on-top practice is less a rule and more a blip.” 句型 less A and more B＝「與其說是 A，不如說是 B」，所以 a blip 與 a rule 是相對的概念：rule 是固定、一直適用的規則，blip 就是不固定、暫時的偏離。",
   "再看下一句：“After centuries of technological advancements, it seems we’ve ended up right where we began in ancient times: with ourselves in the middle, and our destinations at the top.” 說經過幾世紀又回到古代的起點，表示北在上方只是中間繞了一段路，並不是永遠不變的規則。",
   "合併全文脈絡：文章先後介紹東（第 2 段）、南（第 3 段）、北（第 4 段）、GPS（第 5 段）等不同做法（不代表年代先後），可見上方方向一直在變；第 6 段又說 GPS 讓我們回到「以自己為中心、目的地在上」的古代起點，所以北在上只是其中一段暫時的做法。",
   "所以 a blip 意思接近 (A) A temporary state。(B) urgent need、(C) critical decision、(D) advanced system 都沒有在文章中被這樣描述，也都不符合「與 rule 對比」的語意。"
  ],
  "options": {
   "A": {
    "why": "官方答案。blip 原指（雷達螢幕上的）一閃而過的小光點，引申為「短暫的變動、暫時的偏離」。與 rule（固定規則）相對，再加上最後一句「繞了一圈回到起點」，說明北在上方只是暫時的一段，故選 temporary state。"
   },
   "B": {
    "why": "An urgent need（緊急的需求）。文章沒有任何「迫切需求」的敘述，語意也不是在與 rule 對比。"
   },
   "C": {
    "why": "A critical decision（關鍵的決定）。文章沒有提到任何人做出決定，作者談的是這個做法是否長久，而非誰決定的。"
   },
   "D": {
    "why": "An advanced system（先進的系統）。上一句提到 technological advancements 與 GPS，容易讓人聯想到 advanced；但 blip 是在形容「北在上方」這個做法，作者說它不是規則，而是短暫的現象，並非在稱讚它是先進系統。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "blip",
    "pos": "n.",
    "zh": "短暫的小變動；（螢幕上的）閃現的光點",
    "note": "原指雷達或儀器螢幕上短暫出現的小亮點，引申為「暫時的偏差、小插曲」。文中 more a blip 表示「只是一時的偏離」。",
    "coll": [
     "a blip on the radar",
     "a temporary blip"
    ]
   },
   {
    "type": "phrase",
    "t": "end up",
    "zh": "最後落得、終究到達",
    "note": "we’ve ended up right where we began 表示「最後又回到了起點」；end up 後可接 in/at 或 V-ing，也可接地點副詞。",
    "coll": [
     "end up doing sth",
     "end up in…"
    ]
   },
   {
    "type": "word",
    "t": "advancement",
    "pos": "n.",
    "zh": "進步、發展",
    "note": "technological advancements 指科技的進步；可數時用複數。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "S + is + less (a/an) A + and more (a/an) B\n意思：與其說是 A，不如說是 B。\n例如：The test is less a measure of ability and more a measure of effort.\n這個測驗與其說是在衡量能力，不如說是在衡量努力。\n注意：A 與 B 在句中是對比關係；本文中 rule（固定規則）與 blip（暫時的偏離）相對，因此 blip 的意思要從這個對比推得。"
  ],
  "grammar": "",
  "zh": "最後一段：所以，把北放在上方，與其說是規則，不如說是一時的偏離。經過幾世紀的科技進步，我們似乎回到了古代的起點：以自己為中心，目的地在上方。／題目與正確選項：最後一段的 “a blip” 最接近下列何者的意思？(A) 暫時的狀態。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "115-46": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "逐項回到文章找依據。(A) 看第 4 段：sailors relied on the North Star to find their way（水手靠北極星找路）。北極星是「指引方向的依據」，並非「最終目的地」，選項把 guide 說成 destination。",
   "(B) 看第 5 段：GPS 的地圖 “layouts are dynamic, oriented toward our travel path”（版面是動態的，朝向我們的行進路線），並說 directions have ceased to be as important（方向已不那麼重要），所以 GPS 沒有固定的方向，與選項相反。(C) 看第 2 段：Old Testament 的證據顯示 pre-Biblical and Biblical eras 的地圖是 east 在上；south 在上是第 3 段「最古老現存地圖」（埃及、阿拉伯），不是說 pre-Biblical 時期。",
   "(D) 看第 3 段末句：阿拉伯的製圖者也把 south 放在上方，因為最早的穆斯林住在麥加的北方，南向的地圖會讓信徒向上看著聖城（holy city）。這是宗教因素，故 (D) 為文章所述。",
   "所以答案是 (D)。(D) 的 Old Islamic maps／religious purposes 是對第 3 段 Arabia 製圖者與信徒看向聖城的內容所做的概括改寫。"
  ],
  "options": {
   "A": {
    "why": "Sailors took the North Star as their final destination. 第 4 段說的是水手 relied on the North Star to find their way（靠北極星找出航向），北極星是引導方向的依據，不是要抵達的地點。把 guide 當成 destination 是陷阱。"
   },
   "B": {
    "why": "The GPS system has a fixed direction for orientation. 第 5 段說 GPS 的版面是 dynamic、oriented toward our travel path，也就是會隨行進方向調整；並非固定方向，故與文章相反。"
   },
   "C": {
    "why": "South was placed at the top of maps in the pre-Biblical era. 第 2 段明說 Old Testament 的證據顯示 pre-Biblical and Biblical eras 地圖是 east 在上；第 3 段的 south-up 是埃及與阿拉伯的地圖，文章並未說它們屬於 pre-Biblical 時代，因此 (C) 無從由文章得到支持，且與第 2 段針對該時期的敘述相反。"
   },
   "D": {
    "why": "官方答案。第 3 段末句：阿拉伯的製圖者把 south 放在上方，因為最早的穆斯林住在麥加以北，南向的地圖能讓信徒向上看向聖城；這是宗教原因，所以 (D) 正確。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "rely on",
    "zh": "依賴、依靠",
    "note": "sailors relied on the North Star to find their way：to find their way 是表目的的不定詞，表示「為了找到航路」。",
    "coll": [
     "rely on sb/sth for sth"
    ]
   },
   {
    "type": "word",
    "t": "oriented",
    "pos": "adj.",
    "zh": "朝向…的",
    "note": "oriented toward/to：第 5 段 oriented toward our travel path（朝向我們的行進路線）；第 2 段 oriented to the east（以東為上）。"
   },
   {
    "type": "word",
    "t": "destination",
    "pos": "n.",
    "zh": "目的地",
    "note": "第 6 段 our destinations at the top 指目的地位於地圖上方；與選項 (A) 比較：North Star 是 guide，不是 destination。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段末句：阿拉伯的製圖者也把南方畫在上方，因為最早的穆斯林住在麥加的北方，朝南的地圖會讓信徒看起來是仰望他們的聖城。／第 4 段：水手們靠北極星找出橫越地中海、後來橫越大西洋的路。／第 5 段：GPS 的版面是動態的，朝向我們的行進路線。／第 2 段：《舊約》中有充分的證據也顯示，在前聖經時代與聖經時代，地圖是以東為上。／題目與正確選項：下列哪一項敘述是正確的？(D) 古老的伊斯蘭地圖為了宗教目的把南方放在上方。",
  "aiFlags": [
   "(D) 的 “Old Islamic maps” 是對第 3 段 “Map makers in Arabia … the earliest Muslims” 的概括，文章並未直接使用 Islamic maps；“for religious purposes” 的依據是「讓信徒向上看著聖城」，文章說的是這個排版效果（a south-oriented map would show the followers looking up toward their holy city）。這是合理推論，且其他三項都明顯與文章不符，故不影響官方答案，但說明時需讓學生理解 (D) 是概括性的改寫。",
   "(C) 的排除依據是第 2 段明說 pre-Biblical 時期為 east-up；文章未說埃及／阿拉伯 south-up 地圖的年代，與 pre-Biblical 的時間關係並不明確，老師可提醒學生以文章明說內容為準。",
   "第 2 段 “Ample evidences” 為原文用法瑕疵（evidence 為不可數名詞），不影響本題。"
  ],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-18",
  "reviewNotes": "2026-11-18 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 }
};
