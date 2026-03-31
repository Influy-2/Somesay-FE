import { Outlet } from 'react-router';

import { BottomTabBar } from '@/shared/components';

export const BottomTabLayout = () => {
  return (
    <>
      <Outlet />
      <BottomTabBar />
    </>
  );
};
