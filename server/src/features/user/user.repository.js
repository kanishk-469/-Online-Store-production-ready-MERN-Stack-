import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";

//create model from userSchema , model maps to collection
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async signUp(user) {
    try {
      /*VVI 
      What is the difference between .save() and .create() in Mongoose?

      new Model() + doc.save():
      Two-step: create instance, then save.
               save() triggers validation & middleware.

         Model.create(doc):
         Shortcut for new Model(doc).save()
         Returns a promise with the new document.

      Note:- Both run validation/middleware, but create() is more concise and optimised for bulk inserts.
      */
      console.log(user);

      //Create instance of model, to create single document in User collection
      const newUser = new UserModel(user);
      /// i can also do like UserModel.create(user);

      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      //  console.log(err.errorResponse.keyValue);

      if (err.code === 11000) {
        throw err;
      }

      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signIn() {}

  async resetPassword(userId, pswd) {
    try {
      const user = await UserModel.findById(userId);

      //user shouldn't have undefined or null value, then it goes inside if statement
      if (user) {
        user.password = pswd;
        await user.save();
      } else {
        throw new Error("User Not Found..!");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
