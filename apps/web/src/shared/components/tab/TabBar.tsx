// 탭 모음
import cn from '@/utils/cn';
import { TabItem } from './TabItem';
import type { TabItemProps } from './TabItem';

interface TabBarProps {
  tabs: TabItemProps[];
  className?: string;
}

export const TabBar = ({ tabs, className }: TabBarProps) => {
  return (
    <div
      role="tablist"
      className={cn('border-grey02 flex w-full border-b-2', className)}
    >
      {tabs.map((tab) => (
        <TabItem key={tab.tabText} {...tab} />
      ))}
    </div>
  );
};
