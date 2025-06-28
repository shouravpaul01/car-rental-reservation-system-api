import express from 'express'
import { UserControllers } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
const router=express.Router()

router.post("/create-user",auth(USER_ROLE.admin),UserControllers.createUserInto)
router.patch("/update-user/:userId",auth(USER_ROLE.user,USER_ROLE.admin),UserControllers.updateUserInto)
router.get("/",auth(USER_ROLE.admin),UserControllers.getAllUsers)
router.get("/single-user/:email",auth(USER_ROLE.admin,USER_ROLE.user),UserControllers.getSingleUser) 

router.patch("/update-role",auth(USER_ROLE.admin),UserControllers.updateUserRole)
router.patch("/update-status",auth(USER_ROLE.admin),UserControllers.updateStatus)
export const UserRoutes=router