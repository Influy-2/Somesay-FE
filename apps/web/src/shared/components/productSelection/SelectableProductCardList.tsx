import { memo, useCallback } from 'react';

import { RadioProductItem } from '../product/RadioProductItem';

import type {
  SelectableProductItem,
  SelectableProductListStatus,
} from './productSelection.types';

// 목록 전체와 카드 하나가 공유하는 실패 기본 문구입니다.
const DEFAULT_ERROR_MESSAGE = '상품 목록을 불러오지 못했어요.';

// 카드 목록이 받는 props입니다.
interface SelectableProductCardListProps {
  products: SelectableProductItem[];
  selectedProductIds: ReadonlySet<number>;
  /**
   * 카드를 눌렀을 때 상품 객체를 넘깁니다.
   * 카드가 memo라서 **안정된 참조(useCallback 등)로 넘겨야** 선택이 바뀔 때 해당 카드만 다시 그려집니다.
   */
  onToggle: (product: SelectableProductItem) => void;
  /** 조회 상태입니다. 기본값은 'ready'입니다. */
  status?: SelectableProductListStatus;
  /** 목록이 비었을 때 보여줄 문구입니다. */
  emptyMessage: string;
  /** 조회 실패 문구입니다. 지정하지 않으면 기본 문구를 씁니다. */
  errorMessage?: string;
  /** 이미 저장돼 있어 다시 고를 수 없는 상품 id입니다. */
  alreadyAddedProductIds?: ReadonlySet<number>;
  /** 이미 저장된 상품을 눌렀을 때 안내를 띄우는 콜백입니다. */
  onAlreadyAdded?: () => void;
}

interface SelectableProductCardProps {
  product: SelectableProductItem;
  isSelected: boolean;
  isAlreadyAdded: boolean;
  onToggle: (product: SelectableProductItem) => void;
  onAlreadyAdded?: () => void;
}

/**
 * 상품 하나를 그리는 카드입니다.
 * 부모가 다시 그려져도 `onToggle`·`product` 참조가 같으면 이 카드는 다시 그려지지 않습니다.
 * 그래서 호출부는 `onToggle`을 안정된 참조로 넘겨야 합니다.
 */
const SelectableProductCard = memo(
  ({
    product,
    isSelected,
    isAlreadyAdded,
    onToggle,
    onAlreadyAdded,
  }: SelectableProductCardProps) => {
    // RadioProductItem은 productId만 넘기므로, 상품 객체로 바꿔 호출부가 목록을 다시 훑지 않게 합니다.
    const handleClick = useCallback(
      () => onToggle(product),
      [onToggle, product]
    );

    return (
      <RadioProductItem
        {...product}
        isSelected={isSelected}
        isAlreadyAdded={isAlreadyAdded}
        onClick={handleClick}
        {...(onAlreadyAdded ? { onAlreadyAdded } : {})}
      />
    );
  }
);

/**
 * 선택 가능한 상품 카드 목록이며 로딩·실패·빈 상태까지 한 곳에서 처리합니다.
 * 각 카드가 memo이므로 `onToggle`은 안정된 참조로 넘겨야 합니다.
 */
export const SelectableProductCardList = memo(
  ({
    products,
    selectedProductIds,
    onToggle,
    status = 'ready',
    emptyMessage,
    errorMessage = DEFAULT_ERROR_MESSAGE,
    alreadyAddedProductIds,
    onAlreadyAdded,
  }: SelectableProductCardListProps) => {
    // 실패와 로딩, 빈 목록을 먼저 걸러 목록 렌더를 단순하게 둡니다.
    if (status === 'error') {
      return (
        <p className="body2-m text-grey05 py-24 text-center">{errorMessage}</p>
      );
    }

    if (status === 'loading') {
      return (
        <p
          role="status"
          aria-busy="true"
          className="body2-m text-grey05 py-24 text-center"
        >
          로딩 중...
        </p>
      );
    }

    if (products.length === 0) {
      return (
        <p className="body2-m text-grey05 py-24 text-center">{emptyMessage}</p>
      );
    }

    return (
      <ul className="divide-grey02 divide-y px-4">
        {products.map((product) => (
          <SelectableProductCard
            key={product.productId}
            product={product}
            isSelected={selectedProductIds.has(product.productId)}
            isAlreadyAdded={
              alreadyAddedProductIds?.has(product.productId) ?? false
            }
            onToggle={onToggle}
            {...(onAlreadyAdded ? { onAlreadyAdded } : {})}
          />
        ))}
      </ul>
    );
  }
);
