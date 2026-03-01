// Chip/기본
export const ChipBasic = ({ label }: { label: string }) => {
  return (
    <div className="bg-grey02 text-grey08 inline-flex items-center justify-center gap-2.5 rounded-[1.25rem] px-2 py-[.1875rem] text-center text-xs leading-[140%] font-medium tracking-[-0.0008rem]">
      {label}
    </div>
  );
};
