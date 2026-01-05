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
  { id: 'waldo', name: 'Waldo', image: '/waldo.jpg' },
  { id: 'wilma', name: 'Wilma', image: '/wilma.jpg' },
  { id: 'wizard', name: 'Wizard', image: '/wizard.jpg' },
  { id: 'odlaw', name: 'Odlaw', image: '/odlaw.jpg' },
];
