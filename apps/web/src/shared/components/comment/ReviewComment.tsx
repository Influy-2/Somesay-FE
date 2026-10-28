// comment

import { ChipAgreement } from '../chips/ChipAgreement';
import { ConsumerReviewProfile } from '../profile/ConsumerReviewProfile';
export interface ReviewCommentProps {
  nickname: string;
  isAgree: boolean;
  content: string;
  profileImg?: string;
  skinTypeIds?: number[];
  skinExpectationIds?: number[];
  userId: number;
}

export const ReviewComment = ({
  nickname,
  isAgree,
  content,
  profileImg,
  skinTypeIds,
  skinExpectationIds,
  userId,
}: ReviewCommentProps) => {
  return (
    <div className="flex flex-col gap-3.5 py-4">
      <ConsumerReviewProfile
        nickname={nickname}
        userId={userId}
        {...(profileImg ? { profileImageUrl: profileImg } : {})}
        {...(skinTypeIds ? { skinTypeIds } : {})}
        {...(skinExpectationIds ? { skinExpectationIds } : {})}
      />
      <div className="flex flex-col items-start gap-2 pl-8">
        <ChipAgreement type={isAgree ? 'agree' : 'disagree'} />
        <p className="body2-m">{content}</p>
      </div>
    </div>
  );
};
