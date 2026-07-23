"use strict";

function houseMark(size=56){
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><path d="M18 45 50 18l32 27v38H60V61H40v22H18Z" fill="#AFD6E7" stroke="#1c3a4a" stroke-width="6" stroke-linejoin="round"/><path d="m12 43 38-31 38 31" fill="none" stroke="#4F66F5" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

const publicCreator=typeof creators!=='undefined'?creators.find(item=>item.id==='mmoh'):null;
const publicProducts=publicCreator?publicCreator.products:[
  {id:'mmoh-basic',title:'경매 낙찰 기초반 · 4주 완성',tag:'BEST',price:290000,lead:'경매가 처음인 직장인을 위한 입문 과정. 한 달이면 혼자 입찰표를 쓸 수 있습니다.',intro:'복잡한 경매 절차를 직장인 눈높이로 풀었습니다.',grad:'linear-gradient(135deg,#AFD6E7,#7DB8D4)',tags:['입문','입찰 실습','직장인 추천'],cohort:{no:3,status:'모집중',period:'2026.07.05 ~ 08.02',deadline:'2026.06.30',seats:30,enrolled:21},requirement:{label:'처음 참여 가능'},content:{videos:['경매 절차와 권리의 이해','물건 검색과 시세 분석','입찰표 작성 실습','모의 입찰 & 라이브 Q&A'],files:['주차별 강의 노트(PDF)','입찰표 작성 템플릿','물건 분석 체크리스트']},operation:{guide:'매주 화요일 저녁 8시 줌 라이브로 진행됩니다. 입장 링크는 시작 30분 전 단톡방에 안내됩니다.'}},
  {id:'mmoh-right',title:'권리분석 실전반 · 위험물건 거르기',tag:'심화',price:390000,lead:'등기부와 매각물건명세서를 직접 읽고 위험 물건을 걸러내는 눈을 기릅니다.',intro:'낙찰의 성패는 권리분석에서 갈립니다.',grad:'linear-gradient(135deg,#F3C7C2,#D9332A)',tags:['심화','권리분석','사례 스터디'],cohort:{no:2,status:'모집중',period:'2026.07.12 ~ 08.09',deadline:'2026.07.07',seats:25,enrolled:18},requirement:{label:'경매 낙찰 기초반 수강 이력 필요'},content:{videos:['등기부등본 정밀 분석','말소기준권리와 인수/소멸','대항력·우선변제 임차인','위험 물건 사례 스터디'],files:['권리분석 워크북(PDF)','사례 50선 자료집']}},
  {id:'mmoh-field',title:'현장 임장 마스터 · 발품 전략',tag:'현장',price:450000,lead:'임장 동선 설계부터 명도 협상까지, 발로 뛰는 노하우를 담았습니다.',intro:'좋은 물건은 현장에서 확인됩니다.',grad:'linear-gradient(135deg,#CFE3D2,#5B9E72)',tags:['현장','임장','명도 협상'],cohort:{no:1,status:'모집중',period:'2026.07.19 ~ 08.16',deadline:'2026.07.14',seats:20,enrolled:9},requirement:{label:'권리분석 실전반 수강 이력 필요'},content:{videos:['임장 준비와 동선 설계','현장 체크포인트','명도 시나리오 작성','협상 롤플레잉 + 현장 동행'],files:['임장 체크리스트(PDF)','명도 합의서 양식']}}
];
const publicClassProducts=publicProducts.filter(product=>!product.includedProductIds);
function classShortTitle(title){return (title||'').split(' · ')[0];}
function shortPeriod(period){return (period||'').replace(/^2026\./,'');}
const classes=publicClassProducts.map(product=>({
  id:product.id,
  title:product.title,
  cohort:`${product.cohort?.no||1}기`,
  status:product.cohort?.status||'모집중',
  period:shortPeriod(product.cohort?.period||''),
  students:product.cohort?.enrolled||0,
  seats:product.cohort?.seats||0,
  price:product.price,
  color:product.grad,
  lead:product.lead,
  intro:product.intro,
  tags:product.tags||[],
  content:product.content||{videos:[],files:[]},
  faq:product.faq||[]
}));
// 학습 콘텐츠는 판매 클래스와 독립적으로 관리되며 여러 클래스가 같은 항목을 참조할 수 있습니다.
const lectureContents=publicCreator?.lectureContents?.map(item=>{
  const source=publicClassProducts.find(product=>product.contentIds?.includes(item.id))||{};
  return {...item,color:source.grad||'linear-gradient(135deg,#DCE3FF,#AFC0FF)',intro:item.description,tags:source.tags||[]};
})||classes;

const students=[
  {name:'김지훈',email:'jihoon.kim@email.com',phone:'010-2384-1129',access:'기초 수강',history:'기초 수강 중',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'3기',paid:'290,000원',period:'2026.07.05 ~ 08.02',joined:'06.29',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.07.05 ~ 08.02',purchased:'2026.06.29',status:'수강 중'}]},
  {name:'이서연',email:'seoyeon.lee@email.com',phone:'010-5418-9032',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.29',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.05.05 ~ 06.02',purchased:'2026.04.29',status:'수강 종료'},{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.29',status:'수강 중'}]},
  {name:'박민수',email:'minsu.park@email.com',phone:'010-8731-2465',access:'기초 수강',history:'기초 수강 중',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'3기',paid:'290,000원',period:'2026.07.05 ~ 08.02',joined:'06.28',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.07.05 ~ 08.02',purchased:'2026.06.28',status:'수강 중'}]},
  {name:'정유진',email:'yujin.jung@email.com',phone:'010-6904-3518',access:'스터디 참여',history:'기초 완료 · 심화 완료',course:'땅부자 루틴클럽',recentProduct:'땅부자 루틴클럽 8월',cohort:'8월',paid:'99,000원',period:'2026.08.01 ~ 08.31',joined:'06.28',state:'수강 대기',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.03.05 ~ 04.02',purchased:'2026.02.26',status:'수강 종료'},{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.05.12 ~ 06.09',purchased:'2026.04.30',status:'수강 종료'},{product:'땅부자 루틴클럽 8월',className:'땅부자 루틴클럽',paid:'99,000원',period:'2026.08.01 ~ 08.31',purchased:'2026.06.28',status:'수강 대기'}]},
  {name:'최현우',email:'hyunwoo.choi@email.com',phone:'010-4520-7781',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.27',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.05.05 ~ 06.02',purchased:'2026.04.27',status:'수강 종료'},{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.27',status:'수강 중'}]}
];
students.push(
  {name:'한도윤',email:'doyoon.han@email.com',phone:'010-3357-9180',access:'기초 수강',history:'기초 수강 중',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'3기',paid:'290,000원',period:'2026.07.05 ~ 08.02',joined:'06.26',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.07.05 ~ 08.02',purchased:'2026.06.26',status:'수강 중'}]},
  {name:'서민재',email:'minjae.seo@email.com',phone:'010-7271-5408',access:'기초 수강',history:'기초 완료',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'2기',paid:'290,000원',period:'2026.05.05 ~ 06.02',joined:'05.01',state:'수강 종료',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.05.05 ~ 06.02',purchased:'2026.05.01',status:'수강 종료'}]},
  {name:'오하린',email:'harin.oh@email.com',phone:'010-8840-1263',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.25',state:'수강 중',products:[{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.25',status:'수강 중'}]},
  {name:'문태오',email:'taeo.moon@email.com',phone:'010-6104-7729',access:'스터디 참여',history:'기초 완료 · 심화 완료',course:'땅부자 루틴클럽',recentProduct:'땅부자 루틴클럽 8월',cohort:'8월',paid:'99,000원',period:'2026.08.01 ~ 08.31',joined:'06.24',state:'수강 대기',products:[{product:'땅부자 루틴클럽 8월',className:'땅부자 루틴클럽',paid:'99,000원',period:'2026.08.01 ~ 08.31',purchased:'2026.06.24',status:'수강 대기'}]},
  {name:'강서아',email:'seoa.kang@email.com',phone:'010-4927-6501',access:'심화 수강',history:'기초 완료 · 심화 수강 중',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.23',state:'수강 중',products:[{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.23',status:'수강 중'}]},
  {name:'윤재원',email:'jaewon.yoon@email.com',phone:'010-9762-1184',access:'기초 수강',history:'수강 종료',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'1기',paid:'290,000원',period:'2026.03.05 ~ 04.02',joined:'03.01',state:'수강 종료',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.03.05 ~ 04.02',purchased:'2026.03.01',status:'수강 종료'}]},
  {name:'배수빈',email:'subin.bae@email.com',phone:'010-3088-4276',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.22',state:'수강 중',products:[{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.22',status:'수강 중'}]}
);

const studentPageSize=10;
let studentCurrentPage=1;

const won=n=>'₩'+Number(n).toLocaleString('ko-KR');
const dashboardToday=new Date(2026,6,9);

function dashboardClassState(period){
  const [startText,endText]=period.split('~').map(item=>item.trim());
  const [startMonth,startDay]=startText.split('.').map(Number);
  const [endMonth,endDay]=endText.split('.').map(Number);
  const start=new Date(2026,startMonth-1,startDay);
  const end=new Date(2026,endMonth-1,endDay);
  if(dashboardToday<start)return {label:'시작 예정',className:'soon'};
  if(dashboardToday>end)return {label:'종료',className:'ended'};
  return {label:'운영중',className:'open'};
}

