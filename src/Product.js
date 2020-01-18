import React, { useState } from "react";
import { Card, Image, Title, Button } from "rbx";

import SizeButton from "./SizeButton";

const Product = product => {
  // console.log(product);
  const [size, setSize] = useState("");

  return (
    <Card>
      <Card.Image>
        <Image.Container>
          <Image src={`data/products/${product.product.sku}_1.jpg`}></Image>
        </Image.Container>
      </Card.Image>
      <Card.Content>
        <Title size={4}>{product.product.title}</Title>
        <Title size={2}>{product.product.description}</Title>
        <Title size={2}>
          {product.product.currencyFormat}
          {product.product.price}
        </Title>
        <SizeButton size="S" chosenSize={size} setSize={setSize}></SizeButton>
        <SizeButton size="M" chosenSize={size} setSize={setSize}></SizeButton>
        <SizeButton size="L" chosenSize={size} setSize={setSize}></SizeButton>
        <SizeButton size="XL" chosenSize={size} setSize={setSize}></SizeButton>
        <Button>Add to cart</Button>
        <Button>Unselect size</Button>
      </Card.Content>
    </Card>
  );
};

export default Product;
