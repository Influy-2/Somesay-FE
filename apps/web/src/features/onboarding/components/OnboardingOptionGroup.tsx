import { FilterChip } from '@/shared/components';

interface OnboardingOptionGroupProps<T extends string> {
  title?: string;
  helperText?: string;
  options: ReadonlyArray<readonly [T, string]>;
  selectedValue: T | T[] | null;
  onSelect: (value: T) => void;
}

export const OnboardingOptionGroup = <T extends string>({
  title,
  helperText,
  options,
  selectedValue,
  onSelect,
}: OnboardingOptionGroupProps<T>) => (
  <section
    className="flex flex-col gap-3"
    aria-labelledby={title ? `${title}-title` : undefined}
  >
    {title && (
      <h2 id={`${title}-title`} className="body1-sb">
        {title}
      </h2>
    )}
    {helperText && <p className="body2-m text-grey06">{helperText}</p>}
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {options.map(([value, label]) => (
        <FilterChip
          key={value}
          label={label}
          isSelected={
            Array.isArray(selectedValue)
              ? selectedValue.includes(value)
              : selectedValue === value
          }
          onClick={() => onSelect(value)}
        />
      ))}
    </div>
  </section>
);
