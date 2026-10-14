import { useEffect, useRef, useState } from 'react';
import { CameraIcon } from '@/shared/icons';
import { usePatchUserProfileImage } from '@/shared/hooks';
import { useSnackbarStore } from '@/shared/stores';
import {
  resizeProfileImage,
  validateProfileImageFile,
} from '../utils/profileImage.utils';

type AccountProfileImageProps = {
  profileImgUrl: string | null;
};

export const AccountProfileImage = ({
  profileImgUrl,
}: AccountProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadProfileImage, isPending } = usePatchUserProfileImage();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  // 서버 응답 전에 고른 사진을 보여주기 위한 임시 object URL입니다.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 축소하는 동안에도 중복 선택을 막기 위한 상태입니다.
  const [isPreparing, setIsPreparing] = useState(false);

  // object URL은 직접 해제해야 메모리가 남지 않습니다.
  // previewUrl이 바뀔 때 이전 URL의 정리 함수가 먼저 돌아 이전 값도 함께 해제되고, 언마운트 때는 남은 값이 해제됩니다.
  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl]
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // 같은 파일을 다시 골라도 change 이벤트가 나도록 입력값을 비웁니다.
    e.target.value = '';
    if (!file) return;

    // 이미지가 아니거나 너무 큰 파일은 업로드 전에 안내하고 멈춥니다.
    const errorMessage = validateProfileImageFile(file);
    if (errorMessage) {
      showSnackbar(errorMessage, { variant: 'error' });
      return;
    }

    setIsPreparing(true);
    try {
      // 서버 응답 전에 고른 사진을 바로 보여줍니다.
      setPreviewUrl(URL.createObjectURL(file));
      // 모바일 업로드가 느려지지 않도록 줄인 파일을 올리고, 끝나면 미리보기를 지웁니다.
      const resized = await resizeProfileImage(file);
      uploadProfileImage(resized, { onSettled: () => setPreviewUrl(null) });
    } catch {
      // 축소나 업로드 호출이 던진 예외로 미리보기가 남지 않도록 걷고 실패를 알립니다.
      setPreviewUrl(null);
      showSnackbar(
        '프로필 이미지를 변경하지 못했어요. 잠시 후 다시 시도해 주세요.',
        { variant: 'error' }
      );
    } finally {
      setIsPreparing(false);
    }
  };

  const displayUrl = previewUrl ?? profileImgUrl;

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
        disabled={isPending || isPreparing}
        aria-busy={isPending || isPreparing}
        aria-label="프로필 이미지 변경"
      >
        <div className="bg-grey02 size-20 overflow-hidden rounded-full">
          {displayUrl ? (
            <img
              src={displayUrl}
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
