// 구독자수 변환 함수 (예: 30000 → "30만", 15000 → "1.5만")
export const formatSubscriberCount = (count: number): string => {
  if (count >= 10000) {
    const v = count / 10000;
    return Number.isInteger(v) ? `${v}만` : `${v.toFixed(1)}만`;
  } else if (count >= 1000) {
    const v = (count / 1000).toFixed(0);
    return `${v}천`;
  } else {
    return count.toLocaleString();
  }
};
