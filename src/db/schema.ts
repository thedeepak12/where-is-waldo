import { pgTable, uuid, text, real, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  x: real("x").notNull(),
  y: real("y").notNull(),
});

export const players = pgTable("players", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  found_waldo: boolean("found_waldo").default(false).notNull(),
  found_odlaw: boolean("found_odlaw").default(false).notNull(),
  found_wizard: boolean("found_wizard").default(false).notNull(),
  found_wilma: boolean("found_wilma").default(false).notNull(),
  started_at: timestamp("started_at").defaultNow().notNull(),
  finished_at: timestamp("finished_at"),
  time_taken: integer("time_taken"),
});
