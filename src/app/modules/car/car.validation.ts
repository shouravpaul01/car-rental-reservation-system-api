import { z } from "zod";

const CarValidationSchema = z.object({
  body: z.object({
    type:z.string().nonempty("The field is required."),
    name: z.string().nonempty("The field is required."),
    seats:z.number().min(1,"The field is required."),
    bagCapability:z.string().nonempty("The field is required."),
    fuelType:z.string().nonempty("The field is required."),
    transmission:z.string().nonempty("The field is required."),
    airConditioning:z.string().nonempty("The field is required."),
    color: z.string().nonempty("The field is required."),
    features: z.array(z.string().nonempty("The field is required."),),
    description: z.string().nonempty("The field is required."),
    pricePerHour:z.preprocess((val) => {
      if (typeof val === "string") {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    }, z.number().nonnegative("Price per hour must be a positive number")),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    features: z
      .array(z.string({ invalid_type_error: "Invalid feature." }))
      .optional(),
    pricePerHour: z
      .number({ message: "The field is required." ,invalid_type_error:"Invalid Price."})
      .positive({ message: "Invalid price." })
      .optional(),
  }),
});

const returnCarValidationSchema = z.object({
  body: z.object({
bookingId:z.string({required_error:"The field is required"}),
    endTime: z.string({ required_error: "The field is required." }).refine(
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
export const CarValidations = {
  CarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema

};
