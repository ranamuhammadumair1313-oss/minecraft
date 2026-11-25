import React, { useState } from 'react';
import { STUDIO_ARTWORK } from '../data/assets';
import { MinecraftSprite } from './MinecraftSprites';

interface ArtworkBannerProps {
  artworkKey: keyof typeof STUDIO_ARTWORK;
  className?: string;
  overlayScrim?: boolean;
}

export const ArtworkBanner: React.FC<ArtworkBannerProps> = ({
  artworkKey,
  className = '',
  overlayScrim = true,
}) => {
  const [failed, setFailed] = useState(false);
  const art = STUDIO_ARTWORK[artworkKey];

  if (failed) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#0B2419] via-[#0D1311] to-[#07090A] flex items-center justify-center ${className}`}
      >
        <div className="flex flex-col items-center gap-2 text-center p-6">
          <MinecraftSprite sprite="emerald" size={40} />
          <span className="text-xs font-medium text-emerald-300">{art.caption}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#0B0F0D] ${className}`}>
      <img
        src={art.src}
        alt={art.alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
      {overlayScrim && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#07090A] via-[#07090A]/45 to-transparent"
        />
      )}
    </div>
  );
};
