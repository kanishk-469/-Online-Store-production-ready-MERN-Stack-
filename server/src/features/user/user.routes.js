/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & User Management APIs
 */

///Sign up (REGISTER USER)
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register new user (Customer or Seller)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kanishka Singh
 *               email:
 *                 type: string
 *                 example: kanishka@gmail.com
 *               password:
 *                 type: string
 *                 example: qwerty123
 *               role:
 *                 type: string
 *                 enum: [customer, seller]
 *                 example: customer
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid input data
 */

///Sign in (LOGIN USER)
/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Login user and receive JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: kanishka@gmail.com
 *               password:
 *                 type: string
 *                 example: qwerty123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Incorrect credentials
 */

///reset password (PROTECTED ROUTE)
/**
 * @swagger
 * /users/resetPassword:
 *   put:
 *     summary: Reset password (Authenticated user only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newStrongPassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 */

import express from "express";
import UserController from "./user.controller.js";
import { jwtAuth } from "../../middlewares/jwtAuth.middleware.js";

const userRouter = express.Router();
const userController = new UserController();

// userRouter.post("/signup", userController.signUp);
userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next); // to bind this keyword
});

// userRouter.post("/signin", userController.signIn);
userRouter.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next); /// need to bind
});

//update new password, customer or seller
userRouter.put("/resetPassword", jwtAuth, (req, res, next) => {
  userController.resetPassword(req, res, next);
});

export default userRouter;
