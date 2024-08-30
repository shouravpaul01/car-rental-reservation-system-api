import {  Types } from "mongoose";

export type TCar  ={
    _id?:Types.ObjectId,
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    pricePerHour: number;
    status: "available" | "unavailable";
    isDeleted: boolean;
};