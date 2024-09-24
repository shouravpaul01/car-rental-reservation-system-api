import { string } from "zod";
import { TBooking, TPaymentDetails } from "./booking.interface";
import { Booking } from "./booking.model";
import mongoose, { Types } from "mongoose";
import { Car } from "../car/car.model";
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../user/user.interface";
import { Price } from "../price/price.model";
import { QueryBuilder } from "../../builder/QueryBuilder";
import {
  calculateDailyCost,
  calculateTotalCost,
} from "../../utils/calculateTotalCost";
import { initiatePayment } from "../payment/payment.utils";
import { generateTransactionId } from "../../utils/generateTransectionId";

const createBookingIntoDB = async (payload: TBooking) => {
  const carId = payload?.car;
  payload.advancedPaymentDetails = payload.advancedPaymentDetails || {};
  if (payload.priceType.type == "daily") {
    payload.advancedPaymentDetails.amount =
      ((payload.priceType.price * 50) / 100) * payload.quantity;
    payload.advancedPaymentDetails.date = new Date();
    payload.advancedPaymentDetails.transectionId = generateTransactionId();
  } else {
    payload.advancedPaymentDetails.amount =
      payload.priceType.price * 4 * payload.quantity;
    payload.advancedPaymentDetails.date = new Date();
    payload.advancedPaymentDetails.transectionId = generateTransactionId();
  }
  const isCarExists = await Car.findById(carId);
  const isUserExists = await User.findOne({
    email: (payload.user as TUser).email,
  });

  //Check if car is exists
  if (!isCarExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "bookingError",
      "You have failed to book the car."
    );
  }

  const paymentInfo = {
    transectionId: payload.advancedPaymentDetails.transectionId,
    amount: payload.advancedPaymentDetails.amount,
    customerName: isUserExists
      ? isUserExists?.name
      : (payload.user as TUser).name,
    customerEmail: isUserExists
      ? isUserExists?.email
      : (payload.user as TUser).email,
    customerPhone: isUserExists
      ? isUserExists?.phone
      : (payload.user as TUser).phone,
  };
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    //If the user is already registered, then the user data is updated; otherwise, a new user is registered.
    if (isUserExists) {
      const userUpdateData = {
        nid: (payload.user as TUser).nid,
        drivingLicence: (payload.user as TUser).drivingLicence,
      };

      const isUserUpdateResultSuccess = await User.findOneAndUpdate(
        { email: (payload.user as TUser).email },
        userUpdateData,
        { session }
      );
      payload.user = isUserExists!._id;
      if (!isUserUpdateResultSuccess) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "bookingError",
          "You have failed to book the car"
        );
      }
    } else {
      const isUserResultSuccess = await User.create([payload.user], {
        session,
      });
      payload.user = isUserResultSuccess[0]._id;
      if (!isUserResultSuccess) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "bookingError",
          "You have failed to book the car"
        );
      }
    }
    //Update the current quantity of car data. Also, check if the current quantity is 0, then set availability to false.
    const updateCar: any = {};
    const currentCarQty = isCarExists.quantity - payload.quantity;
    updateCar.quantity = currentCarQty;
    if (currentCarQty == 0) {
      updateCar.isAvailable = false;
    }
    const isCarUpdateResult = await Car.findByIdAndUpdate(
      isCarExists._id,
      updateCar,
      { new: true, session }
    );
    if (!isCarUpdateResult) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "bookingError",
        "Failed to booked Car."
      );
    }
    //Booked
    const booked = await Booking.create([payload], { session });
    if (!booked) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "bookingError",
        "Failed to booked Car."
      );
    }
    //Payment

    const paymentSuccessResult = await initiatePayment(paymentInfo);
    if (paymentSuccessResult.result !== "true") {
      await session.abortTransaction();
      await session.endSession();
    }
    await session.commitTransaction();
    await session.endSession();
    return paymentSuccessResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "", "Failed to booked Car.");
  }
};
const getAllBookingsDB = async (query: Record<string, undefined>) => {
  const searchableFields = ["pickupLocation", "priceType.type", "user.email"];
  const mainQuery = new QueryBuilder(
    Booking.find({}).populate("car").populate("user"),
    query
  )
    .search(searchableFields)
    .filter();
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const bookings = await paginateQuery.modelQuery;
  const result = { data: bookings, totalPages: totalPages };

  return result;
};
const updateBookingApprovedDB = async (
  bookingId: string,
  isApproved: string
) => {
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { isApproved: isApproved },
    { new: true }
  );
  return result;
};
const getMyAllBookingDB = async (query: Record<string, undefined>) => {
  const isUserExists = await User.findOne({ email: query?.email });
  if (isUserExists) {
    query["user"] = isUserExists._id;
    delete query["email"];
  }
  const searchableFields = ["pickupLocation"];
  const mainQuery = new QueryBuilder(
    Booking.find({}).populate("car").populate("user"),
    query
  )
    .search(searchableFields)
    .filter();
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const bookings = await paginateQuery.modelQuery;
  const result = { data: bookings, totalPages: totalPages };

  return result;
};
const updateBookingReturnStatusDB = async (bookingId: string) => {
  let updateData: any = {};

  const isBookingExists = await Booking.findById(bookingId);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "", "Booking not found!.");
  }
  if (isBookingExists.priceType.type == "hourly") {
    const { totalCost } = calculateTotalCost(
      isBookingExists.drivingType == "Self Driving"
        ? isBookingExists.startDate
        : isBookingExists.pickupDate,
      isBookingExists.startTime,
      isBookingExists.priceType.price * isBookingExists.quantity
    );

    updateData.totalCost = totalCost.toFixed(2);
    updateData.endTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
    updateData.returnStatus = true;
    updateData.returnDate = new Date();
  }
  if (isBookingExists.priceType.type == "daily") {
    const isCarExists = await Car.findById(isBookingExists.car).populate(
      "price"
    );

    const { totalCost } = calculateDailyCost(
      isBookingExists.drivingType == "Self Driving"
        ? isBookingExists.startDate
        : isBookingExists.pickupDate,
      isBookingExists.startTime,
      isBookingExists.priceType.price * isBookingExists.quantity,
      (isCarExists?.price as any).hourly.ratePerHour * isBookingExists.quantity
    );

    updateData.totalCost = totalCost.toFixed(2);
    updateData.endTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
    updateData.returnStatus = true;
    updateData.returnDate = new Date();
  }

  const result = await Booking.findByIdAndUpdate(bookingId, updateData, {
    new: true,
  });
  return result;
};
const paymentAfterReturningCarDB = async (bookingId: string) => {
  let updateData: any = {};
  const isBookingExists = await Booking.findById(bookingId);
  console.log(isBookingExists);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "", "Booking not found!.");
  }
  const isUserExists = await User.findById(isBookingExists.user);
  const totalCost = isBookingExists.totalCost;
  const advancedAmount = isBookingExists.advancedPaymentDetails.amount;
  if (totalCost > advancedAmount) {
    updateData.paymentDetails = {
      amount: totalCost - advancedAmount,
      advancedAmount: advancedAmount,
      transectionId: generateTransactionId(),
      date: new Date(),
      paymentStatus: "Paid",
    };
  } else {
    updateData.paymentDetails = {
      returnAmount: advancedAmount - totalCost,
      advancedAmount: advancedAmount,
      transectionId: generateTransactionId(),
      date: new Date(),
      paymentStatus: "Paid",
    };
  }
  console.log(updateData);
  const paymentInfo = {
    transectionId: updateData.paymentDetails.transectionId,
    amount: updateData.paymentDetails.amount,
    customerName: isUserExists?.name,

    customerEmail: isUserExists?.email,

    customerPhone: isUserExists?.phone,
  };

  const paymentSuccessResult = await initiatePayment(paymentInfo as any);
  if (paymentSuccessResult.result !== "true") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "bookingError",
      "Booking not found!."
    );
  }
  const isUpdateBooking = await Booking.findByIdAndUpdate(
    bookingId,
    updateData,
    { new: true }
  );
  if (!isUpdateBooking) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "bookingError",
      "Booking not found!."
    );
  }
  return paymentSuccessResult;
};
export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsDB,
  updateBookingApprovedDB,
  getMyAllBookingDB,
  updateBookingReturnStatusDB,
  paymentAfterReturningCarDB,
};
