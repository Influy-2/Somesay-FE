import { ShareIcon } from '@/shared/icons';
import cn from '@/utils/cn';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  ariaLabel?: string;
  className?: string;
  iconClassName?: string;
}

export const ShareButton = ({
  title,
  text,
  url,
  ariaLabel = '공유하기',
  className,
  iconClassName,
}: ShareButtonProps) => {
  const copyShareUrl = async (shareUrl: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleShare = async () => {
    const shareUrl = url ?? window.location.href;

    if (!navigator.share) {
      await copyShareUrl(shareUrl);
      return;
    }

    try {
      await navigator.share({
        title,
        ...(text ? { text } : {}),
        url: shareUrl,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      await copyShareUrl(shareUrl);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleShare()}
      aria-label={ariaLabel}
      className={cn(
        'flex cursor-pointer items-center justify-center',
        className
      )}
    >
      <ShareIcon aria-hidden="true" className={iconClassName} />
    </button>
  );
};
