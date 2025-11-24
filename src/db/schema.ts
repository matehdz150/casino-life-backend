import { pgTable, serial, text, integer, timestamp, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  coins: numeric("coins", { precision: 12, scale: 2 }).notNull().default("100"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gameRecords = pgTable("game_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  game: text("game").notNull(),
  result: text("result").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});