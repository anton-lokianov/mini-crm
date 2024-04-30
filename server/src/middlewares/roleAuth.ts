import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/errors";
import { AuthRequest, Roles } from "../types/authReq";

export const roleAuth = ({ roles }: Roles) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      throw new UnauthorizedError("Access denied. No role provided.");
    }

    if (roles.includes(userRole)) {
      next();
    } else {
      throw new UnauthorizedError(
        "Access denied. You do not have permission to access this resource."
      );
    }
  };
};
