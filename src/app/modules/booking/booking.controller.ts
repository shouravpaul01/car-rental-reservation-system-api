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
    
    const result = await BookingServices.getAllBookingsDB(req.query as Record<string,undefined>);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  });
  const updateBookingApprovedStatus = catchAsync(async (req, res) => {
    const { bookingId } = req.params;
    const { isApproved } = req.query;
    console.log(bookingId,isApproved)
    const result = await BookingServices.updateBookingApprovedDB(bookingId, isApproved as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: `Successfully ${(result as any).isApproved ? "Approved":"Approval Cencel"} .`,
      data: result,
    });
  });
  const getMyAllBookings = catchAsync(async (req, res) => {
  
    const result = await BookingServices.getMyAllBookingDB(req.query as Record<string,undefined>);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "My Bookings retrieved successfully",
      data: result,
    });
  });
  const updateBookingReturnStatus = catchAsync(async (req, res) => {
    const { bookingId } = req.params;
    const result = await BookingServices.updateBookingReturnStatusDB(bookingId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Successfully Car Returned. ",
      data: result,
    });
  });
  const paymentAfterReturningCar = catchAsync(async (req, res) => {
    const { bookingId } = req.params;
    const result = await BookingServices.paymentAfterReturningCarDB(bookingId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Payment Done. ",
      data: result,
    });
  });
export const BookingControllers={
    createBookingInto,
    getAllBookings,
    updateBookingApprovedStatus,
    getMyAllBookings,
    updateBookingReturnStatus,
    paymentAfterReturningCar
}