import { Response } from "express";
import { db } from "../config/db";
import { users, gameRecords } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { AuthRequest } from "../middlewares/auth";

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "No autorizado" });

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        coins: users.coins,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, req.user.id));

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const history = await db
      .select({
        id: gameRecords.id,
        game: gameRecords.game,
        result: gameRecords.result,
        amount: gameRecords.amount,
        createdAt: gameRecords.createdAt,
      })
      .from(gameRecords)
      .where(eq(gameRecords.userId, user.id))
      .orderBy(desc(gameRecords.createdAt));

    res.json({
      user,
      history,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo obtener el perfil" });
  }
};


export const updateCoins = async (req: AuthRequest, res: Response) => {
  try {
    const { game, result, amount } = req.body;

    if (!game || !result || typeof amount !== "number") {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const [user] = await db.select().from(users).where(eq(users.id, req.user.id));
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const newCoins =
      result === "win"
        ? user.coins + amount   // suma solo lo ganado
        : Math.max(0, user.coins - amount); // resta solo lo perdido

    await db.update(users).set({ coins: newCoins }).where(eq(users.id, req.user.id));

    await db.insert(gameRecords).values({
      userId: req.user.id,
      game,
      result,
      amount,
    });

    res.json({
      message: "Monedas actualizadas correctamente",
      newBalance: newCoins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar las monedas" });
  }
};