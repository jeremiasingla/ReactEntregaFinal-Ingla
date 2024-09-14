import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [productForCheckout, setProductForCheckout] = useState(null); // Producto para Buy Now
  const [selectedSizeInCart, setSelectedSizeInCart] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity, selectedSize) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity, selectedSize }];
      }
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity !== newQuantity
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  const clearProductForCheckout = () => {
    setProductForCheckout(null);
  };

  // **Nueva función para limpiar el carrito**
  const clearCart = () => {
    setCart([]); // Vacía el carrito
    localStorage.removeItem("cart"); // Elimina el carrito del localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        productForCheckout,
        setProductForCheckout,
        clearProductForCheckout,
        setSelectedSizeInCart,
        selectedSizeInCart,
        clearCart, // **Incluimos clearCart en el contexto**
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
