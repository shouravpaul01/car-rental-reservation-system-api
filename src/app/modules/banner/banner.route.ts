import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../utils/uploadImageCloudinary";
import parseData from "../../middlewares/parseData";
import { BannerControllers } from "./banner.controller";
import { createBannerValidation } from "./banner.validation";
const router = express.Router();

router.post(
  "/create-banner",
  auth(USER_ROLE.admin),
  upload.single("file"),
  parseData,
  validateRequest(createBannerValidation),
  BannerControllers.createBanner
);
router.get("/", BannerControllers.getAllBanners);
router.get("/single-banner/:bannerId", BannerControllers.getSingleBanner);

router.delete("delete/:id", auth(USER_ROLE.admin), BannerControllers.deleteBanner);

router.patch(
  "/update-banner/:bannerId",
  auth(USER_ROLE.admin),
  upload.single("file"),
  parseData,
  validateRequest(createBannerValidation),
  BannerControllers.updateBanner
);
router.patch("/update-status/:bannerId",auth(USER_ROLE.admin), BannerControllers.updateBannerStatus);

export const BannerRoutes = router;
