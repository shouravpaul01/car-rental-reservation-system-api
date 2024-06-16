import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { CarControllers } from "./car.controller";
const router =express.Router()

router.post('/',validateRequest(CarValidations.createCarValidationSchema),CarControllers.createCarInto)
router.get('/',CarControllers.getAllCars)
router.get('/:id',CarControllers.getCarById)

router.delete('/:id',CarControllers.deleteCar)
router.put(
    "/return",
    validateRequest(CarValidations.returnCarValidationSchema),CarControllers.returnCar
  )

router.put('/:id',validateRequest(CarValidations.updateCarValidationSchema),CarControllers.updateCarInto)


export const CarRoutes=router 