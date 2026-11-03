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
3. **named export + 화살표 함수.** 예외는 Storybook `meta`뿐.
4. **Tailwind만.** 커스텀 타이포/컬러 토큰만 사용. `style`은 런타임 계산값(`width: ${n}%`, 동적 transform)에만 허용.
5. **시맨틱 HTML + ARIA.** `div` 남용 금지, 클릭 요소는 `<button type="button">`.
6. **feature 단위 분리.** `shared/`로 올리는 건 **공용화 지시를 받았거나 3번째 사용처가 생겼을 때**뿐이다. 2곳이면 복제해 둔다.
7. **주석은 "왜"를 쓴다.** "무엇"은 코드가 말한다. 한국어로 짧게.

## 스택

React 19 · Vite(SWC) · TS strict(`noUncheckedIndexedAccess` 포함) · Tailwind v4(`@theme`)
TanStack Query(서버 상태) · Zustand(클라이언트 상태) · React Router · Axios · zod
Storybook 10 + Chromatic · Vitest · embla-carousel(`useCarousel`로만 사용)
pnpm + Turbo 모노레포. **npm/yarn 금지.**

## 구조

```
apps/web/src/      routes/ pages/ features/ shared/ utils/ styles/
packages/shared/   api/ domain/ query/ constants/ utils/   → import { X } from '@somesay/shared'
```

별칭 `@/*` → `apps/web/src/*`

## 명령어

```
pnpm dev | build | lint | type-check      # turbo, 전체 워크스페이스
pnpm --filter web test                    # vitest unit 프로젝트
pnpm --filter web storybook               # :6006
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

| 문서                                   | 용도                                                          |
| -------------------------------------- | ------------------------------------------------------------- |
| `apps/web/CLAUDE.md`                   | 앱 폴더 규약 · 상태관리 · UI 패턴 · 접근성 · Storybook/테스트 |
| `packages/shared/CLAUDE.md`            | 서버 계약 레이어 규약 (api / domain / query)                  |
| `.claude/docs/features.md`             | 기능명세 (화면번호 `1.2.1` 체계)                              |
| `.claude/docs/refactor-todo.md`        | 규약 통일을 위해 나중에 고칠 코드 목록                        |
| `docs/SOMESAY_UI_DESIGN_PHILOSOPHY.md` | 제품 가치·UI 철학                                             |

**스킬** (해당 작업이면 자동 발동)

| 스킬                 | 언제                                       |
| -------------------- | ------------------------------------------ |
| `api-integration`    | 백엔드 명세를 받아 API를 연동할 때         |
| `figma-to-component` | Figma 디자인을 컴포넌트로 구현할 때        |
| `storybook`          | 공용 컴포넌트의 스토리를 쓸 때             |
| `write-pr`           | PR 본문 초안을 쓸 때 (팀웹 진행 주석 포함) |

**커맨드** (직접 호출) — `/plan-mode` 설계 논의 · `/review-pr` PR 리뷰
