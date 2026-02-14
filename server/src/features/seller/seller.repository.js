import mongoose from "mongoose";
import ApplicationError from "../../error-handler/applicationError.js";
import { ProductModel } from "../product/product.schema.js";
import { UserModel } from "../user/user.schema.js";
import OrderModel from "../order/order.model.js";

export default class SellerRepository {
  async findSeller(sellerId) {
    try {
      return await UserModel.find({
        _id: new mongoose.Types.ObjectId(sellerId),
      });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getSellerProducts(sellerId) {
    try {
      return await ProductModel.find({
        seller: new mongoose.Types.ObjectId(sellerId),
      });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findSellerSingleProduct(productId, userId) {
    try {
      return await ProductModel.findOne({
        _id: new mongoose.Types.ObjectId(productId),
        seller: new mongoose.Types.ObjectId(userId),
      });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async updateProduct(productId, sellerId, updateData) {
    try {
      const product = await ProductModel.findOne({
        _id: new mongoose.Types.ObjectId(productId),
        seller: new mongoose.Types.ObjectId(sellerId),
      });
      console.log(product);

      const allowedUpdated = [
        "title",
        "desc",
        "size",
        "price",
        "categories",
        "imageUrl",
        "isFeatured",
      ];

      allowedUpdated.forEach((field) => {
        if (updateData[field] !== undefined) {
          product[field] = updateData[field];
        }
      });
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Database update failed", 500);
    }
  }

  ///update product stock only
  async updateProductStock(productId, sellerId, stock) {
    try {
      const updatedStock = await ProductModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(productId),
          seller: new mongoose.Types.ObjectId(sellerId),
        },
        {
          $inc: { stock: stock }, // increment instead of overwrite
        },
        {
          new: true,
        }
      );

      return updatedStock;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  //seller could accept and cancel order routes
  async findOrder(orderId) {
    try {
      const order = await OrderModel.findById(orderId).populate(
        "orderItems.product"
      );

      return order;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async updateOrderStatus(order, status) {
    try {
      // If order cancelled → restore stock
      if (status === "cancelled") {
        for (const item of order.orderItems) {
          await ProductModel.findByIdAndUpdate(item.product._id, {
            $inc: { stock: item.quantity, soldCount: item.quantity },
          });
        }
      }

      order.orderStatus = status;
      const result = await order.save();
      return result;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  /// seller gets their customer's order details
  /*
  When a customer places an order,
  each seller should see the orders that contain their products on their dashboard.
  */
  async getSellerDashboardOrders(sellerId) {
    try {
      // 1️ Get all product IDs created by seller
      const sellerProducts = await ProductModel.find({
        seller: new mongoose.Types.ObjectId(sellerId),
      }).select("_id");

      const productIds = sellerProducts.map((p) => p._id);
      console.log("product IDs of a seller", productIds);

      if (productIds.length === 0) {
        return [];
      }

      // 2️ Find orders containing those products
      const orders = await OrderModel.find({
        "orderItems.product": { $in: productIds },
      })
        .select("-_id -__v") // remove order _id
        .populate({
          path: "userID",
          select: "name email -_id", // remove user _id
        })
        .populate({
          path: "orderItems.product",
          select: "title price stock imageUrl -_id", // remove product _id
        })
        .sort({ createdAt: -1 });

      console.log("final result", orders);

      ///REMOVE _id FROM SUBDOCUMENTS (Clean Way)
      const cleanedOrders = orders.map((order) => {
        const orderObj = order.toObject();

        orderObj.orderItems = orderObj.orderItems.map((item) => {
          delete item._id;
          return item;
        });

        return orderObj;
      });

      return cleanedOrders;

      // return orders;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Database error", 500);
    }
  }
}
