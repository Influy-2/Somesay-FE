// 컴포넌트 Box/피부타입 Box/공감비율
export const SummaryBox = ({
  boldText,
  plainText,
}: {
  boldText: string;
  plainText: string;
}) => {
  return (
    <div className="border-grey03 flex w-full items-start border border-solid bg-white p-5">
      <span className="text-grey08 body2-m">
        <strong className="text-[1rem] font-bold text-black">{boldText}</strong>
        {plainText}
      </span>
    </div>
  );
};
