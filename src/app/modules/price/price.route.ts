import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { PriceController } from "./price.controller";
import validateRequest from "../../middlewares/validateRequest";
import { priceValidation } from "./price.validation";

const router = express.Router();

router.post(
  "/create-price",
  auth(USER_ROLE.admin),
  validateRequest(priceValidation),
  PriceController.createPriceInto
);
router.get("/", PriceController.getAllPrice);
router.get("/single-price/:priceId", PriceController.getSinglePrice);
router.patch(
  "/:priceId",
  auth(USER_ROLE.admin),
  validateRequest(priceValidation),
  PriceController.updatePriceInto
);
router.patch(
  "/update-status/:priceId",
  auth(USER_ROLE.admin),
  PriceController.updatePriceStatus
);
router.get("/active-prices", PriceController.getAllActivePrice);

export const PriceRoutes = router;
