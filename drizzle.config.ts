import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "casino_admin",
    password: "casino123",
    database: "casino_life",
    ssl: false,
  },
} satisfies Config;