import { model, Schema } from "mongoose";
import { TPrice } from "./price.interface";

const priceSchema = new Schema<TPrice>(
  {
    hourly: {
      ratePerHour: {
        type: Number,
        required: true,
      },
      policy: {
        type: String,
        required: true,
      },
    },
    daily: {
      ratePerDay: {
        type: Number,
        required: true,
      },
      policy: {
        type: String,
        required: true,
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Price = model<TPrice>("Price", priceSchema);
