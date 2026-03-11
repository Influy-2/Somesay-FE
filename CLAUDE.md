# CLAUDE.md — Somesay 프로젝트 컨텍스트

> 이 파일은 Claude가 매 대화 시작 시 읽어야 하는 프로젝트 전체 컨텍스트입니다.
> 코드 생성 시 여기 정의된 규칙을 반드시 따르세요.

---

## 프로젝트 개요

- **프로젝트명**: Somesay
- **성격**: 대규모 리뷰 작성 웹 애플리케이션
- **팀 구성**: 프론트엔드 2명 / 백엔드 (Spring) 별도 팀
- **나의 역할**: 프론트엔드 개발

---

## 기술 스택

### 코어

| 분류       | 기술         | 버전 | 비고             |
| ---------- | ------------ | ---- | ---------------- |
| Framework  | React        | 18+  |                  |
| Build Tool | Vite         | 최신 | TypeScript + SWC |
| Language   | TypeScript   | 5+   | strict mode      |
| Styling    | Tailwind CSS | 3+   | utility-first    |

### 상태 관리

| 분류            | 기술                         | 용도                     |
| --------------- | ---------------------------- | ------------------------ |
| 서버 상태       | TanStack Query (React Query) | API 캐싱, 로딩/에러 처리 |
| 클라이언트 상태 | Zustand                      | 전역 UI 상태             |

### 라우팅 & 통신

| 분류            | 기술            |
| --------------- | --------------- |
| 라우팅          | React Router v6 |
| HTTP 클라이언트 | Axios           |

### 폼 & 검증

| 분류        | 기술            |
| ----------- | --------------- |
| 폼 관리     | React Hook Form |
| 스키마 검증 | Zod             |

### 테스트

| 분류        | 기술       |
| ----------- | ---------- |
| 단위 테스트 | Vitest     |
| E2E 테스트  | Playwright |

### 패키지 매니저

- **pnpm** (npm, yarn 사용 금지)

### 디자인 시스템

- **폰트**: Pretendard
- **디자인 툴**: Figma

---

## 폴더 구조

```
src/
├── app/                    # 앱 진입점, 전역 설정
│   ├── App.tsx
│   ├── router.tsx
│   └── providers.tsx
│
├── features/               # 기능 단위 모듈 (핵심 구조)
│   ├── home/
│   │   ├── components/     # UI 컴포넌트
│   │   │   ├── HeroBanner.tsx
│   │   │   └── ReviewCard.tsx
│   │   ├── hooks/          # 커스텀 훅
│   │   │   └── useHomeData.ts
│   │   ├── types/          # feature 전용 타입
│   │   │   └── home.types.ts
│   │   └── index.ts        # public API (named export)
│   │
│   ├── review/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.ts
│
├── shared/                 # 기능 간 공유 코드
│   ├── components/         # 공용 컴포넌트
│   │   ├── ui/             # 기본 UI 요소 (Button, Input, Modal 등)
│   │   └── layout/         # 레이아웃 컴포넌트
│   ├── hooks/              # 공용 훅
│   ├── utils/              # 유틸리티 함수
│   └── constants/          # 상수
│
├── types/                  # 전역 타입
│   ├── api/                # API 응답/요청 타입
│   │   ├── review.ts
│   │   └── user.ts
│   └── index.ts
│
├── services/               # API 호출 레이어
│   ├── reviewService.ts
│   └── authService.ts
│
└── styles/                 # 전역 스타일
    └── globals.css
```

---

## TypeScript 규칙

### type vs interface

```typescript
// ✅ type: 유니온, 교차, 유틸리티 타입, API 응답
type ReviewStatus = 'draft' | 'published' | 'deleted';
type ReviewCardProps = Pick<Review, 'id' | 'title' | 'rating'>;

// ✅ interface: 확장 가능한 객체 구조, 컴포넌트 Props
interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
  onEdit?: (id: string) => void;
}
```

### 유틸리티 타입 활용

```typescript
// API 응답에서 필요한 필드만 추출
type ReviewSummary = Pick<Review, 'id' | 'title' | 'rating'>;

// 선택적 필드 처리
type ReviewUpdatePayload = Partial<Omit<Review, 'id' | 'createdAt'>>;
```

### 타입 파일 위치 규칙

- feature 전용 타입 → `features/{feature}/types/{feature}.types.ts`
- API 타입 → `src/types/api/{resource}.ts`
- 컴포넌트 props → 컴포넌트 파일 내 또는 같은 폴더 `.types.ts`

---

## 코딩 컨벤션

### 컴포넌트 작성 규칙

