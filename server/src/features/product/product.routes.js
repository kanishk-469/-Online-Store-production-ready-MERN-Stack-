//TAG DEFINITION
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management APIs
 */

//manages routes/paths to ProductController

//get all products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

//get single product
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */

////create product seller only + file upload
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create new product (Seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - desc
 *               - price
 *               - imageUrl
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *               categories:
 *                 type: string
 *               sizes:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       403:
 *         description: Seller access required
 */

//delete product (SELLER ONLY)
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (Seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */

///Average price aggregation concept (SELLER ONLY)
/**
 * @swagger
 * /products/averagePrice:
 *   get:
 *     summary: Get average product price per category (Seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Average price calculated
 */

//filter product
/**
 * @swagger
 * /products/filter:
 *   get:
 *     summary: Filter products by price and categories
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Categories (comma separated)
 *     responses:
 *       200:
 *         description: Filtered products list
 */

//

//1. Import express
import express from "express";
import ProductController from "./product.controller.js";
import { uploadFile } from "../../middlewares/fileupload.middleware.js";
import { jwtAuth } from "../../middlewares/jwtAuth.middleware.js";
import { sellerOnly } from "../../middlewares/role.middleware.js";

//2. Initialize express router
const router = express.Router();

const productController = new ProductController();

// All paths to controller methods.

// localhost:8080/api/products/filter?minPrice=10&maxPrice=20&category=category1
// router.get("/filter", (req, res) => productController.filterProducts(req, res));
router.get("/filter", (req, res) => {
  productController.filterProducts(req, res); // need to bind the filterProducts method
});

//localhost:8080/api/products already completed
router.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});

router.post(
  "/",
  jwtAuth,
  sellerOnly,
  uploadFile.single("imageUrl"),
  (req, res) => {
    productController.addProduct(req, res);
  }
);

/// delete one product
router.delete("/:id", jwtAuth, sellerOnly, (req, res, next) => {
  productController.deleteOneProduct(req, res, next);
});

/*Route to implement aggregation pipeline, means group collection's document */
router.get("/averagePrice", jwtAuth, sellerOnly, (req, res, next) => {
  productController.averagePrice(req, res, next);
});

router.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});

export default router;
