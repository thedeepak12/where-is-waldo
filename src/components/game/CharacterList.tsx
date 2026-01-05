'use client';

import { CHARACTERS } from './types';

export default function CharacterList() {
  return (
    <div className="flex gap-6 p-4 rounded-xl pointer-events-auto">
      {CHARACTERS.map((char) => (
        <div key={char.id} className="flex flex-col items-center group cursor-default">
          <div className="w-14 h-14 overflow-hidden  mb-2 group-hover:scale-110 transition-all duration-300">
            <img
              src={char.image}
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
