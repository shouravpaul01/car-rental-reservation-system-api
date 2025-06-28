import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { config } from "../../config";
import bcrypt from "bcrypt";
import { boolean } from "zod";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default:"user"
  },
  password: {
    type: String,
    required: true,
    select:0
  },
  phone: {
    type: String,
  },
  nid:{
    type: String,
  },
  drivingLicence:{
    type: String,
  },
  address: {
    type: String,
  },
  isBlocked:{
    type:Boolean,
    default:false
  }
});
userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});


export const User = model<TUser>("User", userSchema);
