import { Router } from "express";
import { z } from "zod";
import { register, login } from "../services/authService";

const router = Router();

router.post("/register", async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_input" });
    return;
  }
  const r = await register(parsed.data.email, parsed.data.password);
  if ("error" in r) {
    res.status(400).json(r);
    return;
  }
  res.json(r);
});

router.post("/login", async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_input" });
    return;
  }
  const r = await login(parsed.data.email, parsed.data.password);
  if ("error" in r) {
    res.status(401).json(r);
    return;
  }
  res.json(r);
});

export default router;

