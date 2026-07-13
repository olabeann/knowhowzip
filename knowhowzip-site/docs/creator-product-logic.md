# 크리에이터 상품 구조 변경 로직

기준: 클래스는 학습 콘텐츠 단위이고, 상품은 사용자가 결제하는 대상이다. 결제 완료 후 상품에 설정된 클래스가 내 학습에 표시된다. 별도의 회원 등급은 두지 않고 구매 이력과 수강 이력으로 접근 조건을 판단한다.

## 1. 핵심 개념

### 클래스

- 영상, 자료, FAQ, 운영 안내, 라이브 일정의 묶음이다.
- 단독으로도 판매될 수 있지만, 결제 대상 자체는 상품이다.
- 클래스 안에는 여러 개의 강의 영상이 들어갈 수 있다.
- 수강 조건은 클래스에 설정한다.
- 수강 가능 여부는 결제/수강 기록과 수강 조건 충족 여부를 함께 본다.

### 상품

- 사용자가 실제로 결제하는 단위다.
- 상품 유형은 따로 나누지 않는다.
- 하나의 상품은 하나 이상의 클래스를 자유롭게 포함할 수 있다.
- 상품에는 가격, 판매 상태, 판매 기간, 이용 기간 정책, 환불 정책, 수강 조건이 있다.
- 사용자가 상품을 구매하면 해당 상품에 포함된 클래스가 내 학습에 표시된다.

### 수강 조건

- 상품 구매 가능 여부는 구매 이력과 수강 이력을 기준으로 판단한다.
- 기본 조건은 `수강 조건 없음` 또는 `기존 클래스 중 1개 이상 선택`이다.
- 예를 들어 권리분석 실전반은 경매 낙찰 기초반 구매 또는 수강 완료 이력이 있어야 결제할 수 있다.
- 조건을 충족하지 않은 사용자에게도 상품 상세는 보여줄 수 있지만, 결제 단계에서는 안내 문구를 노출하고 결제를 막는다.
- 운영 예외는 크리에이터가 수강생 관리에서 무료 수강으로 바로 처리할 수 있다.

### 수강 조건 설정 위치

- 상품 수강 조건은 `크리에이터 관리자 > 상품 관리 > 상품 생성/수정 > 3. 수강 조건`에서 기존 클래스를 선택해 설정한다.
- 예를 들어 권리분석 실전반 상품의 수강 조건에 `경매 낙찰 기초반`을 선택하면, 해당 클래스를 구매했거나 수강한 사람만 결제할 수 있다.
- 클래스 관리의 `수강 조건·일정`은 콘텐츠 잠금이나 수료 기준처럼 클래스 내부 학습 흐름이 필요할 때 사용한다.
- 상품 관리의 `결제 후 볼 수 있는 클래스` 영역에서는 결제 후 내 학습에 보여줄 클래스를 선택한다.

### 수강 가능 상태

- 결제 완료된 주문을 기준으로 생성한다.
- 상품에 포함된 클래스마다 1개씩 수강 가능 상태를 만든다.
- 같은 클래스에 대해 여러 상품 또는 무료 수강 처리가 있을 수 있다.
- 유효한 수강 가능 상태가 하나라도 있으면 해당 클래스를 볼 수 있다.

## 2. 데이터 모델 예시

