interface RankingFeedbackProps {
  message: string;
  onRetry?: () => void;
}

/** 랭킹의 빈 목록과 조회 오류를 같은 형식으로 안내합니다. onRetry가 있으면 오류로 간주합니다. */
export const RankingFeedback = ({ message, onRetry }: RankingFeedbackProps) => (
  <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
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
