import useEmblaCarousel from 'embla-carousel-react';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useState } from 'react';

const INACTIVE_SLIDE_SCALE = 0.72;
const ACTIVE_SLIDE_SCALE = 1;

const numberWithinRange = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

interface UseProductCarouselOptions {
  onSelectedIndexChange?: ((index: number) => void) | undefined;
}

export const useProductCarousel = ({
  onSelectedIndexChange,
}: UseProductCarouselOptions = {}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    containScroll: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideProgresses, setSlideProgresses] = useState<number[]>([]);

  // Embla의 현재 스냅을 외부 상세 영역과 공유한다.
  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const nextIndex = emblaApi.selectedScrollSnap();

    setSelectedIndex(nextIndex);
    onSelectedIndexChange?.(nextIndex);
  }, [emblaApi, onSelectedIndexChange]);

  // 인접 스냅 간 거리를 기준으로 각 슬라이드 진행률을 정규화한다.
  const updateSlideProgresses = useCallback(() => {
    if (!emblaApi) return;

    const scrollProgress = emblaApi.scrollProgress();
    const scrollSnaps = emblaApi.scrollSnapList();

    setSlideProgresses(
      scrollSnaps.map((scrollSnap, index) => {
        const previousSnap = scrollSnaps[index - 1];
        const nextSnap = scrollSnaps[index + 1];
        const previousSnapDistance =
          previousSnap !== undefined
            ? Math.abs(scrollSnap - previousSnap)
            : undefined;
        const nextSnapDistance =
          nextSnap !== undefined ? Math.abs(nextSnap - scrollSnap) : undefined;
        const snapDistance =
          Math.min(
            previousSnapDistance ?? Number.POSITIVE_INFINITY,
            nextSnapDistance ?? Number.POSITIVE_INFINITY
          ) || 1;
        const distanceToSlide = Math.abs(scrollSnap - scrollProgress);

        return numberWithinRange(1 - distanceToSlide / snapDistance, 0, 1);
      })
    );
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi
      .on('select', onSelect)
      .on('select', updateSlideProgresses)
      .on('reInit', onSelect)
      .on('reInit', updateSlideProgresses)
      .on('scroll', updateSlideProgresses);

    return () => {
      emblaApi
        .off('select', onSelect)
        .off('select', updateSlideProgresses)
        .off('reInit', onSelect)
        .off('reInit', updateSlideProgresses)
        .off('scroll', updateSlideProgresses);
    };
  }, [emblaApi, onSelect, updateSlideProgresses]);

  const getSlideState = useCallback(
    (index: number) => {
      const isSelected = index === selectedIndex;
      const isPrevious = index === selectedIndex - 1;
      const isNext = index === selectedIndex + 1;
      const slideProgress = slideProgresses[index] ?? (isSelected ? 1 : 0);
      const scale =
        INACTIVE_SLIDE_SCALE +
        (ACTIVE_SLIDE_SCALE - INACTIVE_SLIDE_SCALE) * slideProgress;
      const dimOpacity = 1 - slideProgress;

      return {
        isSelected,
        isPrevious,
        isNext,
        slideStyle: {
          zIndex: Math.round(slideProgress * 10) + 1,
        } satisfies CSSProperties,
        slideClassName: [
          'product-carousel__slide',
          isSelected
            ? 'product-carousel__slide--selected'
            : 'product-carousel__slide--inactive',
          isPrevious ? 'product-carousel__slide--previous' : '',
          isNext ? 'product-carousel__slide--next' : '',
        ]
          .filter(Boolean)
          .join(' '),
        // Embla가 측정하는 슬라이드 크기는 유지하고 내부 카드만 확대한다.
        innerStyle: {
          transform: `scale(${scale})`,
        } satisfies CSSProperties,
        innerClassName: [
          'product-carousel__slide-inner',
          isSelected
            ? 'product-carousel__slide-inner--selected'
            : 'product-carousel__slide-inner--inactive',
        ]
          .filter(Boolean)
          .join(' '),
        dimStyle: {
          opacity: dimOpacity,
        } satisfies CSSProperties,
      };
    },
    [selectedIndex, slideProgresses]
  );

  return {
    emblaRef,
    selectedIndex,
    getSlideState,
  };
};
