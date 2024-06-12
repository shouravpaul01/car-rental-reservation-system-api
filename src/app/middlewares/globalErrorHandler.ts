import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Somthing wrong";

  return res.status(statusCode).json({
    status: false,
    message,
    error,
  });
};

export default globalErrorHandler;
