import { useState, useRef, useEffect } from 'react';
import { ImageOff, Film, Play } from 'lucide-react';

export default function MediaPreview({
  src,
  alt = 'Media preview',
  className = '',
  isVideo = false,
  aspectRatio = 'aspect-[4/3]',
  showBadge = true
}) {
  const [hasError, setHasError] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  const cleanSrc = typeof src === 'string' ? src.trim() : '';
  const isVideoFormat = isVideo || (cleanSrc && /\.(mp4|webm|ogg|mov)($|\?|#)/i.test(cleanSrc));

  // Reset states if src changes
  useEffect(() => {
    setHasError(false);
    setVideoFailed(false);
    setLoaded(false);
  }, [cleanSrc]);

  // Set DOM muted property whenever ref attaches or src updates
  const setVideoRef = (node) => {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      // Safely attempt autoplay
      const playPromise = node.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback until user interaction - normal in browsers
        });
      }
    }
  };

  if (!cleanSrc || hasError) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-zinc-900/80 border border-white/10 text-zinc-400 ${aspectRatio} ${className}`}>
        <ImageOff className="w-6 h-6 text-zinc-500 stroke-[1.5]" />
        <span className="text-[10px] font-mono mt-1 text-zinc-500">No Preview</span>
      </div>
    );
  }

  // Fallback if video codec or network stream fails inline
  if (isVideoFormat && videoFailed) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-zinc-950/80 border border-purple-500/20 text-zinc-300 ${aspectRatio} ${className} group`}>
        <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-1 group-hover:scale-110 transition-transform shadow-lg">
          <Play className="w-4 h-4 fill-purple-300 ml-0.5" />
        </div>
        <span className="text-[10px] font-mono font-semibold text-purple-200">Mythic Clip</span>
        <span className="text-[9px] font-mono text-zinc-500 mt-0.5">Tap to inspect</span>
        {showBadge && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-purple-950/80 backdrop-blur-md border border-purple-500/30 text-[10px] font-mono text-purple-200 flex items-center gap-1 shadow-sm">
            <Film className="w-2.5 h-2.5 text-purple-300" />
            <span>CLIP</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-black/60 ${aspectRatio} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center z-10">
          <div className="w-5 h-5 rounded-full border border-white/20 border-t-white animate-spin" />
        </div>
      )}

      {isVideoFormat ? (
        <video
          ref={setVideoRef}
          src={cleanSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setLoaded(true)}
          onCanPlay={() => setLoaded(true)}
          onLoadedData={() => setLoaded(true)}
          onError={() => setVideoFailed(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <img
          src={cleanSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-300 ${loaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'}`}
        />
      )}

      {isVideoFormat && showBadge && !videoFailed && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-200 flex items-center gap-1 shadow-sm pointer-events-none">
          <Film className="w-2.5 h-2.5 text-purple-300" />
          <span>CLIP</span>
        </div>
      )}
    </div>
  );
}
