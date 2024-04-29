import { Request } from "express";

interface User {
  id: string;
  email: string;
  role: Role;
  userName: string;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: User;
}

type Role = "admin" | "manager" | "operator" | "service";

export interface Roles {
  roles: Role[];
}
