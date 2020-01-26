import React from "react";
import "rbx/index.css";
import { Card, Button, Title, Delete } from "rbx";

import CartProduct from "./CartProduct";

const subtotal = cartProducts => {
  return Object.keys(cartProducts)
    .reduce(
      (total, id) =>
        total + cartProducts[id].product.price * cartProducts[id].quantity,
      0
    )
    .toFixed(2)
    .toString();
};

const renderCartProducts = (cartProducts, removeCartProduct, user) =>
  Object.keys(cartProducts).map(id => {
    const { product, quantity, size } = cartProducts[id];
    return (
      <CartProduct
        key={id}
        product={product}
        size={size}
        quantity={quantity}
        removeCartProduct={removeCartProduct}
        user={user}
      />
    );
  });

// const Cart = ({
//   openCart,
//   cartProducts,
//   removeCartProduct,
//   emptyCart,
//   user
// }) => {
//   return (
//     <Card>
//       <Card.Header>
//         <Container>
//           <Title>Cart</Title>
//           <Button onClick={() => openCart(false)}>Close tab</Button>
//         </Container>
//       </Card.Header>
//       <Card.Content>
//         {renderCartProducts(cartProducts, removeCartProduct, user)}
//         <p>
//           {Object.keys(cartProducts).length > 0
//             ? "Total : $ " + subtotal(cartProducts)
//             : "Nothing in the cart"}
//         </p>
//         <Button>Checkout</Button>
//         <Button onClick={() => emptyCart()}>Clear</Button>
//       </Card.Content>
//     </Card>
//   );
// };

const Cart = ({
  openCart,
  cartProducts,
  removeCartProduct,
  emptyCart,
  user
}) => {
  return (
    <Card>
      <Card.Header.Title align="centered">
        <Title>Cart</Title>
        <Delete onClick={() => openCart(false)}></Delete>
      </Card.Header.Title>
      <Card.Content>
        <p>
          {Object.keys(cartProducts).length > 0
            ? "Total : $ " + subtotal(cartProducts)
            : "Nothing in the cart"}
        </p>
        <Button>Checkout</Button>
        <Button onClick={() => emptyCart(user)}>Clear</Button>
        {renderCartProducts(cartProducts, removeCartProduct, user)}
      </Card.Content>
    </Card>
  );
};

export default Cart;
