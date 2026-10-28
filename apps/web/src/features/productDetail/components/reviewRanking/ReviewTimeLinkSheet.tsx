import { BottomSheet, OriginalVideo } from '@/shared/components';
import { useFetchTimeLinks } from '@/shared/hooks';
import type { ProductReviewType } from '@somesay/shared';

interface ReviewTimeLinkSheetProps {
  /** 열려 있을 때만 리뷰가 담기고, 닫히면 null이다. */
  review: ProductReviewType | null;
  onClose: () => void;
}

// 시트가 자기 쿼리를 들고 있어 타임링크 조회가 리뷰 목록을 리렌더시키지 않습니다.
export const ReviewTimeLinkSheet = ({
  review,
  onClose,
}: ReviewTimeLinkSheetProps) => {
  const { data: timeLinkGroup } = useFetchTimeLinks(review?.reviewId);

  return (
    <BottomSheet
      isOpen={review !== null}
      onClose={onClose}
      ariaLabel="리뷰 원본 전체보기"
      header={
        <div className="flex flex-col gap-1 px-4">
          <p className="body1-sb text-center">리뷰 원본 전체보기</p>
          <p className="body2-m text-grey06 pb-3.5 text-center">
            텍스트 요약은 아래 원본 영상 리뷰들을 종합한 내용입니다.
          </p>
        </div>
      }
    >
      {review && (
        <div className="flex flex-col gap-5 px-4 pt-2 pb-5">
          {timeLinkGroup?.timeLinks.map((link) => (
            <OriginalVideo
              key={link.timeLinkId}
              youtubeUrl={link.youtubeUrl}
              creatorName={review.creatorName}
              creatorProfileImgUrl={review.profileImgUrl}
              videoTitle={link.videoTitle}
              viewCount={link.viewCount}
              uploadDate={link.uploadAt}
            />
          ))}
        </div>
      )}
    </BottomSheet>
  );
};
