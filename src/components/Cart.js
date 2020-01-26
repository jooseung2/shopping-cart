import React, { useEffect } from "react";
import "rbx/index.css";
import { Card, Button, Title, Delete } from "rbx";

import CartProduct from "./CartProduct";
import db from "./Database";

const subtotal = cartProducts => {
  if (Object.keys(cartProducts).length > 0) {
    return (
      "Total : $ " +
      Object.keys(cartProducts)
        .reduce(
          (total, id) =>
            total + cartProducts[id].product.price * cartProducts[id].quantity,
          0
        )
        .toFixed(2)
        .toString()
    );
  } else {
    return "Nothing in the cart";
  }
};

const handleCheckout = (cartProducts, emptyCart, user) => {
  if (user) {
    const inventoryRef = db.ref("inventory/");
    inventoryRef.transaction(inventory => {
      if (inventory) {
        Object.values(cartProducts).forEach(cp => {
          const { product, size, quantity } = cp;
          inventory[product.sku][size] -= quantity;
        });
      }
      return inventory;
    });
    emptyCart(user);
    alert("Successfully checked out");
  } else {
    alert("Please login to checkout");
  }
};

const renderCartProducts = (
  inventory,
  cartProducts,
  addCartProduct,
  removeCartProduct,
  decrementCartProduct,
  user
) =>
  Object.keys(cartProducts).map(id => {
    const { product, quantity, size } = cartProducts[id];
    return (
      <CartProduct
        key={id}
        productInventory={inventory[product.sku]}
        cartProducts={cartProducts}
        product={product}
        size={size}
        quantity={quantity}
        addCartProduct={addCartProduct}
        removeCartProduct={removeCartProduct}
        decrementCartProduct={decrementCartProduct}
        user={user}
      />
    );
  });

const Cart = ({
  openCart,
  inventory,
  cartProducts,
  addCartProduct,
  removeCartProduct,
  emptyCart,
  decrementCartProduct,
  user
}) => {
  return (
    <Card>
      <Card.Header.Title align="centered">
        <Title>Cart</Title>
        <Delete onClick={() => openCart(false)}></Delete>
      </Card.Header.Title>
      <Card.Content>
        <p>{subtotal(cartProducts)}</p>
        <Button onClick={() => handleCheckout(cartProducts, emptyCart, user)}>
          Checkout
        </Button>
        <Button onClick={() => emptyCart(user)}>Clear</Button>
        {renderCartProducts(
          inventory,
          cartProducts,
          addCartProduct,
          removeCartProduct,
          decrementCartProduct,
          user
        )}
      </Card.Content>
    </Card>
  );
};

export default Cart;
