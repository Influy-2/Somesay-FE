// 연령대 표기 통일 함수 (예: "20" → "20대", "20대" → "20대")
// 서버가 '20'과 '20대'를 모두 보낼 수 있어 표시 직전이 아닌 매핑 단계에서 한 번만 정규화합니다.
export const formatAgeGroup = (ageGroup: string): string => {
  const trimmedAgeGroup = ageGroup.trim();

  if (!trimmedAgeGroup) return '연령 정보 없음';

  return trimmedAgeGroup.endsWith('대')
    ? trimmedAgeGroup
    : `${trimmedAgeGroup}대`;
};
