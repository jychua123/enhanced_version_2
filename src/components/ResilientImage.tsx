import { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#ebf2f9] to-[#dce8f5] text-[#316aa1] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <CreditCard className="w-7 h-7 opacity-80" />
        <span className="text-xs font-medium text-[#1d4770]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
