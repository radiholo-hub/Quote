// 學測英文練習題庫(原創題,仿學測題型與難度,非歷屆試題)
// type: vocab 詞彙 / cloze 綜合測驗 / reading 閱讀測驗 / structure 篇章結構
// 新增題目:在對應陣列加一筆即可。answer 為選項索引(0 起算)。
window.GSAT = {
  types: {
    vocab: { name: "詞彙", desc: "單題選擇,測試單字與片語" },
    cloze: { name: "綜合測驗", desc: "短文克漏字,考文法與詞彙" },
    reading: { name: "閱讀測驗", desc: "文章搭配理解題" },
    structure: { name: "篇章結構", desc: "把句子放回文章適當位置" }
  },
  vocab: [
    { q: "The mayor's speech was so ______ that many people in the audience were moved to tears.", o: ["trivial", "touching", "ambiguous", "reluctant"], a: 1, e: "touching 感人的,符合「令人落淚」。trivial 瑣碎的;ambiguous 含糊的;reluctant 不情願的。" },
    { q: "Because of the heavy rain, the baseball game was ______ until next Sunday.", o: ["postponed", "performed", "preserved", "persuaded"], a: 0, e: "postpone 延期。perform 表演;preserve 保存;persuade 說服。" },
    { q: "Eating too much sugar can ______ your health in the long run.", o: ["benefit", "damage", "reflect", "assist"], a: 1, e: "damage 損害。其餘三者語意為有益、反映、協助,與 in the long run 的負面語氣不合。" },
    { q: "Lisa is very ______ about her appearance, so she spends an hour in front of the mirror every morning.", o: ["conscious", "capable", "curious", "generous"], a: 0, e: "be conscious of / about 在意、意識到。" },
    { q: "The scientist made a ______ discovery that may change the way we treat cancer.", o: ["breakthrough", "background", "boundary", "bargain"], a: 0, e: "breakthrough 重大突破。boundary 邊界;bargain 特價品。" },
    { q: "To ______ the risk of getting sick, you should wash your hands frequently.", o: ["increase", "reduce", "confirm", "ignore"], a: 1, e: "reduce the risk 降低風險,為常見搭配。" },
    { q: "Tom's grandfather is in his eighties, but he is still in good health and quite ______.", o: ["vacant", "vivid", "energetic", "ordinary"], a: 2, e: "energetic 精力充沛的。vacant 空的;vivid 生動的。" },
    { q: "The company decided to ______ a new manager to take charge of the Taipei branch.", o: ["appoint", "approach", "apply", "appreciate"], a: 0, e: "appoint 任命。apply 申請(用 apply for);appreciate 感激。" },
    { q: "It is ______ that students should hand in their homework on time.", o: ["essential", "identical", "occasional", "tropical"], a: 0, e: "It is essential that + S + (should) V 為常見句型。identical 相同的;occasional 偶爾的;tropical 熱帶的。" },
    { q: "Not wanting to ______ his mother, Jack told her that he had already finished his dinner.", o: ["worry", "worth", "wander", "weigh"], a: 0, e: "worry 使擔心。" },
    { q: "The bridge was built in 1960 and has become a ______ of the city.", o: ["landmark", "landscape", "lawsuit", "lecture"], a: 0, e: "landmark 地標。landscape 風景;lawsuit 訴訟。" },
    { q: "Mia's English has ______ greatly since she began reading English news every day.", o: ["improved", "imagined", "imported", "imposed"], a: 0, e: "improve 進步。" },
    { q: "Our teacher ______ us to review the lessons before each exam.", o: ["urges", "orders for", "suggests", "insists"], a: 0, e: "urge sb. to V 敦促某人做某事。suggest 與 insist 不接「受詞 + to V」。" },
    { q: "The little girl was too ______ to speak in front of so many strangers.", o: ["shy", "wise", "rough", "rare"], a: 0, e: "shy 害羞的。" },
    { q: "Because of the typhoon, all flights to Okinawa were ______.", o: ["canceled", "conducted", "contained", "complained"], a: 0, e: "cancel 取消,配合颱風語境。" },
    { q: "After years of hard work, he finally ______ his dream of becoming a doctor.", o: ["realized", "regarded", "recovered", "reserved"], a: 0, e: "realize one's dream 實現夢想。regard 視為;recover 恢復;reserve 預訂。" },
    { q: "The movie is based on a ______ story about two boys who survived a shipwreck.", o: ["true", "tidy", "tight", "tiny"], a: 0, e: "a true story 真實故事。" },
    { q: "Please keep your voice ______ in the library so that others can study in peace.", o: ["low", "loud", "lazy", "lonely"], a: 0, e: "keep one's voice low 壓低音量。" },
    { q: "Hsiao-Ming was ______ to find out that he had won first prize in the speech contest.", o: ["thrilled", "threatened", "thirsty", "thorough"], a: 0, e: "be thrilled to V 欣喜若狂。threatened 受威脅。" },
    { q: "The new policy aims to ______ people to use public transportation instead of driving.", o: ["encourage", "enclose", "endure", "engage"], a: 0, e: "encourage sb. to V 鼓勵某人。" }
  ],
  cloze: [
    {
      title: "Reading Habits",
      text: "Many people believe that reading is a(n) (1) ______ habit, but it takes effort to form. Studies show that people who read for just twenty minutes a day can learn thousands of new words (2) ______ a year. The key is to choose books that you really enjoy. If a book bores you, (3) ______ it down and try another one. Another useful tip is to carry a book with you, (4) ______ you can read whenever you have a few spare minutes. Before long, you will find that reading is no longer a duty but a pleasure that you (5) ______ do without.",
      qs: [
        { o: ["harmful", "valuable", "temporary", "awkward"], a: 1, e: "valuable 有價值的,與後文肯定閱讀的語氣一致。" },
        { o: ["by", "within", "over", "through"], a: 2, e: "over a year 在一年的期間內。" },
        { o: ["put", "set", "take", "run"], a: 0, e: "put down 放下。" },
        { o: ["so", "or", "but", "for"], a: 0, e: "so 表目的/結果:隨身帶書,所以有空就能讀。" },
        { o: ["can hardly", "must", "should", "will soon"], a: 0, e: "can hardly do without 幾乎不能沒有。" }
      ]
    },
    {
      title: "Bubble Tea",
      text: "Bubble tea, which (1) ______ in Taiwan in the 1980s, has become popular all over the world. The drink is usually made with tea, milk, and small balls of tapioca. Although it tastes sweet, it (2) ______ a lot of sugar, so doctors advise people not to drink too much of it. (3) ______, bubble tea shops now offer low-sugar choices to meet customers' needs. Some shops even let customers (4) ______ the amount of ice and sugar. Thanks to such services, bubble tea (5) ______ more and more fans every year.",
      qs: [
        { o: ["originated", "was originated", "has originated", "is originating"], a: 0, e: "originate 為不及物動詞,指過去的起源,用過去式,不用被動。" },
        { o: ["contains", "contacts", "contributes", "constructs"], a: 0, e: "contain 含有。" },
        { o: ["Therefore", "Instead", "However", "Besides"], a: 0, e: "醫生建議少喝(原因),因此店家推出低糖選項(結果),用 Therefore。" },
        { o: ["adjust", "adjective", "adjustment", "adjusting"], a: 0, e: "let + 受詞 + 原形動詞。" },
        { o: ["attracts", "attract", "is attracted", "attracting"], a: 0, e: "bubble tea 為單數主詞,現在式用 attracts。" }
      ]
    }
  ],
  reading: [
    {
      title: "The Quiet Hero of the Sea",
      text: "Sea turtles have lived on Earth for more than 100 million years, but today many of them are in danger. Every year, thousands of turtles die after eating plastic bags, which they mistake for jellyfish. Others are caught in fishing nets. To make matters worse, rising temperatures change the sand on beaches where turtles lay eggs. Warmer sand produces more female turtles, and in some places, almost no male babies are born.\n\nFortunately, people around the world are taking action. Volunteers walk along beaches at night to protect nests. In some countries, fishermen must use special nets that allow turtles to escape. Schools also teach children to reduce plastic use. These efforts are slowly paying off, and in several areas, the number of turtles is rising again.",
      qs: [
        { q: "What is the main idea of the passage?", o: ["Sea turtles are older than most animals.", "Sea turtles face many threats, but people are trying to help.", "Plastic is the only reason turtles are dying.", "Fishermen are the main enemy of sea turtles."], a: 1, e: "全文先談威脅,再談各地的保護行動。其他選項過度概括或只說到一部分。" },
        { q: "Why do turtles eat plastic bags?", o: ["They taste sweet.", "They look like jellyfish.", "They are given by volunteers.", "They float near the nests."], a: 1, e: "文中 which they mistake for jellyfish。" },
        { q: "What does the word 'paying off' in the second paragraph most likely mean?", o: ["becoming expensive", "producing good results", "causing trouble", "being forgotten"], a: 1, e: "pay off 有回報、見成效,呼應後面「數量回升」。" },
        { q: "What can be inferred about warmer beaches?", o: ["They attract more tourists.", "They may lead to fewer male turtles.", "They help eggs hatch faster.", "They are safer for nests."], a: 1, e: "文中指溫度升高使雌龜變多、幾乎沒有雄龜。" }
      ]
    },
    {
      title: "A Letter to the Class",
      text: "Dear classmates,\n\nI am writing to thank you all for your support during the past month. As you know, I broke my leg in the school basketball game and had to stay at home for three weeks. I was worried about falling behind, but you sent me your notes every day, and Amy even visited me twice to explain the math problems. Thanks to you, I passed the midterm exam with a better score than I had expected.\n\nThe doctor says I can return to school next Monday, though I will still need crutches for a while. I would be grateful if someone could help me carry my bag in the first few days. I promise to treat you all to bubble tea when I am able to walk again!\n\nYour friend,\nKevin",
      qs: [
        { q: "Why did Kevin write this letter?", o: ["To ask for a loan", "To express his thanks", "To invite classmates to a game", "To complain about a test"], a: 1, e: "開頭 I am writing to thank you。" },
        { q: "Which is true about Kevin?", o: ["He failed the midterm exam.", "He was injured in a basketball game.", "He has already returned to school.", "He no longer needs crutches."], a: 1, e: "文中提到 broke my leg in the school basketball game;期中考有通過、尚未返校、仍需拐杖。" },
        { q: "What does Kevin ask his classmates to do?", o: ["Send him more notes", "Visit him at home", "Help carry his bag", "Buy him bubble tea"], a: 2, e: "I would be grateful if someone could help me carry my bag。奶茶是他要請客。" }
      ]
    }
  ],
  structure: [
    {
      title: "Learning to Cook",
      text: "Cooking is a life skill that everyone should learn. (1) ______ Once you know the basics, you can prepare healthy meals at a much lower cost than eating out. (2) ______ Start with simple dishes such as scrambled eggs or fried rice, and do not be afraid of making mistakes. (3) ______ Cooking for friends and family can also bring you closer to the people you love. (4) ______ In the end, you may find that the kitchen is one of the happiest places in your home.",
      options: [
        "Of course, it is natural that your first few dishes may not taste great.",
        "It may seem difficult at first, but it is not as hard as you think.",
        "Besides saving money, the time spent cooking is a good way to relax.",
        "With practice, your skills will improve step by step."
      ],
      ans: [1, 2, 0, 3],
      e: ["(1) 先說「看似困難但不難」,下一句 Once you know the basics 才接得上。", "(2) 前句談「花費比外食低」,接 Besides saving money 補充另一個好處。", "(3) 前面說「不要怕犯錯」,接「前幾道菜不好吃很正常」,再接 Cooking for friends。", "(4) 熟能生巧,技巧進步,導向結尾 In the end。"]
    }
  ]
};
