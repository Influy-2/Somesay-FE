// Profile/내가 좋아할 만한 크리에이터

import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import { ChipBasic } from '@/shared/components';

interface RecommendedCreatorProfileProps {
  creatorId: number;
  name: string;
  profileImageUrl: string;
  ageGroup: string;
  skinType: string;
}

export const RecommendedCreatorProfile = ({
  creatorId,
  name,
  profileImageUrl,
  ageGroup,
  skinType,
}: RecommendedCreatorProfileProps) => {
  return (
    <Link
      to={`${PATH.CREATOR.BASE}/${creatorId}`}
      className="flex w-48.5 items-center gap-2"
      aria-label={`${name} 크리에이터 홈으로 이동`}
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
        <span className="body2-sb line-clamp-1">{name}</span>
        <div className="flex gap-1">
          <ChipBasic label={ageGroup} />
          <ChipBasic label={skinType} />
        </div>
      </div>
    </Link>
  );
};
