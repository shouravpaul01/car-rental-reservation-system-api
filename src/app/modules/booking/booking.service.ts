import { string } from "zod";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import mongoose, { Types } from "mongoose";
import { Car } from "../car/car.model";
import httpStatus from "http-status";

const createBookingIntoDB=async(payload:TBooking)=>{
    const carId=payload?.car
    const isCarExists=await Car.findById(carId)
    //Check if car is exists
    if (!isCarExists) {
        throw new AppError(httpStatus.NOT_FOUND,"Car not found.");     
    }
    const session=await mongoose.startSession()
   try {
    await session.startTransaction()
    const updateCarStatus=await Car.findByIdAndUpdate(carId,{status:'unavailable'},{new:true,session})
    if (!updateCarStatus) {
        throw new AppError(httpStatus.BAD_REQUEST,"Failed to booked Car."); 
    }
    const booked =await Booking.create([payload],{session})
    if (!booked) {
        throw new AppError(httpStatus.BAD_REQUEST,"Failed to booked Car."); 
    }
    await session.commitTransaction()
    await session.endSession()
    return booked[0]
   } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to booked Car.');
   }
}
const getAllBookingsDB=async(carId:string,date:string)=>{
     type TFilter={
        car?:string,
        date?:Date
    }
    let filter:TFilter={}
    if (carId ) {
        filter.car=carId
    }
    if (date) {
        filter.date=new Date(date)
    }
    console.log(filter)
    const result=await Booking.find(filter).populate('car').populate('user')
    return result
}
export const BookingServices={
    createBookingIntoDB,getAllBookingsDB
}