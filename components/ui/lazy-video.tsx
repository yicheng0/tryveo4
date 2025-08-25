"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

export function LazyVideo({ src, className = "", poster }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        className="rounded-xl shadow-md w-full"
        muted
        playsInline
        poster={poster}
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        onPlay={() => setShowPlayButton(false)}
        onPause={() => setShowPlayButton(true)}
        onEnded={() => setShowPlayButton(true)}
      >
        {isIntersecting && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      
      {showPlayButton && isLoaded && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl transition-opacity hover:bg-black/30"
          aria-label="Play video"
        >
          <div className="bg-white/90 rounded-full p-4 shadow-lg hover:bg-white transition-colors">
            <Play className="h-8 w-8 text-gray-800 ml-1" fill="currentColor" />
          </div>
        </button>
      )}
      
      <div className="absolute inset-0 rounded-xl bg-background pointer-events-none" />
    </div>
  );
}