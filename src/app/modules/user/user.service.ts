import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {

  const isEmailExists = await User.findOne({ email: payload?.email });
  if (isEmailExists) {
    throw new Error("Already you are registered.");
  }
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
