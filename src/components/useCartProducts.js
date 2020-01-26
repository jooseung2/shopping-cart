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
      db.ref("users/" + user.uid).set(newCartProducts);
    }
  };

  const decrementCartProduct = (cartProductId, user) => {
    let newCartProducts = null;

    const oldCartProduct = cartProducts[cartProductId];
    const oldQuantity = oldCartProduct.quantity;

    if (oldQuantity > 1) {
      const newCartProduct = {
        ...oldCartProduct,
        quantity: oldCartProduct.quantity - 1
      };
      newCartProducts = { ...cartProducts, [cartProductId]: newCartProduct };
      setCartProducts(newCartProducts);

      if (user) {
        db.ref("users/" + user.uid).set(newCartProducts);
      }
    } else {
      removeCartProduct(cartProductId, user);
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
    decrementCartProduct,
    emptyCart
  ];
};

export default useCartProducts;
