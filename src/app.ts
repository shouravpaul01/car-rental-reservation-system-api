import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Global error handler
app.use(globalErrorHandler);
export default app;
