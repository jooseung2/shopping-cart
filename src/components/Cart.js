import React from "react";
import "rbx/index.css";
import { Box, Card, Button, Title, Media, Image, Content } from "rbx";

const Cart = ({ cartProducts, removeCartProduct }) => {
  console.log(cartProducts);
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
          <CartProduct
            key={product.sku.toString().concat(product.size.toString())}
            product={product}
            removeCartProduct={removeCartProduct}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

const CartProduct = ({ product, removeCartProduct }) => {
  return (
    <Box>
      <Media>
        <Media.Item as="figure" align="left">
          <Image.Container as="p" size={64}>
            <Image src={`data/products/${product.sku}_2.jpg`}></Image>
          </Image.Container>
        </Media.Item>
        <Media.Item align="content">
          <Content>
            <Button onClick={() => removeCartProduct(product)}>x</Button>
            <p>
              <strong>{product.title}</strong>
              <br />
              Quantity: {product.quantity}
              <br />
              Size: {product.size}
              <br />
              Price: {product.currencyFormat} {product.price}
            </p>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default Cart;
