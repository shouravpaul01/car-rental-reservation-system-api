import axios from "axios";
import { config } from "../../config";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import { TPaymentInfo } from "./payment.type";

export const initiatePayment = async (paymentInfo:TPaymentInfo) => {

  try {
    const res:any = await axios.post(config.payment_base_url!, {
      store_id: config.store_id,
      tran_id: paymentInfo.transectionId,
      success_url: `http://localhost:3000/api/payment/confirm?txnId=${paymentInfo.transectionId}&status=success`,
      fail_url: `http://localhost:3000/api/payment/confirm?&status=failed`,
      cancel_url: "http://localhost:5173/",
      amount: paymentInfo.amount,
      currency: "BDT",
      signature_key: config.signature_key,
      desc: "Merchant Registration Payment",
      cus_name: paymentInfo.customerName,
      cus_email: paymentInfo.customerEmail,
      cus_add1: "House B-158 Road 22",
      cus_add2: "Mohakhali DOHS",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1206",
      cus_country: "Bangladesh",
      cus_phone: paymentInfo.customerPhone,
      type: "json",
    });
   
    return res.data;
  } catch (error) {
 
    throw new AppError(httpStatus.FORBIDDEN, "", "Payment Failed.");
  }
};

export const verifyPayment=async(txnId:string)=>{
    const res=await axios.get(config.payment_verify_url!,{
        params:{
            store_id:config.store_id,
            signature_key:config.signature_key,
            type:"json",
            request_id:txnId
        }
    })
    return res.data
}