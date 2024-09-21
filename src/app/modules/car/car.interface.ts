import { Model, Types } from "mongoose";

export type TCar = {
  _id?: Types.ObjectId;
  type: Types.ObjectId;
  name: string;
  image: string;
  drivingType:string;
  seats:number;
  bagCapability:string | number;
  fuelType:string,
  transmission:string;
  airConditioning:"Yes" | "No";
  description: string;
  color: string;
  features: string[];
  price: Types.ObjectId;
  isActive: boolean;
  isDeleted: boolean;
};
export interface CarModel extends Model<TCar> {
  isNameExists(name: string): Promise<TCar | null>;
}
