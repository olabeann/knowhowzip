(function(){
  "use strict";

  const POLICIES=[
    {id:"admin.dashboard",pages:["creator-admin"],selector:".metric-grid.three",type:"데이터",title:"대시보드 집계 기준",summary:"실서비스에서는 크리에이터 권한 범위의 서버 집계값만 표시합니다.",rules:["매출은 결제 완료 기준으로 집계합니다.","수강생 수는 현재 크리에이터의 수강 권한 기준입니다.","등록 클래스와 강의 콘텐츠를 구분해 집계합니다.","현재 숫자는 정적 화면 확인용 예시값입니다."],spec:"PRODUCT_SPEC §6.1 · §9"},
    {id:"admin.content-list",pages:["creator-admin"],selector:".class-admin-grid",type:"목록 UI",title:"강의 콘텐츠 목록 정책",summary:"대표 이미지 없이 콘텐츠 정보와 연결 현황을 중심으로 표시합니다.",rules:["제목, 설명, 영상 수, 자료 수와 연결 클래스 수를 표시합니다.","카드 전체 클릭과 우측 메뉴의 수정은 같은 편집 화면으로 이동합니다.","우측 메뉴는 수정, 복제, 삭제만 제공합니다.","미리보기, 반복 칩과 하단 수정 버튼은 제공하지 않습니다."],spec:"PRODUCT_SPEC §6.2 · §13.1"},
    {id:"admin.class-list",pages:["creator-admin"],selector:".product-admin-grid",type:"목록 UI",title:"클래스 관리 목록 정책",summary:"수강생에게 노출·판매되는 클래스의 운영 정보를 표시합니다.",rules:["클래스명, 가격, 기간, 상태, 수강 조건과 연결 콘텐츠를 표시합니다.","우측 메뉴는 수정, 복제, 삭제를 제공합니다.","카드 메뉴에는 미리보기를 넣지 않습니다.","수강생 화면에서는 상품이 아니라 클래스라는 명칭을 사용합니다."],spec:"PRODUCT_SPEC §6.4 · §14.8"},
    {id:"admin.content-info",pages:["creator-admin"],selector:"#editor-content-info",type:"필수값",title:"강의 콘텐츠 정보 정책",summary:"콘텐츠 제목은 필수이고 콘텐츠 설명은 선택입니다.",rules:["콘텐츠 제목은 관리자용 구분값입니다.","수강생 판매 화면에는 콘텐츠 제목 대신 클래스명을 표시합니다.","제목은 80자 이내로 입력합니다."],spec:"PRODUCT_SPEC §6.3 · 1단계"},
    {id:"admin.content-assets",pages:["creator-admin"],selector:"#editor-content",type:"필수 · 파일",title:"영상·자료 등록 정책",summary:"영상은 1개 이상 필수이고 제공 자료는 선택입니다.",rules:["영상 순서가 수강생 화면의 강의 순서가 됩니다.","영상 형식은 MP4, MOV, WebM이며 강의당 최대 2GB입니다.","자료는 0개 이상이며 파일당 최대 50MB입니다.","기존 콘텐츠를 불러오면 독립 복제본으로 수정합니다."],spec:"PRODUCT_SPEC §4.5~4.6 · §6.3"},
    {id:"admin.class-info",pages:["creator-admin"],selector:"#product-class-info",type:"전체 필수",title:"클래스 정보 정책",summary:"수강생 판매 화면에 표시되는 클래스 기본 정보는 전체 필수입니다.",rules:["클래스명, 한 줄 소개, 상세 소개와 대표 이미지가 필요합니다.","카테고리와 난이도도 필수입니다.","기수는 별도 필드 없이 클래스명에 포함합니다.","대표 이미지는 클래스 목록과 상세 화면에 노출됩니다."],spec:"PRODUCT_SPEC §6.4 · 1단계"},
    {id:"admin.content-link",pages:["creator-admin"],selector:"#product-content",type:"필수 · 관계",title:"강의 콘텐츠 연결 정책",summary:"클래스를 등록하려면 강의 콘텐츠를 1개 이상 연결해야 합니다.",rules:["한 클래스에 여러 콘텐츠를 연결할 수 있습니다.","같은 콘텐츠를 여러 클래스에서 재사용할 수 있습니다.","선택한 우선순서대로 수강생 화면에 표시합니다.","결제 이력이 생긴 뒤 구성을 바꾸려면 새 클래스를 만듭니다."],spec:"PRODUCT_SPEC §6.4 · 2단계 / §14.3"},
    {id:"admin.requirement",pages:["creator-admin"],selector:"#product-requirement",type:"필수 · 상호배타",title:"수강 조건 정책",summary:"수강 조건은 1개 이상 필요하며 기본값은 수강 조건 없음입니다.",rules:["수강 조건 없음과 선수 클래스는 동시에 선택할 수 없습니다.","선수 클래스는 여러 개 선택할 수 있습니다.","선택 조건 중 하나 이상의 결제 또는 수강 완료 이력이 있으면 신청할 수 있습니다.","조건 미충족 시 상세는 노출하되 결제를 차단합니다."],spec:"PRODUCT_SPEC §6.4 · 3단계 / §14.4"},
    {id:"admin.period-price",pages:["creator-admin"],selector:"#product-period",type:"필수 · 검증",title:"모집·수강 기간과 가격 정책",summary:"할인 가격을 제외한 가격·모집 기간·수강 시작 방식은 필수입니다.",rules:["결제 방식은 하나로 고정되어 관리자 선택 필드를 제공하지 않습니다.","할인 가격은 판매 가격보다 낮아야 합니다.","지정 기간 수강은 시작일과 종료일이 필요합니다.","결제 즉시 수강은 결제일부터 적용할 수강 일수가 필요합니다."],spec:"PRODUCT_SPEC §6.4 · 4단계 / §10"},
    {id:"admin.operation",pages:["creator-admin"],selector:"#product-operation",type:"선택 · 날짜 검증",title:"운영 안내·라이브 일정 정책",summary:"운영 안내와 라이브 일정은 선택 항목입니다.",rules:["여러 라이브 회차를 등록할 수 있습니다.","회차별 날짜, 시간, 진행 시간, 참여 링크와 안내를 저장합니다.","라이브 일정은 클래스 수강 기간 안에서만 설정할 수 있습니다.","수강 권한이 있는 사용자에게만 참여 링크를 제공합니다."],spec:"PRODUCT_SPEC §4.7 · §6.4 · 5단계"},
    {id:"admin.faq",pages:["creator-admin"],selector:"#product-faq",type:"선택",title:"클래스 FAQ 정책",summary:"FAQ는 선택 항목이며 새 클래스는 0개로 시작합니다.",rules:["질문과 답변을 한 쌍으로 저장합니다.","질문과 답변 내용 모두 검색 대상입니다.","내 학습의 통합 FAQ 검색과 클래스별 FAQ에 함께 사용합니다.","질문과 답변 입력 기준선을 상단에 맞춥니다."],spec:"PRODUCT_SPEC §4.4 · §6.4 · 6단계"},
    {id:"admin.alimtalk",pages:["creator-admin"],selector:"#product-alimtalk",type:"선택 · ON 시 필수",title:"결제 후 안내톡 정책",summary:"새 클래스는 기본 OFF이며 ON으로 켜면 안내 내용을 모두 입력해야 합니다.",rules:["OFF 상태에서는 상세 입력 영역을 숨깁니다.","승인된 템플릿 구조의 변수값만 수정합니다.","기본 발송 시점은 결제 완료 후 5분 이내입니다.","승인·템플릿 코드 등 내부 상태는 크리에이터에게 노출하지 않습니다."],spec:"PRODUCT_SPEC §4.8 · §6.7"},
    {id:"admin.refund",pages:["creator-admin"],selector:"#product-refund",type:"플랫폼 공통",title:"환불 정책 적용 기준",summary:"환불 정책은 클래스별로 입력하지 않고 플랫폼 공통 정책을 적용합니다.",rules:["현재 정책 내용은 조정 중입니다.","확정 전에는 클래스별 환불 문구를 저장하지 않습니다.","정책 확정 후 모든 클래스 결제 화면에 동일하게 적용합니다."],spec:"PRODUCT_SPEC §6.4 · 8단계 / §14.7"},
    {id:"admin.student-state",pages:["creator-admin"],selector:"#studentStateSummary",type:"상태",title:"수강생 상태 분류 정책",summary:"수강생 관리에서는 결제 상태가 아니라 현재 학습 상태를 표시합니다.",rules:["전체, 수강 대기, 수강 중, 무료 수강중, 수강 종료를 같은 너비로 표시합니다.","상태 탭을 선택하면 목록도 함께 필터링합니다.","목록은 10명 단위로 페이징합니다."],spec:"PRODUCT_SPEC §6.5 · §13.2"},
    {id:"admin.free-access",pages:["creator-admin"],selector:".access-request-dialog:not(.student-detail-dialog)",type:"예외 권한",title:"무료 수강 처리 정책",summary:"결제 없이 특정 수강생에게 클래스 수강 권한을 부여하는 예외 기능입니다.",rules:["수강생, 클래스, 기간과 처리 사유가 필요합니다.","결제 금액은 0원으로 기록합니다.","상태는 무료 수강중으로 표시합니다.","실서비스에서는 관리자 권한과 변경 이력 로그가 필요합니다."],spec:"PRODUCT_SPEC §6.5 · §14.6"},
    {id:"admin.student-detail",pages:["creator-admin"],selector:".student-detail-dialog",type:"개인정보 · 권한",title:"수강생 상세 노출 정책",summary:"현재 크리에이터에게 속한 클래스 결제·수강 이력만 표시합니다.",rules:["다른 크리에이터의 결제·수강 이력은 노출하지 않습니다.","전화번호 등 개인정보는 권한이 있는 관리자만 조회합니다.","환불·보상·정산 영향 변경은 운영자 확인 흐름으로 처리합니다."],spec:"PRODUCT_SPEC §6.5 · §13.2"},
    {id:"admin.sales",pages:["creator-admin"],selector:".payout-hero",type:"정산",title:"월별 매출·정산 정책",summary:"선택한 월의 결제·환불 데이터를 기준으로 정산 예정액을 계산합니다.",rules:["월 변경 시 모든 요약과 클래스별 표를 함께 갱신합니다.","환불·취소 금액을 반영합니다.","클래스 행을 클릭하면 결제 수강생 상세 페이지로 이동합니다.","현재 수치는 정적 확인용 예시입니다."],spec:"PRODUCT_SPEC §6.6 · §13.3"},
    {id:"admin.channel",pages:["creator-admin"],selector:".settings-profile-form",type:"공개 반영",title:"공개 채널 정보 정책",summary:"저장한 프로필 정보는 크리에이터 공개 페이지에 반영합니다.",rules:["프로필 이미지, 이름, 핸들, 카테고리와 소개를 관리합니다.","프로필 상단 배경은 이미지가 아니라 색상으로 설정합니다.","관리자 미리보기와 공개 페이지에 같은 색을 적용합니다."],spec:"PRODUCT_SPEC §4.10 · §6.8"},
    {id:"admin.payout-settings",pages:["creator-admin"],selector:"#settingsPanel .settings-form:not(.settings-profile-form)",type:"민감정보 · 마감",title:"정산 정보 변경 정책",summary:"정산 계좌와 사업자 정보는 권한이 있는 크리에이터만 변경할 수 있습니다.",rules:["예금주, 은행, 계좌번호와 정산 이메일을 관리합니다.","정산일 7일 전까지만 화면에서 변경할 수 있습니다.","마감 이후 변경은 운영팀 확인 절차를 거칩니다.","실서비스에서는 변경 이력과 본인 확인이 필요합니다."],spec:"PRODUCT_SPEC §6.8"},

    {id:"public.home",pages:["public"],selector:"#view-home .hero",type:"서비스 흐름",title:"홈 진입 정책",summary:"홈 탐색보다 크리에이터가 공유한 외부 링크에서 상세로 진입하는 흐름을 우선합니다.",rules:["홈은 서비스 가치와 대표 크리에이터·클래스를 안내합니다.","과도한 통계·배지·사회적 증거는 MVP에서 제외합니다.","수강생 화면에서는 판매 단위를 클래스라고 표시합니다."],spec:"PRODUCT_SPEC §1~2 · §5.1"},
    {id:"public.creator-directory",pages:["public"],selector:"#view-creators .creator-directory-body",type:"검색",title:"크리에이터 목록 정책",summary:"이름과 분야를 기준으로 크리에이터를 탐색합니다.",rules:["목록에서 공개 중인 크리에이터만 노출합니다.","인증 마크, 클래스 수와 누적 수강생 수는 표시하지 않습니다.","카드 클릭 시 크리에이터 상세로 이동합니다."],spec:"PRODUCT_SPEC §5.2"},
    {id:"public.creator-profile",pages:["public"],selector:"#view-creator .cbanner",type:"공개 정보",title:"크리에이터 공개 프로필 정책",summary:"관리자 채널 설정에 저장한 프로필과 배경색을 표시합니다.",rules:["프로필 이미지, 이름, 핸들, 카테고리와 소개를 노출합니다.","배경색은 관리자 설정과 동일해야 합니다.","페이지 공유는 현재 크리에이터 URL을 사용합니다."],spec:"PRODUCT_SPEC §4.10 · §5.3"},
    {id:"public.creator-classes",pages:["public"],selector:"#view-creator #cs-class",type:"공개 목록",title:"크리에이터 클래스 목록 정책",summary:"해당 크리에이터가 공개한 판매 클래스만 표시합니다.",rules:["수강생 화면에서는 강의 콘텐츠를 별도 판매 단위로 노출하지 않습니다.","클래스 상태, 제목과 가격을 표시합니다.","수강 조건이 있는 클래스는 신청 전에 안내합니다."],spec:"PRODUCT_SPEC §5.3 · §14.8"},
    {id:"public.purchase-card",pages:["public"],selector:"#view-detail .buycard",type:"구매 가능 여부",title:"클래스 신청 정책",summary:"공개 상태, 모집 기간, 연결 콘텐츠와 수강 조건을 모두 확인해 결제 가능 여부를 판단합니다.",rules:["강의 콘텐츠가 1개 이상 연결되어야 합니다.","모집 기간 밖에서는 결제를 막습니다.","선수 조건 미충족 시 상세는 보여주되 결제를 차단합니다.","이미 유효한 수강 권한이 있으면 수강 중 상태를 표시합니다."],spec:"PRODUCT_SPEC §14.4"},
    {id:"public.content",pages:["public"],selector:"#view-detail #sec-content",type:"수강 권한",title:"영상·자료 노출 정책",summary:"클래스에 연결된 강의 콘텐츠를 우선순서대로 합쳐 표시합니다.",rules:["영상과 자료의 순서는 클래스의 contentIds 및 콘텐츠 내부 순서를 따릅니다.","수강 권한이 없으면 자료 다운로드를 잠급니다.","같은 콘텐츠를 여러 클래스에서 재사용할 수 있습니다."],spec:"PRODUCT_SPEC §4.5~4.6 · §14.5"},
    {id:"public.operation",pages:["public"],selector:"#view-detail #sec-op",type:"수강 권한",title:"운영 안내·라이브 노출 정책",summary:"클래스 운영 안내는 공개하되 참여 링크는 수강 권한에 따라 제한합니다.",rules:["라이브 회차를 날짜 순서로 표시합니다.","수강 권한이 있는 사용자에게만 단톡방·줌 링크를 제공합니다.","수강 종료 이후 접근 여부는 권한 상태를 따릅니다."],spec:"PRODUCT_SPEC §4.7 · §5.4"},
    {id:"public.class-faq",pages:["public"],selector:"#view-detail #sec-faq",type:"공개 FAQ",title:"신청 전 클래스 FAQ 정책",summary:"클래스별 FAQ는 신청 전에도 확인할 수 있습니다.",rules:["질문과 답변을 클래스 단위로 표시합니다.","결제·환불 같은 플랫폼 공통 문의는 고객센터에서 안내합니다.","수강 후에도 내 학습의 클래스 FAQ에서 같은 내용을 제공합니다."],spec:"PRODUCT_SPEC §4.4 · §5.4"},
    {id:"public.payment",pages:["public"],selector:"#payModal .modal",type:"결제 · 서버 검증",title:"클래스 결제 정책",summary:"실서비스에서는 서버에서 가격, 모집 기간과 수강 조건을 다시 검증한 뒤 결제합니다.",rules:["클라이언트 표시 금액을 신뢰하지 않고 서버 가격을 사용합니다.","PG 결제 결과를 서버에서 재검증합니다.","결제 완료 후 클래스 수강 권한을 생성합니다.","중복 주문과 결제 실패 이력을 보관합니다."],spec:"PRODUCT_SPEC §4.2 · §10 · §14.5"},
    {id:"public.learning-faq",pages:["public"],selector:"#view-mypage .global-learning-faq",type:"검색 범위",title:"내 학습 FAQ 통합 검색 정책",summary:"현재 사용자가 구매한 클래스의 FAQ만 통합 검색합니다.",rules:["질문과 답변 내용을 모두 검색합니다.","결과에 크리에이터명과 클래스명을 함께 표시합니다.","통합 검색은 클래스별 FAQ를 대체하지 않습니다."],spec:"PRODUCT_SPEC §4.4 · §5.5"},
    {id:"public.learning",pages:["public"],selector:"#view-mypage .learning-group",type:"수강 권한",title:"내 학습 클래스 표시 정책",summary:"구매 기록이 아니라 현재 수강 권한이 있는 클래스 목록을 표시합니다.",rules:["유효한 권한이 하나라도 있으면 수강 가능으로 봅니다.","수강 종료 클래스는 콘텐츠 접근을 제한합니다.","영상, 자료, 운영 안내와 FAQ를 클래스 안에서 제공합니다.","결제 즉시 수강은 결제일부터 설정 일수를 적용합니다."],spec:"PRODUCT_SPEC §5.5 · §14.5"},
    {id:"public.player",pages:["public"],selector:"#view-player .lesson-player-page",type:"콘텐츠 권한",title:"영상 재생 정책",summary:"유효한 클래스 수강 권한이 있는 사용자만 영상을 재생할 수 있습니다.",rules:["실서비스에서는 스트리밍 URL을 권한 검증 후 발급합니다.","시청 진도와 완료 상태를 서버에 저장합니다.","영상 원본 URL을 공개하지 않습니다."],spec:"PRODUCT_SPEC §8~10"},
    {id:"public.payments",pages:["public"],selector:"#view-account .payment-history",type:"결제 이력",title:"결제 내역 표시 정책",summary:"사용자 본인의 클래스 결제·취소·환불 상태만 표시합니다.",rules:["결제일, 클래스, 금액과 결제 상태를 표시합니다.","PG와 서버의 주문 상태를 동기화합니다.","환불 완료 시 수강 권한도 플랫폼 정책에 따라 갱신합니다."],spec:"PRODUCT_SPEC §5.6 · §14.7"},
    {id:"public.profile",pages:["public"],selector:"#view-account .user-profile-card",type:"개인정보",title:"내 정보 정책",summary:"카카오 로그인에서 받은 필수 사용자 정보를 본인에게만 표시합니다.",rules:["이름과 전화번호를 필수 정보로 저장합니다.","개인정보 변경과 탈퇴는 본인 인증 후 처리합니다.","탈퇴 시 수강·결제 데이터 보존 정책을 별도로 적용합니다."],spec:"PRODUCT_SPEC §4.9 · §5.6"},
    {id:"public.support",pages:["public"],selector:"#view-faq .page-body",type:"CS 역할",title:"고객센터 운영 정책",summary:"결제·수강·환불과 플랫폼 문의는 노하우집 운영팀이 담당합니다.",rules:["클래스 내용의 반복 질문은 클래스별 FAQ에서 안내합니다.","카카오톡 채널을 빠른 상담 진입점으로 사용합니다.","대규모 카테고리형 FAQ 검색은 MVP에서 제외합니다."],spec:"PRODUCT_SPEC §4.3 · §5.7"},
    {id:"public.login",pages:["public"],selector:"#view-login .login-card",type:"인증",title:"카카오 간편 로그인 정책",summary:"모든 로그인 진입점은 동일한 카카오 간편 로그인 흐름을 사용합니다.",rules:["카카오 동의 후 이름과 전화번호를 필수 저장합니다.","실서비스에서는 서버 세션과 사용자 권한을 검증합니다.","이용약관과 개인정보처리방침 링크를 제공합니다."],spec:"PRODUCT_SPEC §4.9"},
    {id:"public.withdraw",pages:["public"],selector:"#withdrawModal .withdraw-modal",type:"계정",title:"회원 탈퇴 정책",summary:"탈퇴는 본인 확인과 데이터 보존 기준을 적용해야 합니다.",rules:["탈퇴 후 로그인과 수강 화면 접근을 중단합니다.","결제·정산·법정 보존 데이터는 즉시 물리 삭제하지 않을 수 있습니다.","실서비스 정책 확정이 필요한 항목입니다."],spec:"PRODUCT_SPEC §9"},

    {id:"access.denied",pages:["access-denied"],selector:".access-denied-card",type:"권한 · 오류",title:"접근 제한 화면 정책",summary:"존재하지 않는 주소와 권한 부족 상태를 안전하게 안내합니다.",rules:["서버에서 인증과 권한을 먼저 검증합니다.","민감한 권한 실패 사유를 상세히 노출하지 않습니다.","홈 이동과 운영팀 문의 경로를 제공합니다."],spec:"PRODUCT_SPEC §9"},
    {id:"platform.excluded",pages:["platform-admin"],selector:"#main",type:"1차 개발 제외",title:"플랫폼 관리자 범위",summary:"이 운영 관리자 화면은 현재 1차 개발 범위에서 제외된 참고 시안입니다.",rules:["크리에이터 관리자와 수강생 화면 구현 기준으로 사용하지 않습니다.","향후 범위 확정 시 별도 정책 검토가 필요합니다."],spec:"파일명 기준 · 1차 개발 제외"},
    {id:"guide.creator-states",pages:["guide-creator"],selector:".guide-head",type:"FE 상태 가이드",title:"크리에이터 관리자 상태 가이드",summary:"각 상태 보드는 실제 화면 구현 시 함께 처리해야 할 UI 상태를 설명합니다.",rules:["기본, 빈 상태, 잠금과 오류 상태를 함께 확인합니다.","정적 예시값을 서버 상태값으로 치환합니다."],spec:"PRODUCT_SPEC §7 · §9"},
    {id:"guide.learning-states",pages:["guide-learning"],selector:".guide-head",type:"FE 상태 가이드",title:"내 학습 상태 가이드",summary:"수강 전·수강 중·수강 종료 등 권한 상태별 화면을 비교합니다.",rules:["수강 권한 상태를 서버 응답과 일치시킵니다.","기간 종료 시 콘텐츠 접근 제한을 적용합니다."],spec:"PRODUCT_SPEC §5.5 · §14.5"},
    {id:"guide.detail-states",pages:["guide-detail"],selector:".guide-head",type:"FE 상태 가이드",title:"클래스 상세 상태 가이드",summary:"모집·수강 조건·구매 여부에 따른 상세 화면 상태를 비교합니다.",rules:["상태별 CTA와 안내 문구를 함께 구현합니다.","결제 가능 여부는 서버에서 재검증합니다."],spec:"PRODUCT_SPEC §5.4 · §14.4"}
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
      dock.innerHTML='<div class="policy-guide-dock-head"><i>P</i><div><b>개발 정책 보기</b><small>현재 화면의 기능·검증 기준</small></div><button class="policy-guide-dock-close" type="button">종료</button></div><div class="policy-guide-list"></div><div class="policy-guide-shortcut">마커 Hover/Focus · 클릭 고정 · Alt + P 종료</div>';
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
    popover.querySelector(".policy-guide-popover-summary").textContent=policy.summary;
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
    if(event.altKey&&event.key.toLowerCase()==="p"){
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
