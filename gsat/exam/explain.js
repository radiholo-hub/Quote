// 原創詳解(自行撰寫,非第三方解析)。鍵為「年度-題號」。schema 2:引用單字詞條(gsat/data/vocab.js),字義與詞性只在詞條裡定義一次。
// status:draft＝AI 草稿,待英文老師審核;reviewed＝已審核(審核前不得標為 reviewed)。reviewer／reviewedAt／reviewNotes 由審核者填寫。
// 審核方式:python3 tools/gsat_review_sheet.py --out <版本庫以外的資料夾> 產生含題目與檢核欄位的審核表(內含試題,請勿公開)。
window.EXPLAIN = {
 "115-1": {
  "schema": 2,
  "answer": "B",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
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
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "but 表示轉折:現在擁有「專業」(professional)的工作室,代表先前的身分與「專業」相反。",
   "started as… 說明剛起步時的身分;從業餘到專業,是常見的成長過程。",
   "所以空格填「業餘的」amateur。另外 an 後面要接母音開頭的字,amateur 符合。"
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
    "why": "elementary 是「初級的、基本的」,用在程度或教育階段(elementary school),不用來描述「業餘 vs. 專業」的身分。"
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
  "zh": "珍一開始是個業餘的藝術設計師,但現在她擁有自己的專業工作室。",
  "aiFlags": [
   "選項 D elementary:說明是否足夠(elementary 也可指「基本的」程度)?"
  ]
 },
 "115-3": {
  "schema": 2,
  "answer": "B",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "看後半句:這件事「吸引了十幾位資格優良的 applicants(應徵者)」。",
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
    "why": "expectation 是「期望」,不會「吸引」應徵者。"
   },
   "D": {
    "entry": "inspiration-n",
    "why": "inspiration 是「靈感、啟發」,與應徵無關。"
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
   "more than a dozen + 複數名詞(十幾個以上)"
  ],
  "grammar": "more than a dozen applicants:dozen 前面有 a 或數字時不加 s(two dozen eggs);沒有數字、表示「很多」時才用 dozens of。soon 是副詞,放在主詞與動詞之間(soon attracted)。",
  "focus": "vacancy-n",
  "zh": "這所知名高中的教職缺額很快就吸引了十多位資格優良的應徵者。"
 },
 "115-4": {
  "schema": 2,
  "answer": "A",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "看 than ___ expected:than 後面省略了「主詞 + be」,完整是 than (it was) initially expected。",
   "句意是「獲利遠超過『原先』的預期」,空格要放表示時間先後的副詞(一開始、當初)。",
   "initially 是「起初」,符合;其餘三個副詞都不表示時間先後。"
  ],
  "options": {
   "A": {
    "entry": "initially-adv",
    "why": "initially＝起初,than initially expected＝比起原先的預期。"
   },
   "B": {
    "entry": "genuinely-adv",
    "why": "genuinely 是「真誠地、確實地」,不表示時間先後,放在這裡無法說明「比當初預期更多」。"
   },
   "C": {
    "entry": "alternatively-adv",
    "why": "alternatively 是「或者、另一個選擇是」,用來提出另一個方案。"
   },
   "D": {
    "entry": "fundamentally-adv",
    "why": "fundamentally 是「根本上」,和「預期」的先後無關。"
   }
  },
  "words": [
   "initially-adv"
  ],
  "phrases": [],
  "patterns": [
   "far + 比較級 + than(遠比…)",
   "than (it was) + 副詞 + 過去分詞(省略主詞與 be)"
  ],
  "grammar": "far more profit than…:far 用來加強比較級(more)。than 引導的比較子句常省略「主詞 + be」。",
  "focus": "initially-adv",
  "zh": "由一位年輕工程師設計的這項新產品,所創造的利潤遠比起初預期的多得多。",
  "aiFlags": [
   "解題關鍵 1 把 than 後面還原成 than (it was) initially expected,是否符合高中教學的說法?"
  ]
 },
 "115-5": {
  "schema": 2,
  "answer": "D",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "看 a balanced ___ of fruit and vegetables:與「健康」有關的,是人實際「吃進去」的量。",
   "「攝取」要用 consumption(攝取、消耗);a balanced consumption of… ＝均衡攝取…。",
   "注意 provision 是「供應、提供」,指給的一方;影響健康的是吃進去的量,不是供應的量。"
  ],
  "options": {
   "A": {
    "entry": "dimension-n",
    "why": "dimension 是「層面、尺寸」,a balanced dimension of fruit 語意不通。"
   },
   "B": {
    "entry": "integration-n",
    "why": "integration 是「整合」,語意不通。"
   },
   "C": {
    "entry": "provision-n",
    "why": "provision 是「供應、提供」,指提供的一方;這題談的是對健康的影響,應該是人吃進去的量。"
   },
   "D": {
    "entry": "consumption-n",
    "why": "consumption＝攝取(量),a balanced consumption of fruit and vegetables＝均衡攝取蔬果。"
   }
  },
  "words": [
   "consumption-n"
  ],
  "phrases": [],
  "patterns": [
   "It has been confirmed that…(已證實…)",
   "a balanced diet / consumption(均衡的飲食/攝取)"
  ],
  "grammar": "It has been confirmed that…:It 是虛主詞,現在完成式被動,真主詞是 that 子句;the key element to… 的 to 是介系詞。",
  "focus": "consumption-n",
  "zh": "已經證實,均衡攝取水果與蔬菜是維持健康的關鍵要素。",
  "aiFlags": [
   "選項 C provision 的說明用「指提供的一方」區分,是否清楚?"
  ]
 },
 "115-6": {
  "schema": 2,
  "answer": "A",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "句首說主詞是「害羞、怕公開露面」的男孩,所以空格要表達他對「在大批觀眾前演講」感到畏懼。",
   "空格後面是 the thought of speaking…,能接 the thought of 並表示「害怕」的動詞是 dread。",
   "Timmy 是第三人稱單數、時態是現在式,所以用 dreads。"
  ],
  "options": {
   "A": {
    "entry": "dread-v",
    "why": "dread＝害怕、畏懼,dread the thought of speaking＝一想到要演講就害怕。"
   },
   "B": {
    "entry": "stress-v",
    "why": "stress 當動詞主要是「強調」,stresses the thought 會變成「強調這個想法」,和前面 afraid 的語氣不合。"
   },
   "C": {
    "entry": "wander-v",
    "why": "wander 是不及物動詞「閒逛、漫遊」,後面不能直接接 the thought。"
   },
   "D": {
    "entry": "escape-v",
    "why": "escape 是「逃脫、逃離」(地點或危險),escape the thought 不是慣用搭配,也不是題意要的「感到恐懼」。"
   }
  },
  "words": [
   "dread-v"
  ],
  "phrases": [
   "public-appearance"
  ],
  "patterns": [
   "dread the thought of + V-ing(一想到…就害怕)",
   "dread + V-ing(害怕做某事)"
  ],
  "grammar": "the thought of + V-ing:介系詞 of 後面接動名詞,所以是 the thought of speaking,不能寫 the thought of to speak。句首 As a shy boy… 的 as 是「作為」,afraid of… 是放在 boy 後面的形容詞片語。",
  "focus": "dread-v",
  "zh": "提米是個害羞的男孩,害怕公開露面,一想到要在一大群聽眾面前演講就感到畏懼。"
 },
 "115-7": {
  "schema": 2,
  "answer": "C",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "看 which 子句:which he has devoted himself to whole-heartedly(他全心投入的…)。",
   "空格是 his life’s ___(他一生的…),又是「全心投入的對象」,所以是他熱愛的事物。",
   "答案是 passion(熱情、熱愛的事物);life’s passion＝畢生的熱愛。"
  ],
  "options": {
   "A": {
    "entry": "resource-n",
    "why": "resource 是「資源」,「音樂是他一生的資源」不能解釋「全心投入」。"
   },
   "B": {
    "entry": "impact-n",
    "why": "impact 是「衝擊、影響」,不是可以被「全心投入」的對象。"
   },
   "C": {
    "entry": "passion-n",
    "why": "passion＝熱愛的事物,his life’s passion＝他畢生的熱愛。"
   },
   "D": {
    "entry": "emphasis-n",
    "why": "emphasis 是「強調、重點」,無法表達「全心投入的對象」。"
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
  "grammar": "非限定關係子句 which he has devoted himself to…:先行詞是前面的 his life’s ___,devote oneself to 的 to 留在子句最後;whole-heartedly 是副詞,修飾 devoted。",
  "focus": "passion-n",
  "zh": "對這位剛加冕的鋼琴比賽冠軍來說,音樂是他生命中的熱情所在,他一直全心全意投入其中。"
 },
 "115-8": {
  "schema": 2,
  "answer": "B",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "空格和 shouted at passers-by 用 and 並列,都是 who(酒駕者)對路人做的事,後面還有 with glass bottles。",
   "他因此「被警察逮捕」,所以這個動作是「攻擊」:assault sb. with sth.(用…攻擊某人)。",
   "用受詞檢查:them 是「人」,能接人又搭配 with 工具的只有 assault。"
  ],
  "options": {
   "A": {
    "entry": "shatter-v",
    "why": "shatter 是「打碎」,受詞通常是物品(shatter a window);不能 shatter 路人。"
   },
   "B": {
    "entry": "assault-v",
    "why": "assault＝攻擊,assaulted them with glass bottles＝用玻璃瓶攻擊他們。"
   },
   "C": {
    "entry": "overturn-v",
    "why": "overturn 是「翻轉、推翻」,受詞是物品或判決,不能接人。"
   },
   "D": {
    "entry": "condemn-v",
    "why": "condemn 是「譴責」,是言語上的行為,不搭配 with glass bottles。"
   }
  },
  "words": [
   "assault-v"
  ],
  "phrases": [
   "drunk-driver"
  ],
  "patterns": [
   "assault + 人 + with + 工具(用…攻擊某人)",
   "shout at sb.(對著某人大吼)"
  ],
  "grammar": "who shouted at passers-by and ___ them…:who 子句裡兩個過去式動詞用 and 並列,共用同一個主詞 who;主要子句 was quickly arrested 是被動語態。shout at sb. 是「對著某人大吼」(帶怒意),shout to sb. 才是「向某人喊話」。passer-by 的複數是 passers-by。",
  "focus": "assault-v",
  "zh": "那名酒駕的駕駛對路人大吼,還拿玻璃瓶攻擊他們,很快就被警方逮捕了。",
  "aiFlags": [
   "解題關鍵 3「能接人又搭配 with 工具的只有 assault」語氣偏強,是否改成「四個選項中只有 assault 最合理」?"
  ]
 },
 "115-9": {
  "schema": 2,
  "answer": "C",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "先看句型:___ my way through the crowd ＝「動詞 + one’s way + 介系詞」,表示以某種方式前進。",
   "情境是公車站人太多(so many people),要「擠」過人群才趕得上車。",
   "用手肘擠開人群前進,是 elbow one’s way through the crowd。"
  ],
  "options": {
   "A": {
    "entry": "crash-v",
    "why": "crash 是猛烈撞擊或撞毀,強調破壞力,不是「擠過人群」。"
   },
   "B": {
    "entry": "tumble-v",
    "why": "tumble 是「跌倒、滾落」,不與 one’s way 組成這種句型。"
   },
   "C": {
    "entry": "elbow-v",
    "why": "elbow one’s way through the crowd 是描述穿過擁擠人群最慣用、動作最具體的說法。"
   },
   "D": {
    "entry": "struggle-v",
    "why": "struggle 後面雖然也有人接 one’s way,但語意是「費力地完成」,沒有指出「用身體擠過去」的動作,在這題不如 elbow 貼切;官方答案為 C。"
   }
  },
  "words": [
   "elbow-v"
  ],
  "phrases": [
   "board-the-bus"
  ],
  "patterns": [
   "elbow / push / force + one’s way + through…(擠過、闖過…)",
   "so + 形容詞 + that 子句(如此…以致於…)"
  ],
  "grammar": "so many people at the bus station that…:so + many + 名詞 + that 子句表示結果;in time 是「及時」,on time 才是「準時」。",
  "focus": "elbow-v",
  "zh": "公車站的人太多了,我得用手肘推擠著穿過人群,才趕得上公車。",
  "aiFlags": [
   "選項 D struggle:struggle one’s way through 實際上也有人用,詳解已寫「不如 elbow 貼切」,措辭請確認;句中「官方答案為 C」的寫法是否保留?"
  ]
 },
 "115-10": {
  "schema": 2,
  "answer": "D",
  "status": "draft",
  "reviewer": null,
  "reviewedAt": null,
  "reviewNotes": "",
  "key": [
   "看 raised ___ concerns:要找最常修飾 concerns(憂慮)的形容詞。",
   "前面 deadly shootings、後面 tragic incidents 語氣都很嚴肅沉重,所以是「嚴重的、深切的憂慮」。",
   "grave concerns 是固定搭配;其餘三個形容詞各有自己常搭配的名詞(swift response、brutal attack、harsh criticism)。"
  ],
  "options": {
   "A": {
    "entry": "swift-adj",
    "why": "swift 是「迅速的」,常見搭配是 swift response,不修飾 concerns。"
   },
   "B": {
    "entry": "brutal-adj",
    "why": "brutal 是「殘暴的」,形容暴行本身,不用來形容「憂慮」。"
   },
   "C": {
    "entry": "harsh-adj",
    "why": "harsh 是「嚴厲的、嚴酷的」,常搭配 criticism、weather,不搭配 concerns。"
   },
   "D": {
    "entry": "grave-adj",
    "why": "grave concerns＝嚴重的憂慮,是 concerns 最常見的形容詞搭配之一。"
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
  "grammar": "prevent such tragic incidents from happening again:prevent + 受詞 + from + V-ing。how to prevent… 是「疑問詞 + to V」,作 about 的受詞。",
  "focus": "grave-adj",
  "zh": "美國校園接連發生致命槍擊案,引發了人們對於如何防止這類悲劇再度發生的嚴重關切。"
 }
};
