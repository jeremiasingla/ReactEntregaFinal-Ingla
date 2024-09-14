import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ProductSizeSelector.css";

const ProductSizeSelector = () => {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(null);
  const [showAllSizes, setShowAllSizes] = useState(false);
  const { setSelectedSizeInCart } = useCart();

  const handleSizeChange = (size) => {
    if (size !== "All") {
      setSelectedSize(size);
      setSelectedSizeInCart(size);
      setShowAllSizes(false);
    } else {
      alert("Please select a valid size.");
    }
  };

  const toggleShowSizes = () => {
    setShowAllSizes(!showAllSizes);
  };

  return (
    <div className="sizeSelectorContainer">
      <div
        className="sizesExpand"
        onClick={toggleShowSizes}
        style={{ cursor: "pointer" }}
      >
        <span>Size:</span>
        <span id="selectedSize">{selectedSize || "All"}</span>
      </div>

      <div
        className={`AllSizes ${showAllSizes ? "visible" : "hidden"}`}
        style={{
          height: showAllSizes ? "180px" : "0px",
          opacity: showAllSizes ? 1 : 0,
          transition: "height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <span>Select Size</span>
        <div className="Sizes">
          {sizes.map((size) => (
            <button
              id="buttonSize"
              key={size}
              className={selectedSize === size ? "selected" : ""}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSizeSelector;
