import { TypeRow } from './TypeRow';

// TODO: useRecommendationFilter로 교체
const skinConcerns = ['건성', '좁쌀'];
// TODO: 칩 내부 내용 리스트로
export const RecommendationSection = () => {
  return (
    <section
      aria-labelledby="recommendation-title"
      className="flex w-full flex-col items-center justify-center gap-10 px-4"
    >
      <h2 className="headline4 text-center" id="recommendation-title">
        요즘 나의 피부 고민에
        <br />딱 맞는 제품을 추천해 드려요
      </h2>
      <div className="flex flex-col items-start gap-6 self-stretch">
        <div
          role="group"
          aria-label="나의 피부 정보"
          className="divide-grey03 flex flex-col items-start divide-y self-stretch"
        >
          <TypeRow
            label="피부 고민"
            selectedItems={skinConcerns}
            onPress={() => {}}
          />
          <TypeRow
            label="피부 타입"
            selectedItems={skinConcerns}
            onPress={() => {}}
          />
          <TypeRow
            label="제품군"
            selectedItems={skinConcerns}
            onPress={() => {}}
          />
        </div>
        {/* 폼 안에 넣기? */}
        <button
          type="button"
          aria-label="제품 추천받기"
          // aria-busy={isLoading}
          // disabled={isLoading}
          //onClick={handleRecommend}
          className="body2-sb flex h-12 w-full cursor-pointer items-center justify-center bg-black px-3 py-1 text-white"
        >
          제품 추천받기
        </button>
      </div>
    </section>
  );
};
