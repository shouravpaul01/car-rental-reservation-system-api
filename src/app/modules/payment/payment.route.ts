import express from 'express'
import { PaymentControllers } from './payment.controller'

const router=express.Router()

router.post("/confirm",PaymentControllers.paymentConfirmation)

export const PaymentRoutes=router