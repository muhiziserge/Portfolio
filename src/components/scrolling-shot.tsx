"use client";

import { useRef, useState } from "react";

type ShotStyle = React.CSSProperties & {
  "--shot-distance"?: string;
  "--shot-duration"?: string;
};

const PX_PER_SECOND = 55;
const MIN_DURATION_S = 6;
const OVERFLOW_TOLERANCE_PX = 32;

export function ScrollingShot({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [scrollStyle, setScrollStyle] = useState<ShotStyle | null>(null);

  function handleLoad() {
    const img = imgRef.current;
    const frame = img?.parentElement;
    if (!img || !frame) return;

    const scaledHeight = (frame.clientWidth / img.naturalWidth) * img.naturalHeight;
    const distance = scaledHeight - frame.clientHeight;

    if (distance > OVERFLOW_TOLERANCE_PX) {
      const duration = Math.max(MIN_DURATION_S, distance / PX_PER_SECOND);
      setScrollStyle({
        height: `${scaledHeight}px`,
        "--shot-distance": `${distance}px`,
        "--shot-duration": `${duration}s`,
      });
    }
  }

  return (
    <div className={`shot-frame${scrollStyle ? " shot-frame-scroll" : " shot-frame-fit"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- needs raw naturalWidth/Height for the scroll-crop animation */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        style={scrollStyle ?? undefined}
        className="shot-img"
      />
    </div>
  );
}
