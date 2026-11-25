# CLAUDE.md — Somesay

모바일 웹(max-w-40rem) 뷰티 리뷰 서비스. 사용자의 피부 맥락을 근거로 크리에이터 리뷰와 제품을 연결한다.
FE 2인(내가 총괄) / BE는 Spring 별도 팀. 대화·주석·문서는 한국어.

## 현재 단계

**API 연동 진행 중.** 화면이 `MOCK_*` 상수를 쓰면 미연동, 훅을 쓰면 연동 완료다.

- 연동 완료 — 홈(추천·랭킹·큐레이션·공감리뷰), 랭킹, 카테고리, 브랜드홈, 상품상세(기본·리뷰), 온보딩/인증, 찜
- 미연동(mock) — 마이페이지, 크리에이터홈, 서브카테고리, 검색, 제품선택, 상품상세의 리뷰랭킹·유사상품, 홈 카테고리상품

## CORE RULES

1. **설계 먼저.** 코드 작성 전 타입/컴포넌트 분리안과 파일 위치를 한국어로 제안하고, 승인 후 구현한다.
2. **요청받은 작업만.** 관련 없는 리팩터링·네이밍 정리·기존 코드 변경 금지. 애매하면 먼저 묻는다.
3. **named export + 화살표 함수.** 예외는 Storybook `meta`와, 스토리 안에서 훅을 쓰는 `render: function Render()`뿐.
4. **Tailwind만.** 커스텀 타이포/컬러 토큰만 사용. `style`은 런타임 계산값(`width: ${n}%`, 동적 transform)에만 허용.
5. **시맨틱 HTML + ARIA.** `div` 남용 금지, 클릭 요소는 `<button type="button">`.
6. **feature 단위 분리.** `shared/`로 올리는 건 **공용화 지시를 받았거나 3번째 사용처가 생겼을 때**뿐이다. 2곳이면 복제해 둔다.
7. **주석은 "왜"를 쓴다.** "무엇"은 코드가 말한다. 한국어로 짧게.

### `data-feature` — 기능명세서와 코드 연결

팀웹(team.influy.com)의 기능을 가리키는 번호는 두 종류다. **헷갈리지 않는다.**

| 이름      | 예       | 성질                                                                  |
| --------- | -------- | --------------------------------------------------------------------- |
| 기능 ID   | `F-0042` | 기능이 생길 때 한 번 붙고 **절대 바뀌지 않는다.** 지워도 재사용 안 함 |
| 표시 번호 | `3.1.2`  | 화면의 순서 번호. 기능을 옮기면 **바뀐다**                            |

**코드에는 기능 ID만** 쓴다. 사람에게 보여 줄 때(PR·대화)는 `3.1.2 상품 랭킹 (F-0042)`처럼 그 시점의 표시 번호·제목과 같이 쓴다.
`docs/기능명세서/*.md`의 항목 번호는 문서 목차라 표시 번호와 다른 값이다.

소분류를 그리는 JSX 요소에 `data-feature` 속성을 단다. 감싸지 않고 이미 있는 요소에 붙이며,
`write-pr`이 `apps/web/scripts/feature-impact.mjs`로 PR의 영향 범위를 계산할 때 쓴다. 범위는 그 요소의 시작~끝이다.

```tsx
<section data-feature="F-0009" aria-label="상품 랭킹">…</section>
<TabBar data-feature="F-0024" tabs={…} />
<div data-feature={['F-0017', 'F-0019']}>…</div>
```

- 타입은 `apps/web/src/featureAttribute.d.ts`가 `React.Attributes`를 넓혀 준다. DOM 요소·컴포넌트 모두에 달 수 있고
  컴포넌트 props는 고치지 않는다. 값은 `LeafFeatureId`(소분류만)라 없는 ID·중·대분류 ID는 타입 에러다.
- 이름은 `id`가 아니다. HTML `id`(aria 연결)와 겹치기 때문이다. DOM 요소에 달면 HTML에 그대로 남는다.
- **위치 — 그 소분류만 담는 가장 높은 요소.** 순서대로 고른다.
  1. 기능 하나만 그리는 `features/` 컴포넌트 → **그 컴포넌트의 루트 요소** (루트가 Fragment면 형제마다)
  2. 기능 여럿을 그리는 `features/` 컴포넌트 → 컴포넌트 안에서 기능별 하위 요소로 나눠 단다
  3. 페이지 전체가 기능 하나 → 페이지 컴포넌트의 루트 요소
  4. `shared/` 컴포넌트 → **안에 달지 않는다.** 쓰는 쪽(페이지·feature)의 요소에 단다
- 컴포넌트 안에 단 표식은 그 컴포넌트를 렌더하는 요소(페이지의 `<ProductRankingSection />`)까지 같은 기능으로 계산된다.
- 범위 하나에 ID가 하나면 그 안의 변경은 `changed`, 여럿이면 `possible`(사람이 확인)로 판정된다.
  shared 카드 안의 이동(3.1.3 등)처럼 떼어 낼 수 없으면 목록과 함께 묶는다. 자기 화면 요소가 없는 기능(서버 처리, 미구현)은 달지 않는다.
