import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchAll = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));

        const res = [];
        querySnapshot.forEach((product) => {
          res.push({
            id: product.id,
            name: product.data().name,
            image: product.data().image,
            price: product.data().price,
            quantity: product.data().quantity,
            description: product.data().description,
            category: product.data().category,
          });
        });

        return res;
      };

      const fetchProducts = await fetchAll();
      setProducts([...fetchProducts]);
    };
    getProducts();
  }, []);

  return products;
};

export default useProducts;
