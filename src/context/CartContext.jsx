import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpenCart, setIsOpenCart] = useState(false);

  useEffect(() => {
    setTotalPrice(cart.reduce((arr, cur) => arr + cur.cartPrice, 0));
  }, [cart]);

  const handleAddCart = async (product) => {
    const existedCartItem = await cart.find(
      (item) => item.product.id === product.id
    );
    if (existedCartItem) {
      const itemIndex = await cart.findIndex(
        (item) => item.product.id === existedCartItem.product.id
      );
      cart[itemIndex].cartQuantity += 1;
      cart[itemIndex].cartPrice =
        cart[itemIndex].cartQuantity * cart[itemIndex].product.price;
    } else {
      setCart([
        ...cart,
        {
          product,
          cartQuantity: 1,
          cartPrice: product.price,
        },
      ]);
    }
    setIsOpenCart(true);
    setTotalPrice(cart.reduce((arr, cur) => arr + cur.cartPrice, 0));
  };

  const handleDeleteCartItem = async(id) => {
    setCart(cart.filter(item => item.product.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        isOpenCart,
        setIsOpenCart,
        handleAddCart,
        handleDeleteCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
