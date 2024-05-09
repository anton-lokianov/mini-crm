import express from "express";

import { verifyToken } from "../middlewares/verifyToken";
import driverControllers from "../controllers/driver";
import { roleAuth } from "../middlewares/roleAuth";

const router = express.Router();

router.post(
  "/createDriver",
  verifyToken,
  roleAuth({ roles: ["admin", "manager"] }),
  driverControllers.createDriver
);

router.get(
  "/getAllDrivers",
  verifyToken,
  roleAuth({ roles: ["admin", "manager", "operator"] }),
  driverControllers.getAllDrivers
);

router.post(
  "/openShift",
  verifyToken,
  roleAuth({ roles: ["admin", "manager", "operator"] }),
  driverControllers.handleDriverShift
);

export default router;
