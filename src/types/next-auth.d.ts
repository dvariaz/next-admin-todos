import { DefaultUser } from "next-auth";


interface IUser extends DefaultUser {
  roles?: string[];
}

declare module "next-auth" {
  type User = IUser;

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = IUser;
}
