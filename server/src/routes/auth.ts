import express from "express";
import { signIn, createUser } from "../controllers/auth";

const router = express.Router();

router.post("/login", signIn);
router.post("/register", createUser);

export default router;
