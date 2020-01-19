import React, { useEffect, useState } from "react";
import "rbx/index.css";
import { Container, Button } from "rbx";
import Sidebar from "react-sidebar";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const useCartProducts = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const addCartProduct = (p, size) => {
    setCartProducts(
      // if the product that I am about to add to cart is already in it,
      cartProducts.find(
        product => product.sku === p.sku && product.size === size
      )
        ? cartProducts.map(product =>
            product.sku === p.sku && product.size === size
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        : // else, add to cart with quantity of 1
          [{ ...p, size, quantity: 1 }].concat(cartProducts)
    );
  };
  const removeCartProduct = p => {
    setCartProducts(
      cartProducts.filter(
        product => product.sku !== p.sku || product.size !== p.size
      )
    );
  };
  // console.log("haha");
  return [cartProducts, addCartProduct, removeCartProduct];
};

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, addCartProduct, removeCartProduct] = useCartProducts();

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
      sidebar={
        <Container>
          <Button onClick={() => setCartOpen(false)}>close</Button>
          <Cart
            cartProducts={cartProducts}
            removeCartProduct={removeCartProduct}
          />
        </Container>
      }
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
