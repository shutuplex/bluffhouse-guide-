import { useState } from 'react';
import { ImageOff, Film } from 'lucide-react';

export default function MediaPreview({
  src,
  alt = 'Media preview',
  className = '',
  isVideo = false,
  aspectRatio = 'aspect-[4/3]',
  showBadge = true
}) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const checkVideo = isVideo || (typeof src === 'string' && (src.endsWith('.mp4') || src.endsWith('.webm')));

  if (!src || hasError) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-zinc-900/80 border border-white/10 text-zinc-400 ${aspectRatio} ${className}`}>
        <ImageOff className="w-6 h-6 text-zinc-500 stroke-[1.5]" />
        <span className="text-[10px] font-mono mt-1 text-zinc-500">No Preview</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-black/50 ${aspectRatio} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border border-white/20 border-t-white animate-spin" />
        </div>
      )}

      {checkVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          referrerPolicy="no-referrer"
          onLoadedData={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-300 ${loaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'}`}
        />
      )}

      {checkVideo && showBadge && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-200 flex items-center gap-1 shadow-sm">
          <Film className="w-2.5 h-2.5 text-white" />
          <span>CLIP</span>
        </div>
      )}
    </div>
  );
}
