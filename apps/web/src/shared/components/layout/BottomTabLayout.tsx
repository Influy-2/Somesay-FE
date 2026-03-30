import { Outlet } from 'react-router';

import { BottomTabBar } from '@/shared/components/navigation/BottomTabBar';

export const BottomTabLayout = () => {
  return (
    <>
      <Outlet />
      <BottomTabBar />
    </>
  );
};
