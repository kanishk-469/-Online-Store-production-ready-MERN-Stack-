import crypto from "crypto";
import razorpayInstance from "../../config/razorpay.js";
import { getOneOrder, orderPaymentStatus } from "./payment.repository.js";

/*
💳 Payments
Razorpay integration (test mode)
Secure payment verification
*/

export const createPaymentOrder = async (req, res, next) => {
  try {
    //donot accept amount from client, anyone can use inspect element and send changed amount to server.
    const { orderId } = req.body;

    const order = await getOneOrder(orderId);

    if (!order) {
      return res.status(400).send("Order not found..!");
    }

    const razorOrder = await razorpayInstance.orders.create({
      amount: order.totalAmount * 100, /// razorpay 1.00 understand, if we send 100 to it, so amount * 100 send
      currency: "INR",
      receipt: orderId,
    });

    return res.status(200).json(razorOrder);
  } catch (err) {
    console.log(err);
    // next(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

/// use RAZORPAY_SECRET_KEY and create hmac object and compare with razorpay_signature
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    /// create hmac object, crypto is a node Inbuilt module, to generated_signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (generated_signature !== razorpay_signature)
      return res.status(400).json({ message: "Payment verification failed" });

    const statusUpdated = await orderPaymentStatus(orderId);

    res.status(200).json({ message: "Payment successfully verified" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Payment not verified",
    });
  }
};
