import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let q;
      const productosRef = collection(db, "productos");

      if (categoryId) {
        const formattedCategoryId = capitalizeFirstLetter(categoryId);

        q = query(
          productosRef,
          where("categoria", "==", formattedCategoryId),
          orderBy("categoria")
        );
      } else {
        q = query(productosRef, orderBy("categoria"));
      }

      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(productsList);
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="ItemListContainer">
      <h2 className="ItemListGreeting">{greeting || "✷ Welcome to Hell ✷"}</h2>
      <ItemList products={items} />
    </div>
  );
};

export default ItemListContainer;
