import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import { startLoading, stopLoading } from "./pageLoadingSlice";

// 🔥 FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading()); //  START GLOBAL LOADING

      const response = await axios.get("/products");

      dispatch(stopLoading()); //  STOP GLOBAL LOADING

      return response.data;
    } catch (error) {
      dispatch(stopLoading()); //  STOP EVEN ON ERROR
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

// 🔥 SELECTORS (VERY IMPORTANT)
export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
