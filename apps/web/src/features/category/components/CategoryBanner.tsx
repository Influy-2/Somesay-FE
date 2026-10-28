import { Link } from 'react-router';

interface CategoryBannerProps {
  imageSrc: string;
  alt: string;
  to: string;
}

export const CategoryBanner = ({ imageSrc, alt, to }: CategoryBannerProps) => {
  return (
    <Link to={to} className="block">
      <img src={imageSrc} alt={alt} className="w-full" />
    </Link>
  );
};
