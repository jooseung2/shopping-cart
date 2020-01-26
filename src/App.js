import React, { useEffect, useState } from "react";
import "rbx/index.css";
import { Container, Button } from "rbx";
import Sidebar from "react-sidebar";

import firebase from "firebase/app";
import "firebase/auth";
import db from "./components/Database";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Authenticate from "./components/Authenticate";
import useCartProducts from "./components/useCartProducts";

const App = () => {
  /*
  products
  */
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [productsLoaded, setProductsLoaded] = useState(false);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setData(snap.val());
        setProductsLoaded(true);
      }
    };
    const productsTbl = db.ref("products/");
    productsTbl.on("value", handleData, error => alert(error));
    return () => {
      productsTbl.off("value", handleData);
    };
  }, []);

  /*
  inventory
  */
  const [inventory, setInventory] = useState({});
  const [inventoryLoaded, setInventoryLoaded] = useState(false);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setInventory(snap.val());
        setInventoryLoaded(true);
      }
    };
    const inventoryTbl = db.ref("inventory/");
    inventoryTbl.on("value", handleData, error => alert(error));
    return () => {
      inventoryTbl.off("value", handleData);
    };
  }, []);

  /*
  cart
  */

  const [cartOpen, setCartOpen] = useState(false);
  const [
    cartProducts,
    setCartProducts,
    addCartProduct,
    removeCartProduct,
    decrementCartProduct,
    emptyCart
  ] = useCartProducts();

  const openCart = x => setCartOpen(x);

  /*
  user
  */
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    const getUserCart = user => {
      const handleData = snap => {
        if (snap.val()) {
          setCartProducts(snap.val());
        }
      };
      const userCartTbl = db.ref("users/" + user.uid);
      userCartTbl.once("value").then(handleData, error => alert(error));
    };
    user ? getUserCart(user) : setCartProducts({});
  }, [user, setCartProducts]);

  return productsLoaded && inventoryLoaded ? (
    <Sidebar
      sidebar={
        <Container>
          <Cart
            openCart={openCart}
            inventory={inventory}
            cartProducts={cartProducts}
            addCartProduct={addCartProduct}
            removeCartProduct={removeCartProduct}
            decrementCartProduct={decrementCartProduct}
            emptyCart={emptyCart}
            user={user}
          />
        </Container>
      }
      open={cartOpen}
      onSetOpen={setCartOpen}
      pullright
    >
      <Container>
        <Authenticate user={user} />
        <Button onClick={() => setCartOpen(true)}>Open Cart</Button>
        <ProductList
          inventory={inventory}
          products={products}
          addCartProduct={addCartProduct}
          openCart={openCart}
          cartProducts={cartProducts}
          user={user}
        />
      </Container>
    </Sidebar>
  ) : (
    <h1>loading</h1>
  );
};

export default App;
