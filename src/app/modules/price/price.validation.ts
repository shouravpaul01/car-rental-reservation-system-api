import { z } from "zod";

export const priceValidation = z.object({
  body: z.object({
    hourly: z.object({
      ratePerHour: z.number().min(0, "Rate per hour must be a positive number"),
      policy: z.string().min(1, "Policy cannot be empty"),
    }),
    daily: z.object({
      ratePerDay: z.number().min(0, "Rate per day must be a positive number"),
      policy: z.string().min(1, "Policy cannot be empty"),
    }),
  }),
});
