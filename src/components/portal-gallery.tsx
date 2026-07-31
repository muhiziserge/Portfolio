"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

const AUTO_ADVANCE_MS = 5000;

export function PortalGallery({
  primary,
  carousel,
}: {
  primary: GalleryImage;
  carousel?: GalleryImage[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = carousel?.length ?? 0;

  useEffect(() => {
    if (!carousel || count < 2 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [carousel, count, paused]);

  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="gallery">
      <div className="gallery-primary">
        <Image
          src={primary.src}
          width={primary.width}
          height={primary.height}
          alt={primary.alt}
          sizes="(max-width: 900px) 100vw, 1120px"
        />
      </div>

      {carousel && carousel.length > 0 && (
        <div
          className="gallery-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="gallery-viewport">
            <div
              ref={trackRef}
              className="gallery-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {carousel.map((image) => (
                <div className="gallery-slide" key={image.src}>
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    sizes="(max-width: 900px) 100vw, 1120px"
                  />
                </div>
              ))}
            </div>
          </div>

          {count > 1 && (
            <div className="gallery-controls">
              <button
                type="button"
                className="gallery-arrow"
                aria-label="Previous image"
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
              >
                ←
              </button>
              <div className="gallery-dots">
                {carousel.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    className={`gallery-dot${i === index ? " active" : ""}`}
                    aria-label={`Show image ${i + 1} of ${count}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="gallery-arrow"
                aria-label="Next image"
                onClick={() => setIndex((i) => (i + 1) % count)}
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
