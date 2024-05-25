import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/features/cartSlice";
import productReducer from "@/redux/features/productSlice";
import loadingReducer from "@/redux/features/loadingSlice";

export const store = configureStore({
  reducer: {
    cartReducer,
    productReducer,
    loadingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
