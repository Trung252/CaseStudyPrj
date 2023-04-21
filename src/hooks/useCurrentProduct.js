import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";

const useCurrentProduct = (id) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    category: "",
    image:"",
  });

  useEffect(() => {
    const getCurrentProduct = async () => {
      const querySnapshot = await getDoc(doc(db, "products", id))
      setProduct({
        ...querySnapshot.data(),
        id: querySnapshot.id
      })
    };
    getCurrentProduct()
  }, [id]);

  return product;
};

export default useCurrentProduct;
