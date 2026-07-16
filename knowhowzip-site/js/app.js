"use strict";

/* ---------- logos ---------- */
function houseSVG(s,o){o=o||{};const ink=o.ink||'#1A2B36',roof=o.roof||'#D9332A';
  return `<svg width="${s}" height="${s*1.05}" viewBox="0 0 100 105"><polygon points="50,4 92,40 8,40" fill="${roof}"/><rect x="16" y="40" width="68" height="58" fill="none" stroke="${ink}" stroke-width="6"/>${o.text===false?'':`<text x="50" y="64" text-anchor="middle" font-family="'Black Han Sans'" font-size="22" fill="${ink}">MM</text><text x="50" y="88" text-anchor="middle" font-family="'Black Han Sans'" font-size="22" fill="${ink}">OH</text>`}</svg>`;}
function platMark(s){var g='lg'+Math.random().toString(36).slice(2,8);return `<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${g}" x1="12" y1="92" x2="88" y2="12" gradientUnits="userSpaceOnUse"><stop stop-color="#33B5FF"/><stop offset="1" stop-color="#4D54EA"/></linearGradient></defs><path d="M36 87 L20 87 Q14 87 14 81 L14 40 Q14 37 16.5 35 L47 11 Q50 8.5 53 11 L83.5 35 Q86 37 86 40 L86 81 Q86 87 80 87 L64 87" stroke="url(#${g})" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 33 Q53 53 70 56 Q53 59 50 79 Q47 59 30 56 Q47 53 50 33 Z" fill="url(#${g})"/></svg>`;}
function creatorLogo(c,size){
  if(c.logoType==='house')return houseSVG(size*0.82,{ink:c.themeDeep});
  return `<div style="width:${size}px;height:${size}px;background:${c.theme};display:flex;align-items:center;justify-content:center;font-family:'Black Han Sans';font-size:${size*0.4}px;color:${c.themeDeep}">${c.monogram}</div>`;
}
var _pf=document.getElementById('pmark-foot');if(_pf)_pf.innerHTML=platMark(30);
var _ml=document.getElementById('mockLogo');if(_ml)_ml.innerHTML=houseSVG(36,{ink:'#1c3a4a'});

const won=n=>'₩'+Number(n).toLocaleString('ko-KR');
const stars=r=>'★★★★★'.slice(0,Math.round(r))+'☆☆☆☆☆'.slice(0,5-Math.round(r));

let state={user:null,purchased:new Set(),cart:new Set(),authMode:'kakao',pending:null,cat:'전체',creatorCat:'전체',creatorSearch:'',myFilter:'active',accountFilter:'payments',payMethod:'card',activeLesson:null};

/* ---------- product card (with creator) ---------- */
function discRate(p){return p.orig>p.price?Math.round((1-p.price/p.orig)*100):0;}
function prodCard(p,c){
  const d=discRate(p);
  return `<article class="pcard" onclick="openDetail('${p.id}')">
    <div class="thumb"><span class="own" data-own="${p.id}">수강 중</span>
      <div style="position:absolute;inset:0;background:${p.grad}"></div><div style="position:relative">${c.logoType==='house'?houseSVG(72,{ink:p.deep,text:false}):''}</div></div>
    <div class="c-body">
      <div class="c-creator"><span class="mini">${creatorLogo(c,18)}</span>${c.name}</div>
      <span class="c-cohort">${p.cohort.status}</span>
      <h3 class="c-title">${p.title}</h3>
      <div class="c-rate"><span class="stars">${stars(p.rate)}</span><b>${p.rate}</b><span>(${p.reviews})</span></div>
      <div class="c-price">${d?`<span class="disc">${d}%</span>`:''}<span class="final">${won(p.price)}</span>${d?`<span class="orig">${won(p.orig)}</span>`:''}</div>
    </div></article>`;
}

/* ---------- HOME ---------- */
function renderHome(){
  const homeCats=document.getElementById('catChips');
  const showCategoryFilters=cats.length>2;
  homeCats.hidden=!showCategoryFilters;
  homeCats.innerHTML=showCategoryFilters?cats.map(ct=>`<button class="chip ${state.cat===ct?'active':''}" onclick="setCat('${ct}')">${ct}</button>`).join(''):'';
  const cs=creators.filter(c=>state.cat==='전체'||c.cat===state.cat).slice(0,4);
  document.getElementById('creatorGrid').innerHTML=cs.map(c=>`
    <div class="ccard" onclick="openCreator('${c.id}')">
      <div class="cc-cover" style="background:${c.cover}"><div class="cc-logo">${creatorLogo(c,54)}</div></div>
      <div class="cc-body">
        <div class="cc-name">${c.name}</div>
        <div class="cc-cat">${c.cat}</div>
        <div class="cc-desc">${c.tagline}</div>
      </div>
    </div>`).join('');
  const pop=allProducts().filter(x=>state.cat==='전체'||x.c.cat===state.cat).sort((a,b)=>b.p.reviews-a.p.reviews).slice(0,8);
  document.getElementById('popularGrid').innerHTML=pop.map(x=>prodCard(x.p,x.c)).join('');
  refreshOwned();
}
function setCat(ct){state.cat=ct;renderHome();}

