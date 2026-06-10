import { useMemo, useRef, useState } from 'react';

import { SendIcon } from '@/shared/icons';
import useAutoResizeTextArea from '@/shared/hooks/useAutoResizeTextarea';

import { createCommentSchema } from './CommentInput.schema';

interface CommentInputProps {
  profileImageSrc?: string;
  minLength?: number;
  maxLength?: number;
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export const CommentInput = ({
  profileImageSrc,
  minLength = 20,
  maxLength = 200,
  onSubmit,
  placeholder = '이 리뷰에 대한 의견을 남겨주세요',
}: CommentInputProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutoResizeTextArea(textareaRef, value);

  const schema = useMemo(() => createCommentSchema(minLength), [minLength]);

  const showSendButton = isFocused || value.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxLength) return;
    setError(null);
    setValue(e.target.value);
  };

  const handleSubmit = (e?: React.SubmitEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const result = schema.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? null);
      return;
    }
    setError(null);
    onSubmit?.(value);
    setValue('');
  };

  return (
    <div className="flex w-full items-start gap-2">
      {/* 프로필 이미지 */}
      <div
        className="bg-grey03 size-7 shrink-0 overflow-hidden rounded-full"
        aria-hidden
      >
        {profileImageSrc && (
          <img
            src={profileImageSrc}
            alt=""
            className="size-full object-cover"
          />
        )}
      </div>

      {/* 텍스트 입력 및 버튼 영역 */}
      <form className="flex flex-1 gap-2" onSubmit={handleSubmit}>
        {/* 텍스트 및 에러 메세지 */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="bg-grey01 flex flex-1 gap-2 px-3 py-2">
            <textarea
              ref={textareaRef}
              className="body2-m scrollbar-hide placeholder:text-grey06 h-fit max-h-25 w-full resize-none overflow-y-auto break-all text-black"
              placeholder={placeholder}
              rows={1}
              value={value}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-label="댓글 입력"
            />
            <div className="flex items-end justify-end gap-2">
              <span className="body2-m text-grey05">
                {value.length}/{maxLength}
              </span>
            </div>
          </div>
          {error && (
            <p className="body2-m text-error" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* 전송버튼 */}
        {showSendButton && (
          <button
            type="submit"
            aria-label="댓글 전송"
            className="cursor-pointer"
          >
            <SendIcon aria-hidden />
          </button>
        )}
      </form>
    </div>
  );
};
