import { Router } from "express";
import { googleAuth, googleAuthCallback, refreshToken, getAuthStatus, logout} from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/google", googleAuth);

router.get("/google/redirect", googleAuthCallback);

router.post("/refresh", refreshToken);

router.get("/status", verifyToken, getAuthStatus);

router.post("/logout", verifyToken, logout);

export default router;
