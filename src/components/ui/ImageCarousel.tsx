"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import basePath from "@/lib/basePath";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  autoPlayMs?: number;
}

export default function ImageCarousel({
  images,
  alt = "",
  autoPlayMs = 5000,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const multi = images.length > 1;

  // Drag state
  const dragRef = useRef({ startX: 0, currentX: 0, dragging: false });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (multi && autoPlayMs > 0) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, autoPlayMs);
    }
  }, [multi, autoPlayMs, images.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setContainerWidth(container.offsetWidth || 1);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((prev) => (prev + dir + images.length) % images.length);
      resetTimer();
    },
    [images.length, resetTimer],
  );

  // Pointer (mouse + touch) drag handlers
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!multi) return;
      dragRef.current = { startX: e.clientX, currentX: e.clientX, dragging: true };
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [multi],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.dragging) return;
      dragRef.current.currentX = e.clientX;
      const diff = e.clientX - dragRef.current.startX;
      setDragOffset(diff);
    },
    [],
  );

  const onPointerUp = useCallback(
    () => {
      if (!dragRef.current.dragging) return;
      dragRef.current.dragging = false;
      const diff = dragRef.current.currentX - dragRef.current.startX;

      // Threshold: 15% of container width
      if (Math.abs(diff) > containerWidth * 0.15) {
        go(diff < 0 ? 1 : -1);
      }
      setIsDragging(false);
      setDragOffset(0);
    },
    [containerWidth, go],
  );

  const translateX = -(current * 100) + (dragOffset / containerWidth) * 100;

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden bg-gray-50 select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ touchAction: multi ? "pan-y" : undefined }}
    >
      {/* Slides */}
      <div
        className={`flex h-full ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0">
            <Image
              src={`${basePath}${src}`}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(min-width: 768px) 70vw, 100vw"
              className="object-contain pointer-events-none"
              draggable={false}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      {multi && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition-opacity hover:bg-white"
            aria-label="Previous"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition-opacity hover:bg-white"
            aria-label="Next"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {multi && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); resetTimer(); }}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {multi && (
        <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 text-xs text-white backdrop-blur-sm">
          {current + 1}/{images.length}
        </span>
      )}
    </div>
  );
}
