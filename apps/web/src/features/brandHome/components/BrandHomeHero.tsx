import type { BrandSummaryType } from '@somesay/shared';
import { ArrowBackIcon, Star16Icon } from '@/shared/icons';
import { ShareButton } from '@/shared/components';

interface BrandHomeHeroProps {
  brand: BrandSummaryType;
  onBack: () => void;
}

export const BrandHomeHero = ({ brand, onBack }: BrandHomeHeroProps) => {
  return (
    <section
      className="relative aspect-[390/260] w-full shrink-0 overflow-hidden bg-black"
      aria-labelledby="brand-home-title"
    >
      <img
        src={brand.brandImageUrl}
        alt=""
        className="absolute inset-0 size-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />

      <header className="absolute top-0 left-0 flex h-13.5 w-full items-center justify-between px-4 py-2.5 text-white">
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로 가기"
          className="flex cursor-pointer items-center justify-center"
        >
          <ArrowBackIcon aria-hidden="true" />
        </button>
        <ShareButton
          title={brand.brandName}
          text={`${brand.brandName} 브랜드 홈을 확인해 보세요.`}
          ariaLabel={`${brand.brandName} 브랜드 홈 공유하기`}
          className="text-white"
        />
      </header>

      <div className="absolute bottom-5 left-4 flex items-center gap-3">
        <img
          src={brand.brandLogoUrl}
          alt={`${brand.brandName} 로고`}
          className="size-15 shrink-0 rounded-full object-cover"
        />
        <div className="flex min-w-0 flex-col gap-1.5 text-white">
          <h1
            id="brand-home-title"
            className="text-xl leading-[150%] font-semibold"
          >
            {brand.brandName}
          </h1>
          <div className="caption1-m text-grey01 flex flex-wrap items-center gap-2">
            <span className="caption1-b flex items-center">
              <Star16Icon aria-hidden="true" className="size-4" />
              {brand.rating}
            </span>
            <span className="bg-grey06 h-3 w-px" aria-hidden="true" />
            <span>
              리뷰{' '}
              <strong className="caption1-b">
                {brand.reviewCount.toLocaleString()}
              </strong>
            </span>
            <span className="bg-grey06 h-3 w-px" aria-hidden="true" />
            <span>
              SOMESAY 브랜드 평점{' '}
              <strong className="caption1-b">{brand.ranking}위</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
