'use server';

import { db } from '../db';
import { characters, players } from '../db/schema';
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
      return {
        success: true,
        message: `You found ${target.name}!`,
        foundLocation: { x: target.x, y: target.y }
      };
    } else {
      return { success: false, message: 'Not quite right. Keep looking!' };
    }
  } catch (error) {
    console.error('Validation error:', error);
    return { success: false, message: 'Something went wrong' };
  }
}

export async function submitScore(name: string, timeTaken: number) {
  try {
    const finishedAt = new Date();
    const startedAt = new Date(finishedAt.getTime() - timeTaken * 1000);

    await db.insert(players).values({
      name,
      time_taken: timeTaken,
      started_at: startedAt,
      finished_at: finishedAt,
      found_waldo: true,
      found_odlaw: true,
      found_wizard: true,
      found_wilma: true,
    });

    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    return { success: false, message: 'Failed to submit score' };
  }
}

export async function getLeaderboard() {
  try {
    const leaderboard = await db.query.players.findMany({
      where: (players, { isNotNull }) => isNotNull(players.time_taken),
      orderBy: (players, { asc }) => [asc(players.time_taken)],
    });

    return { success: true, data: leaderboard };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return { success: false, message: 'Failed to fetch leaderboard' };
  }
}
