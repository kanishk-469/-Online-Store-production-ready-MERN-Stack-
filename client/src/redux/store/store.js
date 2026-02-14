import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice.js";
import authReducer from "../slices/authSlice.js";
import productReducer from "../slices/productSlice.js";
import pageLoadingReducer from "../slices/pageLoadingSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer, // key must match selector
    pageLoading: pageLoadingReducer,
  },
});
