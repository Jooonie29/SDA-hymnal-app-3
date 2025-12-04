import { Router } from "express";
import { z } from "zod";
import { searchTitle, searchLyrics, searchAdvanced, headlineSnippet } from "../services/songService";

const router = Router();

router.get("/", async (req, res) => {
  const schema = z.object({ q: z.string().min(1), type: z.enum(["title", "lyrics", "advanced", "all"]) });
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_query" });
    return;
  }
  const { q, type } = parsed.data;
  if (type === "title") {
    const r = await searchTitle(q);
    res.json(r);
    return;
  }
  if (type === "lyrics") {
    const r = await searchLyrics(q);
    const results = await Promise.all(
      r.map(async (s) => ({ id: s.id, hymn_number: s.hymn_number, title: s.title, snippet: await headlineSnippet(q, s.lyrics) }))
    );
    res.json(results);
    return;
  }
  if (type === "advanced") {
    const r = await searchAdvanced(q);
    const results = await Promise.all(
      r.map(async (s) => ({ id: s.id, hymn_number: s.hymn_number, title: s.title, snippet: await headlineSnippet(q, s.lyrics) }))
    );
    res.json(results);
    return;
  }
  const rt = await searchTitle(q);
  const rl = await searchLyrics(q);
  const merged = await Promise.all(
    rl.map(async (s) => ({ id: s.id, hymn_number: s.hymn_number, title: s.title, snippet: await headlineSnippet(q, s.lyrics) }))
  );
  res.json({ title: rt, lyrics: merged });
});

export default router;

