import sendEmail from "../../utils/sendEmail.js";
import OrderModel from "../order/order.model.js";
import { ProductModel } from "../product/product.schema.js";
import { UserModel } from "../user/user.schema.js";
import SellerRepository from "./seller.repository.js";

export default class SellerController {
  constructor() {
    this.sellerRepository = new SellerRepository();
  }

  /// 1. addProduct by seller only, this feature is already created in product folder

  ///2. get all the products of a specific seller.
  async getSellerProducts(req, res, next) {
    try {
      const sellerId = req.params.sellerId;
      // console.log("sellerId:-", sellerId);

      const sellerIdentity = await this.sellerRepository.findSeller(sellerId);
      console.log("sellerIdentity:- ", sellerIdentity);

      if (sellerIdentity.length === 0) {
        return res.status(404).send("Seller not found");
      }

      const products = await this.sellerRepository.getSellerProducts(sellerId);
      if (!products || products.length === 0) {
        res.status(404).send("Product not found");
      }
      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  //3. seller could update their products information
  async updateSellerProduct(req, res, next) {
    try {
      const productId = req.params.productId;
      const userId = req.userId; // from JWT token

      const product = await this.sellerRepository.findSellerSingleProduct(
        productId,
        userId
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedProduct = await this.sellerRepository.updateProduct(
        productId,
        userId,
        req.body
      );
      return res.status(201).json(updatedProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  //4. seller could update their stock
  async updateProductStock(req, res, next) {
    try {
      const productId = req.params.productId;
      const { stock } = req.body;
      const sellerId = req.userId; // from JWT token

      if (stock < 0) {
        return res.status(400).json({ message: "Stock cannot be negative" });
      }

      const product = await this.sellerRepository.updateProductStock(
        productId,
        sellerId,
        stock
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  ///5. Accept and cancel Order feature
  async updateOrderStatus(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const sellerId = req.userId; /// from JWT TOKEN
      const { status } = req.body;

      if (!["accepted", "cancelled", "shipped"].includes(status)) {
        return res.status(400).json({ message: "Invalid order status" });
      }

      const order = await this.sellerRepository.findOrder(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      console.log(order);
      ///.populate() replaces that ObjectId with the full Product document inside array
      /*example 
      {
      _id: ObjectId("..."),
      userID: ObjectId("..."),
      orderItems: [
      {
      product: {
        _id: ObjectId("..."),
        title: "Apple iphone 13 pro white color",
        desc: "...",
        price: 139000,
        stocks: 3,
        soldCount: 20,
        seller: ObjectId("..."),
        categories: [...],
        createdAt: "...",
        updatedAt: "..."
      },
      quantity: 2,
      price: 139000
     }
     ],
       totalAmount: 278000,
       paymentStatus: "pending",
       orderStatus: "pending",
       createdAt: "...",
       updatedAt: "..."
      }*/

      // Ensure seller owns at least one product in the order
      const ownsProduct = order.orderItems.some(
        (item) => item.product.seller.toString() === sellerId.toString()
      );

      if (!ownsProduct) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const orderStatusChanged = await this.sellerRepository.updateOrderStatus(
        order,
        status
      );

      /// Send Email When Seller Accepts Order
      if (status === "accepted") {
        const customer = await UserModel.findById(order.userID);

        await sendEmail({
          to: customer.email,
          subject: "Your Order Has Been Accepted",
          html: `
            <h3>Your order is accepted!</h3>
            <p>Order ID: ${order._id}</p>
          `,
        });
      }

      return res
        .status(201)
        .json({ message: "Order status updated", orderStatusChanged });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  //6. Fetch Seller's all orders from Order Collection
  async getSellerOrders(req, res, next) {
    try {
      const sellerId = req.userId; // from JWT

      const orders = await this.sellerRepository.getSellerDashboardOrders(
        sellerId
      );

      return res.status(200).json({
        totalOrders: orders.length,
        orders,
      });
    } catch (err) {
      next(err);
    }
  }
}
