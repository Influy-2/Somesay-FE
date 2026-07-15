import { Link } from 'react-router';
import { MainArrowIcon } from '@/shared/icons';
import { PATH } from '@/routes/path';

interface MyPageDashboardProps {
  agreedReviews: number;
  disagreedReviews: number;
  comments: number;
  evaluatedProducts: number;
  evaluatedCreators: number;
}

export const MyPageDashboard = ({
  agreedReviews,
  disagreedReviews,
  comments,
  evaluatedProducts,
  evaluatedCreators,
}: MyPageDashboardProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-1">
      {/* 1행: 공감한 리뷰 / 반대한 리뷰 / 코멘트 - col-span-2 */}
      <div className="bg-grey01 col-span-2 flex py-4">
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="body2-m text-grey08">공감한 리뷰</span>
          <span className="subhead-m">{agreedReviews}</span>
        </div>
        <div className="bg-grey03 w-px" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="body2-m text-grey08">반대한 리뷰</span>
          <span className="subhead-m">{disagreedReviews}</span>
        </div>
        <div className="bg-grey03 w-px" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="body2-m text-grey08">코멘트</span>
          <span className="subhead-m">{comments}</span>
        </div>
      </div>

      {/* 2행 왼쪽: 평가한 상품 */}
      <div className="bg-grey01 flex flex-col gap-3 p-5">
        <span className="body2-m text-grey08">평가한 상품</span>
        <div className="flex items-center justify-between">
          <span className="headline2 font-normal!">{evaluatedProducts}</span>
          <Link
            to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`}
            state={{ activeTab: 'products' }}
            aria-label="평가한 상품 목록으로 이동"
          >
            <MainArrowIcon className="text-grey08" />
          </Link>{' '}
        </div>
      </div>

      {/* 2행 오른쪽: 평가한 크리에이터 */}
      <div className="bg-grey01 flex flex-col gap-3 p-5">
        <span className="body2-m text-grey08">평가한 크리에이터</span>
        <div className="flex items-center justify-between">
          <span className="headline2 font-normal!">{evaluatedCreators}</span>
          <Link
            to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`}
            state={{ activeTab: 'creators' }}
            aria-label="평가한 크리에이터 목록으로 이동"
          >
            <MainArrowIcon className="text-grey08" />
          </Link>
        </div>
      </div>
    </div>
  );
};
