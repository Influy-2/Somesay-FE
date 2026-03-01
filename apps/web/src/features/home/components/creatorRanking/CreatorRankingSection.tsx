import { CreatorRankingUpDownRow } from '@/shared/components';
import { MOCK_RANKING_CREATORS } from './mock';
export const CreatorRankingSection = () => {
  return (
    <section
      aria-labelledby="creator-ranking-title"
      className="flex w-full flex-col items-center justify-center gap-5 px-4"
    >
      <h2 id="creator-ranking-title" className="headline4 w-full">
        크리에이터 신뢰도 랭킹
      </h2>
      <div className="flex flex-col items-start gap-6 self-stretch py-0">
        {MOCK_RANKING_CREATORS.map((creator) => (
          <CreatorRankingUpDownRow {...creator} />
        ))}
      </div>
    </section>
  );
};
