import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
    width: 10rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export default function CartItem({ cartItem }) {
  if (!cartItem.product) return null;

  return (
    <CartItemStyles>
      <img
        src={cartItem.product.photo.image.publicUrlTransformed}
        alt={cartItem.product.name}
      />
      <div>
        <h3>{cartItem.product.name}</h3>
        <p>
          {formatMoney(cartItem.product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.product.price)}
            each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}
