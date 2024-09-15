import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { AppError } from "../errors/AppError";
import httpStatus from "http-status";

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "", "Unauthorized!");
  }
};

export default verifyToken;
