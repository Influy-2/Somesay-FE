import { createBrowserRouter } from 'react-router';
import { PATH } from '@/routes/path';

import { HomePage } from '@/pages/home/HomePage';
import GlobalLayout from '@/layout/GlobalLayout';

export const appRouter = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <GlobalLayout />,
    // errorElement: <GlobalError />,
    children: [
      { index: true, element: <HomePage /> }, // "/" 접속 시 홈페이지 렌더링
      // ...authRoutes, 추후 추가
    ],
  },
]);
