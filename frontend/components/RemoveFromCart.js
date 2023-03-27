import styled from 'styled-components';
import gql from 'graphql-tag';
// @ts-ignore
import { useMutation } from '@apollo/client';

const BigButton = styled.button`
  font-size: 4rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id: id },
  });
  return (
    <BigButton
      title="Remove this Item from Cart"
      type="button"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}
export default RemoveFromCart;
