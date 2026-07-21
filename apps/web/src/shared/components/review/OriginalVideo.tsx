// OriginalVideo.tsx

import { Link } from 'react-router';

interface OriginalVideoProps {
  youtubeUrl: string;
  videoTitle: string;
  viewCount: number;
  uploadDate?: string;
  creatorName: string;
  creatorProfileImgUrl?: string;
}

const getYoutubeThumbnail = (url: string) => {
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  )?.[1];
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
};

const formatViewCount = (count: number): string => {
  if (count >= 100000) {
    return `${Math.floor(count / 10000)}만`;
  }
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}만`;
  }
  return `${Math.floor(count / 1000)}천`;
};

const formatUploadDate = (uploadAt: string): string => {
  const now = new Date();
  const upload = new Date(uploadAt);
  const diffMs = now.getTime() - upload.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 28) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
};

export const OriginalVideo = ({
  youtubeUrl,
  videoTitle,
  viewCount,
  uploadDate,
  creatorName,
  creatorProfileImgUrl,
}: OriginalVideoProps) => {
  const thumbnail = getYoutubeThumbnail(youtubeUrl);

  return (
    <Link
      to={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-2"
    >
      <div className="flex gap-2">
        <div className="bg-grey02 relative aspect-video w-40 shrink-0 overflow-hidden">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={videoTitle ?? '영상 썸네일'}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col justify-between gap-1">
            <p className="caption1-m line-clamp-2 leading-[140%] text-black">
              {videoTitle ?? '영상 제목'}
            </p>
            <p className="caption2-m text-grey06">
              {viewCount ? `조회수 ${formatViewCount(viewCount)}` : ''}
              {viewCount && uploadDate ? ' · ' : ''}
              {uploadDate ? formatUploadDate(uploadDate) : ''}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="bg-grey02 h-5 w-5 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              {creatorProfileImgUrl && (
                <img
                  src={creatorProfileImgUrl}
                  className="h-full w-full object-cover"
                  alt=""
                />
              )}
            </div>
            <span className="caption1-m text-grey07">{creatorName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
