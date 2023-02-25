import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import formatMoney from '../lib/formatMoney';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';

export default function Cart() {
  const cartUser = useUser();
  const { cartOpen } = useCart();
  if (!cartUser) {
    return null;
  }
  return (
    <CartStyles
      // @ts-ignore
      open={cartOpen}
    >
      <header>
        <Supreme>{cartUser.name}'s Cart</Supreme>
      </header>
      <ul>
        {cartUser.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cartUser.cart))}</p>
      </footer>
    </CartStyles>
  );
}
