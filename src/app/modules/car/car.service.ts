import httpStatus from "http-status";
import { TBooking } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { AppError } from "../../errors/AppError";
import mongoose from "mongoose";
import { deleteImageCloudinary, uploadImageCloudinary } from "../../utils/uploadImageCloudinary";
import { QueryBuilder } from "../../builder/QueryBuilder";
import app from "../../../app";

const createCarIntoDB = async (file: any, payload: TCar) => {
  if (await Car.isNameExists(payload.name)) {
    throw new AppError(httpStatus.CONFLICT, "name", "Name Already exists.");
  }
  if (file) {
    //send image to cloudinary
    const { secure_url }: any = await uploadImageCloudinary(file?.filename, file?.path);
    payload.image = secure_url;
  }

  const result = await Car.create(payload);
  return result;
};
const getAllCarsDB = async (query: Record<string, undefined>) => {
  const searchableFields = ["name"];
  const mainQuery = new QueryBuilder(
    Car.find({}).populate("type").populate("price"),
    query
  ).search(searchableFields);
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const carsQuery = mainQuery.paginate();
  const cars = await carsQuery.modelQuery;
  const result = { data: cars, totalPages: totalPages };

  return result;
};
const getSingleCarDB = async (carId: string) => {
  const result = await Car.findById(carId).populate("type").populate("price");
  return result;
};
const updateCarIntoDB = async (carId: string,file:any, payload: Partial<TCar>) => {
  const isCarExists=await Car.findById(carId)
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND ,"","Car Not Found.");   
  }
  if (file) {
    //Delete file from cloudinary 
    isCarExists?.image &&  await deleteImageCloudinary(isCarExists.image)
     //send image to cloudinary
     const { secure_url }: any = await uploadImageCloudinary(file?.filename, file?.path);
     payload.image = secure_url;
  }else{
    delete payload["image"]
  }

  const result = await Car.findByIdAndUpdate(carId, payload, {
    new: true,
  });
  return result;
};
const updateCarStatusDB = async (carId: string, isActive: string) => {
  const result = await Car.findByIdAndUpdate(
    carId,
    { isActive: isActive },
    { new: true }
  );
  return result;
};
const deleteCarDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};


export const CarServices = {
  createCarIntoDB,
  getAllCarsDB,
  getSingleCarDB,
  updateCarIntoDB,
  updateCarStatusDB,
  deleteCarDB,
  
};
