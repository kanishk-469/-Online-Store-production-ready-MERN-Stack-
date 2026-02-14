// Manage routes/paths to CartController

// 1. Import express.
import express from "express";
import CartItemsController from "./cart.controller.js";
import { customerOnly } from "../../middlewares/role.middleware.js";

// 2. Initialize Express router.
const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.delete("/:id", customerOnly, (req, res, next) => {
  cartController.deleteOneItem(req, res, next);
});
cartRouter.post("/", customerOnly, (req, res, next) => {
  cartController.add(req, res, next);
});
cartRouter.get("/", customerOnly, (req, res, next) => {
  cartController.get(req, res, next);
});

export default cartRouter;
