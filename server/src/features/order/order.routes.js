import express from "express";
import OrderController from "./order.controller.js";
import { customerOnly } from "../../middlewares/role.middleware.js";

const orderRouter = express.Router();

const orderController = new OrderController();

orderRouter.post("/", customerOnly, (req, res, next) => {
  orderController.createOrderFromCart(req, res, next); // to bind the placeOrder method
});

export default orderRouter;
