import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { BrandProductSortType, BrandProductType } from '@somesay/shared';
import {
  BrandHomeHero,
  BrandProductFilters,
  BrandProductList,
  MOCK_BRAND_HOME_DATA,
} from '@/features/brandHome';

const ALL_CATEGORY_ID = 0;

export const BrandHomePage = () => {
  const navigate = useNavigate();
  const { brandId: brandIdParam } = useParams();
  const parsedBrandId = Number(brandIdParam);
  const isValidBrandId = Number.isInteger(parsedBrandId) && parsedBrandId > 0;

  const [searchValue, setSearchValue] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORY_ID);
  const [sortType, setSortType] = useState<BrandProductSortType>('RATING');
  const [products, setProducts] = useState<BrandProductType[]>(
    MOCK_BRAND_HOME_DATA.productPage.products
  );

  const visibleProducts = useMemo(() => {
    const filteredProducts =
      selectedCategoryId === ALL_CATEGORY_ID
        ? products
        : products.filter(
            (product) => product.mainCategoryId === selectedCategoryId
          );

    return [...filteredProducts].sort((first, second) => {
      if (sortType === 'REVIEW') {
        return second.reviewCount - first.reviewCount;
      }

      if (sortType === 'PRICE') {
        return first.price - second.price;
      }

      return second.rating - first.rating;
    });
  }, [products, selectedCategoryId, sortType]);

  const handleHeartToggle = (productId: number) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.productId === productId
          ? { ...product, isHearted: !product.isHearted }
          : product
      )
    );
  };

  if (!isValidBrandId) {
    return (
      <div className="body2-m flex min-h-dvh items-center justify-center px-4 text-center">
        브랜드 정보를 찾을 수 없어요.
      </div>
    );
  }

  const brand = {
    ...MOCK_BRAND_HOME_DATA.brand,
    brandId: parsedBrandId,
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <BrandHomeHero brand={brand} onBack={() => navigate(-1)} />
      <BrandProductFilters
        brandName={brand.brandName}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={() => {}}
        categories={MOCK_BRAND_HOME_DATA.categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        productCount={visibleProducts.length}
        sortType={sortType}
        onSelectSort={setSortType}
      />
      <BrandProductList
        products={visibleProducts}
        onHeartToggle={handleHeartToggle}
      />
    </div>
  );
};

export default BrandHomePage;
