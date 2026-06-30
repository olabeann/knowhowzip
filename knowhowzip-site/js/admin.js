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

const inquiries=[
  {type:'수강 문의',title:'경매 초보도 바로 수강 가능한가요?',name:'윤수빈',time:'12분 전',unread:true},
  {type:'결제 문의',title:'카드 할부 결제가 가능한지 궁금합니다.',name:'한지우',time:'34분 전',unread:true},
  {type:'운영 문의',title:'라이브 강의에 참석하지 못하면 어떻게 하나요?',name:'임도윤',time:'1시간 전',unread:true},
  {type:'자료 문의',title:'입찰표 템플릿은 언제 받을 수 있나요?',name:'송하린',time:'3시간 전',unread:true},
  {type:'수강 문의',title:'다음 기수 모집 일정이 궁금합니다.',name:'문재호',time:'어제',unread:false}
];

const won=n=>'₩'+Number(n).toLocaleString('ko-KR');

function pageHeader(kicker,title,desc,actions=''){
  return `<div class="admin-page-head"><div><span>${kicker}</span><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;
}

function renderDashboard(){
  const bars=[34,46,42,61,55,74,68,83,79,91,87,100];
  return `${pageHeader('2026년 6월 30일 화요일','안녕하세요, 애매모홈님 👋','오늘의 클래스 운영 현황을 한눈에 확인하세요.','<button class="btn ghost" onclick="adminToast(\'미리보기 페이지를 엽니다 (예시)\')">공개 페이지 보기 ↗</button><button class="btn primary" onclick="openClassEditor(\'create\')">+ 새 클래스 만들기</button>')}
    <section class="metric-grid">
      <article class="metric-card"><div class="metric-icon blue">₩</div><span>이번 달 매출</span><strong>₩18,420,000</strong><small class="up">↑ 18.6% <i>지난달 대비</i></small></article>
      <article class="metric-card"><div class="metric-icon violet">♙</div><span>전체 수강생</span><strong>48명</strong><small class="up">↑ 7명 <i>이번 주 신규</i></small></article>
      <article class="metric-card"><div class="metric-icon green">▶</div><span>운영 중인 클래스</span><strong>3개</strong><small><i>모집중 2 · 예정 1</i></small></article>
      <article class="metric-card"><div class="metric-icon amber">✉</div><span>답변 대기 문의</span><strong>4건</strong><small class="warn">평균 응답 2시간</small></article>
    </section>

    <section class="dashboard-grid">
      <article class="panel sales-chart-panel">
        <div class="panel-head"><div><h2>매출 추이</h2><p>최근 12주 결제 완료 기준</p></div><select><option>최근 12주</option><option>최근 6개월</option></select></div>
        <div class="chart-summary"><strong>₩42,830,000</strong><span>누적 매출</span><em>+12.4%</em></div>
        <div class="bar-chart">${bars.map((h,i)=>`<div class="bar-item"><i style="height:${h}%"><span>${['3.1','4.2','3.8','5.6','5.0','6.8','6.2','7.5','7.1','8.3','7.9','9.1'][i]}M</span></i><small>${i+1}주</small></div>`).join('')}</div>
      </article>

      <article class="panel cohort-panel">
        <div class="panel-head"><div><h2>기수 운영 현황</h2><p>모집 및 수강 진행 상태</p></div><button class="text-btn" onclick="showAdminView('classes')">전체 보기 →</button></div>
        <div class="cohort-list">${classes.map((c,i)=>`<button onclick="showAdminView('classes')"><span class="cohort-color" style="background:${c.color}">${i+1}</span><span class="cohort-info"><b>${c.title.split(' · ')[0]}</b><small>${c.cohort} · ${c.period}</small></span><span class="cohort-state ${c.status==='모집중'?'open':'soon'}">${c.status}</span><strong>${c.students}/${c.seats}</strong></button>`).join('')}</div>
      </article>
    </section>

    <section class="dashboard-grid lower">
      <article class="panel recent-panel">
        <div class="panel-head"><div><h2>최근 수강 신청</h2><p>새로 결제한 수강생</p></div><button class="text-btn" onclick="showAdminView('students')">전체 보기 →</button></div>
        ${studentTable(students.slice(0,4),true)}
      </article>
      <article class="panel todo-panel">
        <div class="panel-head"><div><h2>오늘 할 일</h2><p>운영에 필요한 작업</p></div></div>
        <label><input type="checkbox"><span><b>경매 기초반 3기 공지 등록</b><small>오늘 오후 6시까지</small></span><em class="high">중요</em></label>
        <label><input type="checkbox"><span><b>미답변 문의 4건 확인</b><small>평균 대기 1시간 42분</small></span><em>문의</em></label>
        <label><input type="checkbox" checked><span><b>권리분석 2기 줌 링크 발송</b><small>오전 9:20 완료</small></span><em class="done">완료</em></label>
      </article>
    </section>`;
}

function renderClasses(){
  return `${pageHeader('Class management','클래스 관리','클래스와 기수별 모집·운영 상태를 관리합니다.','<button class="btn primary" onclick="openClassEditor(\'create\')">+ 새 클래스 만들기</button>')}
  <div class="class-admin-grid">${classes.map((c,i)=>`<article class="admin-class-card"><div class="class-cover" style="background:${c.color}">${houseMark(70)}<span>${c.status}</span></div><div class="class-card-body"><div class="class-card-top"><em>${c.cohort}</em><button>•••</button></div><h2>${c.title}</h2><p>${c.period} · ${c.students}/${c.seats}명 신청</p><div class="seat-progress"><i style="width:${Math.round(c.students/c.seats*100)}%"></i></div><div class="class-card-foot"><strong>${won(c.price)}</strong><button onclick="openClassEditor('edit','${c.id}')">관리하기 →</button></div></div></article>`).join('')}</div>`;
}

function renderClassEditor(mode='create',classId=''){
  const editing=mode==='edit',course=classes.find(c=>c.id===classId)||{};
  const title=course.title||'',parts=title.split(' · '),name=parts[0]||'',subtitle=parts.slice(1).join(' · ');
  const curriculum=editing?['경매 절차와 권리의 이해','물건 검색과 시세 분석','입찰표 작성 실습','모의 입찰 & 라이브 Q&A']:[''];
  const materials=editing?['주차별 강의 노트(PDF)','입찰표 작성 템플릿','물건 분석 체크리스트']:[''];
  return `<form class="class-editor" onsubmit="saveClassForm(event,'${mode}')">
    <div class="editor-head"><button type="button" class="editor-back" onclick="showAdminView('classes')">← 클래스 관리</button><div><span>${editing?'Class editing':'New class'}</span><h1>${editing?'클래스 수정':'새 클래스 만들기'}</h1><p>${editing?'공개 중인 클래스 정보와 다음 기수 운영 내용을 수정합니다.':'클래스 소개부터 콘텐츠와 운영 방식까지 순서대로 입력하세요.'}</p></div><div class="editor-actions"><button type="button" class="btn ghost" onclick="adminToast('미리보기를 엽니다 (예시)')">미리보기</button><button type="button" class="btn ghost" onclick="adminToast('임시 저장했습니다')">임시 저장</button><button type="submit" class="btn primary">${editing?'변경사항 저장':'검토 후 등록'}</button></div></div>
    <div class="editor-layout">
      <nav class="editor-steps"><button type="button" class="active" onclick="scrollEditorSection('editor-basic',this)"><i>1</i><span>기본 정보<small>제목·소개·커버</small></span></button><button type="button" onclick="scrollEditorSection('editor-cohort',this)"><i>2</i><span>기수·가격<small>일정·인원·금액</small></span></button><button type="button" onclick="scrollEditorSection('editor-content',this)"><i>3</i><span>콘텐츠<small>영상·제공 자료</small></span></button><button type="button" onclick="scrollEditorSection('editor-operation',this)"><i>4</i><span>운영 안내<small>단톡방·라이브</small></span></button><button type="button" onclick="scrollEditorSection('editor-publish',this)"><i>5</i><span>공개 설정<small>상태·노출</small></span></button></nav>
      <div class="editor-sections">
        <section class="panel editor-section" id="editor-basic"><div class="editor-section-head"><i>1</i><div><h2>기본 정보</h2><p>수강생이 클래스 목록과 상세 페이지에서 가장 먼저 보는 정보입니다.</p></div><span>필수</span></div><div class="editor-cover-row"><div class="editor-cover-preview" style="background:${course.color||'linear-gradient(135deg,#DCE3FF,#AFC0FF)'}">${houseMark(72)}<button type="button" onclick="adminToast('커버 이미지 업로드 (예시)')">커버 변경</button></div><div class="editor-cover-guide"><b>커버 이미지</b><p>권장 크기 1280×800px · JPG, PNG · 최대 5MB</p><button type="button" class="btn ghost" onclick="adminToast('이미지 선택 (예시)')">이미지 선택</button></div></div><div class="editor-fields"><label class="wide">클래스 제목 <em>*</em><input required maxlength="60" value="${name}" placeholder="예: 경매 낙찰 기초반"><small>핵심 주제와 수강 결과가 드러나는 제목을 권장합니다.</small></label><label class="wide">부제목<input maxlength="80" value="${subtitle}" placeholder="예: 직장인을 위한 4주 완성"></label><label>카테고리 <em>*</em><select required><option>부동산·경매</option><option>재테크·주식</option><option>디자인</option><option>개발</option></select></label><label>난이도 <em>*</em><select required><option>입문</option><option>중급</option><option>심화</option></select></label><label class="wide">한 줄 소개 <em>*</em><input required value="${editing?'경매가 처음인 직장인을 위한 실전 입문 과정':''}" placeholder="수강생에게 약속하는 핵심 변화를 한 문장으로 적어주세요"></label><label class="wide">상세 소개 <em>*</em><textarea required placeholder="클래스에서 무엇을, 어떻게 배우는지 자세히 소개해 주세요.">${editing?'복잡한 경매 절차를 직장인 눈높이로 풀었습니다. 실제 물건을 분석하고 입찰표까지 직접 작성합니다.':''}</textarea></label></div></section>

        <section class="panel editor-section" id="editor-cohort"><div class="editor-section-head"><i>2</i><div><h2>기수·가격</h2><p>모집 일정과 수강 기간, 최대 인원 및 판매 가격을 설정합니다.</p></div><span>필수</span></div><div class="editor-fields"><label>기수명 <em>*</em><input required value="${course.cohort||'1기'}"></label><label>모집 상태<select><option ${course.status==='모집중'?'selected':''}>모집중</option><option ${course.status==='모집예정'?'selected':''}>모집예정</option><option>마감</option></select></label><label>모집 시작일<input type="date" value="2026-06-15"></label><label>모집 마감일<input type="date" value="2026-06-30"></label><label>수강 시작일 <em>*</em><input required type="date" value="2026-07-05"></label><label>수강 종료일 <em>*</em><input required type="date" value="2026-08-02"></label><label>모집 정원 <em>*</em><div class="input-suffix"><input required type="number" min="1" value="${course.seats||30}"><span>명</span></div></label><label>판매 가격 <em>*</em><div class="input-suffix"><input required type="number" min="0" step="1000" value="${course.price||290000}"><span>원</span></div></label><label>정가<div class="input-suffix"><input type="number" min="0" step="1000" value="390000"><span>원</span></div></label><label>수강 종료 후 열람<select><option>열람 불가</option><option>30일간 가능</option><option>기간 제한 없음</option></select></label></div></section>

        <section class="panel editor-section" id="editor-content"><div class="editor-section-head"><i>3</i><div><h2>콘텐츠</h2><p>수강생에게 제공할 영상 커리큘럼과 다운로드 자료를 구성합니다.</p></div><span>필수</span></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>영상 커리큘럼</h3><p>강의 순서는 드래그해서 변경할 수 있습니다.</p></div><span id="curriculumCount">${curriculum.length}강</span></div><div class="repeat-list" id="curriculumRows">${curriculum.map((item,i)=>curriculumRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addCurriculumRow()">＋ 강의 추가</button></div><div class="content-editor-block"><div class="content-editor-title"><div><h3>제공 자료</h3><p>PDF, 문서, 템플릿 등 수강생이 내려받을 자료입니다.</p></div><span id="materialCount">${materials.length}개</span></div><div class="repeat-list" id="materialRows">${materials.map((item,i)=>materialRow(i+1,item)).join('')}</div><button type="button" class="add-row-btn" onclick="addMaterialRow()">＋ 자료 추가</button></div></section>

        <section class="panel editor-section" id="editor-operation"><div class="editor-section-head"><i>4</i><div><h2>운영 안내</h2><p>라이브 강의와 커뮤니티 운영 방식을 입력합니다.</p></div></div><div class="editor-fields"><label>라이브 진행 요일<select><option>화요일</option><option>목요일</option><option>토요일</option></select></label><label>라이브 시작 시간<input type="time" value="20:00"></label><label>회당 진행 시간<div class="input-suffix"><input type="number" value="120"><span>분</span></div></label><label>진행 도구<select><option>Zoom</option><option>Google Meet</option><option>오프라인</option></select></label><label class="wide">카카오톡 단톡방 링크<input type="url" placeholder="https://open.kakao.com/o/..."></label><label class="wide">Zoom 기본 입장 링크<input type="url" placeholder="https://zoom.us/j/..."></label><label class="wide">운영 안내문<textarea>${editing?'매주 화요일 저녁 8시 줌 라이브로 진행됩니다. 입장 링크는 시작 30분 전 단톡방에 안내됩니다.':''}</textarea></label></div></section>

        <section class="panel editor-section" id="editor-publish"><div class="editor-section-head"><i>5</i><div><h2>공개 설정</h2><p>저장 후 클래스가 노출되는 방식을 선택합니다.</p></div></div><div class="publish-options"><label><input type="radio" name="publish" checked><span><b>${editing?'공개 상태 유지':'검토 요청 후 공개'}</b><small>${editing?'수정 즉시 공개 페이지에 반영됩니다.':'운영팀 검토가 끝나면 판매가 시작됩니다.'}</small></span></label><label><input type="radio" name="publish"><span><b>비공개로 저장</b><small>크리에이터 관리자에서만 확인할 수 있습니다.</small></span></label></div><div class="editor-check"><label><input required type="checkbox" ${editing?'checked':''}> 입력한 클래스 정보와 운영 일정이 정확함을 확인했습니다.</label></div></section>
      </div>
    </div>
    <div class="editor-bottom-bar"><span><b>${editing?'공개 중인 클래스':'새 클래스'}</b><small>${editing?'마지막 수정 2026.06.28 14:32':'필수 항목을 모두 입력해 주세요.'}</small></span><div><button type="button" class="btn ghost" onclick="showAdminView('classes')">취소</button><button type="button" class="btn ghost" onclick="adminToast('임시 저장했습니다')">임시 저장</button><button type="submit" class="btn primary">${editing?'변경사항 저장':'검토 후 등록'}</button></div></div>
  </form>`;
}

function curriculumRow(index,value=''){return `<div class="repeat-row"><span class="drag">⋮⋮</span><em>${index}강</em><input required value="${value}" placeholder="강의 제목을 입력하세요"><select><option>영상</option><option>라이브</option></select><div class="input-suffix duration"><input type="number" value="80"><span>분</span></div><button type="button" class="remove-row" onclick="removeEditorRow(this,'curriculumRows','curriculumCount','강')">×</button></div>`;}
function materialRow(index,value=''){return `<div class="repeat-row material"><span class="drag">⋮⋮</span><em>${index}</em><input value="${value}" placeholder="자료명을 입력하세요"><button type="button" class="file-pick" onclick="adminToast('파일 선택 (예시)')">파일 선택</button><button type="button" class="remove-row" onclick="removeEditorRow(this,'materialRows','materialCount','개')">×</button></div>`;}
function addCurriculumRow(){const box=document.getElementById('curriculumRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',curriculumRow(count));document.getElementById('curriculumCount').textContent=count+'강';}
function addMaterialRow(){const box=document.getElementById('materialRows'),count=box.children.length+1;box.insertAdjacentHTML('beforeend',materialRow(count));document.getElementById('materialCount').textContent=count+'개';}
function removeEditorRow(button,listId,countId,suffix){const list=document.getElementById(listId);if(list.children.length===1){adminToast('최소 1개 항목이 필요합니다');return;}button.closest('.repeat-row').remove();[...list.children].forEach((row,i)=>row.querySelector('em').textContent=suffix==='강'?`${i+1}강`:i+1);document.getElementById(countId).textContent=list.children.length+suffix;}
function scrollEditorSection(id,button){document.querySelectorAll('.editor-steps button').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});}
function saveClassForm(event,mode){event.preventDefault();adminToast(mode==='edit'?'변경사항을 저장했습니다':'클래스 검토를 요청했습니다');setTimeout(()=>showAdminView('classes'),700);}
function openClassEditor(mode,classId=''){document.querySelectorAll('.admin-nav button').forEach(button=>button.classList.toggle('active',button.dataset.view==='classes'));document.getElementById('adminContent').innerHTML=renderClassEditor(mode,classId);window.scrollTo({top:0});location.hash=mode==='edit'?`#class-edit-${classId}`:'#class-new';}

function studentTable(rows,compact=false){
  return `<div class="table-wrap"><table><thead><tr><th>수강생</th><th>클래스</th><th>기수</th>${compact?'':'<th>결제 금액</th>'}<th>신청일</th><th>상태</th></tr></thead><tbody>${rows.map(s=>`<tr><td><div class="student-cell"><span>${s.name[0]}</span><div><b>${s.name}</b><small>${s.email}</small></div></div></td><td>${s.course}</td><td>${s.cohort}</td>${compact?'':`<td><b>${s.paid}</b></td>`}<td>${s.joined}</td><td><em class="table-state">${s.state}</em></td></tr>`).join('')}</tbody></table></div>`;
}

function renderStudents(){
  return `${pageHeader('Student management','수강생 관리','결제·수강 상태와 클래스 참여 정보를 확인합니다.','<button class="btn ghost" onclick="adminToast(\'CSV 다운로드 (예시)\')">↓ 명단 다운로드</button><button class="btn primary" onclick="adminToast(\'수강생 초대 (예시)\')">+ 수강생 초대</button>')}
  <div class="filter-bar"><div class="admin-search">⌕ <input placeholder="이름 또는 이메일 검색" oninput="filterStudents(this.value)"></div><select><option>전체 클래스</option><option>경매 낙찰 기초반</option><option>권리분석 실전반</option></select><select><option>전체 상태</option><option>수강 중</option><option>결제 완료</option></select></div>
  <article class="panel full-table" id="studentTable">${studentTable(students)}</article>`;
}

function filterStudents(query){
  const q=query.trim().toLowerCase(),filtered=students.filter(s=>`${s.name} ${s.email} ${s.course}`.toLowerCase().includes(q));
  document.getElementById('studentTable').innerHTML=studentTable(filtered);
}

function renderSales(){
  return `${pageHeader('Sales & payout','매출·정산','클래스별 매출과 정산 예정 금액을 확인합니다.','<button class="btn ghost" onclick="adminToast(\'정산 내역 다운로드 (예시)\')">↓ 정산 내역</button>')}
  <section class="payout-hero"><div><span>다음 정산 예정 금액</span><strong>₩15,936,000</strong><p>2026년 7월 10일 입금 예정 · 수수료 및 환불 차감 후</p></div><button onclick="adminToast('정산 계좌 관리 (예시)')">정산 계좌 관리</button></section>
  <section class="metric-grid three"><article class="metric-card"><span>6월 총 결제</span><strong>₩18,420,000</strong><small class="up">↑ 18.6%</small></article><article class="metric-card"><span>플랫폼 수수료</span><strong>₩2,210,400</strong><small><i>결제 금액의 12%</i></small></article><article class="metric-card"><span>환불·취소</span><strong>₩273,600</strong><small><i>2건</i></small></article></section>
  <article class="panel payout-table"><div class="panel-head"><div><h2>클래스별 매출</h2><p>2026년 6월 결제 완료 기준</p></div></div><table><thead><tr><th>클래스</th><th>결제 건수</th><th>총 매출</th><th>수수료</th><th>정산 예정</th></tr></thead><tbody>${classes.map((c,i)=>{const gross=c.students*c.price,fee=Math.round(gross*.12);return `<tr><td><b>${c.title}</b><small>${c.cohort}</small></td><td>${c.students}건</td><td>${won(gross)}</td><td>${won(fee)}</td><td><strong>${won(gross-fee)}</strong></td></tr>`;}).join('')}</tbody></table></article>`;
}

function renderMessages(){
  return `${pageHeader('Inbox','문의 관리','수강 전후 문의에 답변하고 처리 상태를 관리합니다.')}
  <div class="inbox-layout"><aside class="inbox-list">${inquiries.map((q,i)=>`<button class="${i===0?'active':''}" onclick="selectInquiry(${i},this)">${q.unread?'<i></i>':''}<span><em>${q.type}</em><b>${q.title}</b><small>${q.name} · ${q.time}</small></span></button>`).join('')}</aside><article class="panel inquiry-detail" id="inquiryDetail">${inquiryDetail(0)}</article></div>`;
}

function inquiryDetail(index){const q=inquiries[index];return `<div class="inquiry-head"><span>${q.type}</span><h2>${q.title}</h2><p>${q.name} · ${q.time}</p></div><div class="inquiry-message">안녕하세요. 클래스 수강을 고민하고 있는데 궁금한 점이 있어 문의드립니다.<br><br>${q.title}<br>확인 부탁드립니다. 감사합니다.</div><textarea placeholder="답변을 입력하세요"></textarea><div class="reply-actions"><button class="btn ghost" onclick="adminToast('임시 저장되었습니다')">임시 저장</button><button class="btn primary" onclick="adminToast('답변을 전송했습니다 (예시)')">답변 보내기</button></div>`;}
function selectInquiry(index,button){document.querySelectorAll('.inbox-list button').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.getElementById('inquiryDetail').innerHTML=inquiryDetail(index);}

function renderSettings(){
  return `${pageHeader('Channel settings','채널 설정','크리에이터 공개 정보와 알림·운영 설정을 관리합니다.')}
  <div class="settings-layout"><nav><button class="active">프로필 정보</button><button>알림 설정</button><button>정산 정보</button><button>관리자 권한</button></nav><form class="panel settings-form" onsubmit="event.preventDefault();adminToast('설정을 저장했습니다 (예시)')"><h2>프로필 정보</h2><p>공개 크리에이터 페이지에 표시되는 정보입니다.</p><div class="settings-avatar">${houseMark(72)}<button type="button">이미지 변경</button></div><label>크리에이터명<input value="애매모홈"></label><label>핸들<input value="@mmoh"></label><label>카테고리<select><option>부동산·경매</option></select></label><label>소개 문구<input value="월급쟁이도 한 달 만에 낙찰받는 경매 낙찰 강좌"></label><label>상세 소개<textarea>경매 입문부터 권리분석, 현장 임장, 명도, 세금까지. 직장인 눈높이에 맞춰 실전에서 바로 쓰는 낙찰 노하우를 전합니다.</textarea></label><button class="btn primary" type="submit">변경사항 저장</button></form></div>`;
}

const viewRenderers={dashboard:renderDashboard,classes:renderClasses,students:renderStudents,sales:renderSales,messages:renderMessages,settings:renderSettings};
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
else showAdminView(viewRenderers[initialView]?initialView:'dashboard');
