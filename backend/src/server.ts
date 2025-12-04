import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi.json";
import authRoutes from "./routes/auth";
import songRoutes from "./routes/songs";
import searchRoutes from "./routes/search";
import favoritesRoutes from "./routes/favorites";
import historyRoutes from "./routes/history";
import syncRoutes from "./routes/sync";
import catalogRoutes from "./routes/catalog";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/songs", songRoutes);
app.use("/search", searchRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/history", historyRoutes);
app.use("/sync", syncRoutes);
app.use("/", catalogRoutes);

export default app;
