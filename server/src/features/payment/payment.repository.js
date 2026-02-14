import ApplicationError from "../../error-handler/applicationError.js";
import OrderModel from "../order/order.model.js";

export const getOneOrder = async (orderId) => {
  try {
    // fetching complete order deatils from database
    const order = await OrderModel.findById(orderId);
    return order;
  } catch (err) {
    console.log(err);
    throw new ApplicationError("Something went wrong with database", 500);
  }
};

export const orderPaymentStatus = async (orderId) => {
  try {
    // fetching complete order deatils and updating payment status from database
    const updatedPaymentStus = await OrderModel.findByIdAndUpdate(
      orderId,
      { paymentStatus: "paid" },
      { new: true }
    );
    return updatedPaymentStus;
  } catch (err) {
    console.log(err);
    throw new ApplicationError("Something went wrong with database", 500);
  }
};
