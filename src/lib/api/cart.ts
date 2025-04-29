import { cartItems, CartItem } from "../data/cart-items";

export const getCartItems = async (): Promise<CartItem[]> => {
  return cartItems;
};
