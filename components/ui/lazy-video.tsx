"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export function LazyVideo({ src, className = "", poster, autoPlay = false, loop = false }: LazyVideoProps) {
  return (
    <div className={`relative ${className}`}>
      <video
        className="rounded-xl shadow-md w-full"
        src={src}
        autoPlay={autoPlay}
        muted
        playsInline
        loop={loop}
        poster={poster}
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}