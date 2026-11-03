import type { WishCreatorType } from '@somesay/shared';

import { useApiInfiniteQuery, type ApiInfiniteData } from '@/shared/api';

type WishCreatorsData = ApiInfiniteData<'/api/v1/users/wishes/creators'>;

interface UseFetchWishCreatorsOptions {
  size?: number;
}

// 찜 목록에 있다는 것 자체가 찜 상태라 기본값은 true 입니다.
// 목록 안에서 찜을 풀면 useCreatorWish 가 캐시 항목에 isWished 를 직접 써 두므로 그 값을 우선합니다.
const withWishState = (data: WishCreatorsData) => ({
  ...data,
  pages: data.pages.map((page) => ({
    ...page,
    content: page.content.map(
      (creator): WishCreatorType => ({
        ...creator,
        isWished:
          'isWished' in creator && typeof creator.isWished === 'boolean'
            ? creator.isWished
            : true,
      })
    ),
  })),
});

// 찜한 크리에이터를 무한 스크롤 페이지 단위로 조회합니다. pages[].content: WishCreatorType[]
export const useFetchWishCreators = ({
  size = 10,
}: UseFetchWishCreatorsOptions = {}) =>
  useApiInfiniteQuery(
    '/api/v1/users/wishes/creators',
    { params: { query: { size } } },
    {
      select: withWishState,
      // 전역 기본값과 달리 목록 안에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
      throwOnError: false,
    }
  );
