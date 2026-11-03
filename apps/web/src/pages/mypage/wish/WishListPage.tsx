import { Outlet, useLocation, useNavigate } from 'react-router';

import { PageHeader, TabBar } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { PATH } from '@/routes/path';

const WISH_PATH = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.WISH.BASE}`;

const WISH_TABS = [
  { path: PATH.MY_PAGE.WISH.PRODUCTS, label: '상품' },
  { path: PATH.MY_PAGE.WISH.CREATORS, label: '크리에이터' },
];

// 탭마다 URL을 나눠 새로고침·뒤로가기·공유에서 같은 탭이 유지되게 한다.
export const WishListPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="mt-13.5 flex flex-col bg-white">
      <PageHeader
        left={
          <button
            type="button"
            aria-label="뒤로 가기"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
        title="찜 목록"
      />
      <TabBar
        className="px-4"
        tabs={WISH_TABS.map(({ path, label }) => ({
          tabText: label,
          isActive: pathname.endsWith(`/${path}`),
          // 탭 전환은 이력에 쌓이면 뒤로가기가 탭 되돌리기가 되므로 replace한다.
          onClick: () => navigate(`${WISH_PATH}/${path}`, { replace: true }),
        }))}
      />
      <Outlet />
    </div>
  );
};
