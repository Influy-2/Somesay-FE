import { WishCreatorItem } from './WishCreatorItem';

import type { WishCreatorType } from '@somesay/shared';

interface WishCreatorListProps {
  creators: WishCreatorType[];
  onHeartToggle: (creator: WishCreatorType) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export const WishCreatorList = ({
  creators,
  onHeartToggle,
  isLoading,
  isError,
  onRetry,
}: WishCreatorListProps) => {
  // TODO: WishCreatorListSkeleton으로 교체
  if (isLoading) {
    return (
      <p role="status" className="body2-m text-grey06 px-4 py-16 text-center">
        크리에이터를 불러오는 중이에요.
      </p>
    );
  }

  // 다음 페이지 실패는 WishLoadMore가 안내하므로, 목록이 비었을 때만 여기서 막습니다.
  if (isError && creators.length === 0) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 px-4 py-16 text-center"
      >
        <p className="body2-m text-grey06">
          크리에이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
        <button
          type="button"
          className="body2-sb border-grey03 border px-4 py-2 text-black"
          onClick={onRetry}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <p className="body2-m text-grey06 px-4 py-16 text-center">
        찜한 크리에이터가 없어요.
      </p>
    );
  }

  return (
    <ul aria-label="크리에이터 목록" className="flex flex-col gap-12">
      {creators.map((creator) => (
        <li key={creator.creatorId}>
          <WishCreatorItem creator={creator} onHeartToggle={onHeartToggle} />
        </li>
      ))}
    </ul>
  );
};
