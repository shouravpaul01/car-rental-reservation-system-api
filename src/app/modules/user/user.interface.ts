import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id?:string,
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  address: string;
};
export type TUserRole = keyof typeof USER_ROLE;