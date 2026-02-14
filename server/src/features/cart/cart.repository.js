// import { ObjectId } from "mongodb";
// import { getDB } from "../../config/mongodb.js";

import mongoose from "mongoose";
import { cartItemsSchema } from "./cart.schema.js";
// import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";

const CartModel = mongoose.model("Carts", cartItemsSchema);

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productID, userID, quantity) {
    try {
      // console.log(userID);
      //   const db = getDB();
      //   const collection = db.collection(this.collection);

      //   ///Human readable id to update in cartItems collection
      //   const id = await this.getNextCounter(db);
      //   console.log(id);

      // find the document
      // either insert or update
      // Insertion.
      ///search upsert mongodb, either create new quantity or update
      // old quantity
      await CartModel.updateOne(
        //filter (condition)
        {
          productID: new mongoose.Types.ObjectId(productID),
          userID: new mongoose.Types.ObjectId(userID),
        },
        {
          //   $setOnInsert: { _id: id },
          $inc: {
            quantity: quantity,
          },
        },
        { upsert: true } // options , with this updateOne() function behaves as insertOne also
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(userID) {
    try {
      //   const db = getDB();
      //   const collection = db.collection(this.collection);
      console.log(userID);
      return await CartModel.find({
        userID: new mongoose.Types.ObjectId(userID),
      });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  /*
   Atomic version
   This avoids two DB calls and is race-condition safe.
*/
  async deleteOneItem(userID, cartItemID) {
    try {
      console.log(userID, cartItemID);
      const result = await CartModel.findOneAndUpdate(
        { _id: cartItemID, userID, quantity: { $gt: 1 } },
        { $inc: { quantity: -1 } },
        { new: true }
      );

      // If quantity was 1, delete the document
      if (!result) {
        const deleted = await CartModel.deleteOne({
          _id: cartItemID,
          userID,
        });
        return deleted.deletedCount > 0;
      }

      return true;
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  //   async getNextCounter(db) {
  //     //findOneAndUpdate() return the original document if returnDocument not used.
  //     //It returns the original document by default. but i want updated document for that
  //     // we need to set the value of returnNewDocument to true or returnDocument
  //     // is set to after.
  //     const returnDocument = await db.collection("counters").findOneAndUpdate(
  //       { _id: "cartItemId" },
  //       {
  //         $inc: { value: 1 },
  //       },
  //       { returnDocument: "after" }
  //     );
  //     console.log(returnDocument);
  //     return returnDocument.value;
  //   }
}
