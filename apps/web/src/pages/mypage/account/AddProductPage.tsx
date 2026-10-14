import { Navigate } from 'react-router';

import { AddProductList, useProductFitDraftStore } from '@/features/myPage';
import { PATH } from '@/routes/path';

// 계정 화면 경로와, 그 아래 상품 추가 검색 화면 경로입니다.
const ACCOUNT_PATH = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`;
const ADD_PRODUCT_SEARCH_PATH = `${ACCOUNT_PATH}/${PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.BASE}/${PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.ADD_PRODUCTS_SEARCH}`;

export const AddProductPage = () => {
  const status = useProductFitDraftStore((state) => state.status);

  // 저장된 상품 목록 화면을 거치지 않고 들어오면(새로고침·직접 진입) 어느 쪽에 추가할지 알 수 없어 계정 화면으로 돌려보냅니다.
  if (!status) return <Navigate to={ACCOUNT_PATH} replace />;

  return (
    <AddProductList status={status} searchPath={ADD_PRODUCT_SEARCH_PATH} />
  );
};
