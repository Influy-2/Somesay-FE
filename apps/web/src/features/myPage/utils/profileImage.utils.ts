import {
  PROFILE_IMAGE_MAX_FILE_BYTES,
  PROFILE_IMAGE_MAX_SIZE_PX,
  PROFILE_IMAGE_QUALITY,
} from '../constants/myPage.constants';

// 긴 변이 maxSize를 넘으면 비율을 유지해 줄인 크기를, 넘지 않으면 원래 크기를 돌려줍니다.
export const getResizedDimensions = (
  width: number,
  height: number,
  maxSize: number
) => {
  const longSide = Math.max(width, height);
  if (longSide <= maxSize) return { width, height };

  // 긴 변을 maxSize에 맞추는 비율을 양쪽에 똑같이 곱해 가로세로 비율을 지킵니다.
  const ratio = maxSize / longSide;
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
};

// 이미지 파일인지와 원본 용량을 검사합니다. 문제가 없으면 null, 있으면 안내 문구를 돌려줍니다.
export const validateProfileImageFile = (file: File) => {
  if (!file.type.startsWith('image/')) return '이미지 파일만 올릴 수 있어요.';
  if (file.size > PROFILE_IMAGE_MAX_FILE_BYTES) {
    return '20MB 이하의 이미지만 올릴 수 있어요.';
  }
  return null;
};

// 업로드 전에 이미지를 줄여 JPEG로 다시 만듭니다.
// 휴대폰 사진(수 MB)을 그대로 올리면 모바일 업로드가 느려서입니다.
// 브라우저가 디코딩하지 못하는 형식(일부 HEIC 등)이거나 실패하면 원본을 그대로 돌려줘 업로드 자체는 막지 않습니다.
export const resizeProfileImage = async (file: File): Promise<File> => {
  // 디코딩 실패는 업로드를 막을 이유가 아니므로 원본으로 진행합니다.
  let bitmap: ImageBitmap;
  try {
    // 휴대폰 세로 사진이 눕지 않도록 EXIF 방향을 반영합니다.
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    return file;
  }

  try {
    const { width, height } = getResizedDimensions(
      bitmap.width,
      bitmap.height,
      PROFILE_IMAGE_MAX_SIZE_PX
    );

    // 이미 충분히 작은 JPEG는 재인코딩하면 화질만 깎이므로 그대로 둡니다.
    const isAlreadySmall = width === bitmap.width && height === bitmap.height;
    if (isAlreadySmall && file.type === 'image/jpeg') return file;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) return file;
    // JPEG는 투명도를 지원하지 않아 투명 영역이 검게 칠해지므로 흰 바탕을 먼저 깝니다.
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', PROFILE_IMAGE_QUALITY);
    });
    if (!blob) return file;

    // 작은 PNG 등은 JPEG로 바꾸면 오히려 커질 수 있어, 커졌다면 원본을 씁니다.
    if (blob.size >= file.size) return file;

    // 서버가 확장자로도 형식을 판단할 수 있도록 이름을 .jpg로 맞춥니다.
    const baseName = file.name.replace(/\.[^.]+$/, '');
    const fileName =
      baseName && file.name.includes('.') ? `${baseName}.jpg` : 'profile.jpg';
    return new File([blob], fileName, { type: 'image/jpeg' });
  } finally {
    // 디코딩된 비트맵은 메모리를 잡고 있으므로 어느 경로로 끝나든 해제합니다.
    bitmap.close();
  }
};
