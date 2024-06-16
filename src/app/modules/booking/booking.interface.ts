import {  Types } from "mongoose";
import { TCar } from "../car/car.interface";

export type TBooking ={
    bookingId?:Types.ObjectId,
    date: Date;
    user: Types.ObjectId; 
    car: TCar; 
    startTime: string; 
    endTime: string; 
    totalCost: number; 
};