```js
const courses = [
  {
    id: "mmoh-basic",
    creatorId: "mmoh",
    title: "경매 낙찰 기초반",
    accessRule: {
      prerequisiteCourseIds: [],
      completionRequiredPercent: 0
    },
    studyPeriod: {
      startsAt: "2026-07-05",
      endsAt: "2026-08-02"
    },
    contents: {
      videos: [],
      files: [],
      faq: [],
      liveSessions: []
    }
  },
  {
    id: "mmoh-right",
    creatorId: "mmoh",
    title: "권리분석 실전반",
    accessRule: {
      prerequisiteCourseIds: ["mmoh-basic"],
      completionRequiredPercent: 100
    },
    studyPeriod: {
      startsAt: "2026-07-12",
      endsAt: "2026-08-09"
    },
    contents: {
      videos: [],
      files: [],
      faq: [],
      liveSessions: []
    }
  }
];

const products = [
  {
    id: "prd-mmoh-basic-pass",
    creatorId: "mmoh",
    name: "경매 낙찰 기초반 단품",
    price: 290000,
    status: "on_sale",
    includedCourseIds: ["mmoh-basic"],
    purchaseRequirement: { type: "none" },
    accessPeriod: {
      type: "course_period",
      days: null
    },
    refundPolicyId: "standard-class-refund"
  },
  {
    id: "prd-mmoh-auction-package",
    creatorId: "mmoh",
    name: "경매 실전 패키지",
    price: 590000,
    status: "on_sale",
    includedCourseIds: ["mmoh-basic", "mmoh-right"],
    purchaseRequirement: { type: "none" },
    accessPeriod: {
      type: "course_period",
      days: null
    },
    refundPolicyId: "standard-bundle-refund"
  },
  {
    id: "prd-mmoh-middle-pass",
    creatorId: "mmoh",
    name: "경매 기초·권리분석 이용권",
    price: 390000,
    status: "on_sale",
    includedCourseIds: ["mmoh-right"],
    purchaseRequirement: { type: "completed_course", courseId: "mmoh-basic" },
    additionalEntitlements: [{ courseId: "mmoh-basic", periodDays: 60 }],
    accessPeriod: {
      type: "from_payment_date",
      days: 120
    },
    refundPolicyId: "standard-class-refund"
  }
];

const orders = [
  {
    id: "ord-001",
    userId: "user-001",
    productId: "prd-mmoh-middle-pass",
    amount: 390000,
    paymentStatus: "paid",
    refundStatus: "none",
    paidAt: "2026-07-01T10:00:00+09:00"
  }
];

const entitlements = [
  {
    id: "ent-001",
    userId: "user-001",
    orderId: "ord-001",
    productId: "prd-mmoh-middle-pass",
    courseId: "mmoh-basic",
    status: "active",
    startsAt: "2026-07-01T10:00:00+09:00",
    endsAt: "2026-10-29T23:59:59+09:00"
  },
  {
    id: "ent-002",
    userId: "user-001",
    orderId: "ord-001",
    productId: "prd-mmoh-middle-pass",
    courseId: "mmoh-right",
    status: "active",
    startsAt: "2026-07-01T10:00:00+09:00",
    endsAt: "2026-10-29T23:59:59+09:00"
  }
];

```

## 3. 상품과 수강 가능 상태 구성

상품 유형을 나누지 않는다. 상품은 수강 조건과 결제 후 볼 수 있는 클래스를 가진 결제 대상이다.

```mermaid
flowchart TD
    P["상품"] --> R["수강 조건"]
    P --> C["결제 후 볼 수 있는 클래스"]
    C --> A["클래스 A"]
    C --> B["클래스 B"]
    C --> D["클래스 C"]
    A --> A1["영상 강의"]
    A --> A2["자료/FAQ"]
```

예시:

| 상품명 예시 | 수강 조건 | 결제 후 볼 수 있는 클래스 | 결제 후 상태 |
| --- | --- | --- | --- |
| 경매 기초 클래스 이용권 | 수강 조건 없음 | 클래스 A | 클래스 A가 내 학습에 표시 |
| 권리분석 실전반 이용권 | 경매 낙찰 기초반 | 클래스 B | 클래스 B가 내 학습에 표시 |
| 땅부자 루틴클럽 | 경매 낙찰 기초반 또는 권리분석 실전반 | 스터디 클래스 | 스터디 클래스가 내 학습에 표시 |
 
중요한 점은 상품을 어떤 이름으로 팔든 결제 완료 후에는 클래스별 수강 가능 상태로 풀어서 저장한다는 것이다. 그래서 내 학습은 상품 카드가 아니라 클래스 카드 기준으로 보여준다.

## 4. 구매 가능 여부

상품 상세 또는 결제 버튼을 보여줄 때 아래 조건을 확인한다.

