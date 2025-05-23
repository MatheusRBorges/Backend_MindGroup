import { Router } from "express";
import {register, login, forgotPassword, updateProfile, profile,  updateAvatar, uploadAvatarFile} from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/upload";
import { Like, getContarLike, hasUserLiked,} from "../controllers/like.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/profile", authenticateToken, profile);
router.put("/profile", authenticateToken, updateProfile);
router.put("/profile/avatar", authenticateToken, updateAvatar);
router.put("/profile/avatar/upload", authenticateToken, upload.single("avatar"), uploadAvatarFile);


export default router;
