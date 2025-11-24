import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.routes";
import { rankingRoutes } from "./routes/ranking.routes";
import { profileRoutes } from "./routes/profile.routes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger docs
setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/profile", profileRoutes); 

export default app;