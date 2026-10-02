// 題庫。每題格式：
// { id:'唯一代號', year:113, subject:'數學', topic:'單元(可省略)',
//   question:'題幹', options:['A','B','C','D'], answer:0(正確選項的索引,A=0), explain:'解析(可省略)' }
// 題幹或選項含圖片/HTML 時加上 html:true，例如 question:'<img src="img/113-m-05.png">'。
// 以下 sample:true 為示範用原創題，請替換成官方公開的歷屆試題。
window.QUESTIONS=[
{id:'s-math-1',sample:true,year:113,subject:'數學',topic:'一元二次方程式',question:'若 x² − 5x + 6 = 0，則 x 的值為何？',options:['2 或 3','−2 或 −3','1 或 6','−1 或 −6'],answer:0,explain:'因式分解：(x−2)(x−3)=0，所以 x=2 或 3。'},
{id:'s-math-2',sample:true,year:113,subject:'數學',topic:'比例',question:'甲、乙兩數的比為 3：5，且兩數和為 64，則乙數為何？',options:['24','32','40','48'],answer:2,explain:'乙 = 64 × 5/(3+5) = 40。'},
{id:'s-math-3',sample:true,year:112,subject:'數學',topic:'畢氏定理',question:'直角三角形兩股長為 6 與 8，斜邊長為何？',options:['9','10','12','14'],answer:1,explain:'√(6²+8²)=√100=10。'},
{id:'s-sci-1',sample:true,year:113,subject:'自然',topic:'力學',question:'一物體質量 2 公斤，受 10 牛頓的合力，加速度為多少 m/s²？',options:['2','5','10','20'],answer:1,explain:'F=ma，a=10÷2=5 m/s²。'},
{id:'s-sci-2',sample:true,year:112,subject:'自然',topic:'化學',question:'下列何者為化合物？',options:['氧氣 (O₂)','鐵 (Fe)','水 (H₂O)','氮氣 (N₂)'],answer:2,explain:'化合物由兩種以上元素組成，水由氫、氧組成。'},
{id:'s-chi-1',sample:true,year:113,subject:'國文',topic:'成語',question:'「他做事一絲不苟」中，「一絲不苟」的意思最接近下列何者？',options:['做事馬虎','非常認真細心','進度緩慢','不求回報'],answer:1,explain:'「一絲不苟」形容做事認真細緻，連細微處也不馬虎。'},
{id:'s-eng-1',sample:true,year:112,subject:'英語',topic:'文法',question:'She ______ to school every day.',options:['go','goes','going','gone'],answer:1,explain:'主詞為第三人稱單數，現在簡單式動詞加 -es：goes。'},
{id:'s-soc-1',sample:true,year:112,subject:'社會',topic:'地理',question:'臺灣最高的山峰為下列何者？',options:['雪山','玉山','阿里山','合歡山'],answer:1,explain:'玉山海拔約 3,952 公尺，為臺灣第一高峰。'}
];
