import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const paymentConfirmation=catchAsync(async(req,res)=>{
    const {txnId}=req.query
    const result = await PaymentServices.paymentConfirmationDB(txnId as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Succesfully Booked a Car.",
      data: result,
    });
})
export const PaymentControllers={paymentConfirmation}