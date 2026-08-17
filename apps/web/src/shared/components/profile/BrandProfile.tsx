// Profile/브랜드
import { Link } from 'react-router';
import { MainArrowIcon } from '@/shared/icons';
import { PATH } from '@/routes/path';

export interface BrandProfileProps {
  brandName: string;
  brandImageUrl: string | null;
  brandId: number;
}

export const BrandProfile = ({
  brandName,
  brandId,
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
      <Link
        to={`${PATH.BRAND.BASE}/${brandId}`}
        aria-label={`${brandName} 브랜드 홈페이지로 이동`}
      >
        <MainArrowIcon aria-hidden="true" />
      </Link>
    </div>
  );
};
