import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id?:Types.ObjectId,
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  nid:string,
  drivingLicence:string,
  address: string;
  isBlocked:boolean;
};
export type TUserRole = keyof typeof USER_ROLE;