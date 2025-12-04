import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getTOC } from "../services/songService";

const router = Router();

router.get("/local", requireAuth, async (_req, res) => {
  const songs = await getTOC();
  res.json({ songs });
});

export default router;

