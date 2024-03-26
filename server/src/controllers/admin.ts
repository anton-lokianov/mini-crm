import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { AuthRequest } from "../types/authReq";
import { SubUser } from "../models/subUser";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../errors/errors";
import { User } from "../models/user";
import { Client } from "../models/client";
import { Driver } from "../models/driver";
import { Notification } from "../models/notification";
import { RoadCall } from "../models/roadCall";
import { Shift } from "../models/shift";
import { Message } from "../models/message";

const createSubUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const subUserData = req.body;
    const userId = req.user?.id;

    const user = await User.findById(userId);

    const salt = await bcrypt.genSalt(10);
    subUserData.password = await bcrypt.hash(subUserData.password, salt);

    if (!user) {
      throw new NotFoundError("user not found");
    }

    const subUsersCount = await SubUser.countDocuments({ author: userId });
    if (subUsersCount > 5) {
      throw new ForbiddenError("subUsers limit reached");
    }

    const existingUser = await SubUser.findOne({
      userName: subUserData.userName,
      author: userId,
    });

    if (existingUser) {
      throw new BadRequestError("subUser already exists");
    }

    const subUser = await SubUser.create({
      ...subUserData,
      author: userId,
      company: user.company,
    });

    if (!subUser) {
      throw new BadRequestError("subUser not created");
    }

    res.status(201).json({ massage: "subUser created successfully" });
  } catch (error) {
    next(error);
  }
};

const getSubUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const subUsers = await SubUser.find(
      { author: userId },
      "-password -author -company -__v -updatedAt -phone"
    );

    if (!subUsers) {
      throw new NotFoundError("subUsers not found");
    }

    res.status(200).json(subUsers);
  } catch (error) {
    next(error);
  }
};

const deleteSubUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const subUser = await SubUser.findOneAndDelete({
      _id: id,
      author: userId,
    });

    if (!subUser) {
      throw new NotFoundError("subUser not found");
    }

    res.status(200).json({ message: "subUser deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteAuthorUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    await Promise.all([
      SubUser.deleteMany({ author: userId }),
      Client.deleteMany({ user: userId }),
      Driver.deleteMany({ author: userId }),
      Notification.deleteMany({ author: userId }),
      RoadCall.deleteMany({ author: userId }),
      Shift.deleteMany({ author: userId }),
      Message.deleteMany({ sender: userId }),
      User.findOneAndDelete({ _id: userId }),
    ]);

    res
      .status(200)
      .json({ message: "User and all related entities deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default { createSubUser, getSubUsers, deleteSubUser, deleteAuthorUser };
