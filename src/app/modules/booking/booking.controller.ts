import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBookingInto = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Car booked successfully",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
    const {carId,date}=req.query
    const result = await BookingServices.getAllBookingsDB(carId as string,date as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  });

export const BookingControllers={
    createBookingInto,
    getAllBookings
}