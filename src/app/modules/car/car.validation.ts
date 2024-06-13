import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: "The field is required." }),
    description: z.string({ message: "The field is required." }),
    color: z.string({ message: "The field is required." }),
    isElectric: z.boolean({ message: "The field is required." }),
    features: z.array(z.string({ message: "The field is required." })),
    pricePerHour: z
      .number({ message: "The field is required." })
      .positive({ message: "Invalid price." }),
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

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
