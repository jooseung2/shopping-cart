import React from "react";
import "rbx/index.css";
import { Box, Card, Button, Title, Media, Image, Content } from "rbx";

const Cart = ({ cartProducts }) => {
  return (
    <Card>
      <Card.Header>
        <Title>Cart</Title>
      </Card.Header>
      <Card.Content>
        <p>
          {cartProducts.length > 0
            ? `Subtotal: ${
                cartProducts[0]["currencyFormat"]
              } ${cartProducts.reduce((total, p) => total + p.price, 0)}`
            : `Nothing in the cart\n\nNo way you dont want any tshirt from here`}
        </p>
        <Button>Checkout</Button>
        {cartProducts.map(product => (
          <CartProduct key={product.sku} product={product} />
        ))}
      </Card.Content>
    </Card>
  );
};

const CartProduct = product => {
  return (
    <Box>
      <Media>
        <Media.Item as="figure" align="left">
          <Image.Container as="p" size={64}>
            <Image src={`data/products/${product.product.sku}_2.jpg`}></Image>;
          </Image.Container>
        </Media.Item>
        <Media.Item align="content">
          <Content>
            <p>
              <strong>{product.product.title}</strong>
              <br />
              Quantity: {product.product.quantity}
              <br />
              Size: {product.product.size}
              <br />
              Price: {product.product.currencyFormat} {product.product.price}
            </p>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default Cart;
