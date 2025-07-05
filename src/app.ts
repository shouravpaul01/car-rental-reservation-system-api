import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { CarRoutes } from "./app/modules/car/car.route";
import { BookingRoutes } from "./app/modules/booking/booking.route";
import notFound from "./app/middlewares/notFound";
import { CarTypeRoutes } from "./app/modules/car-type/type.route";
import { PriceRoutes } from "./app/modules/price/price.route";
import { PaymentRoutes } from "./app/modules/payment/payment.route";
import { UserRoutes } from "./app/modules/user/user.route";
import { BannerRoutes } from "./app/modules/banner/banner.route";
const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/banner", BannerRoutes);
app.use("/api/car-types", CarTypeRoutes);
app.use("/api/prices", PriceRoutes);
app.use("/api/cars", CarRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/payment", PaymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Global error handler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);
export default app;
