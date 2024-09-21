import { z } from "zod";
import { Car } from "../car/car.model";

const userInfoValidation = z.object({
  drivingType: z.string().nonempty("The field is required."),
  user: z.object({
    email: z
      .string()
      .email("Invalid email address.")
      .nonempty("The field is required."),
    name: z.string().nonempty("The field is required."),
    nid: z
      .string()
      .refine((val) => /^\d+$/.test(val), {
        message: "NID must contain only digits.",
      })
      .refine((val) => val.length === 13 || val.length === 17, {
        message: "NID must be either 13 or 17 digits long.",
      }),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 characters long.")
      .nonempty("The field is required."),
  }),

  priceType: z.object({
    price: z.number().positive("Price must be a positive number."),
    type: z.enum(["daily", "hourly"], {
      required_error: "The field is required.",
    }),
  }),
});

// Company provided driving validation schema
const companyProvidedDrivingValidation = z.object({
  startTime: z.string().nonempty("Start Time is required."),
  pickupDate: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        return date; // Only return if it's a valid date
      }
    }
    return undefined; // Will trigger validation error
  }, z.date({ invalid_type_error: "Invalid date format." })),

  pickupLocation: z.string().nonempty("The field is required."),

  returnLocation: z.string().nonempty("The field is required."),
});

// Self driving validation schema
const selfDrivingValidation = z.object({
  startTime: z.string().nonempty("Start Time is required."),

  startDate: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        return date; // Only return if it's a valid date
      }
    }
    return undefined; // Will trigger validation error
  }, z.date({ invalid_type_error: "Invalid date format." })),
});

// Conditional validation schema based on `drivingType`
const bookingValidationUnion = z.union([
  userInfoValidation.extend(companyProvidedDrivingValidation.shape),
  userInfoValidation.extend(selfDrivingValidation.shape),
]);
const bookingValidation = z.object({
  body: bookingValidationUnion,
});
export const BookingValidations = {
  bookingValidation,
};
