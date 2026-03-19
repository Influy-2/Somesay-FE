import { createBrowserRouter } from 'react-router';
import { PATH } from '@/routes/path';

import { HomePage } from '@/pages/home/HomePage';
import { CategoriesPage } from '@/pages/category/CategoriesPage';
import { SubCategoriesPage } from '@/pages/category/SubcategoriesPage';
import { GlobalLayout } from '@/shared/components';

export const appRouter = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <GlobalLayout />,
    // errorElement: <GlobalError />,
    children: [
      { index: true, element: <HomePage /> }, // "/" 접속 시 홈페이지 렌더링
      // ...authRoutes, 추후 추가
      {
        path: PATH.CATEGORIES.BASE,
        element: <CategoriesPage />,
      },
      {
        path: `${PATH.CATEGORIES.BASE}/:categoryId`,
        element: <SubCategoriesPage />,
      },
    ],
  },
]);
