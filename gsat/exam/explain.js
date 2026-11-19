// 原創詳解(自行撰寫,非第三方解析)。鍵為「年度-題號」。schema 2:引用單字詞條(gsat/data/vocab.js),字義與詞性只在詞條裡定義一次。
// status:draft＝AI 草稿,待英文老師審核;reviewed＝已審核(審核前不得標為 reviewed)。reviewer／reviewedAt／reviewNotes 由審核者填寫。
// 【資料來源】本檔是版本控制下的唯一來源,直接編輯;沒有任何 repo 外的產生流程,也不得再用腳本整檔重新產生(會把教師簽核欄位覆蓋回 draft;gsat/tests/test_signoff.py 會擋)。
// 已簽核的題目(目前有 115-1 ～ 115-46)必須有 docs/gsat/signoffs/<題號>.json,且內容指紋一致(python3 tools/gsat_signoff.py check);已簽核的內容被改動後檢查會失敗,需重新審核。
// 審核方式:python3 tools/gsat_review_sheet.py --out <版本庫以外的資料夾> 產生含題目與檢核欄位的審核表(內含試題,請勿公開)。
window.EXPLAIN = {
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
