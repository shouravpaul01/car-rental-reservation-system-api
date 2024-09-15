import express from "express";
import { CarTypeControllers } from "./type.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarTypeValidations } from "./type.validation";
import { upload } from "../../utils/uploadImageCloudinary";
import parseData from "../../middlewares/parseData";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-car-type",
  auth(USER_ROLE.admin),
  upload.single("file"),
  parseData,
  validateRequest(CarTypeValidations.createCarTypeValidationSchema),
  CarTypeControllers.createCarTypeInto
);
router.get('/',CarTypeControllers.getAllCarTypes)
router.get('/single-car-type/:carTypeId',CarTypeControllers.getSingleCarType)
router.patch('/:carTypeId',auth(USER_ROLE.admin), upload.single("file"),
parseData,CarTypeControllers.updateCarTypeInto)
router.patch('/update-status/:carTypeId',auth(USER_ROLE.admin),CarTypeControllers.updateCarTypeStatus)
router.get('/active-car-types',CarTypeControllers.getAllActiveCarTypes)

export const CarTypeRoutes=router