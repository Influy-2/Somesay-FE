# Figma MCP 기반 프론트엔드 개발 워크플로우 가이드

> Somesay 프로젝트 전용 | React + TypeScript + Tailwind CSS

---

## 전체 시스템 구조

```
┌─────────────────────────────────────────────────────────┐
│                      Claude.ai                          │
│                                                         │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────┐  │
│  │  CLAUDE.md  │───▶│  Figma MCP   │───▶│  코드 생성 │  │
│  │ (프로젝트   │    │ (디자인 읽기) │    │  (규칙 반영│  │
│  │  컨텍스트)  │    └──────────────┘    └───────────┘  │
│  └─────────────┘           │                           │
│                            ▼                           │
│                    Figma 노드 데이터                    │
│                 (레이아웃, 색상, 폰트,                  │
│                  크기, 컴포넌트 구조)                   │
└─────────────────────────────────────────────────────────┘
```

---

## PART 1: 초기 셋업

### 1-1. Figma MCP 연결

1. claude.ai → 설정 → **연결된 앱** → Figma 추가
2. Figma 플러그인 설치: `Figma for Claude` (공식 플러그인)
3. 연결 후 Claude 대화에서 Figma 아이콘 확인

### 1-2. CLAUDE.md 프로젝트 루트에 배치

```bash
# 프로젝트 루트 (package.json과 같은 위치)
somesay/
├── CLAUDE.md          ← 여기에 위치
├── package.json
├── vite.config.ts
└── src/
```

### 1-3. Figma 레이어 명명 규칙 정립

Figma에서 레이어명을 잘 지어야 Claude가 컴포넌트명으로 바로 활용 가능:

```
✅ 좋은 레이어명                    ❌ 나쁜 레이어명
ReviewCard                         Frame 47
ReviewCard/Header                  Rectangle 12
ReviewCard/Rating                  Group 3
HomeScreen/HeroBanner             Frame 1 copy
```

---

## PART 2: 대화 시작 템플릿 (매 세션마다 사용)

### 기본 시작 프롬프트

```
CLAUDE.md 파일을 읽고 Somesay 프로젝트 컨텍스트를 파악해줘.

이번 작업:
- [작업 내용 설명]
- Figma 링크 또는 현재 선택된 노드: [링크]

CLAUDE.md의 폴더 구조, 타입 규칙, 코딩 컨벤션을 모두 적용해서 코드를 생성해줘.
생성 후에는 파일 위치도 알려줘.
```

---

## PART 3: Figma → React 변환 워크플로우

### Step 1. Figma에서 노드 선택

Figma에서 변환하고 싶은 컴포넌트/화면을 선택하고 Claude에 공유.

### Step 2. 컨텍스트 인식 변환 프롬프트

```
CLAUDE.md를 기준으로 다음 Figma 디자인을 React 컴포넌트로 변환해줘.

[Figma 링크 또는 선택된 노드]

요구사항:
1. features/home/components/ 에 위치할 컴포넌트야
2. props 인터페이스를 먼저 정의해줘
3. Tailwind CSS만 사용 (style 속성 금지)
4. 시맨틱 HTML + ARIA 레이블 적용
5. 백엔드 API 연동이 필요하면 useQuery 훅 패턴도 같이 작성해줘
```

### Step 3. Claude의 출력 예시

Claude가 생성하는 코드 구조:

```typescript
// 📁 위치: src/features/home/components/ReviewCard.tsx

import { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import type { ReviewSummary } from '@/types/api/review';

interface ReviewCardProps {
  review: ReviewSummary;
  onLike?: (id: string) => void;
  className?: string;
}

export const ReviewCard = ({ review, onLike, className }: ReviewCardProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(prev => !prev);
    onLike?.(review.id);
  };

  return (
    <article
      className={cn('flex flex-col gap-3 p-4 bg-white rounded-xl', className)}
      aria-label={`${review.title} 리뷰`}
    >
      <h3 className="text-base font-semibold text-gray-900">{review.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{review.content}</p>
      <button
        onClick={handleLike}
        aria-pressed={liked}
        aria-label="좋아요"
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
      >
        ♥ {review.likeCount}
      </button>
    </article>
  );
};
```

---

## PART 4: 작업 유형별 프롬프트 레시피

### 레시피 A: 새 컴포넌트 생성

```
CLAUDE.md 규칙 기반으로 [컴포넌트명] 컴포넌트를 만들어줘.

위치: features/[feature]/components/
Figma: [노드 선택 또는 링크]

포함할 것:
- Props 인터페이스 (interface 사용)
- Tailwind 스타일링
- 시맨틱 HTML
- ARIA 레이블
```

### 레시피 B: 페이지 + 데이터 패칭

