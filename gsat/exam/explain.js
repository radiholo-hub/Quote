// 原創詳解(自行撰寫,非第三方解析)。鍵為「年度-題號」。schema 2:引用單字詞條(gsat/data/vocab.js),字義與詞性只在詞條裡定義一次。
// status:draft＝AI 草稿,待英文老師審核;reviewed＝已審核(審核前不得標為 reviewed)。reviewer／reviewedAt／reviewNotes 由審核者填寫。
// 【資料來源】本檔是版本控制下的唯一來源,直接編輯;沒有任何 repo 外的產生流程,也不得再用腳本整檔重新產生(會把教師簽核欄位覆蓋回 draft;gsat/tests/test_signoff.py 會擋)。
// 已簽核的題目(目前有 115-1、115-2、115-3、115-4、115-5、115-6、115-7、115-8、115-9、115-10)必須有 docs/gsat/signoffs/<題號>.json,且內容指紋一致(python3 tools/gsat_signoff.py check);已簽核的內容被改動後檢查會失敗,需重新審核。
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
 }
};
