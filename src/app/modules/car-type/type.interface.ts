import { Model } from "mongoose";

export type TCarType ={
    name: string;
    description?: string;
    isActive:boolean
  }

  export interface CarTypeModel extends Model<TCarType>{
    isNameExists(name:string):Promise<TCarType | null>
    
  }