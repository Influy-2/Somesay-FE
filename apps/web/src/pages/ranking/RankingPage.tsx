import { useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';

import {
  CreatorRankingsSection,
  DEFAULT_RANKING_TAB,
  getRankingTab,
  isRankingTab,
  ProductRankingsSection,
  type RankingTab,
} from '@/features/ranking';
import { PATH } from '@/routes/path';
import { PageHeader, TabBar } from '@/shared/components';
import { SearchIcon } from '@/shared/icons';

// 상단 탭과 현재 패널을 접근성 속성으로 연결하는 식별자입니다.
const PRODUCT_TAB_ID = 'ranking-products-tab';
const CREATOR_TAB_ID = 'ranking-creators-tab';
const PRODUCT_PANEL_ID = 'ranking-products-panel';
const CREATOR_PANEL_ID = 'ranking-creators-panel';

/** URL 쿼리로 두 랭킹 탭을 제어하고 선택된 섹션을 조합합니다. */
export const RankingPage = () => {
  // URL의 tab 쿼리를 화면 탭 상태의 단일 기준으로 사용합니다.
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = getRankingTab(tabParam);

  // 탭 전환 이력이 뒤로가기에 남지 않도록 현재 URL을 replace합니다.
  const replaceTab = useCallback(
    (tab: RankingTab) => {
      setSearchParams(
        (currentParams) => {
          const nextParams = new URLSearchParams(currentParams);
          nextParams.set('tab', tab);
          return nextParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // 누락되거나 잘못된 tab 값은 기본 탭으로 정규화합니다.
  useEffect(() => {
    if (isRankingTab(tabParam)) return;

    replaceTab(DEFAULT_RANKING_TAB);
  }, [replaceTab, tabParam]);

  // 공통 헤더와 탭 아래에 현재 선택된 랭킹 섹션을 렌더링합니다.
  return (
    // 하단 여백은 고정 하단 탭 바(91px)에 가리지 않도록 확보합니다.
    <div className="flex min-h-full flex-col bg-white pt-13.5 pb-40">
      <PageHeader
        title="랭킹"
        right={[
          <Link
            key="search"
            to={PATH.SEARCH.BASE}
            aria-label="검색 페이지로 이동"
          >
            <SearchIcon aria-hidden="true" />
          </Link>,
        ]}
      />

      {/* 상품과 크리에이터 신뢰도 랭킹을 URL 쿼리로 전환합니다. */}
      <TabBar
        className="px-4"
        tabs={[
          {
            tabText: '상품 랭킹',
            isActive: activeTab === 'products',
            onClick: () => replaceTab('products'),
            id: PRODUCT_TAB_ID,
            controls: PRODUCT_PANEL_ID,
          },
          {
            tabText: '크리에이터 신뢰도 랭킹',
            isActive: activeTab === 'creators',
            onClick: () => replaceTab('creators'),
            id: CREATOR_TAB_ID,
            controls: CREATOR_PANEL_ID,
          },
        ]}
      />

      {/* 상품 탭의 패널 ID를 항상 유지하고 선택됐을 때만 내용을 조회합니다. */}
      <div
        role="tabpanel"
        id={PRODUCT_PANEL_ID}
        aria-labelledby={PRODUCT_TAB_ID}
        hidden={activeTab !== 'products'}
      >
        {activeTab === 'products' && <ProductRankingsSection />}
      </div>

      {/* 크리에이터 탭도 유효한 패널 ID를 유지하고 비활성 상태에는 숨깁니다. */}
      <div
        role="tabpanel"
        id={CREATOR_PANEL_ID}
        aria-labelledby={CREATOR_TAB_ID}
        hidden={activeTab !== 'creators'}
      >
        {activeTab === 'creators' && <CreatorRankingsSection />}
      </div>
    </div>
  );
};
