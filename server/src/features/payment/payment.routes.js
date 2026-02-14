import express from "express";
import { createPaymentOrder, verifyPayment } from "./payment.controller.js";
import { customerOnly } from "../../middlewares/role.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/createOrder", customerOnly, createPaymentOrder);
paymentRouter.post("/verifyPayment", customerOnly, verifyPayment);

export default paymentRouter;
