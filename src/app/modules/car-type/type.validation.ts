import { z } from "zod";

const createCarTypeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "The field is required." }),
  })
});
const updateCarTypeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  })
});
export const CarTypeValidations = {
    createCarTypeValidationSchema,
    updateCarTypeValidationSchema,
};