```js
function canPurchaseProduct({ product, now }) {
  if (!product) return { ok: false, reason: "상품을 찾을 수 없습니다." };
  if (product.status !== "on_sale") return { ok: false, reason: "현재 판매 중인 상품이 아닙니다." };

  if (product.saleStartsAt && now < new Date(product.saleStartsAt)) {
    return { ok: false, reason: "아직 판매 시작 전입니다." };
  }

  if (product.saleEndsAt && now > new Date(product.saleEndsAt)) {
    return { ok: false, reason: "판매 기간이 종료되었습니다." };
  }

  if (!product.includedCourseIds || product.includedCourseIds.length === 0) {
    return { ok: false, reason: "포함된 강의가 없습니다." };
  }

  return { ok: true, reason: "" };
}
```

### 4.1 수강 조건이 있는 상품의 구매 가능 여부

상품에 수강 조건이 있으면, 사용자의 구매 이력과 수강 이력을 기준으로 결제 가능 여부를 판단한다.

```mermaid
flowchart TD
    A["상품 결제 시도"] --> B["상품에 포함된 강의 확인"]
    B --> C{"상품에<br/>수강 조건이 있는가?"}
    C -- "없음" --> D["결제 가능"]
    C -- "있음" --> E{"구매/수강 이력으로<br/>조건을 충족했는가?"}
    E -- "예" --> D
    E -- "아니오" --> F["결제 불가<br/>수강 조건 안내"]
```

예를 들어 권리분석 실전반 상품은 경매 낙찰 기초반 구매 또는 수강 이력이 있어야 결제할 수 있다.

```js
function canPurchaseProductWithPrerequisite({ product, userId }) {
  const requiredIds = product.purchaseRequirement?.courseIds || [];

  for (const requiredCourseId of requiredIds) {
    const hasPurchased = hasPurchasedCourse({ userId, courseId: requiredCourseId });
    const hasCompleted = isCourseCompleted({ userId, courseId: requiredCourseId });

    if (!hasPurchased && !hasCompleted) {
      return {
        ok: false,
        reason: `${getCourse(requiredCourseId).title} 수강생만 신청할 수 있습니다.`
      };
    }
  }

  return { ok: true, reason: "" };
}
```

## 5. 결제 완료 후 내 학습 표시

실서비스에서는 PG 결과를 서버에서 재검증한 뒤 주문을 `paid`로 확정하고, 결제한 클래스가 내 학습에 보이도록 수강 가능 상태를 생성한다.

```js
function completePayment({ order, product, paidAt }) {
  if (order.paymentStatus !== "paid") {
    throw new Error("결제 완료 주문만 수강 가능 상태를 생성할 수 있습니다.");
  }

  return product.includedCourseIds.map((courseId) => {
    const period = resolveEntitlementPeriod({ product, courseId, paidAt });

    return {
      id: createId("ent"),
      userId: order.userId,
      orderId: order.id,
      productId: product.id,
      courseId,
      status: "active",
      startsAt: period.startsAt,
      endsAt: period.endsAt
    };
  });
}

function resolveEntitlementPeriod({ product, courseId, paidAt }) {
  if (product.accessPeriod.type === "from_payment_date") {
    return {
      startsAt: paidAt,
      endsAt: addDaysEndOfDay(paidAt, product.accessPeriod.days)
    };
  }

  if (product.accessPeriod.type === "course_period") {
    const course = getCourse(courseId);
    return {
      startsAt: course.studyPeriod.startsAt,
      endsAt: course.studyPeriod.endsAt
    };
  }

  if (product.accessPeriod.type === "unlimited") {
    return {
      startsAt: paidAt,
      endsAt: null
    };
  }

  throw new Error("지원하지 않는 이용 기간 정책입니다.");
}
```

## 6. 강의 접근 가능 여부

내 학습과 콘텐츠 다운로드/재생 버튼은 이 판단을 사용한다.

