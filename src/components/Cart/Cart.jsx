import React from "react";
import { useCart } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearProductForCheckout,
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleGoToCheckout = () => {
    clearProductForCheckout();
    navigate("/checkout");
  };

  return (
    <div className="cartContainer">
      {cart.length === 0 ? (
        <>
          <h2>Your Cart is Empty!</h2>
          <p>Must add Items on the Cart before you proceed to Check Out.</p>
        </>
      ) : (
        <div className="cartFlex">
          <ul>
            {cart.map((item) => (
              <li key={`${item.id}-${item.selectedSize}`} className="cartItem">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="cartItemImage"
                />
                <div className="cartItemDetails">
                  <p className="cartItemName">
                    {item.nombre} - Size: {item.selectedSize}
                  </p>
                  <ItemCount
                    initial={item.quantity}
                    stock={10}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(item.id, newQuantity)
                    }
                    showButtons={false}
                  />
                  <p>${item.quantity * item.precio}</p>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="removeButton"
                  >
                    <img src="/deleteItem.svg" alt="Remove" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cartSummary">
            <h3>Total Price: ${totalPrice}</h3>

            {cart.length > 0 && (
              <button
                className="goToCheckoutButton"
                onClick={handleGoToCheckout}
              >
                Go to Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
