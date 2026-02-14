// import { ObjectId } from "mongodb";
// import { getClient, getDB } from "../../config/mongodb.js";
import mongoose from "mongoose";
import ApplicationError from "../../error-handler/applicationError.js";
import { cartItemsSchema } from "../cart/cart.schema.js";
import OrderModel from "./order.model.js";
import { productSchema } from "../product/product.schema.js";

const CartModel = mongoose.model("Carts", cartItemsSchema);
const ProductModel = mongoose.model("Products", productSchema);

class OrderRepository {
  ///Use Transaction Concept of database

  ///1. Get cart items of user , calculate the totalAmount

  ///2. Create the record of order

  ///3. Reduce the stock

  ///4. Clear the cartItems of a specific User.

  /* Using the clientIntance/directly mongoose we set up session, and we 
        start the session and we pass {session} object with every operation*/

  /*This session.startTransaction(); takes care of either entire operations execute or 
        none of the database operations execute */

  ///WORK ON MONGODB REPLICA SET mongod --replSet rs0
  //rs.initiate()  , Use MongoDB Atlas OR local replica
  async createOrderFromCart(userId) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      // 1️⃣ Get cart items with total calculation
      const items = await this.getTotalAmount(userId, session);

      if (!items.length) {
        throw new ApplicationError("Cart is empty", 400);
      }

      console.log("Items array object:", items); /// check what items have ?

      const totalFinalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      ///Build orderItems Correctly
      const orderItems = items.map((item) => ({
        product: item.productID,
        quantity: item.quantity,
        price: item.productInfo.price,
      }));

      // 2️⃣ Create order, array passed to Model.create() method
      const order = await OrderModel.create(
        [
          {
            userID: userId,
            orderItems,
            totalAmount: totalFinalAmount,
          },
        ],
        { session }
      );

      // 3️⃣ Reduce product stock
      for (const item of items) {
        const result = await ProductModel.updateOne(
          { _id: item.productID, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity, soldCount: item.quantity } },
          { session }
        );

