// /my-page 상단 내 정보
import { Link } from 'react-router';

import { getAgeLabel } from '@somesay/shared';

import { PATH } from '@/routes/path';
import { ChipBasic } from '@/shared/components';
import { MainArrow20Icon } from '@/shared/icons';

import type { AgeType, MyPageResponse } from '@somesay/shared';

interface MyProfileProps extends Pick<
  MyPageResponse,
  'userProfileImgUrl' | 'userNickname' | 'userSkinTypes'
> {
  // 마이페이지 응답에 연령이 없어 /users/info(userAge) 캐시에서 받습니다.
  userAge: AgeType | null;
}

export const MyProfile = ({
  userProfileImgUrl,
  userNickname,
  userSkinTypes,
  userAge,
}: MyProfileProps) => {
  return (
    <section aria-label="내 프로필" className="mb-1 flex items-start py-5">
      <div
        aria-hidden="true"
        className="bg-grey02 size-15 shrink-0 overflow-hidden rounded-full"
      >
        {userProfileImgUrl && (
          <img
            src={userProfileImgUrl}
            alt=""
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="ml-3 flex min-w-0 flex-1 flex-col gap-2">
        <span className="line-clamp-1 text-[1.25rem] leading-[150%] font-semibold">
          {userNickname}
        </span>
        <div className="flex flex-wrap gap-1">
          <ChipBasic label={getAgeLabel(userAge)} />
          {userSkinTypes.map(({ skinTypeId, skinTypeName }) => (
            <ChipBasic key={skinTypeId} label={skinTypeName} />
          ))}
        </div>
      </div>

      <Link
        to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`}
        aria-label="계정 설정으로 이동"
        className="shrink-0"
      >
        <MainArrow20Icon />
      </Link>
    </section>
  );
};
