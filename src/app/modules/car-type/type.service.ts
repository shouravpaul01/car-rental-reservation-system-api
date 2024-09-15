import httpStatus from "http-status";
import { CarType } from "./type.model";
import { TCarType } from "./type.interface";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { deleteImageCloudinary, uploadImageCloudinary } from "../../utils/uploadImageCloudinary";

const createCarTypeIntoDB = async (file: any,payload: TCarType) => {
 
  if (await CarType.isNameExists(payload.name)) {
    throw new AppError(httpStatus.CONFLICT, "name", "Name already exists.");
  }
  if (file) {
    //send image to cloudinary
    const { secure_url }: any = await uploadImageCloudinary(file?.filename, file?.path);
    payload.icon = secure_url;
  }
  const result = await CarType.create(payload);
  return result;
};
const getAllCarTypesDB = async (query: Record<string, unknown>) => {
  const searchableFields = ["name"];

  const mainQuery = new QueryBuilder(CarType.find({}), query).search(
    searchableFields
  );

  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const typeQuery = mainQuery.paginate();
  const cartypes = await typeQuery.modelQuery;

  const result = { data: cartypes, totalPages: totalPages };
  return result;
};
const getSingleCarTypeDB = async (carTypeId: string) => {
  const result = await CarType.findById(carTypeId);
  return result;
};
const updateCarTypeIntoDB = async (
  carTypeId: string,
  file:any,
  payload: Partial<TCarType>
) => {
  const isTypeExists=await CarType.findById(carTypeId)
  if (file) {
    //Delete file from cloudinary 
    isTypeExists?.icon &&  await deleteImageCloudinary(isTypeExists.icon)
     //send image to cloudinary
     const { secure_url }: any = await uploadImageCloudinary(file?.filename, file?.path);
     payload.icon = secure_url;
  }else{
    delete payload["icon"]
  }
  const result = await CarType.findByIdAndUpdate(carTypeId, payload, {
    new: true,
  });
  return result;
};
const updateCarTypeStatusDB = async (carTypeId: string, isActive: string) => {
  const result = await CarType.findByIdAndUpdate(
    carTypeId,
    { isActive: isActive },
    { new: true }
  );
  return result;
};
const getAllActiveCarTypeDB = async () => {
  const result = await CarType.find({ isActive: true });
  return result;
};
export const CarTypeServices = {
  createCarTypeIntoDB,
  getAllCarTypesDB,
  getSingleCarTypeDB,
  updateCarTypeIntoDB,
  updateCarTypeStatusDB,
  getAllActiveCarTypeDB,
};
