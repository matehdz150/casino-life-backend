import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://casino_admin:casino123@localhost:5432/casino_life',
});

export const db = drizzle(pool, { schema });