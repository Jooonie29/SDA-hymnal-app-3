import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { addHistory, listHistory } from "../services/userDataService";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const schema = z.object({ songId: z.number(), viewedAt: z.string() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_body" });
    return;
  }
  await addHistory((req as any).userId, parsed.data.songId, new Date(parsed.data.viewedAt));
  res.json({ ok: true });
});

router.get("/", requireAuth, async (req, res) => {
  const list = await listHistory((req as any).userId);
  res.json(list);
});

export default router;

