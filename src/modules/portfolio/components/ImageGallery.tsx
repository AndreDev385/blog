import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   ImageGallery — Interactive gallery with grid
   thumbnails and full-screen lightbox slider.

   Intent: A potential client or recruiter
   reviewing case study evidence. They scan
   screenshots quickly and zoom in on details.
   The gallery should feel like an editorial
   showcase — calm, deliberate, no UI noise.

   Grid: responsive 1-3 columns with hover
   overlay (emerald gradient + expand icon).

   Lightbox: dark backdrop, centered image,
   keyboard nav, dot indicators, caption.

   Animation: enter via CSS fade+scale, image
   transitions via re-mount (key-based).
   ───────────────────────────────────────────── */

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // ── Keyboard navigation ─────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          close();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close, goNext, goPrev]);

  // ── Prevent body scroll while open ──────────
  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!images.length) return null;

  return (
    <div className={className}>
      {/* ════════════════════════════════════════
          GRID — Thumbnails
         ════════════════════════════════════════ */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-gray-50">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                loading={i < 3 ? "eager" : "lazy"}
              />
            </div>

            {/* Hover overlay — emerald gradient + expand icon */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-emerald-900/60 via-emerald-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                <Maximize2 className="size-5 text-emerald-700" />
              </div>
            </div>

            {/* Caption */}
            {img.caption && (
              <div className="border-t border-gray-50 px-4 py-2 text-left">
                <span className="text-xs text-gray-400">{img.caption}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════
          LIGHTBOX — Full-screen overlay slider
         ════════════════════════════════════════ */}
      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-50 flex animate-in fade-in duration-200 items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === backdropRef.current) close();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          {/* ── Close button ── */}
          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors duration-200 hover:bg-white/20 hover:text-white"
            aria-label="Close gallery"
          >
            <X className="size-5" />
          </button>

          {/* ── Counter ── */}
          <div className="absolute left-4 top-4 z-10 select-none rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
            {currentIndex + 1} / {images.length}
          </div>

          {/* ── Previous arrow ── */}
          {currentIndex > 0 && (
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/60 transition-all duration-200 hover:bg-white/20 hover:text-white md:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          {/* ── Next arrow ── */}
          {currentIndex < images.length - 1 && (
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/60 transition-all duration-200 hover:bg-white/20 hover:text-white md:right-4"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          {/* ── Image area ── */}
          <div className="flex max-h-[90vh] max-w-[95vw] flex-col items-center justify-center">
            <img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-h-[80vh] w-auto max-w-full animate-in fade-in zoom-in-95 duration-300 rounded-lg object-contain shadow-2xl"
            />

            {images[currentIndex].caption && (
              <span className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300 text-sm text-white/60">
                {images[currentIndex].caption}
              </span>
            )}
          </div>

          {/* ── Dots ── */}
          {images.length > 1 && (
            <div className="absolute bottom-4 flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/30 hover:bg-white/50",
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
