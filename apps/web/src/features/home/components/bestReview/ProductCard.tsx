import Star16Icon from '@/shared/icons/Star16Icon.svg?react';

// 임시
const imgProduct =
  'https://www.figma.com/api/mcp/asset/91dd6a94-e9c4-480c-8452-3d916c193bb2';

export const ProductCard = () => {
  return (
    <div className="border-grey03 relative flex w-full items-center overflow-hidden border bg-white p-5">
      <div className="absolute top-1/2 right-[-1px] h-[204px] w-[179px] -translate-y-1/2">
        <img
          src={imgProduct}
          alt="상품 이미지"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Text content */}
      <div className="body2-m relative flex flex-col gap-1 text-black">
        <p>토리든토리든토리든토리든토리든토리든토리든토리든</p>
        <p className="tracking-[-0.014px]">[스킨푸드] 캐롯 카로팅 카밍...</p>
        <p className="text-[14px] leading-[1.5] font-medium tracking-[-0.014px] text-[#17171b]">
          10,000원
        </p>
        <div className="flex items-center gap-1">
          {/* 별점 */}
          <div className="flex items-center">
            <Star16Icon className="text-grey07" />
            <span>4.9</span>
          </div>
          <span>(1,123)</span>
        </div>
      </div>
    </div>
  );
};
