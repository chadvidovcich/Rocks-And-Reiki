export default function calcTotalPrice(cart) {
  return cart.reduce((sum, cartItem) => {
    if (!cartItem.product) return sum; //products could be deleted, but still in a user's cart
    return sum + cartItem.quantity * cartItem.product.price;
  }, 0);
}
