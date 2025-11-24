/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de usuario
 *     description: Crea un nuevo usuario con email y contraseña.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente.
 *       400:
 *         description: El usuario ya existe.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión
 *     description: Inicia sesión y devuelve un JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales inválidas.
 */

import express from "express";
import { register, login } from "../controllers/auth.controller";

export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
