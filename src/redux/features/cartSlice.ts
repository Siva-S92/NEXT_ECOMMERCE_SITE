import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductFormat {
  id: String;
  title: String;
  img: String;
  price: number;
  quantity: number;
}

const initialState: Array<ProductFormat> = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductFormat>) => {
      if (
        state.findIndex((element) => element.id === action.payload.id) === -1
      ) {
        state.push(action.payload);
      } else {
        return state.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
