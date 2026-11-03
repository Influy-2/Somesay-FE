import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';

import { apiKey, fetchClient, unwrapApiData, type ApiData } from '@/shared/api';
import { useAuthGuard } from '../auth/useAuthGuard';
import { useSnackbarStore } from '@/shared/stores';

interface ToggleCreatorWishParams {
  creatorId: number;
  /** 토글하기 전의 현재 찜 상태 */
  isWished: boolean;
}

type WishCreatorsPage = ApiData<'/api/v1/users/wishes/creators'>;
type WishCreatorItem = WishCreatorsPage['content'][number] & {
  isWished?: boolean;
};

// 캐시에는 응답 래퍼({ code, message, data })째 페이지마다 저장됩니다.
type WishCreatorsCache = InfiniteData<{ data: WishCreatorsPage }>;

const WISH_CREATORS_KEY = apiKey('/api/v1/users/wishes/creators');

// 찜 크리에이터 목록 캐시에서 한 명의 찜 상태와 찜 수만 바꿉니다.
// 응답에 찜 여부가 없어 isWished 를 캐시 항목에 직접 써 두고, 조회 훅의 select 가 이 값을 우선합니다.
// 바뀐 게 없으면 원본 참조를 돌려 리렌더를 막습니다.
// 상태가 다를 때만 찜 수를 증감하므로 onSuccess에서 같은 값을 다시 써도 이중 증감되지 않습니다.
// 무한 쿼리는 invalidate하면 페이지 경계가 흔들려 해당 항목만 고칩니다.
const setCreatorWishInCache = (
  queryClient: QueryClient,
  creatorId: number,
  isWished: boolean
) => {
  queryClient.setQueriesData<WishCreatorsCache>(
    { queryKey: WISH_CREATORS_KEY },
    (cache) => {
      if (!cache) return cache;

      let changed = false;
      const pages = cache.pages.map((page) => {
        let pageChanged = false;
        const content = page.data.content.map((creator: WishCreatorItem) => {
          // 목록에 있으면 찜 상태이므로 아직 토글한 적 없는 항목은 true 로 봅니다.
          const currentIsWished = creator.isWished ?? true;
          if (creator.creatorId !== creatorId || currentIsWished === isWished)
            return creator;

          pageChanged = true;
          return {
            ...creator,
            isWished,
            creatorWishCount: creator.creatorWishCount + (isWished ? 1 : -1),
          };
        });

        if (!pageChanged) return page;
        changed = true;
        return { ...page, data: { ...page.data, content } };
      });

      return changed ? { ...cache, pages } : cache;
    }
  );
};

/**
 * 크리에이터 찜 상태를 토글합니다.
 *
 * 현재는 찜 크리에이터 목록 캐시만 갱신합니다.
 * 크리에이터홈은 아직 mock이라 연결되어 있지 않습니다.
 * 비로그인 상태에서는 요청 없이 로그인 안내만 노출합니다.
 */
export const useCreatorWish = () => {
  const queryClient = useQueryClient();
  const guardAction = useAuthGuard();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const { mutate } = useMutation({
    // 같은 크리에이터를 연타해도 요청이 직렬로 처리돼 응답 순서가 뒤집히지 않습니다.
    scope: { id: 'creator-wish' },
    mutationFn: ({ creatorId, isWished }: ToggleCreatorWishParams) =>
      unwrapApiData(
        fetchClient.PATCH('/api/v1/creators/{creatorId}/wish', {
          params: { path: { creatorId } },
          body: { wishStatus: isWished ? 'NONE' : 'LIKE' },
        })
      ),
    onMutate: async ({ creatorId, isWished }) => {
      await queryClient.cancelQueries({ queryKey: WISH_CREATORS_KEY });
      setCreatorWishInCache(queryClient, creatorId, !isWished);
    },
    onError: (_error, { creatorId, isWished }) => {
      // 바뀐 값이 boolean 하나뿐이라 스냅샷 없이 이전 값을 다시 써서 되돌립니다.
      setCreatorWishInCache(queryClient, creatorId, isWished);
      showSnackbar('크리에이터 찜 상태를 변경하지 못했어요.', {
        variant: 'error',
      });
    },
    onSuccess: ({ creatorId, wishStatus }) => {
      setCreatorWishInCache(queryClient, creatorId, wishStatus === 'LIKE');
    },
  });

  const toggleWish = guardAction((params: ToggleCreatorWishParams) =>
    mutate(params)
  );

  return { toggleWish };
};
