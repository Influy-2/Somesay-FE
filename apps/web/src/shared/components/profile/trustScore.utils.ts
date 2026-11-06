/**
 * 신뢰도 점수를 정수 문구로 바꿉니다. 아직 산정되지 않은 새 크리에이터는 운영에서 null 이 와서
 * (타입은 non-null) `toFixed` 를 바로 부르면 런타임 에러가 납니다.
 */
export const formatTrustScore = (trustScore: number) =>
  // 타입상 불필요해 보여도 운영 null 방어라 지우지 않습니다.
  trustScore == null ? null : `${trustScore.toFixed(0)}점`;

/** 화면에 보이는 신뢰도 문구입니다. 값이 없으면 '-' 입니다. */
export const getTrustScoreText = (trustScore: number) =>
  formatTrustScore(trustScore) ?? '-';

/** 스크린 리더용 신뢰도 문구입니다. */
export const getTrustScoreLabel = (trustScore: number) => {
  const text = formatTrustScore(trustScore);
  return text ? `신뢰도 ${text}` : '신뢰도 정보 없음';
};
