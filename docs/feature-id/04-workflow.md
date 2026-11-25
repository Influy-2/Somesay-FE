# 4. 기능 목록 갱신과 PR 작성

## 기능 목록 갱신

기획이 팀웹에서 기능을 추가·삭제하거나 순서를 바꾸면 레포의 복사본(`packages/shared/features/features.json`)도 갱신합니다.

### 방법

1. 팀웹에서 기능 목록 JSON을 복사합니다. `[{"id":"F-0001","display_no":"1","title":"홈"}, …]` 형태입니다.
2. 레포 루트에서 실행합니다.
   ```bash
   pbpaste | pnpm --filter @somesay/shared features:update
   ```
   SSH로 받아 오는 경우에도 같은 명령으로 넘기면 됩니다.
   ```bash
   ssh <팀웹 서버> '<목록 출력 명령>' | pnpm --filter @somesay/shared features:update
   ```
3. 성공하면 다음처럼 나옵니다.
   ```
   저장 완료: 205건 → features/features.json
   생성 완료: 기능 205건 (소분류 142건) → src/features/generated/features.ts
   ```
4. `pnpm type-check`를 실행합니다. 삭제된 기능을 쓰는 곳이 타입 에러로 드러납니다. 그 표식을 정리하세요.
5. 바뀐 두 파일(`features.json`, `features.ts`)을 커밋합니다. PR diff에 어떤 기능이 바뀌었는지 그대로 드러납니다.

### 알아 둘 것

- 입력이 잘못되면 **아무 파일도 바꾸지 않고** 멈춥니다. ID 형식, 번호 형식, 빈 제목, 중복을 검사합니다.
  ```
  기능 목록을 저장하지 않았습니다: 0번째 항목의 id(F-1)가 F-0000 형식이 아닙니다.
  ```
- 에디터의 마우스 올려 보기는 2초 안에 새 목록을 반영합니다. TS 서버를 다시 켤 필요가 없습니다.
- 생성된 `features.ts`는 직접 고치지 마세요. 다음 갱신 때 덮어써집니다.
- 기능 ID는 바뀌지 않으므로, 순서만 바뀐 경우에는 코드를 고칠 필요가 없습니다.

## PR 작성할 때 건드린 기능 확인

이 브랜치의 변경이 어떤 기능에 닿는지 계산합니다. `write-pr` 스킬도 이 결과를 씁니다.

```bash
git fetch
node apps/web/scripts/feature-impact.mjs origin/develop
```

- 기준 브랜치와 갈라진 지점부터 **지금 작업 트리까지** 비교합니다. 커밋하지 않은 변경도 포함됩니다.
- 로컬 `develop`이 오래됐으면 이전 PR 변경까지 잡히므로 `origin/develop`을 쓰세요.

### 결과 읽기

결과는 JSON으로 나옵니다. 주요 부분은 다음과 같습니다.

```json
{
  "features": [
    {
      "id": "F-0009",
      "displayNo": "1.3.1",
      "title": "상품 랭킹 ( 평점이 가장 좋은 제품 랭킹 )",
      "status": "changed",
      "evidence": [
        {
          "file": "apps/web/src/features/home/…/ProductRankingSection.tsx",
          "lines": ["20-31"]
        }
      ]
    }
  ],
  "unattributed": [
    {
      "file": "apps/web/src/shared/components/index.ts",
      "reason": "no-feature",
      "lines": ["5-7"]
    }
  ],
  "ignored": ["apps/web/src/shared/components/tab/TabBar.stories.tsx"]
}
```

| 항목                 | 뜻                                                                  | 할 일                                                                          |
| -------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `status: "changed"`  | 그 기능 하나에만 해당하는 변경이 있습니다                           | PR에 그 기능을 적고, 완료 단계(done·screen)를 판단합니다                       |
| `status: "possible"` | 여러 기능이 같이 쓰는 코드, 또는 기능 여럿을 단 범위만 바뀌었습니다 | 자동으로 완료 처리하지 않습니다. 정말 그 기능을 바꿨는지 직접 판단합니다       |
| `evidence`           | 그렇게 판단한 파일과 줄                                             | 결과가 이상하면 여기부터 봅니다                                                |
| `unattributed`       | 어느 기능에도 닿지 않은 변경                                        | barrel(`index.ts`), 공용 설정, 삭제된 파일 등입니다. 대부분 그대로 두면 됩니다 |
| `ignored`            | 테스트·스토리 파일                                                  | 화면 동작과 무관하므로 계산에서 뺐습니다                                       |

### 판정 방식

1. 바뀐 줄이 `data-feature` 범위 안이면, 가장 안쪽 범위의 기능입니다.
2. 범위 밖이면, 그 파일을 **실제로 쓰는 곳**을 거슬러 올라가 닿는 기능을 모읍니다.
   예를 들어 `ProductRankingCard`(shared)를 고치면, 그 카드를 쓰는 랭킹 목록들이 모두 후보가 됩니다.
3. 같은 함수 안에 표식이 있으면 그 기능들도 포함합니다. 예를 들어 페이지 최상단의 훅 호출을 바꾸면 그 페이지의 기능들이 후보가 됩니다.
4. 후보가 정확히 하나면 `changed`, 여럿이면 `possible`입니다.
5. 주석이나 공백만 바뀐 줄은 세지 않습니다.

### PR 본문에 적는 법

표시 번호와 제목을 쓰고, 기능 ID는 괄호에 넣습니다. 팀웹 진행 주석에는 표시 번호만 씁니다.

```markdown
- 1.3.1 상품 랭킹 ( 평점이 가장 좋은 제품 랭킹 ) (F-0009) — done

<!-- team-web: 1.3.1:done -->
```
