import React from "react";
import "rbx/index.css";
import { Box, Media, Content, Image, Delete, Button } from "rbx";

import { getAvailableStock } from "./utils";

const canAddMore = (cartProducts, productInventory, product, size) => {
  const stock = getAvailableStock(cartProducts, productInventory, product);
  return stock[size] > 0 ? true : false;
};

const CartProduct = ({
  productInventory,
  cartProducts,
  product,
  size,
  quantity,
  addCartProduct,
  removeCartProduct,
  decrementCartProduct,
  user
}) => {
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
            <Button.Group hasAddons>
              <Button
                disabled={
                  !canAddMore(cartProducts, productInventory, product, size)
                }
                onClick={() => addCartProduct(product, size, user)}
              >
                +
              </Button>
              <Button onClick={() => decrementCartProduct(sku + size, user)}>
                -
              </Button>
            </Button.Group>
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
