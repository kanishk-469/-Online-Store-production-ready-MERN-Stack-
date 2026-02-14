import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // For identifying which counter
  seq: { type: Number, unique: true }, // Current sequence Number
});

export default mongoose.model("Counter", counterSchema); //exporting directly model
