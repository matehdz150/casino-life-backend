/**
 * @swagger
 * tags:
 *   name: Ranking
 *   description: Endpoints relacionados con el ranking de usuarios
 */

/**
 * @swagger
 * /api/ranking:
 *   get:
 *     summary: Obtener ranking de usuarios
 *     tags: [Ranking]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Cantidad de usuarios a mostrar
 *     responses:
 *       200:
 *         description: Lista de usuarios ordenada por cantidad de monedas
 *       500:
 *         description: Error del servidor
 */

import express from "express";
import { getRanking } from "../controllers/ranking.controller";

export const rankingRoutes = express.Router();

rankingRoutes.get("/", getRanking);