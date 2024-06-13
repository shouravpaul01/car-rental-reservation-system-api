import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB=async(payload:TCar)=>{
    const result=await Car.create(payload)
    return result
}
const getAllCarsDB=async()=>{
    const result=await Car.find({})
    return result
}
const getCarByIdDB=async(id:string)=>{
    const result=await Car.findById(id)
    return result
}
const updateCarIntoDB=async(id:string,payload:Partial<TCar>)=>{
    const result=await Car.findByIdAndUpdate(id,payload,{
        new:true
    })
    return result
}
const deleteCarDB=async(id:string)=>{
    const result=await Car.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}

export const CarServices={
    createCarIntoDB,getAllCarsDB,getCarByIdDB,updateCarIntoDB,deleteCarDB
}