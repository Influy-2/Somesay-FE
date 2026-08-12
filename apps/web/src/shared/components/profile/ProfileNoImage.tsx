// Profile/기본 프로필 이미지
import ProfileNoImage1 from '@/shared/icons/ProfileNoImage1.svg?react';
import ProfileNoImage2 from '@/shared/icons/ProfileNoImage2.svg?react';
import ProfileNoImage3 from '@/shared/icons/ProfileNoImage3.svg?react';

const PROFILE_IMAGES = [ProfileNoImage1, ProfileNoImage2, ProfileNoImage3];

interface ProfileNoImageProps {
  userId: number;
  className?: string;
}

export const ProfileNoImage = ({ userId, className }: ProfileNoImageProps) => {
  const ProfileImage = PROFILE_IMAGES[userId % 3] ?? ProfileNoImage1;
  return <ProfileImage className={className} aria-hidden="true" />;
};
