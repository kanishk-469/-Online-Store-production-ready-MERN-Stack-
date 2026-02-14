import { createSlice } from "@reduxjs/toolkit";

const pageLoadingSlice = createSlice({
  name: "pageLoading",
  initialState: { globalLoading: false },
  reducers: {
    startLoading: (state) => {
      state.globalLoading = true;
    },
    stopLoading: (state) => {
      state.globalLoading = false;
    },
  },
});

export const { startLoading, stopLoading } = pageLoadingSlice.actions;

//Proper selector
export const selectGlobalLoading = (state) => state.pageLoading.globalLoading;

export default pageLoadingSlice.reducer;
