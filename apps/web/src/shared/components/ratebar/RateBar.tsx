export interface RateBarProps {
  percentage: number;
  reversed?: boolean;
}

export const RateBar = ({ percentage, reversed = false }: RateBarProps) => {
  return (
    <div
      className="bg-grey02 mr-2 flex h-1.5"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`비율 ${percentage}%`}
    >
      {reversed ? (
        <>
          <div className="flex-1" />
          <div
            className="bg-grey08 h-full"
            style={{ width: `${percentage}%` }}
          />
        </>
      ) : (
        <div className="bg-grey08 h-full" style={{ width: `${percentage}%` }} />
      )}
    </div>
  );
};
