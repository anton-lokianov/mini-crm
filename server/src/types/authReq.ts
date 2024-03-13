import { Request } from "express";

export interface AuthRequest extends Request {
  user?: Record<string, string | object>;
}
