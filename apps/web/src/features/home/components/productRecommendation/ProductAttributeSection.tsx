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
      <h2 className="body2-b text-black">{title}</h2>
      <div className="flex flex-wrap gap-x-1.5 gap-y-2">
        {items.map((item) => (
          <ChipLarge
            key={item.label}
            label={item.label}
            bgColor={item.isHighlighted ? 'bg-black' : 'bg-grey05'}
            textColor={item.isHighlighted ? 'text-white' : 'text-grey08'}
          />
        ))}
      </div>
    </section>
  );
};
