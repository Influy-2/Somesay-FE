// Profile/소비자리뷰
import { getConcernLabels, getSkinTypeLabels } from '@somesay/shared';

import { ProfileNoImage } from './ProfileNoImage';
interface ConsumerReviewProfileProps {
  nickname: string;
  profileImageUrl?: string | null;
  skinTypeIds?: number[];
  skinExpectationIds?: number[];
  userId: number;
}

export const ConsumerReviewProfile = ({
  nickname,
  profileImageUrl,
  skinTypeIds = [],
  skinExpectationIds = [],
  userId,
}: ConsumerReviewProfileProps) => {
  // 이 자리는 사용자 본인의 피부 조건이라 기대효과명("속건조 완화")이 아닌 고민명("속건조")으로 적습니다.
  const skinTypeLabels = getSkinTypeLabels(skinTypeIds);
  const concernLabels = getConcernLabels(skinExpectationIds);

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
            {skinTypeLabels.join(' · ')}
          </span>
          {/* 구분선 */}
          {skinTypeLabels.length && concernLabels.length ? (
            <div className="bg-grey03 mx-1 h-2 w-px" />
          ) : null}
          {/* 기대효과 */}
          <span className="caption1-m text-grey06">
            {concernLabels.join(' · ')}
          </span>
        </div>
      </div>
    </div>
  );
};
