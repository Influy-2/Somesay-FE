import { useEffect, useRef } from 'react';

import cn from '@/utils/cn';
import { RecommendedCreatorProfile } from '@/shared/components';
import type { RecommendedCreator } from './mock';

/**
 * 프로필 줄의 레이아웃 값. 아래 className(`w-15`, `gap-3`)과 반드시 같이 움직여야 합니다.
 *
 * 폭이 전환 중이라 DOM에서 최종 위치를 읽을 수 없어(offsetLeft가 애니메이션 시작값을 돌려줍니다)
 * 스크롤 목표를 직접 계산합니다. 활성 앞쪽은 언제나 전부 접힌 상태라 계산이 성립합니다.
 */
const COLLAPSED_PROFILE_PX = 60; // w-15
const PROFILE_GAP_PX = 12; // gap-3

interface RecommendedCreatorProfileRowProps {
  creators: RecommendedCreator[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

// 한 번 눌러 고르고, 활성 상태에서 다시 누르면 크리에이터 홈으로 들어갑니다.
export const RecommendedCreatorProfileRow = ({
  creators,
  selectedIndex,
  onSelect,
}: RecommendedCreatorProfileRowProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  // 활성 크리에이터가 항상 줄 맨 왼쪽에 오고, 지나간 프로필은 왼쪽 밖으로 흘러나갑니다.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    list.scrollTo({
      left: selectedIndex * (COLLAPSED_PROFILE_PX + PROFILE_GAP_PX),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [selectedIndex]);

  return (
    <ul
      ref={listRef}
      className="scrollbar-hide flex items-center gap-3 overflow-x-auto px-4"
    >
      {creators.map((creator, index) => {
        const isActive = index === selectedIndex;

        return (
          <li
            key={creator.creatorId}
            className={cn(
              'relative shrink-0 overflow-hidden',
              'transition-[width] duration-300 ease-out motion-reduce:transition-none',
              isActive ? 'w-48.5' : 'w-15'
            )}
          >
            {/* 프로필은 늘 같은 것이 그려지고, li가 좁아지며 이름·칩을 가립니다.
                DOM을 갈아끼우지 않아야 넓어지고 좁아지는 게 이어져 보입니다. */}
            <div
              className={cn(
                'w-48.5 transition-opacity duration-300 ease-out motion-reduce:transition-none',
                isActive ? 'opacity-100' : 'opacity-50'
              )}
              inert={!isActive}
            >
              <RecommendedCreatorProfile
                creatorId={creator.creatorId}
                name={creator.name}
                profileImageUrl={creator.profileImageUrl}
                age={creator.age}
                skinType={creator.skinType}
              />
            </div>

            {/* 비활성일 때는 크리에이터 홈 링크 대신 이 버튼이 눌립니다. */}
            {!isActive && (
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`${creator.name} 리뷰 보기`}
                className="absolute inset-0"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
