/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Endpoints relacionados con el perfil del usuario
 */

/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     summary: Obtener perfil del usuario actual
 *     description: Devuelve los datos del usuario autenticado junto con su historial de partidas.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: mateo@example.com
 *                 coins:
 *                   type: number
 *                   example: 1200
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       game:
 *                         type: string
 *                         example: Dices
 *                       result:
 *                         type: string
 *                         example: win
 *                       amount:
 *                         type: number
 *                         example: 200
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-08T19:15:00Z
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */

import express from "express";
import { getMyProfile, updateCoins } from "../controllers/profile.controller";
import { authenticate } from "../middlewares/auth";

export const profileRoutes = express.Router();

profileRoutes.get("/me", authenticate, getMyProfile);
profileRoutes.post("/update-coins", authenticate, updateCoins);