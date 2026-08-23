import { useState } from 'react';

import cn from '@/utils/cn';

interface LoadingImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  loading?: 'lazy' | 'eager';
}

export const LoadingImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  loading = 'lazy',
}: LoadingImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const isLoaded = loadedSrc === src;
  const hasFailed = !src || failedSrc === src;

  return (
    <div className={cn('bg-grey01 relative overflow-hidden', wrapperClassName)}>
      {!isLoaded && !hasFailed && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          role="status"
          aria-label="사진을 불러오는 중"
        >
          <span className="border-grey03 border-t-primary-400 size-6 animate-spin rounded-full border-2" />
        </div>
      )}

      {src && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
          className={cn(
            'transition-opacity duration-300 motion-reduce:transition-none',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  );
};
