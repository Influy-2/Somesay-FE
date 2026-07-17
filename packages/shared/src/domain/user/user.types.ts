// 성별 enum
export type GenderType = 'MALE' | 'FEMALE' | 'NONE';

// 나이 enum
export type AgeType =
  | 'TEENS'
  | 'TWENTIES'
  | 'THIRTIES'
  | 'FORTIES'
  | 'FIFTIES'
  | 'SIXTIES_PLUS';

export interface UserType {
  userId: number;
  profileImgUrl: string | null;
  nickname: string;
  gender: GenderType;
  age: AgeType;
  skinTypes: number[];
}
