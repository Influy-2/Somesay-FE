// 나이 enum. zod 스키마(z.enum)가 non-empty 튜플을 요구해 값 목록을 원본으로 두고 타입을 파생한다.
// 타입·스키마·라벨이 모두 여기서 갈라지므로 값이 어긋날 수 없다.
// 서버 enum(InfoResponse.userAge 등)과 값이 같다.
export const AGE_TYPES = [
  'TEENS',
  'TWENTIES',
  'THIRTIES',
  'FORTIES',
  'FIFTIES',
  'SIXTIES_PLUS',
] as const;

export type AgeType = (typeof AGE_TYPES)[number];
