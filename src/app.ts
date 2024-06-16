import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { CarRoutes } from "./app/modules/car/car.route";
import { BookingRoutes } from "./app/modules/booking/booking.route";
import notFound from "./app/middlewares/notFound";
const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/cars", CarRoutes);
app.use("/api/bookings", BookingRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Global error handler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);
export default app;
