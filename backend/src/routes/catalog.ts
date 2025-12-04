import { Router } from "express";
import { getTOC, getIndex } from "../services/songService";

const router = Router();

router.get("/toc", async (_req, res) => {
  const list = await getTOC();
  res.json(list);
});

router.get("/index", async (_req, res) => {
  const list = await getIndex();
  res.json(list);
});

export default router;

