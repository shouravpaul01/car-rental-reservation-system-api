import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const createCarInto = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully created",
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  console.log("sseeeww");
  const result = await CarServices.getAllCarsDB(
    req.query as Record<string, undefined>
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});
const getSingleCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.getSingleCarDB(carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "A Car retrieved successfully",
    data: result,
  });
});
const updateCarInto = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.updateCarIntoDB(carId,req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully updated.",
    data: result,
  });
});
const updateCarStatus = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const { isActive } = req.query;
  const result = await CarServices.updateCarStatusDB(carId, isActive as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully updated Status.",
    data: result,
  });
});
const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Car Deleted successfully",
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const result = await CarServices.returnCarDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Car returned successfully",
    data: result,
  });
});
export const CarControllers = {
  createCarInto,
  getAllCars,
  getSingleCar,
  updateCarInto,
  updateCarStatus,
  deleteCar,
  returnCar,
};