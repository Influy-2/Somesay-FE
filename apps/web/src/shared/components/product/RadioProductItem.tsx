//Product/RadioProductItem

import { memo } from 'react';
import { RadioOnIcon, RadioOffIcon } from '@/shared/icons';

type RadioProductItemProps = {
  productId: number;
  imageUrl: string;
  brand: string;
  productName: string;
  isSelected: boolean;
  isAlreadyAdded?: boolean;
  onClick: (productId: number) => void;
  onAlreadyAdded?: () => void;
};

export const RadioProductItem = memo(
  ({
    productId,
    imageUrl,
    brand,
    productName,
    isSelected,
    isAlreadyAdded = false,
    onClick,
    onAlreadyAdded,
  }: RadioProductItemProps) => {
    const handleClick = () => {
      if (isAlreadyAdded) {
        onAlreadyAdded?.();
        return;
      }
      onClick(productId);
    };

    return (
      <li className="flex items-center px-4 py-5">
        <button
          type="button"
          onClick={handleClick}
          className="flex w-full items-center justify-between gap-3"
        >
          <div className="flex flex-1 items-start gap-3">
            <div className="bg-grey02 h-20 w-18 overflow-hidden">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={productName}
                  className="size-full object-cover"
                />
              )}
            </div>
            <div className="body2-m text-grey-black flex flex-col gap-1 text-left">
              <p>{brand}</p>
              <p>{productName}</p>
            </div>
          </div>

          {isAlreadyAdded ? (
            <RadioOnIcon className="shrink-0 opacity-15" />
          ) : isSelected ? (
            <RadioOnIcon className="shrink-0" />
          ) : (
            <RadioOffIcon className="shrink-0" />
          )}
        </button>
      </li>
    );
  }
);