```typescript
// ✅ 화살표 함수 + named export (default export 금지)
export const ReviewCard = ({ review, onEdit }: ReviewCardProps) => {
  return (
    <article className="..." aria-label={`${review.title} 리뷰`}>
      {/* ... */}
    </article>
  );
};

// ❌ 금지
export default function ReviewCard() {}
```

### 파일명 규칙

- 컴포넌트: `PascalCase.tsx` (예: `ReviewCard.tsx`)
- 훅: `camelCase.ts`, `use` 접두사 (예: `useReviewList.ts`)
- 타입: `camelCase.types.ts` (예: `review.types.ts`)
- 유틸: `camelCase.ts` (예: `formatDate.ts`)
- 상수: `SCREAMING_SNAKE_CASE` 변수명

### Import 순서

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. 외부 라이브러리
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 3. 내부 - features
import { ReviewCard } from '@/features/review';

// 4. 내부 - shared
import { Button } from '@/shared/components/ui';

// 5. 타입
import type { Review } from '@/types/api/review';

// 6. 스타일 (거의 없음, Tailwind 사용)
```

### Tailwind 규칙

```typescript
// ✅ 클래스 순서: layout → spacing → size → typography → color → state
<div className="flex flex-col gap-4 px-4 py-6 w-full text-sm text-gray-700 bg-white hover:bg-gray-50">

// ✅ 긴 클래스는 cn() 유틸 사용 (clsx + tailwind-merge)
import { cn } from '@/shared/utils/cn';

<div className={cn(
  'flex flex-col gap-4',
  isActive && 'bg-blue-50',
  className
)}>
```

---

## 접근성 (Accessibility) 규칙

```typescript
// ✅ 시맨틱 HTML 태그 우선
<article>   // 리뷰 카드
<section>   // 페이지 섹션
<nav>       // 내비게이션
<ul> / <li> // 목록

// ✅ ARIA 레이블
<button aria-label="리뷰 삭제">
<nav aria-label="주요 내비게이션">
<section aria-labelledby="section-title">

// ✅ 이미지 alt 필수
<img src={...} alt="사용자 프로필 이미지" />

// ❌ div 남용 금지
<div onClick={...}>  // → <button> 사용
```

---

## API / TanStack Query 패턴

```typescript
// services/reviewService.ts
export const reviewService = {
  getList: async (params: ReviewListParams): Promise<ReviewListResponse> => {
    const { data } = await axios.get('/reviews', { params });
    return data;
  },
};

// hooks/useReviewList.ts
export const useReviewList = (params: ReviewListParams) => {
  return useQuery({
    queryKey: ['reviews', params],
    queryFn: () => reviewService.getList(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};
```

---

## Git 컨벤션

### 브랜치명

```
type/issue-number-description
예) feat/12-review-card-component
    fix/34-image-loading-error
    refactor/56-home-folder-structure
```

### 커밋 메시지 (한국어)

```
feat: 리뷰 카드 컴포넌트 구현
fix: 이미지 로딩 오류 수정
refactor: home 폴더 구조 개선
chore: 의존성 업데이트
```

### PR 규칙

- 이슈 번호 연결 필수
- 스크린샷 또는 영상 첨부 (UI 변경 시)
- 셀프 리뷰 후 요청

---

## Figma → React 변환 시 주의사항

1. **Figma 레이어명을 컴포넌트명으로 활용** — Figma에서 레이어명을 의미있게 지을 것
2. **Pretendard 폰트** — `font-family: 'Pretendard', sans-serif` 전역 적용됨
3. **픽셀 → Tailwind 변환표**:
   - `4px` → `gap-1`, `8px` → `gap-2`, `12px` → `gap-3`, `16px` → `gap-4`
   - `24px` → `gap-6`, `32px` → `gap-8`, `48px` → `gap-12`
4. **Figma Auto Layout** → `flex` / `flex-col`으로 1:1 매핑
5. **디자인 토큰** — Figma 컬러 변수 → Tailwind config 커스텀 색상

---

## 코드 생성 시 Claude에게

이 파일을 읽었다면:

- 우선 타입 인터페이스와 컴포넌트를 단위별로 분리해서 설계를 어떻게 할건지 답변해줘.

나의답변을 듣고 아래 답변을 시작해:

- 모든 컴포넌트는 **named export + 화살표 함수**로 작성
- **pnpm** 명령어 사용
- **Tailwind CSS**로만 스타일링 (style 속성 금지)
- **시맨틱 HTML + ARIA** 기본 적용
- feature 구조에 맞는 **폴더 위치 제안** 포함
- TypeScript **strict 모드** 준수
- 생성한 코드 아래에 **어느 파일에 위치할지** 명시
