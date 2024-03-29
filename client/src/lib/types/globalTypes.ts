export interface AuthUser {
  userName: string;
  role: string;
  email: string;
  fullName: string;
  company: string;
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
