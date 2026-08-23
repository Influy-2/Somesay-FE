// 탭 모음
import { TabItem } from './TabItem';
import type { TabItemProps } from './TabItem';

interface TabBarProps {
  tabs: TabItemProps[];
}

export const TabBar = ({ tabs }: TabBarProps) => {
  return (
    <div role="tablist" className="border-grey02 flex w-full border-b-2">
      {tabs.map((tab) => (
        <TabItem key={tab.tabText} {...tab} />
      ))}
    </div>
  );
};
