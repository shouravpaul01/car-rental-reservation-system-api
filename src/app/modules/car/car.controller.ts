import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const createCarInto=catchAsync(async(req,res)=>{
    const result=await CarServices.createCarIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Car created successfully",
        data:result
    })
})

const getAllCars=catchAsync(async(req,res)=>{

    const result=await CarServices.getAllCarsDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Cars retrieved successfully",
        data:result
    })
})
const getCarById=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result=await CarServices.getCarByIdDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"A Car retrieved successfully",
        data:result
    })
})
const updateCarInto=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result=await CarServices.updateCarIntoDB(id,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Car updated successfully",
        data:result
    })
})
const deleteCar=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result=await CarServices.deleteCarDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        status:true,
        message:"Car Deleted successfully",
        data:result
    })
})

const returnCar = catchAsync(async (req, res) => {
    
    const result = await CarServices.returnCarDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: "Car returned successfully",
      data: result,
    });
  });
export const CarControllers={
    createCarInto,getAllCars,getCarById,updateCarInto,deleteCar,returnCar

}