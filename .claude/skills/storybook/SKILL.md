---
name: storybook
description: Somesay 공용 컴포넌트의 Storybook 스토리를 작성하거나 개선할 때 사용한다. "스토리 써줘", "스토리북 만들어줘", 새 shared 컴포넌트를 만든 직후에 해당한다. 스토리 규격은 apps/web/CLAUDE.md에 있고 이 문서는 절차와 값 결정 기준을 다룬다.
---

# 스토리 작성 워크플로우

대상은 `shared/components/`뿐이다. feature 컴포넌트·페이지는 스토리를 만들지 않는다.
`title`·`tags`·default export 규격은 `apps/web/CLAUDE.md` §Storybook·테스트를 따른다.

## 1. 컴포넌트 분석

1. 대상 파일을 읽는다. 이름만 받았으면 `apps/web/src/shared/components/**/{이름}.tsx`로 찾는다.
2. Props 타입을 따라간다 — `@somesay/shared`면 `packages/shared/src/domain/{도메인}/`, 같은 폴더면 `*.types.ts`.
3. 이미 `.stories.tsx`가 있으면 읽고 **개선점만** 제안한다. 통째로 다시 쓰지 않는다.

확인할 것 — Props의 필수/선택 · 유니온 값 목록 · 함수 Props(상태 토글 여부) · `w-full`/`fixed`/`createPortal` 사용(데코레이터 판단) · 접근성 속성(`aria-*`, `role`)

## 2. 계획 제시 → 승인 대기

```
## 스토리 계획
- 파일: apps/web/src/shared/components/{폴더}/{이름}.stories.tsx
- title: Shared/{폴더 PascalCase}/{이름}
- 스토리 목록: Default / (상태별)
- render 함수 필요 여부와 이유
- decorator 필요 여부와 이유
- play 함수 필요 여부
- 확인 필요: (Props 의미가 불명확하면 여기서 질문)
```

승인 전에 파일을 만들지 않는다.

## 3. 스토리 케이스 도출

Props에서 기계적으로 뽑는다.

| Props 상황            | 추가할 스토리                                                |
| --------------------- | ------------------------------------------------------------ |
| boolean 토글          | `Default`(false) + 켜진 상태 (`Hearted` `Active` `Selected`) |
| 문자열 유니온         | 값마다 하나 (`Agree` `Disagree`)                             |
| optional prop         | 없는 경우 (`WithoutBrand`)                                   |
| 배열·리스트           | `Empty`                                                      |
| 길어질 수 있는 텍스트 | `LongText`                                                   |
| 포맷이 바뀌는 숫자    | `LargeNumber` (1240 → 1.2천 등)                              |
| `disabled`            | `Disabled`                                                   |

## 4. 기본값 (`args`)

도메인 값을 쓴다. `foo` `test` 같은 값을 쓰지 않는다 — Chromatic 스냅샷이 실제 화면과 달라진다.

| Props                         | 기본값                                                     |
| ----------------------------- | ---------------------------------------------------------- |
| 라벨·텍스트                   | `'샘플 텍스트'`                                            |
| 브랜드명                      | `'이니스프리'`                                             |
| 닉네임·이름                   | `'글로우픽'`                                               |
| 상품명                        | 실제 상품처럼 긴 이름 (`'캐롯 카로팅 카밍 워터 패드 50p'`) |
| 가격                          | `38000`                                                    |
| 평점                          | `4.5`                                                      |
| 순위                          | `1`                                                        |
| 개수(리뷰·구독자)             | `1240`                                                     |
| `isOpen` `isActive` `visible` | `true`                                                     |
| `isHearted` `disabled`        | `false`                                                    |
| 함수                          | `() => {}`                                                 |
| `ReactNode`                   | `'내용'`                                                   |

**이미지는 `@/assets/`의 mock 파일을 쓴다** — `mock_product_img.png` `mock_product_2.png` `mock_profile_img.svg` `mock_profile2_img.png` `mock_profile3_img.png` `mock_creator.png` `recommended_product_card_img.png`

`argTypes`는 컨트롤이 자동 추론되지 않을 때만 쓴다. 유니온은 `{ control: 'select', options: [...] }`, 함수와 `ReactNode`는 넣지 않는다.

## 5. 상태 토글은 `render`로

`isHearted`처럼 클릭으로 값이 바뀌어야 하면 `args`만으로는 정지 화면이 된다.

```tsx
export const Default: Story = {
  render: (args) => {
    const [isHearted, setIsHearted] = useState(false);

    return (
      <HeartButton
        {...args}
        isHearted={isHearted}
        onClick={() => setIsHearted((prev) => !prev)}
      />
    );
  },
};
```

## 6. 데코레이터

공통 래핑(MemoryRouter, 모바일 폭)은 `.storybook/preview.tsx`가 이미 한다. **중복해서 감싸지 않는다.**

| 상황                                          | 처리                                           |
| --------------------------------------------- | ---------------------------------------------- |
| `w-full` 컴포넌트                             | 그대로 둔다                                    |
| `fixed` · `createPortal` (모달·바텀시트·헤더) | `parameters: { layout: 'fullscreen' }`         |
| 배경색이 있어야 보이는 컴포넌트               | 그 스토리에만 decorator                        |
| `react-router`의 `Link`·`useNavigate`         | 전역 MemoryRouter가 처리한다. `to`는 `'/path'` |

## 7. play 함수 — 상호작용이 결과를 바꿀 때만

`storybook` vitest 프로젝트에서 실제로 실행된다. 열림/닫힘, 선택, 토글처럼 **한 번 조작해야 나타나는 상태**에 쓴다. 단순 표시 컴포넌트에는 쓰지 않는다.

```tsx
export const Opened: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /정렬 옵션/ }));
  },
};
```

셀렉터는 `getByRole` + 접근 가능한 이름을 쓴다. `getByTestId`를 쓰게 된다면 **컴포넌트의 접근성이 부족하다는 신호**다 — 스토리를 고치기 전에 컴포넌트를 고칠지 먼저 묻는다.

## 8. 마무리

```bash
pnpm --filter web type-check
```

- [ ] `title`이 폴더명과 일치하는가
- [ ] `tags: ['autodocs']`가 있는가
- [ ] 상태별 스토리를 빠뜨리지 않았는가
- [ ] 기본값이 도메인 값인가
- [ ] preview와 중복되는 decorator를 넣지 않았는가
- [ ] type-check 통과 (못 돌렸으면 이유를 말한다)

작성 후에는 파일 경로 · 만든 스토리 목록 · **임의로 정한 mock 값** · 확인이 필요한 점을 보고한다.
