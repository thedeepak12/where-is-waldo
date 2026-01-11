import "dotenv/config";
import { db } from '../db';
import { characters } from './schema';

async function seed() {
  console.log('Seeding...');
  await db.insert(characters).values({
    name: 'Waldo',
    x: 62.8,
    y: 36.4,
  });
  await db.insert(characters).values({
    name: 'Wilma',
    x: 78.6,
    y: 39.2,
  });
  await db.insert(characters).values({
    name: 'Wizard',
    x: 26.7,
    y: 34.0,
  });
  await db.insert(characters).values({
    name: 'Odlaw',
    x: 9.6,
    y: 34.0,
  });
  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
