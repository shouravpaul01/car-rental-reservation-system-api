import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PriceServices } from "./price.service";

const createPriceInto = catchAsync(async (req, res) => {
  const result = await PriceServices.createPriceIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Added.",
    data: result,
  });
});
const getAllPrice = catchAsync(async (req, res) => {
  const result = await PriceServices.getAllPriceDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully retrived all Price.",
    data: result,
  });
});
const getSinglePrice = catchAsync(async (req, res) => {
  const { priceId } = req.params;
  const result = await PriceServices.getSinglePriceDB(priceId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully retrived single price.",
    data: result,
  });
});
const updatePriceInto = catchAsync(async (req, res) => {
  const { priceId } = req.params;
  const result = await PriceServices.updatePriceIntoDB(priceId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully updated.",
    data: result,
  });
});
const updatePriceStatus = catchAsync(async (req, res) => {
  const { priceId } = req.params;
  const { isActive } = req.query;
  const result = await PriceServices.updatePriceStatusDB(
    priceId,
    isActive as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully updated status.",
    data: result,
  });
});
const getAllActivePrice = catchAsync(async (req, res) => {
  const result = await PriceServices.getAllActivePriceDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully Get all active price",
    data: result,
  });
});
export const PriceController = {
  createPriceInto,
  getAllPrice,
  getSinglePrice,
  updatePriceInto,
  updatePriceStatus,
  getAllActivePrice
};
