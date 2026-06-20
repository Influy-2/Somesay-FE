import { SomesayIcon } from '@/shared/icons';
export const ProductRecommendationHeader = ({
  count,
  keywords,
}: {
  count: number;
  keywords: string[];
}) => {
  return (
    <section className="mb-[19px] flex w-full flex-col items-center gap-3 px-4">
      <h3 className="text-center text-black">
        <span className="flex items-center justify-center">
          <SomesayIcon />
          <span className="headline4">는</span>
        </span>
        <span className="headline4 block">{count}개의 제품을 추천드려요</span>
      </h3>

      <div className="body2-m text-grey08 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {keywords.map((keyword) => (
          <span key={keyword}>
            <span className="text-grey06">#</span>
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
};
