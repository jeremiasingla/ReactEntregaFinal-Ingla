import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ product }) => {
  return (
    <li className="Item">
      <Link
        to={`/buy/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="productoImagen">
            <img src={product.imagen} alt={product.nombre} />
          </div>
          <div>
            <h3 className="productoTitle">{product.nombre}</h3>
            <p className="productoPrecio">${product.precio}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Item;
