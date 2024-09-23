import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const paymentConfirmation=catchAsync(async(req,res)=>{
    const {txnId ,status}=req.query
    const result = await PaymentServices.paymentConfirmationDB(txnId as string,status as string);
    if (result) {
      res.redirect('http://localhost:5173/dashboard?tab=my-bookings&payment=success')
    }else{
      res.redirect('http://localhost:5173/payment-cencel')
    }
    
})
export const PaymentControllers={paymentConfirmation}