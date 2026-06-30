"use strict";

/* ========== DATA: creators → products ========== */
function P(o){ // product factory with defaults
  return Object.assign({tag:'',rate:4.8,reviews:120,orig:o.price,tags:['클래스'],
    cohort:{no:1,status:'모집중',period:'2026.07 ~ 08',deadline:'2026.07.01',seats:30,enrolled:12},
    content:{videos:['1주차 · 오리엔테이션','2주차 · 핵심 개념','3주차 · 실습','4주차 · 마무리 Q&A'],files:['강의 노트(PDF)','실습 템플릿']},
    operation:{guide:'매주 온라인 라이브로 진행되며 다시보기가 제공됩니다.'},
    faq:[{q:'사전 지식이 필요한가요?',a:'기초부터 다루므로 누구나 수강할 수 있습니다.'}]},o);
}
const creators=[
  {id:'mmoh',name:'애매모홈',handle:'@mmoh',cat:'부동산·경매',verified:true,logoType:'house',
   theme:'#AFD6E7',themeDeep:'#1c3a4a',cover:'linear-gradient(120deg,#AFD6E7,#7DB8D4)',
   tagline:'월급쟁이도 한 달 만에 낙찰받는 경매 낙찰 강좌',
   about:'경매 입문부터 권리분석, 현장 임장, 명도, 세금까지. 직장인 눈높이에 맞춰 실전에서 바로 쓰는 낙찰 노하우를 전합니다. 강사 이원일.',
   followers:'12.4K',
   faq:[{q:'애매모홈 클래스는 어떻게 진행되나요?',a:'대부분 4주 과정 온라인 라이브로 진행되며, 단톡방과 줌으로 운영됩니다.'}],
   products:[
     P({id:'mmoh-basic',title:'경매 낙찰 기초반 · 4주 완성',tag:'BEST',rate:4.9,reviews:312,price:290000,orig:390000,
        grad:'linear-gradient(135deg,#AFD6E7,#7DB8D4)',deep:'#1c3a4a',tags:['입문','입찰 실습','직장인 추천'],
        lead:'경매가 처음인 직장인을 위한 입문 과정. 한 달이면 혼자 입찰표를 쓸 수 있습니다.',
        intro:'복잡한 경매 절차를 직장인 눈높이로 풀었습니다. 4주 차에는 실제 물건으로 모의 입찰까지 마칩니다.',
        cohort:{no:3,status:'모집중',period:'2026.07.05 ~ 08.02',deadline:'2026.06.30',seats:30,enrolled:21},
        content:{videos:['경매 절차와 권리의 이해','물건 검색과 시세 분석','입찰표 작성 실습','모의 입찰 & 라이브 Q&A'],files:['주차별 강의 노트(PDF)','입찰표 작성 템플릿','물건 분석 체크리스트']},
        operation:{guide:'매주 화요일 저녁 8시 줌 라이브로 진행됩니다. 입장 링크는 시작 30분 전 단톡방에 안내됩니다.'},
        faq:[{q:'기초 지식이 없어도 되나요?',a:'네, 입문자 기준으로 설계되어 있어 누구나 따라올 수 있습니다.'},{q:'라이브에 못 들어가면요?',a:'다시보기가 단톡방에 6개월간 제공됩니다.'}]}),
     P({id:'mmoh-right',title:'권리분석 실전반 · 위험물건 거르기',tag:'심화',rate:4.8,reviews:178,price:390000,orig:450000,
        grad:'linear-gradient(135deg,#F3C7C2,#D9332A)',deep:'#7a1812',tags:['심화','권리분석','사례 스터디'],
        lead:'등기부와 매각물건명세서를 직접 읽고 위험 물건을 걸러내는 눈을 기릅니다.',
        intro:'낙찰의 성패는 권리분석에서 갈립니다. 인수·소멸 권리를 정확히 구분하는 훈련을 합니다.',
        cohort:{no:2,status:'모집중',period:'2026.07.12 ~ 08.09',deadline:'2026.07.07',seats:25,enrolled:18},
        content:{videos:['등기부등본 정밀 분석','말소기준권리와 인수/소멸','대항력·우선변제 임차인','위험 물건 사례 스터디'],files:['권리분석 워크북(PDF)','사례 50선 자료집']}}),
     P({id:'mmoh-field',title:'현장 임장 마스터 · 발품 전략',tag:'현장',rate:4.9,reviews:96,price:450000,orig:520000,
        grad:'linear-gradient(135deg,#CFE3D2,#5B9E72)',deep:'#1f4530',tags:['현장','임장','명도 협상'],
        lead:'임장 동선 설계부터 명도 협상까지, 발로 뛰는 노하우를 담았습니다.',
        intro:'좋은 물건은 현장에서 확인됩니다. 온라인 라이브 3회 + 오프라인 현장 동행 1회로 구성됩니다.',
        cohort:{no:1,status:'모집중',period:'2026.07.19 ~ 08.16',deadline:'2026.07.14',seats:20,enrolled:9},
        content:{videos:['임장 준비와 동선 설계','현장 체크포인트','명도 시나리오 작성','협상 롤플레잉 + 현장 동행'],files:['임장 체크리스트(PDF)','명도 합의서 양식']}}),
   ]},

  {id:'moneylog',name:'머니로그',handle:'@moneylog',cat:'재테크·주식',verified:true,logoType:'mono',monogram:'ML',
   theme:'#FFD9A8',themeDeep:'#7a4d12',cover:'linear-gradient(120deg,#FFE3BE,#F6C580)',
   tagline:'30대 직장인의 현실 자산 불리기',
   about:'월급만으로 막막한 직장인을 위한 재테크·주식 클래스. 박재무 강사와 함께 현실적인 자산 설계를 배웁니다.',
   followers:'28.1K',faq:[{q:'주식 초보도 되나요?',a:'네, 계좌 개설부터 차근차근 다룹니다.'}],
   products:[
     P({id:'ml-stock',title:'직장인 주식 투자 4주 클래스',tag:'BEST',rate:4.8,reviews:241,price:240000,orig:300000,
        grad:'linear-gradient(135deg,#FFE3BE,#F0B65C)',deep:'#7a4d12',tags:['주식','입문','직장인'],
        lead:'바쁜 직장인을 위한 현실 주식 투자. 종목 분석부터 매매 원칙까지.',
        intro:'시간 없는 직장인도 따라올 수 있는 투자 원칙과 종목 분석법을 다룹니다.',
        cohort:{no:5,status:'모집중',period:'2026.07.08 ~ 08.05',deadline:'2026.07.03',seats:40,enrolled:33}}),
     P({id:'ml-asset',title:'자산 포트폴리오 설계반',tag:'심화',rate:4.7,reviews:88,price:320000,orig:320000,
        grad:'linear-gradient(135deg,#FFEBD2,#E8A84A)',deep:'#7a4d12',tags:['자산배분','심화'],
        lead:'예적금·주식·연금까지, 내 자산을 한 장으로 설계합니다.',
        intro:'생애주기에 맞춘 자산 배분과 리밸런싱 전략을 배웁니다.',
        cohort:{no:2,status:'모집중',period:'2026.07.20 ~ 08.17',deadline:'2026.07.15',seats:30,enrolled:11}}),
   ]},

  {id:'designdive',name:'디자인다이브',handle:'@designdive',cat:'디자인',verified:false,logoType:'mono',monogram:'DD',
   theme:'#CDE8E1',themeDeep:'#1c4a40',cover:'linear-gradient(120deg,#D7F0E9,#9FD4C7)',
   tagline:'비전공자도 포트폴리오까지 완성하는 UX/UI',
   about:'현직 디자이너 김라라와 함께 피그마 기초부터 포트폴리오 완성까지. 실무 중심 디자인 클래스.',
   followers:'9.7K',faq:[{q:'피그마 라이선스가 필요한가요?',a:'무료 플랜으로 충분히 수강할 수 있습니다.'}],
   products:[
     P({id:'dd-figma',title:'피그마로 시작하는 UX/UI 디자인',tag:'NEW',rate:4.9,reviews:64,price:260000,orig:320000,
        grad:'linear-gradient(135deg,#D7F0E9,#7FBEB0)',deep:'#1c4a40',tags:['UX/UI','피그마','입문'],
        lead:'피그마 기초부터 실제 앱 화면 설계까지, 4주 완성.',
        intro:'디자인 비전공자도 4주면 첫 포트폴리오 화면을 완성합니다.',
        cohort:{no:1,status:'모집중',period:'2026.08.02 ~ 08.30',deadline:'2026.07.28',seats:25,enrolled:7}}),
   ]},

  {id:'codeground',name:'코드그라운드',handle:'@codeground',cat:'개발',verified:true,logoType:'mono',monogram:'CG',
   theme:'#D9D5F7',themeDeep:'#332a7a',cover:'linear-gradient(120deg,#E2DEFA,#A99FE8)',
   tagline:'노베이스에서 첫 웹 서비스 배포까지',
   about:'현직 개발자 이도현과 함께 HTML부터 배포까지. 비전공자를 위한 실전 웹 개발 클래스.',
   followers:'15.3K',faq:[{q:'컴퓨터 사양이 중요한가요?',a:'일반 노트북이면 충분합니다.'}],
   products:[
     P({id:'cg-web',title:'비전공자 웹 개발 입문 6주',tag:'BEST',rate:4.8,reviews:152,price:330000,orig:420000,
        grad:'linear-gradient(135deg,#E2DEFA,#9A8DE0)',deep:'#332a7a',tags:['웹개발','입문','6주'],
        lead:'HTML·CSS·JS 기초부터 나만의 웹사이트 배포까지.',
        intro:'코딩이 처음이어도 6주 차에는 직접 만든 웹사이트를 인터넷에 올립니다.',
        cohort:{no:4,status:'모집중',period:'2026.07.06 ~ 08.17',deadline:'2026.07.01',seats:35,enrolled:29},
        content:{videos:['웹의 동작 원리','HTML/CSS 기초','자바스크립트 입문','반응형 레이아웃','간단한 기능 구현','배포 실습'],files:['실습 코드(ZIP)','학습 로드맵(PDF)']}}),
   ]},
];

/* indexes */
const productMap={},creatorOf={};
creators.forEach(c=>c.products.forEach(p=>{productMap[p.id]=p;creatorOf[p.id]=c;}));
const allProducts=()=>creators.flatMap(c=>c.products.map(p=>({p,c})));
const cats=['전체',...new Set(creators.map(c=>c.cat))];
