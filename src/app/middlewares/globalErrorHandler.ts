import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Somthing wrong";

  return res.status(statusCode).json({
    status: false,
    message,
    error,
  });
};

export default globalErrorHandler;
