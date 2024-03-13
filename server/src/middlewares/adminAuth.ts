import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "../errors/errors";
import { AuthRequest } from "../types/authReq";

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return next(new UnauthorizedError("Access denied"));
  }
  next();
};
