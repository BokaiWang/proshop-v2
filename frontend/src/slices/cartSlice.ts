import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../entities";
import { updateCart } from "../utils/cartUtils";

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existingItem._id ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        updateCart(state);
      state.itemsPrice = itemsPrice;
      state.shippingPrice = shippingPrice;
      state.taxPrice = taxPrice;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
