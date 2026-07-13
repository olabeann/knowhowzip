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
        requirement:{type:'none',label:'처음 참여 가능',message:'사전 수강 이력 없이 신청할 수 있습니다.'},
        grad:'linear-gradient(135deg,#AFD6E7,#7DB8D4)',deep:'#1c3a4a',tags:['입문','입찰 실습','직장인 추천'],
        lead:'경매가 처음인 직장인을 위한 입문 과정. 한 달이면 혼자 입찰표를 쓸 수 있습니다.',
        intro:'복잡한 경매 절차를 직장인 눈높이로 풀었습니다. 4주 차에는 실제 물건으로 모의 입찰까지 마칩니다.',
        cohort:{no:3,status:'모집중',period:'2026.07.05 ~ 08.02',deadline:'2026.06.30',seats:30,enrolled:21},
        content:{videos:['경매 절차와 권리의 이해','물건 검색과 시세 분석','입찰표 작성 실습','모의 입찰 & 라이브 Q&A'],files:['주차별 강의 노트(PDF)','입찰표 작성 템플릿','물건 분석 체크리스트']},
        operation:{guide:'매주 화요일 저녁 8시 줌 라이브로 진행됩니다. 입장 링크는 시작 30분 전 단톡방에 안내됩니다.'},
        faq:[{q:'기초 지식이 없어도 되나요?',a:'네, 입문자 기준으로 설계되어 있어 누구나 따라올 수 있습니다.'},{q:'라이브에 못 들어가면요?',a:'다시보기가 단톡방에 6개월간 제공됩니다.'}]}),
     P({id:'mmoh-right',title:'권리분석 실전반 · 위험물건 거르기',tag:'심화',rate:4.8,reviews:178,price:390000,orig:450000,
        requirement:{type:'purchased',productId:'mmoh-basic',label:'경매 낙찰 기초반 수강 이력 필요',message:'기초 과정을 수강한 뒤 신청할 수 있습니다.'},
        grad:'linear-gradient(135deg,#F3C7C2,#D9332A)',deep:'#7a1812',tags:['심화','권리분석','사례 스터디'],
        lead:'등기부와 매각물건명세서를 직접 읽고 위험 물건을 걸러내는 눈을 기릅니다.',
        intro:'낙찰의 성패는 권리분석에서 갈립니다. 인수·소멸 권리를 정확히 구분하는 훈련을 합니다.',
        cohort:{no:2,status:'모집중',period:'2026.07.12 ~ 08.09',deadline:'2026.07.07',seats:25,enrolled:18},
        content:{videos:['등기부등본 정밀 분석','말소기준권리와 인수/소멸','대항력·우선변제 임차인','위험 물건 사례 스터디'],files:['권리분석 워크북(PDF)','사례 50선 자료집']}}),
     P({id:'mmoh-field',title:'현장 임장 마스터 · 발품 전략',tag:'현장',rate:4.9,reviews:96,price:450000,orig:520000,
        requirement:{type:'purchased',productId:'mmoh-right',label:'권리분석 실전반 수강 이력 필요',message:'권리분석 과정을 수강한 뒤 신청할 수 있습니다.'},
        grad:'linear-gradient(135deg,#CFE3D2,#5B9E72)',deep:'#1f4530',tags:['현장','임장','명도 협상'],
        lead:'임장 동선 설계부터 명도 협상까지, 발로 뛰는 노하우를 담았습니다.',
        intro:'좋은 물건은 현장에서 확인됩니다. 온라인 라이브 3회 + 오프라인 현장 동행 1회로 구성됩니다.',
        cohort:{no:1,status:'모집중',period:'2026.07.19 ~ 08.16',deadline:'2026.07.14',seats:20,enrolled:9},
        content:{videos:['임장 준비와 동선 설계','현장 체크포인트','명도 시나리오 작성','협상 롤플레잉 + 현장 동행'],files:['임장 체크리스트(PDF)','명도 합의서 양식']}}),
   ]},
];

/* indexes */
const productMap={},creatorOf={};
creators.forEach(c=>c.products.forEach(p=>{productMap[p.id]=p;creatorOf[p.id]=c;}));
const allProducts=()=>creators.flatMap(c=>c.products.map(p=>({p,c})));
const cats=['전체',...new Set(creators.map(c=>c.cat))];
