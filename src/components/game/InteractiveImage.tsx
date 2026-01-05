'use client';

import { MouseEvent, useRef } from 'react';
import { Coordinate } from './types';

interface InteractiveImageProps {
  children?: React.ReactNode;
  onImageClick: (coords: Coordinate) => void;
}

export default function InteractiveImage({ children, onImageClick }: InteractiveImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const constrainedX = Math.max(0, Math.min(100, xPercent));
    const constrainedY = Math.max(0, Math.min(100, yPercent));

    onImageClick({ x: constrainedX, y: constrainedY });
  };

  return (
    <div
      ref={imageRef}
      className="relative cursor-crosshair inline-block max-w-full overflow-hidden shadow-2xl rounded-xl border-[1.5px] border-[#1A1A1A] bg-[#1A1A1A]"
      onClick={handleClick}
    >
      <img
        src="/gameboard.jpg"
        alt="Game Board"
        className="w-full h-auto select-none pointer-events-none"
        draggable={false}
      />

      <div className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
