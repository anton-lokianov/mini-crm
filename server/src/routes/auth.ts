import express from "express";
import { signIn, createUser } from "../controllers/auth";
import { loginDTO } from "../dtos/loginDTO";
import { validation } from "../middlewares/validation";

const router = express.Router();

router.post("/login", validation(loginDTO), signIn);
router.post("/register", createUser);

export default router;
