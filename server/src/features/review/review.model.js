// import { application } from "express";
// import UserModel from "../user/user.model.js";
// import ApplicationError from "../../error-handler/applicationError.js";

export default class ReviewModel {
  constructor(productId, userId, ratings, comment) {
    this.productId = productId;
    this.userId = userId;
    this.ratings = ratings;
    this.comment = comment;
  }

  // static rateProduct(userID, productID, rating) {
  //   // 1. Validate user and product

  //   const user = UserModel.getAll().find((u) => u.id == userID);
  //   if (!user) {
  //     // return "User Not Found";
  /*          User-defined Error          */
  //     // throw new Error("User Not Found");

  //     //below we are providing extra details to our error handler
  //     throw new ApplicationError("User Not Found", 404);
  //   }
  //   // Validate product
  //   const product = products.find((p) => p.id == productID);
  //   if (!product) {
  //     // return "Product Not found";
  //     // throw new Error("Product Not Found");

  //     //below we are providing extra details to our error handler
  //     throw new ApplicationError("Product Not Found", 400);
  //   }

  //   /// 2. Check if there are any ratings and if not then add ratings array.
  //   if (!product.rating) {
  //     product.rating = [];
  //     product.rating.push({ userID: userID, rating: rating });
  //   } else {
  //     /// 3.check if user rating is already available
  //     const existingRatingIndex = product.rating.findIndex((r) => {
  //       r.id === userID;
  //     });

  //     if (existingRatingIndex >= 0) {
  //       product.rating[existingRatingIndex] = {
  //         userID: userID,
  //         rating: rating,
  //       };
  //     } else {
  //       // 4. If no existing rating, then add new rating.
  //       product.rating.push({
  //         userID: userID,
  //         rating: rating,
  //       });
  //     }
  //   }
  // }
}
