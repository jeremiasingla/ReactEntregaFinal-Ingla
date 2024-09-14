import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ItemCount = ({
  initial,
  stock,
  onQuantityChange,
  onAdd,
  disableAdd = false,
  showButtons = true,
  product,
  selectedSize,
}) => {
  const [count, setCount] = useState(initial);
  const navigate = useNavigate();
  const { setProductForCheckout } = useCart();

  const handleIncrement = () => {
    if (count < stock) setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  useEffect(() => {
    if (onQuantityChange && count !== initial) {
      onQuantityChange(count);
    }
  }, [count, initial, onQuantityChange]);

  const handleBuyNow = () => {
    const isSizeRequired = product.categoria !== "Accessories";

    if (isSizeRequired && (!selectedSize || selectedSize === "All")) {
      alert("Please select a size before proceeding.");
      return;
    }

    const productToCheckout = {
      ...product,
      quantity: count,
      selectedSize: selectedSize || "No Size",
    };

    setProductForCheckout(productToCheckout);

    navigate("/checkout");
  };

  return (
    <div className="itemCount">
      <div className="counterControls">
        <button onClick={handleDecrement}>-</button>
        <span>{count}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      {showButtons && (
        <div className="buyItemContainer">
          <button
            className="addToCart"
            onClick={() => onAdd(count)}
            disabled={disableAdd}
          >
            Add to Cart
          </button>
          <button className="buyNowButton" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCount;
