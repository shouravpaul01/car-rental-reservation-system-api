import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CarTypeServices } from "./type.service";


const createCarTypeInto = catchAsync(async (req, res) => {
    const result = await CarTypeServices.createCarTypeIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Successfully Type added.",
      data: result,
    });
  });
  const getAllCarTypes = catchAsync(async (req, res) => { 
    const result = await CarTypeServices.getAllCarTypesDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Successfully retrived all Types.",
      data: result,
    });
  });
  const getSingleCarType = catchAsync(async (req, res) => {
    const { carTypeId } = req.params;
    const result = await CarTypeServices.getSingleCarTypeDB(carTypeId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Successfully retrived Types.",
      data: result,
    });
  });
  const updateCarTypeInto = catchAsync(async (req, res) => {
    const { carTypeId } = req.params;
    const result = await CarTypeServices.updateCarTypeIntoDB(carTypeId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Successfully updated.",
      data: result,
    });
  });
  const updateCarTypeStatus = catchAsync(async (req, res) => {
    const { carTypeId } = req.params;
    const { status } = req.query;
    const result = await CarTypeServices.updateCarTypeStatusDB(
        carTypeId,
      status as string
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Successfully updated status.",
      data: result,
    });
  });
  const getAllActiveCarTypes = catchAsync(async (req, res) => {
    const result = await CarTypeServices.getAllActiveCarTypeDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Successfully Get all active Types",
      data: result,
    });
  });
  export const CarTypeControllers = {
   createCarTypeInto,
   getAllCarTypes,
   getSingleCarType,
   updateCarTypeInto,
   updateCarTypeStatus,
   getAllActiveCarTypes
  };
  