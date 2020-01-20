import React from "react";
import "rbx/index.css";
import {
  Box,
  Card,
  Button,
  Title,
  Media,
  Image,
  Content,
  Container
} from "rbx";

const Cart = ({ cartProducts, removeCartProduct, emptyCart, openCart }) => {
  return (
    <Card>
      <Card.Header>
        <Container>
          <Title>Cart</Title>
          <Button onClick={() => openCart(false)}>Close tab</Button>
        </Container>
      </Card.Header>
      <Card.Content>
        <p>
          {Object.keys(cartProducts).length > 0
            ? Object.keys(cartProducts)
                .reduce(
                  (total, id) =>
                    total +
                    cartProducts[id].product.price * cartProducts[id].quantity,
                  0
                )
                .toFixed(2)
            : "Nothing in the cart"}
        </p>

        <Button>Checkout</Button>
        <Button onClick={() => emptyCart()}>Clear</Button>
        {Object.keys(cartProducts).map(id => {
          const { product, quantity, size } = cartProducts[id];
          return (
            <CartProduct
              key={id}
              product={product}
              size={size}
              quantity={quantity}
              removeCartProduct={removeCartProduct}
            />
          );
        })}
      </Card.Content>
    </Card>
  );
};

const CartProduct = ({ product, size, quantity, removeCartProduct }) => {
  const { sku, title, price, currencyFormat } = product;
  const imgsrc = `data/products/${sku}_2.jpg`;
  return (
    <Box>
      <Media>
        <Media.Item as="figure" align="left">
          <Image.Container as="p" size={64}>
            <Image src={imgsrc}></Image>
          </Image.Container>
        </Media.Item>
        <Media.Item align="content">
          <Content>
            <Button onClick={() => removeCartProduct(product)}>x</Button>
            <p>
              <strong>{title}</strong>
              <br />
              Quantity: {quantity}
              <br />
              Size: {size}
              <br />
              Price: {currencyFormat} {price.toFixed(2)}
            </p>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default Cart;
