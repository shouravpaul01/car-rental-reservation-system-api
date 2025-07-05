import { model, Schema } from "mongoose";
import { TBanner } from "./banner.interface";

const bannerSchema = new Schema<TBanner>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String,required:true },
    link: { type: String },
    car: { type: Schema.Types.ObjectId,ref:"Car" },
    isActive: { type: Boolean, default: true },
    isDelate: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Banner = model<TBanner>("Banner", bannerSchema);
