import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import { InfoSection } from './InfoSection';
import { MainArrowIcon } from '@/shared/icons';

type FitProduct = {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
};

type ProductFitSectionProps = {
  matches: FitProduct[];
  mismatches: FitProduct[];
};

const ACCOUNT_BASE = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`;
const PRODUCT_FIT_BASE = `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.BASE}`;

const FitProductRow = ({
  label,
  products,
  to,
}: {
  label: string;
  products: FitProduct[];
  to: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <span className="body1-sb text-grey-black">{label}</span>
        <Link to={to} aria-label={`${label} 페이지로 이동`}>
          <MainArrowIcon className="text-grey06" />
        </Link>
      </div>
      {products.length > 0 && (
        <div className="scrollbar-hide flex gap-2 overflow-x-auto">
          {products.map((product) => (
            <div
              key={product.productId}
              className="flex w-20 flex-col items-center gap-2"
            >
              <Link
                to={`${PATH.PRODUCT.BASE}/${product.productId}`}
                className="bg-grey02 size-15 overflow-hidden rounded-full"
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="size-full object-cover"
                  />
                )}
              </Link>
              <p className="caption1-m text-grey-black line-clamp-2 w-full text-center">
                {product.productName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ProductFitSection = ({
  matches,
  mismatches,
}: ProductFitSectionProps) => {
  return (
    <InfoSection title="제품 적합도">
      <FitProductRow
        label="잘 맞았던 제품"
        products={matches}
        to={`${PRODUCT_FIT_BASE}/${PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.MATCHES}`}
      />
      <FitProductRow
        label="안 맞았던 제품"
        products={mismatches}
        to={`${PRODUCT_FIT_BASE}/${PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.MISMATCHES}`}
      />
    </InfoSection>
  );
};
