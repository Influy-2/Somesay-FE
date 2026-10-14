import { useNavigate, useLocation } from 'react-router';
import {
  PageHeader,
  RemovableProductItem,
  FloatingButtonPlus,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { PATH } from '@/routes/path';
import { useProductFitDraftStore } from '@/features/myPage';
import { MAX_PRODUCT_SELECTION } from '@/features/productSelection';
import { useSnackbarStore } from '@/shared/stores';
import { useDeleteUserProduct, useFetchUserProducts } from '@/shared/hooks';

export const ProductFitPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const segments = pathname.split('/');
  const lastSegment = segments[segments.length - 1];
  const isMatches = lastSegment === PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.MATCHES;

  const {
    data: products = [],
    isPending,
    isError,
  } = useFetchUserProducts(isMatches ? 'MATCHED' : 'MISMATCHED');
  const { removeUserProduct } = useDeleteUserProduct();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const startDraft = useProductFitDraftStore((state) => state.startDraft);

  const title = isMatches ? '잘 맞았던 제품' : '안 맞았던 제품';
  const description = isMatches
    ? '가장 잘 맞았던 제품을 최대 15개 저장할 수 있어요.'
    : '안 맞았던 제품을 최대 15개 저장할 수 있어요.';

  const handleDelete = (productId: number) => removeUserProduct(productId);

  const handleAdd = () => {
    if (products.length >= MAX_PRODUCT_SELECTION) {
      showSnackbar('최대 15개까지 저장 가능해요.');
      return;
    }
    // 추가 화면이 두 라우트로 나뉘어 라우터 이동 state 대신 스토어로 넘긴다.
    startDraft(isMatches ? 'MATCHED' : 'MISMATCHED');
    navigate(
      `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}/${PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.BASE}/${PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.ADD_PRODUCTS}`
    );
  };

  const renderProducts = () => {
    if (isPending) {
      return (
        <div
          role="status"
          aria-busy="true"
          aria-label="상품 목록을 불러오는 중"
          className="flex flex-1"
        />
      );
    }
    if (isError) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <p className="body2-m text-grey05">상품 목록을 불러오지 못했어요.</p>
        </div>
      );
    }
    if (products.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <p className="body2-m text-grey05">아직 추가된 상품이 없어요.</p>
        </div>
      );
    }
    return (
      <ul className="divide-grey02 divide-y">
        {products.map((product) => (
          <RemovableProductItem
            key={product.productId}
            {...product}
            type={isMatches ? 'good' : 'bad'}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-13.5 flex flex-1 flex-col">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title={title}
      />
      <div className="flex flex-1 flex-col">
        <p className="body1-sb p-4 text-black">{description}</p>
        {renderProducts()}
      </div>
      <FloatingButtonPlus onClick={handleAdd} />
    </div>
  );
};
