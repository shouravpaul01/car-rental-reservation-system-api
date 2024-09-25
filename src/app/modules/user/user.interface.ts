import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id?:Types.ObjectId,
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  nid:string,
  drivingLicence:string,
  address: string;
  isActive:boolean
};
export type TUserRole = keyof typeof USER_ROLE;