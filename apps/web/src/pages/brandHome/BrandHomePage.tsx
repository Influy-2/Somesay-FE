import { useNavigate, useParams } from 'react-router';
import {
  BrandHomeHero,
  BrandProductFilters,
  BrandProductList,
  useBrandHome,
} from '@/features/brandHome';

export const BrandHomePage = () => {
  const navigate = useNavigate();
  const { brandId: brandIdParam } = useParams();
  const parsedBrandId = Number(brandIdParam);
  const isValidBrandId = Number.isInteger(parsedBrandId) && parsedBrandId > 0;

  const { brand, isBrandPending, isBrandError, filterProps, listProps } =
    useBrandHome(isValidBrandId ? parsedBrandId : undefined);

  if (!isValidBrandId) {
    return (
      <div className="body2-m flex min-h-dvh items-center justify-center px-4 text-center">
        브랜드 정보를 찾을 수 없어요.
      </div>
    );
  }

  if (isBrandPending) {
    return (
      <div className="body2-m flex min-h-dvh items-center justify-center px-4 text-center">
        브랜드 정보를 불러오는 중이에요.
      </div>
    );
  }

  if (isBrandError || !brand) {
    return (
      <div className="body2-m flex min-h-dvh items-center justify-center px-4 text-center">
        브랜드 정보를 불러오지 못했어요.
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <BrandHomeHero brand={brand} onBack={() => navigate(-1)} />
      <BrandProductFilters brandName={brand.brandName} {...filterProps} />
      <BrandProductList {...listProps} />
    </div>
  );
};
