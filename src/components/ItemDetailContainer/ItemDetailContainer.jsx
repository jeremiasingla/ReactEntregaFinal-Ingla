import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import ProductSizeSelector from "../ProductSizeSelector/ProductSizeSelector";
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../context/CartContext";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const { productName } = useParams();
  const [producto, setProducto] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, selectedSizeInCart, setSelectedSizeInCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setSelectedSizeInCart(null);
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "productos", productName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProducto({ id: docSnap.id, ...productData });
          setTotalPrice(productData.precio);
        } else {
          setProducto(null);
        }
      } catch (err) {
        setError("Error fetching product data");
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName, setSelectedSizeInCart]);

  const handleAddToCart = (quantity) => {
    if (
      producto &&
      (producto.categoria === "Accessories" || selectedSizeInCart) &&
      selectedSizeInCart !== "All"
    ) {
      addToCart(producto, quantity, selectedSizeInCart || "No Size");
    } else {
      alert("Please select a valid size before adding to the cart.");
    }
  };

  const handlePriceUpdate = (quantity) => {
    if (producto) {
      setTotalPrice(producto.precio * quantity);
    }
  };

  return (
    <div className="ItemDetailMain">
      <div className="ItemDetailContainerMain">
        <div className="ItemDetailContainer">
          {loading ? (
            <p className="tAlignCenter">Loading product...</p>
          ) : error ? (
            <p className="tAlignCenter">{error}</p>
          ) : producto ? (
            <>
              <div className="productFlex">
                <div className="Producto">
                  <h2 className="productoTitle">{producto.nombre}</h2>
                  <p className="productoColor">{producto.color}</p>
                  <div className="productoImagen">
                    <img src={producto.imagen} alt={producto.nombre} />
                  </div>
                </div>
                <div className="productBuyNow">
                  {producto.categoria !== "Accessories" && (
                    <ProductSizeSelector
                      selectedSize={selectedSizeInCart}
                      onSizeChange={setSelectedSizeInCart}
                    />
                  )}
                  <div className="productActions">
                    <div>
                      <p className="buyNowFor">Buy Now for</p>
                      <span className="buyNowForPrice">${totalPrice}</span>
                    </div>
                    <ItemCount
                      initial={1}
                      stock={10}
                      onAdd={handleAddToCart}
                      onQuantityChange={handlePriceUpdate}
                      disableAdd={
                        producto.categoria !== "Accessories" &&
                        (!selectedSizeInCart || selectedSizeInCart === "All")
                      }
                      product={producto}
                      selectedSize={selectedSizeInCart}
                    />
                  </div>
                </div>
              </div>
              <div className="productDetailsContainer">
                <div className="productDetails">
                  <h2 className="productDetailsTitle">Product Details</h2>
                  <div className="productDetailsInfoContainer">
                    <div className="productDetailsInfo">
                      <p>Category</p>
                      <span>{producto.categoria}</span>
                    </div>
                    <div className="productDetailsInfo">
                      <p>Color</p>
                      <span>{producto.color}</span>
                    </div>
                  </div>
                </div>
                <div className="productDetailsDescriptionContainer">
                  {producto.descripcion && (
                    <>
                      <h2 className="productDetailsDescriptionTitle">
                        Product Description
                      </h2>
                      <p className="productDetailsDescriptionDesc">
                        {producto.descripcion}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="tAlignCenter">Product not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
