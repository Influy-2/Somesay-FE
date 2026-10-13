import type { GenderType } from '@somesay/shared';

// 서버 gender enum의 한글 표기입니다.
// Record<GenderType, _>라 enum에 값이 늘면 라벨 누락을 컴파일러가 잡습니다.
export const GENDER_LABELS: Record<GenderType, string> = {
  MALE: '남성',
  FEMALE: '여성',
  NONE: '해당없음',
};
