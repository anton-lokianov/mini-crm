import express from "express";

import { verifyToken } from "../middlewares/verifyToken";
import adminControllers from "../controllers/admin";
import { roleAuth } from "../middlewares/roleAuth";

const router = express.Router();

const verify = [verifyToken, roleAuth({ roles: ["admin"] })];

router.post("/createSubUser", verify, adminControllers.createSubUser);

router.get("/getSubUsers", verify, adminControllers.getSubUsers);

router.get("/getAuthUser", verify, adminControllers.getAuthUser);

router.delete("/deleteSubUser/:id", verify, adminControllers.deleteSubUser);

router.delete("/deleteAuthorUser", verify, adminControllers.deleteAuthorUser);

router.put("/updateUserDetails", verify, adminControllers.updateUserDetails);

export default router;
