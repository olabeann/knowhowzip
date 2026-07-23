function refundPolicyMarkup(){
  return `<div class="refund-policy">
    <p class="refund-policy-notice">본 규정은 공통으로 적용되며, 수정이 불가능합니다.</p>
    <details class="refund-policy-details">
      <summary><span>환불 규정 자세히 보기</span><i aria-hidden="true">⌄</i></summary>
      <div class="refund-policy-body">
        <div class="refund-policy-lead">
          <strong>환불 안내</strong>
          <p>결제 전 꼭 확인해 주세요. 전액 환불 가능 기간은 수강 시작 방식에 따라 다릅니다.</p>
        </div>
        <section class="refund-policy-section">
      <h4>전액 환불이 가능한 기간</h4>
      <div class="refund-policy-grid">
        <article>
          <span>지정 기간 수강 클래스</span>
          <ul>
            <li>결제일부터 수강 시작일까지 언제든지 전액 환불</li>
            <li>수강 시작일부터 7일 이내 전액 환불</li>
          </ul>
          <p class="refund-policy-example">예시: 7월 5일 시작 클래스를 6월 10일에 결제한 경우, 7월 12일까지 전액 환불</p>
        </article>
        <article>
          <span>결제 즉시 수강 클래스</span>
          <ul><li>결제일부터 7일 이내 전액 환불</li></ul>
        </article>
      </div>
        </section>
        <section class="refund-policy-section">
      <h4>환불이 제한되는 경우</h4>
      <ul>
        <li>이미 재생한 강의는 환불 대상에서 제외됩니다.</li>
        <li>강의에 포함된 제공 자료를 다운로드한 경우에도 해당 강의를 수강한 것으로 봅니다. 다운로드한 자료는 회수할 수 없기 때문입니다.</li>
        <li>아직 재생하지 않고 자료도 다운로드하지 않은 강의는 환불받을 수 있습니다.</li>
        <li>재생 및 다운로드 여부는 노하우집 시스템의 재생 로그와 다운로드 로그를 기준으로 확인합니다.</li>
      </ul>
        </section>
        <section class="refund-policy-section">
      <h4>7일이 지난 후 중도 해지 시</h4>
      <p>이미 수강한 강의 콘텐츠에 해당하는 금액을 제외하고 환불합니다.</p>
      <div class="refund-policy-formula">환불 금액 = 결제 금액 − (결제 금액 ÷ 전체 강의 콘텐츠 수 × 수강한 강의 콘텐츠 수)</div>
        </section>
        <section class="refund-policy-section">
      <h4>환불 처리</h4>
      <ul>
        <li>신청 후 3일 이내에 결제한 수단으로 환불 처리됩니다.</li>
        <li>카드사 사정에 따라 실제 입금 또는 승인 취소까지 추가 기간이 소요될 수 있습니다.</li>
      </ul>
      <p class="refund-policy-contact">문의: 노하우집 고객센터 (카카오톡 채널)</p>
        </section>
      </div>
    </details>
  </div>`;
}
