// Shared plain-text policy for the local class editor and purchase screens.
const LEGACY_REFUND_POLICY = `환불 안내
결제 전 꼭 확인해 주세요. 전액 환불 가능 기간은 수강 시작 방식에 따라 다릅니다.

전액 환불이 가능한 기간
지정 기간 수강 클래스
• 결제일부터 수강 시작일까지 언제든지 전액 환불
• 수강 시작일부터 7일 이내 전액 환불
예시: 7월 5일 시작 클래스를 6월 10일에 결제한 경우, 7월 12일까지 전액 환불

결제 즉시 수강 클래스
• 결제일부터 7일 이내 전액 환불

환불이 제한되는 경우
• 이미 재생한 강의는 환불 대상에서 제외됩니다.
• 강의에 포함된 제공 자료를 다운로드한 경우에도 해당 강의를 수강한 것으로 봅니다. 다운로드한 자료는 회수할 수 없기 때문입니다.
• 아직 재생하지 않고 자료도 다운로드하지 않은 강의는 환불받을 수 있습니다.
• 재생 및 다운로드 여부는 노하우집 시스템의 재생 로그와 다운로드 로그를 기준으로 확인합니다.

7일이 지난 후 중도 해지 시
이미 수강한 강의 콘텐츠에 해당하는 금액을 제외하고 환불합니다.
환불 금액 = 결제 금액 − (결제 금액 ÷ 전체 강의 콘텐츠 수 × 수강한 강의 콘텐츠 수)

환불 처리
• 신청 후 3일 이내에 결제한 수단으로 환불 처리됩니다.
• 카드사 사정에 따라 실제 입금 또는 승인 취소까지 추가 기간이 소요될 수 있습니다.
문의: 노하우집 고객센터 (카카오톡 채널)`;
// Revised templates; legacy paid classes without a saved policy retain their original terms.
const DEFAULT_REFUND_POLICY = `영상 강의 환불 안내
실제 결제 금액과 유료 콘텐츠 이용 내역을 기준으로 환불합니다.

이용 전 환불
• 유료 영상과 자료를 이용하지 않은 경우, 아래 기간 내 전액 환불할 수 있습니다.
• 지정 기간 수강: 수강 시작 전부터 수강 시작일 이후 7일 이내까지
• 결제 즉시 수강: 결제일부터 7일 이내

일부 이용 후·7일 경과 후 환불
• 수강 기간 중 중도 해지를 신청할 수 있으며, 실제 결제 금액에서 이용한 콘텐츠 금액을 제외하고 환불합니다.
• 공제액은 구매 전 안내된 콘텐츠별 금액을 기준으로 합니다. 영상별 금액을 별도로 안내하지 않았다면 실제 결제 금액 ÷ 전체 유료 영상 수 × 이용한 유료 영상 수로 계산합니다.
• 무료 미리보기는 이용 내역에서 제외합니다. 자료 다운로드만으로 전체 수강 처리하지 않으며, 사전에 안내하지 않은 자료 금액은 별도 공제하지 않습니다.
• 이용 기록에 오류가 있거나 콘텐츠가 설명과 다르거나 정상 제공되지 않는 경우 고객센터로 확인 및 환불을 요청해 주세요.

신청 및 처리
• 마이 > 결제 내역 > 환불 요청 또는 노하우집 카카오톡 고객센터로 신청해 주세요.
• 법정 청약철회에 따른 환급은 청약철회한 날부터 3영업일 이내에 원 결제 수단으로 처리합니다. 카드사·결제기관의 반영에는 추가 시간이 걸릴 수 있습니다.
• 환불이 완료된 콘텐츠의 이용 권한은 종료됩니다.
• 관계 법령에서 보장하는 청약철회·해지 및 환불 권리는 이 안내보다 우선합니다.`;
const EBOOK_REFUND_POLICY = `전자책 환불 안내
전자책은 디지털 콘텐츠입니다. 결제 여부뿐 아니라 본문 열람 여부와 제공 상태를 확인해 환불을 처리합니다.

열람 전 환불
• 유료 본문을 열람하지 않았다면 결제일부터 7일 이내 전액 환불할 수 있습니다.

열람 후 환불
• 유료 본문의 제공이 시작된 후에는 단순 변심에 따른 환불이 제한될 수 있습니다. 이는 구매 전 환불 제한 안내와 체험 제공 등 법령에서 정한 요건을 갖춘 경우에 적용됩니다.
• 결제 사실만으로 본문을 열람한 것으로 간주하지 않습니다. 열람 기록에 오류가 있다면 고객센터로 확인을 요청해 주세요.
• 여러 권을 묶어 구매한 경우, 분리 가능한 구성 중 아직 제공이 시작되지 않은 전자책은 관계 법령에 따라 환불을 요청할 수 있습니다. 이용한 한 권을 이유로 전체 상품의 환불을 일괄 제한하지 않습니다.

신청 및 처리
• 마이 > 결제 내역 > 환불 요청 또는 노하우집 카카오톡 고객센터로 신청해 주세요.
• 법정 청약철회에 따른 환급은 청약철회한 날부터 3영업일 이내에 처리하며, 원 결제 수단의 취소·환급을 진행합니다. 카드사·결제기관의 반영에는 추가 시간이 걸릴 수 있습니다.
• 환불이 완료된 콘텐츠의 이용 권한은 종료됩니다.
• 관계 법령에서 보장하는 청약철회·해지 및 환불 권리는 이 안내보다 우선합니다.`;
function purchasedRefundPolicy(product){
  if(!product?.id)return null;
  try{return JSON.parse(localStorage.getItem(`nhz-purchased-refund-${product.id}`)||'null');}catch{return null;}
}
function refundPolicyText(product){
  const purchased=purchasedRefundPolicy(product);
  return typeof purchased==='string'?purchased:(typeof product?.refundPolicy==='string'?product.refundPolicy:(refundPolicyLocked(product)?LEGACY_REFUND_POLICY:DEFAULT_REFUND_POLICY));
}
function refundPolicyLocked(product){
  return !!product&&(Number(product.paymentCount)>0||!!product.salesConditionsLocked||purchasedRefundPolicy(product)!==null);
}
function escapeRefundPolicy(value){
  return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function refundPolicyMarkup(product,expanded=false){
  if(expanded)return `<div class="refund-policy refund-policy-details"><div class="refund-policy-body refund-policy-text">${escapeRefundPolicy(refundPolicyText(product))}</div></div>`;
  return `<div class="refund-policy"><details class="refund-policy-details"><summary><span>환불 규정 자세히 보기</span><i aria-hidden="true">⌄</i></summary><div class="refund-policy-body refund-policy-text">${escapeRefundPolicy(refundPolicyText(product))}</div></details></div>`;
}
