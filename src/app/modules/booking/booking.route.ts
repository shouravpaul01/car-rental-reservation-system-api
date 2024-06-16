import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/",
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBookingInto
);
router.get("/",auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.get("/my-bookings",auth(USER_ROLE.user), BookingControllers.getMyAllBookings);


export const BookingRoutes = router;
