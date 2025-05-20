import { Router } from "express";
import { registro, login, forgotPassword } from "../controllers/auth.controller";


const router = Router();


router.post("/registro", registro);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);


export default router;
