import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchCreatorWish, QUERY_KEYS } from '@somesay/shared';

import { useAuthGuard } from '../auth/useAuthGuard';
import { useSnackbarStore } from '@/shared/stores';

import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import type { WishCreatorPageType } from '@somesay/shared';

interface ToggleCreatorWishParams {
  creatorId: number;
  /** 토글하기 전의 현재 찜 상태 */
  isHearted: boolean;
}

// 찜 크리에이터 목록 캐시에서 한 명의 찜 상태와 찜 수만 바꿉니다.
// 바뀐 게 없으면 원본 참조를 돌려 리렌더를 막습니다.
// 상태가 다를 때만 찜 수를 증감하므로 onSuccess에서 같은 값을 다시 써도 이중 증감되지 않습니다.
// 무한 쿼리는 invalidate하면 페이지 경계가 흔들려 해당 항목만 고칩니다.
const setCreatorWishInCache = (
  queryClient: QueryClient,
  creatorId: number,
  isHearted: boolean
) => {
  queryClient.setQueriesData<InfiniteData<WishCreatorPageType>>(
    { queryKey: QUERY_KEYS.USER.WISH_CREATORS_ALL() },
    (data) => {
      if (!data) return data;

      let changed = false;
      const pages = data.pages.map((page) => {
        let pageChanged = false;
        const content = page.content.map((creator) => {
          if (
            creator.creatorId !== creatorId ||
            creator.isHearted === isHearted
          )
            return creator;

          pageChanged = true;
          return {
            ...creator,
            isHearted,
            wishCount: creator.wishCount + (isHearted ? 1 : -1),
          };
        });

        if (!pageChanged) return page;
        changed = true;
        return { ...page, content };
      });

      return changed ? { ...data, pages } : data;
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
    mutationFn: ({ creatorId, isHearted }: ToggleCreatorWishParams) =>
      patchCreatorWish(creatorId, isHearted ? 'NONE' : 'LIKE'),
    onMutate: async ({ creatorId, isHearted }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.USER.WISH_CREATORS_ALL(),
      });
      setCreatorWishInCache(queryClient, creatorId, !isHearted);
    },
    onError: (_error, { creatorId, isHearted }) => {
      // 바뀐 값이 boolean 하나뿐이라 스냅샷 없이 이전 값을 다시 써서 되돌립니다.
      setCreatorWishInCache(queryClient, creatorId, isHearted);
      showSnackbar('크리에이터 찜 상태를 변경하지 못했어요.', {
        variant: 'error',
      });
    },
    onSuccess: ({ creatorId, isHearted }) => {
      setCreatorWishInCache(queryClient, creatorId, isHearted);
    },
  });

  const toggleWish = guardAction((params: ToggleCreatorWishParams) =>
    mutate(params)
  );

  return { toggleWish };
};
