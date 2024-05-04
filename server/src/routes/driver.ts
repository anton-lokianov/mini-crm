import express from "express";

import { verifyToken } from "../middlewares/verifyToken";
import driverControllers from "../controllers/driver";

const router = express.Router();

router.post("/createDriver", verifyToken, driverControllers.createDriver);

router.get("/getAllDrivers", verifyToken, driverControllers.getAllDrivers);

router.post("/openShift", verifyToken, driverControllers.openDriverShift);

export default router;