- 단계(`done`/`screen`)는 코드에 쓰지 않는다. 연결 상태가 바뀌면 거짓이 되기 때문이다.
- 기능 목록이 바뀌면 팀웹 JSON을 붙여 넣어 갱신한다 — `pbpaste | pnpm --filter @somesay/shared features:update`
  (`packages/shared/features/features.json` 스냅샷 → `src/features/generated/features.ts` 타입). 생성물은 직접 고치지 않는다.
- 에디터 보조는 `packages/ts-feature-plugin`(tsserver 플러그인)이 한다 — F-ID hover에 표시 번호·제목, 표시 번호를 쓰면 기능 ID로 바꾸는 빠른 수정.
  워크스페이스 TypeScript를 써야 켜진다 (README §VS Code 설정). pnpm에서 tsserver가 플러그인을 찾도록 **루트 devDependencies에도** 둔다.

## 스택

React 19 · Vite(SWC) · TS strict(`noUncheckedIndexedAccess` 포함) · Tailwind v4(`@theme`)
TanStack Query(서버 상태) · Zustand(클라이언트 상태) · React Router · openapi-fetch + openapi-react-query · zod
Storybook 10 + Chromatic · Vitest · embla-carousel(`useCarousel`로만 사용)
pnpm + Turbo 모노레포. **npm/yarn 금지.**

## 구조

```
apps/web/src/      routes/ pages/ features/ shared/ utils/ styles/
packages/shared/   openapi/ api/ domain/ query/ constants/ utils/   → import { X } from '@somesay/shared'
```

서버 타입·경로는 백엔드 Swagger에서 생성한다 (`packages/shared/openapi/` 스냅샷 → `api/generated/`). 손으로 쓰지 않는다.

별칭 `@/*` → `apps/web/src/*`

## 명령어

```
pnpm dev | build | lint | type-check      # turbo, 전체 워크스페이스
pnpm --filter web test                    # vitest unit 프로젝트
pnpm --filter web storybook               # :6006
pnpm --filter @somesay/shared api:sync    # 백엔드 Swagger 스냅샷 갱신 + 타입 재생성
pbpaste | pnpm --filter @somesay/shared features:update   # 팀웹 기능 목록 스냅샷 갱신 + 기능 ID 타입 재생성
pnpm --filter @somesay/shared features:pull             # 팀웹 서버 DB에서 바로 받아 갱신 (packages/shared/.env 필요, .env.example 참고)
node apps/web/scripts/feature-impact.mjs [base]           # 변경이 닿는 기능(F-ID) 계산 (write-pr가 사용)
```

## 코딩 컨벤션

**파일명** — 컴포넌트 `PascalCase.tsx` / 훅 `useX.ts` / 타입 `x.types.ts` / 유틸·스토어 `camelCase.ts` `x.store.ts` / 상수값 `SCREAMING_SNAKE_CASE`

**import 순서** — React → 외부 라이브러리 → `*.svg?react` → `@somesay/shared` → `@/...` → `type` import

**type vs interface** — 유니온·별칭은 `type`, 확장 가능한 객체·컴포넌트 Props는 `interface`. `@somesay/shared` 타입을 그대로 Props로 쓰면 `type X = YType`.

**`noUncheckedIndexedAccess`** — 직접 인덱싱은 `T | undefined`다. `items[0]?.name`으로 접근하거나 `.map()`/`Array.from({length:n})`을 쓴다.

## 디자인 토큰 (`apps/web/src/styles/global.css`)

- 타이포 — `headline1~4` / `subhead-{b,sb,m}` / `body{1,2}-{b,sb,m}` / `caption1-{b,sb,m}` / `caption2-m`
- 컬러 — `grey01~09` `black` `white` `background` `error` `primary-{100,200,300,400}` `secondary-{100,200}`
- z-index — header 10 / dropdown 20 / overlay 30 / modal 40 / toast 50

목록에 없는 값은 임의로 만들지 말고 **어떤 토큰을 쓸지 물어본다.**

## 문서 지도

| 문서                        | 용도                                                          |
| --------------------------- | ------------------------------------------------------------- |
| `apps/web/CLAUDE.md`        | 앱 폴더 규약 · 상태관리 · UI 패턴 · 접근성 · Storybook/테스트 |
| `packages/shared/CLAUDE.md` | 서버 계약 레이어 규약 (스펙 동기화 / 타입 / 쿼리 키 / 캐시)   |

**스킬** (해당 작업이면 자동 발동)

| 스킬                 | 언제                                          |
| -------------------- | --------------------------------------------- |
| `api-integration`    | API를 연동하거나 백엔드 스펙 변경을 반영할 때 |
| `figma-to-component` | Figma 디자인을 컴포넌트로 구현할 때           |
| `storybook`          | 공용 컴포넌트의 스토리를 쓸 때                |
| `write-pr`           | PR 본문 초안을 쓸 때 (팀웹 진행 주석 포함)    |

**커맨드** (직접 호출) — `/plan-mode` 설계 논의 · `/review-pr` PR 리뷰
