/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('adding to cart');
  // query the current user to see if they are signed in
  const currSession = context.session as Session;
  if (!currSession.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: currSession.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });

  const [existingCartItem] = allCartItems;
  // see if the item being added is already in the cart
  if (existingCartItem) {
    console.log(existingCartItem);
    console.log(
      `There are already ${existingCartItem.quantity} of this item in the cart, increment by 1`
    );
    // increment by 1 if in cart
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
        // resolveFields: false,
      },
    });
  }
  // new cart item if not already in cart
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: currSession.itemId } },
    },
    resolveFields: false,
  });
}

export default addToCart;
