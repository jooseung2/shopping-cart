import React from "react";
import "rbx/index.css";
import { Box, Media, Content, Image, Delete } from "rbx";

const CartProduct = ({ product, size, quantity, removeCartProduct, user }) => {
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
            <Delete onClick={() => removeCartProduct(sku + size, user)} />
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

export default CartProduct;
