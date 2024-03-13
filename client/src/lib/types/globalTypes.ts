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

export interface SubUser {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  createdAt: string;
  userName: string;
}
