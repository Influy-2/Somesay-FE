import { Navigate } from 'react-router';

import { AddProductSearch, useProductFitDraftStore } from '@/features/myPage';
import { PATH } from '@/routes/path';

// 진입 불가 시 돌려보낼 계정 화면 경로입니다.
const ACCOUNT_PATH = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`;

export const AddProductSearchPage = () => {
  const status = useProductFitDraftStore((state) => state.status);

  // 저장된 상품 목록 화면을 거치지 않고 들어오면(새로고침·직접 진입) 어느 쪽에 추가할지 알 수 없어 계정 화면으로 돌려보냅니다.
  if (!status) return <Navigate to={ACCOUNT_PATH} replace />;

  return <AddProductSearch status={status} />;
};
