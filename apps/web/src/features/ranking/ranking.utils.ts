import { PATH } from '@/routes/path';

// URL에서 허용하는 랭킹 탭 값과 기본 탭을 정의합니다.
export const RANKING_TABS = ['products', 'creators'] as const;

export type RankingTab = (typeof RANKING_TABS)[number];

export const DEFAULT_RANKING_TAB: RankingTab = 'products';

/** 랭킹 탭을 쿼리로 지정한 링크를 만듭니다. 탭의 URL 표현은 이 함수만 알고 있습니다. */
export const getRankingTabPath = (tab: RankingTab) =>
  `${PATH.RANKING.BASE}?tab=${tab}`;

/** URL 쿼리가 지원하는 랭킹 탭 값인지 확인합니다. */
export const isRankingTab = (value: string | null): value is RankingTab =>
  value !== null && RANKING_TABS.includes(value as RankingTab);

/** 누락되거나 잘못된 탭 값을 기본 상품 탭으로 정규화합니다. */
export const getRankingTab = (value: string | null): RankingTab =>
  isRankingTab(value) ? value : DEFAULT_RANKING_TAB;

// 무한 쿼리 페이지에서 목록을 펼치기 위해 필요한 최소 형태입니다.
interface RankingPage<TItem> {
  content: TItem[];
}

/** 무한 쿼리의 페이지를 하나의 목록으로 합치고 화면 최대 개수로 자릅니다. */
export const flattenRankingPages = <TItem>(
  pages: RankingPage<TItem>[] | undefined,
  limit: number
) => pages?.flatMap((page) => page.content).slice(0, limit) ?? [];
