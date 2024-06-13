import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
const router = express.Router();

router.post(
  "/",
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBookingInto
);
router.get("/", BookingControllers.getAllBookings);
// router.get("/:id", CarControllers.getCarById);
// router.put(
//   "/:id",
//   validateRequest(CarValidations.updateCarValidationSchema),
//   CarControllers.updateCarInto
// );
// router.delete("/:id", CarControllers.deleteCar);

export const BookingRoutes = router;
