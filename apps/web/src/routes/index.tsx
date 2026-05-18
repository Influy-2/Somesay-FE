import { createBrowserRouter, Outlet } from 'react-router';
import { PATH } from '@/routes/path';

import { GlobalLayout } from '@/shared/components';
import { BottomTabLayout } from '@/shared/components/layout/BottomTabLayout';

import { HomePage } from '@/pages/home/HomePage';
import { CategoriesPage } from '@/pages/category/CategoriesPage';
import { SubcategoriesPage } from '@/pages/category/SubcategoriesPage';
import { CreatorHomePage } from '@/pages/creatorHome/CreatorHomePage';
import { SearchPage } from '@/pages/search/SearchPage';
import { RankingPage } from '@/pages/ranking/RankingPage';
import { ReviewsPage } from '@/pages/reviews/ReviewsPage';
import { MyPage } from '@/pages/myPage/MyPage';
import { ProductDetailPage } from '@/pages/productDetail/ProductDetailPage';
import { AccountPage } from '@/pages/myPage/AccountPage';
import { NicknamePage } from '@/pages/myPage/account/NicknamePage';
import { GenderPage } from '@/pages/myPage/account/GenderPage';
import { AgePage } from '@/pages/myPage/account/AgePage';
import { SkinTypePage } from '@/pages/myPage/account/SkinTypePage';
import { SkinConcernPage } from '@/pages/myPage/account/SkinConcernPage';
import { GoodProductPage } from '@/pages/myPage/account/GoodProductPage';
import { BadProductPage } from '@/pages/myPage/account/BadProductPage';
import { AddProductPage } from '@/pages/myPage/account/AddProductPage';

export const appRouter = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <GlobalLayout />,
    // errorElement: <GlobalError />,
    children: [
      {
        //바텀바 있는 페이지
        element: <BottomTabLayout />,
        children: [
          //홈
          { index: true, element: <HomePage /> },
          //랭킹
          { path: PATH.RANKING.BASE, element: <RankingPage /> },
          //리뷰
          { path: PATH.REVIEWS.BASE, element: <ReviewsPage /> },
          //카테고리
          { path: PATH.CATEGORIES.BASE, element: <CategoriesPage /> },
          //마이페이지
          { path: PATH.MY_PAGE.BASE, element: <MyPage /> },
        ],
      },
      // 바텀바 없는 페이지
      {
        path: PATH.CATEGORIES.BASE,
        element: <Outlet />,
        children: [
          {
            path: PATH.CATEGORIES.DETAIL,
            element: <SubcategoriesPage />,
          },
        ],
      },
      {
        path: PATH.CREATOR.BASE,
        element: <Outlet />,
        children: [
          {
            path: PATH.CREATOR.HOME,
            element: <CreatorHomePage />,
          },
        ],
      },
      {
        path: PATH.PRODUCT.BASE,
        element: <Outlet />,
        children: [
          {
            path: PATH.PRODUCT.DETAIL,
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: PATH.SEARCH.BASE,
        element: <SearchPage />,
      },
      {
        path: PATH.MY_PAGE.BASE,
        element: <Outlet />,
        children: [
          {
            path: PATH.MY_PAGE.ACCOUNT,
            element: <AccountPage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.NICKNAME}`,
            element: <NicknamePage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.GENDER}`,
            element: <GenderPage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.AGE}`,
            element: <AgePage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.SKIN_TYPE}`,
            element: <SkinTypePage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.SKIN_CONCERN}`,
            element: <SkinConcernPage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.GOOD_PRODUCTS}`,
            element: <GoodProductPage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.BAD_PRODUCTS}`,
            element: <BadProductPage />,
          },
          {
            path: `${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.ADD_PRODUCT}`,
            element: <AddProductPage />,
          },
        ],
      },
    ],
  },
]);
