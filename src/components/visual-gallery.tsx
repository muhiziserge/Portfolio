"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollingShot } from "@/components/scrolling-shot";
import { usePointerTooltip } from "@/hooks/use-pointer-tooltip";
import type { VisualImage } from "@/lib/projects";

const CLOSE_MS = 200;

function VisualTile({ item, onOpen }: { item: VisualImage; onOpen: () => void }) {
  const { bind, renderTooltip } = usePointerTooltip();

  return (
    <div className="visual-tile" onClick={onOpen} {...bind}>
      <ScrollingShot src={item.src} alt={item.alt} />
      {renderTooltip(<p>{item.alt}</p>)}
    </div>
  );
}

function Lightbox({
  item,
  closing,
  onClose,
}: {
  item: VisualImage;
  closing: boolean;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const visible = shown && !closing;

  return createPortal(
    <div className={`lightbox${visible ? " visible" : ""}`} onClick={onClose}>
      <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- needs its natural aspect ratio, not next/image's fixed-box sizing */}
        <img src={item.src} alt={item.alt} className="lightbox-img" />
        <p className="lightbox-caption">{item.alt}</p>
      </div>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>,
    document.body,
  );
}

export function VisualGallery({ items }: { items: VisualImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);

  function open(index: number) {
    setOpenIndex(index);
    setClosing(false);
  }

  function close() {
    setClosing(true);
    setTimeout(() => setOpenIndex(null), CLOSE_MS);
  }

  return (
    <>
      <div className="shot-grid">
        {items.map((item, index) => (
          <VisualTile key={item.src} item={item} onOpen={() => open(index)} />
        ))}
      </div>
      {openIndex !== null && (
        <Lightbox item={items[openIndex]} closing={closing} onClose={close} />
      )}
    </>
  );
}
