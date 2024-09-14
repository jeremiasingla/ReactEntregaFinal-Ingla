import React from "react";
import Item from "../Item/Item";

const ItemList = ({ products }) => {
  return (
    <ul className="ItemList">
      {products.map((producto) => (
        <Item key={producto.id} product={producto} />
      ))}
    </ul>
  );
};

export default ItemList;
