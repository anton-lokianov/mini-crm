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

    if (!userId) {
      throw new NotFoundError("User not found");
    }

    const deleteAll = await Promise.all([
      SubUser.deleteMany({ author: userId }),
      Client.deleteMany({ user: userId }),
      Driver.deleteMany({ author: userId }),
      Notification.deleteMany({ author: userId }),
      RoadCall.deleteMany({ author: userId }),
      Shift.deleteMany({ author: userId }),
      Message.deleteMany({ sender: userId }),
      User.findOneAndDelete({ _id: userId }),
    ]);

    if (!deleteAll) {
      throw new BadRequestError("User and all related entities not deleted");
    }

    res
      .status(200)
      .json({ message: "User and all related entities deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAuthUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(
      {
        _id: userId,
      },
      "-role -password -__v -updatedAt -_id"
    );

    if (!user) {
      throw new NotFoundError("user not found");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const updatedData = { ...req.body };

    const user = await User.findById(userId);
    const subUser = await SubUser.find({ author: userId });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    let updatePassword = false;

    if (updatedData.oldPassword && updatedData.newPassword) {
      const passwordMatch = await bcrypt.compare(
        updatedData.oldPassword,
        user.password
      );

      if (!passwordMatch) {
        throw new BadRequestError("Old password is incorrect");
      }

      const salt = await bcrypt.genSalt(10);
      updatedData.newPassword = await bcrypt.hash(
        updatedData.newPassword,
        salt
      );
      updatePassword = true;

      delete updatedData.oldPassword;
    }

    let updateObject = { ...updatedData };
    if (updatePassword) {
      updateObject.password = updatedData.newPassword;
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateObject },
      { new: true }
    );
    await SubUser.updateMany(
      { author: userId },
      { $set: { company: updatedData.company } }
    );

    if (!updateUser) {
      throw new BadRequestError("User not updated");
    }

    res.status(200).json({
      userName: updateUser.userName,
      email: updateUser.email,
      role: updateUser.role,
      fullName: `${updateUser.firstName} ${updateUser.lastName}`,
      company: updateUser.company,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createSubUser,
  getSubUsers,
  deleteSubUser,
  deleteAuthorUser,
  getAuthUser,
  updateUserDetails,
};
