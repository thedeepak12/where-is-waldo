'use server';

import { db } from '../db';
import { characters } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function validateGuess(characterId: string, x: number, y: number) {
  try {
    const target = await db.query.characters.findFirst({
      where: eq(characters.id, characterId),
    });

    if (!target) {
      return { success: false, message: 'Character not found' };
    }

    const distance = Math.sqrt(
      Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2)
    );

    const THRESHOLD = 2;

    if (distance <= THRESHOLD) {
      return { success: true, message: `You found ${target.name}!` };
    } else {
      return { success: false, message: 'Not quite right. Keep looking!' };
    }
  } catch (error) {
    console.error('Validation error:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
