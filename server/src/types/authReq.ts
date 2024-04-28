import { Request } from "express";

export interface AuthRequest extends Request {
  user?: Record<string, string | object>;
}

type Role = "admin" | "manager" | "operator" | "service";

export interface Roles {
  roles: Role[];
}
