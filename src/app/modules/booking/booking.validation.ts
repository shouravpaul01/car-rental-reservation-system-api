import { z } from "zod";
import { Car } from "../car/car.model";

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: "The field is required." }).date(),
    car: z.string({ required_error: "The field is required." }),
    user: z.string({ required_error: "The field is required." }),
    startTime: z.string({ required_error: "The field is required." }).refine(
      (time) => {
        const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
        return timeRegex.test(time);
      },
      {
        message:
          "Invalid Time format. Must be in HH:mm format and valid 24-hour time.",
      }
    ),
  }),
});
export const BookingValidations={
    createBookingValidationSchema
}