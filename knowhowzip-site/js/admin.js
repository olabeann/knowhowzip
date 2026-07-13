"use strict";

function houseMark(size=56){
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><path d="M18 45 50 18l32 27v38H60V61H40v22H18Z" fill="#AFD6E7" stroke="#1c3a4a" stroke-width="6" stroke-linejoin="round"/><path d="m12 43 38-31 38 31" fill="none" stroke="#4F66F5" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

const classes=[
  {id:'mmoh-basic',title:'경매 낙찰 기초반 · 4주 완성',cohort:'3기',status:'모집중',period:'07.05 ~ 08.02',students:21,seats:30,price:290000,color:'linear-gradient(135deg,#AFD6E7,#7DB8D4)'},
  {id:'mmoh-right',title:'권리분석 실전반 · 위험물건 거르기',cohort:'2기',status:'모집중',period:'07.12 ~ 08.09',students:18,seats:25,price:390000,color:'linear-gradient(135deg,#F3C7C2,#D9332A)'},
  {id:'mmoh-field',title:'현장 임장 마스터 · 발품 전략',cohort:'1기',status:'모집예정',period:'07.19 ~ 08.16',students:9,seats:20,price:450000,color:'linear-gradient(135deg,#CFE3D2,#5B9E72)'}
];

const students=[
  {name:'김지훈',email:'jihoon.kim@email.com',phone:'010-2384-1129',access:'기초 수강',history:'기초 수강 중',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'3기',paid:'290,000원',period:'2026.07.05 ~ 08.02',joined:'06.29',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.07.05 ~ 08.02',purchased:'2026.06.29',status:'수강 중'}]},
  {name:'이서연',email:'seoyeon.lee@email.com',phone:'010-5418-9032',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.29',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.05.05 ~ 06.02',purchased:'2026.04.29',status:'수강 완료'},{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.29',status:'수강 중'}]},
  {name:'박민수',email:'minsu.park@email.com',phone:'010-8731-2465',access:'기초 수강',history:'기초 수강 중',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'3기',paid:'290,000원',period:'2026.07.05 ~ 08.02',joined:'06.28',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.07.05 ~ 08.02',purchased:'2026.06.28',status:'수강 중'}]},
  {name:'정유진',email:'yujin.jung@email.com',phone:'010-6904-3518',access:'스터디 참여',history:'기초 완료 · 심화 완료',course:'땅부자 루틴클럽',recentProduct:'땅부자 루틴클럽 8월',cohort:'8월',paid:'99,000원',period:'2026.08.01 ~ 08.31',joined:'06.28',state:'수강 대기',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.03.05 ~ 04.02',purchased:'2026.02.26',status:'수강 완료'},{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.05.12 ~ 06.09',purchased:'2026.04.30',status:'수강 완료'},{product:'땅부자 루틴클럽 8월',className:'땅부자 루틴클럽',paid:'99,000원',period:'2026.08.01 ~ 08.31',purchased:'2026.06.28',status:'수강 대기'}]},
  {name:'최현우',email:'hyunwoo.choi@email.com',phone:'010-4520-7781',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.27',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.05.05 ~ 06.02',purchased:'2026.04.27',status:'수강 완료'},{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.27',status:'수강 중'}]}
];
students.push(
  {name:'한도윤',email:'doyoon.han@email.com',phone:'010-3357-9180',access:'기초 수강',history:'기초 수강 중',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'3기',paid:'290,000원',period:'2026.07.05 ~ 08.02',joined:'06.26',state:'수강 중',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.07.05 ~ 08.02',purchased:'2026.06.26',status:'수강 중'}]},
  {name:'서민재',email:'minjae.seo@email.com',phone:'010-7271-5408',access:'기초 수강',history:'기초 완료',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'2기',paid:'290,000원',period:'2026.05.05 ~ 06.02',joined:'05.01',state:'수강 완료',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.05.05 ~ 06.02',purchased:'2026.05.01',status:'수강 완료'}]},
  {name:'오하린',email:'harin.oh@email.com',phone:'010-8840-1263',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.25',state:'수강 중',products:[{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.25',status:'수강 중'}]},
  {name:'문태오',email:'taeo.moon@email.com',phone:'010-6104-7729',access:'스터디 참여',history:'기초 완료 · 심화 완료',course:'땅부자 루틴클럽',recentProduct:'땅부자 루틴클럽 8월',cohort:'8월',paid:'99,000원',period:'2026.08.01 ~ 08.31',joined:'06.24',state:'수강 대기',products:[{product:'땅부자 루틴클럽 8월',className:'땅부자 루틴클럽',paid:'99,000원',period:'2026.08.01 ~ 08.31',purchased:'2026.06.24',status:'수강 대기'}]},
  {name:'강서아',email:'seoa.kang@email.com',phone:'010-4927-6501',access:'심화 수강',history:'기초 완료 · 심화 수강 중',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.23',state:'수강 중',products:[{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.23',status:'수강 중'}]},
  {name:'윤재원',email:'jaewon.yoon@email.com',phone:'010-9762-1184',access:'기초 수강',history:'기간 만료',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 이용권',cohort:'1기',paid:'290,000원',period:'2026.03.05 ~ 04.02',joined:'03.01',state:'기간 만료',products:[{product:'경매 낙찰 기초반 이용권',className:'경매 낙찰 기초반',paid:'290,000원',period:'2026.03.05 ~ 04.02',purchased:'2026.03.01',status:'기간 만료'}]},
  {name:'배수빈',email:'subin.bae@email.com',phone:'010-3088-4276',access:'심화 수강',history:'기초 완료',course:'권리분석 실전반',recentProduct:'권리분석 실전반 이용권',cohort:'2기',paid:'390,000원',period:'2026.07.12 ~ 08.09',joined:'06.22',state:'수강 중',products:[{product:'권리분석 실전반 이용권',className:'권리분석 실전반',paid:'390,000원',period:'2026.07.12 ~ 08.09',purchased:'2026.06.22',status:'수강 중'}]},
  {name:'신예린',email:'yerin.shin@email.com',phone:'010-5536-8027',access:'기초 수강',history:'무료 수강 처리',course:'경매 낙찰 기초반',recentProduct:'경매 낙찰 기초반 무료 수강',cohort:'3기',paid:'0원',period:'2026.07.13 ~ 09.13',joined:'07.13',state:'무료 수강중',products:[{product:'경매 낙찰 기초반 무료 수강',className:'경매 낙찰 기초반',paid:'0원',period:'2026.07.13 ~ 09.13',purchased:'2026.07.13',status:'무료 수강중'}]}
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
  return `${pageHeader('2026년 7월 9일 목요일','안녕하세요, 애매모홈님 👋','강의와 상품 운영 현황을 한눈에 확인하세요.','<button class="btn ghost" onclick="adminToast(\'미리보기 페이지를 엽니다 (예시)\')">내 페이지 보기 ↗</button>')}
    <section class="metric-grid three">
      <article class="metric-card"><div class="metric-icon blue">₩</div><span>이번 달 매출</span><strong>₩18,420,000</strong><small class="up">↑ 18.6% <i>지난달 대비</i></small></article>
      <article class="metric-card"><div class="metric-icon violet">♙</div><span>전체 수강생</span><strong>48명</strong><small class="up">↑ 7명 <i>이번 주 신규</i></small></article>
      <article class="metric-card"><div class="metric-icon green">▶</div><span>등록 클래스</span><strong>3개</strong><small><i>콘텐츠 관리 중</i></small></article>
    </section>

    <section class="dashboard-grid single">

      <article class="panel cohort-panel">
        <div class="panel-head"><div><h2>클래스 콘텐츠</h2><p>등록한 클래스 콘텐츠를 관리합니다.</p></div><button class="text-btn" onclick="showAdminView('classes')">전체 보기 →</button></div>
        <div class="cohort-list">${classes.map((c,i)=>`<button onclick="openClassEditor('edit','${c.id}')"><span class="cohort-color" style="background:${c.color}">${i+1}</span><span class="cohort-info"><b>${c.title.split(' · ')[0]}</b><small>클래스 정보와 콘텐츠를 수정합니다.</small></span><strong>수정</strong></button>`).join('')}</div>
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
  return `${pageHeader('Class management','클래스 관리','클래스의 영상 강의, 자료, FAQ를 관리합니다.','<button class="btn primary" onclick="openClassEditor(\'create\')">+ 새 클래스 만들기</button>')}
  <div class="class-admin-grid">${classes.map((c,i)=>`<article class="admin-class-card" role="button" tabindex="0" onclick="openClassEditor('edit','${c.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openClassEditor('edit','${c.id}')}" aria-label="${c.title} 관리"><div class="class-cover" style="background:${c.color}">${houseMark(70)}</div><div class="class-card-body"><div class="class-card-top"><div class="class-card-menu"><button type="button" aria-label="클래스 메뉴" onclick="toggleClassMenu(event,'${c.id}')">&#8942;</button><div class="class-card-menu-pop" id="class-menu-${c.id}" onclick="event.stopPropagation()"><button type="button" onclick="openClassEditor('edit','${c.id}')">수정</button><button type="button" onclick="openClassPreview('${c.id}')">미리보기</button><button type="button" onclick="duplicateClass('${c.id}')">복제</button><button type="button" class="danger" onclick="adminToast('\uc0ad\uc81c\ub294 \uc6b4\uc601\ud300 \ud655\uc778 \ud6c4 \uc9c4\ud589\ub429\ub2c8\ub2e4')">삭제</button></div></div></div><h2>${c.title}</h2><p>클래스 정보와 콘텐츠를 관리합니다.</p><button type="button" class="class-edit-btn" onclick="event.stopPropagation();openClassEditor('edit','${c.id}')">수정</button></div></article>`).join('')}</div>`;
}

function openClassPreview(classId=''){
  const id=classId||'mmoh-basic',modal=document.getElementById('classPreviewModal'),frame=document.getElementById('classPreviewFrame');
  frame.src='./index.html#/p/'+id;
  modal.classList.add('show');
  document.body.classList.add('preview-open');
  if(!classId)adminToast('새 클래스는 예시 상세 페이지로 미리봅니다');
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
function duplicateClass(classId){
  const sourceIndex=classes.findIndex(course=>course.id===classId);
  if(sourceIndex<0)return;
  const source=classes[sourceIndex];
  const copy={...source,id:`${source.id}-copy-${Date.now()}`,title:`${source.title} 복제본`};
  classes.splice(sourceIndex+1,0,copy);
  showAdminView('classes');
  adminToast('클래스 복제본을 추가했습니다');
}
document.addEventListener('click',()=>document.querySelectorAll('.class-card-menu-pop.show').forEach(menu=>menu.classList.remove('show')));

function renderClassEditor(mode='create',classId=''){
  const editing=mode==='edit',course=classes.find(c=>c.id===classId)||{};
  const title=course.title||'',parts=title.split(' · '),name=parts[0]||'',subtitle=parts.slice(1).join(' · ');
  const curriculum=editing?['경매 절차와 권리의 이해','물건 검색과 시세 분석','입찰표 작성 실습','모의 입찰 & 라이브 Q&A']:[''];
  const materials=editing?['주차별 강의 노트(PDF)','입찰표 작성 템플릿','물건 분석 체크리스트']:[''];
  return `<form class="class-editor" onsubmit="saveClassForm(event,'${mode}')">
    <div class="editor-head"><button type="button" class="editor-back" onclick="showAdminView('classes')">← 클래스 관리</button><div><span>${editing?'Class editing':'New class'}</span><h1>${editing?'클래스 수정':'새 클래스 만들기'}</h1><p>${editing?'클래스 정보와 콘텐츠를 수정합니다.':'클래스 소개와 콘텐츠, FAQ를 순서대로 입력하세요.'}</p></div><div class="editor-actions"><button type="button" class="btn ghost" onclick="openClassPreview('${classId}')">미리보기 ↗</button><button type="submit" class="btn primary">클래스 저장</button></div></div>
    <div class="editor-layout">
      <nav class="editor-steps"><button type="button" class="active" onclick="scrollEditorSection('editor-basic',this)"><i>1</i><span>클래스 정보<small>소개·난이도·태그</small></span></button><button type="button" onclick="scrollEditorSection('editor-content',this)"><i>2</i><span>콘텐츠<small>영상·자료</small></span></button><button type="button" onclick="scrollEditorSection('editor-faq',this)"><i>3</i><span>FAQ<small>자주 묻는 질문</small></span></button></nav>
      <div class="editor-sections">
        <section class="panel editor-section" id="editor-basic"><div class="editor-section-head"><i>1</i><div><h2>판매 페이지</h2><p>수강생이 신청 전에 확인하는 핵심 정보를 구성합니다.</p></div><span>필수</span></div><div class="editor-cover-row"><div class="editor-cover-preview" style="background:${course.color||'linear-gradient(135deg,#DCE3FF,#AFC0FF)'}">${houseMark(72)}<button type="button" onclick="adminToast('커버 이미지 업로드 (예시)')">커버 변경</button></div><div class="editor-cover-guide"><b>커버 이미지</b><p>권장 크기 1280×800px · JPG, PNG · 최대 5MB</p><button type="button" class="btn ghost" onclick="adminToast('이미지 선택 (예시)')">이미지 선택</button></div></div><div class="editor-fields"><label class="wide">클래스 제목 <em>*</em><input required maxlength="60" value="${name}" placeholder="예: 경매 낙찰 기초반"><small>핵심 주제와 수강 결과가 드러나는 제목을 권장합니다. 기수가 있다면 제목에 함께 적어주세요.</small></label><label class="wide">부제목<input maxlength="80" value="${subtitle}" placeholder="예: 직장인을 위한 4주 완성"></label><label>카테고리 <em>*</em><select required><option>부동산·경매</option><option>재테크·주식</option><option>디자인</option><option>개발</option></select></label><label>난이도 <em>*</em><select required><option>입문</option><option>중급</option><option>심화</option></select></label><label class="wide">한 줄 소개 <em>*</em><input required value="${editing?'경매가 처음인 직장인을 위한 실전 입문 과정':''}" placeholder="수강생에게 약속하는 핵심 변화를 한 문장으로 적어주세요"></label><label class="wide">상세 소개 <em>*</em><textarea required placeholder="클래스에서 무엇을, 어떻게 배우는지 자세히 소개해 주세요.">${editing?'복잡한 경매 절차를 직장인 눈높이로 풀었습니다. 실제 물건을 분석하고 입찰표까지 직접 작성합니다.':''}</textarea></label><label class="wide">검색 태그<input maxlength="80" placeholder="예: 경매 입문, 직장인, 실전"><small>쉼표로 구분해 최대 5개까지 입력하세요.</small></label></div></section>

        <section class="panel editor-section" id="editor-content"><div class="editor-section-head"><i>2</i><div><h2>콘텐츠</h2><p>수강생에게 제공할 영상 커리큘럼과 다운로드 자료를 구성합니다.</p></div><span>필수</span></div><div class="content-import-bar"><div><b>기존 클래스에서 가져오기</b><small>선택한 클래스의 커리큘럼과 자료를 복사한 뒤 자유롭게 수정할 수 있습니다.</small></div><select id="contentImportClass"><option value="">클래스 선택</option><option value="mmoh-basic">경매 낙찰 기초반</option><option value="mmoh-right">권리분석 실전반</option><option value="mmoh-field">현장 임장 마스터</option></select><button type="button" class="btn ghost" onclick="importClassContent()">콘텐츠 불러오기</button></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>영상 커리큘럼</h3><p>각 강의의 제목과 설명을 입력하고 영상 파일을 업로드하세요. 재생시간은 자동으로 입력됩니다.</p></div><span id="curriculumCount">${curriculum.length}강</span></div><div class="repeat-list" id="curriculumRows">${curriculum.map((item,i)=>curriculumRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addCurriculumRow()">＋ 강의 추가</button></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>제공 자료</h3><p>자료 제목과 설명을 입력하고 수강생이 내려받을 파일을 업로드하세요.</p></div><span id="materialCount">${materials.length}개</span></div><div class="repeat-list" id="materialRows">${materials.map((item,i)=>materialRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addMaterialRow()">＋ 자료 추가</button></div></section>

        <section class="panel editor-section" id="editor-faq"><div class="editor-section-head"><i>3</i><div><h2>FAQ</h2><p>수강생이 자주 묻는 질문과 답변을 관리합니다.</p></div></div><div class="faq-editor-block"><div class="content-editor-title"><div><h3>클래스 FAQ</h3><p>신청 전에 자주 묻는 내용을 등록하세요.</p></div></div><div class="faq-editor-row"><input placeholder="질문을 입력하세요"><textarea placeholder="답변을 입력하세요"></textarea></div><button type="button" class="add-row-btn" onclick="adminToast('FAQ 항목을 추가했습니다 (예시)')">＋ FAQ 추가</button></div></section>
      </div>
    </div>
    <div class="editor-bottom-bar"><span><b>${editing?'클래스 콘텐츠':'새 클래스'}</b><small>필수 항목을 확인한 뒤 저장해 주세요.</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('classes')">취소</button><button type="submit" class="btn primary">클래스 저장</button></div></div>
  </form>`;
}

const reusableClassContent={
  'mmoh-basic':{videos:['경매 절차와 권리의 이해','물건 검색과 시세 분석','입찰표 작성 실습','모의 입찰 & 라이브 Q&A'],files:['주차별 강의 노트(PDF)','입찰표 작성 템플릿','물건 분석 체크리스트']},
  'mmoh-right':{videos:['등기부 기본 정보 읽기','말소기준권리와 인수·소멸','대항력·우선변제권 판단','위험 물건 사례 분석'],files:['권리분석 워크북(PDF)','사례 50선 자료집']},
  'mmoh-field':{videos:['임장 준비와 동선 설계','현장 체크포인트','명도 시나리오 작성','협상 롤플레이'],files:['현장 체크리스트(PDF)','명도 합의서 양식']}
};
function importClassContent(){
  const id=document.getElementById('contentImportClass')?.value,data=reusableClassContent[id];
  if(!data){adminToast('불러올 클래스를 선택해 주세요');return;}
  const videos=document.getElementById('curriculumRows'),files=document.getElementById('materialRows');
  videos.innerHTML=data.videos.map((item,i)=>curriculumRow(i+1,item)).join('');
  files.innerHTML=data.files.map((item,i)=>materialRow(i+1,item)).join('');
  document.getElementById('curriculumCount').textContent=data.videos.length+'강';
  document.getElementById('materialCount').textContent=data.files.length+'개';
  adminToast('기존 콘텐츠를 불러왔습니다');
}

function curriculumRow(index,value=''){return `<div class="repeat-row curriculum-row"><div class="curriculum-row-head"><em>${index}강</em><input class="curriculum-title" required value="${value}" placeholder="강의 제목을 입력하세요"><div class="input-suffix duration"><input class="video-duration" type="number" readonly placeholder="자동"><span>분</span></div><button type="button" class="remove-row" onclick="removeEditorRow(this,'curriculumRows','curriculumCount','강')">×</button></div><textarea class="curriculum-description" placeholder="강의에서 다루는 내용을 간단히 설명해 주세요."></textarea><label class="video-upload"><input type="file" accept="video/mp4,video/quicktime,video/webm" onchange="handleCurriculumVideo(this)"><span><b>영상 파일 업로드</b><small>MP4, MOV, WebM · 강의당 최대 2GB</small></span><em class="video-file-status">파일을 선택해 주세요</em></label></div>`;}
function handleCurriculumVideo(input){
  const file=input.files&&input.files[0],row=input.closest('.curriculum-row'),status=row.querySelector('.video-file-status'),durationInput=row.querySelector('.video-duration');
  if(!file)return;
  const maxSize=2*1024*1024*1024;
  if(file.size>maxSize){input.value='';status.textContent='용량 초과 · 최대 2GB';status.classList.add('error');durationInput.value='';adminToast('영상은 강의당 최대 2GB까지 업로드할 수 있습니다');return;}
  status.classList.remove('error');status.textContent=file.name+' · 영상 정보를 확인하는 중';
  const video=document.createElement('video'),url=URL.createObjectURL(file);
  video.preload='metadata';
  video.onloadedmetadata=()=>{durationInput.value=Math.max(1,Math.ceil(video.duration/60));status.textContent=file.name+' · '+formatFileSize(file.size);URL.revokeObjectURL(url);};
  video.onerror=()=>{status.textContent=file.name+' · 재생시간을 확인하지 못했습니다';URL.revokeObjectURL(url);};
  video.src=url;
}
function formatFileSize(bytes){return bytes>=1024*1024*1024?(bytes/(1024*1024*1024)).toFixed(1)+'GB':Math.max(1,Math.round(bytes/(1024*1024)))+'MB';}
function materialRow(index,value=''){return `<div class="repeat-row material material-card"><div class="material-row-head"><em>${index}</em><input class="material-title" value="${value}" placeholder="자료 제목을 적어주세요"><button type="button" class="remove-row" onclick="removeEditorRow(this,'materialRows','materialCount','개')">×</button></div><textarea class="material-description" placeholder="자료 설명을 적어주세요"></textarea><label class="material-upload"><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png" onchange="handleMaterialFile(this)"><span><b>자료 파일 업로드</b><small>PDF, 문서, 이미지, ZIP · 자료당 최대 50MB</small></span><em class="material-file-status">파일을 선택해 주세요</em></label></div>`;}
function handleMaterialFile(input){
  const file=input.files&&input.files[0],row=input.closest('.material-card'),status=row.querySelector('.material-file-status');
  if(!file)return;
  const maxSize=50*1024*1024;
  if(file.size>maxSize){input.value='';status.textContent='용량 초과 · 최대 50MB';status.classList.add('error');adminToast('자료는 파일당 최대 50MB까지 업로드할 수 있습니다');return;}
  status.classList.remove('error');status.textContent=file.name+' · '+formatFileSize(file.size);
}

function addCurriculumRow(){const box=document.getElementById('curriculumRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',curriculumRow(count));document.getElementById('curriculumCount').textContent=count+'강';}
function addMaterialRow(){const box=document.getElementById('materialRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',materialRow(count));document.getElementById('materialCount').textContent=count+'개';}
function removeEditorRow(button,listId,countId,suffix){const list=document.getElementById(listId);if(list.children.length===1){adminToast('최소 1개 항목이 필요합니다');return;}button.closest('.repeat-row').remove();[...list.children].forEach((row,i)=>row.querySelector('em').textContent=suffix==='강'?`${i+1}강`:i+1);document.getElementById(countId).textContent=list.children.length+suffix;}
function scrollEditorSection(id,button){document.querySelectorAll('.editor-steps button').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});}
function saveClassForm(event,mode){event.preventDefault();adminToast('클래스를 저장했습니다');setTimeout(()=>showAdminView('classes'),700);}
function openClassEditor(mode,classId=''){document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='classes'));document.getElementById('adminContent').innerHTML=renderClassEditor(mode,classId);window.scrollTo({top:0});location.hash=mode==='edit'?`#class-edit-${classId}`:'#class-new';}

function studentAccessClass(access){
  if(access.includes('스터디'))return 'master';
  if(access.includes('심화'))return 'pro';
  if(access.includes('기초'))return 'challenger';
  return 'rookie';
}
function studentStateClass(state){
  if(state.includes('무료'))return 'free';
  if(state.includes('대기'))return 'waiting';
  if(state.includes('완료'))return 'done';
  if(state.includes('만료'))return 'expired';
  return 'active';
}
function creatorStudentProducts(student){
  const creatorClasses=classes.map(course=>course.title.split(' · ')[0]).concat('땅부자 루틴클럽');
  return (student.products||[]).filter(item=>creatorClasses.includes(item.className));
}
function studentProductOptions(){
  return [...new Set(students.map(student=>student.recentProduct).filter(Boolean))];
}
function getFilteredStudents(){
  const q=(document.getElementById('studentSearchInput')?.value||'').trim().toLowerCase();
  const productFilter=document.getElementById('studentProductFilter')?.value||'전체 최근 결제상품';
  const stateFilter=document.getElementById('studentStateFilter')?.value||'전체 상태';
  return students.filter(s=>{
    const keyword=`${s.name} ${s.email} ${s.phone||''} ${s.history} ${s.course} ${s.recentProduct||''}`.toLowerCase();
    const matchesKeyword=keyword.includes(q);
    const matchesProduct=productFilter==='전체 최근 결제상품'||s.recentProduct===productFilter;
    const matchesState=stateFilter==='전체 상태'||s.state===stateFilter;
    return matchesKeyword&&matchesProduct&&matchesState;
  });
}
function studentTable(rows,compact=false){
  const emptyRow=`<tr><td class="empty-table-cell" colspan="${compact?4:5}">조건에 맞는 수강생이 없습니다.</td></tr>`;
  return `<div class="table-wrap"><table><thead><tr><th>이름</th>${compact?'':'<th>전화번호</th>'}<th>최근 결제 상품</th><th>수강기간</th><th>상태</th></tr></thead><tbody>${rows.length?rows.map(s=>`<tr class="student-row" role="button" tabindex="0" onclick="openStudentDetail('${s.email}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openStudentDetail('${s.email}')}"><td><div class="student-cell"><span>${s.name[0]}</span><div><b>${s.name}</b><small>${s.email}</small></div></div></td>${compact?'':`<td>${s.phone||'-'}</td>`}<td>${s.recentProduct||s.course}</td><td>${s.period||'-'}</td><td><em class="table-state ${studentStateClass(s.state)}">${s.state}</em></td></tr>`).join(''):emptyRow}</tbody></table></div>`;
}
function studentStateSummary(){
  const states=['전체 상태','수강 대기','수강 중','무료 수강중','수강 완료','기간 만료'];
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
  return `${pageHeader('Student management','수강생 관리',"수강생에 대한 정보를 확인할 수 있습니다. 수강 기간 종료 후 무료로 수강을 하도록 하고자 할 때 '무료 수강 처리' 버튼을 클릭한다.")}
  <input type="hidden" id="studentStateFilter" value="전체 상태">
  <section id="studentStateSummary">${studentStateSummary()}</section>
  <div class="student-table-toolbar"><div class="filter-bar"><div class="admin-search">⌕ <input id="studentSearchInput" placeholder="이름, 이메일, 상품 검색" oninput="filterStudents()"></div><select id="studentProductFilter" onchange="filterStudents()"><option>전체 최근 결제상품</option>${studentProductOptions().map(product=>`<option>${product}</option>`).join('')}</select></div><button class="btn primary" onclick="openAccessRequestModal()">무료수강 처리</button></div>
  <article class="panel full-table" id="studentTable">${renderStudentTableSection()}</article>`;
}

function filterStudents(resetPage=true){
  if(resetPage)studentCurrentPage=1;
  const summary=document.getElementById('studentStateSummary');
  if(summary)summary.innerHTML=studentStateSummary();
  document.getElementById('studentTable').innerHTML=renderStudentTableSection();
}
function refreshStudentProductFilter(){
  const select=document.getElementById('studentProductFilter');
  if(!select)return;
  const selected=select.value;
  select.innerHTML=`<option>전체 최근 결제상품</option>${studentProductOptions().map(product=>`<option ${product===selected?'selected':''}>${product}</option>`).join('')}`;
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
  const student=students.find(item=>item.email===email),modal=document.getElementById('accessRequestModal');
  if(!student||!modal)return;
  const histories=creatorStudentProducts(student);
  modal.innerHTML=`<div class="access-request-backdrop" onclick="if(event.target===this)closeAccessRequestModal()">
    <section class="access-request-dialog student-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="studentDetailTitle">
      <div class="access-request-head"><div><span>수강생 상세</span><h2 id="studentDetailTitle">${student.name}</h2><p>${student.phone} · ${student.email}</p></div><button type="button" onclick="closeAccessRequestModal()" aria-label="닫기">×</button></div>
      <div class="student-detail-body">
        <div class="student-detail-summary"><div><span>최근 결제 상품</span><b>${student.recentProduct||student.course}</b></div><div><span>현재 상태</span><em class="table-state ${studentStateClass(student.state)}">${student.state}</em></div><div><span>수강기간</span><b>${student.period||'-'}</b></div></div>
        <div class="student-history-head"><h3>결제 상품과 수강 클래스</h3><p>현재 크리에이터 채널의 클래스 이력만 표시합니다.</p></div>
        <div class="student-history-list">${histories.length?histories.map(item=>`<article><div><b>${item.product}</b><small>${item.purchased} 결제 · ${item.className}</small></div><span>${item.paid}</span><span>${item.period}</span><em class="table-state ${studentStateClass(item.status)}">${item.status}</em></article>`).join(''):'<p class="empty-history">이 크리에이터의 수강 이력이 없습니다.</p>'}</div>
      </div>
    </section>
  </div>`;
  modal.classList.add('show');
}

let salesSelectedMonth='2026-06';
const salesMonthlyData={
  '2026-07':{label:'2026년 7월',settleDate:'2026년 8월 10일',refund:186000,refundCount:1,trend:'↑ 12.4%',rows:[{count:24,amount:6960000},{count:20,amount:7800000},{count:11,amount:4950000}]},
  '2026-06':{label:'2026년 6월',settleDate:'2026년 7월 10일',refund:273600,refundCount:2,trend:'↑ 18.6%',rows:[{count:21,amount:6090000},{count:18,amount:7020000},{count:9,amount:4050000}]},
  '2026-05':{label:'2026년 5월',settleDate:'2026년 6월 10일',refund:198000,refundCount:1,trend:'↑ 6.8%',rows:[{count:17,amount:4930000},{count:14,amount:5460000},{count:6,amount:2700000}]},
  '2026-04':{label:'2026년 4월',settleDate:'2026년 5월 10일',refund:0,refundCount:0,trend:'-',rows:[{count:12,amount:3480000},{count:9,amount:3510000},{count:3,amount:1350000}]}
};
function setSalesMonth(month){salesSelectedMonth=month;showAdminView('sales');}
function renderSales(){
  const data=salesMonthlyData[salesSelectedMonth]||salesMonthlyData['2026-06'];
  const gross=data.rows.reduce((sum,row)=>sum+row.amount,0);
  const payout=Math.max(0,Math.round((gross-data.refund)*.88));
  const monthSelect=`<select class="sales-month-select" aria-label="조회 월" onchange="setSalesMonth(this.value)">${Object.entries(salesMonthlyData).map(([value,item])=>`<option value="${value}" ${value===salesSelectedMonth?'selected':''}>${item.label}</option>`).join('')}</select>`;
  return `${pageHeader('Sales & payout','매출·정산','월별 매출과 정산 예정 금액을 확인합니다.',`${monthSelect}<button class="btn ghost" onclick="openSettingsPanel('payout')">정산 계좌 관리</button>`)}
  <section class="payout-hero"><div><span>${data.label} 정산 예정 금액</span><strong>${won(payout)}</strong><p>${data.settleDate} 입금 예정 · 환불·취소 반영 후</p></div></section>
  <section class="metric-grid two"><article class="metric-card"><span>${data.label} 총 결제</span><strong>${won(gross)}</strong><small class="${data.trend==='-'?'':'up'}">${data.trend}</small></article><article class="metric-card"><span>환불·취소</span><strong>${won(data.refund)}</strong><small><i>${data.refundCount}건</i></small></article></section>
  <article class="panel payout-table"><div class="panel-head"><div><h2>클래스별 매출</h2><p>${data.label} 결제 완료 기준</p></div></div><table><thead><tr><th>클래스</th><th>결제 건수</th><th>총 매출</th><th>정산 예정</th></tr></thead><tbody>${classes.map((c,i)=>{const row=data.rows[i]||{count:0,amount:0},fee=Math.round(row.amount*.12);return `<tr><td><b>${c.title}</b></td><td>${row.count}건</td><td>${won(row.amount)}</td><td><strong>${won(row.amount-fee)}</strong></td></tr>`;}).join('')}</tbody></table></article>`;
}

const alimtalkTemplates=[
  {id:'payment',name:'결제 완료 안내',trigger:'결제 완료 즉시',status:'승인 완료',statusClass:'approved',templateCode:'NHZ_PAY_001',content:`#{수강생명}님, #{클래스명} 결제가 완료되었습니다.\n내 학습에서 수강 안내와 자료를 확인해 주세요.`,button:'내 학습 바로가기'},
  {id:'start',name:'강의 시작 안내',trigger:'강의 시작 당일 · 오전 10시',status:'승인 대기',statusClass:'pending',templateCode:'검수 중',content:`#{수강생명}님, 오늘 #{클래스명} 강의가 시작됩니다.\n시작일: #{강의시작일}\n준비 사항을 내 학습에서 확인해 주세요.`,button:'수강 안내 확인'},
  {id:'schedule',name:'일정 안내',trigger:'일정 당일 · 오전 10시',status:'승인 완료',statusClass:'approved',templateCode:'NHZ_SCHEDULE_002',content:`#{수강생명}님, 오늘 #{클래스명} 일정이 있습니다.\n일시: #{일정}\n자세한 내용은 아래 버튼에서 확인해 주세요.`,button:'일정 확인'},
  {id:'end-before',name:'강의 종료 7일 전 안내',trigger:'강의 종료 7일 전 · 오전 10시',status:'작성 중',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, #{클래스명} 수강 기간이 7일 후 종료됩니다.\n종료일: #{강의종료일}\n남은 강의와 자료를 확인해 주세요.`,button:'내 학습 확인'},
  {id:'end',name:'강의 종료 당일 안내',trigger:'강의 종료 당일 · 오전 10시',status:'작성 중',statusClass:'draft',templateCode:'미등록',content:`#{수강생명}님, 오늘 #{클래스명} 수강 기간이 종료됩니다.\n종료일: #{강의종료일}\n남은 강의와 자료를 확인해 주세요.`,button:'내 학습 확인'}
];
function renderAlimtalk(){
  return pageHeader('Alimtalk management','알림톡 관리','결제와 수강 일정에 맞춰 발송할 안내 문구를 관리합니다.')+'<div class="alimtalk-notice"><span>!</span><div><b>문구를 수정하면 새 템플릿 승인이 필요합니다.</b><p>승인되기 전까지는 현재 승인된 문구가 계속 발송되며, 승인 완료 후 알리고 API에 새 템플릿 코드가 적용됩니다.</p></div></div><div class="alimtalk-layout"><aside class="alimtalk-list">'+alimtalkTemplates.map((template,index)=>'<button class="'+(index===0?'active':'')+'" onclick="selectAlimtalkTemplate('+index+',this)"><span class="alimtalk-status '+template.statusClass+'">'+template.status+'</span><b>'+template.name+'</b><small>'+template.trigger+'</small><em>'+template.templateCode+'</em></button>').join('')+'<div class="alimtalk-custom-request"><b>원하는 알림톡이 없나요?</b><p>필요한 발송 상황을 관리자에게 요청해 보세요.</p><button type="button" onclick="openCustomAlimtalkRequest(this)">관리자에게 요청하기</button></div></aside><section class="alimtalk-editor" id="alimtalkEditor">'+alimtalkEditor(alimtalkTemplates[0])+'</section></div>';
}
function alimtalkEditor(template){
  const variables=['#{수강생명}','#{클래스명}','#{강의시작일}','#{일정}','#{강의종료일}','#{내학습링크}'];
  return '<div class="alimtalk-form panel"><div class="alimtalk-editor-head"><div><span>'+template.trigger+'</span><h2>'+template.name+'</h2></div><span class="alimtalk-status '+template.statusClass+'">'+template.status+'</span></div><label>안내 문구<textarea id="alimtalkMessage" oninput="syncAlimtalkPreview(this.value)">'+template.content+'</textarea><small>승인된 템플릿의 문구와 변수 구조가 달라지면 재승인이 필요합니다.</small></label><div class="alimtalk-variables"><b>사용 가능한 변수</b><div>'+variables.map(variable=>'<button type="button" data-value="'+variable+'" onclick="insertAlimtalkVariable(this.dataset.value)">'+variable+'</button>').join('')+'</div></div><label>버튼 이름<input value="'+template.button+'"></label><label>상세 설명<textarea id="alimtalkRequestDetail" placeholder="관리자에게 전달할 요청사항이나 참고 내용을 입력해 주세요."></textarea><small>작성한 내용은 노하우집 관리자에게 전달되며 슬랙으로 알림을 보냅니다.</small></label><div class="alimtalk-form-actions"><button class="btn ghost" onclick="adminToast(&quot;임시 저장했습니다&quot;)">임시 저장</button><button class="btn primary" onclick="requestAlimtalkApproval()">알림톡 생성 요청</button></div></div><aside class="alimtalk-preview"><span>카카오 알림톡 미리보기</span><div class="alimtalk-phone"><div class="alimtalk-phone-head">노하우집</div><div class="alimtalk-bubble" id="alimtalkPreviewText">'+template.content.replace(/\n/g,'<br>')+'</div><button>'+template.button+'</button></div><p>템플릿 코드 · '+template.templateCode+'</p></aside>';
}
function openCustomAlimtalkRequest(button){
  document.querySelectorAll('.alimtalk-list>button').forEach(item=>item.classList.remove('active'));
  document.getElementById('alimtalkEditor').innerHTML='<div class="alimtalk-form panel"><div class="alimtalk-editor-head"><div><span>Custom request</span><h2>새 알림톡 요청</h2></div><span class="alimtalk-status draft">요청 작성</span></div><label>알림톡 이름<input id="customAlimtalkName" placeholder="예: 과제 제출 마감 안내"></label><label>원하는 발송 상황<input id="customAlimtalkTiming" placeholder="예: 과제 마감 1일 전 오전 10시"></label><label>상세 설명<textarea id="customAlimtalkDetail" placeholder="발송 목적, 대상, 포함할 내용 등을 자세히 적어 주세요."></textarea><small>작성한 요청은 노하우집 관리자에게 전달되고 슬랙으로 알림을 보냅니다.</small></label><div class="alimtalk-form-actions"><button class="btn primary" onclick="submitCustomAlimtalkRequest()">관리자에게 요청하기</button></div></div><aside class="alimtalk-request-guide panel"><b>요청 후 진행 과정</b><ol><li>관리자 요청 확인</li><li>알림톡 문구 및 변수 검토</li><li>카카오 템플릿 승인</li><li>승인 완료 후 자동 발송 적용</li></ol><p>승인 진행 상황은 관리자 확인 후 안내됩니다.</p></aside>';
}
function submitCustomAlimtalkRequest(){
  const name=document.getElementById('customAlimtalkName'),timing=document.getElementById('customAlimtalkTiming'),detail=document.getElementById('customAlimtalkDetail');
  if(!name.value.trim()||!timing.value.trim()||!detail.value.trim()){adminToast('알림톡 이름, 발송 상황, 상세 설명을 모두 입력해 주세요');return;}
  adminToast('알림톡 요청을 보냈습니다 · 관리자 슬랙 알림 전송 완료');
}
function selectAlimtalkTemplate(index,button){document.querySelectorAll('.alimtalk-list button').forEach(item=>item.classList.remove('active'));button.classList.add('active');document.getElementById('alimtalkEditor').innerHTML=alimtalkEditor(alimtalkTemplates[index]);}
function syncAlimtalkPreview(value){const preview=document.getElementById('alimtalkPreviewText');if(preview)preview.innerHTML=value.replace(/\n/g,'<br>');}
function insertAlimtalkVariable(value){const textarea=document.getElementById('alimtalkMessage');if(!textarea)return;const start=textarea.selectionStart,end=textarea.selectionEnd;textarea.value=textarea.value.slice(0,start)+value+textarea.value.slice(end);textarea.focus();textarea.selectionStart=textarea.selectionEnd=start+value.length;syncAlimtalkPreview(textarea.value);}
function requestAlimtalkApproval(){const detail=document.getElementById('alimtalkRequestDetail');if(!detail||!detail.value.trim()){adminToast('관리자에게 전달할 상세 설명을 입력해 주세요');if(detail)detail.focus();return;}adminToast('알림톡 생성 요청을 보냈습니다 · 관리자 슬랙 알림 전송 완료');}

function settingsPanelMarkup(panel){
  if(panel==='payout') return `<div class="settings-grid"><form class="panel settings-form" onsubmit="event.preventDefault();adminToast('정산 정보를 저장했습니다')"><div class="settings-section-title"><div><span>PAYOUT</span><h2>정산 정보</h2><p>매출 정산을 받을 계좌와 사업자 정보를 관리합니다.</p></div><em>확인 완료</em></div><div class="settings-fields two"><label>예금주<input value="애매모홈"></label><label>은행<select><option>국민은행</option></select></label><label class="wide">계좌번호<input value="123-456-789012"></label><label class="wide">정산 이메일<input value="creator@mmoh.kr"></label></div><div class="settings-save"><small>정산 정보는 정산일 7일 전까지 변경해야 합니다. 이후 변경은 주식회사 위이에 직접 요청해 주세요.</small><button class="btn primary" type="submit">정산 정보 저장</button></div></form><aside class="panel settings-help"><span>다음 정산</span><strong>7월 10일</strong><p>예정 금액 ₩15,936,000</p><button type="button" onclick="showAdminView('sales')">매출·정산 보기</button></aside></div>`;
  return `<div class="settings-grid"><form class="panel settings-form settings-profile-form" onsubmit="event.preventDefault();adminToast('채널 정보를 저장했습니다')"><div class="settings-section-title"><div><span>PUBLIC CHANNEL</span><h2>공개 채널 정보</h2><p>크리에이터 페이지에 노출되는 프로필과 소개를 관리합니다.</p></div><em>공개 중</em></div><div class="settings-profile-top"><div class="settings-avatar">${houseMark(72)}<div><b>프로필 이미지</b><small>권장 크기 400 × 400px</small><button type="button">이미지 변경</button></div></div></div><div class="settings-cover-picker"><div><b>프로필 배경색</b><small>크리에이터 공개 페이지 상단에 적용됩니다.</small></div><div class="settings-color-options"><button type="button" class="active" style="--swatch:#cbe7f1" onclick="selectChannelColor(this,'#cbe7f1')" aria-label="하늘색"></button><button type="button" style="--swatch:#e2e0ff" onclick="selectChannelColor(this,'#e2e0ff')" aria-label="보라색"></button><button type="button" style="--swatch:#f8ddd8" onclick="selectChannelColor(this,'#f8ddd8')" aria-label="분홍색"></button><button type="button" style="--swatch:#dceedb" onclick="selectChannelColor(this,'#dceedb')" aria-label="초록색"></button><button type="button" style="--swatch:#f8e7c5" onclick="selectChannelColor(this,'#f8e7c5')" aria-label="노란색"></button><label class="settings-custom-color"><input type="color" value="#cbe7f1" oninput="selectChannelColor(this,this.value)"><span>직접 선택</span></label></div></div><div class="settings-fields two"><label>크리에이터명<input value="애매모홈"></label><label>핸들<input value="@mmoh"></label><label class="wide">카테고리<select><option>부동산·경매</option></select></label><label class="wide">한 줄 소개<input value="월급쟁이도 이해하는 실전 부동산 경매"></label><label class="wide">상세 소개<textarea>경매 입문부터 권리분석, 현장 임장, 명도, 세금까지. 직장인 눈높이에 맞춰 실전에서 바로 쓰는 낙찰 노하우를 전합니다.</textarea></label></div><div class="settings-save"><small>저장한 정보는 공개 크리에이터 페이지에 바로 반영됩니다.</small><button class="btn primary" type="submit">변경사항 저장</button></div></form><aside class="panel settings-preview"><span>공개 페이지 미리보기</span><div class="settings-preview-card" id="settingsChannelPreview" style="background:${getSavedChannelColor()}">${houseMark(76)}<h3>애매모홈</h3><p>@mmoh · 부동산·경매</p><small>월급쟁이도 이해하는 실전 부동산 경매</small><button type="button" onclick="window.open('./index.html#/c/mmoh','_blank')">내 페이지 보기 ↗</button></div></aside></div>`;
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
const saleProducts=[
  {id:'prd-intro-pass',requirement:'조건 없음',name:'경매 기초 클래스 이용권',desc:'경매 낙찰 기초반을 90일 동안 수강할 수 있는 상품',price:190000,period:'결제일로부터 90일',periodType:'결제일 기준',periodDays:90,courses:['경매 낙찰 기초반'],extraAccess:[],status:'판매중',paymentCount:18},
  {id:'prd-middle-pass',requirement:'경매 낙찰 기초반 수강 이력 필요',name:'권리분석 실전 패키지',desc:'기초와 권리분석을 함께 구성한 심화 과정 상품',price:390000,period:'결제일로부터 120일',periodType:'결제일 기준',periodDays:120,courses:['경매 낙찰 기초반','권리분석 실전반'],extraAccess:[],status:'판매중',paymentCount:11},
  {id:'prd-field-package',requirement:'권리분석 실전반 수강 이력 필요',name:'경매 실전 풀패키지',desc:'기초, 권리분석, 루틴클럽을 한 번에 구성한 상품',price:790000,period:'2026.08.01 ~ 08.31',periodType:'지정 수강 기간 기준',periodDays:'',courses:['경매 낙찰 기초반','권리분석 실전반','땅부자 루틴클럽'],extraAccess:[],status:'준비중',paymentCount:0},
  {id:'prd-basic-pass',requirement:'조건 없음',name:'경매 낙찰 기초반 이용권',desc:'경매 낙찰 기초반 단일 클래스 수강 상품',price:290000,period:'2026.07.05 ~ 08.02',periodType:'지정 수강 기간 기준',periodDays:'',courses:['경매 낙찰 기초반'],extraAccess:[],status:'판매중',paymentCount:24}
];
function renderProducts(){
  return `${pageHeader('Product','상품 관리','상품별 수강 조건과 결제 후 볼 수 있는 클래스를 관리합니다.','<button class="btn primary" onclick="openProductEditor(\'create\')">+ 새 상품 만들기</button>')}
  <section class="product-policy-panel panel"><div><span>상품 관리 사용 설명서</span><h2>상품을 등록해서 수강생이 결제할 수 있도록 사용하세요.</h2><p>결제 이후 볼 수 있는 클래스를 선택하고 가격을 정해요. 수강 조건이 있다면 수강 조건을 선택해 주세요.</p></div></section>
  <div class="product-admin-grid">${saleProducts.map(product=>`<article class="sale-product-card"><div class="sale-product-top"><span>${product.courses.length}개 클래스</span><em class="${product.status==='판매중'?'open':'soon'}">${product.status}</em></div><h2>${product.name}</h2><p>${product.desc}</p><div class="product-card-price"><strong>${won(product.price)}</strong><small>${product.period}</small></div><div class="product-card-summary"><div><b>수강 조건</b><span>${product.requirement}</span></div><div><b>클래스</b><span>${product.courses.join(' · ')}</span></div></div><button type="button" onclick="openProductEditor('edit','${product.id}')">상품 수정</button></article>`).join('')}</div>`;
}

function selectedOption(value,current){return value===current?'selected':'';}
function courseChecked(product,course){return product.courses.includes(course)?'checked':'';}
function requirementChecked(product,course){return product.requirement.includes(course)?'checked':'';}
function noRequirementChecked(product){return product.requirement==='조건 없음'?'checked':'';}
function productCourseDates(product){
  const match=(product.period||'').match(/(\d{4})\.(\d{2})\.(\d{2})\s*~\s*(?:(\d{4})\.)?(\d{2})\.(\d{2})/);
  if(!match)return {start:'2026-07-05',end:'2026-08-02'};
  const [,startYear,startMonth,startDay,endYear,endMonth,endDay]=match;
  return {start:`${startYear}-${startMonth}-${startDay}`,end:`${endYear||startYear}-${endMonth}-${endDay}`};
}
function renderProductEditor(mode='create',productId=''){
  const editing=mode==='edit',product=editing?saleProducts.find(item=>item.id===productId):null,locked=!!(product&&product.paymentCount>0),lockAttr=locked?'disabled':'',lockClass=locked?' locked':'';
  const current=product||{id:'',requirement:'조건 없음',name:'새 상품',desc:'상품에 포함된 클래스와 수강 흐름을 설명해 주세요.',price:290000,period:'결제일로부터 90일',periodType:'결제일 기준',periodDays:90,courses:['경매 낙찰 기초반'],extraAccess:[],status:'판매중',paymentCount:0};
  const courseDates=productCourseDates(current);
  return `<form class="product-editor" onsubmit="saveProductForm(event,'${mode}')">
    <div class="editor-head product-editor-head"><button type="button" class="editor-back" onclick="showAdminView('products')">← 상품 관리</button><div><span>${editing?'Product editing':'Product setup'}</span><h1>${editing?'상품 수정':'새 상품 만들기'}</h1><p>${locked?'이미 결제한 수강생이 있어 상품명과 소개만 수정할 수 있습니다. 수강 조건, 가격, 기간을 바꾸려면 새 상품을 만들어 주세요.':'이 상품을 누가 신청할 수 있고, 결제 후 어떤 클래스를 볼 수 있는지 설정합니다.'}</p></div><div class="editor-actions product-editor-actions"><label>노출 상태<select><option ${selectedOption('판매중',current.status)}>공개</option><option ${selectedOption('비공개',current.status)}>비공개</option></select></label><button type="submit" class="btn primary">${editing?'변경사항 저장':'상품 등록'}</button></div></div>
    <details class="product-setup-hero panel"><summary><div><span>상품 만들기 안내</span><h2>유저가 실제 결제하는 상품을 만드는 화면입니다.</h2></div><em>자세히 보기</em></summary><div class="product-setup-detail"><p>1. 상품 정보는 유저가 결제 전 확인하는 문구입니다.<br>2. 결제 후 볼 수 있는 클래스를 정할 수 있어요.<br>3. 어떤 강의를 수강해야 하는 조건이 있다면 수강 조건에서 설정할 수 있어요.<br>4. 가격과 판매 시작일, 판매 종료일을 정할 수 있어요.</p></div></details>
    ${locked?`<section class="product-lock-notice"><b>결제 이력 ${current.paymentCount}건</b><span>이미 결제가 발생한 상품이라 상품 정보만 수정할 수 있습니다. 수강 조건이나 가격을 바꾸려면 새 상품을 생성하세요.</span></section>`:''}
    <div class="product-editor-grid"><div class="product-editor-main">
      <section class="panel product-section editable"><div class="product-section-head"><i>1</i><div><h2>상품 정보</h2><p>공개 페이지와 결제 화면에 보이는 이름과 설명을 입력합니다.</p></div></div><div class="editor-fields"><label class="wide">상품명 <em>*</em><input required value="${current.name}" placeholder="예: 경매 기초 클래스 이용권, 경매 실전 패키지"></label><label class="wide">상품 소개 <em>*</em><textarea required placeholder="상품에 포함된 클래스와 수강 흐름을 설명해 주세요.">${current.desc}</textarea></label></div></section>
      <section class="panel product-section${lockClass}"><div class="product-section-head"><i>2</i><div><h2>결제 후 볼 수 있는 클래스</h2><p>수강생이 결제한 뒤 내 학습에서 볼 클래스를 선택합니다.</p></div>${locked?'<em>수정 불가</em>':''}</div><div class="included-lecture-list"><label><input type="checkbox" ${courseChecked(current,'경매 낙찰 기초반')} ${lockAttr}><span><b>경매 낙찰 기초반</b><small>기초 과정 · 처음 참여 가능</small></span></label><label><input type="checkbox" ${courseChecked(current,'권리분석 실전반')} ${lockAttr}><span><b>권리분석 실전반</b><small>심화 과정 · 기초 수강 이력 필요</small></span></label><label><input type="checkbox" ${courseChecked(current,'땅부자 루틴클럽')} ${lockAttr}><span><b>땅부자 루틴클럽</b><small>스터디 · 기존 수강생 전용</small></span></label></div><div class="product-warning"><b>결제하면 선택한 클래스가 내 학습에 열립니다.</b><p>심화 과정 결제 후 기초 과정을 추가로 더 보여줘야 한다면 아래 수강 조건 섹션에서 함께 적어 주세요.</p></div></section>
      <section class="panel product-section${lockClass}"><div class="product-section-head"><i>3</i><div><h2>수강 조건</h2><p>선택한 기존 클래스를 들은 수강생만 이 상품을 신청할 수 있습니다.</p></div>${locked?'<em>수정 불가</em>':''}</div><div class="condition-class-list"><label><input type="checkbox" ${noRequirementChecked(current)} ${lockAttr}><span><b>수강 조건 없음</b><small>누구나 바로 신청할 수 있습니다.</small></span></label><label><input type="checkbox" ${requirementChecked(current,'경매 낙찰 기초반')} ${lockAttr}><span><b>경매 낙찰 기초반</b><small>이 클래스를 들은 수강생만 신청 가능</small></span></label><label><input type="checkbox" ${requirementChecked(current,'권리분석 실전반')} ${lockAttr}><span><b>권리분석 실전반</b><small>이 클래스를 들은 수강생만 신청 가능</small></span></label><label><input type="checkbox" ${requirementChecked(current,'땅부자 루틴클럽')} ${lockAttr}><span><b>땅부자 루틴클럽</b><small>참여 이력이 있는 수강생만 신청 가능</small></span></label></div></section>
      <section class="panel product-section${lockClass}"><div class="product-section-head"><i>4</i><div><h2>가격·이용 기간</h2><p>1회 결제와 상품별 수강 기간을 우선 적용합니다.</p></div>${locked?'<em>수정 불가</em>':''}</div><div class="editor-fields"><label>결제 방식<select ${lockAttr}><option>1회 결제</option><option disabled>월 정기결제 · 후속 단계</option><option disabled>연 정기결제 · 후속 단계</option></select></label><label>판매 가격 <em>*</em><div class="input-suffix"><input required type="number" min="0" step="1000" value="${current.price}" ${lockAttr}><span>원</span></div></label><label>판매 시작일<input type="date" value="2026-07-01" ${lockAttr}></label><label>판매 종료일<input type="date" value="2026-07-31" ${lockAttr}></label><label>수강 시작일<input type="date" value="${courseDates.start}" ${lockAttr}></label><label>수강 종료일<input type="date" value="${courseDates.end}" ${lockAttr}></label></div></section>
      <section class="panel product-section${lockClass}"><div class="product-section-head"><i>5</i><div><h2>환불 정책</h2><p>상품 결제 전 확인할 정책과 결제 완료 안내를 설정합니다.</p></div>${locked?'<em>수정 불가</em>':''}</div><div class="editor-fields"><label class="wide">환불 안내 <em>*</em><textarea required ${lockAttr}>결제 후 수강 시작 전까지 취소할 수 있으며, 수강 시작 후에는 노하우집 운영 정책에 따라 환불됩니다.</textarea></label><label class="wide">결제 완료 안내<textarea ${lockAttr}>결제가 완료되면 선택한 클래스가 내 학습에 표시됩니다.</textarea></label></div></section>
    </div><aside class="product-editor-side"><div class="panel product-summary"><span>상품 요약</span><h3>${current.name}</h3><p>수강 조건 · ${current.requirement}</p><strong>${won(current.price)}</strong><div><b>볼 수 있는 클래스</b>${current.courses.concat(current.extraAccess).map(course=>`<em>${course}</em>`).join('')}</div><small>${locked?'이미 결제한 수강생이 있어 상품 정보만 수정할 수 있습니다.':'결제 완료 후 내 학습에 표시됩니다.'}</small></div><div class="panel product-side-guide"><b>${editing?'수정 가능 범위':'생성 후 흐름'}</b>${editing?`<ol><li>상품명</li><li>상품 소개</li><li>노출 상태</li></ol>`:`<ol><li>상품 공개</li><li>수강 조건 확인</li><li>사용자 결제</li><li>내 학습에 클래스 표시</li><li>수강 시작</li></ol>`}</div></aside></div>
    <div class="editor-bottom-bar"><span><b>${editing?current.name:'새 상품'}</b><small>${locked?'결제 이력 상품 · 상품 정보만 수정 가능':'필수 항목을 확인한 뒤 등록하세요.'}</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('products')">취소</button><button type="submit" class="btn primary">${editing?'변경사항 저장':'상품 등록'}</button></div></div>
  </form>`;
}
function openProductEditor(mode='create',productId=''){
  document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='products'));
  document.getElementById('adminContent').innerHTML=renderProductEditor(mode,productId);
  window.scrollTo({top:0});
  location.hash=mode==='edit'?'#product-edit-'+productId:'#product-new';
}
function saveProductForm(event,mode){event.preventDefault();adminToast(mode==='edit'?'상품 정보를 저장했습니다':'\uc0c1\ud488\uc744 \ub4f1\ub85d\ud588\uc2b5\ub2c8\ub2e4');setTimeout(()=>showAdminView('products'),700);}

function openAccessRequestModal(){
  const modal=document.getElementById('accessRequestModal');
  modal.innerHTML=`<div class="access-request-backdrop" onclick="if(event.target===this)closeAccessRequestModal()">
    <form class="access-request-dialog" onsubmit="submitAccessRequest(event)" role="dialog" aria-modal="true" aria-labelledby="accessRequestTitle">
      <div class="access-request-head"><div><span>무료 수강</span><h2 id="accessRequestTitle">무료 수강 처리</h2><p>결제 없이 클래스를 열어줘야 하는 경우에만 사용해 주세요.</p></div><button type="button" onclick="closeAccessRequestModal()" aria-label="닫기">×</button></div>
      <div class="access-request-body">
        <label>수강생<select id="accessRequestStudent" required onchange="syncAccessRequestStudent()"><option value="">수강생 선택</option>${students.map(student=>`<option value="${student.email}">${student.name} · ${student.course}</option>`).join('')}</select></label>
        <div class="access-request-current" id="accessRequestCurrent"><b>현재 수강 상태</b><p>수강생을 선택하면 현재 수강 가능 클래스와 수강 이력이 표시됩니다.</p></div>
        <label>추가로 볼 수 있게 할 클래스<select id="accessRequestClass" required><option value="">클래스 선택</option>${classes.map(course=>`<option>${course.title.split(' · ')[0]}</option>`).join('')}<option>땅부자 루틴클럽</option></select></label>
        <div class="access-request-grid"><label>시작일<input id="accessRequestStart" type="date" value="2026-07-13"></label><label>종료일<input id="accessRequestEnd" type="date" value="2026-09-13"></label></div>
        <label>처리 사유<textarea id="accessRequestReason" required placeholder="예: 오프라인 결제 확인, 보상 지급, 기존 수강생 확인 등"></textarea></label>
        <p class="access-request-note">처리하면 선택한 클래스가 바로 내 학습에 표시됩니다. 실제 서비스에서는 변경 이력을 남깁니다.</p>
      </div>
      <div class="access-request-actions"><button type="button" class="btn ghost" onclick="closeAccessRequestModal()">취소</button><button type="submit" class="btn primary">무료 수강 처리</button></div>
    </form>
  </div>`;
  modal.classList.add('show');
}
function closeAccessRequestModal(){
  const modal=document.getElementById('accessRequestModal');
  modal.classList.remove('show');
  modal.innerHTML='';
}
function syncAccessRequestStudent(){
  const email=document.getElementById('accessRequestStudent')?.value;
  const selected=students.find(student=>student.email===email);
  const box=document.getElementById('accessRequestCurrent');
  if(!selected||!box)return;
  box.innerHTML=`<b>현재 수강 상태</b><p><strong>${selected.name}</strong> · ${selected.access}<br>${selected.history} · ${selected.state}</p>`;
}
function formatAccessPeriod(start,end){
  const format=value=>{
    if(!value)return '';
    const [year,month,day]=value.split('-');
    return `${year}.${month}.${day}`;
  };
  const startText=format(start),endText=format(end);
  return startText&&endText?`${startText} ~ ${endText.replace(/^\d{4}\./,'')}`:startText||endText||'-';
}
function submitAccessRequest(event){
  event.preventDefault();
  const studentEmail=document.getElementById('accessRequestStudent').value;
  const className=document.getElementById('accessRequestClass').value;
  const startDate=document.getElementById('accessRequestStart')?.value;
  const endDate=document.getElementById('accessRequestEnd')?.value;
  const selected=students.find(student=>student.email===studentEmail);
  if(selected){
    selected.access=className.includes('루틴')?'스터디 참여':className.includes('권리')?'심화 수강':'기초 수강';
    selected.history=selected.history.includes('무료 수강 처리')?selected.history:`${selected.history} · 무료 수강 처리`;
    selected.course=selected.course.includes(className)?selected.course:`${selected.course} · ${className}`;
    selected.recentProduct=`${className} 무료 수강`;
    selected.paid='0원';
    selected.period=formatAccessPeriod(startDate,endDate);
    selected.state='무료 수강중';
    selected.products=selected.products||[];
    selected.products.push({product:`${className} 무료 수강`,className,paid:'0원',period:selected.period,purchased:startDate||'2026-07-13',status:'무료 수강중'});
    const table=document.getElementById('studentTable');
    if(table){refreshStudentProductFilter();filterStudents();}
  }
  closeAccessRequestModal();
  adminToast(`${selected?.name||'수강생'}님 ${className} 무료 수강으로 처리했습니다`);
}

function renderSettings(activePanel='profile'){
  return `${pageHeader('Channel settings','채널 설정','공개 채널 정보와 운영에 필요한 설정을 관리합니다.')}
  <nav class="settings-tabs"><button class="${activePanel==='profile'?'active':''}" onclick="switchSettingsPanel('profile',this)">공개 채널</button><button class="${activePanel==='payout'?'active':''}" onclick="switchSettingsPanel('payout',this)">정산 정보</button></nav>
  <section id="settingsPanel">${settingsPanelMarkup(activePanel)}</section>`;
}

const viewRenderers={dashboard:renderDashboard,classes:renderClasses,products:renderProducts,students:renderStudents,sales:renderSales,alimtalk:renderAlimtalk,settings:renderSettings};
function showAdminView(view){
  document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
  document.getElementById('adminContent').innerHTML=viewRenderers[view]();
  window.scrollTo({top:0,behavior:'smooth'});
  location.hash=view==='dashboard'?'':'#'+view;
}

let toastTimer;
function adminToast(message){const toast=document.getElementById('adminToast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);}

document.getElementById('creatorAvatar').innerHTML=houseMark(48);
const initialView=location.hash.slice(1);
if(initialView==='class-new')openClassEditor('create');
else if(initialView.startsWith('class-edit-'))openClassEditor('edit',initialView.replace('class-edit-',''));
else if(initialView==='product-new')openProductEditor('create');
else if(initialView.startsWith('product-edit-'))openProductEditor('edit',initialView.replace('product-edit-',''));
else if(initialView==='settings-payout')openSettingsPanel('payout');
else showAdminView(viewRenderers[initialView]?initialView:'dashboard');

document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeClassPreview();closeAccessRequestModal();}});
