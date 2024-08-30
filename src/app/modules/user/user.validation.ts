import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("The field is required"),
    email: z
      .string()
      .nonempty("The field is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("The field is required")
      .min(8, "Password must be at least 8 characters long"),
  }),
});
export const UserValidations = {
  createUserValidationSchema,
};
