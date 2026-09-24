import categoryDaisoBanner from '@/assets/banner_category_daiso.svg';
import { PATH } from '@/routes/path';

/**
 * 카테고리 상단 배너.
 * 운영하며 자주 바뀌고 BE 배너 API가 없어, 교체는 이 값과 이미지 파일만 바꿔 배포한다.
 * 문구가 이미지에 박혀 있으니 alt에 배너 문구를 그대로 적는다.
 */
export const CATEGORY_BANNER = {
  imageSrc: categoryDaisoBanner,
  alt: 'somesay에서 요즘 뜨는 다이소템을 구경해 보세요',
  to: `${PATH.CATEGORIES.BASE}/${PATH.CATEGORIES.DAISO}`,
};
