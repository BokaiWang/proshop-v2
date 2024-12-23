export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: Review[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CartState {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface AuthState {
  userInfo: User | null;
}

export interface OrderItem extends CartItem {
  product: string;
}

export interface Order {
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: string;
  deliveredAt: string;
  _id: string;
}

export interface CreatedOrder extends Order {
  orderItems: OrderItem[];
  user: { name: string; email: string };
  isDelivered: boolean;
  deliveredAt: string;
  isPaid: boolean;
  paidAt: string;
  product: string;
}

export interface AllOrder extends Order {
  user: { name: string; id: string };
}

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  productId: string;
  createdAt: string;
}
