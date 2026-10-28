import { useState } from 'react';
import {
  CTAButton,
  FloatingButtonScrollToTop,
  Tooltip,
} from '@/shared/components';

interface ProductReviewCtaBarProps {
  onReviewEvaluationClick: () => void;
}

// 툴팁 노출 여부를 이 바가 들고 있어, 툴팁을 닫아도 상세 본문은 리렌더되지 않습니다.
export const ProductReviewCtaBar = ({
  onReviewEvaluationClick,
}: ProductReviewCtaBarProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  return (
    <div className="border-grey02 z-toast fixed bottom-0 left-1/2 w-full max-w-110 -translate-x-1/2 border bg-white px-4 pt-2 pb-7.5">
      <FloatingButtonScrollToTop className="z-toast absolute right-4 bottom-[calc(100%+12px)]" />
      <Tooltip
        label={`이 상품을 사용해봤다면,\n크리에이터들의 리뷰를 평가해보세요`}
        isVisible={isTooltipVisible}
        variant="withClose"
        onClose={() => setIsTooltipVisible(false)}
        className="bottom-full left-4 mb-2"
        arrowPosition="top"
        arrowClassName="left-4"
      />
      <CTAButton
        label="이 상품 리뷰 평가하기"
        onClick={onReviewEvaluationClick}
      />
    </div>
  );
};
