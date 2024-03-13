import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/errors";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      error: {
        status: err.statusCode,
        message: err.message,
      },
    });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).json({
      error: {
        status: 500,
        message: "Internal Server Error",
      },
    });
  }
};
