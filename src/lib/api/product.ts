import { Product, product, products } from "../data/products";

export const getProduct = (): Product => {
  return product;
};

export const getProducts = (): Product[] => {
  return products;
};
