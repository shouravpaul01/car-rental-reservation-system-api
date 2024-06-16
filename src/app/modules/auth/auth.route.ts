import express from "express";
import { UserControllers } from "../user/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../user/user.validation";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUserInto
);
router.post(
  "/signin",
  validateRequest(AuthValidations.signinValidationSchema),
  AuthControllers.signin
);

export const AuthRoutes = router;
