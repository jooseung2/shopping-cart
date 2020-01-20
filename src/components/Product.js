import React, { useState } from "react";
import "rbx/index.css";
import { Card, Image, Title, Button, Container } from "rbx";

const numQuantityInCart = (product, size, cartProducts) => {
  const id = product.sku + size;
  return cartProducts[id] ? cartProducts[id].quantity : 0;
};

const getAvailableStock = (cartProducts, productInventory, product) =>
  Object.keys(productInventory).reduce(
    (stock, size) => ({
      ...stock,
      [size]:
        productInventory[size] - numQuantityInCart(product, size, cartProducts)
    }),
    {}
  );

const Product = ({
  productInventory,
  product,
  addCartProduct,
  openCart,
  cartProducts
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
              ? addToCart(product, chosenSize)
              : alert("Choose a size.")
          }
        >
          Add to cart
        </Button>
        <Button onClick={() => setChosenSize("")}>Unselect size</Button>
      </Container>
    );
  };

  const addToCart = (product, chosenSize) => {
    setChosenSize("");
    addCartProduct(product, chosenSize);
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
        <Title>
          {product.currencyFormat}
          {product.price.toFixed(2)}
        </Title>
        {renderSizeButton("S")}
        {renderSizeButton("M")}
        {renderSizeButton("L")}
        {renderSizeButton("XL")}
        {renderOutOfStock()}
        {renderAddToCart()}
      </Card.Content>
    </Card>
  );
};

export default Product;
