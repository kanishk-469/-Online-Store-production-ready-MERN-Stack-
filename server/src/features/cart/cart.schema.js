///create mongoose schema
///refer:- https://mongoosejs.com/docs/guide.html
import mongoose, { Schema } from "mongoose";

export const cartItemsSchema = new Schema({
  productID: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  quantity: Number,
});

//Indexing (Performance)
cartItemsSchema.index({ userID: 1, productID: 1 }, { unique: true });

/*
The permitted SchemaTypes are:
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
UUID
Double
Int32
*/
