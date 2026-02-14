import ApplicationError from "../../error-handler/applicationError.js";
import sendEmail from "../../utils/sendEmail.js";
import { ProductModel } from "../product/product.schema.js";
import { UserModel } from "../user/user.schema.js";
import OrderRepository from "./order.repository.js";

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrderFromCart(req, res) {
    try {
      const userId = req.userId; /// from JWT token

      const order = await this.orderRepository.createOrderFromCart(userId);
      console.log(order);

      const user = await UserModel.findById(userId);
      console.log("User email", user);

      ////Send email notification using nodemailer module, Send Email After Order Placed
      await sendEmail({
        to: user.email,
        subject: "Order Confirmation",
        html: `
          <h2>Thank you for your order!</h2>
          <p>Your order ID: <b>${order._id}</b></p>
          <p>Total Amount: ₹${order.totalAmount}</p>
        `,
      });

      /////Notify Seller on New Order
      for (const item of order.orderItems) {
        const product = await ProductModel.findById(item.product).populate(
          "seller"
        );

        console.log("product ", product);
        await sendEmail({
          to: product.seller.email,
          subject: "New Order Received",
          html: `
            <h3>New Order for Your Product</h3>
            <p>Product: ${product.title}</p>
            <p>Quantity: ${item.quantity}</p>
          `,
        });
      }

      return res.status(201).send("Order is Successful");
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default OrderController;
