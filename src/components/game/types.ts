export type Coordinate = {
  x: number;
  y: number;
};

export type GameState = {
  isTargeting: boolean;
  targetPosition: Coordinate | null;
  foundCharacters: string[];
};

export const CHARACTERS = [
  { id: 'waldo', name: 'Waldo' },
  { id: 'wizard', name: 'Wizard' },
  { id: 'odlaw', name: 'Odlaw' },
  { id: 'wilma', name: 'Wilma' },
];
