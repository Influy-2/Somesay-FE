import { Link } from 'react-router';
import { getAgeLabel, getSkinTypeLabels } from '@somesay/shared';

import { PATH } from '@/routes/path';
import {
  BlackHeartButton,
  ChipBasic,
  ReviewPreviewCard,
} from '@/shared/components';
import { useCarousel } from '@/shared/hooks/useCarousel';

import type { WishCreatorType } from '@somesay/shared';

interface WishCreatorItemProps {
  creator: WishCreatorType;
  onHeartToggle: (creator: WishCreatorType) => void;
}

export const WishCreatorItem = ({
  creator,
  onHeartToggle,
}: WishCreatorItemProps) => {
  const { emblaRef } = useCarousel({
    options: { align: 'start', containScroll: 'trimSnaps' },
  });

  return (
    <article aria-label={creator.creatorName} className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3 px-4">
        <Link
          to={`${PATH.CREATOR.BASE}/${creator.creatorId}`}
          aria-label={`${creator.creatorName} 크리에이터 홈으로 이동`}
          className="flex min-w-0 flex-1 items-center gap-4"
        >
          <div className="bg-grey02 size-[3.375rem] shrink-0 overflow-hidden rounded-full">
            {creator.profileImgUrl && (
              <img
                src={creator.profileImgUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="body1-sb truncate text-black">
              {creator.creatorName}
            </span>
            <div className="flex gap-1">
              <ChipBasic label={getAgeLabel(creator.age)} />
              {getSkinTypeLabels(creator.skinTypeIds).map((label) => (
                <ChipBasic key={label} label={label} />
              ))}
            </div>
          </div>
        </Link>
        {/* 하트는 링크 안에 두면 중첩 인터랙션이 되므로 밖에 둔다. */}
        <BlackHeartButton
          isLiked={creator.isHearted}
          likeCount={creator.wishCount}
          onLikeToggle={() => onHeartToggle(creator)}
        />
      </div>

      {creator.reviewList.length > 0 && (
        <div
          ref={emblaRef}
          role="region"
          aria-label={`${creator.creatorName}의 리뷰`}
          className="overflow-hidden"
        >
          <ul className="flex gap-2 px-4">
            {creator.reviewList.map((review) => (
              <li key={review.reviewId} className="shrink-0">
                <ReviewPreviewCard
                  reviewId={review.reviewId}
                  rating={review.rating}
                  content={review.content}
                  product={{
                    productId: review.productId,
                    productName: review.productName,
                    brandName: review.brandName,
                    productImgUrl: review.productImgUrl,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};
