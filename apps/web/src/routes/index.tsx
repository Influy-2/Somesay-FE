import { createBrowserRouter, Outlet } from 'react-router';
import { PATH } from '@/routes/path';

import { GlobalLayout } from '@/shared/components';
import { BottomTabLayout } from '@/shared/components/layout/BottomTabLayout';

import { HomePage } from '@/pages/home/HomePage';
import { ProductRecommendationsPage } from '@/pages/home/ProductRecommendationsPage';

import { CategoriesPage } from '@/pages/category/CategoriesPage';
import { DaisoProductsPage } from '@/pages/category/DaisoProductPage';
import { SubcategoriesPage } from '@/pages/category/SubcategoriesPage';
import { CreatorHomePage } from '@/pages/creatorHome/CreatorHomePage';
import { SearchPage } from '@/pages/search/SearchPage';
import { RankingPage } from '@/pages/ranking/RankingPage';
import { ReviewsPage } from '@/pages/reviews/ReviewsPage';
import { MyPage } from '@/pages/myPage/MyPage';
import { ProductDetailPage } from '@/pages/productDetail/ProductDetailPage';
import { BrandHomePage } from '@/pages/brandHome/BrandHomePage';

import { ReviewEvaluationPage } from '@/pages/reviewEvaluation/ReviewEvaluationPage';
import { AccountPage } from '@/pages/myPage/AccountPage';
import { NicknamePage } from '@/pages/myPage/account/NicknamePage';
import { GenderPage } from '@/pages/myPage/account/GenderPage';
import { AgePage } from '@/pages/myPage/account/AgePage';
import { SkinTypePage } from '@/pages/myPage/account/SkinTypePage';
import { SkinConcernPage } from '@/pages/myPage/account/SkinConcernPage';
import { ProductFitPage } from '@/pages/myPage/account/ProductFitPage';
import { AddProductPage } from '@/pages/myPage/account/AddProductPage';
import { LoginPage } from '@/pages/login/LoginPage';
import { KakaoCallbackPage } from '@/pages/login/KakaoCallbackPage';
import { EmailPage } from '@/pages/onboarding/EmailPage';
import { EmailVerificationPage } from '@/pages/onboarding/EmailVerificationPage';
import { NicknamePage as OnboardingNicknamePage } from '@/pages/onboarding/NicknamePage';
import { ProfilePage } from '@/pages/onboarding/ProfilePage';
import { SkinTypesPage } from '@/pages/onboarding/SkinTypesPage';
import { SkinConcernsPage } from '@/pages/onboarding/SkinConcernsPage';
import { MatchedProductsPage } from '@/pages/onboarding/MatchedProductsPage';
import { MatchedProductSearchPage } from '@/pages/onboarding/MatchedProductSearchPage';
import { MismatchedProductsPage } from '@/pages/onboarding/MismatchedProductsPage';
import { MismatchedProductSearchPage } from '@/pages/onboarding/MismatchedProductSearchPage';
import { CompletePage } from '@/pages/onboarding/CompletePage';
import { TermsAgreementPage } from '@/pages/onboarding/TermsAgreementPage';
import {
  OnboardingIndexRedirect,
  OnboardingRouteGuard,
} from '@/features/onboarding';
import { ProtectedRoute } from '@/features/auth';
import { MyReviewEvaluationPage } from '@/pages/myPage/myReviewEvaluation/MyReviewEvaluationPage';
import { MyReviewEvaluationProductListPage } from '@/pages/myPage/myReviewEvaluation/MyReviewEvaluationProductListPage';
import { MyReviewEvaluationCreatorListPage } from '@/pages/myPage/myReviewEvaluation/MyReviewEvaluationCreatorListPage';

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
          {
            path: PATH.MY_PAGE.BASE,
            element: <MyPage />,
          },
        ],
      },
      // 바텀바 없는 페이지
      {
        path: PATH.CATEGORIES.BASE,
        element: <Outlet />,
        children: [
          {
            path: PATH.CATEGORIES.DAISO,
            element: <DaisoProductsPage />,
          },
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
        path: PATH.BRAND.BASE,
        element: <Outlet />,
        children: [
          {
            path: PATH.BRAND.HOME,
            element: <BrandHomePage />,
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
        path: PATH.REVIEW_EVALUATION.BASE,
        element: <ReviewEvaluationPage />,
      },
      {
        path: PATH.LOGIN.BASE,
        element: <LoginPage />,
      },
      {
        path: PATH.LOGIN.KAKAO_CALLBACK,
        element: <KakaoCallbackPage />,
      },
      {
        path: PATH.ONBOARDING.BASE,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <OnboardingIndexRedirect />,
          },
          {
            path: PATH.ONBOARDING.TERMS,
            element: (
              <OnboardingRouteGuard step="terms">
                <TermsAgreementPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.EMAIL,
            element: (
              <OnboardingRouteGuard step="email">
                <EmailPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.EMAIL_VERIFICATION,
            element: (
              <OnboardingRouteGuard step="emailVerification">
                <EmailVerificationPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.NICKNAME,
            element: (
              <OnboardingRouteGuard step="nickname">
                <OnboardingNicknamePage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.PROFILE,
            element: (
              <OnboardingRouteGuard step="profile">
                <ProfilePage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.SKIN_TYPES,
            element: (
              <OnboardingRouteGuard step="skinTypes">
                <SkinTypesPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.SKIN_CONCERNS,
            element: (
              <OnboardingRouteGuard step="skinConcerns">
                <SkinConcernsPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MATCHED_PRODUCTS,
            element: (
              <OnboardingRouteGuard step="matchedProducts">
                <MatchedProductsPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MATCHED_PRODUCTS_SEARCH,
            element: (
              <OnboardingRouteGuard step="matchedProducts">
                <MatchedProductSearchPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MISMATCHED_PRODUCTS,
            element: (
              <OnboardingRouteGuard step="mismatchedProducts">
                <MismatchedProductsPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MISMATCHED_PRODUCTS_SEARCH,
            element: (
              <OnboardingRouteGuard step="mismatchedProducts">
                <MismatchedProductSearchPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.COMPLETE,
            element: <CompletePage />,
          },
        ],
      },
      {
        path: PATH.MY_PAGE.BASE,
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <OnboardingIndexRedirect />,
          },
          {
            path: PATH.ONBOARDING.TERMS,
            element: (
              <OnboardingRouteGuard step="terms">
                <TermsAgreementPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.EMAIL,
            element: (
              <OnboardingRouteGuard step="email">
                <EmailPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.EMAIL_VERIFICATION,
            element: (
              <OnboardingRouteGuard step="emailVerification">
                <EmailVerificationPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.NICKNAME,
            element: (
              <OnboardingRouteGuard step="nickname">
                <OnboardingNicknamePage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.PROFILE,
            element: (
              <OnboardingRouteGuard step="profile">
                <ProfilePage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.SKIN_TYPES,
            element: (
              <OnboardingRouteGuard step="skinTypes">
                <SkinTypesPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.SKIN_CONCERNS,
            element: (
              <OnboardingRouteGuard step="skinConcerns">
                <SkinConcernsPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MATCHED_PRODUCTS,
            element: (
              <OnboardingRouteGuard step="matchedProducts">
                <MatchedProductsPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MATCHED_PRODUCTS_SEARCH,
            element: (
              <OnboardingRouteGuard step="matchedProducts">
                <MatchedProductSearchPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MISMATCHED_PRODUCTS,
            element: (
              <OnboardingRouteGuard step="mismatchedProducts">
                <MismatchedProductsPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.MISMATCHED_PRODUCTS_SEARCH,
            element: (
              <OnboardingRouteGuard step="mismatchedProducts">
                <MismatchedProductSearchPage />
              </OnboardingRouteGuard>
            ),
          },
          {
            path: PATH.ONBOARDING.COMPLETE,
            element: <CompletePage />,
          },
        ],
      },
      {
        path: PATH.MY_PAGE.BASE,
        element: <ProtectedRoute />,
        children: [
          {
            path: PATH.MY_PAGE.REVIEW_EVALUATION.BASE,
            element: <Outlet />,
            children: [
              { index: true, element: <MyReviewEvaluationPage /> },
              {
                path: PATH.MY_PAGE.REVIEW_EVALUATION.PRODUCTS.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <MyReviewEvaluationProductListPage />,
                  },
                ],
              },
              {
                path: PATH.MY_PAGE.REVIEW_EVALUATION.CREATORS.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <MyReviewEvaluationCreatorListPage />,
                  },
                ],
              },
            ],
          },
          {
            path: PATH.MY_PAGE.ACCOUNT.BASE,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <AccountPage />,
              },
              {
                path: PATH.MY_PAGE.ACCOUNT.NICKNAME,
                element: <NicknamePage />,
              },
              { path: PATH.MY_PAGE.ACCOUNT.GENDER, element: <GenderPage /> },
              { path: PATH.MY_PAGE.ACCOUNT.AGE, element: <AgePage /> },
              {
                path: PATH.MY_PAGE.ACCOUNT.SKIN_TYPE,
                element: <SkinTypePage />,
              },
              {
                path: PATH.MY_PAGE.ACCOUNT.SKIN_CONCERN,
                element: <SkinConcernPage />,
              },
              {
                path: PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.BASE,
                element: <Outlet />,
                children: [
                  {
                    path: PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.MATCHES,
                    element: <ProductFitPage />,
                  },
                  {
                    path: PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.MISMATCHES,
                    element: <ProductFitPage />,
                  },
                  {
                    path: PATH.MY_PAGE.ACCOUNT.PRODUCT_FIT.ADD_PRODUCTS,
                    element: <AddProductPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: PATH.HOME.PRODUCT_RECOMMENDATIONS,
        element: <ProductRecommendationsPage />,
      },
    ],
  },
]);
