# apps/web — UI 규약

루트 `CLAUDE.md`의 규칙을 전제로, 앱 UI 작업에만 해당하는 내용을 담는다.

> 상태관리·Storybook·컴포넌트 설계 규약은 대주제별 논의 후 이 파일에 추가한다.

## 폴더 규약

### 어디에 둘까

| 무엇                                              | 어디                                              |
| ------------------------------------------------- | ------------------------------------------------- |
| 한 feature에서만 쓰는 컴포넌트·훅·유틸            | `features/{f}/`                                   |
| 공용화 지시를 받았거나 **3번째** 사용처가 생긴 UI | `shared/components/{그룹}/`                       |
| 서버 상태 훅 (`useFetchX` `usePostX`)             | `shared/hooks/{도메인}/` — **사용처가 1곳이어도** |
| 도메인 무관 UI 훅 (`useCarousel` `useDrag`)       | `shared/hooks/` 루트                              |
| API 함수·DTO·타입·매퍼·쿼리키                     | `packages/shared/`                                |

### 공용화는 늦게 한다

**2곳에서 쓴다는 이유로 `shared/`에 올리지 않는다.** 두 곳의 요구가 갈리면 `variant` prop이 붙기 시작하고,
그게 `EvaluatedReviewCard`(중첩 22필드) 같은 결과가 된다. 변경이 잦은 프로젝트에서는
**복제가 잘못된 공용화보다 싸다** — 복제본은 서로를 깨뜨리지 않고 따로 바꿀 수 있다.

올리는 시점은 둘 중 하나다.

1. 공용화하라는 지시를 받았을 때
2. **3번째** 사용처가 생겼을 때 (그때야 공통 모양이 무엇인지 드러난다)

**예외 둘**

- **디자인 시스템 원자** (버튼·칩·입력·모달) — 목적이 재사용이 아니라 **시각 일관성**이라 처음부터 `shared/`에 둔다.
- **서버 상태 훅** — API 연동이 끝나기 전에는 어느 훅이 공유될지 알 수 없다. 또 서버 데이터는 화면 경계를 잘 넘어서, feature 안에 가두면 나중에 feature→feature 의존이 생긴다.

### features/{f} 골격

`components/`만 필수. 나머지는 필요할 때만 만들되 **이름은 아래에서 고른다**.

```
components/ hooks/ stores/ utils/ constants/ types/ schemas/ services/ index.ts
```

- `services/` = 서버 API가 **아닌** 외부 연동 (토큰 저장, OAuth 리디렉션, 브라우저 스토리지).
  서버 API 호출은 예외 없이 `packages/shared/api/`에 둔다.
- 쓰지 않는 이름 — `store/`(단수) `model/` `mocks/` `api/`
- 중첩은 `components/{그룹}/`까지. 더 깊어지면 별도 feature로 승격한다.

### pages/

페이지가 하는 일은 셋뿐이다 — **URL 파라미터 파싱 / feature 컴포넌트 조립 / 레이아웃**.
데이터 조회·파생 계산·화면 상태가 쌓이면 `features/{f}/hooks/use{Feature}.ts`로 내린다.
모든 페이지는 named export.

### barrel (index.ts)

barrel은 목적이 둘이고, 목적에 따라 규칙이 반대다.

**경계 barrel** — `features/{f}/index.ts`, `packages/shared/src/index.ts`
공개 API를 정의한다.

- 밖에서는 **반드시 경유**한다. `@/features/x/components/Y` 금지.
- 안에서는 **절대 쓰지 않는다.** 같은 feature 내부는 상대경로로 참조한다.
- 밖에서 실제로 쓰는 것만 넣는다. 내부 전용 파일은 노출하지 않는다.

**편의 barrel** — `shared/components/`, `shared/hooks/`, `shared/icons/`
경계가 아니라 import를 모아 쓰는 장치다.

- 밖에서는 경유한다.
- **같은 폴더 안에서는 상대경로를 쓴다.** `shared/components/a/A.tsx`가 `@/shared/components`를 import하면 barrel과 순환이 된다.

`shared/` 하위 폴더는 **전부** `index.ts`를 둔다. 예외 없이 밖에서는 barrel로 import한다.

중첩 barrel(`{f}/components/index.ts`)은 만들지 않는다.

### 계층 방향

`pages → features → shared → packages/shared` 한 방향으로만 의존한다.
**`shared/`가 `@/features/*`를 import하면 안 된다.** 공용 훅이 feature 기능을 필요로 하면, 그 기능을 인자로 받거나 `shared/`로 올린다.

## 상태 관리

