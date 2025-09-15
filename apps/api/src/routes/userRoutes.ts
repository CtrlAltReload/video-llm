import { Router } from "express";
import User from "../models/User";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

router.get("/", async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
