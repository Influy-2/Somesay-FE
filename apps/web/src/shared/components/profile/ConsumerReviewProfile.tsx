// Profile/소비자리뷰
import { ProfileNoImage } from '@/shared/components';

interface ConsumerReviewProfileProps {
  nickname: string;
  profileImageUrl?: string | null;
  skinTypes?: string[];
  skinExpectations?: string[];
  userId: number;
}

export const ConsumerReviewProfile = ({
  nickname,
  profileImageUrl,
  skinTypes,
  skinExpectations,
  userId,
}: ConsumerReviewProfileProps) => {
  return (
    <div className="flex items-center gap-2.5">
      {/* 프로필 이미지 */}
      <div className="size-8 shrink-0 self-center overflow-hidden rounded-full">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <ProfileNoImage userId={userId} className="h-full w-full" />
        )}
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col gap-1">
        <span className="body2-sb text-black">{nickname}</span>
        <div className="flex items-center gap-1">
          {/* 피부타입 */}
          <span className="caption1-m text-primary-300">
            {skinTypes?.join(' · ')}
          </span>
          {/* 구분선 */}
          {skinTypes?.length && skinExpectations?.length ? (
            <div className="bg-grey03 mx-1 h-2 w-px" />
          ) : null}
          {/* 기대효과 */}
          <span className="caption1-m text-grey06">
            {skinExpectations?.join(' · ')}
          </span>
        </div>
      </div>
    </div>
  );
};
