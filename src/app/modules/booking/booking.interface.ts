import { Types } from "mongoose";
import { TCar } from "../car/car.interface";
import { TUser } from "../user/user.interface";
type TPaymentDetails = {
  advancedAmount: number;
  returnAmount?: number;
  amount?: number;       
  transectionId: string;
  date:Date,
  paymentStatus?: 'Pending' | 'Paid'; 
};
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
  advancedPaymentDetails:{
    amount:number,
    transectionId:string,
    date:Date,
    paymentStatus:"Pending" | "Paid"
  };

  quantity:number;
  totalCost: number;
  paymentDetails:TPaymentDetails;
  paymentStatus:"Pending" | "Paid";
  startDate: Date;
  isApproved: boolean;
  returnStatus: boolean;
};
