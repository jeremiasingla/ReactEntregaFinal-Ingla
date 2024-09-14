import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Checkout from "./components/Checkout/Checkout";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/CartContext";
import ThankYou from "./components/ThankYou/ThankYou";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <ItemListContainer greeting="✷ Welcome to Hell ✷" />
              </Layout>
            }
          />
          <Route
            path="/category/:categoryId"
            element={
              <Layout>
                <ItemListContainer />
              </Layout>
            }
          />
          <Route
            path="/buy/:productName"
            element={
              <Layout>
                <ItemDetailContainer />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />
          <Route
            path="/thank-you"
            element={
              <Layout>
                <ThankYou />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
