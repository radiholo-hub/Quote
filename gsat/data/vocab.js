// 原創單字資料庫(嚴格 JSON 格式,方便程式讀寫)。由 gsat/data/vocab.js 直接編輯;欄位說明見 docs/gsat/VOCAB_INDEX_METHOD.md
window.VOCAB = {
 "meta": {
  "schema": 1,
  "note": "原創單字資料庫。A 詞形變化(forms)、B 同字族衍生字(family)、C 語意相關字(rel)三類分開管理,出題紀錄只依 A 類詞形計算。status=draft 表示待老師審核。"
 },
 "entries": {
  "tight-adj": {
   "id": "tight-adj",
   "hw": "tight",
   "key": "adj",
   "pos": "adj.",
   "zh": "緊湊的;(時間、經費)吃緊的;緊的",
   "forms": [
    "tight",
    "tighter",
    "tightest"
   ],
   "amb": {
    "tight": "也可作副詞(hold on tight 緊緊抓住)"
   },
   "alsoPos": "adv.(hold tight 緊緊抓住)",
   "family": "tight",
   "coll": [
    {
     "t": "tight schedule",
     "zh": "行程緊湊"
    },
    {
     "t": "tight budget",
     "zh": "預算吃緊"
    },
    {
     "t": "tight deadline",
     "zh": "緊迫的截止期限"
    }
   ],
   "ex": [
    {
     "en": "My schedule is so tight this week that I cannot meet you for lunch.",
     "zh": "我這週行程太滿,沒辦法跟你吃午餐。"
    },
    {
     "en": "We are on a tight budget, so we cannot buy a new car.",
     "zh": "我們預算吃緊,所以買不起新車。"
    }
   ],
   "note": "形容「時間、行程、預算」時,表示餘裕很少、排得很滿。",
   "rel": {
    "syn": [
     {
      "w": "packed",
      "zh": "(行程)排得滿滿的"
     }
    ],
    "ant": [
     {
      "w": "flexible",
      "zh": "有彈性的"
     },
     {
      "w": "loose",
      "zh": "寬鬆的"
     }
    ],
    "confusable": [
     {
      "w": "busy",
      "note": "busy 形容「人」或某段時間很忙;tight 形容行程、預算本身排得緊、沒有餘裕,常搭配 schedule、budget、deadline。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "tightly-adv": {
   "id": "tightly-adv",
   "hw": "tightly",
   "key": "adv",
   "pos": "adv.",
   "zh": "緊緊地;嚴密地",
   "forms": [
    "tightly"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "tight",
   "coll": [
    {
     "t": "hold tightly",
     "zh": "緊緊握住"
    }
   ],
   "ex": [
    {
     "en": "She held the rope tightly.",
     "zh": "她緊緊抓著繩子。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "tighten-v": {
   "id": "tighten-v",
   "hw": "tighten",
   "key": "v",
   "pos": "v.",
   "zh": "使變緊;收緊;加強(規定)",
   "forms": [
    "tighten",
    "tightens",
    "tightened",
    "tightening"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "tight",
   "coll": [
    {
     "t": "tighten a screw",
     "zh": "鎖緊螺絲"
    },
    {
     "t": "tighten security",
     "zh": "加強保安"
    }
   ],
   "ex": [
    {
     "en": "The school decided to tighten its safety rules.",
     "zh": "學校決定加強安全規定。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "tightness-n": {
   "id": "tightness-n",
   "hw": "tightness",
   "key": "n",
   "pos": "n.",
   "zh": "緊;緊繃感;(經費)吃緊",
   "forms": [
    "tightness"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "tight",
   "coll": [
    {
     "t": "a tightness in the chest",
     "zh": "胸口緊繃"
    }
   ],
   "ex": [
    {
     "en": "He felt a tightness in his chest before the speech.",
     "zh": "演講前他感到胸口一陣緊繃。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "amateur-adj": {
   "id": "amateur-adj",
   "hw": "amateur",
   "key": "adj",
   "pos": "adj.",
   "zh": "業餘的",
   "forms": [
    "amateur"
   ],
   "amb": {
    "amateur": "也可作名詞(業餘愛好者)"
   },
   "alsoPos": "n. 業餘愛好者",
   "family": "amateur",
   "coll": [
    {
     "t": "amateur photographer",
     "zh": "業餘攝影師"
    },
    {
     "t": "amateur player",
     "zh": "業餘選手"
    }
   ],
   "ex": [
    {
     "en": "He is an amateur photographer who takes pictures on weekends.",
     "zh": "他是週末拍照的業餘攝影師。"
    }
   ],
   "note": "amateur 以母音開頭,前面的冠詞用 an(an amateur)。",
   "rel": {
    "syn": [],
    "ant": [
     {
      "w": "professional",
      "zh": "專業的"
     }
    ],
    "confusable": [
     {
      "w": "novice",
      "note": "novice 指「新手、經驗不足的人」;amateur 指「非專業、不以此為業的人」,不一定是新手,有些業餘者技術很高。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "amateurish-adj": {
   "id": "amateurish-adj",
   "hw": "amateurish",
   "key": "adj",
   "pos": "adj.",
   "zh": "業餘水準的;不夠專業的(帶貶意)",
   "forms": [
    "amateurish"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "amateur",
   "coll": [],
   "ex": [
    {
     "en": "The video looked amateurish.",
     "zh": "這支影片看起來很不專業。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "vacancy-n": {
   "id": "vacancy-n",
   "hw": "vacancy",
   "key": "n",
   "pos": "n.",
   "zh": "(職務的)空缺;空房",
   "forms": [
    "vacancy",
    "vacancies"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "vacancy",
   "coll": [
    {
     "t": "a job vacancy",
     "zh": "職缺"
    },
    {
     "t": "fill a vacancy",
     "zh": "補缺"
    },
    {
     "t": "No Vacancy",
     "zh": "(旅館)客滿"
    }
   ],
   "ex": [
    {
     "en": "The company has two vacancies for sales assistants.",
     "zh": "這家公司有兩個業務助理的職缺。"
    }
   ],
   "note": "指「位子目前沒人」。teaching vacancy＝教職缺額。",
   "rel": {
    "syn": [
     {
      "w": "opening",
      "zh": "(職務的)空缺"
     }
    ],
    "ant": [],
    "confusable": [
     {
      "w": "position",
      "note": "position 是「職位」本身;vacancy 強調這個職位「現在沒人、需要補人」。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "vacant-adj": {
   "id": "vacant-adj",
   "hw": "vacant",
   "key": "adj",
   "pos": "adj.",
   "zh": "空著的;無人的;(職位)空缺的",
   "forms": [
    "vacant"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "vacancy",
   "coll": [
    {
     "t": "a vacant seat",
     "zh": "空位"
    },
    {
     "t": "a vacant position",
     "zh": "空缺的職位"
    }
   ],
   "ex": [
    {
     "en": "Is this seat vacant?",
     "zh": "這個位子是空的嗎?"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "vacate-v": {
   "id": "vacate-v",
   "hw": "vacate",
   "key": "v",
   "pos": "v.",
   "zh": "搬離;空出;辭去(職位)",
   "forms": [
    "vacate",
    "vacates",
    "vacated",
    "vacating"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "vacancy",
   "coll": [
    {
     "t": "vacate a room",
     "zh": "退房"
    }
   ],
   "ex": [
    {
     "en": "Guests must vacate their rooms by noon.",
     "zh": "房客必須在中午前退房。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "initially-adv": {
   "id": "initially-adv",
   "hw": "initially",
   "key": "adv",
   "pos": "adv.",
   "zh": "起初;最初",
   "forms": [
    "initially"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "initial",
   "coll": [
    {
     "t": "initially planned",
     "zh": "起初計畫的"
    },
    {
     "t": "initially expected",
     "zh": "原先預期的"
    }
   ],
   "ex": [
    {
     "en": "The plan seemed difficult initially, but it became easier over time.",
     "zh": "這個計畫一開始看起來很難,但後來越來越容易。"
    }
   ],
   "note": "than initially expected 是 than (it was) initially expected 的省略。",
   "rel": {
    "syn": [
     {
      "w": "at first",
      "zh": "起初"
     },
     {
      "w": "originally",
      "zh": "原本"
     }
    ],
    "ant": [
     {
      "w": "eventually",
      "zh": "最後"
     },
     {
      "w": "finally",
      "zh": "終於"
     }
    ],
    "confusable": [
     {
      "w": "originally",
      "note": "兩者常可互換;initially 強調過程「一開始的階段」,originally 強調「本來的狀態」(常暗示後來有改變)。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "initial-adj": {
   "id": "initial-adj",
   "hw": "initial",
   "key": "adj",
   "pos": "adj.",
   "zh": "最初的;開始的",
   "forms": [
    "initial"
   ],
   "amb": {
    "initial": "也可作名詞(姓名的第一個字母)"
   },
   "alsoPos": "n. 姓名縮寫字母",
   "family": "initial",
   "coll": [
    {
     "t": "initial stage",
     "zh": "初期"
    },
    {
     "t": "initial reaction",
     "zh": "最初的反應"
    }
   ],
   "ex": [
    {
     "en": "My initial reaction was surprise.",
     "zh": "我最初的反應是驚訝。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "initiate-v": {
   "id": "initiate-v",
   "hw": "initiate",
   "key": "v",
   "pos": "v.",
   "zh": "開始;發起",
   "forms": [
    "initiate",
    "initiates",
    "initiated",
    "initiating"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "initial",
   "coll": [
    {
     "t": "initiate a conversation",
     "zh": "主動開啟對話"
    }
   ],
   "ex": [
    {
     "en": "She initiated a project to clean the beach.",
     "zh": "她發起了一項淨灘計畫。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "consumption-n": {
   "id": "consumption-n",
   "hw": "consumption",
   "key": "n",
   "pos": "n.",
   "zh": "攝取(量);消耗(量);消費",
   "forms": [
    "consumption"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "consume",
   "coll": [
    {
     "t": "water consumption",
     "zh": "用水量"
    },
    {
     "t": "energy consumption",
     "zh": "能源消耗"
    },
    {
     "t": "the consumption of sugar",
     "zh": "糖的攝取"
    }
   ],
   "ex": [
    {
     "en": "Too much sugar consumption can harm your health.",
     "zh": "攝取過多糖分可能傷害健康。"
    }
   ],
   "note": "談健康時,指人「實際吃進去的量」。",
   "rel": {
    "syn": [
     {
      "w": "intake",
      "zh": "攝取量"
     }
    ],
    "ant": [
     {
      "w": "production",
      "zh": "生產"
     }
    ],
    "confusable": [
     {
      "w": "intake",
      "note": "intake 專指吃進身體的量(food intake);consumption 範圍更廣,也能指電力、水、能源的消耗。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "consume-v": {
   "id": "consume-v",
   "hw": "consume",
   "key": "v",
   "pos": "v.",
   "zh": "吃;喝;消耗",
   "forms": [
    "consume",
    "consumes",
    "consumed",
    "consuming"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "consume",
   "coll": [
    {
     "t": "consume energy",
     "zh": "消耗能源"
    }
   ],
   "ex": [
    {
     "en": "This old fridge consumes a lot of electricity.",
     "zh": "這台舊冰箱很耗電。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "consumer-n": {
   "id": "consumer-n",
   "hw": "consumer",
   "key": "n",
   "pos": "n.",
   "zh": "消費者",
   "forms": [
    "consumer",
    "consumers"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "consume",
   "coll": [
    {
     "t": "consumer goods",
     "zh": "消費性商品"
    }
   ],
   "ex": [
    {
     "en": "Consumers are paying more for food this year.",
     "zh": "今年消費者買食物要多花錢。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "dread-v": {
   "id": "dread-v",
   "hw": "dread",
   "key": "v",
   "pos": "v.",
   "zh": "害怕;畏懼(對即將發生的事)",
   "forms": [
    "dread",
    "dreads",
    "dreaded",
    "dreading"
   ],
   "amb": {
    "dread": "也可作名詞(恐懼)",
    "dreads": "也可作名詞複數"
   },
   "alsoPos": "n. 恐懼",
   "family": "dread",
   "coll": [
    {
     "t": "dread the thought of",
     "zh": "一想到…就害怕"
    },
    {
     "t": "dread doing sth.",
     "zh": "害怕做某事"
    }
   ],
   "ex": [
    {
     "en": "Many students dread the thought of taking an oral test.",
     "zh": "很多學生一想到要考口試就害怕。"
    }
   ],
   "note": "dread 後面直接接受詞或動名詞,不接 to V。",
   "rel": {
    "syn": [
     {
      "w": "fear",
      "zh": "害怕"
     }
    ],
    "ant": [],
    "confusable": [
     {
      "w": "fear",
      "note": "fear 可泛指各種害怕;dread 多指「對即將發生的事」強烈恐懼、不想面對,帶有預期的心理。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "dreadful-adj": {
   "id": "dreadful-adj",
   "hw": "dreadful",
   "key": "adj",
   "pos": "adj.",
   "zh": "可怕的;糟透的",
   "forms": [
    "dreadful"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "dread",
   "coll": [],
   "ex": [
    {
     "en": "The weather was dreadful.",
     "zh": "天氣糟透了。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "passion-n": {
   "id": "passion-n",
   "hw": "passion",
   "key": "n",
   "pos": "n.",
   "zh": "熱情;熱愛的事物",
   "forms": [
    "passion",
    "passions"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "passion",
   "coll": [
    {
     "t": "have a passion for",
     "zh": "熱愛…"
    },
    {
     "t": "follow one’s passion",
     "zh": "追隨自己的熱情"
    }
   ],
   "ex": [
    {
     "en": "Cooking is his passion, and he practices every day.",
     "zh": "烹飪是他的熱愛,他每天都練習。"
    }
   ],
   "note": "life’s passion＝畢生熱愛的事。",
   "rel": {
    "syn": [
     {
      "w": "enthusiasm",
      "zh": "熱忱"
     }
    ],
    "ant": [
     {
      "w": "indifference",
      "zh": "冷漠"
     }
    ],
    "confusable": [
     {
      "w": "hobby",
      "note": "hobby 只是休閒嗜好;passion 是強烈到願意投入大量時間與心力的熱愛。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "passionate-adj": {
   "id": "passionate-adj",
   "hw": "passionate",
   "key": "adj",
   "pos": "adj.",
   "zh": "熱情的;熱愛的",
   "forms": [
    "passionate"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "passion",
   "coll": [
    {
     "t": "be passionate about",
     "zh": "對…很熱衷"
    }
   ],
   "ex": [
    {
     "en": "She is passionate about protecting the ocean.",
     "zh": "她熱衷於保護海洋。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "passionately-adv": {
   "id": "passionately-adv",
   "hw": "passionately",
   "key": "adv",
   "pos": "adv.",
   "zh": "熱烈地;熱切地",
   "forms": [
    "passionately"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "passion",
   "coll": [],
   "ex": [
    {
     "en": "He spoke passionately about his dream.",
     "zh": "他熱切地談起他的夢想。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "assault-v": {
   "id": "assault-v",
   "hw": "assault",
   "key": "v",
   "pos": "v.",
   "zh": "攻擊;襲擊",
   "forms": [
    "assault",
    "assaults",
    "assaulted",
    "assaulting"
   ],
   "amb": {
    "assault": "也可作名詞(攻擊、襲擊罪)",
    "assaults": "也可作名詞複數"
   },
   "alsoPos": "n. 攻擊",
   "family": "assault",
   "coll": [
    {
     "t": "assault sb. with sth.",
     "zh": "用…攻擊某人"
    },
    {
     "t": "be assaulted",
     "zh": "遭到攻擊"
    }
   ],
   "ex": [
    {
     "en": "The man was arrested for assaulting a police officer.",
     "zh": "那名男子因攻擊警察而被逮捕。"
    }
   ],
   "note": "assault sb. with sth.:用…攻擊某人。",
   "rel": {
    "syn": [
     {
      "w": "attack",
      "zh": "攻擊"
     }
    ],
    "ant": [],
    "confusable": [
     {
      "w": "attack",
      "note": "attack 是最常用的「攻擊」,可用於人、動物、批評與疾病;assault 多指對人身的暴力攻擊,常見於新聞或法律用語。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "elbow-v": {
   "id": "elbow-v",
   "hw": "elbow",
   "key": "v",
   "pos": "v.",
   "zh": "用手肘推擠;擠",
   "forms": [
    "elbow",
    "elbows",
    "elbowed",
    "elbowing"
   ],
   "amb": {
    "elbow": "也可作名詞(手肘)",
    "elbows": "也可作名詞複數"
   },
   "alsoPos": "n. 手肘",
   "family": "elbow",
   "coll": [
    {
     "t": "elbow one’s way through the crowd",
     "zh": "擠過人群"
    },
    {
     "t": "elbow sb. aside",
     "zh": "用手肘把某人撥到一旁"
    }
   ],
   "ex": [
    {
     "en": "He elbowed his way to the front of the line.",
     "zh": "他用手肘擠到隊伍最前面。"
    }
   ],
   "note": "「動詞 + one’s way + 介系詞」表示以某種方式前進。",
   "rel": {
    "syn": [
     {
      "w": "push",
      "zh": "推擠"
     },
     {
      "w": "shove",
      "zh": "推擠"
     }
    ],
    "ant": [],
    "confusable": [
     {
      "w": "push",
      "note": "push 是一般的「推」;elbow 特別指「用手肘頂開、擠開」前進。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "grave-adj": {
   "id": "grave-adj",
   "hw": "grave",
   "key": "adj",
   "pos": "adj.",
   "zh": "嚴重的;嚴肅的",
   "forms": [
    "grave",
    "graver",
    "gravest"
   ],
   "amb": {
    "grave": "也可作名詞(墳墓),字義不同"
   },
   "alsoPos": "n. 墳墓",
   "family": "grave",
   "coll": [
    {
     "t": "grave concern",
     "zh": "深切的憂慮"
    },
    {
     "t": "grave danger",
     "zh": "嚴重的危險"
    },
    {
     "t": "a grave mistake",
     "zh": "嚴重的錯誤"
    }
   ],
   "ex": [
    {
     "en": "The doctor said the patient was in grave danger.",
     "zh": "醫生說病人處於嚴重的危險中。"
    }
   ],
   "note": "grave 較正式,常搭配 concern、danger、mistake。",
   "rel": {
    "syn": [
     {
      "w": "serious",
      "zh": "嚴重的"
     },
     {
      "w": "severe",
      "zh": "嚴重的"
     }
    ],
    "ant": [
     {
      "w": "minor",
      "zh": "輕微的"
     },
     {
      "w": "trivial",
      "zh": "瑣碎的"
     }
    ],
    "confusable": [
     {
      "w": "serious / severe",
      "note": "serious 最常用;severe 常用於疾病、天氣、處罰的「嚴重程度」;grave 較正式,常搭配 concern、danger、mistake。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "gravely-adv": {
   "id": "gravely-adv",
   "hw": "gravely",
   "key": "adv",
   "pos": "adv.",
   "zh": "嚴重地;嚴肅地",
   "forms": [
    "gravely"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "grave",
   "coll": [],
   "ex": [
    {
     "en": "She nodded gravely.",
     "zh": "她嚴肅地點了點頭。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "gravity-n": {
   "id": "gravity-n",
   "hw": "gravity",
   "key": "n",
   "pos": "n.",
   "zh": "嚴重性;重力",
   "forms": [
    "gravity"
   ],
   "amb": {
    "gravity": "有「嚴重性」與「重力」兩種字義"
   },
   "alsoPos": "n. 重力(不同字義)",
   "family": "grave",
   "coll": [
    {
     "t": "the gravity of the situation",
     "zh": "情況的嚴重性"
    }
   ],
   "ex": [
    {
     "en": "He did not understand the gravity of the problem.",
     "zh": "他不了解這個問題的嚴重性。"
    }
   ],
   "note": "另一個常見意思是物理的「重力」。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "communicate-v": {
   "id": "communicate-v",
   "hw": "communicate",
   "key": "v",
   "pos": "v.",
   "zh": "溝通;傳達",
   "forms": [
    "communicate",
    "communicates",
    "communicated",
    "communicating"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "communicate",
   "coll": [
    {
     "t": "communicate with someone",
     "zh": "與某人溝通"
    },
    {
     "t": "communicate ideas",
     "zh": "傳達想法"
    },
    {
     "t": "communicate in English",
     "zh": "用英語溝通"
    }
   ],
   "ex": [
    {
     "en": "Good friends communicate honestly with each other.",
     "zh": "好朋友之間會誠實溝通。"
    },
    {
     "en": "Dolphins communicate by making different sounds.",
     "zh": "海豚用不同的聲音來溝通。"
    }
   ],
   "note": "communicate 是不及物動詞時用 communicate with sb.;也可及物,表示「傳達」想法、訊息。",
   "rel": {
    "syn": [
     {
      "w": "express",
      "zh": "表達(想法、感受)"
     },
     {
      "w": "convey",
      "zh": "傳達(訊息、感受)"
     },
     {
      "w": "interact",
      "zh": "互動"
     }
    ],
    "ant": [],
    "confusable": [
     {
      "w": "interact",
      "note": "interact 強調「彼此互動、互相影響」;communicate 強調「把訊息或想法傳給對方」。"
     }
    ]
   },
   "full": true,
   "status": "draft"
  },
  "communication-n": {
   "id": "communication-n",
   "hw": "communication",
   "key": "n",
   "pos": "n.",
   "zh": "溝通;通訊",
   "forms": [
    "communication",
    "communications"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "communicate",
   "coll": [
    {
     "t": "effective communication",
     "zh": "有效溝通"
    },
    {
     "t": "communication skills",
     "zh": "溝通技巧"
    },
    {
     "t": "means of communication",
     "zh": "溝通工具"
    }
   ],
   "ex": [
    {
     "en": "Clear communication helps a team work well.",
     "zh": "清楚的溝通能讓團隊運作順暢。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "communicative-adj": {
   "id": "communicative-adj",
   "hw": "communicative",
   "key": "adj",
   "pos": "adj.",
   "zh": "善於溝通的;愛說話的",
   "forms": [
    "communicative"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "communicate",
   "coll": [
    {
     "t": "a communicative person",
     "zh": "善於表達的人"
    }
   ],
   "ex": [
    {
     "en": "She is a communicative and friendly teacher.",
     "zh": "她是一位善於溝通又親切的老師。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "communicator-n": {
   "id": "communicator-n",
   "hw": "communicator",
   "key": "n",
   "pos": "n.",
   "zh": "溝通者;傳達者",
   "forms": [
    "communicator",
    "communicators"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "communicate",
   "coll": [
    {
     "t": "a good communicator",
     "zh": "善於溝通的人"
    }
   ],
   "ex": [
    {
     "en": "A good leader is also a good communicator.",
     "zh": "好的領導者也是善於溝通的人。"
    }
   ],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "hasty-adj": {
   "id": "hasty-adj",
   "hw": "hasty",
   "key": "adj",
   "pos": "adj.",
   "zh": "倉促的;草率的",
   "forms": [
    "hasty",
    "hastier",
    "hastiest"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "hasty",
   "coll": [
    {
     "t": "a hasty decision",
     "zh": "倉促的決定"
    }
   ],
   "ex": [],
   "note": "形容「決定、行動」做得太快、欠考慮。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "diligent-adj": {
   "id": "diligent-adj",
   "hw": "diligent",
   "key": "adj",
   "pos": "adj.",
   "zh": "勤勉的;用功的",
   "forms": [
    "diligent"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "diligent",
   "coll": [
    {
     "t": "a diligent student",
     "zh": "勤奮的學生"
    }
   ],
   "ex": [],
   "note": "形容「人」的工作或學習態度。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "routine-adj": {
   "id": "routine-adj",
   "hw": "routine",
   "key": "adj",
   "pos": "adj.",
   "zh": "例行的;日常的",
   "forms": [
    "routine"
   ],
   "amb": {
    "routine": "也可作名詞(例行公事)"
   },
   "alsoPos": "n. 例行公事",
   "family": "routine",
   "coll": [
    {
     "t": "a routine check",
     "zh": "例行檢查"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "official-adj": {
   "id": "official-adj",
   "hw": "official",
   "key": "adj",
   "pos": "adj.",
   "zh": "官方的;正式的",
   "forms": [
    "official"
   ],
   "amb": {
    "official": "也可作名詞(官員)"
   },
   "alsoPos": "n. 官員",
   "family": "official",
   "coll": [
    {
     "t": "official language",
     "zh": "官方語言"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "instant-adj": {
   "id": "instant-adj",
   "hw": "instant",
   "key": "adj",
   "pos": "adj.",
   "zh": "立即的;即溶的",
   "forms": [
    "instant"
   ],
   "amb": {
    "instant": "也可作名詞(片刻)"
   },
   "alsoPos": "n. 片刻",
   "family": "instant",
   "coll": [
    {
     "t": "instant noodles",
     "zh": "泡麵"
    },
    {
     "t": "instant coffee",
     "zh": "即溶咖啡"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "elementary-adj": {
   "id": "elementary-adj",
   "hw": "elementary",
   "key": "adj",
   "pos": "adj.",
   "zh": "初級的;基本的",
   "forms": [
    "elementary"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "elementary",
   "coll": [
    {
     "t": "elementary school",
     "zh": "小學"
    }
   ],
   "ex": [],
   "note": "用在程度或教育階段。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "career-n": {
   "id": "career-n",
   "hw": "career",
   "key": "n",
   "pos": "n.",
   "zh": "職業生涯;事業",
   "forms": [
    "career",
    "careers"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "career",
   "coll": [
    {
     "t": "a career in medicine",
     "zh": "醫學方面的職業生涯"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "expectation-n": {
   "id": "expectation-n",
   "hw": "expectation",
   "key": "n",
   "pos": "n.",
   "zh": "期待;預期",
   "forms": [
    "expectation",
    "expectations"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "expectation",
   "coll": [
    {
     "t": "meet expectations",
     "zh": "達到期望"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "inspiration-n": {
   "id": "inspiration-n",
   "hw": "inspiration",
   "key": "n",
   "pos": "n.",
   "zh": "靈感;啟發",
   "forms": [
    "inspiration",
    "inspirations"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "inspiration",
   "coll": [
    {
     "t": "a source of inspiration",
     "zh": "靈感來源"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "genuinely-adv": {
   "id": "genuinely-adv",
   "hw": "genuinely",
   "key": "adv",
   "pos": "adv.",
   "zh": "真誠地;確實地",
   "forms": [
    "genuinely"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "genuinely",
   "coll": [
    {
     "t": "genuinely interested",
     "zh": "真心感興趣"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "alternatively-adv": {
   "id": "alternatively-adv",
   "hw": "alternatively",
   "key": "adv",
   "pos": "adv.",
   "zh": "或者;另一個選擇是",
   "forms": [
    "alternatively"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "alternatively",
   "coll": [],
   "ex": [],
   "note": "常放句首,引出另一個選項。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "fundamentally-adv": {
   "id": "fundamentally-adv",
   "hw": "fundamentally",
   "key": "adv",
   "pos": "adv.",
   "zh": "根本上;基本上",
   "forms": [
    "fundamentally"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "fundamentally",
   "coll": [
    {
     "t": "fundamentally different",
     "zh": "根本上不同"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "dimension-n": {
   "id": "dimension-n",
   "hw": "dimension",
   "key": "n",
   "pos": "n.",
   "zh": "層面;面向;尺寸",
   "forms": [
    "dimension",
    "dimensions"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "dimension",
   "coll": [
    {
     "t": "a new dimension",
     "zh": "新的層面"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "integration-n": {
   "id": "integration-n",
   "hw": "integration",
   "key": "n",
   "pos": "n.",
   "zh": "整合;融合",
   "forms": [
    "integration"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "integration",
   "coll": [
    {
     "t": "social integration",
     "zh": "社會融合"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "provision-n": {
   "id": "provision-n",
   "hw": "provision",
   "key": "n",
   "pos": "n.",
   "zh": "供應;提供;規定",
   "forms": [
    "provision",
    "provisions"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "provision",
   "coll": [
    {
     "t": "the provision of food",
     "zh": "食物的供應"
    }
   ],
   "ex": [],
   "note": "指提供的一方;與「吃進去的量」不同。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "stress-v": {
   "id": "stress-v",
   "hw": "stress",
   "key": "v",
   "pos": "v.",
   "zh": "強調;(使)有壓力",
   "forms": [
    "stress",
    "stresses",
    "stressed",
    "stressing"
   ],
   "amb": {
    "stress": "也可作名詞(壓力)",
    "stresses": "也可作名詞複數"
   },
   "alsoPos": "n. 壓力",
   "family": "stress",
   "coll": [
    {
     "t": "stress the importance of",
     "zh": "強調…的重要性"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "wander-v": {
   "id": "wander-v",
   "hw": "wander",
   "key": "v",
   "pos": "v.",
   "zh": "漫步;閒逛;(思緒)飄移",
   "forms": [
    "wander",
    "wanders",
    "wandered",
    "wandering"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "wander",
   "coll": [
    {
     "t": "wander around the city",
     "zh": "在城市裡閒逛"
    }
   ],
   "ex": [],
   "note": "不及物動詞,後面不能直接接受詞。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "escape-v": {
   "id": "escape-v",
   "hw": "escape",
   "key": "v",
   "pos": "v.",
   "zh": "逃脫;逃離",
   "forms": [
    "escape",
    "escapes",
    "escaped",
    "escaping"
   ],
   "amb": {
    "escape": "也可作名詞(逃脫)",
    "escapes": "也可作名詞複數"
   },
   "alsoPos": "n. 逃脫",
   "family": "escape",
   "coll": [
    {
     "t": "escape from prison",
     "zh": "逃出監獄"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "resource-n": {
   "id": "resource-n",
   "hw": "resource",
   "key": "n",
   "pos": "n.",
   "zh": "資源",
   "forms": [
    "resource",
    "resources"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "resource",
   "coll": [
    {
     "t": "natural resources",
     "zh": "天然資源"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "impact-n": {
   "id": "impact-n",
   "hw": "impact",
   "key": "n",
   "pos": "n.",
   "zh": "衝擊;影響",
   "forms": [
    "impact",
    "impacts"
   ],
   "amb": {
    "impact": "也可作動詞(衝擊)",
    "impacts": "也可作動詞第三人稱單數"
   },
   "alsoPos": "v. 衝擊",
   "family": "impact",
   "coll": [
    {
     "t": "have an impact on",
     "zh": "對…有影響"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "emphasis-n": {
   "id": "emphasis-n",
   "hw": "emphasis",
   "key": "n",
   "pos": "n.",
   "zh": "強調;重點",
   "forms": [
    "emphasis"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "emphasis",
   "coll": [
    {
     "t": "put emphasis on",
     "zh": "重視…"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "shatter-v": {
   "id": "shatter-v",
   "hw": "shatter",
   "key": "v",
   "pos": "v.",
   "zh": "打碎;粉碎",
   "forms": [
    "shatter",
    "shatters",
    "shattered",
    "shattering"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "shatter",
   "coll": [
    {
     "t": "shatter a window",
     "zh": "打碎窗戶"
    }
   ],
   "ex": [],
   "note": "受詞通常是玻璃、希望、夢想等「物」。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "overturn-v": {
   "id": "overturn-v",
   "hw": "overturn",
   "key": "v",
   "pos": "v.",
   "zh": "翻轉;推翻",
   "forms": [
    "overturn",
    "overturns",
    "overturned",
    "overturning"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "overturn",
   "coll": [
    {
     "t": "overturn a decision",
     "zh": "推翻決定"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "condemn-v": {
   "id": "condemn-v",
   "hw": "condemn",
   "key": "v",
   "pos": "v.",
   "zh": "譴責;宣判",
   "forms": [
    "condemn",
    "condemns",
    "condemned",
    "condemning"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "condemn",
   "coll": [
    {
     "t": "condemn violence",
     "zh": "譴責暴力"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "crash-v": {
   "id": "crash-v",
   "hw": "crash",
   "key": "v",
   "pos": "v.",
   "zh": "撞毀;猛撞;(電腦)當機",
   "forms": [
    "crash",
    "crashes",
    "crashed",
    "crashing"
   ],
   "amb": {
    "crash": "也可作名詞(撞擊、當機)",
    "crashes": "也可作名詞複數"
   },
   "alsoPos": "n. 撞擊",
   "family": "crash",
   "coll": [
    {
     "t": "crash into a wall",
     "zh": "撞上牆"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "tumble-v": {
   "id": "tumble-v",
   "hw": "tumble",
   "key": "v",
   "pos": "v.",
   "zh": "跌倒;滾落",
   "forms": [
    "tumble",
    "tumbles",
    "tumbled",
    "tumbling"
   ],
   "amb": {
    "tumble": "也可作名詞(跌倒)",
    "tumbles": "也可作名詞複數"
   },
   "alsoPos": "n. 跌倒",
   "family": "tumble",
   "coll": [
    {
     "t": "tumble down the stairs",
     "zh": "從樓梯滾下去"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "struggle-v": {
   "id": "struggle-v",
   "hw": "struggle",
   "key": "v",
   "pos": "v.",
   "zh": "掙扎;奮鬥",
   "forms": [
    "struggle",
    "struggles",
    "struggled",
    "struggling"
   ],
   "amb": {
    "struggle": "也可作名詞(奮鬥)",
    "struggles": "也可作名詞複數"
   },
   "alsoPos": "n. 奮鬥",
   "family": "struggle",
   "coll": [
    {
     "t": "struggle to do sth.",
     "zh": "努力(艱難地)做某事"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "swift-adj": {
   "id": "swift-adj",
   "hw": "swift",
   "key": "adj",
   "pos": "adj.",
   "zh": "迅速的",
   "forms": [
    "swift",
    "swifter",
    "swiftest"
   ],
   "amb": {
    "swift": "也可作名詞(雨燕,不同的字)"
   },
   "alsoPos": "n. 雨燕(不同的字)",
   "family": "swift",
   "coll": [
    {
     "t": "a swift response",
     "zh": "迅速的回應"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "brutal-adj": {
   "id": "brutal-adj",
   "hw": "brutal",
   "key": "adj",
   "pos": "adj.",
   "zh": "殘暴的;嚴酷的",
   "forms": [
    "brutal"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "brutal",
   "coll": [
    {
     "t": "a brutal attack",
     "zh": "殘暴的攻擊"
    }
   ],
   "ex": [],
   "note": "形容暴行本身。",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  },
  "harsh-adj": {
   "id": "harsh-adj",
   "hw": "harsh",
   "key": "adj",
   "pos": "adj.",
   "zh": "嚴厲的;嚴酷的",
   "forms": [
    "harsh",
    "harsher",
    "harshest"
   ],
   "amb": {},
   "alsoPos": "",
   "family": "harsh",
   "coll": [
    {
     "t": "harsh criticism",
     "zh": "嚴厲的批評"
    },
    {
     "t": "harsh weather",
     "zh": "惡劣的天氣"
    }
   ],
   "ex": [],
   "note": "",
   "rel": {
    "syn": [],
    "ant": [],
    "confusable": []
   },
   "full": false,
   "status": "draft"
  }
 },
 "families": {
  "tight": {
   "root": "tight",
   "members": [
    "tight-adj",
    "tightly-adv",
    "tighten-v",
    "tightness-n"
   ]
  },
  "amateur": {
   "root": "amateur",
   "members": [
    "amateur-adj",
    "amateurish-adj"
   ]
  },
  "vacancy": {
   "root": "vacancy",
   "members": [
    "vacancy-n",
    "vacant-adj",
    "vacate-v"
   ]
  },
  "initial": {
   "root": "initial",
   "members": [
    "initially-adv",
    "initial-adj",
    "initiate-v"
   ]
  },
  "consume": {
   "root": "consume",
   "members": [
    "consumption-n",
    "consume-v",
    "consumer-n"
   ]
  },
  "dread": {
   "root": "dread",
   "members": [
    "dread-v",
    "dreadful-adj"
   ]
  },
  "passion": {
   "root": "passion",
   "members": [
    "passion-n",
    "passionate-adj",
    "passionately-adv"
   ]
  },
  "assault": {
   "root": "assault",
   "members": [
    "assault-v"
   ]
  },
  "elbow": {
   "root": "elbow",
   "members": [
    "elbow-v"
   ]
  },
  "grave": {
   "root": "grave",
   "members": [
    "grave-adj",
    "gravely-adv",
    "gravity-n"
   ]
  },
  "communicate": {
   "root": "communicate",
   "members": [
    "communicate-v",
    "communication-n",
    "communicative-adj",
    "communicator-n"
   ]
  },
  "hasty": {
   "root": "hasty",
   "members": [
    "hasty-adj"
   ]
  },
  "diligent": {
   "root": "diligent",
   "members": [
    "diligent-adj"
   ]
  },
  "routine": {
   "root": "routine",
   "members": [
    "routine-adj"
   ]
  },
  "official": {
   "root": "official",
   "members": [
    "official-adj"
   ]
  },
  "instant": {
   "root": "instant",
   "members": [
    "instant-adj"
   ]
  },
  "elementary": {
   "root": "elementary",
   "members": [
    "elementary-adj"
   ]
  },
  "career": {
   "root": "career",
   "members": [
    "career-n"
   ]
  },
  "expectation": {
   "root": "expectation",
   "members": [
    "expectation-n"
   ]
  },
  "inspiration": {
   "root": "inspiration",
   "members": [
    "inspiration-n"
   ]
  },
  "genuinely": {
   "root": "genuinely",
   "members": [
    "genuinely-adv"
   ]
  },
  "alternatively": {
   "root": "alternatively",
   "members": [
    "alternatively-adv"
   ]
  },
  "fundamentally": {
   "root": "fundamentally",
   "members": [
    "fundamentally-adv"
   ]
  },
  "dimension": {
   "root": "dimension",
   "members": [
    "dimension-n"
   ]
  },
  "integration": {
   "root": "integration",
   "members": [
    "integration-n"
   ]
  },
  "provision": {
   "root": "provision",
   "members": [
    "provision-n"
   ]
  },
  "stress": {
   "root": "stress",
   "members": [
    "stress-v"
   ]
  },
  "wander": {
   "root": "wander",
   "members": [
    "wander-v"
   ]
  },
  "escape": {
   "root": "escape",
   "members": [
    "escape-v"
   ]
  },
  "resource": {
   "root": "resource",
   "members": [
    "resource-n"
   ]
  },
  "impact": {
   "root": "impact",
   "members": [
    "impact-n"
   ]
  },
  "emphasis": {
   "root": "emphasis",
   "members": [
    "emphasis-n"
   ]
  },
  "shatter": {
   "root": "shatter",
   "members": [
    "shatter-v"
   ]
  },
  "overturn": {
   "root": "overturn",
   "members": [
    "overturn-v"
   ]
  },
  "condemn": {
   "root": "condemn",
   "members": [
    "condemn-v"
   ]
  },
  "crash": {
   "root": "crash",
   "members": [
    "crash-v"
   ]
  },
  "tumble": {
   "root": "tumble",
   "members": [
    "tumble-v"
   ]
  },
  "struggle": {
   "root": "struggle",
   "members": [
    "struggle-v"
   ]
  },
  "swift": {
   "root": "swift",
   "members": [
    "swift-adj"
   ]
  },
  "brutal": {
   "root": "brutal",
   "members": [
    "brutal-adj"
   ]
  },
  "harsh": {
   "root": "harsh",
   "members": [
    "harsh-adj"
   ]
  }
 },
 "phrases": {
  "arrange-an-interview": {
   "t": "arrange an interview",
   "zh": "安排訪談(面談)"
  },
  "such-a-that": {
   "t": "such a tight schedule that",
   "zh": "如此緊湊的行程,以致於…"
  },
  "of-her-own": {
   "t": "a studio of her own",
   "zh": "她自己的工作室"
  },
  "a-dozen": {
   "t": "more than a dozen",
   "zh": "十幾個以上"
  },
  "well-qualified": {
   "t": "well-qualified applicants",
   "zh": "資格優良的應徵者"
  },
  "public-appearance": {
   "t": "make a public appearance",
   "zh": "公開露面"
  },
  "devote-oneself": {
   "t": "devote oneself to",
   "zh": "全心投入…"
  },
  "drunk-driver": {
   "t": "a drunk driver",
   "zh": "酒駕者"
  },
  "board-the-bus": {
   "t": "board the bus",
   "zh": "上公車"
  },
  "raise-concerns": {
   "t": "raise concerns about",
   "zh": "引發對…的憂慮"
  }
 }
};