        if (result.modifiedCount === 0) {
          throw new ApplicationError("Insufficient stock for a product", 400);
        }
      }

      // 4️⃣ Clear user cart
      await CartModel.deleteMany({ userID: userId }, { session });

      // 5 ALso THINK OF PAYMENT CODE and use session inside

      await session.commitTransaction(); /*This line update the database , means all the operations in 
      the transactions have been completed and database is now in intergrated state, means there 
      are no incomplete operations within the transaction*/

      session.endSession();

      return order[0]; /// After creating the order, return the first element.
      // return order;
    } catch (err) {
      await session.abortTransaction(); // To avoid memory leak and writeconflict error
      session.endSession();

      console.error(err);
      throw err instanceof ApplicationError
        ? err
        : new ApplicationError("Order placement failed", 500);
    }
  }

  async getTotalAmount(userId, session) {
    const items = await CartModel.aggregate(
      [
        // stage 1. get the cart items from cart collection of a User

        /* $match() behaves as .find() function,  refer:- 
          https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
          */
        { $match: { userID: new mongoose.Types.ObjectId(userId) } },

        {
          //// stage 2: Here we should understand the relationship b/w 2 collections
          // here we perform left outer Join(join is a operation in a mongodb which joins 2 or more
          //collecti
          //ons together while joining it need joining paramters i.e. productId and _id) 2 collectio
          //ns, with paramters productId of cartItems collection
          // and _id of products collection matches
          // and attach the 'productInfo' object with cartItems details and
          /// Get the products from products collection , using very popular $lookup operator
          $lookup: {
            from: "products", // products collection to check
            localField: "productID", // Field in cartItems
            foreignField: "_id", // Matching field in products
            as: "productInfo", // Merged result, name of the final result is productInfo
          },
        },

        ///stage 3: unwind the productInfo(array of objects)
        { $unwind: "$productInfo" },

        ///stage 4: calculate totalAmount for each cartItems
        {
          $addFields: {
            totalAmount: {
              $multiply: ["$productInfo.price", "$quantity"],
            },
          },
        },
      ],
      { session }
    );

    return items; // it should be items's array with objects in it
  }

  /////NOT USING THIS CODE,
  //   async placeOrder(userId) {
  //     ///Use Transaction Concept of database

  //     ///1. Get cart items of user , calculate the totalAmount

  //     ///2. Create the record of order

  //     ///3. Reduce the stock

  //     ///4. Clear the cartItems of a specific User.

  //     /*Keeping client and session outside so that our catch block can have access of session*/
  //     /* To work with Transaction we need access of clientIntance
  //       (client = clientInstance; refer:- mongodb.js file) */
  //     const client = getClient();

  //     /* Using the clientIntance we set up session, and we
  //       start the session and we pass {session} object with every operation*/
  //     const session = client.startSession();

  //     try {
  //       const db = getDB();

  //       // /* To work with Transaction we need access of clientIntance
  //       // (client = clientInstance; refer:- mongodb.js file)*/
  //       // const client = getClient();

  //       // /* Using the clientIntance we set up session, and we
  //       // start the session and we pass {session} object with every operation*/
  //       // const session = client.startSession();

  //       /*This session.startTransaction(); takes care of either entire operations execute or
  //       none of the database operations execute */
  //       session.startTransaction();

  //       ///1. Get cart items of a specific user ,calculate the totalAmount
  //       const items = await this.getTotalAmount(userId, session);
  //       const totalFinalAmount = items.reduce(
  //         (acc, item) => acc + item.totalAmount,
  //         0
  //       );
  //       console.log(totalFinalAmount);

  //       ///2. Create the record of order
  //       const newOrder = new OrderModel(
  //         new ObjectId(userId),
  //         totalFinalAmount,
  //         new Date().toLocaleString()
  //       );

  //       // console.log(newOrder);
  //       await db.collection(this.collectionName).insertOne(newOrder, { session });

  //       ///3. Reduce the stock in products collection
  //       for (let itemObj of items) {
  //         await db.collection("products").updateOne(
  //           {
  //             _id: itemObj.productID,
  //           },
  //           {
  //             $inc: { stock: -itemObj.quantity },
  //           },
  //           { session }
  //         );
  //       }

  //       /*let say if any error aur exception raised here, I am intentionally failing the last operation,
  //         then it lead to an invalid state of database.
  //       */
  //       // throw new Error("Something is wrong in placeOrder Function");

  //       ///4. Clear the cartItems of a specific User.
  //       await db
  //         .collection("cartItems")
  //         .deleteMany({ userID: new ObjectId(userId) }, { session });

  //       session.commitTransaction(); /*This line update the database , means all the operations in
  //       the transactions have been completed and database is now in intergrated state, means there
  //       are no incomplete operations within the transaction*/

  //       session.endSession();
  //       return;
  //     } catch (err) {
  //       session.abortTransaction(); // To avoid memory leak and writeconflit error
  //       session.endSession();

  //       console.log(err);
  //       throw new ApplicationError("Something went wrong with database", 500);
  //     }
  //   }

  //   async getTotalAmount(userId, session) {
  //     const db = getDB();
  //     // console.log(userId);
  //     const items = await db
  //       .collection("cartItems")
  //       .aggregate(
  //         [
  //           // stage 1. get the cart items from cartItems collection of a User
  //           {
  //             /// $match() behaves as .find() function,  refer:- https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
  //             $match: { userID: new ObjectId(userId) },
  //           },
  //           //// stage 2: Here we should understand the relationship b/w 2 collections
  //           // here we perform left outer Join(join is a operation in a mongodb which joins 2 or more
  //           //collecti
  //           //ons together while joining it need joining paramters i.e. productId and _id) 2 collectio
  //           //ns, with paramters productId of cartItems collection
  //           // and _id of products collection matches
  //           // and attach the 'productInfo' object with cartItems details and
  //           /// Get the products from products collection , using very popular $lookup operator
  //           {
  //             $lookup: {
  //               from: "products", // products collection to check
  //               localField: "productID", // Field in cartItems
  //               foreignField: "_id", // Matching field in products
  //               as: "productInfo", // Merged result, name of the final result is productInfo
  //             },
  //           },
  //           ///stage 3: unwind the productInfo(array of objects)
  //           {
  //             $unwind: "$productInfo",
  //           },
  //           ///stage 4: calculate totalAmount for each cartItems
  //           {
  //             $addFields: {
  //               totalAmount: { $multiply: ["$productInfo.price", "$quantity"] },
  //             },
  //           },
  //         ],
  //         { session }
  //       )
  //       .toArray();
  //     console.log(items); // it should be items's array with objects in it

  //     // ///array.reduce() method we use to get the totalAmount
  //     // const finalTotalAmount = items.reduce(
  //     //   (acc, item) => acc + item.totalAmount,
  //     //   0
  //     // );
  //     // console.log(finalTotalAmount);

  //     return items;
  //   }
}

export default OrderRepository;
