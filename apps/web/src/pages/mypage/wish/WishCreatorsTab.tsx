import {
  WishCreatorList,
  WishLoadMore,
  useWishCreators,
} from '@/features/myPage';

export const WishCreatorsTab = () => {
  const { count, listProps, loadMoreProps } = useWishCreators();

  return (
    <section aria-label="찜한 크리에이터" className="flex flex-col gap-5 pt-5">
      <p className="body2-m text-grey08 px-4" aria-live="polite">
        {count.toLocaleString()}명
      </p>
      <WishCreatorList {...listProps} />
      <WishLoadMore {...loadMoreProps} />
    </section>
  );
};
