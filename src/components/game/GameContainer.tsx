'use client';

import { useState } from 'react';
import InteractiveImage from './InteractiveImage';
import TargetBox from './TargetBox';
import { Coordinate } from './types';

export default function GameContainer() {
  const [targetPos, setTargetPos] = useState<Coordinate | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleBackgroundClick = () => {
    if (targetPos) {
      setTargetPos(null);
      setFeedback(null);
    }
  };

  const handleImageClick = (coords: Coordinate) => {
    setTargetPos(coords);
    setFeedback(null);
  };

  const handleSelectCharacter = (characterId: string) => {
    console.log(`Selected character: ${characterId} at position: ${JSON.stringify(targetPos)}`);

    setFeedback(`Checking ${characterId}...`);

    setTargetPos(null);
  };

  const handleCloseBox = () => {
    setTargetPos(null);
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] p-8 cursor-pointer"
      onClick={handleBackgroundClick}
    >
      <div className="mb-8 text-center cursor-auto" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-3xl font-bold text-white">Where's Waldo?</h1>
        <p className="text-white">Click on the image to find characters!</p>

        {feedback && (
          <div className="mt-2 text-sm font-semibold text-[#0072F4] animate-pulse">
            {feedback}
          </div>
        )}
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <InteractiveImage onImageClick={handleImageClick}>
          {targetPos && (
            <TargetBox
              position={targetPos}
              onSelectCharacter={handleSelectCharacter}
              onClose={handleCloseBox}
            />
          )}
        </InteractiveImage>
      </div>

      <div className="mt-8 text-xs text-gray-400">
        Coords: {targetPos ? `X: ${targetPos.x.toFixed(1)}%, Y: ${targetPos.y.toFixed(1)}%` : 'No Selection'}
      </div>
    </div>
  );
}
