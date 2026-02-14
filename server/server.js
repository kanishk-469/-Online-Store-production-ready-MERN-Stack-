import "./env.js";
import express from "express";

// import { configDotenv } from "dotenv";
// configDotenv();
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import userRouter from "./src/features/user/user.routes.js";
import productRouter from "./src/features/product/product.routes.js";
import mongoose from "mongoose";
import ApplicationError from "./src/error-handler/applicationError.js";
import { jwtAuth } from "./src/middlewares/jwtAuth.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import orderRouter from "./src/features/order/order.routes.js";
import reviewRouter from "./src/features/review/review.routes.js";
import sellerRouter from "./src/features/seller/seller.routes.js";
import paymentRouter from "./src/features/payment/payment.routes.js";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";

const server = express();

///Using CORS NodeJS module
// import cors from "cors";
// server.use(cors()); // using middleware, allow all access

/*CORS Policy Configure, using middleware without cors nodejs module, 
 here we can decide individual access to different request headers */
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Give access for all client
  // res.header("Access-Control-Allow-Origin", "http://localhost:5173");

  res.header("Access-Control-Allow-Headers", "*"); // allow all headers
  // req.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  res.header("Access-Control-Allow-Methods", "*"); // allow all types of methods get,post,put,delete etc.
  // res.header("Access-Control-Allow-Methods", "GET POST PUT DELETE PATCH"); // allow all types of methods get,post,put,delete etc.

  /*
  Preflight request is a verification request, can server respond to this ?, 
  if server doesn't respond ok to preflight request then client will 
  not send actual request, method is "OPTIONS"
  */
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  }
  next();
});

/// Version v22.11.0 assert keyword is not working, that's why i have used fs module
/*Also create API Documentation*/
/*Using swagger(OpenAPI Specification Standard) tool which help us to document our APIs 
for API's clients/consumers , so that they can understand how to use API to get result*/
/*use npm i swagger-ui-express also refer:- https://swagger.io/docs/, 
version 2.0 >> https://swagger.io/docs/specification/v2_0/basic-structure/ 
version 3.0 >> https://swagger.io/docs/specification/v3_0/basic-structure/
this swagger-ui-express generate a UI, based on swagger.json file */
// const apiDocs = JSON.parse(fs.readFileSync("./swaggerV3.json", "utf8"));
// console.log(typeof apiDocs);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*Need to add at APPLICATION LEVEL MIDDLEWARE, npm i body-parser, external module
to handle POST request, parse Postman(client) body data and populate to req.body on server*/
// server.use(bodyParser.json()); /* I can use in-built module express.json()*/

/** THIS IS REQUIRED for Post method when signUp to read request body*/
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//For all request related to products, redirect to products routes
//JWT Authentication used, which is recommended token based -> eerwererqwqd.errgfvfv.reer4rttt
//localhost:1010/api/products
// server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/products", productRouter);

//For all request related to user, redirect to user routes
//localhost:8080/api/users
server.use("/api/users", userRouter);

//localhost:8080/api/cartItems
server.use("/api/carts", loggerMiddleware, jwtAuth, cartRouter);

///For placing order , request is redirected to the order.routes.js file
server.use("/api/orders", jwtAuth, orderRouter);

///For reviews feature, request is redirected to the review.routes.js file
server.use("/api/reviews", jwtAuth, reviewRouter);

//for seller feature ,  request is redirected to the seller.routes.js file
server.use("/api/sellers", jwtAuth, sellerRouter);

//for seller feature ,  request is redirected to the seller.routes.js file
server.use("/api/payments", jwtAuth, paymentRouter);

/// Default Request Handler
server.get("/", (req, res, next) => {
  res.send("Welcome to Express Server for Online Store E-Commerce Backend API");
});

/*How do we create a error handler at application level, handle error globally ?? , 
for this, express has special middleware which is slightly different from other middleware, 
shown below:-*/
/*Handle all errors either from controller or model or anywhere, at Application Level/
Entry point. Error Handler Middleware, should be at Last position*/
/* SABKA BAAP HAI*/
//Express has provided this Error Handler Middleware, should be at Last position
server.use((err, req, res, next) => {
  console.log(err);

  //for duplicate email error handle
  if (err.code === 11000) {
    return res.status(400).json({ Email: "Email Already Exit.!" });
  }

  //For User defined ERROR, like storing the password,and not following correct pattern
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }

  //For Application Level ERROR
  //Now we need to check, instanceof is a keyword in JS, which tells us instance of this type
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }

  //Also I can log those errors and store in logs or log file
  //Server Error
  res.status(500).send("Something went Wrong!! Please try again later!");
});

////Last position where non of the above path matches, we need to send response, "Resource not found"
/// Basically "API Not Found"
///4. Middleware to handle 404 requests.(path mismatched)
server.use((req, res) => {
  res
    .status(404)
    // .send(
    //   "API Not Found!! Please check our documentation for more information at URL:localhost:8080/api-docs"
    // );
    .json({
      success: false,
      error: `Invalid Path ${req.originalUrl}`,
      message:
        "API Not Found!! Please check our documentation for more information at URL:localhost:8080/api-docs",
    });
});

//5. Specify Port
server.listen(process.env.PORT, () => {
  console.log("Server is Listing on " + process.env.PORT);
  connectUsingMongoose();
});
