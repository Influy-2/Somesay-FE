/* InputField */

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  errorMessage?: string;
}

export const InputField = ({
  value,
  onChange,
  placeholder,
  maxLength,
  errorMessage,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="bg-grey01 flex items-center justify-between px-3 py-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className="body2-m placeholder:text-grey06 w-full bg-transparent outline-none"
        />
        {maxLength && (
          <span className="caption1-m text-grey05 shrink-0">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {errorMessage && <p className="body2-m text-red-500">{errorMessage}</p>}
    </div>
  );
};
