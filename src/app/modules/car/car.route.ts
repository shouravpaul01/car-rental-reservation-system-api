import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { CarControllers } from "./car.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../utils/uploadImageCloudinary";
import parseData from "../../middlewares/parseData";
const router = express.Router();

router.post(
  "/create-car",
  auth(USER_ROLE.admin),
  upload.single("file"),
  parseData,
  validateRequest(CarValidations.CarValidationSchema),
  CarControllers.createCarInto
);
router.get("/", CarControllers.getAllCars);
router.get("/single-car/:carId", CarControllers.getSingleCar);
router.patch("/update-status/:carId",auth(USER_ROLE.admin), CarControllers.updateCarStatus);
router.delete("/:id", auth(USER_ROLE.admin), CarControllers.deleteCar);

router.patch(
  "/:carId",
  auth(USER_ROLE.admin),
  upload.single("file"),
  parseData,
  validateRequest(CarValidations.CarValidationSchema),
  CarControllers.updateCarInto
);

export const CarRoutes = router;
