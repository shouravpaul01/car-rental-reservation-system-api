import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "The field is required." }),
    email: z.string({ required_error: "The field is required." }).email(),
    role: z.enum(["user", "admin"], { message: "The field is required." }),
    password: z.string({ required_error: "The field is required." }).min(6),
    phone: z
      .string({ required_error: "The field is required." })
      .regex(/^\d{10}$/),
    address: z.string({ required_error: "The field is required." }),
  }),
});
export const UserValidations = {
  createUserValidationSchema,
};