```
CLAUDE.md 기준으로 [페이지명] 페이지를 만들어줘.

Figma 디자인: [노드]

아래 구조로 파일을 나눠줘:
1. features/[feature]/components/[페이지명]Page.tsx — 페이지 컴포넌트
2. features/[feature]/hooks/use[데이터명].ts — TanStack Query 훅
3. types/api/[resource].ts — API 타입 (없으면 생성)

백엔드 API: GET /api/[endpoint] (응답 구조는 내가 알려줄게)
```

### 레시피 C: Figma 디자인 토큰 → Tailwind 설정

```
현재 Figma 파일의 컬러 변수와 폰트 스타일을 읽어서
tailwind.config.ts의 theme.extend 설정을 작성해줘.

CLAUDE.md의 Pretendard 폰트 설정도 포함해줘.
```

### 레시피 D: 기존 컴포넌트 리팩토링

```
CLAUDE.md 규칙을 기준으로 아래 컴포넌트를 리팩토링해줘.

[코드 붙여넣기]

체크 항목:
- [ ] named export + 화살표 함수
- [ ] TypeScript strict 준수
- [ ] 시맨틱 HTML
- [ ] Tailwind 클래스 순서 정리
- [ ] 불필요한 style 속성 제거
```

### 레시피 E: 컴포넌트 단위 테스트

```
CLAUDE.md 기준으로 [컴포넌트명] 컴포넌트의 Vitest 테스트를 작성해줘.

위치: features/[feature]/components/__tests__/[컴포넌트명].test.tsx

테스트 케이스:
- 기본 렌더링
- Props 변형
- 사용자 인터랙션
- 접근성 (role, aria-label)
```

---

## PART 5: CLAUDE.md 유지보수

### 언제 업데이트하나?

| 상황                   | 업데이트 항목           |
| ---------------------- | ----------------------- |
| 새 라이브러리 추가     | 기술 스택 섹션          |
| 폴더 구조 변경         | 폴더 구조 섹션          |
| 새 코딩 컨벤션 합의    | 코딩 컨벤션 섹션        |
| 디자인 시스템 업데이트 | Figma 변환 주의사항     |
| API 패턴 변경          | API/TanStack Query 패턴 |

### 팀원과 동기화

```bash
# CLAUDE.md는 Git으로 관리
git add CLAUDE.md
git commit -m "docs: CLAUDE.md 컴포넌트 컨벤션 업데이트"
```

팀원도 동일한 CLAUDE.md를 사용하면 **Claude가 항상 같은 컨텍스트**로 코드를 생성함.

---

## PART 6: 고급 활용 — 멀티턴 개발 세션

### 복잡한 기능 개발 흐름

```
세션 1 (설계):
"CLAUDE.md 읽고, 리뷰 작성 기능 전체 구조를 features/ 기반으로 설계해줘.
Figma에서 전체 플로우: [링크]"

→ Claude가 파일 목록, 컴포넌트 트리, 타입 구조 제안

세션 2 (타입 정의):
"세션 1에서 설계한 대로 types/api/review.ts 먼저 작성해줘."

세션 3 (서비스 레이어):
"review.ts 타입 기반으로 services/reviewService.ts 작성해줘."

세션 4 (훅):
"reviewService 기반으로 features/review/hooks/ 훅들 작성해줘."

세션 5 (UI):
"Figma [노드] 기반으로 컴포넌트들 작성해줘. 이미 만든 훅 사용."
```

---

## PART 7: 자주 쓰는 프롬프트 단축 모음

```
# 파일 위치 확인
"이 컴포넌트는 CLAUDE.md 폴더 구조 기준으로 어디에 위치해야 해?"

# 타입 설계
"CLAUDE.md type/interface 규칙에 맞게 [데이터] 타입을 설계해줘."

# 리뷰 요청
"내가 작성한 이 코드가 CLAUDE.md 규칙을 잘 따르고 있는지 체크해줘."

# 접근성 감사
"이 컴포넌트의 접근성 이슈를 CLAUDE.md 기준으로 찾아줘."

# Figma 비교
"Figma [노드]와 내가 구현한 코드를 비교해서 누락된 부분 알려줘."
```

---

## 체크리스트: 매 컴포넌트 생성 후

```
Claude 생성 코드 검토:
□ named export + 화살표 함수 사용됨
□ props가 interface로 정의됨
□ Tailwind CSS만 사용 (style 속성 없음)
□ 시맨틱 HTML 태그 사용됨
□ ARIA 레이블 포함됨
□ TypeScript 오류 없음 (strict)
□ 파일 위치가 features/ 구조에 맞음
□ import 순서가 규칙에 맞음
```
