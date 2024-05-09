import { Response, Request, NextFunction } from "express";

import { AuthRequest } from "../types/authReq";
import { Driver } from "../models/driver";
import { BadRequestError, UnauthorizedError } from "../errors/errors";
import { Shift } from "../models/shift";

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

const handleDriverShift = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { driverId } = req.params;
  const user = req.user;

  try {
    if (!user) {
      return next(new UnauthorizedError("User not found"));
    }

    const driver = await Driver.findOne({
      _id: driverId,
      author: user.id,
    });

    if (!driver) {
      throw new BadRequestError("Driver not found");
    }

    const existingShift = await Shift.findOne({
      driver: driverId,
    }).sort({ startTime: -1 });

    if (existingShift) {
      const shift = await Shift.updateOne(
        {
          _id: existingShift._id,
        },
        {
          endTime: new Date(),
        }
      );
      if (!shift) {
        throw new BadRequestError("Shift not closed");
      }
      driver.status = "inactive";
    } else {
      const shift = await Shift.create({
        driver: driverId,
        startTime: new Date(),
      });
      if (!shift) {
        throw new BadRequestError("Shift not created");
      }

      driver.status = "active";
    }

    await driver.save();

    res.status(200).json({ message: "Shift updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default { createDriver, getAllDrivers, handleDriverShift };
