import { useRef } from 'react';
import { CameraIcon } from '@/shared/icons';
import { usePatchUserProfileImage } from '@/shared/hooks';

type AccountProfileImageProps = {
  profileImgUrl: string | null;
};

export const AccountProfileImage = ({
  profileImgUrl,
}: AccountProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadProfileImage, isPending } = usePatchUserProfileImage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // 같은 파일을 다시 골라도 change 이벤트가 나도록 입력값을 비웁니다.
    e.target.value = '';
    if (file) uploadProfileImage(file);
  };

  return (
    <div className="flex justify-center pt-7 pb-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <button
        type="button"
        className="relative"
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
        aria-label="프로필 이미지 변경"
      >
        <div className="bg-grey02 size-20 overflow-hidden rounded-full">
          {profileImgUrl ? (
            <img
              src={profileImgUrl}
              alt="프로필 이미지"
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full" />
          )}
        </div>
        <div className="absolute right-0 bottom-0 size-6 overflow-hidden rounded-full">
          <CameraIcon className="size-full" />
        </div>
      </button>
    </div>
  );
};
