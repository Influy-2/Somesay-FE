# Somesay

> 내 피부와 닮은 사람의 리뷰를 근거로, 나에게 맞는 뷰티 제품을 찾아 주는 모바일 웹 서비스

Somesay는 사용자의 **피부 맥락**(피부 타입·피부 고민 등)을 기준으로 크리에이터의 리뷰와 제품을 연결합니다.
광고성 후기 속에서 "나와 비슷한 사람이 실제로 어땠는지"를 골라 볼 수 있게 하는 것이 목표입니다.

이 저장소는 Somesay의 **프론트엔드 모노레포**입니다. 백엔드(Spring)는 별도 저장소·팀에서 관리합니다.

## 주요 기능

| 영역               | 설명                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| 온보딩 · 인증      | 카카오 로그인, 약관·이메일 인증, 닉네임·프로필, 피부 타입·고민 입력, 잘 맞았던/안 맞았던 제품 선택 |
| 홈                 | 피부 맥락 기반 제품 추천, 제품·크리에이터 랭킹, 큐레이션, 리뷰 공감 투표                           |
| 랭킹 · 카테고리    | 제품·크리에이터 랭킹, 카테고리·서브카테고리별 제품 탐색                                            |
| 브랜드 · 제품 상세 | 브랜드 홈, 제품 상세, 크리에이터 리뷰 요약·랭킹, 유사 제품                                         |
| 검색               | 제품·리뷰 검색, 최근 검색어, 필터                                                                  |
| 마이페이지         | 내 피부 프로필, 잘 맞는/안 맞는 제품 관리, 찜 목록(제품·크리에이터), 리뷰 평가, 계정 설정          |
| 크리에이터 홈      | 크리에이터 프로필과 신뢰 점수, 리뷰 모음                                                           |

## 기술 스택