```mermaid
flowchart TD
    A["상품 결제 완료"] --> B["포함 강의가 내 학습에 표시"]
    B --> C["강의 A 수강 가능"]
    B --> D["강의 B 수강 가능 상태"]
    C --> E["A 즉시 수강 가능"]
    D --> F{"A 완료 여부 확인"}
    F -- "완료 전" --> G["B 잠금 상태"]
    F -- "완료 후" --> H["B 수강 가능"]
```

```js
function canAccessCourse({ userId, courseId, now }) {
  const activeEntitlement = findActiveEntitlement({ userId, courseId, now });

  if (!activeEntitlement) {
    return {
      ok: false,
      state: "locked",
      reason: "이 강의를 볼 수 있는 수강 가능 상태가 없습니다."
    };
  }

  const prerequisite = checkPrerequisite({ userId, courseId });
  if (!prerequisite.ok) {
    return {
      ok: false,
      state: "prerequisite_locked",
      reason: prerequisite.reason
    };
  }

  return {
    ok: true,
    state: "available",
    reason: ""
  };
}

function findActiveEntitlement({ userId, courseId, now }) {
  return entitlements.find((entitlement) => {
    if (entitlement.userId !== userId) return false;
    if (entitlement.courseId !== courseId) return false;
    if (entitlement.status !== "active") return false;
    if (new Date(entitlement.startsAt) > now) return false;
    if (entitlement.endsAt && new Date(entitlement.endsAt) < now) return false;
    return true;
  });
}

function checkPrerequisite({ userId, courseId }) {
  const course = getCourse(courseId);
  const requiredIds = course.accessRule?.prerequisiteCourseIds || [];

  for (const requiredCourseId of requiredIds) {
    const progress = getCourseProgress({ userId, courseId: requiredCourseId });
    const requiredPercent = course.accessRule.completionRequiredPercent || 100;

    if (progress.completedPercent < requiredPercent) {
      const requiredCourse = getCourse(requiredCourseId);
      return {
        ok: false,
        reason: `${requiredCourse.title}을 먼저 수강 완료해야 합니다.`
      };
    }
  }

  return { ok: true, reason: "" };
}
```

## 7. 내 학습 노출 로직

내 학습은 구매한 상품이 아니라, 권한이 있는 강의를 기준으로 보여준다.

```js
function getMyLearning({ userId, now }) {
  const userEntitlements = entitlements.filter((entitlement) => {
    if (entitlement.userId !== userId) return false;
    if (entitlement.status !== "active") return false;
    if (new Date(entitlement.startsAt) > now) return false;
    return true;
  });

  const courseIds = [...new Set(userEntitlements.map((entitlement) => entitlement.courseId))];

  return courseIds.map((courseId) => {
    const access = canAccessCourse({ userId, courseId, now });
    const course = getCourse(courseId);
    const creator = getCreator(course.creatorId);

    return {
      course,
      creator,
      accessState: access.state,
      accessReason: access.reason,
      isEnded: isCourseEndedForUser({ userId, courseId, now }),
      progress: getCourseProgress({ userId, courseId })
    };
  });
}
```

## 8. 마이 > 결제 내역 노출 로직

결제 내역은 `마이` 화면에서 주문 기준으로 보여준다. 어떤 클래스 권한이 생겼는지는 상품의 포함 클래스 목록으로 판단한다.

```js
function getPaymentHistory({ userId }) {
  return orders
    .filter((order) => order.userId === userId)
    .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
    .map((order) => {
      const product = getProduct(order.productId);
      const includedCourses = product.includedCourseIds.map(getCourse);

      return {
        orderId: order.id,
        paidAt: order.paidAt,
        productName: product.name,
        amount: order.amount,
        paymentStatus: order.paymentStatus,
        includedCourses
      };
    });
}
```

## 9. 환불/취소 시 권한 처리

환불은 주문 상태와 권한 상태를 함께 바꾼다.

```js
function applyRefund({ orderId, refundStatus, revokeAccess }) {
  const order = getOrder(orderId);
  order.refundStatus = refundStatus;

  if (refundStatus === "refunded") {
    order.paymentStatus = "cancelled";
  }

  if (revokeAccess) {
    entitlements
      .filter((entitlement) => entitlement.orderId === orderId)
      .forEach((entitlement) => {
        entitlement.status = "revoked";
        entitlement.revokedAt = new Date().toISOString();
      });
  }
}
```