/* ---------- CREATOR directory ---------- */
const categoryIcons={'전체':'▦','부동산·경매':'⌂','재테크·주식':'↗','디자인':'✦','개발':'⌘'};
function renderCreatorsPage(){
  const catBox=document.getElementById('creatorPageCats');
  const showCategoryFilters=cats.length>2;
  catBox.closest('.creator-category-nav').hidden=!showCategoryFilters;
  catBox.innerHTML=showCategoryFilters?cats.map(ct=>`<button class="creator-category ${state.creatorCat===ct?'active':''}" onclick="setCreatorDirectoryCat('${ct}')"><span>${categoryIcons[ct]||'●'}</span>${ct}</button>`).join(''):'';
  const query=state.creatorSearch.trim().toLowerCase();
  const list=creators.filter(c=>(state.creatorCat==='전체'||c.cat===state.creatorCat)&&(!query||`${c.name} ${c.handle} ${c.cat} ${c.tagline}`.toLowerCase().includes(query)));
  document.getElementById('creatorResultCount').textContent=list.length;
  document.getElementById('creatorPageGrid').innerHTML=list.map(c=>`
    <article class="creator-directory-card" onclick="openCreator('${c.id}')" tabindex="0" onkeydown="if(event.key==='Enter')openCreator('${c.id}')">
      <div class="creator-card-cover" style="background:${c.cover}">
        <span class="creator-card-category">${c.cat}</span>
        <div class="creator-card-logo">${creatorLogo(c,72)}</div>
      </div>
      <div class="creator-card-body">
        <div class="creator-card-title"><h3>${c.name}</h3></div>
        <div class="creator-card-handle">${c.handle}</div>
        <p>${c.tagline}</p>
      </div>
    </article>`).join('');
  document.getElementById('creatorEmpty').hidden=list.length!==0;
}
function setCreatorDirectoryCat(cat){state.creatorCat=cat;renderCreatorsPage();}
function setCreatorSearch(value){state.creatorSearch=value;renderCreatorsPage();}
/* ---------- CREATOR storefront ---------- */

