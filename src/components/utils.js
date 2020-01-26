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

export { getAvailableStock };
