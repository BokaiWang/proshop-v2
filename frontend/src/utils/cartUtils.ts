import { CartState } from "../entities";

export const addDecimals = (num: number): number => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (
  state: CartState
): {
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
} => {
  // Calculate items price
  const itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, currentItem) => (acc = acc + currentItem.price * currentItem.qty),
      0
    )
  );
  // Calculate shipping price
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  // Calculate tax price (13% tax)
  const taxPrice = addDecimals(Number((itemsPrice * 0.13).toFixed(2)));
  // Calculate total price
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));
  state.itemsPrice = itemsPrice;
  state.shippingPrice = shippingPrice;
  state.taxPrice = taxPrice;
  state.totalPrice = totalPrice;
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
