import {
  useFetchProductDetail,
  useFetchProductReviewOverview,
  useFetchSimilarProducts,
  useProductWish,
} from '@/shared/hooks';

/**
 * 상품 상세 화면이 쓰는 조회 3종과 찜 토글을 한곳에서 다룹니다.
 *
 * 리뷰 요약·유사 상품은 본문이 없어도 화면이 성립하므로 로딩·에러를 따로 노출하지 않고,
 * 상품 본문 조회 상태만 화면 상태로 올립니다.
 */
export const useProductDetail = (productId?: number) => {
  const { toggleWish } = useProductWish();

  const {
    data: product,
    isLoading,
    isError,
  } = useFetchProductDetail(productId);
  const { data: reviewOverview } = useFetchProductReviewOverview(productId);
  const { data: similarProducts } = useFetchSimilarProducts(productId);

  const handleHeartToggle = () => {
    if (!product) {
      return;
    }

    toggleWish({
      productId: product.productId,
      isHearted: product.isHearted,
    });
  };

  return {
    product,
    reviewOverview,
    similarProducts: similarProducts ?? [],
    isLoading,
    // productId가 없으면 조회 자체를 하지 않으므로 에러 화면과 같게 묶습니다.
    hasError: productId === undefined || isError,
    onHeartToggle: handleHeartToggle,
  };
};
