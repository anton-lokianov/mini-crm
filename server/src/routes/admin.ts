import express from "express";

import { isAdmin } from "../middlewares/adminAuth";
import { verifyToken } from "../middlewares/verifyToken";
import adminControllers from "../controllers/admin";

const router = express.Router();

const verify = [verifyToken, isAdmin];

router.post(
  "/createSubUser",
  verifyToken,
  isAdmin,
  adminControllers.createSubUser
);

router.get("/getSubUsers", verifyToken, isAdmin, adminControllers.getSubUsers);

router.delete(
  "/deleteSubUser/:id",
  verifyToken,
  isAdmin,
  adminControllers.deleteSubUser
);

router.delete(
  "/deleteAuthorUser",
  verifyToken,
  isAdmin,
  adminControllers.deleteAuthorUser
);

export default router;
