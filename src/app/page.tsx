import GameContainer from '../components/game/GameContainer';
import { db } from '../db';
import { characters } from '../db/schema';

export default async function Home() {
  const allCharacters = await db.select().from(characters);

  return <GameContainer characters={allCharacters} />;
}
