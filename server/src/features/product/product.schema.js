///create mongoose schema(structure/blueprint/shape of data)
///refer:- https://mongoosejs.com/docs/guide.html

import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
  },
  desc: {
    type: String,
    trim: true,
    required: [true, "product description name is required"],
    minlength: [10, "Description must be at least 10 characters"],
    //   maxlength: [600, "Description cannot exceed 600 characters"],
  },
  size: {
    type: Array,
  },
  price: {
    type: Number,
    required: [true, "product price  is required"],
    maxLength: [8, "price can be of maximum 8 digits"],
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
  //   category: {
  //     type: String,
  //     enum: ["clothing", "electonics"],
  //     required: [true, "product category is required"],
  //   },
  //   images: [
  //     {
  //       public_id: {
  //         type: String,
  //         required: true,
  //       },
  //       url: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  imageUrl: { type: String, required: [true, "Image must be Uploaded"] },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  //   reviews: [
  //     {
  //       user: {
  //         type: mongoose.Schema.ObjectId,
  //         ref: "Review",
  //         required: true,
  //       },
  //       name: {
  //         type: String,
  //         required: true,
  //       },
  //       rating: {
  //         type: Number,
  //         required: true,
  //       },
  //       comment: {
  //         type: String,
  //       },
  //     },
  //   ],

  stock: {
    type: Number,
    required: [true, "Product stock is mandatory"],
    min: [0, "Stock cannot be negative"],
    max: [99999, "Stock can be maximum 5 digits"],
    default: 1,
  },

  soldCount: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

////Indexing Strategy, for performance boost, helps mongodb database for fast quering the data
productSchema.index({ categories: 1 });
productSchema.index({ soldCount: -1 });
productSchema.index({ isFeatured: 1 });

export const ProductModel = mongoose.model("Product", productSchema);
