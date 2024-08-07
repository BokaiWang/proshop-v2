import { CartState } from "../entities";

export const cartSelector = (state: { cart: CartState }) => state.cart;
