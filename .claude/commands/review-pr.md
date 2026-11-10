# PR 코드 리뷰

현재 브랜치에서 `develop` 대비 변경된 파일을 전부 읽고 리뷰한다.
10년차 시니어 프론트엔드 개발자로서, 틀린 건 틀렸다고 명확히 말한다.

## 절차

1. `git diff develop...HEAD --name-only`로 변경 파일 목록 확인
2. 변경 파일 전부 읽기 (주변 맥락이 필요하면 관련 파일도)
3. 아래 기준으로 평가
4. 심각도별로 분류해 출력

## 심각도

- 🔴 **Must Fix** — 머지 블로커. 버그, 규약 위반, 접근성 직결
- 🟡 **Should Fix** — 품질·유지보수성·일관성
- 🟢 **Nice to Fix** — 개선 권고

각 항목에 `파일명:줄번호`를 밝힌다.

---

## 1. 규약 위반

세부 규칙은 `CLAUDE.md` · `apps/web/CLAUDE.md` · `packages/shared/CLAUDE.md`에 있다. **읽고 대조한다.**
특히 자주 어긋나는 지점:

- **서버 계약을 손으로 썼는가** — 경로·응답 타입은 스펙에서 추론된다. 엔드포인트 상수·DTO·매퍼·쿼리키 상수를 새로 만들지 않는다. 필드명은 서버와 같아야 하고, nullable 필드를 `!`·`as`로 지우지 않는다
- **`shared/`로 성급히 올렸는가** — 공용화 지시를 받았거나 3번째 사용처일 때만. 2곳이면 복제
- **barrel 우회 import** — `@/features/x/components/Y` 금지
- **임의값** — 허용되는 건 계산식 · 외부 브랜드색 · `max-w-[40rem]` 셋뿐. Figma 실측 px과 하드코딩 hex는 지적
- **`export default`** — Storybook `meta` 외에는 금지
- **`style` 속성** — 런타임 계산값 외에는 금지
- **`throwOnError`** — 화면 안에서 안내 가능한 조회인데 에러 바운더리로 던지는가
- **전역과 같은 `staleTime` 재지정** — 무의미하다
- **공용 컴포넌트를 추가했는데 스토리가 없는가**

## 2. 시맨틱 HTML

**페이지의 heading 트리를 그려서** 계층을 확인한다.

- `h1` → `h2` → `h3` 건너뛰지 않는가. `h1`이 페이지 고유 주제인가 (모든 페이지에서 같은 텍스트면 의심)
- `section` — 반드시 내부에 heading을 가진다. 없으면 `div`나 `figure`
- `article` — 자기완결적 콘텐츠 (리뷰 카드, 상품 카드)
- `figure` — 이미지 단독 영역 (`section` 남용 금지)
- `ol` — **순위가 있는 목록은 `ul`이 아니라 `ol`** (랭킹 리스트)
- `ul`/`li` — `div role="list"` 대신 시맨틱 태그
- `dl`/`dt`/`dd` — key-value 쌍 (가격/용량, 신뢰도)
- `main` — 페이지 메인 콘텐츠에 반드시
- `button` vs `a` — 동작이면 `button`, 이동이면 `a`/`Link`
- 외부 링크는 `target="_blank" rel="noopener noreferrer"`

## 3. 접근성

- `button`에 `type="button"`
- 아이콘만 있는 버튼에 `aria-label` 필수
- `aria-pressed` — 토글 버튼
- `aria-expanded` + `aria-controls` — 접기/펼치기. **`aria-controls`의 ID가 페이지 내 유일한지 확인.** 리스트로 반복 렌더링하면 `${id}-${itemId}` 패턴이 필요하다
- `role="switch"` + `aria-checked` — OnOff 토글
- `role="progressbar"` + `aria-valuenow`/`min`/`max`
- `label htmlFor`와 `id`가 실제로 연결됐는지
- `aria-hidden="true"` — 장식용 이미지·아이콘
- **중복 낭독** — `aria-label`과 동일한 텍스트가 함께 있는가
- 스켈레톤에 `role="status"` + `aria-busy` + 한국어 `aria-label`

## 4. 컴포넌트 설계

- **단일 책임** — 하나가 API 호출 + 상태 + 렌더링을 다 하는가
- **Props** — 8개를 넘는가. 도메인 타입에서 파생하지 않고 익명 객체로 모양을 다시 선언했는가
- **이름이 내용과 맞는가**
  - 단수/복수 (단일 아이템인데 복수형 이름)
  - UI 용어 — Hero = 이미지 포함 상단 주인공 영역 / Banner = 광고·알림 / Cover = 이미지 위주
- **페이지가 두꺼운가** — 페이지는 URL 파싱 · 조립 · 레이아웃만. 상태·쿼리가 쌓이면 feature 훅으로
- **feature barrel** — 외부에서 안 쓰는 내부 구현까지 공개했는가. mock 상수가 public API에 섞였는가

## 5. 상태

- 서버 데이터를 `useState`/Zustand로 복사했는가
- 파생 가능한 값을 state로 들고 있는가
- 목록 화면의 필터·정렬이 URL에 있는가 (`useSearchParams`)
- 토글 state가 있는데 렌더링에 반영되지 않는가
- props drilling이 3단계를 넘는가

## 6. 클린 코드

- **매직 넘버** — 의미를 알 수 없는 숫자는 상수로. 특히 **실험 대상 값**(개수 제한·노출 순서·타이밍)
- **네이밍** — boolean은 `is`/`has`/`can` 접두사. 이름과 동작이 다른 경우 지적 (예: `isEvaluated = value > 0`인데 0이 유효값이면 버그)
- **`console.log` 잔류**, `alert()` 사용
- **TODO 주석** — 이슈 번호 없는 TODO는 지적
- **개발용 임시 주석** (`/* 1. 섹션명 */`) 제거
- **DRY** — 같은 패턴이 3곳에서 반복되면 추상화 검토 (2곳이면 두는 게 낫다)
- **Dead code** — 안 쓰는 변수·import·함수

## 7. 성능

- 리스트 `key`가 index가 아닌 고유 ID인가
- 무한 스크롤 쿼리를 `invalidateQueries`로 갱신하는가 (페이지 경계가 흔들린다 — 국소 패치를 쓴다)
- 빈번히 리렌더되는 컴포넌트에 인라인 객체·함수가 매번 생성되는가
- 과도한 `memo`/`useCallback`이 아닌가

## 8. mock 데이터 (미연동 화면)

- ID 중복 (같은 `key`가 여러 개면 렌더링 오작동)
- 존재하지 않는 경로·placeholder URL
- mock으로 state를 초기화해 실제 API 연결 시 구조가 깨지지 않는가

---

## 출력 형식

````
## 🔴 Must Fix
### [파일명:줄번호] 제목
문제 설명
```tsx
// 현재 코드 → 수정 코드
````

## 🟡 Should Fix

## 🟢 Nice to Fix

## ✅ 잘 된 점

## 요약

| 구분 | 건수 |
| ---- | ---- |

```

**잘 된 점을 반드시 포함한다.** 지적만 하는 리뷰는 불완전하다.
확신이 없는 지적은 "확인 필요"로 분리해서, 추측을 단정으로 말하지 않는다.
```