function pageHeader(kicker,title,desc,actions=''){
  return `<div class="admin-page-head"><div><span>${kicker}</span><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;
}

function renderDashboard(){
  return `${pageHeader('2026년 7월 9일 목요일','안녕하세요, 애매모홈님 👋','강의 콘텐츠와 클래스 운영 현황을 한눈에 확인하세요.','<button class="btn ghost" onclick="adminToast(\'미리보기 페이지를 엽니다\')">내 페이지 보기 ↗</button>')}
    <section class="metric-grid three">
      <article class="metric-card"><div class="metric-icon blue">💸</div><span>이번 달 매출</span><strong>₩18,420,000</strong></article>
      <article class="metric-card"><div class="metric-icon violet">👥</div><span>전체 수강생</span><strong>48명</strong></article>
      <article class="metric-card"><div class="metric-icon green">🏫</div><span>등록 클래스</span><strong>3개</strong></article>
    </section>

    <section class="dashboard-grid single">

      <article class="panel cohort-panel">
        <div class="panel-head"><div><h2>강의 콘텐츠</h2><p>재사용 가능한 영상·자료 커리큘럼을 관리합니다.</p></div><button class="text-btn" onclick="showAdminView('classes')">전체 보기 →</button></div>
        <div class="cohort-list">${lectureContents.slice(0,3).map(c=>`<button onclick="openClassEditor('edit','${c.id}')"><span class="cohort-color" style="background:${c.color}"></span><span class="cohort-info"><b>${classShortTitle(c.title)} 커리큘럼</b><small>${linkedClassCount(c.id)}개 클래스에서 사용 중</small></span></button>`).join('')}</div>
      </article>
    </section>

    <section class="dashboard-grid lower single">
      <article class="panel recent-panel">
        <div class="panel-head"><div><h2>최근 수강 신청</h2><p>새로 결제한 수강생</p></div><button class="text-btn" onclick="showAdminView('students')">전체 보기 →</button></div>
        ${studentTable(students.slice(0,4),true)}
      </article>
    </section>`;
}

function renderClasses(){
  return `${pageHeader('Lecture content','강의 콘텐츠','수강생에게 제공되는 영상, 자료, 강의 순서와 설명을 관리합니다. 등록한 콘텐츠는 여러 클래스에서 재사용할 수 있습니다.','<button class="btn primary" onclick="openClassEditor(\'create\')">+ 새 강의 콘텐츠</button>')}
  <div class="class-admin-grid">${lectureContents.map(c=>`<article class="admin-class-card lecture-content-card" role="button" tabindex="0" onclick="openClassEditor('edit','${c.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openClassEditor('edit','${c.id}')}" aria-label="${classShortTitle(c.title)} 강의 콘텐츠 관리"><div class="class-card-body"><div class="class-card-top"><h2>${classShortTitle(c.title)} 커리큘럼</h2><div class="class-card-menu"><button type="button" aria-label="강의 콘텐츠 메뉴" onclick="toggleClassMenu(event,'${c.id}')">&#8942;</button><div class="class-card-menu-pop" id="class-menu-${c.id}" onclick="event.stopPropagation()"><button type="button" onclick="openClassEditor('edit','${c.id}')">수정</button><button type="button" class="danger" onclick="adminToast('삭제는 운영팀 확인 후 진행됩니다')">삭제</button></div></div></div><p>${c.intro||'영상과 자료로 구성된 학습 콘텐츠입니다.'}</p><div class="lecture-content-stats"><span><b>${c.content?.videos?.length||0}</b> 영상</span><span><b>${c.content?.files?.length||0}</b> 자료</span><span><b>${linkedClassCount(c.id)}</b> 연결 클래스</span></div></div></article>`).join('')}</div>`;
}

function openClassPreview(classId=''){
  const id=classId||'mmoh-basic',modal=document.getElementById('classPreviewModal'),frame=document.getElementById('classPreviewFrame');
  frame.src='./index.html#/p/'+id;
  modal.classList.add('show');
  document.body.classList.add('preview-open');
  if(!classId)adminToast('새 클래스 미리보기를 엽니다');
}
function closeClassPreview(){
  const modal=document.getElementById('classPreviewModal'),frame=document.getElementById('classPreviewFrame');
  modal?.classList.remove('show');
  document.body.classList.remove('preview-open');
  if(frame)frame.src='about:blank';
}

function toggleClassMenu(event,id){
  event.stopPropagation();
  document.querySelectorAll('.class-card-menu-pop').forEach(menu=>{if(menu.id!=='class-menu-'+id)menu.classList.remove('show');});
  document.getElementById('class-menu-'+id)?.classList.toggle('show');
}
document.addEventListener('click',()=>document.querySelectorAll('.class-card-menu-pop.show').forEach(menu=>menu.classList.remove('show')));

function renderClassEditor(mode='create',classId=''){
  const editing=mode==='edit',course=lectureContents.find(c=>c.id===classId)||{};
  const contentName=editing?`${classShortTitle(course.title)} 커리큘럼`:'';
  const curriculum=editing&&course.content?.videos?.length?course.content.videos:[''];
  const materials=editing&&course.content?.files?.length?course.content.files:[];
  return `<form class="class-editor" onsubmit="saveClassForm(event,'${mode}')">
    <div class="editor-head"><button type="button" class="editor-back" onclick="showAdminView('classes')">← 강의 콘텐츠</button><div><span>${editing?'Lecture content editing':'New lecture content'}</span><h1>${editing?'강의 콘텐츠 수정':'새 강의 콘텐츠'}</h1><p>영상·자료와 강의 순서를 관리합니다. 이 콘텐츠를 연결한 모든 클래스에서 동일하게 사용됩니다.</p></div><div class="editor-actions"><button type="submit" class="btn primary">강의 콘텐츠 저장</button></div></div>
    <div class="editor-layout">
      <nav class="editor-steps"><button type="button" class="active" onclick="scrollEditorSection('editor-content-info',this)"><i>1</i><span>기본 정보<small>제목·설명</small></span></button><button type="button" onclick="scrollEditorSection('editor-content',this)"><i>2</i><span>영상·자료<small>순서·업로드</small></span></button></nav>
      <div class="editor-sections">
        <section class="panel editor-section" id="editor-content-info"><div class="editor-section-head"><i>1</i><div><h2>강의 콘텐츠 정보</h2><p>관리자에서 콘텐츠를 구분할 제목과 설명을 입력합니다.</p></div><span>제목 필수</span></div><div class="editor-fields"><label class="wide">콘텐츠 제목 <em>*</em><input required maxlength="80" value="${contentName}" placeholder="예: 경매 기초 커리큘럼"><small>수강생 판매 화면에는 클래스명이 표시되며, 이 제목은 관리자용입니다. 클래스명은 클래스 관리에서 클래스를 선택하면 확인할 수 있습니다.</small></label><label class="wide">콘텐츠 설명 <em class="optional">선택</em><textarea placeholder="이 커리큘럼의 학습 목표와 구성 특징을 적어주세요.">${editing?(course.intro||''):''}</textarea></label></div></section>

        <section class="panel editor-section" id="editor-content"><div class="editor-section-head"><i>2</i><div><h2>영상·자료</h2><p>수강생에게 제공할 영상 순서와 다운로드 자료를 구성합니다.</p></div><span>영상 필수 · 자료 선택</span></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>영상 커리큘럼</h3><p>1개 이상의 영상이 필요합니다. 제목과 설명을 입력하고 영상 파일을 업로드하세요.</p></div><span id="curriculumCount">${curriculum.length}강 · 필수</span></div><div class="repeat-list" id="curriculumRows">${curriculum.map((item,i)=>curriculumRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addCurriculumRow()">＋ 강의 추가</button></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>제공 자료</h3><p>선택 항목입니다. 필요한 경우 자료 제목과 설명을 입력하고 파일을 업로드하세요.</p></div><span id="materialCount">${materials.length}개 · 선택</span></div><div class="repeat-list" id="materialRows">${materials.map((item,i)=>materialRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addMaterialRow()">＋ 자료 추가</button></div></section>
      </div>
    </div>
    <div class="editor-bottom-bar"><span><b>${editing?contentName:'새 강의 콘텐츠'}</b><small>영상 순서와 자료를 확인한 뒤 저장해 주세요.</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('classes')">취소</button><button type="submit" class="btn primary">강의 콘텐츠 저장</button></div></div>
  </form>`;
}

function curriculumRow(index,value=''){return `<div class="repeat-row curriculum-row"><div class="curriculum-row-head"><em>${index}강</em><input class="curriculum-title" required value="${value}" placeholder="강의 제목을 입력하세요"><div class="input-suffix duration"><input class="video-duration" type="number" readonly placeholder="자동"><span>분</span></div><button type="button" class="remove-row" onclick="removeEditorRow(this,'curriculumRows','curriculumCount','강')">×</button></div><textarea class="curriculum-description" placeholder="강의에서 다루는 내용을 간단히 설명해 주세요."></textarea><label class="video-upload"><input type="file" accept="video/mp4,video/quicktime,video/webm" onchange="handleCurriculumVideo(this)"><span><b>영상 파일 업로드</b><small>MP4, MOV, WebM · 강의당 최대 2GB</small></span><em class="video-file-status">파일을 선택해 주세요</em></label><div class="video-preview-link" hidden><span>선택한 영상</span><a href="#" target="_blank" rel="noopener">미리보기</a></div></div>`;}
function clearCurriculumVideoPreview(row){
  if(row?.dataset.videoPreviewUrl)URL.revokeObjectURL(row.dataset.videoPreviewUrl);
  if(row)delete row.dataset.videoPreviewUrl;
  const preview=row?.querySelector('.video-preview-link'),link=preview?.querySelector('a');
  if(link){link.removeAttribute('href');link.textContent='미리보기';}
  if(preview)preview.hidden=true;
}
function handleCurriculumVideo(input){
  const file=input.files&&input.files[0],row=input.closest('.curriculum-row'),status=row.querySelector('.video-file-status'),durationInput=row.querySelector('.video-duration'),preview=row.querySelector('.video-preview-link'),previewLink=preview.querySelector('a');
  if(!file)return;
  clearCurriculumVideoPreview(row);
  const maxSize=2*1024*1024*1024;
  if(file.size>maxSize){input.value='';status.textContent='용량 초과 · 최대 2GB';status.classList.add('error');durationInput.value='';adminToast('영상은 강의당 최대 2GB까지 업로드할 수 있습니다');return;}
  status.classList.remove('error');status.textContent=file.name+' · 영상 정보를 확인하는 중';
  const video=document.createElement('video'),url=URL.createObjectURL(file);
  row.dataset.videoPreviewUrl=url;
  previewLink.href=url;
  previewLink.textContent=`${file.name} 미리보기 ↗`;
  preview.hidden=false;
  video.preload='metadata';
  video.onloadedmetadata=()=>{durationInput.value=Math.max(1,Math.ceil(video.duration/60));status.textContent=file.name+' · '+formatFileSize(file.size);};
  video.onerror=()=>{status.textContent=file.name+' · 재생시간을 확인하지 못했습니다';clearCurriculumVideoPreview(row);};
  video.src=url;
}
function formatFileSize(bytes){return bytes>=1024*1024*1024?(bytes/(1024*1024*1024)).toFixed(1)+'GB':Math.max(1,Math.round(bytes/(1024*1024)))+'MB';}
function materialRow(index,value=''){return `<div class="repeat-row material material-card"><div class="material-row-head"><em>${index}</em><input class="material-title" value="${value}" placeholder="자료 제목을 적어주세요"><button type="button" class="remove-row" onclick="removeEditorRow(this,'materialRows','materialCount','개')">×</button></div><textarea class="material-description" placeholder="자료 설명을 적어주세요"></textarea><label class="material-upload"><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png" onchange="handleMaterialFile(this)"><span><b>자료 파일 업로드</b><small>PDF, 문서, 이미지, ZIP · 자료당 최대 50MB</small></span><em class="material-file-status">파일을 선택해 주세요</em></label></div>`;}
function faqEditorRow(index,faq={q:'',a:''}){return `<div class="repeat-row faq-editor-row"><em>${index}</em><textarea class="faq-question" placeholder="질문을 입력하세요">${faq.q||''}</textarea><textarea placeholder="답변을 입력하세요">${faq.a||''}</textarea><button type="button" class="remove-row" onclick="removeEditorRow(this,'faqRows','faqCount','개')">×</button></div>`;}
function handleMaterialFile(input){
  const file=input.files&&input.files[0],row=input.closest('.material-card'),status=row.querySelector('.material-file-status');
  if(!file)return;
  const maxSize=50*1024*1024;
  if(file.size>maxSize){input.value='';status.textContent='용량 초과 · 최대 50MB';status.classList.add('error');adminToast('자료는 파일당 최대 50MB까지 업로드할 수 있습니다');return;}
  status.classList.remove('error');status.textContent=file.name+' · '+formatFileSize(file.size);
}

function addCurriculumRow(){const box=document.getElementById('curriculumRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',curriculumRow(count));document.getElementById('curriculumCount').textContent=count+'강 · 필수';}
function addMaterialRow(){const box=document.getElementById('materialRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',materialRow(count));document.getElementById('materialCount').textContent=count+'개 · 선택';}
function addFaqRow(){const box=document.getElementById('faqRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',faqEditorRow(count));document.getElementById('faqCount').textContent=count+'개 · 선택';}
function removeEditorRow(button,listId,countId,suffix){const list=document.getElementById(listId);if(list.children.length===1&&!['materialRows','faqRows'].includes(listId)){adminToast('최소 1개 항목이 필요합니다');return;}const row=button.closest('.repeat-row');if(listId==='curriculumRows')clearCurriculumVideoPreview(row);row.remove();[...list.children].forEach((item,i)=>item.querySelector('em').textContent=suffix==='강'?`${i+1}강`:i+1);const qualifier=listId==='curriculumRows'?' · 필수':['materialRows','faqRows'].includes(listId)?' · 선택':'';document.getElementById(countId).textContent=list.children.length+suffix+qualifier;}
function scrollEditorSection(id,button){document.querySelectorAll('.editor-steps button').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});}

let activeEditorSession=null;
let pendingUnsavedNavigation=null;
let unsavedReturnFocus=null;
let unsavedRestoreHash=null;
function editorFormSnapshot(form){
  if(!form)return '';
  return JSON.stringify([...form.querySelectorAll('input,textarea,select,[contenteditable="true"]')].map(field=>{
    if(field.matches('[contenteditable="true"]'))return ['contenteditable',field.id,field.innerHTML];
    if(field.type==='file')return ['file',field.name||field.accept,[...(field.files||[])].map(file=>[file.name,file.size,file.lastModified])];
    if(field.type==='checkbox'||field.type==='radio')return [field.type,field.name,field.value,field.checked];
    return [field.tagName,field.name||field.id,field.value];
  }));
}
function beginEditorSession(form,label){
  activeEditorSession={form,label,hash:location.hash,baseline:editorFormSnapshot(form)};
}
function clearEditorSession(){
  activeEditorSession=null;
  pendingUnsavedNavigation=null;
  unsavedRestoreHash=null;
}
function hasUnsavedEditorChanges(){
  return !!(activeEditorSession?.form?.isConnected&&editorFormSnapshot(activeEditorSession.form)!==activeEditorSession.baseline);
}
function requestUnsavedChangesLeave(action,restoreHash=null){
  if(!hasUnsavedEditorChanges()){clearEditorSession();action();return true;}
  pendingUnsavedNavigation=action;
  unsavedRestoreHash=restoreHash;
  unsavedReturnFocus=document.activeElement;
  const modal=document.getElementById('unsavedChangesModal');
  const description=document.getElementById('unsavedChangesDescription');
  if(description)description.textContent=`지금 나가면 작성 중인 ${activeEditorSession.label} 내용이 저장되지 않습니다.`;
  modal?.classList.add('show');
  modal?.setAttribute('aria-hidden','false');
  document.body.classList.add('unsaved-modal-open');
  requestAnimationFrame(()=>document.getElementById('unsavedChangesStay')?.focus());
  return false;
}
function closeUnsavedChangesModal(){
  const modal=document.getElementById('unsavedChangesModal');
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden','true');
  document.body.classList.remove('unsaved-modal-open');
  pendingUnsavedNavigation=null;
  if(unsavedRestoreHash!==null)history.pushState(null,'',`${location.pathname}${location.search}${unsavedRestoreHash}`);
  unsavedRestoreHash=null;
  if(unsavedReturnFocus?.isConnected)unsavedReturnFocus.focus();
  unsavedReturnFocus=null;
}
function confirmUnsavedChangesLeave(){
  const action=pendingUnsavedNavigation;
  const modal=document.getElementById('unsavedChangesModal');
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden','true');
  document.body.classList.remove('unsaved-modal-open');
  unsavedRestoreHash=null;
  clearEditorSession();
  unsavedReturnFocus=null;
  if(action)action();
}
function runAdminNavigation(action,skipUnsavedCheck=false){
  if(skipUnsavedCheck){clearEditorSession();action();return true;}
  return requestUnsavedChangesLeave(action);
}

function showProductEditorStep(index,scrollToTop=false){
  const form=document.querySelector('.product-editor');
  if(!form)return;
  const panels=[...form.querySelectorAll('.product-step-panel')];
  const buttons=[...form.querySelectorAll('.product-editor-steps button[data-product-step]')];
  const nextIndex=Math.max(0,Math.min(Number(index)||0,panels.length-1));
  panels.forEach((panel,panelIndex)=>{
    const active=panelIndex===nextIndex;
    panel.hidden=!active;
    panel.classList.toggle('active',active);
  });
  buttons.forEach((button,buttonIndex)=>{
    const active=buttonIndex===nextIndex;
    button.classList.toggle('active',active);
    if(active)button.setAttribute('aria-current','step');
    else button.removeAttribute('aria-current');
  });
  form.dataset.activeProductStep=String(nextIndex);
  const current=form.querySelector('#productStepCurrent');
  if(current)current.textContent=`${nextIndex+1} / ${panels.length} · ${buttons[nextIndex]?.dataset.stepTitle||''}`;
  const previous=form.querySelector('#productStepPrevious');
  const next=form.querySelector('#productStepNext');
  if(previous)previous.disabled=nextIndex===0;
  if(next){next.disabled=nextIndex===panels.length-1;next.textContent=nextIndex===panels.length-1?'마지막 단계':'다음 단계 →';}
  if(scrollToTop)form.querySelector('.product-editor-steps')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function goProductEditorStep(offset){
  const form=document.querySelector('.product-editor');
  if(!form)return;
  showProductEditorStep((Number(form.dataset.activeProductStep)||0)+offset,true);
}
function validateProductEditorForm(form){
  const invalid=[...form.querySelectorAll(':invalid')].find(field=>!field.disabled);
  if(invalid){
    const panels=[...form.querySelectorAll('.product-step-panel')];
    const panel=invalid.closest('.product-step-panel');
    showProductEditorStep(Math.max(0,panels.indexOf(panel)),true);
    adminToast('필수 입력 항목을 확인해 주세요');
    requestAnimationFrame(()=>{invalid.focus();invalid.reportValidity();});
    return false;
  }
  return validateProductPeriodSettings(form);
}
function saveClassForm(event,mode){event.preventDefault();clearEditorSession();adminToast('강의 콘텐츠를 저장했습니다');setTimeout(()=>showAdminView('classes',true),700);}
function openClassEditor(mode,classId='',skipUnsavedCheck=false){runAdminNavigation(()=>{document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='classes'));document.getElementById('adminContent').innerHTML=renderClassEditor(mode,classId);window.scrollTo({top:0});location.hash=mode==='edit'?`#class-edit-${classId}`:'#class-new';beginEditorSession(document.querySelector('.class-editor'),'강의 콘텐츠');},skipUnsavedCheck);}

