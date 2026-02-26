export const ChipHomeProfile = ({ label }: { label: string }) => {
  return (
    <div className="bg-grey03 text-grey08 body2-sb inline-flex items-center justify-center gap-2.5 rounded-[1.25rem] px-2 py-[.1875rem] text-center text-xs leading-[140%] font-medium tracking-[-0.012px]">
      {label}
    </div>
  );
};
