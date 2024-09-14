import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartWidget.css";

const CartWidget = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <i className="fas fa-shopping-cart"></i>
      <div className="shoppingNumberContainer">
        <span className="shoppingNumberCounter">{totalItems}</span>
      </div>
    </div>
  );
};

export default CartWidget;
