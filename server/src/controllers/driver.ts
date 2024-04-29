import { Response, Request, NextFunction } from "express";

import { AuthRequest } from "../types/authReq";
import { Driver } from "../models/driver";
import { BadRequestError, UnauthorizedError } from "../errors/errors";

const createDriver = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const {
      firstName,
      lastName,
      phoneNumber,
      id,
      carNumber,
      employeeType,
      driverNumber,
      shiftStartTime,
      shiftEndTime,
    } = req.body;

    const driver = await Driver.create({
      author: user.id,
      firstName,
      lastName,
      phoneNumber,
      id,
      carNumber,
      employeeType,
      driverNumber,
      shiftStartTime,
      shiftEndTime,
    });

    if (!driver) {
      throw new BadRequestError("Driver not created");
    }

    res.status(201).json({ message: "Driver created successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllDrivers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const drivers = await Driver.find({ author: user.id });

    res.status(200).json({ drivers });
  } catch (error) {
    next(error);
  }
};

export default { createDriver, getAllDrivers };
