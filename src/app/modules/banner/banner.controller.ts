import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BannerServices } from "./banner.service";


const createBanner= catchAsync(async (req, res) => {
  const result = await BannerServices.createBannerDB(req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully created",
    data: result,
  });
});

const getAllBanners = catchAsync(async (req, res) => {
 
  const result = await BannerServices.getAllBannersDB(
    req.query as Record<string, undefined>
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Banners retrieved successfully",
    data: result,
  });
});
const getSingleBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const result = await BannerServices.getSingleBannerDB(bannerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "A Banner retrieved successfully",
    data: result,
  });
});
const updateBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const result = await BannerServices.updateBannerDB(bannerId,req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully updated.",
    data: result,
  });
});
const updateBannerStatus = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const { isActive } = req.query;
  const result = await BannerServices.updateBannerStatusDB(bannerId, isActive as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Successfully updated Status.",
    data: result,
  });
});
const deleteBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const result = await BannerServices.deleteBannerDB(bannerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: "Banner deleted successfully",
    data: result,
  });
});


export const BannerControllers = {
 createBanner,
 getAllBanners,
 getSingleBanner,
 updateBanner,
 updateBannerStatus,
 deleteBanner
};