import { model, Schema } from "mongoose"
import { CarTypeModel, TCarType } from "./type.interface"


const carTypeSchema = new Schema<TCarType,CarTypeModel>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      isActive:{
        type:Boolean,
        default: true
    }
    }, 
    {
      timestamps: true
    })
    carTypeSchema.statics.isNameExists =
    async function isNameExists(name: string) {
      return await this.findOne({ name: name });
    };
    export const CarType=model<TCarType ,CarTypeModel>('Type',carTypeSchema)