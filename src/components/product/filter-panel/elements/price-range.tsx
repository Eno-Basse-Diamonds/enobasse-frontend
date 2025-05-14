import { useState } from "react";

export const PriceRange: React.FC = () => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);
  const minRange = 0;
  const maxRange = 2000;

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxRange);
    setMinPrice(Math.max(value, minRange));
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxRange);
    setMaxPrice(Math.max(value, minRange));
  };

  return (
    <div className="product-filter-panel__price-range">
      <h2 className="product-filter-panel__price-range__title">Price</h2>

      <div className="product-filter-panel__price-range__container">
        <div className="product-filter-panel__price-range__inputs">
          <div className="product-filter-panel__price-range__input-group">
            <label htmlFor="minPrice" className="product-filter-panel__price-range__label">
              Min Price
            </label>
            <div className="product-filter-panel__price-range__input-wrapper">
              <span className="product-filter-panel__price-range__currency">$</span>
              <input
                type="number"
                id="minPrice"
                min={minRange}
                max={maxRange}
                value={minPrice}
                onChange={handleMinInputChange}
                className="product-filter-panel__price-range__input"
              />
            </div>
          </div>

          <div className="product-filter-panel__price-range__input-group">
            <label htmlFor="maxPrice" className="product-filter-panel__price-range__label">
              Max Price
            </label>
            <div className="product-filter-panel__price-range__input-wrapper">
              <span className="product-filter-panel__price-range__currency">$</span>
              <input
                type="number"
                id="maxPrice"
                min={minRange}
                max={maxRange}
                value={maxPrice}
                onChange={handleMaxInputChange}
                className="product-filter-panel__price-range__input"
              />
            </div>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="2000"
          step="10"
          value={minPrice}
          onChange={(e) => handleMinInputChange(e)}
          className="product-filter-panel__price-range__slider"
        />
        <input
          type="range"
          min="0"
          max="2000"
          step="10"
          value={maxPrice}
          onChange={(e) => handleMaxInputChange(e)}
          className="product-filter-panel__price-range__slider"
        />
      </div>
    </div>
  );
};
