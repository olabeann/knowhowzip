(function(){
  "use strict";

  const POLICIES=[
    {id:"admin.dashboard",pages:["creator-admin"],selector:".metric-grid.three",type:"데이터",title:"대시보드 집계 기준",summary:"한눈에 보는 운영 지표는 서버의 확정 상태를 기준으로 집계합니다.",rules:["매출은 결제 완료 금액을 기준으로 집계합니다.","수강생은 해당 크리에이터의 클래스를 현재 수강 중인 사용자 수입니다.","클래스는 공개 여부와 관계없이 등록된 클래스 수입니다."],spec:"PRODUCT_SPEC §6.1 · §9"},
    {id:"admin.dashboard-content",pages:["creator-admin"],selector:".cohort-panel",type:"정렬 · 이동",title:"최근 강의 콘텐츠",summary:"최근 등록한 강의 콘텐츠를 최대 3개까지 표시합니다.",rules:["등록일 내림차순으로 정렬합니다.","항목을 선택하면 해당 콘텐츠 수정 화면으로 이동합니다.","전체 보기는 강의 콘텐츠 목록으로 이동합니다."],spec:"PRODUCT_SPEC §6.1"},
    {id:"admin.dashboard-enrollment",pages:["creator-admin"],selector:".recent-panel",type:"결제 데이터",title:"최근 수강 신청",summary:"결제가 완료된 신청만 최근 결제 순으로 최대 4명까지 표시합니다.",rules:["결제 실패·취소 건은 제외합니다.","항목은 현재 크리에이터의 클래스 결제만 포함합니다.","전체 보기는 같은 기준의 수강생 관리 목록으로 이동합니다."],spec:"PRODUCT_SPEC §6.1 · §9"},
    {id:"admin.content-list",pages:["creator-admin"],selector:".class-admin-grid",type:"데이터 관계",title:"강의 콘텐츠와 클래스",summary:"강의 콘텐츠는 판매 클래스와 분리된 재사용 학습 자산입니다.",rules:["한 콘텐츠를 여러 클래스에 연결할 수 있습니다.","연결 클래스 수는 현재 관계 데이터를 기준으로 계산합니다.","콘텐츠 수정은 연결을 유지한 채 이를 사용하는 클래스에 반영됩니다."],spec:"PRODUCT_SPEC §4.1 · §6.2 · §13.1"},
    {id:"admin.class-list",pages:["creator-admin"],selector:".product-admin-grid",type:"상태 · 이동",title:"클래스 관리 기준",summary:"클래스는 수강생에게 판매되는 단위이며 공개와 비공개를 함께 관리합니다.",rules:["공개 상태는 공개·비공개로 구분합니다.","카드 선택 시 해당 클래스 수정 화면으로 이동합니다.","결제 가능 여부는 공개 상태와 모집 기간을 함께 확인합니다."],spec:"PRODUCT_SPEC §4.11 · §6.4 · §14.4"},
    {id:"admin.content-info",pages:["creator-admin"],selector:"#editor-content-info",type:"필수값",title:"강의 콘텐츠 기본 정보",summary:"콘텐츠 제목은 필수, 설명은 선택입니다.",rules:["콘텐츠 제목은 관리자용 구분값이며 수강생 판매명은 클래스명을 사용합니다."],spec:"PRODUCT_SPEC §6.3 · §10"},
    {id:"admin.content-assets",pages:["creator-admin"],selector:"#editor-content",type:"파일 · 순서",title:"영상과 자료 등록",summary:"영상은 1개 이상 필요하고 제공 자료는 선택입니다.",rules:["영상 순서가 수강생 화면의 강의 순서가 됩니다.","영상은 MP4·MOV·WebM, 강의당 최대 2GB입니다.","자료는 파일당 최대 50MB이며 서버에서도 형식과 용량을 검증합니다."],spec:"PRODUCT_SPEC §4.5~4.6 · §6.3 · §10"},
    {id:"admin.product-steps",pages:["creator-admin"],selector:".product-editor-steps",type:"단계형 입력",title:"클래스 등록 단계",summary:"1~7 단계는 페이지를 스크롤하지 않고 같은 폼의 입력 영역을 전환합니다.",rules:["한 번에 한 단계만 표시하며 단계가 바뀌어도 작성한 값은 유지합니다.","상단 단계 또는 이전·다음 버튼으로 필요한 단계에 자유롭게 이동합니다.","저장 시 전체 단계를 검증하고 오류가 있으면 가장 앞선 오류 단계로 전환합니다."],spec:"PRODUCT_SPEC §6.4"},
    {id:"admin.class-info",pages:["creator-admin"],selector:"#product-class-info",type:"필수값",title:"클래스 공개 정보",summary:"수강생이 신청 전에 확인할 클래스 정보를 구성합니다.",rules:["클래스명·한 줄 소개·상세 소개·대표 이미지·카테고리·난이도는 필수입니다.","검색과 노출에 사용할 키워드 태그를 1개 이상 등록합니다.","상세 소개는 서식·목록·링크·이미지를 지원하는 에디터 데이터로 저장합니다."],spec:"PRODUCT_SPEC §6.4 · 1단계 / §10"},
    {id:"admin.content-link",pages:["creator-admin"],selector:"#product-content",type:"관계 · 잠금",title:"강의 콘텐츠 연결",summary:"클래스에는 강의 콘텐츠가 1개 이상 연결되어야 합니다.",rules:["여러 콘텐츠를 연결하고 표시 우선순위를 저장할 수 있습니다.","결제 이력이 생긴 클래스의 콘텐츠 구성은 변경하지 않습니다.","구성을 바꿔야 하면 기존 구매 조건 보존을 위해 새 클래스를 생성합니다."],spec:"PRODUCT_SPEC §6.4 · 2단계 / §14.3"},
    {id:"admin.requirement",pages:["creator-admin"],selector:"#product-requirement",type:"조건 · 검증",title:"수강 조건",summary:"수강 조건 없음 또는 선수 클래스를 하나 이상 선택합니다.",rules:["수강 조건 없음과 선수 클래스는 동시에 저장할 수 없습니다.","선수 클래스가 여러 개면 하나 이상의 결제 또는 수강 완료 이력으로 충족합니다.","미충족 사용자는 상세를 볼 수 있지만 결제할 수 없습니다."],spec:"PRODUCT_SPEC §6.4 · 3단계 / §14.4"},
    {id:"admin.period-price",pages:["creator-admin"],selector:"#product-period",type:"가격 · 기간",title:"판매 조건 검증",summary:"가격, 모집 기간과 수강 시작 방식은 결제 전에 서버에서 다시 검증해야 합니다.",rules:["할인 가격은 선택이며 판매 가격보다 낮아야 합니다.","지정 기간 수강은 시작일과 종료일을 사용합니다.","결제 즉시 수강은 결제일부터 적용할 수강 가능 일수를 사용합니다."],spec:"PRODUCT_SPEC §6.4 · 4단계 / §10"},
    {id:"admin.operation",pages:["creator-admin"],selector:"#product-operation",type:"권한 · 날짜",title:"운영 안내와 라이브",summary:"운영 안내는 선택이며 참여 링크는 수강 권한이 있는 사용자에게만 제공합니다.",rules:["여러 라이브 회차의 날짜·시간·진행 시간·링크를 저장할 수 있습니다.","라이브 일정은 클래스 수강 기간 안에서만 등록할 수 있습니다.","날짜 제한은 입력 시점과 최종 저장 시점에 모두 검증합니다."],spec:"PRODUCT_SPEC §4.7 · §6.4 · 5단계"},
    {id:"admin.faq",pages:["creator-admin"],selector:"#product-faq",type:"검색 데이터",title:"클래스 FAQ",summary:"FAQ는 선택 항목이며 질문과 답변을 한 쌍으로 저장합니다.",rules:["질문과 답변 모두 검색 대상입니다.","저장한 FAQ는 클래스 상세와 구매자의 내 학습에 동일하게 사용됩니다.","내 학습 통합 검색에는 사용자가 구매한 클래스의 FAQ만 포함합니다."],spec:"PRODUCT_SPEC §4.4 · §6.4 · 6단계"},
    {id:"admin.refund",pages:["creator-admin"],selector:"#product-refund",type:"공통 규정",title:"환불 규정",summary:"환불 규정은 플랫폼 공통이며 크리에이터가 수정할 수 없습니다.",rules:["모든 클래스에 같은 규정을 읽기 전용으로 적용합니다.","환불 판단은 수강 시작 방식·신청 시점·재생 로그·다운로드 로그를 사용합니다.","환불 완료 시 주문 상태와 수강 권한을 함께 갱신합니다."],spec:"PRODUCT_SPEC §6.4 · 7단계 / §14.6"},
    {id:"admin.student-state",pages:["creator-admin"],selector:"#studentStateSummary",type:"상태 · 필터",title:"수강생 상태",summary:"수강생은 결제 상태가 아니라 현재 수강 권한 상태로 분류합니다.",rules:["수강 대기·수강 중·수강 종료 상태를 사용합니다.","상태 선택은 목록 필터와 함께 갱신됩니다.","목록은 검색·클래스 필터 결과를 기준으로 10명씩 나눕니다."],spec:"PRODUCT_SPEC §6.5 · §13.2"},
    {id:"admin.student-detail",pages:["creator-admin"],selector:".student-detail-dialog",type:"개인정보 · 범위",title:"수강생 상세 조회",summary:"현재 크리에이터의 클래스에 속한 결제·수강 이력만 조회합니다.",rules:["다른 크리에이터의 이력은 노출하지 않습니다.","전화번호 등 개인정보는 권한이 있는 관리자만 조회합니다.","환불·보상·정산에 영향을 주는 변경은 운영자 확인을 거칩니다."],spec:"PRODUCT_SPEC §6.5 · §13.2"},
    {id:"admin.sales",pages:["creator-admin"],selector:".payout-hero",type:"정산",title:"매출과 정산",summary:"선택 월의 결제 완료 금액에서 환불·취소를 반영해 정산 예정액을 계산합니다.",rules:["월 변경 시 요약과 클래스별 집계를 같은 기준으로 갱신합니다.","정산 대상 주문과 환불 이력을 서버 기준으로 확정합니다.","클래스 선택 시 해당 월 결제 수강생 상세로 이동합니다."],spec:"PRODUCT_SPEC §6.6 · §13.3"},
    {id:"admin.channel",pages:["creator-admin"],selector:".settings-profile-form",type:"공개 반영",title:"공개 채널 정보",summary:"저장한 채널 정보는 크리에이터 공개 페이지에 반영합니다.",rules:["프로필·핸들·카테고리·소개와 배경색을 관리합니다.","배경색은 관리자 미리보기와 공개 페이지에 동일하게 적용합니다."],spec:"PRODUCT_SPEC §4.10 · §6.7"},
    {id:"admin.payout-settings",pages:["creator-admin"],selector:"#settingsPanel .settings-form:not(.settings-profile-form)",type:"민감정보 · 마감",title:"정산 정보 변경",summary:"정산 정보는 권한 확인과 변경 마감이 필요한 민감정보입니다.",rules:["정산일 7일 전까지만 화면에서 변경할 수 있습니다.","마감 이후에는 운영팀 확인 절차를 거칩니다.","실서비스에서는 본인 확인과 변경 이력을 남깁니다."],spec:"PRODUCT_SPEC §6.7 · §9"},

    {id:"public.home",pages:["public"],selector:"#view-home .hero",type:"서비스 흐름",title:"홈 진입 흐름",summary:"홈은 보조 탐색 경로이며 주요 유입은 크리에이터가 공유한 상세 링크입니다.",rules:["홈에서 크리에이터 탐색과 대표 클래스 진입을 제공합니다.","수강생 화면의 판매 단위 명칭은 클래스입니다."],spec:"PRODUCT_SPEC §1~2 · §5.1"},
    {id:"public.creator-directory",pages:["public"],selector:"#view-creators .creator-directory-body",type:"검색 · 공개",title:"크리에이터 탐색",summary:"이름과 분야로 공개 중인 크리에이터를 검색합니다.",rules:["비공개 채널은 검색 결과에서 제외합니다.","카드 선택 시 해당 크리에이터 상세로 이동합니다."],spec:"PRODUCT_SPEC §5.2"},
    {id:"public.creator-profile",pages:["public"],selector:"#view-creator .cbanner",type:"게시 데이터",title:"크리에이터 공개 정보",summary:"관리자 채널 설정에서 저장한 게시 데이터를 표시합니다.",rules:["프로필·핸들·카테고리·소개·배경색을 동일하게 반영합니다.","페이지 공유는 현재 크리에이터의 고유 URL을 사용합니다."],spec:"PRODUCT_SPEC §4.10 · §5.3"},
    {id:"public.creator-classes",pages:["public"],selector:"#view-creator #cs-class",type:"공개 범위",title:"공개 클래스 목록",summary:"현재 크리에이터가 공개한 클래스만 표시합니다.",rules:["강의 콘텐츠는 별도 판매 단위로 노출하지 않습니다.","모집 기간과 수강 조건은 신청 전에 확인할 수 있어야 합니다."],spec:"PRODUCT_SPEC §5.3 · §14.4"},
    {id:"public.purchase-card",pages:["public"],selector:"#view-detail .buycard",type:"결제 가능 여부",title:"클래스 신청 검증",summary:"클라이언트 표시와 별개로 서버가 최종 결제 가능 여부를 판단합니다.",rules:["클래스가 공개 상태이고 현재가 모집 기간 안이어야 합니다.","강의 콘텐츠가 1개 이상 연결되어야 합니다.","선수 조건을 충족하지 못하면 상세는 제공하되 결제를 차단합니다.","이미 유효한 권한이 있으면 중복 결제 대신 내 학습으로 안내합니다."],spec:"PRODUCT_SPEC §14.4"},
    {id:"public.content",pages:["public"],selector:"#view-detail #sec-content",type:"콘텐츠 권한",title:"영상과 자료 노출",summary:"클래스에 연결된 콘텐츠를 저장된 우선순서대로 표시합니다.",rules:["신청 전에는 커리큘럼을 확인할 수 있습니다.","자료 다운로드와 실제 콘텐츠 이용은 유효한 수강 권한이 필요합니다.","파일 URL은 권한 검증 후 발급합니다."],spec:"PRODUCT_SPEC §4.5~4.6 · §14.5"},
    {id:"public.operation",pages:["public"],selector:"#view-detail #sec-op",type:"참여 권한",title:"운영 안내와 참여 링크",summary:"운영 안내는 공개할 수 있지만 실제 참여 링크는 수강 권한으로 보호합니다.",rules:["라이브 일정은 날짜 순서로 표시합니다.","단톡방·줌 등 참여 링크는 유효한 권한이 있을 때만 제공합니다.","수강 종료 후 접근은 클래스 권한 상태를 따릅니다."],spec:"PRODUCT_SPEC §4.7 · §5.4"},
    {id:"public.class-faq",pages:["public"],selector:"#view-detail #sec-faq",type:"문의 범위",title:"클래스 FAQ",summary:"클래스 내용에 관한 FAQ는 결제 전부터 확인할 수 있습니다.",rules:["FAQ는 클래스 단위로 관리합니다.","결제·환불 등 플랫폼 공통 문의는 고객센터가 담당합니다."],spec:"PRODUCT_SPEC §4.3~4.4 · §5.4"},
    {id:"public.refund",pages:["public"],selector:"#view-detail #sec-refund",type:"환불 기준",title:"환불 규정 확인",summary:"결제 전에 모든 클래스에 공통 적용되는 환불 기준을 확인합니다.",rules:["전액 환불 기간은 지정 기간 수강과 결제 즉시 수강을 구분합니다.","재생하거나 자료를 다운로드한 강의는 수강한 콘텐츠로 판단합니다.","7일 이후에는 수강한 콘텐츠 금액을 제외하는 계산식을 적용합니다.","환불 신청은 결제 내역에서 카카오톡 고객센터로 접수합니다."],spec:"PRODUCT_SPEC §5.4 · §14.6"},
    {id:"public.payment",pages:["public"],selector:"#payModal .modal",type:"결제 · 권한",title:"결제 처리",summary:"서버가 가격과 신청 조건을 검증하고 PG 결제 완료 후 수강 권한을 생성합니다.",rules:["클라이언트의 금액과 결제 결과를 신뢰하지 않고 서버에서 재검증합니다.","중복 주문과 결제 실패 이력을 보관합니다.","결제 완료 주문에만 클래스 수강 권한을 생성합니다."],spec:"PRODUCT_SPEC §4.2 · §10 · §14.5"},
    {id:"public.learning-faq",pages:["public"],selector:"#view-mypage .global-learning-faq",type:"검색 범위",title:"구매 클래스 FAQ 검색",summary:"현재 사용자가 구매한 클래스의 FAQ만 한 번에 검색합니다.",rules:["질문과 답변을 모두 검색합니다.","결과에 크리에이터와 클래스 출처를 함께 표시합니다."],spec:"PRODUCT_SPEC §4.4 · §5.5"},
    {id:"public.learning",pages:["public"],selector:"#view-mypage .learning-group",type:"권한 · 진도",title:"내 학습 상태",summary:"내 학습은 결제 기록이 아니라 현재 수강 권한이 있는 클래스를 표시합니다.",rules:["영상은 실제 재생 전 수강 전, 재생 시작 후 수강 중, 마지막 구간 도달 후 수강 완료로 저장합니다.","수강 완료 상태는 다시 재생해도 되돌리지 않습니다.","수강 기간이 끝나면 콘텐츠 접근을 제한합니다."],spec:"PRODUCT_SPEC §5.5 · §14.5"},
    {id:"public.player",pages:["public"],selector:"#view-player .lesson-player-page",type:"스트리밍 권한",title:"영상 재생",summary:"유효한 클래스 수강 권한이 있는 사용자만 영상을 재생할 수 있습니다.",rules:["스트리밍 URL은 서버 권한 검증 후 발급합니다.","재생 시작·진도·완료 로그를 사용자와 영상 단위로 저장합니다.","영상 원본 URL은 공개하지 않습니다."],spec:"PRODUCT_SPEC §8~10 · §14.5"},
    {id:"public.payments",pages:["public"],selector:"#view-account .payment-history",type:"환불 흐름",title:"결제 내역과 환불 요청",summary:"본인의 주문 상태를 확인하고 해당 주문의 환불 상담을 시작합니다.",rules:["환불 요청은 카카오톡 고객센터로 연결되며 즉시 자동 환불되지는 않습니다.","운영자는 주문과 재생·다운로드 로그를 확인해 환불 가능 금액을 판단합니다.","신청 후 3일 이내 원 결제 수단으로 처리하고 완료 시 수강 권한을 갱신합니다."],spec:"PRODUCT_SPEC §5.6 · §14.6"},
    {id:"public.profile",pages:["public"],selector:"#view-account .user-profile-card",type:"개인정보",title:"내 정보",summary:"카카오 로그인에서 받은 필수 사용자 정보를 본인에게만 표시합니다.",rules:["이름과 전화번호를 필수 정보로 저장합니다.","개인정보 조회·변경·탈퇴는 본인 인증과 보존 정책을 적용합니다."],spec:"PRODUCT_SPEC §4.9 · §5.6 · §9"},
    {id:"public.support",pages:["public"],selector:"#view-faq .page-body",type:"CS 역할",title:"고객센터 문의 범위",summary:"결제·수강 권한·환불과 플랫폼 문의는 노하우집 운영팀이 담당합니다.",rules:["클래스 내용의 반복 질문은 클래스 FAQ에서 먼저 안내합니다.","카카오톡 채널을 상담 진입점으로 사용합니다."],spec:"PRODUCT_SPEC §4.3 · §5.7"},
    {id:"public.login",pages:["public"],selector:"#view-login .login-card",type:"인증",title:"카카오 간편 로그인",summary:"모든 로그인 진입점은 동일한 인증 흐름을 사용합니다.",rules:["카카오 동의 후 이름과 전화번호를 필수 저장합니다.","실서비스에서는 서버 세션과 사용자 권한을 검증합니다.","이용약관과 개인정보처리방침 동의를 함께 처리합니다."],spec:"PRODUCT_SPEC §4.9 · §9"},
    {id:"public.withdraw",pages:["public"],selector:"#withdrawModal .withdraw-modal",type:"계정 · 보존",title:"회원 탈퇴",summary:"탈퇴 후 서비스 접근은 중단하되 법정 보존 데이터는 별도 기준으로 처리합니다.",rules:["탈퇴 전에 본인 여부를 확인합니다.","로그인과 수강 화면 접근을 중단합니다.","결제·정산 등 보존 의무 데이터는 보존 기간 후 삭제합니다."],spec:"PRODUCT_SPEC §9"},

    {id:"access.denied",pages:["access-denied"],selector:".access-denied-card",type:"권한 · 오류",title:"접근 제한",summary:"인증·권한·주소 오류를 안전하게 안내합니다.",rules:["서버에서 인증과 권한을 먼저 검증합니다.","민감한 내부 실패 사유는 노출하지 않습니다.","안전한 이동 경로와 운영팀 문의 수단을 제공합니다."],spec:"PRODUCT_SPEC §9"},
    {id:"platform.excluded",pages:["platform-admin"],selector:"#main",type:"범위 제외",title:"플랫폼 관리자 화면",summary:"현재 MVP 개발 범위에 포함되지 않은 참고 화면입니다.",rules:["크리에이터 관리자와 수강생 화면의 구현 기준으로 사용하지 않습니다.","추후 범위 확정 시 권한과 운영 정책을 별도로 정의합니다."],spec:"PRODUCT_SPEC §11"},
    {id:"guide.creator-states",pages:["guide-creator"],selector:".guide-head",type:"상태 검증",title:"크리에이터 관리자 상태",summary:"기본·빈 상태·잠금·오류 상태를 함께 구현합니다.",rules:["정적 예시값은 서버 상태값으로 치환합니다.","결제 이력에 따른 수정 잠금과 실패 처리를 확인합니다."],spec:"PRODUCT_SPEC §7 · §9"},
    {id:"guide.learning-states",pages:["guide-learning"],selector:".guide-head",type:"상태 검증",title:"내 학습 상태",summary:"수강 권한과 기간에 따른 화면 상태를 비교합니다.",rules:["서버의 권한 상태와 화면을 일치시킵니다.","기간 종료 시 콘텐츠 접근 제한을 적용합니다."],spec:"PRODUCT_SPEC §5.5 · §14.5"},
    {id:"guide.detail-states",pages:["guide-detail"],selector:".guide-head",type:"상태 검증",title:"클래스 상세 상태",summary:"공개 상태·모집 기간·수강 조건·구매 여부에 따른 신청 상태를 비교합니다.",rules:["조건별 CTA와 안내를 일관되게 표시합니다.","결제 직전에 서버에서 신청 가능 여부를 재검증합니다."],spec:"PRODUCT_SPEC §5.4 · §14.4"}
  ];

  const page=detectPage();
  const pagePolicies=POLICIES.filter(policy=>policy.pages.includes(page));
  const sessionKey="nhz-policy-guide-mode";
  let enabled=false;
  let pinned=false;
  let activeAnchor=null;
  let observer=null;
  let scheduled=false;
  let dock=null;
  let popover=null;

  function detectPage(){
    const path=decodeURIComponent(location.pathname.replace(/\\/g,"/"));
    const file=(path.split("/").pop()||"index.html").toLowerCase();
    if(file==="creator-admin.html")return "creator-admin";
    if(file==="access-denied.html")return "access-denied";
    if(file.includes("platform-admin.html"))return "platform-admin";
    if(file==="creator-admin-states.html")return "guide-creator";
    if(file==="my-learning-states.html")return "guide-learning";
    if(file==="product-detail-states.html")return "guide-detail";
    return "public";
  }

  function createChrome(){
    if(!popover){
      popover=document.createElement("aside");
      popover.className="policy-guide-popover";
      popover.setAttribute("role","dialog");
      popover.setAttribute("aria-live","polite");
      popover.innerHTML='<div class="policy-guide-popover-head"><div><span class="policy-guide-popover-type"></span><h3></h3></div><button class="policy-guide-close" type="button" aria-label="정책 닫기">×</button></div><p class="policy-guide-popover-summary"></p><ul></ul><div class="policy-guide-popover-spec"></div>';
      popover.querySelector(".policy-guide-close").addEventListener("click",()=>{pinned=false;closePopover();});
      document.body.appendChild(popover);
    }
    if(!dock){
      dock=document.createElement("aside");
      dock.className="policy-guide-dock";
      dock.setAttribute("aria-label","현재 화면 개발 정책");
      dock.innerHTML='<div class="policy-guide-dock-head"><i>P</i><div><b>개발 정책 보기</b><small>현재 화면의 기능·검증 기준</small></div><button class="policy-guide-dock-close" type="button">종료</button></div><div class="policy-guide-list"></div><div class="policy-guide-shortcut">마커 Hover/Focus · 클릭 고정 · ⌘ + P 종료</div>';
      dock.querySelector(".policy-guide-dock-close").addEventListener("click",()=>setMode(false));
      document.body.appendChild(dock);
    }
  }

  function setMode(next,updateUrl=true){
    enabled=next;
    document.body.classList.toggle("policy-guide-mode",enabled);
    if(enabled){
      createChrome();
      annotate();
      if(!observer){
        observer=new MutationObserver(mutations=>{
          const externalMutation=mutations.some(mutation=>{
            const target=mutation.target.nodeType===1?mutation.target:mutation.target.parentElement;
            return !target?.closest?.(".policy-guide-dock,.policy-guide-popover");
          });
          if(externalMutation)scheduleAnnotate();
        });
        observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style","hidden"]});
      }
    }else{
      if(observer){observer.disconnect();observer=null;}
      document.querySelectorAll(".policy-guide-marker").forEach(marker=>marker.remove());
      document.querySelectorAll(".policy-guide-target").forEach(target=>target.classList.remove("policy-guide-target"));
      if(dock){dock.remove();dock=null;}
      if(popover){popover.remove();popover=null;}
      pinned=false;
      activeAnchor=null;
    }
    if(updateUrl){
      const url=new URL(location.href);
      enabled?url.searchParams.set("policy","1"):url.searchParams.delete("policy");
      history.replaceState(null,"",url);
    }
    try{enabled?sessionStorage.setItem(sessionKey,"1"):sessionStorage.removeItem(sessionKey);}catch(error){}
  }

  function scheduleAnnotate(){
    if(!enabled||scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;annotate();});
  }

  function annotate(){
    if(!enabled)return;
    createChrome();
    pagePolicies.forEach(policy=>{
      document.querySelectorAll(policy.selector).forEach(target=>attachMarker(target,policy));
    });
    renderDock();
    if(activeAnchor&&!activeAnchor.isConnected){pinned=false;closePopover();}
  }

  function attachMarker(target,policy){
    const exists=Array.from(target.children).some(child=>child.classList&&child.classList.contains("policy-guide-marker")&&child.dataset.policyId===policy.id);
    if(exists)return;
    target.classList.add("policy-guide-target");
    const marker=document.createElement("button");
    marker.type="button";
    marker.className="policy-guide-marker";
    marker.dataset.policyId=policy.id;
    marker.textContent="P";
    marker.setAttribute("aria-label",`${policy.title} 보기`);
    marker.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();pinned=true;openPopover(marker,policy);});
    marker.addEventListener("mouseenter",()=>{if(!pinned)openPopover(marker,policy);});
    marker.addEventListener("mouseleave",()=>{if(!pinned)closePopover();});
    marker.addEventListener("focus",()=>{if(!pinned)openPopover(marker,policy);});
    marker.addEventListener("blur",()=>{if(!pinned)closePopover();});
    target.appendChild(marker);
  }

  function isVisible(element){
    if(!element||!element.isConnected)return false;
    const style=getComputedStyle(element);
    if(style.display==="none"||style.visibility==="hidden")return false;
    const rect=element.getBoundingClientRect();
    return rect.width>0&&rect.height>0;
  }

  function targetsFor(policy,visibleOnly=false){
    return Array.from(document.querySelectorAll(policy.selector)).filter(target=>!visibleOnly||isVisible(target));
  }

  function renderDock(){
    if(!dock)return;
    const list=dock.querySelector(".policy-guide-list");
    const visible=pagePolicies.filter(policy=>targetsFor(policy,true).length);
    dock.querySelector(".policy-guide-dock-head b").textContent=`개발 정책 ${visible.length}개`;
    if(!visible.length){list.innerHTML='<div class="policy-guide-empty">현재 화면에서 표시할 정책이 없습니다.</div>';return;}
    list.innerHTML="";
    visible.forEach(policy=>{
      const button=document.createElement("button");
      button.type="button";
      const count=targetsFor(policy,true).length;
      button.innerHTML=`<span>${policy.type}${count>1?` · ${count}곳`:""}</span><b>${policy.title}</b><small>${policy.spec}</small>`;
      button.addEventListener("click",()=>{
        const target=targetsFor(policy,true)[0]||targetsFor(policy)[0];
        if(!target)return;
        target.scrollIntoView({behavior:"smooth",block:"center"});
        const marker=Array.from(target.children).find(child=>child.classList&&child.classList.contains("policy-guide-marker")&&child.dataset.policyId===policy.id);
        if(marker){pinned=true;setTimeout(()=>openPopover(marker,policy),260);}
      });
      list.appendChild(button);
    });
  }

  function openPopover(anchor,policy){
    if(!popover)createChrome();
    activeAnchor=anchor;
    popover.querySelector(".policy-guide-popover-type").textContent=policy.type;
    popover.querySelector("h3").textContent=policy.title;
    const summary=popover.querySelector(".policy-guide-popover-summary");
    summary.textContent=policy.summary||"";
    summary.hidden=!policy.summary;
    popover.querySelector("ul").innerHTML=policy.rules.map(rule=>`<li>${rule}</li>`).join("");
    popover.querySelector(".policy-guide-popover-spec").textContent=policy.spec;
    popover.classList.add("open");
    positionPopover(anchor);
  }

  function positionPopover(anchor){
    if(!popover||!anchor)return;
    const rect=anchor.getBoundingClientRect();
    const width=popover.offsetWidth||370;
    const height=popover.offsetHeight||280;
    const left=Math.max(14,Math.min(innerWidth-width-14,rect.right-width));
    const below=rect.bottom+9;
    const top=below+height>innerHeight?Math.max(14,rect.top-height-9):below;
    popover.style.left=`${left}px`;
    popover.style.top=`${top}px`;
  }

  function closePopover(){
    if(popover)popover.classList.remove("open");
    activeAnchor=null;
  }

  document.addEventListener("click",event=>{
    const internalLink=event.target.closest?.("a[href]");
    if(enabled&&internalLink&&!internalLink.hasAttribute("download")){
      try{
        const url=new URL(internalLink.getAttribute("href"),location.href);
        if(url.origin===location.origin&&/\.html$/i.test(url.pathname)){
          url.searchParams.set("policy","1");
          internalLink.href=url.href;
        }
      }catch(error){}
    }
    if(!enabled||!pinned||!popover)return;
    if(popover.contains(event.target)||event.target.closest(".policy-guide-marker"))return;
    pinned=false;
    closePopover();
  });
  document.addEventListener("keydown",event=>{
    if(event.metaKey&&event.key.toLowerCase()==="p"){
      event.preventDefault();
      setMode(!enabled);
    }
    if(event.key==="Escape"&&enabled){pinned=false;closePopover();}
  });
  window.addEventListener("resize",()=>{if(activeAnchor&&popover?.classList.contains("open"))positionPopover(activeAnchor);});

  window.PolicyGuide={enable:()=>setMode(true),disable:()=>setMode(false),toggle:()=>setMode(!enabled)};
  const queryMode=new URLSearchParams(location.search).get("policy");
  let storedMode=false;
  try{storedMode=sessionStorage.getItem(sessionKey)==="1";}catch(error){}
  const initial=queryMode==="1"||(queryMode!=="0"&&storedMode);
  if(initial)setMode(true,false);
})();
