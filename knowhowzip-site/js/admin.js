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
  {name:'김지훈',email:'jihoon.kim@email.com',course:'경매 낙찰 기초반',cohort:'3기',paid:'290,000원',joined:'06.29',state:'수강 중'},
  {name:'이서연',email:'seoyeon.lee@email.com',course:'권리분석 실전반',cohort:'2기',paid:'390,000원',joined:'06.29',state:'수강 중'},
  {name:'박민수',email:'minsu.park@email.com',course:'경매 낙찰 기초반',cohort:'3기',paid:'290,000원',joined:'06.28',state:'수강 중'},
  {name:'정유진',email:'yujin.jung@email.com',course:'현장 임장 마스터',cohort:'1기',paid:'450,000원',joined:'06.28',state:'결제 완료'},
  {name:'최현우',email:'hyunwoo.choi@email.com',course:'권리분석 실전반',cohort:'2기',paid:'390,000원',joined:'06.27',state:'수강 중'}
];

const won=n=>'₩'+Number(n).toLocaleString('ko-KR');

function pageHeader(kicker,title,desc,actions=''){
  return `<div class="admin-page-head"><div><span>${kicker}</span><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;
}

function renderDashboard(){
  return `${pageHeader('2026년 6월 30일 화요일','안녕하세요, 애매모홈님 👋','강의와 상품 운영 현황을 한눈에 확인하세요.','<button class="btn ghost" onclick="adminToast(\'미리보기 페이지를 엽니다 (예시)\')">내 페이지 보기 ↗</button>')}
    <section class="metric-grid three">
      <article class="metric-card"><div class="metric-icon blue">₩</div><span>이번 달 매출</span><strong>₩18,420,000</strong><small class="up">↑ 18.6% <i>지난달 대비</i></small></article>
      <article class="metric-card"><div class="metric-icon violet">♙</div><span>전체 수강생</span><strong>48명</strong><small class="up">↑ 7명 <i>이번 주 신규</i></small></article>
      <article class="metric-card"><div class="metric-icon green">▶</div><span>공개 강의</span><strong>3개</strong><small><i>콘텐츠 관리 중</i></small></article>
    </section>

    <section class="dashboard-grid single">

      <article class="panel cohort-panel">
        <div class="panel-head"><div><h2>강의 운영 현황</h2><p>콘텐츠 공개 및 선수강 진행 상태</p></div><button class="text-btn" onclick="showAdminView('classes')">전체 보기 →</button></div>
        <div class="cohort-list">${classes.map((c,i)=>`<button onclick="showAdminView('classes')"><span class="cohort-color" style="background:${c.color}">${i+1}</span><span class="cohort-info"><b>${c.title.split(' · ')[0]}</b><small>${c.period}</small></span><span class="cohort-state ${c.status==='모집중'?'open':'soon'}">${c.status}</span><strong>${c.students}/${c.seats}</strong></button>`).join('')}</div>
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
  return `${pageHeader('Lecture management','강의 관리','영상·자료·FAQ·선수강 조건을 관리합니다.','<button class="btn primary" onclick="openClassEditor(\'create\')">+ 새 강의 만들기</button>')}
  <div class="class-admin-grid">${classes.map((c,i)=>`<article class="admin-class-card" role="button" tabindex="0" onclick="openClassEditor('edit','${c.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openClassEditor('edit','${c.id}')}" aria-label="${c.title} 관리"><div class="class-cover" style="background:${c.color}">${houseMark(70)}<span>공개</span></div><div class="class-card-body"><div class="class-card-top"><div class="class-card-menu"><button type="button" onclick="toggleClassMenu(event,'${c.id}')">&#8942;</button><div class="class-card-menu-pop" id="class-menu-${c.id}" onclick="event.stopPropagation()"><button type="button" onclick="openClassEditor('edit','${c.id}')">수정</button><button type="button" onclick="openClassPreview('${c.id}')">미리보기</button><button type="button" onclick="openClassEditor('clone','${c.id}')">강의 복제</button><button type="button" onclick="adminToast('\ube44\uacf5\uac1c\ub85c \uc804\ud658\ud588\uc2b5\ub2c8\ub2e4 (\uc608\uc2dc)')">비공개 전환</button><button type="button" class="danger" onclick="adminToast('\uc0ad\uc81c\ub294 \uc6b4\uc601\ud300 \ud655\uc778 \ud6c4 \uc9c4\ud589\ub429\ub2c8\ub2e4')">삭제</button></div></div></div><h2>${c.title}</h2><p>영상 4강 · 자료 3개 · FAQ 2개</p><div class="class-card-foot lecture-meta"><strong>선수강 없음</strong><span>공개</span></div></div></article>`).join('')}</div>`;
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
document.addEventListener('click',()=>document.querySelectorAll('.class-card-menu-pop.show').forEach(menu=>menu.classList.remove('show')));

function renderClassEditor(mode='create',classId=''){
  const editing=mode==='edit',cloning=mode==='clone',course=classes.find(c=>c.id===classId)||{};
  const title=course.title||'',parts=title.split(' · '),name=parts[0]||'',subtitle=parts.slice(1).join(' · ');
  const curriculum=(editing||cloning)?['경매 절차와 권리의 이해','물건 검색과 시세 분석','입찰표 작성 실습','모의 입찰 & 라이브 Q&A']:[''];
  const materials=(editing||cloning)?['주차별 강의 노트(PDF)','입찰표 작성 템플릿','물건 분석 체크리스트']:[''];
  return `<form class="class-editor" onsubmit="saveClassForm(event,'${mode}')">
    <div class="editor-head"><button type="button" class="editor-back" onclick="showAdminView('classes')">← 강의 관리</button><div><span>${editing?'Class editing':cloning?'Class duplicate':'New class'}</span><h1>${editing?'강의 수정':cloning?'강의 복제':'새 강의 만들기'}</h1><p>${editing?'공개 중인 클래스 정보와 운영 내용을 수정합니다.':cloning?'기존 내용을 복사했습니다. 일정과 공개 설정을 확인해 주세요.':'클래스 소개부터 콘텐츠와 운영 방식까지 순서대로 입력하세요.'}</p></div><div class="editor-actions"><button type="button" class="btn ghost" onclick="openClassPreview('${classId}')">미리보기 ↗</button><button type="button" class="btn ghost" onclick="adminToast(&quot;임시 저장했습니다&quot;)">임시 저장</button><button type="submit" class="btn primary">${editing?'변경사항 저장':cloning?'복제본 저장':'검토 후 등록'}</button></div></div>
    <div class="editor-layout">
      <nav class="editor-steps"><button type="button" class="active" onclick="scrollEditorSection('editor-basic',this)"><i>1</i><span>강의 정보<small>소개·난이도·태그</small></span></button><button type="button" onclick="scrollEditorSection('editor-cohort',this)"><i>2</i><span>수강 조건<small>선수강·수료 기준</small></span></button><button type="button" onclick="scrollEditorSection('editor-content',this)"><i>3</i><span>콘텐츠·혜택<small>강의·자료·제공 항목</small></span></button><button type="button" onclick="scrollEditorSection('editor-operation',this)"><i>4</i><span>수강 운영<small>진행 방식·안내</small></span></button><button type="button" onclick="scrollEditorSection('editor-publish',this)"><i>5</i><span>FAQ·공개<small>문의·정책·노출</small></span></button></nav>
      <div class="editor-sections">
        <section class="panel editor-section" id="editor-basic"><div class="editor-section-head"><i>1</i><div><h2>판매 페이지</h2><p>수강생이 신청 전에 확인하는 핵심 정보를 구성합니다.</p></div><span>필수</span></div><div class="editor-cover-row"><div class="editor-cover-preview" style="background:${course.color||'linear-gradient(135deg,#DCE3FF,#AFC0FF)'}">${houseMark(72)}<button type="button" onclick="adminToast('커버 이미지 업로드 (예시)')">커버 변경</button></div><div class="editor-cover-guide"><b>커버 이미지</b><p>권장 크기 1280×800px · JPG, PNG · 최대 5MB</p><button type="button" class="btn ghost" onclick="adminToast('이미지 선택 (예시)')">이미지 선택</button></div></div><div class="editor-fields"><label class="wide">클래스 제목 <em>*</em><input required maxlength="60" value="${name}" placeholder="예: 경매 낙찰 기초반"><small>핵심 주제와 수강 결과가 드러나는 제목을 권장합니다. 기수가 있다면 제목에 함께 적어주세요.</small></label><label class="wide">부제목<input maxlength="80" value="${subtitle}" placeholder="예: 직장인을 위한 4주 완성"></label><label>카테고리 <em>*</em><select required><option>부동산·경매</option><option>재테크·주식</option><option>디자인</option><option>개발</option></select></label><label>난이도 <em>*</em><select required><option>입문</option><option>중급</option><option>심화</option></select></label><label class="wide">한 줄 소개 <em>*</em><input required value="${editing||cloning?'경매가 처음인 직장인을 위한 실전 입문 과정':''}" placeholder="수강생에게 약속하는 핵심 변화를 한 문장으로 적어주세요"></label><label class="wide">상세 소개 <em>*</em><textarea required placeholder="클래스에서 무엇을, 어떻게 배우는지 자세히 소개해 주세요.">${editing||cloning?'복잡한 경매 절차를 직장인 눈높이로 풀었습니다. 실제 물건을 분석하고 입찰표까지 직접 작성합니다.':''}</textarea></label><label class="wide">검색 태그<input maxlength="80" placeholder="예: 경매 입문, 직장인, 실전"><small>쉼표로 구분해 최대 5개까지 입력하세요.</small></label></div></section>

        <section class="panel editor-section" id="editor-cohort"><div class="editor-section-head"><i>2</i><div><h2>일정·가격</h2><p>신청 기간과 수강 기간, 판매 가격을 설정합니다.</p></div><span>필수</span></div><div class="editor-fields"><label>모집 상태<select><option ${course.status==='모집중'?'selected':''}>모집중</option><option ${course.status==='모집예정'?'selected':''}>모집예정</option><option>마감</option></select></label><label>모집 시작일<input type="date" value="2026-06-15"></label><label>모집 마감일<input type="date" value="2026-06-30"></label><label>수강 시작일 <em>*</em><input required type="date" value="2026-07-05"></label><label>수강 종료일 <em>*</em><input required type="date" value="2026-08-02"></label><label>판매 가격 <em>*</em><div class="input-suffix"><input required type="number" min="0" step="1000" value="${course.price||290000}"><span>원</span></div></label><label>정가<div class="input-suffix"><input type="number" min="0" step="1000" value="390000"><span>원</span></div></label><label>수강 종료 후 열람<select><option>열람 불가</option><option>30일간 가능</option><option>기간 제한 없음</option></select></label></div></section>

        <section class="panel editor-section" id="editor-content"><div class="editor-section-head"><i>3</i><div><h2>콘텐츠</h2><p>수강생에게 제공할 영상 커리큘럼과 다운로드 자료를 구성합니다.</p></div><span>필수</span></div><div class="content-import-bar"><div><b>기존 클래스에서 가져오기</b><small>선택한 클래스의 커리큘럼과 자료를 복사한 뒤 자유롭게 수정할 수 있습니다.</small></div><select id="contentImportClass"><option value="">클래스 선택</option><option value="mmoh-basic">경매 낙찰 기초반</option><option value="mmoh-right">권리분석 실전반</option><option value="mmoh-field">현장 임장 마스터</option></select><button type="button" class="btn ghost" onclick="importClassContent()">콘텐츠 불러오기</button></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>영상 커리큘럼</h3><p>각 강의의 제목과 설명을 입력하고 영상 파일을 업로드하세요. 재생시간은 자동으로 입력됩니다.</p></div><span id="curriculumCount">${curriculum.length}강</span></div><div class="repeat-list" id="curriculumRows">${curriculum.map((item,i)=>curriculumRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addCurriculumRow()">＋ 강의 추가</button></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>제공 자료</h3><p>자료 제목과 설명을 입력하고 수강생이 내려받을 파일을 업로드하세요.</p></div><span id="materialCount">${materials.length}개</span></div><div class="repeat-list" id="materialRows">${materials.map((item,i)=>materialRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addMaterialRow()">＋ 자료 추가</button></div></section>

        <section class="panel editor-section" id="editor-operation"><div class="editor-section-head"><i>4</i><div><h2>수강 운영</h2><p>결제 후 수강생에게 제공할 안내와 라이브 일정을 설정합니다.</p></div></div><div class="live-toggle-block"><div><b>라이브 강의를 진행하나요?</b><small>라이브가 없는 클래스라면 진행하지 않음을 선택하세요.</small></div><div class="live-toggle-options"><label><input type="radio" name="has-live" checked onchange="toggleLiveSchedule(false)"><span>진행하지 않음</span></label><label><input type="radio" name="has-live" onchange="toggleLiveSchedule(true)"><span>라이브 진행</span></label></div></div><div class="live-schedule-block" id="liveScheduleBlock" hidden><div class="content-editor-title"><div><h3>라이브 일정</h3><p>회차별 일정과 참여 링크를 등록하세요. 필요한 만큼 추가할 수 있습니다.</p></div><span id="liveSessionCount">1회</span></div><div class="repeat-list" id="liveSessionRows">${liveSessionRow(1)}</div><button type="button" class="add-row-btn" onclick="addLiveSessionRow()">＋ 라이브 일정 추가</button></div><div class="operation-common"><h3>수강 안내</h3><div class="editor-fields"><label class="wide">카카오톡 단톡방 링크<input type="url" placeholder="https://open.kakao.com/o/..."></label><label class="wide">운영 안내문<textarea placeholder="수강생에게 전달할 준비 사항과 참여 방법을 입력해 주세요.">${editing||cloning?'라이브 일정과 참여 링크는 내 학습에서 확인할 수 있습니다.':''}</textarea></label></div></div></section>

        <section class="panel editor-section" id="editor-publish"><div class="editor-section-head"><i>5</i><div><h2>FAQ·공개</h2><p>자주 묻는 질문과 운영 정책을 확인한 뒤 공개 방식을 선택합니다.</p></div></div><div class="faq-editor-block"><div class="content-editor-title"><div><h3>클래스 FAQ</h3><p>신청 전에 자주 묻는 내용을 등록하세요.</p></div></div><div class="faq-editor-row"><input placeholder="질문을 입력하세요"><textarea placeholder="답변을 입력하세요"></textarea></div><button type="button" class="add-row-btn" onclick="adminToast('FAQ 항목을 추가했습니다 (예시)')">＋ FAQ 추가</button></div><div class="editor-fields policy-fields"><label class="wide">취소·환불 안내 <em>*</em><textarea required placeholder="클래스 취소 및 환불 기준을 입력해 주세요.">결제 후 수강 시작 전까지 취소할 수 있으며, 수강 시작 후에는 운영 정책에 따라 환불됩니다.</textarea></label></div><div class="publish-options"><label><input type="radio" name="publish" checked><span><b>${editing?'공개 상태 유지':'검토 요청 후 공개'}</b><small>${editing?'수정 즉시 공개 페이지에 반영됩니다.':'운영팀 검토가 끝나면 판매가 시작됩니다.'}</small></span></label><label><input type="radio" name="publish"><span><b>비공개로 저장</b><small>크리에이터 관리자에서만 확인할 수 있습니다.</small></span></label></div><div class="editor-check"><label><input required type="checkbox" ${editing?'checked':''}> 입력한 클래스 정보와 운영 일정이 정확함을 확인했습니다.</label></div></section>
      </div>
    </div>
    <div class="editor-bottom-bar"><span><b>${editing?'공개 중인 클래스':'새 클래스'}</b><small>${editing?'마지막 수정 2026.06.28 14:32':'필수 항목을 모두 입력해 주세요.'}</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('classes')">취소</button><button type="button" class="btn ghost" onclick="adminToast(&quot;임시 저장했습니다&quot;)">임시 저장</button><button type="submit" class="btn primary">${editing?'변경사항 저장':cloning?'복제본 저장':'검토 후 등록'}</button></div></div>
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
function liveSessionRow(index){return `<div class="repeat-row live-session-card"><div class="live-session-head"><em>${index}회</em><input placeholder="회차 제목을 입력하세요" value="라이브 Q&A"><button type="button" class="remove-row" onclick="removeLiveSessionRow(this)">×</button></div><div class="live-session-fields"><label>진행일<input type="date"></label><label>시작 시간<input type="time" value="20:00"></label><label>진행 시간<div class="input-suffix"><input type="number" value="120" min="1"><span>분</span></div></label><label class="wide">라이브 참여 링크<input type="url" placeholder="https://zoom.us/j/..."></label><label class="wide">회차 안내<textarea placeholder="이번 라이브에서 다룰 내용이나 준비 사항을 입력해 주세요."></textarea></label></div></div>`;}
function toggleLiveSchedule(enabled){const block=document.getElementById('liveScheduleBlock');if(block)block.hidden=!enabled;}
function addLiveSessionRow(){const rows=document.getElementById('liveSessionRows'),count=rows.children.length+1;rows.insertAdjacentHTML('beforeend',liveSessionRow(count));updateLiveSessionCount();}
function removeLiveSessionRow(button){const rows=document.getElementById('liveSessionRows');if(rows.children.length===1){adminToast('라이브 일정은 최소 1개가 필요합니다');return;}button.closest('.live-session-card').remove();[...rows.children].forEach((row,i)=>row.querySelector('.live-session-head>em').textContent=(i+1)+'회');updateLiveSessionCount();}
function updateLiveSessionCount(){const rows=document.getElementById('liveSessionRows'),count=document.getElementById('liveSessionCount');if(rows&&count)count.textContent=rows.children.length+'회';}
function addMaterialRow(){const box=document.getElementById('materialRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',materialRow(count));document.getElementById('materialCount').textContent=count+'개';}
function removeEditorRow(button,listId,countId,suffix){const list=document.getElementById(listId);if(list.children.length===1){adminToast('최소 1개 항목이 필요합니다');return;}button.closest('.repeat-row').remove();[...list.children].forEach((row,i)=>row.querySelector('em').textContent=suffix==='강'?`${i+1}강`:i+1);document.getElementById(countId).textContent=list.children.length+suffix;}
function scrollEditorSection(id,button){document.querySelectorAll('.editor-steps button').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});}
function saveClassForm(event,mode){event.preventDefault();adminToast(mode==='edit'?'변경사항을 저장했습니다':mode==='clone'?'복제본을 비공개로 저장했습니다':'클래스 검토를 요청했습니다');setTimeout(()=>showAdminView('classes'),700);}
function openClassEditor(mode,classId=''){document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='classes'));document.getElementById('adminContent').innerHTML=renderClassEditor(mode,classId);window.scrollTo({top:0});location.hash=mode==='edit'?`#class-edit-${classId}`:mode==='clone'?`#class-clone-${classId}`:'#class-new';}

function studentTable(rows,compact=false){
  return `<div class="table-wrap"><table><thead><tr><th>수강생</th><th>클래스</th>${compact?'':'<th>결제 금액</th>'}<th>신청일</th><th>상태</th></tr></thead><tbody>${rows.map(s=>`<tr><td><div class="student-cell"><span>${s.name[0]}</span><div><b>${s.name}</b><small>${s.email}</small></div></div></td><td>${s.course}</td>${compact?'':`<td><b>${s.paid}</b></td>`}<td>${s.joined}</td><td><em class="table-state">${s.state}</em></td></tr>`).join('')}</tbody></table></div>`;
}

function renderStudents(){
  return `${pageHeader('Student management','수강생 관리','결제·수강 상태와 클래스 참여 정보를 확인합니다.','')}
  <div class="filter-bar"><div class="admin-search">⌕ <input placeholder="이름 또는 이메일 검색" oninput="filterStudents(this.value)"></div><select><option>전체 클래스</option><option>경매 낙찰 기초반</option><option>권리분석 실전반</option></select><select><option>전체 상태</option><option>수강 중</option><option>결제 완료</option></select></div>
  <article class="panel full-table" id="studentTable">${studentTable(students)}</article>`;
}

function filterStudents(query){
  const q=query.trim().toLowerCase(),filtered=students.filter(s=>`${s.name} ${s.email} ${s.course}`.toLowerCase().includes(q));
  document.getElementById('studentTable').innerHTML=studentTable(filtered);
}

function renderSales(){
  return `${pageHeader('Sales & payout','매출·정산','클래스별 매출과 정산 예정 금액을 확인합니다.')}
  <section class="payout-hero"><div><span>다음 정산 예정 금액</span><strong>₩15,936,000</strong><p>2026년 7월 10일 입금 예정 · 환불·취소 반영 후</p></div><button onclick="adminToast('정산 계좌 관리 (예시)')">정산 계좌 관리</button></section>
  <section class="metric-grid two"><article class="metric-card"><span>6월 총 결제</span><strong>₩18,420,000</strong><small class="up">↑ 18.6%</small></article><article class="metric-card"><span>환불·취소</span><strong>₩273,600</strong><small><i>2건</i></small></article></section>
  <article class="panel payout-table"><div class="panel-head"><div><h2>클래스별 매출</h2><p>2026년 6월 결제 완료 기준</p></div></div><table><thead><tr><th>클래스</th><th>결제 건수</th><th>총 매출</th><th>정산 예정</th></tr></thead><tbody>${classes.map((c,i)=>{const gross=c.students*c.price,fee=Math.round(gross*.12);return `<tr><td><b>${c.title}</b></td><td>${c.students}건</td><td>${won(gross)}</td><td><strong>${won(gross-fee)}</strong></td></tr>`;}).join('')}</tbody></table></article>`;
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
  if(panel==='notifications') return `<div class="settings-grid"><form class="panel settings-form" onsubmit="event.preventDefault();adminToast('알림 설정을 저장했습니다')"><div class="settings-section-title"><div><span>NOTIFICATIONS</span><h2>운영 알림</h2><p>크리에이터 관리자에서 받아볼 주요 알림을 선택하세요.</p></div></div><div class="settings-toggle-list"><label><span><b>새 결제 알림</b><small>클래스 결제가 완료되면 알려드려요.</small></span><input type="checkbox" checked></label><label><span><b>수강 시작 알림</b><small>클래스 시작일에 운영 일정을 알려드려요.</small></span><input type="checkbox" checked></label><label><span><b>알림톡 승인 결과</b><small>템플릿 승인 상태가 변경되면 알려드려요.</small></span><input type="checkbox" checked></label><label><span><b>정산 예정 알림</b><small>정산 예정일 3일 전에 알려드려요.</small></span><input type="checkbox"></label></div><div class="settings-save"><button class="btn primary" type="submit">알림 설정 저장</button></div></form><aside class="panel settings-help"><span>알림 수신 채널</span><h3>이메일로 안내해 드려요</h3><p>creator@mmoh.kr</p><button type="button" onclick="adminToast('수신 이메일 변경 (예시)')">수신 이메일 변경</button></aside></div>`;
  if(panel==='payout') return `<div class="settings-grid"><form class="panel settings-form" onsubmit="event.preventDefault();adminToast('정산 정보를 저장했습니다')"><div class="settings-section-title"><div><span>PAYOUT</span><h2>정산 정보</h2><p>매출 정산을 받을 계좌와 사업자 정보를 관리합니다.</p></div><em>확인 완료</em></div><div class="settings-fields two"><label>예금주<input value="애매모홈"></label><label>은행<select><option>국민은행</option></select></label><label class="wide">계좌번호<input value="123-456-789012"></label><label class="wide">정산 이메일<input value="creator@mmoh.kr"></label></div><div class="settings-save"><small>계좌 변경 시 관리자 확인 후 다음 정산부터 적용됩니다.</small><button class="btn primary" type="submit">정산 정보 저장</button></div></form><aside class="panel settings-help"><span>다음 정산</span><strong>7월 10일</strong><p>예정 금액 ₩15,936,000</p><button type="button" onclick="showAdminView('sales')">매출·정산 보기</button></aside></div>`;
  if(panel==='admins') return `<div class="settings-grid"><section class="panel settings-form"><div class="settings-section-title"><div><span>ADMINS</span><h2>관리자 권한</h2><p>채널을 함께 운영할 관리자를 확인하고 초대합니다.</p></div><button class="btn primary" type="button" onclick="adminToast('관리자 초대 (예시)')">+ 관리자 초대</button></div><div class="settings-admin-list"><article><span>이</span><div><b>이원익</b><small>owner@mmoh.kr · 소유자</small></div><em>전체 권한</em></article><article><span>김</span><div><b>김운영</b><small>manager@mmoh.kr · 운영자</small></div><em>클래스·수강생</em></article></div></section><aside class="panel settings-help"><span>권한 안내</span><h3>필요한 범위만 부여하세요</h3><p>소유자는 정산 정보와 관리자 권한을 포함한 모든 설정을 변경할 수 있습니다.</p></aside></div>`;
  return `<div class="settings-grid"><form class="panel settings-form settings-profile-form" onsubmit="event.preventDefault();adminToast('채널 정보를 저장했습니다')"><div class="settings-section-title"><div><span>PUBLIC CHANNEL</span><h2>공개 채널 정보</h2><p>크리에이터 페이지에 노출되는 프로필과 소개를 관리합니다.</p></div><em>공개 중</em></div><div class="settings-profile-top"><div class="settings-avatar">${houseMark(72)}<div><b>프로필 이미지</b><small>권장 크기 400 × 400px</small><button type="button">이미지 변경</button></div></div></div><div class="settings-cover-picker"><div><b>프로필 배경색</b><small>크리에이터 공개 페이지 상단에 적용됩니다.</small></div><div class="settings-color-options"><button type="button" class="active" style="--swatch:#cbe7f1" onclick="selectChannelColor(this,'#cbe7f1')" aria-label="하늘색"></button><button type="button" style="--swatch:#e2e0ff" onclick="selectChannelColor(this,'#e2e0ff')" aria-label="보라색"></button><button type="button" style="--swatch:#f8ddd8" onclick="selectChannelColor(this,'#f8ddd8')" aria-label="분홍색"></button><button type="button" style="--swatch:#dceedb" onclick="selectChannelColor(this,'#dceedb')" aria-label="초록색"></button><button type="button" style="--swatch:#f8e7c5" onclick="selectChannelColor(this,'#f8e7c5')" aria-label="노란색"></button><label class="settings-custom-color"><input type="color" value="#cbe7f1" oninput="selectChannelColor(this,this.value)"><span>직접 선택</span></label></div></div><div class="settings-fields two"><label>크리에이터명<input value="애매모홈"></label><label>핸들<input value="@mmoh"></label><label class="wide">카테고리<select><option>부동산·경매</option></select></label><label class="wide">한 줄 소개<input value="월급쟁이도 이해하는 실전 부동산 경매"></label><label class="wide">상세 소개<textarea>경매 입문부터 권리분석, 현장 임장, 명도, 세금까지. 직장인 눈높이에 맞춰 실전에서 바로 쓰는 낙찰 노하우를 전합니다.</textarea></label></div><div class="settings-save"><small>저장한 정보는 공개 크리에이터 페이지에 바로 반영됩니다.</small><button class="btn primary" type="submit">변경사항 저장</button></div></form><aside class="panel settings-preview"><span>공개 페이지 미리보기</span><div class="settings-preview-card" id="settingsChannelPreview" style="background:${getSavedChannelColor()}">${houseMark(76)}<h3>애매모홈</h3><p>@mmoh · 부동산·경매</p><small>월급쟁이도 이해하는 실전 부동산 경매</small><button type="button" onclick="window.open('./index.html#/c/mmoh','_blank')">내 페이지 보기 ↗</button></div></aside></div>`;
}
function getSavedChannelColor(){try{return localStorage.getItem('nhz-mmoh-cover')||'#cbe7f1';}catch(error){return '#cbe7f1';}}
function selectChannelColor(control,color){document.querySelectorAll('.settings-color-options>button').forEach(button=>button.classList.remove('active'));if(control.tagName==='BUTTON')control.classList.add('active');const preview=document.getElementById('settingsChannelPreview');if(preview)preview.style.background=color;try{localStorage.setItem('nhz-mmoh-cover',color);}catch(error){}adminToast('프로필 배경색을 선택했습니다');}
function switchSettingsPanel(panel,button){
  document.querySelectorAll('.settings-tabs button').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  document.getElementById('settingsPanel').innerHTML=settingsPanelMarkup(panel);
}
const saleProducts=[
  {type:'멤버십',name:'입문 멤버십',desc:'경매 기초 강의 이용권',price:190000,period:'결제일로부터 90일',courses:['경매 낙찰 기초반'],status:'판매중'},
  {type:'멤버십',name:'중급 멤버십',desc:'기초 + 권리분석까지 단계별 수강',price:390000,period:'결제일로부터 120일',courses:['경매 낙찰 기초반','권리분석 실전반'],status:'판매중'},
  {type:'패키지',name:'경매 실전 패키지',desc:'기초·권리분석·임장을 한 번에 구성',price:790000,period:'지정 수강기간',courses:['경매 낙찰 기초반','권리분석 실전반','현장 임장 마스터'],status:'준비중'},
  {type:'개별 강의',name:'경매 낙찰 기초반 단품',desc:'하나의 강의만 단독 판매',price:290000,period:'2026.07.05 ~ 08.02',courses:['경매 낙찰 기초반'],status:'판매중'}
];
function renderProducts(){
  return `${pageHeader('Product & membership','상품·멤버십 관리','사용자가 결제하는 상품과 포함 강의, 이용 기간을 관리합니다.','<button class="btn primary" onclick="openProductEditor(\'create\')">+ 새 상품 만들기</button>')}
  <section class="product-policy-panel panel"><div><span>구조 변경</span><h2>강의와 판매 상품을 분리합니다</h2><p>강의는 영상·자료·FAQ 같은 학습 콘텐츠이고, 상품은 사용자가 결제하는 대상입니다. 하나의 강의는 개별 상품, 패키지, 멤버십에 동시에 포함될 수 있습니다.</p></div><ul><li>상품 결제 완료 → 포함 강의 권한 부여</li><li>선수강 조건은 강의에 설정</li><li>유효한 권한이 하나라도 있으면 강의 이용 가능</li></ul></section>
  <div class="product-admin-grid">${saleProducts.map((product,index)=>`<article class="sale-product-card"><div class="sale-product-top"><span>${product.type}</span><em class="${product.status==='판매중'?'open':'soon'}">${product.status}</em></div><h2>${product.name}</h2><p>${product.desc}</p><strong>${won(product.price)}</strong><small>이용 기간 · ${product.period}</small><div class="included-courses"><b>포함 강의</b>${product.courses.map(course=>`<span>${course}</span>`).join('')}</div><button type="button" onclick="adminToast('${product.name} \uc218\uc815 \ud654\uba74\uc785\ub2c8\ub2e4 (\uc608\uc2dc)')">상품 수정</button></article>`).join('')}</div>
  <article class="panel product-matrix"><div class="panel-head"><div><h2>상품별 수강 권한 매트릭스</h2><p>상품 구매 시 어떤 강의 권한이 부여되는지 확인합니다.</p></div></div><table><thead><tr><th>상품</th><th>유형</th><th>포함 강의</th><th>이용 기간</th><th>정책</th></tr></thead><tbody>${saleProducts.map(product=>`<tr><td><b>${product.name}</b></td><td>${product.type}</td><td>${product.courses.join(' · ')}</td><td>${product.period}</td><td>${product.type==='멤버십'?'등급별 권한 부여':'상품별 권한 부여'}</td></tr>`).join('')}</tbody></table></article>`;
}

function renderProductEditor(mode='create'){
  return `<form class="product-editor" onsubmit="saveProductForm(event,'${mode}')">
    <div class="editor-head"><button type="button" class="editor-back" onclick="showAdminView('products')">← 상품·멤버십 관리</button><div><span>Product setup</span><h1>새 상품 만들기</h1><p>사용자가 결제할 상품을 만들고, 상품에 포함될 강의와 이용 기간을 설정합니다.</p></div><div class="editor-actions"><button type="button" class="btn ghost" onclick="adminToast('\uc0c1\ud488 \ubbf8\ub9ac\ubcf4\uae30 \ud654\uba74\uc785\ub2c8\ub2e4 (\uc608\uc2dc)')">미리보기</button><button type="button" class="btn ghost" onclick="adminToast('\uc784\uc2dc \uc800\uc7a5\ud588\uc2b5\ub2c8\ub2e4')">임시 저장</button><button type="submit" class="btn primary">상품 등록</button></div></div>
    <section class="product-setup-hero panel"><div><span>상품은 결제 대상입니다</span><h2>강의 콘텐츠와 판매 상품을 분리해서 관리하세요</h2><p>하나의 강의는 단품, 패키지, 멤버십에 동시에 포함될 수 있습니다. 결제가 완료되면 포함 강의의 수강 권한이 자동으로 부여됩니다.</p></div><ul><li>강의 = 영상·자료·FAQ</li><li>상품 = 가격·판매기간·포함 강의</li><li>권한 = 상품 구매 결과</li></ul></section>
    <div class="product-editor-grid"><div class="product-editor-main">
      <section class="panel product-section"><div class="product-section-head"><i>1</i><div><h2>상품 유형</h2><p>크리에이터의 판매 방식에 맞는 상품 유형을 선택하세요.</p></div></div><div class="product-type-grid"><button type="button" class="active" data-type="single" onclick="selectProductType(this,'single')"><b>개별 강의 상품</b><small>하나의 강의를 단독 판매</small></button><button type="button" data-type="bundle" onclick="selectProductType(this,'bundle')"><b>강의 묶음 상품</b><small>여러 강의를 패키지로 판매</small></button><button type="button" data-type="membership" onclick="selectProductType(this,'membership')"><b>멤버십 상품</b><small>등급별로 여러 강의 권한 제공</small></button></div><p class="product-type-note" id="productTypeNote">개별 강의 상품은 하나의 강의를 단독으로 판매할 때 사용합니다.</p></section>
      <section class="panel product-section"><div class="product-section-head"><i>2</i><div><h2>상품 정보</h2><p>공개 페이지와 결제 화면에 보이는 정보를 입력합니다.</p></div></div><div class="editor-fields"><label class="wide">상품명 <em>*</em><input required value="경매 낙찰 기초반 단품" placeholder="예: 중급 멤버십, 경매 실전 패키지"></label><label class="wide">상품 소개 <em>*</em><textarea required placeholder="상품에 포함된 강의와 수강 흐름을 설명해 주세요.">경매 입문자가 기초 강의를 먼저 듣고 실전 감각을 만들 수 있는 상품입니다.</textarea></label><label>상품 상태<select><option>판매중</option><option>판매예정</option><option>비공개</option></select></label><label>추천 표시<select><option>표시 안 함</option><option>추천 상품</option><option>대표 상품</option></select></label></div></section>
      <section class="panel product-section"><div class="product-section-head"><i>3</i><div><h2>포함 강의</h2><p>이 상품을 결제하면 권한이 부여될 강의를 선택합니다.</p></div></div><div class="included-lecture-list"><label><input type="checkbox" checked><span><b>경매 낙찰 기초반</b><small>선수강 없음 · 즉시 수강 가능</small></span></label><label><input type="checkbox"><span><b>권리분석 실전반</b><small>경매 낙찰 기초반 완료 후 학습 가능</small></span></label><label><input type="checkbox"><span><b>현장 임장 마스터</b><small>권리분석 실전반 완료 후 학습 가능</small></span></label></div><div class="product-warning"><b>선수강 조건은 강의에 설정됩니다.</b><p>상품에 포함되어 권한을 보유하더라도, 선수강 조건을 충족하기 전까지 해당 강의는 내 학습에서 잠금 상태로 표시됩니다.</p></div></section>
      <section class="panel product-section"><div class="product-section-head"><i>4</i><div><h2>가격·이용 기간</h2><p>MVP에서는 1회 결제와 상품별 이용 기간을 우선 적용합니다.</p></div></div><div class="editor-fields"><label>결제 방식<select><option>1회 결제</option><option disabled>월 정기결제 · 후속 단계</option><option disabled>연 정기결제 · 후속 단계</option></select></label><label>판매 가격 <em>*</em><div class="input-suffix"><input required type="number" min="0" step="1000" value="290000"><span>원</span></div></label><label>판매 시작일<input type="date" value="2026-07-01"></label><label>판매 종료일<input type="date" value="2026-07-31"></label><label>이용 기간 기준<select><option>결제일 기준</option><option>지정 수강 기간 기준</option><option>기간 제한 없음</option></select></label><label>이용 기간<div class="input-suffix"><input type="number" min="1" value="90"><span>일</span></div></label></div></section>
      <section class="panel product-section"><div class="product-section-head"><i>5</i><div><h2>환불·공개 정책</h2><p>상품 결제 전 확인할 정책과 공개 상태를 설정합니다.</p></div></div><div class="editor-fields"><label class="wide">환불 안내 <em>*</em><textarea required>결제 후 수강 시작 전까지 취소할 수 있으며, 수강 시작 후에는 노하우집 운영 정책에 따라 환불됩니다.</textarea></label><label class="wide">결제 완료 안내<textarea>결제 완료 후 내 학습에서 포함 강의와 수강 안내를 확인할 수 있습니다.</textarea></label></div><div class="publish-options"><label><input type="radio" name="product-publish" checked><span><b>판매중으로 공개</b><small>저장 후 공개 페이지에 상품이 노출됩니다.</small></span></label><label><input type="radio" name="product-publish"><span><b>비공개로 저장</b><small>관리자에서만 확인하고 나중에 공개합니다.</small></span></label></div></section>
    </div><aside class="product-editor-side"><div class="panel product-summary"><span>상품 요약</span><h3>경매 낙찰 기초반 단품</h3><p>개별 강의 상품 · 1회 결제</p><strong>₩290,000</strong><div><b>포함 강의</b><em>경매 낙찰 기초반</em></div><small>결제 완료 시 포함 강의 권한이 부여됩니다.</small></div><div class="panel product-side-guide"><b>생성 후 흐름</b><ol><li>상품 공개</li><li>사용자 결제</li><li>포함 강의 권한 부여</li><li>선수강 조건 확인</li><li>내 학습에서 수강</li></ol></div></aside></div>
    <div class="editor-bottom-bar"><span><b>새 상품</b><small>필수 항목을 확인한 뒤 등록하세요.</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('products')">취소</button><button type="button" class="btn ghost" onclick="adminToast('\uc784\uc2dc \uc800\uc7a5\ud588\uc2b5\ub2c8\ub2e4')">임시 저장</button><button type="submit" class="btn primary">상품 등록</button></div></div>
  </form>`;
}
function selectProductType(button,type){
  document.querySelectorAll('.product-type-grid button').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const notes={single:'개별 강의 상품은 하나의 강의를 단독으로 판매할 때 사용합니다.',bundle:'강의 묶음 상품은 여러 강의를 한 번에 구매하도록 구성합니다.',membership:'멤버십 상품은 등급별로 여러 강의 권한을 제공할 때 사용합니다.'};
  const note=document.getElementById('productTypeNote');if(note)note.textContent=notes[type];
}
function openProductEditor(mode='create'){
  document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='products'));
  document.getElementById('adminContent').innerHTML=renderProductEditor(mode);
  window.scrollTo({top:0});
  location.hash='#product-new';
}
function saveProductForm(event,mode){event.preventDefault();adminToast('\uc0c1\ud488\uc744 \ub4f1\ub85d\ud588\uc2b5\ub2c8\ub2e4');setTimeout(()=>showAdminView('products'),700);}

function renderSettings(){
  return `${pageHeader('Channel settings','채널 설정','공개 채널 정보와 운영에 필요한 설정을 관리합니다.')}
  <nav class="settings-tabs"><button class="active" onclick="switchSettingsPanel('profile',this)">공개 채널</button><button onclick="switchSettingsPanel('notifications',this)">운영 알림</button><button onclick="switchSettingsPanel('payout',this)">정산 정보</button><button onclick="switchSettingsPanel('admins',this)">관리자 권한</button></nav>
  <section id="settingsPanel">${settingsPanelMarkup('profile')}</section>`;
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
else if(initialView.startsWith('class-clone-'))openClassEditor('clone',initialView.replace('class-clone-',''));
else if(initialView==='product-new')openProductEditor('create');
else showAdminView(viewRenderers[initialView]?initialView:'dashboard');

document.addEventListener('keydown',event=>{if(event.key==='Escape')closeClassPreview();});
