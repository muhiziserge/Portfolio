"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

const TOOLTIP_OFFSET_PX = 14;
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

interface Pointer {
  // Viewport-relative (clientX/clientY) — matches the tooltip's own
  // position: fixed coordinate space once it's portaled to <body>.
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

/**
 * Drives a small glass tooltip that follows the cursor over an element,
 * portaled to <body> so it escapes any ancestor's overflow: hidden and
 * renders above everything else on the page. Spread `bind` onto the
 * hoverable element, then call `renderTooltip(content)` as a sibling.
 */
export function usePointerTooltip() {
  const [pointer, setPointer] = useState<Pointer | null>(null);
  const [visible, setVisible] = useState(false);
  const hydrated = useHydrated();

  function trackPointer(e: MouseEvent<HTMLElement>) {
    setPointer({
      x: e.clientX,
      y: e.clientY,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    });
  }

  const bind = {
    tabIndex: 0,
    onMouseMove: trackPointer,
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      trackPointer(e);
      setVisible(true);
    },
    onMouseLeave: () => setVisible(false),
    onFocus: () => setVisible(true),
    onBlur: () => setVisible(false),
  };

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

  function renderTooltip(content: ReactNode) {
    if (!hydrated) return null;
    return createPortal(
      <div className={`quilt-tooltip${visible ? " visible" : ""}`} style={tooltipStyle}>
        {content}
      </div>,
      document.body,
    );
  }

  return { bind, renderTooltip };
}
