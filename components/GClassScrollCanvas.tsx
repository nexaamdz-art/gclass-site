"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GClassScrollCanvasProps {
  currentFrameNumber: number;
}

const TOTAL_FRAMES = 240;
const BG_COLOR = "#ADADAF";

export default function GClassScrollCanvas({
  currentFrameNumber,
}: GClassScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Preload all 240 frames
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      if (isCancelled) return;
      loaded += 1;
      setLoadedCount(loaded);

      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    const handleImageError = () => {
      if (isCancelled) return;
      loaded += 1;
      setLoadedCount(loaded);
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/gclass-sequence/${i}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // ResizeObserver for canvas dimensions and high-DPI scaling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Draw frame with object-fit: contain (never cropped, pixel-perfect studio match)
  const drawFrame = useCallback(
    (frameIndex: number, forceRedraw = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      if (!forceRedraw && lastDrawnFrameRef.current === frameIndex) {
        return;
      }

      const { width, height } = dimensions;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetCanvasWidth = Math.floor(width * dpr);
      const targetCanvasHeight = Math.floor(height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Object-fit contain logic
      const imgWidth = img.naturalWidth || 1280;
      const imgHeight = img.naturalHeight || 720;
      const imgAspect = imgWidth / imgHeight;
      const containerAspect = width / height;

      let drawW: number;
      let drawH: number;

      if (containerAspect > imgAspect) {
        // Ultra-wide or landscape display
        drawH = height;
        drawW = height * imgAspect;
      } else {
        // Mobile portrait or square display
        drawW = width;
        drawH = width / imgAspect;
      }

      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2;

      // Fill canvas background with exact sampled studio pixel #ADADAF
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // High-DPI draw
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      ctx.restore();
      lastDrawnFrameRef.current = frameIndex;
    },
    [dimensions]
  );

  // Redraw when dimensions change
  useEffect(() => {
    if (isLoaded && dimensions.width > 0 && dimensions.height > 0) {
      const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameNumber - 1));
      drawFrame(frameIdx, true);
    }
  }, [dimensions, isLoaded, currentFrameNumber, drawFrame]);

  // Redraw on currentFrameNumber change
  useEffect(() => {
    if (isLoaded) {
      const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameNumber - 1));
      drawFrame(frameIdx, false);
    }
  }, [currentFrameNumber, isLoaded, drawFrame]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#ADADAF] flex items-center justify-center select-none"
    >
      {/* High-DPI Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full max-w-full max-h-full pointer-events-none"
      />

      {/* Loader: plain background #ADADAF, huge percentage number 0-100 in black #0A0A0A, small G63 */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-[#ADADAF] text-[#0A0A0A]"
          >
            {/* Small G63 */}
            <div className="font-condensed font-black text-xl sm:text-2xl tracking-tighter text-[#0A0A0A]">
              G63.
            </div>

            {/* Huge Percentage Number 0-100 */}
            <div className="flex items-center justify-center my-auto">
              <div className="font-condensed font-black text-8xl sm:text-[14rem] md:text-[18rem] lg:text-[22rem] leading-none tracking-tighter text-[#0A0A0A] tabular-nums select-none">
                {loadPercent}
              </div>
            </div>

            {/* Small indicator */}
            <div className="font-inter text-xs tracking-widest uppercase text-[#0A0A0A]/60">
              PRELOADING ASSETS [{loadedCount} / {TOTAL_FRAMES}]
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
