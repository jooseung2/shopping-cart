import React from "react";
import "rbx/index.css";
import { Column } from "rbx";

import Product from "./Product";

const ProductList = ({
  inventory,
  products,
  addCartProduct,
  openCart,
  cartProducts,
  user
}) => {
  return (
    <Column.Group hcentered="true" multiline>
      {products.map(product => (
        <Column key={product.sku} size="one-quarter">
          <Product
            productInventory={inventory[product.sku]}
            product={product}
            addCartProduct={addCartProduct}
            openCart={openCart}
            cartProducts={cartProducts}
            user={user}
          />
        </Column>
      ))}
    </Column.Group>
  );
};

export default ProductList;
