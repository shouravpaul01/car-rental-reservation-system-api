import httpStatus from "http-status";
import { CarType } from "./type.model";
import { TCarType } from "./type.interface";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";


const createCarTypeIntoDB = async (payload: TCarType) => {
    if (!await CarType.isNameExists(payload.name)) {
        throw new AppError(httpStatus.CONFLICT,'name',"Name already exists.");     
    }
  const result = await CarType.create(payload);
  return result;
};
const getAllCarTypesDB = async (query: Record<string, unknown>) => {
 const searchableFields=["name"]
  const mainQuery = new QueryBuilder(CarType.find({}), query).search(
    searchableFields
  );

  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const categoryQuery = mainQuery.paginate();
  const categories = await categoryQuery.modelQuery;

  const result = { data: categories, totalPages: totalPages };
  return result;
};
const getSingleCarTypeDB = async (
  carTypeId: string
) => {
    const result = await CarType.findById(carTypeId);
    return result;
};
const updateCarTypeIntoDB = async (
    carTypeId: string,
  payload: Partial<TCarType>
) => {
  const result = await CarType.findByIdAndUpdate(carTypeId, payload, {
    new: true,
  });
  return result;
};
const updateCarTypeStatusDB = async (carTypeId: string, status: string) => {
  const result = await CarType.findByIdAndUpdate(
    carTypeId,
    { isActive: status },
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
  getAllActiveCarTypeDB
};