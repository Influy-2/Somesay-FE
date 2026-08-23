import { useMemo, useState } from 'react';

import { useAuthGuard } from '@/features/auth';
import { flattenRankingPages } from '@/features/ranking/ranking.utils';
import {
  HorizontalCategoriesTab,
  MoreButton,
  ProductRankingCard,
} from '@/shared/components';
import {
  useFetchCategories,
  useFetchProductsRanking,
  useProductWish,
} from '@/shared/hooks';
import { ProductRankingSkeleton } from './ProductRankingSkeleton';
import { RankingFeedback } from './RankingFeedback';

// 전체는 30위, 카테고리 필터 시 10위까지만 노출합니다(기획 2.1.1).
const PAGE_SIZE = 10;
const ALL_CATEGORY_ID = 0;
const ALL_RANKING_LIMIT = 30;
const FILTERED_PRODUCT_RANKING_LIMIT = 10;

export const ProductRankingsSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORY_ID);
  const { data: categoryGroups = [] } = useFetchCategories();
  const isAllCategory = selectedCategoryId === ALL_CATEGORY_ID;
  const productLimit = isAllCategory
    ? ALL_RANKING_LIMIT
    : FILTERED_PRODUCT_RANKING_LIMIT;

  // 서버 카테고리 앞에 '전체' 필터를 합성합니다.
  const categories = useMemo(
    () => [
      { id: ALL_CATEGORY_ID, label: '전체' },
      ...categoryGroups.map(({ mainCategoryId, mainCategoryName }) => ({
        id: mainCategoryId,
        label: mainCategoryName,
      })),
    ],
    [categoryGroups]
  );

  const query = useFetchProductsRanking({
    size: PAGE_SIZE,
    ...(isAllCategory ? {} : { mainCategoryId: selectedCategoryId }),
  });
  const products = flattenRankingPages(query.data?.pages, productLimit);
  const canLoadMore = products.length < productLimit && query.hasNextPage;

  // 더보기는 로그인 사용자에게만 허용합니다(기획).
  const { toggleWish } = useProductWish();
  const guardAction = useAuthGuard();
  const loadMore = guardAction(() => {
    if (!canLoadMore || query.isFetchingNextPage) return;
    void query.fetchNextPage();
  });

  const renderProducts = () => {
    if (query.isPending) return <ProductRankingSkeleton />;

    if (query.isError && products.length === 0) {
      return (
        <RankingFeedback
          message="상품 랭킹을 불러오지 못했어요."
          onRetry={() => void query.refetch()}
        />
      );
    }

    if (products.length === 0) {
      return <RankingFeedback message="해당 카테고리의 상품 랭킹이 없어요." />;
    }

    return (
      <div className="flex flex-col gap-6">
        <ol className="grid grid-cols-2 gap-y-6">
          {products.map((product, index) => (
            <li key={product.productId} className="min-w-0 list-none">
              <ProductRankingCard
                {...product}
                ranking={index + 1}
                onHeartToggle={() =>
                  toggleWish({
                    productId: product.productId,
                    isHearted: product.isHearted,
                  })
                }
              />
            </li>
          ))}
        </ol>

        {/* 다음 페이지 오류에는 재시도, 정상 상태에는 더보기를 표시합니다. */}
        {query.isFetchNextPageError ? (
          <div className="px-4">
            <RankingFeedback
              message="상품 랭킹을 더 불러오지 못했어요."
              onRetry={loadMore}
            />
          </div>
        ) : (
          canLoadMore && (
            <div className="px-4">
              <MoreButton
                text={
                  query.isFetchingNextPage
                    ? '상품 랭킹을 불러오는 중'
                    : '상품 랭킹 더보기'
                }
                onClick={loadMore}
                disabled={query.isFetchingNextPage}
              />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <section aria-label="상품 랭킹">
      <div className="px-4 py-5">
        <HorizontalCategoriesTab
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          ariaLabel="상품 랭킹 카테고리"
        />
      </div>

      {renderProducts()}
    </section>
  );
};
