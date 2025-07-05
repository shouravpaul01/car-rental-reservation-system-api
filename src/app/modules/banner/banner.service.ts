import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import {
  deleteImageCloudinary,
  uploadImageCloudinary,
} from "../../utils/uploadImageCloudinary";
import { TBanner } from "./banner.interface";
import { Banner } from "./banner.modal";

const createBannerDB = async (file: any, payload: TBanner) => {
  if (file) {
    //send image to cloudinary
    const { secure_url }: any = await uploadImageCloudinary(
      file?.filename,
      file?.path
    );
    console.log(secure_url, "secure url in create car");
    payload.image = secure_url;
  }
  const result = await Banner.create(payload);
  return result;
};
const getAllBannersDB = async (query: Record<string, undefined>) => {
  const searchableFields = ["title", "subtitle"];
  const mainQuery = new QueryBuilder(Banner.find({}).populate("car"), query)
    .search(searchableFields)
    .filter();
  const totalPages = (await mainQuery.totalPages()).totalQuery;
  const bannerQuery = mainQuery.paginate();
  const banners = await bannerQuery.modelQuery;
  const result = { data: banners, totalPages: totalPages };

  return result;
};

const getSingleBannerDB = async (bannerId: string) => {
  const result = await Banner.findById(bannerId).populate("car");
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "bannerError",
      "Banner not found."
    );
  }
  return result;
};
const updateBannerDB = async (
  bannerId: string,
  file: any,
  payload: Partial<TBanner>
) => {
  const isBannerExist = await Banner.findById(bannerId);
  if (!isBannerExist) {
    throw new AppError(httpStatus.NOT_FOUND, "", "Car Not Found.");
  }
  if (file) {
    //Delete file from cloudinary
    isBannerExist?.image && (await deleteImageCloudinary(isBannerExist.image));

    //send image to cloudinary
    const { secure_url }: any = await uploadImageCloudinary(
      file?.filename,
      file?.path
    );
    payload.image = secure_url;
  } else {
    delete payload["image"];
  }

  const result = await Banner.findByIdAndUpdate(bannerId, payload, {
    new: true,
  });
  return result;
};
const updateBannerStatusDB = async (bannerId: string, isActive: string) => {
  const result = await Banner.findByIdAndUpdate(
    bannerId,
    { isActive: isActive },
    { new: true }
  );
  return result;
};
const deleteBannerDB = async (bannerId: string) => {
  const result = await Banner.findByIdAndUpdate(
    bannerId,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const BannerServices={
    createBannerDB,
    getAllBannersDB,
    getSingleBannerDB,
    updateBannerDB,
    updateBannerStatusDB,
    deleteBannerDB
}