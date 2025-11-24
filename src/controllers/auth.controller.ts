import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../config/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({ email, passwordHash: hashedPassword });
    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        coins: user.coins,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};