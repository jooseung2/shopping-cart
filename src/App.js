import React, { useEffect, useState } from "react";
import "rbx/index.css";
import { Container, Button } from "rbx";
import Sidebar from "react-sidebar";

import ProductList from "./ProductList";
import Cart from "./Cart";

const useCartProducts = () => {
  return;
};

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [cartOpen, setCartOpen] = useState(false);
  // const [cartProducts, addCartProducts, removeCartProducts] = useCartProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Sidebar
      sidebar={<Cart />}
      open={cartOpen}
      onSetOpen={setCartOpen}
      pullright
    >
      <Container>
        <Button onClick={() => setCartOpen(true)}>Open Cart</Button>
        <ProductList products={products} />
      </Container>
    </Sidebar>
  );
};

export default App;
