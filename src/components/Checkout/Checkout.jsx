import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Importar funciones necesarias para Firestore
import { db } from "../../firebase/config"; // Configuración de Firebase
import "./Checkout.css";

const Checkout = () => {
  const {
    cart,
    totalPrice,
    productForCheckout,
    clearProductForCheckout, // Importamos la función para limpiar Buy Now
    clearCart, // Agregamos la función para limpiar el carrito
  } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay producto para Buy Now ni carrito, redirige al carrito
    if (!productForCheckout && cart.length === 0) {
      navigate("/cart");
    }

    // Si llegas desde el carrito, limpiamos el producto de Buy Now
    if (!productForCheckout && cart.length > 0) {
      clearProductForCheckout();
    }
  }, [cart, navigate, productForCheckout, clearProductForCheckout]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Si existe un producto para Buy Now
      if (productForCheckout) {
        await updateProductStock(
          productForCheckout.id,
          productForCheckout.quantity
        );
      } else {
        // Si se está comprando desde el carrito, actualizar todos los productos en el carrito
        for (const item of cart) {
          await updateProductStock(item.id, item.quantity);
        }
      }

      // Simulación de procesamiento de pago
      setTimeout(() => {
        console.log("Payment processed successfully", formData);
        setIsProcessing(false);
        clearProductForCheckout(); // Limpiamos el producto de Buy Now después del checkout
        clearCart(); // Limpia el carrito después de completar la compra
        navigate("/thank-you");
      }, 2000);
    } catch (error) {
      console.error("Error updating stock:", error);
      setIsProcessing(false);
    }
  };

  // Función para actualizar el stock del producto en Firestore
  const updateProductStock = async (productId, quantity) => {
    const productRef = doc(db, "productos", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const currentStock = productSnap.data().stock;

      // Restar la cantidad comprada del stock actual
      const newStock = currentStock - quantity;

      // Asegurarse de que el stock no sea negativo
      if (newStock < 0) {
        throw new Error("Stock insuficiente para completar la compra.");
      }

      // Actualizar el stock en Firestore
      await updateDoc(productRef, { stock: newStock });
      console.log(`Stock actualizado para ${productId}: ${newStock}`);
    } else {
      throw new Error("Producto no encontrado en la base de datos.");
    }
  };

  return (
    <div className="checkoutContainer">
      <div className="checkoutContent">
        <div className="orderSummary">
          <h3>Order Summary</h3>
          <ul>
            {/* Mostrar el producto de Buy Now si existe */}
            {productForCheckout ? (
              <li key={productForCheckout.id} className="orderItem">
                <div className="itemInfo">
                  <img
                    src={productForCheckout.imagen}
                    alt={productForCheckout.nombre}
                    className="itemImage"
                  />
                  <div>
                    <p>{productForCheckout.nombre}</p>
                    <p>Size: {productForCheckout.selectedSize}</p>
                    <p>Quantity: {productForCheckout.quantity}</p>
                  </div>
                </div>
                <p>
                  ${productForCheckout.quantity * productForCheckout.precio}
                </p>
              </li>
            ) : (
              // Si no hay producto de Buy Now, mostrar el carrito normal
              cart.map((item) => (
                <li
                  key={`${item.id}-${item.selectedSize}`}
                  className="orderItem"
                >
                  <div className="itemInfo">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="itemImage"
                    />
                    <div>
                      <p>{item.nombre}</p>
                      <p>Size: {item.selectedSize}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p>${item.quantity * item.precio}</p>
                </li>
              ))
            )}
          </ul>
          <h4>
            Total: $
            {productForCheckout
              ? productForCheckout.precio * productForCheckout.quantity
              : totalPrice}
          </h4>
        </div>

        <div className="checkoutForm">
          <h3>Shipping and Payment Information</h3>
          <form onSubmit={handleSubmit}>
            {/* Input fields for shipping/payment */}
            <div className="formGroup">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                placeholder="MM/YY"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="checkoutButton"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Complete Purchase"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
