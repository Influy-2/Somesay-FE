import cn from '@/utils/cn';

export type ChipLargeVariant = 'default' | 'highlight' | 'filter';

interface ChipLargeProps {
  label: string;
  variant?: ChipLargeVariant;
}

const variantClassNames: Record<ChipLargeVariant, string> = {
  default: 'bg-white text-grey08',
  highlight: 'bg-primary-100 text-black',
  filter: 'bg-black text-white',
};

export const ChipLarge = ({ label, variant = 'default' }: ChipLargeProps) => {
  return (
    <div
      className={cn(
        variantClassNames[variant],
        'body2-sb inline-flex items-center justify-center gap-2.5 rounded-[1.25rem] px-2.5 py-1 whitespace-nowrap'
      )}
    >
      {label}
    </div>
  );
};
