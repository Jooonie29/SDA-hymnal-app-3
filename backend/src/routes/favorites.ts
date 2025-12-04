import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { addFavorite, removeFavorite, listFavorites } from "../services/userDataService";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const schema = z.object({ songId: z.number() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_body" });
    return;
  }
  await addFavorite((req as any).userId, parsed.data.songId);
  res.json({ ok: true });
});

router.delete("/:songId", requireAuth, async (req, res) => {
  const songId = parseInt(req.params.songId, 10);
  await removeFavorite((req as any).userId, songId);
  res.json({ ok: true });
});

router.get("/", requireAuth, async (req, res) => {
  const list = await listFavorites((req as any).userId);
  res.json(list);
});

export default router;

