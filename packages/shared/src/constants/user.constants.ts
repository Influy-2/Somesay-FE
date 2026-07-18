import type {
  GenderOption,
  AgeOption,
  UserSkinTypeOption,
  UserSkinConcernOption,
  UserSkinExpectationOption,
} from '../types/user.types';

export const GENDER_OPTIONS: GenderOption[] = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
  { value: 'none', label: '해당없음' },
];

export const AGE_OPTIONS: AgeOption[] = [
  { value: '10', label: '10대' },
  { value: '20', label: '20대' },
  { value: '30', label: '30대' },
  { value: '40', label: '40대' },
  { value: '50', label: '50대' },
  { value: '60', label: '60대 이상' },
];

export const USER_SKIN_TYPE_OPTIONS: UserSkinTypeOption[] = [
  { value: 1, label: '건성' },
  { value: 2, label: '지성' },
  { value: 3, label: '복합성' },
  { value: 4, label: '중성' },
  { value: 5, label: '수부지' },
  { value: 6, label: '민감성' },
  { value: 7, label: '여드름성' },
  { value: 8, label: '모르겠음' },
];

export const USER_SKIN_EXPECTATION_OPTIONS: UserSkinExpectationOption[] = [
  { value: 1, concern: '보습', productEffect: '보습' },
  { value: 2, concern: '속건조', productEffect: '속건조 완화' },
  { value: 3, concern: '진정', productEffect: '진정' },
  { value: 4, concern: '여드름', productEffect: '여드름 관리' },
  { value: 5, concern: '붉은기', productEffect: '붉은기 개선' },
  { value: 6, concern: '미백/잡티', productEffect: '미백/잡티제거' },
  { value: 7, concern: '주름/탄력', productEffect: '탄력' },
  { value: 8, concern: '모공', productEffect: '모공 관리' },
  { value: 9, concern: '피부결', productEffect: '피부결 정리' },
  { value: 10, concern: '각질', productEffect: '각질 제거' },
  { value: 11, concern: '피부장벽', productEffect: '피부장벽 강화' },
  { value: 12, concern: '흔적', productEffect: '흔적 관리' },
];

// 기존 피부 고민 선택 UI가 같은 기준 데이터를 사용하도록 제공합니다.
export const USER_SKIN_CONCERN_OPTIONS: UserSkinConcernOption[] =
  USER_SKIN_EXPECTATION_OPTIONS.map(({ value, concern }) => ({
    value,
    label: concern,
  }));

// 아이디 가지고 한글 라벨 찾기
export const getSkinTypeLabel = (id: number) =>
  USER_SKIN_TYPE_OPTIONS.find(({ value }) => value === id)?.label;

export const getConcernLabel = (id: number) =>
  USER_SKIN_EXPECTATION_OPTIONS.find(({ value }) => value === id)?.concern;

export const getProductEffectLabel = (id: number) =>
  USER_SKIN_EXPECTATION_OPTIONS.find(({ value }) => value === id)
    ?.productEffect;
