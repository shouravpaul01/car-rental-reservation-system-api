import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { CarControllers } from "./car.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router =express.Router()

router.post('/',auth(USER_ROLE.admin),validateRequest(CarValidations.createCarValidationSchema),CarControllers.createCarInto)
router.get('/',CarControllers.getAllCars)
router.get('/:id',CarControllers.getCarById)

router.delete('/:id',auth(USER_ROLE.admin),CarControllers.deleteCar)
router.put(
    "/return",auth(USER_ROLE.admin),
    validateRequest(CarValidations.returnCarValidationSchema),CarControllers.returnCar
  )

router.put('/:id',auth(USER_ROLE.admin),validateRequest(CarValidations.updateCarValidationSchema),CarControllers.updateCarInto)


export const CarRoutes=router 