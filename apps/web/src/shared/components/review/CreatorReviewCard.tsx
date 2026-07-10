// Review/크리에이터 프로필 공개 컴포넌트
// 글 길어지면 스크롤 가능한 버전(하단 블러)
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { BasicCreatorProfile } from '@/shared/components';
import { Star16Icon } from '@/shared/icons';
import { BasicCreatorProfileType } from '@somesay/shared';

interface CreatorReviewCardProps {
  creator: BasicCreatorProfileType;
  rating: number;
  content: string;
  productName: string;
}

export const CreatorReviewCard = ({
  rating,
  content,
  productName,
  creator,
}: CreatorReviewCardProps) => {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [showOverflowIndicator, setShowOverflowIndicator] = useState(false);

  // 브라우저의 소수점 계산 오차를 고려해 1px 여유를 둔다.
  const updateOverflowIndicator = useCallback(() => {
    const contentContainer = contentContainerRef.current;

    if (!contentContainer) return;

    const hasMoreContent =
      contentContainer.scrollTop + contentContainer.clientHeight <
      contentContainer.scrollHeight - 1;

    setShowOverflowIndicator(hasMoreContent);
  }, []);

  // 카드 너비가 변할 때 오버플로 상태를 다시 계산한다.
  useLayoutEffect(() => {
    const contentContainer = contentContainerRef.current;

    if (!contentContainer) return;

    updateOverflowIndicator();

    if (typeof ResizeObserver === 'undefined') return;

    const resizeObserver = new ResizeObserver(updateOverflowIndicator);
    resizeObserver.observe(contentContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, [content, updateOverflowIndicator]);

  return (
    <article
      aria-label={`${creator.nickname}의 ${productName} 리뷰`}
      className="border-grey03 bg-grey01 flex w-full flex-col items-start gap-5 border border-solid p-5 px-4"
    >
      {/* 크리에이터 프로필 */}
      <BasicCreatorProfile {...creator} />
      <div
        className="flex w-full flex-col items-start gap-1"
        aria-label={`별점 ${rating}점. ${content}`}
      >
        {/* 리뷰 별점 */}
        <div className="flex items-center gap-1" aria-hidden="true">
          {/* TODO: 디자인 전달되는 대로 별 구현 */}
          <div className="flex items-center gap-px">
            <Star16Icon />
          </div>
          <span className="body2-sb text-[#1F2129]">{rating}</span>
        </div>

        {/* 스크롤 리뷰 내용 */}
        <div
          ref={contentContainerRef}
          onScroll={updateOverflowIndicator}
          className="scrollbar-hide relative max-h-[6.875rem] w-full overflow-y-auto"
        >
          <p aria-hidden="true" className="body2-m text-[#1F2129]">
            {content}
          </p>
          {/* 추가 내용 안내 */}
          {showOverflowIndicator && (
            <div className="from-grey01/0 to-grey01 pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-gradient-to-b" />
          )}
        </div>
      </div>
    </article>
  );
};
