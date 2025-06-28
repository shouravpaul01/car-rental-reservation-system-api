import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { deleteImageCloudinary, uploadImageCloudinary } from "../../utils/uploadImageCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: TUser) => {
  const isEmailExists = await User.findOne({ email: payload?.email });
  if (isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","Already you are registered.");
  }
  const result = await User.create(payload);
  return result;
};
const updateUserIntoDB = async (userId:string,file:any,payload: TUser) => {
  
const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
  if (file) {
      //Delete file from cloudinary 
      isUserExists?.image &&  await deleteImageCloudinary(isUserExists.image)
       //send image to cloudinary
       const { secure_url }: any = await uploadImageCloudinary(file?.filename, file?.path);
       payload.image = secure_url;
    }else{
      delete payload["image"]
    }
  const result = await User.findByIdAndUpdate(userId,payload,{new:true});
  return result;
};
const getAllUsersDB = async (query: Record<string,undefined>) => {
  
  const searchableFields = ["name","email","phone"];
  const mainQuery = new QueryBuilder(
    User.find({}),
    query
  ).search(searchableFields);
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const paginateQuery = mainQuery.paginate();
  const users = await paginateQuery.modelQuery;
  const result = { data: users, totalPages: totalPages };

  return result;
};
const getSingleUserDB = async (email: string) => {
  const isEmailExists = await User.findOne({ email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
  const result = await User.findOne({ email });
  return result;
};

const updateUserRoleDB = async (query: Record<string,undefined>) => {
  
  const isEmailExists = await User.findOne({ email: query?.email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
  const result = await User.findOneAndUpdate({email: query?.email},{role:query.role},{new:true});
  return result;
};
const updateStatusDB = async (query: Record<string,undefined>) => {
  
  const isEmailExists = await User.findOne({ email: query?.email });
  if (!isEmailExists) {
    throw new AppError(httpStatus.NOT_FOUND,"userError","User Not found.");
  }
  const result = await User.findOneAndUpdate({email: query?.email},{isBlocked:query.isBlocked},{new:true});
  return result;
};
export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUsersDB,
  getSingleUserDB,
  
  updateUserRoleDB,
  updateStatusDB
};
