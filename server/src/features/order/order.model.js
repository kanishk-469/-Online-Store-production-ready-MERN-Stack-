import mongoose from "mongoose";

import CounterModel from "./counter.schema.js";

const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        _id: false, // disables auto _id for subdocuments
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "accepted", "cancelled", "shipped"],
      default: "pending",
    },

    // orderedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

// /// we have added middleware before save operation on mongodb database using 1 of 2 hooks pre a
// // nd post of mongoose
// // first parameter is operation , means on what operation this middleware executed,
// //second is function which i want to execute before this operation .pre("save", function)
// orderSchema.pre("save", async function (next) {
//   if (this.isNew) {
//     try {
//       const counter = await CounterModel.findOneAndUpdate(
//         { _id: "orderNumber" }, // Counter identifier
//         { $inc: { seq: 1 } }, // increment seq value by 1
//         { new: true, upsert: true } // create if missing
//       );

//       // Step 1: Get the new order sequence
//       const sequenceNumber = counter.seq;

//       // Step 2: Build formatted order number or Fancy OrderNumber
//       const prefix = "SF"; // prefix ,as company name is StoreFleet
//       const year = new Date().getFullYear(); // ex:- 2025
//       const paddedSeq = String(sequenceNumber).padStart(4, 0); /// ex:- 0001

//       this.orderNumber = `${prefix}${year}-${paddedSeq}`; // Assign to order
//     } catch (err) {
//       console.error("Error generating order number:", err);
//       return next(err);
//     }
//   }

//   next();
// });

/**
 * ✅ SAFE MODEL EXPORT (prevents OverwriteModelError)
 */
const OrderModel =
  mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default OrderModel;
