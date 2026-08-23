//Product/SelectedItem

import { CircleX20Icon } from '@/shared/icons';

type SelectedItemProps = {
  productId: number;
  productImageUrl: string;
  brandName: string;
  productName: string;
  onRemove: (productId: number) => void;
};

export const SelectedItem = ({
  productId,
  productImageUrl,
  brandName,
  productName,
  onRemove,
}: SelectedItemProps) => {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div className="relative w-20">
        <div className="bg-grey02 aspect-8/9 w-full overflow-hidden">
          {productImageUrl && (
            <img
              src={productImageUrl}
              alt={productName}
              className="size-full object-cover"
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => onRemove(productId)}
          className="absolute top-1 right-1"
          aria-label="선택 취소"
        >
          <CircleX20Icon />
        </button>
      </div>
      <p className="caption1-m text-grey09 mt-2 line-clamp-2 w-20">
        {`[${brandName}]${productName}`}
      </p>
    </div>
  );
};
