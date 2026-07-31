import Image from "next/image";
import type { MasonryImage } from "@/lib/projects";

export function MasonryGallery({ images }: { images: MasonryImage[] }) {
  return (
    <div className="masonry">
      {images.map((image) => (
        <div className="masonry-item" key={image.src} tabIndex={0}>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.title}
            sizes="(max-width: 720px) 100vw, 560px"
          />
          <div className="masonry-caption">
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
