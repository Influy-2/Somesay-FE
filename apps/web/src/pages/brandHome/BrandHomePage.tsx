import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { BrandProductSortType } from '@somesay/shared';
import {
  BrandHomeHero,
  BrandProductFilters,
  BrandProductList,
  useDebouncedSearchKeyword,
  useInfiniteScroll,
} from '@/features/brandHome';
import {
  useFetchBrandDetail,
  useFetchBrandProducts,
  useFetchBrandProductSearch,
} from '@/shared/hooks';
import { useAuthGuard } from '@/features/auth';

const ALL_CATEGORY_ID = 0;
export const BrandHomePage = () => {
  const navigate = useNavigate();
  const guardAction = useAuthGuard();
  const { brandId: brandIdParam } = useParams();
  const parsedBrandId = Number(brandIdParam);
  const isValidBrandId = Number.isInteger(parsedBrandId) && parsedBrandId > 0;
  const brandId = isValidBrandId ? parsedBrandId : undefined;

  const [searchValue, setSearchValue] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState(ALL_CATEGORY_ID);
  const [sortType, setSortType] = useState<BrandProductSortType>('RATING');
  const [wishOverrides, setWishOverrides] = useState<Record<number, boolean>>(
    {}
  );
  const { debouncedKeyword, updateDebouncedKeyword } =
    useDebouncedSearchKeyword();
  const hasSearchInput = searchValue.trim().length > 0;
  const hasDebouncedKeyword = debouncedKeyword.length > 0;
  const isSearchMode = hasSearchInput;

  const brandQuery = useFetchBrandDetail(brandId);
  const productsQuery = useFetchBrandProducts({
    ...(brandId !== undefined ? { brandId } : {}),
    ...(selectedSubCategoryId !== ALL_CATEGORY_ID
      ? { subCategoryId: selectedSubCategoryId }
      : {}),
    sortType,
    enabled: !hasSearchInput,
  });
  const searchQuery = useFetchBrandProductSearch({
    ...(brandId !== undefined ? { brandId } : {}),
    keyword: debouncedKeyword,
    ...(selectedSubCategoryId !== ALL_CATEGORY_ID
      ? { subCategoryId: selectedSubCategoryId }
      : {}),
    sortType,
    enabled: hasDebouncedKeyword,
  });
  const activeProductQuery = hasSearchInput ? searchQuery : productsQuery;

  const categories = useMemo(
    () => [
      { id: ALL_CATEGORY_ID, label: '전체' },
      ...(brandQuery.data?.availableSubCategories.map(
        ({ subCategoryId, subCategoryName }) => ({
          id: subCategoryId,
          label: subCategoryName,
        })
      ) ?? []),
    ],
    [brandQuery.data?.availableSubCategories]
  );

  const products = useMemo(
    () =>
      (
        activeProductQuery.data?.pages.flatMap((page) => page.products) ?? []
      ).map((product) => ({
        ...product,
        isHearted: wishOverrides[product.productId] ?? product.isHearted,
      })),
    [activeProductQuery.data?.pages, wishOverrides]
  );
  const productCount = activeProductQuery.data?.pages[0]?.totalCount ?? 0;
  const loadMoreRef = useInfiniteScroll({
    hasNextPage: activeProductQuery.hasNextPage ?? false,
    isFetchingNextPage: activeProductQuery.isFetchingNextPage,
    fetchNextPage: activeProductQuery.fetchNextPage,
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateDebouncedKeyword(value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
    updateDebouncedKeyword('');
  };

  const handleSelectCategory = (subCategoryId: number) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  const handleHeartToggle = guardAction((productId: number) => {
    const product = products.find((item) => item.productId === productId);

    if (!product) {
      return;
    }

    setWishOverrides((currentOverrides) => ({
      ...currentOverrides,
      [productId]: !product.isHearted,
    }));
  });

  if (!isValidBrandId) {
    return (
      <div className="body2-m flex min-h-dvh items-center justify-center px-4 text-center">
        브랜드 정보를 찾을 수 없어요.
      </div>
    );
  }

  if (brandQuery.isPending) {
    return (
      <div className="body2-m flex min-h-dvh items-center justify-center px-4 text-center">
        브랜드 정보를 불러오는 중이에요.
      </div>
    );
  }

  if (brandQuery.isError || !brandQuery.data) {
    return (
      <div className="body2-m flex min-h-dvh items-center justify-center px-4 text-center">
        브랜드 정보를 불러오지 못했어요.
      </div>
    );
  }

  const brand = brandQuery.data;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <BrandHomeHero brand={brand} onBack={() => navigate(-1)} />
      <BrandProductFilters
        brandName={brand.brandName}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        categories={categories}
        selectedCategoryId={selectedSubCategoryId}
        onSelectCategory={handleSelectCategory}
        productCount={productCount}
        sortType={sortType}
        onSelectSort={setSortType}
      />
      <BrandProductList
        products={products}
        onHeartToggle={handleHeartToggle}
        isLoading={activeProductQuery.isPending}
        isError={activeProductQuery.isError}
        emptyMessage={
          isSearchMode
            ? '검색 결과가 없어요.'
            : '해당 카테고리에 등록된 상품이 없어요.'
        }
        isFetchingNextPage={activeProductQuery.isFetchingNextPage}
        isFetchNextPageError={activeProductQuery.isFetchNextPageError}
        onRetry={() => {
          void activeProductQuery.refetch();
        }}
        onRetryNextPage={() => {
          void activeProductQuery.fetchNextPage();
        }}
        loadMoreRef={loadMoreRef}
      />
    </div>
  );
};

export default BrandHomePage;
