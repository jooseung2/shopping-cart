import React, { useState } from "react";
import "rbx/index.css";
import { Card, Image, Title, Button, Container } from "rbx";

import { getAvailableStock } from "./utils";

const Product = ({
  productInventory,
  product,
  addCartProduct,
  openCart,
  cartProducts,
  user
}) => {
  const [chosenSize, setChosenSize] = useState("");

  const renderOutOfStock = () => {
    const stock = getAvailableStock(cartProducts, productInventory, product);

    if (
      Object.values(stock).every(numSizeAvailable => numSizeAvailable === 0)
    ) {
      return "Out of Stock";
    }
    return null;
  };

  const renderSizeButton = size => {
    const stock = getAvailableStock(cartProducts, productInventory, product);
    if (stock[size] > 0) {
      return (
        <Button
          color={chosenSize === size ? "info" : null}
          onClick={() => setChosenSize(size)}
        >
          {size}
        </Button>
      );
    }
    return null;
  };

  const renderUnselectButton = () => {
    const stock = getAvailableStock(cartProducts, productInventory, product);
    if (Object.keys(stock).some(val => stock[val] > 0)) {
      return <Button onClick={() => setChosenSize("")}>Unselect</Button>;
    }
  };

  const renderAddToCart = () => {
    const stock = getAvailableStock(cartProducts, productInventory, product);
    if (
      Object.values(stock).every(numSizeAvailable => numSizeAvailable === 0)
    ) {
      return null;
    }
    return (
      <Container>
        <Button
          onClick={() =>
            chosenSize
              ? addToCart(product, chosenSize, user)
              : alert("Choose a size.")
          }
        >
          Add to cart
        </Button>
      </Container>
    );
  };

  const addToCart = (product, chosenSize, user) => {
    setChosenSize("");
    addCartProduct(product, chosenSize, user);
    openCart(true);
  };

  return (
    <Card>
      <Card.Image>
        <Image.Container>
          <Image src={`data/products/${product.sku}_1.jpg`}></Image>
        </Image.Container>
      </Card.Image>
      <Card.Content size="small">
        <Title>{product.title}</Title>
        <Title>{product.description}</Title>
        {product.currencyFormat}
        {product.price.toFixed(2)}
        <Button.Group hasAddons>
          {renderSizeButton("S")}
          {renderSizeButton("M")}
          {renderSizeButton("L")}
          {renderSizeButton("XL")}
          {renderUnselectButton()}
        </Button.Group>
        {renderOutOfStock()}
        {renderAddToCart()}
      </Card.Content>
    </Card>
  );
};

export default Product;
