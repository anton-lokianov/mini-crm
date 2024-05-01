import express from "express";

import { verifyToken } from "../middlewares/verifyToken";
import adminControllers from "../controllers/admin";
import { roleAuth } from "../middlewares/roleAuth";
import { validation } from "../middlewares/validation";
import { subUserDTO } from "../dtos/subUserDTO";
import { updateAuthUserDTO } from "../dtos/authUserDTO";

const router = express.Router();

const verify = [verifyToken, roleAuth({ roles: ["admin"] })];

router.post(
  "/createSubUser",
  validation(subUserDTO),
  verify,
  adminControllers.createSubUser
);

router.get("/getSubUsers", verify, adminControllers.getSubUsers);

router.get("/getAuthUser", verify, adminControllers.getAuthUser);

router.delete("/deleteSubUser/:id", verify, adminControllers.deleteSubUser);

router.delete("/deleteAuthorUser", verify, adminControllers.deleteAuthorUser);

router.put(
  "/updateUserDetails",
  validation(updateAuthUserDTO),
  verify,
  adminControllers.updateUserDetails
);

export default router;
