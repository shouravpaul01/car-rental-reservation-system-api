import {  Types } from "mongoose";
import { TCar } from "../car/car.interface";

export type TBooking ={
    user: Types.ObjectId; 
    car: TCar; 
    startTime: string; 
    pickupDate:Date;
    pickupLocation:string;
    endTime: string; 
    returnDate:Date;
    returnLocation:string;
    totalCost: number; 
    securityDeposit:number;
    securityDepositRefund:{
        amount:number;
        reason:string;
        date:Date;
    },
    isApproved:boolean;
    returnStatus:boolean;
};