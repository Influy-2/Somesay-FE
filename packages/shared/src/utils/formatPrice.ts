export const formatPrice = (price: number | null) =>
  price ? price.toLocaleString('ko-KR') + '원' : '가격 정보 없음';
