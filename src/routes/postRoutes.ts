import { Router } from "express";
import { createPost, getAllPosts, getPostById, deletePost, getMyPosts, updatePost} from "../controllers/post.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/upload";


const router = Router();

router.post("/", authenticateToken, upload.single("image"), createPost);
router.get("/me", authenticateToken, getMyPosts);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

export default router;