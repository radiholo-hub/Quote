// 原創寫作練習（自行撰寫，可公開）。參考譯文只是「一種可能的寫法」，不是唯一答案。
window.WRITING = {
  trans: [
    { id: 'T1', title: '閱讀習慣', zh: ['閱讀不只是為了考試，而是一輩子的習慣。', '當你遇到不懂的單字時，不妨先根據上下文猜猜看它的意思。'],
      ref: ['Reading is not just for exams but a lifelong habit.', 'When you come across a word you do not know, you may as well guess its meaning from the context first.'],
      focus: ['not just … but …', 'lifelong（複合形容詞）', 'come across 偶然遇到', 'may as well 不妨', 'from the context 根據上下文'] },
    { id: 'T2', title: '科技與課堂', zh: ['隨著科技進步，越來越多學生在課堂上使用平板電腦。', '然而，我們不應該讓科技取代與同學面對面的交流。'],
      ref: ['With the advance of technology, more and more students use tablets in class.', 'However, we should not let technology replace face-to-face communication with our classmates.'],
      focus: ['with + 名詞（隨著…）', 'more and more', 'replace A with B 的用法（這裡 replace 後接被取代的事物）', 'face-to-face', 'let + 受詞 + 原形動詞'] },
    { id: 'T3', title: '書店', zh: ['這家書店自從去年搬到火車站附近後，生意越來越好。', '許多顧客喜歡在那裡一邊喝咖啡，一邊閱讀新書。'],
      ref: ['Since the bookstore moved near the train station last year, its business has been getting better and better.', 'Many customers like to read new books while drinking coffee there.'],
      focus: ['since 子句用過去式 + 主要子句用現在完成（進行）式', 'get better and better', 'while + V-ing（同時）'] },
    { id: 'T4', title: '寫作與進步', zh: ['如果你想改善英文，最有效的方法之一就是每天練習寫作。', '即使只寫幾句話，長期下來也會看到明顯的進步。'],
      ref: ['If you want to improve your English, one of the most effective ways is to practice writing every day.', 'Even if you write only a few sentences, you will see obvious progress in the long run.'],
      focus: ['If 條件句（現在式 + 現在式／未來式）', 'one of the + 最高級 + 複數名詞（動詞用單數）', 'practice + V-ing', 'in the long run 長期來看', 'progress 為不可數名詞'] },
  ],
  essay: [
    { id: 'E1', title: '校園一角', min: 120, paras: 2,
      prompt: '你的學校打算整修一個校園空間（例如圖書館、操場或餐廳）。第一段：說明你最希望整修哪個空間，以及原因。第二段：提出兩項具體的改善建議，並說明這些建議如何讓同學受益。文長至少 120 個單詞。',
      plan: ['第一段：點出空間 + 兩個原因（例如現況的問題 + 對你或同學的影響），用具體例子，不要只說「很不方便」。', '第二段：兩項建議各用一到兩句說明做法與好處，最後一句收尾。'] },
    { id: 'E2', title: '社群媒體與睡眠', min: 120, paras: 2,
      prompt: '許多學生睡前會花很多時間使用手機。第一段：描述你或同學睡前使用手機的情形，以及可能造成的影響。第二段：提出你認為可行的做法，幫助同學改善睡眠習慣。文長至少 120 個單詞。',
      plan: ['第一段：用現在簡單式描述習慣，再用 may / can 說明影響（精神、成績、情緒）。', '第二段：提出兩個做法（例如設定使用時間、睡前把手機放在房間外），說明為什麼可行。'] },
    { id: 'E3', title: '一次難忘的志工經驗', min: 120, paras: 2,
      prompt: '請寫一篇文章，分享一次你或你認識的人參與志工活動的經驗。第一段：描述活動的內容與當時的情況。第二段：說明這次經驗帶來的改變或收穫。文長至少 120 個單詞。',
      plan: ['第一段：過去式敘事，交代時間、地點、做了什麼，加入一個具體的畫面或對話。', '第二段：用現在完成式或過去式說明改變，最後連回自己的想法。'] },
  ],
  // 對照學習用的檢查項目，措辭依各年度大考中心「評分原則」對英文作文評分重點的說明（內容、組織、句構語法、用字、拼字與標點）。
  checklist: [
    ['內容', '有回答題目要求的每一項任務（例如每一段要寫的內容），並提供具體細節'],
    ['組織', '依題目要求分段，句子之間有連接詞或轉折，讀起來順暢'],
    ['句構語法', '時態一致、主詞動詞單複數一致，不只用簡單句（可用 when、because、which 等子句）'],
    ['用字', '用字適切，避免全部重複同一個字'],
    ['拼字與標點', '拼字、大小寫、標點符號都檢查過'],
    ['字數', '至少 120 個單詞'],
  ],
};
