import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { boolean, number } from "zod";

const bookingSchema = new Schema<TBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    drivingType: {
      type: String,
    },
    priceType: {
      price: {
        type: Number,
      },
      type: {
        type: String,
      },
    },
    startTime: { type: String, required: true },

    pickupDate: {
      type: Date,
    },
    pickupLocation: {
      type: String,
    },

    endTime: { type: String, default: null },
    returnLocation: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    returnStatus: {
      type: Boolean,
    },
    returnDate: {
      type: Date,
    },
    advancedPaymentDetails: {
      amount: {
        type: Number,
      },
      transectionId: {
        type: String,
      },
      date: {
        type: Date,
      },
      paymentStatus: {
        type: String,
        default: "Pending",
      },
    },
    totalCost: { type: Number, default: 0 },
    quantity: { type: Number },
    paymentDetails: {
      advancedAmount: {
        type: Number,
      },
      returnAmount:{
        type: Number,
        default:0
      },
      amount: {
        type: Number,
        default:0
      },
      transectionId: {
        type: String,
      },
      date: {
        type: Date,
      },
      paymentStatus: {
        type: String,
        default: "Pending",
      },
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
