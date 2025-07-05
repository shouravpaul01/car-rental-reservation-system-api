import { z } from 'zod';
import mongoose from 'mongoose';

export const createBannerValidation = z.object({
  body:z.object({
    image: z.any(),
  title: z.string().nonempty('Title is required' ),
  subtitle: z.string().optional(),
  description: z.string().nonempty('Description is required' ),
  link: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/\S+$/.test(val),
      { message: "Link must be a valid URL" }
    ),
  car: z
    .string()
    .optional()
    .refine((val) => mongoose.Types.ObjectId.isValid(val!), {
      message: 'Invalid ObjectId for car',
    })
    ,

  })
});

