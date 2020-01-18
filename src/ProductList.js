import React from "react";
import "rbx/index.css";
import { Column } from "rbx";

import Product from "./Product";

const ProductList = ({ products, addCartProduct }) => {
  // console.log(`ProductList.js ${addCartProduct}`);
  return (
    <Column.Group hcentered multiline>
      {products.map(product => (
        <Column key={product.sku} size="one-quarter">
          <Product product={product} addCartProduct={addCartProduct} />
        </Column>
      ))}
    </Column.Group>
  );
};

export default ProductList;
