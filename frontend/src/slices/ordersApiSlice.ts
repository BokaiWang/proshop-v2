import { ORDERS_URL } from "../constants";
import { Order } from "../entities";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
