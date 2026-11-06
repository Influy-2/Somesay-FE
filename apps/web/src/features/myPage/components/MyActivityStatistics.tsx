// /my-page 상단 공감한 리뷰, 반대한 리뷰, 코멘트, 평가한 상품, 평가한 크리에이터 박스
import { Link } from 'react-router';

import { PATH } from '@/routes/path';
import { MainArrowIcon } from '@/shared/icons';

import type { MyPageResponse } from '@somesay/shared';

type MyActivityStatisticsProps = Pick<
  MyPageResponse,
  | 'userReactedProductCount'
  | 'userReactedCreatorCount'
  | 'userAgreeCount'
  | 'userDisagreeCount'
  | 'userCommentCount'
>;

const REVIEW_EVALUATION_PATH = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`;

export const MyActivityStatistics = ({
  userReactedProductCount,
  userReactedCreatorCount,
  userAgreeCount,
  userDisagreeCount,
  userCommentCount,
}: MyActivityStatisticsProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-2">
      {/* 1행: 공감한 리뷰 / 반대한 리뷰 / 코멘트 - col-span-2 */}
      <dl className="bg-grey01 col-span-2 flex py-4">
        <div className="flex flex-1 flex-col items-center gap-1">
          <dt className="body2-m text-grey08">공감한 리뷰</dt>
          <dd className="subhead-m">{userAgreeCount}</dd>
        </div>
        <div className="bg-grey03 w-px" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <dt className="body2-m text-grey08">반대한 리뷰</dt>
          <dd className="subhead-m">{userDisagreeCount}</dd>
        </div>
        <div className="bg-grey03 w-px" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <dt className="body2-m text-grey08">코멘트</dt>
          <dd className="subhead-m">{userCommentCount}</dd>
        </div>
      </dl>

      {/* 2행 왼쪽: 평가한 상품 */}
      <dl className="bg-grey01 flex flex-col gap-3 p-5">
        <dt className="body2-m text-grey08">평가한 상품</dt>
        <div className="flex items-center justify-between">
          <dd className="headline2 font-normal!">{userReactedProductCount}</dd>
          <Link
            to={REVIEW_EVALUATION_PATH}
            state={{ activeTab: 'products' }}
            aria-label="평가한 상품 목록으로 이동"
          >
            <MainArrowIcon className="text-grey08" />
          </Link>
        </div>
      </dl>

      {/* 2행 오른쪽: 평가한 크리에이터 */}
      <dl className="bg-grey01 flex flex-col gap-3 p-5">
        <dt className="body2-m text-grey08">평가한 크리에이터</dt>
        <div className="flex items-center justify-between">
          <dd className="headline2 font-normal!">{userReactedCreatorCount}</dd>
          <Link
            to={REVIEW_EVALUATION_PATH}
            state={{ activeTab: 'creators' }}
            aria-label="평가한 크리에이터 목록으로 이동"
          >
            <MainArrowIcon className="text-grey08" />
          </Link>
        </div>
      </dl>
    </div>
  );
};
