import React, { useEffect, useState } from "react";
import "rbx/index.css";
import { Container } from "rbx";

import ProductList from "./ProductList";

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
};

export default App;