상태를 어디 둘지는 이 순서로 자문한다.

1. **서버에서 온 데이터인가** → TanStack Query. Zustand·useState로 복사하지 않는다.
2. **새로고침·뒤로가기·링크 공유에서 살아남아야 하나** → URL (`useSearchParams`)
3. **여러 화면이 공유하거나 새로고침을 견뎌야 하나** → Zustand (필요하면 `persist`)
4. **그 외** → `useState`

**Context는 서버 상태와 클라이언트 상태를 조합한 파생값을 내려줄 때만 쓴다.**
Zustand 스토어 안에서는 훅을 호출할 수 없기 때문이다. `AuthProvider`가 유일한 예다
— 토큰 스토어 + `useFetchUserInfo`를 조합해 `checking / authenticated / unauthenticated / error` 4상태를 만든다.

### 스토어 규칙

- 파일 `{이름}.store.ts` · 훅 `use{이름}Store` · 타입 `interface {이름}Store`
- 상태와 액션을 한 인터페이스에 둔다.
- 구독은 셀렉터로 — `useSnackbarStore((state) => state.showSnackbar)`. 스토어를 통째로 구독하지 않는다.
- **파생값을 저장하지 않는다.** 원본만 담고 나머지는 계산한다 (`useMySkinProfile`, `isAuthenticated`).
- `persist` — 키는 `somesay_` prefix. 탭을 닫으면 사라져야 하면 `sessionStorage`,
  재방문에도 남아야 하면 `localStorage`. **왜 영속하는지 JSDoc으로 남긴다.**

## 공용 컴포넌트

- 추가하면 `shared/components/index.ts`에 named export 등록 필수. 외부는 barrel로만 import한다.

## 컴포넌트 작성

### Props

**도메인 타입에서 파생한다.** 컴포넌트 안에서 데이터 모양을 다시 선언하지 않는다.

```tsx
// Do
type RecommendedProductCardProps = ProductCardType & { order: number };
interface CreatorHomeProfileProps extends BasicCreatorProfileType { ... }
type EvaluationCardProfileProps = Pick<CreatorType, 'creatorName' | 'profileImgUrl'>;

// Don't — 익명 객체로 도메인 모양을 다시 적는다
interface XProps {
  review: { reviewId: number; product: { productId: number; ... } };
}
```

중첩 익명 객체가 나오면 그 모양은 `packages/shared/src/domain/`에 있어야 할 타입이다.
아직 API가 없어 타입이 없다면 그 사실을 말하고 임시임을 주석으로 남긴다.

Props가 8개를 넘으면 **컴포넌트를 쪼갤 때다.** 표시 단위를 나누거나 `children`으로 합성한다.

### 실험 대상 값은 상수로

이 서비스는 반응을 보고 자주 바꾼다. **바꿔볼 값**은 컴포넌트를 읽지 않고도 고칠 수 있게 상수로 뺀다.

| 뺀다                           | 두지 않는다                   |
| ------------------------------ | ----------------------------- |
| 개수 제한 (`MAX_SELECTIONS`)   | 화면에 한 번 쓰이는 고정 문구 |
| 노출 순서·개수                 | 버튼 라벨, 제목               |
| 실험 중인 문구·추천 조합       | aria-label                    |
| 타이밍 (`TOOLTIP_DURATION_MS`) | 접근성 텍스트                 |

기준은 **"이 값을 바꿔볼 생각이 있는가"** 하나다. 모든 문구를 상수로 빼면 오히려 읽기 어려워진다.
위치는 `{feature}/constants/` 또는 컴포넌트 옆 `x.constants.ts`.

### 클래스

- `cn()`은 **default import** 로 통일한다 — `import cn from '@/utils/cn';`
- 조건부 클래스가 둘 이상이면 `cn()`을 쓴다. 템플릿 문자열로 클래스를 잇지 않는다.

### 임의값 (`w-[...]`)

토큰·스케일로 떨어지지 않는 값은 **쓰기 전에 묻는다.** 그대로 쓸 수 있는 경우는 셋뿐이다.

1. 계산식 — `w-[calc((100%-.5rem)/3)]`
2. 외부 브랜드 규정 색 — 카카오 `#FEE500`, 네이버 `#03C75A`
3. 서비스 최대 폭 `max-w-[40rem]`

**Figma 실측 px(`h-[138.81px]`)를 그대로 남기지 않는다.** 컬러는 예외 없이 토큰을 쓴다.

## 레이아웃

- 모바일 전용. 최대 폭은 `max-w-[40rem]`.
- Overlay(모달·바텀시트) — `fixed` + `left-1/2` + `-translate-x-1/2` 중앙 정렬, `max-w-[40rem]` 필수.
  배경 클릭 시 닫고, 내부는 `stopPropagation`.
