import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  PageHeader,
  RemovableProductItem,
  Snackbar,
  FloatingButtonPlus,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { MOCK_ACCOUNT } from '@/features/myPage/components/mockData';
import { PATH } from '@/routes/path';

const MAX_PRODUCTS = 15;

export const BadProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(MOCK_ACCOUNT.badProducts);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleDelete = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.productId !== productId));
  };

  const handleAdd = () => {
    if (products.length >= MAX_PRODUCTS) {
      setShowSnackbar(true);
      return;
    }
    navigate(
      `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.ADD_PRODUCT}`,
      {
        state: { type: 'bad', currentProducts: products },
      }
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
        title="안 맞았던 제품"
      />
      <div className="flex flex-1 flex-col">
        <p className="body1-sb p-4 text-black">
          가장 안 맞았던 제품을 최대 15개 저장할 수 있어요.
        </p>
        {products.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="body2-m text-grey05">아직 추가된 상품이 없어요.</p>
          </div>
        ) : (
          <ul className="divide-grey02 divide-y">
            {products.map((product) => (
              <RemovableProductItem
                key={product.productId}
                {...product}
                type="bad"
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
      <FloatingButtonPlus onClick={handleAdd} />
      {showSnackbar && (
        <Snackbar
          message="최대 15개까지 저장 가능해요."
          onClose={() => setShowSnackbar(false)}
          className="bottom-10 w-fit"
        />
      )}
    </div>
  );
};
