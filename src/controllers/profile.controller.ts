import { Response } from "express";
import { db } from "../config/db";
import { users, gameRecords } from "../db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { AuthRequest } from "../middlewares/auth";

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "No autorizado" });

    const [rawUser] = await db
      .select({
        id: users.id,
        email: users.email,
        coins: sql<string>`to_char(${users.coins}, 'FM999999999.00')`.as("coins"),
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, req.user.id));

    if (!rawUser) return res.status(404).json({ error: "Usuario no encontrado" });

    const user = {
      ...rawUser,
      coins: rawUser.coins,  // ← string exacto, NO Number()
    };

    const rawHistory = await db
      .select({
        id: gameRecords.id,
        game: gameRecords.game,
        result: gameRecords.result,
        amount: sql<string>`to_char(${gameRecords.amount}, 'FM999999999.00')`.as("amount"),
        createdAt: gameRecords.createdAt,
      })
      .from(gameRecords)
      .where(eq(gameRecords.userId, user.id))
      .orderBy(desc(gameRecords.createdAt));

    const history = rawHistory.map((h) => ({
      ...h,
      amount: h.amount, // ← string exacto
    }));

    return res.json({ user, history });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudo obtener el perfil" });
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

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.user.id));

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // NUMERIC → llega como string
    const currentCoins = Number(user.coins);

    // Calcular nuevo saldo
    let newCoins =
      result === "win"
        ? currentCoins + amount
        : Math.max(0, currentCoins - amount);

    // Redondeo con 2 decimales
    newCoins = Number(newCoins.toFixed(2));

    // Guardar nuevo balance — COMO STRING
    await db
      .update(users)
      .set({ coins: newCoins.toFixed(2) }) // 👈 OBLIGATORIO
      .where(eq(users.id, req.user.id));

    // Registrar historial — AMOUNT STRING
    await db.insert(gameRecords).values({
      userId: req.user.id,
      game,
      result,
      amount: amount.toFixed(2), // 👈 OBLIGATORIO
    });

    return res.json({
      message: "Monedas actualizadas correctamente",
      newBalance: newCoins,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar las monedas" });
  }
};
