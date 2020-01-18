import React, { useState } from "react";
import "rbx/index.css";
import { Card, Image, Title, Button } from "rbx";

import SizeButton from "./SizeButton";

const Product = ({ product, addCartProduct }) => {
  // console.log(product);
  const [size, setSize] = useState("");

  // console.log(`Product.js ${addCartProduct}`);

  return (
    <Card>
      <Card.Image>
        <Image.Container>
          <Image src={`data/products/${product.sku}_1.jpg`}></Image>
        </Image.Container>
      </Card.Image>
      <Card.Content>
        <Title size={4}>{product.title}</Title>
        <Title size={2}>{product.description}</Title>
        <Title size={2}>
          {product.currencyFormat}
          {product.price}
        </Title>
        <SizeButton size="S" chosenSize={size} setSize={setSize}></SizeButton>
        <SizeButton size="M" chosenSize={size} setSize={setSize}></SizeButton>
        <SizeButton size="L" chosenSize={size} setSize={setSize}></SizeButton>
        <SizeButton size="XL" chosenSize={size} setSize={setSize}></SizeButton>
        <Button
          onClick={() =>
            // if (size) {
            //    addCartProduct(product, size);
            //    setSize("");
            // } else {
            //   alert("Choose a size.")
            // }

            size ? addCartProduct(product, size) : alert("Choose a size.")
          }
        >
          Add to cart
        </Button>
        <Button onClick={() => setSize("")}>Unselect size</Button>
      </Card.Content>
    </Card>
  );
};

export default Product;
