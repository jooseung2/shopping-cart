import React from "react";
import "rbx/index.css";
import { Button } from "rbx";

const SizeButton = ({ size, chosenSize, setSize }) => {
  return size === chosenSize ? (
    <Button color="info" onClick={() => setSize(size)}>
      {size}
    </Button>
  ) : (
    <Button onClick={() => setSize(size)}>{size}</Button>
  );
};

export default SizeButton;