function studentAccessClass(access){
  if(access.includes('스터디'))return 'master';
  if(access.includes('심화'))return 'pro';
  if(access.includes('기초'))return 'challenger';
  return 'rookie';
}
function studentStateClass(state){
  if(state.includes('대기'))return 'waiting';
  if(state.includes('종료'))return 'done';
  return 'active';
}
function creatorStudentProducts(student){
  const creatorClasses=classes.map(course=>course.title.split(' · ')[0]);
  return (student.products||[]).filter(item=>creatorClasses.includes(item.className));
}
function publicProductTitle(name=''){
  const match=classes.find(course=>name.includes(classShortTitle(course.title)));
  if(!match)return name;
  return match.title;
}
function studentProductOptions(){
  return [...new Set(students.map(student=>publicProductTitle(student.recentProduct)).filter(Boolean))];
}
function getFilteredStudents(){
  const q=(document.getElementById('studentSearchInput')?.value||'').trim().toLowerCase();
  const productFilter=document.getElementById('studentProductFilter')?.value||'전체 최근 결제상품';
  const stateFilter=document.getElementById('studentStateFilter')?.value||'전체 상태';
  return students.filter(s=>{
    const displayProduct=publicProductTitle(s.recentProduct);
    const keyword=`${s.name} ${s.email} ${s.phone||''} ${s.history} ${s.course} ${displayProduct||''}`.toLowerCase();
    const matchesKeyword=keyword.includes(q);
    const matchesProduct=productFilter==='전체 최근 결제상품'||displayProduct===productFilter;
    const matchesState=stateFilter==='전체 상태'||s.state===stateFilter;
    return matchesKeyword&&matchesProduct&&matchesState;
  });
}
function studentTable(rows,compact=false){
  const emptyRow=`<tr><td class="empty-table-cell" colspan="${compact?4:5}">조건에 맞는 수강생이 없습니다.</td></tr>`;
  return `<div class="table-wrap"><table><thead><tr><th>이름</th>${compact?'':'<th>전화번호</th>'}<th>최근 결제 상품</th><th>수강기간</th><th>상태</th></tr></thead><tbody>${rows.length?rows.map(s=>`<tr class="student-row" role="button" tabindex="0" onclick="openStudentDetail('${s.email}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openStudentDetail('${s.email}')}"><td><div class="student-cell"><span>${s.name[0]}</span><div><b>${s.name}</b><small>${s.email}</small></div></div></td>${compact?'':`<td>${s.phone||'-'}</td>`}<td>${publicProductTitle(s.recentProduct)||s.course}</td><td>${s.period||'-'}</td><td><em class="table-state ${studentStateClass(s.state)}">${s.state}</em></td></tr>`).join(''):emptyRow}</tbody></table></div>`;
}
function studentStateSummary(){
  const states=['전체 상태','수강 대기','수강 중','수강 종료'];
  const active=document.getElementById('studentStateFilter')?.value||'전체 상태';
  return `<div class="student-state-tabs">${states.map(state=>{const count=state==='전체 상태'?students.length:students.filter(student=>student.state===state).length;return `<button type="button" class="${active===state?'active':''}" onclick="setStudentStateFilter('${state}')"><span>${state}</span><b>${count}명</b></button>`;}).join('')}</div>`;
}
function renderStudentTableSection(){
  const filtered=getFilteredStudents();
  const totalPages=Math.max(1,Math.ceil(filtered.length/studentPageSize));
  studentCurrentPage=Math.min(Math.max(1,studentCurrentPage),totalPages);
  const start=(studentCurrentPage-1)*studentPageSize;
  const pageRows=filtered.slice(start,start+studentPageSize);
  return `${studentTable(pageRows)}
    <div class="student-pagination"><span>${filtered.length?`${start+1}-${start+pageRows.length}`:'0'} / ${filtered.length}명</span><div><button type="button" onclick="goStudentPage(${studentCurrentPage-1})" ${studentCurrentPage===1?'disabled':''}>이전</button><em>${studentCurrentPage} / ${totalPages}</em><button type="button" onclick="goStudentPage(${studentCurrentPage+1})" ${studentCurrentPage===totalPages?'disabled':''}>다음</button></div></div>`;
}

function renderStudents(){
  return `${pageHeader('Student management','수강생 관리','수강생의 결제 클래스와 현재 수강 상태를 확인합니다.')}
  <input type="hidden" id="studentStateFilter" value="전체 상태">
  <section id="studentStateSummary">${studentStateSummary()}</section>
  <div class="student-table-toolbar"><div class="filter-bar"><div class="admin-search">⌕ <input id="studentSearchInput" placeholder="이름, 이메일, 상품 검색" oninput="filterStudents()"></div><select id="studentProductFilter" onchange="filterStudents()"><option>전체 최근 결제상품</option>${studentProductOptions().map(product=>`<option>${product}</option>`).join('')}</select></div></div>
  <article class="panel full-table" id="studentTable">${renderStudentTableSection()}</article>`;
}

function filterStudents(resetPage=true){
  if(resetPage)studentCurrentPage=1;
  const summary=document.getElementById('studentStateSummary');
  if(summary)summary.innerHTML=studentStateSummary();
  document.getElementById('studentTable').innerHTML=renderStudentTableSection();
}
function setStudentStateFilter(state){
  const filter=document.getElementById('studentStateFilter');
  if(filter)filter.value=state;
  filterStudents(true);
}
function goStudentPage(page){
  studentCurrentPage=page;
  filterStudents(false);
}

function openStudentDetail(email){
  const student=students.find(item=>item.email===email),modal=document.getElementById('studentDetailModal');
  if(!student||!modal)return;
  const histories=creatorStudentProducts(student);
  modal.innerHTML=`<div class="student-detail-backdrop" onclick="if(event.target===this)closeStudentDetailModal()">
    <section class="student-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="studentDetailTitle">
      <div class="student-detail-head"><div><span>수강생 상세</span><h2 id="studentDetailTitle">${student.name}</h2><p>${student.phone} · ${student.email}</p></div><button type="button" onclick="closeStudentDetailModal()" aria-label="닫기">×</button></div>
      <div class="student-detail-body">
        <div class="student-detail-summary"><div><span>최근 결제 상품</span><b>${publicProductTitle(student.recentProduct)||student.course}</b></div><div><span>현재 상태</span><em class="table-state ${studentStateClass(student.state)}">${student.state}</em></div><div><span>수강기간</span><b>${student.period||'-'}</b></div></div>
        <div class="student-history-head"><h3>결제 상품과 수강 클래스</h3><p>현재 크리에이터 채널의 클래스 이력만 표시합니다.</p></div>
        <div class="student-history-list">${histories.length?histories.map(item=>`<article><div><b>${publicProductTitle(item.product)}</b><small>${item.purchased} 결제 · ${item.className}</small></div><span>${item.paid}</span><span>${item.period}</span><em class="table-state ${studentStateClass(item.status)}">${item.status}</em></article>`).join(''):'<p class="empty-history">이 크리에이터의 수강 이력이 없습니다.</p>'}</div>
      </div>
    </section>
  </div>`;
  modal.classList.add('show');
}

