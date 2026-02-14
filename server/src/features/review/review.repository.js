import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "../product/product.schema.js";

const ReviewModel = mongoose.model("Reviews", reviewSchema);
const ProductModel = mongoose.model("Products", productSchema);

export default class ReviewRepository {
  // This approach lead to race condition
  /*
 Race condition :- There are 2 requests parallely running to perform the same operation
 on a shared data , imagine same user is trying to rate a product at the same time
 usually from 2 different computers , in that case it will leave our database 
 in unpredictable state or lead to incorrect data.., we will follow another approach 
 to rate our product
 */
  // async rate(userID, productID, rating){
  //     try{
  //         const db = getDB();
  //         const collection = db.collection(this.collection);

  //         // 1. Find the product
  //         const product = await collection.findOne({_id:new ObjectId(productID)})

  //         // 2. Find the rating
  //         const userRating = await product?.ratings?.find(r=>r.userID==userID);

  //         if(userRating){
  //         // 3. Update the rating
  //         await collection.updateOne({
  //             _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
  //         },{
  //             $set:{
  //                 "ratings.$.rating":rating
  //             }
  //         }
  //         );
  //         }else{
  //             await collection.updateOne({
  //                 _id:new ObjectId(productID)
  //             },{
  //                 $push: {ratings: {userID:new ObjectId(userID), rating}}
  //             })
  //         }
  //     }catch(err){
  //         console.log(err);
  //         throw new ApplicationError("Something went wrong with database", 500);
  //     }
  // }

  async rate(userId, productId, ratings, comment) {
    try {
      // const db = getDB();
      // const collection = db.collection(this.collection);

      // //Atomic operations, both should execute, this approach helps avoiding race condition
      // // 1. Removes existing entry
      // await collection.updateOne(
      //   {
      //     _id: new ObjectId(productID),
      //   },
      //   {
      //     $pull: { ratings: { userID: new ObjectId(userID) } },
      //   }
      // );
      // // 2. Add new entry
      // await collection.updateOne(
      //   {
      //     _id: new ObjectId(productID),
      //   },
      //   {
      //     $push: { ratings: { userID: new ObjectId(userID), rating } },
      //   }
      // );

      //1. check if product exists
      const productToUpdate = await ProductModel.findById(productId);
      if (!productToUpdate) {
        throw new Error("Product not found!!");
      } else {
        ///2. Get the existing review
        const userReview = await ReviewModel.findOne({
          productId: new mongoose.Types.ObjectId(productId),
          userId: new mongoose.Types.ObjectId(userId),
        });
        ///3. update with a new rating
        if (userReview) {
          userReview.ratings = ratings;
          userReview.comment = comment;

          await userReview.save();
        } else {
          ///4. Create new Review of a product
          const newReview = new ReviewModel({
            productId: new mongoose.Types.ObjectId(productId),
            userId: new mongoose.Types.ObjectId(userId),
            ratings: ratings,
            comment: comment,
          });
          const savedReview = await newReview.save();

          const findProductReviewField = await ProductModel.findById(productId);
          findProductReviewField.reviews.push(savedReview._id);
          await findProductReviewField.save();
        }
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Database error:- ", 500);
    }
  }
}
