///create mongoose schema
///refer:- https://mongoosejs.com/docs/guide.html

import mongoose from "mongoose";

///User Role ---> it could be customer, seller or admin
export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      // select: false, //// prevents password from being returned
      validate: {
        //Custom validator used
        validator: function (value) {
          return /^(?=.*[@$!%*#?&])[\dA-Za-z@$!%*#?&]{8,}/.test(value);
        },
        message:
          "Password should have characters, symbols and have at least one special character",
      },
    },

    role: {
      type: String,
      required: true,
      enum: ["customer", "seller"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  /// we have added middleware before save or after save operation on mongodb database using 2 hooks pre and post
  // first parameter is operation , means on what operation this middleware executed,
  //second is function which i want to execute before this operation .pre("save", function)
  /// store the current time inside database
  { timestamps: true }
).pre("save", (next) => {
  //  hash user password before saving using bcrypt
  // if (!this.isModified("password")) return next();

  // this.password = await bcrypt.hash(this.password, 10);
  console.log("Inside middleware .pre() hook ");
  // next();
});

// userSchema.pre("save", async function () {
//   console.log("Inside middleware .pre() hook");
// });

export const UserModel =
  mongoose.model.Users || mongoose.model("Users", userSchema);

/*
The permitted SchemaTypes are:
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
UUID
Double
Int32
*/