let salesSelectedMonth='2026-06';
const salesMonthlyData={
  '2026-07':{label:'2026년 7월',settleDate:'2026년 8월 10일',refund:186000,rows:[{count:24,amount:6960000},{count:20,amount:7800000},{count:11,amount:4950000}]},
  '2026-06':{label:'2026년 6월',settleDate:'2026년 7월 10일',refund:273600,rows:[{count:21,amount:6090000},{count:18,amount:7020000},{count:9,amount:4050000}]},
  '2026-05':{label:'2026년 5월',settleDate:'2026년 6월 10일',refund:198000,rows:[{count:17,amount:4930000},{count:14,amount:5460000},{count:6,amount:2700000}]},
  '2026-04':{label:'2026년 4월',settleDate:'2026년 5월 10일',refund:0,rows:[{count:12,amount:3480000},{count:9,amount:3510000},{count:3,amount:1350000}]}
};
function setSalesMonth(month){salesSelectedMonth=month;showAdminView('sales');}
function salesClassStudents(classTitle){
  const className=classTitle.split(' · ')[0];
  return students.filter(student=>(student.products||[]).some(item=>item.className===className||student.course===className));
}
function salesClassRowData(classId){
  const index=classes.findIndex(item=>item.id===classId);
  const data=salesMonthlyData[salesSelectedMonth]||salesMonthlyData['2026-06'];
  return data.rows[index]||{count:0,amount:0};
}
function renderSalesClassStudents(classId){
  const course=classes.find(item=>item.id===classId);
  if(!course)return renderSales();
  const data=salesMonthlyData[salesSelectedMonth]||salesMonthlyData['2026-06'];
  const className=course.title.split(' · ')[0];
  const rows=salesClassStudents(course.title);
  const row=salesClassRowData(classId);
  const payout=row.amount-Math.round(row.amount*.12);
  return `${pageHeader('Sales detail','클래스 결제 수강생','선택한 클래스의 월별 결제 수강생을 확인합니다.','<button class="btn ghost" onclick="showAdminView(\'sales\')">← 매출·정산으로 돌아가기</button>')}
  <section class="sales-detail-head panel"><div><span>${data.label}</span><h2>${className}</h2><p>${course.title}</p></div><div class="sales-detail-metrics"><article><span>결제 건수</span><strong>${row.count}건</strong></article><article><span>총 매출</span><strong>${won(row.amount)}</strong></article><article><span>정산 예정</span><strong>${won(payout)}</strong></article></div></section>
  <article class="panel full-table sales-student-page"><div class="panel-head"><div><h2>결제 수강생</h2><p>${data.label} 결제 완료 기준</p></div></div><div class="table-wrap"><table><thead><tr><th>이름</th><th>전화번호</th><th>최근 결제 상품</th><th>결제일</th><th>수강기간</th><th>상태</th></tr></thead><tbody>${rows.length?rows.map(student=>{const item=(student.products||[]).find(product=>product.className===className)||student.products?.[0]||{};return `<tr class="student-row" role="button" tabindex="0" onclick="openStudentDetail('${student.email}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openStudentDetail('${student.email}')}"><td><div class="student-cell"><span>${student.name[0]}</span><div><b>${student.name}</b><small>${student.email}</small></div></div></td><td>${student.phone||'-'}</td><td>${publicProductTitle(item.product||student.recentProduct)||student.course}</td><td>${item.purchased||student.joined||'-'}</td><td>${item.period||student.period||'-'}</td><td><em class="table-state ${studentStateClass(item.status||student.state)}">${item.status||student.state}</em></td></tr>`;}).join(''):'<tr><td colspan="6" class="empty-table">표시할 결제 수강생이 없습니다.</td></tr>'}</tbody></table></div></article>`;
}
function openSalesClassStudents(classId){
  document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='sales'));
  document.getElementById('adminContent').innerHTML=renderSalesClassStudents(classId);
  window.scrollTo({top:0});
  location.hash=`#sales-class-${classId}`;
}
function renderSales(){
  const data=salesMonthlyData[salesSelectedMonth]||salesMonthlyData['2026-06'];
  const gross=data.rows.reduce((sum,row)=>sum+row.amount,0);
  const payout=Math.max(0,Math.round((gross-data.refund)*.88));
  const monthSelect=`<select class="sales-month-select" aria-label="조회 월" onchange="setSalesMonth(this.value)">${Object.entries(salesMonthlyData).map(([value,item])=>`<option value="${value}" ${value===salesSelectedMonth?'selected':''}>${item.label}</option>`).join('')}</select>`;
  return `${pageHeader('Sales & payout','매출·정산','월별 매출과 정산 예정 금액을 확인합니다.',`${monthSelect}<button class="btn ghost" onclick="openSettingsPanel('payout')">정산 계좌 관리</button>`)}
  <section class="payout-hero"><div><span>${data.label} 정산 예정 금액</span><strong>${won(payout)}</strong><p>${data.settleDate} 입금 예정 · 환불·취소 반영 후</p></div></section>
  <section class="metric-grid two"><article class="metric-card"><span>${data.label} 총 결제</span><strong>${won(gross)}</strong></article><article class="metric-card"><span>환불·취소</span><strong>${won(data.refund)}</strong></article></section>
  <article class="panel payout-table"><div class="panel-head"><div><h2>클래스별 매출</h2><p>${data.label} 결제 완료 기준</p></div></div><table><thead><tr><th>클래스</th><th>결제 건수</th><th>총 매출</th><th>정산 예정</th></tr></thead><tbody>${classes.map((c,i)=>{const row=data.rows[i]||{count:0,amount:0},fee=Math.round(row.amount*.12);return `<tr class="sales-class-row" role="button" tabindex="0" onclick="openSalesClassStudents('${c.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openSalesClassStudents('${c.id}')}"><td><b>${c.title}</b><small>클릭하면 결제 수강생 상세로 이동합니다.</small></td><td>${row.count}건</td><td>${won(row.amount)}</td><td><strong>${won(row.amount-fee)}</strong></td></tr>`;}).join('')}</tbody></table></article>`;
}

