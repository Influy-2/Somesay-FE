// 홈 카테고리별 상품 목록이 비어 있을 때 보여주는 임시 컴포넌트입니다.
export const CategoryProductEmptyState = () => {
  return (
    <div
      role="status"
      className="flex min-h-50 w-full flex-col items-center justify-center gap-2 py-8 text-center"
    >
      <p className="body2-sb text-grey08">상품이 없어요.</p>
      <p className="body2-m text-grey05">다른 카테고리를 확인해 주세요.</p>
    </div>
  );
};
