interface StockStatusProps {
  inStock: boolean;
}

export const StockStatus = ({ inStock }: StockStatusProps) => {
  return inStock ? (
    <span className="cart-page__stock-status">
      <span className="cart-page__stock-dot"></span>
      In Stock
    </span>
  ) : (
    <span className="cart-page__out-of-stock">Out of Stock</span>
  );
};
