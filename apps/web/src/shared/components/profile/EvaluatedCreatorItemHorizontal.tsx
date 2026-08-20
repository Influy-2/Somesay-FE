// Profile/내리뷰평가화면/가로형

import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import { ArrowRightIcon } from '@/shared/icons';
import { ChipBasic } from '../chips/ChipBasic';
interface EvaluatedCreatorItemHorizontalProps {
  creatorId: number;
  profileImageUrl: string;
  name: string;
  ageGroup: string;
  skinType: string;
  reviewCount: number;
}

export const EvaluatedCreatorItemHorizontal = ({
  creatorId,
  profileImageUrl,
  name,
  ageGroup,
  skinType,
  reviewCount,
}: EvaluatedCreatorItemHorizontalProps) => {
  return (
    <Link
      to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`}
      state={{ selectedCreatorId: creatorId, activeTab: 'creators' }}
      className="flex items-center gap-3.5 px-4 py-3"
      aria-label={`${name} 크리에이터 리뷰 평가 보기`}
    >
      <div className="bg-grey02 size-15 shrink-0 overflow-hidden rounded-full">
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="body1-sb line-clamp-1">{name}</span>
        <div className="flex gap-1">
          <ChipBasic label={ageGroup} />
          <ChipBasic label={skinType} />
        </div>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1">
        <span className="body2-m text-grey08">{reviewCount}개</span>
        <ArrowRightIcon className="text-grey06" />
      </div>
    </Link>
  );
};
