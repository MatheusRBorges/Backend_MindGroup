import { Router } from "express";
import { createPost, getAllPosts, getPostById, deletePost, getMyPosts, updatePost} from "../controllers/post.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/upload";
import { Like, getContarLike, hasUserLiked,} from "../controllers/like.controller";


const router = Router();
router.post("/", authenticateToken, upload.single("image"), createPost);
router.get("/me", authenticateToken, getMyPosts);
router.put("/:id", authenticateToken, upload.single("image"), updatePost);
router.delete("/:id", authenticateToken, deletePost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/:id/like", authenticateToken, Like);
router.get("/:id/likes", getContarLike);
router.get("/:id/liked", authenticateToken, hasUserLiked)



export default router;