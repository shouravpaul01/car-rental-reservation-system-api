import { Response } from "express";

type TSendResponse<T> = {
  statusCode: number;
  status: boolean;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  return res.status(data.statusCode).json({
    status: data.status,
    message: data?.message,
    data: data.data,
  });
};
