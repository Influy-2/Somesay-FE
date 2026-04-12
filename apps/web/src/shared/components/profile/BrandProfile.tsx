// Profile/브랜드

import { MainArrowIcon } from '@/shared/icons';

export interface BrandProfileProps {
  brandName: string;
  brandImageUrl?: string | undefined;
}

export const BrandProfile = ({
  brandName,
  brandImageUrl,
}: BrandProfileProps) => {
  return (
    <div className="border-grey02 flex items-center justify-between border-b px-4 py-5">
      <div className="flex items-center gap-1.5">
        {brandImageUrl && (
          <img
            src={brandImageUrl}
            alt=""
            aria-hidden="true"
            className="bg-grey03 h-6 w-6 rounded-full object-cover"
          />
        )}
        <span className="body1-m text-grey08">{brandName}</span>
      </div>
      {/* TODO: 브랜드 홈페이지 연결 */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${brandName} 브랜드 홈페이지로 이동`}
      >
        <MainArrowIcon aria-hidden="true" />
      </a>
    </div>
  );
};
