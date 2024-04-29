import express from "express";
import { signIn, createUser } from "../controllers/auth";
import { loginDTO } from "../DTOS/loginDTO";

const router = express.Router();

router.post("/login", loginDTO(), signIn);
router.post("/register", createUser);

export default router;
