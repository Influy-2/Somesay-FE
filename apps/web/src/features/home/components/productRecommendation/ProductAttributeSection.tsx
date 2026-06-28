import { ChipLarge } from '@/shared/components';
interface ProductAttributeSectionProps {
  title: string;
  items: ProductAttributeItem[];
}
interface ProductAttributeItem {
  label: string;
  isHighlighted: boolean;
}

export const ProductAttributeSection = ({
  title,
  items,
}: ProductAttributeSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-2">
      {/* 상품 속성 제목 */}
      <h2 className="body2-b text-black">{title}</h2>

      {/* 상품 속성 칩 목록 */}
      <div className="flex flex-wrap gap-x-1.5 gap-y-2">
        {items.map((item) => (
          <ChipLarge
            key={item.label}
            label={item.label}
            variant={item.isHighlighted ? 'highlight' : 'default'}
          />
        ))}
      </div>
    </section>
  );
};
