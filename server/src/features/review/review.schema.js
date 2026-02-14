import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    ratings: { type: Number, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

export const ReviewModel =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);
