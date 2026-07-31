import Image from "next/image";
import type { CSSProperties } from "react";
import type { QuiltImage } from "@/lib/projects";

// Matches the grid's own sizing (globals.css): a column is COLUMN_PX
// wide, rows advance in ROW_PX increments. Spans are derived from each
// image's real aspect ratio so a tall phone screenshot and a wide
// dashboard screenshot both get a proportionate cell instead of being
// squeezed into a uniform column.
const COLUMN_PX = 220;
const GAP_PX = 12;
const ROW_PX = 8;
const WIDE_RATIO = 1.1;
const MIN_ROW_SPAN = 6;

// A span of N row-tracks renders as N*ROW_PX + (N-1)*GAP_PX tall — the
// grid's row gap compounds across every internal track boundary, not
// just between top-level items — so solve for N given the target height.
function rowSpanFor(ratio: number, colSpan: 1 | 2) {
  const cellWidth = colSpan * COLUMN_PX + (colSpan - 1) * GAP_PX;
  const desiredHeight = cellWidth / ratio;
  return Math.max(MIN_ROW_SPAN, Math.round((desiredHeight + GAP_PX) / (ROW_PX + GAP_PX)));
}

export function QuiltedGrid({ images }: { images: QuiltImage[] }) {
  return (
    <div className="quilt">
      {images.map((image) => {
        const ratio = image.width / image.height;
        const isWide = ratio >= WIDE_RATIO;
        // Below the breakpoint where a second column actually fits, a
        // "span 2" item forces the grid to grow an implicit extra column
        // sized to whatever space is left over, distorting every track —
        // so the 2-column span only takes effect at --quilt-wide-bp
        // (see globals.css), and both row-span variants are precomputed
        // here since inline styles can't be conditioned on a media query.
        const rowSpanNarrow = rowSpanFor(ratio, 1);
        const style = isWide
          ? ({
              "--row-narrow": rowSpanNarrow,
              "--row-wide": rowSpanFor(ratio, 2),
            } as CSSProperties)
          : { gridRow: `span ${rowSpanNarrow}` };

        return (
          <div
            className={`quilt-item${isWide ? " wide" : ""}`}
            key={image.src}
            tabIndex={0}
            style={style}
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.title}
              sizes="(max-width: 720px) 100vw, 560px"
            />
            <div className="quilt-caption">
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
