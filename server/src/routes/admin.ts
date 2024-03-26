import express from "express";

import { isAdmin } from "../middlewares/adminAuth";
import { verifyToken } from "../middlewares/verifyToken";
import adminControllers from "../controllers/admin";

const router = express.Router();

const verify = [verifyToken, isAdmin];

router.post("/createSubUser", verify, adminControllers.createSubUser);

router.get("/getSubUsers", verify, adminControllers.getSubUsers);

router.get("/getAuthUser", verify, adminControllers.getAuthUser);

router.delete("/deleteSubUser/:id", verify, adminControllers.deleteSubUser);

router.delete("/deleteAuthorUser", verify, adminControllers.deleteAuthorUser);

export default router;
