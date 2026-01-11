'use client';

import { CHARACTERS, Character } from './types';

interface CharacterListProps {
  characters: Character[];
}

export default function CharacterList({ characters }: CharacterListProps) {
  const getImage = (name: string) => CHARACTERS.find(c => c.name === name)?.image || '';

  return (
    <div className="flex gap-6 p-4 rounded-xl pointer-events-auto">
      {characters.map((char) => (
        <div key={char.id} className="flex flex-col items-center group cursor-default">
          <div className="w-14 h-14 overflow-hidden  mb-2 group-hover:scale-110 transition-all duration-300">
            <img
              src={getImage(char.name)}
              alt={char.name}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <span className="text-white/90 text-[10px] font-bold uppercase tracking-wider group-hover:text-white transition-colors">
            {char.name}
          </span>
        </div>
      ))}
    </div>
  );
}