권장 정책:

- 결제 실패: 주문 생성 가능, 권한 생성 안 함
- 결제 완료: 권한 생성
- 환불 요청: 권한은 정책에 따라 유지 또는 임시 제한
- 환불 완료: 수강 가능 상태 회수 또는 종료일 조정
- 부분 환불: 상품 단위 정책이 필요하므로 MVP에서는 운영자 확인 상태로 둔다

## 10. 관리자 상품 생성 검증

크리에이터 관리자에서 상품 저장 전 아래 조건을 검증한다.

상품 수정 시에는 결제 이력 여부를 먼저 확인한다.

- 결제 이력이 없는 상품: 상품 정보, 결제 후 볼 수 있는 클래스, 수강 조건, 가격·이용 기간, 환불·공개 정책을 수정할 수 있다.
- 결제 이력이 있는 상품: `1. 상품 정보`만 수정할 수 있다.
- 결제 이력이 있는 상품에서 수정 가능한 항목은 상품명, 상품 소개, 노출 상태다.
- 결제 이력이 있는 상품의 결제 후 볼 수 있는 클래스, 수강 조건, 가격, 이용 기간, 환불 정책을 바꾸려면 기존 상품을 수정하지 않고 새 상품을 생성한다.

```js
function validateProductForm(product) {
  const errors = [];

  if (!product.name?.trim()) errors.push("상품명을 입력해 주세요.");
  if (!product.includedCourseIds?.length) errors.push("포함 클래스를 1개 이상 선택해 주세요.");
  if (!product.purchaseRequirement) errors.push("수강 조건을 선택해 주세요.");
  if (product.price < 0) errors.push("가격은 0원 이상이어야 합니다.");

  if (product.accessPeriod.type === "from_payment_date" && !product.accessPeriod.days) {
    errors.push("결제일 기준 이용 기간을 입력해 주세요.");
  }

  return {
    ok: errors.length === 0,
    errors
  };
}
```

## 11. 화면 반영 기준

### 크리에이터 공개 페이지

- 상품 유형 탭은 두지 않는다.
- 상품 카드는 상품명, 가격, 수강 조건, 결제 후 볼 수 있는 클래스, 이용 기간, 판매 상태를 표시한다.
- 포함 클래스가 1개인 상품과 여러 개인 상품은 같은 카드 규칙으로 노출한다.

### 결제 팝업

- 결제 대상은 상품이다.
- 결제 완료 문구는 “내 학습에서 바로 볼 수 있습니다”로 표시한다.
- 수강 조건과 결제 후 볼 수 있는 클래스 목록을 결제 요약에 보여준다.

### 내 학습

- 상품 목록이 아니라 사용자가 볼 수 있는 클래스 목록을 보여준다.
- 같은 강의를 여러 상품으로 샀어도 강의 카드는 1개만 보여준다.
- 수강 기간이 끝났으면 `수강 종료`로 분류한다.
- 결제 기록은 있지만 수강 조건을 충족하지 못했으면 잠금 상태로 보여준다.

## 12. 현재 화면 코드에서 바꿀 지점

현재 정적 화면 코드는 `state.purchased`에 강의 id를 직접 넣는다. 실제 개발에서는 아래처럼 바꾸는 것이 맞다.

```js
state.orders = [];
state.entitlements = [];
```

구매 완료 시:

```js
function confirmPay(productId) {
  const product = productMap[productId];
  const order = createPaidOrder({ product, user: state.user });
  const newEntitlements = completePayment({
    order,
    product,
    paidAt: new Date().toISOString()
  });

  state.orders.push(order);
  state.entitlements.push(...newEntitlements);
}
```

내 학습 렌더링 시:

```js
const learningItems = getMyLearning({
  userId: state.user.id,
  now: new Date()
});
```

이렇게 바꾸면 개별 강의, 패키지, 스터디형 상품이 모두 같은 권한 로직으로 처리된다.
