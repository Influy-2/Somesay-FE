---
name: figma-to-component
description: Figma 디자인을 Somesay React 컴포넌트로 구현할 때 사용한다. figma.com 링크를 받았거나 "이 디자인 구현해줘", "피그마 보고 만들어줘"에 해당한다. 디자인을 읽고 계획을 승인받은 뒤 프로젝트 규약에 맞게 변환한다.
---

# Figma → 컴포넌트 구현

컴포넌트·스타일·접근성 규칙은 `apps/web/CLAUDE.md`를 따른다. 이 문서는 **변환 절차와 Figma 고유 판단**만 다룬다.

## 1. 디자인 읽기

`get_design_context`로 읽는다. URL에서 fileKey와 nodeId를 파싱한다 (nodeId의 `-`는 `:`로 변환).

함께 보면 좋은 것:

- `get_screenshot` — 레이아웃을 눈으로 확인. 코드 출력만으로는 겹침·정렬을 알 수 없다.
- `get_variable_defs` — 디자인 변수명을 확인해 `global.css` 토큰과 맞춘다.

**`.claude/docs/features.md`에서 해당 화면번호(`1.2.1` 체계)를 찾아 읽는다.** 디자인에 안 보이는 조건·제약(선택 개수 제한, 비활성 조건)이 거기 있다.

## 2. 계획 제시 → 승인 대기

```
## 구현 계획
- 컴포넌트 트리: (신규/재사용 표시)
- 재사용할 기존 컴포넌트: (없으면 "없음")
- 파일 위치: features/{f}/... 또는 shared/components/{그룹}/...
- 타입: 도메인 타입에서 파생하는지, 새로 만드는지
- 토큰 매핑: 디자인 값 → 토큰 (안 떨어지는 값이 있으면 여기 질문)
- 미확인 사항: 디자인에 없는 상태(로딩·빈 상태·에러), 불명확한 인터랙션
```

승인 전에 파일을 만들지 않는다.

## 3. 재사용 먼저 확인

**만들기 전에 `shared/components/index.ts`를 읽는다.** 자주 놓치는 것들:

| 필요한 것 | 이미 있는 것                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------------- |
| 바텀시트  | `BottomSheet` — portal · `role="dialog"` · ESC 닫기 · 드래그까지 구현돼 있다. **직접 만들지 않는다** |
| 모달      | `Modal`                                                                                              |
| 상품 카드 | `BasicProductCard` `ProductRankingCard` `HomeProductRankingCard` `SearchResultProductCard` 등        |
| 칩        | `ChipBasic` `ChipLarge` `ChipAgreement`                                                              |
| 입력      | `InputField` `TextArea` `CharacterCountInput` `EmailInput`                                           |
| 로딩      | `LoadingBlock` (스켈레톤 원자)                                                                       |
| 탭        | `TabBar` `TabItem` `FilterGroupTab` `HorizontalCategoriesTab`                                        |

디자인이 살짝 다르다는 이유로 비슷한 컴포넌트를 새로 만들지 않는다. 기존 것에 variant를 더할지 먼저 묻는다.

## 4. 변환 규칙

| Figma                     | 코드                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Auto Layout               | `flex` / `flex-col`                                                                                    |
| 간격 4·8·12·16·24·32·48px | `gap-1` `2` `3` `4` `6` `8` `12`                                                                       |
| 텍스트 스타일             | 커스텀 타이포 클래스 (`body1-sb` `caption1-m` …)                                                       |
| 컬러 변수                 | `global.css` 컬러 토큰                                                                                 |
| 아이콘                    | `@/shared/icons` **barrel에서 named import** (`import { ArrowBackIcon } from '@/shared/icons'`)        |
| 겹침 순서                 | z-index 토큰 (`z-header` `z-dropdown` `z-overlay` `z-modal` `z-toast`). `z-50` 같은 숫자를 쓰지 않는다 |

- 폰트는 `Pretendard`가 전역 적용돼 있다. 따로 지정하지 않는다.
- **실측 px를 그대로 옮기지 않는다.** `23px`는 `w-[1.4375rem]`이 아니라 `w-6`이다.
- 토큰·스케일로 떨어지지 않는 값은 **묻는다.** 임의로 `text-[#1F2129]` 같은 값을 만들지 않는다.

## 5. 디자인에 없는 것을 채운다

Figma에는 보통 성공 상태만 있다. 아래를 계획 단계에서 확인한다.

- **로딩** — 목록·카드면 `{대상}Skeleton.tsx`가 필요한가
- **빈 상태** — `{대상}EmptyState.tsx`
- **긴 텍스트** — 상품명·닉네임이 넘칠 때 줄임 처리
- **비활성** — 버튼이 언제 `disabled`인가 (`features.md`에 조건이 있는 경우가 많다)

디자인에 없으면 임의로 만들지 말고 **무엇이 필요한지 짚어서 묻는다.**

## 6. 마무리

```bash
pnpm --filter web type-check
```

- [ ] 기존 컴포넌트를 재사용했는가 (새로 만든 이유를 말할 수 있는가)
- [ ] 컬러·타이포가 전부 토큰인가
- [ ] 시맨틱 태그와 `aria-*`를 적용했는가, 클릭 요소가 `<button type="button">`인가
- [ ] barrel에 등록했는가 (`shared/components/index.ts` 또는 `features/{f}/index.ts`)
- [ ] `shared/components/`에 추가했다면 **스토리도 만들어야 한다** (`storybook` 스킬)
- [ ] type-check 통과

보고할 때 **디자인에서 추정하거나 임의로 결정한 부분**을 반드시 명시한다.
