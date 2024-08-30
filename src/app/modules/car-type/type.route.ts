import express from "express";
import { CarTypeControllers } from "./type.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarTypeValidations } from "./type.validation";

const router = express.Router();

router.post(
  "/create-car-type",
  validateRequest(CarTypeValidations.createCarTypeValidationSchema),
  CarTypeControllers.createCarTypeInto
);
router.get('/',CarTypeControllers.getAllCarTypes)
router.get('/single-car-type/:carTypeId',CarTypeControllers.getSingleCarType)
router.patch('/:carTypeId',CarTypeControllers.updateCarTypeInto)
router.patch('/update-status/:carTypeId',CarTypeControllers.updateCarTypeStatus)
router.get('/active-car-types',CarTypeControllers.getAllActiveCarTypes)

export const CarTypeRoutes=router