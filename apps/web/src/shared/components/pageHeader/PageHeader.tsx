import cn from '@/utils/cn';
import React from 'react';

interface PageHeaderProps {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode[];
  className?: string;
}

export const PageHeader = ({
  left,
  title,
  right,
  className,
}: PageHeaderProps) => {
  return (
    <header
      className={cn(
        'fixed top-0 flex h-[3.375rem] w-screen max-w-110 min-w-[20rem] items-center justify-between bg-white px-4 py-2.5',
        className,
        'z-header'
      )}
    >
      {left && <div className="flex shrink-0 items-center">{left}</div>}
      {title && (
        <h1 className="body1-sb pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-black">
          {title}
        </h1>
      )}
      <div className="flex items-center justify-end gap-3">
        {right?.map((icon, idx) => (
          <React.Fragment key={idx}>{icon}</React.Fragment>
        ))}
      </div>
    </header>
  );
};
