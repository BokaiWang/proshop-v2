import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { AllOrder, CreatedOrder, Order } from "../entities";
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
    getOrderDetails: builder.query<CreatedOrder, string>({
      query: (orderId: string) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation<
      void,
      { orderId: string; details: { [key: string]: any } }
    >({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query<{ clientId: string }, void>({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query<AllOrder[], void>({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<Order, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
