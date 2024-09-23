import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import { Car } from "../car/car.model";

const paymentConfirmationDB = async (txnId: string, status: string) => {
  const verifyPaymentRes = await verifyPayment(txnId);
  if (
    verifyPaymentRes &&
    verifyPaymentRes.pay_status === "Successful" &&
    status == "success"
  ) {
    const result = await Booking.findOneAndUpdate(
      { "advancedPaymentDetails.transectionId": txnId },
      { "advancedPaymentDetails.paymentStatus": "Paid" },
      { new: true }
    );
    return true;
  }else{
    const isBookingExists= await Booking.findOne({
      "advancedPaymentDetails.transectionId": txnId,
    })
    if (!isBookingExists) {
      return false
    }
    await Booking.findOneAndDelete({
      "advancedPaymentDetails.transectionId": txnId,
    });
    await Car.findByIdAndUpdate(isBookingExists?.car,{ $inc: { quantity:isBookingExists?.quantity } },{new:true})
    return false;
  }
};
const paymentCencelDB = async () => {};
export const PaymentServices = { paymentConfirmationDB, paymentCencelDB };
