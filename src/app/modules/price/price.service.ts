import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { TPrice } from "./price.interface";
import { Price } from "./price.model";

const createPriceIntoDB = async (payload: TPrice) => {
 
    const result = await Price.create(payload);
    return result;
  };
  const getAllPriceDB = async (query: Record<string, unknown>) => {
    const searchableFields = ["name"];
  
    const mainQuery = new QueryBuilder(Price.find({}), query).search(
      searchableFields
    );
  
    const totalPages = (await mainQuery.totalPages()).totalQuery;
    const pricesQuery = mainQuery.paginate();
    const allPrice = await pricesQuery.modelQuery;
  
    const result = { data: allPrice, totalPages: totalPages };
    return result;
  };
  const getSinglePriceDB = async (priceId: string) => {
    const result = await Price.findById(priceId);
    return result;
  };
  const updatePriceIntoDB = async (
    priceId: string,
    payload: Partial<TPrice>
  ) => {
    const isPriceExists=await Price.findById(priceId)
    if (!isPriceExists) {
      throw new AppError(httpStatus.NOT_FOUND,"","Data not found!.");
      
    }
    const result = await Price.findByIdAndUpdate(priceId, payload, {
      new: true,
    });
    return result;
  };
  const updatePriceStatusDB = async (priceId: string, isActive: string) => {
    const result = await Price.findByIdAndUpdate(
        priceId,
      { isActive: isActive },
      { new: true }
    );
    return result;
  };
  const getAllActivePriceDB = async () => {
    const result = await Price.find({ isActive: true });
    return result;
  };
  export const PriceServices = {
    createPriceIntoDB,
    getAllPriceDB,
    getSinglePriceDB,
    updatePriceIntoDB,
    updatePriceStatusDB,
    getAllActivePriceDB
  };
  