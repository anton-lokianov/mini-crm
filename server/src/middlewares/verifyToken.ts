import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/errors";

interface CustomRequest extends Request {
  user?: object | string;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization");
  if (!token) {
    return next(new UnauthorizedError("Access denied. No token provided."));
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) {
      return next(new UnauthorizedError("Token verification failed"));
    }
    req.user = decoded;
    next();
  });
};
