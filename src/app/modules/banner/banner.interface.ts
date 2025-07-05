import { Types } from "mongoose";

export interface TBanner {
  image: string;
  title: string;
  subtitle?: string;
  description:string;
  link?: string;
  car: Types.ObjectId;
  isActive: boolean;
  isDelate: boolean;
}
