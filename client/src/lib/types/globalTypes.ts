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
