import { Outlet } from 'react-router';

import { BottomTabBar } from '../navigation/BottomTabBar';
export const BottomTabLayout = () => {
  return (
    <>
      <Outlet />
      <BottomTabBar />
    </>
  );
};
