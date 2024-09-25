import express from 'express'
import { UserControllers } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
const router=express.Router()

router.patch("/update-user",auth(USER_ROLE.user),UserControllers.updateUserInto)
router.get("/",auth(USER_ROLE.admin),UserControllers.getAllUsers)
router.patch("/update-role",auth(USER_ROLE.admin),UserControllers.updateUserRole)
export const UserRoutes=router