import cn from '@/utils/cn';

export type ChipLargeColor =
  | 'white'
  | 'blue300'
  | 'blue200'
  | 'blue100'
  | 'yellow100'
  | 'yellow200'
  | 'gray02';

interface ChipLargeProps {
  label: string;
  color?: ChipLargeColor;
}

const colorClassNames: Record<ChipLargeColor, string> = {
  white: 'bg-white',
  blue300: 'bg-primary-300',
  blue200: 'bg-primary-200',
  blue100: 'bg-primary-100',
  yellow100: 'bg-secondary-100',
  yellow200: 'bg-secondary-200',
  gray02: 'bg-grey02',
};

export const ChipLarge = ({ label, color = 'blue200' }: ChipLargeProps) => {
  return (
    <div
      className={cn(
        colorClassNames[color],
        'body2-sb text-grey08 inline-flex items-center justify-center rounded-[1.25rem] px-2.5 py-1 text-nowrap whitespace-nowrap'
      )}
    >
      {label}
    </div>
  );
};
