import { pgTable, serial } from "drizzle-orm/pg-core";

export const test = pgTable("users", {
  id: serial("id").primaryKey(),
});
