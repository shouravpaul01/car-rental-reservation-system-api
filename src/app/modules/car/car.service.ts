
import httpStatus from "http-status";
import { TBooking } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { AppError } from "../../errors/AppError";
import mongoose from "mongoose";



const createCarIntoDB=async(payload:TCar)=>{
    const result=await Car.create(payload)
    return result
}
const getAllCarsDB=async()=>{
    const result=await Car.find({})
    return result
}
const getCarByIdDB=async(id:string)=>{
    const result=await Car.findById(id)
    return result
}
const updateCarIntoDB=async(id:string,payload:Partial<TCar>)=>{
    const result=await Car.findByIdAndUpdate(id,payload,{
        new:true
    })
    return result
}
const deleteCarDB=async(id:string)=>{
    const result=await Car.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}

const returnCarDB = async (payload: Partial<TBooking>) => {
    const bookingId = payload.bookingId;
    const isBookingExist = await Booking.findById(bookingId).populate("car");
    if (!isBookingExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found.");
    }
    const startHour = parseFloat(isBookingExist.startTime.split(":")[0]);
    const endHour = parseFloat((payload.endTime as string).split(":")[0]);
    if (startHour > endHour) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Booking End time can not greather then start time."
      );
    }
  
    const calculateTotalCost =
      (endHour - startHour) * Number(isBookingExist.car?.pricePerHour);
    payload.totalCost = calculateTotalCost;
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const updateCarStatus = await Car.findByIdAndUpdate(
        isBookingExist.car,
        { status: "available" },
        { new: true, session }
      );
      if (!updateCarStatus) {
          throw new AppError(
              httpStatus.NOT_FOUND,
              "Return failed."
            );
      }
      const result = await Booking.findByIdAndUpdate(bookingId, payload, {
        new: true,
        session,
      }).populate('car').populate('user');
      if (!result) {
          throw new AppError(
              httpStatus.NOT_FOUND,
              "Booking return failed."
            );
      }
      await session.commitTransaction();
      await session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(httpStatus.BAD_REQUEST, "Booking return failed.");
    }
  };
export const CarServices={
    createCarIntoDB,getAllCarsDB,getCarByIdDB,updateCarIntoDB,deleteCarDB,returnCarDB


}