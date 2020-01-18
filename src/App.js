import React, { useEffect, useState } from "react";
import "rbx/index.css";
import { Container, Button } from "rbx";
import Sidebar from "react-sidebar";

import ProductList from "./ProductList";
import Cart from "./Cart";

const useCartProducts = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const addCartProduct = (p, size) => {
    setCartProducts(
      cartProducts.find(product => product.sku === p.sku)
        ? cartProducts.map(product =>
            product.sku === p.sku
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        : [{ ...p, size, quantity: 1 }].concat(cartProducts)
    );
  };
  return [cartProducts, addCartProduct];
};

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, addCartProduct] = useCartProducts();

  // console.log(cartProducts);
  // console.log(`App.js ${addCartProduct}`);

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
      sidebar={<Cart cartProducts={cartProducts} />}
      open={cartOpen}
      onSetOpen={setCartOpen}
      pullright
    >
      <Container>
        <Button onClick={() => setCartOpen(true)}>Open Cart</Button>
        <ProductList products={products} addCartProduct={addCartProduct} />
      </Container>
    </Sidebar>
  );
};

export default App;
