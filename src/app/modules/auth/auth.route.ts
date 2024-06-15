import express from "express";
import { UserControllers } from "../user/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../user/user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUserInto
);

export const AuthRoutes = router;
