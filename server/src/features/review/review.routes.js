import express from "express";
import ReviewController from "./review.controller.js";
import { customerOnly } from "../../middlewares/role.middleware.js";

const reviewRouter = express.Router();
const reviewController = new ReviewController();

//// Old route localhost:8080/api/products/rating?userID=2&productID=1&rating=4 for rating a product
//// New route==> localhost:8080/api/reviews/ratings?userID=2&productID=1&rating=4 for rating a product
reviewRouter.post("/ratings", customerOnly, (req, res, next) =>
  reviewController.rateProduct(req, res, next)
);

export default reviewRouter;
