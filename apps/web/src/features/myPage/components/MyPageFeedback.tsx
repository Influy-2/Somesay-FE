interface MyPageFeedbackProps {
  message: string;
  onRetry?: () => void;
}

/**
 * 마이페이지 내 정보 조회 오류를 안내합니다. onRetry가 있으면 다시 시도 버튼을 보여줍니다.
 * features/ranking의 RankingFeedback과 같은 모양이지만 3번째 사용처가 생기기 전까지는 복제해 둡니다.
 */
export const MyPageFeedback = ({ message, onRetry }: MyPageFeedbackProps) => (
  <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
    <p className="body2-m text-grey06">{message}</p>

    {onRetry && (
      <button
        type="button"
        className="border-grey03 body2-sb border px-4 py-2 text-black"
        onClick={onRetry}
      >
        다시 시도
      </button>
    )}
  </div>
);
