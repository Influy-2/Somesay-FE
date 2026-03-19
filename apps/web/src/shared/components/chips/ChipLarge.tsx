import cn from '@/utils/cn';

export const ChipLarge = ({
  label,
  bgColor = 'grey05',
  textColor = 'grey08',
}: {
  label: string;
  bgColor?: string;
  textColor?: string;
}) => {
  return (
    <div
      className={cn(
        `bg-${bgColor} text-${textColor}`,
        'body2-sb inline-flex items-center justify-center gap-2.5 rounded-[1.25rem] px-2.5 py-1 whitespace-nowrap'
      )}
    >
      {label}
    </div>
  );
};
