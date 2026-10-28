// OriginalVideoCard.tsx

import { Move12Icon } from '@/shared/icons';
import { OriginalVideo } from './OriginalVideo';
interface OriginalVideoCardProps {
  youtubeUrl: string;
  videoTitle: string;
  viewCount: number;
  uploadDate?: string;
  creatorName: string;
  creatorProfileImgUrl?: string;
  timeLinkCount: number;
  reviewId: number;
  onOpenTimeLinkSheet?: (reviewId: number) => void;
}

export const OriginalVideoCard = ({
  youtubeUrl,
  videoTitle,
  viewCount,
  uploadDate,
  creatorName,
  creatorProfileImgUrl,
  timeLinkCount,
  reviewId,
  onOpenTimeLinkSheet,
}: OriginalVideoCardProps) => {
  return (
    <div className="bg-grey01 px-4 py-3">
      {/* 헤더 */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="body2-sb text-black">이 리뷰 원본 보기</h3>
        {timeLinkCount && timeLinkCount > 1 && (
          <button
            type="button"
            onClick={() => onOpenTimeLinkSheet?.(reviewId)}
            className="caption1-m text-grey06 flex items-center gap-1"
          >
            {timeLinkCount}개 영상 전체보기
            <Move12Icon aria-hidden="true" />
          </button>
        )}
      </div>

      {/* 카드 */}
      <OriginalVideo
        youtubeUrl={youtubeUrl}
        creatorName={creatorName}
        videoTitle={videoTitle}
        viewCount={viewCount}
        {...(uploadDate ? { uploadDate } : {})}
        {...(creatorProfileImgUrl ? { creatorProfileImgUrl } : {})}
      />
    </div>
  );
};
