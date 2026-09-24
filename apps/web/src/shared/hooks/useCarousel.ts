import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

// embla-carousel-react는 옵션·플러그인 타입을 re-export하지 않고,
// 원본 embla-carousel 패키지는 이 워크스페이스에서 해석되지 않아 훅 시그니처에서 끌어옵니다.
type EmblaOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
type EmblaPlugins = NonNullable<Parameters<typeof useEmblaCarousel>[1]>;

interface UseCarouselParams {
  options?: EmblaOptions;
  plugins?: EmblaPlugins;
}

export const useCarousel = ({ options, plugins }: UseCarouselParams = {}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, ...options },
    plugins
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    // 슬라이드가 나중에 바뀌어도 인덱스가 따라오도록 재초기화도 구독합니다.
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    slideCount: emblaApi?.scrollSnapList().length ?? 0,
    scrollTo,
  };
};
