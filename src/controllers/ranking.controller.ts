import { Request, Response } from "express";
import { db } from "../config/db";
import { users } from "../db/schema";
import { asc, desc } from "drizzle-orm";

export const getRanking = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit ?? "10"), 10) || 10, 100);

    const top = await db
      .select({
        id: users.id,
        email: users.email,
        coins: users.coins,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.coins), asc(users.createdAt))
      .limit(limit);

    res.json({ count: top.length, results: top });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo obtener el ranking" });
  }
};