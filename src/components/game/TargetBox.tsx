import { CHARACTERS, Coordinate } from './types';

interface TargetBoxProps {
  position: Coordinate;
  onSelectCharacter: (characterId: string) => void;
  onClose: () => void;
}

export default function TargetBox({ position, onSelectCharacter, onClose }: TargetBoxProps) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] border-4 border-[#FB2C36] shadow-lg bg-black/10 rounded-sm pointer-events-none" />

      <div className="absolute left-1/2 -translate-x-1/2 top-[40px] bg-[#0A0A0A] shadow-xl rounded-lg overflow-hidden flex flex-col min-w-[120px] pointer-events-auto">
        {CHARACTERS.map((char) => (
          <button
            key={char.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelectCharacter(char.id);
            }}
            className="px-4 py-2 hover:bg-[#1A1A1A] text-left text-sm font-medium text-white hover:text-[#0072F4] transition-colors border-b last:border-b-0 border-[#1A1A1A] cursor-pointer"
          >
            {char.name}
          </button>
        ))}
      </div>
    </div>
  );
}
