# 5. 문제 해결

## 마우스를 올려도 아무것도 안 떠요

1. **레포의 TypeScript를 쓰고 있는지** 확인합니다.
   `.tsx` 파일을 연 상태에서 VS Code 오른쪽 아래 상태 표시줄의 TypeScript 버전을 클릭합니다.
   `Use Workspace Version`이 선택되어 있어야 합니다 → [처음 한 번 설정](./03-editor.md#처음-한-번-설정)
2. `pnpm install`을 했는지 확인합니다. 플러그인이 `node_modules/@somesay/ts-feature-plugin`에 연결되어 있어야 합니다.
3. 명령 팔레트 → **TypeScript: Restart TS Server**를 실행합니다.
4. 그래도 안 되면 명령 팔레트 → **TypeScript: Open TS Server log**에서 `somesay-feature`를 검색합니다.

| 로그                                          | 뜻 / 해결                                                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `[somesay-feature] 플러그인을 켰습니다.`      | 정상입니다. 마우스를 정확히 문자열 위에 올렸는지 확인하세요                                                                    |
| `Couldn't find @somesay/ts-feature-plugin`    | 플러그인을 찾지 못했습니다. 루트에서 `pnpm install`을 다시 실행하세요                                                          |
| `기능 목록을 읽지 못했습니다`                 | `packages/shared/features/features.json`이 없거나 JSON이 깨졌습니다. [목록을 다시 갱신](./04-workflow.md#기능-목록-갱신)하세요 |
| `featuresPath 설정이 없어 플러그인을 끕니다.` | `apps/web/tsconfig.json`의 `plugins` 설정이 빠졌습니다                                                                         |
| `somesay-feature` 줄이 아예 없음              | VS Code 내장 TypeScript를 쓰고 있습니다. 1번을 확인하세요                                                                      |

## `Type '"3.3.1"' is not assignable to type …` 에러가 나요

표시 번호를 썼기 때문입니다. 그 줄에서 **Cmd + .** 를 누르면 기능 ID로 바꿀 수 있습니다 → [표시 번호를 기능 ID로 바꾸기](./03-editor.md#표시-번호를-기능-id로-바꾸기)

수정안이 나오지 않는다면 다음 중 하나입니다.

- 중분류·대분류 번호(`3.3`, `3`)입니다. 소분류(`3.3.1`)만 달 수 있습니다.
- 레포 목록에 없는 번호입니다. 팀웹에서 번호가 바뀌었을 수 있으니 [목록을 갱신](./04-workflow.md#기능-목록-갱신)하세요.

## `Type '"F-0023"' is not assignable to type …` 에러가 나요

- 중분류·대분류 기능 ID입니다. 마우스를 올려 단계를 확인하고 소분류 ID를 다세요.
- 또는 목록에서 삭제된 기능입니다. 기획에 확인한 뒤 표식을 지우거나 새 기능 ID로 바꾸세요.

## 목록을 갱신했더니 타입 에러가 여러 개 생겼어요

삭제된 기능을 쓰던 곳입니다. 에러가 난 곳은 다음 중 하나로 정리하세요.

- 기능이 다른 ID로 옮겨졌다면 → 새 ID로 바꿉니다
- 기능이 사라졌다면 → 표식을 지웁니다

## 영향 계산 결과에 이전 PR 변경까지 나와요

기준 브랜치가 오래됐습니다. `git fetch` 후 `origin/develop`을 기준으로 실행하세요.

```bash
git fetch
node apps/web/scripts/feature-impact.mjs origin/develop
```

## 분명히 바꿨는데 `possible`로 나와요

바뀐 곳이 여러 기능에 걸쳐 있다는 뜻입니다. 결과의 `evidence`에서 파일과 줄을 확인하세요.

- 기능 여럿을 단 범위(`data-feature={['F-0017', 'F-0019']}`) 안이라면 → 기능별 요소로 나눠 달 수 있는지 검토하세요
- `shared/` 컴포넌트를 바꿨다면 → 그 컴포넌트를 쓰는 모든 기능이 후보가 되는 것이 정상입니다

## 어떤 기능에도 안 잡혀요 (`unattributed`)

- barrel(`index.ts`), 타입 선언, 공용 설정 파일은 원래 기능이 없습니다
- 화면 요소에 표식이 빠졌을 수 있습니다 → [2. 코드에 표식 달기](./02-marking.md)
