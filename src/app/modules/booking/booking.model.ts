import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
   
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    car: { type:  Schema.Types.ObjectId, ref: 'Car', required: true }, 
    startTime: { type: String, required: true },
    pickupDate:{
        type:Date,
    },
    endTime: { type: String, default:null},
    totalCost: { type: Number, default: 0 }
});

export const Booking =model<TBooking>('Booking', bookingSchema);