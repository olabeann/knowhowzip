"use strict";
// Share the local administrator's saved classes with the learner prototype.
// Entitlement checks remain in app.js; publishing alone does not grant access.
try {
  const saved=JSON.parse(localStorage.getItem('nhz-content-types-v1')||'null');
  const creator=creators.find(item=>item.id==='mmoh');
  if(creator&&Array.isArray(saved?.contents)&&Array.isArray(saved?.sales)){
    const byId=new Map(saved.contents.map(item=>[item.id,item]));
    creator.lectureContents=[...(creator.lectureContents||[]).filter(item=>!byId.has(item.id)),...saved.contents];
    saved.sales.forEach(sale=>{
      const sources=(sale.contentIds||[]).map(id=>byId.get(id));
      if(!sources.length||sources.some(item=>!item))return;
      const type=sources[0].type==='ebook'?'ebook':'video';
      if(sources.some(item=>(item.type==='ebook'?'ebook':'video')!==type))return;
      const product=P({...sale,title:sale.name,lead:sale.desc,orig:sale.originalPrice||sale.price,type,viewerType:type,bookId:type==='ebook'?sources[0].id:null,bookIds:type==='ebook'?sources.map(book=>book.id):[],isPublic:sale.status==='공개',requirement:{label:sale.requirement||'조건 없음'},content:{videos:[],files:[]},cohort:{period:sale.period,accessMode:sale.accessMode,periodDays:sale.periodDays,accessUnlimited:sale.accessUnlimited,recruitmentAlways:sale.recruitmentAlways,recruitmentStart:sale.recruitmentStart,recruitmentEnd:sale.recruitmentEnd,deadline:sale.recruitmentEnd,status:sale.status==='공개'?'모집중':'비공개'}});
      const index=creator.products.findIndex(item=>item.id===sale.id);
      if(index<0)creator.products.push(product);else creator.products[index]=product;
      productMap[product.id]=product;creatorOf[product.id]=creator;
    });
  }
}catch(error){console.warn('저장된 로컬 클래스를 불러오지 못했습니다.',error);}

// Public sample class for reviewing the ebook experience without a purchase.
{
  const creator=creators.find(item=>item.id==='mmoh');
  if(creator){
    const source={id:'public-ebook-sample',type:'ebook',title:'경매 입문 가이드',pageCount:6,outline:'처음 시작하는 경매 | 1\n이 책을 읽는 방법 | 2\n나만의 학습 지도 만들기 | 3\n기록을 남기는 세 가지 질문 | 4\n배운 내용을 내 것으로 | 5\n다음 학습을 준비하며 | 6',content:{videos:[],files:[]}};
    creator.lectureContents=[...(creator.lectureContents||[]).filter(item=>item.id!==source.id),source];
    const product=P({id:'ebook-sample-class',title:'처음 시작하는 경매, 한 권으로',type:'ebook',viewerType:'ebook',bookId:'ebook-demo',sampleBookId:'ebook-demo',isPublic:true,price:19000,orig:19000,tags:['전자책','입문','샘플 클래스'],image:'./assets/images/ebook-sample-cover.svg',lead:'복잡한 경매 공부의 첫걸음. 읽고 기록하며 나만의 학습 지도를 만들어 보세요.',intro:'전자책 클래스의 이용 흐름을 확인할 수 있는 샘플입니다. 6페이지 PDF를 무료로 미리 읽어볼 수 있습니다.',descriptionHtml:'<div class="ebook-class-intro"><h3>한 권으로 시작하는 나의 첫 경매 공부</h3><p>처음 배우는 내용을 정리하고, 질문을 기록하고, 다음 학습 계획을 세워보세요.</p><p>PDF 전자책 1권 · 6페이지 샘플 · 온라인 뷰어 제공</p><a class="btn-red ebook-sample-link" href="./ebook-reader.html?book=ebook-demo">샘플 전자책 읽어보기 ↗</a></div>',contentIds:[source.id],content:{videos:[],files:[]},cohort:{status:'모집중',period:'결제일부터 365일',recruitmentAlways:true,accessMode:'immediate',periodDays:365},operation:{guide:''},faq:[{q:'어떻게 읽나요?',a:'전자책 뷰어에서 페이지를 넘기고, 목차와 이어서 읽기를 이용해 읽을 수 있습니다.'},{q:'샘플을 먼저 볼 수 있나요?',a:'샘플 전자책 읽어보기 버튼으로 로그인이나 결제 없이 6페이지 샘플을 확인할 수 있습니다.'}]});
    creator.products.push(product);productMap[product.id]=product;creatorOf[product.id]=creator;
  }
}
