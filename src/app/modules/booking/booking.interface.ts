import { Types } from "mongoose";
import { TCar } from "../car/car.interface";
import { TUser } from "../user/user.interface";

export type TBooking = {
  user: TUser | Types.ObjectId;
  car: TCar;
  drivingType:string;
  startTime: string;
  pickupDate: Date;
  pickupLocation: string;
  endTime: string;
  returnDate: Date;
  returnLocation: string;
  priceType: { price: number; type: string };
  advancedDeposit: number;
  totalCost: number;
  startDate: Date;
  isApproved: boolean;
  returnStatus: boolean;
};
