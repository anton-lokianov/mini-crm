import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/user";
import { BadRequestError, NotFoundError } from "../errors/errors";
import { SubUser } from "../models/subUser";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;

    let userId;

    let user = await User.findOne({
      userName: userName,
    });

    if (user) {
      userId = user._id;
    } else {
      const subUser = await SubUser.findOne({
        userName: userName,
      }).populate("author");

      if (subUser) {
        userId = (subUser.author as any)._id;
        user = subUser;
      } else {
        throw new NotFoundError("Please check your username or password");
      }
    }

    const jwtSecret = process.env.JWT_SECRET;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundError("Please check your username or password");
    }

    if (!jwtSecret) {
      throw new Error("JWT secret is undefined.");
    }

    const expiresIn = 60 * 60 * 12;

    const token = jwt.sign(
      {
        id: userId,
        email: user.email,
        role: user.role,
        userName: user.userName,
      },
      jwtSecret,
      {
        expiresIn,
      }
    );

    const exertionDate = new Date(Date.now() + expiresIn * 1000);

    res.status(200).json({
      user: {
        userName: user.userName,
        email: user.email,
        role: user.role,
        fullName: `${user.firstName} ${user.lastName}`,
        company: user.company,
      },
      token,
      exertionDate,
    });
  } catch (err) {
    console.error("signIn", err);
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({
      userName: userData.userName,
      email: userData.email,
    });

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const newUser = await User.create(userData);

    if (!newUser) {
      throw new BadRequestError("User not created");
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