const alimtalkProductSettings=[
  {id:'mmoh-basic',name:'경매 낙찰 기초반 · 4주 완성',summary:'단일 클래스 · 2026.07.05 ~ 08.02',items:[
    {id:'onboarding',name:'수강 준비 안내',trigger:'결제 완료 후 5분 이내',enabled:true,status:'작성 중',statusClass:'draft',templateCode:'미등록',content:`안녕하세요, #{수강생명}님.\n#{상품명} 신청이 완료되었습니다.\n수강 전 준비사항을 확인해 주세요.\n\n1. 커뮤니티 참여\n2. 필수 준비사항 확인\n3. 제출/신청 폼 작성\n4. 첫 모임 일정 확인\n\n문의 안내가 함께 발송됩니다.`,button:'수강 준비사항 확인'},
    {id:'start',name:'강의 시작 안내',trigger:'강의 시작 당일 · 오전 10시',enabled:true,status:'승인 대기',statusClass:'pending',templateCode:'검수 중',content:`#{수강생명}님, 오늘 #{클래스명} 강의가 시작됩니다.\n시작일: #{강의시작일}\n준비 사항을 내 학습에서 확인해 주세요.`,button:'수강 안내 확인'},
    {id:'schedule',name:'일정 안내',trigger:'일정 당일 · 오전 10시',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, 오늘 #{클래스명} 일정이 있습니다.\n일시: #{일정}\n자세한 내용은 아래 버튼에서 확인해 주세요.`,button:'일정 확인'},
    {id:'end',name:'강의 종료 안내',trigger:'강의 종료 7일 전 · 오전 10시',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, #{클래스명} 수강 기간이 곧 종료됩니다.\n종료일: #{강의종료일}\n남은 강의와 자료를 확인해 주세요.`,button:'내 학습 확인'}
  ]},
  {id:'mmoh-right',name:'권리분석 실전반 · 위험물건 거르기',summary:'심화 클래스 · 2026.07.12 ~ 08.09',items:[
    {id:'onboarding',name:'수강 준비 안내',trigger:'결제 완료 후 5분 이내',enabled:true,status:'승인 완료',statusClass:'approved',templateCode:'NHZ_RIGHTS_READY_001',content:`#{수강생명}님, #{상품명} 결제가 완료되었습니다.\n권리분석 실전반 수강 전 준비 자료를 내 학습에서 확인해 주세요.`,button:'준비 자료 확인'},
    {id:'start',name:'강의 시작 안내',trigger:'강의 시작 당일 · 오전 10시',enabled:true,status:'승인 완료',statusClass:'approved',templateCode:'NHZ_START_001',content:`#{수강생명}님, 오늘 #{클래스명} 강의가 시작됩니다.\n시작일: #{강의시작일}\n내 학습에서 강의와 자료를 확인해 주세요.`,button:'내 학습 바로가기'},
    {id:'schedule',name:'일정 안내',trigger:'일정 당일 · 오전 10시',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, 오늘 #{클래스명} 일정이 있습니다.\n일시: #{일정}`,button:'일정 확인'},
    {id:'end',name:'강의 종료 안내',trigger:'강의 종료 7일 전 · 오전 10시',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, #{클래스명} 수강 기간이 곧 종료됩니다.\n종료일: #{강의종료일}`,button:'내 학습 확인'}
  ]},
  {id:'mmoh-field',name:'현장 임장 마스터 · 발품 전략',summary:'현장 클래스 · 2026.07.19 ~ 08.16',items:[
    {id:'onboarding',name:'수강 준비 안내',trigger:'결제 완료 후 5분 이내',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, #{상품명} 신청을 환영합니다.\n수강 전 준비 사항을 이곳에 작성해 주세요.`,button:'수강 준비 확인'},
    {id:'start',name:'강의 시작 안내',trigger:'강의 시작 당일 · 오전 10시',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, 오늘 #{클래스명} 강의가 시작됩니다.\n시작일: #{강의시작일}`,button:'수강 안내 확인'},
    {id:'schedule',name:'일정 안내',trigger:'일정 당일 · 오전 10시',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, 오늘 #{클래스명} 일정이 있습니다.\n일시: #{일정}`,button:'일정 확인'},
    {id:'end',name:'강의 종료 안내',trigger:'강의 종료 7일 전 · 오전 10시',enabled:false,status:'작성 전',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, #{클래스명} 수강 기간이 곧 종료됩니다.\n종료일: #{강의종료일}`,button:'내 학습 확인'}
  ]}
];
function alimtalkEditableFields(template){
  if(template.id==='onboarding')return [
    '<div class="alimtalk-variable-row"><label>#{안내항목1제목}<input placeholder="예: 참여 링크"></label><label>#{안내항목1내용}<input placeholder="링크 또는 안내 문구"></label></div>',
    '<div class="alimtalk-variable-row"><label>#{안내항목2제목}<input placeholder="예: 준비사항"></label><label>#{안내항목2내용}<input placeholder="링크 또는 안내 문구"></label></div>',
    '<div class="alimtalk-variable-row"><label>#{안내항목3제목}<input placeholder="예: 신청 폼"></label><label>#{안내항목3내용}<input placeholder="링크 또는 안내 문구"></label></div>',
    '<div class="alimtalk-variable-row"><label>#{안내항목4제목}<input placeholder="예: 일정 안내"></label><label>#{안내항목4내용}<input placeholder="일정 또는 안내 문구"></label></div>',
    '<label class="wide">#{문의안내}<input value="궁금한 점은 안내된 채널로 남겨 주세요."></label>',
    '<label>버튼 이름<input value="'+template.button+'"></label>',
    '<label>버튼 연결<select onchange="toggleAlimtalkDirectLink(this)"><option value="direct">직접 입력한 링크</option><option value="learning">내 학습 페이지</option></select></label>',
    '<label class="wide alimtalk-direct-link-field">직접 입력 링크<input type="url" placeholder="https://example.com"></label>'
  ];
  if(template.id==='start')return [
    '<label>#{강의시작일}<input value="#{강의시작일}"></label>',
    '<label>버튼 이름<input value="'+template.button+'"></label>',
    '<label class="wide">#{추가안내}<input value="준비 사항을 내 학습에서 확인해 주세요."></label>'
  ];
  if(template.id==='schedule')return [
    '<label>#{일정명}<input value="첫 모임 안내"></label>',
    '<label>#{일정일시}<input value="#{일정}"></label>',
    '<label>버튼 이름<input value="'+template.button+'"></label>',
    '<label>버튼 연결<select onchange="toggleAlimtalkDirectLink(this)"><option value="direct">직접 입력한 링크</option><option value="learning">내 학습 페이지</option></select></label>',
    '<label class="wide alimtalk-direct-link-field">직접 입력 링크<input type="url" placeholder="https://example.com"></label>'
  ];
  return [
    '<label>#{강의종료일}<input value="#{강의종료일}"></label>',
    '<label>버튼 이름<input value="'+template.button+'"></label>',
    '<label class="wide">#{추가안내}<input value="남은 강의와 자료를 확인해 주세요."></label>'
  ];
}
function alimtalkTemplatePreview(template){
  if(template.id==='onboarding')return '안녕하세요, #{수강생명}님.\n#{상품명} 신청이 완료되었습니다.\n수강 전 안내를 확인해 주세요.\n\n1. #{안내항목1제목}: #{안내항목1내용}\n2. #{안내항목2제목}: #{안내항목2내용}\n3. #{안내항목3제목}: #{안내항목3내용}\n4. #{안내항목4제목}: #{안내항목4내용}\n\n#{문의안내}';
  if(template.id==='start')return '#{수강생명}님, 오늘 #{클래스명} 강의가 시작됩니다.\n시작일: #{강의시작일}\n#{추가안내}';
  if(template.id==='schedule')return '#{수강생명}님, #{클래스명} 일정이 있습니다.\n일정명: #{일정명}\n일시: #{일정일시}';
  return '#{수강생명}님, #{클래스명} 수강 기간이 곧 종료됩니다.\n종료일: #{강의종료일}\n#{추가안내}';
}
function alimtalkFilledExample(template){
  if(template.id==='onboarding')return '안녕하세요, 김노하우님.\n경매입문반 신청이 완료되었습니다.\n수강 전 안내를 확인해 주세요.\n\n1. 닉네임 변경: 본인 이름으로 닉네임을 변경해 주세요.\n2. 네이버 카페 가입 (필수): 강의 수강을 위해 반드시 가입이 필요합니다.\n링크: https://cafe.naver.com/mmohome\n3. 탱크옥션 가입 + 정보 제출 (필수): 경매 사이트 2개월 무료 이용을 위해 진행해 주세요.\n탱크옥션 가입: https://www.tankauction.com/\n정보 제출: https://walla.my/v/cP4iFiDGfiq81DaQKoah\n4. OT(오리엔테이션) 안내: 7/1(수) 오후 9시 (약 20분)\n\n위 2, 3번은 OT 모임 전까지 반드시 완료 부탁드립니다.\nZoom 링크는 시작 10분 전 카톡방에 공지됩니다.\n참석이 어려운 경우 녹화본이 제공됩니다.';
  if(template.id==='start')return '안녕하세요, 김노하우님.\n오늘 경매입문반 강의가 시작됩니다.\n시작일: 7/1(수)\n준비 사항을 내 학습에서 확인해 주세요.';
  if(template.id==='schedule')return '안녕하세요, 김노하우님.\n경매입문반 일정이 있습니다.\n일정명: OT 안내\n일시: 7/1(수) 오후 9시';
  return '안녕하세요, 김노하우님.\n경매입문반 수강 기간이 곧 종료됩니다.\n종료일: 8/2(일)\n남은 강의와 자료를 확인해 주세요.';
}
function alimtalkExampleMarkup(template){
  return '<div class="alimtalk-example-block"><b>입력값 미리보기</b><p>'+alimtalkFilledExample(template).replace(/\n/g,'<br>')+'</p></div>';
}

function settingsPanelMarkup(panel){
  if(panel==='payout') return `<div class="settings-grid"><form class="panel settings-form" onsubmit="event.preventDefault();adminToast('정산 정보를 저장했습니다')"><div class="settings-section-title"><div><span>PAYOUT</span><h2>정산 정보</h2><p>매출 정산을 받을 계좌와 사업자 정보를 관리합니다.</p></div><em>확인 완료</em></div><div class="settings-fields two"><label>예금주<input value="애매모홈"></label><label>은행<select><option>국민은행</option></select></label><label class="wide">계좌번호<input value="123-456-789012"></label><label class="wide">정산 이메일<input value="creator@mmoh.kr"></label></div><div class="settings-save"><small>정산 정보는 정산일 7일 전까지 변경해야 합니다. 이후 변경은 주식회사 위이에 직접 요청해 주세요.</small><button class="btn primary" type="submit">정산 정보 저장</button></div></form><aside class="panel settings-help"><span>다음 정산</span><strong>7월 10일</strong><p>예정 금액 ₩15,936,000</p><button type="button" onclick="showAdminView('sales')">매출·정산 보기</button></aside></div>`;
  return `<div class="settings-grid"><form class="panel settings-form settings-profile-form" onsubmit="event.preventDefault();adminToast('채널 정보를 저장했습니다')"><div class="settings-section-title"><div><span>PUBLIC CHANNEL</span><h2>공개 채널 정보</h2><p>크리에이터 페이지에 노출되는 프로필과 소개를 관리합니다.</p></div></div><div class="settings-profile-top"><div class="settings-avatar">${houseMark(72)}<div><b>프로필 이미지</b><small>권장 크기 400 × 400px</small><button type="button">이미지 변경</button></div></div></div><div class="settings-cover-picker"><div><b>프로필 배경색</b><small>크리에이터 공개 페이지 상단에 적용됩니다.</small></div><div class="settings-color-options"><button type="button" class="active" style="--swatch:#cbe7f1" onclick="selectChannelColor(this,'#cbe7f1')" aria-label="하늘색"></button><button type="button" style="--swatch:#e2e0ff" onclick="selectChannelColor(this,'#e2e0ff')" aria-label="보라색"></button><button type="button" style="--swatch:#f8ddd8" onclick="selectChannelColor(this,'#f8ddd8')" aria-label="분홍색"></button><button type="button" style="--swatch:#dceedb" onclick="selectChannelColor(this,'#dceedb')" aria-label="초록색"></button><button type="button" style="--swatch:#f8e7c5" onclick="selectChannelColor(this,'#f8e7c5')" aria-label="노란색"></button><label class="settings-custom-color"><input type="color" value="#cbe7f1" oninput="selectChannelColor(this,this.value)"><span>직접 선택</span></label></div></div><div class="settings-fields two"><label>크리에이터명<input value="애매모홈"></label><label>핸들<input value="@mmoh"></label><label class="wide">카테고리<select><option>부동산·경매</option></select></label><label class="wide">한 줄 소개<input value="월급쟁이도 이해하는 실전 부동산 경매"></label><label class="wide">상세 소개<textarea>경매 입문부터 권리분석, 현장 임장, 명도, 세금까지. 직장인 눈높이에 맞춰 실전에서 바로 쓰는 낙찰 노하우를 전합니다.</textarea></label></div><div class="settings-save"><small>저장한 정보는 공개 크리에이터 페이지에 바로 반영됩니다.</small><button class="btn primary" type="submit">변경사항 저장</button></div></form><aside class="panel settings-preview"><span>공개 페이지 미리보기</span><div class="settings-preview-card" id="settingsChannelPreview" style="background:${getSavedChannelColor()}">${houseMark(76)}<h3>애매모홈</h3><p>@mmoh · 부동산·경매</p><small>월급쟁이도 이해하는 실전 부동산 경매</small><button type="button" onclick="window.open('./index.html#/c/mmoh','_blank')">내 페이지 보기 ↗</button></div></aside></div>`;
}
function getSavedChannelColor(){try{return localStorage.getItem('nhz-mmoh-cover')||'#cbe7f1';}catch(error){return '#cbe7f1';}}
function selectChannelColor(control,color){document.querySelectorAll('.settings-color-options>button').forEach(button=>button.classList.remove('active'));if(control.tagName==='BUTTON')control.classList.add('active');const preview=document.getElementById('settingsChannelPreview');if(preview)preview.style.background=color;try{localStorage.setItem('nhz-mmoh-cover',color);}catch(error){}adminToast('프로필 배경색을 선택했습니다');}
function switchSettingsPanel(panel,button){
  document.querySelectorAll('.settings-tabs button').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  document.getElementById('settingsPanel').innerHTML=settingsPanelMarkup(panel);
}
function openSettingsPanel(panel='profile'){
  document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='settings'));
  document.getElementById('adminContent').innerHTML=renderSettings(panel);
  window.scrollTo({top:0,behavior:'smooth'});
  location.hash=panel==='payout'?'#settings-payout':'#settings';
}
const saleProducts=publicProducts.map(product=>({
  id:product.id,
  contentIds:product.contentIds||[`content-${product.id}`],
  requirement:product.requirement?.label||'조건 없음',
  name:product.title,
  desc:product.lead,
  price:product.price,
  originalPrice:product.orig||product.price,
  discountPrice:product.orig>product.price?product.price:'',
  period:product.cohort?.period||'',
  periodType:'지정 수강 기간 기준',
  periodDays:'',
  accessMode:'fixed',
  recruitmentAlways:false,
  recruitmentStart:'2026-07-01',
  recruitmentEnd:'2026-07-31',
  courses:product.includedProductIds?product.includedProductIds.map(id=>classShortTitle(productMap[id]?.title||id)):[classShortTitle(product.title)],
  tags:[...(product.tags||[])],
  extraAccess:[],
  status:product.id==='mmoh-field'||product.isPublic===false?'비공개':'공개',
  paymentCount:product.cohort?.enrolled||0,
  operation:product.operation||{},
  faq:product.faq||[]
}));
function linkedClassCount(contentId){return saleProducts.filter(item=>(item.contentIds||[]).includes(contentId)).length;}
function linkedContentItems(product){return (product.contentIds||[]).map(id=>lectureContents.find(item=>item.id===id)).filter(Boolean);}
function linkedContentNames(product){return linkedContentItems(product).map(item=>`${classShortTitle(item.title)} 커리큘럼`);}
function renderProducts(){
  return `${pageHeader('Class management','클래스 관리','수강생에게 노출되고 판매되는 클래스의 소개, 기간, 가격, 운영 안내, FAQ와 공개 상태를 관리합니다.','<button class="btn primary" onclick="openProductEditor(\'create\')">+ 새 클래스 등록</button>')}
  <div class="product-admin-grid">${saleProducts.map(product=>`<article class="sale-product-card" role="button" tabindex="0" aria-label="${product.name} 클래스 수정" onclick="openProductEditor('edit','${product.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProductEditor('edit','${product.id}')}"><div class="sale-product-top"><span>${linkedContentItems(product).length>1?`${linkedContentItems(product).length}개 강의 콘텐츠`:(linkedContentNames(product)[0]||'콘텐츠 미연결')}</span><div class="sale-product-state"><em class="${product.status==='비공개'||product.status==='준비중'?'soon':'open'}">${product.status}</em><div class="class-card-menu"><button type="button" aria-label="${product.name} 더보기" onclick="toggleClassMenu(event,'sale-${product.id}')">&#8942;</button><div class="class-card-menu-pop" id="class-menu-sale-${product.id}" onclick="event.stopPropagation()"><button type="button" onclick="openProductEditor('edit','${product.id}')">수정</button><button type="button" onclick="duplicateManagedClass('${product.id}')">복제</button><button type="button" class="danger" onclick="deleteManagedClass('${product.id}')">삭제</button></div></div></div></div><h2>${product.name}</h2><p>${product.desc}</p><div class="product-card-price"><strong>${won(product.price)}</strong><small>${product.period}</small></div><div class="product-card-summary"><div><b>수강 조건</b><span>${product.requirement}</span></div><div><b>강의 콘텐츠</b><span>${linkedContentNames(product).join(' · ')||'미연결'}</span></div></div></article>`).join('')}</div>`;
}
function duplicateManagedClass(classId){
  const index=saleProducts.findIndex(item=>item.id===classId);
  if(index<0)return;
  const source=saleProducts[index];
  saleProducts.splice(index+1,0,{...source,contentIds:[...(source.contentIds||[])],tags:[...(source.tags||[])],id:`${source.id}-copy-${Date.now()}`,name:`${source.name} 복제본`,status:'비공개',paymentCount:0,operation:{...source.operation}});
  showAdminView('products');
  adminToast('클래스 복제본을 비공개 상태로 추가했습니다');
}
function deleteManagedClass(classId){
  const index=saleProducts.findIndex(item=>item.id===classId);
  if(index<0)return;
  if(!window.confirm(`“${saleProducts[index].name}” 클래스를 삭제할까요?`))return;
  saleProducts.splice(index,1);
  showAdminView('products');
  adminToast('클래스를 삭제했습니다');
}

function selectedOption(value,current){return value===current?'selected':'';}
function courseChecked(product,course){return product.courses.includes(course)?'checked':'';}
function requirementChecked(product,course){return product.requirement.includes(course)?'checked':'';}
function noRequirementChecked(product){return product.requirement==='조건 없음'||product.requirement==='처음 참여 가능'?'checked':'';}
function classChoiceList(product,lockAttr){
  const selectedIds=product.contentIds||[];
  const ordered=[...selectedIds.map(id=>lectureContents.find(item=>item.id===id)).filter(Boolean),...lectureContents.filter(item=>!selectedIds.includes(item.id))];
  return ordered.map(content=>{
    const checked=selectedIds.includes(content.id),order=selectedIds.indexOf(content.id)+1;
    return `<label class="product-class-choice ${checked?'is-active':'is-disabled'}"><input type="checkbox" name="linkedContents[]" value="${content.id}" ${checked?'checked':''} ${lockAttr} onchange="toggleProductClassChoice(this)"><span><b>${classShortTitle(content.title)} 커리큘럼</b><small>영상 ${content.content?.videos?.length||0}강 · 자료 ${content.content?.files?.length||0}개 · ${linkedClassCount(content.id)}개 클래스에서 사용</small></span><div class="class-order-control${checked?'':' is-hidden'}"><small>노출 순서</small><select ${lockAttr} aria-label="${classShortTitle(content.title)} 노출 순서" onclick="event.stopPropagation()" onchange="changeLinkedContentOrder(this)">${selectedIds.map((_,index)=>`<option value="${index+1}" ${order===index+1?'selected':''}>${index+1}순위</option>`).join('')}</select></div></label>`;
  }).join('');
}
function toggleProductClassChoice(input){
  const row=input.closest('.product-class-choice');
  row?.classList.toggle('is-active',input.checked);
  row?.classList.toggle('is-disabled',!input.checked);
  refreshLinkedContentOrderUI();
}
function changeLinkedContentOrder(select){
  const row=select.closest('.product-class-choice'),list=row?.parentElement;
  if(!row||!list)return;
  const selected=[...list.querySelectorAll('.product-class-choice:has(input[name="linkedContents[]"]:checked)')];
  const from=selected.indexOf(row),to=Number(select.value)-1,target=selected[to];
  if(from<0||!target||from===to)return;
  if(to<from)list.insertBefore(row,target);else target.after(row);
  refreshLinkedContentOrderUI();
}
function refreshLinkedContentOrderUI(){
  const list=document.querySelector('.included-lecture-list');
  if(!list)return;
  const rows=[...list.querySelectorAll('.product-class-choice')],selected=rows.filter(row=>row.querySelector('input[name="linkedContents[]"]')?.checked);
  rows.forEach(row=>{const control=row.querySelector('.class-order-control'),select=control?.querySelector('select'),index=selected.indexOf(row);control?.classList.toggle('is-hidden',index<0);if(select&&index>=0){select.innerHTML=selected.map((_,i)=>`<option value="${i+1}" ${i===index?'selected':''}>${i+1}순위</option>`).join('');}});
  const summary=document.getElementById('linkedContentSummary');
  if(summary){const names=selected.map(row=>row.querySelector('b')?.textContent).filter(Boolean);summary.innerHTML=names.length?names.map((name,index)=>`<em>${index+1}. ${name}</em>`).join(''):'<em>선택 필요</em>';}
}
function requirementChoiceList(product,lockAttr){
  return `<label class="requirement-none-choice"><input type="checkbox" name="requirementNone" value="조건 없음" ${noRequirementChecked(product)} ${lockAttr} onchange="toggleRequirementChoice(this)"><span><b>수강 조건 없음</b><small>선수 클래스 없이 누구나 바로 신청할 수 있습니다.</small></span><em>기본 옵션</em></label><div class="requirement-divider"><span>또는 선수 클래스 선택</span></div>${classes.map(course=>{const name=classShortTitle(course.title);return `<label class="requirement-class-choice"><input type="checkbox" name="requirements[]" value="${name}" ${requirementChecked(product,name)} ${lockAttr} onchange="toggleRequirementChoice(this)"><span><b>${name}</b><small>이 클래스를 들은 수강생만 신청 가능</small></span></label>`;}).join('')}`;
}
function toggleRequirementChoice(input){
  const list=input.closest('.condition-class-list'),none=list?.querySelector('input[name="requirementNone"]'),requirements=[...(list?.querySelectorAll('input[name="requirements[]"]')||[])];
  if(!none)return;
  if(input===none){if(input.checked)requirements.forEach(item=>{item.checked=false;});else if(!requirements.some(item=>item.checked))input.checked=true;return;}
  if(input.checked)none.checked=false;else if(!requirements.some(item=>item.checked))none.checked=true;
}
function escapeAdminText(value=''){
  return String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
function classKeywordTagMarkup(tag){
  return `<span class="class-keyword-tag">${escapeAdminText(tag)}<button type="button" onclick="removeClassKeywordTag(this)" aria-label="${escapeAdminText(tag)} 태그 삭제">×</button></span>`;
}
function syncClassKeywordValue(){
  const hidden=document.getElementById('classKeywords');
  if(hidden)hidden.value=[...document.querySelectorAll('#classKeywordTags .class-keyword-tag')].map(tag=>tag.firstChild?.textContent?.trim()).filter(Boolean).join(',');
}
function addClassKeywordTag(){
  const input=document.getElementById('classKeywordInput'),list=document.getElementById('classKeywordTags');
  if(!input||!list)return;
  const existing=[...list.querySelectorAll('.class-keyword-tag')].map(tag=>tag.firstChild?.textContent?.trim().toLowerCase());
  input.value.split(',').map(tag=>tag.trim().replace(/^#/,'')).filter(Boolean).forEach(tag=>{
    if(existing.includes(tag.toLowerCase()))return;
    list.insertAdjacentHTML('beforeend',classKeywordTagMarkup(tag));
    existing.push(tag.toLowerCase());
  });
  input.value='';
  syncClassKeywordValue();
}
function handleClassKeywordInput(event){
  if(event.key==='Enter'||event.key===','){event.preventDefault();addClassKeywordTag();}
}
function removeClassKeywordTag(button){
  button.closest('.class-keyword-tag')?.remove();
  syncClassKeywordValue();
}
function syncClassDescription(editor){
  const field=document.getElementById('classDescriptionValue');
  if(field)field.value=editor.innerHTML;
}
function formatClassDescription(command,value=''){
  const editor=document.getElementById('classDescriptionEditor');
  if(!editor)return;
  editor.focus();
  if(command==='createLink'){
    const link=window.prompt('연결할 URL을 입력해 주세요.');
    if(!link)return;
    value=link;
  }
  if(command==='insertImage'){adminToast('스마트 에디터의 이미지 업로드 기능이 연결될 영역입니다.');return;}
  document.execCommand(command,false,value||null);
  syncClassDescription(editor);
}
function productOperationDefaults(product){
  return Object.assign({
    hasKakao:false,
    hasZoom:false,
    guide:'매주 온라인 라이브로 진행되며 다시보기가 제공됩니다.',
    kakaoTitle:'수강생 단톡방 입장',
    kakaoDesc:'공지 · 질문 · 다시보기 공유',
    kakaoUrl:'',
    zoomUrl:'',
    schedules:[{title:'권리분석 핵심 개념',date:'2026-07-12',time:'20:00',url:''},{title:'위험 물건 사례 분석',date:'2026-07-19',time:'20:00',url:''}]
  },product.operation||{});
}
function productOperationSection(product){
  const operation=productOperationDefaults(product);
  const schedules=operation.schedules&&operation.schedules.length?operation.schedules:productOperationDefaults({}).schedules;
  const kakaoHidden=operation.hasKakao?'':' is-hidden';
  const zoomHidden=operation.hasZoom?'':' is-hidden';
  return `<section class="panel product-section product-step-panel product-operation-section" id="product-operation" data-product-step-panel="4" hidden><div class="product-section-head"><i>5</i><div><h2>운영 안내·라이브 일정</h2><p>필요한 경우 단톡방, 줌, 라이브 일정을 등록합니다.</p></div><em>선택</em></div>
    <div class="editor-fields">
      <label class="wide">운영 안내 문구 <em class="optional">선택</em><textarea name="operationGuide" placeholder="예: 매주 온라인 라이브로 진행되며 다시보기가 제공됩니다.">${operation.guide}</textarea></label>
    </div>
    <div class="operation-toggle-list">
      <label><input type="checkbox" name="operationHasKakao" ${operation.hasKakao?'checked':''} onchange="toggleOperationOption(this,'kakao')"><span><b>수강생 단톡방 있음</b><small>${operation.hasKakao?'단톡방 정보를 입력해 주세요.':'현재 설정: 단톡방 없음'}</small></span></label>
      <div class="operation-option-empty${operation.hasKakao?' is-hidden':''}" data-operation-empty="kakao">단톡방 없음</div>
      <div class="operation-option-fields${kakaoHidden}" data-operation-fields="kakao">
        <div class="operation-link-grid">
          <label><span>수강생 단톡방</span><input name="operationKakaoTitle" value="${operation.kakaoTitle}" placeholder="수강생 단톡방 입장"><small>유저 화면 버튼명</small></label>
          <label><span>단톡방 설명</span><input name="operationKakaoDesc" value="${operation.kakaoDesc}" placeholder="공지 · 질문 · 다시보기 공유"><small>버튼 아래 보조 문구</small></label>
          <label class="wide"><span>단톡방 링크</span><input name="operationKakaoUrl" value="${operation.kakaoUrl}" placeholder="https://open.kakao.com/..."><small>결제한 수강생에게만 열리는 링크입니다.</small></label>
        </div>
      </div>
      <label><input type="checkbox" name="operationHasZoom" ${operation.hasZoom?'checked':''} onchange="toggleOperationOption(this,'zoom')"><span><b>줌 라이브 있음</b><small>${operation.hasZoom?'줌 링크와 라이브 일정을 입력해 주세요.':'현재 설정: 줌 없음'}</small></span></label>
      <div class="operation-option-empty${operation.hasZoom?' is-hidden':''}" data-operation-empty="zoom">줌 없음</div>
      <div class="operation-option-fields${zoomHidden}" data-operation-fields="zoom">
        <div class="operation-schedule-editor">
          <div class="operation-schedule-head"><b>줌 라이브 일정</b><small>각 일정별 입장 링크를 등록합니다.</small></div>
          ${schedules.map((schedule,index)=>`<div class="operation-schedule-row"><em>${index+1}</em><input name="operationScheduleTitle[]" value="${schedule.title}" placeholder="일정명"><input type="date" name="operationScheduleDate[]" value="${schedule.date}"><input type="time" name="operationScheduleTime[]" value="${schedule.time}"><input name="operationScheduleUrl[]" value="${schedule.url||''}" placeholder="https://zoom.us/j/..."><button type="button" class="remove-row" aria-label="일정 삭제">×</button></div>`).join('')}
          <button type="button" class="operation-add-button" onclick="adminToast('일정 추가는 저장 연동 시 활성화됩니다')">+ 일정 추가</button>
        </div>
      </div>
    </div>
  </section>`;
}
function toggleOperationOption(control,type){
  const section=control.closest('.product-operation-section');
  const fields=section?.querySelector(`[data-operation-fields="${type}"]`);
  const empty=section?.querySelector(`[data-operation-empty="${type}"]`);
  fields?.classList.toggle('is-hidden',!control.checked);
  empty?.classList.toggle('is-hidden',control.checked);
  const small=control.closest('label')?.querySelector('small');
  if(small)small.textContent=control.checked?(type==='kakao'?'단톡방 정보를 입력해 주세요.':'줌 링크와 라이브 일정을 입력해 주세요.'):(type==='kakao'?'현재 설정: 단톡방 없음':'현재 설정: 줌 없음');
}
function productCourseDates(product){
  const match=(product.period||'').match(/(\d{4})\.(\d{2})\.(\d{2})\s*~\s*(?:(\d{4})\.)?(\d{2})\.(\d{2})/);
  if(!match)return {start:'2026-07-05',end:'2026-08-02'};
  const [,startYear,startMonth,startDay,endYear,endMonth,endDay]=match;
  return {start:`${startYear}-${startMonth}-${startDay}`,end:`${endYear||startYear}-${endMonth}-${endDay}`};
}
function discountRate(originalPrice,discountPrice){const original=Number(originalPrice)||0,discount=Number(discountPrice)||0;return original>0&&discount>0&&discount<original?Math.round((1-discount/original)*100):0;}
function updateProductPricePreview(input){
  const section=input.closest('#product-period'),original=Number(section?.querySelector('[name="originalPrice"]')?.value)||0,discount=Number(section?.querySelector('[name="discountPrice"]')?.value)||0,rate=discountRate(original,discount),finalPrice=rate?discount:original;
  const price=section?.querySelector('#finalPricePreview'),badge=section?.querySelector('#discountRatePreview'),summary=document.getElementById('productSummaryPrice');
  if(price)price.textContent=won(finalPrice);if(summary)summary.textContent=won(finalPrice);
  if(badge){badge.textContent=discount>0&&!rate?'할인 가격은 판매 가격보다 낮아야 합니다':rate?`${rate}% 할인`:'할인 없음';badge.classList.toggle('error',discount>0&&!rate);}
}
function toggleCourseAccessMode(input){
  const section=input.closest('#product-period'),fixed=section?.querySelector('[data-access-mode="fixed"]'),immediate=section?.querySelector('[data-access-mode="immediate"]');
  fixed?.classList.toggle('is-hidden',input.value!=='fixed');immediate?.classList.toggle('is-hidden',input.value!=='immediate');
}
function toggleRecruitmentAlways(input){
  const block=input.closest('.recruitment-period-block'),fields=block?.querySelector('.recruitment-date-fields');
  fields?.classList.toggle('is-disabled',input.checked);
  fields?.querySelectorAll('input[type="date"]').forEach(dateInput=>{dateInput.disabled=input.checked;});
}
function renderProductEditor(mode='create',productId=''){
  const editing=mode==='edit',product=editing?saleProducts.find(item=>item.id===productId):null,locked=!!(product&&product.paymentCount>0),lockAttr=locked?'disabled':'',lockClass=locked?' locked':'';
  const current=product||{id:'',contentIds:lectureContents[0]?.id?[lectureContents[0].id]:[],requirement:'조건 없음',name:'새 클래스',desc:'수강생에게 클래스의 특징과 학습 목표를 소개해 주세요.',price:290000,originalPrice:390000,discountPrice:290000,period:'2026.07.05 ~ 08.02',periodType:'지정 수강 기간 기준',periodDays:'30',accessMode:'fixed',recruitmentAlways:false,recruitmentStart:'2026-07-01',recruitmentEnd:'2026-07-31',courses:[],tags:[],extraAccess:[],status:'준비중',paymentCount:0};
  const courseDates=productCourseDates(current);
  const recruitmentAlways=!!current.recruitmentAlways,recruitmentDateAttr=locked||recruitmentAlways?'disabled':'';
  const currentFaqs=current.faq||[];
  return `<form class="product-editor" data-product-id="${current.id}" data-active-product-step="0" novalidate onsubmit="if(!validateProductEditorForm(this)){event.preventDefault();return false;}saveProductForm(event,'${mode}')">
    <div class="editor-head product-editor-head"><button type="button" class="editor-back" onclick="showAdminView('products')">← 클래스 관리</button><div><span>${editing?'Class editing':'Class setup'}</span><h1>${editing?'클래스 수정':'새 클래스 등록'}</h1><p>${locked?'결제 이력이 있어 가격·기간 등 일부 항목은 변경할 수 없습니다.':'클래스 정보와 판매 조건을 설정하고 기존 강의 콘텐츠를 연결합니다.'}</p></div><div class="editor-actions product-editor-actions"><label>공개 상태<select name="visibilityStatus"><option ${current.status!=='비공개'?'selected':''}>공개</option><option ${selectedOption('비공개',current.status)}>비공개</option></select></label><button type="button" class="btn ghost" onclick="openClassPreview('${current.id}')">미리보기 ↗</button><button type="submit" class="btn primary">${editing?'변경사항 저장':'클래스 등록'}</button></div></div>
    <details class="product-setup-hero panel"><summary><div><span>클래스 등록 안내</span><h2>수강생에게 노출·판매할 클래스를 만드는 화면입니다.</h2></div><em>자세히 보기</em></summary><div class="product-setup-detail"><p>클래스명과 소개, 대표 이미지, 모집·수강 기간, 가격, 운영 안내, 라이브 일정, FAQ, 공개 상태를 설정합니다.<br>강의 콘텐츠에서 만든 커리큘럼을 선택해 연결하며, 같은 콘텐츠를 여러 클래스에서 재사용할 수 있습니다.</p></div></details>
    ${locked?`<section class="product-lock-notice"><b>결제 이력 ${current.paymentCount}건</b><span>이미 결제가 발생한 클래스라 가격과 기간은 수정할 수 없습니다. 판매 조건을 바꾸려면 새 클래스를 등록하세요.</span></section>`:''}
    <nav class="editor-steps product-editor-steps" aria-label="클래스 등록 단계"><button type="button" class="active" data-product-step="0" data-step-title="클래스 정보" aria-current="step" aria-controls="product-class-info" onclick="showProductEditorStep(0)"><i>1</i><span>클래스 정보<small>전체 필수</small></span></button><button type="button" data-product-step="1" data-step-title="강의 콘텐츠" aria-controls="product-content" onclick="showProductEditorStep(1)"><i>2</i><span>강의 콘텐츠<small>1개 이상 필수</small></span></button><button type="button" data-product-step="2" data-step-title="수강 조건" aria-controls="product-requirement" onclick="showProductEditorStep(2)"><i>3</i><span>수강 조건<small>1개 이상 필수</small></span></button><button type="button" data-product-step="3" data-step-title="기간·가격" aria-controls="product-period" onclick="showProductEditorStep(3)"><i>4</i><span>기간·가격<small>할인 가격만 선택</small></span></button><button type="button" data-product-step="4" data-step-title="운영 안내" aria-controls="product-operation" onclick="showProductEditorStep(4)"><i>5</i><span>운영 안내<small>선택</small></span></button><button type="button" data-product-step="5" data-step-title="FAQ" aria-controls="product-faq" onclick="showProductEditorStep(5)"><i>6</i><span>FAQ<small>선택</small></span></button><button type="button" data-product-step="6" data-step-title="플랫폼 정책" aria-controls="product-refund" onclick="showProductEditorStep(6)"><i>7</i><span>플랫폼 정책<small>자동 적용</small></span></button></nav>
    <div class="product-editor-grid"><div class="product-editor-main">
      <section class="panel product-section product-step-panel editable active" id="product-class-info" data-product-step-panel="0"><div class="product-section-head"><i>1</i><div><h2>클래스 정보</h2><p>수강생이 신청 전에 확인하는 클래스명, 소개와 대표 이미지를 구성합니다.</p></div><em>전체 필수</em></div><div class="editor-cover-row"><div class="editor-cover-preview" style="background:linear-gradient(135deg,#DCE3FF,#AFC0FF)">${houseMark(72)}<button type="button" onclick="adminToast('대표 이미지 업로드')">이미지 변경</button></div><div class="editor-cover-guide"><b>대표 이미지 <em>*</em></b><p>필수 항목이며 클래스 목록과 상세 화면에 노출됩니다.</p><button type="button" class="btn ghost" onclick="adminToast('이미지 선택')">이미지 선택</button></div></div><div class="editor-fields"><label class="wide">클래스명 <em>*</em><input required value="${current.name}" placeholder="예: 경매 낙찰 기초반 14기"></label><label class="wide">한 줄 소개 <em>*</em><textarea required placeholder="수강생에게 클래스의 핵심 가치를 소개해 주세요.">${current.desc}</textarea></label><label>카테고리 <em>*</em><select required><option>부동산·경매</option><option>재테크·주식</option></select></label><label>난이도 <em>*</em><select required><option>입문</option><option>중급</option><option>심화</option></select></label><div class="wide class-keyword-field"><div class="field-label">키워드 태그 <em>*</em></div><div class="class-keyword-editor"><div class="class-keyword-tags" id="classKeywordTags">${(current.tags||[]).map(classKeywordTagMarkup).join('')}</div><div class="class-keyword-input-row"><input id="classKeywordInput" type="text" placeholder="키워드를 입력하고 Enter를 눌러주세요" onkeydown="handleClassKeywordInput(event)"><button type="button" onclick="addClassKeywordTag()">추가</button></div></div><input type="hidden" id="classKeywords" name="classKeywords" value="${escapeAdminText((current.tags||[]).join(','))}"><small>클래스를 설명하는 검색·노출 키워드를 태그로 등록합니다. 쉼표로 여러 개를 한 번에 추가할 수 있습니다.</small></div><div class="wide class-description-field"><div class="field-label">상세 소개 <em>*</em></div><div class="class-smart-editor"><div class="class-smart-toolbar" role="toolbar" aria-label="상세 소개 서식"><select aria-label="문단 형식" onchange="formatClassDescription('formatBlock',this.value)"><option value="p">본문</option><option value="h2">제목 1</option><option value="h3">제목 2</option></select><span></span><button type="button" onclick="formatClassDescription('bold')" aria-label="굵게"><b>B</b></button><button type="button" onclick="formatClassDescription('italic')" aria-label="기울임"><i>I</i></button><button type="button" onclick="formatClassDescription('underline')" aria-label="밑줄"><u>U</u></button><span></span><button type="button" onclick="formatClassDescription('insertUnorderedList')" aria-label="글머리 기호">• 목록</button><button type="button" onclick="formatClassDescription('insertOrderedList')" aria-label="번호 목록">1. 목록</button><span></span><button type="button" onclick="formatClassDescription('createLink')" aria-label="링크">링크</button><button type="button" onclick="formatClassDescription('insertImage')" aria-label="이미지">이미지</button></div><div class="class-smart-body" id="classDescriptionEditor" contenteditable="true" role="textbox" aria-multiline="true" data-placeholder="클래스의 진행 방식, 학습 목표와 기대 효과를 자세히 작성해 주세요." oninput="syncClassDescription(this)"><p>${escapeAdminText(current.desc)}</p></div><textarea hidden id="classDescriptionValue" name="classDescription">${escapeAdminText(current.desc)}</textarea><div class="class-smart-footer"><span>스마트 에디터 연동 영역</span><small>텍스트 서식 · 목록 · 링크 · 이미지 업로드</small></div></div></div></div></section>
      <section class="panel product-section product-step-panel${lockClass}" id="product-content" data-product-step-panel="1" hidden><div class="product-section-head"><i>2</i><div><h2>강의 콘텐츠 연결</h2><p>한 개 이상의 강의 콘텐츠를 선택하세요. 같은 콘텐츠를 여러 클래스에 연결할 수 있고, 한 클래스에도 여러 콘텐츠를 연결할 수 있습니다.</p></div>${locked?'<em>수정 불가</em>':'<em>1개 이상 필수</em>'}</div><div class="included-lecture-list">${classChoiceList(current,lockAttr)}</div></section>
      <section class="panel product-section product-step-panel${lockClass}" id="product-requirement" data-product-step-panel="2" hidden><div class="product-section-head"><i>3</i><div><h2>수강 조건</h2><p>1개 이상 선택해야 하며 기본값은 수강 조건 없음입니다.</p></div>${locked?'<em>수정 불가</em>':'<em>1개 이상 필수</em>'}</div><div class="condition-class-list">${requirementChoiceList(current,lockAttr)}</div></section>
      <section class="panel product-section product-step-panel${lockClass}" id="product-period" data-product-step-panel="3" hidden><div class="product-section-head"><i>4</i><div><h2>모집·수강 기간과 가격</h2><p>클래스의 모집 기간, 수강 시작 방식과 실제 결제 가격을 설정합니다.</p></div>${locked?'<em>수정 불가</em>':''}</div><div class="period-setting-block"><div class="period-setting-head"><h3>가격 설정</h3><p>할인 가격을 비워두면 판매 가격으로 결제됩니다.</p></div><div class="editor-fields price-setting-fields"><label>판매 가격 <em>*</em><div class="input-suffix"><input required name="originalPrice" type="number" min="0" step="1000" value="${current.originalPrice||current.price}" ${lockAttr} oninput="updateProductPricePreview(this)"><span>원</span></div><small>할인 전 기준 가격</small></label><label>할인 가격 <em class="optional">선택</em><div class="input-suffix"><input name="discountPrice" type="number" min="0" step="1000" value="${current.discountPrice||''}" ${lockAttr} placeholder="할인할 경우 입력" oninput="updateProductPricePreview(this)"><span>원</span></div><small>판매 가격보다 낮게 입력해 주세요.</small></label></div><div class="price-result"><span>최종 결제 금액</span><strong id="finalPricePreview">${won(current.discountPrice||current.originalPrice||current.price)}</strong><em id="discountRatePreview">${discountRate(current.originalPrice||current.price,current.discountPrice)?`${discountRate(current.originalPrice||current.price,current.discountPrice)}% 할인`:'할인 없음'}</em></div></div><div class="period-setting-block recruitment-period-block"><div class="period-setting-head"><h3>모집 기간</h3><p>수강생이 클래스를 결제할 수 있는 기간입니다.</p></div><label class="recruitment-always-option"><input type="checkbox" name="recruitmentAlways" ${recruitmentAlways?'checked':''} ${lockAttr} onchange="toggleRecruitmentAlways(this)"><span><b>상시 모집</b><small>공개 상태인 동안 기간 제한 없이 언제든 판매합니다.</small></span></label><div class="editor-fields recruitment-date-fields${recruitmentAlways?' is-disabled':''}"><label>모집 시작일<input name="recruitmentStart" type="date" value="${current.recruitmentStart||'2026-07-01'}" ${recruitmentDateAttr}></label><label>모집 종료일<input name="recruitmentEnd" type="date" value="${current.recruitmentEnd||'2026-07-31'}" ${recruitmentDateAttr}></label></div></div><div class="period-setting-block"><div class="period-setting-head"><h3>수강 시작 방식</h3><p>기수제 클래스는 지정 기간, 상시 판매 클래스는 결제 즉시 시작이 적합합니다.</p></div><div class="course-access-mode"><label><input type="radio" name="accessMode" value="fixed" ${current.accessMode!=='immediate'?'checked':''} ${lockAttr} onchange="toggleCourseAccessMode(this)"><span><b>지정 기간 수강</b><small>모든 수강생이 같은 날짜에 시작하고 종료합니다.</small></span></label><label><input type="radio" name="accessMode" value="immediate" ${current.accessMode==='immediate'?'checked':''} ${lockAttr} onchange="toggleCourseAccessMode(this)"><span><b>결제 즉시 수강</b><small>수강생마다 결제한 시점부터 수강이 시작됩니다.</small></span></label></div><div class="editor-fields access-mode-fields${current.accessMode==='immediate'?' is-hidden':''}" data-access-mode="fixed"><label>수강 시작일<input type="date" value="${courseDates.start}" ${lockAttr}></label><label>수강 종료일<input type="date" value="${courseDates.end}" ${lockAttr}></label></div><div class="editor-fields access-mode-fields${current.accessMode==='immediate'?'':' is-hidden'}" data-access-mode="immediate"><label class="wide">수강 가능 기간 <em>*</em><div class="input-suffix"><input type="number" min="1" value="${current.periodDays||30}" ${lockAttr}><span>일</span></div><small>결제일부터 입력한 일수만큼 수강할 수 있습니다.</small></label></div></div></section>
      ${productOperationSection(current)}
      <section class="panel product-section product-step-panel" id="product-faq" data-product-step-panel="5" hidden><div class="product-section-head"><i>6</i><div><h2>FAQ</h2><p>필요한 경우 클래스 신청 전에 자주 묻는 질문과 답변을 등록합니다.</p></div><em>선택</em></div><div class="faq-editor-block"><div class="content-editor-title"><div><h3>클래스 FAQ</h3></div><span id="faqCount">${currentFaqs.length}개 · 선택</span></div><div class="repeat-list" id="faqRows">${currentFaqs.map((faq,index)=>faqEditorRow(index+1,faq)).join('')}</div><button type="button" class="add-row-btn" onclick="addFaqRow()">＋ FAQ 추가</button></div></section>
      <section class="panel product-section product-step-panel platform-policy-section" id="product-refund" data-product-step-panel="6" hidden><div class="product-section-head"><i>7</i><div><h2>환불 규정</h2></div></div>${refundPolicyMarkup()}</section>
      <div class="product-step-actions"><button type="button" class="btn ghost" id="productStepPrevious" onclick="goProductEditorStep(-1)" disabled>← 이전 단계</button><span id="productStepCurrent">1 / 7 · 클래스 정보</span><button type="button" class="btn primary" id="productStepNext" onclick="goProductEditorStep(1)">다음 단계 →</button></div>
    </div><aside class="product-editor-side"><div class="panel product-summary"><span>클래스 요약</span><h3>${current.name}</h3><p>수강 조건 · ${current.requirement}</p><strong id="productSummaryPrice">${won(current.discountPrice||current.originalPrice||current.price)}</strong><div><b>연결 강의 콘텐츠</b><span id="linkedContentSummary">${linkedContentNames(current).length?linkedContentNames(current).map((name,index)=>`<em>${index+1}. ${name}</em>`).join(''):'<em>선택 필요</em>'}</span></div><small>${locked?'운영 안내와 라이브 일정은 최신 정보로 관리할 수 있습니다.':'선택한 우선순서대로 사용자 화면에 영상과 자료가 표시됩니다.'}</small></div><div class="panel product-side-guide"><b>${editing?'수정 가능 범위':'등록 후 흐름'}</b>${editing?`<ol><li>클래스명·소개</li><li>공개 상태</li><li>운영 안내</li><li>라이브 일정</li><li>FAQ</li></ol>`:`<ol><li>강의 콘텐츠 연결</li><li>클래스 공개</li><li>수강생 결제</li><li>내 학습에 클래스 표시</li></ol>`}</div></aside></div>
    <div class="editor-bottom-bar"><span><b>${editing?current.name:'새 클래스'}</b><small>${locked?'결제 이력 클래스 · 일부 항목만 수정 가능':'필수 항목과 연결 콘텐츠를 확인해 주세요.'}</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('products')">취소</button><button type="submit" class="btn primary">${editing?'변경사항 저장':'클래스 등록'}</button></div></div>
  </form>`;
}
function openProductEditor(mode='create',productId='',skipUnsavedCheck=false){
  runAdminNavigation(()=>{
    document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='products'));
    document.getElementById('adminContent').innerHTML=renderProductEditor(mode,productId);
    window.scrollTo({top:0});
    location.hash=mode==='edit'?'#product-edit-'+productId:'#product-new';
    beginEditorSession(document.querySelector('.product-editor'),'클래스');
  },skipUnsavedCheck);
}
function validateProductPeriodSettings(form){
  const section=form.querySelector('#product-period'),blocks=section?.querySelectorAll('.period-setting-block');
  if(!blocks||blocks.length<3)return true;
  const recruitmentAlways=!!form.elements.recruitmentAlways?.checked,recruitmentDates=[...blocks[1].querySelectorAll('input[type="date"]')],mode=form.elements.accessMode?.value||'fixed',modeFields=section.querySelector(`[data-access-mode="${mode}"]`),modeValues=[...modeFields.querySelectorAll('input')];
  if((!recruitmentAlways&&recruitmentDates.some(input=>!input.value))||modeValues.some(input=>!input.value)){adminToast('모집 기간과 수강 시작 방식의 필수값을 입력해 주세요');showProductEditorStep(3,true);return false;}
  if(!recruitmentAlways&&recruitmentDates[0].value>recruitmentDates[1].value){adminToast('모집 종료일은 모집 시작일 이후로 설정해 주세요');showProductEditorStep(3,true);recruitmentDates[1].focus();return false;}
  return true;
}
function saveProductForm(event,mode){
  event.preventDefault();
  const form=event.currentTarget;
  const selected=[...form.querySelectorAll('input[name="linkedContents[]"]:checked')];
  const keywordTags=(form.elements.classKeywords?.value||'').split(',').map(tag=>tag.trim()).filter(Boolean);
  const descriptionHtml=form.elements.classDescription?.value.trim()||'';
  if(!keywordTags.length){
    adminToast('키워드 태그를 1개 이상 등록해 주세요');
    showProductEditorStep(0,true);
    return;
  }
  if(!descriptionHtml||!document.getElementById('classDescriptionEditor')?.textContent.trim()){
    adminToast('상세 소개를 입력해 주세요');
    showProductEditorStep(0,true);
    return;
  }
  if(!selected.length){
    adminToast('강의 콘텐츠를 1개 이상 선택해 주세요');
    showProductEditorStep(1,true);
    return;
  }
  const product=saleProducts.find(item=>item.id===form.dataset.productId);
  const priceLocked=!!form.elements.originalPrice?.disabled;
  const originalPrice=priceLocked?(product?.originalPrice||product?.price||0):(Number(form.elements.originalPrice?.value)||0);
  const discountPrice=priceLocked?(product?.discountPrice||''):(Number(form.elements.discountPrice?.value)||0);
  if(discountPrice&&discountPrice>=originalPrice){
    adminToast('할인 가격은 판매 가격보다 낮게 입력해 주세요');
    showProductEditorStep(3,true);
    return;
  }
  if(product){
    product.contentIds=selected.map(item=>item.value);
    product.tags=keywordTags;
    product.descriptionHtml=descriptionHtml;
    product.status=form.elements.visibilityStatus?.value||product.status;
    const requirements=[...form.querySelectorAll('input[name="requirements[]"]:checked')].map(item=>item.value);
    product.requirement=form.querySelector('input[name="requirementNone"]:checked')?'조건 없음':requirements.join(' · ');
    product.originalPrice=originalPrice;
    product.discountPrice=discountPrice||'';
    product.price=discountPrice||originalPrice;
    if(!priceLocked){
      product.accessMode=form.elements.accessMode?.value||'fixed';
      product.periodDays=form.querySelector('[data-access-mode="immediate"] input')?.value||'';
      product.recruitmentAlways=!!form.elements.recruitmentAlways?.checked;
      product.recruitmentStart=form.elements.recruitmentStart?.value||'';
      product.recruitmentEnd=form.elements.recruitmentEnd?.value||'';
    }
  }
  clearEditorSession();
  adminToast(mode==='edit'?'클래스 정보를 저장했습니다':'클래스를 등록했습니다');
  setTimeout(()=>showAdminView('products',true),700);
}

function closeStudentDetailModal(){
  const modal=document.getElementById('studentDetailModal');
  modal.classList.remove('show');
  modal.innerHTML='';
}
function renderSettings(activePanel='profile'){
  return `${pageHeader('Channel settings','채널 설정','공개 채널 정보와 운영에 필요한 설정을 관리합니다.')}
  <nav class="settings-tabs"><button class="${activePanel==='profile'?'active':''}" onclick="switchSettingsPanel('profile',this)">공개 채널</button><button class="${activePanel==='payout'?'active':''}" onclick="switchSettingsPanel('payout',this)">정산 정보</button></nav>
  <section id="settingsPanel">${settingsPanelMarkup(activePanel)}</section>`;
}

const viewRenderers={dashboard:renderDashboard,classes:renderClasses,products:renderProducts,students:renderStudents,sales:renderSales,settings:renderSettings};
function showAdminView(view,skipUnsavedCheck=false){
  runAdminNavigation(()=>{
    document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
    document.getElementById('adminContent').innerHTML=viewRenderers[view]();
    window.scrollTo({top:0,behavior:'smooth'});
    location.hash=view==='dashboard'?'':'#'+view;
  },skipUnsavedCheck);
}
function openAdminHash(hash,skipUnsavedCheck=true){
  const view=hash.replace(/^#/,'');
  if(view==='class-new')openClassEditor('create','',skipUnsavedCheck);
  else if(view.startsWith('class-edit-'))openClassEditor('edit',view.replace('class-edit-',''),skipUnsavedCheck);
  else if(view==='product-new')openProductEditor('create','',skipUnsavedCheck);
  else if(view.startsWith('product-edit-'))openProductEditor('edit',view.replace('product-edit-',''),skipUnsavedCheck);
  else if(view.startsWith('sales-class-'))openSalesClassStudents(view.replace('sales-class-',''));
  else if(view==='settings-payout')openSettingsPanel('payout');
  else showAdminView(viewRenderers[view]?view:'dashboard',skipUnsavedCheck);
}

let toastTimer;
function adminToast(message){const toast=document.getElementById('adminToast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);}

document.getElementById('creatorAvatar').innerHTML=houseMark(48);
const initialView=location.hash.slice(1);
if(initialView==='class-new')openClassEditor('create');
else if(initialView.startsWith('class-edit-'))openClassEditor('edit',initialView.replace('class-edit-',''));
else if(initialView==='product-new')openProductEditor('create');
else if(initialView.startsWith('product-edit-'))openProductEditor('edit',initialView.replace('product-edit-',''));
else if(initialView.startsWith('sales-class-'))openSalesClassStudents(initialView.replace('sales-class-',''));
else if(initialView==='settings-payout')openSettingsPanel('payout');
else showAdminView(viewRenderers[initialView]?initialView:'dashboard');

window.addEventListener('beforeunload',event=>{if(hasUnsavedEditorChanges()){event.preventDefault();event.returnValue='';}});
window.addEventListener('hashchange',()=>{
  if(!activeEditorSession||location.hash===activeEditorSession.hash)return;
  const targetHash=location.hash,editorHash=activeEditorSession.hash;
  if(hasUnsavedEditorChanges())requestUnsavedChangesLeave(()=>openAdminHash(targetHash,true),editorHash);
  else openAdminHash(targetHash,true);
});
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link||!hasUnsavedEditorChanges()||link.target==='_blank'||link.hasAttribute('download'))return;
  event.preventDefault();
  requestUnsavedChangesLeave(()=>{location.href=link.href;});
},true);
document.addEventListener('keydown',event=>{
  const unsavedModal=document.getElementById('unsavedChangesModal');
  if(unsavedModal?.classList.contains('show')){
    if(event.key==='Escape'){closeUnsavedChangesModal();return;}
    if(event.key==='Tab'){
      const controls=[...unsavedModal.querySelectorAll('button:not(:disabled)')],first=controls[0],last=controls.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
    return;
  }
  if(event.key==='Escape'){closeClassPreview();closeAccessRequestModal();}
});
