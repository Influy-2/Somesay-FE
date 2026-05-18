import type {
  GenderOption,
  AgeOption,
  UserSkinTypeOption,
  UserSkinConcernOption,
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
  { value: 4, label: '수부지' },
  { value: 5, label: '민감성' },
  { value: 6, label: '여드름성' },
];

export const USER_SKIN_CONCERN_OPTIONS: UserSkinConcernOption[] = [
  { value: 1, label: '보습' },
  { value: 2, label: '속건조' },
  { value: 3, label: '진정' },
  { value: 4, label: '여드름' },
  { value: 5, label: '붉은기' },
  { value: 6, label: '미백/잡티' },
  { value: 7, label: '주름/탄력' },
  { value: 8, label: '모공' },
  { value: 9, label: '피부결' },
  { value: 10, label: '각질' },
  { value: 11, label: '피부장벽' },
  { value: 12, label: '흔적' },
];
