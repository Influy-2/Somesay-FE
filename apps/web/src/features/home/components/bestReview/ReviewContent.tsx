import { CreatorProfileRegular } from '@/shared/components';
import Star16Icon from '@/shared/icons/Star16Icon.svg?react';

// TODO: CreatorProfileRegular와 통일 (추후 백엔드 연결시 수정)
interface ReviewContentProps {
  creator: {
    name: string;
    profileImageUrl: string;
    subscriberCount: number;
    trustScore: number;
    ageGroup: number;
    skinType: string;
  };
  rating: number;
  content: string;
  productName: string;
}

export const ReviewContent = ({
  rating,
  content,
  productName,
  creator,
}: ReviewContentProps) => {
  return (
    <article
      aria-label={`${creator.name}의 ${productName} 리뷰`}
      className="border-grey03 bg-grey01 flex w-full flex-col items-start gap-5 border border-solid p-5 px-4"
    >
      <CreatorProfileRegular {...creator} />
      <div
        className="flex w-full flex-col items-start gap-3"
        aria-label={`별점 ${rating}점. ${content}`}
      >
        {/* 별점 */}
        <div className="flex items-center gap-1" aria-hidden="true">
          {/* TODO: 디자인 전달되는 대로 별 구현 */}
          <div className="flex items-center gap-px">
            <Star16Icon />
          </div>
          <span className="body2-sb text-[#1F2129]">{rating}</span>
        </div>
        <p aria-hidden="true" className="body2-m line-clamp-5 text-[#1F2129]">
          {content}
        </p>
      </div>
    </article>
  );
};
