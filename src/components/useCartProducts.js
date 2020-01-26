import { useState } from "react";
import db from "./Database";

const useCartProducts = () => {
  const [cartProducts, setCartProducts] = useState({});
  const addCartProduct = (p, size, user) => {
    const id = p.sku + size;
    let newCartProducts = null;

    if (cartProducts[id]) {
      const oldCartProduct = cartProducts[id];
      const newCartProduct = {
        ...oldCartProduct,
        quantity: oldCartProduct.quantity + 1
      };
      newCartProducts = { ...cartProducts, [id]: newCartProduct };
      setCartProducts(newCartProducts);
    } else {
      const newCartProduct = { product: p, size: size, quantity: 1 };
      newCartProducts = { ...cartProducts, [id]: newCartProduct };
      setCartProducts({ ...cartProducts, [id]: newCartProduct });
    }
    console.log(user ? "true" : "false");
    if (user) {
      db.ref("users/" + user.uid).set(newCartProducts);
    }
  };

  const removeCartProduct = (cartProductId, user) => {
    const newCartProducts = Object.keys(cartProducts)
      .filter(id => id !== cartProductId)
      .reduce(
        (accumulator, id) => ({ ...accumulator, [id]: cartProducts[id] }),
        {}
      );
    setCartProducts(newCartProducts);

    if (user) {
      console.log(user ? "true" : "false");
      db.ref("users/" + user.uid).set(newCartProducts);
    }
  };

  const emptyCart = user => {
    let newCartProducts = {};
    setCartProducts(newCartProducts);
    if (user) {
      db.ref("users/" + user.uid).set(newCartProducts);
    }
  };
  return [
    cartProducts,
    setCartProducts,
    addCartProduct,
    removeCartProduct,
    emptyCart
  ];
};

export default useCartProducts;
