import cn from '@/utils/cn';

export type ChipBasicVariant = 'default' | 'blue' | 'black';

interface ChipBasicProps {
  label: string;
  variant?: ChipBasicVariant;
}

const variantClassNames: Record<ChipBasicVariant, string> = {
  default: 'bg-grey02 text-grey08',
  blue: 'bg-primary-100 text-black',
  black: 'bg-black text-white',
};

export const ChipBasic = ({ label, variant = 'default' }: ChipBasicProps) => {
  return (
    <div
      className={cn(
        variantClassNames[variant],
        'caption1-m inline-flex items-center justify-center gap-2.5 rounded-[1.25rem] px-2 py-[.1875rem] text-center text-nowrap'
      )}
    >
      {label}
    </div>
  );
};
