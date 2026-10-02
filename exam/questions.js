// 英語考古題題庫。每題格式：
// { id:'唯一代號', year:113, type:'題型(詞彙/文法/對話/克漏字/閱讀)',
//   passage:'共用文章(閱讀/克漏字用,可省略)', question:'題幹',
//   options:['A','B','C','D'], answer:0(正確選項索引,A=0), explain:'解析(可省略)' }
// sample:true 為示範用原創題，請替換成官方公開的歷屆試題。
window.QUESTIONS=[
{id:'e1',sample:true,year:113,type:'詞彙',question:'The weather is so ______ today that we decided to stay at home.',options:['terrible','delicious','careful','quiet'],answer:0,explain:'terrible（糟糕的）符合「因此決定待在家」的語意。'},
{id:'e2',sample:true,year:113,type:'文法',question:'My brother ______ his homework when I got home.',options:['does','is doing','was doing','has done'],answer:2,explain:'when 子句為過去式，表示當時正在進行，用過去進行式 was doing。'},
{id:'e3',sample:true,year:112,type:'文法',question:'If it ______ tomorrow, we will cancel the picnic.',options:['rains','will rain','rained','is raining'],answer:0,explain:'條件句表示未來時，if 子句用現在式，主句才用 will。'},
{id:'e4',sample:true,year:112,type:'對話',question:'A: How about going to the movies tonight?\nB: ______',options:['Yes, I am.','Sounds great!','It is a movie.','You are welcome.'],answer:1,explain:'回應邀約用 Sounds great! 表示同意。'},
{id:'e5',sample:true,year:113,type:'克漏字',passage:'Tom loves reading. Every weekend, he (1)______ to the library and borrows two books. He says reading helps him learn new things.',question:'(1) 應填入何者？',options:['go','goes','going','went'],answer:1,explain:'Every weekend 表習慣，主詞 he 為第三人稱單數，用 goes。'},
{id:'e6',sample:true,year:112,type:'閱讀',passage:'Mia has a small garden behind her house. She grows tomatoes and carrots there. Every morning, she waters the plants before going to school. Last week, she gave some tomatoes to her neighbor.',question:'What does Mia do every morning?',options:['She picks tomatoes.','She waters the plants.','She visits her neighbor.','She cooks breakfast.'],answer:1,explain:'文中提到 Every morning, she waters the plants.'},
{id:'e7',sample:true,year:112,type:'閱讀',passage:'Mia has a small garden behind her house. She grows tomatoes and carrots there. Every morning, she waters the plants before going to school. Last week, she gave some tomatoes to her neighbor.',question:'Who got some tomatoes from Mia?',options:['Her teacher','Her classmate','Her neighbor','Her mother'],answer:2,explain:'文中提到 she gave some tomatoes to her neighbor.'}
];
