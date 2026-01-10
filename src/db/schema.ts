import { pgTable, uuid, text, real } from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  x: real("x").notNull(),
  y: real("y").notNull(),
})
