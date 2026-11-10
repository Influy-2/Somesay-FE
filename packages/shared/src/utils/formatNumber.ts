/**
 * 별점·평균 평점을 화면에 보여줄 문자열로 바꿉니다.
 *
 * - 기본은 소수점 첫째 자리까지 표시합니다. (예: 4.567 → "4.6", 4 → "4.0")
 * - 자릿수가 다른 디자인(예: 썸네일의 "4.50")은 `fractionDigits` 로 지정합니다.
 * - 별점 표시 규칙이 바뀌면 이 함수만 고치면 되도록, 컴포넌트에서 `toFixed` 를 직접 부르지 않습니다.
 *
 * @param rating 평균 평점 (예: productAvgRating, brandAvgRating)
 * @param fractionDigits 소수점 아래 자릿수 (기본 1)
 */
export const formatRating = (rating: number, fractionDigits = 1): string =>
  rating.toFixed(fractionDigits);

/**
 * 개수(리뷰 수, 참여자 수, 좋아요 수 등)를 천 단위 쉼표가 들어간 문자열로 바꿉니다.
 *
 * - 예: 1234 → "1,234"
 * - 로케일을 'ko-KR' 로 고정해, 컴포넌트마다 `toLocaleString()` 인자가 달라지는 문제를 막습니다.
 * - "1.2만" 처럼 축약 표기가 필요하면 `formatSubscriberCount` 를 사용합니다.
 *
 * @param count 표시할 개수
 */
export const formatCount = (count: number): string =>
  count.toLocaleString('ko-KR');
