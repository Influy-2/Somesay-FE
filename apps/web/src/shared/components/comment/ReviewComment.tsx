export interface ReviewCommentProps {
  nickname: string;
  isAgree: boolean;
  content: string;
  profileImg?: string;
}

export const ReviewComment = ({
  nickname,
  isAgree,
  content,
  profileImg,
}: ReviewCommentProps) => {
  const agreeLabel = isAgree ? '공감해요' : '반대해요';

  return (
    <div className="flex py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div
            className="bg-grey02 h-6 w-6 shrink-0 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            {profileImg && (
              <img
                src={profileImg}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <span className="caption1-m">{nickname}</span>
          <div
            className="border-grey03 flex items-center border px-2 py-0.5"
            aria-label={`반응: ${agreeLabel}`}
          >
            <span
              className="caption1-m text-grey08 text-center"
              aria-hidden="true"
            >
              {agreeLabel}
            </span>
          </div>
        </div>
        <p className="body2-m pl-8">{content}</p>
      </div>
    </div>
  );
};
