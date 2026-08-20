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

// 탭과 패널을 aria-controls / aria-labelledby로 상호 참조시키기 위한 식별자입니다.
const PRODUCT_TAB_ID = 'ranking-products-tab';
const CREATOR_TAB_ID = 'ranking-creators-tab';
const PRODUCT_PANEL_ID = 'ranking-products-panel';
const CREATOR_PANEL_ID = 'ranking-creators-panel';

/** 탭 상태를 별도 state 없이 URL 쿼리 하나로만 관리하는 랭킹 페이지입니다. */
export const RankingPage = () => {
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

  return (
    // 하단 여백은 고정 하단 탭 바(91px)에 가리지 않도록 확보합니다.
    <div className="mb-40 flex h-fit flex-1 flex-col bg-white pt-13.5">
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
            ariaControls: PRODUCT_PANEL_ID,
          },
          {
            tabText: '크리에이터 신뢰도 랭킹',
            isActive: activeTab === 'creators',
            onClick: () => replaceTab('creators'),
            id: CREATOR_TAB_ID,
            ariaControls: CREATOR_PANEL_ID,
          },
        ]}
      />

      {/* 두 패널을 모두 마운트해 aria-controls 참조를 유지하되, 내용은 선택된 탭만 조회합니다. */}
      <div
        role="tabpanel"
        id={PRODUCT_PANEL_ID}
        aria-labelledby={PRODUCT_TAB_ID}
        hidden={activeTab !== 'products'}
      >
        {activeTab === 'products' && <ProductRankingsSection />}
      </div>

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
