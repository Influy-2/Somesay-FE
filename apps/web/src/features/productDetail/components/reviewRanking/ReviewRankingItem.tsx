import { useState } from 'react';
import { ToggleDownIcon, ToggleUpIcon } from '@/shared/icons';
import { Comments } from '@/features/productDetail';
import { MoreButton, CreatorInfoReview } from '@/shared/components';

interface ReviewSource {
  thumbnail?: string;
  title?: string;
  viewCount?: string;
  uploadDate?: string;
}

interface ReviewCreator {
  name: string;
  channelName?: string;
  profileImg: string;
  subscriberCount: string;
  reliability: number;
  tags: string[];
}

interface ReviewComment {
  id: number;
  userId: string;
  type: 'agree' | 'disagree';
  content: string;
}

interface ReviewRankingItemProps {
  review: {
    id: number;
    comments?: ReviewComment[];
    creator: ReviewCreator;
    source?: ReviewSource;
    ranking: number;
    rating: number;
    content: string;
    agreedPercentage: number;
  };
}

const COMMENTS_PREVIEW_COUNT = 2;
const THUMBNAIL_FALLBACK = '/images/thumbnail-placeholder.png';

export const ReviewRankingItem = ({ review }: ReviewRankingItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const comments = review?.comments || [];
  const remainingComments = comments.length - COMMENTS_PREVIEW_COUNT;

  return (
    <div className="border-grey01 flex flex-col">
      <CreatorInfoReview review={review} />

      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls="review-expandable"
        className="text-grey06 body2-m flex w-full items-center justify-center gap-0.5"
      >
        {isExpanded ? (
          <>
            접기 <ToggleUpIcon aria-hidden="true" />
          </>
        ) : (
          <>
            더보기 <ToggleDownIcon aria-hidden="true" />
          </>
        )}
      </button>

      {isExpanded && (
        <div id="review-expandable" className="flex flex-col bg-white">
          {comments.length === 0 ? (
            <div className="mb-5 flex h-24 w-full items-center justify-center">
              <span className="body2-m text-grey05">아직 코멘트가 없어요.</span>
            </div>
          ) : (
            <div className="divide-grey03 flex flex-col divide-y px-4 pb-4">
              {comments.slice(0, COMMENTS_PREVIEW_COUNT).map((comment) => (
                <Comments
                  key={comment.id}
                  userId={comment.userId}
                  type={comment.type}
                  content={comment.content}
                />
              ))}
            </div>
          )}

          {remainingComments > 0 && (
            <div className="px-5 pb-6">
              <MoreButton
                to={`/reviews/${review.id}/comments`}
                text={`코멘트 ${remainingComments}개 더보기`}
              />
            </div>
          )}

          <div className="bg-white px-4">
            <div className="bg-grey01 px-4 py-3">
              <h3 className="body2-sb mb-2 text-black">이 리뷰 원본 보기</h3>
              <div className="flex gap-2">
                <div className="bg-grey02 relative aspect-video w-40 shrink-0 overflow-hidden">
                  <img
                    src={review.source?.thumbnail ?? THUMBNAIL_FALLBACK}
                    alt={
                      review.source?.title
                        ? `${review.source.title} 썸네일`
                        : '영상 썸네일'
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col justify-between gap-1">
                    <p className="caption1-m line-clamp-2 leading-[140%] text-black">
                      {review.source?.title || '영상 제목'}
                    </p>
                    <p className="text-grey06 caption2-m">
                      조회수 {review.source?.viewCount} ·{' '}
                      {review.source?.uploadDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="bg-grey02 h-5 w-5 overflow-hidden rounded-full"
                      aria-hidden="true"
                    >
                      <img
                        src={review.creator.profileImg}
                        className="h-full w-full object-cover"
                        alt=""
                      />
                    </div>
                    <span className="text-grey07 caption1-m">
                      {review.creator.channelName ?? review.creator.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
