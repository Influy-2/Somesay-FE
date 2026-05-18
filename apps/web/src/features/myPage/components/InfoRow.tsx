// InfoRow.tsx
import { ReactNode } from 'react';
import { MainArrowIcon } from '@/shared/icons';

type InfoRowProps = {
  label: string;
  onClick?: () => void;
  children?: ReactNode;
  variant?: 'default' | 'vertical';
};

export const InfoRow = ({
  label,
  onClick,
  children,
  variant = 'default',
}: InfoRowProps) => {
  if (variant === 'vertical') {
    return (
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <span className="body1-sb text-grey-black">{label}</span>
          {onClick && (
            <button type="button" onClick={onClick}>
              <MainArrowIcon className="text-grey06" />
            </button>
          )}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between">
      <span className="body1-sb text-grey-black">{label}</span>
      <div className="flex items-center gap-2">
        {children && (
          <div className="text-grey05 body2-m flex items-center">
            {children}
          </div>
        )}
        {onClick && (
          <button type="button" onClick={onClick}>
            <MainArrowIcon className="text-grey06" />
          </button>
        )}
      </div>
    </div>
  );
};
