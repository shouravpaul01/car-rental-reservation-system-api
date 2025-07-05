import { Schema, model } from "mongoose";
import { CarModel, TCar } from "./car.interface";

const carSchema = new Schema<TCar, CarModel>(
  {
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      
    },
    drivingType: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    bagCapability: {
      type: Number || String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    airConditioning: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      required: true,
    },
    price: {
      type: Schema.Types.ObjectId,
      ref: "Price",
      required: true,
    },
    quantity: {
      type:Number,
      required:true
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
   
  },
  {
    timestamps: true,
  }
);
carSchema.statics.isNameExists = async function isNameExists(name: string) {
  return await this.findOne({ name: name });
};
export const Car = model<TCar, CarModel>("Car", carSchema);
