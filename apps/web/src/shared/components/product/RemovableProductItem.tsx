// Product/RemovableProdctItem

import { useState } from 'react';
import { CircleMinus24Icon } from '@/shared/icons';
import { Modal } from '@/shared/components';

type RemovableProductItemProps = {
  productId: number;
  imageUrl: string;
  brand: string;
  productName: string;
  onDelete: (productId: number) => void;
  type: 'good' | 'bad';
};

export const RemovableProductItem = ({
  productId,
  imageUrl,
  brand,
  productName,
  onDelete,
  type,
}: RemovableProductItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const description =
    type === 'good'
      ? '잘 맞는 상품에서 삭제하시겠어요?'
      : '안 맞는 상품에서 삭제하시겠어요?';

  return (
    <>
      <li className="flex items-center px-4 py-5">
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
          <div className="body2-m text-grey-black flex flex-col gap-1">
            <p>{brand}</p>
            <p>{productName}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="제품 삭제"
        >
          <CircleMinus24Icon className="text-grey04" />
        </button>
      </li>
      {/*TODO : modal 컴포넌트 줄바꿈 가능하게 수정 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`해당 제품을\n${description}`}
        description=""
        leftButton={{
          label: '취소',
          onClick: () => setIsModalOpen(false),
        }}
        rightButton={{
          label: '삭제',
          onClick: () => {
            onDelete(productId);
            setIsModalOpen(false);
          },
        }}
      />
    </>
  );
};
