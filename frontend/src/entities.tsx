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

export interface CartState {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface AuthState {
  userInfo: User | null;
}
