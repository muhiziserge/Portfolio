"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";
import type { QuiltImage } from "@/lib/projects";

const noopSubscribe = () => () => {};

// The tooltip portals into document.body, which doesn't exist during
// SSR — this resolves to false on the server and true once hydrated,
// without the extra render pass a mount-effect would cause.
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

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
const TOOLTIP_OFFSET_PX = 14;

// A span of N row-tracks renders as N*ROW_PX + (N-1)*GAP_PX tall — the
// grid's row gap compounds across every internal track boundary, not
// just between top-level items — so solve for N given the target height.
function rowSpanFor(ratio: number, colSpan: 1 | 2) {
  const cellWidth = colSpan * COLUMN_PX + (colSpan - 1) * GAP_PX;
  const desiredHeight = cellWidth / ratio;
  return Math.max(MIN_ROW_SPAN, Math.round((desiredHeight + GAP_PX) / (ROW_PX + GAP_PX)));
}

interface Pointer {
  // Viewport-relative (clientX/clientY) — matches the tooltip's own
  // position: fixed coordinate space once it's portaled to <body>.
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

function QuiltItem({ image }: { image: QuiltImage }) {
  const ratio = image.width / image.height;
  const isWide = ratio >= WIDE_RATIO;
  // Below the breakpoint where a second column actually fits, a "span 2"
  // item forces the grid to grow an implicit extra column sized to
  // whatever space is left over, distorting every track — so the
  // 2-column span only takes effect via a media query (see globals.css),
  // and both row-span variants are precomputed here since inline styles
  // can't be conditioned on a media query.
  const rowSpanNarrow = rowSpanFor(ratio, 1);
  const gridStyle = isWide
    ? ({
        "--row-narrow": rowSpanNarrow,
        "--row-wide": rowSpanFor(ratio, 2),
      } as CSSProperties)
    : { gridRow: `span ${rowSpanNarrow}` };

  const [pointer, setPointer] = useState<Pointer | null>(null);
  const [visible, setVisible] = useState(false);
  const hydrated = useHydrated();

  function trackPointer(e: MouseEvent<HTMLDivElement>) {
    setPointer({
      x: e.clientX,
      y: e.clientY,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    });
  }

  // Flip the tooltip to whichever side of the cursor has room, so it
  // never runs past the viewport edge.
  const tooltipStyle: CSSProperties = pointer
    ? {
        left: pointer.x,
        top: pointer.y,
        transform: `translate(${
          pointer.x > pointer.viewportWidth / 2
            ? `calc(-100% - ${TOOLTIP_OFFSET_PX}px)`
            : `${TOOLTIP_OFFSET_PX}px`
        }, ${
          pointer.y > pointer.viewportHeight / 2
            ? `calc(-100% - ${TOOLTIP_OFFSET_PX}px)`
            : `${TOOLTIP_OFFSET_PX}px`
        })`,
      }
    : { left: 0, top: 0, transform: `translate(${TOOLTIP_OFFSET_PX}px, ${TOOLTIP_OFFSET_PX}px)` };

  return (
    <div
      className={`quilt-item${isWide ? " wide" : ""}`}
      tabIndex={0}
      style={gridStyle}
      onMouseMove={trackPointer}
      onMouseEnter={(e) => {
        trackPointer(e);
        setVisible(true);
      }}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.title}
        sizes="(max-width: 720px) 100vw, 560px"
      />
      {hydrated &&
        createPortal(
          <div className={`quilt-tooltip${visible ? " visible" : ""}`} style={tooltipStyle}>
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </div>,
          document.body,
        )}
    </div>
  );
}

export function QuiltedGrid({ images }: { images: QuiltImage[] }) {
  return (
    <div className="quilt">
      {images.map((image) => (
        <QuiltItem image={image} key={image.src} />
      ))}
    </div>
  );
}
