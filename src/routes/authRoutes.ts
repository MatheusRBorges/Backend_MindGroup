import { authenticateToken } from "../middlewares/authMiddleware";
import { Router } from "express";
import { register, login, forgotPassword } from "../controllers/auth.controller";
import { profile } from "../controllers/auth.controller";


const router = Router();


router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

router.get("/profile", authenticateToken, profile);

export default router;
