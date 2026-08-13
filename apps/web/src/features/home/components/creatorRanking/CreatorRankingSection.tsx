import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { getRankingTabPath } from '@/features/ranking';
import {
  CreatorRankingUpDownRow,
  MoreButton,
  Tooltip,
} from '@/shared/components';
import { useFetchHomeCreatorRanking, useMySkinProfile } from '@/shared/hooks';
import { QuestionIcon } from '@/shared/icons';
import { CreatorRankingSectionSkeleton } from './CreatorRankingSectionSkeleton';

const CREATOR_RANKING_TOOLTIP_ID = 'creator-ranking-guide';
const CREATOR_RANKING_TOOLTIP_DURATION_MS = 5000;

export const CreatorRankingSection = () => {
  const { data: creatorRankingData, isPending } = useFetchHomeCreatorRanking();
  const { isMyCondition } = useMySkinProfile();
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
  const [tooltipArrowOffset, setTooltipArrowOffset] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isTooltipVisible) return;

    const timer = window.setTimeout(() => {
      setIsTooltipVisible(false);
    }, CREATOR_RANKING_TOOLTIP_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isTooltipVisible]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const helpButton = helpButtonRef.current;
    if (!header || !helpButton) return;
    let isActive = true;

    const updateArrowOffset = () => {
      if (!isActive) return;

      const headerBox = header.getBoundingClientRect();
      const buttonBox = helpButton.getBoundingClientRect();

      setTooltipArrowOffset(
        Math.round(buttonBox.left - headerBox.left + buttonBox.width / 2 - 6)
      );
    };

    updateArrowOffset();
    void document.fonts?.ready.then(updateArrowOffset);

    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(updateArrowOffset);
    if (observer && titleRef.current) observer.observe(titleRef.current);
    observer?.observe(helpButton);

    return () => {
      isActive = false;
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      aria-labelledby="creator-ranking-title"
      aria-busy={isPending}
      className="flex w-full flex-col items-center justify-center gap-5 px-4"
    >
      <div
        ref={headerRef}
        className="relative flex w-full items-center gap-1.5"
      >
        <h2 ref={titleRef} id="creator-ranking-title" className="headline4">
          크리에이터 신뢰도 랭킹
        </h2>
        <button
          ref={helpButtonRef}
          type="button"
          className="cursor-pointer"
          aria-label="크리에이터 신뢰도 랭킹 설명 보기"
          aria-expanded={isTooltipVisible}
          aria-controls={CREATOR_RANKING_TOOLTIP_ID}
          aria-describedby={
            isTooltipVisible ? CREATOR_RANKING_TOOLTIP_ID : undefined
          }
          onClick={() => setIsTooltipVisible(true)}
        >
          <QuestionIcon className="size-4" aria-hidden="true" />
        </button>
        <Tooltip
          id={CREATOR_RANKING_TOOLTIP_ID}
          label="이 크리에이터의 리뷰에 사용자들이 많이 공감했어요"
          isVisible={isTooltipVisible}
          variant="withClose"
          size="compact"
          onClose={() => setIsTooltipVisible(false)}
          className="bottom-full left-0 mb-1.5"
          arrowPosition="top"
          arrowOffset={tooltipArrowOffset}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        {isPending ? (
          <CreatorRankingSectionSkeleton />
        ) : (
          <ol className="flex flex-col items-start gap-6 self-stretch py-0">
            {creatorRankingData?.map((creator) => (
              <CreatorRankingUpDownRow
                {...creator}
                isMyCondition={isMyCondition}
                key={creator.creatorId}
              />
            ))}
          </ol>
        )}
        <MoreButton to={getRankingTabPath('creators')} text="순위 더보기" />
      </div>
    </section>
  );
};
