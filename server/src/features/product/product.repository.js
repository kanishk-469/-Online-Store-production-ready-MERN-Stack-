import { ObjectId } from "mongodb";
// import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";
import mongoose from "mongoose";

import { productSchema } from "./product.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const CategoryModel = mongoose.model("Category", categorySchema);

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(productData) {
    try {
      // // 1 . Get the db.
      // const db = getDB();
      // //2. get the collection
      // const collection = db.collection(this.collection);
      // await collection.insertOne(newProduct);
      // return newProduct;

      ///Simplied Code using mongoose ODM Library
      console.log(productData);

      productData.categories = productData.category
        .split(",")
        .map((e) => e.trim());
      console.log(productData);

      //1. Add product to products collection, assuming categories
      //have either names or id of the categories..
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();

      //2. Update categories
      await CategoryModel.updateMany(
        { _id: { $in: productData.categories } },
        {
          $push: { products: new ObjectId(savedProduct._id) },
        }
      );
      return savedProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAll() {
    try {
      // const db = getDB();
      // const collection = db.collection(this.collection);
      // const products = await collection.find().toArray();

      //Using mongoose
      const products = await ProductModel.find();
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(id) {
    try {
      //   const db = getDB();
      //   const collection = db.collection(this.collection);
      //   return await collection.findOne({ _id: new ObjectId(id) });
      const foundProduct = await ProductModel.findOne({ _id: new Object(id) });
      return foundProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async deleteOneProduct(id) {
    try {
      //   const db = getDB();
      //   const collection = db.collection(this.collection);
      //   return await collection.findOne({ _id: new ObjectId(id) });
      const deleted = await ProductModel.findOneAndDelete({
        _id: new Object(id),
      });
      console.log(deleted);
      return deleted;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  // async filter(minPrice, maxPrice, category) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     let filterExpression = {};
  //     if (minPrice) {
  //       filterExpression.price = { $gte: parseFloat(minPrice) };
  //     }
  //     if (maxPrice) {
  //       filterExpression.price = {
  //         ...filterExpression.price,
  //         $lte: parseFloat(maxPrice),
  //       };
  //     }
  //     if (category) {
  //       filterExpression.category = category;
  //     }
  //     return await collection.find(filterExpression).toArray();
  //   } catch (err) {
  //     console.log(err);
  //     throw new ApplicationError("Something went wrong with database", 500);
  //   }
  // }

  // To understand Operators in MongoDB like $and,$or,$in ,$gte ,$lte, $lt
  // $gt, $eq so on, we edit the below code
  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }

      // //If both condition satified then we get document from product collection
      // if (category) {
      //   filterExpression = { $and: [{ category: category }, filterExpression] };
      // }

      // //Atleast one condition should satify, then we get document from product collection
      // if (category) {
      //   filterExpression = { $or: [{ category: category }, filterExpression] };
      // }

      // Convert categories to array from string
      // query URL string = localhost:8080/api/products/filter?categories=['New','clothing']&minPrice=30000
      // categories=['New','clothing']
      /*
      const categories = "['New','clothing']";
      categories.replace(/'/g, '"')
      convert this from "['New','clothing']"  to '["New","clothing"]'
      then
      This converts from JSON.parse('["New","clothing"]') to ["New", "clothing"] array

      */
      const categoriesArr = JSON.parse(categories.replace(/'/g, '"'));
      //Atleast one condition should satify with multiple catergories's array , then we get
      //document from product collection
      if (categories) {
        filterExpression = {
          $or: [{ category: { $in: categoriesArr } }, filterExpression],
        };
      }

      // return await collection.find(filterExpression).toArray();

      //By using projection operators,It allow us to change the view of data,
      // which we are recieving on the client, we can control the fields,
      //whichever to send as response from the collection(table) or not
      //project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } }) 1 means include ,0 means exclude
      return await collection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  /*Implemented aggregation, allows data processing pipeline, means group collection's document */
  async averageProductPricePerCategory() {
    try {
      //get the database
      // const db = getDB();

      // Perform operation on products collection
      // return await db
      //   .collection(this.collection)
      return await ProductModel.aggregate([
        {
          /// stage 1: get average price per category
          /*$group:- The $group stage combines multiple documents with the same field, 
            fields, or expression into a single document according to a group key. The 
            result is one document per unique group key.*/
          $group: {
            _id: "$categories", /// not correct as categories is an array in mongoDB field
            averagePrice: { $avg: "$price" },
          },
        },
      ]).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

export default ProductRepository;
