'use client';

import { useState } from 'react';
import InteractiveImage from './InteractiveImage';
import TargetBox from './TargetBox';
import CharacterList from './CharacterList';
import { validateGuess } from '@/app/actions';
import { Character, Coordinate } from './types';

interface GameContainerProps {
  characters: Character[];
}

export default function GameContainer({ characters }: GameContainerProps) {
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

  const handleSelectCharacter = async (characterId: string) => {
    console.log(`Selected character: ${characterId} at position: ${JSON.stringify(targetPos)}`);

    if (!targetPos) return;

    setFeedback(`Checking...`);

    try {
      const result = await validateGuess(characterId, targetPos.x, targetPos.y);
      setFeedback(result.message);
    } catch (error) {
      setFeedback("Error checking guess.");
    }

    setTargetPos(null);
  };

  const handleCloseBox = () => {
    setTargetPos(null);
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] p-8 cursor-pointer relative"
      onClick={handleBackgroundClick}
    >
      <div className="relative w-full max-w-[1200px] mb-8 flex items-center justify-center cursor-auto" onClick={(e) => e.stopPropagation()}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <CharacterList characters={characters} />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Where's Waldo?</h1>
          <p className="text-white">Click on the image to find characters!</p>

          {feedback && (
            <div className="mt-2 text-sm font-semibold text-[#0072F4] animate-pulse">
              {feedback}
            </div>
          )}
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <InteractiveImage onImageClick={handleImageClick}>
          {targetPos && (
            <TargetBox
              position={targetPos}
              onSelectCharacter={handleSelectCharacter}
              onClose={handleCloseBox}
              characters={characters}
            />
          )}
        </InteractiveImage>
      </div>
    </div>
  );
}
