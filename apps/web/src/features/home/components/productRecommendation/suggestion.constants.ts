// 홈 히어로에서 순환 노출되는 추천 조합입니다.
// 사용자가 필터를 건드리기 전까지 "이런 조건으로도 찾아볼 수 있어요"를 보여주는 예시이며,
// 실제 선택값이 아니라서 이 상태로는 추천 요청을 보내지 않습니다.
// 카테고리는 id가 아니라 이름으로 두고 카테고리 API 응답에서 실제 id를 찾습니다.
// (하드코딩한 id는 백엔드 카테고리가 바뀌면 조용히 어긋납니다)
export interface RotatingSuggestionType {
  skinConcern: string[];
  skinType: string[];
  subCategoryName: string;
}

export const ROTATING_SUGGESTIONS: RotatingSuggestionType[] = [
  {
    skinConcern: ['보습', '속건조'],
    skinType: ['건성'],
    subCategoryName: '크림',
  },
  {
    skinConcern: ['진정', '붉은기'],
    skinType: ['민감성'],
    subCategoryName: '스킨/토너',
  },
  {
    skinConcern: ['모공', '피부결'],
    skinType: ['지성'],
    subCategoryName: '클렌징 오일',
  },
  {
    skinConcern: ['미백/잡티'],
    skinType: ['복합성'],
    subCategoryName: '에센스/앰플/세럼',
  },
  {
    skinConcern: ['주름/탄력'],
    skinType: ['중성'],
    subCategoryName: '스킨/토너 패드',
  },
  {
    skinConcern: ['각질', '피부장벽'],
    skinType: ['수부지'],
    subCategoryName: '선크림',
  },
  {
    skinConcern: ['여드름', '흔적'],
    skinType: ['여드름성'],
    subCategoryName: '클렌징 폼',
  },
];

export const SUGGESTION_ROTATION_MS = 2000;
