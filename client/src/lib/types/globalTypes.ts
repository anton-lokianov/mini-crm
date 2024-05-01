export interface AuthUser extends Partial<User> {
  fullName: string;
}

export type SignInResponse = {
  user: AuthUser;
  token: string;
  exertionDate: string;
};

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  createdAt: string;
  phone: string;
  userName: string;
  company: string;
}

export type Role = "admin" | "manager" | "operator" | "service";
