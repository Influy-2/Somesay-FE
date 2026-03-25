import { Link, useLocation } from 'react-router';

import {
  HomeOnIcon,
  HomeOffIcon,
  RankingOnIcon,
  RankingOffIcon,
  ReviewOnIcon,
  ReviewOffIcon,
  CategoryOnIcon,
  CategoryOffIcon,
  ProfileOnIcon,
  ProfileOffIcon,
} from '@/shared/icons';

import { PATH } from '@/routes/path';

type TabItem = {
  label: string;
  path: string;
  IconOn: React.FC<React.SVGProps<SVGSVGElement>>;
  IconOff: React.FC<React.SVGProps<SVGSVGElement>>;
  exact?: boolean;
};

const TAB_ITEMS: TabItem[] = [
  {
    label: '홈',
    path: PATH.ROOT,
    IconOn: HomeOnIcon,
    IconOff: HomeOffIcon,
    exact: true,
  },
  {
    label: '랭킹',
    path: PATH.RANKING.BASE,
    IconOn: RankingOnIcon,
    IconOff: RankingOffIcon,
  },
  {
    label: '리뷰',
    path: PATH.REVIEWS.BASE,
    IconOn: ReviewOnIcon,
    IconOff: ReviewOffIcon,
  },
  {
    label: '카테고리',
    path: PATH.CATEGORIES.BASE,
    IconOn: CategoryOnIcon,
    IconOff: CategoryOffIcon,
  },
  {
    label: '마이페이지',
    path: PATH.MY_PAGE.BASE,
    IconOn: ProfileOnIcon,
    IconOff: ProfileOffIcon,
  },
];

export const BottomTabBar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="하단 탭 내비게이션"
      className="z-header border-grey02 fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2 border-t bg-white px-4 pt-2 pb-10"
    >
      <ul className="flex items-start justify-between">
        {TAB_ITEMS.map(({ label, path, IconOn, IconOff, exact }) => {
          const isActive = exact
            ? pathname === path
            : pathname.startsWith(path);
          const Icon = isActive ? IconOn : IconOff;
          return (
            <li key={path}>
              <Link
                to={path}
                aria-current={isActive ? 'page' : undefined}
                className="flex w-15 flex-col items-center gap-0.5"
              >
                <Icon aria-hidden="true" className="size-6" />
                <span className="caption1-m text-black">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
