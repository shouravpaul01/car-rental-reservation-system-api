import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const signin=catchAsync(async(req,res)=>{
    const result =await AuthServices.signinDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        status: true,
        message: "User logged in successfully.",
        data: result,
      });
})

export const AuthControllers={
    signin
}