function creatorCommerce(c){
  return {products:c.products};
}
let activeCreator=null;
function openCreator(id){
  const c=creators.find(x=>x.id===id);activeCreator=id;
  let savedCover='';try{savedCover=id==='mmoh'?localStorage.getItem('nhz-mmoh-cover')||'':'';}catch(error){}
  const commerce=creatorCommerce(c);
  document.getElementById('view-creator').innerHTML=`
    <div class="cbanner"><div style="position:absolute;inset:0;background:${savedCover||c.cover};opacity:${savedCover?1:.55}"></div>
      <div class="wrap">
      <div class="cbanner-in">
        <div class="clogo">${creatorLogo(c,64)}</div>
        <div class="cinfo">
          <h1 class="cname">${c.name}</h1>
          <div class="chandle">${c.handle} · ${c.cat}</div>
          <p class="ctag">${c.tagline}</p>
        </div>
        <button class="cshare" onclick="shareCreator('${id}')">🔗 페이지 공유</button>
      </div></div>
    </div>
    <div class="wrap">
      <div class="ctabs">
        <button class="active" onclick="ctab(this,'cs-class')">클래스</button>
        <button onclick="ctab(this,'cs-about')">소개</button>
      </div>
      <div class="csec show" id="cs-class"><div class="creator-section-copy"><h2>클래스</h2><p>필요한 클래스를 확인하고 바로 수강 신청할 수 있습니다. 수강 조건이 있는 클래스는 신청 전 안내됩니다.</p></div><div class="grid">${commerce.products.map(p=>prodCard(p,c)).join('')}</div></div>
      <div class="csec" id="cs-about"><div class="about-box">${c.about}</div></div>
    </div>`;
  show('creator');window.scrollTo({top:0});setHash('#/c/'+id);
  refreshOwned();
}
function ctab(btn,id){btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.csec').forEach(s=>s.classList.remove('show'));document.getElementById(id).classList.add('show');}


/* ---------- DETAIL ---------- */
let activeDetail=null;
function faqAcc(list,prefix){return list.map((f,i)=>`<div class="faq-item"><button class="faq-q" onclick="toggleFaq('${prefix}-${i}')"><span><span class="qmark">Q.</span>${f.q}</span><span class="pm">+</span></button><div class="faq-a" id="fa-${prefix}-${i}"><p>${f.a}</p></div></div>`).join('');}
function purchaseRequirement(product){
  const req=product.requirement||{type:'none',label:'처음 참여 가능',message:'사전 수강 이력 없이 신청할 수 있습니다.'};
  if(req.type==='none')return {ok:true,label:req.label,message:req.message};
  const ok=state.purchased.has(req.productId);
  return {ok,label:req.label,message:ok?'신청 조건을 충족했습니다.':req.message};
}
function openDetail(pid){
  const p=productMap[pid],c=creatorOf[pid];activeDetail=pid;
  const owned=state.purchased.has(pid),d=discRate(p),ch=p.cohort,seat=Math.round(ch.enrolled/ch.seats*100),req=purchaseRequirement(p);
  document.getElementById('view-detail').innerHTML=`
    <div class="wrap"><div class="crumb"><a onclick="show('home')">홈</a><span class="sep">›</span><a onclick="openCreator('${c.id}')">${c.name}</a><span class="sep">›</span><span>${p.title.split(' · ')[0]}</span><button class="crumb-share" onclick="shareProduct('${pid}')">🔗 공유</button></div></div>
    <div class="detail-hero"><div class="wrap detail-hero-in">
      <div>
        <div class="d-creatorchip" onclick="openCreator('${c.id}')"><span class="mini">${creatorLogo(c,26)}</span>${c.name}</div>
        <div class="d-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
        <h1>${p.title}</h1>
        <p class="d-lead">${p.lead}</p>
        <div class="d-meta"><span><span class="stars">${stars(p.rate)}</span> <b>${p.rate}</b> (${p.reviews})</span><span>·</span><span>${ch.status}</span></div>
        <div class="d-visual" style="background:${p.grad}">${c.logoType==='house'?houseSVG(110,{ink:p.deep,text:false}):''}</div>
      </div>
      <aside><div class="buycard">
        <div class="bc-vis" style="background:${p.grad}">${c.logoType==='house'?houseSVG(66,{ink:p.deep,text:false}):''}</div>
        <div class="bc-body">
          <div class="cohort-box">
            <div class="ch-top"><span class="ch-no">수강 신청</span><span class="ch-st">${ch.status}</span></div>
            <div class="ch-row"><span>수강 기간</span><b>${ch.period}</b></div>
            <div class="ch-row"><span>모집 마감</span><b>${ch.deadline}</b></div>
            <div class="ch-row"><span>신청 현황</span><b>${ch.enrolled} / ${ch.seats}명</b></div>
            <div class="seat-bar"><i style="width:${seat}%"></i></div>
          </div>
          <div class="cohort-box access-box">
            <div class="ch-row"><span>신청 조건</span><b>${req.label}</b></div>
            <p>${req.message}</p>
          </div>
          <div class="bc-price">${d?`<span class="disc">${d}%</span>`:''}<span class="final">${won(p.price)}</span>${d?`<span class="orig">정가 ${won(p.orig)}</span>`:''}</div>
          <div class="bc-actions" data-actions="${pid}" style="${owned?'display:none':''}">
            <button class="btn-red" onclick="startPurchase('${pid}')">수강신청</button>
            <button class="bc-cart" onclick="addCart('${pid}')">장바구니 담기</button>
          </div>
          <div class="bc-owned" data-owned="${pid}" style="display:${owned?'block':'none'}">✓ 수강 중 · 내 학습에서 확인</div>
          <ul class="bc-incl"><li>온라인 라이브 + 다시보기</li><li>콘텐츠 자료 제공</li><li>수강생 단톡방 · 줌 초대</li><li>라이브 1:1 질의응답</li></ul>
        </div>
      </div></aside>
    </div></div>

    <div class="detail-body"><div class="wrap">
      <div class="d-tabs">
        <button class="active" onclick="goTab(this,'sec-intro')">클래스 소개</button>
        <button onclick="goTab(this,'sec-content')">콘텐츠</button>
        <button onclick="goTab(this,'sec-op')">운영 안내</button>
        <button onclick="goTab(this,'sec-faq')">클래스 FAQ</button>
      </div>
      <div class="d-section" id="sec-intro"><h3><span class="dot"></span>클래스 소개</h3><p>${p.intro}</p></div>
      <div class="d-section" id="sec-content"><h3><span class="dot"></span>콘텐츠 <span class="sub">영상 · 자료</span></h3>
        <div class="sub-h">📹 영상 커리큘럼</div>
        <ul class="curr">${p.content.videos.map((s,i)=>`<li><span class="wk">${i+1}주차</span><span>${s}</span><span class="pl">▶</span></li>`).join('')}</ul>
        <div class="sub-h">📄 제공 자료</div>
        <ul class="mat-list">${p.content.files.map(m=>`<li><span class="mi">📄</span><span>${m}</span><span class="lock">${owned?'다운로드 가능':'🔒 수강 후 제공'}</span></li>`).join('')}</ul>
      </div>
      <div class="d-section" id="sec-op"><h3><span class="dot"></span>운영 안내 <span class="sub">단톡방 · 줌</span></h3>
        <p style="margin-bottom:14px">${p.operation.guide}</p>
        <div class="op-card"><span class="oi oi-kakao">💬</span><span><span class="ot">수강생 단톡방</span><br><span class="od">공지·질문·다시보기 공유</span></span>${owned?'<span class="obtn">입장하기 →</span>':'<span class="olock">🔒 수강 후 제공</span>'}</div>
        <div class="op-card"><span class="oi oi-zoom">🎥</span><span><span class="ot">줌(Zoom) 라이브</span><br><span class="od">매주 라이브 입장 링크</span></span>${owned?'<span class="obtn">링크 보기 →</span>':'<span class="olock">🔒 수강 후 제공</span>'}</div>
      </div>
      <div class="d-section" id="sec-faq"><h3><span class="dot"></span>클래스 FAQ</h3>${faqAcc(p.faq,'pf'+pid)}</div>
    </div></div>
    <div class="buybar" id="buybar"></div>`;
  const bar=document.getElementById('buybar');
  bar.innerHTML=owned?`<div class="bb-owned">✓ 수강 중 · 내 학습에서 확인</div>`:`<div class="bb-price">${d?`<span class="d">${d}%</span>`:''}<span class="f">${won(p.price)}</span></div><button class="btn-red" onclick="startPurchase('${pid}')">수강신청</button>`;
  show('detail');window.scrollTo({top:0});setHash('#/p/'+pid);
}
function goTab(btn,id){document.querySelectorAll('.d-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById(id).scrollIntoView({behavior:'smooth'});}

/* ---------- MYPAGE (grouped by creator) ---------- */
const learningProgress={'mmoh-basic':50,'mmoh-right':25};
const endedCourses=new Set();
const lessonDurations=['88분','92분','76분','81분','68분','74분'];
const zoomSchedules={
  'mmoh-basic':[{date:'07.05',day:'일',time:'20:00',title:'오리엔테이션 · 경매 절차 이해'},{date:'07.12',day:'일',time:'20:00',title:'물건 검색과 시세 분석'},{date:'07.19',day:'일',time:'20:00',title:'입찰표 작성 실습'}],
  'mmoh-right':[{date:'07.12',day:'일',time:'20:00',title:'권리분석 핵심 개념'},{date:'07.19',day:'일',time:'20:00',title:'위험 물건 사례 분석'}]
};
function renderZoomSchedules(productId){
  const schedules=zoomSchedules[productId]||[{date:'일정',day:'',time:'추후 안내',title:'라이브 일정은 공지로 안내됩니다'}];
  return `<div class="zoom-schedule"><div class="zoom-schedule-head"><b>줌 라이브 일정</b></div>${schedules.map((schedule,index)=>`<div class="zoom-schedule-row"><span class="zoom-order">${index+1}</span><div><b>${schedule.title}</b><small>${schedule.date}${schedule.day?'('+schedule.day+')':''} · ${schedule.time}</small></div></div>`).join('')}</div>`;
}
function productProgress(id){return learningProgress[id]??20;}
function setMyLearningFilter(filter){state.myFilter=filter;renderMy();}
function toggleLearningAcc(id){document.getElementById(id)?.classList.toggle('open');}
function playLesson(productId,index,title){
  openLessonPlayer(productId,index);
}
function continueLearning(productId,index){
  const videos=productMap[productId].content.videos,next=Math.min(index,videos.length-1);
  playLesson(productId,next,videos[next]);
}
function openLessonPlayer(productId,index=0){
  const product=productMap[productId],creator=creatorOf[productId];
  if(!product||!creator)return;
  const videos=product.content.videos,next=Math.min(Math.max(index,0),videos.length-1);
  state.activeLesson={productId,index:next};
  renderLessonPlayer(product,creator,next);
  show('player');
  setHash('#/learn/'+productId+'/'+(next+1));
}
function moveLesson(delta){
  if(!state.activeLesson)return;
  const product=productMap[state.activeLesson.productId],next=Math.min(Math.max(state.activeLesson.index+delta,0),product.content.videos.length-1);
  openLessonPlayer(state.activeLesson.productId,next);
}
function renderLessonPlayer(product,creator,index){
  const videos=product.content.videos,current=videos[index];
  const watched=Math.min(index+1,videos.length);
  document.getElementById('view-player').innerHTML=`
    <div class="lesson-player-page">
      <header class="lesson-player-top">
        <button class="lesson-back" onclick="show('mypage')" aria-label="내 학습으로 돌아가기">←</button>
        <div class="lesson-player-titlebar"><h1>${current}</h1><span>${product.title}</span></div>
      </header>
      <section class="lesson-stage">
        <div class="lesson-video-shell">
          <div class="lesson-video-aside"></div>
          <div class="lesson-slide">
            <div class="lesson-slide-brand">${creator.name}</div>
            <h2>${current}</h2>
            <p>${product.lead}</p>
            <div class="lesson-slide-grid">
              <article><b>${index+1}강 핵심</b><span>${product.content.files[0]||'강의 노트'}</span></article>
              <article><b>오늘의 목표</b><span>${product.tags.slice(0,2).join(' · ')}</span></article>
            </div>
            <div class="lesson-instructor">${creator.logoType==='house'?houseSVG(54,{ink:product.deep,text:false}):creatorLogo(creator,54)}</div>
          </div>
          <div class="lesson-video-aside"></div>
        </div>
        <div class="lesson-video-controls">
          <button onclick="moveLesson(-1)" ${index===0?'disabled':''}>이전 강의</button>
          <span><i style="width:${(watched/videos.length)*100}%"></i></span>
          <button onclick="moveLesson(1)" ${index===videos.length-1?'disabled':''}>다음 강의</button>
          <button class="lesson-wide" onclick="toast('전체 화면 모드는 추후 제공됩니다')">전체 화면</button>
        </div>
      </section>
    </div>`;
}
function renderLearningTabs(owned){
  const ended=owned.filter(x=>endedCourses.has(x.p.id)).length,active=owned.length-ended;
  document.getElementById('myLearningTabs').innerHTML=[['active',`수강 중 ${active}`],['ended',`수강 종료 ${ended}`]].map(([key,label])=>`<button class="${state.myFilter===key?'active':''}" onclick="setMyLearningFilter('${key}')">${label}</button>`).join('');
}
const demoPayments=[
  {id:'P20260629001',date:'2026.06.29',productId:'mmoh-basic',title:'경매 낙찰 기초반 · 4주 완성',amount:290000,payment:'결제 완료'},
  {id:'P20260628014',date:'2026.06.28',productId:'mmoh-right',title:'권리분석 실전반 · 위험물건 거르기',amount:390000,payment:'결제 완료'}
];
function renderPaymentHistory(){
  return `<section class="payment-history"><div class="payment-history-head"><div><h2>결제 내역</h2><p>결제 완료된 클래스 내역을 확인합니다.</p></div></div><div class="payment-list">${demoPayments.map(payment=>`<article class="payment-item"><div class="payment-date"><b>${payment.date}</b><small>주문번호 ${payment.id}</small></div><div class="payment-product"><span>클래스</span><b>${payment.title}</b></div><div class="payment-amount"><span>결제 금액</span><b>${won(payment.amount)}</b></div><div class="payment-status"><span class="pay-state">${payment.payment}</span></div></article>`).join('')}</div></section>`;
}
function renderUserProfile(){
  const user=state.user;
  return `<section class="user-profile-card">
    <div class="user-profile-head">
      <div class="user-profile-avatar">${user.name.slice(0,1)}</div>
      <div><span>내 정보</span><h2>${user.name}</h2><p>카카오 계정으로 연결된 정보입니다.</p></div>
    </div>
    <div class="user-profile-grid">
      <div><small>이름</small><b>${user.name}</b></div>
      <div><small>전화번호</small><b>${user.phone}</b></div>
    </div>
  </section>`;
}
function renderLearningEntitlementSummary(owned){
  const active=owned.filter(x=>!endedCourses.has(x.p.id)).length;
  const creatorCount=new Set(owned.map(x=>x.c.id)).size;
  return `<section class="entitlement-summary">
    <article><span>수강 중 클래스</span><strong>${active}개</strong><p>현재 학습 가능한 클래스입니다.</p></article>
    <article><span>크리에이터</span><strong>${creatorCount}명</strong><p>구매한 클래스를 크리에이터별로 모아봅니다.</p></article>
  </section>`;
}

function renderMy(){
  const box=document.getElementById('myContent');
  const tabs=document.getElementById('myLearningTabs');
  if(!state.user){tabs.innerHTML='';box.innerHTML=`<div class="my-empty">${platMark(50)}<h3>로그인이 필요합니다</h3><p>로그인 후 구매한 클래스를 확인할 수 있습니다.</p><button class="btn-red" onclick="openAuth('login')">바로 시작하기</button></div>`;return;}
  const allOwned=allProducts().filter(x=>state.purchased.has(x.p.id));
  renderLearningTabs(allOwned);
  if(!allOwned.length){box.innerHTML=`<div class="my-empty">${platMark(50)}<h3>아직 수강 중인 클래스가 없습니다</h3><p>크리에이터의 클래스를 둘러보세요.</p><button class="btn-red" onclick="show('creators')">둘러보기</button></div>`;return;}
  const owned=allOwned.filter(x=>state.myFilter==='ended'?endedCourses.has(x.p.id):!endedCourses.has(x.p.id));
  if(!owned.length){box.innerHTML=`<div class="my-empty"><div class="my-empty-icon">✓</div><h3>${state.myFilter==='ended'?'수강 종료된 클래스가 없습니다':'현재 수강 중인 클래스가 없습니다'}</h3><p>${state.myFilter==='ended'?'수강 기간이 종료된 클래스가 이곳에 표시됩니다.':'새로운 클래스를 둘러보세요.'}</p></div>`;return;}
  const byCreator={};owned.forEach(x=>{(byCreator[x.c.id]=byCreator[x.c.id]||{c:x.c,items:[]}).items.push(x.p);});
  box.innerHTML=renderLearningEntitlementSummary(allOwned)+Object.values(byCreator).map(g=>`
    <section class="learning-group">
      <div class="learning-group-head"><span class="logo">${creatorLogo(g.c,38)}</span><h2>${g.c.name}</h2><span>클래스 ${g.items.length}</span><button onclick="openCreator('${g.c.id}')">크리에이터 페이지 →</button></div>
      ${renderCreatorLearningFaq(g.c,g.items)}
      ${g.items.map(p=>{const progress=productProgress(p.id),videos=p.content.videos,doneCount=Math.floor(videos.length*progress/100);if(endedCourses.has(p.id))return `
        <article class="learning-card ended">
          <div class="learning-summary">
            <div class="learning-thumb ended" style="background:${p.grad}"><span>수강 종료</span>${g.c.logoType==='house'?houseSVG(44,{ink:p.deep,text:false}):creatorLogo(g.c,44)}</div>
            <div class="learning-title"><h3>${p.title}</h3><div class="ended-course-note">수강 기간이 종료되어 콘텐츠를 열람할 수 없습니다.</div><small>${p.cohort.period}</small></div>
            <span class="ended-course-badge">수강 종료</span>
          </div>
        </article>`;return `
        <article class="learning-card">
          <div class="learning-summary">
            <div class="learning-thumb" style="background:${p.grad}"><span>수강 중</span>${g.c.logoType==='house'?houseSVG(44,{ink:p.deep,text:false}):creatorLogo(g.c,44)}</div>
            <div class="learning-title"><h3>${p.title}</h3><div class="learning-status-count"><span class="done">✓ 시청 완료 ${doneCount}강</span><span>미완료 ${videos.length-doneCount}강</span></div><small>전체 ${videos.length}강</small></div>
            <button class="btn-primary learning-continue" onclick="continueLearning('${p.id}',${doneCount})">이어서 학습</button>
          </div>
          <div class="learning-details">
            <div class="learning-acc open" id="learn-${p.id}-video">
              <button class="learning-acc-head" onclick="toggleLearningAcc('learn-${p.id}-video')"><span><i class="video">▶</i>콘텐츠 · 영상 <small>${videos.length}강</small></span><b>＋</b></button>
              <div class="learning-acc-body"><div class="learning-acc-inner"><div class="learning-player" id="player-${p.id}"><div class="learning-player-screen"><span>▶</span></div><div><b class="learning-player-title">강의를 선택해 주세요</b><small class="learning-player-meta">카드 안에서 바로 재생됩니다</small></div></div>${videos.map((video,idx)=>{const done=idx<doneCount;return `<button class="lesson-row" data-product="${p.id}" data-lesson="${idx}" onclick="playLesson('${p.id}',${idx},'${video}')"><span class="lesson-state ${done?'done':''}">${done?'✓':'▶'}</span><span class="lesson-title">${video}<small>${done?'시청 완료':'미완료 · 재생하기'}</small></span><span class="lesson-duration">${lessonDurations[idx%lessonDurations.length]}</span><strong>${done?'완료':'미완료'}</strong></button>`;}).join('')}</div></div>
            </div>
            <div class="learning-acc" id="learn-${p.id}-files">
              <button class="learning-acc-head" onclick="toggleLearningAcc('learn-${p.id}-files')"><span><i class="file">▤</i>콘텐츠 · 자료 <small>${p.content.files.length}개</small></span><b>＋</b></button>
              <div class="learning-acc-body"><div class="learning-acc-inner">${p.content.files.map(file=>`<button class="learning-resource" onclick="toast('&quot;${file}&quot; 다운로드를 시작합니다')"><i>📄</i><span>${file}<small>강의 자료</small></span><b>다운로드</b></button>`).join('')}</div></div>
            </div>
            <div class="learning-acc" id="learn-${p.id}-operation">
              <button class="learning-acc-head" onclick="toggleLearningAcc('learn-${p.id}-operation')"><span><i class="operation">●</i>운영 안내 <small>단톡방 · 줌</small></span><b>＋</b></button>
              <div class="learning-acc-body"><div class="learning-acc-inner"><p class="learning-guide">${p.operation.guide}</p>${renderZoomSchedules(p.id)}<button class="learning-resource" onclick="toast('수강생 단톡방으로 이동합니다')"><i class="kakao">💬</i><span>수강생 단톡방 입장<small>공지 · 질문 · 다시보기 공유</small></span><b>열기 →</b></button><button class="learning-resource" onclick="toast('줌 입장 링크를 엽니다')"><i class="zoom">🎥</i><span>줌(Zoom) 라이브 입장<small>매주 라이브 강의 입장 링크</small></span><b>링크 →</b></button></div></div>
            </div>
            <div class="learning-acc" id="learn-${p.id}-faq">
              <button class="learning-acc-head" onclick="toggleLearningAcc('learn-${p.id}-faq')"><span><i class="faq">?</i>수강 FAQ <small>${p.faq.length}개</small></span><b>＋</b></button>
              <div class="learning-acc-body"><div class="learning-acc-inner"><div class="faq-list">${faqAcc(p.faq,'lf'+p.id)}</div></div></div>
            </div>
          </div>
        </article>`;}).join('')}
    </section>`).join('');
}
function setAccountFilter(filter){state.accountFilter=filter;renderAccount();}
function renderAccountTabs(){
  document.getElementById('accountTabs').innerHTML=[['payments','결제 내역'],['profile','내 정보']].map(([key,label])=>`<button class="${state.accountFilter===key?'active':''}" onclick="setAccountFilter('${key}')">${label}</button>`).join('');
}
function renderAccount(){
  const box=document.getElementById('accountContent'),tabs=document.getElementById('accountTabs');
  if(!state.user){tabs.innerHTML='';box.innerHTML=`<div class="my-empty">${platMark(50)}<h3>로그인이 필요합니다</h3><p>로그인 후 결제 내역과 내 정보를 확인할 수 있습니다.</p><button class="btn-red" onclick="openAuth('login')">바로 시작하기</button></div>`;return;}
  renderAccountTabs();
  box.innerHTML=state.accountFilter==='profile'?renderUserProfile():renderPaymentHistory();
}

function renderCreatorLearningFaq(creator,products){
  const entries=products.flatMap(product=>(product.faq||[]).map(faq=>({...faq,course:product.title})));
  return '<section class="global-learning-faq"><button type="button" class="global-learning-faq-copy" onclick="toggleGlobalLearningFaq(this)" aria-expanded="false"><span>?</span><div><b>강의에 대해 궁금한 게 있나요?</b><small>'+creator.name+' 수강 클래스의 FAQ에서 먼저 검색해 보세요.</small></div><i>⌄</i></button><div class="global-learning-faq-body"><label class="learning-faq-search"><span>⌕</span><input type="search" placeholder="궁금한 내용을 자유롭게 검색해 보세요" oninput="filterCreatorLearningFaq(this)"></label><div class="learning-faq-result"></div><div class="global-learning-faq-results" hidden>'+entries.map(faq=>'<article class="global-learning-faq-item"><span>'+creator.name+' · '+faq.course+'</span><b>Q. '+faq.q+'</b><p>'+faq.a+'</p></article>').join('')+'</div><div class="learning-faq-empty" hidden>검색 결과가 없습니다.</div></div></section>';
}
function toggleGlobalLearningFaq(button){
  const panel=button.closest('.global-learning-faq'),open=panel.classList.toggle('open');
  button.setAttribute('aria-expanded',String(open));
  if(open)setTimeout(()=>panel.querySelector('input')?.focus(),0);
}
function filterCreatorLearningFaq(input){
  const panel=input.closest('.global-learning-faq'),results=panel.querySelector('.global-learning-faq-results'),empty=panel.querySelector('.learning-faq-empty'),result=panel.querySelector('.learning-faq-result');
  if(!results)return;
  const query=input.value.trim().toLowerCase();let visible=0;
  results.querySelectorAll('.global-learning-faq-item').forEach(item=>{const matched=!query||item.textContent.toLowerCase().includes(query);item.hidden=!matched;if(matched)visible++;});
  results.hidden=!query||visible===0;empty.hidden=!query||visible!==0;result.textContent=query?'검색 결과 '+visible+'개':'';
}

/* ---------- platform FAQ ---------- */
const commonFaqs=[
  {q:'결제 후 바로 수강할 수 있나요?',a:'네. 결제가 완료되면 내 학습에서 바로 콘텐츠와 운영 안내를 확인할 수 있습니다.'},
  {q:'여러 크리에이터의 클래스를 한 계정으로 들을 수 있나요?',a:'네. 하나의 노하우집 계정으로 모든 크리에이터의 클래스를 구매·수강할 수 있고, 내 학습에서 크리에이터별로 모아 볼 수 있습니다.'},
  {q:'자료·단톡방은 어떻게 이용하나요?',a:'구매한 클래스의 내 학습에서 자료 다운로드와 단톡방·줌 링크가 활성화됩니다. 미구매 클래스는 제한됩니다.'},
  {q:'환불 규정은 어떻게 되나요?',a:'첫 강의 시작 전까지 전액 환불, 이후에는 진행 회차를 제외한 잔여분에 대해 규정에 따라 처리됩니다.'},
  {q:'크리에이터로 입점하려면요?',a:'상단 입점 문의 또는 고객센터의 카카오 채널을 통해 신청할 수 있습니다.'}
];
function renderFaq(){document.getElementById('faqList').innerHTML=faqAcc(commonFaqs,'c');}
function toggleFaq(key){const a=document.getElementById('fa-'+key);if(!a)return;const item=a.parentElement;const open=item.classList.toggle('open');a.style.maxHeight=open?a.scrollHeight+'px':'0';}
const KAKAO_CHANNEL_URL='http://pf.kakao.com/_xksSwX/chat';
function openKakaoChannel(){window.open(KAKAO_CHANNEL_URL,'_blank','noopener,noreferrer');}

/* ---------- view switch ---------- */
function show(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('show'));
  document.getElementById('view-'+view).classList.add('show');
  document.getElementById('creatorInquiryStrip').hidden=view!=='home';
  document.querySelectorAll('.gnb-menu button').forEach(b=>b.classList.toggle('active',b.dataset.nav===view));
  if(view==='home')renderHome();
  if(view==='creators')renderCreatorsPage();
  if(view==='mypage')renderMy();
  if(view==='account')renderAccount();
  if(view==='faq')renderFaq();
  if(view==='home')setHash('');
  if(view==='creators')setHash('#/creators');
  if(view==='mypage')setHash('#/mypage');
  if(view==='account')setHash('#/account');
  if(view==='faq')setHash('#/faq');
  if(view!=='detail'&&view!=='creator')window.scrollTo({top:0});
}
function toggleMnav(){document.getElementById('mnav').classList.toggle('show');}

/* ---------- auth ---------- */
function openAuth(m){switchAuth(m);document.getElementById('authModal').classList.add('show');}
function closeAuth(){document.getElementById('authModal').classList.remove('show');}
function switchAuth(m){state.authMode='kakao';
  document.getElementById('authTitle').textContent='카카오 간편 로그인';
  document.getElementById('authDesc').textContent='노하우집을 함께 시작해보세요!';
  document.getElementById('authSubmit').textContent='카카오로 3초 만에 시작하기';}
const DEMO_PURCHASES=['mmoh-basic','mmoh-right'];
function submitAuth(){
  state.user={name:'김노하우',phone:'010-1234-5678',provider:'kakao'};
  state.myFilter='active';
  DEMO_PURCHASES.forEach(id=>state.purchased.add(id));
  document.getElementById('signupBtn').style.display='none';
  document.getElementById('userChip').style.display='flex';document.getElementById('userName').textContent=state.user.name;
  document.getElementById('mAuth').style.display='none';document.getElementById('mUser').style.display='flex';document.getElementById('mUserName').textContent=state.user.name;
  closeAuth();toast('카카오 로그인 완료');
  if(state.pending){const id=state.pending;state.pending=null;openPay(id);}
  else if(document.getElementById('view-account').classList.contains('show'))show('account');
  else show('mypage');}
function logout(){state.user=null;state.purchased.clear();state.cart.clear();updateCart();
  document.getElementById('signupBtn').style.display='';
  document.getElementById('userChip').style.display='none';
  document.getElementById('mAuth').style.display='flex';document.getElementById('mUser').style.display='none';
  refreshOwned();renderMy();toast('로그아웃되었습니다');show('home');}

/* ---------- cart / purchase ---------- */
function addCart(id){if(state.cart.has(id)){toast('이미 장바구니에 있습니다');return;}state.cart.add(id);updateCart();toast('장바구니에 담았습니다');}
function updateCart(){const n=state.cart.size,el=document.getElementById('cartCount');el.textContent=n;el.style.display=n?'flex':'none';}
function startPurchase(id){
  if(!state.user){state.pending=id;openAuth('login');toast('결제를 위해 먼저 로그인해 주세요');return;}
  const req=purchaseRequirement(productMap[id]);
  if(!req.ok){toast(req.message);return;}
  openPay(id);
}
function openPay(id){const p=productMap[id],c=creatorOf[id],d=discRate(p);state.payMethod='card';
  document.getElementById('payTitle').textContent='결제하기';
  document.getElementById('payBody').innerHTML=`
    <div class="pay-sum">
      <div class="row"><span>크리에이터</span><b>${c.name}</b></div>
      <div class="row"><span>클래스</span><b>${p.title}</b></div>
      <div class="row"><span>수강 기간</span><b>${p.cohort.period}</b></div>
      ${d?`<div class="row"><span>정가</span><span style="text-decoration:line-through;color:var(--ink-mute)">${won(p.orig)}</span></div><div class="row"><span>할인</span><span style="color:var(--red)">-${won(p.orig-p.price)} (${d}%)</span></div>`:''}
      <div class="row tot"><span>결제 금액</span><span class="p">${won(p.price)}</span></div>
    </div>
    <div style="font-weight:800;font-size:13px;margin-bottom:8px">결제 수단</div>
    <div class="pay-methods" id="payMethods"><button class="active" data-m="card" onclick="pickMethod('card')">신용카드</button><button data-m="bank" onclick="pickMethod('bank')">계좌이체</button></div>
    <button class="btn-red" onclick="confirmPay('${id}')">${won(p.price)} 결제하기</button>`;
  document.getElementById('payModal').classList.add('show');}
function pickMethod(m){state.payMethod=m;document.querySelectorAll('#payMethods button').forEach(b=>b.classList.toggle('active',b.dataset.m===m));}
function confirmPay(id){const p=productMap[id],c=creatorOf[id];state.purchased.add(id);state.cart.delete(id);updateCart();
  document.getElementById('payTitle').textContent='결제 완료';
  document.getElementById('payBody').innerHTML=`<div class="pay-done"><div class="check">✓</div><h3>결제가 완료되었습니다</h3><p>${c.name}의 “${p.title}”을 내 학습에서 바로 볼 수 있습니다.</p><button class="btn-red" style="width:100%" onclick="goMy()">내 학습으로 가기</button></div>`;
  refreshOwned();}
function goMy(){closePay();show('mypage');}
function closePay(){document.getElementById('payModal').classList.remove('show');}

function refreshOwned(){
  Object.keys(productMap).forEach(id=>{
    const owned=state.purchased.has(id);
    document.querySelectorAll(`[data-own="${id}"]`).forEach(e=>e.style.display=owned?'block':'none');
    const act=document.querySelector(`[data-actions="${id}"]`),note=document.querySelector(`[data-owned="${id}"]`);
    if(act)act.style.display=owned?'none':'flex';if(note)note.style.display=owned?'block':'none';
  });
  if(activeDetail&&document.getElementById('view-detail').classList.contains('show'))openDetail(activeDetail);
}

/* ---------- share ---------- */
const SHARE_DOMAIN='https://knowhow.kr';
function creatorUrl(c){return SHARE_DOMAIN+'/'+c.handle.replace('@','');}
function productUrl(c,p){return SHARE_DOMAIN+'/'+c.handle.replace('@','')+'/class/'+p.id;}
function openShare(title,desc,url,logoHTML,sub){
  document.getElementById('shareTitle').textContent=title;
  document.getElementById('shareDesc').textContent=desc;
  document.getElementById('sharePreview').innerHTML=`<div class="sc-logo">${logoHTML}</div><div style="min-width:0"><div class="sc-name">${title}</div><div class="sc-sub">${sub}</div></div>`;
  document.getElementById('shareUrl').value=url;
  document.getElementById('shareModal').classList.add('show');
}
function shareCreator(id){const c=creators.find(x=>x.id===id);openShare(c.name,'링크를 복사해 공유할 수 있어요.',creatorUrl(c),creatorLogo(c,42),c.tagline);}
function shareProduct(pid){const p=productMap[pid],c=creatorOf[pid];openShare(p.title.split(' · ')[0],'링크를 복사해 공유할 수 있어요.',productUrl(c,p),(c.logoType==='house'?houseSVG(34,{ink:p.deep,text:false}):creatorLogo(c,42)),c.name+' · '+won(p.price));}
function closeShare(){document.getElementById('shareModal').classList.remove('show');}
function copyShare(){const v=document.getElementById('shareUrl').value;
  if(navigator.clipboard){navigator.clipboard.writeText(v).then(()=>toast('링크를 복사했어요')).catch(()=>fallbackCopy(v));}else fallbackCopy(v);}
function fallbackCopy(v){
  const area=document.createElement('textarea');
  area.value=v;
  area.setAttribute('readonly','');
  area.style.position='fixed';
  area.style.left='-9999px';
  document.body.appendChild(area);
  area.select();
  try{document.execCommand('copy');toast('링크를 복사했어요');}
  catch(e){toast('링크를 복사하지 못했어요');}
  document.body.removeChild(area);
}

/* ---------- hash routing (deep link for sharing) ---------- */
let suppressHash=false;
function setHash(h){suppressHash=true;location.hash=h;setTimeout(()=>{suppressHash=false;},0);}
function route(){
  const h=location.hash;
  if(h.startsWith('#/c/')){const id=h.slice(4);if(creators.find(x=>x.id===id))return openCreator(id);}
  if(h.startsWith('#/p/')){const id=h.slice(4);if(productMap[id])return openDetail(id);}
  if(h==='#/creators')return show('creators');
  if(h==='#/mypage')return show('mypage');
  if(h==='#/account')return show('account');
  if(h==='#/faq')return show('faq');
  show('home');
}
window.addEventListener('hashchange',()=>{if(!suppressHash)route();});

let tt;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2200);}
document.querySelectorAll('.modal-bg').forEach(bg=>bg.addEventListener('click',e=>{if(e.target===bg)bg.classList.remove('show');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal-bg.show').forEach(m=>m.classList.remove('show'));document.getElementById('mnav').classList.remove('show');}});

renderHome();
route();
