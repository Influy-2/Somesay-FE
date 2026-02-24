// import cn from '@/utils/cn';
import { RecommendationSection } from '@/features/home';

export const HomePage = () => {
  return (
    <div className="inline-flex w-full flex-col items-center gap-17 pt-[4.875rem]">
      <RecommendationSection />
      <div className="flex h-[7.3125rem] w-full items-center justify-center gap-2.5 p-2.5 text-black [background:var(--grey-03,#E4E2DF)]">
        베너 임시
      </div>
    </div>
  );
};