- **UI**: React 19, Vite(SWC), Tailwind CSS v4
- **언어**: TypeScript (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- **상태**: TanStack Query(서버 상태), Zustand(클라이언트 상태), React Router
- **검증·통신**: zod, Axios
- **UI 문서·테스트**: Storybook 10, Chromatic, Vitest
- **도구**: pnpm workspace + Turborepo, ESLint, Prettier, husky + lint-staged + commitlint

## 시작하기

요구 사항: Node.js 22, pnpm 10 (`packageManager` 필드 기준)

```bash
pnpm install --frozen-lockfile
cp apps/web/.env.example apps/web/.env   # (확인 필요: .env.example 추가 후)
pnpm dev                                  # http://localhost:5173
```

`apps/web/.env`에는 다음 변수가 필요합니다. 값은 팀에 문의하세요.

| 변수                      | 설명                        |
| ------------------------- | --------------------------- |
| `VITE_API_BASE_URL`       | 백엔드 API 주소             |
| `VITE_KAKAO_REST_API_KEY` | 카카오 로그인 REST API 키   |
| `VITE_KAKAO_REDIRECT_URI` | 카카오 로그인 리디렉션 주소 |

### 주요 명령어

```bash
pnpm dev                       # 개발 서버
pnpm build                     # 전체 빌드 (tsc + vite build)
pnpm lint                      # ESLint
pnpm type-check                # tsc --noEmit
pnpm test                      # 단위 테스트(Vitest)
pnpm --filter web storybook    # Storybook (http://localhost:6006)
```

### VS Code 설정 (기능 ID 보조)

`data-feature="F-0154"`에 마우스를 올리면 `11.1.5 상단 바`처럼 표시 번호·제목이 뜨고,
`"3.3.1"`처럼 표시 번호를 쓰면 빠른 수정(Ctrl/Cmd + .)으로 기능 ID로 바꿀 수 있습니다.
`packages/ts-feature-plugin`(TypeScript 언어 서비스 플러그인)이 해 주며, **레포의 TypeScript를 써야** 동작합니다. 처음 한 번만 설정하세요.

1. `.vscode/settings.json`(gitignore됨)에 추가합니다.
   ```json
   {
     "typescript.tsdk": "apps/web/node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true
   }
   ```
2. `.tsx` 파일을 연 상태에서 명령 팔레트 → **TypeScript: Select TypeScript Version** → **Use Workspace Version**.

동작하지 않으면 명령 팔레트의 **TypeScript: Open TS Server log**에서 `[somesay-feature]` 줄을 확인하세요.
`tsc`·빌드·CI에는 영향이 없습니다.

## 프로젝트 구조

```
apps/web/src/
  routes/      라우트 정의 (path.ts, index.tsx)
  pages/       URL 파싱 · feature 조립 · 레이아웃만 담당
  features/    기능 단위 모듈 (auth, home, onboarding, myPage, productDetail ...)
  shared/      공용 컴포넌트 · 훅 · 스토어
  utils/ styles/

packages/shared/   서버 계약 레이어 (UI를 모르는 코드만)
  api/             API 호출 함수
  domain/          dto · types · mapper
  query/           쿼리 키, 캐시 유틸
  constants/ utils/

packages/config/   공용 tsconfig · ESLint 설정
```

의존 방향은 `pages → features → shared → packages/shared` 한 방향입니다.
`shared/`는 `features/`를 import하지 않습니다.

## 설계 원칙

팀의 상세 규약은 [`CLAUDE.md`](./CLAUDE.md), [`apps/web/CLAUDE.md`](./apps/web/CLAUDE.md), [`packages/shared/CLAUDE.md`](./packages/shared/CLAUDE.md)에 있습니다. 핵심만 요약합니다.

- **공용화는 늦게 합니다.** 2곳에서 쓴다는 이유로 `shared/`에 올리지 않고, 공용화 지시가 있거나 3번째 사용처가 생길 때 올립니다.
  서비스가 자주 바뀌어서, 잘못된 공용화(`variant` prop 누적)보다 복제가 싸다고 판단했습니다.
- **feature는 공개 barrel(`index.ts`)로만 접근합니다.** `no-restricted-imports` 린트 규칙으로 강제합니다.
- **서버 계약은 한 곳에 모읍니다.** API 함수·DTO·타입·매퍼·쿼리 키는 `packages/shared`에 둡니다.
  필드명은 서버를 따르고, 매퍼는 표현 타입이 다르거나 래핑을 벗기거나 구조를 바꿀 때만 만듭니다.
- **상태는 위치를 순서대로 판단합니다.** 서버 데이터는 TanStack Query, 새로고침·링크 공유가 필요하면 URL, 여러 화면이 공유하면 Zustand, 그 외는 `useState`.
- **무한 스크롤 캐시는 invalidate하지 않고 국소 패치합니다.** 낙관적 갱신 시 페이지 경계가 흔들려 항목이 중복·누락되는 문제를 피하기 위해서입니다 (`productWishCache`).
- **모바일 전용**(최대 폭 `40rem`), 시맨틱 HTML + ARIA, 디자인 토큰만 사용합니다.

## 테스트 · 품질

- **Storybook**: `shared/components`의 모든 컴포넌트에 스토리를 두고 Chromatic으로 시각 회귀를 확인합니다.
- **Vitest**: 순수 함수, 매퍼, zod 스키마, Zustand 스토어, 쿼리 캐시 유틸을 대상으로 합니다.
- **CI**: GitHub Actions에서 lint, type-check, test를 실행합니다 (`.github/workflows/verify.yml`).
- **커밋**: commitlint로 Conventional Commits 형식을 강제합니다.

## AI 협업 설정

이 저장소는 사람과 AI 에이전트가 같은 규약으로 작업하도록 설계했습니다.

- 규약 문서: 루트·`apps/web`·`packages/shared`의 `CLAUDE.md`
- 스킬(`.claude/skills`): `api-integration`, `figma-to-component`, `storybook`, `write-pr`
- 커맨드(`.claude/commands`): `plan-mode`(설계 논의), `review-pr`(PR 리뷰)
- 소분류를 그리는 JSX 요소에 `data-feature="F-0042"`처럼 바뀌지 않는 기능 ID를 달아 기능명세서와 연결하고, `apps/web/scripts/feature-impact.mjs`로 PR이 닿은 기능을 계산합니다.

## 기여

- 이슈 생성 후 브랜치는 `feat/{이슈번호}-{설명}` 형태로 만들고 `develop`으로 PR을 보냅니다.
- 이슈, PR 템플릿은 `.github/` 내의 템플릿을 따릅니다.
