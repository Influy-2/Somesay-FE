import { useRef } from 'react';
import { CameraIcon } from '@/shared/icons';

type AccountProfileImageProps = {
  profileImageUrl: string | null;
};

export const AccountProfileImage = ({
  profileImageUrl,
}: AccountProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // TODO: API 연결 후 업로드 로직 추가
      console.log(url);
    }
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
      >
        <div className="bg-grey02 size-20 overflow-hidden rounded-full">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
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
