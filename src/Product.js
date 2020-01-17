import React from "react";
import { Card, Image, Title, Button } from "rbx";

const Product = product => {
  // console.log(product);
  return (
    <Card>
      <Card.Image>
        <Image.Container>
          <Image src={`data/products/${product.product.sku}_2.jpg`}></Image>
        </Image.Container>
      </Card.Image>
      <Card.Content>
        <Title size={4}>{product.product.title}</Title>
        <Title size={2}>{product.product.description}</Title>
        <Title size={2}>
          {product.product.currencyFormat}
          {product.product.price}
        </Title>
        <Button>S</Button>
        <Button>M</Button>
        <Button>L</Button>
        <Button>XL</Button>
      </Card.Content>
    </Card>
  );
};

export default Product;
