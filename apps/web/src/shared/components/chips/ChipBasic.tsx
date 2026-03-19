// Chip/기본, Chip/홈프로필용, Chip/color
import cn from '@/utils/cn';
export const ChipBasic = ({
  label,
  bgColor = 'bg-white',
  textColor = 'text-grey08',
}: {
  label: string;
  bgColor?: string;
  textColor?: string;
}) => {
  return (
    <div
      // className={`bg-${bgColor} text-${textColor} inline-flex items-center justify-center gap-2.5 rounded-[1.25rem] px-2 py-[.1875rem] text-center text-xs leading-[140%] font-medium tracking-[-0.0008rem]`}
      className={cn(
        bgColor,
        textColor,
        'inline-flex items-center justify-center gap-2.5 rounded-[1.25rem] px-2 py-[.1875rem] text-center text-xs leading-[140%] font-medium tracking-[-0.0008rem]'
      )}
    >
      {label}
    </div>
  );
};
