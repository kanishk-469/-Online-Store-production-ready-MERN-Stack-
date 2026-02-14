import ApplicationError from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  /// This feature is only for sellers
  async addProduct(req, res) {
    try {
      const { title, price, sizes, seller, categories, desc } = req.body;
      const newProduct = new ProductModel(
        title,
        desc,
        parseFloat(price),
        req?.file?.filename, // null check
        categories,
        sizes?.split(","),
        seller
      );

      const createdProduct = await this.productRepository.add(newProduct);

      res.status(201).send(createdProduct);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }

  async deleteOneProduct(req, res, next) {
    try {
      const id = req.params.id;
      console.log(id);

      const deleted = await this.productRepository.deleteOneProduct(id);
      if (deleted == null) {
        res.status(200).send("Product not found.!");
      } else {
        res.status(201).json(deleted);
      }
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async filterProducts(req, res) {
    try {
      /* I shouldn't use req.body for filter products,It is best for post,put methods only*/
      /* I shouldn't use root parameters also req.params as i have use for sending /:id
      ,because here we are bound to send all values from client side like maxPrice, minPrice and
      category
      */
      /*Best way here is to use query parameters only, because query parameter will look like 
      url:- localhost:1010/api/products/filter?minPrice=10&maxPrice=20&category=category1, when
      send from postman API or from client , this url request we can receive using req.query on
      sever side and process further
      */
      const minPrice = req.query.minPrice;
      // const maxPrice = req.query.maxPrice;
      // const category = req.query.category;
      const categories = req.query.categories; /// recieves array as string from url
      // const result = await this.productRepository.filter(
      //   minPrice,
      //   maxPrice,
      //   category
      // );
      const result = await this.productRepository.filter(minPrice, categories);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  /*Implemented aggregation pipeline, menans group collection's document */
  //Usecase of Aggregation Pipeline
  async averagePrice(req, res, next) {
    try {
      const result =
        await this.productRepository.averageProductPricePerCategory();

      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