- Carousel — `useCarousel` 훅만 사용(embla 직접 사용 금지). `emblaRef`는 반드시 `overflow-hidden` 컨테이너에 건다.

## 접근성

- `article` `section` `nav` `ul/li` `button`을 먼저 고른다. 의미 없는 `div` 중첩 금지.
- 섹션은 `aria-labelledby`로 자기 제목(`h2`)과 연결한다.
- 상태는 ARIA로 표현 — 토글 `aria-pressed`, 로딩 `aria-busy`, 열림 `aria-expanded`.
- 이미지 — 장식용은 `alt=""` + 부모 `aria-hidden`, 의미 있으면 `alt`에 내용을 쓴다.

## 로딩 · 에러 · 빈 상태

- 스켈레톤 — 파일명 `{대상}Skeleton.tsx`, 원자는 `shared/components/loading/LoadingBlock`.
  실제 콘텐츠와 같은 제목을 유지하고 `role="status"` + `aria-busy="true"` + `aria-label="~를 불러오는 중"`.
- 빈 상태 — `{대상}EmptyState.tsx`.
- 조회 실패 — 화면 안에서 안내할 수 있으면 `throwOnError: false`로 두고 섹션 내부에서 처리한다.
  전역 폴백은 `shared/components/error/GlobalError.tsx`.
- 사용자 알림은 `useSnackbarStore`. 문구 톤: 성공 `"~했어요."` / 실패 `"~하지 못했어요. 잠시 후 다시 시도해 주세요."`

## Storybook · 테스트

**분업** — Storybook이 "보이는 것", Vitest가 "계산되는 것"을 맡는다.

| 대상                                                            | 도구                    |
| --------------------------------------------------------------- | ----------------------- |
| `shared/components/`의 모든 컴포넌트                            | Storybook 스토리 (필수) |
| 순수 함수 · 매퍼 · zod 스키마 · Zustand 스토어 · 쿼리 캐시 유틸 | Vitest                  |
| feature 컴포넌트 · 페이지                                       | 둘 다 만들지 않는다     |

feature 컴포넌트는 공용 컴포넌트를 조립한 결과라 스토리를 만들어도 회귀 신호가 약하고
Chromatic 스냅샷 비용만 늘어난다. 조립 로직이 복잡하면 그 로직을 훅·유틸로 빼서 Vitest로 덮는다.

### 스토리 규격

```tsx
const meta: Meta<typeof X> = {
  title: 'Shared/{폴더명 PascalCase}/{컴포넌트명}', // 폴더명을 그대로 따른다
  component: X,
  tags: ['autodocs'], // 필수
  args: {
    /* 기본값 */
  },
};
export default meta; // 유일하게 허용되는 default export

type Story = StoryObj<typeof X>;
export const Default: Story = {};
export const Hearted: Story = { args: { isHearted: true } }; // 상태별로 하나씩
```

- `title`은 **폴더명에서 기계적으로 유도**한다. 재량으로 정하지 않는다.
- 공통 래핑(라우터·모바일 폭)은 `.storybook/preview.tsx`가 한다. 개별 `decorators`는 그 스토리만 폭·배경이 달라야 할 때 쓴다.
- 클릭으로 상태가 바뀌는 스토리는 `render: function Render(args) {…}`로 쓴다. 화살표 함수면 훅 사용 시 `rules-of-hooks` 에러가 난다.
- mock 이미지는 `@/assets/mock_*`를 쓴다.
- 스토리를 만들지 않는 예외 — 레이아웃·호스트 컴포넌트(`GlobalLayout` `SnackbarHost` `BottomTabLayout`)처럼 단독으로 렌더할 의미가 없는 것.

### 테스트 규격

- 파일은 대상 옆에 `{대상}.test.ts`.
- `describe`는 대상 이름, `it`은 **한국어 문장으로 동작을 서술**한다 — `it('카테고리로 상품을 필터링한다')`.
- 구현이 아니라 계약을 검증한다. 내부 호출 횟수를 세지 않는다.

## Figma → 코드

- `get_design_context`로 디자인을 먼저 읽는다. Figma 출력은 참고용이지 정답이 아니다.
- px → Tailwind spacing(4px=1). Auto Layout → `flex`/`flex-col`.
- 컬러·타이포는 반드시 토큰으로 치환한다. **`h-[138.81px]` 같은 실측 임의값을 그대로 남기지 않는다.**
  토큰/스케일로 떨어지지 않으면 물어본다.
