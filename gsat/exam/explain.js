// 原創詳解(自行撰寫,非第三方解析)。鍵為「年度-題號」。schema 2:引用單字詞條(gsat/data/vocab.js),字義與詞性只在詞條裡定義一次。
// status:draft＝AI 草稿,待英文老師審核;reviewed＝已審核(審核前不得標為 reviewed)。reviewer／reviewedAt／reviewNotes 由審核者填寫。
// 【資料來源】本檔是版本控制下的唯一來源,直接編輯;沒有任何 repo 外的產生流程,也不得再用腳本整檔重新產生(會把教師簽核欄位覆蓋回 draft;gsat/tests/test_signoff.py 會擋)。
// 已簽核的題目(目前有 114-1 ～ 114-46 與 115-1 ～ 115-46)必須有 docs/gsat/signoffs/<題號>.json,且內容指紋一致(python3 tools/gsat_signoff.py check);已簽核的內容被改動後檢查會失敗,需重新審核。
// 審核方式:python3 tools/gsat_review_sheet.py --out <版本庫以外的資料夾> 產生含題目與檢核欄位的審核表(內含試題,請勿公開)。
window.EXPLAIN = {
 "113-1": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "空格位於冠詞 a 與名詞 figure 之間，需要一個形容詞來修飾「身材」；四個選項都是形容詞，要靠語意與搭配區分。",
   "線索是 People who desire a ___ figure should exercise regularly and maintain healthy eating habits：透過運動與健康飲食所追求的理想身材，是「苗條、修長」的體態，slender 正好表達這個義項。",
   "figure 在此指「身材、體態」，slender figure 是常見搭配，形容人（尤其是身形）瘦而勻稱、好看。",
   "比較選項：spicy 形容食物辣；slippery 形容表面濕滑；slight 雖也能形容人瘦小，但主要義項是「輕微的」，且帶有瘦弱、嬌小的意味，不像 slender 是人們主動追求的修長身形。"
  ],
  "options": {
   "A": {
    "why": "spicy 是形容詞，意思是「辣的、辛辣的」，用來形容食物或調味，不能形容人的身材。這個字本身用法正確，但不符合本題語境。"
   },
   "B": {
    "why": "slender 是形容詞，「苗條的、修長的」，常用在 slender figure／waist／fingers；有正面意味，符合「透過運動與飲食想要擁有」的身材。"
   },
   "C": {
    "why": "slight 是形容詞，最常見義項是「輕微的、少量的」（a slight difference）；形容人時可指「瘦小、纖細的」（a slight figure）。這個字本身用法正確，但它帶有嬌小、瘦弱的意味，不如 slender 貼切地表達「為了好看而努力維持的苗條身材」，所以在本題語境中不選。"
   },
   "D": {
    "why": "slippery 是形容詞，「滑的、容易滑倒的」，如 a slippery floor；也可比喻「狡猾的」。這個字本身用法正確，但與身材無關，不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "slender",
    "pos": "adj.",
    "zh": "苗條的；纖細的；（機會、收入等）微薄的",
    "note": "形容人或物細長、勻稱。也可用於抽象事物：a slender chance 微小的機會、a slender majority 微弱多數。名詞 slenderness。",
    "coll": [
     "a slender figure",
     "slender fingers",
     "a slender waist"
    ]
   },
   {
    "type": "word",
    "t": "slight",
    "pos": "adj.",
    "zh": "輕微的；瘦小的",
    "note": "本題干擾字。最常見義項為「輕微的、少量的」；形容人時指「瘦小、纖細的」。副詞 slightly 稍微；not in the slightest 一點也不。",
    "coll": [
     "a slight difference",
     "not in the slightest"
    ]
   },
   {
    "type": "word",
    "t": "figure",
    "pos": "n.",
    "zh": "身材；數字；人物；圖表",
    "note": "本題為「身材、體態」，keep one's figure 保持身材。其他義項：數字（sales figures）、人物（a public figure）、圖（Figure 1）。動詞 figure out 弄清楚。",
    "coll": [
     "keep one's figure",
     "a public figure"
    ]
   },
   {
    "type": "word",
    "t": "slippery",
    "pos": "adj.",
    "zh": "滑的；狡猾的",
    "note": "指表面光滑易使人滑倒；比喻義為「狡猾、難以捉摸的」。名詞 slipperiness；動詞 slip 滑倒。",
    "coll": [
     "a slippery road"
    ]
   },
   {
    "type": "word",
    "t": "spicy",
    "pos": "adj.",
    "zh": "辣的",
    "note": "由名詞 spice（香料）加 -y 而成，指加了香料而辛辣的食物。",
    "coll": [
     "spicy food"
    ]
   },
   {
    "type": "word",
    "t": "desire",
    "pos": "v.",
    "zh": "渴望；想要",
    "note": "本題為及物動詞，desire a slender figure。名詞也作 desire 渴望（a desire for sth）；比 want 正式。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "想要擁有苗條身材的人，應該規律運動並維持健康的飲食習慣。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-2": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "空格在 watch + 受詞 the sun 之後，接現在分詞表示「看著太陽正在……」；四個選項的動詞都能形成這個結構，要靠與 from a sea of clouds 的語意搭配來區分。",
   "線索是 from a sea of clouds：雲海是太陽的來源處，意思是太陽從雲海中「出現、露出」，emerge from 正是「從……中出現」的固定搭配。",
   "題幹描述的是看太陽從雲海中露出來（即一般所稱的日出雲海景象），emerging 正好描述這個「露出」的過程。",
   "比較選項：flashing 是閃光；rushing 是急衝；floating 是漂浮。它們都是自然英文，但都沒有「從某處出現」的語意，與 from a sea of clouds 搭配不如 emerging。"
  ],
  "options": {
   "A": {
    "why": "emerging 是 emerge（不及物動詞，「出現、浮現」）的現在分詞，emerge from 表示「從……中出現」；符合日出由雲海中露面的畫面，且 watch + 受詞 + V-ing 結構成立。"
   },
   "B": {
    "why": "flash 是動詞，「閃現、閃爍」，如 lightning flashing in the sky。這個字本身用法正確，但強調瞬間閃光，且不表示「從雲海中露出」，不符合本題語境。"
   },
   "C": {
    "why": "rush 是動詞，「衝、急促移動」，如 rushing water。這個字本身用法正確，但描述的是快速衝向某處的動作，與太陽從雲海中露出的畫面不合，不符合本題語境。"
   },
   "D": {
    "why": "float 是動詞，「漂浮」，如 clouds floating in the sky。這個字本身用法正確，但 float 描述在水面或空中漂著，不表示由雲海中露出的過程；搭配 from 也不如 emerge from 貼切，故本題不選。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "emerge",
    "pos": "v.",
    "zh": "出現；浮現；（真相等）顯露",
    "note": "不及物動詞，常接 from（從……出現）。名詞 emergence 出現；形容詞 emerging 新興的（emerging markets）。注意與 emergency（緊急情況）拼字相近。",
    "coll": [
     "emerge from",
     "emerge as a leader"
    ]
   },
   {
    "type": "word",
    "t": "a sea of",
    "pos": "phrase",
    "zh": "一大片的；一大堆的",
    "note": "a sea of clouds 雲海；a sea of people 人海，用 sea 比喻數量眾多、一望無際。"
   },
   {
    "type": "word",
    "t": "flash",
    "pos": "v.",
    "zh": "閃現；閃爍",
    "note": "可作及物或不及物。名詞 flash 閃光，in a flash 轉眼間。",
    "coll": [
     "flash a smile",
     "in a flash"
    ]
   },
   {
    "type": "word",
    "t": "rush",
    "pos": "v.",
    "zh": "衝；匆忙行動",
    "note": "rush to 衝向；rush hour 尖峰時間。",
    "coll": [
     "rush to the station"
    ]
   },
   {
    "type": "word",
    "t": "float",
    "pos": "v.",
    "zh": "漂浮",
    "note": "在水面或空中漂著；名詞 float 浮板、遊行花車。",
    "coll": [
     "float on water"
    ]
   },
   {
    "type": "word",
    "t": "must-do",
    "pos": "adj.",
    "zh": "非做不可的",
    "note": "由 must + do 組成的複合形容詞，a must-do activity 指必做的活動，類似 must-see（必看的）。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "watch + 受詞 + V-ing\n意思：看著某人／某物正在做某事\n例如：We watched the sun emerging from the clouds.（我們看著太陽從雲中露出來。）\n注意：watch + 受詞 + 原形動詞 強調看完整個過程；V-ing 強調過程正在進行。"
  ],
  "grammar": "",
  "zh": "看著太陽從雲海中升起，是所有造訪阿里山的遊客必做的活動。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-3": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "空格在 the next bus is ___ 的句末，位於 be 動詞之後，需要形容詞（補語）；前面的 what time 問的是「時間」，後面沒有其他補語。",
   "線索是 I've been waiting here for more than 30 minutes：說話者等了很久，所以問下一班公車「預定幾點到」。be due 表示「預定、預期（在某時間）到達或發生」。",
   "due 是多義形容詞，常見義項有：預定的（The train is due at six.）、到期的（The rent is due.）、應得的；本題用「預定到達」。",
   "比較選項：apt、bound、docked 都能是 be 動詞後的字，但 apt 後接 to V 表示「易於……」，bound 要接 for＋地點或 to V，docked 是被動「已停靠」，句末都沒有接續成分或語意不合。"
  ],
  "options": {
   "A": {
    "why": "apt 是形容詞，常用 be apt to V，「易於、傾向於做某事」，如 Glass is apt to break.。這個字本身用法正確，但後面需要 to V，且表示傾向而非班次時間，不符合本題語境。"
   },
   "B": {
    "why": "due 在此為形容詞，be due 表示「預定（在某時間）到達」，可單獨出現在句末，也可接 to V（The bus is due to arrive at 3.）；與 what time 搭配自然，符合等車的情境。"
   },
   "C": {
    "why": "bound 是形容詞，常見用法 be bound for + 地點（開往某地）、be bound to V（一定會）。這個字本身用法正確，但 what time the bus is bound 後缺少 for 的受詞或 to V，且語意並不是詢問時間，不符合本題語境。"
   },
   "D": {
    "why": "docked 來自動詞 dock（船靠碼頭；也可指扣薪），be docked 可指「（船）已靠岸」。這個字本身用法正確，但多用於船隻，且不表示「預定時間」，不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "due",
    "pos": "adj.",
    "zh": "預定的；到期的；應有的",
    "note": "本題用法：be due（預定要到達／發生）。其他常見用法：be due to V 預定要；due to + 名詞 由於；The payment is due on Friday. 到期；in due course 在適當的時候。",
    "coll": [
     "be due to V",
     "due to",
     "be due on Friday"
    ]
   },
   {
    "type": "word",
    "t": "bound",
    "pos": "adj.",
    "zh": "一定會的；開往……的",
    "note": "be bound to V 一定會；be bound for 前往（某地）。注意 bound 也是 bind 的過去式與過去分詞。",
    "coll": [
     "be bound for",
     "be bound to V"
    ]
   },
   {
    "type": "word",
    "t": "apt",
    "pos": "adj.",
    "zh": "易於……的；恰當的",
    "note": "be apt to V 傾向於；an apt remark 恰當的評論。",
    "coll": [
     "be apt to V"
    ]
   },
   {
    "type": "word",
    "t": "dock",
    "pos": "v.",
    "zh": "（船）靠港；扣除（薪水）",
    "note": "名詞 dock 碼頭。docked 常用於船隻靠岸；也可指扣除薪水，如 have one's pay docked。"
   },
   {
    "type": "phrase",
    "t": "for more than 30 minutes",
    "zh": "超過三十分鐘",
    "note": "「for + 一段時間」表示持續多久，與現在完成進行式 have been waiting 連用，表示等待從過去持續到現在。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "你知道下一班公車預定幾點到嗎？我已經在這裡等超過三十分鐘了。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-4": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "空格在 high ___ 中，前面有形容詞 high，且與 roasting heat 並列為使人感到悶熱的原因，所以需要一個名詞。",
   "線索是 hot and sticky：悶熱又黏膩的感覺，是高溫加上「高濕度」造成的，humidity 指空氣中的水氣含量。",
   "high humidity 是天氣描述中很常用的搭配，與 heat 並列為天氣因素。",
   "比較選項：density（密度）常用於人口或物質；circulation 指循環、流通或發行量；atmosphere 指大氣層或氣氛，都不是描述「悶熱黏膩」的天氣因素。"
  ],
  "options": {
   "A": {
    "why": "density 是名詞，「密度」，如 population density（人口密度）。這個字本身用法正確，但 high density 指單位空間內的數量多，與讓人覺得黏膩的天氣原因不符。"
   },
   "B": {
    "why": "humidity 是名詞，「濕度、潮濕」，指空氣中的水氣含量；高溫加高濕度會讓人覺得悶熱黏膩（hot and sticky），語意最符合。"
   },
   "C": {
    "why": "circulation 是名詞，「循環、流通」（blood circulation 血液循環）或「發行量」。這個字本身用法正確，但與天氣悶熱的原因無關，不符合本題語境。"
   },
   "D": {
    "why": "atmosphere 是名詞，「大氣層」或「氣氛」（a friendly atmosphere）。這個字本身用法正確，但 high atmosphere 並不表示濕度，也無法說明身體感覺黏膩，不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "humidity",
    "pos": "n.",
    "zh": "濕度；潮濕",
    "note": "形容詞 humid 潮濕的；高溫高濕天氣常說 hot and humid。",
    "coll": [
     "high humidity",
     "the humidity level"
    ]
   },
   {
    "type": "word",
    "t": "humid",
    "pos": "adj.",
    "zh": "潮濕的（空氣中水氣多的）",
    "note": "humidity 的形容詞形式。常見於 hot and humid（又熱又濕）。"
   },
   {
    "type": "word",
    "t": "density",
    "pos": "n.",
    "zh": "密度",
    "note": "形容詞 dense 密集的。population density 人口密度。",
    "coll": [
     "population density"
    ]
   },
   {
    "type": "word",
    "t": "circulation",
    "pos": "n.",
    "zh": "循環；流通；發行量",
    "note": "動詞 circulate 循環、流傳。blood circulation 血液循環；a newspaper's circulation 報紙發行量。",
    "coll": [
     "blood circulation"
    ]
   },
   {
    "type": "word",
    "t": "atmosphere",
    "pos": "n.",
    "zh": "大氣層；氣氛",
    "note": "可指地球大氣，也可指場所的氛圍。形容詞 atmospheric。",
    "coll": [
     "a relaxing atmosphere"
    ]
   },
   {
    "type": "word",
    "t": "roasting",
    "pos": "adj.",
    "zh": "酷熱的",
    "note": "口語中形容天氣極熱，如 a roasting day；動詞 roast 烘烤。"
   },
   {
    "type": "word",
    "t": "sticky",
    "pos": "adj.",
    "zh": "黏的；悶熱黏膩的",
    "note": "指皮膚因汗水而覺得黏膩，也指東西黏手。"
   },
   {
    "type": "phrase",
    "t": "cool off",
    "zh": "降溫；冷靜下來",
    "note": "no matter what I did to cool off：無論我做什麼來降溫；cool off 可指身體變涼，也可指情緒平復。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "酷熱的高溫加上高濕度，讓我覺得又熱又黏，不管怎麼做來降溫都沒有用。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-5": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "空格前有助動詞 will no doubt，後有名詞片語 the test of time，所以空格需要原形動詞，且能以 the test of time 為受詞。",
   "題幹說偉大藝術家的作品「無疑會」如何面對 the test of time，語意是歷久不衰，對應固定搭配 stand the test of time。",
   "stand 在此是及物動詞，意思是「經得起、承受」（另有「忍受」，如 can't stand the noise），不是「站立」。",
   "比較選項：stay、take、serve 都不是「經得起時間考驗」的慣用動詞；固定說法是 stand the test of time（另有 withstand the test of time）。"
  ],
  "options": {
   "A": {
    "why": "stay 是動詞，常見義項是「停留、保持」（stay at home、stay calm）。這個字本身用法正確，但它沒有「經受考驗」的義項，也不構成 the test of time 的固定搭配，不符合本題語境。"
   },
   "B": {
    "why": "take 是動詞，take a test 是「參加考試」。這個字本身用法正確，但在 the test of time 中，test 指時間帶來的考驗，不是考試，所以 take 不符合本題語境。"
   },
   "C": {
    "why": "serve 是動詞，常見義項是「服務、供應（餐點）、擔任（職務）」。這個字本身用法正確，但無法表示「經得起時間考驗」，不符合本題語境。"
   },
   "D": {
    "why": "stand 在此為及物動詞，意思是「經受、禁得起」，stand the test of time 是固定說法，指事物歷經長久時間仍然有價值，符合對 Picasso 與 Monet 作品的描述。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "stand the test of time",
    "zh": "經得起時間的考驗",
    "note": "指事物歷經長久仍然受重視或有效，常見主詞：a classic、a design、a friendship。"
   },
   {
    "type": "word",
    "t": "stand",
    "pos": "v.",
    "zh": "站立；忍受；經受",
    "note": "多義字：站立（stand up）；忍受（can't stand the noise）；經得起（stand the test of time）；stand for 代表。名詞 stand 攤位、看台。",
    "coll": [
     "can't stand sth",
     "stand for"
    ]
   },
   {
    "type": "word",
    "t": "no doubt",
    "pos": "phrase",
    "zh": "無疑地；想必",
    "note": "will no doubt + 原形動詞 表示很有把握的推測，等於 undoubtedly。注意 no doubt 在口語中有時也表示「想必」，語氣略弱於 certainly。",
    "coll": [
     "no doubt",
     "without a doubt"
    ]
   },
   {
    "type": "word",
    "t": "artwork",
    "pos": "n.",
    "zh": "藝術作品",
    "note": "不可數名詞，指畫作、雕塑等創作；若指單一作品常用 a piece of artwork。",
    "coll": [
     "a piece of artwork"
    ]
   },
   {
    "type": "word",
    "t": "take",
    "pos": "v.",
    "zh": "拿；參加（考試）；花費",
    "note": "本題干擾字，take a test 參加測驗，但 the test of time 不是考試。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "畢卡索和莫內等真正偉大的藝術家所創作的作品，無疑將經得起時間的考驗。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-6": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "空格在 be 動詞 is 之後，作主詞 military service 的補語，需要形容詞；後面有 for men only，說明針對哪一類人。",
   "線索是分號後的 women do not have to serve in the military：女性「不必」服兵役，對比出男性「必須」服兵役，也就是「義務的、強制的」。",
   "compulsory 指法律或規定要求必須做，如 compulsory education（義務教育）、compulsory military service（義務役）。",
   "比較選項：forceful（強而有力的）、realistic（務實的）、distinctive（獨特的）都是形容詞，但都不表示「規定必須」，所以不符合本句。"
  ],
  "options": {
   "A": {
    "why": "forceful 是形容詞，「強而有力的、有說服力的」，如 a forceful speech。這個字本身用法正確，但它形容人或言論的力道，不表示法律要求必須做，不符合本題語境。"
   },
   "B": {
    "why": "realistic 是形容詞，「實際的、務實的」，如 a realistic plan。這個字本身用法正確，但無法說明男女服兵役義務的差別，不符合本題語境。"
   },
   "C": {
    "why": "compulsory 是形容詞，「義務的、強制的」，指依法律或規定必須做；與後半句「女性不必服兵役」形成對比，語意最準確。"
   },
   "D": {
    "why": "distinctive 是形容詞，「獨特的、有特色的」，如 a distinctive style。這個字本身用法正確，但它說的是「有特色、容易辨認」，無法表達「法律規定必須服役」的意思，不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "compulsory",
    "pos": "adj.",
    "zh": "義務的；強制的",
    "note": "指法律或規定要求必須做的。近義字 mandatory、obligatory；反義字 optional（可選擇的）、voluntary（自願的）。名詞形 compulsion 強迫。",
    "coll": [
     "compulsory education",
     "compulsory military service"
    ]
   },
   {
    "type": "word",
    "t": "military service",
    "pos": "n.",
    "zh": "兵役",
    "note": "serve in the military 服兵役；service 在此是「兵役、服務」，與 serve 相關。",
    "coll": [
     "serve in the military",
     "do military service"
    ]
   },
   {
    "type": "word",
    "t": "forceful",
    "pos": "adj.",
    "zh": "強而有力的",
    "note": "由 force + -ful 組成，形容語氣、論點或人格有力，不是「被強迫」。「被迫的」要用 forced（forced labor 強迫勞動）。",
    "coll": [
     "a forceful argument"
    ]
   },
   {
    "type": "word",
    "t": "realistic",
    "pos": "adj.",
    "zh": "務實的；寫實的",
    "note": "名詞 reality 現實；反義字 unrealistic。"
   },
   {
    "type": "word",
    "t": "distinctive",
    "pos": "adj.",
    "zh": "獨特的；有特色的",
    "note": "指與眾不同、容易辨認；注意與 distinct（明顯不同的）相關但不同義。"
   },
   {
    "type": "phrase",
    "t": "have to",
    "zh": "必須",
    "note": "do not have to 表示「不必」，語意是沒有義務，不是「禁止」（must not）。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "在某些國家，兵役只對男性是義務的；女性不必服兵役。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-7": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "空格前有 the，後有 for all the hard work，空格是名詞，且能與動詞 took 構成搭配，再接 for 說明「為了什麼」。",
   "線索是 The team complained：團隊在抱怨領導者每次都把全隊的辛苦成果「攬功」。took the credit for 是固定說法，指把功勞算在自己頭上。",
   "credit 在此是不可數名詞，義項為「功勞、榮譽」；其他義項：信用（on credit 賒帳）、學分（a credit）、credit card 信用卡。",
   "比較選項：advantage 習慣說 take advantage of（利用）；revenge 常說 take revenge on sb (for sth)，語意是報復；remedy 是補救辦法。三者的語意都與「把辛苦成果的功勞算在自己頭上」不合。"
  ],
  "options": {
   "A": {
    "why": "advantage 是名詞，「優勢、好處」，take advantage of 是「利用」。這個字本身用法正確，但 take advantage of 後接 of 且意思是「利用」；本題接 for all the hard work，語意是居功，不符合本題語境。"
   },
   "B": {
    "why": "revenge 是名詞，「報復」，take revenge on sb 是「向某人報復」。這個字本身用法正確，但 for all the hard work 與報復的語意不合，不符合本題語境。"
   },
   "C": {
    "why": "remedy 是名詞，「療法、補救辦法」，如 a remedy for a cold。這個字本身用法正確，但與領導者攬功的情境無關，不符合本題語境。"
   },
   "D": {
    "why": "credit 在此為不可數名詞，「功勞、榮譽」；take the credit for sth 是「把……的功勞攬在自己身上」，符合團隊抱怨領導者的情境。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "take the credit for",
    "zh": "把……的功勞攬在自己身上",
    "note": "可以說 take (the) credit for sth；常含有「功勞不是自己的」的負面意味。對應用法：give sb credit for sth 把功勞歸給某人。",
    "coll": [
     "take credit for",
     "give sb credit for"
    ]
   },
   {
    "type": "word",
    "t": "credit",
    "pos": "n.",
    "zh": "功勞；信用；學分",
    "note": "本題為不可數名詞「功勞、榮譽」。其他義項：on credit 賒帳；a credit card 信用卡；earn credits 修得學分。動詞 credit sb with sth 把……歸功於某人。",
    "coll": [
     "get credit for",
     "on credit"
    ]
   },
   {
    "type": "word",
    "t": "take advantage of",
    "pos": "phrase",
    "zh": "利用",
    "note": "可為正面（善用機會）或負面（占人便宜）。take advantage of 的 advantage 後接 of。",
    "coll": [
     "take advantage of an opportunity"
    ]
   },
   {
    "type": "word",
    "t": "revenge",
    "pos": "n.",
    "zh": "報復",
    "note": "take/get/seek revenge on sb for sth；近義字 vengeance。"
   },
   {
    "type": "word",
    "t": "remedy",
    "pos": "n.",
    "zh": "療法；補救辦法",
    "note": "a remedy for sth；動詞 remedy 補救、糾正。"
   },
   {
    "type": "word",
    "t": "complain",
    "pos": "v.",
    "zh": "抱怨",
    "note": "complain that 子句；complain about/of sth。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "團隊抱怨說，他們的領導者總是把全體成員辛苦完成的工作成果的功勞攬在自己身上。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-8": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "主詞 the business hotel 是第三人稱單數，空格是現在簡單式的動詞 -s 形，後面有受詞 not only good service but also convenient public transport。",
   "句首 Located at the center of the city 說明飯店的位置，接著談它能讓住客得到什麼：好服務與便利的交通。promise 在此是及物動詞，意思是「（事物）使人預期會有、保證有」。",
   "promise + 名詞的用法：The hotel promises good service. 指飯店向客人承諾（或其條件使人有把握預期）提供好服務。",
   "比較選項：proposes（提議）、contains（包含）、confirms（確認）都是第三人稱單數動詞，但它們的語意都不是「保證會提供」。"
  ],
  "options": {
   "A": {
    "why": "proposes 是 propose（提議、求婚）的第三人稱單數，如 propose a plan。這個字本身用法正確，但 hotel 不會「提議」服務與交通，不符合本題語境。"
   },
   "B": {
    "why": "contains 是 contain（包含、容納）的第三人稱單數，如 The box contains books.。這個字本身用法正確，但 contain 指內含的東西，而便利的公共交通是位置條件，並非飯店內含的物品，語意不如 promises 貼切。"
   },
   "C": {
    "why": "promises 是 promise 的第三人稱單數；本題為及物動詞，「保證有、使人預期會有」。promise 後接 not only … but also … 的名詞片語，語意最順。"
   },
   "D": {
    "why": "confirms 是 confirm（確認、證實）的第三人稱單數，如 confirm a reservation。這個字本身用法正確，但 hotel 不會「確認」服務和交通，不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "promise",
    "pos": "v.",
    "zh": "承諾；保證會有",
    "note": "本題為及物動詞，指事物預示或保證會有。其他用法：promise to V；promise sb sth。名詞 promise 承諾；show promise 顯示出前途。",
    "coll": [
     "promise to V",
     "promise sb sth"
    ]
   },
   {
    "type": "word",
    "t": "promise",
    "pos": "n.",
    "zh": "承諾；前景",
    "note": "keep/break a promise 遵守／違背承諾；show great promise 很有前途。形容詞 promising 有前途的。",
    "coll": [
     "keep a promise",
     "show promise"
    ]
   },
   {
    "type": "word",
    "t": "contain",
    "pos": "v.",
    "zh": "包含；容納",
    "note": "指內部含有；名詞 container 容器、content 內容。"
   },
   {
    "type": "word",
    "t": "propose",
    "pos": "v.",
    "zh": "提議；求婚",
    "note": "propose + 名詞／V-ing／that 子句；propose to sb 向某人求婚。名詞 proposal。"
   },
   {
    "type": "word",
    "t": "confirm",
    "pos": "v.",
    "zh": "確認；證實",
    "note": "confirm a booking 確認訂位；名詞 confirmation。"
   },
   {
    "type": "phrase",
    "t": "not only … but also …",
    "zh": "不僅……而且……",
    "note": "連接並列成分，如本題的 good service 與 convenient public transport，兩邊的詞性或結構要相同。"
   },
   {
    "type": "phrase",
    "t": "Located at …",
    "zh": "位於……",
    "note": "分詞構句，可還原為 As／Since／Because it is located …（語意帶有「因為位於市中心所以……」的附帶理由）；Located 為過去分詞（被動），其意義上的主詞是主要子句的主詞 the business hotel。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "這間商務飯店位於市中心，不僅保證能提供良好的服務，也能讓住客享有便利的大眾運輸。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-9": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "空格前有 an，後接 for the public to donate blood，所以需要一個以母音開頭的單數名詞，且能與 make 搭配（making an ___）。四個選項都是以母音開頭的名詞。",
   "線索是 blood supplies have fallen to a critically low level：血液庫存嚴重不足，醫院因此向大眾「呼籲」捐血。make an appeal for sb to V 就是「呼籲某人做某事」。",
   "appeal 在此為名詞，義項是「呼籲、懇求」；其他義項：吸引力（sex appeal）、上訴（court appeal）。動詞用法 appeal to sb to V 也表示呼籲。",
   "比較選項：approach（方法、接近）、operation（手術、運作）、observation（觀察）都是名詞，但 make an approach / operation / observation 的意思與「呼籲捐血」不合。"
  ],
  "options": {
   "A": {
    "why": "appeal 在此為名詞，「呼籲」；make an appeal for sb to V（呼籲某人做某事）符合醫院因血庫不足而請大眾捐血的情境。"
   },
   "B": {
    "why": "approach 是名詞，「方法、途徑」或「接近」，make an approach to sb 是「接洽某人」。這個字本身用法正確，但不表示「呼籲」，不符合本題語境。"
   },
   "C": {
    "why": "operation 是名詞，「手術、運作、行動」，如 an operation on his knee。這個字本身用法正確，但 make an operation 並不構成「呼籲捐血」的語意，不符合本題語境。"
   },
   "D": {
    "why": "observation 是名詞，「觀察、評論」，make an observation 是「做觀察、發表看法」。這個字本身用法正確，但與請大眾捐血的行動無關，不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "appeal",
    "pos": "n.",
    "zh": "呼籲；吸引力；上訴",
    "note": "本題為「呼籲」：make an appeal for sth / to sb。其他義項：吸引力（The game has a wide appeal.）；法律上的上訴（file an appeal）。",
    "coll": [
     "make an appeal for sth",
     "sex appeal"
    ]
   },
   {
    "type": "word",
    "t": "appeal",
    "pos": "v.",
    "zh": "呼籲；吸引；上訴",
    "note": "appeal to sb to V 呼籲某人做某事；appeal to sb 對某人有吸引力；appeal for help 求助。形容詞 appealing 有吸引力的。",
    "coll": [
     "appeal to sb to V",
     "appeal for help"
    ]
   },
   {
    "type": "word",
    "t": "approach",
    "pos": "n.",
    "zh": "方法；接近",
    "note": "an approach to sth 處理某事的方法；動詞 approach 接近、著手處理。"
   },
   {
    "type": "word",
    "t": "operation",
    "pos": "n.",
    "zh": "手術；運作；行動",
    "note": "動詞 operate（動手術、運作）；undergo an operation 接受手術。",
    "coll": [
     "undergo an operation"
    ]
   },
   {
    "type": "word",
    "t": "observation",
    "pos": "n.",
    "zh": "觀察；評論",
    "note": "動詞 observe 觀察、遵守；make an observation 發表看法或進行觀察。"
   },
   {
    "type": "word",
    "t": "critically",
    "pos": "adv.",
    "zh": "危急地；嚴重地",
    "note": "critically low 表示程度到了危急的地步；也可作「批判地」。形容詞 critical。",
    "coll": [
     "critically ill",
     "critically low"
    ]
   },
   {
    "type": "word",
    "t": "donate",
    "pos": "v.",
    "zh": "捐贈",
    "note": "donate blood 捐血；donate sth to sb；名詞 donation、donor（捐贈者）。",
    "coll": [
     "donate blood",
     "blood donor"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "make an appeal for sb to V\n意思：呼籲某人做某事\n例如：The hospital made an appeal for people to donate blood.（醫院呼籲大家捐血。）\n注意：也可說 appeal to sb to V；appeal for sth 是「呼籲／請求某物」。"
  ],
  "grammar": "",
  "zh": "由於血液庫存已降至嚴重偏低的程度，許多醫院正在呼籲大眾捐血。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-10": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "空格在 would be ___ placed 之中，位於助動詞 be 與過去分詞 placed 之間，修飾動詞，所以需要副詞。",
   "線索是 he could not choose his study partners, but would be ___ placed：but 前後對比，不能「自己選擇」，因此是「隨機」被分組。randomly 表示不依任何規則、隨機地。",
   "randomly 的搭配：randomly selected／chosen／assigned／placed，都是指隨機的分配方式。",
   "比較選項：eligibly（合資格地）、apparently（顯然地）、consequently（因此）都是副詞，但都不是表達分配方式的「隨機」。"
  ],
  "options": {
   "A": {
    "why": "eligibly 是 eligible（有資格的）的副詞形式，罕見，且語意是「合資格地」，不能表示「分組的方式」，也無法與 could not choose 形成對比，不符合本題語境。"
   },
   "B": {
    "why": "randomly 是副詞，「隨機地」，修飾 placed，說明學生是被隨機分到學習小組；與 could not choose 形成自然的對比。"
   },
   "C": {
    "why": "apparently 是副詞，「顯然地；據說」，如 Apparently, he has left.。這個字本身用法正確，但它表示說話者的判斷或所聞，不說明分組的方式，不符合本題語境。"
   },
   "D": {
    "why": "consequently 是連接性副詞，「因此」，表示結果，如 Consequently, he failed.。這個字本身用法正確，但本句 but 之後並不是在說結果，也不能說明分組方式，不符合本題語境。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "randomly",
    "pos": "adv.",
    "zh": "隨機地；任意地",
    "note": "形容詞 random 隨機的；at random 隨機地。randomly selected 隨機挑選。",
    "coll": [
     "randomly selected",
     "at random"
    ]
   },
   {
    "type": "word",
    "t": "eligible",
    "pos": "adj.",
    "zh": "有資格的",
    "note": "be eligible for sth / to V；名詞 eligibility。副詞 eligibly 是其副詞形式。",
    "coll": [
     "be eligible for"
    ]
   },
   {
    "type": "word",
    "t": "apparently",
    "pos": "adv.",
    "zh": "顯然地；據說",
    "note": "可表示表面上看起來，也可表示據說；形容詞 apparent 明顯的。"
   },
   {
    "type": "word",
    "t": "consequently",
    "pos": "adv.",
    "zh": "因此；結果",
    "note": "表示結果的連接性副詞，近義 as a result、therefore；名詞 consequence 後果。",
    "coll": [
     "as a consequence"
    ]
   },
   {
    "type": "word",
    "t": "disappointed",
    "pos": "adj.",
    "zh": "失望的",
    "note": "be disappointed that / at / with；本題 felt disappointed when ... 描述情緒。"
   },
   {
    "type": "word",
    "t": "place",
    "pos": "v.",
    "zh": "安置；分配",
    "note": "place sb in a group 把某人分到小組；常用被動 be placed in。",
    "coll": [
     "be placed in a group"
    ]
   },
   {
    "type": "phrase",
    "t": "find out",
    "zh": "發現；查明",
    "note": "find out that ...，指得知原先不知道的資訊。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "David 發現自己不能選擇學習夥伴，而是會被隨機分到某個讀書小組時，感到很失望。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-11": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "看結構：主詞是 mystery shoppers，空格後直接出現 regular customers。四個選項都是動詞片語，要判斷哪一個能自然接身分名詞並表達「以某種身分出現」。pose as + 身分 正是「假扮成、冒充……」。",
   "上下文先說 mystery shoppers 是受雇購物並蒐集資料的 paid consumers；他們執行任務時不能讓店家知道自己的評估身分，因此會以一般顧客的身分購物、用餐、詢問或退貨。這就是 pose as regular customers。",
   "(B) pose as 意思是「假扮成、冒充」，後接身分名詞：pose as regular customers，再用 to V 說明目的，語意與結構都最順。",
   "排除：call for 是「需要、要求」，受詞通常是事物，不是把 customers 當身分；attend to 是「照料、處理」，語意變成他們去服務顧客，與身分相反；engage in 後面要接活動（engage in a discussion），不能接 regular customers 表示身分。"
  ],
  "options": {
   "A": {
    "why": "call for＝要求、需要（如 call for action）。受詞通常是事物或行動（call for action）。這個片語本身用法正確，但若填入，變成「神祕顧客要求一般顧客去購買…」，與前文「受雇去店裡購物、蒐集資料」的身分不合；本句要說的是他們以什麼身分行動，應是 pose as，所以不合。"
   },
   "B": {
    "why": "pose as＝假扮成、冒充（pose as a doctor）。mystery shoppers 以「regular customers」的身分去購買、用餐、詢問、退貨，才能觀察店家對一般顧客的真實服務，語意與結構都合。"
   },
   "C": {
    "why": "attend to＝照料、處理、專心於（attend to a customer）。這個片語本身自然，但意思是服務顧客，是店員的角色；mystery shoppers 是被服務的一方，所以不合本題語境。"
   },
   "D": {
    "why": "engage in＝從事、參與（活動），後面接活動或行為，如 engage in trade。此處 regular customers 是人的身分，不是活動，文法與語意都接不上。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "pose",
    "pos": "v.",
    "zh": "假扮；擺姿勢；造成（威脅、問題）",
    "note": "pose as + 身分 表示假扮成某種身分；另可作「擺姿勢」或 pose a threat / question（構成威脅、提出問題）。也可作名詞，指姿勢。",
    "coll": [
     "pose as sb",
     "pose a threat",
     "pose a question"
    ]
   },
   {
    "type": "phrase",
    "t": "call for",
    "zh": "需要；要求",
    "note": "及物片語，受詞常為行動、措施、事件，如 call for action、The situation calls for patience。"
   },
   {
    "type": "phrase",
    "t": "engage in",
    "zh": "從事；參與",
    "note": "後接活動、行為或名詞／動名詞，如 engage in sports、engage in conversation。"
   },
   {
    "type": "word",
    "t": "inquiry",
    "pos": "n.",
    "zh": "詢問；調查",
    "note": "文中 make inquiries 為固定搭配，意為「查詢、詢問」；inquiries 為複數名詞。",
    "coll": [
     "make inquiries",
     "an inquiry into sth"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "有時被稱為祕密購物者的神祕顧客，會假扮成一般顧客，去購買商品、在餐廳用餐、詢問事情或退貨。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-12": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "先找先行詞 the stores，再還原關係：They are assigned to the stores.。assign sb to + 地點／任務 中的介系詞是 to，而 the stores 正是 to 的受詞；因此關係化後要用 to which。",
   "還原句子：They are assigned to the stores.（他們被派到這些商店。）assign sb to sth 的介系詞是 to，所以把 to 移到關係代名詞前面，得到 the stores to which they are assigned。",
   "(D) to which 正好滿足：which 代替 the stores，to 與 assigned 搭配，且 to which 引導形容詞子句修飾 the stores。",
   "排除：with which 的介系詞與「被派到某處」的常見搭配 to 不符，for that 的結構不成立（that 前不能放介系詞）；in that 是連接詞片語（因為…），後面要接完整子句，而且不能用來修飾 the stores。"
  ],
  "options": {
   "A": {
    "why": "in that 是「因為／在於」的連接片語，無法建立 the stores 與 assigned to 之間的關係；本句需要的是由 They are assigned to the stores 還原出的 to which。"
   },
   "B": {
    "why": "with which 是「介系詞＋關係代名詞」，文法結構上能修飾 the stores，如 the tool with which they work。但「被派到某家店」的介系詞應為 to（be assigned to the stores），with which 無法還原出這個意思，所以不合。"
   },
   "C": {
    "why": "that 不能放在前置介系詞後形成 for that 關係結構，而且本句原本需要的介系詞是 to，不是 for；所以無法還原 They are assigned to the stores。"
   },
   "D": {
    "why": "to which＝（介系詞 to＋關係代名詞 which）。assign sb to sth 表示把某人派到某處或某任務；the stores to which they are assigned＝他們被派去的店家。介系詞前置後，which 指 the stores，子句結構完整，所以正確。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "be assigned to",
    "zh": "被分派到",
    "note": "assign sb to sth / some place：把某人分派到某處或某職務。被動為 be assigned to。",
    "coll": [
     "be assigned to a store",
     "assign sb to a task"
    ]
   },
   {
    "type": "word",
    "t": "assign",
    "pos": "v.",
    "zh": "分派；指派；指定（作業）",
    "note": "assign sth to sb（把…分派給某人）或 assign sb to sth（派某人到…）；名詞 assignment 為作業、任務。",
    "coll": [
     "assign homework",
     "assign sb to a project"
    ]
   },
   {
    "type": "phrase",
    "t": "介系詞＋whom/which",
    "zh": "關係代名詞前置介系詞",
    "note": "當關係子句中的動詞片語需要某個介系詞時，可以把介系詞提到 which / whom 前面，較正式；此時 that 不能放在介系詞後面。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "名詞 + 介系詞 + which / whom + 主詞 + 動詞\n意思：先行詞 + 該動詞所需的介系詞 + 關係代名詞\n例如：The stores to which they are assigned are all in the city.（他們被派去的店都在市區。）\n注意：介系詞前置時只能用 which / whom，不能用 that。"
  ],
  "grammar": "關係子句中的動詞片語若需要介系詞（assigned to the stores），可把介系詞連同關係代名詞放到子句前面：the stores to which they are assigned。",
  "zh": "他們針對自己被分派前往的商店，就產品品質、顧客服務與店內環境評分並提出報告。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-13": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "看空格位置：to avoid ____ 是用 avoid 後接名詞，表示依標準程序做事是為了避免什麼負面結果。",
   "看上下文：下一句說他們拿到 checklist，說明該觀察什麼，目的是 ensure consistency（確保一致）；之後又說蒐集 normal observations，如店內清潔度、服務時效等，這些都是為了讓評分一致（文中明說 ensure consistency）。",
   "由此推論，程序的用意在避免個人好惡影響評分。(D) personal bias（個人偏見）與「標準程序、一致性」直接呼應。",
   "avoid 之後要接「標準化程序能避免的問題」：程序的功能是統一標準，能避免的是因人而異的主觀判斷，只有 personal bias 符合；其他三項與程序的功能無關，文中也沒提到競爭、財務或種族。"
  ],
  "options": {
   "A": {
    "why": "keen competitions＝激烈的競爭。keen competition 通常用不可數單數，且評估程序與競爭無關，文章後面只談一致性，所以不合本題語境。"
   },
   "B": {
    "why": "financial hardship＝經濟困難。這個詞組本身用法正確，但 mystery shoppers 依標準程序評分，並不是為了避免經濟困難，文中也沒提到，所以不合。"
   },
   "C": {
    "why": "racial conflicts＝種族衝突。詞組本身用法正確，但文中沒有談到種族議題，標準程序的目的是讓評分一致，所以不合。"
   },
   "D": {
    "why": "personal bias＝個人偏見。照著 checklist 與標準程序評分，可以減少個人好惡影響結果，達成後句的 consistency，所以正確。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "bias",
    "pos": "n.",
    "zh": "偏見；偏袒",
    "note": "常見搭配 bias against / toward sb 或 sth；形容詞 biased（有偏見的）。",
    "coll": [
     "personal bias",
     "a bias against sb",
     "be biased"
    ]
   },
   {
    "type": "word",
    "t": "consistency",
    "pos": "n.",
    "zh": "一致性；連貫",
    "note": "形容詞 consistent（前後一致的）；與 ensure 搭配常見。",
    "coll": [
     "ensure consistency",
     "be consistent with"
    ]
   },
   {
    "type": "word",
    "t": "checklist",
    "pos": "n.",
    "zh": "檢查表；清單",
    "note": "由 check 與 list 組成的複合名詞，用來逐項確認是否完成或符合。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "在評估一間店時，神祕顧客必須遵循某些標準程序，以避免個人偏見。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-14": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "看空格位置：pretend to be ____ customers，空格要填修飾 customers 的形容詞，說明他們假裝成哪一種顧客。",
   "後面的 arguing with a salesperson without a good reason 是補充說明主句主詞 They 的行為：mystery shoppers 在扮演某類顧客時，會故意無緣無故與店員爭吵。這個行為最符合 difficult customers。",
   "前一句是 normal observations，本句 also 補充另一種做法：假扮不尋常的顧客，測試店員如何應對。(A) difficult customers（難搞的顧客）就是無故與店員爭執的顧客。",
   "排除：potential（潛在的）、constant（持續的）、anonymous（匿名的）都不能描述無故爭吵的行為。"
  ],
  "options": {
   "A": {
    "why": "difficult＝難應付的、難搞的。difficult customers 指脾氣差、愛找碴的顧客；後面的 arguing with a salesperson without a good reason 就是具體例子，所以正確。"
   },
   "B": {
    "why": "potential customers＝潛在顧客，指可能購買的人。這個詞組本身很自然，但 pretend to be potential customers 並不能解釋後面 arguing without a good reason 的行為；而且 mystery shoppers 假扮一般顧客本來就是潛在消費者，與前一句 normal 的觀察缺少區別，所以不合本題語境。"
   },
   "C": {
    "why": "constant＝持續不斷的。用來形容 customers 語意不清楚；若想說常客，一般用 regular customers。它也無法與後面無緣無故爭吵的行為連結，所以不合。"
   },
   "D": {
    "why": "anonymous＝匿名的。anonymous customers 在文法上可成立，但 anonymous 只說明身分不明，無法說明後面 arguing… 這種行為；mystery shoppers 本就隱藏身分，也無法與 normal 形成對比，所以不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "pretend",
    "pos": "v.",
    "zh": "假裝",
    "note": "pretend to V 假裝做某事；pretend (that) + 子句。名詞 pretense。",
    "coll": [
     "pretend to be",
     "pretend that…"
    ]
   },
   {
    "type": "word",
    "t": "difficult",
    "pos": "adj.",
    "zh": "難搞的；困難的",
    "note": "描述人時可指「難相處、難伺候的」：a difficult customer / child。",
    "coll": [
     "a difficult customer",
     "difficult to deal with"
    ]
   },
   {
    "type": "word",
    "t": "argue",
    "pos": "v.",
    "zh": "爭論；爭吵",
    "note": "argue with sb about sth；名詞 argument。",
    "coll": [
     "argue with sb",
     "argue about sth"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "arguing with a salesperson without a good reason 是分詞片語，補充說明 difficult customers 的行為（也可視為修飾主詞 They 的分詞構句），不影響選項判斷。",
  "zh": "他們也可能假扮成難搞的顧客，無緣無故地與店員爭吵。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-15": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看空格位置：areas for ____ 中 for 後需要名詞，表示「可改進的領域」。",
   "看邏輯鏈：identify areas for ___ → thereby help enhance the quality of products and services（藉此提升品質）。找出「可改進之處」才會使品質提升，所以空格是「改善」的意思。",
   "(C) improvement 與 enhance the quality 在語意上同方向；areas for improvement 是常見搭配，指「有待改進之處」。",
   "排除：distribution（分配、配送）、expectation（期待）、management（管理）都不能直接表示藉由找出缺點而提升品質。"
  ],
  "options": {
   "A": {
    "why": "distribution＝分配、配送、分布。字本身用法正確，但 areas for distribution 與提升品質的語意不合，文章也沒有談配送或分配，所以不合。"
   },
   "B": {
    "entry": "expectation-n",
    "why": "expectation＝期待、預期。這個字本身用法正確，但 areas for expectation 不是找出缺失、改善的意思；資料的用途是 enhance quality，不是設定期待，所以不合本題語境。"
   },
   "C": {
    "why": "improvement＝改善、進步。areas for improvement＝可改進的領域。找出需要改善之處，才能 thereby help enhance the quality of products and services，語意與搭配都最合。"
   },
   "D": {
    "why": "management＝管理、經營。areas for management 文法上可通，但意思是需要管理的領域，不是需要改進的部分；上文與 thereby 要求的是「改善品質」，所以不如 improvement。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "improvement",
    "pos": "n.",
    "zh": "改善；進步",
    "note": "由 improve 衍生，可數亦可不可數；常見搭配 areas for improvement、room for improvement、an improvement on / in sth。",
    "coll": [
     "areas for improvement",
     "room for improvement"
    ]
   },
   {
    "type": "word",
    "t": "enhance",
    "pos": "v.",
    "zh": "提升；增強",
    "note": "及物動詞，常接 quality、performance、experience 等。",
    "coll": [
     "enhance the quality of",
     "enhance one's reputation"
    ]
   },
   {
    "type": "word",
    "t": "thereby",
    "pos": "adv.",
    "zh": "藉此；因此",
    "note": "表示前面的行為所帶來的結果，後面常接 V-ing，如 thereby reducing costs；本文為 and thereby help enhance。"
   },
   {
    "type": "phrase",
    "t": "competitive edge",
    "zh": "競爭優勢",
    "note": "edge 在此指優勢；常說 gain / have an edge over sb。",
    "coll": [
     "gain a competitive edge",
     "have an edge over sb"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "藉由所蒐集的資料，神祕顧客能找出有待改進的領域，進而協助提升產品與服務的品質。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-16": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "看空格前後：They ____ alarm clocks because adjustable alarms had been invented by the mid-19th century. 空格後 because 說明有可能使用鬧鐘的條件，下一句 But 卻說新裝置仍相對昂貴又不可靠，後面 thus 說工人依賴 knocker-up。",
   "判斷關係：because 子句說明「可以用」的理由，But 轉折說明「實際上沒有普遍使用」，所以空格是「本來可以使用（卻沒有）」。",
   "(B) could have used 是「could have + 過去分詞」，表示過去本有可能做但沒有做的情況，與整段轉折邏輯吻合。",
   "排除：must be using 是現在時間的肯定推測，與第二段的過去情境不合；had hardly used 與 because 因果不通；were mostly using 與後面 relied on a human alarm clock 的說法不一致。"
  ],
  "options": {
   "A": {
    "why": "must be using 表示對「現在正在發生」的事做肯定推測；本段談的是十九世紀的過去情況，時間不合，也與後面工人仍靠 knocker-up 的事實衝突，所以不合。"
   },
   "B": {
    "why": "could have used＝本來可以使用（卻沒有）。because 子句說明當時已有可調鬧鈴，具備使用的條件；But 之後說明因為昂貴又不可靠，實際上改靠 knocker-up，所以正確。"
   },
   "C": {
    "why": "had hardly used＝（在某個過去時間點之前）幾乎沒用過，用過去完成式。這個說法文法上可成立，但 because adjustable alarms had been invented 是「為什麼可以用」，而不是「為什麼幾乎沒用」，因果不通，所以不合。"
   },
   "D": {
    "why": "were mostly using＝當時大多在使用，過去進行式。若多數人已在用鬧鐘，後面 But 與 thus relied on a human alarm clock 就說不通，所以不合。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "could have + p.p.",
    "zh": "本來可以…（但沒有）",
    "note": "表示對過去未實現可能性的敘述：They could have used alarm clocks.（他們本來可以用鬧鐘。）也可表示對過去事實的可能性推測，需靠上下文判斷。"
   },
   {
    "type": "word",
    "t": "adjustable",
    "pos": "adj.",
    "zh": "可調整的",
    "note": "由 adjust（調整）加 -able 構成；adjustable alarms 指可設定時間的鬧鈴。"
   },
   {
    "type": "word",
    "t": "unreliable",
    "pos": "adj.",
    "zh": "不可靠的",
    "note": "reliable（可靠的）的反義字；加上 un- 構成。"
   },
   {
    "type": "word",
    "t": "relatively",
    "pos": "adv.",
    "zh": "相對地；比較地",
    "note": "修飾形容詞，如 relatively expensive；表示與其他情況相比。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "could have + 過去分詞\n意思：過去本來可以…（但沒有發生）\n例如：You could have called me.（你本來可以打電話給我。）\n注意：也可用於對過去的可能性推測，需靠上下文判斷；本題 But 轉折，指未實現的可能。"
  ],
  "grammar": "because 子句中的 had been invented by the mid-19th century 用過去完成式，表示在某個過去時間點（十九世紀中葉）之前就已完成的事。",
  "zh": "他們本來可以使用鬧鐘，因為可調式鬧鐘在十九世紀中葉前就已發明。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-17": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看句子結構：空格後是 sticks or pea shooters，逗號後才是主句 the human alarms would tour the streets…。所以空格開頭的是分詞片語，修飾主詞 the human alarms。",
   "判斷主詞與分詞的關係：human alarms 是被配備（equipped）工具的人，所以用過去分詞（被動意義）。",
   "(C) Equipped with sticks or pea shooters＝配備著棍子或豆子射管，說明他們用什麼工具叫人起床，與後面 tap on windows、blast them with dried peas 呼應。them 在此回指前面的 windows，所以 pea shooters 是用來把乾豆子射向窗戶，以聲響叫醒屋內的人。",
   "排除：Aimed at、Trained for、Exhausted by 的意思或搭配都不能與 sticks or pea shooters 構成「持有工具」的關係。"
  ],
  "options": {
   "A": {
    "why": "Aimed at＝以…為目標（be aimed at）。分詞構句文法上可成立，但 aimed at sticks 意思是瞄準棍子，與 human alarms 持棍敲窗的意思不合，所以不合。"
   },
   "B": {
    "why": "Trained for＝受過…訓練。分詞構句文法成立，但 trained for sticks or pea shooters 是說受過棍子或豆子射管的訓練，語意不通順（trained for 後通常接目的或工作）；本題要說的是手上配備工具，所以不合。"
   },
   "C": {
    "why": "Equipped with＝配備著。be equipped with sth 表示擁有某種裝備；Equipped with sticks or pea shooters 說明這些人以棍子或豆子射管為工具，所以正確。"
   },
   "D": {
    "why": "Exhausted by＝被…累壞。文法成立，但 exhausted by sticks or pea shooters 會變成被棍子累垮，與上下文無關，所以不合。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "be equipped with",
    "zh": "配備有",
    "note": "be equipped with sth＝擁有某種設備；分詞構句可省略 Being，寫成 Equipped with…。",
    "coll": [
     "be equipped with tools",
     "be well equipped for sth"
    ]
   },
   {
    "type": "word",
    "t": "wield",
    "pos": "v.",
    "zh": "揮舞；使用（武器、工具）",
    "note": "及物動詞，用於握持並使用棍棒等工具；與下一段開頭 Whether they wielded rods or pea shooters 呼應。"
   },
   {
    "type": "word",
    "t": "shooter",
    "pos": "n.",
    "zh": "射擊的人；發射器",
    "note": "pea shooter 為「豆子射管」，用管子吹射乾豌豆。"
   },
   {
    "type": "word",
    "t": "blast",
    "pos": "v.",
    "zh": "猛烈吹送；轟擊",
    "note": "blast sb with sth 在此指用乾豆子向窗戶射擊。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [
   "過去分詞片語, 主詞 + 動詞\n意思：（主詞）被…；有…\n例如：Equipped with a map, they set out.（帶著地圖，他們出發了。）\n注意：分詞的邏輯主詞必須是主句主詞。"
  ],
  "grammar": "空格是分詞構句（Being 省略）：Equipped with sticks…，邏輯主詞是主句的 the human alarms；人被配備工具，所以用過去分詞。would tour 的 would 表示過去的習慣。",
  "zh": "配備著棍子或豆子射管的人工鬧鐘會在街上巡行，敲打窗戶，或用乾豆子射擊窗戶，設法及時叫醒付費的客戶，讓他們趕得上上工。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-18": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "看空格位置：knockers-up became ____ throughout the United Kingdom，空格是 became 的補語，需要名詞詞組；選項皆為「形容詞＋複數名詞」。",
   "看後面的描述：Every morning … were seen in big streets and small alleys，waking up their customers professionally——每天出現在各大街小巷，且 usually would not leave … until they were sure their customers were awake。",
   "這些描述說明這些人是各地常見、人們熟悉的角色。(A) familiar presences（熟悉的存在）最合。",
   "排除：distant memories（遙遠的回憶）、vague images（模糊的影像）與後文「每天出現在大街小巷」的描述不連貫，這段敘述的是當時處處可見的情況，行業衰落是最後一段才談；public eyesores（公眾眼中的醜陋之物）帶強烈負面評價，文中完全沒有。"
  ],
  "options": {
   "A": {
    "why": "familiar presences＝熟悉的存在。presence 在此指出現的人；knockers-up 每天早晨出現在大街小巷，成為各地常見的人物，所以正確。"
   },
   "B": {
    "why": "distant memories＝遙遠的回憶。這個詞組本身自然，但本句與下一句描述的是當時每天都能見到的景象；文章要到最後一段才談這個行業的衰落，所以不合。"
   },
   "C": {
    "why": "vague images＝模糊的影像。詞組本身用法正確，但文章是在說這些人到處可見、職業化地叫醒客戶，不是模糊的印象，所以不合。"
   },
   "D": {
    "why": "public eyesores＝公共場所的礙眼之物（eyesore 指難看的東西）。這個詞組本身自然，但文中沒有任何對 knockers-up 的負面評價，他們被描述為專業地服務客戶，所以不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "presence",
    "pos": "n.",
    "zh": "存在；在場；出現的人",
    "note": "可指某人在場，也可指令人感到存在的人或事物；與 absence 相對。",
    "coll": [
     "a familiar presence",
     "in the presence of"
    ]
   },
   {
    "type": "word",
    "t": "familiar",
    "pos": "adj.",
    "zh": "熟悉的",
    "note": "be familiar with sth 指熟悉某事物；a familiar face 指熟面孔。",
    "coll": [
     "be familiar with",
     "a familiar face"
    ]
   },
   {
    "type": "word",
    "t": "eyesore",
    "pos": "n.",
    "zh": "礙眼之物",
    "note": "指難看、破壞景觀的東西；為 eye 與 sore 組成的名詞。"
   },
   {
    "type": "word",
    "t": "professionally",
    "pos": "adv.",
    "zh": "專業地；職業地",
    "note": "形容詞為 professional；此處描述他們以職業方式叫人起床。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "無論他們揮舞的是棍子還是豆子射管，這些敲窗叫醒人（knockers-up）在整個英國都成了人們熟悉的身影。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-19": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "看句子結構：While the practice continued in some parts… until the 1970s, it ____ as alarm clocks became more widespread and affordable. While 子句說明某些地區持續到 1970 年代，主句要與之形成對比。",
   "看 as 子句：as＝隨著，兩件事同步變化：鬧鐘越來越普及、越買得起，這個行業就越來越衰退，所以主句動詞應是「衰退、減少」。",
   "(D) 此處 declined 作不及物用法（衰退、減少），it 指 the practice，不需受詞，時態與 became 一致。",
   "排除：remained 與 While 子句的 continued 重複，無法形成對比；dismissed、revised 是及物動詞，後面需要受詞，且意義不合。"
  ],
  "options": {
   "A": {
    "why": "remained＝維持、仍然是。remained 文法上可接 as 引導的子句，但前面 While 子句已說行業延續到 1970 年代，主句又說維持不變，沒有對比；且與 as alarm clocks became more widespread 的因果不符，所以不合。"
   },
   "B": {
    "why": "dismissed＝解雇、摒棄、不予理會，是及物動詞，後面需要受詞（dismiss the idea）。這個字本身用法正確，但 it dismissed 沒有受詞，且被動才能說 it was dismissed，語意也不是衰退，所以不合。"
   },
   "C": {
    "why": "revised＝修訂，是及物動詞，後面要有受詞（revise a plan）。這個字本身用法正確，但 it revised 沒有受詞，而且意義與鬧鐘普及造成行業衰退無關，所以不合。"
   },
   "D": {
    "why": "declined＝衰退、減少（此處作不及物用法）。隨著鬧鐘普及、價格更負擔得起，knocker-up 這個行業走向衰退，所以正確。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "decline",
    "pos": "v.",
    "zh": "衰退；減少；婉拒",
    "note": "作不及物動詞表示數量、品質下降；作及物動詞可表示婉拒（decline an invitation）；名詞 decline 為衰退。",
    "coll": [
     "decline sharply",
     "on the decline"
    ]
   },
   {
    "type": "word",
    "t": "widespread",
    "pos": "adj.",
    "zh": "普遍的；廣泛的",
    "note": "形容事物範圍廣、使用或流行廣泛。"
   },
   {
    "type": "word",
    "t": "affordable",
    "pos": "adj.",
    "zh": "負擔得起的",
    "note": "由 afford 衍生；價格合理，指一般人買得起。"
   },
   {
    "type": "phrase",
    "t": "as + 子句",
    "zh": "隨著…",
    "note": "as 引導的副詞子句可表示兩件事同步變化，如 as technology advances。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "雖然這種做法在該國某些地區一直持續到 1970 年代，但隨著鬧鐘更普及、更負擔得起，它便衰退了。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-20": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "看句子結構：they cannot ____ the personal attention…，空格需要及物動詞，受詞是 the personal attention coming from the distinctive tap of a pea shooter。",
   "看轉折：前一句說鬧鐘和手機 are surely simpler and more convenient，本句以 However 轉折，要說明它們缺少的東西。",
   "personal attention 指人帶來的貼心關照；(C) match（比得上、與…相當）表示現代設備方便，卻比不上人工叫醒的個人關注。",
   "排除：空格受詞是 the personal attention，能與 attention 搭配表示「比得上」的是 match；forget、regret 是人的心理動作，主詞為鬧鐘與手機不合；change 後接 attention，意思與 However 要表達的缺憾轉折無關。"
  ],
  "options": {
   "A": {
    "why": "forget＝忘記，及物動詞。cannot forget the personal attention 文法成立，主詞是 alarm clocks 和 smartphones，說它們無法「忘記」那份關注，語意不通；也無法與前句 simpler and more convenient 形成對比，所以不合。"
   },
   "B": {
    "why": "change＝改變，及物動詞。cannot change the personal attention 文法上可通，但說鬧鐘無法「改變」那份關注，與上下文的轉折不合；本句要比較的是「提供的個人關照」，所以不合。"
   },
   "C": {
    "why": "match＝比得上、與…相當。However 轉折：現代鬧鐘雖然簡單方便，但比不上 pea shooter 敲窗所帶來的個人關注，所以正確。"
   },
   "D": {
    "why": "regret＝後悔、遺憾，及物動詞。cannot regret 語意奇怪，也無法與前句形成對比，所以不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "match",
    "pos": "v.",
    "zh": "與…相配；比得上",
    "note": "及物動詞，match sth 可指與某事物相當或匹敵：Nothing can match its taste.（沒有東西比得上它的味道。）名詞 match 為比賽、對手、火柴。",
    "coll": [
     "can't match",
     "be no match for sb"
    ]
   },
   {
    "type": "word",
    "t": "distinctive",
    "pos": "adj.",
    "zh": "獨特的；有特色的",
    "note": "表示容易辨認或有別於其他的特徵；distinguish 為動詞（區別）。"
   },
   {
    "type": "word",
    "t": "personal",
    "pos": "adj.",
    "zh": "個人的；親自的",
    "note": "personal attention 指由專人親自提供的關注。",
    "coll": [
     "personal attention",
     "personal touch"
    ]
   },
   {
    "type": "word",
    "t": "beeping",
    "pos": "adj.",
    "zh": "嗶嗶響的",
    "note": "由 beep（嗶聲）加 -ing；作形容詞修飾 alarm clocks。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "然而，今日嗶嗶作響的鬧鐘與播放晨間音樂的智慧型手機，仍比不上豆子射管獨特的敲擊聲所帶來的那種個人化關注。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-21": {
  "schema": 2,
  "answer": "E",
  "status": "reviewed",
  "key": [
   "詞性：空格在所有格 their 與名詞片語 loved ones 之間，需要修飾 loved ones 的形容詞（或當形容詞用的分詞）；who died in the tsunami 是後置的關係子句，不影響詞性判斷。",
   "上下文線索：電話亭用來連結家屬與在海嘯中 died 的 loved ones，指的是已經離世的親人。",
   "選定 (E) departed：departed 作形容詞，意思是「已逝的、過世的」，departed loved ones 即「已故的親人」，是常見的委婉說法；後面 who died 再說明他們是在海嘯中喪生。",
   "排除：(A) passed on 也有「去世」義，語意可通；但字庫每字只用一次，passed on 的「傳達」義正好是第 26 題 couldn’t be ___ through a regular phone line 的合適答案，而且 their passed on loved ones 不是慣用的前置修飾形式（一般用 departed、late、deceased 等），所以本題用 departed。(I) fateful 意為「決定命運的」，通常形容事件或日子，不形容親人；(H) manageable 是「可應付的」，與親人無關；(G) housed 是「被容納的」，the housed loved ones 語意不合。"
  ],
  "options": {
   "E": {
    "why": "departed 當形容詞表示「已逝世的」，放在名詞 loved ones 前最自然，語意也與 who died in the tsunami 一致。"
   },
   "A": {
    "why": "passed on 作「去世」時是片語動詞 pass on 的過去分詞，語意雖可通，但 their passed on loved ones 不是慣用的前置修飾形式（一般用 departed、late、deceased 等）；且字庫每字只用一次，passed on 的「傳達」義正好是第 26 題 couldn’t be ___ through a regular phone line 唯一合適的字，所以第 21 題選 (E)。"
   },
   "I": {
    "why": "fateful 是形容詞，意思是「決定命運的、重大的」，通常形容事件、日子或決定，不用來形容親人；它適合第 22 題的 that ___ day。"
   },
   "G": {
    "why": "housed 是 house（容納、收容）的過去分詞，可放在名詞前，但語意是「被容納的親人」，與「已逝的親人」無關。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "departed",
    "pos": "adj.",
    "zh": "已逝的、過世的",
    "note": "作形容詞時表示「已死去的」，是比 dead 委婉的用法；也可當名詞 the departed 表示「逝者」。另一個意思是 depart 的過去式／過去分詞（離開、出發），例如 The train departed at noon.",
    "coll": [
     "our departed loved ones",
     "the departed"
    ]
   },
   {
    "type": "word",
    "t": "loved ones",
    "pos": "n.",
    "zh": "親人、摯愛的人",
    "note": "複數名詞片語，指家人與親近的人，無論在世或已故；本句靠 departed 與 who died 才限定為已逝者。"
   },
   {
    "type": "word",
    "t": "claim",
    "pos": "v.",
    "zh": "奪走（生命）、聲稱",
    "note": "本句 the tsunami that claimed 18,000 lives 用 claim 表示災難「奪走」生命；claim 另一個常見義項是「聲稱」。",
    "coll": [
     "claim lives",
     "claim that…"
    ]
   },
   {
    "type": "word",
    "t": "serve to",
    "pos": "phrase",
    "zh": "用來、作用是",
    "note": "serve to + 原形動詞，表示「具有…的作用」。本句 serves to connect A to B 即「用來連結 A 與 B」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "這座孤單的「風之電話」的作用，是把家屬與在造成一萬八千人喪生的海嘯中逝去的親人連結起來。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-22": {
  "schema": 2,
  "answer": "I",
  "status": "reviewed",
  "key": [
   "詞性：空格在 that 與名詞 day 之間，需要形容詞修飾 day。",
   "上下文線索：that 指稱前文已出現的那一天，也就是第 1 段提到的海嘯當天；they never got to say 暗示親人在那天突然離世，家人沒機會把話說出口。因此需要形容「重大、令人難忘」的形容詞；字庫中可修飾 day 的形容詞是 departed、fateful、manageable，只有 fateful 合適。",
   "選定 (I) fateful：fateful 意為「決定命運的、重大而不幸的」，that fateful day 就是「那個命運攸關的日子」，指海嘯來襲那天。",
   "排除：(E) departed 是形容詞，但形容的是「人」，that departed day 不成語意；(H) manageable 是「可處理的」，與造成死亡的日子相反；(C) sorrow 與 (D) hope 是名詞，放在 that 與 day 之間雖可當名詞修飾語，但 that sorrow day、that hope day 都不是自然的說法，且意思也不對。"
  ],
  "options": {
   "I": {
    "why": "fateful 形容事件或日子具有重大、改變命運的影響，that fateful day 常用來指一個無法忘記的關鍵日子，與海嘯奪走親人的情境吻合。"
   },
   "E": {
    "why": "departed 是自然的形容詞，但意思是「已逝的」，通常修飾人；that departed day 不成語意，也無法表達「那個重大的日子」。"
   },
   "H": {
    "why": "manageable 是形容詞，意思是「可應付的、可處理的」，語意不合：奪走一萬八千條生命的海嘯之日，不會被形容成「可應付的」日子。"
   },
   "C": {
    "why": "sorrow 是名詞（悲傷）。名詞雖可放在名詞前當修飾語，但 that sorrow day 並不是自然的搭配，語意也只表達情緒而不指出那一天的重要性。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "fateful",
    "pos": "adj.",
    "zh": "決定命運的、重大的",
    "note": "由 fate（命運）加 -ful 而成，常形容改變人生的日子、決定或事件，如 a fateful decision、that fateful night。不要與 fatal（致命的）混淆。",
    "coll": [
     "a fateful day",
     "a fateful decision"
    ]
   },
   {
    "type": "phrase",
    "t": "get to + 原形動詞",
    "zh": "有機會做某事",
    "note": "文中 the words they never got to say 的 got to say 指「得以說出口、有機會說」，而不是「必須說」（have got to）。"
   },
   {
    "type": "word",
    "t": "overlook",
    "pos": "v.",
    "zh": "俯瞰、眺望",
    "note": "a hilltop overlooking the town 的 overlooking 是現在分詞，表示「從高處俯視」；overlook 另有「忽略」的意思。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "人們來這裡對逝去的人說話，把在那個命運攸關的日子裡來不及說的話說出口。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-23": {
  "schema": 2,
  "answer": "J",
  "status": "reviewed",
  "key": [
   "詞性：空格在 was first 與 by a Japanese garden designer 之間，構成被動式 be + 過去分詞 + by 動作者，需要及物動詞的過去分詞。",
   "上下文線索：The idea for the wind phone 是主詞，by a Japanese garden designer named Itaru Sasaki 說明提出者，first 表示「最先」；後文接著描述 Sasaki 如何構思這個電話亭。",
   "選定 (J) brought forth：bring forth 表示「提出、產生」，過去分詞為 brought forth，was first brought forth by… 即「最先由…提出」。",
   "排除：(A) passed on 是過去分詞，文法上 The idea was passed on by… 成立，但意思是「被傳下去、轉達」，暗示點子原本來自別人，而本句要說的是 Sasaki 是原創者，加上 first 更強調「最初提出」；(G) housed 是「容納、收容」，The idea was housed by a designer 語意不合；(E) departed 一般作「離開」的不及物動詞或「已逝的」形容詞，was first departed by… 語意不合。"
  ],
  "options": {
   "J": {
    "why": "brought forth 的意思是「提出（想法）、產生」，過去分詞形用在被動式 was first brought forth by…，與 first（最先）搭配，說明點子最早的來源是 Sasaki。"
   },
   "A": {
    "why": "passed on 當「傳遞、轉達」時是及物片語，The idea was passed on by… 文法與英文都成立。但它指把已存在的東西傳給別人，與「最初構想出來」不同；本句 first 與後文只談 Sasaki 自己的構想，因此不如 brought forth。"
   },
   "G": {
    "why": "housed 是 house 的過去分詞，意思是「容納、收容」。The idea was housed by a designer 語意不合：點子不是被設計師「容納」的東西。"
   },
   "E": {
    "why": "departed 一般作「離開」的不及物動詞或「已逝的」形容詞，放在 was first ___ by… 語意不合，也無法表達「提出點子」。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "bring forth",
    "zh": "提出、產生",
    "note": "bring 的過去式與過去分詞皆為 brought；bring forth 可指提出想法、提出證據，也可指產生（果實、結果）。bring forth 為及物片語，常見語序為 bring forth + 受詞（也可說 bring + 受詞 + forth）。",
    "coll": [
     "bring forth an idea",
     "bring forth a result"
    ]
   },
   {
    "type": "word",
    "t": "grieve",
    "pos": "v.",
    "zh": "悲傷、哀悼",
    "note": "用 grieve over / for sb 表示為某人的死去而悲傷，本句為不及物用法：who was grieving over the death of his cousin。名詞為 grief；形容詞為 grieving。",
    "coll": [
     "grieve over / for"
    ]
   },
   {
    "type": "word",
    "t": "designer",
    "pos": "n.",
    "zh": "設計師",
    "note": "由 design 加 -er 構成；a garden designer 即「庭園設計師」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "風之電話的構想最初是由一位名叫 Itaru Sasaki 的日本庭園設計師提出的，他當時正為 2010 年（海嘯發生前）過世的表親悲傷。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-24": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "詞性：空格在 navigate through the 之後，需要名詞作 through 的受詞。",
   "上下文線索：前文 who was grieving over the death of his cousin 與 a private space to help him navigate through…，說明他處在失去表哥的悲傷之中，需要私人空間幫助自己走過。",
   "選定 (C) sorrow：sorrow 為名詞，表示「悲傷、哀痛」，navigate through the sorrow 即「度過／走出悲傷」，與 grieving 語意一致。",
   "排除：(D) hope 是名詞，但 navigate through the hope（走過希望）與他正在哀悼的情境不合；(F) mechanism 是名詞，navigate through the mechanism（穿越機制）無法表達走出情緒；(B) bridge 是名詞，但他要走過的是情緒，而不是一座橋。"
  ],
  "options": {
   "C": {
    "why": "sorrow 與前面的 grieving 同義，navigate through the sorrow 是以「穿越、航行」比喻走過悲傷的歷程。"
   },
   "D": {
    "why": "hope 是不可數名詞，放在 the 後文法可行，但他是為了哀悼表哥而需要空間，並不是要走過「希望」，語意不符。"
   },
   "F": {
    "why": "mechanism（機制、裝置）是名詞，文法上能放在 the 後，但 navigate through the mechanism 是「通過一個機制」，與哀傷無關；第 29 題才是 mechanism 的位置。"
   },
   "B": {
    "why": "bridge 是名詞，文法可行，但 navigate through the bridge 描述空間移動，不是走出悲傷；本句要的是一種情緒狀態。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "sorrow",
    "pos": "n.",
    "zh": "悲傷、哀痛",
    "note": "可數與不可數皆可，常指因失去而生的深切悲傷；語氣較文雅、偏書面，與 sadness 的差別在語體與程度，不是固定規則。形容詞 sorrowful。",
    "coll": [
     "deep sorrow",
     "in sorrow"
    ]
   },
   {
    "type": "word",
    "t": "navigate",
    "pos": "v.",
    "zh": "導航、順利走過（困難）",
    "note": "本義為「航行、導航」，也可比喻「克服複雜的處境」，navigate through grief 即「走過哀傷」。名詞為 navigation。",
    "coll": [
     "navigate through / around"
    ]
   },
   {
    "type": "word",
    "t": "grieving process",
    "pos": "phrase",
    "zh": "哀悼的過程",
    "note": "grieving 為動名詞／形容詞，指為死亡或失去而悲傷的歷程；第 2 段末句 the grieving process 呼應本空格的主題。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "Sasaki 覺得自己需要一個私人空間來幫助自己走過這份悲傷，於是設置了一座電話亭，讓他可以向已逝的親戚「說話」。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-25": {
  "schema": 2,
  "answer": "G",
  "status": "reviewed",
  "key": [
   "詞性：句子主詞是 The booth he built（he built 為省略關係代名詞的修飾語），後面缺主要動詞，且接 only an old dial phone 當受詞，所以空格需要過去式的及物動詞。",
   "上下文線索：句子描述電話亭裡面有什麼，裡頭只有一支舊式撥盤電話與一條未接通的線路；時態為過去式，與 he built 一致。",
   "選定 (G) housed：house 當動詞表示「容納、內有、收藏」，The booth housed only an old dial phone 即「電話亭裡只有一支舊式撥盤電話」。",
   "排除：(J) brought forth 是過去式，文法上可接受詞，但「電話亭提出／產生一支電話」語意不通；(A) passed on 是過去式，但「電話亭傳遞電話」並不合理；(E) departed 一般作「離開、出發」，The booth departed only an old dial phone 無法表達「亭內放著電話」，語意不合。"
  ],
  "options": {
   "G": {
    "why": "house 當及物動詞表示「容納（東西或人）」，主詞多為建築物或空間，The booth housed only an old dial phone 語意與文法都合。"
   },
   "J": {
    "why": "brought forth 是過去式的及物片語，文法上後面可接受詞，但意思是「提出、產生」，電話亭並不會「產生」一支電話，語意不合。"
   },
   "A": {
    "why": "passed on 當過去式也可接受詞（把某物傳給別人），但電話亭不是在傳遞物品，與描述亭內配置的語意不符。"
   },
   "E": {
    "why": "departed 一般作「離開、出發」的動詞，或「已逝的」形容詞；The booth departed only an old dial phone 無法表達「亭內放著什麼」，語意不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "house",
    "pos": "v.",
    "zh": "容納、內有、安置",
    "note": "讀作 /haʊz/（動詞），名詞 house 讀 /haʊs/。常用在建築或空間「裡面放著、收容著」，如 The museum houses rare paintings.",
    "coll": [
     "The building houses…"
    ]
   },
   {
    "type": "word",
    "t": "dial phone",
    "pos": "n.",
    "zh": "撥盤電話",
    "note": "指有圓形撥號盤的舊式電話；dial 作動詞時表示「撥號」。"
   },
   {
    "type": "phrase",
    "t": "a disconnected phone line",
    "zh": "未接通的電話線",
    "note": "disconnected 是 disconnect（切斷）的過去分詞形容詞，a disconnected phone line 即「沒有接通的電話線」，與後文的 one-way conversation 呼應。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "他蓋的電話亭裡只放了一支舊式撥盤電話，電話線並沒有接通。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-26": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "詞性：Because my thoughts couldn’t be ___ through a regular phone line 是被動式 be + 過去分詞，需要及物動詞的過去分詞。",
   "上下文線索：下文 I wanted them to be carried on the wind 與前面形成對比：一般電話線無法「傳送」他的思念，所以他希望靠風帶走；carried 與空格都是被動，表示「傳遞」。",
   "選定 (A) passed on：pass on 表示「傳達、轉達」，thoughts couldn’t be passed on through a regular phone line 即「思念無法透過一般電話線傳達」。",
   "排除：(J) brought forth 的過去分詞放入被動式後是「被提出、被產生」，想法並不是經由電話線產生，語意不對；(G) housed 是「被容納」，與 through a phone line 不合；(E) departed 一般作「離開」的不及物動詞或「已逝的」形容詞，be departed 語意不合。"
  ],
  "options": {
   "A": {
    "why": "pass on 當及物片語表示「傳遞、轉達」，被動式 be passed on 後面接 through a regular phone line（透過電話線）表示傳遞的管道，與 carried on the wind 形成呼應。"
   },
   "J": {
    "why": "brought forth 是自然的過去分詞，可用於被動，但意思是「提出、產生」。他的想法早已存在，問題是無法傳達給對方，不是無法被產生，所以不合本句。"
   },
   "G": {
    "why": "housed 的被動表示「被容納」，thoughts couldn’t be housed 語意不通，不能表達思念無法被傳送。"
   },
   "E": {
    "why": "departed 一般作「離開」的不及物動詞或「已逝的」形容詞，用在 be ___ through a regular phone line 語意不合。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "pass on",
    "zh": "傳達、傳遞；去世",
    "note": "作為及物片語，表示把訊息、物品或特質傳給他人，如 pass on a message；也可作不及物表示「去世」（委婉說法）。本句為前者。",
    "coll": [
     "pass on a message",
     "pass on to…"
    ]
   },
   {
    "type": "word",
    "t": "regular",
    "pos": "adj.",
    "zh": "一般的、普通的",
    "note": "a regular phone line 即「一般電話線」，與 wind phone 形成對比；另有「規律的、經常的」等義項。"
   },
   {
    "type": "phrase",
    "t": "be carried on the wind",
    "zh": "隨風傳送",
    "note": "carried 是 carry 的過去分詞，on the wind 表示「乘著風」；與空格被動結構平行。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "他說：「因為我的思念無法透過一般電話線傳達，所以我希望讓它們隨風傳送。」",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-27": {
  "schema": 2,
  "answer": "H",
  "status": "reviewed",
  "key": [
   "詞性：renders the grieving process more ___ 中，render 在此作「使…變得…」，結構為 render + 受詞 + 形容詞補語，所以空格需要能被 more 修飾的形容詞。",
   "上下文線索：Hence 引出結論，這座電話亭讓 Sasaki 能進行單向對話，因而使哀悼過程對他來說 more ___ ；也就是變得較能承受、較能走下去。",
   "選定 (H) manageable：manageable 意為「可應付的、可承受的」，more manageable 即「更容易承受」。",
   "排除：(I) fateful 是形容詞，但意思是「命運攸關的」，與 more 搭配後變成哀悼過程更具關鍵性，不是文意；(E) departed 是「已逝的」，不能描述 process；(C) sorrow 與 (D) hope 是名詞，the grieving process more sorrow / hope 語意不通，空格需要能被 more 修飾的形容詞。"
  ],
  "options": {
   "H": {
    "why": "manageable 由 manage（設法應付）加 -able 而成，意思是「可以應付的」，more manageable 說明悲傷歷程對他而言變得比較容易承受。"
   },
   "I": {
    "why": "fateful 是形容詞，可接 more，但表示「更關鍵、更攸關命運」，與電話亭帶給他的安慰、使哀悼更容易面對的語意不符。"
   },
   "E": {
    "why": "departed 為形容詞，意思是「已逝的」，用來形容人；process 不是人，且 more departed 也不合邏輯。"
   },
   "D": {
    "why": "hope 是名詞；renders the grieving process more hope for him 語意不通，空格需要能被 more 修飾的形容詞，所以只有 manageable 合適。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "render",
    "pos": "v.",
    "zh": "使成為、使變得",
    "note": "render + 受詞 + 形容詞，表示「使某人／某事處於某種狀態」，如 render sb speechless。比 make 正式。也有「提供、給予」等義項。",
    "coll": [
     "render sb/sth + adj."
    ]
   },
   {
    "type": "word",
    "t": "manageable",
    "pos": "adj.",
    "zh": "可應付的、可處理的",
    "note": "manage + -able。反義字 unmanageable。",
    "coll": [
     "a manageable size",
     "manageable stress"
    ]
   },
   {
    "type": "word",
    "t": "hence",
    "pos": "adv.",
    "zh": "因此",
    "note": "引導由前文推出的結果，語氣比 so 正式。"
   },
   {
    "type": "word",
    "t": "soulful",
    "pos": "adj.",
    "zh": "充滿感情的、深刻動人的",
    "note": "soul + -ful；本句 deep, soulful personal meaning 形容這個單向對話對 Sasaki 個人而言深刻而動人。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "因此，風之電話讓 Sasaki 能進行一場單向的對話，帶有深刻而動人的個人意義，也使哀悼的過程對他而言變得更容易承受。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-28": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "詞性：句子是 the booth has become a ___ between the living and the dead，空格前有冠詞 a，需要單數可數名詞。",
   "上下文線索：between the living and the dead 表示「連接兩端」，加上第 1 段說電話亭 serves to connect family members to their departed loved ones，可知亭子的角色是連結生者與逝者。",
   "選定 (B) bridge：a bridge between A and B 為常見搭配，比喻連結兩者的橋梁，the booth has become a bridge between the living and the dead 語意貼切。",
   "排除：(F) mechanism 是單數可數名詞，a mechanism between… 在文法上成立，但意思是「一種機制／裝置」，不表示連結兩個世界；它在第 29 題的 coping mechanism 才是自然的搭配；(D) hope 與 (C) sorrow 是名詞，但意思分別是「希望」與「悲傷」，語意不合：希望、悲傷是情緒或期待，不是連結生者與逝者的「橋梁」。"
  ],
  "options": {
   "B": {
    "why": "bridge 當名詞比喻「連結兩端的橋梁」，a bridge between X and Y 表示讓兩個群體或世界產生連結，與全文電話亭的功能呼應。"
   },
   "F": {
    "why": "a mechanism 在文法上可放這裡，意思是「機制、運作方式」，但 a mechanism between the living and the dead 並不自然地表達連結，語意不如 bridge。"
   },
   "D": {
    "why": "hope 多作不可數名詞（希望），a hope 雖有，意為「一個希望」，但 a hope between the living and the dead 無法傳達「連接」的意思。"
   },
   "C": {
    "why": "sorrow 是情緒名詞，a sorrow between… 無法表達連結生死兩端的角色，語意不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "bridge",
    "pos": "n.",
    "zh": "橋；橋梁、聯繫",
    "note": "本題為比喻義：a bridge between A and B 表示連接兩者的事物。也可作動詞 bridge the gap（縮小差距）。",
    "coll": [
     "a bridge between A and B",
     "bridge the gap"
    ]
   },
   {
    "type": "word",
    "t": "the living / the dead",
    "pos": "n.",
    "zh": "活著的人／死去的人",
    "note": "the + 形容詞表示一群人，視為複數：the living 指生者，the dead 指逝者。"
   },
   {
    "type": "word",
    "t": "resemble",
    "pos": "v.",
    "zh": "像、類似",
    "note": "及物動詞，不加介系詞：Phones resembling the wind phone 為現在分詞片語，修飾 Phones。",
    "coll": [
     "resemble sb/sth"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "消息逐漸傳開，這座電話亭已成為生者與逝者之間的橋梁。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-29": {
  "schema": 2,
  "answer": "F",
  "status": "reviewed",
  "key": [
   "詞性：Grieving is a natural ___ for coping with loss 空格前有 a natural，需要單數可數名詞。",
   "上下文線索：for coping with loss of a loved one，表示悲傷是人面對失去時的一種應對方式；coping 是關鍵詞。",
   "選定 (F) mechanism：coping mechanism 是常見搭配，指「因應機制」，a natural mechanism for coping with loss 即「面對失去時的一種自然應對機制」。",
   "排除：(B) bridge 為單數可數名詞，a natural bridge 文法上可行，但 a natural bridge for coping 無法表達「應對方式」；(C) sorrow 與主詞 Grieving 幾乎同義，Grieving is a natural sorrow 只是重複，沒有說明「用來因應」；(D) hope 是「希望」，不是人面對失去時的應對方式。"
  ],
  "options": {
   "F": {
    "why": "mechanism 指「機制、機轉」，coping mechanism 是固定搭配，表示人在壓力或失落下自然產生的因應方式，本句 a natural mechanism for coping with loss 完整表達悲傷的功能。"
   },
   "B": {
    "why": "bridge 是自然的單數可數名詞，也能受 natural 修飾（如 a natural bridge 指天然橋），但後面的 for coping with loss 說明用途，bridge 無法表達「因應方式」，語意不如 mechanism。"
   },
   "C": {
    "why": "sorrow 指情緒本身，不是「用來因應」的手段；a natural sorrow for coping with loss 語意不通，且 Grieving is a natural sorrow 只是重述。"
   },
   "D": {
    "why": "hope 勉強可讀成「對面對失去的期盼」，hope for + 動名詞在文法上可通；但 Grieving（悲傷這個行為）不是 hope。coping 與 mechanism 才有固定搭配 coping mechanism，而 hope 要到第 30 題才適合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "mechanism",
    "pos": "n.",
    "zh": "機制、機轉；機械裝置",
    "note": "可指自然的運作方式（a defense mechanism 防衛機制）或機械結構。coping mechanism 指人面對壓力的因應方式。",
    "coll": [
     "coping mechanism",
     "defense mechanism"
    ]
   },
   {
    "type": "phrase",
    "t": "cope with",
    "zh": "應付、處理",
    "note": "cope 為不及物動詞，後接 with；coping with loss 的 coping 為動名詞。",
    "coll": [
     "cope with stress",
     "cope with loss"
    ]
   },
   {
    "type": "word",
    "t": "grieve / grieving",
    "pos": "v. / n.",
    "zh": "悲傷；哀悼",
    "note": "Grieving 在本句作動名詞，當主詞；people grieve in various ways 的 grieve 為動詞。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "悲傷是人面對失去摯愛時自然的因應機制，而且人們悲傷的方式各式各樣。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-30": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "詞性：For those who… 之後是句子的主詞，空格後是 is always there，空格需要無冠詞的單數名詞（不可數名詞）。",
   "上下文線索：冒號後說明 They believe that their messages will… reach the deceased，表示即使不知道如何傳達，人們仍相信訊息會被聽見，這是一種期待與盼望。",
   "選定 (D) hope：hope 為不可數名詞，hope is always there 即「希望始終存在」，冒號後面的內容就是 hope 的內容。",
   "排除：(C) sorrow 也是不可數名詞，Sorrow is always there 文法成立，但冒號後說的是相信訊息會送達，是正面的盼望，不是悲傷；(F) mechanism 與 (B) bridge 是單數可數名詞，主詞位置不能無冠詞出現，且語意與冒號後的 believe 內容不符。"
  ],
  "options": {
   "D": {
    "why": "hope 作不可數名詞，不需冠詞，hope is always there 後以冒號說明內容：They believe… reach the deceased，說明「相信」即為盼望。"
   },
   "C": {
    "why": "Sorrow is always there 在文法與英文上都成立，也符合哀悼背景；但冒號後說的是對訊息會送達的信念，這是盼望而非悲傷，所以 hope 更貼近文意。"
   },
   "F": {
    "why": "mechanism 是可數名詞，單數時要有冠詞，A mechanism is always there 才成立；且語意上 always there 加上冒號後的信念，與「機制」無關。"
   },
   "B": {
    "why": "bridge 是可數名詞，單數時需要冠詞；而冒號後說的是人們的信念，不是連結物，所以不合。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "hope",
    "pos": "n.",
    "zh": "希望、期望",
    "note": "作不可數名詞表示整體的盼望；a hope 可指某個具體的期望。冒號後的 They believe… 即在補充說明 hope 的內容。",
    "coll": [
     "hold out hope",
     "give up hope"
    ]
   },
   {
    "type": "word",
    "t": "deceased",
    "pos": "adj. / n.",
    "zh": "已故的；逝者",
    "note": "the deceased 指已故的人，視為單數或複數（指一位或一群人）。與 departed 類似，但較正式。"
   },
   {
    "type": "phrase",
    "t": "through some unknown way",
    "zh": "透過某種未知的方式",
    "note": "插入語，位於破折號之間；表示人們不知道訊息如何送達，仍然相信會到達。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "對那些對著風之電話說話的人來說，希望始終存在：他們相信自己的話會以某種未知的方式傳到逝者那裡。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-31": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "Before：第 1 段說 Dr. Weinstein 背痛時吃阿斯匹靈、冰敷後去跑步，回來後覺得 pretty good；整段只描述他個人的做法與結果。",
   "Candidate：(D) “This seems to run counter to the common practice.” 的功能是承上啟下：用 This 指前面「受傷後去跑步」的做法，並點出它與一般慣例相反，作為第 2 段的開頭。",
   "After：後一句 When people have sprained a muscle or tendon, they are usually advised not to go right back to exercising… 具體說明「一般慣例」是什麼（扭傷後先別運動），之後 But Dr. Weinstein says that approach is outdated 再對比。",
   "Link：D 中的 the common practice 與後文 they are usually advised… 呼應，把空格後的「通常的建議」定位成被相反的慣例；This 則回指第 1 段末的跑步行為。"
  ],
  "options": {
   "D": {
    "why": "官方答案。This 指前面 Dr. Weinstein 去跑步的做法，run counter to the common practice 與下一句「一般人受傷後被建議先別運動」一一對應。"
   },
   "C": {
    "why": "“Many suggest that most patients can continue with the sport they love.” 本身自然，放在【31】也可讀得通（說明有人主張繼續運動）；但這樣會在尚未交代「一般慣例是先休息」之前，就先提其他專家的看法，與後句 When people have sprained… they are usually advised not to… 的銜接較不順。第 3 段 Dr. Weinstein is not alone… 才開始引入其他專家，所以 C 放在【32】銜接更好。"
   },
   "A": {
    "why": "“For example, an injured runner might end up cycling and swimming…” 需要前面有一個被舉例的概念（cross-train），【31】之前沒有，因此不能放這裡；它屬於【33】。"
   },
   "B": {
    "why": "“Over time, researchers have come to realize…” 是在說研究者看法的轉變，之後接 Thus 才合邏輯，屬於【34】；放在【31】前面沒有任何研究背景可承接。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "run counter to",
    "zh": "與…相反、違背",
    "note": "counter 作副詞，run counter to + 名詞表示「與…背道而馳」。",
    "coll": [
     "run counter to the common practice",
     "run counter to expectations"
    ]
   },
   {
    "type": "word",
    "t": "sprain",
    "pos": "v.",
    "zh": "扭傷",
    "note": "sprain 通常指關節韌帶扭傷（sprain an ankle）；肌肉拉傷較常用 strain，本文 sprained a muscle or tendon 為通俗用法。本文 When people have sprained… 為現在完成式。"
   },
   {
    "type": "word",
    "t": "counterproductive",
    "pos": "adj.",
    "zh": "適得其反的",
    "note": "counter- 加 productive，表示做法反而妨礙目標；本句 outdated and counterproductive 形容舊觀念。"
   },
   {
    "type": "word",
    "t": "outdated",
    "pos": "adj.",
    "zh": "過時的",
    "note": "out + date + -ed；表示不再適用的觀念或做法。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "他的背扭傷了，疼痛劇烈，於是決定出去跑步：他吃了一顆阿斯匹靈、冰敷受傷處就出門了。回來時他覺得「還不錯」。／（插入句）這似乎與一般的做法背道而馳。／當人們扭傷了肌肉或肌腱，通常被建議在疼痛消失前不要馬上恢復運動。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-32": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "Before：前一句說 Dr. Weinstein is not alone in his treatment of sports injury, but the specific advice can differ from specialist to specialist，點出「有人跟他一樣，但細節因人而異」，等待具體說明。",
   "Candidate：(C) “Many suggest that most patients can continue with the sport they love.” 的功能是給出第一種意見：許多專家認為大多數病人可以繼續原本的運動，是與 Dr. Weinstein 一致的做法。",
   "After：後一句 They nevertheless caution that a cutback may be necessary… 的 They 回指 Many（專家），nevertheless 則與 can continue 形成讓步轉折（雖可繼續，但仍須減量）；接著 Others… Still others… 逐步列出不同意見。",
   "Link：Many → They（代名詞先行詞）、continue → nevertheless caution（讓步轉折）、Many → Others → Still others（排列各種專家意見），構成連貫的分類說明。"
  ],
  "options": {
   "C": {
    "why": "官方答案。放在【32】剛好承接 specialist to specialist 的分歧，並成為 They nevertheless caution 的先行詞，也開啟 Many / Others / Still others 的列舉。"
   },
   "D": {
    "why": "“This seems to run counter to the common practice.” 的 This 在【32】勉強可指 Dr. Weinstein 的做法，語意可通；但這層「違背慣例」的對比第 2 段已交代，且後面的 They nevertheless caution 需要一群專家作先行詞，D 沒有提供，所以官方位置是【31】。"
   },
   "A": {
    "why": "“For example, an injured runner might end up cycling and swimming…” 的 For example 要舉例說明 cross-train，而 cross-train 要到 Others say… 才出現；放在【32】等於先舉例、後介紹概念，與 They nevertheless caution 的銜接也較弱，所以官方位置是【33】。"
   },
   "B": {
    "why": "“Over time, researchers have come to realize…” 說的是看法的歷時演進。放在【32】時 researchers 雖可勉強作 They 的先行詞，但 32 前一句 specific advice can differ from specialist to specialist 預告的是「列舉各專家的不同建議」，B 沒有 Many / Others / Still others 的列舉起點；它的 Over time… 也與第 4 段 Thus 構成因果，所以放【34】銜接更好。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "specialist",
    "pos": "n.",
    "zh": "專科醫師、專家",
    "note": "指專精某領域的人；from specialist to specialist 表示「各專家之間」。"
   },
   {
    "type": "word",
    "t": "cutback",
    "pos": "n.",
    "zh": "減少、削減",
    "note": "cut back 為動詞片語（減少），cutback 為名詞；本句 a cutback may be necessary 指「必須減量」。",
    "coll": [
     "a cutback in…",
     "cut back on…"
    ]
   },
   {
    "type": "word",
    "t": "nevertheless",
    "pos": "adv.",
    "zh": "儘管如此、然而",
    "note": "連接副詞，表示讓步：雖然前面說可以繼續運動，仍要提醒須減量。"
   },
   {
    "type": "word",
    "t": "caution",
    "pos": "v.",
    "zh": "警告、提醒",
    "note": "caution (sb) that… 表示提醒要注意；比 warn 語氣較輕。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "並非只有 Dr. Weinstein 這樣處理運動傷害，但具體建議因專家而異。／（插入句）許多專家建議，大多數病人可以繼續從事自己喜愛的運動。／不過他們提醒，可能需要減量，例如跑短一點的距離或放慢速度。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-33": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "Before：前一句說 Still others say the safest thing to do is cross-train all the time until the pain is gone，也就是完全改做別的運動。",
   "Candidate：(A) “For example, an injured runner might end up cycling and swimming instead of running.” 的功能是舉例：以受傷的跑者改騎車與游泳，具體說明 cross-train 的意思。",
   "After：後一句 Their consensus, however, is that unless the injury involves something as serious as a broken bone or a ripped muscle, moderate exercise can actually speed healing. 以 however 把焦點從各家差異轉到共識。",
   "Link：cross-train → cycling and swimming instead of running（概念→實例），For example 需要前面有被舉例的主張；而 A 之後再以 however 轉折到 Their consensus，讓「各說各話」的列舉自然收束。"
  ],
  "options": {
   "A": {
    "why": "官方答案。它給 cross-train 一個具體例子（受傷跑者改騎車、游泳），位置在最後一個說法之後，也讓 however 後的共識有清楚的對比。"
   },
   "B": {
    "why": "“Over time, researchers have come to realize…” 描述看法的歷時演變，放在 Still others… 之後會打斷「各專家不同建議」的列舉；第 4 段的 Thus 又需要它當原因，所以 B 屬於【34】。"
   },
   "C": {
    "why": "“Many suggest that most patients can continue with the sport they love.” 開啟的是「專家意見列舉」的第一項，放在列舉最後的【33】，會使【32】後面的 They nevertheless caution 沒有可承接的先行句，所以官方位置是【32】。"
   },
   "D": {
    "why": "“This seems to run counter to the common practice.” 的 This 在【33】勉強可指前面 cross-train 的建議，語意可通；但「違背慣例」第 2 段開頭已指出，放在【33】是重複；且【33】前是一個需要舉例說明的主張，A 的 For example 承接得更緊，所以官方位置是【31】。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "cross-train",
    "pos": "v.",
    "zh": "交叉訓練",
    "note": "指除了主要運動外，也從事其他運動以訓練不同肌群或在受傷時保持活動；文中已有 (that is, to cross-train) 的解釋。"
   },
   {
    "type": "word",
    "t": "consensus",
    "pos": "n.",
    "zh": "共識",
    "note": "不可數名詞，常用 reach a consensus；the consensus is that… 為常見句型。",
    "coll": [
     "reach a consensus",
     "the consensus is that…"
    ]
   },
   {
    "type": "word",
    "t": "ripped",
    "pos": "adj.",
    "zh": "撕裂的",
    "note": "ripped muscle 為肌肉撕裂；rip 作動詞表示「撕開」。"
   },
   {
    "type": "word",
    "t": "moderate",
    "pos": "adj.",
    "zh": "適度的",
    "note": "moderate exercise 即「適度運動」；另有動詞 moderate（使節制）。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "還有人說最安全的做法是在疼痛消失前一直做交叉訓練。／（插入句）例如，受傷的跑者最後可能改騎自行車和游泳，而不是跑步。／不過他們的共識是，除非傷勢嚴重到像骨折或肌肉撕裂，否則適度運動其實能加速復原。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-34": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "Before：第 3 段最後一句 Their consensus, however, is that unless the injury involves something as serious as a broken bone…, moderate exercise can actually speed healing，說明專家們的共識。",
   "Candidate：(B) “Over time, researchers have come to realize the importance of exercising when injured.” 的功能是補上背景：隨著時間，研究者逐漸體認到受傷時運動的重要，作為後面 Thus 的原因。",
   "After：後一句 Thus, more and more patients are now advised to keep moving despite the pain. 以 Thus 表示因果，把研究者的認識轉變推到「現在愈來愈多病人被建議保持活動」。",
   "Link：Over time ... have come to realize（歷時的轉變）→ Thus ... are now advised（因此現在被建議），Over time 與 now 呼應，B 提供 Thus 需要的「原因」，所以 B 最適合放在 Thus 之前。"
  ],
  "options": {
   "B": {
    "why": "官方答案。它是 Thus 所需的原因：研究者逐漸體認到運動的重要，所以現在愈來愈多病人被建議繼續活動；Over time 與 now 也構成時間對照。"
   },
   "D": {
    "why": "“This seems to run counter to the common practice.” 文法上可接在上一段末句之後，This 可勉強指「適度運動能加速復原」的共識；但後面的 Thus 需要原因，而 D 並不提供因果，且最自然的指稱仍是第 1 段 Dr. Weinstein 去跑步，所以放在【31】。"
   },
   "C": {
    "why": "“Many suggest that most patients can continue with the sport they love.” 的 Many 在【34】處是新的列舉，與第 3 段的列舉重複，也不能自然引出 Thus；放在【32】才與 They nevertheless caution 銜接。"
   },
   "A": {
    "why": "“For example, an injured runner might end up cycling and swimming…” 雖可勉強當作 moderate exercise 的例子，但 instead of running 的內容與前面 cross-train 的描述緊密相連，屬於【33】；放在【34】會使 Thus 失去前面的原因句 B。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "come to + 原形動詞",
    "zh": "逐漸（開始）…",
    "note": "come to realize 表示經過一段時間「逐漸領悟」；Over time 與現在完成式 have come to 連用，強調累積的認識轉變。"
   },
   {
    "type": "word",
    "t": "rule of thumb",
    "pos": "n.",
    "zh": "經驗法則",
    "note": "指大致可靠但不嚴格的實用原則，如 The rule of thumb, however, is to see a doctor first. "
   },
   {
    "type": "phrase",
    "t": "rule out",
    "zh": "排除（可能性）",
    "note": "本句 If a serious injury is ruled out 為被動式，表示先確認不是嚴重傷勢。",
    "coll": [
     "rule out a possibility"
    ]
   },
   {
    "type": "word",
    "t": "diagnosis",
    "pos": "n.",
    "zh": "診斷",
    "note": "複數形 diagnoses；動詞 diagnose，a doctor diagnoses a patient with…；accurate diagnosis 即「準確診斷」。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "他們的共識是，除非傷勢像骨折或肌肉撕裂那般嚴重，否則適度運動其實能加速復原。／（插入句）隨著時間過去，研究者逐漸體認到受傷時運動的重要性。／因此，現在愈來愈多病人被建議即使會痛，也要繼續保持活動。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-35": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "先從文章整理 de Mestral 的發明長什麼樣子:第 1 段他用顯微鏡檢查芒刺,第 2 段寫出細看的結果——burrs 上有許多 small hooks,緊緊鉤住褲子布料裡的 loops;他想重現的是「hooks-and-loops that bind to each other firmly」,也就是一邊是鉤、一邊是環、兩者互相扣合的東西(文章明說)。",
   "第 2 段明說 burrs 上有許多 small hooks，會鉤住布料中的 loops；de Mestral 想重現 hooks-and-loops that bind to each other firmly。第 3 段再補充成品每平方英寸有 300 個 hooks，表示鉤的數量多而細小。對照替代圖時，應找最能表現「大量細小 hooks 與 loops 互扣」的圖。",
   "逐張對照圖:(A) 是兩個圓形按扣,沒有小鉤與環;(C) 是彈簧線圈繩加兩個掛勾,只有掛勾,沒有可供鉤住的環;(D) 的兩條布帶,一條只有少數幾個較大的鉤、另一條只有少數幾個較大的環;(B) 的兩條帶子,一條表面排著許多細小的鉤、另一條排著許多細小的環拱,最接近文章的 hooks-and-loops 與『很多小鉤』。",
   "結論選 (B)。判斷依據是文章的兩個核心特徵：一是 hooks 與 loops 可以互相扣合；二是 hooks 數量很多而且細小。原創替代圖中的 (B) 最接近這兩項；「兩條帶子」只是替代圖的視覺呈現方式，不是文章本身的作答依據。"
  ],
  "options": {
   "A": {
    "why": "圖 (A) 的扣件是兩個圓形按扣,沒有文章所說的『小鉤』與『環』(第 2 段),因此不是 hooks-and-loops。"
   },
   "B": {
    "why": "正確。圖 (B) 有兩條帶子:一條表面排著許多細小的鉤形,另一條表面排著許多細小的環拱。這對應第 2 段『hooks that clung firmly to the loops』與『hooks-and-loops that bind to each other』,以及第 3 段每平方英寸 300 個 hooks 所顯示的『許多小鉤』。屬於把文章描述對照圖形特徵的判斷。"
   },
   "C": {
    "why": "圖 (C) 是一條彈簧線圈繩,兩端各接一個掛勾。它有『鉤』的形狀,但沒有成片的小環可以讓許多小鉤去鉤,也不是兩片表面互相扣合的結構,所以不符合『hooks-and-loops that bind to each other』(第 2 段)。"
   },
   "D": {
    "why": "圖 (D) 是兩條布帶,一條帶上有少數幾個較大的鉤,另一條有少數幾個較大的環。它同樣是『鉤配環』,是四張圖中最容易被誤選的。但文章描述的是許多細小的鉤去鉤布料裡的環(第 2 段),且成品每平方英寸有 300 個 hooks(第 3 段);(D) 只有零星幾個大鉤與大環,數量與尺度都不符。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "burr",
    "pos": "n.",
    "zh": "(植物的)芒刺、帶刺的果實",
    "note": "文章第 1 段指附著在狗毛與褲子上的植物芒刺,第 2 段說它在顯微鏡下有許多小鉤。"
   },
   {
    "type": "word",
    "t": "hook",
    "pos": "n.",
    "zh": "鉤子",
    "note": "第 2、3 段的 hooks 與 loops(環)配對,是理解圖像題的關鍵詞。",
    "coll": [
     "hook and loop"
    ]
   },
   {
    "type": "phrase",
    "t": "cling to",
    "zh": "緊緊黏附/抓住",
    "note": "第 2 段 clung firmly to the loops;cling 的過去式與過去分詞為 clung。",
    "coll": [
     "cling to sth"
    ]
   },
   {
    "type": "word",
    "t": "fastener",
    "pos": "n.",
    "zh": "扣件、扣合用品",
    "note": "由 fasten(扣緊)加 -er 而成,指拉鍊、釦子、按扣等把東西接合的物品;文中 a strong fastener with many uses 即題目所問的發明。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:de Mestral 細看後發現,burrs 肉眼看起來是直的,其實有許多小鉤,緊緊鉤住他褲子布料裡的環。他認定,如果能重現同樣的東西,做出彼此牢牢扣合的鉤與環,就能製成用途很多的強力扣件。\n第 3 段:成品改良版每平方英寸材料含有 300 個鉤,既能保持扣緊,需要時又能輕易拉開。\n題目與正確選項:下列哪一張圖顯示 de Mestral 的發明?(B) 圖 B(最符合大量細小 hooks 與 loops 互相扣合的特徵)。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-36": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "先拆解字面:lightbulb(燈泡)亮起象徵『想到點子』,moment coming on 表示『那一刻正要來臨』,所以 feeling a lightbulb moment coming on 是『感覺靈光一閃的時刻要來了』。原文是 found a lot of burrs stuck to the dog’s fur and his pants,之後他 immediately rushed to his microscope,可印證他是被突然冒出的想法驅動(推論)。",
   "lightbulb moment 是慣用說法,指『靈光一閃、突然想到好點子』;燈泡亮起象徵點子出現。也呼應第 2 段:他看了之後就決定要重現鉤與環,並想到製成扣件(推論)。",
   "逐項看選項:(A) blessing in disguise 是『塞翁失馬式的禍中得福』;(B) happy ending 是結局;(C) unpredictable future 是未來難料。三者都與『當下冒出想法』無關,只有 (D) sudden inspiration 是『突然的靈感』。"
  ],
  "options": {
   "A": {
    "why": "A blessing in disguise 是自然英文,指『表面是壞事、結果卻帶來好處』。本題的情境並不是壞事轉為好事,而是看到芒刺後腦中浮現點子,因此與 lightbulb moment 語意不同。"
   },
   "B": {
    "why": "A happy ending 指故事圓滿收場;此處講的是看到芒刺後腦中浮現想法的一刻,不是事情的結局,故與 lightbulb moment 的意思不同。"
   },
   "C": {
    "why": "An unpredictable future 指難以預料的未來。文中講的是他當下受到啟發,沒有談到未來難以預料,所以不合。"
   },
   "D": {
    "why": "正確。a sudden inspiration 是『突然的靈感』,與 lightbulb moment 同義。依據第 1 段末句他『立刻衝去用顯微鏡』與 feeling a lightbulb moment coming on。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "lightbulb moment",
    "zh": "靈光乍現的時刻",
    "note": "指突然想出好點子或突然明白某件事的瞬間;由燈泡亮起的圖像比喻而來。"
   },
   {
    "type": "word",
    "t": "inspiration",
    "pos": "n.",
    "zh": "靈感、啟發",
    "note": "不可數時指創作或想法的來源,常說 draw inspiration from sth;a sudden inspiration 即突然的靈感。",
    "coll": [
     "draw inspiration from",
     "a source of inspiration"
    ]
   },
   {
    "type": "phrase",
    "t": "blessing in disguise",
    "zh": "塞翁失馬、因禍得福",
    "note": "指表面看似壞事、後來證明有益的事,(A) 用的就是這個慣用語。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 1 段末句:他立刻衝去拿顯微鏡,檢視附著在褲子上的芒刺——感覺有個靈光一閃的時刻要來了。\n題目與正確選項:作者在第 1 段所說的 “a lightbulb moment” 是什麼意思?(D) 突然的靈感。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-37": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "這是 true/false 題,要逐項回文章查證。先找各選項關鍵字:market favorite → 第 4 段;cotton → 第 3 段;French name → 第 3 段;velvet → 第 3 段 Named 那句。",
   "(B):第 3 段說 He first tried cotton, but it proved too soft and could not withstand repeated openings and closures(文章明說)。『不夠耐用』是 could not withstand repeated openings and closures 的換句話說,故 (B) 正確。",
   "(A) 與第 4 段 Initially Velcro did not fare well 相反;(C) 文章只說名字來自法文字 velours 與 crochet,並說專利是瑞士政府核發、工廠開在歐洲及北美,沒有說在法國生產;(D) 文章只說名稱取自 velours(velvet)與 crochet(hook),沒有談到設計是否要像絲絨般光滑發亮。"
  ],
  "options": {
   "A": {
    "why": "與第 4 段 Initially Velcro did not fare well 相反:Velcro 起初表現不佳,多數時尚評論者認為它又醜又廉價,使用僅限於運動用品,並非一問世就是市場寵兒。"
   },
   "B": {
    "why": "正確。第 3 段:他先試了棉,但太軟,承受不了反覆開合(could not withstand repeated openings and closures)。『cotton was not durable enough』是對此的換句話說。"
   },
   "C": {
    "why": "陷阱在『法文名字 → 在法國製造』的錯誤推論。第 3 段只說名字來自法文 velours 與 crochet;發明者是瑞士人,專利由瑞士政府核發,並在歐洲、加拿大與美國設廠。文章沒有說最初是在法國生產。"
   },
   "D": {
    "why": "第 3 段指出名稱是由 velours(絲絨)和 crochet(鉤)組成,只是命名來源,沒有說設計目的是要讓產品看起來像絲絨般光滑。文章也沒有談到設計意圖是外觀。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "withstand",
    "pos": "v.",
    "zh": "承受、經得起",
    "note": "及物動詞,過去式 withstood;常接壓力、使用或惡劣條件。第 3 段 could not withstand repeated openings and closures。",
    "coll": [
     "withstand pressure",
     "withstand wear and tear"
    ]
   },
   {
    "type": "word",
    "t": "durable",
    "pos": "adj.",
    "zh": "耐用的",
    "note": "名詞為 durability;第 3 段形容 heat-treated nylon 是 strong and durable substance。"
   },
   {
    "type": "phrase",
    "t": "fare well",
    "zh": "進展順利、表現良好",
    "note": "fare 在此是『(事情)進展、表現』的意思,否定用 did not fare well 指表現不佳。第 4 段 Initially Velcro did not fare well。",
    "coll": [
     "fare well / badly"
    ]
   },
   {
    "type": "phrase",
    "t": "settle on",
    "zh": "最後選定",
    "note": "指經過比較考慮後決定採用;第 3 段 eventually settled on heat-treated nylon。",
    "coll": [
     "settle on a plan"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段:de Mestral 的第一個難題是找到適合做牢固扣合系統的布料。他先試了棉,但事實證明太軟,經不起反覆開合……他最後選定經熱處理的尼龍。……這項新產品名為 “Velcro”,取自法文 velours(絲絨)與 crochet(鉤),並在 1955 年獲瑞士政府頒發專利。\n第 4 段:起初 Velcro 的表現不佳。……\n題目與正確選項:關於 Velcro,下列敘述何者正確?(B) 棉不夠耐用,無法當作它的材料。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-38": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "這是 NOT mentioned 題:要把文章提到的 Velcro 用途領域找齊,再挑出沒出現的那個。先到第 4 段找用途,再對應四個領域。",
   "第 4 段:早期用於 athletic equipment(運動用品)→ 對應 (D) 運動與休閒;NASA 用於 equipment that went into space → 對應 (B) 航太產業;Today 列出 clothing and footwear, toys, airline seat cushions, blood pressure cuffs and surgeons’ gowns,以及首次人工心臟移植 → 對應 (C) 醫療技術。",
   "(A) civil engineering(土木工程,如建築、道路、橋樑)整篇文章完全沒有提到,所以是答案。",
   "補充:(D) 的 sports and recreation 由 athletic equipment 與 toys 支持;其中把 toys 歸為 recreation 是分類上的推論,但 athletic equipment 已足以確認 (D) 有被提到。"
  ],
  "options": {
   "A": {
    "why": "正確。文章列舉的用途中沒有任何與土木工程(如建築、道路、橋樑)相關的內容,因此是『未提及』的領域。"
   },
   "B": {
    "why": "有提到。第 4 段:1960 年代初 NASA 把它用在隨太空人進入太空的許多設備上,屬於航太領域。"
   },
   "C": {
    "why": "有提到。第 4 段:血壓計袖帶(blood pressure cuffs)、外科醫師手術袍(surgeons’ gowns),以及第一次人工心臟移植中用來固定裝置零件,都屬於醫療領域。"
   },
   "D": {
    "why": "有提到。第 4 段:早期 Velcro 的使用僅限於 athletic equipment(運動用品),另外還列出 toys(玩具),屬運動與休閒範圍。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "athletic",
    "pos": "adj.",
    "zh": "運動的、體育的",
    "note": "athletic equipment 即運動用品;名詞為 athlete(運動員),athletics 指各類運動競技。"
   },
   {
    "type": "word",
    "t": "boost",
    "pos": "n.",
    "zh": "提升、助力",
    "note": "第 4 段 received a huge boost in popularity 指聲望或人氣大幅提升;boost 可當名詞或動詞。",
    "coll": [
     "a boost in sth",
     "boost one’s confidence"
    ]
   },
   {
    "type": "word",
    "t": "cuff",
    "pos": "n.",
    "zh": "(衣服的)袖口;(醫療用)袖帶",
    "note": "blood pressure cuff 是量血壓時綁在手臂上的袖帶。"
   },
   {
    "type": "word",
    "t": "transplantation",
    "pos": "n.",
    "zh": "移植",
    "note": "動詞為 transplant;第 4 段 artificial heart transplantation 是人工心臟移植。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 4 段:起初 Velcro 的表現不佳。由於多數時尚評論者認為它又醜又廉價,Velcro 的使用僅限於運動用品。1960 年代初,NASA 開始把它用在許多隨太空人進入太空的設備上,這個產品的人氣因此大幅提升。如今,de Mestral 的設計幾乎隨處可見:衣服與鞋類、玩具、飛機座椅墊、血壓計袖帶和外科醫師手術袍。最令人驚嘆的是,這種神奇的扣件還被用在首例人工心臟移植中,固定裝置的各個部件。\n題目與正確選項:下列哪一個領域在文中『沒有』提到 Velcro 的用途?(A) 土木工程。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-39": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "這是『從文章可得知什麼』的細節整合題,要把每個選項回文章查證有沒有提供答案。",
   "第 2 段:1871 年他受委託為 Langford 的 The Wonders of Yellowstone 畫插圖,且被 Langford 描述的奇景吸引(Captivated by ...),became eager to see this odd territory for himself;第 3 段他於同年隨政府勘查隊前往並大量寫生(文章明說)。(D) 的 why 即由『受委託插圖』與『想親眼看看』這兩處合起來回答,需合併判斷。",
   "再排除:(A) 文章只談 Yellowstone 是世界第一座國家公園,沒有講世界各地國家公園如何成立;(B) 沒有說 Yellowstone 的地形如何形成;(C) 第 2 段只說他 7 歲隨家人來美國、定居費城,沒有說為何搬家。所以選 (D)。"
  ],
  "options": {
   "A": {
    "why": "文章只說美國國會在 1872 年把 Yellowstone 設為國家公園,『the world’s first』。沒有交代世界其他地方的國家公園如何成立,所以文章無法回答這個問題。"
   },
   "B": {
    "why": "第 4 段只描述 Yellowstone 在大眾想像中的樣子(熱水與蒸氣從地洞冒出),沒有解釋這些地貌如何形成。"
   },
   "C": {
    "why": "第 2 段只說 Moran 7 歲時隨家人來到美國並定居費城,以及他們來自英格蘭西北部,沒有說搬家的原因。"
   },
   "D": {
    "why": "正確。第 2 段:受 Langford 所描述的奇景吸引,Moran 很想親眼看看這片奇特的地區;第 3 段他隨即加入政府勘查隊並大量寫生。這解釋了他為何開始畫 Yellowstone。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "captivated",
    "pos": "adj.",
    "zh": "著迷的、被吸引的",
    "note": "由動詞 captivate 而來,常用 be captivated by;第 2 段 Captivated by the utterly fantastic sights 是過去分詞構句,表示『受到奇景吸引』。",
    "coll": [
     "be captivated by"
    ]
   },
   {
    "type": "word",
    "t": "illustrate",
    "pos": "v.",
    "zh": "為……畫插圖;說明",
    "note": "第 2 段指為書籍或雜誌畫插圖;illustrator 為插畫家。"
   },
   {
    "type": "word",
    "t": "expedition",
    "pos": "n.",
    "zh": "探險、探勘隊",
    "note": "第 2 段 Langford 曾參加 Yellowstone 的 expedition。",
    "coll": [
     "go on an expedition"
    ]
   },
   {
    "type": "word",
    "t": "survey",
    "pos": "n.",
    "zh": "勘查、調查",
    "note": "第 3 段 government survey 指政府派隊進行的實地勘查。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:……Moran 展現出繪畫天分,很快受聘為 Scribner’s Monthly 的插畫家,到三十四歲時已升任首席插畫家。1871 年他受託為 Nathaniel P. Langford 所寫的故事 The Wonders of Yellowstone 畫插圖,Langford 曾參加前往 Yellowstone 的探險。受到 Langford 描述的絕妙景象所吸引,Moran 變得很想親眼看看這個奇特的地區。\n第 3 段:1871 年,Moran 與攝影師 William Henry Jackson 一同加入美國政府首次對 Yellowstone 地區的勘查。……\n題目與正確選項:從這篇文章我們可以得知什麼?(D) 為什麼 Moran 開始畫 Yellowstone。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-40": {
  "schema": 2,
  "answer": "A",
  "status": "reviewed",
  "key": [
   "先定位:第 2 段 They came from northwest England, the blackened heart of the Industrial Revolution,後面接冒號,說明這個地方的樣子:main street was “a dark, unattractive hole”,河是 a string of dirty water(文章明說)。",
   "the Industrial Revolution 是工業革命,『blackened』是被煤煙等弄黑,heart 是中心;加上骯髒的水與陰暗醜陋的街道,可推論作者是在形容此地受工業嚴重污染(『污染』一詞是推論,文章用的是 dark 和 dirty)。",
   "再看選項:(B) 的 holes 是把引文中的 hole 當字面的『洞』;a dark, unattractive hole 是比喻,指主要街道陰暗、難看、令人不快的地方;(C) 的 evil-hearted 是把 heart 望文生義;(D) 制服沒有提到。因此選 (A)。"
  ],
  "options": {
   "A": {
    "why": "正確。第 2 段以 the blackened heart of the Industrial Revolution、a dark, unattractive hole、a string of dirty water 描寫家鄉,可推論這個地方受到嚴重汙染(『嚴重汙染』是對這些描寫的推論)。"
   },
   "B": {
    "why": "陷阱在於把引文中的 hole 當成字面的『洞』。第 2 段的 “a dark, unattractive hole” 是描述主要街道陰暗難看,屬於比喻,並非城裡到處是變黑的洞。"
   },
   "C": {
    "why": "這是把 heart 當成『心腸』而望文生義。文中的 heart 指工業革命的中心地帶(the heart of ...),文章沒有提到工廠老闆心地邪惡。"
   },
   "D": {
    "why": "文章沒有提到工人的制服。blackened 在文中描述的是地方的環境,不是人的服裝。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "the heart of",
    "zh": "……的中心",
    "note": "heart 可指某地方、系統或事物的核心,如 the heart of the city。第 2 段 the blackened heart of the Industrial Revolution 指工業革命的核心地帶。",
    "coll": [
     "the heart of the matter"
    ]
   },
   {
    "type": "word",
    "t": "blackened",
    "pos": "adj.",
    "zh": "變黑的",
    "note": "由動詞 blacken 加 -ed 形成的形容詞,指被煙、火或汙染弄黑。"
   },
   {
    "type": "phrase",
    "t": "Industrial Revolution",
    "zh": "工業革命",
    "note": "第 2 段背景詞,與 Moran 家鄉的髒汙環境相連。"
   },
   {
    "type": "word",
    "t": "unattractive",
    "pos": "adj.",
    "zh": "不吸引人的、難看的",
    "note": "由 attractive 加否定字首 un- 形成;第 2 段形容 main street。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:他們來自英格蘭西北部,那是工業革命中發黑的核心地帶:它的主要街道是『一個陰暗、不討喜的洞』,流經那裡的河是一條髒水。那就是 Moran 所知道的全部自然。\n題目與正確選項:作者在第 2 段用 “the blackened heart” 形容 Moran 的家鄉,為什麼?(A) 那個地方受到嚴重汙染。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-41": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "這是 true/false 題,逐項查證。四個選項分別對應:Langford(第 2 段)、Moran 之前的大眾認知(第 4 段)、政府計畫起因(第 3 段)、其他國家公園(第 1、4 段)。",
   "(B):第 4 段 Before Moran arrived, Yellowstone in the popular imagination was a harsh, wild place... Since the painter’s work appeared ... a picturesque wonderland;第 1 段也說他的畫讓美國人看到壯麗景色。可知在他之前,大眾心中的 Yellowstone 是荒蠻之地,對它的美所知甚少。(『所知甚少』是對『荒蠻形象』的歸納,屬輕度推論。)",
   "(A) Langford 是寫故事的人,他參加過探險,但文章沒說他提議設立國家公園;(C) 文章說是 Moran 的作品打動國會,沒說因其天然資源豐富;(D) 第 1 段說他的畫促成國家公園的設立,第 4 段說他畫過另外十多個後來成為國家公園或紀念地的地區,所以不能說『唯一』。"
  ],
  "options": {
   "A": {
    "why": "第 2 段只說 Langford 寫了一篇關於 Yellowstone 的故事,而且他曾參加前往該地的探險;沒有說他提議設立國家公園。第 3 段是國會議員在看到勘查結果和 Moran 的畫之後設立公園。"
   },
   "B": {
    "why": "正確。第 4 段說在 Moran 到來之前,大眾想像中的 Yellowstone 是荒涼蠻荒的地方,畫作出現後才被視為如畫的仙境;第 1 段也說他的畫把壯麗景觀帶到美國民眾眼前。據此,1870 年代前民眾對它的美知之甚少。"
   },
   "C": {
    "why": "第 3 段說勘查成果與 Moran 的畫、Jackson 的照片被呈給國會,而他的畫作激發了議員的想像,國會才設立公園。文章沒有說政府計畫是因為其天然資源豐富而展開。"
   },
   "D": {
    "why": "文章不支持 only:第 1 段說他的畫為『這些地區』(複數)成為國家公園鋪路,第 4 段又說他畫過另外十多個後來成為國家公園或紀念地的地區,可知 Yellowstone 不是唯一受他作品影響的國家公園。這需要把第 1、4 段合起來推論,文章沒有逐一說明其他地區『因為』他的畫而設立。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "picturesque",
    "pos": "adj.",
    "zh": "如畫的、風景優美的",
    "note": "源自 picture,形容風景像畫一樣美;第 4 段 a picturesque wonderland 與先前荒蠻形象對比。"
   },
   {
    "type": "phrase",
    "t": "popular imagination",
    "zh": "大眾的想像(認知)",
    "note": "指一般人心中的印象;第 4 段用來描述 Moran 之前人們對 Yellowstone 的印象。"
   },
   {
    "type": "phrase",
    "t": "fire the imagination",
    "zh": "激發想像力",
    "note": "第 3 段 fired the imagination of Congress members,fire 在此作動詞,意為激起。",
    "coll": [
     "capture the imagination"
    ]
   },
   {
    "type": "phrase",
    "t": "set the stage for",
    "zh": "為……鋪路、創造條件",
    "note": "第 1 段 setting the stage for the regions to be ... established as national parks,指畫作為國家公園成立鋪好舞台。",
    "coll": [
     "set the stage for sth"
    ]
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段:……Moran 的水彩畫是這個地區的第一批彩色描繪,連同 Jackson 的照片與勘查結果一起呈給國會。他有力的畫面激發了國會議員的想像。1872 年 3 月,議員正式將 Yellowstone 設為國家公園,是世界第一座。\n第 4 段:Moran 到來之前,大眾想像中的 Yellowstone 是個嚴酷荒蠻的地方,熱水與蒸氣從地獄般的洞中冒出。自從這位畫家的作品問世,Yellowstone 國家公園逐漸被視為如畫的仙境。……\n題目與正確選項:關於 Yellowstone 國家公園,下列敘述何者正確?(B) 在 1870 年代以前,美國人對它的美知之甚少。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-42": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "這是推論題:正確答案不會原文照抄,而是由文章資訊合理推出;需要比較四個選項各自有沒有文章依據。",
   "第 3 段特別把 Moran 的水彩稱為 the first color renderings of the area，同一句又另外提到 Jackson’s photos。題目問的是 inference，因此可由文章特別強調 Moran 提供「最早的彩色呈現」推知，在他開始描繪 Yellowstone 的年代，以照片呈現彩色景觀並不普遍。文章沒有直接說 Jackson 的照片是不是彩色，所以不要把照片顏色當成已知事實。",
   "其他選項:(A) 文章只說 Moran 在 Scribner’s Monthly 當插畫家,沒說它是推廣國家公園的雜誌;(B) 第 2 段說他看了 Langford 的描述後『eager to see』,第 3 段才隨勘查隊前往,所以並不是先去過;(D) 文章沒有比較各種繪畫形式的流行程度。所以選 (C)。"
  ],
  "options": {
   "A": {
    "why": "第 2 段只說 Moran 被 Scribner’s Monthly 雇為插畫家,並升為首席插畫家,沒有說這份刊物的性質或宗旨是宣傳國家公園。"
   },
   "B": {
    "why": "與文章相反。第 2 段說他因 Langford 描述的奇景而 became eager to see this odd territory for himself,表示當時還沒去過;第 3 段 1871 年他才加入勘查隊前往。"
   },
   "C": {
    "why": "正確，屬推論。文章特別指出 Moran 的水彩是 Yellowstone 最早的一批彩色呈現，顯示「彩色呈現」在當時具有特殊性；在同段又把他的水彩與 Jackson 的照片並列，因此四個選項中最合理的推論是當時彩色照片尚不普遍。文章並未直接說 Jackson 的照片顏色，所以答案依據是文章的整體對比，不是斷言 Jackson 的照片一定是黑白。"
   },
   "D": {
    "why": "第 2 段只說 Moran 受 Turner 風景畫啟發,沒有提到水彩是否為 19 世紀最流行的風景畫形式。文章沒有任何關於流行程度的比較。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "rendering",
    "pos": "n.",
    "zh": "(藝術)描繪、表現",
    "note": "第 3 段 color renderings 指用色彩呈現的畫作。動詞為 render,名詞 rendering 也可指演奏、翻譯、效果圖。"
   },
   {
    "type": "word",
    "t": "watercolor",
    "pos": "n.",
    "zh": "水彩畫",
    "note": "可指顏料或用水彩畫的作品,第 3 段指 Moran 畫的水彩作品。"
   },
   {
    "type": "word",
    "t": "infer",
    "pos": "v.",
    "zh": "推論",
    "note": "推論題的答案來自合理推導,不是原文;這題要從『first color renderings』推出『彩色照片不常見』。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段:1871 年,Moran 與攝影師 William Henry Jackson 一同加入美國政府首次對 Yellowstone 地區的勘查。他有兩週的時間在素描本上畫滿此地最驚人的景色。Moran 的水彩畫——該地區第一批彩色描繪——連同 Jackson 的照片與勘查結果,一起呈交給國會。\n題目與正確選項:從文章可推論什麼?(C) Moran 開始畫 Yellowstone 時,彩色照片並不普遍。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-43": {
  "schema": 2,
  "answer": "D",
  "status": "reviewed",
  "key": [
   "題目問 100% Fish 的主要目標(primary goal)。先找文章對這個計畫的目的描述:第 2 段 It aims to encourage full utilization of each fish caught, and to strengthen innovation in seafood products(文章明說)。",
   "『full utilization of each fish caught』= 充分利用捕到的每一條魚,對應 (D) make the most of marine resources。第 3 段也說在此指導下冰島人已用掉鱈魚約 95%,是此目標的成果。",
   "第 2 段其實明列兩項目標：一是 full utilization of each fish caught，二是 strengthen innovation in seafood products。本題四個選項中，只有 (D) make the most of marine resources 直接改寫第一項目標；而第 3 段從約 60% 浪費到現在利用約 95% 的內容又集中強化「充分利用」這條主軸。因此 (D) 是四個選項中最直接、最完整對應文章的答案。另一項「海產品創新」也是正式目標，只是沒有任何選項直接以它作答。"
  ],
  "options": {
   "A": {
    "why": "文章沒有提到發展海洋科技;第 2 段說的創新是 innovation in seafood products(海產品創新),且它與『充分利用每條魚』並列為計畫目標之一,不等於推進海洋科技。"
   },
   "B": {
    "why": "第 3 段只把 food crises 當作減少魚類浪費之所以重要的背景,而且是用『許多國家面臨糧食危機』提醒議題的嚴重性;計畫的目標也不是『減少全球糧食危機』。第 4 段說它可成為全球資源效率的模式,屬於後續影響。"
   },
   "C": {
    "why": "第 4 段說冰島的成功主要靠跨產業合作,100% Fish 也負責促進合作與連結。但這是達成目標的方法與手段,不是計畫自述的首要目標。"
   },
   "D": {
    "why": "正確。第 2 段說計畫旨在鼓勵 full utilization of each fish caught,即把魚這項海洋資源物盡其用;第 3 段的 95% 利用率是成果。(D) 的 make the most of 對應 full utilization。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "utilization",
    "pos": "n.",
    "zh": "利用",
    "note": "動詞為 utilize,名詞 utilization 指有效利用;第 2 段 full utilization of each fish caught。",
    "coll": [
     "full utilization of resources"
    ]
   },
   {
    "type": "phrase",
    "t": "make the most of",
    "zh": "充分利用",
    "note": "指把握機會或資源,使其發揮最大價值;(D) 即用此語改寫 full utilization。",
    "coll": [
     "make the most of sth"
    ]
   },
   {
    "type": "word",
    "t": "primary",
    "pos": "adj.",
    "zh": "主要的、首要的",
    "note": "題幹的 primary goal 指最主要的目標。第 2 段 aims to 引導的部分才是計畫自述的目標。"
   },
   {
    "type": "word",
    "t": "marine",
    "pos": "adj.",
    "zh": "海洋的",
    "note": "第 2 段 marine industry;(D) 的 marine resources 指海洋資源。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:冰島這個計畫(此項開創性療程即由它而生)致力於為海洋產業帶來根本的改變。它的目標是鼓勵充分利用捕到的每一條魚,並加強海產品的創新。\n第 3 段:……在 100% Fish 的指導下,冰島人現在幾乎用掉一條鱈魚的 95%。\n題目與正確選項:100% Fish 的首要目標是什麼?(D) 充分利用海洋資源。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-44": {
  "schema": 2,
  "answer": "B",
  "status": "reviewed",
  "key": [
   "指涉題:先找 this pioneering procedure 出現的句子,在第 2 段首句後:Oddsson’s fish skin transplantation was actually part of ... “100% Fish”... The Icelandic project, from which this pioneering procedure emerged...。",
   "關係子句 from which this pioneering procedure emerged 修飾 The Icelandic project,意思是『這項開創性的療程是從該計畫中誕生的』;所以 procedure 是由計畫產生的東西,不是計畫本身。",
   "再看前一句:本段開頭的主角是 Oddsson’s fish skin transplantation(魚皮移植),且稱它為 A triumph for medical technology;procedure(療程、手術)最自然就是回指這個移植。所以答案是 Oddsson 的魚皮移植 (B)。",
   "(A)(C) 是計畫的任務與目標;(D) 文章沒有稱某項新做法為保護環境,而 procedure 在前文最自然回指的是 Oddsson 的魚皮移植療程,所以不選。"
  ],
  "options": {
   "A": {
    "why": "100% Fish 的任務是計畫(The Icelandic project)自身的任務。from which 的先行詞是 The Icelandic project,而 this pioneering procedure 是『從計畫中產生』的東西,所以與計畫的任務不是同一件事。"
   },
   "B": {
    "why": "正確。第 2 段開頭 Oddsson’s fish skin transplantation 是被稱為 A triumph for medical technology 的醫療作為,procedure 指的就是這項魚皮移植療程;它是 from the Icelandic project 而來。"
   },
   "C": {
    "why": "A fundamental change in seafood business 是同一句主要子句 strives for making a fundamental change in the marine industry 所說的計畫願景(The Icelandic project 是主詞),並不是從計畫中誕生的療程。"
   },
   "D": {
    "why": "A new approach to protect the environment 文章並未如此描述。第 2 段說計畫在促進環境效率與充分利用魚獲,而 procedure 一詞與醫療手術相關,不是泛指保護環境的新做法。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "pioneering",
    "pos": "adj.",
    "zh": "開創性的、先驅的",
    "note": "形容首創或領先的做法;名詞 pioneer 指先驅。第 2 段 this pioneering procedure。"
   },
   {
    "type": "word",
    "t": "procedure",
    "pos": "n.",
    "zh": "程序;(醫療)手術、療程",
    "note": "此處指醫療程序,即把魚皮移植到人體;也可泛指做事步驟。"
   },
   {
    "type": "phrase",
    "t": "emerge from",
    "zh": "由……出現/產生",
    "note": "emerge 為不及物動詞;第 2 段 from which this pioneering procedure emerged 是『介系詞+關係代名詞』結構。",
    "coll": [
     "emerge from sth"
    ]
   },
   {
    "type": "word",
    "t": "transplant",
    "pos": "v.",
    "zh": "移植",
    "note": "動詞可接 onto/into;第 1 段 transplanting codfish skins onto human bodies。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 2 段:身為醫療科技的一大勝利,Oddsson 的魚皮移植其實是「100% Fish」這項驚人成就的一部分;「100% Fish」是一項推動環境效率的雄心勃勃的任務。這個冰島計畫(這項開創性的療程即由它而生)致力於為海洋產業帶來根本的改變。\n題目與正確選項:第 2 段的 “this pioneering procedure” 指什麼?(B) Oddsson 的皮膚移植。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-45": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "true/false 題:逐項回文章查證。四個選項分別涉及 30%(第 4 段)、Oddsson(第 1、2 段)、跨領域合作(第 4 段)、國際企業(全文)。",
   "(C):第 4 段 The Icelandic success is accomplished largely through cooperative efforts across various industries...different sectors are able to come up with improved processing and handling, through which creation of various innovative products was made possible。合作促成各種創新產品,可說成效豐碩(文章明說合作促成成功;fruitful 是概括)。",
   "(A) 30% 是每條鱈魚的價值比多數已開發國家多 30%,不是魚獲量增加;(B) Oddsson 是受害的電廠工人、移植的受益者,沒說他是計畫成員;(D) 文章說它是冰島的計畫,並提到可作為全球典範,沒說是跨國企業、也沒說它行銷海產品。"
  ],
  "options": {
   "A": {
    "why": "第 4 段的 30% 是 get 30% more value from each cod than most developed countries,是每條鱈魚的價值,與捕魚量無關;文章也沒有提到 20 年。第 3 段 2003 年的數字是被浪費的比例,不是捕撈量。"
   },
   "B": {
    "why": "第 1 段說 Oddsson 是電廠工人,觸電後獲魚皮移植救命,他是受益的病患。文章沒有說他是計畫的成員,更不是重要成員。"
   },
   "C": {
    "why": "正確。第 4 段說冰島的成功主要來自 cooperative efforts across various industries,100% Fish 促成漁業公司與學界、新創、研發團隊等連結,讓創新產品得以出現。『very fruitful』是對這些成果的概括說法。"
   },
   "D": {
    "why": "文章只說這是 The Icelandic project,並說它可提供全球促進資源效率的模式(第 4 段),沒有說它是行銷海鮮的大型國際企業;它的角色是促成合作、鼓勵創新。"
   }
  },
  "notes": [
   {
    "type": "word",
    "t": "collaboration",
    "pos": "n.",
    "zh": "合作",
    "note": "動詞 collaborate,與 cooperation 近義;第 4 段 the importance of collaboration 與 cooperative efforts。",
    "coll": [
     "collaborate with sb on sth"
    ]
   },
   {
    "type": "phrase",
    "t": "take the initiative",
    "zh": "主動採取行動",
    "note": "第 4 段 takes the initiative to show seafood companies ... 指計畫主動帶頭示範。",
    "coll": [
     "take the initiative to V"
    ]
   },
   {
    "type": "word",
    "t": "fruitful",
    "pos": "adj.",
    "zh": "成果豐碩的",
    "note": "由 fruit 加 -ful 而成,指有成果、有收穫的;(C) 的 fruitful 概括合作帶來的成果。"
   },
   {
    "type": "word",
    "t": "facilitate",
    "pos": "v.",
    "zh": "促進、使便利",
    "note": "及物動詞,主詞常為促成者;第 4 段 facilitate valuable connections。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 4 段:冰島的成功主要是透過各產業間的合作努力達成。100% Fish 主動向海產公司說明合作的重要,並促成漁業公司與計畫其他參與者(包括學界、新創公司及研發團隊)之間有價值的連結。藉由分享知識與資訊,不同部門得以想出更好的加工與處理方式,讓各種創新產品得以誕生。這個計畫不僅幫助冰島人從每條鱈魚獲得比多數已開發國家多 30% 的價值,也提供了推動全球資源效率的有效模式。\n題目與正確選項:根據本文,下列何者正確?(C) 跨領域合作已證明對 100% Fish 成果非常豐碩。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
 "113-46": {
  "schema": 2,
  "answer": "C",
  "status": "reviewed",
  "key": [
   "插入句題:Almost nothing of a fish is left for the trash bin.(魚幾乎沒有東西被丟進垃圾桶)。它是個總結性、結果式的敘述,要放在『已經列出各部位如何被利用』的段落末尾。",
   "第 3 段先說浪費魚獲的問題,再說冰島現在已利用鱈魚約 95%,並逐項列舉:魚皮做鈣片與能量飲料、移植材料,魚頭與魚骨製湯底,以及 Omega-3 膠囊等『過去是廢棄物』的產品。這些例子之後,放『幾乎沒有東西丟進垃圾桶』剛好作歸納(例證→歸納)。",
   "第 1 段末句收在 Oddsson 的魚皮移植救命;第 2 段末句收在計畫目標;第 4 段末句收在 30% 價值與全球模式。這三處都還沒有(或已經離開了)『各部位被利用』的具體內容,與插入句的銜接都不如第 3 段末句緊密。"
  ],
  "options": {
   "A": {
    "why": "第 1 段講 Oddsson 觸電受傷及魚皮移植救命,還沒進入『每個部位如何使用』的內容;段末放這句會顯得突然,沒有承接。"
   },
   "B": {
    "why": "第 2 段末句是 aims to ... strengthen innovation in seafood products 一帶的計畫目標;插入句的 trash bin 與『幾乎沒有東西被丟掉』需要具體利用方式來支撐。第 3 段列出魚皮、魚頭與魚骨、Omega-3 膠囊等,並以 what was once cod catch detritus(過去的廢棄物)作結,與 trash bin 直接呼應,所以第 3 段末更合適。第 2 段並非完全不可能,但銜接較弱。"
   },
   "C": {
    "why": "正確。第 3 段列舉魚皮、魚頭、魚骨及 Omega-3 膠囊等,最後一句 what was once cod catch detritus 說明本來是廢料;在這之後放『Almost nothing ... is left for the trash bin』是對前面例證的歸納總結。"
   },
   "D": {
    "why": "第 4 段談跨產業合作與 30% 的價值,最後一句是在談全球資源效率模式;放進這句不會與段落主旨連貫,也失去『例證後總結』的承接。"
   }
  },
  "notes": [
   {
    "type": "phrase",
    "t": "trash bin",
    "zh": "垃圾桶",
    "note": "trash bin 即垃圾桶(也說 trash can;英式常說 rubbish bin)。插入句 left for the trash bin 意為『剩下給垃圾桶(被丟棄)的部分』。"
   },
   {
    "type": "word",
    "t": "detritus",
    "pos": "n.",
    "zh": "碎屑、廢棄物",
    "note": "指殘餘的碎屑或廢物。第 3 段 what was once cod catch detritus 指過去被當作廢棄物的魚獲部位。"
   },
   {
    "type": "word",
    "t": "groundbreaking",
    "pos": "adj.",
    "zh": "開創性的",
    "note": "指首創、突破既有框架的;第 3 段 Other groundbreaking products。"
   }
  ],
  "words": [],
  "phrases": [],
  "patterns": [],
  "grammar": "",
  "zh": "第 3 段(含插入句):……魚皮可製成鈣片與能量飲料,甚至如 Oddsson 的例子成為皮膚移植的材料。風乾的魚頭與魚骨出口到西非,在那裡被當作富含蛋白質湯品的湯底。包括 Omega-3 膠囊、感冒病毒前處理噴劑及狗點心在內的其他突破性產品,都是用過去鱈魚漁獲的廢棄物做成的。/(插入句)一條魚幾乎沒有什麼會被留給垃圾桶。\n題目與正確選項:有一句話:「一條魚幾乎沒有什麼被留下丟進垃圾桶。」哪一段最適合以它作為最後一句?(C) 第 3 段。",
  "aiFlags": [],
  "reviewer": "教師（負責人）",
  "reviewedAt": "2026-11-24",
  "reviewNotes": "2026-11-24 教師（負責人）確認：本題教學文字內容已完成教師審核並正式簽核通過。簽核範圍僅限文字教學內容；正式 production 發音尚未進行人工試聽簽核，音檔狀態以 signoff 的 audio 區塊為準。"
 },
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
