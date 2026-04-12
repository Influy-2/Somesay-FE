export interface RateBarProps {
  percentage: number;
}

export const RateBar = ({ percentage }: RateBarProps) => {
  return (
    <div
      className="bg-grey02 mr-2 h-1.5"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`비율 ${percentage}%`}
    >
      <div className="bg-grey08 h-full" style={{ width: `${percentage}%` }} />
    </div>
  );
};
