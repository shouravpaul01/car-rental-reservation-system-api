import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";

const paymentConfirmationDB = async (txnId: string) => {
  const verifyPaymentRes = await verifyPayment(txnId);
  if (verifyPaymentRes && verifyPaymentRes.pay_status === "Successful") {
    const result = await Booking.findOneAndUpdate(
      { "advancedPaymentDetails.transectionId": txnId },
      { "advancedPaymentDetails.paymentStatus": "Paid" },
      { new: true }
    );
    return result;
  }else{
    await Booking.findOneAndDelete({ "advancedPaymentDetails.transectionId": txnId })
    throw new AppError(httpStatus.NOT_FOUND,"bookingError","You have failed to book the car.");
    
  }
};
const paymentCencelDB = async () => {};
export const PaymentServices = { paymentConfirmationDB, paymentCencelDB };
