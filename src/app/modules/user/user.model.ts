import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["user", "admin"] },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

export const User = model<TUser>("User", userSchema);
