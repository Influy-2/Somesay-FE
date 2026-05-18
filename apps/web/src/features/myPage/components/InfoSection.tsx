// InfoSection.tsx
import { ReactNode } from 'react';

type InfoSectionProps = {
  title: string;
  children: ReactNode;
};

export const InfoSection = ({ title, children }: InfoSectionProps) => {
  return (
    <section className="flex flex-col gap-6 py-8">
      <p className="body2-sb text-grey06">{title}</p>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
};
