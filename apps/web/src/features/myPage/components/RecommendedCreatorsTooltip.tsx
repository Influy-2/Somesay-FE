import { useState } from 'react';

import { Tooltip } from '@/shared/components';

// 노출 여부를 이 컴포넌트가 들고 있어, 툴팁을 닫아도 마이페이지 본문은 리렌더되지 않습니다.
export const RecommendedCreatorsTooltip = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Tooltip
      label="리뷰를 많이 평가할 수록 추천이 정확해져요!"
      isVisible={isVisible}
      variant="withClose"
      onClose={() => setIsVisible(false)}
      className="-top-12 left-4"
      arrowPosition="top"
      arrowClassName="left-6"
    />
  );
};
