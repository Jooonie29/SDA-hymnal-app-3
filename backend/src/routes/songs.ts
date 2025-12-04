import { Router } from "express";
import { z } from "zod";
import { getSongById, getSongByNumber } from "../services/songService";

const router = Router();

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const song = await getSongById(id);
  if (!song) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.json(song);
});

router.get("/", async (req, res) => {
  const schema = z.object({ number: z.string() });
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_query" });
    return;
  }
  const num = parseInt(parsed.data.number, 10);
  const song = await getSongByNumber(num);
  if (!song) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.json(song);
});

export default router;
