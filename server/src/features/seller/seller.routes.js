import express from "express";
import SellerController from "./seller.controller.js";
import { uploadFile } from "../../middlewares/fileupload.middleware.js";
import { sellerOnly } from "../../middlewares/role.middleware.js";

const sellerRouter = express.Router();

const sellerController = new SellerController();

/// Get all products for a specific seller
sellerRouter.get("/products/:sellerId", sellerOnly, (req, res, next) => {
  sellerController.getSellerProducts(req, res, next);
});

//seller routes for update their products information
sellerRouter.put(
  "/products/:productId",
  sellerOnly,
  uploadFile.single("imageUrl"),
  (req, res, next) => {
    sellerController.updateSellerProduct(req, res, next);
  }
);

//seller could update their stock
sellerRouter.patch(
  "/products/:productId/stock",
  sellerOnly,
  (req, res, next) => {
    sellerController.updateProductStock(req, res, next);
  }
);

//seller gets all orders from order collection
sellerRouter.get("/orders", sellerOnly, (req, res, next) => {
  sellerController.getSellerOrders(req, res, next);
});

//seller could accept and cancel order routes
sellerRouter.patch("/orders/:orderId/status", sellerOnly, (req, res, next) => {
  sellerController.updateOrderStatus(req, res, next);
});

///Many other routes can be added
////Route or path pagination for reference
//GET /api/seller/orders?page=1&limit=5&status=pending&payment=paid

export default sellerRouter;
