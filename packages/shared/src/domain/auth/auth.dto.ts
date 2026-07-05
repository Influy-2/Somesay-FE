export type AuthGenderDto = 'MALE' | 'FEMALE' | 'NONE';

export type AuthAgeDto =
  | 'TEENS'
  | 'TWENTIES'
  | 'THIRTIES'
  | 'FORTIES'
  | 'FIFTIES'
  | 'SIXTIES_PLUS';

// 회원가입 후 저장할 기본 정보입니다.
export interface LoginInfoRequestDto {
  nickname: string;
  gender: AuthGenderDto;
  age: AuthAgeDto;
  concerns: string[];
  skinTypeNames: string[];
}

// 저장된 회원 기본 정보 응답 데이터입니다.
export interface LoginInfoResponseDto {
  userId: number;
  nickname: string;
  gender: AuthGenderDto;
  age: AuthAgeDto;
  concerns: string[];
  skinTypeNames: string[];
}
