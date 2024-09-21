import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/create-booking",
  validateRequest(BookingValidations.bookingValidation),
  BookingControllers.createBookingInto
);
router.get("/",auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.patch("/update-approval-status/:bookingId",auth(USER_ROLE.admin), BookingControllers.updateBookingApprovedStatus);
router.get("/my-bookings",auth(USER_ROLE.user), BookingControllers.getMyAllBookings);
router.patch("/returned/:bookingId",auth(USER_ROLE.admin), BookingControllers.updateBookingReturnStatus);


export const BookingRoutes = router;
